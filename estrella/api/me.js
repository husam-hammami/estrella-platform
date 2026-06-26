'use strict';
// Returns the signed-in user from the session cookie, or 401. The frontend calls
// this on load to restore the session after a LinkedIn round-trip.
const L = require('./_lib.js');

module.exports = async (req, res) => {
  const cookies = L.parseCookies(req);
  const user = L.readSession(cookies[L.COOKIE]);
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  if (!user) { res.statusCode = 401; res.end(JSON.stringify({ user: null })); return; }
  res.statusCode = 200;
  res.end(JSON.stringify({ user }));
};
