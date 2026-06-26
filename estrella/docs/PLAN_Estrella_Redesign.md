# Estrella — Deep Design Plan (Daedalus)

Brand contract (do not violate): cream/ink/gold only. `--bg #F2EBDC`, `--ink #14120E`,
`--gold #B8985C`, `--gold-deep #97793F`. Cormorant Garamond (display) + Inter (text).
No purple/cyan/glass/neon. Single `index.html` SPA, `data-view` routing, GSAP transitions.

Four surfaces. Each declares a surface type, designs to the craft rubric, and names the
dead-void / wrong-proportion guard it fixes.

---

## 1. Coaching — Concept: "The Doorway" (RADICAL simplification)

**Surface type:** minimal/luxury (density floor 0.20, framed around a focal).

**Why the last 3 attempts missed.** I simplified the *page* but kept the *flow* heavy. The
real complexity was structural, not cosmetic:
- The **calendar month-grid** = dozens of choices. This IS "the 50 choices that confuse them."
- **7 screening questions** read as a form, not a conversation.
- The Coaching page had **3 competing blocks** (portrait + how-it-works + offer card) and **2 CTAs**.

**Thesis:** A premium booking does not explain itself. It begins. Strip coaching to a single
doorway and a short conversation; let Estrella *propose* the time instead of presenting a grid.

### The whole new flow (3 calm screens, no grid, no form)

1. **Doorway** (`view-services`) — ONE screen, ONE button.
   - Nesreen portrait (dominant artifact, ~58% on desktop / full-bleed top on mobile).
   - Beside it: eyebrow "Private coaching with Nesreen" · one line "One hour. A clear next step."
     · price line "AED 500 · 60 minutes" · **one** primary button: **"Talk to Nesreen →"**.
   - REMOVE: the 3-step how-it-works, the offer card, the second CTA. The explanation is the
     experience — don't pre-narrate it. (Fixes: trapped-gap / competing-focal; one focal per B2.)

2. **Estrella** (`view-start`) — the genius extractor, trimmed 7 → **3 core questions**:
   1. Who are you? (identity → name + role)
   2. What do you want from this hour? (goal)
   3. What's in the way? (obstacle)
   Estrella may ask ONE smart follow-up when an answer is thin, but the spine is 3. Same warm
   conversational UI, same profile build. Shorter = feels like talking, not filing a form.

3. **Brief → Book** — profile reveal (compact) → existing **calendar grid kept** (Sam's call:
   users pick any day/time themselves) → **AED 500** → done. The simplification is the Doorway
   page + the 3-question chat, NOT the scheduler.

**Three-second contract:** the user perceives Nesreen + AED 500 + one button. The obvious action
is to start talking. **Motion:** button → conversation is a calm cross-dissolve (200–300ms, the
existing GSAP curve). Reduced-motion: instant. **States:** thin answers get a follow-up; "another
time" reveals the existing calendar as the escape hatch (kept, just demoted out of the default path).

---

## 2. Client Dashboard — Concept: "One Card" (strict no-scroll)

**Surface type:** app/utility, luxury. Hard constraint: fits 100dvh, **zero scroll**.

**Why the current one fails:** greeting + session card + growth rings + 3 indicator bars +
action plan + recommendations = a long scroll, and the rings/indicators are decorative
gamification (rubric H: no fake metrics on a coach's client view).

**Thesis:** A client logging in needs exactly one thing — their next hour with Nesreen.
Everything else is one quiet line or it's gone.

**Layout (one screen, flex, footer-pinned — fixes region-void + column-fill guards):**
- Greeting, small: "Good evening, Sarah."
- **The one card** (focal, ~45% of viewport): next session — Nesreen avatar, "Career Coaching
  Session", date · time · Zoom, **brief-ready status**, and the primary action that adapts:
  countdown → **Join** when live → "Book your next" after.
- A slim row of **at most 3 quiet next-steps** as one-liners: *View my brief* · *Continue in
  Academy* · *Library*. Single line each, icon + label, no cards.
- That's the whole screen. **Cut from the landing view:** growth rings, the 3 indicator bars,
  the action-plan checklist, the recommendations grid. (If Nesreen ever wants progress, it lives
  one tap deeper — not on the default screen.)

**Three-second contract:** "my session is in 18 hours, here's how I prepare/join." **States:**
no-upcoming-session → the one card becomes "Book a session with Nesreen" (routes to Doorway).

---

## 3. Library — Concept: "Promote to Hero" (refinement, not rebuild)

**Surface type:** marketing/editorial + gallery.

**Fixes Sam's two notes:** (a) the dead band under the title; (b) every book should get the
featured treatment when clicked.

- **Kill the top void (region-void guard):** pull the featured book up to fill the top band
  (B4: hero 40–55% above-fold). Title/eyebrow sits beside or above the featured book, not
  floating over empty space. Left = big cover (dominant artifact, locked ratio ~5:8 spine),
  right = title · subtitle · 3 stats · Read Chapter 1 / Buy / Listen-sample. No empty band.
- **Every book → hero:** the books below become a selectable **rail of covers**. Clicking any
  cover **promotes it into the hero slot** (smooth swap, ~250ms; cover crossfades, text updates).
  So all books are "portrayed like the hero one once pressed." The currently-featured one is
  marked active in the rail.
- Keeps the existing content; rewires interaction + composition only.

---

## 4. Floating bottom nav — REMOVE

Sam finds it useless; it duplicates the top nav on portal views. **Decision: delete it.** One
consistent top nav across all non-immersive views. Reachability after removal:
- Dashboard → the account button (top-right, already there).
- Library / Academy → top nav (already there).
- AI Twin (`view-twin`) → fold into the dashboard as one of the quiet next-step lines, or drop
  from v1. (Recommend: drop from the default; it's not core to the coaching promise.)
- Academy lesson/course immersive views keep their own appbar — unaffected.

---

## Build order (after direction confirmed)
1. Remove floating nav (clears the system). 2. Dashboard "One Card". 3. Library "Promote to Hero".
4. Coaching "Doorway" + 3-Q screening + proposed-times scheduling.
Then verify each at 375 / 768 / 1024 / 1440, no-scroll where required, commit.

> Concept: Estrella-Redesign — saved to docs/PLAN_Estrella_Redesign.md
