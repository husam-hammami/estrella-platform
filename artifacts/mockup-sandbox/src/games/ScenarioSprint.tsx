// Mini-game 3 — Scenario Sprint. 5 rapid-fire situational prompts. The player
// types a 1-line response; they compare to Rita's "good" line afterwards. This
// is reflective, not graded — keep the tone low-stakes.

import { useState } from "react";
import { SPRINT_SCENARIOS } from "@/lib/data";

interface Props {
  onComplete: () => void;
  onClose: () => void;
}

export function ScenarioSprintGame({ onComplete, onClose }: Props) {
  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState("");
  const [answers, setAnswers] = useState<string[]>([]);
  const [reveal, setReveal] = useState(false);

  const total = SPRINT_SCENARIOS.length;
  const sc = SPRINT_SCENARIOS[idx];

  const lockIn = () => {
    const nextAnswers = [...answers, input.trim()];
    setAnswers(nextAnswers);
    setReveal(true);
  };

  const next = () => {
    setInput("");
    setReveal(false);
    if (idx < total - 1) setIdx(idx + 1);
    else onComplete();
  };

  return (
    <div className="wrap narrow">
      <div className="module-shell-head">
        <button className="btn ghost" onClick={onClose}>
          ← Back
        </button>
        <span className="method-chip">Mini-game · Scenario Sprint</span>
        <span style={{ marginLeft: "auto", fontSize: 12, color: "var(--text3)" }}>
          {idx + 1} of {total}
        </span>
      </div>

      <div className="card game-card">
        <div className="sprint-stream">
          <span className="sprint-word">{sc.prompt}</span>
        </div>
        <p className="sub-text">Type one line — first instinct is fine.</p>
        <input
          className="chip-input"
          placeholder="Your move in one line…"
          value={input}
          disabled={reveal}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && input.trim() && !reveal) lockIn();
          }}
        />

        {reveal && (
          <div
            style={{
              marginTop: 16,
              padding: 14,
              borderRadius: "var(--r)",
              background: "rgba(96,165,250,0.08)",
              border: "1px solid rgba(96,165,250,0.25)",
            }}
          >
            <div style={{ fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: "var(--text3)", marginBottom: 6 }}>
              Rita suggests
            </div>
            <div style={{ fontSize: 14, color: "var(--text)" }}>{sc.good}</div>
            <div style={{ fontSize: 12, color: "var(--text2)", marginTop: 8, fontStyle: "italic" }}>
              Yours: "{input || "(blank)"}"
            </div>
          </div>
        )}

        <div className="nav-row" style={{ marginTop: 16 }}>
          <span />
          {!reveal ? (
            <button className="btn primary" disabled={!input.trim()} onClick={lockIn}>
              Lock in →
            </button>
          ) : (
            <button className="btn primary" onClick={next}>
              {idx === total - 1 ? "Finish sprint →" : "Next scenario →"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
