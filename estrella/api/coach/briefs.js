'use strict';
// Coach desk: the coach's full queue of briefs, plus review updates.
// GET lists every brief assigned to this coach; PATCH marks one reviewed / adds
// notes. Coach-gated on COACH_LINKEDIN_SUB (one level deeper → '../_lib.js').
const L = require('../_lib.js');

module.exports = async (req, res) => {
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

      // Patch only the fields actually supplied, plus the update timestamp.
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
};
