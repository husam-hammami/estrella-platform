# Estrella Academy — Content Design Brief

The decision that governs *what* every lesson says and *how* it's presented. Pairs with
`BUILD.md` (the dev/data brief) and `gamification.json` (the reward layer — keep as-is).

## The two locked decisions

1. **Content is decision-led, not framework-led.** Every lesson is anchored on a real
   decision the learner faces and *how Nesreen reasons it*. Established frameworks
   (Ulrich's four roles, STAR, etc.) appear as **named tools inside her thinking** —
   credited, but never the subject. We sell her judgment + the learner's application,
   not a model they can Google.
   - *Example fix:* AI-HR lesson 1 keeps Ulrich as "the map Nesreen uses to make this
     call, and why it still holds in an AI era." The defensive "why Ulrich not something
     newer?" framing goes away because the framework is no longer the point.

2. **Format flexes by course archetype, with the in-lesson AI tutor as the engine.**
   The tutor (Estrella) is the moat — it does what a book or a generic chatbot can't:
   rehearse with the learner and give feedback *in Nesreen's voice* on *their* situation.
   The old uniform "read → 1 MCQ → write" template is retired.

Unchanged: **Bloom's taxonomy** stays the hidden spine (Remember→…→Create across a
course); gamification stays **ambient and earned** (no points race, mastery = first-try
judgment). Don't expand the mechanics — make the content worthy of them.

## Course → archetype map

| Archetype | Courses | Spine | Assessed by |
|---|---|---|---|
| **Knowledge / judgment** | `ai-hr`, `hr-foundations` | a decision in *your* org | tutor pressure-tests your call vs. her criteria |
| **Performance / rehearsable** | `interview`, `speaking`, `offer` | a high-stakes moment | tutor coaches your *rehearsed* attempt, you redo |
| **Identity / positioning** | `branding`, `leadership`, `confidence` | how you show up | tutor refines a draft *you* write |

*Straddlers:* `leadership` carries judgment too (decisions + stance); `confidence`
borrows from performance (rehearsing the reframe out loud). Lead with the archetype above;
borrow a beat from a neighbour when a specific lesson needs it.

## Lesson templates (replace "Focus → Map → Practice → MCQ")

**Knowledge / judgment**
1. **The situation** — a real decision, in the learner's world (not an abstract focus)
2. **How Nesreen reads it** — her reasoning; frameworks named as tools, subordinate
3. **Your move** — apply it to *your own* org/context
4. **Pressure-test with Estrella** — tutor challenges your judgment, not a canned MCQ
5. **What you can now do** — competence statement; the course artifact grows

**Performance / rehearsable**
1. **The moment** — the interview question / the stage / the pay ask
2. **How Nesreen does it** — the move, shown
3. **Your turn** — you rehearse it (typed or spoken)
4. **Estrella coaches** — specific feedback on *your* attempt; you redo
5. **Banked** — your line/answer/script drops into your playbook artifact

**Identity / positioning**
1. **The mirror** — a provocation about how you currently show up
2. **Nesreen's lens** — the reframe
3. **Draft** — you write your stance / statement
4. **Sharpen with Estrella** — tutor refines *your* draft
5. **It's yours** — added to your artifact

MCQ survives only as the low-Bloom check on early "Remember/Understand" lessons. The late
"Evaluate/Create" lessons are tutor-graded on application — which is what makes Mastery mean
something.

## Every course produces one tangible artifact

The deliverable is the retention hook and the proof of the certificate. (These already
match the badge copy in `gamification.json`.)

| Course | Artifact the learner walks away with |
|---|---|
| `ai-hr` | An AI-in-HR map: each initiative placed by role, with leverage + risk named |
| `hr-foundations` | A personal HR operating-principles sheet |
| `branding` | A brand statement / positioning one-pager |
| `interview` | A personal interview playbook (stories, calibrated answers) |
| `speaking` | A signature opening + delivery plan |
| `confidence` | A confidence-reset plan (named reframes for your triggers) |
| `leadership` | A leadership stance + a worked decision |
| `offer` | A pay-negotiation plan + script |

## The AI tutor rubric (the moat — and the build risk)

Each lesson ships with a **rubric** the tutor grades against. Without it, feedback degrades
to "great job!" and the premium promise collapses. Per lesson, author:
- 3–5 criteria for a strong answer (in Nesreen's terms)
- what "not yet" vs. "you've got it" looks like, with one concrete tell each
- one **redirect prompt** the tutor uses when the learner is off — a question, not the answer
- the tutor never just praises; it names the gap and asks the learner to close it

## Voice & UX-writing rules

- Second person ("you"), Nesreen's voice: calm, direct, warm, tells the truth.
- Clear over clever; concise over comprehensive; no jargon, no MBA filler.
- CTAs are action + outcome: "Pressure-test my answer", "Run my opening", "Rebuild this line"
  — never "Submit" / "Continue".
- Tutor feedback is specific and honest, never blaming, never empty praise.
- Frameworks are named once and credited, then used — not explained at length.

## Migration note

The current 82 lessons were authored on the retired model (framework-led, read → MCQ).
Adopting this brief means a rewrite. **Recommended: pilot before scale** — rewrite two
lessons end-to-end (one Knowledge: `ai-hr-1`; one Performance: an `interview` or `speaking`
lesson) *including the tutor rubric*, prove the format and the feedback quality, then roll
out archetype by archetype.
