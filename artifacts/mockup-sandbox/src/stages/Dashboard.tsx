// Stage 2 shell — soft-skill module picker + eventual "generate results" CTA.
//
// Four clickable module cards. Each card shows status (pending / in progress /
// completed) and a method chip so the methodology is front-and-centre.

import { SoftModuleId } from "@/lib/state";
import { cn } from "@/lib/utils";

interface Props {
  name: string;
  softDone: Record<SoftModuleId, boolean>;
  softProgress: Record<SoftModuleId, number>; // 0-1
  onOpenModule: (id: SoftModuleId) => void;
  onGenerate: () => void;
  canGenerate: boolean;
}

interface ModuleMeta {
  id: SoftModuleId;
  title: string;
  desc: string;
  method: string;
  icon: string;
  accent: string;
  duration: string;
}

const MODULES: ModuleMeta[] = [
  {
    id: "personality",
    title: "Work personality",
    desc: "Forced-choice Big-Five blocks. Pick what feels most and least like you — the ipsative format cuts through social-desirability bias.",
    method: "Forced-choice ipsative · Big 5",
    icon: "◆",
    accent: "var(--accent-personality)",
    duration: "5 blocks · ~3 min",
  },
  {
    id: "interests",
    title: "Interest profile",
    desc: "Paired comparisons across Holland's RIASEC types reveal which work environments energise you vs. drain you.",
    method: "Holland RIASEC · paired comparison",
    icon: "✦",
    accent: "var(--accent-interests)",
    duration: "10 pairs · ~2 min",
  },
  {
    id: "judgment",
    title: "Judgment & behaviour",
    desc: "Situational judgment scenarios plus a short behavioural-frequency check for how you actually respond under pressure.",
    method: "SJT + behavioural frequency",
    icon: "✸",
    accent: "var(--accent-judgment)",
    duration: "3 scenarios + 4 freq · ~4 min",
  },
  {
    id: "cognitive",
    title: "Reasoning",
    desc: "Three timed micro-items — pattern, logic, and numeric — to benchmark processing speed alongside accuracy.",
    method: "Timed micro-reasoning",
    icon: "◉",
    accent: "var(--accent-cognitive)",
    duration: "3 items · 30–45s each",
  },
];

export function SoftDashboard({
  name,
  softDone,
  softProgress,
  onOpenModule,
  onGenerate,
  canGenerate,
}: Props) {
  const doneCount = Object.values(softDone).filter(Boolean).length;
  return (
    <div className="wrap narrow">
      <div className="hero" style={{ paddingTop: 10 }}>
        <div className="eyebrow">Step 2 · Soft skills</div>
        <h1>
          {name ? `${name}, ` : ""}let's look at how you work
        </h1>
        <p className="lead">
          Four short, validated assessment methods. Go in any order — your
          answers save as you go, so stepping away is fine.
        </p>
      </div>

      <div className="module-grid">
        {MODULES.map((m) => {
          const done = softDone[m.id];
          const progress = softProgress[m.id] ?? 0;
          const inProgress = !done && progress > 0;
          return (
            <button
              key={m.id}
              className={cn(
                "module-card",
                done && "completed",
                inProgress && "progress"
              )}
              onClick={() => onOpenModule(m.id)}
              style={{ borderTop: `2px solid ${m.accent}` }}
            >
              <div className="module-head">
                <span className="module-icon" style={{ color: m.accent }}>
                  {m.icon}
                </span>
                <span className="module-status">
                  {done ? "✓ Completed" : inProgress ? "In progress" : "Start"}
                </span>
              </div>
              <div className="module-title">{m.title}</div>
              <div className="module-desc">{m.desc}</div>
              <span className="method-chip">{m.method}</span>
              <div className="module-meta">
                <span>{m.duration}</span>
                {inProgress && (
                  <span>· {Math.round(progress * 100)}% done</span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <div className="generate-cta">
        <p className="completion-summary">
          {doneCount}/4 modules complete.{" "}
          {canGenerate
            ? "You're ready — generate your profile whenever you're ready."
            : "Finish the remaining modules to unlock your combined profile."}
        </p>
        <button
          className="btn primary"
          disabled={!canGenerate}
          onClick={onGenerate}
        >
          Continue to technical skills →
        </button>
      </div>
    </div>
  );
}
