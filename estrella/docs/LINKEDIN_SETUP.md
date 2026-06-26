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

In your Supabase project → **SQL Editor**, run:

```sql
create table if not exists public.users (
  id            uuid primary key default gen_random_uuid(),
  linkedin_sub  text unique not null,
  name          text,
  email         text,
  photo_url     text,
  locale        text,
  created_at    timestamptz not null default now(),
  last_seen_at  timestamptz not null default now()
);

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

```bash
vercel        # preview
vercel --prod # production
```

Then open the production URL and click **Continue with LinkedIn**.

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
