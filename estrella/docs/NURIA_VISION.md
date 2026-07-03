# Nuria — the vision (2026-07-03)

**Goal:** take Nuria from "premium-generic coaching site with a good backend" to a product with
an ownable identity, a genuinely capable AI, and zero fakery. Done when every surface is
unmistakably Nuria, every flow runs against the real backend, and nothing on screen is invented.

---

## 1. The design idea: *Nuria is the light*

Nuria means **light**. The logo already says it: an ink didone wordmark, a gold arc rising to an
eight-point star. The current design ignores that story — it's an all-cream site that could
belong to any coach. The new system makes the story structural:

**Two registers, one brand.**

| | **Day — paper** | **Night — sky** |
|---|---|---|
| Who | Nesreen. The human, the credential, the transaction. | Nuria. The AI that works while you're between sessions. |
| Surfaces | Home, About, Library, Lesson reading, Calendar, Checkout, Coach desk | Screening, Dashboard, Academy sky, AI tutor moments |
| Ground | Warm paper `#F5EFE3` | Warm near-black ink `#131109` |
| Feel | Editorial print: hairline rules, letterspaced gold overlines, sharp corners, generous margins | A quiet night sky: the gold arc and star are the only light; soft luminous accents |

The **crossing between registers is the signature moment**: you meet Nuria at night (screening),
your brief crystallizes, and booking Nesreen brings you back into daylight. Dashboard returns to
night — Nuria keeps watch between sessions. One rule, easy to state, impossible to mistake:
**"Nuria is the light in the dark; Nesreen meets you in daylight."**

**Type.** Display: **Bodoni Moda** (true didone — matches the wordmark's extreme contrast; only at
display sizes, never below ~24px). UI/body: **Instrument Sans** (warm grotesque, tabular
figures). Cormorant Garamond and Inter retire. Italic didone for emphasis words; letterspaced
gold small-caps for overlines — exactly like "GROW BEYOND LIMITS" in the logo.

**The Ascent motif.** One SVG geometry drawn from the logo — a thin gold arc rising to an
eight-point star — becomes the platform's progress language: screening progress, course
progress, the dashboard journey line. No generic progress bars, no rings borrowed from Apple.

**Craft rules.** 8px spacing grid; radius scale drops from 18–36px (bubbly) to 2/6/12
(editorial); tabular-nums on every number; ≥44px touch targets; global reduced-motion; 240–320ms
entrances; the only infinite animation is a faint star twinkle, gated behind motion preference.
Palette stays ink/paper/gold — gradients only within the gold hue. Nothing purple, nothing neon.

**Performance as design.** Today all ~15 views sit stacked as composited `position:absolute`
layers — heavy enough to crash screenshot tooling. Inactive views become `display:none`; GSAP
animates entrances only. Faster paint, and visual QA tooling works again.

## 2. The capability idea: one AI, five real jobs

Today the AI does one thing (screening), and only when a key is present — otherwise a hidden
3-line script impersonates it. The upgrade: `api/estrella.js` becomes a modal endpoint (no new
functions — Hobby cap stays at 12) where every mode is real Claude with real context:

1. **Screening** (exists) — the night interview that writes Nesreen's brief.
2. **Companion** (new) — authed dashboard chat. Server pulls the user's own brief + CV extract +
   session state and Nuria supports them between sessions, grounded in *their* file.
3. **Tutor** (new) — in-lesson coach in the Academy, grounded in the current lesson's content.
4. **Dossier** (new, coach-gated) — one click on a brief: Nuria drafts Nesreen's session-prep
   dossier (read of the client, angles to probe, suggested arc for the 60 minutes).
5. **Follow-up** (new, coach-gated) — after a session, Nuria drafts the follow-up note from the
   brief + coach notes; Nesreen edits and sends it herself.

Client side: CV insights (already parsed into `cv_extract`) finally get surfaced to their owner.

**Honesty contract.** No scripted impostors. If the AI is unavailable, the screening becomes a
clearly-labeled 3-question written intake (same brief, no fake typing, no "thinking" theater).
Missing operator config surfaces in the coach desk, not as silent fallbacks.

## 3. The kill list (nothing fake survives)

- Scripted "AI Twin" view — replaced by the real Companion on the dashboard.
- Post-payment onboarding quiz + invented "readiness score" — replaced by the real brief
  ("what Nesreen will read") on the dashboard.
- Three fabricated testimonials with AI-generated headshots — replaced by the founder's real
  credential story. No invented social proof.
- "Sarah Chen" seeded demo brief, fake academy enrolled/rating counts, legacy hidden services
  grid ("800+ leaders", "98%"), prefilled anything.
- Every user-visible "Estrella" (already mostly gone; sweep confirms zero).

## 4. What stays untouched

The backend architecture (12 functions, Stripe Connect destination charges, Calendly OAuth +
webhooks, encrypted tokens, idempotency ledgers) — it's production-grade. The radically-simple
coaching flow (one product, AED 500, doorway → screening → calendar → checkout) — Sam locked it.
Academy lesson *content* — locked direction, separate rewrite track.

## 5. Reality constraints (verification)

Prod today: LinkedIn + Supabase live; `ANTHROPIC_API_KEY` absent (screening 503s → script),
Stripe keys and Calendly not yet connected. Those are operator credentials I cannot mint. So:
every flow is built and verified against the real backend locally (Node shim over the real
serverless handlers); what needs live keys is verified to the seam and the missing key is
surfaced honestly in-product. Deploy to prod stays Sam's call (push to main = Vercel build).
