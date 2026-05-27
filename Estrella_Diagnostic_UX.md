# Estrella Diagnostic UX

## The Pre-Session Conversation — Strategic Design

*A UX framework for the eight-to-twelve-minute discovery conversation between visitor and AI, and the profile it synthesizes for Nesreen.*

**Document type:** Strategic UX brief — companion to `coaching_UX.md`
**Audience:** Founder · Design lead · Engineering lead
**Date:** May 2026 · v1.0

---

## 1. Executive Summary

The Estrella diagnostic is the moment a stranger becomes a client. Eight to twelve minutes of conversation must do four things at once:

1. **Earn trust** before any commitment is asked.
2. **Extract structured information** Nesreen can use to walk into the session prepared.
3. **Surface what the visitor doesn't yet have words for** — the avoidance, the unsaid.
4. **Anchor the conversion** so the price feels obvious by the time it's shown.

This document defines the question architecture, the synthesis logic, and the visual reveal. It is the companion to `coaching_UX.md` (§6.1 Stage 3), which mandates the diagnostic exists; this document specifies *how it works*.

The core principle: **Estrella sounds like a senior coach in a first call, not a chatbot running a form.** Questions are open, sequential, and earn their answers. Extraction happens in the background. The visitor experiences a conversation. Nesreen receives a structured profile.

---

## 2. Diagnosis — Why the Previous Question Set Failed

The first implementation used seven scripted reflections that began before the visitor had finished introducing themselves:

> *"There's a version of that where the work is the problem, and a version where the rooms are. They need different answers. Which one feels closer?"*

This pattern fails for three reasons.

### 2.1 The AI presumes a frame before it has one
Reflecting back a binary ("work vs. rooms") in the first response forces the visitor into a category the visitor hasn't chosen. A real coach earns the right to interpret by listening first. A pre-canned binary in turn one is administrative cosplay.

### 2.2 No structured extraction
The old script produced a transcript and a vibe — nothing structured. Nesreen would read a wall of dialog and reconstruct the profile herself. The AI was performing depth without harvesting data. That's a transcript, not a brief.

### 2.3 The visitor doesn't know what's happening
A chatbot that reflects without asking creates a low-information environment. The visitor doesn't know whether to elaborate, change topics, or stop. Good coaches make the next move clear — *"Tell me about the moment when…"* — a moment. Not a feeling, not a position.

The fix is not subtlety. The fix is to **ask deliberate, sequenced, open questions** and synthesize at the end.

---

## 3. Mental Model — How a Senior Coach Conducts a First Call

A first call with a senior coach (60 min, paid or unpaid) follows a recognizable arc:

| Beat | Coach's intent | Visitor's experience |
|---|---|---|
| **1. Identity** | Anchor the basics. | "OK, low-stakes start." |
| **2. Why now** | Locate the urgency. | "She gets that something's changed." |
| **3. Strengths-by-moment** | Find what's working. | "I get to talk about what I'm good at." |
| **4. Stuck-by-moment** | Find what's avoided. | "I'm telling her something I usually don't." |
| **5. Twelve-month vision** | Locate the real goal. | "Wait, do I actually want that?" |
| **6. History with help** | Calibrate style. | "She wants to know what didn't work." |
| **7. The unsaid** | Trust signal. | "I just told her something I haven't said." |
| **8. Synthesis** | Show you heard. | "She heard more than I said." |

Estrella's job is to reproduce this arc in a chat surface. Every design decision in §4–§7 is in service of that arc.

---

## 4. The Question Architecture

Seven questions. Eight to fourteen minutes. Designed so that by Q7, the visitor has surfaced material they didn't plan to.

| # | Slot | What it extracts | The question |
|---|---|---|---|
| 1 | `identity` | name, role, industry | *"What's your name, and what do you do?"* |
| 2 | `trigger` | the precipitating moment, urgency | *"What's bringing you to coaching now? Why **this** season, and not six months ago or six months from now?"* |
| 3 | `strengths` | natural advantages, energy sources | *"Tell me about a recent moment when you felt most yourself at work — when something you did made you think, **this is what I'm built for.**"* |
| 4 | `pattern` | weakness, avoidance | *"Now the other side — and I want a moment, not a category. Tell me about a time recently when you felt most stuck. Something you kept avoiding, or couldn't crack, or didn't say."* |
| 5 | `goal` | real vision, identity-level shift | *"If twelve months from now you and I were having coffee and everything had gone **unreasonably** well — what would be true that isn't true now? Be specific. Not 'happier' — what would have actually shifted?"* |
| 6 | `history` | preferred coaching style, prior context | *"What have you already tried — coaches, mentors, therapy, books, courses — and what landed? What didn't?"* |
| 7 | `depth` | the deeper truth, trust signal | *"Last one. What's the one thing you don't usually say out loud — but you suspect matters here?"* |

### 4.1 Why this order

- **Identity first** — low stakes, opens the keyboard.
- **Trigger second** — earns the right to ask harder questions by acknowledging the visitor came here for a reason.
- **Strengths before stuck** — leading with strengths means the visitor is in a generative frame when we ask about the harder material. The reverse (stuck → strengths) produces shallow strengths because the visitor is still in defensive mode.
- **Vision before history** — the future shapes how the past is told. Ask about the future first; the history answer becomes about what blocks the future, not just biography.
- **Depth last** — the trust signal question only works after six other questions have built rapport. In Q1 it's invasive; in Q7 it lands.

### 4.2 What the AI does between questions

After each user answer, Estrella:

1. Captures the raw text into the matching slot.
2. Shows a typing indicator (≈1.7s) — gives the response weight.
3. Renders the next question with a one-line continuity phrase ("Good." / "I want to understand both sides." / "Last one.") — never a paraphrase of what the user said.

Specifically, **Estrella does not echo back the user's answer.** She acknowledges and moves forward. Echoing creates the chatbot uncanny valley; moving forward feels like coaching.

The single exception: **the user's first name** is interpolated into Q2's opening ("Good to meet you, {firstName}"). Used once. Not again.

---

## 5. The Profile — Synthesis Structure

After Q7 is answered, Estrella delivers one final line:

> *"Thank you. I heard more than you might think. Let me show you what I'm bringing to Nesreen."*

The input bar fades. A profile card slides in. This is the conversion event.

### 5.1 Card composition

```
┌────────────────────────────────────────────────┐
│  YOUR PROFILE                                  │
│  This is what Nesreen will read before we meet │
│                                                │
│  ┌──────────────────────────────────────────┐  │
│  │  [S]  Sarah Chen                         │  │
│  │       Head of Product · Series B fintech │  │
│  │  ──────────────────────────────────      │  │
│  │  THE MOMENT                              │  │
│  │  │ "<verbatim Q2 answer>"                │  │
│  │                                          │  │
│  │  STRENGTHS I HEARD                       │  │
│  │  ●  <extracted from Q3>                  │  │
│  │  ●  <extracted from Q3>                  │  │
│  │  ●  <extracted from Q3>                  │  │
│  │                                          │  │
│  │  PATTERN TO WORK WITH                    │  │
│  │  <synthesis paragraph from Q4 + Q7>      │  │
│  │                                          │  │
│  │  WHERE YOU WANT TO GO                    │  │
│  │  │ "<verbatim Q5 answer>"                │  │
│  │                                          │  │
│  │  ✓ Nesreen reads this before your        │  │
│  │    session. No re-introductions.         │  │
│  └──────────────────────────────────────────┘  │
│                                                │
│  ── NESREEN'S RECOMMENDATION ──                │
│                                                │
│  A three-month coaching program.               │
│  AED 6,000 · 6 sessions · fortnightly          │
│                                                │
│  [Book your first session →]                   │
│  just one session first (AED 1,200)            │
│  send me this profile · I'll come back later   │
└────────────────────────────────────────────────┘
```

### 5.2 Why this shape

- **Avatar + name + role at the top** — immediately legible as a profile, not a sales page.
- **THE MOMENT (Q2) appears first** — confirms we heard the entry point.
- **STRENGTHS HEARD comes before PATTERN** — same emotional sequencing as the questions (warm before harder).
- **Quotes verbatim, accents color-coded** — gold left-border for the inbound moment, lavender left-border for the forward-facing goal. The visual telegraphs the temporal direction.
- **Strengths as discrete bullets** — Apple Health-style structured list. Easier to skim than a prose paragraph.
- **Pattern as one paragraph** — pattern is interpretive synthesis, not a list. Prose signals "this is what I'm seeing in your words."
- **Trustline with checkmark** — *"Nesreen reads this before your session. No re-introductions."* — addresses the price-anchoring question implicitly ("am I paying for someone who'll be unprepared?" — no).
- **Recommendation comes after the profile**, never before. The visitor reads themselves first, then the prescription.

---

## 6. Extraction Logic

The conversation is in plain English. The profile must be structured. Bridging the two is the work.

### 6.1 Strategy

We use a layered approach: **regex for high-confidence fields, keyword clusters for thematic synthesis, raw quotes for everything else.**

The user never sees the extraction. If we can't extract a strength keyword cleanly, we show the user's literal sentence as a strength. That is always safe — it shows we listened.

### 6.2 Name extraction (Q1)

Patterns tried, in order:
1. `(I'm|I am|My name is|Call me) <CapitalizedWord [CapitalizedWord]>`
2. `^<CapitalizedWord [CapitalizedWord]>[,.\-—]` (visitor wrote "Sarah Chen, Head of Product…")
3. First standalone capitalized word of length ≥ 3.
4. Fallback: `"you"`.

### 6.3 Role extraction (Q1)

After name is known, strip the greeting + identifying phrase + name, then take the first clause of length 6–160. If nothing remains, fallback: `"Your work"`.

### 6.4 Strengths extraction (Q3)

Three tiers:

1. **Canonical cluster match** — if the answer contains `war room`, `launch crisis`, `crisis + calm`, etc., emit the curated triplet `[Calm under pressure, Sharp judgment in crisis, Quiet leadership]`. Other clusters cover `mentor/teach → developing-others` and `strategy/vision → strategic-clarity`. These are calibrated to the canonical mic-prefill story.
2. **Sentence split** — split user's text on `.;!?\n`, filter for clauses 8–90 chars, take first three. Capitalized.
3. **Fallback** — single bullet with the user's first 100 characters of Q3. Always safe.

### 6.5 Pattern synthesis (Q4 + Q7)

Two tiers:

1. **Cluster match** — if Q4 or Q7 mentions `self-promotion`, `visibility`, or `passed over`, emit the curated synthesis about how the visibility gap shows up in promotion decisions plus the trust-layer ("you've been pretending the slower path is fine").
2. **Quote-based fallback** — *"Where you feel stuck: '\<Q4 first 160 chars\>.' And what you don't usually say: '\<Q7 first 140 chars\>.' These point at the same gap. Nesreen will start there."* This works for any input, because it is literally the user's words.

### 6.6 Goals and trigger

Always shown verbatim with quotation marks. No paraphrase, no truncation beyond the natural length. These are the user's own words; we surface them, we don't rewrite them.

### 6.7 Why no LLM (yet)

For the demo, deterministic extraction is sufficient and stable. An LLM-driven synthesis is the next phase — it would replace §6.4 and §6.5 with a prompt that produces three calibrated strengths and a pattern observation from the raw answers. The current heuristic structure is the contract that the LLM call would need to fulfill: same slot, same length, same tone.

---

## 7. Key UX Decisions & Rationale

### 7.1 No progress bar
**Decision:** No "3 of 7" indicator.

**Rationale:** Coaching is not a quiz. A progress bar gamifies the conversation and signals to the visitor that the AI is on rails. We trade legibility for trust — most visitors stay for the full arc once they're in.

### 7.2 No multiple choice, no sliders, no rating
**Decision:** Pure text input throughout. Voice prefill in the demo; full speech-to-text in Phase 2.

**Rationale:** Premium clients respond to qualitative depth. A slider asking "how stuck do you feel, 1–10?" would torpedo the entire enterprise. See `coaching_UX.md` §7.3.

### 7.3 The synthesis line is short
**Decision:** *"Thank you. I heard more than you might think. Let me show you what I'm bringing to Nesreen."* — that's it.

**Rationale:** Don't oversell the synthesis. The card itself is the proof. A long synthesis paragraph creates expectations the card then has to meet; a short one creates curiosity the card then satisfies.

### 7.4 The recommendation is below the profile, not beside it
**Decision:** Vertical sequence. Profile first, recommendation second.

**Rationale:** The visitor needs to recognize themselves before they recognize the price. Side-by-side would force comparison thinking. Sequential creates "yes, that's me… and that's what I should do."

### 7.5 Default recommendation is the program, not the single session
**Decision:** The demo always recommends the 3-month program. Single session is shown as a downgrade option.

**Rationale:** See `coaching_UX.md` §7.1. The recommendation engine is opinionated: the kind of inflection point that prompts someone to start a diagnostic is rarely a single-session problem. Showing single first would anchor on price.

### 7.6 The avatar is the first letter of the first name in a gold circle
**Decision:** Initial-letter avatar, not a stock human image.

**Rationale:** A stock photo or generic silhouette would feel impersonal and slightly creepy ("the AI thinks I look like this?"). An initial letter on the brand's gold gradient is dignified, neutral, and signals identity without overreaching.

### 7.7 Quotes are styled with left-border accents, not blockquote indents
**Decision:** 2px left border, color-coded — gold for inbound (the moment), lavender for forward (the goal).

**Rationale:** Reading on small screens, indented blockquotes lose hierarchy. A colored left edge anchors the quote visually and lets the color signal temporal direction without a label.

### 7.8 Strengths are bulleted, not chipped
**Decision:** Vertical list with small gold radial dots, not horizontal pill chips.

**Rationale:** Chips work for selectable filters. Strengths are read, not chosen. A vertical list with one strength per line gives each one weight. Three pills in a row would look like tags or hashtags — wrong register.

---

## 8. Voice & Content

### 8.1 Estrella's voice
- Warm authority — *senior coach who has seen everything*.
- Always asks a specific, answerable question.
- Acknowledges briefly between turns ("Good." / "I want to understand both sides." / "Now the other side.") — never paraphrases the user's last answer.
- Uses italic emphasis sparingly — for emphasis on a single critical word (`this season`, `unreasonably`, `built for`), not for whole phrases.
- References Nesreen specifically and often, but only in the synthesis line and the recommendation. Not during the questions themselves — that breaks the rapport.

### 8.2 Forbidden patterns
- No emoji
- No exclamation marks
- No "I'm here to help you!" energy
- No "How does that make you feel?"
- No multiple-choice fallbacks
- No "I understand"
- No paraphrasing the user's last answer back to them
- No more than one name interpolation per session

### 8.3 Name interpolation rules
- Extract first name from Q1.
- Use exactly once, in Q2's opener: *"Good to meet you, {firstName}."*
- Never use again in subsequent questions.
- If extraction fails, the opener becomes *"Good to meet you."* — no awkward placeholder.

### 8.4 Synthesis line voice
The synthesis line bridges conversation and conversion. It must:
- Be short (under 25 words)
- Acknowledge what just happened without summarizing it
- Transition the visitor's attention from the input bar to the card
- Mention Nesreen

The current line — *"Thank you. I heard more than you might think. Let me show you what I'm bringing to Nesreen."* — satisfies all four.

---

## 9. Edge Cases

### 9.1 Very short answers
Visitor responds to Q3 (strengths) with: *"Idk, lots of things."*

Behavior: Estrella continues without flagging. The extraction layer falls back to showing that literal sentence as a single strength. The profile then has one weak strength bullet — that's still better than dropping the question. Nesreen reads it as a signal: this client wasn't ready to claim strengths yet.

### 9.2 Refusal or push-back
Visitor types: *"This feels like therapy. I don't want to do this."*

Behavior (Phase 2 — not yet implemented): Estrella offers an off-ramp. *"Of course. We can stop here, or you can tell me what you wish I'd ask instead."* If the visitor continues, treat the response as the answer to that turn.

### 9.3 The one-line answer to every question
Visitor types: *"Yes."* / *"Sure."* / *"Same."* for every question.

Behavior: extraction defaults trigger across the board. The profile renders with thin content. **This is a feature** — the resulting profile signals to Nesreen *"this person did the form but didn't engage."* That's diagnostic information of its own.

### 9.4 The over-discloser
Visitor writes 600 words to Q4 about a divorce, a parent, a layoff.

Behavior: extraction truncates display at 160 chars for the quote. Full text is captured and (in production) made available to Nesreen via the conversation transcript. The profile card stays visually clean.

### 9.5 Clinical distress signals
Visitor mentions suicidal ideation, self-harm, or acute psychiatric symptoms.

Behavior (Phase 2 — see §13 Open Questions in `coaching_UX.md`): Estrella refuses to recommend coaching and instead surfaces a *"this is bigger than what coaching can hold — here's a path to a therapist"* message with crisis-line contact info. Strong opinion: this refusal is a brand asset, not a brand risk.

### 9.6 Multi-language input
Visitor writes Q1 in Arabic.

Behavior (Phase 3): full Arabic support — RTL layout, Arabic question set, Arabic synthesis. The Gulf market is bilingual; the diagnostic must be too. For Phase 1, English only; the visitor can type in any language but the questions and synthesis remain English.

---

## 10. Critical Screens

### 10.1 Initial state
- Estrella avatar visible (the orb)
- Centered serif headline asking Q1: *"What's your name, and what do you do?"*
- Input bar pinned to bottom
- Tertiary link below: *"Already a client →"*
- No progress indicator, no preamble, no FAQ

### 10.2 Mid-conversation state (between Q2 and Q7)
- Question becomes a user message in the conversation pane
- AI responses appear with a typing indicator first
- Conversation auto-scrolls
- Headline collapses (or hides) — page is in `in-conversation` mode
- Email-capture chip appears in the corner around Q3 (the moment of momentum)

### 10.3 Synthesis transition
- After Q7 is answered, Estrella delivers the single synthesis line
- Input bar fades over ≈700ms
- Profile reveal panel becomes visible with a soft opacity transition
- The page scrolls the panel into view

### 10.4 Profile reveal state
- The conversation transcript remains visible above (visitor can scroll up to re-read)
- Profile card occupies primary attention
- Recommendation appears below the card, separated by a labeled divider
- Three CTAs in clear hierarchy: book program (primary) · single session (secondary) · send me / come back (tertiary)

---

## 11. Demo Orchestration

The demo lives at `/start` and powers a canonical conversion narrative.

### 11.1 The canonical visitor
We tell one specific story: **Sarah Chen, Head of Product at a Series B fintech in Dubai.** Recent VP rejection. Calm-under-pressure strength. Self-promotion blind spot. Vision: running her own org. Wants a coach who'll push back. Pretending the slower path is fine.

This narrative was chosen because it:
- Maps to the target ICP (Gulf executives, mid-to-senior)
- Has a clear strength/pattern/goal triangle that the synthesis can land
- Is gender-coded female to match Nesreen's primary audience
- Includes a specific industry and stage (legible to anyone in tech)

### 11.2 The mic button
Tapping the mic prefills the next sample answer from a 7-item array. Each tap fills only the next slot — so the visitor can mix typed and prefilled answers freely. After Q7 the array is exhausted; the mic no-ops.

This is **not real speech-to-text**. It is a deliberate orchestration tool for the demo.

### 11.3 Heuristic fallback for typed answers
If a visitor types entirely original answers, the extraction logic in §6 carries them through. The profile will populate with real quotes, a sentence-derived strength list, and the generic pattern synthesis. The output will be visibly thinner than the canonical story but will still render as a complete profile.

### 11.4 What to demo
For a 3-minute demo, drive through the canonical mic flow. The pacing (1.7s per AI response + manual user clicks) lands the synthesis around the 90–110 second mark. Total time for the reveal: ~2 minutes.

For a 10-minute walkthrough, ask the demo subject to type one or two of their own answers between mic prefills. The mix demonstrates both the canonical story and the heuristic fallback.

---

## 12. Success Metrics

### Primary
- **Diagnostic completion rate** — % of `/start` visitors who reach Q7 and see the profile reveal. Target: **>55%**.
- **Recommendation-to-book conversion** — % of profile reveals that result in a "Book your first session" click. Target: **>35%**.
- **Q1 completion rate** — % of visitors who type any answer to Q1. Target: **>85%**. (If this drops, the friction is in the door.)

### Secondary
- **Median time in conversation** — too short = shallow, too long = tedious. Target: **8–14 min** median, with **<5%** under 4 min.
- **Email capture rate** — % who save their email when the chip appears around Q3. Target: **>65%**.
- **Words per answer** — proxy for engagement depth. Watch the trend across Q1–Q7; in a healthy session, Q3 + Q4 + Q5 should be the longest, Q1 + Q6 the shortest.

### Leading indicators (instrumentation only)
- **Drop-off by question** — which question loses people. Q4 (stuck) and Q7 (unsaid) are the predicted danger zones.
- **Time per answer** — long pause + short answer = avoidance signal; coaches may want this surfaced in the profile in Phase 2.
- **Profile-to-quote ratio** — how often does the user's literal Q2 / Q5 text get used verbatim. Lower ratio (more paraphrasing) signals over-engineered extraction.

---

## 13. Implementation Phases

### Phase 1 (current) — Static script + heuristic extraction
- The 7-question flow in fixed order
- Regex-based name + role extraction
- Keyword-cluster strength extraction
- Conditional pattern synthesis
- Verbatim quotes for trigger and goal
- Canonical mic-prefill story

### Phase 2 — Dynamic AI synthesis
- Replace §6.4 (strengths cluster) and §6.5 (pattern cluster) with an LLM call that produces three calibrated strengths and a 2-sentence pattern from the raw Q3 / Q4 / Q7 answers. Same output contract, dynamically derived.
- Add real speech-to-text on the mic button
- Add the off-ramp behavior for refusals (§9.2)

### Phase 3 — Persistent memory + multi-language
- Estrella retains conversation history for authenticated users (continuity between sessions per `coaching_UX.md` §6.2)
- Arabic question set with RTL UI
- Voice tone calibration — Estrella adjusts diction lightly based on the visitor's register (formal vs. casual) detected in Q1 + Q2

### Phase 4 — Clinical distress filter
- Detect acute distress signals (see §9.5)
- Refuse to recommend coaching; surface a therapist path
- Brand-asset move — read `coaching_UX.md` §15 Open Question 5

---

## 14. Open Questions for Stakeholder Validation

1. **Is the synthesis card the right place for the recommendation**, or should the recommendation be on a follow-up screen (the visitor reads the profile alone first, then clicks "see Nesreen's recommendation")? Adds a step; may increase commitment quality. Tradeoff: friction vs. consideration.

2. **Should the visitor be able to edit the profile before booking?** Current design: no. Nesreen receives what Estrella synthesized. An "edit" button would let the visitor cleanse, but cleansing reduces signal.

3. **Should the strengths be three exactly, or vary by signal strength?** Current: always three. A visitor with a thin Q3 answer gets three thin strengths. Alternative: 1–3 based on what we can confidently extract. Tradeoff: consistency vs. honesty.

4. **Should Q6 (history) be optional?** It's the lowest-yield question of the seven and the only one that could be cut without breaking the synthesis. Cutting it saves ~90 seconds. Counter-argument: it calibrates Nesreen's style upfront.

5. **What happens if the visitor abandons mid-conversation and returns 24 hours later?** Magic-link resume per `coaching_UX.md` §11.1, but does Estrella resume from where they stopped, or restart? Strong opinion: resume from the next un-answered question, with a one-line acknowledgment ("Welcome back. We were here.").

---

## 15. Relationship to `coaching_UX.md`

This document refines the Stage 3 specification in `coaching_UX.md` §6.1. Specifically:

| `coaching_UX.md` reference | This document refines as |
|---|---|
| §6.1 Stage 3 — Diagnostic | §4 Question Architecture |
| §6.1 Stage 4 — Recommendation | §5 Profile Reveal |
| §7.3 Diagnostic input format | §7.2 (no multiple choice, etc.) |
| §10 Estrella's voice | §8 Voice & Content |
| §11.1 Hesitant visitor | §9.2 Refusal or push-back |
| §11.5 Gifter / corporate | (out of scope here) |

Where the two documents disagree, `coaching_UX.md` is canonical for strategy; this document is canonical for the diagnostic conversation specifically.

---

*This document is opinionated by design. Push back on any decision — but specifically, not by reverting to the old reflection-based flow.*

**Next step:** Phase 2 scoping → LLM-driven extraction prompt design → speech-to-text vendor decision.

— *End of strategy document*
