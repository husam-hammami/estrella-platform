'use strict';
// Webhook sink for BOTH providers (one Vercel function; bodyParser off so we keep
// the exact raw bytes for signature checks). Routing:
//   /api/stripe/webhook                      → Stripe  (checkout.session.completed)
//   /api/calendly/webhook  (vercel rewrite)  → ?provider=calendly (invitee.created/canceled)
// We branch on ?provider BEFORE any Stripe verification — a Calendly POST has no
// stripe-signature and must never hit constructEvent. Paid state is written ONLY
// here (the browser redirect is spoofable). Bad/missing secret → 400 + loud log.
const L = require('../../lib/api.js');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return L.sendJson(res, 405, { error: 'method_not_allowed' });
  }
  if (!L.sbConfigured()) {
    console.error('webhook: supabase unconfigured');
    return L.sendJson(res, 503, { error: 'supabase_unconfigured' });
  }

  const provider = new URL(req.url, 'http://x').searchParams.get('provider');
  const raw = await L.readRawBody(req); // bodyParser is off; read exact bytes once

  if (provider === 'calendly') return handleCalendly(req, res, raw);
  return handleStripe(req, res, raw);
};

// ---- Stripe: payment confirmed → brief paid + awaiting_schedule + entitlement ----
async function handleStripe(req, res, raw) {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    console.error('stripe webhook unconfigured: missing STRIPE_SECRET_KEY or STRIPE_WEBHOOK_SECRET');
    return L.sendJson(res, 503, { error: 'stripe_unconfigured' });
  }

  const Stripe = require('stripe');
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  let event;
  try {
    event = stripe.webhooks.constructEvent(raw, req.headers['stripe-signature'], process.env.STRIPE_WEBHOOK_SECRET);
  } catch (e) {
    console.error('stripe webhook bad sig', e.message);
    res.statusCode = 400;
    return res.end('bad signature');
  }

  // Only checkout.session.completed flips paid state; ack everything else.
  if (event.type !== 'checkout.session.completed') {
    res.statusCode = 200;
    return res.end('ok');
  }

  try {
    // Idempotency: insert the event id, ignoring duplicates. Empty → already done.
    const insResp = await L.sb('webhook_events', {
      method: 'POST',
      headers: { Prefer: 'return=representation,resolution=ignore-duplicates' },
      body: JSON.stringify({ stripe_event_id: event.id }),
    });
    if (!insResp.ok) {
      console.error('webhook_events insert failed', insResp.status, await insResp.text().catch(() => ''));
      return L.sendJson(res, 502, { error: 'supabase_error' });
    }
    const inserted = await insResp.json();
    if (!Array.isArray(inserted) || inserted.length === 0) {
      res.statusCode = 200;
      return res.end('already_processed');
    }

    const obj = (event.data && event.data.object) || {};
    const briefId = obj.client_reference_id;
    const sessionId = obj.id || null;
    if (!briefId) {
      console.error('webhook: no client_reference_id on event', event.id);
      res.statusCode = 200;
      return res.end('no_reference');
    }

    // Verify the reference points at a real brief before flipping anything.
    const lookup = await L.sb(`briefs?id=eq.${encodeURIComponent(briefId)}&select=id,client_sub`);
    if (!lookup.ok) {
      console.error('webhook: brief lookup failed', lookup.status, await lookup.text().catch(() => ''));
      return L.sendJson(res, 502, { error: 'supabase_error' });
    }
    const briefRows = await lookup.json();
    if (!Array.isArray(briefRows) || briefRows.length === 0) {
      console.error('webhook: client_reference_id matched no brief', briefId, event.id);
      res.statusCode = 200;
      return res.end('no_brief');
    }
    const clientSub = briefRows[0].client_sub || (obj.metadata && obj.metadata.client_sub) || null;
    const paidAt = new Date().toISOString();

    // Flip the brief: paid + AWAITING SCHEDULE (Calendly confirms the time next).
    const patchBrief = await L.sb(`briefs?id=eq.${encodeURIComponent(briefId)}`, {
      method: 'PATCH',
      headers: { Prefer: 'return=minimal' },
      body: JSON.stringify({
        payment_status: 'paid',
        status: 'awaiting_schedule',
        paid_at: paidAt,
        stripe_event_id: event.id,
        stripe_checkout_session_id: sessionId,
        updated_at: paidAt,
      }),
    });
    if (!patchBrief.ok) {
      console.error('webhook: brief patch failed', patchBrief.status, await patchBrief.text().catch(() => ''));
      return L.sendJson(res, 502, { error: 'supabase_error' });
    }

    // Create the entitlement (the right to book one session). Idempotent via the
    // unique stripe_checkout_session_id — a duplicate paid event won't double-grant.
    const entResp = await L.sb('entitlements', {
      method: 'POST',
      headers: { Prefer: 'return=minimal,resolution=ignore-duplicates' },
      body: JSON.stringify({
        user_sub: clientSub,
        product: 'coaching_session',
        brief_id: briefId,
        status: 'active',
        stripe_checkout_session_id: sessionId,
      }),
    });
    if (!entResp.ok) {
      console.error('webhook: entitlement insert failed', entResp.status, await entResp.text().catch(() => ''));
      // Brief is already paid; don't fail the webhook over the entitlement row.
    }

    // Link the ledger row back to the brief (best-effort; the paid flip stands).
    const linkLedger = await L.sb(`webhook_events?stripe_event_id=eq.${encodeURIComponent(event.id)}`, {
      method: 'PATCH',
      headers: { Prefer: 'return=minimal' },
      body: JSON.stringify({ brief_id: briefId }),
    });
    if (!linkLedger.ok) {
      console.error('webhook: ledger link failed', linkLedger.status, await linkLedger.text().catch(() => ''));
    }

    res.statusCode = 200;
    return res.end('ok');
  } catch (e) {
    console.error('stripe webhook error', e);
    return L.sendJson(res, 500, { error: 'server_error' });
  }
}

// ---- Calendly: booking confirmed/canceled → brief schedule + entitlement state ----
async function handleCalendly(req, res, raw) {
  const coachSub = process.env.COACH_LINKEDIN_SUB;
  const integ = coachSub ? await L.getIntegration(coachSub, 'calendly') : null;
  const signingKey = integ && integ.webhook_signing_key_enc ? L.decryptSecret(integ.webhook_signing_key_enc) : null;
  if (!signingKey) {
    console.error('calendly webhook: no signing key on file (not connected?)');
    res.statusCode = 400;
    return res.end('no signing key');
  }
  if (!verifyCalendly(raw, req.headers['calendly-webhook-signature'], signingKey)) {
    console.error('calendly webhook: bad signature');
    res.statusCode = 400;
    return res.end('bad signature');
  }

  let body;
  try { body = JSON.parse(raw || '{}'); } catch (e) { res.statusCode = 400; return res.end('bad json'); }
  const eventType = body.event;
  if (eventType !== 'invitee.created' && eventType !== 'invitee.canceled') {
    res.statusCode = 200;
    return res.end('ok');
  }

  const payload = body.payload || {};
  const inviteeUri = payload.uri || null;
  const email = payload.email || null;
  const briefIdFromUtm = (payload.tracking && payload.tracking.utm_content) || null;
  const scheduled = payload.scheduled_event || {};
  const eventUri = scheduled.uri || payload.event || null;
  const startTime = scheduled.start_time || null;
  const endTime = scheduled.end_time || null;
  const joinUrl = (scheduled.location && (scheduled.location.join_url || scheduled.location.location)) || null;

  // Idempotency via the shared ledger (key namespaced so it can't collide with a
  // Stripe event id). Transitions are also naturally idempotent — belt + braces.
  const idemKey = `calendly:${eventType}:${inviteeUri || L.crypto.randomBytes(8).toString('hex')}`;
  try {
    const insResp = await L.sb('webhook_events', {
      method: 'POST',
      headers: { Prefer: 'return=representation,resolution=ignore-duplicates' },
      body: JSON.stringify({ stripe_event_id: idemKey }),
    });
    if (insResp.ok) {
      const inserted = await insResp.json();
      if (Array.isArray(inserted) && inserted.length === 0) {
        res.statusCode = 200;
        return res.end('already_processed');
      }
    }
  } catch (e) { /* non-fatal */ }

  try {
    if (eventType === 'invitee.created') {
      const brief = await matchPaidBrief(coachSub, briefIdFromUtm, email);
      if (!brief) {
        console.error('calendly invitee.created matched no paid brief', { email, briefIdFromUtm, inviteeUri });
        res.statusCode = 200;
        return res.end('no_match'); // never auto-confirm an unpaid/unknown booking
      }
      const nowIso = new Date().toISOString();
      const patch = await L.sb(`briefs?id=eq.${encodeURIComponent(brief.id)}`, {
        method: 'PATCH',
        headers: { Prefer: 'return=minimal' },
        body: JSON.stringify({
          status: 'session_scheduled',
          calendly_event_uri: eventUri,
          calendly_invitee_uri: inviteeUri,
          calendly_join_url: joinUrl,
          scheduled_start: startTime,
          scheduled_end: endTime,
          updated_at: nowIso,
        }),
      });
      if (!patch.ok) {
        console.error('calendly: brief patch failed', patch.status, await patch.text().catch(() => ''));
        return L.sendJson(res, 502, { error: 'supabase_error' });
      }
      // Consume the entitlement (only flips active rows → idempotent).
      await L.sb(`entitlements?brief_id=eq.${encodeURIComponent(brief.id)}&status=eq.active`, {
        method: 'PATCH',
        headers: { Prefer: 'return=minimal' },
        body: JSON.stringify({ status: 'consumed', updated_at: nowIso }),
      });
      res.statusCode = 200;
      return res.end('ok');
    }

    // invitee.canceled → revert to awaiting_schedule so the paid client can rebook.
    const brief = await findScheduledBrief(coachSub, inviteeUri, briefIdFromUtm, email);
    if (brief) {
      const nowIso = new Date().toISOString();
      await L.sb(`briefs?id=eq.${encodeURIComponent(brief.id)}`, {
        method: 'PATCH',
        headers: { Prefer: 'return=minimal' },
        body: JSON.stringify({
          status: 'awaiting_schedule',
          calendly_event_uri: null,
          calendly_invitee_uri: null,
          calendly_join_url: null,
          scheduled_start: null,
          scheduled_end: null,
          updated_at: nowIso,
        }),
      });
      await L.sb(`entitlements?brief_id=eq.${encodeURIComponent(brief.id)}&status=eq.consumed`, {
        method: 'PATCH',
        headers: { Prefer: 'return=minimal' },
        body: JSON.stringify({ status: 'active', updated_at: nowIso }),
      });
    }
    res.statusCode = 200;
    return res.end('ok');
  } catch (e) {
    console.error('calendly webhook error', e);
    return L.sendJson(res, 500, { error: 'server_error' });
  }
}

// Calendly signs `${t}.${rawBody}` (HMAC-SHA256, hex) in the
// `Calendly-Webhook-Signature: t=<ts>,v1=<hmac>` header, using the signing key we
// supplied at subscription time.
function verifyCalendly(rawBody, header, signingKey) {
  if (!header || !signingKey) return false;
  const parts = {};
  String(header).split(',').forEach((kv) => {
    const i = kv.indexOf('=');
    if (i > 0) parts[kv.slice(0, i).trim()] = kv.slice(i + 1).trim();
  });
  if (!parts.t || !parts.v1) return false;
  const expected = L.crypto.createHmac('sha256', signingKey).update(`${parts.t}.${rawBody}`).digest('hex');
  const a = Buffer.from(parts.v1);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return L.crypto.timingSafeEqual(a, b);
}

// Match a Calendly invitee to a PAID brief: utm_content (brief id) first, then the
// invitee email → newest paid brief awaiting scheduling. A known-but-unpaid brief
// is flagged needs_review (suspicious) and NOT confirmed.
async function matchPaidBrief(coachSub, briefId, email) {
  if (briefId) {
    const resp = await L.sb(`briefs?id=eq.${encodeURIComponent(briefId)}&coach_sub=eq.${encodeURIComponent(coachSub)}&select=id,payment_status&limit=1`);
    if (resp.ok) {
      const rows = await resp.json();
      const b = rows && rows[0];
      if (b && b.payment_status === 'paid') return b;
      if (b) {
        await L.sb(`briefs?id=eq.${encodeURIComponent(b.id)}`, {
          method: 'PATCH',
          headers: { Prefer: 'return=minimal' },
          body: JSON.stringify({ status: 'needs_review', updated_at: new Date().toISOString() }),
        });
        return null;
      }
    }
  }
  if (email) {
    const resp = await L.sb(`briefs?client_email=eq.${encodeURIComponent(email)}&coach_sub=eq.${encodeURIComponent(coachSub)}&payment_status=eq.paid&status=eq.awaiting_schedule&select=id&order=created_at.desc&limit=1`);
    if (resp.ok) {
      const rows = await resp.json();
      if (rows && rows[0]) return rows[0];
    }
  }
  return null;
}

async function findScheduledBrief(coachSub, inviteeUri, briefId, email) {
  if (inviteeUri) {
    const resp = await L.sb(`briefs?calendly_invitee_uri=eq.${encodeURIComponent(inviteeUri)}&coach_sub=eq.${encodeURIComponent(coachSub)}&select=id&limit=1`);
    if (resp.ok) { const rows = await resp.json(); if (rows && rows[0]) return rows[0]; }
  }
  if (briefId) {
    const resp = await L.sb(`briefs?id=eq.${encodeURIComponent(briefId)}&coach_sub=eq.${encodeURIComponent(coachSub)}&select=id&limit=1`);
    if (resp.ok) { const rows = await resp.json(); if (rows && rows[0]) return rows[0]; }
  }
  return null;
}

// Disable Vercel's body parser: signature verification needs the untouched bytes.
module.exports.config = { api: { bodyParser: false } };
