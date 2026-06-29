'use strict';
// Booking + payment kickoff for the signed-in user. POST creates the brief at
// booking time (NOT during anonymous screening) and opens a Stripe Checkout
// Session as a DESTINATION CHARGE on the coach's connected account. Scheduling
// happens AFTER payment on Calendly — there is no slot to hold here. This route
// NEVER marks anything paid; that is exclusively api/stripe/webhook.js's job.
const L = require('../lib/api.js');

const COACH = process.env.COACH_LINKEDIN_SUB;
const PRICE_AMOUNT = 50000; // AED 500.00, in the smallest currency unit (fils)
const PRICE_CURRENCY = 'aed';

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return L.sendJson(res, 405, { error: 'method_not_allowed' });
  }
  const s = L.requireUser(req, res);
  if (!s) return;
  if (!L.sbConfigured()) return L.sendJson(res, 503, { error: 'supabase_unconfigured' });
  if (!COACH) return L.sendJson(res, 503, { error: 'coach_unconfigured' });
  if (!process.env.STRIPE_SECRET_KEY) return L.sendJson(res, 503, { error: 'payment_unconfigured' });

  try {
    // Body: { brief:{identity,role,goal,obstacle,synthesis,strengths} }. The
    // screening output is held in the browser until booking; we accept ONLY the
    // screening fields here — identity columns come from the session below.
    const body = req.body && typeof req.body === 'object' ? req.body : await readJson(req);
    const brief = (body && body.brief && typeof body.brief === 'object') ? body.brief : {};

    // The coach must have connected Stripe (and finished onboarding) before anyone
    // can pay — charges land on her account via the connected-account transfer.
    const integ = await L.getIntegration(COACH, 'stripe');
    const acct = integ && integ.account_id;
    if (!acct || integ.status === 'onboarding') {
      return L.sendJson(res, 503, { error: 'payment_unconfigured' });
    }

    // Create the brief for the signed-in user. Identity (client_sub/name/email)
    // comes from the SESSION, never the request body — trust boundary. Screening
    // fields come from the browser-held brief. No slot_id: Calendly schedules later.
    const row = {
      client_sub: s.sub,
      client_name: s.name || null,
      client_email: s.email || null,
      coach_sub: COACH,
      status: 'pending_payment',
      payment_status: 'pending',
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

    // Destination charge: the session is created on the PLATFORM account so
    // checkout.session.completed lands on our existing webhook/secret, while funds
    // settle to the coach's connected account. client_reference_id carries the
    // brief id the webhook flips. Price is set inline (no pre-made Price needed).
    const origin = L.originOf(req);
    const Stripe = require('stripe');
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    let session;
    try {
      session = await stripe.checkout.sessions.create({
        mode: 'payment',
        line_items: [{
          quantity: 1,
          price_data: {
            currency: PRICE_CURRENCY,
            unit_amount: PRICE_AMOUNT,
            product_data: { name: 'Coaching session with Nesreen' },
          },
        }],
        payment_intent_data: {
          on_behalf_of: acct,
          transfer_data: { destination: acct },
        },
        client_reference_id: briefId,
        customer_email: s.email || undefined,
        metadata: { brief_id: briefId, client_sub: s.sub },
        success_url: `${origin}/?paid=1&brief=${encodeURIComponent(briefId)}`,
        cancel_url: `${origin}/?cancelled=1&brief=${encodeURIComponent(briefId)}`,
      });
    } catch (e) {
      console.error('stripe checkout session create failed', e && e.message);
      return L.sendJson(res, 502, { error: 'stripe_error', brief_id: briefId });
    }

    // Record the session id on the brief (matching + diagnostics). Best-effort.
    if (session && session.id) {
      const patch = await L.sb(`briefs?id=eq.${encodeURIComponent(briefId)}`, {
        method: 'PATCH',
        headers: { Prefer: 'return=minimal' },
        body: JSON.stringify({ stripe_checkout_session_id: session.id }),
      });
      if (!patch.ok) console.error('checkout: brief session-id patch failed', patch.status, await patch.text().catch(() => ''));
    }

    return L.sendJson(res, 200, { url: session.url, brief_id: briefId });
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
