'use strict';
// Env-shape diagnostics for the coach. Asserts not just presence but the SHAPE
// of every required env var — catches the classic paste-into-wrong-field bugs
// (e.g. the service_role JWT pasted into SUPABASE_URL). NEVER prints secret
// values. Coach-gated.
const L = require('../lib/api.js');

module.exports = async (req, res) => {
  const s = L.requireCoach(req, res);
  if (!s) return;

  // check(name, ok, badDetail) → {name, ok, detail}. detail is 'ok' when ok,
  // else the supplied reason ('missing' / 'wrong shape: ...'). No values leak.
  const check = (name, ok, badDetail) => ({ name, ok: !!ok, detail: ok ? 'ok' : badDetail });

  const checks = [];
  const v = (name) => process.env[name];

  // SUPABASE_URL: https origin, and NOT a JWT (catches URL/key field swap).
  {
    const val = v('SUPABASE_URL');
    if (!val) checks.push(check('SUPABASE_URL', false, 'missing'));
    else if (val.startsWith('eyJ')) checks.push(check('SUPABASE_URL', false, 'wrong shape: looks like a JWT, expected a URL'));
    else if (!val.startsWith('https://')) checks.push(check('SUPABASE_URL', false, 'wrong shape: must start with https://'));
    else checks.push(check('SUPABASE_URL', true));
  }

  // SUPABASE_SERVICE_ROLE_KEY: a JWT (starts eyJ).
  {
    const val = v('SUPABASE_SERVICE_ROLE_KEY');
    if (!val) checks.push(check('SUPABASE_SERVICE_ROLE_KEY', false, 'missing'));
    else if (!val.startsWith('eyJ')) checks.push(check('SUPABASE_SERVICE_ROLE_KEY', false, 'wrong shape: not a JWT (expected eyJ...)'));
    else checks.push(check('SUPABASE_SERVICE_ROLE_KEY', true));
  }

  // SESSION_SECRET: present, reasonably long.
  {
    const val = v('SESSION_SECRET');
    if (!val) checks.push(check('SESSION_SECRET', false, 'missing'));
    else if (val.length < 16) checks.push(check('SESSION_SECRET', false, 'wrong shape: too short (need >=16 chars)'));
    else checks.push(check('SESSION_SECRET', true));
  }

  // LinkedIn OAuth credentials: presence only.
  checks.push(check('LINKEDIN_CLIENT_ID', !!v('LINKEDIN_CLIENT_ID'), 'missing'));
  checks.push(check('LINKEDIN_CLIENT_SECRET', !!v('LINKEDIN_CLIENT_SECRET'), 'missing'));

  // COACH_LINKEDIN_SUB: present, non-empty.
  {
    const val = v('COACH_LINKEDIN_SUB');
    checks.push(check('COACH_LINKEDIN_SUB', !!(val && val.length), 'missing'));
  }

  // ANTHROPIC_API_KEY: presence only (never print the value).
  checks.push(check('ANTHROPIC_API_KEY', !!v('ANTHROPIC_API_KEY'), 'missing'));

  // STRIPE_SECRET_KEY: present, starts sk_.
  {
    const val = v('STRIPE_SECRET_KEY');
    if (!val) checks.push(check('STRIPE_SECRET_KEY', false, 'missing'));
    else if (!val.startsWith('sk_')) checks.push(check('STRIPE_SECRET_KEY', false, 'wrong shape: must start with sk_'));
    else checks.push(check('STRIPE_SECRET_KEY', true));
  }

  // STRIPE_WEBHOOK_SECRET: present, starts whsec_.
  {
    const val = v('STRIPE_WEBHOOK_SECRET');
    if (!val) checks.push(check('STRIPE_WEBHOOK_SECRET', false, 'missing'));
    else if (!val.startsWith('whsec_')) checks.push(check('STRIPE_WEBHOOK_SECRET', false, 'wrong shape: must start with whsec_'));
    else checks.push(check('STRIPE_WEBHOOK_SECRET', true));
  }

  // STRIPE_PAYMENT_LINK_URL: present, https.
  {
    const val = v('STRIPE_PAYMENT_LINK_URL');
    if (!val) checks.push(check('STRIPE_PAYMENT_LINK_URL', false, 'missing'));
    else if (!val.startsWith('https://')) checks.push(check('STRIPE_PAYMENT_LINK_URL', false, 'wrong shape: must start with https://'));
    else checks.push(check('STRIPE_PAYMENT_LINK_URL', true));
  }

  return L.sendJson(res, 200, { allOk: checks.every((c) => c.ok), checks });
};
