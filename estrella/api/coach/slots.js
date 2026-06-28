'use strict';
// Coach desk: manage availability slots. GET lists all of this coach's slots;
// POST adds one; DELETE removes an unbooked one. Coach-gated on
// COACH_LINKEDIN_SUB (one level deeper → '../_lib.js').
const L = require('../_lib.js');

module.exports = async (req, res) => {
  const s = L.requireCoach(req, res);
  if (!s) return;
  if (!L.sbConfigured()) return L.sendJson(res, 503, { error: 'supabase_unconfigured' });

  const COACH = process.env.COACH_LINKEDIN_SUB;

  try {
    if (req.method === 'GET') {
      const path = `availability_slots?coach_sub=eq.${encodeURIComponent(COACH)}&order=slot_start&select=*`;
      const resp = await L.sb(path);
      if (!resp.ok) return L.sendJson(res, 502, { error: 'supabase_error' });
      const rows = await resp.json();
      return L.sendJson(res, 200, { slots: rows });
    }

    if (req.method === 'POST') {
      let b = '';
      for await (const c of req) b += c;
      const { slot_start, slot_end } = JSON.parse(b || '{}');
      if (!slot_start || !slot_end) return L.sendJson(res, 400, { error: 'missing_times' });
      const start = new Date(slot_start);
      const end = new Date(slot_end);
      if (isNaN(start) || isNaN(end) || end <= start) {
        return L.sendJson(res, 400, { error: 'invalid_times' });
      }

      const resp = await L.sb('availability_slots', {
        method: 'POST',
        headers: { Prefer: 'return=representation' },
        body: JSON.stringify({ coach_sub: COACH, slot_start, slot_end }),
      });
      if (!resp.ok) return L.sendJson(res, 502, { error: 'supabase_error' });
      const rows = await resp.json();
      return L.sendJson(res, 200, { slot: rows[0] });
    }

    if (req.method === 'DELETE') {
      const id = new URL(req.url, 'http://x').searchParams.get('id');
      if (!id) return L.sendJson(res, 400, { error: 'missing_id' });

      // Only delete an unbooked slot — never pull a slot out from under a client.
      const path = `availability_slots?id=eq.${encodeURIComponent(id)}`
        + `&coach_sub=eq.${encodeURIComponent(COACH)}`
        + `&booked_by_sub=is.null`;
      const resp = await L.sb(path, { method: 'DELETE' });
      if (!resp.ok) return L.sendJson(res, 502, { error: 'supabase_error' });
      return L.sendJson(res, 200, { deleted: true });
    }

    res.setHeader('Allow', 'GET, POST, DELETE');
    return L.sendJson(res, 405, { error: 'method_not_allowed' });
  } catch (e) {
    console.error('coach/slots error', e);
    return L.sendJson(res, 500, { error: 'server_error' });
  }
};
