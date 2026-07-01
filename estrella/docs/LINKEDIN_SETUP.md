# LinkedIn Sign-In + User Registry — Setup

Real "Continue with LinkedIn" for Estrella. The button starts an OpenID Connect
flow, a Vercel serverless function exchanges the code for the user's real profile
(name, email, photo), each user is registered in Supabase, and the browser gets a
signed session cookie.

Everything server-side lives in `/api`. Nothing secret touches the browser.

---

## 1. Create the LinkedIn app (5 min)

1. Go to https://www.linkedin.com/developers/apps → **Create app**.
2. Fill name, associate a LinkedIn Page (any page you admin), upload a logo.
3. Open the app → **Products** tab → add **Sign In with LinkedIn using OpenID Connect**
   (it's self-serve, approved instantly).
4. Open the **Auth** tab. Copy the **Client ID** and **Client Secret**.
5. Under **Authorized redirect URLs for your app**, add EXACTLY:

   ```
   https://YOUR-VERCEL-DOMAIN/api/linkedin/callback
   ```

   Replace `YOUR-VERCEL-DOMAIN` with your deployed domain, e.g.
   `estrella.vercel.app`. The path must match character-for-character.
   Add a second entry for any custom domain you use.

The granted scopes are `openid`, `profile`, `email`.

> Note: basic LinkedIn sign-in returns **name, email, and photo** — not the
> headline/job title. Estrella falls back to the headline captured during the
> screening conversation, so this is expected.

---

## 2. Create the Supabase table (2 min)

In your Supabase project → **SQL Editor**, run the canonical
[`supabase/schema.sql`](../supabase/schema.sql) (it includes this `users` table and
everything else, idempotently). The block below is the `users`-only excerpt for
reference:

```sql
create table if not exists public.users (
  id            uuid primary key default gen_random_uuid(),
  linkedin_sub  text unique not null,
  name          text,
  email         text,
  photo_url     text,
  locale        text,
  academy_progress jsonb,
  library_progress jsonb,
  cv_path       text,
  cv_name       text,
  cv_uploaded_at timestamptz,
  created_at    timestamptz not null default now(),
  last_seen_at  timestamptz not null default now()
);

-- Safe to run on an existing table created before the member dashboard/admin desk.
alter table public.users add column if not exists academy_progress jsonb;
alter table public.users add column if not exists library_progress jsonb;
alter table public.users add column if not exists cv_path text;
alter table public.users add column if not exists cv_name text;
alter table public.users add column if not exists cv_uploaded_at timestamptz;

-- The service-role key bypasses RLS; keep RLS on so the anon key can't read it.
alter table public.users enable row level security;
```

Copy two values from **Project Settings → API**:
- **Project URL** → `SUPABASE_URL`
- **service_role** secret key → `SUPABASE_SERVICE_ROLE_KEY` (server-only, never ship to the browser)

---

## 3. Set environment variables in Vercel

Project → **Settings → Environment Variables** (Production + Preview):

| Name                        | Value                                            |
| --------------------------- | ------------------------------------------------ |
| `LINKEDIN_CLIENT_ID`        | from LinkedIn Auth tab                            |
| `LINKEDIN_CLIENT_SECRET`    | from LinkedIn Auth tab                            |
| `SESSION_SECRET`            | any long random string (e.g. `openssl rand -hex 32`) |
| `SUPABASE_URL`              | Supabase project URL                             |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service_role key                        |

Redeploy after setting them (env changes need a fresh deploy).

---

## 4. Deploy

> **Root Directory must be `estrella`.** This repo keeps the app in the
> `estrella/` subdirectory, so files are at `estrella/index.html`,
> `estrella/api/...`. In Vercel → Settings → General → Root Directory, set it
> to `estrella`, or the build serves from the repo root and every route 404s.

```bash
vercel        # preview
vercel --prod # production
```

Then open the production URL and click **Continue with LinkedIn**.

> **Sign-in only works on the registered production domain.** Vercel preview
> deployments get random hostnames that won't match the redirect URI you
> registered at LinkedIn, so the button will fail there — expected, not a bug.
> If you add a custom domain later, register its
> `https://<domain>/api/linkedin/callback` in the LinkedIn Auth tab too.

---

## Live deployment (as of 2026-06-27)

Deployed and verified at **estrella-platform.vercel.app**. A real sign-in writes
a row to `public.users` (confirmed: name, email, photo_url, last_seen_at). The
LinkedIn app is currently bound to the "Hercules" Page for verification —
invisible to end users; rename if you want it tidy.

Gotchas hit during first setup (all fixed): the code must be pushed before
import (Vercel builds `main`); `LINKEDIN_CLIENT_SECRET` can silently save empty;
and it's easy to paste the service_role JWT into `SUPABASE_URL` instead of
`SUPABASE_SERVICE_ROLE_KEY` — sign-in still works but no row writes, so if the
session succeeds but the table stays empty, check those two fields first.

---

## How it fits together

- `api/linkedin/login.js` — mints CSRF `state`, redirects to LinkedIn.
- `api/linkedin/callback.js` — verifies state, exchanges code → token → profile,
  upserts the user into Supabase, sets a signed `estrella_session` cookie.
- `api/me.js` — returns the signed-in user from the cookie (frontend calls on load).
- `api/logout.js` — clears the session.
- `api/_lib.js` — cookie signing (HMAC, no deps) + Supabase upsert via REST.

## Local development

LinkedIn rejects `file://` and bare `localhost` unless registered. To test the
real flow locally, run `vercel dev` and add
`http://localhost:3000/api/linkedin/callback` to the LinkedIn redirect URLs.

If you just open `index.html` from disk (no server), the button falls back to a
local demo profile so the prototype still runs offline.
