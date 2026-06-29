'use strict';
// Single coach API dispatcher. Keeps the public `/api/coach/*` URLs while
// counting as one Vercel function on the Hobby plan.
const availability = require('../availability.js');
const briefs = require('../briefs.js');
const cvUploadUrl = require('../cv-upload-url.js');
const L = require('../../lib/api.js');

const ROUTES = {
  slots: { handler: availability, marker: ['coach', 'slots'] },
  briefs: { handler: briefs, marker: ['coach', 'briefs'] },
  'cv-url': { handler: cvUploadUrl, marker: ['coach', 'cv-url'] },
  users: { handler: coachUsers },
};

module.exports = async (req, res) => {
  const url = new URL(req.url, 'http://x');
  const route = decodeURIComponent(url.pathname.split('/').filter(Boolean).pop() || '');
  const target = ROUTES[route];

  if (!target) return L.sendJson(res, 404, { error: 'not_found' });

  if (target.marker) url.searchParams.set(target.marker[0], target.marker[1]);
  req.url = `${url.pathname}${url.search}`;
  return target.handler(req, res);
};

async function coachUsers(req, res) {
  const session = L.requireCoach(req, res);
  if (!session) return;
  if (!L.sbConfigured()) return L.sendJson(res, 503, { error: 'supabase_unconfigured' });
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return L.sendJson(res, 405, { error: 'method_not_allowed' });
  }

  const coachSub = process.env.COACH_LINKEDIN_SUB;
  try {
    const [usersResp, briefsResp, slotsResp] = await Promise.all([
      L.sb('users?select=*&order=last_seen_at.desc'),
      L.sb(`briefs?coach_sub=eq.${encodeURIComponent(coachSub)}&select=*&order=created_at.desc`),
      L.sb(`availability_slots?coach_sub=eq.${encodeURIComponent(coachSub)}&select=*&order=slot_start.desc`),
    ]);

    if (!usersResp.ok || !briefsResp.ok || !slotsResp.ok) {
      const detail = await Promise.all([
        usersResp.ok ? '' : usersResp.text().catch(() => ''),
        briefsResp.ok ? '' : briefsResp.text().catch(() => ''),
        slotsResp.ok ? '' : slotsResp.text().catch(() => ''),
      ]);
      console.error('coach/users supabase error', {
        users: usersResp.status,
        briefs: briefsResp.status,
        slots: slotsResp.status,
        detail,
      });
      return L.sendJson(res, 502, { error: 'supabase_error' });
    }

    const [rawUsers, rawBriefs, rawSlots] = await Promise.all([
      usersResp.json(),
      briefsResp.json(),
      slotsResp.json(),
    ]);

    const users = Array.isArray(rawUsers) ? rawUsers : [];
    const briefs = Array.isArray(rawBriefs) ? rawBriefs : [];
    const slots = Array.isArray(rawSlots) ? rawSlots : [];
    const slotsById = new Map(slots.map((slot) => [String(slot.id), slot]));
    const briefsBySub = new Map();
    briefs.forEach((brief) => {
      const sub = brief.client_sub || '';
      if (!sub) return;
      if (!briefsBySub.has(sub)) briefsBySub.set(sub, []);
      briefsBySub.get(sub).push(brief);
    });

    const seen = new Set();
    const rows = users
      .filter((user) => user.linkedin_sub && user.linkedin_sub !== coachSub)
      .map((user) => {
        seen.add(user.linkedin_sub);
        return coachUserRow(user, briefsBySub.get(user.linkedin_sub) || [], slotsById);
      });

    briefs.forEach((brief) => {
      const sub = brief.client_sub;
      if (!sub || sub === coachSub || seen.has(sub)) return;
      seen.add(sub);
      rows.push(coachUserRow({
        linkedin_sub: sub,
        name: brief.client_name,
        email: brief.client_email,
        photo_url: null,
        created_at: brief.created_at,
        last_seen_at: brief.updated_at || brief.created_at,
      }, briefsBySub.get(sub) || [brief], slotsById));
    });

    rows.sort((a, b) => new Date(b.lastSeenAt || b.createdAt || 0) - new Date(a.lastSeenAt || a.createdAt || 0));
    const totals = {
      users: rows.length,
      activeLearners: rows.filter((row) => (row.academy.done || row.library.done)).length,
      booked: rows.filter((row) => row.booking && row.booking.status !== 'none').length,
      toReview: briefs.filter((brief) => !brief.coach_reviewed).length,
    };

    return L.sendJson(res, 200, { users: rows, totals });
  } catch (e) {
    console.error('coach/users error', e);
    return L.sendJson(res, 500, { error: 'server_error' });
  }
}

function coachUserRow(user, briefs, slotsById) {
  const sortedBriefs = (briefs || []).slice().sort((a, b) => (
    new Date(b.updated_at || b.created_at || 0) - new Date(a.updated_at || a.created_at || 0)
  ));
  const latestBrief = sortedBriefs[0] || null;
  const bookedBrief = sortedBriefs.find((brief) => (
    brief.status === 'session_scheduled'
    || brief.status === 'completed'
    || brief.payment_status === 'paid'
    || brief.payment_status === 'pending'
  )) || latestBrief;
  const slot = bookedBrief && bookedBrief.slot_id ? slotsById.get(String(bookedBrief.slot_id)) : null;
  const booking = coachBooking(bookedBrief, slot);
  const academy = normalizeProgress(user.academy_progress, 82);
  const library = normalizeProgress(user.library_progress, 4);
  return {
    linkedinSub: user.linkedin_sub || (latestBrief && latestBrief.client_sub) || null,
    name: user.name || (latestBrief && latestBrief.client_name) || 'Unnamed member',
    email: user.email || (latestBrief && latestBrief.client_email) || null,
    photoUrl: user.photo_url || user.photoUrl || null,
    createdAt: user.created_at || null,
    lastSeenAt: user.last_seen_at || null,
    academy,
    library,
    cv: {
      name: user.cv_name || null,
      uploadedAt: user.cv_uploaded_at || null,
      hasCv: !!(user.cv_path || user.cv_name || (latestBrief && latestBrief.cv_path)),
    },
    booking,
    briefs: {
      total: sortedBriefs.length,
      toReview: sortedBriefs.filter((brief) => !brief.coach_reviewed).length,
      latestId: latestBrief && latestBrief.id,
      latestGoal: latestBrief && latestBrief.goal,
      latestRole: latestBrief && latestBrief.role,
    },
  };
}

function coachBooking(brief, slot) {
  if (!brief) return { status: 'none', label: 'No booking yet', provider: null, when: null };
  const when = brief.slot_start || (slot && slot.slot_start) || brief.paid_at || brief.created_at || null;
  const provider = brief.calendly_event_url || brief.calendly_event_id ? 'Calendly' : 'Nuria booking';
  if (brief.status === 'completed') return { status: 'completed', label: 'Completed', provider, when };
  if (brief.status === 'session_scheduled' || brief.payment_status === 'paid') return { status: 'booked', label: 'Booked', provider, when };
  if (brief.payment_status === 'pending' || brief.status === 'pending_payment') return { status: 'pending', label: 'Pending payment', provider, when };
  return { status: brief.status || 'lead', label: brief.status || 'Brief started', provider, when };
}

function normalizeProgress(value, fallbackTotal) {
  const v = value && typeof value === 'object' ? value : {};
  const done = toInt(v.done != null ? v.done : v.completed, 0);
  const total = toInt(v.total, fallbackTotal);
  return {
    done: Math.max(0, done),
    total: Math.max(0, total || fallbackTotal),
    updatedAt: v.updatedAt || v.updated_at || null,
    last: v.lastLesson || v.last || null,
    opened: Array.isArray(v.opened) ? v.opened.slice(0, 50) : [],
  };
}

function toInt(value, fallback) {
  const n = Number(value);
  return Number.isFinite(n) ? Math.round(n) : fallback;
}
