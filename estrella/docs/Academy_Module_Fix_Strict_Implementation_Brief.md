# Estrella Academy Strict Module Fix Brief

## Current Direction Override

For lesson screens, this brief is now subordinate to:

`estrella/docs/Academy_Simple_Mode_Brief.md`

Use the Simple Mode brief first. The previous dossier/artifact-desk direction was too heavy for the desired learner experience.

This brief exists because the current Academy implementation drifted into a generic lesson reader.

The fix is not to decorate that reader. The fix is to implement the course-specific dossier system already defined in the Academy content and design handoff.

## Source Of Truth

Use these files exactly:

- Simple mode brief: `estrella/docs/Academy_Simple_Mode_Brief.md`
- Course bible: `estrella/docs/Academy_Course_Bible.md`
- Visual handoff: `estrella/docs/Academy_Dossier_UI_Handoff.md`
- Mockups: `estrella/docs/design-mockups/academy-dossier/`
- Course content and mechanics: `estrella/academy-content.js`
- Main implementation surface: `estrella/index.html`

Do not invent a new learning model. Do not invent new course names, lesson names, badges, formulas, or frameworks. If the UI needs a label, derive it from the Course Bible and `academy-content.js`.

## Reject The Current Direction

The current screenshots fail because they show:

- a generic article reader;
- a left LMS-style stepper;
- long text walls;
- empty right-side space;
- detached chat instead of a coaching margin;
- course mechanics used as labels instead of working interfaces;
- generic progress cards instead of artifact progress.

Do not patch this layout. Replace it with the dossier system.

## Non-Negotiable Product Rule

One Academy world. Eight course instruments.

The learner is not "taking modules." The learner is opening a career dossier and completing a useful artifact through the instrument that fits that course.

## Exact Course Instruments

| Course | Instrument | Artifact | Interaction Surface |
|---|---|---|---|
| Confidence Reset | Mirror Journal | Confidence reset plan | Trigger cards, critic-response slips, evidence file, reset ritual |
| Personal Branding | Reputation Studio | Brand statement and visibility plan | Reputation lens, clarity/proof/specificity controls, visibility trail |
| Interview Mastery | Interview Lab | Interview playbook | Question decoder, headline bench, proof-story bank, recovery drill |
| AI for HR Leaders | Decision Map | AI adoption map | Automate/Augment/Keep human/Not ready quadrants, risk and value markers |
| Leadership Without Burnout | Energy Board | Leadership rhythm plan | Keep/Delegate/Decline/Recover board, energy load, weekly rhythm |
| Public Speaking & Executive Presence | Rehearsal Room | Signature talk kit | Opening line, pause marks, slide/story cards, Q&A response controls |
| Modern HR Foundations | Operating Map | HR operating sheet | People/process/business/risk map, manager action sheet |
| The Offer Machine | Offer Desk | Offer close kit | Floor/target/reach numbers, ask script, negotiation move cards |

## Lesson Studio Rule

Never render a lesson as one long article.

A lesson screen is a working studio:

- Left page: one clear lesson idea, one concise explanation, one example.
- Right page: the active course instrument.
- Side rail: Estrella guidance, artifact progress, saved piece.
- Bottom or edge: page/beat navigation.

The right page cannot be blank. It must always show the current interaction, artifact slot, check, or saved result.

## Interaction Data Contract

Use this data:

```js
lesson.exercise.interaction
```

The renderer must branch from it:

```js
if (lesson.exercise.interaction.requiresWriting === true) {
  renderFocusedArtifactSheet();
} else {
  renderCourseSpecificChoiceInstrument();
}
```

Current content:

- 82 total lessons.
- 69 choice/rehearsal/review lessons.
- 13 writing lessons.

For non-writing lessons:

- no textarea;
- no open-ended "write your answer";
- show choice slips, tokens, sorting, checks, rehearsal controls, or stamps;
- save the selected move into artifact progress.

For writing lessons:

- show one focused artifact sheet;
- label the action `Save the useful words`;
- do not call it a submission;
- show the saved words in the artifact/vault.

## Academy Home

Use `academy-home-approved.png` as the visual anchor.

Required structure:

- open Academy book as the main object;
- recommended course on the left page;
- learner progress on the right page or side panel;
- artifact slip explaining what will be built;
- folder row/grid for all courses visible in the first viewport;
- tab language: Foundation, Signature, Interview.

Do not use:

- SaaS stat cards as the main pattern;
- generic course cards;
- a marketing hero;
- a table as the main home;
- floating nested cards.

## Course Dossier Page

Each course opens into its own dossier, not the same page with a changed title.

Required elements:

- course instrument name;
- artifact name;
- lesson path/checklist;
- current artifact state;
- start/continue action;
- Estrella margin;
- visible course-specific instrument controls.

Example: Interview Mastery should look like an Interview Lab with decoder/proof-story/mock controls. It should not look like a reading page with "Interview Lab" written in the sidebar.

## Lesson Content Display

The content exists in `academy-content.js`, but the UI must not dump all lesson sections at once.

Display only the active beat/page:

- overview beat: hook and what this lesson builds;
- method beat: one focused method section;
- instrument beat: `exercise.interaction`;
- check beat: 1-2 quiz questions;
- saved beat: artifact piece saved.

This is an implementation renderer rule, not new learner-facing jargon.

## Copy Rules

Use simple professional language.

Avoid:

- childish gamification;
- internal UX terms;
- jargon-heavy labels;
- "submit";
- generic "module", "unit", "worksheet";
- invented formulas not present in the source;
- acronym soup.

Use:

- `Start Confidence Reset`;
- `Continue Interview Lab`;
- `Save the useful words`;
- `Add to playbook`;
- `Add to reset plan`;
- `Rehearse this move`;
- `Check the offer move`;
- `Open artifact vault`.

## Estrella Margin

Estrella is not a floating chatbot pasted on the side.

She is a quiet coaching margin attached to the dossier:

- short note relevant to current beat;
- suggested questions only when useful;
- no grading;
- no noisy praise;
- no long assistant monologues;
- must not replace the course instrument.

## Artifact Vault

The vault must show what the learner has actually saved:

- selected choices;
- written artifact words;
- completed course pieces;
- course-specific artifact sections.

Do not show an empty generic vault when `AST.lessons[lessonId].choice` or `.draft` exists.

## Implementation Prompt

Use this prompt with the frontend implementer:

```text
Implement the Estrella Academy dossier refactor exactly from:

C:\Users\husam\OneDrive\Documents\Estrella_Final\estrella\docs\Academy_Module_Fix_Strict_Implementation_Brief.md
C:\Users\husam\OneDrive\Documents\Estrella_Final\estrella\docs\Academy_Dossier_UI_Handoff.md
C:\Users\husam\OneDrive\Documents\Estrella_Final\estrella\academy-content.js

The current implementation is rejected. Do not decorate the current generic article reader. Replace the Academy, course, and lesson surfaces with the dossier system.

Hard requirements:
- Academy home follows the approved open-book/folder/artifact mockup.
- Every course opens as a course dossier with its own instrument.
- Every lesson opens as a lesson studio, not a long article page.
- The right side of the lesson studio must show the active instrument, artifact state, check, or saved result. It cannot be blank.
- Use `lesson.exercise.interaction` to render the practice surface.
- If `requiresWriting` is false, do not show a textarea.
- If `requiresWriting` is true, show a focused artifact sheet with `Save the useful words`.
- Save choices and drafts into the existing `AST.lessons` state.
- Show saved choices/drafts in artifact progress and vault.
- Preserve existing localStorage key `estrella.academy.v1`.
- Preserve `AST.lessons`, `AST.courses`, `AST.tracks`, `AST.badges`, and `AST.lastLesson`.

Course-specific instruments:
- Confidence Reset: Mirror Journal, confidence reset plan, trigger/evidence/reset controls.
- Personal Branding: Reputation Studio, brand statement and visibility plan, clarity/proof/specificity controls.
- Interview Mastery: Interview Lab, interview playbook, question decoder/headline/proof-story/recovery controls.
- AI for HR Leaders: Decision Map, AI adoption map, Automate/Augment/Keep human/Not ready quadrants.
- Leadership Without Burnout: Energy Board, leadership rhythm plan, Keep/Delegate/Decline/Recover board.
- Public Speaking & Executive Presence: Rehearsal Room, signature talk kit, opening/pause/Q&A rehearsal controls.
- Modern HR Foundations: Operating Map, HR operating sheet, people/process/business/risk controls.
- The Offer Machine: Offer Desk, offer close kit, floor/target/ask/pause controls.

Do not:
- use generic LMS sidebars;
- show all lesson sections as a text wall;
- leave blank right-side panels;
- invent new course content;
- introduce childish badges, acronyms, or generic formulas;
- use the word "submit";
- make the constellation the main UI;
- hide course folders below the fold on desktop.

Acceptance:
- Fresh learner, in-progress learner, completed lesson, completed course all work.
- All 8 course dossier pages are distinct through their instruments.
- Choice lessons show course-specific interaction controls.
- Writing lessons show artifact sheets only where required.
- Desktop and mobile are both usable with no horizontal scroll.
- The implemented result visibly matches the approved mockup world and not a generic course reader.
```

## QA Gate

Reject the build if any of these are true:

- a lesson page looks like a blog article;
- the course mechanic is only a label;
- any non-writing lesson shows a textarea;
- the right lesson panel is empty;
- saved choices do not appear in artifact progress;
- the home page course folders are not clearly visible;
- the visual language shifts away from book, folder, dossier, artifact, leather, brass, and paper.
