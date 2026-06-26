# Estrella — Launch-Ready Plan

**Full-platform audit + path to production** · v1 · 2026-06-26

> Scope: the whole platform, not just Academy. The Academy redesign lives in
> `Academy_UX_Spec.md` / `Academy_Gamification_Design.md`; this plan covers what it
> takes to put **all of Estrella** live, safely, as a premium product.

---

## 0. The one-line truth about where this is

Estrella today is a **high-fidelity, single-file front-end prototype.** One
`index.html` (~8,650 lines) holds every screen; state lives in `localStorage`; the
AI tutor is scripted; LinkedIn sign-in and Stripe payment are **simulated**, not real.
It looks production-grade and is genuinely well-crafted — but nothing leaves the
browser. **"Live and perfect" means building the backend half that doesn't exist yet,
not polishing the front end (which is already strong).** That framing drives every
priority below.

Done-when for this plan: a real user can sign in, pay (or be granted access), have her
progress and artifacts persist across devices, get *real* AI coaching in Nesreen's
voice, and Nesreen can see who's enrolled — on a custom domain, securely.

---

## 1. Section-by-section audit

Legend: ✅ done · 🟡 needs polish · 🔴 missing/blocking for launch · 🎭 simulated
(looks real, isn't)

### 1.1 Homepage / Landing (`view-landing`)
- ✅ Editorial hero, brand voice, clear entry points (Coaching / Library / Academy).
- ✅ Recent commits show real polish work (touch targets, scroll fixes).
- 🟡 Verify hero holds at 375/768/1024/1440 and 100–200% zoom (craft F2/F3).
- 🟡 First-paint performance: an 8,650-line single HTML file with inline CSS/JS ships a
  lot on first load. Measure LCP; consider splitting (see §4 technical).

### 1.2 Navigation (`topnav`)
- ✅ Clean, role-aware (guest vs signed-in states already coded).
- 🎭 The signed-in state depends on simulated LinkedIn auth (§1.9).
- 🟡 Mobile nav / bottom-bar consistency across dash-body views.

### 1.3 About (`view-about`)
- ✅ Present, on-brand.
- 🟡 Confirm copy is final and claims are true (esp. any metrics — craft H: no fabricated
  numbers).

### 1.4 Coaching (`view-services`)
- ✅ Coaching paths, format selection, brief CTA. Has its own UX doc (`coaching_UX.md`).
- 🔴 Booking goes to a **simulated** flow (calendar → checkout → `simulatePay()`). No
  real calendar, no real availability, no real payment. Blocking for taking money.
- 🟡 Legacy hidden coaching sections still in the file (`LEGACY HIDDEN` block ~5230) —
  dead markup to remove before launch (craft hygiene; reduces payload).

### 1.5 Diagnostic / "Start" (`view-start`)
- ✅ The conversational diagnostic (name → role → trigger → goal → profile) is a
  signature, differentiated experience. Has a UX doc (`Estrella_Diagnostic_UX.md`).
- 🎭 The profile/"prescription" is generated client-side from scripted logic, not a real
  model. Fine as a guided form; **don't claim it's AI** if it isn't (honesty + the
  brand's premium promise).
- 🟡 Captured profile data currently has nowhere to go (no CRM/email backend) — see §1.10.

### 1.6 Profile Reveal / Readiness (`view-readiness`, `view-onboarding`)
- ✅ The reveal moment is emotionally well-designed.
- 🎭 Driven by local logic; same honesty note as the diagnostic.
- 🟡 Ensure the reveal degrades gracefully if the user skips inputs (empty/partial state).

### 1.7 Dashboard (`view-dashboard`)
- ✅ Exists as the signed-in home.
- 🟡 Currently reflects only local state. Becomes meaningful only once auth + persistence
  are real (then it's the cross-device home).

### 1.8 Library (`view-library`)
- ✅ Browse UI for the 4 digital books (the `Assets/Books/*.html` editions exist and are
  real, substantial content).
- 🟡 Gating/ownership: who can read what, and is it tied to purchase? Undefined until
  auth + entitlements exist.

### 1.9 Academy (`view-academy`, `view-course`, `view-lesson`, `view-twin`)
- ✅ Full browse → course → lesson → tutor flow is built and recently polished.
- ✅ Gamification engine (Light, levels, badges, streak) is real in code + data.
- 🔴 **Content:** only AI-HR lesson 1 is authored to depth; the other 81 lessons are on
  the *retired* framework-led model (`CONTENT_DESIGN.md`). Launching the Academy as a
  paid product needs the content rewrite (brief recommends a 2-lesson pilot first).
- 🔴 **AI tutor is scripted** (`reply()` echoes the first takeaway). The moat is
  unbuilt. This is the single highest-value gap (§3).
- 🟡 **UX redesign** (this project's Academy spec) — the Constellation concept is
  designed but not implemented.
- See `Academy_UX_Spec.md` for the full redesign; this plan covers only its launch
  dependencies (real tutor, persistence, content).

### 1.10 Cross-cutting: the missing backend half
- 🔴 **Auth** — LinkedIn sign-in is simulated (`sessionStorage` user). No real identity.
- 🔴 **Persistence** — all progress in `localStorage`. Clears on cache wipe; no
  cross-device; no backup. Unacceptable for a paid product where people build artifacts.
- 🔴 **Payments** — `simulatePay()`; Stripe is a trust badge, not an integration.
- 🔴 **AI** — no real Claude/Anthropic call anywhere. Tutor + diagnostic are scripted.
- 🔴 **Data capture / CRM** — diagnostic profiles and bookings go nowhere; Nesreen has no
  admin view of leads, enrollments, or learner progress.
- 🔴 **Email** — "Email me this profile," booking confirmations, certificates: no sending
  capability.
- 🔴 **Hosting / domain** — a local file; no deploy, no `estrella.*` domain, no HTTPS.

---

## 2. What's done and working (give credit where due)

- A complete, coherent, **genuinely premium front-end** for the entire product surface —
  landing, coaching, diagnostic, library, academy, dashboard.
- A real, well-considered **brand system** (cream/ink/gold, Cormorant/Inter, soft
  shadows) that is *not* default-SaaS slop — the hard part of design taste is already
  done.
- A real **gamification data model and engine** (`gamification.json` + `AST` logic) with
  an unusually mature, on-brand philosophy ("earned, not a points race").
- **Real content assets**: 4 full digital books; a structured 8-course / 82-lesson
  academy data set; per-course artifact definitions; a content design brief that already
  knows what good looks like.
- A **GSAP motion layer** following official patterns with `prefers-reduced-motion`
  awareness.
- Recent commit history shows active, careful polish (a11y touch targets, mobile scroll,
  explicit transitions) — the team already works to a craft standard.

This is much further along than "prototype" usually implies. The gap is depth (backend),
not breadth (UI).

---

## 3. The highest-leverage build: the real AI tutor

Called out separately because it's the product's whole differentiator and it's the
riskiest thing to get right.

- **Model:** Claude (latest — Opus/Sonnet 4.x per the project's own guidance). The tutor
  runs server-side; **the API key never touches the browser.**
- **Architecture:** browser → your backend endpoint → Anthropic API → back. The backend
  injects (a) Nesreen's voice/system prompt, (b) the current lesson's **rubric** (the
  3–5 criteria + redirect prompt from `CONTENT_DESIGN.md`), (c) the learner's context
  (org, role, the trigger they named in the diagnostic). It returns coaching, not
  praise.
- **The grading contract:** the tutor evaluates the learner's submitted work against the
  rubric — names what's working, names the one biggest gap, asks a question to close it.
  This loop *is* the assessment that earns mastery (replaces the MCQ on application
  lessons).
- **Cost control:** per-learner rate limits, max turns per lesson, cache the system
  prompt + rubric (prompt caching) since they're stable per lesson.
- **The honesty rule until it ships:** the current scripted tutor may stay only if
  labeled a *preview of how Estrella coaches* — it must never present fake feedback as a
  real assessment of the learner's answer. Faking the moat detonates the premium brand.
- **Nesreen-review loop:** the Twin view already promises "reviewed by her weekly." Build
  a way for her to actually see and correct tutor outputs, or soften the claim. Don't
  ship an unbacked promise.

---

## 4. What's missing for a real launch (the build list)

### 4.1 Identity & access
- Real auth. LinkedIn OAuth is on-brand for HR (already the chosen entry point); add
  email/password or magic-link as the universal fallback. Use a managed provider
  (Auth0 / Clerk / Supabase Auth) — don't hand-roll auth for a paid product.
- Entitlements: who owns which courses/books (drives Library + Academy gating).

### 4.2 Data persistence
- A real database (Postgres via Supabase/Neon, or similar). Move `AST` (progress, Light,
  badges, streak) and the new per-lesson **artifact drafts** server-side, keyed to the
  user. Keep `localStorage` only as an offline cache that syncs up.
- Migration: the localStorage shape (`estrella.academy.v1`) maps directly to a `progress`
  table — low-friction.

### 4.3 Payments
- Real Stripe (the brand badges already say Stripe/Tap/PayTabs — note **PayTabs/Tap** are
  the UAE-relevant rails; Stripe's UAE support and AED settlement need confirming, since
  pricing is in AED 1,200+). Decide: one-off course purchase, coaching session booking,
  and/or subscription. Wire webhooks → entitlements.
- Booking needs a real calendar (Cal.com / Calendly embed, or custom) with Nesreen's true
  availability before money changes hands.

### 4.4 AI (see §3) — tutor + optionally the diagnostic
- The diagnostic could become genuinely AI-driven (real profile generation) as a phase-2
  upgrade; not required for launch if it's honestly framed as a guided form today.

### 4.5 Communications
- Transactional email (Resend / Postmark): booking confirmations, "email me my profile,"
  certificate delivery, password/magic-link.
- Certificate generation server-side (the design exists in `gamification.json`) → PDF,
  signed, verifiable URL (`certificateId` + `verificationUrl` fields already specified).

### 4.6 Admin / Nesreen's cockpit
- A simple admin view: leads from the diagnostic, bookings, enrollments, learner
  progress, and the tutor-review queue. Without this, Nesreen is flying blind on her own
  business. Can be minimal (even a read-only dashboard) for v1.

### 4.7 Compliance & trust
- Privacy policy + terms (handling HR professionals' personal/career data — and the
  diagnostic captures sensitive self-disclosure). GDPR-shaped consent even in the UAE,
  given likely EU users.
- Cookie/consent if analytics are added.
- Data export/delete path (and it pairs nicely with the artifact-export feature).

### 4.8 Engineering hygiene before scale
- **Split the 8,650-line `index.html`.** It's fine for a prototype, painful for a team
  and for performance. Modularize views, externalize CSS, build step (Vite). This isn't
  cosmetic — it's what makes everything above maintainable.
- Remove dead/legacy markup (the `LEGACY HIDDEN` coaching block, any orphaned sample-
  lesson scaffolding).
- Error handling + offline states (craft rule I) across the real network surfaces.
- Analytics (privacy-respecting — Plausible/PostHog) to see where learners drop.

---

## 5. Priority order to production-ready

Sequenced so each phase is independently shippable and de-risks the next. Rough effort,
not a schedule.

**Phase 0 — Foundation (unblocks everything).**
1. Stand up hosting + custom domain + HTTPS (deploy the current static build as-is —
   instant credibility, zero backend). *Fast.*
2. Real auth (managed provider) + a database; migrate `AST` to server-side persistence.
3. Split/modularize the codebase enough to work in (doesn't have to be a full rewrite).

**Phase 1 — The product is real (you can charge).**
4. Real payments (Stripe + UAE rails) + entitlements; wire to course/book/booking access.
5. Real booking calendar with Nesreen's availability.
6. Transactional email (confirmations, profile send, certificates).

**Phase 2 — The moat is real (the premium promise).**
7. Real AI tutor (server-side Claude, rubric-graded, Nesreen's voice) — start with the
   **2-lesson content pilot** from `CONTENT_DESIGN.md` so tutor + content prove out
   together on a small surface.
8. Roll out the Academy content rewrite archetype-by-archetype behind the working tutor.

**Phase 3 — The experience is gorgeous (this project's redesign).**
9. Implement the Constellation Academy redesign (`Academy_UX_Spec.md`) on top of the now-
   real data and tutor.
10. Admin cockpit for Nesreen (leads, enrollments, progress, tutor-review queue).

**Phase 4 — Trust, polish, scale.**
11. Privacy/terms/consent, data export-delete, analytics.
12. Performance pass (LCP, payload split), full responsive/zoom audit, accessibility
    audit across all real flows.

**Rationale for the order:** you can be *live* (Phase 0) in days with what exists. You can
*take money* (Phase 1) before the AI is real. The expensive, differentiating work (Phase
2–3) lands on a foundation that already earns — so it's funded and validated, not
speculative. Don't build the gorgeous Constellation UI before the tutor and persistence
are real; it would be a beautiful shell over fake data.

---

## 6. Technical requirements (concrete starting stack)

A pragmatic, low-ops stack that fits a single-founder premium product. Swap any piece;
the shape matters more than the brand.

| Need | Recommended | Why |
|---|---|---|
| Hosting | Vercel / Netlify (static now → serverless functions later) | Deploy the current build today; grow into APIs |
| Domain + HTTPS | The `estrella.*` domain + managed TLS | Credibility; required for OAuth/payments |
| Auth | Clerk or Supabase Auth (LinkedIn OAuth + magic-link) | Managed, secure, LinkedIn-native for HR |
| Database | Supabase Postgres (or Neon) | Progress, artifacts, entitlements, leads |
| Payments | Stripe + Tap/PayTabs for UAE/AED | AED settlement; local card rails |
| Booking | Cal.com (self-host or cloud) | Real availability, embeddable, owns the calendar |
| AI | Anthropic API (Claude 4.x), **server-side only** | The tutor + optional diagnostic; key never in browser |
| Email | Resend or Postmark | Transactional: confirmations, profiles, certificates |
| Files/PDF | Server-side PDF for certificates + artifact export | The premium deliverables |
| Analytics | Plausible or PostHog | Privacy-respecting funnel insight |
| Build | Vite + a light framework (or keep vanilla, modularized) | Make the 8.6k-line file maintainable |

**Security non-negotiables:** API keys server-side only; auth on every data endpoint;
HTTPS everywhere; rate-limit the AI endpoint; least-privilege DB access; secrets in env,
never in the repo. (Worth a `/cso` security pass before taking real payments and real
personal data.)

---

## 7. The three things that matter most

If only three things get done, do these — they're the difference between a beautiful demo
and a real premium product:

1. **Persistence + auth.** People paying premium prices to *build artifacts* cannot lose
   them to a cache clear. Non-negotiable, and it unblocks everything.
2. **The real AI tutor.** It's the entire differentiator. Until it's real (and honest),
   the Academy is a nicely-wrapped e-book. Build it on the 2-lesson pilot first.
3. **A real way to pay and book.** Right now the platform can't make money. Stripe +
   UAE rails + a real calendar turns the craft into a business.

Everything else — the Constellation redesign included — is upside on top of those three.
Gorgeous matters, but gorgeous over fake data is still a demo.

---

**Saved to `docs/Estrella_Launch_Plan.md`.** Pairs with the Academy redesign
(`Academy_UX_Spec.md`, `Academy_Gamification_Design.md`).
