'use strict';
// The signed-in user's own briefs. Briefs are CREATED by api/checkout.js — this
// route is read-only: ?id=<uuid> returns one (ownership-checked, for the success
// page's status polling), otherwise lists the user's briefs newest-first.
const L = require('../lib/api.js');

module.exports = async (req, res) => {
  const params = new URL(req.url, 'http://x').searchParams;
  if (params.get('coach') === 'briefs') {
    const s = L.requireCoach(req, res);
    if (!s) return;
    if (!L.sbConfigured()) return L.sendJson(res, 503, { error: 'supabase_unconfigured' });

    const COACH = process.env.COACH_LINKEDIN_SUB;

    try {
      if (req.method === 'GET') {
        const path = `briefs?coach_sub=eq.${encodeURIComponent(COACH)}&order=created_at.desc`;
        const resp = await L.sb(path);
        if (!resp.ok) return L.sendJson(res, 502, { error: 'supabase_error' });
        const rows = await resp.json();
        return L.sendJson(res, 200, { briefs: rows });
      }

      if (req.method === 'PATCH') {
        let b = '';
        for await (const c of req) b += c;
        const { id, coach_reviewed, coach_notes } = JSON.parse(b || '{}');
        if (!id) return L.sendJson(res, 400, { error: 'missing_id' });

        const patch = { updated_at: new Date().toISOString() };
        if (coach_reviewed !== undefined) patch.coach_reviewed = coach_reviewed;
        if (coach_notes !== undefined) patch.coach_notes = coach_notes;

        const path = `briefs?id=eq.${encodeURIComponent(id)}&coach_sub=eq.${encodeURIComponent(COACH)}`;
        const resp = await L.sb(path, {
          method: 'PATCH',
          headers: { Prefer: 'return=representation' },
          body: JSON.stringify(patch),
        });
        if (!resp.ok) return L.sendJson(res, 502, { error: 'supabase_error' });
        const rows = await resp.json();
        if (!rows.length) return L.sendJson(res, 404, { error: 'not_found' });
        return L.sendJson(res, 200, { brief: rows[0] });
      }

      res.setHeader('Allow', 'GET, PATCH');
      return L.sendJson(res, 405, { error: 'method_not_allowed' });
    } catch (e) {
      console.error('coach/briefs error', e);
      return L.sendJson(res, 500, { error: 'server_error' });
    }
  }

  const s = L.requireUser(req, res);
  if (!s) return;
  if (!L.sbConfigured()) return L.sendJson(res, 503, { error: 'supabase_unconfigured' });

  try {
    const id = params.get('id');
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
