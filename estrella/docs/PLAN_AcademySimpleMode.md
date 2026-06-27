# PLAN — Estrella "Simple Mode" platform

> Forged in /warcry · scouts: code-cartographer + pre-mortem + UX-coherence.
> **Reviewed ✓ (bulletproof, 2 rounds) — VERDICT: SUFFICIENT.** Round-1 INSUFFICIENT (4 must-haves: data-icons, real visual gate, stale .ac-sky, tightenings) → all resolved + 2 wording corrections applied round-2. Ready for /eagleye → /katana.

## Goal
Ship a functional, premium Estrella platform in `estrella/index.html`:
- **Academy** — the approved V2 Simple Mode loop running on **all 8 courses**, each with its **own designed artifact** (Reset Ring, Profile Glow, Interview Readiness Ring, AI Decision Map, Energy Battery, Talk Stage, HR Action Map, Offer Stack), per-lesson content, and **persisted progress**.
- **Coaching** — the coach desk styled to premium (currently unstyled stub); booking flow intact.
- **Library** — AI-gradient covers killed, brightened to premium editorial.
All on-brand and coherent; gold is the through-line.

**Done-when:** every Academy course opens its Simple Mode lesson (one idea, ≤3 choices, one Estrella line, its artifact as hero); Save fills the artifact + marks the lesson complete (persists across reload) + advances; finishing a course fires the existing certificate; the Coaching booking flow and Library still work; no console errors; verified by DOM/computed-style + standalone mockups (screenshots are impossible in this env).

## Approach (and why)
**Reuse the state engine; replace only the render layer.** The pre-mortem's top risks all come from disturbing shared globals, so we keep them untouched and swap the dossier renderers (lines 7020–7624) for Simple Mode renderers driven by a content+artifact registry.

- **State engine = KEEP (call, never redefine):** `AST`, `AKEY`, `ACAD`, `LIDX`, `courses`, `COURSE_MECHANICS`, `COURSE_ARTIFACT`, `BADGES`, `aLoad/aSave/aComplete/aGradeQuiz/aIsDone/aCourseProgress/aCourseLessons/currentLessonId/isFreshLearner/aLevel/aAddBadge/aCelebrate/aShowCertificate`, `switchView/showToast/coverImg/courseById/esc`. The :root tokens + `.ac-btn/.ac-eyebrow/.ac-serif/.ac-app*` chrome stay. (NOTE: `appbar` at line 7174 is INSIDE the delete range and only called by deleted renderers — it is NOT kept; the Simple Mode screens use their own back chevron, V2 pattern.)
- **Render layer = REPLACE (lines 7020–7624):** renderSky, skyContinueHTML, bookProgressHTML, ringSVG, folderRowHTML, academyRailHTML, setFolderFilter, bindSky, aRenderHeader, openCourse, artifactSlotsHTML, atelierPathHTML, instrumentPreviewHTML, openLesson, instrumentHTML, moveBtn, lessonPages, INSTRUMENTS, quizHTML, nextLessonBtn, tutorReplyFor, tutorChipReply, openConstellation, openVault → replaced by `renderSimpleHome`, `openLessonSimple`, the `ARTIFACTS` registry, and small helpers.
- **Content registry:** convert `docs/academy-simple-design.json` → `academy-simple-content.js` setting `window.ESTRELLA_SIMPLE` (file:// can't fetch JSON). Loaded via a `<script>` right after `academy-content.js` (line 5195).
- **Completion gate (the #1 pre-mortem risk), resolved:** Simple Mode has no quiz. **Save = complete:** `(AST.lessons[id]||(AST.lessons[id]={})).choice = choice; aSave(); aComplete(id, null);` — `aComplete` with a falsy grade still sets `.completed`, awards the lesson, and runs course/track/certificate logic; only the quiz-only "flawless/perfect" badges are skipped (correct — no quiz). All downstream preserved.
- **Routing:** reuse `#view-academy`/`#sky-root` (home) and `#view-lesson`/`#std-root` (lesson). **Drop the separate course-detail view** (`#view-course`/openCourse): the home is the hub (course cards → tap opens current/next lesson). Keep `aRenderHeader` name; repoint it to `renderSimpleHome`. Keep `academyFlow=['academy','course','lesson']` so the nav highlight still works.
- **Palette:** Academy (home + lesson) = bright warm white `#FCFAF4` + gold `#C49A3F/#E6CD86/#A07A2C` (V2 tokens, scoped to academy/lesson views so the rest of the site is untouched). Landing/Coaching/Library stay cream+gold, polished. Gold is universal.

**Rejected alternatives:** (a) *new `#view-simple` + rewire switchView/nav* — needless blast radius on routing (pre-mortem #4/#13); (b) *rebuild the state/badge engine for a no-quiz model* — throws away working persistence and is the exact corruption risk (pre-mortem #1/#11). Reuse-and-replace is strictly safer.

## Bulletproof round 1 — must-haves resolved
- **GAP A (data has no icons → look-alike) — RESOLVED, encoded, not left to the executor.** Produced `academy-simple-icons.js` (`window.SIMPLE_ICONS`, 38 line icons) and regenerated `academy-simple-content.js` so **every one of the 246 choices carries a `choiceIcons[i]` key** (validated: 0 invalid; 12–19 *distinct* token icons per course). The universal token model: a lesson's saved token = **the chosen choice's icon**, which flies into the artifact's next unit. Geometry differs per course (ring nodes / meter cells / battery cells / 4 map zones / talk-stage footlights / offer-stack layers / readiness-ring / action-map grid); the docked token differs per lesson. Distinct on both axes → cannot read as identical-dot quiz. **The chosen icon rides the fly-token in all 8**, but the RESTING state is per-artifact (`renderApproach` is authoritative, `ARTIFACTS[id].fill()` is per-artifact, never uniform): it **docks as a visible resting icon in 5** (Reset Ring node, Interview arc, HR-Map pin, Energy Battery cell, Offer-Stack bar) and **resolves to a gold glow/tint/dot in 3** (Talk Stage footlight = glow, Profile Glow cell = quality tint, AI Decision Map = 14px dot). For the 3 glow/tint/dot artifacts, the per-lesson token icons remain visible in a small **token rail** beside/under the artifact, so distinctness shows without fighting the geometry.
- **GAP B (DOM can't catch a look-alike) — RESOLVED.** Verification is now: (1) a standalone `academy-simple-preview.html` the USER opens that renders **all 8 artifacts at empty / mid / full** AND a scannable grid listing **every one of the 82 lessons with its assigned token icon** (so no lesson ships unseen); (2) **build-time structural geometry assertions per artifact** run via DOM/eval — each artifact renderer declares its OWN fillable-unit selector and the gate asserts that selector's count === `artifact.totalUnits` (ring `.node`×6, interview `.arc`×12, branding `.cell`×12, ai-hr `.dot`×16, leadership `.cell`×6, speaking `.footlight`×12, hr-foundations `.pin`×12, offer `.bar`×6) plus the required root geometry, so a broken or empty renderer FAILS the gate. A class-name string check alone is explicitly insufficient.
- **GAP C (stale `.ac-sky` bleeds onto reused home) — RESOLVED.** `renderSimpleHome` does `root.classList.remove('ac-sky'); root.classList.add('sm-home')` so no `.ac-sky` rule applies, AND the CSS delete is extended to remove the stale dossier mobile rules at lines 2381 & 2409 (and any other rules referencing deleted dossier classes). The Simple Mode home/lesson CSS is namespaced under `.sm-home`/`.sm-lesson`.
- **Tightenings — RESOLVED.** `appbar` dropped from KEEP (above). `openLessonSimple` MUST explicitly call `switchView('lesson')` at end; its back chevron calls `switchView('academy')`; `renderSimpleHome` owns its own click bindings (bindSky is deleted). Lesson renders into `#std-root` (#view-lesson); home into `#sky-root` (#view-academy); `#view-course`/`#atl-root` is left as dead markup (never routed). Every artifact fill animation MUST force a reflow (`fly.offsetWidth;`) between setting the token's start and end position before the transition, with a `setTimeout` fallback that lands the token even if `transitionend` never fires (the V2 bug fix, applied to all 8).

## Phased steps (katana-ready)

**P1 — Content registry (data, low risk).**
- Generate `academy-simple-content.js` from `docs/academy-simple-design.json`: `window.ESTRELLA_SIMPLE = { courses: { [id]: { bigPromise, artifact:{name,totalUnits,accent,...}, lessons:[{n,lessonId,idea,sentence,situation,choices,feedback,estrella,fills,tokenIcon?}] } } }`.
- **Verify every `lessonId` string-matches `LIDX`/`ACAD`** (pre-mortem #2): a build-time Node check that asserts each ESTRELLA_SIMPLE lessonId exists in academy-content.js; fail loudly on mismatch.
- Add `<script src="academy-simple-content.js?v=1">` immediately after line 5195; guard engine with `if(window.ESTRELLA_SIMPLE)`.

**P2 — Simple Mode CSS.**
- Add a scoped Simple Mode stylesheet (warm white + gold, big rounded cards, gold rings/meters, spring easing) lifted from `confidence-simple-v2.html`, scoped under the academy/lesson roots so landing/coaching/library are unaffected.
- Remove dossier CSS blocks (1692–2376); keep tokens (11–75) + chrome (.ac-btn/.ac-eyebrow/.ac-serif/.ac-app*).

**P3 — Academy home (`renderSimpleHome` → `#sky-root`).**
- Bright-white course picker: each course = a large card with its big promise + a **mini artifact preview** (the course's own toy at small size showing X/total filled) + "Continue / Start". Plus a top "Continue where you left off" (currentLessonId). One obvious action per card. Tap → `openLessonSimple(courseId, currentOrFirstLessonId)`.
- Repoint `aRenderHeader = renderSimpleHome` and the init call (line ~7629).

**P4 — Lesson engine (`openLessonSimple` → `#std-root`) + `ARTIFACTS` registry.**
- One screen: back chevron; the **course's artifact as hero** (from `ARTIFACTS[courseId].render(doneCount, savedTokens)`); the lesson card (step, idea [Cormorant], sentence, situation pill, ask, 2–3 choice cards); one Estrella line; sticky Save→Next button. `esc()` every string (pre-mortem #7).
- `ARTIFACTS` = 8 renderers + a `fill(courseId, node, chosenIcon)` save animation each, built from each course's `renderApproach` in the design JSON. Reuse V2 fly-token + node-light pattern; respect `prefers-reduced-motion`.
- Save handler: persist `.choice`, call `aComplete(id,null)`, run the artifact fill animation, swap Estrella to the feedback line, turn button into Next. Next → next lesson or, if course done, back to home (cert fires via aComplete→aCelebrate).
- Delete the old render layer (7020–7624). All new globals uniquely named (`renderSimpleHome`, `openLessonSimple`, `ARTIFACTS`, `SIMPLE_*`); **do not** redefine `state`, `LIDX`, `aSave`, `renderLibrary` (pre-mortem #5/#6/#12).

**P5 — Coaching coach-desk CSS.**
- Style `#view-coach` brief cards per the UX scout: cream surface cards, serif initial avatar, gold status pills, eyebrow field labels, serif-italic quote fields, gold-bullet strengths, "Mark reviewed" pill (ghost→gold-done), hover lift. Add a back-to-academy/dashboard control. Booking flow untouched.

**P6 — Library polish.**
- Replace the 4 purple/teal/rose gradient covers with editorial covers (solid/duotone + serif title), keep cream container + gold. Soften always-on shadow. Optional: tie a book to a course + a "Talk to Nesreen about this" CTA.

**P7 — Coherence CTAs (light).**
- Subtle gold CTAs: Academy course-complete → "Ready to talk it through?" (→services); Library featured → "Work through this with Nesreen" (→services). Same button language site-wide.

**P8 — Verify (no screenshots).**
- DOM/computed-style: home renders 8 course cards bright-white; opening each course renders its lesson with its distinct artifact (assert distinct artifact root class per course); Save sets `AST.lessons[id].choice` + `.completed` (reload-persists); artifact doneCount increments; finishing a 6-lesson course (confidence) fires certificate; booking flow (`services→start→coach`) + library still switchView correctly; **no console errors**; all 82 lessons open without throwing (∀-sweep); reduced-motion + mobile (no horizontal scroll at 375).
- Standalone `academy-simple-preview.html` rendering the 8 artifacts + one sample lesson each → user opens to approve the visuals.

## Files & surfaces
- `estrella/index.html` — remove render layer 7020–7624 + dossier CSS 1692–2376; add Simple Mode CSS + `renderSimpleHome`/`openLessonSimple`/`ARTIFACTS`; repoint `aRenderHeader`; add the `<script>` tag; coach-desk CSS; library cover changes; CTAs.
- `estrella/academy-simple-content.js` — NEW (`window.ESTRELLA_SIMPLE`).
- `estrella/docs/academy-simple-design.json` — source (already produced).
- `estrella/docs/design-mockups/academy-simple-preview.html` — NEW (verification mockup).

## Data & schema
No change to `AST` shape or `estrella.academy.v1`. New read-only global `window.ESTRELLA_SIMPLE`. `AST.lessons[id]` continues to carry `.choice` + `.completed` (+ legacy `.draft` unused in Simple Mode). Lesson ids unchanged (must match).

## Test & verification strategy
Build-time: Node assert ESTRELLA_SIMPLE↔academy-content lessonId parity. Runtime (DOM/eval, since no screenshots): the P8 checklist + 82-lesson ∀-open sweep + state-persistence round-trip + booking/library smoke + console-error gate. Visual: the standalone preview mockup the user opens.

## Rollout & rollback
Single-file, no deploy. Rollback = git revert (work on a branch). Each phase independently verifiable; P1/P2 are reversible data/CSS; the risky cut (P4 delete) lands only after P3/P4 renderers verified.

## Risks → mitigations
1. Completion gate → **Save=aComplete(id,null)** (resolved). 2. Lesson id mismatch → build-time parity check. 3. `.choice` not persisted → save handler asserted in P8 round-trip. 4. Global collision → unique names + reuse engine; do not redefine state/LIDX/aSave/renderLibrary. 5. Escaping crash → esc() all copy. 6. Load order → script after academy-content.js + `if(window.ESTRELLA_SIMPLE)` guard. 7. Routing/booking break → reuse views, keep switchView/academyFlow, smoke-test booking+library. 8. No screenshots → DOM/computed-style + preview mockup. 9. Reduced-motion/mobile → guarded animations + responsive CSS + 375 check.

## Out of scope
LinkedIn auth, payments, real AI tutoring (Estrella stays a one-line hint), new course content beyond the simplified cards, Supabase. Note: this is a ∀ feature over the 8 courses/82 lessons — **coverage is not optional**; all 8 must ship their artifact + all 82 lessons must open. Phasing depth (animation richness) is OK; phasing coverage is not.

## Success criteria (restated)
8/8 courses run the Simple Mode loop with their own artifact filling on Save + persisting; completion/badges/certificate intact; Coaching desk styled + booking works; Library de-gradiented + premium; one coherent gold-threaded product; zero console errors; verified by DOM + the preview mockup.
