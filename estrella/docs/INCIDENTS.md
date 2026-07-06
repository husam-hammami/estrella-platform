# Incidents — generalizable failure classes (for plan review)

High-signal log of real failures whose root cause generalizes. A future plan that
touches the same area should check the **Guard**. Append only when a real failure
cost a wrong result / data loss / outage / hours of rework; dedupe by class.

### Code-complete ≠ deployed — feature not pushed to the build branch   [category: deploy] [medium]
Symptom · The LinkedIn sign-in was written and "complete" locally, but a downstream
session tried to deploy and found nothing on GitHub — `main` had none of the `/api`
code; a Vercel import would have shipped the prototype with the new routes 404ing.
Root-cause CLASS · "Done" was scoped to the working tree, not to the branch the
deploy actually builds. Vercel builds `main`; uncommitted/unpushed work is invisible
to it.
Fix · Committed the scoped feature and pushed to `main` before any deploy.
Guard · Any plan that adds `/api` routes or deployable code must include an explicit
"commit + push to `main` before the Vercel build" step, and confirm Root Directory =
`estrella` (the app lives in a subdir). New routes 404 silently until pushed.

### Silent env/secret misconfiguration   [category: config/validation] [high]
Symptom · During the LinkedIn deploy, `LINKEDIN_CLIENT_SECRET` was saved empty, and
the Supabase service_role JWT was pasted into the `SUPABASE_URL` field. Sign-in
appeared to work but database writes silently failed; the user row never wrote.
Root-cause CLASS · Env vars fail by *wrong shape* (empty-but-present, or a JWT where
a URL belongs), and the code only reads them at request time, so the misconfig
surfaces as a silent downstream failure, not an early error.
Fix · Reset the fields to correct values; verified a real row wrote.
Guard · Any plan adding env vars must include a config/health check that asserts
*shape*, not just presence: e.g. `SUPABASE_URL` is `https://…` and NOT a JWT
(`!startsWith('eyJ')`), Stripe keys match `sk_`/`whsec_` prefixes, coach/API keys
non-empty. Fail loud (e.g. a webhook returns 400 + logs on signature failure) so a
bad secret shows as failed deliveries, never silent loss — especially when money or
data writes depend on it.
