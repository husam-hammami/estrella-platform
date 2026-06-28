'use strict';
// The signed-in user's own briefs. Briefs are CREATED by api/checkout.js — this
// route is read-only: ?id=<uuid> returns one (ownership-checked, for the success
// page's status polling), otherwise lists the user's briefs newest-first.
const L = require('./_lib.js');

module.exports = async (req, res) => {
  const s = L.requireUser(req, res);
  if (!s) return;
  if (!L.sbConfigured()) return L.sendJson(res, 503, { error: 'supabase_unconfigured' });

  try {
    const id = new URL(req.url, 'http://x').searchParams.get('id');
    if (id) {
      // Single brief, gated on ownership (client_sub must match the session).
      const path = `briefs?id=eq.${encodeURIComponent(id)}&client_sub=eq.${encodeURIComponent(s.sub)}`;
      const resp = await L.sb(path);
      if (!resp.ok) return L.sendJson(res, 502, { error: 'supabase_error' });
      const rows = await resp.json();
      if (!rows.length) return L.sendJson(res, 404, { error: 'not_found' });
      return L.sendJson(res, 200, { brief: rows[0] });
    }
    // List the user's own briefs, newest first.
    const path = `briefs?client_sub=eq.${encodeURIComponent(s.sub)}&order=created_at.desc`;
    const resp = await L.sb(path);
    if (!resp.ok) return L.sendJson(res, 502, { error: 'supabase_error' });
    const rows = await resp.json();
    return L.sendJson(res, 200, { briefs: rows });
  } catch (e) {
    console.error('briefs error', e);
    return L.sendJson(res, 500, { error: 'server_error' });
  }
};
