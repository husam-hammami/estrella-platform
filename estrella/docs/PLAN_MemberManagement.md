# PLAN — Member Management Desk for Nesreen ("The Standing File")

> Forged in /warcry · Reviewed (bulletproof) — **VERDICT: SUFFICIENT** — a member-management
> desk that fuses each person's info, payments, sessions, progress & history into one
> read-only **case file**, server-paged for scale, folded into the existing 12 Vercel
> functions with **zero new `api/*.js`** and **zero new env vars**.
>
> Provenance: 5 read-only scouts (codebase cartographer · data/state · pre-mortem ·
> prior-art · user/workflow) → synthesis → 3 candidate approaches scored → daedalus +
> creative-ui-director concept (12 candidates, one selected) → 2 bulletproof rounds.
> Grounded in live code, not guesses. Design-only: this is a PLAN + a concept + a mockup
> prompt — no implementation, no app files touched.

---

## Goal (outcome)

Give Nesreen (the single coach/admin) a real member-management desk: for every signed-in
person she can see and track their **info, progress (Academy/Library), sessions (full
history + upcoming), payments/entitlements, briefs, and an activity history** — at a glance
in the list, and in depth in a per-member view.

**Success signal:** from one screen she can answer *"who is this person, what have they
paid, what sessions have they had/booked, where are they in the program, and what do they
need next"* — without leaving the app or opening Supabase/Stripe.

## Success criteria & guardrails (restated, with the hard ones)

1. **Exactly 12 Vercel functions** — every new endpoint folds into the existing
   [`estrella/api/coach/[route].js`](estrella/api/coach/%5Broute%5D.js) dispatcher (one new
   `ROUTES` key + one handler in that same file). **No new `api/*.js` file.** **No new env
   vars** (sidesteps the silent-misconfig incident class entirely).
2. **On-brand** with the Nuria contract — warm ivory + gold-deep + ink, reusing the existing
   dossier/leather/paper sub-palette and `border-left` track-accent language already in
   [`estrella/index.html`](estrella/index.html). No SaaS-default purple/indigo/cyan, no
   glassmorphism-as-concept.
3. **Only-Nesreen access** preserved — `L.requireCoach(req,res)` on every new route and
   field (fails closed if `COACH_LINKEDIN_SUB` is unset).
4. **Payment state stays webhook-written** — the desk is strictly **read-only** over
   `briefs`/`entitlements`. The *only* new write in the whole feature is a per-member coach
   note. [`estrella/api/stripe/webhook.js`](estrella/api/stripe/webhook.js) remains the sole
   writer of paid/entitlement state.
5. **Scales past a handful** — server-side search/sort/pagination; the roster never
   renders-all (today it does), and a member's dense history collapses.
6. **Additive schema only** — one nullable column; no destructive migration; RLS stays on.
7. **Additive feature, phased by value** — ship a usable slice first (roster + truth),
   depth (the open file) next, polish (notes/export) last.

---

## Current state we ground in (read, not guessed)

**The 12 functions (confirmed by enumerating `estrella/api/**/*.js`, deduped):**
[`checkout`](estrella/api/checkout.js), [`cv-upload-url`](estrella/api/cv-upload-url.js),
[`cv-parse`](estrella/api/cv-parse.js), [`briefs`](estrella/api/briefs.js),
[`me`](estrella/api/me.js), [`estrella`](estrella/api/estrella.js),
[`health`](estrella/api/health.js), [`availability`](estrella/api/availability.js),
[`linkedin/login`](estrella/api/linkedin/login.js),
[`linkedin/callback`](estrella/api/linkedin/callback.js),
[`stripe/webhook`](estrella/api/stripe/webhook.js), and the
[`coach/[route]`](estrella/api/coach/%5Broute%5D.js) dispatcher. **= 12. We are at the cap.**

**The dispatcher** ([`estrella/api/coach/[route].js`](estrella/api/coach/%5Broute%5D.js))
routes by the last path segment via `ROUTES = { slots, briefs, 'cv-url', users, integrations,
connect }`. `slots`/`briefs`/`cv-url` re-enter sibling root functions (which is why
`availability.js`/`briefs.js`/`cv-upload-url.js` are also functions); `users`/`integrations`/
`connect` are handlers defined inline. **Adding a `ROUTES` key + an inline handler costs zero
functions.** `vercel.json` rewrites are free.

**What the desk shows today** (gap baseline):
- [`coachUsers`](estrella/api/coach/%5Broute%5D.js) fetches `users?select=*` (ALL users),
  ALL coach briefs, ALL slots, builds a row per user, returns `{users, totals}` — and
  [`renderCoachUsersRemote`](estrella/index.html) renders **every** card at once. Per user:
  avatar/name/email, one summarized booking badge, Academy done/total, Library done/total,
  briefs count + latest goal, CV status.
- A global briefs queue ([`renderCoachBriefs`](estrella/index.html) +
  [`coachBriefCardHTML`](estrella/index.html)) with full screening, mark-reviewed, notes,
  CV signed-link via [`coach/cv-url`](estrella/api/cv-upload-url.js).

**Gap analysis — CHEAP (data exists → surface) vs NEW DATA (needs a column/table):**

| Gap | Source today | Verdict |
|---|---|---|
| **Payments / lifetime value** | `briefs.payment_status`/`paid_at` + `entitlements.status` (active\|consumed\|refunded); price is the **constant** `PRICE_AMOUNT=50000` fils (AED 500) in [`checkout.js`](estrella/api/checkout.js) | **CHEAP (derived).** No per-txn amount is stored → value = `count(entitlements active+consumed) × AED 500`. Honest approximation; see Money-truth note. |
| **Full session history per user** | multiple `briefs` rows already carry `scheduled_start/end`, `calendly_join_url`, `paid_at`, `status` | **CHEAP** — already fetched, just under-used (only ONE booking is summarized today). |
| **Progress detail** | `users.academy_progress`/`library_progress` jsonb hold `lastLesson`, `updatedAt`, `opened[]` | **CHEAP** — fetched, normalized in [`normalizeProgress`](estrella/api/coach/%5Broute%5D.js), but only `done/total` is surfaced. |
| **Activity / history timeline** | none stored | **CHEAP (derived).** Assemble from existing timestamps (`users.created_at`, `last_seen_at`, brief `created_at`/`paid_at`/`scheduled_start`/status, `cv_uploaded_at`, progress `updatedAt`). **No new table for v1.** |
| **Per-member CRM note** | notes live on `briefs.coach_notes`, not the person | **NEW DATA** → one additive column `users.coach_notes`. |
| **Search / filter / sort / paginate / drill-down / CSV** | none (render-all) | **CHEAP** — PostgREST query params + UI; no new data. |

**Hard truths the design must honor (from the scouts / [`INCIDENTS.md`](estrella/docs/INCIDENTS.md)):**
- **Payment truth:** [`stripe/webhook.js`](estrella/api/stripe/webhook.js) is the *only*
  writer of `paid`/`entitlement` state. The desk READS money; it never writes it.
- **Secrets/PII:** [`coach_integrations`](estrella/lib/api.js) holds encrypted tokens — the
  member endpoint must select **explicit columns** and never touch that table; never return a
  token; CV only via the existing short-lived signed URL.
- **Dev-admin-preview path:** [`isDevAdminPreview()`](estrella/index.html) (localhost) forces
  `state.isCoach=true` and renders **local seed data only** (`renderCoachUsersLocal`), never
  the API. Any new surface must branch to the local seed too, mirroring the existing
  [`renderCoachBriefs`](estrella/index.html) dispatcher — or it breaks Nesreen's offline preview.
- **Deploy class:** code-complete ≠ deployed — push to `main`, Vercel **Root Directory =
  `estrella`**; a new `ROUTES` key 404s until pushed. No new env vars ⇒ the silent
  env/secret misconfig class does not apply to this feature.

---

## UI/UX concept — **"The Standing File"** (daedalus + creative-ui-director)

> **Concept:** *The Standing File.* **Thesis (one line):** *every member is one
> continuously-kept **case file** whose single **Spine** fuses money, sessions, program
> progress and history into one chronological record Nesreen reads top-to-bottom — the whole
> person as one legible object, never a rack of tabs.*

**Surface type:** `dashboard/data` leaning `tool/dense` → co-equal elements with a clear
scan-order (not one 40% hero), a flat-ish type scale, and states that matter more than drama.

**Why this and not a customer-360:** the product *already* speaks "dossier." The Academy
redesign defined a case-file vocabulary in [`index.html`](estrella/index.html) `:root` —
`--leather`/`--leather-ink`, `--rust`, `--tan`, `--paper`/`--paper-edge`, and per-track
fore-edge accents (`--track-foundation/-signature/-interview`), reused in `.ac-vault-item`
`border-left`. Nesreen's job is literally *reading case files on people before their hour.*
The concept borrows the product's own language instead of importing generic CRM chrome, so it
**fails the logo-swap test for competitors** (you can't restyle it into Salesforce) and
**passes the blur test** (its silhouette is a file shelf + an open file with a record spine,
not sidebar+hero+card-grid).

### Three-second contract (≤3 reads)
1. **Who needs me now** — a prioritized *Needs-you* band (unreviewed brief · paid-awaiting-
   schedule · upcoming session) sits above the directory.
2. **Where each person stands** — one fused state per file row: a fore-edge state color + a
   compact **Money · Program · Session** trio.
3. **Open one → the whole person** — one click stands the file up into the Spine.

### Proprietary functional artifact — **the Spine**
A single vertical *record of the relationship*: one chronological column where each entry is a
**fused fact** — a date, a small glyph, a one-line meaning, and inline money/progress where
relevant (e.g. *"12 Mar · Paid · AED 500"*, *"14 Mar · Session scheduled · Tue 19:00 GST ·
join"*, *"Completed lesson 6 of 82"*). It is not decoration:
- **encodes data** — every entry's type, money, and state are in the mark;
- **supports the primary action** — Nesreen reads it to prep / act on the next step;
- **changes across states** — empty (just *joined* + *last seen*) → one entry → dense;
- **survives decoration removal** — strip motion/texture and it's still a dated ledger of
  facts (passes the functional-artifact + screenshot-trap tests);
- **is product-owned** — it's the coach's case-file *reading* of a person, in Nuria's dossier
  idiom. Crucially it is **one record, not tabs** (the user's explicit ask): Overview /
  Sessions / Payments don't fragment the person — they're threads in one Spine, with a sticky
  *At a glance* summary beside it.

### Information → visual mapping (fixed semantics; grayscale-safe)
| Data | Visual | Token |
|---|---|---|
| State: needs-action / scheduled / completed / lead / refund-or-review | fore-edge color + status pip **+ glyph + label** (never color alone) | gold `--gold-deep` / `--success` / `--ink` / `--text-mute` / `--danger` |
| Money (lifetime value, per payment) | tabular-nums figure on the head; AED 500 entries inline on the Spine; refunded = struck + danger | `--gold-deep`, `font-variant-numeric:tabular-nums` |
| Program | two thin Academy/Library meters + `lastLesson` on the Spine | `--gold`/`--gold-bg` |
| Session | Spine entries with GST date/time + join link (shown only when relevant) | `--success`/`--ink` |
| Recency / history | the Spine order itself + a relative "last seen" | `--text-dim` |

### Signature interaction — **"open the file"**
Clicking a roster row stands the file up: the row's fore-edge color sweeps into the detail
header and the Spine writes itself in, newest milestones first, staggered top-down. Close lays
it back into the roster. One meaningful gesture (you are literally opening a case file),
continuous with the app's existing `translateY + opacity` view language — not a novelty.

### Composition
**Desktop (≥1024px):** a slim totals ribbon (To review · Scheduled · Lifetime value ·
Members) over a **master–detail**: left **roster ≈38%**, right **open file ≈62%** (honors the
62/38 asymmetry guard, avoids the dead-center island). The open file is two zones — the
**Spine** (primary, ~60% of the detail) and a **sticky "At a glance"** column (~40%: lifetime
value, sessions count, Academy %, Library %, next session, CV link, the coach note).
**Mobile (<768px):** the roster *is* the screen; tapping a row pushes the open file as a
full-screen surface (reuse the `.ac-overlay` scaffold + push motion); back returns. The detail
**re-composes** (head → At-a-glance → Spine → note), it is not a shrunk two-column.
**Roster row ("file tab"):** a dense row with a colored fore-edge (state), name + who-they-
are, the Money·Program·Session trio, and a pulsing gold *needs-you* flag — scannable, dense,
paginated. This is the scale fix and a concept asset (a shelf of files, not a SaaS table).

### Motion spec (native CSS `@keyframes` + WAAPI `element.animate()`; **no new dependency** — matches the vanilla stack)
- **Continuous (one, meaning-bearing):** the *needs-you* flag on action rows —
  `@keyframes needsPulse { 0%,100%{opacity:.55} 50%{opacity:1} }`, **3.2s**
  `cubic-bezier(0.4,0,0.2,1)` infinite, **opacity-only**, applied *only* to rows that need
  action (it encodes an unattended state, not spectacle). No other infinite animation.
- **Triggered (open the file):** header — `transform: translateY(8px)→0`, `opacity 0→1`,
  **260ms** `var(--ease-out)` (`cubic-bezier(0.16,1,0.3,1)`). Spine entries stagger —
  per-entry `translateY(6px)→0` + `opacity 0→1`, **180ms**, **28ms** stagger, **capped at 12
  entries** then instant (dense files don't ripple for seconds). Close = reverse, **160ms**.
  Row press feedback **120ms**. **Transform/opacity only** — never animate `filter`/`box-
  shadow`/blur, never move a blurred layer (the rubric's #1 jank source).
- **Reduced motion (its absence is a concept failure):**
  `@media (prefers-reduced-motion: reduce)` → no pulse, no stagger, no slide; the file simply
  appears (opacity ≤1 frame) with the Spine fully present and legible. The global resets at
  [`index.html`](estrella/index.html) lines ~78–83 and ~2995 already neutralize
  animations/transitions; JS must additionally guard `matchMedia('(prefers-reduced-motion:
  reduce)').matches` **before** any `.animate()` call.

### State coverage (empty / dense / low-capacity / error)
- **Empty (no members):** a closed empty file — reuse `.coach-empty` copy ("No members yet —
  they appear after LinkedIn sign-in").
- **Empty file (member, no briefs/payments):** the Spine still shows the two facts that always
  exist (joined, last seen) + "No brief yet / No session yet / No payment yet" — never blank.
- **Dense (many sessions/lessons):** Spine caps at ~12 then "show earlier"; low-signal lesson
  opens fold into one expandable "12 lessons opened" entry so money/session milestones keep
  prominence.
- **Low-capacity (localhost dev-preview / backend down):** roster + file render from the local
  seed (extend `renderCoachUsersLocal`); integration-only affordances (CV link) disabled with
  a "dev preview" note.
- **Error:** 403 → "This desk is for Nesreen"; 401 → sign-in prompt; 5xx → per-section "couldn't
  load — retry" without blanking the roster.

### Why original AND buildable here
Original: a *case-file/Spine* reading of a person (one fused record) in the product's own
dossier idiom — not a tabbed customer-360. Buildable on this exact stack: pure vanilla DOM
string-templating (same shape as [`coachUserCardHTML`](estrella/index.html) /
[`coachBriefCardHTML`](estrella/index.html)); the overlay scaffold (`.ac-overlay` /
`.ac-vault-card`) and its reduced-motion branch already exist; data is one richer coach
endpoint folded into the existing dispatcher; CSS uses only existing tokens.
**Primary risk:** the Spine cluttering if every lesson-open becomes an entry → mitigated by
collapsing low-signal events and reserving Spine prominence for money/session/brief milestones.

### Concepts generated & killed (derivative-family + originality tests)
Tabbed customer-360 *(fails blur/logo-swap; "tabs" the user rejected)* · card-grid + generic
slide-over *(blur-borderline; kept only as fallback Approach A)* · KPI-tiles analytics
dashboard *(vanity metrics, not per-person)* · Kanban pipeline *(privileges stage over person)*
· member constellation/territory map *(metaphor-load; hides money/dates)* · vitals/gauges
instrument *(clinical mismatch with a warm coaching brand)* · relationship graph *(no such
data)* · double-entry account ledger *(money metaphor distorts coaching)* · two-page book
spread *(decorative 50/50, fights dense data)* · global timeline-first feed *(loses per-person
prep)*. The paper/record/ledger family converged; **one thesis selected: the Standing File +
Spine**, grafting the global feed's event-derivation (scoped to one member) and the book
spread's paper texture.

---

## First-screen mockup prompt (compiled per prompt-compiler.md — render separately; do NOT generate here)

```text
Create one polished 1440×1024 desktop mockup for Nuria's coach member-management desk
(admin-only, used by one career coach, Nesreen).

CONCEPT: The Standing File

Every member is one continuously-kept case file. The screen is a master–detail "desk":
a left roster of file rows and, on the right, ONE open file whose single vertical "Spine"
fuses payments, sessions, program progress and history into one chronological record read
top-to-bottom. It is a case file, not a tabbed dashboard.

The dominant artifact is the Spine: a single dated column on the open file where each entry
is a fused fact — date, small glyph, one line of meaning, and inline money or progress
(e.g. "12 Mar · Paid · AED 500", "14 Mar · Session scheduled · Tue 19:00 GST · join",
"Completed lesson 6 of 82"). It encodes state and supports the coach's next action; it is
not decorative. Beside it sits a sticky "At a glance" summary (lifetime value, sessions,
Academy %, Library %, next session, a private coach note).

The screen must communicate immediately:
1. Who needs Nesreen now — a short "Needs you" band above the directory.
2. Where each person stands — per file row, a colored fore-edge (state) + a compact
   Money · Program · Session trio.
3. Open one → the whole person — one open file showing the Spine.

COMPOSITION
A slim totals ribbon (To review · Scheduled · Lifetime value · Members) across the top.
Below: left roster ~38% (stacked "file tab" rows with a colored left fore-edge, name,
role, the Money·Program·Session trio, and a small gold "needs you" dot on action rows);
right open file ~62% split into the Spine (~60%) and the sticky At-a-glance column (~40%).
Asymmetric, dense but calm, generous internal padding, clear top-left→down scan order.

CONTENT (realistic, minimal)
Roster: "Layla Haddad — Product lead · AED 1,000 · Academy 24/82 · Tue 19:00",
"Omar Fawzy — Brief to review · not paid", "Sara Nasser — Completed · AED 500".
Open file: Layla Haddad, Product lead, Dubai; lifetime AED 1,000; Academy 24/82,
Library 2/4; next session Tue 19:00 GST. Spine entries: joined, brief created, paid AED
500, session scheduled, session completed, paid again, lessons progressed, last seen.

CRAFT
Warm ivory paper canvas (#F2EBDC / #FBF7EC), ink text (#14120E), gold-deep accents
(#97793F) with a muted dossier sub-palette (deep-green leather + terracotta + tan) used
ONLY for state fore-edges and the file's tab. Cormorant Garamond for names/headings, Inter
for data; tabular figures for money/dates. Paper grain and a subtle file fore-edge, one soft
shadow per element, no glass. Fixed state semantics: gold = needs action, green = scheduled,
ink = completed, muted = lead, terracotta/red = refund or review.

REFERENCE CONTRACT
Emulate only the craft of a fine paper case file / archival dossier and a restrained
financial statement (legible density, tabular money, calm hierarchy). Do NOT copy any CRM/
SaaS layout: no left nav-rail of icons, no KPI gauge tiles, no tabbed detail pane, no
purple/indigo/cyan, no glassmorphism.

AVOID
Tabbed detail; a giant hero number; KPI gauge tiles; sidebar + card-grid silhouette;
neon/purple SaaS palette; glassmorphism/blur; emoji; placeholder lorem; a centered island
with empty margins; rounded-2xl indigo buttons; charts that hide exact values.

Silently explore alternatives, then render only the strongest final screen. No variants,
annotations, or implementation documentation.
```

References for that prompt — **emulate (craft only):** fine archival paper dossier; a
restrained bank/financial statement (tabular money, calm density). **Product facts to
preserve:** Nuria ivory/gold/ink + dossier sub-palette; Cormorant+Inter; AED 500 session
price; Academy/Library progress; GST times; admin-only. **Motifs forbidden to copy:** any
CRM/SaaS sidebar-rail + KPI-tile + tabbed-detail composition; purple/cyan; glassmorphism.

---

## Approach (winner + why), and the rejected ones

**WINNER — Approach B: "The Standing File" — master-detail roster + open-file Spine, server-paged.**
A two-band roster (Needs-you + paginated directory) plus a per-member open file, both folded
into [`coach/[route].js`](estrella/api/coach/%5Broute%5D.js). Fixes scale, delivers the
concept, stays read-only over money, costs zero functions. *Why:* highest value-to-risk —
it's the only option that fixes the render-all scale problem **and** delivers the per-person
depth the ask demands, while reusing existing overlay/motion/token scaffolding.

**Rejected — Approach A: "Drawer on the grid."** Keep today's 2-col card grid, bolt on a
slide-over and a fatter `coachUsers` payload. *Killed because:* it does **not** fix scale
(still renders-all), and a grid+generic-drawer reads as default CRM (blur/logo-swap risk).
Grafted: its low-risk *incremental phasing* (ship truth on a usable slice before the full file).

**Rejected — Approach C: "Timeline-first global ledger."** Turn the desk into one global
activity stream with member filters. *Killed because:* it answers "what just happened" but not
"who is this person / prep this member," and it's a bigger rewrite. Grafted: its
**event-derivation** becomes the per-member Spine (the best idea in it, scoped correctly).

**Tension surfaced & resolved (the key design decision): paginate-vs-join.** "Sort the roster
by who-needs-you" wants a briefs↔users join, but server-side user pagination wants a cheap
single-table order. Resolved with a **two-band roster**: Band 1 *Needs you* derived from the
coach's briefs (small, bounded, not paginated); Band 2 *All members* = `users` paged by
`last_seen` with `q`/`sort`. This sidesteps the join, fixes scale, and matches the JTBD.

---

## Phased steps (each phase ships usable value)

### Phase 0 — Backend truth (no UI risk; read-only over money)
- **Schema:** `alter table public.users add column if not exists coach_notes text;` (additive).
- **Extend [`coachUsers`](estrella/api/coach/%5Broute%5D.js)** to return the two-band, paged
  shape and richer per-row truth — **without breaking the current caller** (no params = sane
  defaults): `{ needs:[…], members:[…], totals:{…}, page, pageSize, total }`. Each member row
  gains derived **lifetime value** (entitlements active+consumed × AED 500), **payment_status**,
  real **next/last session** (from `scheduled_start`), entitlement counts, plus today's
  Academy/Library/CV/briefs. Preserve the existing **brief-only "ghost" member union** (lines
  ~88–100). Server-side `q` (name/email `ilike`), `sort`, `page`/`limit` via PostgREST
  `limit`/`offset` + `Prefer: count=exact` (`Content-Range` → `total`).
- **New `ROUTES` key `member` → `coachMember`** in the same file (zero new functions):
  - `GET /api/coach/member?sub=<linkedin_sub>` → the open-file payload: identity, derived
    lifetime value, entitlements summary, full **sessions** (mapped from briefs), **progress
    detail** (academy/library jsonb: `lastLesson`/`updatedAt`/`opened[]`), CV
    (name/uploadedAt/hasCv), `coach_notes`, and the **derived Spine** (events merged & sorted
    server-side from `users` + `briefs` + `entitlements` timestamps). **Explicit `select`
    columns only; never `coach_integrations`; never a token.**
  - `PATCH /api/coach/member?sub=<sub>` body `{coach_notes}` → upsert the `users` row on
    `linkedin_sub` (reusing the upsert pattern in [`lib/api.js`](estrella/lib/api.js)) so even
    brief-only members can be annotated. **This is the only new write in the feature.**
- `L.requireCoach` on both; verify **still 12 functions**; `/api/health` green; **no new env**.

### Phase 1 — The roster (scale fix + at-a-glance) ✅ ship first
- Replace the render-all grid ([`renderCoachUsersRemote`](estrella/index.html) +
  [`coachUserCardHTML`](estrella/index.html)) with the two-band **Standing File roster**:
  *Needs-you* band + paginated directory of **file-tab rows** (fore-edge state color, name +
  who-they-are, the Money·Program·Session trio, pulsing needs-you flag). Server search box,
  sort control, and "load more"/pager. On-brand tokens only; reduced-motion honored.
- Branch for **dev-preview/offline** (mirror [`renderCoachBriefs`](estrella/index.html)):
  extend `renderCoachUsersLocal` to seed a roster. Keep the briefs queue working as-is.

### Phase 2 — The open file (the Spine)
- `openMemberFile(sub)` → `GET /api/coach/member` → render the open file: head (avatar, name,
  role, lifetime value, status), the **Spine** (one fused chronological record with the
  capped stagger), and the sticky **At-a-glance** (totals + next session + CV signed-link via
  the existing [`coach/cv-url`](estrella/api/cv-upload-url.js)).
- Desktop side panel (master-detail) + mobile full-screen push reusing the `.ac-overlay`
  scaffold. Full triggered motion + the reduced-motion branch + the matchMedia `.animate()`
  guard. Dev-preview/offline branch renders the file from seed. All states wired.

### Phase 3 — Notes + export + dense polish
- Per-member **coach note** editor → `PATCH /api/coach/member` (debounced save, optimistic +
  rollback on error). **CSV export** of the current filter — either client-side from the
  fetched page, or a `?export=csv` branch on `coachUsers` (still zero functions) for a full
  export. Spine "show earlier" + lesson-open collapse; refund display; empty/dense refinements.

---

## Files & surfaces touched
- **No new files** (other than this plan). **No new env vars. Still 12 functions.**
- [`estrella/api/coach/[route].js`](estrella/api/coach/%5Broute%5D.js) — extend `coachUsers`
  (two-band, paged, richer rows, derived money/sessions); add `ROUTES.member` + `coachMember`
  (GET detail + Spine; PATCH `coach_notes`). All `requireCoach`.
- [`estrella/index.html`](estrella/index.html) — new `.coach-*` roster + open-file + Spine CSS
  (reusing existing tokens + `.ac-overlay`/`.ac-vault` scaffold); replace
  `renderCoachUsersRemote`/`coachUserCardHTML`/`coachRenderUsers`; add `openMemberFile`,
  Spine render, note editor; extend `renderCoachUsersLocal` (dev-preview/offline); keep the
  briefs queue intact.
- [`estrella/vercel.json`](estrella/vercel.json) — optional pretty-URL rewrite only (free); not
  required (the dispatcher already routes by segment).
- **Reused as-is (read-only):** [`coach/cv-url`](estrella/api/cv-upload-url.js) (CV link),
  [`lib/api.js`](estrella/lib/api.js) helpers (`sb`, `requireCoach`, `getIntegration` *not*
  needed here, upsert pattern for notes).

## Data & schema changes (additive; RLS stays on)
```sql
-- The ONE new writable field: a per-member coach note (CRM note on the person).
alter table public.users add column if not exists coach_notes text;

-- No new tables. The activity Spine is DERIVED server-side from existing rows:
--   users.created_at (joined) · users.last_seen_at (last active)
--   briefs.created_at (brief) · briefs.paid_at (paid AED 500) · briefs.scheduled_start
--   briefs.status=completed · users.cv_uploaded_at · academy/library_progress.updatedAt
-- RLS is unchanged; the server uses service_role (bypasses RLS) exactly as today.
```
```sql
-- FUTURE ONLY (NOT this pass) — additive upgrades if ever needed:
-- alter table public.entitlements add column if not exists amount   integer; -- fils, exact paid
-- alter table public.entitlements add column if not exists currency text;    -- 'aed'
-- create table public.coach_member_events (...);                              -- true audit log
```

**Money-truth note (read this before believing a number):** there is **no stored per-
transaction amount** today — `PRICE_AMOUNT=50000` fils (AED 500) is a constant in
[`checkout.js`](estrella/api/checkout.js). So lifetime value is a **derived approximation** =
`count(entitlements where status in (active,consumed)) × AED 500`; `refunded` rows are
excluded and shown struck. Nothing in the current code writes `refunded` (no refund webhook
exists; refund execution is out of scope) — the desk *reads* it if it ever appears but never
creates it. If variable pricing ever ships, store `entitlements.amount` (additive above) and
switch the figure from derived to summed. **The desk must label this as the standard session
price, not assert a stored amount.**

## API design (how it folds into the 12 functions)
`ROUTES` in [`coach/[route].js`](estrella/api/coach/%5Broute%5D.js) gains one key; everything
stays in that one function:
```js
const ROUTES = {
  slots:        { handler: availability,     marker: ['coach','slots'] },
  briefs:       { handler: briefs,           marker: ['coach','briefs'] },
  'cv-url':     { handler: cvUploadUrl,      marker: ['coach','cv-url'] },
  users:        { handler: coachUsers },     // EXTENDED: ?q,sort,page,limit[,export=csv] → {needs,members,totals,page,total}
  member:       { handler: coachMember },    // NEW: GET ?sub=… (detail + Spine) · PATCH {coach_notes}
  integrations: { handler: coachIntegrations },
  connect:      { handler: coachConnect },
};
```
- **Auth:** `L.requireCoach(req,res)` first in `coachMember` and on the extended `coachUsers`
  (already present) — 403 for everyone but `COACH_LINKEDIN_SUB`.
- **Read-only over money:** `coachMember` GET only `select`s; the only write path is the
  `coach_notes` PATCH to `users`. No route here writes `briefs.payment_status`,
  `paid_at`, or any `entitlements` field.
- **PII/secrets:** `coachMember` uses explicit `select` lists; it **never** queries
  `coach_integrations` and never returns a token; CV bytes are reached only through the
  existing signed-URL route.
- **Pagination/search (PostgREST):** `users?select=…&order=<sort>&limit=<n>&offset=<n>` with
  `Prefer: count=exact` (parse `Content-Range` for `total`); search via
  `or=(name.ilike.*q*,email.ilike.*q*)`. The *Needs-you* band derives from the coach's briefs
  (bounded) — not paginated.
- **Confirmation: still exactly 12 Vercel functions** (one new `ROUTES` key + inline handlers
  add no file).

## Per-surface state coverage
| Surface | empty | loading | error | other |
|---|---|---|---|---|
| Roster (Needs-you) | "Nothing needs you right now" | skeleton rows | 403/401/5xx + retry | pulse only on action rows |
| Roster (directory) | "No members yet" (`.coach-empty`) | skeleton rows | 5xx + retry (roster not blanked) | search-no-match; "load more"; dev-preview seed |
| Open file (Spine) | joined + last-seen + "no brief/session/payment yet" | spine placeholder | per-section error | dense → cap + "show earlier"; reduced-motion = static |
| At-a-glance | "No payments / no sessions yet" | — | CV link unavailable → disabled | refund struck; dev-preview disables CV link |
| Coach note | empty textarea + hint | — | save failed → rollback + toast | debounced optimistic save |

## Test & verification strategy
- **12-function check:** enumerate `estrella/api/**/*.js` → confirm count unchanged; the new
  route is reachable as `/api/coach/member`.
- **Coach gate:** `/api/coach/member` and the extended `/api/coach/users` as a non-coach →
  403; as `COACH_LINKEDIN_SUB` → data. Unset `COACH_LINKEDIN_SUB` → 403 (fails closed).
- **Payment read-only:** assert no code path in the desk writes `payment_status`/`paid_at`/
  `entitlements`; the `coach_notes` PATCH touches only `users`. Money figure = derived AED 500
  × count; a `refunded` entitlement is excluded + shown struck.
- **Scale:** seed many users → roster returns one page (bounded payload/DOM); `total` correct;
  search/sort/paginate server-side; the Spine caps dense histories.
- **PII/secrets:** inspect `coachMember` responses → no tokens, no `coach_integrations`, CV
  only via signed URL.
- **Dev-preview/offline:** on localhost, roster + open file render from seed; CV link disabled
  with the dev note; no API calls fired.
- **Reduced motion:** with `prefers-reduced-motion: reduce`, no pulse/stagger/slide; the file
  is fully legible; verify motion by sampling (handle/computed style), never by a still.
- **Regression:** the existing briefs queue + mark-reviewed + CV link still work unchanged;
  brief-only "ghost" members still appear and are annotatable.
- (Verification per the project norm: `preview_eval`/`preview_inspect` for DOM/computed styles
  + returned JSON; screenshots time out on this SPA.)

## Rollout & rollback
- Additive throughout. **Push to `main` before the Vercel build**, **Root Directory =
  `estrella`** — a new `ROUTES` key 404s until pushed (the code-complete≠deployed class).
- **No new env vars** ⇒ the silent env/secret misconfig class doesn't apply; still run
  `/api/health` (coach-gated) after deploy as the standard gate.
- Phase 1 (roster) is independently useful; Phase 2 (file) adds depth; Phase 3 is polish.
- **Rollback = revert the phase commit.** The `users.coach_notes` column is additive and may
  stay (harmless if the UI is reverted). No destructive migration; RLS untouched.

## Risks → mitigations
- **Render-all doesn't scale** → two-band roster + server pagination/search/sort; Spine caps.
- **Fake/old money** → desk is read-only; webhook stays sole writer; value is **derived AED
  500 × entitlement count**, labeled as list price (not a stored amount); refunds excluded.
- **Function-cap breach** → fold into the dispatcher (one `ROUTES` key, inline handlers); no
  new `api/*.js`; verify 12 after.
- **PII/secret leak** → `requireCoach` everywhere; explicit `select`; never `coach_
  integrations`/tokens; CV only via signed URL.
- **Dev-preview breakage** → explicit local-seed branch for roster + file (mirrors the existing
  dispatcher).
- **Motion jank / a11y** → transform+opacity only; no moving blurred layers; reduced-motion
  branch + matchMedia guard.
- **Brief-only "ghost" members can't be annotated** → notes PATCH upserts the `users` row on
  `linkedin_sub`.
- **Off-brand drift** → tokens-only palette; fixed state semantics; reuse `.ac-overlay`/
  `.ac-vault` scaffold; no purple/glass.

## Out of scope (this pass)
Refund/dispute **execution**; multi-coach/roles; billing exports to accounting; messaging/email
to members; editing a member's LinkedIn identity. (A true audit-log table and per-transaction
`entitlements.amount` are noted as additive future upgrades, not built here.)

---

## Bulletproof review (adversarial self-critique — 2 rounds, capped at 3)

**Round 1 — coverage table**

| Must-have | Covered? | Where |
|---|---|---|
| 12-function cap holds | ✅ | one `ROUTES` key + inline handlers; "still 12" verified in tests |
| No new `api/*.js`, no new env | ✅ | dispatcher fold-in; feature adds zero env |
| Only-Nesreen access on every new route/field | ✅ | `requireCoach` on `coachMember` + extended `coachUsers` |
| Payment state webhook-written; desk read-only | ✅ | only write = `users.coach_notes`; Money-truth note |
| Scales past a handful (server-side, not render-all) | ✅ | two-band roster + PostgREST paginate/search/sort |
| On-brand (no SaaS purple/glass) | ✅ | tokens-only; dossier idiom; mockup AVOID list |
| Additive schema; RLS stays | ✅ | one nullable column; no new tables; RLS untouched |
| Reduced-motion branch (concept-level) | ✅ | full branch + matchMedia guard + motion-by-sampling |
| Per-member depth NOT just tabs | ✅ | the Spine = one fused record + sticky summary |
| Empty/dense/low-capacity/error states | ✅ | state table + concept states |
| Dev-admin-preview path | ✅ | local-seed branch for roster + file |
| Deploy guards (push/Root Dir) | ✅ | rollout section |

**Round 1 — gaps found (biggest first) → fixed in this draft**
1. *Paginate-vs-join tension* (sort by needs-you fights single-table paging) → **two-band
   roster.** 2. *Money had no stored amount* (would fabricate revenue) → **derived AED 500 ×
   entitlement count, labeled as list price; refunds excluded.** 3. *Brief-only members can't
   be annotated* → **notes PATCH upserts the `users` row.** 4. *Dev-preview would call a non-
   existent local path* → **explicit seed branch.** 5. *Extending `coachUsers` could break the
   current caller* → **back-compatible defaults (no params = first page).**

**Round 2 — regression & residual sweep**
- Existing briefs queue / mark-reviewed / CV link untouched → **no regression** (separate
  render path). • RLS on `users`: adding a nullable column doesn't change policies; service_
  role bypasses as today → **safe.** • `refunded` is read-only and currently never written →
  **honest, no false control implied.** • Spine clutter from lesson-opens → **collapse + cap.**
  • Residual (accepted, non-blocking): the Needs-you band still reads the coach's briefs each
  list call — bounded by paying clients (far smaller than total users), so the render-all scale
  problem (users) is fixed; a briefs index/materialized facet is a **future** optimization, not
  required for coaching volume.

**VERDICT: SUFFICIENT.** Must-haves covered; the two material design risks (scale, money-
truth) are resolved with honest, buildable mechanisms; the feature holds the 12-function cap
and the webhook-only payment invariant. Ready to feed implementation (/katana) after the
mockup is rendered and the concept is approved.

## Success criteria (restated)
From one screen Nesreen can answer *who this person is, what they've paid, what sessions
they've had/booked, where they are in the program, and what they need next* — via an at-a-
glance **roster** and an in-depth **open file (the Spine)** — with the desk **read-only over
payments**, **only-Nesreen** access, **server-side scale**, **additive schema**, and **exactly
12 Vercel functions** unchanged.
