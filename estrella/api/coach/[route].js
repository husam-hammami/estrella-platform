'use strict';
// Single coach API dispatcher. Keeps the public `/api/coach/*` URLs while
// counting as one Vercel function on the Hobby plan.
const availability = require('../availability.js');
const briefs = require('../briefs.js');
const cvUploadUrl = require('../cv-upload-url.js');
const L = require('../../lib/api.js');

// Money truth (read-only): no per-transaction amount is stored. The session list
// price is the constant PRICE_AMOUNT=50000 fils (AED 500) in checkout.js, so the
// desk DERIVES lifetime value = count(entitlements active+consumed) × this. The
// figure is labeled as the standard session price, never asserted as a stored amount.
const SESSION_PRICE_FILS = 50000; // AED 500.00 in fils (mirrors checkout.js PRICE_AMOUNT)

// Whitelisted roster sorts → PostgREST `order` (prevents arbitrary order injection).
const ROSTER_SORTS = {
  recent: 'last_seen_at.desc.nullslast',
  name: 'name.asc.nullslast',
  joined: 'created_at.desc.nullslast',
  oldest: 'created_at.asc.nullslast',
};

const ROUTES = {
  slots: { handler: availability, marker: ['coach', 'slots'] },
  briefs: { handler: briefs, marker: ['coach', 'briefs'] },
  'cv-url': { handler: cvUploadUrl, marker: ['coach', 'cv-url'] },
  users: { handler: coachUsers }, // EXTENDED: ?q,sort,page,limit → {needs,members,users,totals,page,pageSize,total}
  member: { handler: coachMember }, // NEW: GET ?sub=… (detail + Spine) · PATCH {coach_notes}
  integrations: { handler: coachIntegrations },
  connect: { handler: coachConnect },
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

// The Standing File roster: a two-band, server-paged shape — Band 1 "Needs you"
// (derived from the coach's briefs; bounded, not paginated) + Band 2 the directory
// (the users table paged by recency/name with q/sort). Back-compatible: with no
// params it returns the first page, and `users` aliases `members` so the old grid
// keeps working. Read-only over money — lifetime value is DERIVED (see SESSION_PRICE_FILS).
async function coachUsers(req, res) {
  const session = L.requireCoach(req, res);
  if (!session) return;
  if (!L.sbConfigured()) return L.sendJson(res, 503, { error: 'supabase_unconfigured' });
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return L.sendJson(res, 405, { error: 'method_not_allowed' });
  }

  const coachSub = process.env.COACH_LINKEDIN_SUB;
  const params = new URL(req.url, 'http://x').searchParams;
  const limit = clampInt(params.get('limit'), 24, 1, 100);
  const offset = params.get('offset') != null
    ? clampInt(params.get('offset'), 0, 0, 10000000)
    : clampInt(params.get('page'), 0, 0, 100000) * limit;
  const order = ROSTER_SORTS[params.get('sort')] || ROSTER_SORTS.recent;
  // Sanitize search: strip PostgREST filter metacharacters so q can't break out
  // of the ilike pattern. encodeURIComponent keeps `*` (the wildcard) intact.
  const q = (params.get('q') || '').replace(/[(),*]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 80);

  try {
    const usersQs = [
      'select=*',
      `linkedin_sub=neq.${encodeURIComponent(coachSub)}`,
      `order=${order}`,
      `limit=${limit}`,
      `offset=${offset}`,
    ];
    if (q) {
      const pat = encodeURIComponent(`*${q}*`);
      usersQs.push(`or=(name.ilike.${pat},email.ilike.${pat})`);
    }

    const [usersResp, briefsResp, slotsResp, entsResp] = await Promise.all([
      L.sb(`users?${usersQs.join('&')}`, { headers: { Prefer: 'count=exact' } }),
      L.sb(`briefs?coach_sub=eq.${encodeURIComponent(coachSub)}&select=*&order=created_at.desc`),
      L.sb(`availability_slots?coach_sub=eq.${encodeURIComponent(coachSub)}&select=*&order=slot_start.desc`),
      L.sb('entitlements?select=user_sub,status,brief_id,created_at,updated_at'),
    ]);

    if (!usersResp.ok || !briefsResp.ok || !slotsResp.ok) {
      const detail = await Promise.all([
        usersResp.ok ? '' : usersResp.text().catch(() => ''),
        briefsResp.ok ? '' : briefsResp.text().catch(() => ''),
        slotsResp.ok ? '' : slotsResp.text().catch(() => ''),
      ]);
      console.error('coach/users supabase error', {
        users: usersResp.status, briefs: briefsResp.status, slots: slotsResp.status, detail,
      });
      return L.sendJson(res, 502, { error: 'supabase_error' });
    }

    const [rawUsers, rawBriefs, rawSlots] = await Promise.all([
      usersResp.json(), briefsResp.json(), slotsResp.json(),
    ]);
    // Entitlements are tolerated-missing (older DBs) so the desk degrades gracefully.
    let rawEnts = [];
    if (entsResp.ok) { try { rawEnts = await entsResp.json(); } catch (e) { /* treat as none */ } }

    const total = parseContentRange(usersResp.headers.get('content-range'), Array.isArray(rawUsers) ? rawUsers.length : 0);
    const users = Array.isArray(rawUsers) ? rawUsers : [];
    const briefList = Array.isArray(rawBriefs) ? rawBriefs : [];
    const slots = Array.isArray(rawSlots) ? rawSlots : [];
    const ents = Array.isArray(rawEnts) ? rawEnts : [];
    const slotsById = new Map(slots.map((slot) => [String(slot.id), slot]));
    const briefsBySub = groupBy(briefList, (b) => b.client_sub);
    const entsBySub = groupBy(ents, (e) => e.user_sub);
    const pageUserBySub = new Map(users.map((u) => [u.linkedin_sub, u]));

    // Directory rows = this page of the users table.
    const memberRows = users
      .filter((u) => u.linkedin_sub && u.linkedin_sub !== coachSub)
      .map((u) => coachUserRow(u, briefsBySub.get(u.linkedin_sub) || [], slotsById, entsBySub.get(u.linkedin_sub) || []));

    // Brief-only "ghost" members: people with briefs but no users row. Detected
    // via a bounded lookup over distinct brief subs (NOT a full users scan), so
    // pagination still holds. They're surfaced on the first page (and via Needs-you).
    const briefSubs = Array.from(new Set(briefList.map((b) => b.client_sub).filter((s) => s && s !== coachSub)));
    let lookupBySub = new Map();
    if (briefSubs.length) {
      const inList = briefSubs.map((s) => encodeURIComponent(`"${String(s).replace(/["\\]/g, '')}"`)).join(',');
      const lookupResp = await L.sb(`users?linkedin_sub=in.(${inList})&select=*`).catch(() => null);
      if (lookupResp && lookupResp.ok) {
        let lookupRows = [];
        try { lookupRows = await lookupResp.json(); } catch (e) { /* tolerate */ }
        lookupBySub = new Map((Array.isArray(lookupRows) ? lookupRows : []).map((u) => [u.linkedin_sub, u]));
      }
    }
    const ghostRows = briefSubs
      .filter((s) => !lookupBySub.has(s) && !pageUserBySub.has(s))
      .map((s) => {
        const bl = briefsBySub.get(s) || [];
        const latest = bl[0] || {};
        return coachUserRow({
          linkedin_sub: s, name: latest.client_name, email: latest.client_email, photo_url: null,
          created_at: latest.created_at, last_seen_at: latest.updated_at || latest.created_at,
        }, bl, slotsById, entsBySub.get(s) || []);
      });

    let members = memberRows;
    if (offset === 0 && ghostRows.length) {
      let gr = ghostRows;
      if (q) {
        const ql = q.toLowerCase();
        gr = gr.filter((r) => (r.name || '').toLowerCase().includes(ql) || (r.email || '').toLowerCase().includes(ql));
      }
      members = memberRows.concat(gr);
    }

    // Band 1 — Needs you: highest-priority unattended state per member, from briefs.
    const now = Date.now();
    const needMap = new Map();
    const consider = (sub, priority, reason, when) => {
      if (!sub || sub === coachSub) return;
      const cur = needMap.get(sub);
      if (!cur || priority > cur.priority) needMap.set(sub, { priority, reason, when });
    };
    briefList.forEach((b) => {
      const sub = b.client_sub;
      if (!sub || sub === coachSub) return;
      const start = b.scheduled_start ? new Date(b.scheduled_start).getTime() : NaN;
      if (b.status === 'needs_review') consider(sub, 4, 'Booking needs review', b.updated_at || b.created_at);
      else if (b.payment_status === 'paid' && b.status === 'awaiting_schedule') consider(sub, 3, 'Paid · awaiting scheduling', b.paid_at || b.updated_at);
      else if (!b.coach_reviewed) consider(sub, 2, 'Brief to review', b.created_at);
      else if (b.status === 'session_scheduled' && Number.isFinite(start) && start >= now) consider(sub, 1, 'Upcoming session', b.scheduled_start);
    });
    const needs = Array.from(needMap.entries())
      .sort((a, b) => (b[1].priority - a[1].priority) || (new Date(b[1].when || 0) - new Date(a[1].when || 0)))
      .slice(0, 50)
      .map(([sub, info]) => {
        const bl = briefsBySub.get(sub) || [];
        const latest = bl[0] || {};
        const u = pageUserBySub.get(sub) || lookupBySub.get(sub) || {
          linkedin_sub: sub, name: latest.client_name, email: latest.client_email, photo_url: null,
          created_at: latest.created_at, last_seen_at: latest.updated_at || latest.created_at,
        };
        const row = coachUserRow(u, bl, slotsById, entsBySub.get(sub) || []);
        row.need = { reason: info.reason, priority: info.priority, when: info.when || null };
        return row;
      });

    const lifetimeFils = ents.reduce((sum, e) => sum + ((e.status === 'active' || e.status === 'consumed') ? SESSION_PRICE_FILS : 0), 0);
    const totals = {
      members: total,
      users: total, // back-compat (old grid reads totals.users)
      total,
      toReview: briefList.filter((b) => !b.coach_reviewed).length,
      scheduled: briefList.filter((b) => b.status === 'session_scheduled' && b.scheduled_start && new Date(b.scheduled_start).getTime() >= now).length,
      lifetimeValue: lifetimeFils,
      lifetimeValueAed: Math.round(lifetimeFils / 100),
      booked: briefList.filter((b) => b.status === 'session_scheduled' || b.status === 'completed').length, // back-compat
    };

    return L.sendJson(res, 200, {
      users: members, // back-compat alias for the pre-Standing-File grid
      members,
      needs,
      totals,
      page: limit ? Math.floor(offset / limit) : 0,
      pageSize: limit,
      total,
    });
  } catch (e) {
    console.error('coach/users error', e);
    return L.sendJson(res, 500, { error: 'server_error' });
  }
}

// GET  /api/coach/member?sub=<linkedin_sub> → the open-file payload (identity,
//      derived lifetime value, entitlements, full sessions, progress detail, CV,
//      coach note, and the server-derived Spine). Explicit selects only; never
//      coach_integrations; never a token. Read-only over money.
// PATCH /api/coach/member?sub=<sub> {coach_notes} → upsert the users row on
//      linkedin_sub (so brief-only members can be annotated). The ONLY write here.
async function coachMember(req, res) {
  const session = L.requireCoach(req, res);
  if (!session) return;
  if (!L.sbConfigured()) return L.sendJson(res, 503, { error: 'supabase_unconfigured' });

  const coachSub = process.env.COACH_LINKEDIN_SUB;
  const params = new URL(req.url, 'http://x').searchParams;
  const sub = params.get('sub');
  if (!sub) return L.sendJson(res, 400, { error: 'missing_sub' });

  if (req.method === 'PATCH') {
    try {
      let raw = '';
      for await (const c of req) raw += c;
      let body;
      try { body = JSON.parse(raw || '{}'); } catch (e) { return L.sendJson(res, 400, { error: 'bad_json' }); }
      if (typeof body.coach_notes === 'undefined') return L.sendJson(res, 400, { error: 'missing_coach_notes' });
      const notes = body.coach_notes === null ? null : String(body.coach_notes).slice(0, 5000);
      // Upsert on linkedin_sub (merge-duplicates) — annotates existing members and
      // creates a minimal row for brief-only "ghosts". Touches ONLY users.coach_notes.
      const resp = await L.sb('users?on_conflict=linkedin_sub', {
        method: 'POST',
        headers: { Prefer: 'resolution=merge-duplicates,return=representation' },
        body: JSON.stringify({ linkedin_sub: sub, coach_notes: notes }),
      });
      if (!resp.ok) {
        console.error('coach/member notes upsert failed', resp.status, await resp.text().catch(() => ''));
        return L.sendJson(res, 502, { error: 'supabase_error' });
      }
      let saved = [];
      try { saved = await resp.json(); } catch (e) { /* return=representation may be empty */ }
      const u = Array.isArray(saved) ? saved[0] : saved;
      return L.sendJson(res, 200, { ok: true, coachNotes: (u && u.coach_notes != null ? u.coach_notes : notes) || '' });
    } catch (e) {
      console.error('coach/member patch error', e);
      return L.sendJson(res, 500, { error: 'server_error' });
    }
  }

  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET, PATCH');
    return L.sendJson(res, 405, { error: 'method_not_allowed' });
  }

  try {
    const userSelect = 'linkedin_sub,name,email,photo_url,locale,created_at,last_seen_at,academy_progress,library_progress,cv_name,cv_path,cv_uploaded_at,coach_notes';
    const briefSelect = 'id,client_sub,client_name,client_email,role,goal,obstacle,synthesis,strengths,status,payment_status,paid_at,scheduled_start,scheduled_end,calendly_join_url,cv_path,cv_extract,country,coach_reviewed,coach_notes,created_at,updated_at';
    const [userResp, briefsResp, entsResp] = await Promise.all([
      L.sb(`users?linkedin_sub=eq.${encodeURIComponent(sub)}&select=${userSelect}&limit=1`),
      L.sb(`briefs?coach_sub=eq.${encodeURIComponent(coachSub)}&client_sub=eq.${encodeURIComponent(sub)}&select=${briefSelect}&order=created_at.desc`),
      L.sb(`entitlements?user_sub=eq.${encodeURIComponent(sub)}&select=id,status,brief_id,created_at,updated_at&order=created_at.desc`),
    ]);
    if (!userResp.ok || !briefsResp.ok) {
      console.error('coach/member supabase error', { user: userResp.status, briefs: briefsResp.status });
      return L.sendJson(res, 502, { error: 'supabase_error' });
    }
    const userRows = await userResp.json().catch(() => []);
    const briefRows = await briefsResp.json().catch(() => []);
    let entRows = [];
    if (entsResp.ok) { try { entRows = await entsResp.json(); } catch (e) { /* tolerate */ } }

    const user = (Array.isArray(userRows) && userRows[0]) || null;
    const memberBriefs = Array.isArray(briefRows) ? briefRows : [];
    const memberEnts = Array.isArray(entRows) ? entRows : [];
    if (!user && !memberBriefs.length) return L.sendJson(res, 404, { error: 'not_found' });

    const latest = memberBriefs[0] || {};
    const academy = normalizeProgress(user && user.academy_progress, 82);
    const library = normalizeProgress(user && user.library_progress, 4);

    const entActive = memberEnts.filter((e) => e.status === 'active').length;
    const entConsumed = memberEnts.filter((e) => e.status === 'consumed').length;
    const entRefunded = memberEnts.filter((e) => e.status === 'refunded').length;
    const paidCount = entActive + entConsumed;
    const lifetimeFils = paidCount * SESSION_PRICE_FILS;
    let paymentStatus = 'none';
    if (paidCount > 0 || memberBriefs.some((b) => b.payment_status === 'paid')) paymentStatus = 'paid';
    else if (memberBriefs.some((b) => b.payment_status === 'pending')) paymentStatus = 'pending';

    const now = Date.now();
    const sessions = memberBriefs
      .filter((b) => b.scheduled_start || b.status === 'session_scheduled' || b.status === 'completed')
      .map((b) => ({
        briefId: b.id, when: b.scheduled_start || null, end: b.scheduled_end || null,
        status: b.status, joinUrl: b.calendly_join_url || null, paidAt: b.paid_at || null,
        role: b.role || null, goal: b.goal || null,
      }));
    let nextSession = null, lastSession = null;
    sessions.forEach((s) => {
      if (!s.when) return;
      const t = new Date(s.when).getTime();
      if (!Number.isFinite(t)) return;
      if (t >= now) { if (!nextSession || t < new Date(nextSession.when).getTime()) nextSession = s; }
      else if (!lastSession || t > new Date(lastSession.when).getTime()) lastSession = s;
    });

    const cvBrief = memberBriefs.find((b) => b.cv_path) || null;
    const cv = {
      name: (user && user.cv_name) || null,
      uploadedAt: (user && user.cv_uploaded_at) || null,
      hasCv: !!(cvBrief || (user && user.cv_path)),
      briefId: cvBrief ? cvBrief.id : null,
    };

    return L.sendJson(res, 200, {
      member: {
        linkedinSub: sub,
        name: (user && user.name) || latest.client_name || 'Unnamed member',
        email: (user && user.email) || latest.client_email || null,
        photoUrl: (user && user.photo_url) || null,
        role: latest.role || null,
        country: latest.country || null,
        joinedAt: (user && user.created_at) || (memberBriefs.length ? memberBriefs[memberBriefs.length - 1].created_at : null),
        lastSeenAt: (user && user.last_seen_at) || null,
        payment: {
          status: paymentStatus,
          lifetimeValue: lifetimeFils,
          lifetimeValueAed: Math.round(lifetimeFils / 100),
          priceNote: 'list-price-derived',
          entitlements: { active: entActive, consumed: entConsumed, refunded: entRefunded, paid: paidCount },
        },
        academy,
        library,
        sessions,
        nextSession,
        lastSession,
        cv,
        coachNotes: (user && user.coach_notes) || '',
        briefs: { total: memberBriefs.length, toReview: memberBriefs.filter((b) => !b.coach_reviewed).length },
        spine: buildSpine(user, memberBriefs, memberEnts),
      },
    });
  } catch (e) {
    console.error('coach/member error', e);
    return L.sendJson(res, 500, { error: 'server_error' });
  }
}

// The Spine: one chronological record DERIVED from existing rows (no audit table).
// Milestone-level — a single progress event per track keeps lesson-opens from
// drowning the money/session facts. Newest first; the UI caps the stagger + adds
// "show earlier" for dense files.
function buildSpine(user, memberBriefs, memberEnts) {
  const events = [];
  const push = (at, type, title, detail, money, stateName, meta) => {
    if (!at) return;
    const ts = new Date(at).getTime();
    if (!Number.isFinite(ts)) return;
    events.push(Object.assign({ at, ts, type, title, detail: detail || null, money: money != null ? money : null, state: stateName || 'neutral' }, meta || {}));
  };

  const joined = (user && user.created_at) || (memberBriefs.length ? memberBriefs[memberBriefs.length - 1].created_at : null);
  push(joined, 'joined', 'Joined', 'Signed in with LinkedIn', null, 'lead');

  memberBriefs.forEach((b) => {
    push(b.created_at, 'brief', 'Brief created', spineClip(b.goal) || b.role || null, null, b.coach_reviewed ? 'completed' : 'needs', { briefId: b.id });
    if (b.paid_at) push(b.paid_at, 'paid', 'Paid', 'Coaching session', SESSION_PRICE_FILS, 'completed', { briefId: b.id });
    if (b.scheduled_start) {
      const future = new Date(b.scheduled_start).getTime() >= Date.now();
      push(b.scheduled_start, 'session', future ? 'Session scheduled' : 'Session', b.role || null, null, 'scheduled', { briefId: b.id, joinUrl: b.calendly_join_url || null });
    }
    if (b.status === 'completed') push(b.scheduled_end || b.updated_at, 'completed', 'Session completed', null, null, 'completed', { briefId: b.id });
  });

  // Refunds are READ-ONLY (no refund webhook writes them today); shown struck if present.
  memberEnts.filter((e) => e.status === 'refunded').forEach((e) => push(e.updated_at || e.created_at, 'refund', 'Refunded', 'Coaching session', SESSION_PRICE_FILS, 'refund', { briefId: e.brief_id || null }));

  if (user && user.cv_uploaded_at) push(user.cv_uploaded_at, 'cv', 'CV uploaded', (user && user.cv_name) || null, null, 'neutral');

  const ap = normalizeProgress(user && user.academy_progress, 82);
  if (ap.updatedAt) push(ap.updatedAt, 'progress', 'Academy progress', spineProgressLabel(ap), null, 'neutral');
  const lp = normalizeProgress(user && user.library_progress, 4);
  if (lp.updatedAt) push(lp.updatedAt, 'progress', 'Library progress', spineProgressLabel(lp), null, 'neutral');

  if (user && user.last_seen_at) push(user.last_seen_at, 'seen', 'Last active', null, null, 'dim');

  events.sort((a, b) => b.ts - a.ts);
  return events.map(({ ts, ...rest }) => rest);
}

function spineClip(s) {
  s = String(s == null ? '' : s).replace(/\s+/g, ' ').trim();
  return s.length > 80 ? `${s.slice(0, 79).trim()}\u2026` : s;
}

function spineProgressLabel(p) {
  if (!p) return null;
  if (p.last) return `${p.last} \u00b7 ${p.done}/${p.total}`;
  return `${p.done} of ${p.total}`;
}

function clampInt(value, dflt, min, max) {
  const n = parseInt(value, 10);
  if (!Number.isFinite(n)) return dflt;
  return Math.min(max, Math.max(min, n));
}

function parseContentRange(header, fallback) {
  if (!header) return fallback;
  const m = /\/(\d+)\s*$/.exec(header);
  return m ? parseInt(m[1], 10) : fallback;
}

function groupBy(arr, keyFn) {
  const m = new Map();
  (arr || []).forEach((x) => {
    const k = keyFn(x);
    if (!k) return;
    if (!m.has(k)) m.set(k, []);
    m.get(k).push(x);
  });
  return m;
}

function coachUserRow(user, briefs, slotsById, ents) {
  ents = ents || [];
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

  // Money truth (read-only, derived) — see SESSION_PRICE_FILS. Refunds excluded.
  const entActive = ents.filter((e) => e.status === 'active').length;
  const entConsumed = ents.filter((e) => e.status === 'consumed').length;
  const entRefunded = ents.filter((e) => e.status === 'refunded').length;
  const paidCount = entActive + entConsumed;
  const lifetimeFils = paidCount * SESSION_PRICE_FILS;
  let paymentStatus = 'none';
  if (paidCount > 0 || sortedBriefs.some((b) => b.payment_status === 'paid')) paymentStatus = 'paid';
  else if (sortedBriefs.some((b) => b.payment_status === 'pending')) paymentStatus = 'pending';

  // Real next/last session from scheduled_start (Calendly-confirmed times).
  const now = Date.now();
  let nextSession = null, lastSession = null;
  sortedBriefs.forEach((b) => {
    if (!b.scheduled_start) return;
    const t = new Date(b.scheduled_start).getTime();
    if (!Number.isFinite(t)) return;
    const e = { when: b.scheduled_start, status: b.status, joinUrl: b.calendly_join_url || null, briefId: b.id };
    if (t >= now) { if (!nextSession || t < new Date(nextSession.when).getTime()) nextSession = e; }
    else if (!lastSession || t > new Date(lastSession.when).getTime()) lastSession = e;
  });

  return {
    linkedinSub: user.linkedin_sub || (latestBrief && latestBrief.client_sub) || null,
    name: user.name || (latestBrief && latestBrief.client_name) || 'Unnamed member',
    email: user.email || (latestBrief && latestBrief.client_email) || null,
    photoUrl: user.photo_url || user.photoUrl || null,
    role: (latestBrief && latestBrief.role) || null,
    country: (latestBrief && latestBrief.country) || null,
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
    nextSession,
    lastSession,
    sessionsCount: sortedBriefs.filter((b) => b.status === 'session_scheduled' || b.status === 'completed').length,
    payment: {
      status: paymentStatus,
      lifetimeValue: lifetimeFils,
      lifetimeValueAed: Math.round(lifetimeFils / 100),
      entitlements: { active: entActive, consumed: entConsumed, refunded: entRefunded, paid: paidCount },
    },
    lifetimeValue: lifetimeFils,
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
  const when = brief.scheduled_start || brief.slot_start || (slot && slot.slot_start) || brief.paid_at || brief.created_at || null;
  const provider = (brief.calendly_event_uri || brief.calendly_join_url) ? 'Calendly' : 'Nuria booking';
  if (brief.status === 'completed') return { status: 'completed', label: 'Completed', provider, when };
  if (brief.status === 'session_scheduled') return { status: 'booked', label: 'Booked', provider, when };
  if (brief.status === 'needs_review') return { status: 'review', label: 'Booking needs review', provider, when };
  if (brief.status === 'awaiting_schedule' || (brief.payment_status === 'paid' && brief.status !== 'session_scheduled')) {
    return { status: 'paid', label: 'Paid \u00b7 awaiting scheduling', provider, when };
  }
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

async function coachIntegrations(req, res) {
  const session = L.requireCoach(req, res);
  if (!session) return;
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return L.sendJson(res, 405, { error: 'method_not_allowed' });
  }

  const coachSub = process.env.COACH_LINKEDIN_SUB;
  const [calendly, stripe] = await Promise.all([
    L.getIntegration(coachSub, 'calendly'),
    L.getIntegration(coachSub, 'stripe'),
  ]);

  // "Configured" = the OAuth app credentials exist so the Connect button can work.
  // "Connected" = the coach has actually authorized (a row with the key fields).
  const calendlyConfigured = !!(process.env.CALENDLY_CLIENT_ID && process.env.CALENDLY_CLIENT_SECRET);
  const stripeConfigured = !!(process.env.STRIPE_CONNECT_CLIENT_ID && (process.env.STRIPE_SECRET_KEY || '').startsWith('sk_'));
  const calendlyConnected = !!(calendly && calendly.scheduling_url);
  const stripeConnected = !!(stripe && stripe.account_id);
  const maskAcct = (id) => (id ? `${String(id).slice(0, 8)}\u2026` : null);

  return L.sendJson(res, 200, {
    tools: {
      calendly: {
        label: 'Calendly',
        connected: calendlyConnected,
        status: calendlyConnected ? 'Connected' : (calendlyConfigured ? 'Not connected' : 'Needs setup'),
        note: calendlyConnected
          ? 'Scheduling is live on your Calendly.'
          : (calendlyConfigured ? 'Click Connect to authorize Calendly.' : 'Add CALENDLY_CLIENT_ID/SECRET in Vercel, then connect.'),
        account: calendlyConnected ? calendly.scheduling_url : null,
        canConnect: calendlyConfigured,
        connectUrl: '/api/coach/connect?tool=calendly',
        dashboardUrl: 'https://calendly.com/event_types/user/me',
      },
      stripe: {
        label: 'Stripe',
        connected: stripeConnected,
        status: stripeConnected
          ? (stripe.status === 'onboarding' ? 'Finish onboarding' : 'Connected')
          : (stripeConfigured ? 'Not connected' : 'Needs setup'),
        note: stripeConnected
          ? `Payouts to ${maskAcct(stripe.account_id)}`
          : (stripeConfigured ? 'Click Connect to link your Stripe account.' : 'Add STRIPE_CONNECT_CLIENT_ID + STRIPE_SECRET_KEY in Vercel, then connect.'),
        account: maskAcct(stripe && stripe.account_id),
        canConnect: stripeConfigured,
        connectUrl: '/api/coach/connect?tool=stripe',
        dashboardUrl: 'https://dashboard.stripe.com/dashboard',
      },
    },
  });
}

// Coach-only OAuth connect for Calendly + Stripe. Handles BOTH legs on the one
// registered redirect URI (/api/coach/connect): the start (?tool=…) and the
// provider callback (?code&state). Auth/CSRF failures REDIRECT to an error page
// (this is a top-level browser navigation — never emit JSON 403 here).
async function coachConnect(req, res) {
  const redirectErr = (msg) => { res.statusCode = 302; res.setHeader('Location', `/?connect_error=${encodeURIComponent(msg)}#admin`); res.end(); };
  const redirectOk = (provider) => { res.statusCode = 302; res.setHeader('Location', `/?connect=${encodeURIComponent(provider)}#admin`); res.end(); };

  const sess = L.readSession(L.parseCookies(req)[L.COOKIE]);
  const coachSub = process.env.COACH_LINKEDIN_SUB;
  if (!sess || !sess.sub || !coachSub || sess.sub !== coachSub) return redirectErr('not_authorized');
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return L.sendJson(res, 405, { error: 'method_not_allowed' });
  }

  const params = new URL(req.url, 'http://x').searchParams;
  const code = params.get('code');
  const stateParam = params.get('state');
  const oauthError = params.get('error');
  if (oauthError) return redirectErr(params.get('error_description') || oauthError);

  // ---- Callback leg: provider redirected back with ?code & ?state ----
  if (code || stateParam) {
    const cookieState = L.parseCookies(req)[L.CONNECT_STATE_COOKIE];
    if (!stateParam || !cookieState || stateParam !== cookieState) return redirectErr('state_mismatch');
    const st = L.readConnectState(stateParam);
    if (!st || !st.p) return redirectErr('bad_state');
    L.clearCookie(res, L.CONNECT_STATE_COOKIE);
    if (!code) return redirectErr('missing_code');
    try {
      if (st.p === 'calendly') return await finishCalendly(req, res, code, coachSub, redirectOk, redirectErr);
      if (st.p === 'stripe') return await finishStripe(req, res, code, coachSub, redirectOk, redirectErr);
      return redirectErr('unknown_tool');
    } catch (e) {
      console.error('connect callback error', e);
      return redirectErr('server_error');
    }
  }

  // ---- Start leg: ?tool=calendly|stripe → set CSRF state + redirect to provider ----
  const tool = params.get('tool');
  if (tool !== 'calendly' && tool !== 'stripe') return redirectErr('unknown_tool');
  try {
    const state = L.makeConnectState(tool);
    L.setCookie(res, L.CONNECT_STATE_COOKIE, state, 600); // 10 min to complete
    const redirectUri = L.connectRedirectUri(req);
    let authorizeUrl;
    if (tool === 'calendly') {
      authorizeUrl = `${L.CALENDLY.authorize}?` + new URLSearchParams({
        client_id: L.env('CALENDLY_CLIENT_ID'),
        response_type: 'code',
        redirect_uri: redirectUri,
        state,
      }).toString();
    } else {
      authorizeUrl = `${L.STRIPE_CONNECT.authorize}?` + new URLSearchParams({
        client_id: L.env('STRIPE_CONNECT_CLIENT_ID'),
        response_type: 'code',
        scope: 'read_write',
        redirect_uri: redirectUri,
        state,
      }).toString();
    }
    res.statusCode = 302;
    res.setHeader('Location', authorizeUrl);
    res.end();
  } catch (e) {
    console.error('connect start error', e && e.message);
    return redirectErr('not_configured');
  }
}

// Calendly: exchange code → store tokens + scheduling URL, subscribe to booking
// webhooks signed with our own key (stored encrypted).
async function finishCalendly(req, res, code, coachSub, redirectOk, redirectErr) {
  const tokResp = await fetch(L.CALENDLY.token, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: L.connectRedirectUri(req),
      client_id: L.env('CALENDLY_CLIENT_ID'),
      client_secret: L.env('CALENDLY_CLIENT_SECRET'),
    }).toString(),
  });
  if (!tokResp.ok) {
    console.error('calendly token exchange failed', tokResp.status, await tokResp.text().catch(() => ''));
    return redirectErr('calendly_token_failed');
  }
  const t = await tokResp.json();
  const accessToken = t.access_token;
  if (!accessToken) return redirectErr('calendly_no_token');

  const meResp = await fetch(`${L.CALENDLY.api}/users/me`, { headers: { Authorization: `Bearer ${accessToken}` } });
  if (!meResp.ok) {
    console.error('calendly users/me failed', meResp.status, await meResp.text().catch(() => ''));
    return redirectErr('calendly_user_failed');
  }
  const meRes = (await meResp.json()).resource || {};
  const userUri = meRes.uri || t.owner || null;
  const orgUri = meRes.current_organization || t.organization || null;
  const schedulingUrl = meRes.scheduling_url || null;

  // Subscribe to booking events. We supply the signing key so Calendly signs
  // payloads we can verify; 409 means a subscription already exists (re-connect).
  const signingKey = L.crypto.randomBytes(32).toString('hex');
  let webhookOk = false;
  try {
    const sub = await fetch(`${L.CALENDLY.api}/webhook_subscriptions`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: `${L.originOf(req)}/api/calendly/webhook`,
        events: ['invitee.created', 'invitee.canceled'],
        organization: orgUri,
        user: userUri,
        scope: 'user',
        signing_key: signingKey,
      }),
    });
    webhookOk = sub.ok || sub.status === 409;
    if (!sub.ok && sub.status !== 409) console.error('calendly webhook subscribe failed', sub.status, await sub.text().catch(() => ''));
  } catch (e) { console.error('calendly webhook subscribe error', e && e.message); }

  const saved = await L.saveIntegration(coachSub, 'calendly', {
    access_token_enc: L.encryptSecret(accessToken),
    refresh_token_enc: L.encryptSecret(t.refresh_token || null),
    token_expires_at: t.expires_in ? new Date(Date.now() + t.expires_in * 1000).toISOString() : null,
    account_id: userUri,
    organization_uri: orgUri,
    scheduling_url: schedulingUrl,
    webhook_signing_key_enc: webhookOk ? L.encryptSecret(signingKey) : null,
    status: 'connected',
    connected_at: new Date().toISOString(),
  });
  if (!saved.ok) {
    console.error('calendly save failed', saved.status, await saved.text().catch(() => ''));
    return redirectErr('calendly_save_failed');
  }
  return redirectOk('calendly');
}

// Stripe Connect (Standard): exchange code → store stripe_user_id. Ongoing calls
// use the platform key + { stripeAccount }, so the access token is stored but not
// required. charges_enabled drives the onboarding hint.
async function finishStripe(req, res, code, coachSub, redirectOk, redirectErr) {
  const Stripe = require('stripe');
  const stripe = new Stripe(L.env('STRIPE_SECRET_KEY'));
  let token;
  try {
    token = await stripe.oauth.token({ grant_type: 'authorization_code', code });
  } catch (e) {
    console.error('stripe oauth token failed', e && e.message);
    return redirectErr('stripe_token_failed');
  }
  const acct = token.stripe_user_id;
  if (!acct) return redirectErr('stripe_no_account');

  let chargesEnabled = null;
  try { chargesEnabled = !!(await stripe.accounts.retrieve(acct)).charges_enabled; } catch (e) { /* onboarding may still be finishing */ }

  const saved = await L.saveIntegration(coachSub, 'stripe', {
    access_token_enc: L.encryptSecret(token.access_token || null),
    refresh_token_enc: L.encryptSecret(token.refresh_token || null),
    account_id: acct,
    status: chargesEnabled === false ? 'onboarding' : 'connected',
    connected_at: new Date().toISOString(),
  });
  if (!saved.ok) {
    console.error('stripe save failed', saved.status, await saved.text().catch(() => ''));
    return redirectErr('stripe_save_failed');
  }
  return redirectOk('stripe');
}
