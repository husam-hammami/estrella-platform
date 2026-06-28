'use strict';
// Booking + payment kickoff for the signed-in user. POST creates the brief at
// booking time (NOT during anonymous screening), atomically holds the chosen slot
// via the claim_slot RPC, and hands back the Stripe Payment Link URL. This route
// NEVER marks anything paid — that is exclusively api/stripe/webhook.js's job.
const L = require('../lib/api.js');

const COACH = process.env.COACH_LINKEDIN_SUB;

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return L.sendJson(res, 405, { error: 'method_not_allowed' });
  }
  const s = L.requireUser(req, res);
  if (!s) return;
  if (!L.sbConfigured()) return L.sendJson(res, 503, { error: 'supabase_unconfigured' });
  if (!COACH) return L.sendJson(res, 503, { error: 'coach_unconfigured' });

  try {
    // Body: { slot_id, brief:{identity,role,goal,obstacle,synthesis,strengths} }.
    // The screening output is held in the browser until booking; we accept ONLY
    // the screening fields here — identity columns come from the session below.
    const body = req.body && typeof req.body === 'object' ? req.body : await readJson(req);
    const slotId = body && body.slot_id;
    const brief = (body && body.brief && typeof body.brief === 'object') ? body.brief : {};
    if (!slotId) return L.sendJson(res, 400, { error: 'slot_id_required' });

    // Atomic slot hold. claim_slot succeeds only if the slot is free or its hold
    // lapsed and it isn't paid — a single UPDATE, so concurrent bookers race
    // safely (exactly one true). If it's taken, ask the client to repick.
    const claimResp = await L.sb('rpc/claim_slot', {
      method: 'POST',
      body: JSON.stringify({ p_slot: slotId, p_client_sub: s.sub }),
    });
    if (!claimResp.ok) {
      console.error('claim_slot failed', claimResp.status, await claimResp.text().catch(() => ''));
      return L.sendJson(res, 502, { error: 'supabase_error' });
    }
    const ok = await claimResp.json();
    if (ok !== true) return L.sendJson(res, 409, { error: 'slot_taken' });

    // Create the brief for the signed-in user. Identity (client_sub/name/email)
    // comes from the SESSION, never the request body — trust boundary. Screening
    // fields come from the browser-held brief.
    const row = {
      client_sub: s.sub,
      client_name: s.name || null,
      client_email: s.email || null,
      coach_sub: COACH,
      status: 'pending_payment',
      payment_status: 'pending',
      slot_id: slotId,
      identity: brief.identity || null,
      role: brief.role || null,
      goal: brief.goal || null,
      obstacle: brief.obstacle || null,
      synthesis: brief.synthesis || null,
      strengths: Array.isArray(brief.strengths) ? brief.strengths : null,
    };
    const insResp = await L.sb('briefs', {
      method: 'POST',
      headers: { Prefer: 'return=representation' },
      body: JSON.stringify(row),
    });
    if (!insResp.ok) {
      // The hold succeeded but the brief insert failed. Best-effort: leave the
      // hold to lapse via lazy expiry (no slot is permanently locked) and 500.
      console.error('brief insert failed', insResp.status, await insResp.text().catch(() => ''));
      return L.sendJson(res, 500, { error: 'brief_insert_failed' });
    }
    const created = await insResp.json();
    const created0 = Array.isArray(created) ? created[0] : created;
    const briefId = created0 && created0.id;
    if (!briefId) {
      console.error('brief insert returned no id', created);
      return L.sendJson(res, 500, { error: 'brief_insert_failed' });
    }

    // Payment Link not configured yet: the brief exists, but there's nowhere to
    // pay. Tell the frontend so it can show "payment not configured yet".
    const link = process.env.STRIPE_PAYMENT_LINK_URL;
    if (!link) return L.sendJson(res, 503, { error: 'payment_unconfigured', brief_id: briefId });

    // Carry the brief id as client_reference_id (the webhook reads it back to flip
    // exactly this brief) and prefill the email for a smoother Stripe checkout.
    const sep = link.indexOf('?') >= 0 ? '&' : '?';
    const url = link + sep
      + 'client_reference_id=' + encodeURIComponent(briefId)
      + '&prefilled_email=' + encodeURIComponent(s.email || '');

    return L.sendJson(res, 200, { url, brief_id: briefId });
  } catch (e) {
    console.error('checkout error', e);
    return L.sendJson(res, 500, { error: 'server_error' });
  }
};

// This project's routes have never parsed a body. Vercel MAY populate req.body
// for JSON; if not, read the stream. Tolerant of empty/garbage bodies.
async function readJson(req) {
  const raw = await L.readRawBody(req);
  if (!raw) return {};
  try { return JSON.parse(raw); } catch (e) { return {}; }
}
