'use strict';
// Public calendar: open slots for a given month. The calendar is shown BEFORE
// sign-in, so this route is unauthenticated. It returns ONLY id + times — never
// booked_by_sub or hold state — and a slot is "open" if it's unbooked or its
// hold has lapsed (booked_by_sub null, OR held_until in the past).
const L = require('./_lib.js');

module.exports = async (req, res) => {
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
    const params = new URL(req.url, 'http://x').searchParams;
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
