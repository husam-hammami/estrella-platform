# Coaching Platform — Setup & Handover

Everything to take the coaching product from **code-complete** to **live**. The code
is built and degrades gracefully when a key is missing (no white screens). This doc
is the checklist of what only you can do: create accounts, add env vars, run SQL,
make the Stripe link. Built on top of the existing LinkedIn sign-in (see
`docs/LINKEDIN_SETUP.md`).

> Architecture: static `index.html` + Vercel serverless `/api` (the app lives in the
> `estrella/` subdirectory → Vercel **Root Directory = `estrella`**). Supabase is
> reached only server-side via the service_role key. Secrets live only in Vercel env.

---

## 1. Environment variables (Vercel → Settings → Environment Variables)

Already set (LinkedIn): `LINKEDIN_CLIENT_ID`, `LINKEDIN_CLIENT_SECRET`,
`SESSION_SECRET`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`.

Add these:

| Name | Value | Used by |
| --- | --- | --- |
| `COACH_LINKEDIN_SUB` | Nesreen's LinkedIn `sub` (see §5) | coach-desk gate |
| `ANTHROPIC_API_KEY` | from console.anthropic.com | AI screening + CV parse |
| `ESTRELLA_MODEL` | `claude-sonnet-4-6` (optional; default in code) | AI screening |
| `STRIPE_SECRET_KEY` | platform `sk_live_…` (or `sk_test_…`) | Checkout + webhook verify |
| `STRIPE_WEBHOOK_SECRET` | `whsec_…` from the webhook (see §4) | webhook verify |
| `STRIPE_CONNECT_CLIENT_ID` | `ca_…` from Stripe → Connect → Settings | coach "Connect Stripe" OAuth |
| `CALENDLY_CLIENT_ID` | from a Calendly OAuth app (see §4) | coach "Connect Calendly" OAuth |
| `CALENDLY_CLIENT_SECRET` | from the Calendly OAuth app | Calendly token exchange |
| `INTEGRATION_ENC_KEY` | 32-byte key, base64 or 64-hex (`openssl rand -base64 32`) | encrypts stored Stripe/Calendly tokens |

Retired (no longer read; safe to delete): `STRIPE_PAYMENT_LINK_URL` — replaced by dynamic
Stripe Checkout Sessions on the coach's connected account. `CALENDLY_ACCESS_TOKEN` /
`CALENDLY_API_KEY` / `CALENDLY_PAT` — Calendly is now connected per-coach via OAuth and
stored (encrypted) in `coach_integrations`.

After adding/changing env vars, **redeploy** (env changes need a fresh build), then
open `/api/health` while signed in as the coach — it reports any missing/misshaped var.

---

## 2. Supabase tables + RPC (SQL Editor → run once)

> **Canonical script:** run [`supabase/schema.sql`](../supabase/schema.sql) — one
> idempotent, non-destructive file that creates every table, index, RLS toggle, and
> both storage buckets in the correct order. The blocks below are kept for
> reference/explanation; `supabase/schema.sql` is what you actually run.

```sql
-- Nesreen's bookable slots (she/admin manages these)
create table if not exists public.availability_slots (
  id uuid primary key default gen_random_uuid(),
  coach_sub     text not null,
  slot_start    timestamptz not null,
  slot_end      timestamptz not null,
  booked_by_sub text,                       -- null = available
  held_until    timestamptz,                -- soft hold during checkout
  paid          boolean not null default false,
  created_at    timestamptz not null default now(),
  unique (coach_sub, slot_start),
  check (slot_end > slot_start)
);

-- Client briefs (screening output + booking + payment), keyed on LinkedIn sub
create table if not exists public.briefs (
  id uuid primary key default gen_random_uuid(),
  client_sub   text not null,
  client_name  text,
  client_email text,
  coach_sub    text not null,
  status       text not null default 'pending_payment',   -- pending_payment|session_scheduled|completed|cancelled
  payment_status text not null default 'pending',          -- pending|paid|failed
  identity text, role text, goal text, obstacle text, synthesis text,
  strengths text[],
  country text, cv_path text, cv_extract jsonb,            -- optional CV enrichment
  slot_id uuid references public.availability_slots(id) on delete set null,
  stripe_event_id text,
  paid_at timestamptz,
  coach_reviewed boolean not null default false,
  coach_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Stripe webhook idempotency ledger
create table if not exists public.webhook_events (
  stripe_event_id text primary key,
  brief_id uuid references public.briefs(id),
  created_at timestamptz not null default now()
);

-- Atomic slot claim by UUID with lazy hold-expiry (no cron needed).
-- Succeeds only if the slot is free OR its hold expired and it isn't paid.
create or replace function public.claim_slot(p_slot uuid, p_client_sub text, p_hold_min int default 15)
returns boolean language plpgsql as $$
declare ok boolean;
begin
  update public.availability_slots
     set booked_by_sub = p_client_sub,
         held_until = now() + (p_hold_min || ' minutes')::interval
   where id = p_slot
     and paid = false
     and (booked_by_sub is null or held_until < now())
  returning true into ok;
  return coalesce(ok, false);
end $$;

-- RLS on (defense-in-depth; the server uses service_role which bypasses it).
alter table public.availability_slots enable row level security;
alter table public.briefs enable row level security;
alter table public.webhook_events enable row level security;

-- Member profile fields used by the dashboard and Nesreen admin desk.
-- Safe to run even if the users table already exists.
alter table public.users add column if not exists academy_progress jsonb;
alter table public.users add column if not exists library_progress jsonb;
alter table public.users add column if not exists cv_path text;
alter table public.users add column if not exists cv_name text;
alter table public.users add column if not exists cv_uploaded_at timestamptz;
```

### Member Management Desk ("The Standing File") — additive

The coach member desk (roster + per-member "open file") adds ONE writable field — a
per-member coach note on the person — and a few indexes so the server-side
search/sort/pagination (PostgREST `limit`/`offset`/`order`/`ilike`) stays fast as the
roster grows. All additive; RLS unchanged; no destructive migration.

```sql
-- The ONE new writable field: a per-member coach note (CRM note on the person, not the brief).
alter table public.users add column if not exists coach_notes text;

-- Pagination + sort: the directory pages users by recency / name / join date.
create index if not exists idx_users_last_seen_at on public.users (last_seen_at desc nulls last);
create index if not exists idx_users_created_at  on public.users (created_at  desc nulls last);

-- Search: case-insensitive name/email `ilike` matching (trigram index makes leading-wildcard fast).
create extension if not exists pg_trgm;
create index if not exists idx_users_name_trgm  on public.users using gin (name  gin_trgm_ops);
create index if not exists idx_users_email_trgm on public.users using gin (email gin_trgm_ops);

-- Per-member lifetime value / payment truth is DERIVED (read-only) from existing rows:
--   entitlements.status in ('active','consumed')  ×  list price AED 500  (refunded excluded, shown struck)
-- Speeds the desk's per-member entitlement lookups:
create index if not exists idx_entitlements_user_sub on public.entitlements (user_sub);

-- The activity "Spine" is DERIVED server-side from existing timestamps — no new table:
--   users.created_at (joined) · users.last_seen_at (last active) · briefs.created_at (brief) ·
--   briefs.paid_at (paid AED 500) · briefs.scheduled_start (session) · briefs.status='completed' ·
--   users.cv_uploaded_at · academy/library_progress.updatedAt.
-- The desk is READ-ONLY over money: the Stripe webhook stays the sole writer of paid/entitlement state.
```

### Real Calendly + Stripe (end-to-end) — additive migration

Run this once on top of the tables above:

```sql
-- Per-coach integration tokens (encrypted at rest by the app; service_role only).
create table if not exists public.coach_integrations (
  id uuid primary key default gen_random_uuid(),
  coach_sub        text not null,
  provider         text not null,                  -- 'calendly' | 'stripe'
  access_token_enc text,                            -- AES-256-GCM (INTEGRATION_ENC_KEY)
  refresh_token_enc text,
  token_expires_at timestamptz,
  account_id       text,                            -- Stripe stripe_user_id / Calendly user URI
  organization_uri text,                            -- Calendly org (webhook scope)
  scheduling_url   text,                            -- Calendly public scheduling link
  webhook_signing_key_enc text,                     -- Calendly webhook signing key (encrypted)
  status           text not null default 'connected',
  connected_at     timestamptz not null default now(),
  updated_at       timestamptz not null default now(),
  unique (coach_sub, provider)
);

-- Paid access records. One active row = the right to book one coaching session.
create table if not exists public.entitlements (
  id uuid primary key default gen_random_uuid(),
  user_sub   text not null,
  product    text not null default 'coaching_session',
  brief_id   uuid references public.briefs(id) on delete set null,
  status     text not null default 'active',        -- active | consumed | refunded
  stripe_checkout_session_id text unique,            -- idempotency: one entitlement per paid session
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Booking now happens on Calendly; record the confirmed event on the brief.
alter table public.briefs add column if not exists stripe_checkout_session_id text;
alter table public.briefs add column if not exists calendly_event_uri text;
alter table public.briefs add column if not exists calendly_invitee_uri text;
alter table public.briefs add column if not exists calendly_join_url text;
alter table public.briefs add column if not exists scheduled_start timestamptz;
alter table public.briefs add column if not exists scheduled_end timestamptz;
-- briefs.status gains 'awaiting_schedule' (paid, not yet booked) and 'needs_review'
-- (a Calendly booking we could not match to a paid brief). status is free text — no enum change.
-- briefs.slot_id is already nullable; the custom calendar (availability_slots + claim_slot)
-- is RETIRED — kept for historical rows but no longer written by the app.

alter table public.coach_integrations enable row level security;
alter table public.entitlements enable row level security;
```

(The legacy `availability_slots` insert/`/api/coach/slots` UI is retired — Calendly owns
scheduling now. No manual slot inserts needed.)

---

## 3. Supabase Storage bucket (for CV uploads)

Storage → Create bucket:
- Name: **`cvs`**
- **Private** (Public = OFF)
- **File size limit: 4 MB**
- **Allowed MIME types:** `application/pdf, image/png, image/jpeg`

This bucket config is the real ceiling on uploads (the app also re-validates server-side).

Also create a **public** bucket for profile pictures:
- Name: **`avatars`**
- **Public (Public = ON)** — non-sensitive LinkedIn profile photos shown in the UI
- File size limit: 2 MB; Allowed MIME types: `image/jpeg, image/png`

LinkedIn `media.licdn.com` photo URLs are signed and expire, so at sign-in the app copies
the picture once into `avatars/{sub}.jpg` and stores that durable public URL — that's why
every member keeps a visible avatar between logins (it falls back to initials only if they
have no LinkedIn photo).

---

## 4. Stripe (Connect) + Calendly — connected by the coach in-app

Payments and scheduling are no longer static env links. Nesreen connects her own Stripe and
Calendly from the **Admin → Integrations** desk (only she can; the buttons hit
`/api/coach/connect?tool=…`, gated by `COACH_LINKEDIN_SUB`). You only register the two OAuth
apps and set their client credentials.

### Stripe (Standard Connect, destination charges)
1. Stripe Dashboard → **Connect** → enable it. In **Connect → Settings**, copy the
   **client id** (`ca_…`) → `STRIPE_CONNECT_CLIENT_ID`, and add the OAuth **redirect URI**
   `https://<your-domain>/api/coach/connect`.
2. Developers → **API keys** → platform **Secret key** → `STRIPE_SECRET_KEY`.
3. Developers → **Webhooks** → Add endpoint `https://<your-domain>/api/stripe/webhook`,
   event **`checkout.session.completed`**. Signing secret (`whsec_…`) → `STRIPE_WEBHOOK_SECRET`.
   (Destination charges fire this event on the **platform** account, so this one endpoint +
   secret covers it — no separate Connect webhook needed.)
4. Nesreen clicks **Connect Stripe** and finishes Standard onboarding. Checkout is created on
   the platform with `on_behalf_of` + `transfer_data.destination` = her account and inline
   price **AED 500** (no Payment Link, no pre-made Price). Her account must support AED with
   charges enabled, or checkout returns `503 payment_unconfigured`.

### Calendly (OAuth app + webhook)
1. Calendly → **Integrations → API & webhooks → OAuth applications** → create an app with
   redirect URI `https://<your-domain>/api/coach/connect`. Copy client id/secret →
   `CALENDLY_CLIENT_ID` / `CALENDLY_CLIENT_SECRET`.
2. Nesreen clicks **Connect Calendly**. The callback stores her tokens (encrypted) + scheduling
   URL and creates a **user-scoped webhook subscription** for `invitee.created` /
   `invitee.canceled` (signing key captured from the create response, stored encrypted). Clients
   book on her real Calendly (embedded after payment); the webhook confirms the session.

Run in **test mode** first (`sk_test_`, Stripe test Connect, a test webhook), verify end-to-end,
then switch to live keys.

> Flow: pay first (Stripe Checkout) → `awaiting_schedule` + entitlement → schedule on the
> Calendly embed (`utm_content=<brief_id>`) → `invitee.created` webhook → `session_scheduled`.
> Paid state is still written **only** by the verified Stripe webhook — never the browser redirect.

---

## 5. Nesreen's coach identity (`COACH_LINKEDIN_SUB`)

The coach desk is gated to one LinkedIn account. Have Nesreen sign in with LinkedIn
once, then read her `sub` from Supabase:
```sql
select linkedin_sub, name, email from public.users order by created_at desc;
```
Copy her `linkedin_sub` → set `COACH_LINKEDIN_SUB` in Vercel → redeploy. Now only she
sees `/api/coach/*` (everyone else gets 403).

---

## 6. Deploy + verify

1. Push to `main` (Vercel builds it; Root Directory = `estrella`).
2. Set all env vars (§1), create tables (§2), bucket (§3), Stripe (§4), coach sub (§5).
3. Redeploy. Open `/api/health` signed in as the coach → all green.
4. As Nesreen: Admin → Integrations → **Connect Stripe** and **Connect Calendly**.
   Then as a client: sign in → talk to Estrella → **pay** (test card `4242…` in Stripe
   test mode) → land on the **Calendly embed** → pick a time → confirm the dashboard
   flips to a booked session and the brief shows `paid` + `session_scheduled` on
   Nesreen's desk. Optionally upload a CV and confirm the parsed fields show on the desk.

## What the code does without keys (graceful degradation)
- No `ANTHROPIC_API_KEY` → screening returns a clean "AI unavailable" and the flow
  still lets the user proceed with a typed brief; CV parse is skipped.
- Coach hasn't connected Stripe → checkout returns 503 ("booking opens soon").
- Coach hasn't connected Calendly → no scheduling URL; the post-payment step says scheduling opens soon.
- No `INTEGRATION_ENC_KEY` → Connect callbacks refuse to store tokens (loud error), never plaintext.
- No `COACH_LINKEDIN_SUB` → coach desk returns 403 for everyone (fails closed).
- No Supabase config → briefs/entitlements endpoints return 503; the page still renders.
