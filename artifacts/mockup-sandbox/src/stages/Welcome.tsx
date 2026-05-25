// Stage 1 — Rita-led "getting to know you" conversation.
// Chip-based inputs keep the flow short; one free-text field for "interests"
// so there's a qualitative surface to echo back later in the roadmap tags.

import { useState } from "react";
import { Avatar } from "@/components/Mascot";
import {
  YEARS_OPTIONS,
  LEARNING_STYLES,
  CURRENT_ROLE_SUGGESTIONS,
  LearningStyle,
} from "@/lib/data";
import { AppAction, AppState } from "@/lib/state";
import { cn } from "@/lib/utils";

interface Props {
  state: AppState;
  dispatch: (a: AppAction) => void;
  onContinue: () => void;
  onSpeak: (text: string) => void;
  speaking: boolean;
}

const GOAL_OPTIONS = [
  "Switch careers",
  "Get promoted",
  "Learn a new stack",
  "Return to work",
  "Negotiate pay",
  "Land first role",
  "Build side projects",
  "Lead a team",
];

export function WelcomeStage({
  state,
  dispatch,
  onContinue,
  onSpeak,
  speaking,
}: Props) {
  const { welcome } = state;
  const [spoke, setSpoke] = useState(false);

  const ready =
    welcome.name.trim().length > 0 &&
    welcome.currentRole.trim().length > 0 &&
    welcome.yearsExp.length > 0 &&
    welcome.learningStyle.length > 0 &&
    welcome.goals.length > 0;

  const greet = () => {
    const line =
      welcome.name.trim().length > 0
        ? `Hi ${welcome.name.split(" ")[0]} — I'm Rita, your career coach. Before we start the assessments, I'd love to learn a bit about you.`
        : "Hi there — I'm Rita, your career coach. Before we start the assessments, I'd love to learn a bit about you.";
    onSpeak(line);
    setSpoke(true);
  };

  return (
    <div className="wrap narrow">
      <div className="hero">
        <Avatar speaking={speaking} />
        <div className="eyebrow">Step 1 · Getting to know you</div>
        <h1>Let's start with a quick hello</h1>
        <p className="lead">
          I'll ask a few short questions so the rest of the assessments and
          your roadmap feel tailored to your goals, not generic advice.
        </p>
        {!spoke && (
          <button
            className="btn secondary"
            style={{ marginTop: 14 }}
            onClick={greet}
          >
            ▶ Hear Rita's welcome
          </button>
        )}
      </div>

      <div className="card">
        <div className="chip-field">
          <label className="chip-label" htmlFor="name">
            What should I call you?
          </label>
          <input
            id="name"
            className="chip-input"
            placeholder="Your name"
            value={welcome.name}
            onChange={(e) =>
              dispatch({ type: "WELCOME_UPDATE", patch: { name: e.target.value } })
            }
          />
        </div>

        <div className="chip-field">
          <label className="chip-label">Current role</label>
          <div className="chip-row">
            {CURRENT_ROLE_SUGGESTIONS.map((s) => (
              <button
                key={s}
                className={cn("chip", welcome.currentRole === s && "selected")}
                onClick={() =>
                  dispatch({
                    type: "WELCOME_UPDATE",
                    patch: { currentRole: s },
                  })
                }
              >
                {s}
              </button>
            ))}
          </div>
          <input
            className="chip-input"
            style={{ marginTop: 10 }}
            placeholder="…or describe it in your own words"
            value={
              CURRENT_ROLE_SUGGESTIONS.includes(welcome.currentRole)
                ? ""
                : welcome.currentRole
            }
            onChange={(e) =>
              dispatch({
                type: "WELCOME_UPDATE",
                patch: { currentRole: e.target.value },
              })
            }
          />
        </div>

        <div className="chip-field">
          <label className="chip-label">Years of experience</label>
          <div className="chip-row">
            {YEARS_OPTIONS.map((y) => (
              <button
                key={y}
                className={cn("chip", welcome.yearsExp === y && "selected")}
                onClick={() =>
                  dispatch({ type: "WELCOME_UPDATE", patch: { yearsExp: y } })
                }
              >
                {y}
              </button>
            ))}
          </div>
        </div>

        <div className="chip-field">
          <label className="chip-label">How do you learn best?</label>
          <div className="chip-row">
            {LEARNING_STYLES.map((s) => (
              <button
                key={s.id}
                className={cn(
                  "chip",
                  welcome.learningStyle === s.id && "selected"
                )}
                onClick={() =>
                  dispatch({
                    type: "WELCOME_UPDATE",
                    patch: { learningStyle: s.id as LearningStyle },
                  })
                }
                title={s.hint}
              >
                {s.label}
              </button>
            ))}
          </div>
          <div className="footer-hint">
            {LEARNING_STYLES.find((s) => s.id === welcome.learningStyle)?.hint ??
              "Your resource pack in the roadmap will match this style."}
          </div>
        </div>

        <div className="chip-field">
          <label className="chip-label">What are you hoping to work on?</label>
          <div className="chip-row">
            {GOAL_OPTIONS.map((g) => (
              <button
                key={g}
                className={cn(
                  "chip",
                  welcome.goals.includes(g) && "selected"
                )}
                onClick={() =>
                  dispatch({ type: "WELCOME_TOGGLE_GOAL", goal: g })
                }
              >
                {g}
              </button>
            ))}
          </div>
          <div className="footer-hint">Pick one or several.</div>
        </div>

        <div className="chip-field">
          <label className="chip-label" htmlFor="int">
            What are you curious about? (optional)
          </label>
          <input
            id="int"
            className="chip-input"
            placeholder="e.g. AI products, climate tech, design systems…"
            value={welcome.interestsText}
            onChange={(e) =>
              dispatch({
                type: "WELCOME_UPDATE",
                patch: { interestsText: e.target.value },
              })
            }
          />
        </div>
      </div>

      <div className="nav-row">
        <span />
        <button
          className="btn primary"
          disabled={!ready}
          onClick={onContinue}
          title={ready ? "Continue" : "Fill in the required fields first"}
        >
          Continue to assessments →
        </button>
      </div>
    </div>
  );
}
