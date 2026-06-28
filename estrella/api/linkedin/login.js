'use strict';
// Starts the LinkedIn OpenID Connect flow: mint CSRF state, redirect to LinkedIn.
const L = require('../../lib/api.js');

module.exports = async (req, res) => {
  try {
    const state = L.crypto.randomBytes(16).toString('hex');
    const nonce = L.crypto.randomBytes(16).toString('hex');
    L.setCookie(res, L.STATE_COOKIE, state, 600); // 10 min to complete login

    const params = new URLSearchParams({
      response_type: 'code',
      client_id: L.env('LINKEDIN_CLIENT_ID'),
      redirect_uri: L.redirectUri(req),
      scope: L.LINKEDIN.scope,
      state,
      nonce,
    });
    res.statusCode = 302;
    res.setHeader('Location', `${L.LINKEDIN.authorize}?${params.toString()}`);
    res.end();
  } catch (e) {
    console.error('login error', e);
    res.statusCode = 500;
    res.end('LinkedIn sign-in is not configured. See docs/LINKEDIN_SETUP.md');
  }
};
