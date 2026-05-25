// Stage 4 — Combined Skill Level.
// Five viz cards + the TELOS Index banner. Rita reads the top-line summary
// on mount (unless muted) so voice + visuals land together.

import { useEffect, useMemo, useRef } from "react";
import {
  TRAIT_LABELS,
  RIASEC_LABELS,
  ROLE_BY_ID,
} from "@/lib/data";
import {
  scorePersonality,
  scoreInterests,
  scoreJudgment,
  scoreCognitive,
  scoreHard,
  telosIndex,
} from "@/lib/scoring";
import { AppAction, AppState } from "@/lib/state";

interface Props {
  state: AppState;
  dispatch: (a: AppAction) => void;
  onContinue: () => void;
  onSpeak: (text: string) => void;
}

export function CombinedStage({
  state,
  dispatch,
  onContinue,
  onSpeak,
}: Props) {
  const p = useMemo(() => scorePersonality(state.forcedChoice), [state.forcedChoice]);
  const i = useMemo(() => scoreInterests(state.riasec as any), [state.riasec]);
  const j = useMemo(() => scoreJudgment(state.sjt, state.freq), [state.sjt, state.freq]);
  const c = useMemo(() => scoreCognitive(state.cog), [state.cog]);
  const h = useMemo(
    () => (state.hardRole ? scoreHard(state.hardRole, state.hardAnswers[state.hardRole] ?? []) : null),
    [state.hardRole, state.hardAnswers]
  );
  const idx = useMemo(() => telosIndex(p, i, j, c, h), [p, i, j, c, h]);
  const readoutRan = useRef(false);

  useEffect(() => {
    if (readoutRan.current) return;
    readoutRan.current = true;
    const name = state.welcome.name.split(" ")[0] || "";
    const holland = i.holland.map((x) => RIASEC_LABELS[x]).join(", ");
    const first = name
      ? `${name}, here's your TELOS profile. Your index is ${idx.value}, which lands in the ${idx.band} band.`
      : `Here's your TELOS profile. Your index is ${idx.value}, which lands in the ${idx.band} band.`;
    const readout = `${first} Your dominant personality signal is ${TRAIT_LABELS[p.dominant]}, your Holland code starts with ${holland}, and your reasoning score is ${c.score} out of 100. Scroll through the cards to see the full breakdown.`;
    onSpeak(readout);
    // One-off XP + badge bump for generating the combined profile.
    dispatch({ type: "XP_ADD", amount: 80 });
    dispatch({ type: "BADGE_EARN", id: "profile-generated" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="wrap">
      <div className="hero" style={{ paddingTop: 4 }}>
        <div className="eyebrow">Step 4 · Your combined profile</div>
        <h1>TELOS profile — {state.welcome.name || "you"}</h1>
        <p className="lead">
          Six surfaces, one picture. Every card lists the methodology and the
          items that contributed so you can pressure-test the result.
        </p>
      </div>

      {/* TELOS Index banner */}
      <div className="telos-index">
        <div className="telos-index-num count-up">{idx.value}</div>
        <div className="telos-index-band">{idx.band}</div>
        <div className="telos-index-desc">{idx.desc}</div>
      </div>

      <div className="results-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}>
        <PersonalityCard scores={p.scores} dominant={p.dominant} />
        <InterestsCard scores={i.scores} holland={i.holland} />
        <JudgmentCard lines={j.lines} combined={j.combined} />
        <CognitiveCard score={c.score} correct={c.correct} total={c.total} band={c.band} />
        {h && state.hardRole && (
          <HardCard
            roleTitle={ROLE_BY_ID[state.hardRole].title}
            overall={h.overall}
            competencies={h.competencies}
          />
        )}
        <ProfileSummary
          personalityDominant={p.dominant}
          holland={i.holland}
          name={state.welcome.name}
          learningStyle={state.welcome.learningStyle}
          goals={state.welcome.goals}
        />
      </div>

      <div className="nav-row" style={{ marginTop: 24 }}>
        <span />
        <button className="btn primary" onClick={onContinue}>
          Build my career roadmap →
        </button>
      </div>
    </div>
  );
}

/* ================== viz cards ================== */

function PersonalityCard({
  scores,
  dominant,
}: {
  scores: Record<string, number>;
  dominant: string;
}) {
  // Build radar with 5 axes
  const axes = ["O", "C", "E", "A", "ES"] as const;
  const size = 240;
  const cx = size / 2;
  const cy = size / 2;
  const radius = 90;
  const points = axes.map((t, i) => {
    const angle = (Math.PI * 2 * i) / axes.length - Math.PI / 2;
    const r = (scores[t] / 100) * radius;
    return {
      x: cx + Math.cos(angle) * r,
      y: cy + Math.sin(angle) * r,
      lx: cx + Math.cos(angle) * (radius + 18),
      ly: cy + Math.sin(angle) * (radius + 18),
      label: TRAIT_LABELS[t as keyof typeof TRAIT_LABELS],
    };
  });
  const polygon = points.map((p) => `${p.x},${p.y}`).join(" ");
  const outerPoly = axes
    .map((_, i) => {
      const angle = (Math.PI * 2 * i) / axes.length - Math.PI / 2;
      return `${cx + Math.cos(angle) * radius},${cy + Math.sin(angle) * radius}`;
    })
    .join(" ");

  return (
    <div className="viz-card">
      <h3>Work personality</h3>
      <span className="method-chip">Forced-choice Big 5</span>
      <div className="viz-body">
        <svg className="radar-svg" viewBox={`0 0 ${size} ${size}`}>
          <polygon className="chart-outer" points={outerPoly} />
          {axes.map((_, i) => {
            const angle = (Math.PI * 2 * i) / axes.length - Math.PI / 2;
            return (
              <line
                key={i}
                className="chart-axis"
                x1={cx}
                y1={cy}
                x2={cx + Math.cos(angle) * radius}
                y2={cy + Math.sin(angle) * radius}
              />
            );
          })}
          <polygon className="chart-data draw-on" points={polygon} />
          {points.map((pt, i) => (
            <g key={i}>
              <circle className="chart-point" cx={pt.x} cy={pt.y} r={3} />
              <text
                className="chart-label"
                x={pt.lx}
                y={pt.ly}
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {pt.label.slice(0, 8)}
              </text>
            </g>
          ))}
        </svg>
        <div style={{ fontSize: 12, color: "var(--text2)", marginTop: 6 }}>
          Dominant signal: <strong style={{ color: "var(--text)" }}>
            {TRAIT_LABELS[dominant as keyof typeof TRAIT_LABELS]}
          </strong>
        </div>
      </div>
    </div>
  );
}

function InterestsCard({
  scores,
  holland,
}: {
  scores: Record<string, number>;
  holland: [string, string, string];
}) {
  const axes = ["R", "I", "A", "S", "E", "C"] as const;
  const size = 240;
  const cx = size / 2;
  const cy = size / 2;
  const radius = 90;
  const points = axes.map((k, i) => {
    const angle = (Math.PI * 2 * i) / axes.length - Math.PI / 2;
    const r = (scores[k] / 100) * radius;
    return {
      x: cx + Math.cos(angle) * r,
      y: cy + Math.sin(angle) * r,
      lx: cx + Math.cos(angle) * (radius + 16),
      ly: cy + Math.sin(angle) * (radius + 16),
      label: k,
    };
  });
  const polygon = points.map((p) => `${p.x},${p.y}`).join(" ");
  const outerPoly = axes
    .map((_, i) => {
      const angle = (Math.PI * 2 * i) / axes.length - Math.PI / 2;
      return `${cx + Math.cos(angle) * radius},${cy + Math.sin(angle) * radius}`;
    })
    .join(" ");
  return (
    <div className="viz-card">
      <h3>Interest profile</h3>
      <span className="method-chip">RIASEC hexagon</span>
      <div className="viz-body">
        <svg className="hex-svg" viewBox={`0 0 ${size} ${size}`}>
          <polygon className="chart-outer" points={outerPoly} />
          {axes.map((_, i) => {
            const angle = (Math.PI * 2 * i) / axes.length - Math.PI / 2;
            return (
              <line
                key={i}
                className="chart-axis"
                x1={cx}
                y1={cy}
                x2={cx + Math.cos(angle) * radius}
                y2={cy + Math.sin(angle) * radius}
              />
            );
          })}
          <polygon className="chart-data violet draw-on" points={polygon} />
          {points.map((pt, i) => (
            <g key={i}>
              <circle className="chart-point" cx={pt.x} cy={pt.y} r={3} />
              <text
                className="chart-label strong"
                x={pt.lx}
                y={pt.ly}
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {pt.label}
              </text>
            </g>
          ))}
        </svg>
        <div style={{ fontSize: 12, color: "var(--text2)", marginTop: 6 }}>
          Holland code:{" "}
          <strong style={{ color: "var(--text)" }}>
            {holland.join("")}
          </strong>{" "}
          — {holland.map((k) => RIASEC_LABELS[k as keyof typeof RIASEC_LABELS]).join(", ")}
        </div>
      </div>
    </div>
  );
}

function JudgmentCard({
  lines,
  combined,
}: {
  lines: { label: string; value: number }[];
  combined: number;
}) {
  return (
    <div className="viz-card">
      <h3>Judgment & behaviour</h3>
      <span className="method-chip">SJT + frequency</span>
      <div className="viz-body jbar-wrap">
        {lines.map((l) => (
          <div key={l.label} className="jbar-row">
            <label>
              <span>{l.label}</span>
              <strong>{l.value}</strong>
            </label>
            <div className="jbar-track">
              <span
                className="jbar-fill"
                style={{ width: `${l.value}%` }}
              />
            </div>
          </div>
        ))}
        <ul className="evidence-list">
          <li>Combined judgment index: {combined}/100</li>
          <li>Highest-weighted SJT answers map to constructive, team-first responses.</li>
          <li>Frequency check anchors self-reported behaviour against the scenarios.</li>
        </ul>
      </div>
    </div>
  );
}

function CognitiveCard({
  score,
  correct,
  total,
  band,
}: {
  score: number;
  correct: number;
  total: number;
  band: string;
}) {
  const angle = (score / 100) * 180;
  return (
    <div className="viz-card">
      <h3>Reasoning</h3>
      <span className="method-chip">Timed micro-reasoning</span>
      <div className="viz-body">
        <div className="gauge-wrap">
          <svg viewBox="0 0 180 100" width="180" height="100">
            <path
              d="M 10 100 A 80 80 0 0 1 170 100"
              fill="none"
              stroke="rgba(138,180,255,0.15)"
              strokeWidth="10"
              strokeLinecap="round"
            />
            <path
              d="M 10 100 A 80 80 0 0 1 170 100"
              fill="none"
              stroke="var(--blue2)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray="251.3"
              strokeDashoffset={251.3 - (score / 100) * 251.3}
              style={{ transition: "stroke-dashoffset 1.1s ease" }}
            />
            <circle
              cx={90 + Math.cos((Math.PI * (180 - angle)) / 180) * 80}
              cy={100 - Math.sin((Math.PI * (180 - angle)) / 180) * 80}
              r={5}
              fill="var(--blue)"
            />
          </svg>
        </div>
        <div className="gauge-label">
          <div className="gauge-num count-up">{score}</div>
          <div className="gauge-band">{band}</div>
        </div>
        <div style={{ fontSize: 12, color: "var(--text2)", marginTop: 8, textAlign: "center" }}>
          {correct}/{total} correct · speed bonus included
        </div>
      </div>
    </div>
  );
}

function HardCard({
  roleTitle,
  overall,
  competencies,
}: {
  roleTitle: string;
  overall: number;
  competencies: { label: string; value: number; correct: number; total: number }[];
}) {
  return (
    <div className="viz-card">
      <h3>{roleTitle} · technical bench</h3>
      <span className="method-chip">MCQ + scenario + timed</span>
      <div className="viz-body">
        <div style={{ textAlign: "center", marginBottom: 8 }}>
          <div className="gauge-num count-up">{overall}</div>
          <div className="gauge-band">overall</div>
        </div>
        <div className="tech-bars">
          {competencies.map((c) => (
            <div key={c.label} className="tech-bar-row">
              <label>{c.label}</label>
              <div className="tech-bar-track">
                <span
                  className="tech-bar-fill"
                  style={{ width: `${c.value}%` }}
                />
              </div>
              <span style={{ fontSize: 12, color: "var(--text2)" }}>
                {c.correct}/{c.total}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProfileSummary({
  personalityDominant,
  holland,
  name,
  learningStyle,
  goals,
}: {
  personalityDominant: string;
  holland: [string, string, string];
  name: string;
  learningStyle: string;
  goals: string[];
}) {
  return (
    <div className="viz-card">
      <h3>Profile summary</h3>
      <span className="method-chip">Narrative synthesis</span>
      <div className="viz-body">
        <div className="profile-summary">
          {name ? <strong>{name}</strong> : "You"} pattern as{" "}
          <strong>{TRAIT_LABELS[personalityDominant as keyof typeof TRAIT_LABELS]}</strong>-dominant with a
          Holland code of{" "}
          <strong>{holland.join("")}</strong> (
          {holland.map((k) => RIASEC_LABELS[k as keyof typeof RIASEC_LABELS]).join(", ")}).
          Learning tuned for{" "}
          <strong>{learningStyle || "mixed"}</strong> mode.
          {goals.length > 0 && (
            <>
              {" "}
              Stated goals:{" "}
              <strong>{goals.join(", ")}</strong>.
            </>
          )}
        </div>
      </div>
    </div>
  );
}
