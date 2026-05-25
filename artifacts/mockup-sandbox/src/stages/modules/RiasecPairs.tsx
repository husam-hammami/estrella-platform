// Module 2 — RIASEC paired comparison.
// Answer one pair per screen; persistence handled at reducer level.

import { RIASEC_PAIRS, RIASEC_LABELS } from "@/lib/data";
import { AppAction, AppState } from "@/lib/state";
import { cn } from "@/lib/utils";

interface Props {
  state: AppState;
  dispatch: (a: AppAction) => void;
  onExit: () => void;
  onComplete: () => void;
}

export function RiasecModule({
  state,
  dispatch,
  onExit,
  onComplete,
}: Props) {
  const idx = state.riasecIndex;
  const pair = RIASEC_PAIRS[idx];
  const answer = state.riasec[idx] ?? null;
  const total = RIASEC_PAIRS.length;
  const isLast = idx >= total - 1;
  const allDone = RIASEC_PAIRS.every((_, i) => state.riasec[i] != null);

  const pick = (code: string) =>
    dispatch({ type: "RIASEC_SET", index: idx, code });

  return (
    <div className="wrap narrow">
      <div className="module-shell-head">
        <button className="btn ghost" onClick={onExit}>
          ← All modules
        </button>
        <span className="method-chip">Holland RIASEC · paired comparison</span>
        <span style={{ marginLeft: "auto", fontSize: 12, color: "var(--text3)" }}>
          Pair {idx + 1} of {total}
        </span>
      </div>

      <div className="progress-dots">
        {RIASEC_PAIRS.map((_, i) => (
          <span
            key={i}
            className={cn(
              "pdot",
              i < idx && "done",
              i === idx && "active",
              state.riasec[i] != null && "done"
            )}
          />
        ))}
      </div>

      <div className="card module-question">
        <div className="q-prompt">Which one feels more like you?</div>
        <div className="q-hint">
          Pick the side you'd genuinely rather spend a Tuesday afternoon doing.
        </div>

        <div className="pair-grid">
          <button
            className={cn(
              "pair-card",
              answer === pair.a.code && "selected"
            )}
            onClick={() => pick(pair.a.code)}
          >
            <div className="pair-icon">{pair.a.icon}</div>
            <div className="pair-text">{pair.a.text}</div>
            <div style={{ fontSize: 10, color: "var(--text3)", marginTop: 4 }}>
              {RIASEC_LABELS[pair.a.code]}
            </div>
          </button>
          <div className="pair-vs">OR</div>
          <button
            className={cn(
              "pair-card",
              answer === pair.b.code && "selected"
            )}
            onClick={() => pick(pair.b.code)}
          >
            <div className="pair-icon">{pair.b.icon}</div>
            <div className="pair-text">{pair.b.text}</div>
            <div style={{ fontSize: 10, color: "var(--text3)", marginTop: 4 }}>
              {RIASEC_LABELS[pair.b.code]}
            </div>
          </button>
        </div>
      </div>

      <div className="nav-row">
        <button
          className="btn secondary"
          disabled={idx === 0}
          onClick={() => dispatch({ type: "RIASEC_INDEX", index: idx - 1 })}
        >
          ← Previous
        </button>
        {isLast ? (
          <button
            className="btn primary"
            disabled={!allDone}
            onClick={onComplete}
          >
            Finish module →
          </button>
        ) : (
          <button
            className="btn primary"
            disabled={answer == null}
            onClick={() => dispatch({ type: "RIASEC_INDEX", index: idx + 1 })}
          >
            Next pair →
          </button>
        )}
      </div>
    </div>
  );
}
