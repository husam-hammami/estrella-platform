// Stage 3 — Hard/technical skills.
// Two panes: role picker, then per-role item runner. Answers persist
// per-role so switching roles doesn't wipe progress.

import { ROLES, ROLE_BY_ID, RoleId } from "@/lib/data";
import { AppAction, AppState } from "@/lib/state";
import { cn } from "@/lib/utils";

interface Props {
  state: AppState;
  dispatch: (a: AppAction) => void;
  onExit: () => void;
  onComplete: () => void;
}

export function HardSkillsStage({
  state,
  dispatch,
  onExit,
  onComplete,
}: Props) {
  const role = state.hardRole;
  if (!role) {
    return <RolePicker state={state} dispatch={dispatch} onExit={onExit} />;
  }
  return (
    <RoleRunner
      state={state}
      dispatch={dispatch}
      roleId={role}
      onExitRole={() => dispatch({ type: "HARD_PICK_ROLE", role: null as any })}
      onComplete={onComplete}
    />
  );
}

function RolePicker({
  state,
  dispatch,
  onExit,
}: {
  state: AppState;
  dispatch: (a: AppAction) => void;
  onExit: () => void;
}) {
  return (
    <div className="wrap">
      <div className="hero" style={{ paddingTop: 10 }}>
        <div className="eyebrow">Step 3 · Technical skills</div>
        <h1>Pick the role to benchmark</h1>
        <p className="lead">
          Each role has ~8 short items — multiple-choice, scenarios, and one
          timed — drawn from the sub-competencies hiring managers care about.
        </p>
      </div>

      <div className="module-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
        {ROLES.map((r) => {
          const done = state.hardDone[r.id];
          const started = (state.hardAnswers[r.id] ?? []).some((a) => a != null);
          return (
            <button
              key={r.id}
              className={cn(
                "module-card",
                done && "completed",
                !done && started && "progress"
              )}
              onClick={() => dispatch({ type: "HARD_PICK_ROLE", role: r.id })}
            >
              <div className="module-head">
                <span className="module-icon">{r.icon}</span>
                <span className="module-status">
                  {done ? "✓ Completed" : started ? "In progress" : "Start"}
                </span>
              </div>
              <div className="module-title">{r.title}</div>
              <div className="module-desc">{r.blurb}</div>
              <span className="method-chip">{r.measures.length} sub-skills · ~8 items</span>
              <div className="module-meta">
                {r.competencies.slice(0, 3).join(" · ")}
              </div>
            </button>
          );
        })}
      </div>

      <div className="nav-row">
        <button className="btn secondary" onClick={onExit}>
          ← Back to soft skills
        </button>
      </div>
    </div>
  );
}

function RoleRunner({
  state,
  dispatch,
  roleId,
  onExitRole,
  onComplete,
}: {
  state: AppState;
  dispatch: (a: AppAction) => void;
  roleId: RoleId;
  onExitRole: () => void;
  onComplete: () => void;
}) {
  const role = ROLE_BY_ID[roleId];
  const idx = state.hardIndex;
  const item = role.items[idx];
  const answers = state.hardAnswers[roleId] ?? [];
  const pick = answers[idx] ?? null;
  const total = role.items.length;
  const allDone = role.items.every((_, i) => answers[i] != null);
  const isLast = idx >= total - 1;

  const choose = (i: number) =>
    dispatch({
      type: "HARD_SET",
      role: roleId,
      index: idx,
      pick: i,
    });

  return (
    <div className="wrap narrow">
      <div className="module-shell-head">
        <button className="btn ghost" onClick={onExitRole}>
          ← Other roles
        </button>
        <span className="method-chip">
          {role.title} · {item.type}
        </span>
        <span style={{ marginLeft: "auto", fontSize: 12, color: "var(--text3)" }}>
          Item {idx + 1} of {total}
        </span>
      </div>

      <div className="progress-dots">
        {role.items.map((_, i) => (
          <span
            key={i}
            className={cn(
              "pdot",
              answers[i] != null && "done",
              i === idx && answers[i] == null && "active"
            )}
          />
        ))}
      </div>

      <div className="card module-question">
        <div className="q-prompt">{item.prompt}</div>
        <div className="q-hint">
          Sub-competency: <strong>{item.competency}</strong>
        </div>
        <div className="cog-options">
          {item.options.map((o, i) => (
            <button
              key={i}
              className={cn("cog-option", pick === i && "selected")}
              onClick={() => choose(i)}
              aria-pressed={pick === i}
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
          onClick={() => dispatch({ type: "HARD_INDEX", index: idx - 1 })}
        >
          ← Previous
        </button>
        {isLast ? (
          <button
            className="btn primary"
            disabled={!allDone}
            onClick={() => {
              dispatch({ type: "HARD_COMPLETE", role: roleId });
              onComplete();
            }}
          >
            Finish benchmark →
          </button>
        ) : (
          <button
            className="btn primary"
            disabled={pick == null}
            onClick={() => dispatch({ type: "HARD_INDEX", index: idx + 1 })}
          >
            Next item →
          </button>
        )}
      </div>
    </div>
  );
}
