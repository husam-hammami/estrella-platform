# Estrella Academy — Gamification Design

**The reward layer for the "Constellation" concept** · v1 · 2026-06-26

> This extends, never contradicts, `academy/gamification.json` — that file is the
> **locked data contract** (Light values, level thresholds, 15 badges, streak rules,
> tracks, certificate fields). This doc is the *experience design* around that data:
> how rewards are felt, when they appear, and the rules that keep them premium.
> UX context lives in `Academy_UX_Spec.md`.

---

## 1. The governing principle

**Reward the work, not the streak-anxiety.** Every mechanic here is filtered through one
test from the brand's own spec: *"Elegant and earned, never like a children's game.
Progress is a sign of real work, not a points race."*

That single sentence rules out most of what "gamification" usually means — leaderboards,
loss-streak guilt, daily-spin rewards, badges for trivial actions, loud confetti. What
survives is a system where **the only things that feel good are the things that took
real effort**, and the reward *is* a more complete version of the learner's own work and
identity.

Three design commitments follow:
1. **Mastery is judgment, not perfection-on-easy.** Light and badges are weighted toward
   the hard final lessons (Evaluate/Create), not the easy first ones. Finishing the
   "Create" lesson of a course is worth far more than acing a Remember-level MCQ.
2. **Rewards are calm.** Gold, quiet, single-motion. A level-up is a held breath, not a
   slot machine.
3. **The deepest reward is the artifact and the sky** — tangible proof you built
   something and a visible shape of who you're becoming. The numbers (Light) are real
   but kept "calm and quiet" (the spec's own words).

---

## 2. Light (XP) — what it is and how it's felt

**Light is the currency, but it is never the headline.** (`gamification.json` › xp.)

| Action | Light | Felt as |
|---|---|---|
| Finish a lesson (first time) | 50 | A star lights |
| Each quiz question correct | 10 | A quiet tick |
| Quiz mastery (all first-try) | +40 | A brighter star |
| Course completion | +200 | A constellation completes |
| Daily streak bonus | +15 | The sky stays warm |
| Track completion | +500 | A figure is drawn + a title earned |

**Display rules:**
- Show **one** number on the Academy home: current level + Light remaining to the next
  level. Never a four-counter scoreboard across the top (that's the points-race look).
- Light *animates only on earning* — a number ticks up once, gold, then settles. It
  doesn't pulse or demand attention at rest.
- The full Light breakdown lives in the profile/You view, one tap away, for those who
  want it. Out of sight by default.

**Anti-pattern guardrail:** Light is never spendable, never tradeable, never tied to
unlocking content you paid for. It's a *measure of work done*, not a economy. Locking a
purchased lesson behind a Light wall would be the points race the brand forbids.

---

## 3. Levels — the six-star ladder

`gamification.json` › levels. Six tiers, named as a sky filling in:

```
First Light (0) → Rising Star (500) → Guiding Star (1,500)
→ Star Pattern (3,500) → Bright Star (6,500) → Estrella (10,000)
```

**Design of the level-up moment (the single most important "game feel" event):**
- Triggered the instant Light crosses a threshold (mid-lesson is fine — celebrate it
  where it happens, then let them continue).
- A calm full-attention overlay: the new tier's star sigil draws itself in gold over the
  cream canvas, the tier name in Cormorant, and the one-line blurb from the data
  (`"You are building a habit. You keep coming back…"`). One eased motion (~600ms), a
  soft gold bloom, *no confetti, no sound by default.*
- Dismisses on tap or after 4s. It interrupts once and gets out of the way.
- "Estrella" (tier 6) is the crown moment — reaching the academy's own name. It gets a
  slightly fuller treatment (the full sky briefly lights) because it's the rarest and
  most earned. Reserve the spectacle for the one moment that deserves it.

**Why named tiers beat a number.** "You're Level 4" is a game. "You've reached Guiding
Star — others start to notice you" is a coach telling you something true about your
growth. Same mechanic, opposite register. The names do the brand work.

---

## 4. Badges — fifteen gold discs

`gamification.json` › badges. Two kinds: **course graduation** (8, one per course) and
**behavior** (7: first step, full marks, busy day, 7 days, 30 days, clean sweep, whole
track).

**Design rules:**
- Each badge is a single gold disc with an engraved sigil — consistent silhouette,
  consistent size, no color-coding, no rarity tiers shouting at each other. They read as
  *medals*, not stickers. (Craft: max one effect per element — a disc has a single soft
  emboss, not shadow+gradient+glow stacked.)
- **Earned badges are gold and present; unearned are absent, not greyed-and-taunting.**
  The current code shows "Badges appear as you learn" when empty — keep that dignity.
  Don't render 15 locked silhouettes as a checklist of things you haven't done; that's
  guilt UX. Show what's earned; reveal the next one only when it's one action away.
- The **reveal moment** is small: a disc presses in (a single 200ms motion) into the
  badge row with its one-line meaning. No modal unless it's a course/track graduation
  (those earn a moment — see §6).

**Weighting check.** Notice the behavior badges reward *real* patterns — mastery
(all-first-try), a 30-day habit, a clean course sweep. There is deliberately **no badge
for "logged in," "watched a video," or "clicked next."** Effortless actions earn
nothing. That's the brand line holding.

---

## 5. Streaks — momentum without anxiety

`gamification.json` › streak. A day counts when you finish ≥1 lesson or pass ≥1 quiz.

This is the mechanic most likely to betray the brand, so it gets the most restraint:

- **One grace token ("Free Day") per 30 days, auto-refilling.** A missed day doesn't
  break the streak; it spends the token silently. The spec is explicit: *"We do not make
  a game out of missing days."* So: **no "your streak is in danger!" push, no flame
  emoji, no countdown timer guilt.**
- The streak is shown as a **calm fact** in the Continue band: "12 days. Your sky's been
  lit every day this week." Past tense, warm, not a threat about tomorrow.
- Milestones at 7 ("Seven Days" badge) and 30 ("Always There" badge) are the only streak
  rewards. No escalating daily-bonus ladder that punishes you for stopping at day 6.
- **Timezone is the learner's local** (already in data) — never reset someone's streak on
  a UTC technicality. That's a trust-destroying bug in most streak systems.

**The reframe in one line:** a streak here means *"you kept showing up,"* not *"don't you
dare miss."* Same counter, humane framing.

---

## 6. Milestone moments — the celebration grammar

A consistent, calm grammar for every "you did something" moment, scaled to how much it
took. The whole point is that **the spectacle is proportional to the effort** — so the
big moments land because the small ones stayed quiet.

| Moment | Effort | Celebration |
|---|---|---|
| Lesson complete | Low | A star lights in the path. One pulse. +50 Light ticks. |
| Quiz mastery | Medium | The star brightens; "Full marks" disc if first lifetime. |
| **Bank to artifact** | Real | The learner's work animates into the artifact (the §8 Studio signature motion). This is the core dopamine — earned by application, not a radio button. |
| Level up | Cumulative | The §3 overlay — calm, gold, 4s. |
| Course complete | High | Constellation completes + certificate offered (signed by Nesreen) + graduation badge. A genuine moment — full overlay, the artifact presented as *finished and exportable*. |
| Track complete | Highest | The three constellations draw into one figure; the earned title ("Grounded"/"Named"/"Interview Ready") is inscribed on the profile. The rarest spectacle. |

**Never:** confetti cannons, coin showers, sound effects by default, a "+50!!!"
explosion. The motion vocabulary is gold-bloom and star-light, reused everywhere, so the
Academy feels like one calm place rather than a casino.

---

## 7. The artifact as the deepest reward

This is the gamification idea that most separates Estrella from a Duolingo clone: **the
real reward isn't points, it's the thing you built.** Each course produces one tangible
artifact (`CONTENT_DESIGN.md` table):

| Course | Artifact |
|---|---|
| AI for HR | An AI-in-HR map (each initiative placed by role, leverage + risk named) |
| HR Foundations | A personal HR operating-principles sheet |
| Personal Branding | A brand statement / positioning one-pager |
| Interview Mastery | A personal interview playbook |
| Public Speaking | A signature opening + delivery plan |
| Confidence Reset | A confidence-reset plan (named reframes) |
| Leadership | A leadership stance + a worked decision |
| The Offer Machine | A pay-negotiation plan + script |

**Reward mechanics on the artifact:**
- It fills section-by-section as lessons complete (visible in the Atelier). Loss aversion
  does the retention work: you don't abandon a half-built thing in your own words.
- On course completion it becomes **exportable** (PDF, on-brand: cream/gold/Cormorant) —
  a real deliverable the learner uses at work. That's worth more than any badge.
- The **Artifact Vault** (a profile surface) collects all eight. Completing the academy
  means walking away with a full personal toolkit, not a high score.

The certificate (signed by Nesreen, mastery seal variant per `gamification.json`) is the
*proof*; the artifact is the *value*. Both outrank the number.

---

## 8. Social / motivation layer — presence, not rank

Detailed rationale in `Academy_UX_Spec.md` §7. The reward-design summary:

- **No leaderboard.** A ranking of HR leaders by Light is the points race the brand
  forbids and it churns the senior buyer. Omitted by decision.
- **Cohort presence** (aggregate, ambient): "23 HR leaders are in Signature this month."
  Belonging, not competition.
- **Shareable sky + certificate** are the outward trophies — personal, premium, owned.
  Exporting your constellation compares you only to your past self.
- **Completion proof** ("412 finished AI for HR") only if real and labeled — never a
  fabricated metric.

If a competitive mechanic is ever required, it's an **opt-in, time-boxed cohort
challenge**, never the default Academy surface — quarantining the points race from the
people it would repel.

---

## 9. The reward-timing model (when things fire)

```
Open lesson        → nothing (no reward for showing up)
Read method        → nothing
Submit the work    → Estrella coaches (the value), not a point
Meet the rubric    → BANK animation + star lights + Light ticks   ← the moment
Pass quiz (early)  → tick; mastery → brighter star + maybe a disc
Finish lesson      → +50, star stays lit, next star begins to halo
Cross a level      → calm level-up overlay
Finish course      → constellation completes + certificate + badge + artifact export
Finish track       → figure drawn + title inscribed (rarest)
```

The deliberate gap: **the early actions earn nothing.** Reward lands at the moment of
*demonstrated judgment* (rubric met), which is exactly where the content brief puts
mastery. The system's incentive gradient points at the hard, late, application work —
not at clicking through.

---

## 10. Anti-patterns this system refuses (and why)

| Common gamification move | Refused because |
|---|---|
| Leaderboard / ranking | Points race; repels the premium senior buyer |
| "Streak in danger!" guilt push | Brand: "we don't make a game out of missing days" |
| Confetti / coins / sound on every action | Cheapens the luxury register; breaks "calm" |
| Badge for trivial actions (login, watch) | Effortless ≠ earned; dilutes every other badge |
| Spendable points / unlock economy | Turns learning into a grind loop; not a measure of work |
| 15 greyed locked badges as a checklist | Guilt UX; we show earned, tease only the next |
| Daily-spin / variable reward | Casino mechanics; antithesis of "earned" |
| XP for re-taking a quiz | Already handled in data (Light once only) — no farming |

Every refusal protects the same thing: **the feeling that progress here is real.**

---

## 11. Implementation notes (mapping to the existing build)

The data and core math already exist in code — this is mostly experience polish, not new
mechanics:
- `AST` (localStorage state) already tracks `xp`, `lessons`, `badges`, `streak`. Extend
  it to persist per-lesson **draft text** (for the artifact) and **rubric-met** flags.
- `aLevel()`, `aComplete()`, `aGradeQuiz()`, `aCelebrate()`, `aRenderHeader()` exist —
  the level-up overlay and bank animation are new presentation on top of `aCelebrate`.
- The `acad-constellation` canvas already exists but is hidden (`display:none`) — this
  design *activates* it as the Sky/Constellation view rather than adding a new dependency.
- Keep all Light values, thresholds, and badge criteria **exactly** as
  `gamification.json` specifies. This doc changes *how rewards feel*, never *what they're
  worth*. The numbers are locked; the experience is the work.

---

**Saved to `docs/Academy_Gamification_Design.md`.** Pairs with the UX spec
(`Academy_UX_Spec.md`) and the locked data (`academy/gamification.json`).
