# Estrella Academy — Component & Visual Design

**Pixel-level spec for the "Constellation" concept** · v1 · 2026-06-26

> The look, not just the flow. This documents the actual visual system — tokens,
> component anatomy, exact values — behind the working mockup at
> `docs/design-mockups/academy-constellation.html` (open it; it's the source of truth for
> feel). Pairs with `Academy_UX_Spec.md` (structure/flow) and the no-scroll law below.
> Verified by screenshot at 1440×900 and 390×844 — see §9.

---

## 0. Two laws this design is built to

1. **No page scroll (hard constraint).** On desktop the entire Academy — every view,
   lesson, and browser — lives in one viewport. We achieve it with a fixed app shell and
   *pagination over scrolling*: tabs, a paced lesson deck, slide-in panels, and the
   constellation map. The only scrolling permitted is **internal overflow inside a single
   content pane, used solely as the WCAG-reflow safety valve at high zoom / small
   screens** — never the page, never the chrome. On mobile, chrome stays fixed and at
   most one pane becomes an internal scroll region; the lesson stays no-scroll via a
   Lesson⇄Estrella toggle.
2. **Premium or nothing.** Every component is designed to a luxury-editorial floor:
   restrained gold, generous framing, serif display + clean sans, soft long shadows,
   tight optical alignment. If a component looks like default SaaS, it's wrong.

---

## 1. Visual tokens (the foundation)

Reuses the product's existing brand variables exactly — nothing invented.

```
/* canvas + surface */
--bg:        #F2EBDC   warm cream page
--bg-soft:   #ECE3D0   recessed cream
--surface:   #FBF7EC   raised card (lightest)
--surface-2: #F7F1E2   input / inset fill
--line:      rgba(20,18,14,.07)    hairline
--line-strong: rgba(20,18,14,.12)  divider / input border

/* ink ramp (text + dark surfaces) */
--ink:    #14120E   primary text, primary button, dark bands
--ink-2:  #2A2620   button hover
--text:   #3D3933   body
--text-dim: #6E6862  secondary
--text-mute:#A39B91  tertiary / meta

/* the single accent — gold, used <12% of any view */
--gold:      #B8985C  accent, active state, primary-on-dark
--gold-deep: #97793F  accent text on light (passes 4.5:1 on cream)
--gold-soft: #DCC589  star-light, accent-on-dark
--gold-bg:   #F1E6C7  accent chip fill

/* semantic (fixed meanings, never swapped) */
--success: #4FA381    --danger: #D87171

/* radii */  --r:18  --r-lg:26  --r-sm:12   (px)
/* shadow (single, soft, long — never stacked) */
--sh-sm: 0 2px 8px /.04   --sh: 0 10px 30px /.07   --sh-lg: 0 24px 70px /.10
/* motion */ --ease: cubic-bezier(.4,0,.2,1)   --ease-out: cubic-bezier(.16,1,.3,1)
```

**Type.** Display = *Cormorant Garamond* (500), tracking −0.01em. Body/UI = *Inter*
(400/500/600). Two families, three weights — no more.

**Type scale (1440):** Display 34 / Heading 27 / Title 19–20 / Body 15.5 / Small 13–14 /
Meta 11–12 / Eyebrow 11 (600, +0.18em, uppercase, gold-deep). Body line-height 1.62;
display 1.08–1.15 (inverse). Measure capped at ~60ch on lesson body.

**Color discipline (60-30-10):** cream ~60%, ink/neutral ~30%, gold ≤10%. The grayscale
test passes — hierarchy survives desaturation because it's carried by value and weight,
not hue. No purple, no neon, no gradient mesh, no glass.

---

## 2. The 8px spatial system

All spacing on `4·8·12·16·18·22·24·26·30·44` (the 18/22/26 are the brand's existing
radius-family rhythm; everything else is 4/8 multiples). Internal padding < component gap
< section gap. Card padding 15–22; column gutters 0 (dividers do the separation work,
luxury-style); view padding 24–26 desktop, 16 mobile.

---

## 3. Component catalog (anatomy + exact values)

### 3.1 App bar (fixed chrome, 54px)
Frosted cream (`rgba(251,247,236,.7)` + `blur(8px)`), 1px bottom hairline. Left: brand
(4-point gold star sigil 18px + "Estrella · Academy" 14/600). Center: breadcrumb (12.5px,
ink bold + dim). Right: segmented control (pill, 3px inset, active = raised surface +
`--sh-sm`). The blur here is the *one* permitted glass moment — a thin utility bar, not a
decorative panel; contrast holds behind it.

### 3.2 Primary button
Ink fill `#14120E`, text `#FAF7F1`, 14/600, radius 99px, padding .7rem 1.3rem, shadow
`0 8px 22px /.18`. Hover: `--ink-2`, translateY(−1px), deeper shadow. **On dark bands**
(the Continue card) it inverts to gold fill + ink text — gold is the call-to-action only
where ink would disappear. Ghost button: transparent, 1px `--line-strong`, hover → ink
border + surface fill.

### 3.3 Method spine (left rail, 206px) — the archetype stepper
Vertical stepper with a 1.5px connector line behind 27px nodes.
- **Done:** gold-filled disc, white check, label ink-2.
- **Active:** ink-filled disc, gold-soft numeral, **5px gold halo ring**
  (`box-shadow 0 0 0 5px rgba(184,152,92,.16)`), label ink/600, row gets a raised surface.
- **Future:** cream disc, `--line-strong` border, mute numeral + label.
The node labels are the *real archetype beats* (e.g. Identity → The mirror / Nesreen's
lens / Draft / Sharpen / It's yours), not a fixed Focus→Map→Practice. Footer: italic
Cormorant note pinned bottom (`margin-top:auto`).

### 3.4 The lesson deck (center "Stage")
The no-scroll engine of the lesson. One **beat** per frame:
- Eyebrow (the spine node name) → Display headline (Cormorant 34, max 18ch) → body
  (≤60ch, 15.5/1.62, bold = ink) → optional **tool chip**.
- **Beat dots** top-right: 6px dots, active = 20px gold pill (a paged progress indicator,
  not a scrollbar).
- **Beat nav** bottom-left: two 40px circular prev/next buttons; meta bottom-right
  ("Beat 2 of 5 · ≈6 min"). Advancing beats *is* the lesson progression — paging, not
  scrolling.

### 3.5 Tool chip
`--gold-bg` fill, `--gold-soft` border, gold-deep 12.5/600, 13px star icon, radius 99px.
Names a framework as a credited *tool* ("Tool: the one-decision test") — the content
brief's "name once, then use" rule made visible.

### 3.6 The work box (where the learner's words live)
Raised `--surface` card, radius 26, `--sh-sm`, max 60ch. Header row: label ("Your move",
13/600 ink) + guidance hint (11.5 mute). Textarea: `--surface-2` fill, 1px
`--line-strong`, radius 14, 14px text; **focus = gold border + 3px gold glow + white
fill** (the one place fill goes pure white, to signal "you're writing now"). Actions
right-aligned: ghost "Save draft" + primary "Pressure-test my answer →". The CTA copy is
the archetype action, never "Submit."

### 3.7 Estrella panel (right, 336px) — tutor as participant
- **Head:** 34px orb (radial gold gradient `35% 30%` highlight → `--gold-deep`, soft gold
  shadow) + name (13.5/600) + live status (11px success dot + "Coaching live · in
  Nesreen's voice").
- **Messages:** anchored to the *bottom* of the column (`::before{margin-top:auto}` — a
  real chat sits low, not top-floating). AI bubble: `--surface-2`, hairline, 13.5/1.55,
  bottom-left corner squared (5px); *italic Cormorant gold-deep* for the phrase Estrella
  is interrogating. User bubble: ink fill, warm-white text, bottom-right squared.
- **Typing:** three 6px gold dots, staggered bob (0/.2/.4s).
- **Chips:** gold-bg suggested questions (Socratic prompts).
- **Input:** pill, ink 34px send button with gold-soft icon.

### 3.8 Continue band (Sky hero, dark)
Ink→`#2E281D` 110° gradient, radius 26, `--sh-lg`, with a soft gold radial bloom
top-right (`pointer-events:none`). Left: eyebrow (gold-soft) → Cormorant 27 title → 13px
context line → 4px gold meter (230px) → gold primary button. Right: streak as a calm
fact — Cormorant **52px** gold-soft numeral + past-tense line ("12 days. Your sky's been
lit every day this week."), divided by a 1px translucent rule. No flame, no "don't lose
it" — the brand's humane-streak rule, rendered.

### 3.9 Constellation card (course)
Dark tile (`rgba(255,255,255,.025)`, hairline), radius 16. An **SVG star cluster**
(deterministic positions per course) where lit stars = completed lessons (gold-soft 2.4r
+ .18 halo) connected by gold lines; pending stars dim (.3 white). **Done course:** gold
tint bg + gold border + gold-soft name. Below: name (11.5/600) + progress
("4/9 in progress"). Hover lifts tint + gold border. Every star maps to a real lesson —
data viz, not décor.

### 3.10 Level card / track card (side rail)
- **Level:** 42px gold orb + Cormorant tier name ("Guiding Star") + "2,180 Light · 1,320
  to Star Pattern" + 4px gold progress. *One* number, calm — never a four-counter
  scoreboard.
- **Track:** surface card, distributes title+title-badge → description → **course pips** →
  progress ring. Pips: done = gold-bg + ✓ + course name; pending = neutral. (Pips were
  added in audit to kill an internal void and add real information — §9.) Earned-title
  badge ("Grounded"/"Named"/"Interview Ready") in gold-bg pill.

### 3.11 Tabs (zone swap — the no-scroll mechanism)
Pill container, `--surface-2`, 1px line, 3px inset; active tab = raised surface +
`--sh-sm`. On the Sky, "Tracks / Browse / You" swap the side-rail's lower zone so three
content sets share one fixed region without scrolling.

---

## 4. The no-scroll layouts (exact grids)

**Studio (desktop):** `app` = `100dvh` flex column. Row 1: 54px app bar. Row 2: CSS grid
`206px · minmax(0,1fr) · 336px`, full remaining height, `overflow:hidden`. Each column is
a flex column with its own `min-height:0`; only the lesson *body* and the *messages* may
internally overflow (the a11y valve). Nothing else scrolls.

**Sky (desktop):** grid `minmax(0,1.32fr) · 372px` × `auto · minmax(0,1fr)`. Continue band
(row 1, col 1), constellation map (row 2, col 1, fills), side rail (col 2, spans both).
24px gap/padding. Everything sized to fit 900px height.

**Mobile (≤900px):**
- Studio → single column + bottom **Lesson⇄Estrella** toggle (44px targets); each face
  fills the viewport; spine collapses into the deck's top meta + dots.
- Sky → level card + Continue (stacked) pinned; the lower zone (sky/tracks) is the single
  internal scroll region under fixed chrome. Pure no-scroll is the desktop guarantee;
  mobile honors "chrome fixed, one scroll region, lesson stays paged."

---

## 5. Motion (exact)

Two curves only (`--ease`, `--ease-out`), 150–250ms. Hover lifts: translateY(−1px) +
shadow deepen. Typing dots: 1.2s bob loop (the *only* permitted loop — it means "thinking
now," a real state). Beat dots animate width 250ms on page. **Signature moment** (spec'd,
not in static mockup): on rubric-met, the work animates into the artifact (~500ms ease)
and one star lights with a single gold pulse propagating one hop. `prefers-reduced-motion`
→ all of it becomes instant state change; constellation renders static. No
fade-in-on-scroll, no card-scale-hover, no parallax, no ambient starfield twinkle.

---

## 6. State coverage (built-in, not happy-path-only)
Empty (first-time = invitation, never a zeros dashboard) · in-progress (half-lit sky,
half-built artifact) · complete (gold course + certificate) · error (tutor down → honest
"saved, I'll coach when back," **never fake-grade**). Inputs look distinct from buttons
and static text; labels persist; the work box autosaves draft text to state.

---

## 7. Accessibility
Contrast: gold-deep on cream and ink on cream pass 4.5:1; gold-soft on ink passes large-
text 3:1; success dot paired with text (never color-alone). Touch targets ≥44px (mobile
toggle, beat nav, chips). Focus-visible: 2px gold outline, 2px offset. The constellation
has a list-view toggle; reduced-motion honored. Internal-overflow valve guarantees no
content is *clipped* at 200% zoom even though the page itself doesn't scroll.

---

## 8. What makes this read premium (and not AI-generic)
- **Restraint:** one accent, two fonts, one shadow, ≤10% gold. The opposite of the
  rainbow-gradient AI default.
- **Serif display on warm cream** — editorial, not dashboard.
- **Dividers over boxes** — columns separated by hairlines + space, not nested cards.
- **Negative space is framed, not orphaned** — luxury density (~0.35), every void
  intentional and symmetric around a focal element (audited — §9).
- **Earned gold** — gold marks only progress, accent, and the one CTA; it never decorates.
- **Calm gamification** — one number, a paged deck, a quiet streak. No confetti, no
  scoreboard, no points race (the brand's hard line).

---

## 9. Audit log (screenshot-verified)
Built, then screenshotted and corrected — not shipped on assumption:
1. **Tutor column void** (≈250px dead region between convo and input) → anchored messages
   to the bottom (`::before{margin-top:auto}`). Fixed, re-verified.
2. **Track-card column-fill voids** (short content centered in tall cards) → added course
   pips + distributed content top-to-bottom. Fixed, re-verified; pips also add real info.
3. **Mobile clipping** (constellation map cut off under `overflow:hidden`) → mobile gets a
   single internal scroll region + the Studio Lesson⇄Estrella toggle. Fixed, re-verified
   at 390×844 (both toggle faces).
- **AI-tell scan:** no purple/indigo/cyan/neon, no mesh gradient, no glassmorphism beyond
  the thin frosted app bar, no emoji in functional UI. Pass.
- **Not yet checkable in a static/local pass (needs the live React build):** exact zoom
  reflow at 125/150/200%, CLS, real motion timing. Flagged, not fabricated.

---

**Saved to `docs/Academy_Component_Design.md`.** Living artifact:
`docs/design-mockups/academy-constellation.html`.
