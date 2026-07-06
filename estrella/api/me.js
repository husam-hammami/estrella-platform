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

  // action=book-access&id=<book_id> — issue a short-lived signed download url for
  // an OWNED book. requireUser + ownership check, then a 60s signed url into the
  // PRIVATE `books` bucket (same signed-url mechanism as the CV download).
  if (params.get('action') === 'book-access') {
    return handleBookAccess(req, res, params);
  }

  // Services pivot — member-submitted requests that Nesreen personally reviews
  // and replies to from the coach desk. No AI replies to members.
  //   POST ?action=service-request  {service, payload, cv_path?} → 200 {request}
  //   GET  ?action=service-requests → 200 {requests:[...]} newest first
  if (params.get('action') === 'service-request') {
    return handleServiceRequest(req, res);
  }
  if (params.get('action') === 'service-requests') {
    return handleServiceRequestList(req, res);
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
  // De-duplicated list of books the user has paid for. Tolerant of fetch failure
  // (omit → empty array); never blocks the rest of the enrichment.
  const booksOwned = await ownedBookIds(user.sub);
  try {
    const path = `users?linkedin_sub=eq.${encodeURIComponent(user.sub)}&select=*&limit=1`;
    const resp = await L.sb(path);
    if (!resp.ok) return { ...user, booksOwned };
    const rows = await resp.json();
    const row = rows && rows[0];
    if (!row) return { ...user, booksOwned };
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
      studioResults: row.studio_results || null,
      booksOwned,
    });
  } catch (e) {
    return { ...user, booksOwned };
  }
}

// The de-duplicated book_ids this user has paid for. Returns [] on any failure.
async function ownedBookIds(sub) {
  if (!sub || !L.sbConfigured()) return [];
  try {
    const resp = await L.sb(`book_entitlements?user_sub=eq.${encodeURIComponent(sub)}&select=book_id`);
    if (!resp.ok) return [];
    const rows = await resp.json();
    if (!Array.isArray(rows)) return [];
    return Array.from(new Set(rows.map((r) => r && r.book_id).filter(Boolean)));
  } catch (e) {
    return [];
  }
}

// Signed-download handler for an owned book. Mirrors the CV download signing:
// POST /storage/v1/object/sign/<bucket>/<path> with the service-role key → a
// relative signedURL we absolutize. 60s expiry.
async function handleBookAccess(req, res, params) {
  const s = L.requireUser(req, res);
  if (!s) return;
  if (!L.sbConfigured()) return L.sendJson(res, 503, { error: 'supabase_unconfigured' });

  const bookId = String(params.get('id') || '');
  const book = L.BOOK_CATALOG[bookId];
  if (!book) return L.sendJson(res, 400, { error: 'unknown_book' });

  try {
    // Verify a paid entitlement exists for (this user, this book).
    const owned = await L.sb(
      `book_entitlements?user_sub=eq.${encodeURIComponent(s.sub)}&book_id=eq.${encodeURIComponent(bookId)}&select=id&limit=1`
    );
    if (!owned.ok) return L.sendJson(res, 502, { error: 'supabase_error' });
    const rows = await owned.json();
    if (!Array.isArray(rows) || rows.length === 0) return L.sendJson(res, 403, { error: 'not_owned' });

    // Owned → sign a 60s download url into the PRIVATE `books` bucket.
    const base = process.env.SUPABASE_URL.replace(/\/$/, '');
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const signResp = await fetch(`${base}/storage/v1/object/sign/books/${book.file}`, {
      method: 'POST',
      headers: { apikey: key, Authorization: `Bearer ${key}`, 'content-type': 'application/json' },
      body: JSON.stringify({ expiresIn: 60 }),
    });
    if (!signResp.ok) {
      const text = await signResp.text().catch(() => '');
      console.error('book-access sign failed', signResp.status, text);
      // 404 from Storage means the object isn't uploaded yet; surface honestly.
      if (signResp.status === 404) return L.sendJson(res, 404, { error: 'file_missing' });
      return L.sendJson(res, 502, { error: 'storage_error' });
    }
    const signed = await signResp.json();
    const relative = signed.signedURL || signed.url || '';
    const url = `${base}/storage/v1${relative.startsWith('/') ? '' : '/'}${relative}`;

    // The books were uploaded with a text/plain content-type, so opening the raw
    // signed url shows HTML source (and mojibakes the em-dashes). view=1 streams
    // the file back through the function with the correct type so it renders.
    // Books are small HTML — safe to proxy.
    if (params.get('view') === '1') {
      const fileResp = await fetch(url);
      if (!fileResp.ok) return L.sendJson(res, 502, { error: 'storage_error' });
      const html = await fileResp.text();
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.setHeader('Cache-Control', 'private, no-store');
      res.setHeader('X-Content-Type-Options', 'nosniff');
      return res.end(html);
    }

    return L.sendJson(res, 200, { url });
  } catch (e) {
    console.error('book-access error', e);
    return L.sendJson(res, 500, { error: 'server_error' });
  }
}

// The three human-reviewed services a member can request. Nesreen reads every
// request herself and replies from the coach desk.
const SERVICE_IDS = ['cv_review', 'linkedin_review', 'roadmap'];

// POST /api/me?action=service-request — validate + clamp per service, refuse a
// second submission while one is still pending (status='submitted'), insert the
// row with the session's identity copied in. 401 | 503 | 400 | 409 | 200.
async function handleServiceRequest(req, res) {
  const s = L.requireUser(req, res);
  if (!s) return;
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return L.sendJson(res, 405, { error: 'method_not_allowed' });
  }
  if (!L.sbConfigured()) return L.sendJson(res, 503, { error: 'supabase_unconfigured' });

  let body;
  try { body = await readJson(req); } catch (e) { return L.sendJson(res, 400, { error: 'bad_request' }); }
  const service = cleanString(body.service, 40);
  if (!SERVICE_IDS.includes(service)) return L.sendJson(res, 400, { error: 'bad_request' });

  const rawPayload = (body.payload && typeof body.payload === 'object' && !Array.isArray(body.payload))
    ? body.payload : {};
  const payload = {};
  let cvPath = null;

  if (service === 'cv_review') {
    // cv_path REQUIRED and only a path under THIS user's storage prefix with no
    // empty or dot segments (traversal guard — mirrors api/cv-parse.js).
    cvPath = cleanString(body.cv_path, 300);
    const segs = cvPath.split('/');
    const safe = cvPath
      && segs.length >= 2
      && segs[0] === s.sub
      && !segs.some((seg) => seg === '' || seg === '.' || seg === '..');
    if (!safe) return L.sendJson(res, 400, { error: 'bad_request' });
    const note = cleanString(rawPayload.note, 2000);
    if (note) payload.note = note;
  } else if (service === 'linkedin_review') {
    const profileUrl = cleanString(rawPayload.profile_url, 300);
    const okUrl = profileUrl.startsWith('https://www.linkedin.com/')
      || profileUrl.startsWith('https://linkedin.com/');
    if (!profileUrl || !okUrl) return L.sendJson(res, 400, { error: 'bad_request' });
    payload.profile_url = profileUrl;
    const focus = cleanString(rawPayload.focus, 2000);
    if (focus) payload.focus = focus;
  } else { // roadmap
    const currentRole = cleanString(rawPayload.current_role, 200);
    const ambition = cleanString(rawPayload.ambition, 2000);
    if (!currentRole || !ambition) return L.sendJson(res, 400, { error: 'bad_request' });
    payload.current_role = currentRole;
    payload.ambition = ambition;
    const years = cleanString(
      typeof rawPayload.years === 'number' ? String(rawPayload.years) : rawPayload.years, 40
    );
    if (years) payload.years = years;
    const constraints = cleanString(rawPayload.constraints, 2000);
    if (constraints) payload.constraints = constraints;
  }

  try {
    // One pending request per (user, service): 409 while a 'submitted' row exists.
    const pending = await L.sb(
      `service_requests?user_sub=eq.${encodeURIComponent(s.sub)}`
      + `&service=eq.${encodeURIComponent(service)}&status=eq.submitted&select=id&limit=1`
    );
    if (!pending.ok) {
      console.error('service-request pending check failed', pending.status, await pending.text().catch(() => ''));
      return L.sendJson(res, 502, { error: 'supabase_error' });
    }
    const pRows = await pending.json().catch(() => []);
    if (Array.isArray(pRows) && pRows.length) return L.sendJson(res, 409, { error: 'already_pending' });

    const insert = await L.sb('service_requests', {
      method: 'POST',
      headers: { Prefer: 'return=representation' },
      body: JSON.stringify({
        user_sub: s.sub,
        user_name: cleanString(s.name, 160) || null,
        user_email: cleanString(s.email, 160) || null,
        service,
        payload,
        cv_path: cvPath,
      }),
    });
    if (!insert.ok) {
      console.error('service-request insert failed', insert.status, await insert.text().catch(() => ''));
      return L.sendJson(res, 502, { error: 'supabase_error' });
    }
    const rows = await insert.json().catch(() => []);
    const request = (Array.isArray(rows) ? rows[0] : rows) || null;
    return L.sendJson(res, 200, { request });
  } catch (e) {
    console.error('service-request error', e);
    return L.sendJson(res, 500, { error: 'server_error' });
  }
}

// GET /api/me?action=service-requests — this member's own requests, newest
// first, including Nesreen's reply when present. 401 | 503 | 200.
async function handleServiceRequestList(req, res) {
  const s = L.requireUser(req, res);
  if (!s) return;
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return L.sendJson(res, 405, { error: 'method_not_allowed' });
  }
  if (!L.sbConfigured()) return L.sendJson(res, 503, { error: 'supabase_unconfigured' });
  try {
    const resp = await L.sb(
      `service_requests?user_sub=eq.${encodeURIComponent(s.sub)}`
      + '&select=id,service,status,payload,cv_path,response,responded_at,created_at'
      + '&order=created_at.desc'
    );
    if (!resp.ok) {
      console.error('service-requests list failed', resp.status, await resp.text().catch(() => ''));
      return L.sendJson(res, 502, { error: 'supabase_error' });
    }
    const rows = await resp.json().catch(() => []);
    return L.sendJson(res, 200, { requests: Array.isArray(rows) ? rows : [] });
  } catch (e) {
    console.error('service-requests error', e);
    return L.sendJson(res, 500, { error: 'server_error' });
  }
}

async function persistUserPatch(user, body) {
  if (!user || !user.sub || !L.sbConfigured()) return;
  const patch = { last_seen_at: new Date().toISOString() };
  if (body && body.cvPath) {
    // Belt-and-braces vs path traversal: only persist a storage path of the
    // expected '<this user's sub>/<file>' shape with no empty or dot segments.
    // A stored 'sub/../victim/file.pdf' would later defeat prefix checks in
    // the CV download endpoints once URL parsing collapses the dot-segments.
    const cvPath = cleanString(body.cvPath, 300);
    const segs = cvPath.split('/');
    const safe = segs.length >= 2
      && segs[0] === user.sub
      && !segs.some((seg) => seg === '' || seg === '.' || seg === '..');
    if (safe) patch.cv_path = cvPath;
  }
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
