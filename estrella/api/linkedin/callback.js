'use strict';
// LinkedIn redirects here with ?code&state. Verify state, exchange code for a
// token server-side (uses the client secret), fetch the real profile, register
// the user in Supabase, set a signed session cookie, and bounce back to the app.
const L = require('../_lib.js');

function fail(res, msg) {
  res.statusCode = 302;
  res.setHeader('Location', `/?li_error=${encodeURIComponent(msg)}`);
  res.end();
}

module.exports = async (req, res) => {
  try {
    const url = new URL(req.url, L.originOf(req));
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');
    const oauthError = url.searchParams.get('error');
    if (oauthError) return fail(res, url.searchParams.get('error_description') || oauthError);
    if (!code) return fail(res, 'missing_code');

    const cookies = L.parseCookies(req);
    if (!state || !cookies[L.STATE_COOKIE] || state !== cookies[L.STATE_COOKIE]) {
      return fail(res, 'state_mismatch');
    }
    L.clearCookie(res, L.STATE_COOKIE);

    // 1) Exchange the authorization code for an access token (server-side; secret stays here).
    const tokenResp = await fetch(L.LINKEDIN.token, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: L.redirectUri(req),
        client_id: L.env('LINKEDIN_CLIENT_ID'),
        client_secret: L.env('LINKEDIN_CLIENT_SECRET'),
      }).toString(),
    });
    if (!tokenResp.ok) {
      console.error('token exchange failed', tokenResp.status, await tokenResp.text().catch(() => ''));
      return fail(res, 'token_exchange_failed');
    }
    const { access_token } = await tokenResp.json();
    if (!access_token) return fail(res, 'no_access_token');

    // 2) Fetch the authenticated user's profile (authoritative; no id_token verify needed).
    const meResp = await fetch(L.LINKEDIN.userinfo, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    if (!meResp.ok) {
      console.error('userinfo failed', meResp.status, await meResp.text().catch(() => ''));
      return fail(res, 'userinfo_failed');
    }
    const profile = await meResp.json(); // { sub, name, given_name, family_name, picture, email, locale }

    // 3) Register / update the user in the Supabase registry (best-effort).
    try { await L.upsertUser(profile); } catch (e) { console.error('upsert error', e); }

    // 4) Issue a signed session and return to the app. Shape matches the frontend's
    //    existing getLinkedInUser() contract: { name, headline, photoUrl, email }.
    const session = {
      sub: profile.sub,
      name: profile.name || [profile.given_name, profile.family_name].filter(Boolean).join(' ') || 'LinkedIn member',
      email: profile.email || null,
      photoUrl: profile.picture || null,
      headline: '', // LinkedIn basic OIDC does not expose headline; app falls back to screening role
    };
    L.setCookie(res, L.COOKIE, L.makeSession(session), 60 * 60 * 24 * 30); // 30 days

    res.statusCode = 302;
    res.setHeader('Location', '/?li=1');
    res.end();
  } catch (e) {
    console.error('callback error', e);
    return fail(res, 'server_error');
  }
};
