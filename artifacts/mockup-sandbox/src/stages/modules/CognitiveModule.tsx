// Module 4 — Timed micro-reasoning.
// Each item has a countdown; running out locks in "no answer" and auto-advances.

import { useEffect, useRef, useState } from "react";
import { COGNITIVE_ITEMS } from "@/lib/data";
import { AppAction, AppState } from "@/lib/state";
import { cn } from "@/lib/utils";

interface Props {
  state: AppState;
  dispatch: (a: AppAction) => void;
  onExit: () => void;
  onComplete: () => void;
}

export function CognitiveModule({
  state,
  dispatch,
  onExit,
  onComplete,
}: Props) {
  const idx = state.cogIndex;
  const item = COGNITIVE_ITEMS[idx];
  const total = COGNITIVE_ITEMS.length;
  const saved = state.cog[idx];

  const [elapsed, setElapsed] = useState(0);
  const [pick, setPick] = useState<number | null>(saved?.pick ?? null);
  const startedRef = useRef<number>(Date.now());
  const lockedRef = useRef<boolean>(saved != null);

  useEffect(() => {
    startedRef.current = Date.now();
    lockedRef.current = saved != null;
    setPick(saved?.pick ?? null);
    setElapsed(saved?.elapsed ?? 0);
    if (lockedRef.current) return;
    const tick = setInterval(() => {
      const e = (Date.now() - startedRef.current) / 1000;
      setElapsed(e);
      if (e >= item.timeLimit) {
        clearInterval(tick);
        if (!lockedRef.current) {
          lockedRef.current = true;
          dispatch({
            type: "COG_SET",
            index: idx,
            answer: { pick: null, elapsed: item.timeLimit },
          });
        }
      }
    }, 100);
    return () => clearInterval(tick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx]);

  const locked = lockedRef.current;
  const ratio = Math.min(1, elapsed / item.timeLimit);
  const secsLeft = Math.max(0, Math.ceil(item.timeLimit - elapsed));

  const choose = (i: number) => {
    if (locked) return;
    lockedRef.current = true;
    setPick(i);
    dispatch({
      type: "COG_SET",
      index: idx,
      answer: { pick: i, elapsed: elapsed },
    });
  };

  const allDone = COGNITIVE_ITEMS.every((_, i) => state.cog[i] != null);
  const isLast = idx >= total - 1;

  return (
    <div className="wrap narrow">
      <div className="module-shell-head">
        <button className="btn ghost" onClick={onExit}>
          ← All modules
        </button>
        <span className="method-chip">Timed micro-reasoning</span>
        <span style={{ marginLeft: "auto", fontSize: 12, color: "var(--text3)" }}>
          Item {idx + 1} of {total}
        </span>
      </div>

      <div className="progress-dots">
        {COGNITIVE_ITEMS.map((_, i) => (
          <span
            key={i}
            className={cn(
              "pdot",
              state.cog[i] != null && "done",
              i === idx && !state.cog[i] && "active"
            )}
          />
        ))}
      </div>

      <div className="card module-question">
        <div className="cog-timer-wrap">
          <div className="cog-timer-bar">
            <span
              className="cog-timer-fill"
              style={{ width: `${Math.round(ratio * 100)}%` }}
            />
          </div>
          <div className="cog-timer-num">{secsLeft}s</div>
        </div>

        <div className="q-prompt" style={{ marginTop: 10 }}>
          {item.prompt}
        </div>
        <div className="q-hint">Accuracy counts first — speed is a tie-breaker.</div>

        <div className="cog-options">
          {item.options.map((o, i) => (
            <button
              key={i}
              className={cn("cog-option", pick === i && "selected")}
              disabled={locked && pick !== i}
              onClick={() => choose(i)}
            >
              {o}
            </button>
          ))}
        </div>
      </div>

      <div className="nav-row">
        <button
          className="btn secondary"
          disabled={idx === 0}
          onClick={() => dispatch({ type: "COG_INDEX", index: idx - 1 })}
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
            disabled={state.cog[idx] == null}
            onClick={() => dispatch({ type: "COG_INDEX", index: idx + 1 })}
          >
            Next item →
          </button>
        )}
      </div>
    </div>
  );
}
