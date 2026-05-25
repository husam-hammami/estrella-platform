// TELOS topbar — brand-locked wordmark, voice status pill, mute toggle, cosmic
// streak chip, XP / level chip, and the reset-demo affordance.
//
// The TELOS letters are rendered as individual <span class="logo-char"> so the
// letter "O" can be swapped for the live Rita mascot without disturbing the
// serif baseline.

import { LogoMascot } from "./Mascot";

interface TopBarProps {
  speaking: boolean;
  muted: boolean;
  onToggleMute: () => void;
  streak: number;
  xp: number;
  level: number;
  levelProgress: number; // 0-1
  onReset: () => void;
}

export function TopBar({
  speaking,
  muted,
  onToggleMute,
  streak,
  xp,
  level,
  levelProgress,
  onReset,
}: TopBarProps) {
  return (
    <header className="topbar">
      <div className="logo" aria-label="TELOS">
        <span className="logo-char">T</span>
        <span className="logo-char">E</span>
        <span className="logo-char">L</span>
        <LogoMascot speaking={speaking} />
        <span className="logo-char">S</span>
      </div>

      <div className="row" style={{ gap: 10 }}>
        <div
          className={`voice-pill ${speaking ? "speaking" : ""}`}
          aria-live="polite"
          title={speaking ? "Rita is speaking" : "Rita is ready"}
        >
          <span className={`dot ${speaking ? "" : "blue"}`} />
          {speaking ? "Rita is speaking…" : "Rita is ready"}
        </div>

        <button
          className="mute-btn"
          onClick={onToggleMute}
          aria-pressed={muted}
          title={muted ? "Unmute Rita" : "Mute Rita"}
        >
          {muted ? "🔇 Muted" : "🔊 Voice"}
        </button>

        <div className="streak" title={`${streak}-day cosmic streak`}>
          <span className="streak-stars" aria-hidden="true">
            {Array.from({ length: 7 }).map((_, i) => (
              <span key={i} className="streak-star" />
            ))}
          </span>
          <span className="streak-count">{streak}</span>
          <span>day streak</span>
        </div>

        <div
          className="xp-chip"
          title={`Level ${level} · ${xp} XP earned`}
        >
          <span className="xp-level">L{level}</span>
          <span style={{ fontSize: 11, color: "var(--text2)" }}>
            {xp} XP
          </span>
          <span className="xp-bar" aria-hidden="true">
            <span
              className="xp-bar-fill"
              style={{ width: `${Math.round(levelProgress * 100)}%` }}
            />
          </span>
        </div>

        <button
          className="reset-link"
          onClick={onReset}
          title="Wipe all local demo state and start over"
        >
          Reset demo
        </button>
      </div>
    </header>
  );
}
