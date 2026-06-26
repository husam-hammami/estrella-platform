# Estrella Academy — UX Specification

**Concept: "Constellation"** · designed with Daedalus · v1 · 2026-06-26

> Companion docs: `Academy_Gamification_Design.md` (the reward layer in detail),
> `academy/CONTENT_DESIGN.md` (what every lesson says), `academy/gamification.json`
> (the locked reward data). This spec owns **structure, interaction, and motion** —
> not copy (that's `sincere`) and not the reward math (that's the gamification doc).

---

## 0. The one-line thesis

**Learning draws your career into a visible shape you can hold.**

Every lesson lights one star. A finished course completes a named constellation *and*
hands you one real artifact (your brand statement, your interview playbook, your pay
script). Progress isn't a score climbing — it's a private sky filling in, and a folder
of things you built filling up. That reframing is the whole design: it lets us be
genuinely gamified without ever feeling like a children's game, which is the brand's
hard line (`gamification.json`: *"elegant and earned, never like a children's game…
no points race"*).

### Why this concept and not the obvious ones
- **Not a Duolingo path.** A linear node trail with confetti reads as childish and
  collapses the brand. Rejected.
- **Not a Masterclass film-strip.** Beautiful but passive — it sells watching, not
  doing. The Academy's moat is *rehearsal with feedback*, not video. Rejected as the
  dominant model (kept only as a lesson-level treatment where a course has video).
- **Not a leaderboard / competitive social layer.** The brief asks for it; the brand
  forbids it. A ranking of HR professionals by "Light" is exactly the points race the
  reward spec rules out, and it punishes the senior, time-poor learner who is the
  actual buyer. **Design decision: no leaderboard.** Social proof is delivered as
  *presence* (others are here, others finished this), never *rank*. See §7.
- **Constellation wins** because it's already in the product's DNA — the levels are
  named First Light → Rising Star → … → Estrella, the XP unit is "Light," the tagline
  is "Born to Shine," and there's already an (unused) `acad-constellation` canvas. We
  are not importing a metaphor; we are paying off one the brand already made.

### The discipline that keeps it from becoming decorative
The craft risk with any sky metaphor is wallpaper — a twinkling starfield that obscures
the task. The rule for this build: **the constellation is a data visualization of real
progress state, and it must degrade to a plain list with zero loss of function.** No
star exists that doesn't map to a lesson. No motion runs that doesn't signal a state
change. If you turn the art off, the Academy still works perfectly. (See §8 Motion and
§9 States — both written to that standard.)

---

## 0.5 Two hard constraints (v1.1 — from Sam)

These govern everything below and are non-negotiable.

**A. No page scroll.** The entire Academy — every view, every lesson, every browser —
fits within one viewport. We never hand the user a long scrolling page. The mechanisms:
tabs and segmented controls (zone-swap), a **paced lesson deck** (one beat per frame,
paging not scrolling), slide-in panels, overlays, and the constellation map. The *only*
scrolling permitted is **internal overflow inside a single content pane, used purely as
the WCAG-reflow safety valve** at high zoom or on small screens — never the page, never
the chrome. This reframes the lesson from a document you scroll into a **deck you
advance**, which is also better pedagogically: one idea per frame, paced, with the work
and the tutor always in view.
- *Desktop* = the zero-scroll guarantee, fully delivered.
- *Mobile* = chrome stays fixed; at most one pane becomes an internal scroll region; the
  lesson stays no-scroll via a **Lesson⇄Estrella toggle**. (A phone cannot fit a full
  dashboard + 8-course map + tracks at once; the honest answer is tabs + one scroll
  region, not a clipped page.)

**B. The visual component design is a first-class deliverable.** Flows without pixels
aren't a design. The look — premium, pixel-considered, worthy of a high-end coaching
brand — is specified to a luxury-editorial floor in
**`Academy_Component_Design.md`** and realised in a working, screenshot-audited mockup at
**`docs/design-mockups/academy-constellation.html`** (open it — it is the source of truth
for feel). Where this spec describes a view's *structure*, the component doc and mockup
define its *appearance* down to tokens and exact values.

> Implementation note: a few view descriptions below were originally written assuming a
> scroll (e.g. the Stage "transitions into" the work). Under constraint A, read those as
> **paged**: the method beats and the work are successive deck frames within one fixed
> viewport, advanced by the beat nav — not a single scrolling column.

---

## 1. Who this is for, and the three-second contract

**Primary user:** a working HR professional, 30s–50s, senior, time-poor, paying a
premium. She opens the Academy in stolen 15-minute windows. She is mildly skeptical of
"courses" and allergic to anything that feels like a corporate LMS or a game for kids.

**Moment of use:** between meetings, on a phone as often as a laptop. She wants to know
in three seconds: *where was I, what's the one thing to do now, and is this worth my
time.*

**Three-second contract, per surface:**

| Surface | Must be perceived instantly | The one obvious action |
|---|---|---|
| The Sky (home) | "Here's my progress and the single next step" | **Continue** the in-progress lesson |
| The Atelier (course) | "Here's what I'll walk away with, and how far in I am" | **Resume / Start** the next lesson |
| The Studio (lesson) | "Here's the one idea and I can practice it now" | **Rehearse** (the artifact-building action) |

Everything below serves those three contracts. If an element doesn't, it's cut.

---

## 2. Information architecture

```
Academy
├── The Sky            (home / dashboard — replaces today's 3-panel browse)
│   ├── Continue band  (the single resume target + streak state)
│   ├── Your sky       (constellation progress map across all 8 courses)
│   ├── Tracks         (3 named paths: Foundation, Signature, Interview)
│   └── Browse         (all courses, filterable — the catalog, demoted below the fold)
│
├── The Atelier        (course detail — reframed around the artifact)
│   ├── The artifact   (what you're building — dominant object, fills as you go)
│   ├── The path       (modules → lessons, as a small constellation)
│   └── Start / Resume
│
├── The Studio         (lesson player — 3 zones, tutor is a participant)
│   ├── Method         (Nesreen's reasoning — left)
│   ├── Stage          (your rehearsal / draft / decision — center, the work)
│   └── Estrella       (AI coach — right, contextual, Socratic)
│
├── Constellation view (full-screen progress map — earned, opens from The Sky)
├── Certificate        (per course; mastery variant)
└── Artifact vault     (everything you've built, exportable)
```

The current views map cleanly: `view-academy` → The Sky, `view-course` → The Atelier,
`view-lesson` → The Studio. No new routes required; this is a redesign of three
existing surfaces plus two earned overlays (constellation, vault).

---

## 3. The Sky — academy home

### 3.1 What's wrong with today's version
The current `view-academy` is a 3-panel rail (Courses | Preview | How-it-works). It's
tidy but it's a catalog, not a home. It opens cold every time, gives equal weight to a
returning learner and a first-time browser, and buries the single most valuable action
("continue where you left off") inside a preview panel. The "How it works" column is
permanent onboarding scaffolding that a returning user has to look past forever.

### 3.2 The redesign — three bands, priority-ordered

**Band 1 — Continue (the resume contract).**
For a returning learner this is the top of the page and the only thing above the fold
that matters. Full-bleed card:
- Left 62%: the in-progress lesson — course name, lesson title, "Lesson 4 of 9,"
  a thin progress meter, and one primary button: **Continue** (action+outcome copy:
  "Continue — finish your brand statement," never "Resume").
- Right 38%: the streak as a calm fact, not a scoreboard — "12 days. Your sky's been
  lit every day this week." One small constellation thumbnail of the current course.
- For a **first-time** visitor this band inverts to a single invitation ("Pick one
  course. Start clearly.") with the recommended starter course, and the streak/score
  furniture is absent — never show a returning-user dashboard of zeros (the current
  code already does this correctly in `aRenderHeader`; keep that instinct).

**Band 2 — Your sky (the progress map).**
A horizontal constellation strip: each of the 8 courses rendered as a small
constellation whose stars light as lessons complete. Completed courses glow gold and
carry their badge; in-progress courses show a half-drawn shape; locked/untouched
courses are faint outlines. Tapping one opens its Atelier. A **"View your full sky →"**
affordance opens the full-screen Constellation view (§6). This is the emotional core:
the learner sees her career *literally taking shape*. It is also a real navigation —
every star is a lesson link.

**Band 3 — Tracks + Browse.**
The three tracks (Foundation, Signature, Interview) as three wide cards, each showing
its courses, its end-reward title ("Grounded," "Named," "Interview Ready"), and a
combined progress ring. Below that, the full filterable catalog (the existing filter
chips — All / Foundation / Signature / Interview — are kept) as the browse fallback for
people who want to shop rather than continue.

### 3.3 Gamebar — keep, but relocate and calm
Today's `#acad-gamebar` (Light total, lessons done, streak, badges) is good and
on-brand. Move it into Band 1's right column as the streak/level summary, and let the
full breakdown live in the profile. Don't show four counters across the top of a luxury
page — that's the scoreboard the brand warns against. One number (current level + Light
to next) plus the streak is enough; the rest is one tap away.

---

## 4. The Atelier — course detail

### 4.1 The reframe: the artifact is the hero, not the syllabus
`CONTENT_DESIGN.md` makes a load-bearing promise: **every course produces one tangible
artifact** (a brand one-pager, an interview playbook, a pay-negotiation script…). The
current course page treats that as a footnote and leads with a module list. We invert
it. The artifact-in-progress becomes the dominant functional object on the page.

### 4.2 Layout (desktop, 62/38 asymmetric)

**Left 62% — The artifact.**
A live, growing preview of the thing the learner is building. Early in the course it's
mostly a faint template with one or two filled sections; by the end it's complete and
exportable. Each completed lesson visibly *adds a piece* to it. This is the retention
hook made visible: you don't want to abandon a half-built thing with your own words in
it. Below it: **outcomes** ("What you'll be able to do") as three concrete competence
statements, not marketing triplets.

**Right 38% — The path.**
The course rendered as its own small constellation: modules are clusters, lessons are
stars. The next lesson pulses gently (the only ambient motion on the page). Completed
lessons are gold and filled; the current one is haloed; later ones are faint. A linear
list view toggle sits beside it for accessibility and for people who prefer a syllabus.
The primary CTA — **Start** / **Resume "‹next lesson title›"** — pins to the bottom of
this column so it's always reachable.

**Top strip.** Course cover, title, track membership chip, total time
("≈ 2h 10m · 9 lessons"), and the badge you'll earn. Bloom progression is *implied* by
the path shape (early stars cluster low, the final "Create" star sits at the apex),
never labeled with taxonomy jargon — the learner feels the climb without the lecture.

### 4.3 Locked / preview state
Today only AI-HR lesson 1 has authored content and everything else shows a preview
banner. Keep an honest version of that: an un-purchased or un-started course shows the
artifact template *empty* with a one-line "Here's what you'll build," and the first
lesson is openable as a true sample. No fake completion, no "Your X here" placeholder
shipped as final (craft rule H).

---

## 5. The Studio — the lesson player (the heart of the redesign)

This is where the current build is weakest and where the premium promise is won or lost.

### 5.1 What's wrong today
Three problems, all structural:
1. **The spine is a lie about the content.** The left rail hard-codes
   `Focus → Map → Practice → Check → Finish` for every lesson. But `CONTENT_DESIGN.md`
   has *three different lesson archetypes* (Knowledge, Performance, Identity) with
   different beats. A fixed 5-node spine misrepresents two of the three.
2. **The tutor is a sidebar gimmick.** It's scripted — `reply()` literally returns the
   first takeaway with a canned wrapper. It's positioned as a help widget you can
   ignore. But the tutor *is the moat* (`CONTENT_DESIGN.md` §"the AI tutor rubric").
   Treating it as optional furniture wastes the one thing a book can't do.
3. **The "work" is an MCQ.** The retired model ends every lesson in a multiple-choice
   check. The new model ends in *application the tutor grades* — rehearsing an answer,
   writing a stance, making a call. The center of the screen should be the learner's
   work, not a quiz.

### 5.2 The redesign — three zones, archetype-aware

The Studio keeps a three-column grid on desktop but reassigns the columns by *role in
the learning act*, and the spine becomes **archetype-driven**, not fixed.

```
┌─────────────┬──────────────────────────┬─────────────────┐
│  METHOD     │         STAGE            │    ESTRELLA     │
│  (left)     │        (center)          │     (right)     │
│             │                          │                 │
│ Nesreen's   │  The lesson content,     │  The AI coach.  │
│ reasoning.  │  then THE WORK:          │  A participant, │
│ Frameworks  │  · rehearse an answer    │  not a widget.  │
│ named as    │  · write your stance     │  Socratic,      │
│ tools.      │  · make the call         │  graded against │
│             │                          │  the lesson     │
│ Path shows  │  This is the dominant    │  rubric.        │
│ THIS lesson │  zone — the learner's    │                 │
│ archetype's │  own words live here.    │                 │
│ real beats. │                          │                 │
└─────────────┴──────────────────────────┴─────────────────┘
```

**Archetype-driven spine (left).** Instead of one hardcoded 5-node path, the spine
renders the beats for *this lesson's archetype* (from `CONTENT_DESIGN.md`):

| Knowledge / judgment | Performance / rehearsable | Identity / positioning |
|---|---|---|
| The situation | The moment | The mirror |
| How Nesreen reads it | How Nesreen does it | Nesreen's lens |
| Your move | Your turn (rehearse) | Draft |
| Pressure-test with Estrella | Estrella coaches → redo | Sharpen with Estrella |
| What you can now do | Banked | It's yours |

The node the learner is on is haloed; the artifact-producing final beat is gold. The
spine is now *honest* — it tells the learner what kind of work this lesson asks for.

**The Stage (center)** carries the content (Nesreen's method, concise, frameworks named
once and used — not explained at length), then transitions into **the work**: a typed
or spoken rehearsal box, a draft editor, or a decision prompt with the learner's
reasoning. The "Finish lesson" button is replaced by the archetype's real action:
**"Pressure-test my answer"**, **"Run my opening"**, **"Sharpen this with Estrella"**.

**Estrella (right)** is detailed in §5.3. She is pinned, present, and the lesson cannot
reach "mastered" without engaging her on the application lessons — because that
engagement *is* the assessment.

### 5.3 The AI tutor interaction model (the moat)

**Stance.** Estrella is Nesreen's method made conversational: *calm, direct, warm,
tells the truth.* She never just praises. She names the gap and asks the learner to
close it (`CONTENT_DESIGN.md` voice rules).

**She runs on a per-lesson rubric, not vibes.** Each lesson authors (per the content
brief): 3–5 criteria for a strong answer in Nesreen's terms, a "not yet" vs "you've got
it" tell for each, and one **redirect prompt** (a question, never the answer) for when
the learner is off. The UI surfaces this as a quiet rubric chip set the learner *can*
peek at ("What makes this strong?") but doesn't have to.

**The four interaction modes:**

1. **Contextual hint (ambient).** A low-key "stuck?" affordance on the Stage. Tapping
   it gives a Socratic nudge tied to the current beat, never the answer. Costs nothing,
   judges nothing.
2. **Pressure-test (the graded loop).** The learner submits their move/answer/draft.
   Estrella responds against the rubric: names what's working, names the one biggest
   gap, asks a question to close it. The learner revises and resubmits. This loop — not
   an MCQ — is what earns "mastery" on application lessons.
3. **Socratic deepening (on demand).** The learner can ask "why?" and Estrella reasons
   in Nesreen's voice, citing the named framework as a tool, not a lecture.
4. **Personalized to *their* org/context.** The learner's earlier inputs (their company
   size, their role, the trigger they named in the diagnostic) flow in so feedback is
   about *their* situation. This is the thing a generic chatbot can't do and is worth
   protecting in the data model.

**Voice of Nesreen.** All tutor copy is authored in her register and reviewed (the Twin
view already markets Estrella as "trained on Nesreen's method, reviewed by her
weekly" — honor that claim or soften it; don't ship it as decoration). Avoid the empty-
praise failure mode at the system-prompt level: the tutor's contract is *specific,
honest, never blaming, never "great job!"*.

**Honesty guardrail.** Until a real model is wired (see launch plan), the tutor must not
*pretend* to grade. The current scripted echo is acceptable as a labeled "preview of how
Estrella coaches" but must not claim to assess the learner's actual answer. Shipping
fake assessment as real is the one thing that detonates a premium coaching brand.

### 5.4 Micro-interactions inside the lesson
- **Reflection prompts** between method and work ("Before you try — what would you have
  said last year?"). One line, optional, builds the personal stake.
- **Inline definition peeks** for named frameworks — hover/tap a credited term
  (Ulrich's roles, STAR) for a 1-sentence gloss, so the lesson body stays uncluttered
  (content brief: name once, then use).
- **Bank moment.** When the learner's work meets the rubric, it visibly *drops into the
  artifact* (a small, single motion — see §8). That's the dopamine, and it's earned by
  real work, not a correct radio button.

---

## 6. Constellation view (full-screen progress map — earned overlay)

Opens from The Sky's "View your full sky." A single dark canvas (dark mode per craft
rule J — canvas ~#16130E not pure black, gold accents at higher contrast) showing all
8 courses as constellations positioned in three regions matching the three tracks.

- **Lit stars** = completed lessons (gold). **Drawn lines** = completed modules
  (connections between stars appear as you finish a module). **Faint outlines** =
  not-yet. **Haloed star** = your current lesson (the resume target — tapping it is the
  fastest Continue in the whole app).
- Finishing a **track** draws its three constellations into one larger figure and
  inscribes the earned title ("Grounded" / "Named" / "Interview Ready").
- This is the shareable moment (a learner can export her sky as an image — see
  gamification doc §social). It's the antithesis of a leaderboard: it compares you only
  to your past self.

**Functional, not decorative discipline:** every star is a real lesson with a real link;
the canvas has a list-view toggle; with `prefers-reduced-motion` the sky renders static
(no twinkle). If WebGL/canvas is unavailable it degrades to the Sky's strip view.

---

## 7. Social proof and motivation (brand-safe, no ranking)

The brief asks for leaderboards/cohort progress. Here's the line we hold and why:
**presence, not rank.** A senior HR leader is not motivated by beating peers on a points
board; she's reassured by *this is real, others like me are doing it, and finishing
means something.*

- **Cohort presence (ambient).** "23 HR leaders are working through Signature this
  month." Aggregate, never named, never ranked. It says "you're not alone," not "you're
  4th."
- **Completion proof.** "412 people have finished AI for HR." Real if real, labeled,
  never fabricated (craft rule H — no fake "10,000+ happy customers").
- **Shareable achievement.** The certificate (signed by Nesreen) and the exported sky
  image are the outward-facing trophies — owned, personal, premium. These are the
  social layer.
- **Milestone moments** (level-up, course complete, track complete, streak 7/30) are
  *private celebrations*, calm and gold, never a confetti cannon (see gamification doc).

If the user later insists on a literal leaderboard, scope it as an **opt-in cohort
challenge** (a named, time-boxed group choosing to compete) — never the default Academy
surface. That isolates the points race from the people who'd churn on seeing it.

---

## 8. Motion (the AI-tell most likely to cheapen this)

Native stack is the existing GSAP layer (`gsap-estrella.js`) + CSS. Rules, written to
craft rubric §G:

- **Two easing curves, reused.** `--ease-out` (entrances) and `--ease` (UI feedback).
  Already defined in `:root`. No new curves.
- **Durations:** 150–250ms UI feedback, 200–400ms entrances. Nothing slower except the
  one signature moment below.
- **Signature motion (the only "wow," used sparingly):** when a lesson's work meets the
  rubric, the learner's contribution travels from the Stage into the artifact (a
  single, ~500ms eased move) **and** the corresponding star in the path lights — one
  gold pulse that propagates one hop along the constellation line. This fires *once per
  lesson completion*. It is the reward. Because it's rare and tied to real
  accomplishment, it stays premium instead of becoming wallpaper.
- **Ambient motion:** at most one element breathes at a time — the next-lesson star's
  halo, very low amplitude. No fade-in-on-scroll-everything, no `scale(1.05)` on every
  card hover, no parallax, no looping starfield twinkle.
- **`prefers-reduced-motion`:** hard requirement. All of the above collapses to instant
  state changes; the constellation renders static. (Per Daedalus: a missing
  reduced-motion branch is a *concept* failure, not a nitpick.)

---

## 9. State coverage (AI ships only the happy path — we won't)

Every surface defines empty / in-progress / complete / error, per craft rule I.

| Surface | Empty | In-progress | Complete | Error / edge |
|---|---|---|---|---|
| The Sky | First-time invitation (no zeros dashboard) | Continue band + half-lit sky | All courses gold, "Estrella" level | Offline: cached progress, "syncing when back" |
| Atelier | Artifact template faint, sample lesson open | Artifact half-built, path half-lit | Artifact done + export + certificate | Long course title wraps, 1-lesson module renders |
| Studio | Method shown, Stage prompts first input | Draft saved, tutor mid-loop | "Banked," next-lesson CTA | Tutor unreachable → graceful "saved, I'll coach when back" |
| Tutor | Opening line + suggested chips | Typing indicator, then graded reply | Rubric met, bank animation | Model down: honest fallback, never fake-grade |
| Constellation | Outline of all shapes, none lit | Partial figures | Full figures + titles | No-canvas → list view |

Inputs (the Stage's rehearsal/draft box) must look distinct from buttons and from static
text; labels persist; the learner's in-progress work autosaves to state on every pause
(extend the existing localStorage `AST` model to hold draft text per lesson).

---

## 10. Mobile (mobile-first, desktop-gorgeous)

The three-column Studio can't survive on a phone, and shouldn't try. Mobile model:

- **The Sky** stacks: Continue band → swipeable sky strip → tracks → browse. Touch
  targets ≥44px (the codebase already has a recent commit enlarging these — hold that
  floor).
- **The Atelier** stacks artifact-preview over path; the Resume CTA is a pinned bottom
  bar.
- **The Studio** becomes a *single focused column with a tab/segment switch*:
  **Lesson** (method+stage) ⇄ **Estrella** (tutor), with the archetype spine collapsed
  into a slim progress header. The tutor is one tap away, not a cramped third column.
  The Stage's work input gets the full width — typing a draft on a phone needs room.
- Bottom tab bar for Academy-level nav (Sky · Tracks · You) on mobile, matching the
  existing dash-body pattern.
- No fixed pixel heights on text containers; `clamp()` type; verify at 375 / 768 / 1024
  (tablet-landscape is where reflow voids hide — craft rule F3).

---

## 11. Component-level decisions (with rationale)

| Component | Decision | Why |
|---|---|---|
| **Course card** | Constellation thumbnail + artifact name + progress, on cream surface with category-pastel edge | Tells "what I'll build" + "how far," not just a title; pastel edge = track coding without a loud color |
| **Progress meter** | Thin gold line / ring, never a chunky bar | Luxury restraint; matches the gold-on-cream system |
| **The artifact** | Live document preview, fills section by section | The retention hook the content brief promises; loss-aversion keeps people coming back |
| **Tutor panel** | Pinned participant, rubric-backed, Socratic | It's the moat; demoting it to a help widget wastes the differentiator |
| **Quiz / MCQ** | Survives *only* on early Remember/Understand lessons | Content brief: late lessons are tutor-graded on application; that's what makes mastery mean something |
| **Streak** | Calm fact + 1 grace token, no loss-anxiety framing | Brand: "we do not make a game out of missing days" |
| **Level badge** | Single gold disc, star-named tiers | Existing system; elegant, earned |
| **Leaderboard** | **Omitted** | Brand bans the points race; presence > rank for this buyer |
| **Certificate** | Signed by Nesreen, mastery seal variant | Already specified in `gamification.json`; it's the premium proof |
| **Color** | Cream/ink/gold + existing pastels for track coding only | No new accent; the brand palette is already non-default and correct |

---

## 12. The mockup prompt (next artifact)

The first render should be **one screen: The Studio (lesson player), desktop, Knowledge
archetype, mid-lesson** — it's the highest-risk, highest-value surface and proves the
whole concept. Prompt to compile for the image tool:

> A premium learning interface for an elegant career-coaching academy. Warm cream
> canvas (#F2EBDC), ink charcoal text (#14120E), a single restrained gold accent
> (#B8985C) — no purple, no neon, no glassmorphism. Cormorant Garamond serif headings,
> Inter body. Three vertical zones on desktop: a slim left "method path" rail showing
> five named steps with the third haloed in gold; a dominant center column with a
> concise lesson reading then a writing/rehearsal box where the learner is composing
> their answer, with a calm gold "Pressure-test my answer" button; a right-hand AI tutor
> panel — a small star sigil, one warm Socratic message, a typing indicator, an input.
> One faint gold star in the path is lit. Generous whitespace framed around the center
> work, soft long shadows, 18–28px radii, everything on an 8px grid. Mood: a quiet
> studio with a great coach, not a gamified app. No emoji, no badges spray, no
> scoreboard. Photoreal UI render, even soft daylight, high craft.

References to emulate for *craft only* (not to copy): Apple's whitespace discipline,
Linear's flat dense scale restraint, fine print/editorial typography. **Forbidden to
copy:** Duolingo's path/mascot, Masterclass's film-strip, any SaaS dashboard chrome.

---

## 13. What this spec deliberately does **not** do
- It doesn't rewrite the 82 lessons — that's a content workstream (`CONTENT_DESIGN.md`
  recommends a 2-lesson pilot first). The UX is built to *hold* the new content model;
  filling it is separate.
- It doesn't wire the real AI tutor — that's a backend/launch task (see launch plan).
  Until then the tutor is labeled preview, never fake assessment.
- It doesn't add a leaderboard, a shop, or a feed — scope discipline; those dilute the
  premium, single-next-step promise.

---

**Concept: Constellation — saved to `docs/Academy_UX_Spec.md`.**
Reward layer detailed in `docs/Academy_Gamification_Design.md`; platform path in
`docs/Estrella_Launch_Plan.md`.

**Next artifact:** generate the Studio mockup from §12, critique it against the craft
rubric, iterate 2–3 rounds with real screens. Once the design is approved through those
rounds, it becomes the input to a `/warcry` implementation plan (→ bulletproof →
katana). This spec is upstream of build by design.
