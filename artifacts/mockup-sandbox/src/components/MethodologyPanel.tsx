// Collapsible methodology disclaimer — shown persistently at the bottom of
// the walkthrough so stakeholders don't mistake illustrative demo scores for
// validated clinical/psychometric output.

import { useState } from "react";

const ENTRIES = [
  {
    dt: "Work personality",
    dd: "Forced-choice ipsative blocks rank Big-Five adjacent statements. Ipsative formats reduce acquiescence bias but make inter-person comparison harder.",
    cite: "See Saville & Holdsworth; Hough et al., 2001.",
  },
  {
    dt: "Interest profile",
    dd: "Holland's RIASEC model via paired comparison. Pairings are illustrative — real scoring requires normed item banks.",
    cite: "See Holland, 1997; Armstrong et al., 2008.",
  },
  {
    dt: "Situational judgment",
    dd: "Weighted-response SJT: each option carries a 1–4 weight reflecting how constructive the behaviour is in context. Real SJTs are developed from SME panels.",
    cite: "See McDaniel et al., 2001, meta-analysis.",
  },
  {
    dt: "Behavioural frequency",
    dd: "4-point self-report Likert. Anchored to frequency (Never → Monthly+) rather than agreement to reduce central-tendency bias.",
    cite: "See Schwarz, 1999.",
  },
  {
    dt: "Cognitive micro-items",
    dd: "Timed items benchmark processing speed × accuracy. Three items is demo-scope; real reasoning tests run 20–40 items for reliability.",
    cite: "For reliability norms see Cattell's CHC framework.",
  },
  {
    dt: "Technical benchmark",
    dd: "MCQ + scenario + timed mix per role. Items are hand-authored examples; not calibrated against hiring-grade cut scores.",
    cite: "Treat scores as directional, not predictive.",
  },
];

export function MethodologyPanel() {
  const [open, setOpen] = useState(false);
  return (
    <div className="wrap narrow">
      <div className="methodology-wrap">
        <button
          className={`methodology-toggle ${open ? "open" : ""}`}
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
        >
          <span>How this is measured (methodology & limits)</span>
          <span className="chev">▾</span>
        </button>
        {open && (
          <div className="methodology-body">
            <dl>
              {ENTRIES.map((e) => (
                <div key={e.dt}>
                  <dt>{e.dt}</dt>
                  <dd>
                    {e.dd}
                    <span className="cite">{e.cite}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </div>
    </div>
  );
}
