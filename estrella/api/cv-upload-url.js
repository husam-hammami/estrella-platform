'use strict';
// Phase 2b — optional CV upload. Issues a short-lived Supabase Storage signed
// UPLOAD url so the browser can PUT a CV straight into the PRIVATE `cvs` bucket.
// The object path is chosen SERVER-SIDE from the session sub (never the body), so
// a client can't target another user's prefix. Ownership of the brief is verified
// before any url is issued. POST { brief_id, ext } -> { path, uploadUrl }.
const L = require('./_lib.js');

const ALLOWED_EXT = ['pdf', 'png', 'jpg', 'jpeg'];

module.exports = async (req, res) => {
  const s = L.requireUser(req, res);
  if (!s) return;
  if (!L.sbConfigured()) return L.sendJson(res, 503, { error: 'supabase_unconfigured' });

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return L.sendJson(res, 405, { error: 'method_not_allowed' });
  }

  try {
    let b = '';
    for await (const c of req) b += c;
    const { brief_id, ext } = JSON.parse(b || '{}');

    if (!brief_id) return L.sendJson(res, 400, { error: 'missing_brief_id' });
    const cleanExt = String(ext || '').toLowerCase();
    if (!ALLOWED_EXT.includes(cleanExt)) return L.sendJson(res, 400, { error: 'bad_ext' });

    // Verify the brief belongs to the caller before issuing any signed url.
    const ownPath = `briefs?id=eq.${encodeURIComponent(brief_id)}&client_sub=eq.${encodeURIComponent(s.sub)}&select=id`;
    const ownResp = await L.sb(ownPath);
    if (!ownResp.ok) return L.sendJson(res, 502, { error: 'supabase_error' });
    const rows = await ownResp.json();
    if (!rows.length) return L.sendJson(res, 403, { error: 'not_authorized' });

    // Path is derived from the SESSION sub, not the request body.
    const objectPath = `${s.sub}/${brief_id}.${cleanExt}`;

    // Supabase Storage REST: create a signed upload url (token-based PUT).
    // POST /storage/v1/object/upload/sign/<bucket>/<objectPath>
    //  -> { url: "/object/upload/sign/cvs/<objectPath>?token=..." }
    const base = process.env.SUPABASE_URL.replace(/\/$/, '');
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const signResp = await fetch(
      `${base}/storage/v1/object/upload/sign/cvs/${objectPath}`,
      {
        method: 'POST',
        headers: { apikey: key, Authorization: `Bearer ${key}` },
      }
    );
    if (!signResp.ok) {
      const text = await signResp.text().catch(() => '');
      console.error('cv-upload-url sign failed', signResp.status, text);
      return L.sendJson(res, 502, { error: 'storage_error' });
    }
    const signed = await signResp.json();
    // The returned `url` is relative to /storage/v1 (e.g.
    // "/object/upload/sign/cvs/<path>?token=..."). Build the absolute PUT url.
    const relative = signed.url || signed.signedURL || '';
    const uploadUrl = `${base}/storage/v1${relative.startsWith('/') ? '' : '/'}${relative}`;

    return L.sendJson(res, 200, { path: objectPath, uploadUrl });
  } catch (e) {
    console.error('cv-upload-url error', e);
    return L.sendJson(res, 500, { error: 'server_error' });
  }
};
