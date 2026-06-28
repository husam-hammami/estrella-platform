'use strict';
// Phase 2b — coach-only "View CV". Returns a short-lived Supabase Storage signed
// DOWNLOAD url for a brief's cv_path. Coach-gated on COACH_LINKEDIN_SUB and scoped
// to briefs assigned to this coach (coach_sub). The CV object lives in a PRIVATE
// bucket and is never exposed via a public url. GET ?brief_id=<uuid> -> { url }.
const L = require('../_lib.js');

module.exports = async (req, res) => {
  const s = L.requireCoach(req, res);
  if (!s) return;
  if (!L.sbConfigured()) return L.sendJson(res, 503, { error: 'supabase_unconfigured' });

  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return L.sendJson(res, 405, { error: 'method_not_allowed' });
  }

  const COACH = process.env.COACH_LINKEDIN_SUB;

  try {
    const briefId = new URL(req.url, 'http://x').searchParams.get('brief_id');
    if (!briefId) return L.sendJson(res, 400, { error: 'missing_brief_id' });

    // Fetch the brief's cv_path, scoped to this coach's queue.
    const path = `briefs?id=eq.${encodeURIComponent(briefId)}&coach_sub=eq.${encodeURIComponent(COACH)}&select=cv_path`;
    const resp = await L.sb(path);
    if (!resp.ok) return L.sendJson(res, 502, { error: 'supabase_error' });
    const rows = await resp.json();
    if (!rows.length || !rows[0].cv_path) return L.sendJson(res, 404, { error: 'not_found' });

    const cvPath = rows[0].cv_path;
    const base = process.env.SUPABASE_URL.replace(/\/$/, '');
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

    // Supabase Storage REST: create a signed download url.
    // POST /storage/v1/object/sign/<bucket>/<objectPath> { expiresIn }
    //  -> { signedURL: "/object/sign/cvs/<objectPath>?token=..." }
    const signResp = await fetch(`${base}/storage/v1/object/sign/cvs/${cvPath}`, {
      method: 'POST',
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({ expiresIn: 120 }),
    });
    if (!signResp.ok) {
      const text = await signResp.text().catch(() => '');
      console.error('coach/cv-url sign failed', signResp.status, text);
      return L.sendJson(res, 502, { error: 'storage_error' });
    }
    const signed = await signResp.json();
    const relative = signed.signedURL || signed.url || '';
    const url = `${base}/storage/v1${relative.startsWith('/') ? '' : '/'}${relative}`;

    return L.sendJson(res, 200, { url });
  } catch (e) {
    console.error('coach/cv-url error', e);
    return L.sendJson(res, 500, { error: 'server_error' });
  }
};
