'use strict';
// Returns the signed-in user from the session cookie, or 401. The frontend calls
// this on load to restore the session after a LinkedIn round-trip.
const L = require('../lib/api.js');

module.exports = async (req, res) => {
  const params = new URL(req.url, 'http://x').searchParams;
  if (params.get('action') === 'logout') {
    L.clearCookie(res, L.COOKIE);
    res.statusCode = 302;
    res.setHeader('Location', '/');
    res.end();
    return;
  }

  const cookies = L.parseCookies(req);
  const user = L.readSession(cookies[L.COOKIE]);
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  if (!user) { res.statusCode = 401; res.end(JSON.stringify({ user: null })); return; }

  if (req.method === 'PATCH') {
    try {
      const body = await readJson(req);
      const updated = normalizeUser({
        ...user,
        cvPath: cleanString(body.cvPath, 300) || user.cvPath || null,
        cvName: cleanString(body.cvName, 160) || user.cvName || null,
        cvUploadedAt: cleanString(body.cvUploadedAt, 80) || user.cvUploadedAt || null,
      });
      L.setCookie(res, L.COOKIE, L.makeSession(updated), 60 * 60 * 24 * 30);
      res.statusCode = 200;
      res.end(JSON.stringify({ user: updated }));
      return;
    } catch (e) {
      res.statusCode = 400;
      res.end(JSON.stringify({ error: 'bad_request' }));
      return;
    }
  }

  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET, PATCH');
    res.statusCode = 405;
    res.end(JSON.stringify({ error: 'method_not_allowed' }));
    return;
  }

  const out = await enrichUser(normalizeUser(user));
  res.statusCode = 200;
  res.end(JSON.stringify({ user: out }));
};

function normalizeUser(user) {
  if (!user) return null;
  const photoUrl = user.photoUrl || user.picture || user.photo_url || user.avatar_url || null;
  return {
    ...user,
    photoUrl,
    picture: user.picture || photoUrl,
  };
}

async function enrichUser(user) {
  if (!user || user.photoUrl || !user.sub || !L.sbConfigured()) return user;
  try {
    const path = `users?linkedin_sub=eq.${encodeURIComponent(user.sub)}&select=photo_url&limit=1`;
    const resp = await L.sb(path);
    if (!resp.ok) return user;
    const rows = await resp.json();
    const photo = rows && rows[0] && rows[0].photo_url;
    return photo ? normalizeUser({ ...user, photoUrl: photo, picture: photo }) : user;
  } catch (e) {
    return user;
  }
}

async function readJson(req) {
  const raw = await L.readRawBody(req);
  if (!raw) return {};
  return JSON.parse(raw);
}

function cleanString(v, max) {
  if (typeof v !== 'string') return '';
  return v.trim().slice(0, max);
}
