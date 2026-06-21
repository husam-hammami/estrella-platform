# Estrella Academy — Implementation Brief

This brief tells a developer how to turn the content in this folder into a working,
data-driven lesson player with gamification. It assumes the existing app already has an
`index.html` with a `courses` array and a lesson player shell using `.lp-*` CSS classes,
plus an AI tutor panel.

Read this once, top to bottom, before writing code.

---

## 1. The data you have

Three files in `estrella/academy/` are the source of truth. Embed `academy-content.json`
in the app (it already contains everything). The other two are helpers.

| File | What it is | Use it for |
| --- | --- | --- |
| `academy-content.json` | One bundle: `{ gamification, courses:{ "<id>": <course> } }` | The single file the app embeds and reads at runtime. |
| `manifest.json` | `{ courses:[{id,title,track,tracks,lessonCount,lessonIds}], totals:{courses,lessons} }` | Build the catalogue/landing list, route guards, progress denominators (82 lessons, 8 courses) without parsing full content. |
| `gamification.json` | XP rules, levels, badges, streak, tracks, certificate, pedagogy. (Also nested inside the bundle.) | Wiring XP / levels / badges / streak / certificate. |

**Totals (verify in CI):** 8 courses, 82 lessons.
`ai-hr:16, branding:12, interview:12, hr-foundations:12, speaking:12, confidence:6, leadership:6, offer:6`.

### Course → lesson schema (uniform across all 82 lessons)

```jsonc
{
  "courseId": "ai-hr",
  "title": "AI for HR Leaders",
  "modules": [
    {
      "title": "Where AI Belongs in HR",
      "lessons": [
        {
          "lessonId": "ai-hr-1",          // unique, sequential per course: "<courseId>-<n>"
          "title": "…",
          "mins": 18,                      // estimated minutes, for the UI badge
          "hook": "…",                     // one-paragraph opener
          "objectives": ["By the end you can …", "…"],
          "sections": [                     // ordered teaching body
            { "heading": "…", "body": ["paragraph", "paragraph"] }
          ],
          "takeaways": ["…", "…"],          // bullet summary
          "exercise": {                     // single reflective exercise
            "title": "…",
            "prompt": "…",
            "placeholder": "…"              // seed text for the textarea
          },
          "quiz": [                         // 2–3 questions
            {
              "q": "…",
              "options": ["…","…","…","…"],
              "answer": 1,                  // 0-based index of correct option
              "explain": "…"               // shown after answering
            }
          ],
          "xp": 50,                         // base XP for completing the lesson
          "tutorSeed": {                    // primes the in-lesson AI tutor
            "opening": "…",                 // tutor's first message
            "suggested": ["…","…","…"]      // tappable starter questions
          }
        }
      ]
    }
  ]
}
```

Every lesson has exactly these keys. You can render the player generically — no per-lesson
special-casing.

---

## 2. Make the lesson player data-driven

Render one lesson object into the existing `.lp-*` shell. Map fields to DOM as follows.

| Lesson field | Renders into | How |
| --- | --- | --- |
| `title`, `mins` | lesson header | title + a "≈ {mins} min" badge |
| `hook` | intro block | one lead paragraph |
| `objectives` | intro block | small "What you'll be able to do" list |
| `sections[]` | **`.lp-section`** | one `.lp-section` per array item: `heading` → `<h3>`, each `body[]` string → its own `<p>` |
| `takeaways[]` | **`.lp-takeaways`** | a styled list (gold disc bullets) |
| `exercise` | **`.lp-exercise`** | `title` → label, `prompt` → instruction, `placeholder` → textarea placeholder; persist the learner's text (see §5) |
| `quiz[]` | **`.lp-quiz`** (new block) | see §3 |
| `tutorSeed` | AI tutor panel | see §4 |

### Render sketch

```js
function renderLesson(lesson) {
  setHeader(lesson.title, lesson.mins);
  renderHook(lesson.hook);
  renderObjectives(lesson.objectives);

  const sec = document.querySelector('.lp-sections');
  sec.innerHTML = '';
  for (const s of lesson.sections) {
    const el = document.createElement('section');
    el.className = 'lp-section';
    el.innerHTML = `<h3>${esc(s.heading)}</h3>` +
                   s.body.map(p => `<p>${esc(p)}</p>`).join('');
    sec.appendChild(el);
  }

  renderList('.lp-takeaways', lesson.takeaways);          // gold-bullet list
  renderExercise('.lp-exercise', lesson.exercise);        // title/prompt/textarea
  renderQuiz('.lp-quiz', lesson.quiz);                    // §3
  seedTutor(lesson.tutorSeed);                            // §4
}
```

Always escape strings (`esc()`); the content has straight quotes, percent signs, and
currency text but no HTML, so escaping is safe and lossless.

Look up a lesson by id with a flat index built once at load:

```js
const LESSONS = {};                       // "ai-hr-1" -> {lesson, courseId, order}
for (const [cid, course] of Object.entries(DATA.courses)) {
  let n = 0;
  for (const m of course.modules)
    for (const l of m.lessons) LESSONS[l.lessonId] = { lesson: l, courseId: cid, order: n++ };
}
```

---

## 3. The quiz block (new)

Add a `.lp-quiz` block after `.lp-takeaways`. Behaviour:

1. Render each `quiz[i]` as a question with its `options` as radio buttons / tappable cards.
2. On submit, compare the chosen index to `answer`. Mark right/wrong and reveal `explain`
   for that question.
3. **Pass threshold** = `gamification.scoring.passThreshold` (0.7). Passing unlocks the next
   lesson.
4. **Per-correct XP** = `gamification.scoring.perCorrectAnswer` (10) — award once per question,
   first correct answer only (retries do not re-pay; see `scoring.retries`).
5. **Mastery** = every question correct on the first try, no retries. Award
   `gamification.scoring.mastery.reward.xpBonus` (40) and flag the lesson `mastered`.
   This feeds the `flawless` and `perfect-course` badges.
6. **Retries**: allowed (`scoring.retries.allowed`). On retry, re-grade for pass/unlock but do
   **not** pay XP again, and a retried quiz can never count as mastery.

```js
function gradeQuiz(quiz, picks, alreadyAnsweredFirstTry) {
  let correct = 0, allFirstTry = true;
  quiz.forEach((qq, i) => {
    const ok = picks[i] === qq.answer;
    if (ok) correct++;
    if (!ok || alreadyAnsweredFirstTry) allFirstTry = false;
  });
  const ratio = correct / quiz.length;
  return {
    passed: ratio >= DATA.gamification.scoring.passThreshold,
    correct,
    mastered: allFirstTry && correct === quiz.length,
  };
}
```

---

## 4. Wire `tutorSeed` into the AI tutor

When a lesson opens, prime the tutor panel:

- Show `tutorSeed.opening` as the tutor's first message.
- Render `tutorSeed.suggested[]` as tappable chips that send that text as the user turn.
- Send the **current lesson as context** to the model so answers stay on-topic. Build a compact
  system preamble from the lesson:

  ```
  You are Nesreen, the Estrella Academy tutor, inside the lesson "{title}".
  Lesson summary — objectives: {objectives}. Key points: {takeaways}.
  Stay in plain, simple English (B1–B2). Only help with this lesson's topic.
  ```

- The mock-interview lessons (`interview-12`, `offer-6`) explicitly invite the tutor to *run a
  mock interview*. No special code path is needed — their `tutorSeed.suggested` already drives it;
  just make sure the tutor receives the lesson context so it plays the interviewer role.

Do not hard-code any tutor copy in the app. It all comes from `tutorSeed`.

---

## 5. Add `lessonId` to the `index.html` courses array

The player must key everything (progress, XP, unlock, certificate) on `lessonId`. Ensure every
lesson entry in the `index.html` `courses` array carries its `lessonId` exactly as in
`manifest.json` → `courses[].lessonIds`.

- If `index.html` already lists lessons, add a `lessonId` field to each, in order, matching
  `"<courseId>-<n>"` (1-based, sequential, no gaps).
- Simplest path: stop hand-maintaining the lesson list and **generate it from the manifest** at
  build/load time, so the ids can never drift:

  ```js
  const courses = manifest.courses.map(c => ({
    id: c.id, title: c.title, track: c.track, tracks: c.tracks,
    lessonCount: c.lessonCount,
    lessons: c.lessonIds.map(id => ({ lessonId: id, ...DATA.courses[c.id] && lookupMeta(id) }))
  }));
  ```

- Add a CI assertion: every `lessonId` in `index.html` exists in `academy-content.json`, counts
  per course match the table in §1, and ids are sequential. This catches drift early.

---

## 6. Gamification via `localStorage`

All progression is local-first. Keep one namespaced object and persist on every change.

### Storage shape

```jsonc
// key: "estrella.academy.v1"
{
  "xp": 0,                                  // total "Light"
  "lessons": {                              // per lesson
    "ai-hr-1": { "completed": true, "mastered": true, "quizCorrect": 2, "exerciseText": "…" }
  },
  "courses": { "ai-hr": { "completedAt": null, "mastered": false } },
  "tracks":  { "signature": { "completedAt": null } },
  "badges":  ["first-step", "flawless"],
  "streak":  { "count": 3, "lastActiveDate": "2026-06-21", "freezeTokens": 1, "freezeRenewsOn": "2026-07-21" }
}
```

### XP ("Light") — from `gamification.xp.rules`

Award, idempotently (never double-pay):

| Event | Light | Note |
| --- | --- | --- |
| First completion of a lesson | `lessonCompleted` = 50 | once per lesson |
| Each quiz question correct | `quizCorrectAnswer` = 10 | once per question, first correct only |
| Quiz mastery (all first-try) | `quizMasteryBonus` = 40 | once per quiz |
| Finish last lesson of a course | `courseCompletionBonus` = 200 | once per course |
| Daily streak kept | `dailyStreakBonus` = 15 | once per active day |
| Finish every course in a track | `trackCompletionBonus` = 500 | once per track |

Call point money "Light" in the UI (`xp.unit`). Keep the number quiet and elegant — this brand is
"elegant and earned, never a points race" (`gamification.brand.tone`).

### Levels — from `gamification.levels.ladder`

Six tiers by total XP: First Light (0), Rising Star (500), Guiding Star (1500), Star Pattern
(3500), Bright Star (6500), Estrella (10000). Compute current tier = highest `minXP` ≤ total XP.
Show tier name + progress to the next `minXP`.

### Badges — from `gamification.badges.catalog`

Evaluate criteria after each relevant event and add the badge id once:

- `type: "behaviour"` → match `event` + `count`/`days` + `scope`
  (`lifetime`, `sameDay`, `perCourse`, `anyTrack`). Examples: `first-step`
  (lesson.completed ×1), `in-flow` (3 lessons same day), `flawless` (1 quiz mastery),
  `perfect-course` (all quizzes in a course mastered), `seven-nights`/`constant` (streak 7/30),
  `track-finisher` (any track completed).
- `type: "course"` → award `{course}-graduate` when that `courseId` is completed.

Render each as a small gold disc (`brand.palette.gold` `#B8985C`).

### Streak — from `gamification.streak`

- A day counts when the learner completes ≥1 lesson **or** passes ≥1 quiz
  (`qualifyingActivity`).
- Use the learner's local timezone (`timezone: "learnerLocal"`).
- On a qualifying action: if `lastActiveDate` is yesterday → `count++`; if today → no change;
  if older → reset to 1 (unless a freeze applies).
- **Free Day**: one `freezeToken` per 30 days (`grace.freezeTokens`). One missed day consumes a
  token instead of breaking the streak; it renews on its own. Do not gamify missing days.
- Award `dailyStreakBonus` (15) once per qualifying day. Fire `streak.reached` at 7 and 30 for the
  `seven-nights` and `constant` badges (`streak.milestones`).

### Certificate — from `gamification.certificate`

On course completion, generate a certificate using the brand: Cormorant typeface, cream
`#F2EBDC` background, gold `#B8985C` line, signed by Nesreen. Fill `fields` from local state
(`recipientName`, `courseId`, `courseTitle`, `track`, `issuedOn`, `masteryAttained`, `finalScore`,
`certificateId` like `ESTR-AIHR-2026-0001`, `verificationUrl`). If `masteryAttained` is true, add
the mastery seal "Finished with Full Marks" (`certificate.masteryVariant`). Use the `copy` block
for the congratulatory line and signature.

### Brand styling

Pull all colours/type from `gamification.brand`:
`cream #F2EBDC`, `gold #B8985C`, `ink #14120E`, typeface **Cormorant**. Keep XP, levels, and badges
calm and restrained — quiet gold accents, generous spacing, no loud "points" animations.

---

## 7. Unlock & progress logic

- A lesson is **available** when the previous lesson in the same course is `completed` (the first
  lesson of each course is always available). Lesson order = array order within
  `course.modules[].lessons[]`, equal to the numeric suffix in `lessonId`.
- A lesson is **completed** when the learner has read it and **passed** its quiz
  (`ratio ≥ passThreshold`). The exercise is reflective and is not a gate (but persist its text).
- A **course** is complete when all its lessons are completed → pay `courseCompletionBonus`,
  award `{course}-graduate`, issue the certificate.
- A **course** is `mastered` when every quiz in it reached mastery → award `perfect-course`.
- A **track** is complete when all `tracks[].courses` are complete (read tracks from
  `gamification.tracks.list`; a course can belong to more than one, e.g. `branding` and `speaking`)
  → pay `trackCompletionBonus`, award `track-finisher`, grant the track title
  (`tracks[].reward.title`: Grounded / Named / Interview Ready).

---

## 8. Difficulty ladder & track map (for the catalogue UI)

Order courses in the catalogue by intended difficulty:

1. `confidence` (Confidence Reset, 6) — inner game, start here
2. `hr-foundations` (Modern HR Foundations, 12)
3. `branding` (Personal Branding, 12)
4. `leadership` (Leadership Without Burnout, 6)
5. `speaking` (Public Speaking & Executive Presence, 12)
6. `interview` (Interview Mastery, 12)
7. `offer` (The Offer Machine, 6)
8. `ai-hr` (AI for HR Leaders, 16) — most advanced/specialist

Tracks (from `gamification.tracks.list`):

- **foundation** → `hr-foundations`, `confidence`, `branding`
- **signature** → `branding`, `speaking`, `leadership`, `ai-hr`
- **interview** → `interview`, `speaking`, `offer`

---

## 9. Content notes the UI should respect

- All copy is plain B1–B2 English for GCC (UAE/KSA) readers. Do not auto-summarise or rewrite it
  in the UI; render as written.
- **STAR** appears in three courses by design, each for a different role: `interview-4` (candidate,
  keep it human), `hr-foundations-4` (HR as interviewer, reduce hiring bias), `offer-1` (behavioral
  round). It is a standard public method, not an Estrella-proprietary device, so cross-course
  reinforcement is intended.
- The proprietary named methods are unique per course (e.g. Catch-Check-Change, Evidence File,
  Message Map, CTRL, SETUP, Energy Audit, Pain-and-Proof, Total-Value, Anchor-Reason-Range). The
  pause technique is named **Pause-Point-Pause** only in `speaking-7`; `interview-7` borrows it and
  points the learner to the speaking course rather than re-coining it.

---

## 10. Build checklist

- [ ] Embed `academy-content.json`; build the flat `lessonId → lesson` index.
- [ ] Generate the `index.html` `courses` array (with `lessonId`s) from `manifest.json`.
- [ ] Render `sections → .lp-section`, `takeaways → .lp-takeaways`, `exercise → .lp-exercise`.
- [ ] Add the `.lp-quiz` block (grade, pass at 0.7, mastery all-first-try, retries no re-pay).
- [ ] Seed the AI tutor from `tutorSeed` with lesson context.
- [ ] Implement `localStorage` state (XP/levels/badges/streak/certificate) per §6.
- [ ] Implement unlock/progress/track completion per §7.
- [ ] Apply brand styling (cream/gold/ink, Cormorant); keep it calm.
- [ ] CI: assert 8 courses / 82 lessons, sequential ids, every `index.html` id exists in content.
