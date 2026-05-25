// Stage 5 — Tailored career roadmap.
// Reads welcome.learningStyle + hardRole to choose the doc pack, and
// synthesises 4 milestones that sequence foundation → application → visibility.

import { useEffect } from "react";
import {
  DOC_PACKS,
  ROLE_BY_ID,
  LearningStyle,
  DocResource,
  RoleId,
} from "@/lib/data";
import { AppAction, AppState } from "@/lib/state";

interface Props {
  state: AppState;
  dispatch: (a: AppAction) => void;
  onRestart: () => void;
  onSpeak: (text: string) => void;
}

interface Milestone {
  when: string;
  tag: string;
  title: string;
  desc: string;
}

function buildMilestones(
  name: string,
  role: RoleId,
  style: LearningStyle
): Milestone[] {
  const roleTitle = ROLE_BY_ID[role].title;
  return [
    {
      when: "Weeks 1–2",
      tag: "Foundation",
      title: `Pick one anchor resource for ${roleTitle}`,
      desc: `${name || "You"}: choose a single ${style} resource from the pack below and schedule 45 min / day. The commitment matters more than the total time.`,
    },
    {
      when: "Weeks 3–6",
      tag: "Build",
      title: "Ship one public project end-to-end",
      desc: "Scope it small on purpose. A tiny public artifact beats a half-finished monster. Write the README last — you'll know what the project actually is by then.",
    },
    {
      when: "Weeks 7–10",
      tag: "Application",
      title: "Run two informational interviews",
      desc: "Ask people one step ahead of you how they decide what to learn next. Bring one specific question. Offer to share what you built.",
    },
    {
      when: "Weeks 11–12",
      tag: "Visibility",
      title: "Publish, then re-assess with TELOS",
      desc: "Write one short post, submit one open-source issue, or give one internal lightning talk. Come back to TELOS — your radar will look different.",
    },
  ];
}

export function RoadmapStage({
  state,
  dispatch,
  onRestart,
  onSpeak,
}: Props) {
  const name = state.welcome.name;
  const role = (state.hardRole ?? "frontend") as RoleId;
  const style = (state.welcome.learningStyle || "hands-on") as LearningStyle;
  const pack = DOC_PACKS[role][style] ?? DOC_PACKS[role]["hands-on"];
  const milestones = buildMilestones(name, role, style);

  useEffect(() => {
    const first = name ? `${name.split(" ")[0]}, ` : "";
    onSpeak(
      `${first}here's a 12-week roadmap tailored to ${ROLE_BY_ID[role].title} and a ${style} learning style. Four milestones. One resource pack. Come back and re-run TELOS when you finish week 12 — we'll compare.`
    );
    dispatch({ type: "XP_ADD", amount: 60 });
    dispatch({ type: "BADGE_EARN", id: "integrator" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="wrap narrow">
      <div className="hero" style={{ paddingTop: 4 }}>
        <div className="eyebrow">Step 5 · Your roadmap</div>
        <h1>12 weeks to {ROLE_BY_ID[role].title}</h1>
        <p className="lead">
          Four milestones. Foundation → build → application → visibility. Tuned
          for your{" "}
          <strong>{style}</strong> learning style.
        </p>
      </div>

      <div className="milestone-list">
        {milestones.map((m, i) => (
          <div key={i} className="milestone">
            <span className="milestone-pin">{i + 1}</span>
            <div>
              <div className="milestone-meta">
                <span>{m.when}</span>
                <span className="milestone-tag">{m.tag}</span>
              </div>
              <h4>{m.title}</h4>
              <p>{m.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 style={{ fontFamily: "var(--font-serif)", marginTop: 36, marginBottom: 4 }}>
        Your {style} resource pack
      </h2>
      <p className="sub-text" style={{ marginBottom: 16 }}>
        Free, curated, publicly available. Start with the first item.
      </p>

      <div className="doc-grid">
        {pack.map((r: DocResource) => (
          <a
            key={r.url}
            className="doc-card"
            href={r.url}
            target="_blank"
            rel="noreferrer"
          >
            <div className="doc-title">{r.title}</div>
            <div className="doc-meta">
              {r.provider} · {r.format}
            </div>
            <div className="doc-tags">
              <span className="doc-tag">{r.format}</span>
              <span className="doc-tag">{style}</span>
            </div>
            <p style={{ fontSize: 12, color: "var(--text2)", marginTop: 8, lineHeight: 1.6 }}>
              {r.why}
            </p>
          </a>
        ))}
      </div>

      <div className="nav-row" style={{ marginTop: 28 }}>
        <button className="btn secondary" onClick={onRestart}>
          Reset demo
        </button>
        <button
          className="btn primary"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Back to top ↑
        </button>
      </div>
    </div>
  );
}
