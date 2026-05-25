// Renders the badge collection. Locked badges are dimmed; earned badges
// glow. Sits next to the mini-game launchpad on the soft-skills dashboard.

import { BADGES } from "@/lib/data";
import { cn } from "@/lib/utils";

interface Props {
  earnedIds: string[];
}

export function BadgeTray({ earnedIds }: Props) {
  return (
    <div className="card" style={{ marginTop: 16 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 10,
        }}
      >
        <div>
          <div
            style={{
              fontSize: 11,
              letterSpacing: 1.5,
              textTransform: "uppercase",
              color: "var(--text3)",
            }}
          >
            Cosmic badges
          </div>
          <div
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: 18,
              color: "var(--text)",
            }}
          >
            {earnedIds.length}/{BADGES.length} earned
          </div>
        </div>
      </div>
      <div className="badge-tray">
        {BADGES.map((b) => {
          const earned = earnedIds.includes(b.id);
          return (
            <div key={b.id} className={cn("badge", earned && "earned")} title={b.desc}>
              <span className="badge-icon">{b.icon}</span>
              <div className="badge-title">{b.title}</div>
              <div className="badge-desc">{b.desc}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
