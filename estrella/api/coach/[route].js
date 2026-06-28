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
};

module.exports = async (req, res) => {
  const url = new URL(req.url, 'http://x');
  const route = decodeURIComponent(url.pathname.split('/').filter(Boolean).pop() || '');
  const target = ROUTES[route];

  if (!target) return L.sendJson(res, 404, { error: 'not_found' });

  url.searchParams.set(target.marker[0], target.marker[1]);
  req.url = `${url.pathname}${url.search}`;
  return target.handler(req, res);
};
