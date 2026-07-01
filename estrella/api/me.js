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
      await persistUserPatch(updated, body);
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
  if (!user || !user.sub || !L.sbConfigured()) return user;
  try {
    const path = `users?linkedin_sub=eq.${encodeURIComponent(user.sub)}&select=*&limit=1`;
    const resp = await L.sb(path);
    if (!resp.ok) return user;
    const rows = await resp.json();
    const row = rows && rows[0];
    if (!row) return user;
    const photo = row.photo_url || user.photoUrl || user.picture;
    return normalizeUser({
      ...user,
      photoUrl: photo,
      picture: photo,
      cvPath: user.cvPath || row.cv_path || null,
      cvName: user.cvName || row.cv_name || null,
      cvUploadedAt: user.cvUploadedAt || row.cv_uploaded_at || null,
      academyProgress: row.academy_progress || user.academyProgress || null,
      libraryProgress: row.library_progress || user.libraryProgress || null,
    });
  } catch (e) {
    return user;
  }
}

async function persistUserPatch(user, body) {
  if (!user || !user.sub || !L.sbConfigured()) return;
  const patch = { last_seen_at: new Date().toISOString() };
  if (body && body.cvPath) patch.cv_path = cleanString(body.cvPath, 300);
  if (body && body.cvName) patch.cv_name = cleanString(body.cvName, 160);
  if (body && body.cvUploadedAt) patch.cv_uploaded_at = cleanString(body.cvUploadedAt, 80);

  // Progress is MONOTONIC. The dashboard syncs from browser-local state, so a
  // second device (or a browser with cleared localStorage) reports done:0 on load
  // and would otherwise overwrite the member's real, higher count — silent
  // cross-device data loss. Read the stored value first and only advance it:
  // never lower academy `done`, and union the library `opened` set so a book
  // opened on either device is never dropped. If we can't read the current row,
  // skip the progress write entirely rather than risk regressing it.
  const hasAcademy = body && body.academyProgress && typeof body.academyProgress === 'object';
  const hasLibrary = body && body.libraryProgress && typeof body.libraryProgress === 'object';
  if (hasAcademy || hasLibrary) {
    let current = null, readOk = false;
    try {
      const cur = await L.sb(`users?linkedin_sub=eq.${encodeURIComponent(user.sub)}&select=academy_progress,library_progress&limit=1`);
      if (cur.ok) { const rows = await cur.json(); current = (Array.isArray(rows) && rows[0]) || null; readOk = true; }
    } catch (e) { /* readOk stays false → skip the risky write below */ }

    if (hasAcademy && readOk) {
      const incoming = cleanProgress(body.academyProgress, 82);
      const curDone = Number(current && current.academy_progress && current.academy_progress.done) || 0;
      if (incoming.done >= curDone) patch.academy_progress = incoming; // advance only
    }
    if (hasLibrary && readOk) {
      const incoming = cleanProgress(body.libraryProgress, 4);
      const curLib = (current && current.library_progress) || {};
      const curOpened = Array.isArray(curLib.opened) ? curLib.opened : [];
      const opened = Array.from(new Set([...curOpened, ...(incoming.opened || [])])).slice(0, 50);
      incoming.opened = opened;
      incoming.done = Math.max(incoming.done, Number(curLib.done) || 0, opened.length);
      patch.library_progress = incoming;
    }
  }
  try {
    const resp = await L.sb(`users?linkedin_sub=eq.${encodeURIComponent(user.sub)}`, {
      method: 'PATCH',
      headers: { Prefer: 'return=minimal' },
      body: JSON.stringify(patch),
    });
    if (!resp.ok) {
      console.error('Supabase user profile patch failed', resp.status, await resp.text().catch(() => ''));
    }
  } catch (e) {
    console.error('Supabase user profile patch error', e);
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

function cleanProgress(value, fallbackTotal) {
  const out = {};
  const done = Number(value.done != null ? value.done : value.completed);
  const total = Number(value.total);
  out.done = Number.isFinite(done) ? Math.max(0, Math.round(done)) : 0;
  out.total = Number.isFinite(total) ? Math.max(0, Math.round(total)) : fallbackTotal;
  if (typeof value.lastLesson === 'string') out.lastLesson = value.lastLesson.slice(0, 120);
  if (typeof value.updatedAt === 'string') out.updatedAt = value.updatedAt.slice(0, 80);
  if (Array.isArray(value.opened)) out.opened = value.opened.filter((x) => typeof x === 'string').slice(0, 50);
  return out;
}
