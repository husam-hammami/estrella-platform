'use strict';
// Clears the session cookie and returns to the app.
const L = require('./_lib.js');

module.exports = async (req, res) => {
  L.clearCookie(res, L.COOKIE);
  res.statusCode = 302;
  res.setHeader('Location', '/');
  res.end();
};
