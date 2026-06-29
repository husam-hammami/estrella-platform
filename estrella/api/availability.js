'use strict';
// Public scheduling info: the coach's Calendly scheduling URL (the client books
// their paid session on it AFTER checkout). Calendly replaces the old custom
// Supabase calendar; the legacy coach slot CRUD (?coach=slots) is retired.
const L = require('../lib/api.js');

module.exports = async (req, res) => {
  const params = new URL(req.url, 'http://x').searchParams;

  // Legacy coach slot manager — retired. Calendly owns scheduling now.
  if (params.get('coach') === 'slots') {
    const s = L.requireCoach(req, res);
    if (!s) return;
    return L.sendJson(res, 410, { error: 'slots_retired', message: 'Scheduling is handled by Calendly.' });
  }

  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return L.sendJson(res, 405, { error: 'method_not_allowed' });
  }

  const COACH = process.env.COACH_LINKEDIN_SUB;
  if (!COACH) return L.sendJson(res, 200, { calendly_url: null, connected: false });

  try {
    const integ = await L.getIntegration(COACH, 'calendly');
    const url = integ && integ.scheduling_url ? integ.scheduling_url : null;
    return L.sendJson(res, 200, { calendly_url: url, connected: !!url });
  } catch (e) {
    console.error('availability error', e);
    return L.sendJson(res, 200, { calendly_url: null, connected: false });
  }
};
