'use strict';
// Public calendar: open slots for a given month. The calendar is shown BEFORE
// sign-in, so this route is unauthenticated. It returns ONLY id + times — never
// booked_by_sub or hold state — and a slot is "open" if it's unbooked or its
// hold has lapsed (booked_by_sub null, OR held_until in the past).
const L = require('../lib/api.js');

module.exports = async (req, res) => {
  const params = new URL(req.url, 'http://x').searchParams;
  if (params.get('coach') === 'slots') {
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
        const id = params.get('id');
        if (!id) return L.sendJson(res, 400, { error: 'missing_id' });

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
  }

  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return L.sendJson(res, 405, { error: 'method_not_allowed' });
  }
  if (!L.sbConfigured()) return L.sendJson(res, 503, { error: 'supabase_unconfigured' });

  const COACH = process.env.COACH_LINKEDIN_SUB;
  // No coach configured yet → empty calendar rather than an error.
  if (!COACH) return L.sendJson(res, 200, { slots: [] });

  try {
    // year + 0-indexed month (matches JS Date.getMonth()); default = current month.
    const now = new Date();
    let year = parseInt(params.get('year'), 10);
    let month = parseInt(params.get('month'), 10);
    if (!Number.isFinite(year)) year = now.getUTCFullYear();
    if (!Number.isFinite(month)) month = now.getUTCMonth();

    const monthStart = new Date(Date.UTC(year, month, 1)).toISOString();
    const monthEnd = new Date(Date.UTC(year, month + 1, 1)).toISOString();

    // Fetch the month's non-paid slots; the booked-OR-hold-expired OR can't be
    // expressed as a single PostgREST filter, so we filter in JS below.
    const path = `availability_slots?coach_sub=eq.${encodeURIComponent(COACH)}`
      + `&paid=eq.false`
      + `&slot_start=gte.${encodeURIComponent(monthStart)}`
      + `&slot_start=lt.${encodeURIComponent(monthEnd)}`
      + `&order=slot_start`
      + `&select=id,slot_start,slot_end,booked_by_sub,held_until`;
    const resp = await L.sb(path);
    if (!resp.ok) return L.sendJson(res, 502, { error: 'supabase_error' });
    const rows = await resp.json();

    const nowMs = Date.now();
    const open = rows.filter((s) =>
      !s.booked_by_sub || (s.held_until && new Date(s.held_until).getTime() < nowMs));

    return L.sendJson(res, 200, {
      slots: open.map((s) => ({ id: s.id, slot_start: s.slot_start, slot_end: s.slot_end })),
    });
  } catch (e) {
    console.error('availability error', e);
    return L.sendJson(res, 500, { error: 'server_error' });
  }
};
