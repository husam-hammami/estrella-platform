// Mini-game 1 — Values Sort. Drag-free version: click a value, click a podium
// slot to place it. Clear rule: pick your top 3 values; earns the "values-sort"
// badge and 40 XP once committed.

import { useState } from "react";
import { WORK_VALUES } from "@/lib/data";
import { cn } from "@/lib/utils";

interface Props {
  onComplete: (top3: string[]) => void;
  onClose: () => void;
}

export function ValuesSortGame({ onComplete, onClose }: Props) {
  const [podium, setPodium] = useState<Array<string | null>>([null, null, null]);
  const [selected, setSelected] = useState<string | null>(null);

  const used = new Set(podium.filter(Boolean) as string[]);
  const done = podium.every(Boolean);

  const pickValue = (v: string) => {
    if (used.has(v)) return;
    setSelected(v);
    // Auto-place in first empty slot if one is selected.
    const idx = podium.findIndex((p) => p == null);
    if (idx !== -1) {
      const next = [...podium];
      next[idx] = v;
      setPodium(next);
      setSelected(null);
    }
  };

  const clearSlot = (i: number) => {
    const next = [...podium];
    next[i] = null;
    setPodium(next);
  };

  return (
    <div className="wrap narrow">
      <div className="module-shell-head">
        <button className="btn ghost" onClick={onClose}>
          ← Back
        </button>
        <span className="method-chip">Mini-game · Values Sort</span>
      </div>
      <div className="card game-card">
        <h2 style={{ fontFamily: "var(--font-serif)" }}>Pick your top 3 values</h2>
        <p className="sub-text">
          Your top three — not what sounds right, what actually pulls you. This
          locally shapes the milestones on your roadmap.
        </p>

        <div className="podium">
          {podium.map((v, i) => (
            <div
              key={i}
              className={cn("podium-slot", v && "filled")}
              onClick={() => v && clearSlot(i)}
              title={v ? "Click to clear" : `#${i + 1}`}
              style={{ height: 110 - i * 10 }}
            >
              {v ?? `#${i + 1}`}
            </div>
          ))}
        </div>

        <div className="value-pool" style={{ marginTop: 18 }}>
          {WORK_VALUES.map((v) => (
            <button
              key={v}
              className={cn(
                "value-chip",
                used.has(v) && "used",
                selected === v && "selected"
              )}
              onClick={() => pickValue(v)}
              disabled={used.has(v)}
            >
              {v}
            </button>
          ))}
        </div>

        <div className="nav-row" style={{ marginTop: 20 }}>
          <button
            className="btn secondary"
            onClick={() => setPodium([null, null, null])}
            disabled={podium.every((p) => p == null)}
          >
            Reset
          </button>
          <button
            className="btn primary"
            disabled={!done}
            onClick={() => onComplete(podium as string[])}
          >
            Lock it in →
          </button>
        </div>
      </div>
    </div>
  );
}
