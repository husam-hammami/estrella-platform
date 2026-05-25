// Module 3 — Situational Judgment Test + Behavioural Frequency.
// Two phases in one shell: SJT (3 scenarios, weighted answers) then the
// frequency Likert (4 items, Never → Monthly+).

import { SJT_SCENARIOS, FREQUENCY_ITEMS, FREQ_ANCHORS } from "@/lib/data";
import { AppAction, AppState } from "@/lib/state";
import { cn } from "@/lib/utils";

interface Props {
  state: AppState;
  dispatch: (a: AppAction) => void;
  onExit: () => void;
  onComplete: () => void;
}

export function JudgmentModule({
  state,
  dispatch,
  onExit,
  onComplete,
}: Props) {
  const sjtTotal = SJT_SCENARIOS.length;
  const freqTotal = FREQUENCY_ITEMS.length;
  const idx = state.sjtIndex; // 0..sjtTotal-1 = SJT, sjtTotal..sjtTotal+freqTotal-1 = frequency
  const isSjtPhase = idx < sjtTotal;

  const allSjtDone = SJT_SCENARIOS.every((_, i) => state.sjt[i] != null);
  const allFreqDone = FREQUENCY_ITEMS.every((_, i) => state.freq[i] != null);
  const isLast = idx >= sjtTotal + freqTotal - 1;

  return (
    <div className="wrap narrow">
      <div className="module-shell-head">
        <button className="btn ghost" onClick={onExit}>
          ← All modules
        </button>
        <span className="method-chip">
          {isSjtPhase
            ? "SJT · weighted responses"
            : "Behavioural frequency · 4-point Likert"}
        </span>
        <span style={{ marginLeft: "auto", fontSize: 12, color: "var(--text3)" }}>
          {isSjtPhase
            ? `Scenario ${idx + 1} of ${sjtTotal}`
            : `Item ${idx - sjtTotal + 1} of ${freqTotal}`}
        </span>
      </div>

      <div className="progress-dots">
        {Array.from({ length: sjtTotal + freqTotal }).map((_, i) => (
          <span
            key={i}
            className={cn(
              "pdot",
              i < idx && "done",
              i === idx && "active",
              i < sjtTotal
                ? state.sjt[i] != null && "done"
                : state.freq[i - sjtTotal] != null && "done"
            )}
          />
        ))}
      </div>

      {isSjtPhase ? (
        <SjtCard
          index={idx}
          pick={state.sjt[idx] ?? null}
          onPick={(p) =>
            dispatch({ type: "SJT_SET", index: idx, pick: p })
          }
        />
      ) : (
        <FrequencyCard
          index={idx - sjtTotal}
          pick={state.freq[idx - sjtTotal] ?? null}
          onPick={(p) =>
            dispatch({
              type: "FREQ_SET",
              index: idx - sjtTotal,
              pick: p,
            })
          }
        />
      )}

      <div className="nav-row">
        <button
          className="btn secondary"
          disabled={idx === 0}
          onClick={() => dispatch({ type: "SJT_INDEX", index: idx - 1 })}
        >
          ← Previous
        </button>
        {isLast ? (
          <button
            className="btn primary"
            disabled={!(allSjtDone && allFreqDone)}
            onClick={onComplete}
          >
            Finish module →
          </button>
        ) : (
          <button
            className="btn primary"
            disabled={
              isSjtPhase
                ? state.sjt[idx] == null
                : state.freq[idx - sjtTotal] == null
            }
            onClick={() => dispatch({ type: "SJT_INDEX", index: idx + 1 })}
          >
            Next →
          </button>
        )}
      </div>
    </div>
  );
}

function SjtCard({
  index,
  pick,
  onPick,
}: {
  index: number;
  pick: number | null;
  onPick: (p: number) => void;
}) {
  const sc = SJT_SCENARIOS[index];
  return (
    <div className="card module-question">
      <div className="scenario-prompt">{sc.prompt}</div>
      <div className="q-hint">Pick the response closest to what you'd actually do.</div>
      <div className="sjt-options">
        {sc.options.map((o, i) => (
          <button
            key={i}
            className={cn("sjt-option", pick === i && "selected")}
            onClick={() => onPick(i)}
            aria-pressed={pick === i}
          >
            {o.text}
          </button>
        ))}
      </div>
    </div>
  );
}

function FrequencyCard({
  index,
  pick,
  onPick,
}: {
  index: number;
  pick: number | null;
  onPick: (p: number) => void;
}) {
  const item = FREQUENCY_ITEMS[index];
  return (
    <div className="card module-question">
      <div className="q-prompt">{item.text}</div>
      <div className="q-hint">Be honest — this is only ever shown to you.</div>
      <div className="freq-row">
        {FREQ_ANCHORS.map((label, i) => (
          <button
            key={label}
            className={cn("freq-btn", pick === i && "selected")}
            onClick={() => onPick(i)}
            aria-pressed={pick === i}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
