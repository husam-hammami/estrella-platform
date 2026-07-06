# Daedalus review — Estrella coaching flow (2026-06-27)

Critique of the live coaching surfaces in `index.html` against the daedalus craft
rubric, scoped to one goal: **is this a real, premium, paid product, or a demo?**
Verdict: **visually premium, functionally a demo.** Seven surfaces audited; every
critical below was verified against the code firsthand (line numbers cited).

## Failure classification
- **Product-fidelity (dominant):** almost nothing is wired to reality — payment,
  the "AI", calendar availability, the dashboard, and brief delivery are all faked.
- **Rendering (critical, one surface):** Nesreen's coach desk ships with **zero CSS**.
- **Color/brand (critical, systemic):** a violet+sage palette breaches the
  cream/ink/gold-only contract on coaching surfaces.

## Per-surface verdict
| Surface | Verdict | Why |
|---|---|---|
| Doorway (`view-services`) | **Refine** | Strong focal composition; minor craft fixes + delete dead legacy block |
| Estrella screening (`view-start`) | **Refine (UI) / Reject (premise)** | Premium chat UI, but "Estrella" is a 3-line script, not AI |
| Calendar (`view-calendar`) | **Refine** | Real date math, but availability is `d % 3` mock + identical slots, wrong weekend |
| Checkout + onboarding + readiness | **Reject** | Prefilled test card, price contradiction, off-brand rings, fake pay |
| Dashboard "One Card" (`view-dashboard`) | **Refine** | Clean scan-order, but every datum is hardcoded fiction |
| Nesreen coach desk (`view-coach`) | **Reject** | No CSS at all — unstyled text wall |
| Cross-cutting design system | **Refine** | Premium tokens, but brand breach + off-grid spacing |

---

## What's mock / not real (the "demo" tells), by priority

### 1. Nothing is wired to reality (product-fidelity)
- **Payment is faked.** `simulatePay()` (index.html:6481) just disables buttons,
  shows a toast, `setTimeout`, writes a localStorage brief, and routes to the
  dashboard. Apple Pay / Google Pay / card all call the same function. No gateway.
- **Checkout actively destroys trust.** Prefilled test card `4242 4242 4242 4242`
  (5253), `sarah.j@example.com` (5261), CVC as plain text `•••` (5257); Pay button
  hardcodes **AED 1,260** (5266) while the total is **AED 500**; a fake
  `256-bit SSL · 3D Secure · Stripe · Tap · PayTabs` trust line (5269) with no SDK.
- **"Estrella" is not an AI.** The screening is a fixed 3-element script
  (`startScript`, 6790) walked on timers; "analysis" is regex name/role extraction
  (`startExtractName/Role`, 6802-6832) and keyword-matched canned paragraphs
  (`startDerivePattern`, 6855 — the "you don't talk about your own work" insight
  only fires for the demo persona). The typing indicator fakes thinking. No LLM call
  exists anywhere. Onboarding (`view-onboarding`) is a second scripted playlist.
- **Calendar availability is fake.** `hasSlots = !isPast && !isWeekend && d % 3 !== 0`
  (6401) → a visible every-third-day "booked" stripe; an identical 6-slot list on
  every date (6432); no double-booking protection; weekend rule is `getDay()===5`
  (Friday only) — wrong for GST (Sat/Sun). Month pinned to June 2026 (6106).
- **Dashboard is hardcoded fiction.** "Good evening, Sarah." + "next session is in
  18 hours" + "Tuesday, 9 June · 14:00 GST" are static literals (5432-5454); 9 June
  2026 is not a Tuesday, and the seeded brief for the same persona says 30 Jun
  (6557). "Join session →" only fires a toast (5457). Every buyer is greeted as Sarah.
- **Briefs never reach Nesreen.** `saveBrief` writes only to
  `localStorage['estrella_briefs']` (6508). A client's brief generated on their
  device cannot appear on Nesreen's machine — no server, no auth scope, no sync.
  Her desk shows the seeded demo brief + whatever she typed in her own browser.
- **Seeded demo persona "Sarah Chen"** is injected so the desk is "never empty"
  (`seedBriefsIfEmpty`, 6545) with a fabricated bio; the mic button prefills the
  same persona instead of doing speech (7020). Several "Email me this profile" /
  email Save actions are fake-confirm toasts that store/transmit nothing.

### 2. Coach desk is unstyled (rendering, critical)
- Verified: **zero `.coach-*` CSS selectors exist.** `coach-console`, `coach-brief`,
  `coach-brief-grid` (no `grid-template-columns`), `coach-field-lbl/val`,
  `coach-brief-avatar`, etc. have no rules. The promised two-column goal/obstacle
  card collapses to a raw, full-bleed, UA-default text stack. The markup and the
  wired mark-reviewed logic are sound (6563-6629) — only the stylesheet is missing.
  Fix by mirroring the existing styled `.session-brief-*` family (~3676-3721).

### 3. Brand breach (color, critical)
- `--lavender:#B8A8E0` (49) and `--sage:#9BC2B5` (51) defined and used on coaching
  surfaces: onboarding readiness fill gradient `lavender→gold→sage` (935), checkout
  saved-state `--sage`/`--sage-bg` (849/855), readiness rings hardcode `#B8A8E0` /
  `#9BC2B5` (5380/5385), orb particles (571/573). Deep violet `#5B4B8A` used ~9x in
  academy/library banners. The contract is cream/ink/gold only — this is the single
  loudest AI-design tell after the fake checkout.

---

## Systemic craft (cross-cutting, mostly `[DOM]`-verified)
- **Off-8px-grid spacing:** ~125 banned 7/11/13/23px values + 0.5px hairlines;
  rem values like 0.7/0.85/0.9rem land off the 4/8/12/16/24 scale.
- **No tabular figures on prices/times** (`AED 500`, calendar days, `14:00`) — C6;
  the codebase already uses `tabular-nums` elsewhere, so this is inconsistency.
- **Touch targets <44px:** `start-mic`/`start-send` 36×36 (4205), calendar day cells
  can fall below 44 in the half-width column, email Save button short.
- **Motion:** core `.view` route transition is 0.6s (105, above the 200-400ms
  entrance band); `scale(1.05)` hover on send buttons; decorative infinite orb/float
  loops are only gated for reduced-motion inside scoped subtrees, not globally.
- **State coverage:** no empty/loading/error on screening input, calendar slots,
  checkout (decline), or dashboard (no-session). Only happy paths ship.

## What works — preserve
- Doorway: deliberate two-column focal composition; single clear wired CTA.
- Screening: serif-AI / Inter-user chat with gold focus pill — genuinely premium;
  profile reveal uses the user's real captured answers + first name.
- Calendar: real `Date` math (offsets, days-in-month, past/today), two-pane layout.
- Dashboard: clean scan-order, ≥3 hierarchy signals, real SVG icons.
- Coach desk: markup structure + persistent, wired mark-reviewed toggle.
- System: solid cream/ink/gold core ramp (ink #14120E not #000), focus-visible
  scaffolding, `tabular-nums` where present, reduced-motion partially wired.

---

## Fix plan (two tracks)

### Track A — Design/craft (daedalus owns; I can drive directly)
1. Author the entire `.coach-*` stylesheet (mirror `.session-brief-*`).
2. Purge `--lavender`/`--sage`/`#5B4B8A` from coaching surfaces → gold/ink/cream.
3. Snap off-grid spacing to 4/8/12/16/24; add `tabular-nums` to all prices/times.
4. ≥44px touch targets; add empty/loading/error states to every data surface.
5. Global `prefers-reduced-motion` reset; drop `.view` transition toward ~300ms;
   remove `scale(1.05)` hovers.
6. Delete the dead `data-legacy="services-old"` block (fake 800+/98% metrics).

### Track B — Functional / product (engineering; → `/warcry` plan)
1. **Real payment** — Stripe/Tap/PayTabs hosted checkout or payment link; remove the
   prefilled card + fake trust line; processing/decline/receipt states.
2. **Real Estrella** — wire the screening to an LLM (Claude) **or** relabel honestly
   as a guided intake. This is a product decision, not just a fix. *(See decision.)*
3. **Real calendar** — availability + per-date slots from a source (Supabase/Cal),
   mark slots consumed, correct GST weekend (Sat/Sun).
4. **Server brief store** — move briefs to **Supabase** (the same project now wired
   for LinkedIn), auth-scoped, so a client's brief actually reaches Nesreen's desk.
5. **Real dashboard** — bind greeting to the signed-in LinkedIn user + the real next
   session; add none/today/past states; remove the "Sarah/9 June/18 hours" literals.

## The one decision that gates Track B
**Is "Estrella" a real AI, or an honest guided intake?** The product is sold as
"AI-assisted." Real LLM screening fits that and reuses the serverless + Supabase
stack already in place; honest relabeling is cheaper but drops the headline promise.
Recommendation: real LLM-backed screening. This choice shapes the whole `/warcry`
plan, so decide it first.

> Review persisted here: `docs/REVIEW_Coaching_Daedalus.md`. Next artifact: a
> `/warcry` implementation plan for Track B (functional), with Track A folded in or
> shipped first as a quick design pass.
