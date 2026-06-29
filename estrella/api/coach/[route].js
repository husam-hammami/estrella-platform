'use strict';
// Single coach API dispatcher. Keeps the public `/api/coach/*` URLs while
// counting as one Vercel function on the Hobby plan.
const availability = require('../availability.js');
const briefs = require('../briefs.js');
const cvUploadUrl = require('../cv-upload-url.js');
const L = require('../../lib/api.js');

const ROUTES = {
  slots: { handler: availability, marker: ['coach', 'slots'] },
  briefs: { handler: briefs, marker: ['coach', 'briefs'] },
  'cv-url': { handler: cvUploadUrl, marker: ['coach', 'cv-url'] },
  users: { handler: coachUsers },
  integrations: { handler: coachIntegrations },
  connect: { handler: coachConnect },
};

module.exports = async (req, res) => {
  const url = new URL(req.url, 'http://x');
  const route = decodeURIComponent(url.pathname.split('/').filter(Boolean).pop() || '');
  const target = ROUTES[route];

  if (!target) return L.sendJson(res, 404, { error: 'not_found' });

  if (target.marker) url.searchParams.set(target.marker[0], target.marker[1]);
  req.url = `${url.pathname}${url.search}`;
  return target.handler(req, res);
};

async function coachUsers(req, res) {
  const session = L.requireCoach(req, res);
  if (!session) return;
  if (!L.sbConfigured()) return L.sendJson(res, 503, { error: 'supabase_unconfigured' });
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return L.sendJson(res, 405, { error: 'method_not_allowed' });
  }

  const coachSub = process.env.COACH_LINKEDIN_SUB;
  try {
    const [usersResp, briefsResp, slotsResp] = await Promise.all([
      L.sb('users?select=*&order=last_seen_at.desc'),
      L.sb(`briefs?coach_sub=eq.${encodeURIComponent(coachSub)}&select=*&order=created_at.desc`),
      L.sb(`availability_slots?coach_sub=eq.${encodeURIComponent(coachSub)}&select=*&order=slot_start.desc`),
    ]);

    if (!usersResp.ok || !briefsResp.ok || !slotsResp.ok) {
      const detail = await Promise.all([
        usersResp.ok ? '' : usersResp.text().catch(() => ''),
        briefsResp.ok ? '' : briefsResp.text().catch(() => ''),
        slotsResp.ok ? '' : slotsResp.text().catch(() => ''),
      ]);
      console.error('coach/users supabase error', {
        users: usersResp.status,
        briefs: briefsResp.status,
        slots: slotsResp.status,
        detail,
      });
      return L.sendJson(res, 502, { error: 'supabase_error' });
    }

    const [rawUsers, rawBriefs, rawSlots] = await Promise.all([
      usersResp.json(),
      briefsResp.json(),
      slotsResp.json(),
    ]);

    const users = Array.isArray(rawUsers) ? rawUsers : [];
    const briefs = Array.isArray(rawBriefs) ? rawBriefs : [];
    const slots = Array.isArray(rawSlots) ? rawSlots : [];
    const slotsById = new Map(slots.map((slot) => [String(slot.id), slot]));
    const briefsBySub = new Map();
    briefs.forEach((brief) => {
      const sub = brief.client_sub || '';
      if (!sub) return;
      if (!briefsBySub.has(sub)) briefsBySub.set(sub, []);
      briefsBySub.get(sub).push(brief);
    });

    const seen = new Set();
    const rows = users
      .filter((user) => user.linkedin_sub && user.linkedin_sub !== coachSub)
      .map((user) => {
        seen.add(user.linkedin_sub);
        return coachUserRow(user, briefsBySub.get(user.linkedin_sub) || [], slotsById);
      });

    briefs.forEach((brief) => {
      const sub = brief.client_sub;
      if (!sub || sub === coachSub || seen.has(sub)) return;
      seen.add(sub);
      rows.push(coachUserRow({
        linkedin_sub: sub,
        name: brief.client_name,
        email: brief.client_email,
        photo_url: null,
        created_at: brief.created_at,
        last_seen_at: brief.updated_at || brief.created_at,
      }, briefsBySub.get(sub) || [brief], slotsById));
    });

    rows.sort((a, b) => new Date(b.lastSeenAt || b.createdAt || 0) - new Date(a.lastSeenAt || a.createdAt || 0));
    const totals = {
      users: rows.length,
      activeLearners: rows.filter((row) => (row.academy.done || row.library.done)).length,
      booked: rows.filter((row) => row.booking && row.booking.status !== 'none').length,
      toReview: briefs.filter((brief) => !brief.coach_reviewed).length,
    };

    return L.sendJson(res, 200, { users: rows, totals });
  } catch (e) {
    console.error('coach/users error', e);
    return L.sendJson(res, 500, { error: 'server_error' });
  }
}

function coachUserRow(user, briefs, slotsById) {
  const sortedBriefs = (briefs || []).slice().sort((a, b) => (
    new Date(b.updated_at || b.created_at || 0) - new Date(a.updated_at || a.created_at || 0)
  ));
  const latestBrief = sortedBriefs[0] || null;
  const bookedBrief = sortedBriefs.find((brief) => (
    brief.status === 'session_scheduled'
    || brief.status === 'completed'
    || brief.payment_status === 'paid'
    || brief.payment_status === 'pending'
  )) || latestBrief;
  const slot = bookedBrief && bookedBrief.slot_id ? slotsById.get(String(bookedBrief.slot_id)) : null;
  const booking = coachBooking(bookedBrief, slot);
  const academy = normalizeProgress(user.academy_progress, 82);
  const library = normalizeProgress(user.library_progress, 4);
  return {
    linkedinSub: user.linkedin_sub || (latestBrief && latestBrief.client_sub) || null,
    name: user.name || (latestBrief && latestBrief.client_name) || 'Unnamed member',
    email: user.email || (latestBrief && latestBrief.client_email) || null,
    photoUrl: user.photo_url || user.photoUrl || null,
    createdAt: user.created_at || null,
    lastSeenAt: user.last_seen_at || null,
    academy,
    library,
    cv: {
      name: user.cv_name || null,
      uploadedAt: user.cv_uploaded_at || null,
      hasCv: !!(user.cv_path || user.cv_name || (latestBrief && latestBrief.cv_path)),
    },
    booking,
    briefs: {
      total: sortedBriefs.length,
      toReview: sortedBriefs.filter((brief) => !brief.coach_reviewed).length,
      latestId: latestBrief && latestBrief.id,
      latestGoal: latestBrief && latestBrief.goal,
      latestRole: latestBrief && latestBrief.role,
    },
  };
}

function coachBooking(brief, slot) {
  if (!brief) return { status: 'none', label: 'No booking yet', provider: null, when: null };
  const when = brief.scheduled_start || brief.slot_start || (slot && slot.slot_start) || brief.paid_at || brief.created_at || null;
  const provider = (brief.calendly_event_uri || brief.calendly_join_url) ? 'Calendly' : 'Nuria booking';
  if (brief.status === 'completed') return { status: 'completed', label: 'Completed', provider, when };
  if (brief.status === 'session_scheduled') return { status: 'booked', label: 'Booked', provider, when };
  if (brief.status === 'needs_review') return { status: 'review', label: 'Booking needs review', provider, when };
  if (brief.status === 'awaiting_schedule' || (brief.payment_status === 'paid' && brief.status !== 'session_scheduled')) {
    return { status: 'paid', label: 'Paid \u00b7 awaiting scheduling', provider, when };
  }
  if (brief.payment_status === 'pending' || brief.status === 'pending_payment') return { status: 'pending', label: 'Pending payment', provider, when };
  return { status: brief.status || 'lead', label: brief.status || 'Brief started', provider, when };
}

function normalizeProgress(value, fallbackTotal) {
  const v = value && typeof value === 'object' ? value : {};
  const done = toInt(v.done != null ? v.done : v.completed, 0);
  const total = toInt(v.total, fallbackTotal);
  return {
    done: Math.max(0, done),
    total: Math.max(0, total || fallbackTotal),
    updatedAt: v.updatedAt || v.updated_at || null,
    last: v.lastLesson || v.last || null,
    opened: Array.isArray(v.opened) ? v.opened.slice(0, 50) : [],
  };
}

function toInt(value, fallback) {
  const n = Number(value);
  return Number.isFinite(n) ? Math.round(n) : fallback;
}

async function coachIntegrations(req, res) {
  const session = L.requireCoach(req, res);
  if (!session) return;
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return L.sendJson(res, 405, { error: 'method_not_allowed' });
  }

  const coachSub = process.env.COACH_LINKEDIN_SUB;
  const [calendly, stripe] = await Promise.all([
    L.getIntegration(coachSub, 'calendly'),
    L.getIntegration(coachSub, 'stripe'),
  ]);

  // "Configured" = the OAuth app credentials exist so the Connect button can work.
  // "Connected" = the coach has actually authorized (a row with the key fields).
  const calendlyConfigured = !!(process.env.CALENDLY_CLIENT_ID && process.env.CALENDLY_CLIENT_SECRET);
  const stripeConfigured = !!(process.env.STRIPE_CONNECT_CLIENT_ID && (process.env.STRIPE_SECRET_KEY || '').startsWith('sk_'));
  const calendlyConnected = !!(calendly && calendly.scheduling_url);
  const stripeConnected = !!(stripe && stripe.account_id);
  const maskAcct = (id) => (id ? `${String(id).slice(0, 8)}\u2026` : null);

  return L.sendJson(res, 200, {
    tools: {
      calendly: {
        label: 'Calendly',
        connected: calendlyConnected,
        status: calendlyConnected ? 'Connected' : (calendlyConfigured ? 'Not connected' : 'Needs setup'),
        note: calendlyConnected
          ? 'Scheduling is live on your Calendly.'
          : (calendlyConfigured ? 'Click Connect to authorize Calendly.' : 'Add CALENDLY_CLIENT_ID/SECRET in Vercel, then connect.'),
        account: calendlyConnected ? calendly.scheduling_url : null,
        canConnect: calendlyConfigured,
        connectUrl: '/api/coach/connect?tool=calendly',
        dashboardUrl: 'https://calendly.com/event_types/user/me',
      },
      stripe: {
        label: 'Stripe',
        connected: stripeConnected,
        status: stripeConnected
          ? (stripe.status === 'onboarding' ? 'Finish onboarding' : 'Connected')
          : (stripeConfigured ? 'Not connected' : 'Needs setup'),
        note: stripeConnected
          ? `Payouts to ${maskAcct(stripe.account_id)}`
          : (stripeConfigured ? 'Click Connect to link your Stripe account.' : 'Add STRIPE_CONNECT_CLIENT_ID + STRIPE_SECRET_KEY in Vercel, then connect.'),
        account: maskAcct(stripe && stripe.account_id),
        canConnect: stripeConfigured,
        connectUrl: '/api/coach/connect?tool=stripe',
        dashboardUrl: 'https://dashboard.stripe.com/dashboard',
      },
    },
  });
}

// Coach-only OAuth connect for Calendly + Stripe. Handles BOTH legs on the one
// registered redirect URI (/api/coach/connect): the start (?tool=…) and the
// provider callback (?code&state). Auth/CSRF failures REDIRECT to an error page
// (this is a top-level browser navigation — never emit JSON 403 here).
async function coachConnect(req, res) {
  const redirectErr = (msg) => { res.statusCode = 302; res.setHeader('Location', `/?connect_error=${encodeURIComponent(msg)}#admin`); res.end(); };
  const redirectOk = (provider) => { res.statusCode = 302; res.setHeader('Location', `/?connect=${encodeURIComponent(provider)}#admin`); res.end(); };

  const sess = L.readSession(L.parseCookies(req)[L.COOKIE]);
  const coachSub = process.env.COACH_LINKEDIN_SUB;
  if (!sess || !sess.sub || !coachSub || sess.sub !== coachSub) return redirectErr('not_authorized');
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return L.sendJson(res, 405, { error: 'method_not_allowed' });
  }

  const params = new URL(req.url, 'http://x').searchParams;
  const code = params.get('code');
  const stateParam = params.get('state');
  const oauthError = params.get('error');
  if (oauthError) return redirectErr(params.get('error_description') || oauthError);

  // ---- Callback leg: provider redirected back with ?code & ?state ----
  if (code || stateParam) {
    const cookieState = L.parseCookies(req)[L.CONNECT_STATE_COOKIE];
    if (!stateParam || !cookieState || stateParam !== cookieState) return redirectErr('state_mismatch');
    const st = L.readConnectState(stateParam);
    if (!st || !st.p) return redirectErr('bad_state');
    L.clearCookie(res, L.CONNECT_STATE_COOKIE);
    if (!code) return redirectErr('missing_code');
    try {
      if (st.p === 'calendly') return await finishCalendly(req, res, code, coachSub, redirectOk, redirectErr);
      if (st.p === 'stripe') return await finishStripe(req, res, code, coachSub, redirectOk, redirectErr);
      return redirectErr('unknown_tool');
    } catch (e) {
      console.error('connect callback error', e);
      return redirectErr('server_error');
    }
  }

  // ---- Start leg: ?tool=calendly|stripe → set CSRF state + redirect to provider ----
  const tool = params.get('tool');
  if (tool !== 'calendly' && tool !== 'stripe') return redirectErr('unknown_tool');
  try {
    const state = L.makeConnectState(tool);
    L.setCookie(res, L.CONNECT_STATE_COOKIE, state, 600); // 10 min to complete
    const redirectUri = L.connectRedirectUri(req);
    let authorizeUrl;
    if (tool === 'calendly') {
      authorizeUrl = `${L.CALENDLY.authorize}?` + new URLSearchParams({
        client_id: L.env('CALENDLY_CLIENT_ID'),
        response_type: 'code',
        redirect_uri: redirectUri,
        state,
      }).toString();
    } else {
      authorizeUrl = `${L.STRIPE_CONNECT.authorize}?` + new URLSearchParams({
        client_id: L.env('STRIPE_CONNECT_CLIENT_ID'),
        response_type: 'code',
        scope: 'read_write',
        redirect_uri: redirectUri,
        state,
      }).toString();
    }
    res.statusCode = 302;
    res.setHeader('Location', authorizeUrl);
    res.end();
  } catch (e) {
    console.error('connect start error', e && e.message);
    return redirectErr('not_configured');
  }
}

// Calendly: exchange code → store tokens + scheduling URL, subscribe to booking
// webhooks signed with our own key (stored encrypted).
async function finishCalendly(req, res, code, coachSub, redirectOk, redirectErr) {
  const tokResp = await fetch(L.CALENDLY.token, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: L.connectRedirectUri(req),
      client_id: L.env('CALENDLY_CLIENT_ID'),
      client_secret: L.env('CALENDLY_CLIENT_SECRET'),
    }).toString(),
  });
  if (!tokResp.ok) {
    console.error('calendly token exchange failed', tokResp.status, await tokResp.text().catch(() => ''));
    return redirectErr('calendly_token_failed');
  }
  const t = await tokResp.json();
  const accessToken = t.access_token;
  if (!accessToken) return redirectErr('calendly_no_token');

  const meResp = await fetch(`${L.CALENDLY.api}/users/me`, { headers: { Authorization: `Bearer ${accessToken}` } });
  if (!meResp.ok) {
    console.error('calendly users/me failed', meResp.status, await meResp.text().catch(() => ''));
    return redirectErr('calendly_user_failed');
  }
  const meRes = (await meResp.json()).resource || {};
  const userUri = meRes.uri || t.owner || null;
  const orgUri = meRes.current_organization || t.organization || null;
  const schedulingUrl = meRes.scheduling_url || null;

  // Subscribe to booking events. We supply the signing key so Calendly signs
  // payloads we can verify; 409 means a subscription already exists (re-connect).
  const signingKey = L.crypto.randomBytes(32).toString('hex');
  let webhookOk = false;
  try {
    const sub = await fetch(`${L.CALENDLY.api}/webhook_subscriptions`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: `${L.originOf(req)}/api/calendly/webhook`,
        events: ['invitee.created', 'invitee.canceled'],
        organization: orgUri,
        user: userUri,
        scope: 'user',
        signing_key: signingKey,
      }),
    });
    webhookOk = sub.ok || sub.status === 409;
    if (!sub.ok && sub.status !== 409) console.error('calendly webhook subscribe failed', sub.status, await sub.text().catch(() => ''));
  } catch (e) { console.error('calendly webhook subscribe error', e && e.message); }

  const saved = await L.saveIntegration(coachSub, 'calendly', {
    access_token_enc: L.encryptSecret(accessToken),
    refresh_token_enc: L.encryptSecret(t.refresh_token || null),
    token_expires_at: t.expires_in ? new Date(Date.now() + t.expires_in * 1000).toISOString() : null,
    account_id: userUri,
    organization_uri: orgUri,
    scheduling_url: schedulingUrl,
    webhook_signing_key_enc: webhookOk ? L.encryptSecret(signingKey) : null,
    status: 'connected',
    connected_at: new Date().toISOString(),
  });
  if (!saved.ok) {
    console.error('calendly save failed', saved.status, await saved.text().catch(() => ''));
    return redirectErr('calendly_save_failed');
  }
  return redirectOk('calendly');
}

// Stripe Connect (Standard): exchange code → store stripe_user_id. Ongoing calls
// use the platform key + { stripeAccount }, so the access token is stored but not
// required. charges_enabled drives the onboarding hint.
async function finishStripe(req, res, code, coachSub, redirectOk, redirectErr) {
  const Stripe = require('stripe');
  const stripe = new Stripe(L.env('STRIPE_SECRET_KEY'));
  let token;
  try {
    token = await stripe.oauth.token({ grant_type: 'authorization_code', code });
  } catch (e) {
    console.error('stripe oauth token failed', e && e.message);
    return redirectErr('stripe_token_failed');
  }
  const acct = token.stripe_user_id;
  if (!acct) return redirectErr('stripe_no_account');

  let chargesEnabled = null;
  try { chargesEnabled = !!(await stripe.accounts.retrieve(acct)).charges_enabled; } catch (e) { /* onboarding may still be finishing */ }

  const saved = await L.saveIntegration(coachSub, 'stripe', {
    access_token_enc: L.encryptSecret(token.access_token || null),
    refresh_token_enc: L.encryptSecret(token.refresh_token || null),
    account_id: acct,
    status: chargesEnabled === false ? 'onboarding' : 'connected',
    connected_at: new Date().toISOString(),
  });
  if (!saved.ok) {
    console.error('stripe save failed', saved.status, await saved.text().catch(() => ''));
    return redirectErr('stripe_save_failed');
  }
  return redirectOk('stripe');
}
