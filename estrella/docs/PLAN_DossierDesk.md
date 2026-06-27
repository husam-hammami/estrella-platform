# Concept: Dossier Desk — daedalus design contract

> Design contract for the Estrella Academy refactor. Supplements
> `docs/Academy_Dossier_UI_Handoff.md` with the craft floor, token reconciliation,
> and the mockup→data binding. This is the INPUT to the `/katana` build.

## Thesis

One Academy world rendered as a **leather desk with an open book**. Eight courses are
the same instrument re-framed, never eight UIs. The artifact the learner is building is
the hero; progress/streaks/badges are a quiet margin, never the page. Every lesson is a
**move you choose**, not a form you fill — writing appears only where words are the
artifact.

Three-second contract per surface:
- **Home:** "Here is the open book. This is the course to start. This is what I'll build."
- **Course dossier:** "This is the instrument, this is the artifact, here is the path, start here."
- **Lesson studio:** "Here's the idea, here's the move to pick, Estrella is in the margin."

## Surface type & craft posture

`app/utility` with `minimal/luxury` framing. Density floor 0.40 on home/course; the studio
is a focused single-task surface (lower density is correct). One focal element per surface
(the book / the cover+artifact / the center action). Asymmetry 62/38 (book vs progress rail).

---

## Token reconciliation (bind to existing `:root`, do NOT invent a palette)

**Reuse as-is** (already in `:root`, lines 11–57 of index.html):
`--bg #F2EBDC`, `--bg-soft #ECE3D0`, `--surface #FBF7EC`, `--surface-2 #F7F1E2`,
`--ink #14120E`, `--ink-2`, `--text`, `--text-dim`, `--text-mute`, `--line`, `--line-strong`,
the full `--gold` family (`--gold #B8985C`, `--gold-deep #97793F`, `--gold-soft #DCC589`,
`--gold-bg #F1E6C7`), `--shadow-*`, `--ease`, `--ease-out`. Fonts: Cormorant Garamond
(display/serif) + Inter (UI/sans) are already loaded — keep both.

**ADD (the two signature colors of the approved look are missing today):**
```
--leather:      #2E3A30;  /* deep green leather — the book/desk; tune to mockup */
--leather-deep: #222C25;  /* spine / shadowed leather */
--leather-edge: #3A4A3D;  /* raised leather edge highlight */
--rust:         #A8553C;  /* terracotta — Signature/Interview accent, stamps, CTAs */
--rust-soft:    #C47A5E;
--rust-bg:      #F2DDD2;
--tan:          #C9A24A;  /* Interview track tab / brass-tan */
```
Track accent role tokens (one deliberate accent per track, fixed meaning — rubric D3):
```
--track-foundation: var(--leather);  /* green */
--track-signature:  var(--rust);     /* rust */
--track-interview:  var(--tan);      /* tan/brass */
```

**RETIRE (these are active AI-tells in the current build that contradict the mockups):**
- `.course-banner.c1–c8` purple/teal gradients (e.g. `#9B7EDE→#2E2752`).
- `.book-cover.b1–b4` purple gradients.
- `.acad-featured-visual` gold→purple gradient.
- Every `backdrop-filter: blur()` in the Academy (`.acad-lesson-mockup`, `.ac-overlay`) — glassmorphism is banned.
Replace all course art with the 8 real covers in `Assets/Course_Covers/` via existing `coverImg(cid)`.

## Spacing / type / motion floor

- **Spacing:** 8px additive scale (`4·8·12·16·24·32·48·64·96`); internal padding < component gap < section gap; section gap ≥1.5× largest component padding. Use existing `--radius` family.
- **Type:** Cormorant for display/headline (book titles, course titles, lesson titles); Inter for all labels/meta/body-UI. One modular ratio. **Tabular figures** on every count (`0/82`, `0/12`, `12 lessons`) — `font-variant-numeric: tabular-nums`.
- **Motion:** 150–250ms UI / 200–400ms entrances; reuse `--ease`/`--ease-out`. Page-turn/tab transitions only where they mean a state change. **Every new dossier class needs `prefers-reduced-motion` coverage** — the existing reduced-motion block is scoped to old `.ac-app/.std-msg/.ac-overlay` classes only. No infinite decorative motion on the book.
- **A11y:** focus-visible ring on every control (gold/leather, ≥3:1); tap targets ≥44px; keyboard order = visual order; no `max-height` on text containers (use `min-height`) so 100/125/150/200% zoom never clips.

---

## Surface specs (mockup → real data → render function)

### 1. Home — open-book dossier (replaces the "Sky" dashboard)
Anchor: `academy-home-approved.png`. Render fn: `renderSky()` + `skyContinueHTML` + new book markup; rail = condensed `skyTracksHTML/skyYouHTML`.

- **Open book spread** (net-new CSS, no spread exists today): left page = recommended course; right page = learner progress. Leather book on a `--leather` desk, brass corners, ribbon, three edge tabs `FOUNDATION / SIGNATURE / INTERVIEW` (spelled correctly — the mockup's "FOUNTION" is a render typo, do not copy).
- **Left page (recommended):** eyebrow `RECOMMENDED NEXT` (or `CONTINUE` when in progress), course title (Cormorant), one-line promise, meta row (`{n} lessons · {hrs} · Artifact`), an **artifact slip** ("You'll build: {artifact}" + PRACTICAL·USEFUL stamp), primary CTA `Start {course}` / `Continue {course}`. Drive recommended course from existing `currentLessonId()`/`isFreshLearner()` logic.
- **Right page (progress, secondary):** keep it useful, not a dashboard — lessons `done/82`, courses finished, a small streak, and an **Open artifact vault** link. Demote XP/level/badges from the hero; they live in the rail or the You tab, not the book hero. Empty state copy: "You haven't started yet. Pick a course and take the first step."
- **Folder row** below: 8 tabbed manila folders (replace `.sky-bcard`/`.course-card`), each = cover thumb + title + real lesson count + track-accent tab + progress pips. Track tabs filter (a folder may appear under two tabs — branding ∈ Foundation+Signature, speaking ∈ Signature+Interview).
- **Constellation:** demoted to a secondary "Sky" entry (modal via `openConstellation`), not the home layout.

### 2. Course dossier (reskin `openCourse` + `artifactSlotsHTML` + `atelierPathHTML`)
Pattern: `course-dossier-interview-lab.png`. Inherits the book; left page = course identity, right page = the instrument.

- **Left page:** real cover (`coverImg(cid)`), instrument label chip (`mech.name` from `courseMechanics`), course title + promise, meta (`≈{h}h {m}m · {total} lessons · {badge}`), **artifact slip** (`COURSE_ARTIFACT[cid]` + stamp), `Start/Continue` CTA in the **track accent color**.
- **Right page = the instrument, bound to REAL structure:** render the course's **2 real modules** as the instrument's sections (NOT a fabricated fixed 6-up grid — the mockup's six Interview-Lab tiles are illustrative). Each section shows its module title + artifact-piece state from `artifactSlotsHTML`. Below/within: the **lesson path** from `atelierPathHTML` as a numbered checklist (done = check, current = "you're here"). Header line `{done}/{total} pieces`.
- **Per-course differentiation = framing only:** instrument name, accent, section icon set, and action copy come from `courseMechanics[cid]`. Same dossier skeleton for all 8.

### 3. Lesson studio (reskin `openLesson` markup/CSS + copy; logic already correct)
Pattern: `lesson-studio-mirror-journal.png`. Three columns on a `--leather` desk, cream page floating.

- **Left rail — progress spine:** `LESSON PROGRESS / Lesson {o} of {n}`, dot spine, `{done}/{n} artifact pieces`, then the **stage list** with sublabels: `NOTICE` (See the pattern) · `METHOD` (Understand the…) · `{INSTRUMENT}` (Choose your move) · `QUICK CHECK` (Make it stick) · `SAVED` (Add to {artifact}). Stage 3 label = the course mechanic name. These map to existing `buildBeats`/`ARCH_BEATS` (keep beat logic; restyle the spine + sublabels).
- **Center — content + action:** course eyebrow, lesson title (Cormorant), meta, divider, short readable body, then the action surface. **This is already wired** (lines 7006–7023): `requiresWriting===true` → one focused textarea labeled as artifact work, CTA `Save the useful words`; else → **choice tokens** (selectable, icon + label, `.sel` state) from `interaction.choices`, CTA = `interaction.actionLabel`, hint "Add to {artifact}. No writing needed…". Restyle these into the mockup's token cards; **do not change the save logic** (`AST.lessons[id].choice`/`.draft`).
- **Right rail — Estrella margin:** `ESTRELLA NOTES` + 1–2 quiet coaching notes + an `Ask Estrella` input. She asks/pressure-tests/points-next — never grades or dominates. On mobile she is a drawer/toggle (the existing `.std-mtoggle` mechanism).

### 4. Vault (reskin `openVault`)
Archive-drawer feel. Each course = a folder/slip: track label, artifact name (`COURSE_ARTIFACT`), pieces built `{done}/{total}`, the saved choice/draft preview (already surfaced via `artifactSlotsHTML` pattern), and an Open/Export affordance when complete. Empty → "Finish one lesson to add the first piece." Reads existing state; no new persistence.

### 5. Completion / certificate
Professional seal/stamp/archive language. No childish trophies, no noisy celebration. Reuse existing badge/cert logic; restyle only.

---

## Seven execution traps (the difference between this and generic LMS)
1. Book spread collapsing to a flat card grid — the spread is the non-negotiable anchor.
2. Textareas leaking into the 69 non-writing lessons — gate stays hard on `requiresWriting===true`.
3. All 8 instruments rendering identically — section labels/accent/icons/copy must come from `courseMechanics[cid]`.
4. Estrella growing into a dominant chat instead of a margin/drawer.
5. Fixed `max-height` on studio columns → zoom overflow. Use `min-height`; only inner panes scroll.
6. Jargon surviving in UI strings (`XP`, `points gathered`, `pointUnit()`, "Every star is lit", "Newcomer", "archetype"). Scrub to artifact-centric copy.
7. Mobile studio not stacking to handoff order: header → action → content → progress drawer → Estrella drawer.

## Do NOT touch (already correct — reskin only)
`exercise.interaction` consumption, `requiresWriting` gate, choice/draft save + 400ms debounce,
quiz grading/`aComplete`, course-completion + badge/cert logic, `estrella.academy.v1` shape,
`AST.{lessons,courses,tracks,badges,lastLesson}`, routing/`switchView`, mount points
`#sky-root`/`#atl-root`/`#std-root`, `coverImg(cid)`, `courseMechanics`.

## State matrix (verify each, desktop + mobile)
Fresh learner · in-progress · completed lesson · completed course · choice lesson · writing
lesson · all 8 dossiers · vault · certificate · mobile home · mobile course · mobile studio ·
Estrella toggle · reduced motion · keyboard focus · 375/768/1024/1440 (no horizontal scroll).

## Defects in the mockups — do NOT reproduce
`FOUNTION`→`FOUNDATION`; `Book Session 📅` emoji → SVG/none (E2); light-gray microcopy near 4.5:1 → bump one luminance step.

---
> Concept: **Dossier Desk** — saved to `docs/PLAN_DossierDesk.md`. Next artifact: the
> `/katana` build executes this contract against `index.html` (CSS + Academy render fns)
> over the already-correct data wiring. `/sincere` humanises copy after build.
