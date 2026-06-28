'use strict';
// Stripe webhook — the ONLY writer of paid state in the system. The browser never
// marks a booking paid; the success redirect is spoofable. We verify Stripe's
// signature over the EXACT raw body, are idempotent on event.id, and only then
// flip the brief to paid + lock the slot. Wrong/missing secret → 400 + loud log
// (surfaces as failed deliveries in Stripe, never a silent free session).
const L = require('../../lib/api.js');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return L.sendJson(res, 405, { error: 'method_not_allowed' });
  }

  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    console.error('stripe webhook unconfigured: missing STRIPE_SECRET_KEY or STRIPE_WEBHOOK_SECRET');
    return L.sendJson(res, 503, { error: 'stripe_unconfigured' });
  }
  if (!L.sbConfigured()) {
    console.error('stripe webhook: supabase unconfigured');
    return L.sendJson(res, 503, { error: 'supabase_unconfigured' });
  }

  // Read the raw stream manually (no req.body — bodyParser is off, and this
  // project has never relied on a parsed body).
  const raw = await L.readRawBody(req);

  // Verify the signature. On failure: log + 400 so Stripe shows failed deliveries
  // (a wrong STRIPE_WEBHOOK_SECRET is loud, never a silent loss).
  const Stripe = require('stripe');
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      raw,
      req.headers['stripe-signature'],
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (e) {
    console.error('bad sig', e.message);
    res.statusCode = 400;
    return res.end('bad signature');
  }

  // Only checkout.session.completed flips paid state; ack everything else so
  // Stripe stops retrying events we don't act on.
  if (event.type !== 'checkout.session.completed') {
    res.statusCode = 200;
    return res.end('ok');
  }

  try {
    // Idempotency: insert the event id, ignoring duplicates. An empty result means
    // we've already processed this event — ack and stop.
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
      // Already processed (duplicate delivery) — single paid transition guaranteed.
      res.statusCode = 200;
      return res.end('already_processed');
    }

    const briefId = event.data && event.data.object && event.data.object.client_reference_id;
    if (!briefId) {
      console.error('webhook: no client_reference_id on event', event.id);
      // Acknowledge — nothing to flip, and retrying won't add a reference id.
      res.statusCode = 200;
      return res.end('no_reference');
    }

    // Verify the reference points at a real brief before flipping anything.
    const lookup = await L.sb(`briefs?id=eq.${encodeURIComponent(briefId)}&select=id,slot_id`);
    if (!lookup.ok) {
      console.error('webhook: brief lookup failed', lookup.status, await lookup.text().catch(() => ''));
      return L.sendJson(res, 502, { error: 'supabase_error' });
    }
    const briefRows = await lookup.json();
    if (!Array.isArray(briefRows) || briefRows.length === 0) {
      console.error('webhook: client_reference_id matched no brief', briefId, event.id);
      // Ack — a non-existent brief won't appear on retry.
      res.statusCode = 200;
      return res.end('no_brief');
    }
    const slotId = briefRows[0].slot_id;
    const paidAt = new Date().toISOString();

    // Flip the brief: paid + scheduled, stamped with this event id.
    const patchBrief = await L.sb(`briefs?id=eq.${encodeURIComponent(briefId)}`, {
      method: 'PATCH',
      headers: { Prefer: 'return=minimal' },
      body: JSON.stringify({
        payment_status: 'paid',
        status: 'session_scheduled',
        paid_at: paidAt,
        stripe_event_id: event.id,
      }),
    });
    if (!patchBrief.ok) {
      console.error('webhook: brief patch failed', patchBrief.status, await patchBrief.text().catch(() => ''));
      return L.sendJson(res, 502, { error: 'supabase_error' });
    }

    // Lock the slot: paid, hold cleared so lazy expiry can never free it.
    if (slotId) {
      const patchSlot = await L.sb(`availability_slots?id=eq.${encodeURIComponent(slotId)}`, {
        method: 'PATCH',
        headers: { Prefer: 'return=minimal' },
        body: JSON.stringify({ paid: true, held_until: null }),
      });
      if (!patchSlot.ok) {
        console.error('webhook: slot patch failed', patchSlot.status, await patchSlot.text().catch(() => ''));
        // Brief is already paid; don't fail the whole webhook over the slot flag.
      }
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

    // Handled — 200 so Stripe doesn't retry a completed event.
    res.statusCode = 200;
    return res.end('ok');
  } catch (e) {
    console.error('webhook error', e);
    return L.sendJson(res, 500, { error: 'server_error' });
  }
};

// Disable Vercel's body parser: signature verification needs the untouched bytes.
// Set AFTER the handler is exported so it isn't clobbered by the assignment above.
module.exports.config = { api: { bodyParser: false } };
