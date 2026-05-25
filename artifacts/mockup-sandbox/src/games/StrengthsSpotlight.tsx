// Mini-game 2 — Strengths Spotlight. Pick 5 words that describe you best.
// Purely reflective; the picks are stored for later in-line on the roadmap.

import { useState } from "react";
import { STRENGTH_WORDS } from "@/lib/data";
import { cn } from "@/lib/utils";

interface Props {
  onComplete: (picks: string[]) => void;
  onClose: () => void;
}

export function StrengthsSpotlightGame({ onComplete, onClose }: Props) {
  const [picks, setPicks] = useState<string[]>([]);
  const toggle = (w: string) => {
    if (picks.includes(w)) setPicks(picks.filter((p) => p !== w));
    else if (picks.length < 5) setPicks([...picks, w]);
  };
  return (
    <div className="wrap narrow">
      <div className="module-shell-head">
        <button className="btn ghost" onClick={onClose}>
          ← Back
        </button>
        <span className="method-chip">Mini-game · Strengths Spotlight</span>
      </div>
      <div className="card game-card">
        <h2 style={{ fontFamily: "var(--font-serif)" }}>Pick 5 words that describe you</h2>
        <p className="sub-text">
          Picking is constraining — five forces priorities. Limit is the point.
        </p>

        <div className="value-pool" style={{ marginTop: 18 }}>
          {STRENGTH_WORDS.map((w) => {
            const on = picks.includes(w);
            return (
              <button
                key={w}
                className={cn("value-chip", on && "selected")}
                style={on ? { borderColor: "var(--blue)", background: "rgba(59,130,246,0.18)", color: "var(--text)" } : undefined}
                onClick={() => toggle(w)}
              >
                {w}
              </button>
            );
          })}
        </div>

        <div style={{ textAlign: "center", marginTop: 12, fontSize: 12, color: "var(--text3)" }}>
          {picks.length}/5 selected
        </div>

        <div className="nav-row" style={{ marginTop: 14 }}>
          <button className="btn secondary" onClick={() => setPicks([])}>
            Clear
          </button>
          <button
            className="btn primary"
            disabled={picks.length !== 5}
            onClick={() => onComplete(picks)}
          >
            Save these strengths →
          </button>
        </div>
      </div>
    </div>
  );
}
