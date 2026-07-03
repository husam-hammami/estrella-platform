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
async function upsertUser(profile, photoUrlOverride) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return; // registry optional — sign-in still works without it
  const now = new Date().toISOString();
  const photoUrl = photoUrlOverride || profilePhotoUrl(profile);
  const row = {
    linkedin_sub: profile.sub,
    name: profile.name || null,
    email: profile.email || null,
    photo_url: photoUrl,
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

function profilePhotoUrl(profile) {
  if (!profile || typeof profile !== 'object') return null;
  const direct = profile.picture || profile.photoUrl || profile.photo_url || profile.avatar_url || profile.avatar || profile.image;
  if (direct) return direct;
  const legacy = profile.profilePicture && profile.profilePicture['displayImage~'] && profile.profilePicture['displayImage~'].elements;
  if (Array.isArray(legacy) && legacy.length) {
    const best = legacy[legacy.length - 1];
    const id = best && best.identifiers && best.identifiers[0] && best.identifiers[0].identifier;
    if (id) return id;
  }
  return null;
}

// ---- Profile avatar proxy (durable, survives licdn signed-URL expiry) ----
// LinkedIn media.licdn.com URLs are signed and expire; the session token is not
// kept, so /api/me can't re-fetch. At sign-in we copy the picture once into the
// public `avatars` bucket and store that stable URL. Falls back to the raw licdn
// URL (or null) if storage is unavailable.
async function resolveAvatar(profile) {
  const src = profilePhotoUrl(profile);
  if (!src) return null;
  if (!sbConfigured() || !profile.sub) return src;
  try {
    const resp = await fetch(src, { redirect: 'follow' });
    if (!resp.ok) return src;
    const ct = (resp.headers.get('content-type') || 'image/jpeg').split(';')[0].trim();
    if (!/^image\//i.test(ct)) return src;
    const declared = Number(resp.headers.get('content-length') || 0);
    if (declared && declared > 4 * 1024 * 1024) return src; // don't buffer oversized
    const buf = Buffer.from(await resp.arrayBuffer());
    if (!buf.length || buf.length > 4 * 1024 * 1024) return src;
    const ext = ct.includes('png') ? 'png' : 'jpg';
    const objectPath = `${encodeURIComponent(profile.sub)}.${ext}`;
    const publicUrl = await storageUpload('avatars', objectPath, buf, ct);
    return publicUrl || src;
  } catch (e) {
    console.error('avatar proxy failed', e && e.message);
    return src;
  }
}

// Upload bytes to a Supabase Storage bucket via the REST API (service_role,
// upsert). Returns the public object URL, or null on failure.
async function storageUpload(bucket, objectPath, bytes, contentType) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  const base = url.replace(/\/$/, '');
  const resp = await fetch(`${base}/storage/v1/object/${bucket}/${objectPath}`, {
    method: 'POST',
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      'Content-Type': contentType || 'application/octet-stream',
      'x-upsert': 'true',
    },
    body: bytes,
  });
  if (!resp.ok) {
    console.error('storage upload failed', resp.status, await resp.text().catch(() => ''));
    return null;
  }
  return `${base}/storage/v1/object/public/${bucket}/${objectPath}`;
}

// ---- Provider integrations (Calendly OAuth/API, Stripe Connect OAuth) ----
const CALENDLY = {
  authorize: 'https://auth.calendly.com/oauth/authorize',
  token: 'https://auth.calendly.com/oauth/token',
  api: 'https://api.calendly.com',
};
const STRIPE_CONNECT = {
  authorize: 'https://connect.stripe.com/oauth/authorize',
  token: 'https://connect.stripe.com/oauth/token',
};
// Both providers share ONE registered redirect URI; the signed state carries the
// provider so the single coach/connect callback can disambiguate.
function connectRedirectUri(req) {
  return `${originOf(req)}/api/coach/connect`;
}

// ---- Signed connect-state (CSRF for the OAuth round-trip; carries provider) ----
// Distinct cookie from STATE_COOKIE so it never clobbers an in-flight LinkedIn login.
const CONNECT_STATE_COOKIE = 'estrella_connect_state';

function makeConnectState(provider) {
  const body = b64url(JSON.stringify({ p: provider, n: crypto.randomBytes(12).toString('hex'), t: Date.now() }));
  return `${body}.${sign(body)}`;
}
function readConnectState(token) {
  if (!token || token.indexOf('.') < 0) return null;
  const [body, sig] = token.split('.');
  const expected = sign(body);
  if (sig.length !== expected.length) return null;
  if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null;
  try { return JSON.parse(Buffer.from(body, 'base64url').toString('utf8')); }
  catch (e) { return null; }
}

// ---- Secret encryption at rest (AES-256-GCM; INTEGRATION_ENC_KEY = 32 bytes) ----
// Key accepts base64/base64url or 64-char hex. Output: iv.tag.ciphertext (base64url).
function encKey() {
  const raw = env('INTEGRATION_ENC_KEY').trim();
  const buf = /^[0-9a-fA-F]{64}$/.test(raw)
    ? Buffer.from(raw, 'hex')
    : Buffer.from(raw.replace(/-/g, '+').replace(/_/g, '/'), 'base64');
  if (buf.length !== 32) throw new Error('INTEGRATION_ENC_KEY must decode to 32 bytes (base64 or 64-hex)');
  return buf;
}
function encryptSecret(plain) {
  if (plain == null || plain === '') return null;
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', encKey(), iv);
  const ct = Buffer.concat([cipher.update(String(plain), 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  return `${iv.toString('base64url')}.${tag.toString('base64url')}.${ct.toString('base64url')}`;
}
function decryptSecret(token) {
  if (!token || typeof token !== 'string' || token.split('.').length !== 3) return null;
  const [ivB, tagB, ctB] = token.split('.');
  try {
    const decipher = crypto.createDecipheriv('aes-256-gcm', encKey(), Buffer.from(ivB, 'base64url'));
    decipher.setAuthTag(Buffer.from(tagB, 'base64url'));
    return Buffer.concat([decipher.update(Buffer.from(ctB, 'base64url')), decipher.final()]).toString('utf8');
  } catch (e) { return null; }
}

// ---- coach_integrations registry (encrypted tokens; scoped to coach_sub) ----
async function getIntegration(coachSub, provider) {
  if (!sbConfigured() || !coachSub || !provider) return null;
  try {
    const path = `coach_integrations?coach_sub=eq.${encodeURIComponent(coachSub)}`
      + `&provider=eq.${encodeURIComponent(provider)}&select=*&limit=1`;
    const resp = await sb(path);
    if (!resp.ok) return null;
    const rows = await resp.json();
    return (Array.isArray(rows) && rows[0]) || null;
  } catch (e) { return null; }
}
async function saveIntegration(coachSub, provider, fields) {
  const row = Object.assign({ coach_sub: coachSub, provider, updated_at: new Date().toISOString() }, fields || {});
  return sb('coach_integrations?on_conflict=coach_sub,provider', {
    method: 'POST',
    headers: { Prefer: 'resolution=merge-duplicates,return=representation' },
    body: JSON.stringify(row),
  });
}

// ---- Book catalog (server-side source of truth; shared by checkout/webhook/me) ----
// Paid digital editions sold as a DIRECT charge on the platform's own Stripe
// account (books are Nesreen's own, not a coach destination charge). Flat AED 29.
// `file` is the exact object name in the PRIVATE `books` bucket (e.g. books/quiet.html).
const BOOK_CATALOG = {
  quiet:     { name: 'Quiet Power',           price_fils: 2900, file: 'quiet.html' },
  compass:   { name: 'Career Compass',        price_fils: 2900, file: 'compass.html' },
  interview: { name: 'The Interview Playbook', price_fils: 2900, file: 'interview.html' },
  reset:     { name: 'The Reset Journal',      price_fils: 2900, file: 'reset.html' },
};
const BOOK_CURRENCY = 'aed';

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
    // Collect Buffers and concat so a multibyte UTF-8 char split across TCP chunks
    // (e.g. an Arabic invitee name) can't corrupt the body and fail signature checks.
    const chunks = [];
    req.on('data', (c) => { chunks.push(Buffer.isBuffer(c) ? c : Buffer.from(c)); });
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

module.exports = {
  LINKEDIN, CALENDLY, STRIPE_CONNECT, env, originOf, redirectUri, connectRedirectUri, b64url,
  COOKIE, STATE_COOKIE, CONNECT_STATE_COOKIE,
  makeSession, readSession, parseCookies, setCookie, clearCookie,
  makeConnectState, readConnectState,
  encryptSecret, decryptSecret,
  getIntegration, saveIntegration, storageUpload, resolveAvatar,
  upsertUser, crypto,
  BOOK_CATALOG, BOOK_CURRENCY,
  sendJson, requireUser, requireCoach, sbConfigured, sb, readRawBody,
};
