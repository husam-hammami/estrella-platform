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
| `STRIPE_SECRET_KEY` | `sk_live_…` (or `sk_test_…`) | webhook verify |
| `STRIPE_WEBHOOK_SECRET` | `whsec_…` from the webhook (see §4) | webhook verify |
| `STRIPE_PAYMENT_LINK_URL` | your AED 500 Payment Link URL (see §4) | checkout |

After adding/changing env vars, **redeploy** (env changes need a fresh build), then
open `/api/health` while signed in as the coach — it reports any missing/misshaped var.

---

## 2. Supabase tables + RPC (SQL Editor → run once)

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

To add some slots for Nesreen (example — adjust dates; times are UTC, GST = +4):
```sql
insert into public.availability_slots (coach_sub, slot_start, slot_end) values
  ('<COACH_LINKEDIN_SUB>', '2026-07-01 10:00+04', '2026-07-01 11:00+04'),
  ('<COACH_LINKEDIN_SUB>', '2026-07-01 14:00+04', '2026-07-01 15:00+04');
```
(A coach slot-management UI exists at `/api/coach/slots`; you can also insert directly.)

---

## 3. Supabase Storage bucket (for CV uploads)

Storage → Create bucket:
- Name: **`cvs`**
- **Private** (Public = OFF)
- **File size limit: 4 MB**
- **Allowed MIME types:** `application/pdf, image/png, image/jpeg`

This bucket config is the real ceiling on uploads (the app also re-validates server-side).

---

## 4. Stripe (real AED 500 payment)

1. Stripe Dashboard → **Payment Links** → create a link for a one-off **AED 500**
   product ("Coaching session with Nesreen"). Set the **success URL** to
   `https://<your-domain>/?paid=1` and cancel URL to `https://<your-domain>/?cancelled=1`.
   Copy the link URL → `STRIPE_PAYMENT_LINK_URL`.
2. Developers → **API keys** → copy the **Secret key** → `STRIPE_SECRET_KEY`.
3. Developers → **Webhooks** → Add endpoint:
   `https://<your-domain>/api/stripe/webhook`, event
   **`checkout.session.completed`**. Copy the **Signing secret** (`whsec_…`) →
   `STRIPE_WEBHOOK_SECRET`.

Run in **test mode** first (`sk_test_`, test link, a test webhook), verify end-to-end,
then switch to live keys.

> The booking is marked **paid only by the verified webhook** — never by the browser
> redirect. Until the webhook fires, the brief stays `pending_payment` and the slot
> hold lapses on its own after 15 min.

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
4. End-to-end test: sign in → talk to Estrella → pick a real slot → pay (test card
   `4242…` in Stripe test mode) → confirm the dashboard shows the booked session and
   the brief appears on Nesreen's desk with `paid`. Optionally upload a CV and confirm
   the parsed fields show on the desk.

## What the code does without keys (graceful degradation)
- No `ANTHROPIC_API_KEY` → screening returns a clean "AI unavailable" and the flow
  still lets the user proceed with a typed brief; CV parse is skipped.
- No `STRIPE_*` → checkout shows "payment not yet configured" instead of redirecting.
- No `COACH_LINKEDIN_SUB` → coach desk returns 403 for everyone (fails closed).
- No Supabase config → briefs/slots endpoints return 503; the page still renders.
