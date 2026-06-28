'use strict';
// Shared helpers for the LinkedIn OAuth + Supabase user registry.
// Files in /api prefixed with _ are NOT treated as routes by Vercel — import-only.
const crypto = require('crypto');

const LINKEDIN = {
  authorize: 'https://www.linkedin.com/oauth/v2/authorization',
  token: 'https://www.linkedin.com/oauth/v2/accessToken',
  userinfo: 'https://api.linkedin.com/v2/userinfo',
  scope: 'openid profile email',
};

function env(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing required env var: ${name}`);
  return v;
}

// Absolute origin of this deployment, derived from the proxy headers Vercel sets.
// Avoids hardcoding the domain so preview + production both work.
function originOf(req) {
  const proto = (req.headers['x-forwarded-proto'] || 'https').split(',')[0].trim();
  const host = (req.headers['x-forwarded-host'] || req.headers.host || '').split(',')[0].trim();
  return `${proto}://${host}`;
}

function redirectUri(req) {
  return `${originOf(req)}/api/linkedin/callback`;
}

const b64url = (buf) => Buffer.from(buf).toString('base64url');

// ---- Signed, HttpOnly session cookie (stateless; no sessions table needed) ----
const COOKIE = 'estrella_session';
const STATE_COOKIE = 'estrella_oauth_state';

function sign(payloadStr) {
  return crypto.createHmac('sha256', env('SESSION_SECRET')).update(payloadStr).digest('base64url');
}

function makeSession(user) {
  const body = b64url(JSON.stringify(user));
  return `${body}.${sign(body)}`;
}

function readSession(token) {
  if (!token || token.indexOf('.') < 0) return null;
  const [body, sig] = token.split('.');
  const expected = sign(body);
  // constant-time compare
  if (sig.length !== expected.length) return null;
  if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null;
  try { return JSON.parse(Buffer.from(body, 'base64url').toString('utf8')); }
  catch (e) { return null; }
}

function parseCookies(req) {
  const out = {};
  const raw = req.headers.cookie;
  if (!raw) return out;
  raw.split(';').forEach((p) => {
    const i = p.indexOf('=');
    if (i < 0) return;
    out[p.slice(0, i).trim()] = decodeURIComponent(p.slice(i + 1).trim());
  });
  return out;
}

function setCookie(res, name, value, maxAgeSec) {
  const parts = [
    `${name}=${encodeURIComponent(value)}`,
    'Path=/',
    'HttpOnly',
    'Secure',
    'SameSite=Lax',
    `Max-Age=${maxAgeSec}`,
  ];
  appendHeader(res, 'Set-Cookie', parts.join('; '));
}

function clearCookie(res, name) {
  appendHeader(res, 'Set-Cookie', `${name}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`);
}

function appendHeader(res, key, value) {
  const prev = res.getHeader(key);
  if (!prev) res.setHeader(key, value);
  else res.setHeader(key, Array.isArray(prev) ? prev.concat(value) : [prev, value]);
}

// ---- Supabase user registry via PostgREST (no SDK dependency) ----
// Upsert on linkedin_sub so the same person maps to one row across sessions/devices.
async function upsertUser(profile) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return; // registry optional — sign-in still works without it
  const now = new Date().toISOString();
  const row = {
    linkedin_sub: profile.sub,
    name: profile.name || null,
    email: profile.email || null,
    photo_url: profile.picture || null,
    locale: typeof profile.locale === 'string' ? profile.locale : (profile.locale?.language || null),
    last_seen_at: now,
  };
  const endpoint = `${url.replace(/\/$/, '')}/rest/v1/users?on_conflict=linkedin_sub`;
  const resp = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: key,
      Authorization: `Bearer ${key}`,
      Prefer: 'resolution=merge-duplicates,return=minimal',
    },
    body: JSON.stringify(row),
  });
  if (!resp.ok) {
    const text = await resp.text().catch(() => '');
    console.error('Supabase upsert failed', resp.status, text);
  }
}

// ---- JSON response helper (consistent shape, no caching) ----
function sendJson(res, status, obj) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(obj));
}

// ---- Auth helpers (reuse the LinkedIn signed-cookie session) ----
// readSession takes the TOKEN STRING (not req). These wrap parseCookies→readSession
// and send 401/403 on failure. Return the session object, or null if it responded.
function requireUser(req, res) {
  const session = readSession(parseCookies(req)[COOKIE]);
  if (!session || !session.sub) { sendJson(res, 401, { error: 'not_signed_in' }); return null; }
  return session;
}

function requireCoach(req, res) {
  const session = requireUser(req, res);
  if (!session) return null;
  const coach = process.env.COACH_LINKEDIN_SUB;
  // Fails closed if COACH_LINKEDIN_SUB is unset (nobody matches undefined).
  if (!coach || session.sub !== coach) { sendJson(res, 403, { error: 'not_authorized' }); return null; }
  return session;
}

// ---- Supabase PostgREST helper (service_role; server-only) ----
function sbConfigured() {
  return !!(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}
// Returns the raw fetch Response for `${SUPABASE_URL}/rest/v1/${path}`.
// Throws 'supabase_not_configured' so callers can convert to a clean 503.
async function sb(path, opts = {}) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('supabase_not_configured');
  const headers = {
    apikey: key,
    Authorization: `Bearer ${key}`,
    'Content-Type': 'application/json',
    ...(opts.headers || {}),
  };
  return fetch(`${url.replace(/\/$/, '')}/rest/v1/${path}`, { ...opts, headers });
}

// ---- Raw request body (for the Stripe webhook signature check) ----
// This project's other routes never read a body; the webhook needs the exact
// raw bytes, so read the stream manually (no req.rawBody guarantee on Vercel).
function readRawBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (c) => { data += c; });
    req.on('end', () => resolve(data));
    req.on('error', reject);
  });
}

module.exports = {
  LINKEDIN, env, originOf, redirectUri, b64url,
  COOKIE, STATE_COOKIE,
  makeSession, readSession, parseCookies, setCookie, clearCookie,
  upsertUser, crypto,
  sendJson, requireUser, requireCoach, sbConfigured, sb, readRawBody,
};
