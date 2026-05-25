// Module 1 — Forced-Choice Big-5.
//
// The persistence-bug fix lives in state.ts (answers are stored in the
// reducer, which auto-saves every change). This component just reads from
// state.forcedChoice[blockIndex]; prev/next and page refresh all keep picks.

import { useEffect } from "react";
import { FORCED_CHOICE_BLOCKS } from "@/lib/data";
import { AppAction, AppState } from "@/lib/state";
import { cn } from "@/lib/utils";

interface Props {
  state: AppState;
  dispatch: (a: AppAction) => void;
  onExit: () => void;
  onComplete: () => void;
}

export function ForcedChoiceModule({
  state,
  dispatch,
  onExit,
  onComplete,
}: Props) {
  const idx = state.fcIndex;
  const block = FORCED_CHOICE_BLOCKS[idx];
  const answer = state.forcedChoice[idx] ?? { most: null, least: null };
  const total = FORCED_CHOICE_BLOCKS.length;

  // Ensure array capacity matches data.
  useEffect(() => {
    if (state.forcedChoice.length < total) {
      const filled = [...state.forcedChoice];
      while (filled.length < total)
        filled.push({ most: null, least: null });
      dispatch({ type: "FC_SET", index: total - 1, answer: filled[total - 1] });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setPick = (kind: "most" | "least", i: number) => {
    const next = { ...answer };
    // Toggle: clicking the same cell clears it.
    if (next[kind] === i) next[kind] = null;
    else {
      next[kind] = i;
      // Most + Least can't be the same item.
      if (kind === "most" && next.least === i) next.least = null;
      if (kind === "least" && next.most === i) next.most = null;
    }
    dispatch({ type: "FC_SET", index: idx, answer: next });
  };

  const complete = answer.most != null && answer.least != null;
  const isLast = idx >= total - 1;
  const allDone = state.forcedChoice
    .slice(0, total)
    .every((a) => a && a.most != null && a.least != null);

  return (
    <div className="wrap narrow">
      <div className="module-shell-head">
        <button className="btn ghost" onClick={onExit}>
          ← All modules
        </button>
        <span className="method-chip">Forced-choice ipsative · Big 5</span>
        <span style={{ marginLeft: "auto", fontSize: 12, color: "var(--text3)" }}>
          Block {idx + 1} of {total}
        </span>
      </div>

      <div className="progress-dots">
        {FORCED_CHOICE_BLOCKS.map((_, i) => (
          <span
            key={i}
            className={cn(
              "pdot",
              i < idx && "done",
              i === idx && "active"
            )}
          />
        ))}
      </div>

      <div className="card module-question">
        <div className="q-prompt">
          Which statement is <em>most</em> like you, and which is <em>least</em>?
        </div>
        <div className="q-hint">
          Pick exactly one "Most" and one "Least" per block. Your picks save
          automatically.
        </div>

        <div className="fc-grid">
          {block.items.map((item, i) => (
            <div key={i} className="fc-row">
              <span className="fc-text">{item.text}</span>
              <button
                className={cn(
                  "fc-btn most",
                  answer.most === i && "selected"
                )}
                onClick={() => setPick("most", i)}
                aria-pressed={answer.most === i}
              >
                Most
              </button>
              <button
                className={cn(
                  "fc-btn least",
                  answer.least === i && "selected"
                )}
                onClick={() => setPick("least", i)}
                aria-pressed={answer.least === i}
              >
                Least
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="nav-row">
        <button
          className="btn secondary"
          disabled={idx === 0}
          onClick={() => dispatch({ type: "FC_INDEX", index: idx - 1 })}
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
            disabled={!complete}
            onClick={() => dispatch({ type: "FC_INDEX", index: idx + 1 })}
          >
            Next block →
          </button>
        )}
      </div>
    </div>
  );
}
