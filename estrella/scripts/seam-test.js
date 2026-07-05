// Promoted from the session scratchpad (Career Studio plumbing session) into the repo.
// Seam tests: mount the real Vercel handlers on a local http server and verify
// auth gates, method guards, and honest degradation — no real keys needed.
'use strict';
const http = require('http');
const path = require('path');

const ROOT = require('path').join(__dirname, '..');

// Deliberately fake/absent env: everything must fail CLOSED and honestly.
process.env.SESSION_SECRET = 'test-secret-for-seam-tests-0123456789abcdef';
process.env.ANTHROPIC_API_KEY = 'sk-ant-fake-key-for-seam-tests';
delete process.env.SUPABASE_URL;
delete process.env.SUPABASE_SERVICE_ROLE_KEY;
delete process.env.STRIPE_SECRET_KEY;
process.env.COACH_LINKEDIN_SUB = 'coach-sub-test';

const routes = {
  '/api/estrella': require(path.join(ROOT, 'api/estrella.js')),
  '/api/me': require(path.join(ROOT, 'api/me.js')),
  '/api/briefs': require(path.join(ROOT, 'api/briefs.js')),
  '/api/checkout': require(path.join(ROOT, 'api/checkout.js')),
  '/api/availability': require(path.join(ROOT, 'api/availability.js')),
  '/api/cv-upload-url': require(path.join(ROOT, 'api/cv-upload-url.js')),
  '/api/cv-parse': require(path.join(ROOT, 'api/cv-parse.js')),
  '/api/health': require(path.join(ROOT, 'api/health.js')),
};
const coachRoute = require(path.join(ROOT, 'api/coach/[route].js'));

const server = http.createServer((req, res) => {
  const u = new URL(req.url, 'http://x');
  let h = routes[u.pathname];
  if (!h && u.pathname.startsWith('/api/coach/')) h = coachRoute;
  if (!h) { res.statusCode = 404; return res.end('no route'); }
  // Vercel provides req.query for [route].js param
  req.query = Object.fromEntries(u.searchParams);
  const m = u.pathname.match(/^\/api\/coach\/([^/]+)/);
  if (m) req.query.route = m[1];
  Promise.resolve(h(req, res)).catch(e => {
    if (!res.headersSent) { res.statusCode = 599; res.end('UNHANDLED: ' + e.message); }
    else res.end();
  });
});

const cases = [
  ['GET /api/estrella → 405', 'GET', '/api/estrella', null, 405],
  ['POST /api/estrella bad body → 400', 'POST', '/api/estrella', 'not-json', 400],
  ['POST /api/estrella mode:bogus → 400', 'POST', '/api/estrella', JSON.stringify({mode:'bogus', messages:[]}), 400],
  ['POST /api/estrella companion no-auth → 401', 'POST', '/api/estrella', JSON.stringify({mode:'companion', messages:[{role:'user',content:'x'}]}), 401],
  ['POST /api/estrella tutor no-auth → 401', 'POST', '/api/estrella', JSON.stringify({mode:'tutor', course:'c', lesson:'l', lessonContent:'x', messages:[{role:'user',content:'x'}]}), 401],
  ['POST /api/estrella dossier no-auth → 401', 'POST', '/api/estrella', JSON.stringify({mode:'dossier', brief_id:'x'}), 401],
  ['POST /api/estrella followup no-auth → 401', 'POST', '/api/estrella', JSON.stringify({mode:'followup', brief_id:'x'}), 401],
  ['GET /api/me no-auth → 401', 'GET', '/api/me', null, 401],
  ['GET /api/briefs no-auth → 401', 'GET', '/api/briefs', null, 401],
  ['POST /api/checkout no-auth → 401', 'POST', '/api/checkout', JSON.stringify({brief:{}}), 401],
  ['POST /api/cv-parse no-auth → 401', 'POST', '/api/cv-parse', JSON.stringify({}), 401],
  ['POST /api/cv-upload-url no-auth → 401', 'POST', '/api/cv-upload-url', JSON.stringify({}), 401],
  ['GET /api/health no-auth → 401', 'GET', '/api/health', null, 401],
  ['GET /api/coach/users no-auth → 401', 'GET', '/api/coach/users', null, 401],
  ['GET /api/coach/briefs no-auth → 401', 'GET', '/api/coach/briefs', null, 401],
  ['GET /api/availability (no supabase) → non-500 honest', 'GET', '/api/availability', null, [200, 503]],
  // Book commerce gates
  ['POST /api/checkout book no-auth → 401', 'POST', '/api/checkout', JSON.stringify({product:'book', book_id:'quiet'}), 401],
  ['POST /api/checkout book bogus id no-auth → 401', 'POST', '/api/checkout', JSON.stringify({product:'book', book_id:'nope'}), 401],
  ['GET /api/me book-access no-auth → 401', 'GET', '/api/me?action=book-access&id=quiet', null, 401],
  // Career Studio gates
  ['estrella cvreview signed-out', 'POST', '/api/estrella', JSON.stringify({mode:'cvreview'}), 401],
  ['estrella linkedin signed-out', 'POST', '/api/estrella', JSON.stringify({mode:'linkedin', headline:'x'}), 401],
  ['estrella roadmap signed-out', 'POST', '/api/estrella', JSON.stringify({mode:'roadmap', current_role:'x'}), 401],
];

function call(method, p, body) {
  return new Promise((resolve, reject) => {
    const req = http.request({ host: '127.0.0.1', port: 4517, path: p, method,
      headers: body ? { 'content-type': 'application/json', 'content-length': Buffer.byteLength(body) } : {} },
      res => { let d = ''; res.on('data', c => d += c); res.on('end', () => resolve({ status: res.statusCode, body: d.slice(0, 200) })); });
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

server.listen(4517, async () => {
  let pass = 0, fail = 0;
  for (const [name, method, p, body, want] of cases) {
    try {
      const r = await call(method, p, body);
      const ok = Array.isArray(want) ? want.includes(r.status) : r.status === want;
      if (ok) { pass++; console.log('PASS', name); }
      else { fail++; console.log('FAIL', name, '→ got', r.status, r.body); }
    } catch (e) { fail++; console.log('FAIL', name, 'ERR', e.message); }
  }
  console.log(`\n${pass} passed, ${fail} failed`);
  server.close();
  process.exit(fail ? 1 : 0);
});
