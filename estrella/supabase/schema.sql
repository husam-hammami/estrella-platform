-- ============================================================================
-- Nuria / Estrella platform — canonical Supabase schema (run-once, idempotent)
-- ----------------------------------------------------------------------------
-- Single source of truth for the production database. Paste the whole file into
-- Supabase → SQL Editor and Run. Safe to re-run: every statement is guarded
-- (create ... if not exists / add column if not exists / on conflict do nothing).
-- NON-DESTRUCTIVE — it never drops a table, column, or row, so it is safe to run
-- against the already-live database to converge it to this shape.
--
-- Superseded the fragmented blocks previously spread across
-- docs/LINKEDIN_SETUP.md §2 and docs/COACHING_SETUP.md §2. Those remain as prose;
-- THIS file is what you run.
--
-- The server reaches Supabase only with the service_role key (bypasses RLS).
-- RLS is enabled on every table so the anon key can read nothing.
-- ============================================================================

create extension if not exists pgcrypto;   -- gen_random_uuid()
create extension if not exists pg_trgm;     -- fast ilike name/email search on the desk

-- ----------------------------------------------------------------------------
-- users — the member registry. One row per LinkedIn identity (upserted on
-- linkedin_sub at sign-in). Also carries dashboard state: durable avatar,
-- academy/library progress, CV metadata, and the coach's per-member note.
-- ----------------------------------------------------------------------------
create table if not exists public.users (
  id               uuid primary key default gen_random_uuid(),
  linkedin_sub     text unique not null,
  name             text,
  email            text,
  photo_url        text,               -- durable avatar (copied into the public `avatars` bucket)
  locale           text,
  academy_progress jsonb,              -- { done, total, lastLesson, updatedAt }
  library_progress jsonb,              -- { done, total, opened[], updatedAt }
  cv_path          text,               -- object path in the private `cvs` bucket
  cv_name          text,
  cv_uploaded_at   timestamptz,
  coach_notes      text,               -- CRM note on the person (coach-only writable)
  studio_results   jsonb,              -- { cvreview:{result,at}, linkedin:{...}, roadmap:{...} } — Career Studio saved reports
  created_at       timestamptz not null default now(),
  last_seen_at     timestamptz not null default now()
);

-- Repair path: add every column that was introduced after the base table, so an
-- older users table converges without a destructive migration.
alter table public.users add column if not exists academy_progress jsonb;
alter table public.users add column if not exists library_progress jsonb;
alter table public.users add column if not exists cv_path text;
alter table public.users add column if not exists cv_name text;
alter table public.users add column if not exists cv_uploaded_at timestamptz;
alter table public.users add column if not exists coach_notes text;
alter table public.users add column if not exists studio_results jsonb;

-- on_conflict=linkedin_sub upserts (sign-in + coach note on a brief-only "ghost")
-- need a unique index on linkedin_sub. Defensive if an old table lacked `unique`.
create unique index if not exists users_linkedin_sub_key on public.users (linkedin_sub);
create index if not exists idx_users_last_seen_at on public.users (last_seen_at desc nulls last);
create index if not exists idx_users_created_at   on public.users (created_at  desc nulls last);
create index if not exists idx_users_name_trgm    on public.users using gin (name  gin_trgm_ops);
create index if not exists idx_users_email_trgm   on public.users using gin (email gin_trgm_ops);

-- ----------------------------------------------------------------------------
-- availability_slots — LEGACY. The custom calendar is retired (Calendly owns
-- scheduling), but the coach roster query still reads this table, so it MUST
-- exist or /api/coach/users returns 502. No longer written by the app.
-- ----------------------------------------------------------------------------
create table if not exists public.availability_slots (
  id            uuid primary key default gen_random_uuid(),
  coach_sub     text not null,
  slot_start    timestamptz not null,
  slot_end      timestamptz not null,
  booked_by_sub text,
  held_until    timestamptz,
  paid          boolean not null default false,
  created_at    timestamptz not null default now(),
  unique (coach_sub, slot_start),
  check (slot_end > slot_start)
);

-- ----------------------------------------------------------------------------
-- briefs — the screening output + booking + payment record. Created at booking
-- time by api/checkout.js (never during anonymous screening). Paid/scheduled
-- state is written ONLY by the verified Stripe/Calendly webhook.
-- ----------------------------------------------------------------------------
create table if not exists public.briefs (
  id             uuid primary key default gen_random_uuid(),
  client_sub     text not null,
  client_name    text,
  client_email   text,
  coach_sub      text not null,
  status         text not null default 'pending_payment',
    -- pending_payment | awaiting_schedule | session_scheduled | completed
    --   | needs_review | cancelled   (free text — no enum, transitions in code)
  payment_status text not null default 'pending',   -- pending | paid | failed
  identity  text,
  role      text,
  goal      text,
  obstacle  text,
  synthesis text,
  strengths text[],            -- JS string[] via PostgREST; kept text[] to match the live DB
  country   text,
  cv_path   text,              -- object path in the private `cvs` bucket
  cv_extract jsonb,            -- parsed CV fields (optional AI enrichment)
  slot_id   uuid references public.availability_slots(id) on delete set null,  -- legacy
  -- Stripe
  stripe_checkout_session_id text,
  stripe_event_id            text,
  paid_at                    timestamptz,
  -- Calendly (confirmed session)
  calendly_event_uri   text,
  calendly_invitee_uri text,
  calendly_join_url    text,
  scheduled_start      timestamptz,
  scheduled_end        timestamptz,
  -- Coach review
  coach_reviewed boolean not null default false,
  coach_notes    text,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

-- Repair path for briefs created before the Stripe/Calendly columns existed.
alter table public.briefs add column if not exists stripe_checkout_session_id text;
alter table public.briefs add column if not exists stripe_event_id text;
alter table public.briefs add column if not exists paid_at timestamptz;
alter table public.briefs add column if not exists calendly_event_uri text;
alter table public.briefs add column if not exists calendly_invitee_uri text;
alter table public.briefs add column if not exists calendly_join_url text;
alter table public.briefs add column if not exists scheduled_start timestamptz;
alter table public.briefs add column if not exists scheduled_end timestamptz;
alter table public.briefs add column if not exists cv_extract jsonb;
alter table public.briefs add column if not exists country text;

-- Indexes backing the actual query filters (coach desk, webhook matching).
create index if not exists idx_briefs_coach_sub   on public.briefs (coach_sub, created_at desc);
create index if not exists idx_briefs_client_sub  on public.briefs (client_sub, created_at desc);
create index if not exists idx_briefs_client_email on public.briefs (client_email);
create index if not exists idx_briefs_invitee_uri on public.briefs (calendly_invitee_uri);
create index if not exists idx_briefs_checkout_sid on public.briefs (stripe_checkout_session_id);

-- ----------------------------------------------------------------------------
-- entitlements — paid access. One active row = the right to book one session.
-- Written idempotently by the Stripe webhook (unique stripe_checkout_session_id
-- makes a duplicate paid event a no-op). Consumed on Calendly invitee.created.
-- ----------------------------------------------------------------------------
create table if not exists public.entitlements (
  id         uuid primary key default gen_random_uuid(),
  user_sub   text not null,
  product    text not null default 'coaching_session',
  brief_id   uuid references public.briefs(id) on delete set null,
  status     text not null default 'active',   -- active | consumed | refunded
  stripe_checkout_session_id text unique,       -- idempotency key
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
-- Defensive: on_conflict=stripe_checkout_session_id needs this unique index.
create unique index if not exists entitlements_checkout_sid_key
  on public.entitlements (stripe_checkout_session_id);
create index if not exists idx_entitlements_user_sub on public.entitlements (user_sub);
create index if not exists idx_entitlements_brief_id on public.entitlements (brief_id);

-- ----------------------------------------------------------------------------
-- webhook_events — shared idempotency ledger for BOTH providers.
--   Stripe   : stripe_event_id = the event id (evt_...)
--   Calendly : stripe_event_id = 'calendly:<event>:<invitee_uri>' (namespaced so
--              it can never collide with a Stripe id)
-- Insert-with-ignore-duplicates; an empty return means "already processed".
-- ----------------------------------------------------------------------------
create table if not exists public.webhook_events (
  stripe_event_id text primary key,
  brief_id        uuid references public.briefs(id) on delete set null,
  created_at      timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- book_entitlements — paid access to a digital-edition book. One row per
-- (buyer, book) purchase. Written idempotently by the Stripe webhook (unique
-- stripe_session_id makes a duplicate paid event a no-op). Books are a direct
-- charge on the platform's own Stripe account (not a coach destination charge).
-- ----------------------------------------------------------------------------
create table if not exists public.book_entitlements (
  id                uuid primary key default gen_random_uuid(),
  user_sub          text not null,
  book_id           text not null,
  stripe_session_id text unique,        -- idempotency key (Stripe Checkout Session id)
  created_at        timestamptz not null default now()
);
-- Defensive: on_conflict=stripe_session_id needs this unique index.
create unique index if not exists book_entitlements_session_id_key
  on public.book_entitlements (stripe_session_id);
create index if not exists idx_book_entitlements_user_sub on public.book_entitlements (user_sub);

-- ----------------------------------------------------------------------------
-- coach_integrations — per-coach Calendly/Stripe connection. Tokens + the
-- Calendly webhook signing key are AES-256-GCM encrypted by the app before
-- write (INTEGRATION_ENC_KEY); this table never holds plaintext secrets.
-- ----------------------------------------------------------------------------
create table if not exists public.coach_integrations (
  id                uuid primary key default gen_random_uuid(),
  coach_sub         text not null,
  provider          text not null,          -- 'calendly' | 'stripe'
  access_token_enc  text,
  refresh_token_enc text,
  token_expires_at  timestamptz,
  account_id        text,                   -- Stripe stripe_user_id / Calendly user URI
  organization_uri  text,                   -- Calendly org (webhook scope)
  scheduling_url    text,                   -- Calendly public scheduling link
  webhook_signing_key_enc text,             -- Calendly webhook signing key (encrypted)
  status            text not null default 'connected',   -- connected | onboarding
  connected_at      timestamptz not null default now(),
  updated_at        timestamptz not null default now(),
  unique (coach_sub, provider)
);
-- Defensive: saveIntegration upserts on_conflict=coach_sub,provider.
create unique index if not exists coach_integrations_coach_provider_key
  on public.coach_integrations (coach_sub, provider);

-- ----------------------------------------------------------------------------
-- service_requests — the Services pivot. A member SUBMITS a request (CV review,
-- LinkedIn review, career roadmap); Nesreen personally reviews and replies from
-- the coach desk. status: 'submitted' -> optional 'in_review' -> 'responded'.
-- No AI replies to members — `response` is Nesreen's own text (AI may only
-- draft FOR her inside the desk). payload is the clamped, per-service input.
-- ----------------------------------------------------------------------------
create table if not exists public.service_requests (
  id           uuid primary key default gen_random_uuid(),
  user_sub     text not null,
  user_name    text,
  user_email   text,
  service      text not null,              -- 'cv_review' | 'linkedin_review' | 'roadmap'
  payload      jsonb,                      -- clamped per-service fields (note/profile_url/...)
  cv_path      text,                       -- object path in the private `cvs` bucket (cv_review)
  status       text not null default 'submitted',   -- submitted | in_review | responded
  response     text,                       -- Nesreen's reply (human-written)
  responded_at timestamptz,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);
create index if not exists idx_service_requests_user   on public.service_requests (user_sub, created_at desc);
create index if not exists idx_service_requests_status on public.service_requests (status, created_at desc);

-- ----------------------------------------------------------------------------
-- Row Level Security — on everywhere. The service_role key (server-only)
-- bypasses RLS; the anon key gets no policies, so the browser can read nothing.
-- ----------------------------------------------------------------------------
alter table public.users              enable row level security;
alter table public.availability_slots enable row level security;
alter table public.briefs             enable row level security;
alter table public.entitlements       enable row level security;
alter table public.book_entitlements  enable row level security;
alter table public.webhook_events     enable row level security;
alter table public.coach_integrations enable row level security;
alter table public.service_requests   enable row level security;

-- ----------------------------------------------------------------------------
-- Storage buckets (created via SQL so this script is self-contained).
--   avatars — PUBLIC. Durable copies of LinkedIn profile photos (licdn URLs are
--             signed + expire). 2 MB, jpeg/png.
--   cvs     — PRIVATE. Member CV uploads via short-lived signed URLs. 4 MB,
--             pdf/png/jpeg. This bucket config is the real upload ceiling.
--   books   — PRIVATE. Paid digital-edition books (Nesreen's own). Served to
--             owners via short-lived signed URLs. 8 MB, html/pdf.
-- (Equivalent to Storage → New bucket in the dashboard; on conflict = no-op.)
-- ----------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('avatars', 'avatars', true, 2097152, array['image/jpeg','image/png'])
on conflict (id) do nothing;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('cvs', 'cvs', false, 4194304, array['application/pdf','image/png','image/jpeg'])
on conflict (id) do nothing;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('books', 'books', false, 8388608, array['text/html','application/pdf'])
on conflict (id) do nothing;

-- ============================================================================
-- Done. Next: set the env vars (see docs/COACHING_SETUP.md §1), redeploy, then
-- open /api/health signed in as the coach to confirm every var is the right shape.
-- ============================================================================
