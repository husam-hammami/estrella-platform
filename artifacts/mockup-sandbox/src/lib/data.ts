// ============================================================
//  TELOS demo data banks. All items are illustrative, not normed.
//  Every surface that displays these should keep the methodology
//  disclaimer visible so stakeholders don't treat scores as clinical.
// ============================================================

/* ---------- Welcome / chip inputs ---------- */

export const YEARS_OPTIONS = [
  "< 1 year",
  "1–2 years",
  "3–5 years",
  "6–10 years",
  "10+ years",
];

export const LEARNING_STYLES = [
  { id: "visual", label: "Visual", hint: "Diagrams, videos, worked examples" },
  { id: "reading", label: "Reading", hint: "Docs, books, long-form writing" },
  { id: "hands-on", label: "Hands-on", hint: "Build first, read later" },
  { id: "social", label: "Social", hint: "Learn with a group or a coach" },
] as const;

export type LearningStyle = (typeof LEARNING_STYLES)[number]["id"];

export const CURRENT_ROLE_SUGGESTIONS = [
  "Student",
  "Junior developer",
  "Mid-level IC",
  "Senior IC",
  "Team lead",
  "Manager",
  "Career switcher",
];

/* ---------- 1. Forced-Choice Big 5 (O, C, E, A, ES) ---------- */

export type Trait = "O" | "C" | "E" | "A" | "ES";

export interface ForcedChoiceItem {
  text: string;
  trait: Trait;
  sign: 1 | -1;
}
export interface ForcedChoiceBlock {
  items: ForcedChoiceItem[];
}

export const FORCED_CHOICE_BLOCKS: ForcedChoiceBlock[] = [
  {
    items: [
      { text: "I notice patterns others miss", trait: "O", sign: +1 },
      { text: "I double-check my work before moving on", trait: "C", sign: +1 },
      { text: "I need quiet time to recharge", trait: "E", sign: -1 },
      { text: "I stay calm when plans suddenly change", trait: "ES", sign: +1 },
    ],
  },
  {
    items: [
      { text: "I enjoy starting conversations with strangers", trait: "E", sign: +1 },
      { text: "I prioritise harmony over being right", trait: "A", sign: +1 },
      { text: "I like trying unconventional approaches", trait: "O", sign: +1 },
      { text: "I follow through on every commitment I make", trait: "C", sign: +1 },
    ],
  },
  {
    items: [
      { text: "I stay steady when things go wrong", trait: "ES", sign: +1 },
      { text: "I consider other people's feelings first", trait: "A", sign: +1 },
      { text: "I organise my time with clear structure", trait: "C", sign: +1 },
      { text: "I get energised by brainstorming with groups", trait: "E", sign: +1 },
    ],
  },
  {
    items: [
      { text: "I'm drawn to abstract ideas and theories", trait: "O", sign: +1 },
      { text: "I worry about things that might go wrong", trait: "ES", sign: -1 },
      { text: "I accept criticism without feeling defensive", trait: "A", sign: +1 },
      { text: "I prefer sticking to proven methods", trait: "O", sign: -1 },
    ],
  },
  {
    items: [
      { text: "I speak up even when others disagree", trait: "A", sign: -1 },
      { text: "I finish tasks ahead of deadline", trait: "C", sign: +1 },
      { text: "I feel comfortable being the centre of attention", trait: "E", sign: +1 },
      { text: "I bounce back quickly from setbacks", trait: "ES", sign: +1 },
    ],
  },
];

export const TRAIT_LABELS: Record<Trait, string> = {
  O: "Openness",
  C: "Conscientiousness",
  E: "Extraversion",
  A: "Agreeableness",
  ES: "Emotional Stability",
};

/* ---------- 2. RIASEC pairs ---------- */

export type RiasecCode = "R" | "I" | "A" | "S" | "E" | "C";

export interface RiasecSide {
  text: string;
  code: RiasecCode;
  icon: string;
}
export interface RiasecPair {
  a: RiasecSide;
  b: RiasecSide;
}

export const RIASEC_PAIRS: RiasecPair[] = [
  { a: { text: "Debug a data pipeline", code: "I", icon: "🔍" }, b: { text: "Facilitate a team workshop", code: "S", icon: "👥" } },
  { a: { text: "Design a brand identity", code: "A", icon: "🎨" }, b: { text: "Negotiate a vendor contract", code: "E", icon: "🤝" } },
  { a: { text: "Build a spreadsheet model", code: "C", icon: "📊" }, b: { text: "Repair physical equipment", code: "R", icon: "🔧" } },
  { a: { text: "Lead a cross-functional pitch", code: "E", icon: "🎯" }, b: { text: "Research market trends deeply", code: "I", icon: "📚" } },
  { a: { text: "Mentor a junior colleague", code: "S", icon: "🤲" }, b: { text: "Write a strategic policy", code: "C", icon: "📝" } },
  { a: { text: "Sketch a new product concept", code: "A", icon: "✏️" }, b: { text: "Install and test hardware", code: "R", icon: "🛠" } },
  { a: { text: "Analyse a failure report", code: "I", icon: "🧪" }, b: { text: "Coach someone through stress", code: "S", icon: "💬" } },
  { a: { text: "Run a client presentation", code: "E", icon: "🎤" }, b: { text: "Produce creative campaign content", code: "A", icon: "🎬" } },
  { a: { text: "Organise a structured schedule", code: "C", icon: "🗓" }, b: { text: "Lead a public-speaking session", code: "E", icon: "📣" } },
  { a: { text: "Fix an operational bottleneck", code: "R", icon: "⚙️" }, b: { text: "Interview stakeholders for insight", code: "I", icon: "🎙" } },
];

export const RIASEC_LABELS: Record<RiasecCode, string> = {
  R: "Realistic",
  I: "Investigative",
  A: "Artistic",
  S: "Social",
  E: "Enterprising",
  C: "Conventional",
};

/* ---------- 3. SJT + Behavioural frequency ---------- */

export interface SjtOption { text: string; w: 1 | 2 | 3 | 4 }
export interface SjtScenario { prompt: string; options: SjtOption[] }

export const SJT_SCENARIOS: SjtScenario[] = [
  {
    prompt:
      "A team member keeps missing deliverables. Another colleague just complained about them in a public channel. What do you do FIRST?",
    options: [
      { text: "Reply in the public channel explaining the context", w: 2 },
      { text: "Talk to the underperformer privately the same day", w: 4 },
      { text: "Escalate immediately to HR", w: 1 },
      { text: "Ignore it; address everything in the next weekly 1:1", w: 2 },
    ],
  },
  {
    prompt:
      "Your manager hands you a project where the goals conflict with another team's priorities. You have 24 hours before kickoff. What's the best first move?",
    options: [
      { text: "Start executing; sort the conflict if it actually surfaces", w: 1 },
      { text: "Schedule a short alignment call with both stakeholders tonight", w: 4 },
      { text: "Email your manager asking them to resolve it", w: 2 },
      { text: "Work only on the parts that don't overlap", w: 2 },
    ],
  },
  {
    prompt:
      "You discover a mistake in a report you sent to a senior leader last week. It didn't change the conclusion but numbers were wrong. You:",
    options: [
      { text: "Flag it proactively with a corrected version today", w: 4 },
      { text: "Wait — it didn't change the outcome", w: 1 },
      { text: "Mention it informally next time you see them", w: 2 },
      { text: "Fix it quietly in the shared file without telling them", w: 2 },
    ],
  },
];

export const FREQUENCY_ITEMS = [
  { text: "In the last 3 months, how often have you given direct feedback to someone when it might feel uncomfortable?" },
  { text: "In the last 3 months, how often have you led a meeting where you had to make a decision others disagreed with?" },
  { text: "In the last 3 months, how often have you proactively asked for feedback on your own performance?" },
];

export const FREQ_ANCHORS = ["Never", "Once", "2–3 times", "Monthly or more"];

/* ---------- 4. Cognitive timed items ---------- */

export interface CognitiveItem {
  type: string;
  prompt: string;
  options: string[];
  correct: number;
  /** Seconds allowed before the item auto-locks as "no answer". */
  timeLimit: number;
}

export const COGNITIVE_ITEMS: CognitiveItem[] = [
  {
    type: "Verbal analogy",
    prompt: "PENCIL is to WRITE as SCISSORS is to ___",
    options: ["Paper", "Cut", "Sharp", "Handle"],
    correct: 1,
    timeLimit: 30,
  },
  {
    type: "Number series",
    prompt: "2, 6, 12, 20, 30, ___",
    options: ["36", "40", "42", "44"],
    correct: 2,
    timeLimit: 40,
  },
  {
    type: "Logical deduction",
    prompt:
      "All certified engineers in this team attended the training. Maria did not attend the training. What must be true?",
    options: [
      "Maria is not an engineer",
      "Maria is not a certified engineer in this team",
      "Maria works elsewhere",
      "Cannot be determined",
    ],
    correct: 1,
    timeLimit: 45,
  },
];

/* ---------- 5. Hard / technical role banks ---------- */

export type RoleId =
  | "frontend"
  | "backend"
  | "data-analyst"
  | "data-scientist"
  | "devops"
  | "pm"
  | "ux"
  | "qa"
  | "cyber"
  | "project-manager";

export interface TechItem {
  type: "MCQ" | "Scenario" | "Timed";
  prompt: string;
  options: string[];
  correct: number;
  /** Sub-competency this item belongs to (used by the bar chart). */
  competency: string;
}

export interface Role {
  id: RoleId;
  title: string;
  icon: string;
  blurb: string;
  measures: string[];
  competencies: string[];
  items: TechItem[];
}

// ----- Role bank (each role ≈8 items). Marked illustrative for the demo.

export const ROLES: Role[] = [
  {
    id: "frontend",
    title: "Frontend Engineer",
    icon: "🖥",
    blurb: "Builds the web UIs users actually touch.",
    measures: [
      "Component design & state",
      "Accessibility fundamentals",
      "Performance & runtime behaviour",
      "Layout & responsive patterns",
    ],
    competencies: ["HTML/CSS", "JavaScript", "React/state", "Accessibility", "Performance"],
    items: [
      {
        type: "MCQ",
        prompt: "Which CSS property most directly controls horizontal stacking of flex children?",
        options: ["align-items", "flex-direction", "justify-content", "gap"],
        correct: 2,
        competency: "HTML/CSS",
      },
      {
        type: "MCQ",
        prompt: "A React component re-renders on every parent update. What usually prevents unnecessary renders?",
        options: ["useEffect", "React.memo with stable props", "useRef", "forwardRef"],
        correct: 1,
        competency: "React/state",
      },
      {
        type: "Scenario",
        prompt:
          "A button triggers a modal. A screen-reader user reports they can tab past the modal and interact with the page behind it. What should you do first?",
        options: [
          "Add aria-label to the button",
          "Trap focus inside the modal and manage initial focus",
          "Increase the z-index of the modal",
          "Disable the tabindex of body content via CSS",
        ],
        correct: 1,
        competency: "Accessibility",
      },
      {
        type: "MCQ",
        prompt: "Which network-tab signal most strongly suggests an unoptimised hero image?",
        options: [
          "Short TTFB",
          "Large transferred size with low image dimensions",
          "HTTP/2 multiplexing",
          "200 OK response",
        ],
        correct: 1,
        competency: "Performance",
      },
      {
        type: "Scenario",
        prompt:
          "Users on slow connections see layout shift when a late-loading banner appears. Cheapest lasting fix?",
        options: [
          "Preload the banner script",
          "Reserve space with CSS (aspect-ratio or min-height)",
          "Increase server-side caching",
          "Add a loading spinner",
        ],
        correct: 1,
        competency: "Performance",
      },
      {
        type: "MCQ",
        prompt: "`useEffect(() => fetchX(), [])` runs…",
        options: [
          "On every render",
          "Once after the first commit",
          "Before the first render",
          "Only when state changes",
        ],
        correct: 1,
        competency: "React/state",
      },
      {
        type: "MCQ",
        prompt: "Smallest-bundle way to format a date in the browser?",
        options: [
          "Moment.js",
          "date-fns with tree-shaken imports",
          "Intl.DateTimeFormat (built-in)",
          "A custom regex",
        ],
        correct: 2,
        competency: "JavaScript",
      },
      {
        type: "Timed",
        prompt:
          "30s: A form with 5 inputs re-renders on every keystroke in any field. Fastest path to stop other fields re-rendering?",
        options: [
          "Wrap each field in React.memo + hoist only its own state",
          "Throttle the onChange handlers",
          "Use useReducer with a single state object",
          "Switch to class components",
        ],
        correct: 0,
        competency: "React/state",
      },
    ],
  },
  {
    id: "backend",
    title: "Backend Engineer",
    icon: "🗄",
    blurb: "Designs the services, data, and APIs that power the product.",
    measures: ["API design", "Database & queries", "Concurrency & correctness", "Debugging under load"],
    competencies: ["APIs", "Databases", "Concurrency", "Debugging"],
    items: [
      {
        type: "MCQ",
        prompt: "REST verb best suited to an idempotent update of an entire resource?",
        options: ["POST", "PUT", "PATCH", "DELETE"],
        correct: 1,
        competency: "APIs",
      },
      {
        type: "Scenario",
        prompt:
          "A read-heavy endpoint slows down under load. The DB shows many duplicate queries per request. Best first lever?",
        options: ["Add more DB replicas", "Add an application-level cache for the repeated query", "Rewrite in Rust", "Increase connection pool size"],
        correct: 1,
        competency: "Debugging",
      },
      {
        type: "MCQ",
        prompt: "Which index helps `WHERE status = ? ORDER BY created_at DESC` scan efficiently?",
        options: ["B-tree on status", "B-tree on created_at", "Composite index (status, created_at DESC)", "Hash index on status"],
        correct: 2,
        competency: "Databases",
      },
      {
        type: "MCQ",
        prompt: "Two writers update the same row concurrently without a transaction. What's the classic failure mode?",
        options: ["Lost update", "Phantom read", "Dirty read", "Cache miss"],
        correct: 0,
        competency: "Concurrency",
      },
      {
        type: "Scenario",
        prompt:
          "A customer reports an intermittent 500 with no stack trace in logs. What do you do first?",
        options: [
          "Deploy a rollback",
          "Add structured logging around the suspect code path and reproduce",
          "Rewrite the handler",
          "Ask the customer to retry",
        ],
        correct: 1,
        competency: "Debugging",
      },
      {
        type: "MCQ",
        prompt: "Safest way to paginate a large growing table when users need stable ordering?",
        options: ["OFFSET/LIMIT", "Keyset (cursor) pagination on a monotonic key", "Random sampling", "LIMIT without ORDER BY"],
        correct: 1,
        competency: "Databases",
      },
      {
        type: "MCQ",
        prompt: "Which pattern decouples a slow step (email send) from the HTTP response?",
        options: ["Synchronous retry", "Background job queue", "Database trigger", "Stored procedure"],
        correct: 1,
        competency: "APIs",
      },
      {
        type: "Timed",
        prompt: "30s: A distributed cache returns stale data 1% of the time. Highest-leverage mitigation without rearchitecting?",
        options: ["Shorten TTL", "Add a single-flight lock around cache refill", "Increase replicas", "Use a larger instance"],
        correct: 1,
        competency: "Concurrency",
      },
    ],
  },
  {
    id: "data-analyst",
    title: "Data Analyst",
    icon: "📈",
    blurb: "Turns raw data into answers a business can act on.",
    measures: ["SQL fluency", "Visual clarity", "Stat literacy", "Stakeholder translation"],
    competencies: ["SQL", "Visualisation", "Statistics", "Comms"],
    items: [
      {
        type: "MCQ",
        prompt: "Which SQL returns the 2nd highest salary per department?",
        options: [
          "SELECT MAX(salary) FROM emp GROUP BY dept;",
          "SELECT DISTINCT salary FROM emp ORDER BY salary DESC LIMIT 2;",
          "Use DENSE_RANK() OVER (PARTITION BY dept ORDER BY salary DESC) = 2;",
          "SELECT salary FROM emp WHERE salary = 2;",
        ],
        correct: 2,
        competency: "SQL",
      },
      {
        type: "MCQ",
        prompt: "Best chart for proportions of a whole across ≤5 categories?",
        options: ["Line chart", "Pie or 100% stacked bar", "Scatterplot", "Heatmap"],
        correct: 1,
        competency: "Visualisation",
      },
      {
        type: "Scenario",
        prompt:
          "Conversion is down 2% week-over-week. Before escalating, what's the right next step?",
        options: [
          "Check for a seasonal effect or composition change in traffic",
          "Tell sales to push harder",
          "Pause all marketing",
          "Run a significance test",
        ],
        correct: 0,
        competency: "Comms",
      },
      {
        type: "MCQ",
        prompt: "Median is more robust than the mean to…",
        options: ["Missing data", "Outliers / skew", "Small sample size", "Nonlinear transforms"],
        correct: 1,
        competency: "Statistics",
      },
      {
        type: "MCQ",
        prompt: "What does `GROUP BY` do when combined with `HAVING`?",
        options: [
          "Filters rows before grouping",
          "Filters groups after aggregation",
          "Sorts the output",
          "Renames columns",
        ],
        correct: 1,
        competency: "SQL",
      },
      {
        type: "Scenario",
        prompt:
          "A stakeholder asks 'is this A/B test result real?' Best quick answer?",
        options: [
          "Yes, the blue line is higher",
          "Show the p-value, effect size, and confidence interval",
          "Tell them to run it longer",
          "Defer to the data scientist",
        ],
        correct: 1,
        competency: "Statistics",
      },
      {
        type: "MCQ",
        prompt: "Preferred axis choice when values span many orders of magnitude?",
        options: ["Linear", "Log scale", "Percentile", "Reversed"],
        correct: 1,
        competency: "Visualisation",
      },
      {
        type: "Timed",
        prompt: "30s: Which clause would you add to a query to avoid counting the same user twice across events?",
        options: ["COUNT(*)", "COUNT(DISTINCT user_id)", "SUM(user_id)", "GROUP BY event"],
        correct: 1,
        competency: "SQL",
      },
    ],
  },
  {
    id: "data-scientist",
    title: "Data Scientist",
    icon: "🧠",
    blurb: "Builds models, experiments, and evidence-grade analysis.",
    measures: ["Modeling choices", "Experimentation", "Validation", "Communicating uncertainty"],
    competencies: ["Modeling", "Experimentation", "Validation", "Comms"],
    items: [
      {
        type: "MCQ",
        prompt: "Which is most likely to overfit a small, high-dimensional dataset?",
        options: ["Regularised logistic regression", "A very deep decision tree with no max-depth", "k-NN with k=20", "Linear SVM"],
        correct: 1,
        competency: "Modeling",
      },
      {
        type: "MCQ",
        prompt: "Why split train / validation / test rather than train / test?",
        options: [
          "Required by scikit-learn",
          "To get an honest held-out score after tuning on validation",
          "To use more data",
          "To speed up training",
        ],
        correct: 1,
        competency: "Validation",
      },
      {
        type: "Scenario",
        prompt:
          "A binary classifier has 99% accuracy but the positive class is 1% of data. What should you report?",
        options: ["Accuracy is fine", "Precision, recall, and PR-AUC; not accuracy", "Error rate", "F-test"],
        correct: 1,
        competency: "Validation",
      },
      {
        type: "MCQ",
        prompt: "In an A/B test, the 'power' of a test is:",
        options: [
          "Probability of a type I error",
          "Probability of detecting a real effect when it exists",
          "Sample size divided by variance",
          "Significance level",
        ],
        correct: 1,
        competency: "Experimentation",
      },
      {
        type: "MCQ",
        prompt: "You ran a feature with p=0.049, n=140. Most responsible next step?",
        options: [
          "Ship it",
          "Reproduce the effect in a fresh sample before shipping",
          "Lower α to 0.01 and re-evaluate the same data",
          "Publish the result",
        ],
        correct: 1,
        competency: "Experimentation",
      },
      {
        type: "Scenario",
        prompt:
          "A PM asks 'will this model boost revenue?'. Your model has high lift offline. Best answer?",
        options: [
          "Yes, ship it",
          "Offline lift is suggestive; the question is online uplift — propose a geo-holdout or A/B",
          "No, too risky",
          "Lower the threshold",
        ],
        correct: 1,
        competency: "Comms",
      },
      {
        type: "MCQ",
        prompt: "Most likely cause of train-test mismatch in a time-series model?",
        options: ["Lookahead bias from using future data in features", "Too much regularisation", "Small batch size", "Using Adam optimiser"],
        correct: 0,
        competency: "Modeling",
      },
      {
        type: "Timed",
        prompt:
          "30s: Features correlated with outcome at r=0.92 show trivial lift in prediction. Most likely reason?",
        options: [
          "Target leakage — the feature is a proxy for the label",
          "Model is underfitting",
          "Need more data",
          "Wrong loss function",
        ],
        correct: 0,
        competency: "Validation",
      },
    ],
  },
  {
    id: "devops",
    title: "DevOps / SRE",
    icon: "🛠",
    blurb: "Keeps systems reliable, observable, and deployable.",
    measures: ["Infrastructure", "Reliability", "Incident response", "Automation"],
    competencies: ["Infra", "Reliability", "Observability", "Automation"],
    items: [
      {
        type: "MCQ",
        prompt: "Blue/green deployments primarily mitigate risk from…",
        options: ["Hardware failure", "Bad deploys — enables instant rollback", "Traffic spikes", "Long compile times"],
        correct: 1,
        competency: "Infra",
      },
      {
        type: "MCQ",
        prompt: "A P99 latency SLO is breached but the P50 is fine. First investigation step?",
        options: [
          "Scale up everything",
          "Look at tail behaviour: locks, GC pauses, cold starts, single slow dependency",
          "Add caching",
          "Rewrite the service",
        ],
        correct: 1,
        competency: "Reliability",
      },
      {
        type: "MCQ",
        prompt: "Key distinction between logging and tracing?",
        options: [
          "Tracing follows a request across services; logs are per-event",
          "Logs are cheaper",
          "They're the same thing",
          "Tracing replaces metrics",
        ],
        correct: 0,
        competency: "Observability",
      },
      {
        type: "Scenario",
        prompt:
          "A prod incident starts at 3am. You're primary oncall. What's the correct first move?",
        options: [
          "Start fixing the root cause",
          "Acknowledge the page, open an incident channel, declare severity",
          "Wake the whole team",
          "Wait for business hours",
        ],
        correct: 1,
        competency: "Reliability",
      },
      {
        type: "MCQ",
        prompt: "Which is NOT a SLI by itself?",
        options: ["Request rate", "Error rate", "Latency p95", "Customer satisfaction score"],
        correct: 3,
        competency: "Observability",
      },
      {
        type: "MCQ",
        prompt: "IaC tool best known for declarative, cloud-agnostic resource management?",
        options: ["Bash scripts", "Ansible", "Terraform", "make"],
        correct: 2,
        competency: "Automation",
      },
      {
        type: "Scenario",
        prompt:
          "A deploy causes 5% errors across all regions. What do you do first?",
        options: [
          "Investigate the bug in code",
          "Roll back the deploy immediately, investigate afterwards",
          "Deploy a hot-fix",
          "Alert the CEO",
        ],
        correct: 1,
        competency: "Reliability",
      },
      {
        type: "Timed",
        prompt: "30s: A container restarts in a loop with 'OOMKilled'. Most likely fix path?",
        options: [
          "Increase memory limit / profile for leaks",
          "Increase CPU limit",
          "Add more replicas",
          "Disable health checks",
        ],
        correct: 0,
        competency: "Infra",
      },
    ],
  },
  {
    id: "pm",
    title: "Product Manager",
    icon: "🧭",
    blurb: "Decides what's worth building and why.",
    measures: ["Prioritisation", "Discovery", "Measurement", "Communication"],
    competencies: ["Prioritisation", "Discovery", "Measurement", "Comms"],
    items: [
      {
        type: "MCQ",
        prompt: "'Jobs to be done' frames features around…",
        options: ["Personas", "The progress a user is trying to make", "Engineering effort", "Competitor parity"],
        correct: 1,
        competency: "Discovery",
      },
      {
        type: "Scenario",
        prompt:
          "Your biggest customer demands a feature that benefits only them. Engineering estimates 3 months. Best response?",
        options: [
          "Build it — they're the biggest customer",
          "Say no flatly",
          "Dig into the underlying job, look for scalable alternatives, then negotiate",
          "Escalate to the CEO",
        ],
        correct: 2,
        competency: "Prioritisation",
      },
      {
        type: "MCQ",
        prompt: "RICE stands for…",
        options: ["Reach, Impact, Confidence, Effort", "Revenue, Innovation, Cost, Effect", "Research, Ideate, Critique, Evaluate", "None of these"],
        correct: 0,
        competency: "Prioritisation",
      },
      {
        type: "MCQ",
        prompt: "Leading vs lagging indicator — which is leading?",
        options: ["MRR", "Trial-to-paid conversion rate", "Annual churn", "Customer lifetime value"],
        correct: 1,
        competency: "Measurement",
      },
      {
        type: "Scenario",
        prompt: "An engineer pushes back on a tight deadline with legitimate concerns. Best PM response?",
        options: [
          "Override and insist on the date",
          "Understand the concern, explore scope cuts with them, and align on tradeoffs",
          "Ask another engineer",
          "Accept the slip silently",
        ],
        correct: 1,
        competency: "Comms",
      },
      {
        type: "MCQ",
        prompt: "Best output of a discovery interview is usually…",
        options: ["A feature request list", "A prioritised backlog", "Specific quotes and observed behaviours", "A persona"],
        correct: 2,
        competency: "Discovery",
      },
      {
        type: "MCQ",
        prompt: "You're writing a product spec. What belongs UP TOP?",
        options: ["Implementation details", "The problem, the user, and the success metric", "Gantt chart", "Team names"],
        correct: 1,
        competency: "Comms",
      },
      {
        type: "Timed",
        prompt: "30s: NPS rose from 30 → 40 this quarter. What's the most responsible thing to report?",
        options: [
          "Celebrate — we're a 40!",
          "Note the change, check sample size and composition, and look for correlated drivers",
          "Hide it until next quarter",
          "Blame or credit marketing",
        ],
        correct: 1,
        competency: "Measurement",
      },
    ],
  },
  {
    id: "ux",
    title: "UX Designer",
    icon: "🎨",
    blurb: "Makes complex products feel inevitable.",
    measures: ["Research", "Interaction design", "Accessibility", "Critique"],
    competencies: ["Research", "Interaction", "Accessibility", "Critique"],
    items: [
      {
        type: "MCQ",
        prompt: "Fitts's Law predicts that target acquisition time depends on…",
        options: ["Colour", "Distance to target and size of target", "Font weight", "Animation duration"],
        correct: 1,
        competency: "Interaction",
      },
      {
        type: "Scenario",
        prompt: "A user says 'the button is in the wrong place'. Best follow-up?",
        options: [
          "Move the button",
          "Ask what they were trying to do when they noticed",
          "Show them the other button",
          "Add a tooltip",
        ],
        correct: 1,
        competency: "Research",
      },
      {
        type: "MCQ",
        prompt: "Minimum WCAG AA contrast ratio for normal body text?",
        options: ["2:1", "3:1", "4.5:1", "7:1"],
        correct: 2,
        competency: "Accessibility",
      },
      {
        type: "MCQ",
        prompt: "Which reduces dropout most in a sign-up flow?",
        options: [
          "More fields upfront so we know the user",
          "Delaying non-essential fields and showing progress",
          "A single long page",
          "Adding testimonials",
        ],
        correct: 1,
        competency: "Interaction",
      },
      {
        type: "Scenario",
        prompt: "A review says your mockup has 'too much going on'. Best first move?",
        options: [
          "Defend the density",
          "Identify the primary action per view and trim the rest",
          "Add more whitespace everywhere",
          "Change the colours",
        ],
        correct: 1,
        competency: "Critique",
      },
      {
        type: "MCQ",
        prompt: "Which is a generative research method (not evaluative)?",
        options: ["Usability test", "Contextual inquiry / field study", "Tree test", "5-second test"],
        correct: 1,
        competency: "Research",
      },
      {
        type: "MCQ",
        prompt: "You find a lovely pattern that fails on mobile. Best call?",
        options: ["Ship desktop-only", "Redesign for the smallest viable target first", "Ignore mobile", "Use a modal"],
        correct: 1,
        competency: "Interaction",
      },
      {
        type: "Timed",
        prompt:
          "30s: A dashboard shows 9 KPIs with equal weight. Users never drill in. Best simplification?",
        options: [
          "Add more KPIs",
          "Designate a hero metric and demote the rest to a secondary view",
          "Change colour palette",
          "Add a carousel",
        ],
        correct: 1,
        competency: "Critique",
      },
    ],
  },
  {
    id: "qa",
    title: "QA Engineer",
    icon: "🧪",
    blurb: "Finds what breaks before customers do.",
    measures: ["Test design", "Automation", "Risk focus", "Bug clarity"],
    competencies: ["Test design", "Automation", "Risk", "Reporting"],
    items: [
      {
        type: "MCQ",
        prompt: "Equivalence partitioning aims to…",
        options: ["Run every possible input", "Group inputs that behave the same, test one per group", "Test only boundaries", "Automate everything"],
        correct: 1,
        competency: "Test design",
      },
      {
        type: "MCQ",
        prompt: "Most common risk when tests live only in the UI layer?",
        options: ["Slow and flaky", "Too accurate", "Too many false negatives", "Untestable"],
        correct: 0,
        competency: "Automation",
      },
      {
        type: "Scenario",
        prompt: "A feature fails intermittently in CI but not locally. First move?",
        options: [
          "Mark the test as flaky",
          "Log CI env state, reproduce locally with same data/timing, isolate race condition",
          "Retry until green",
          "Skip the test",
        ],
        correct: 1,
        competency: "Risk",
      },
      {
        type: "MCQ",
        prompt: "The 'testing pyramid' suggests most tests should be…",
        options: ["End-to-end UI", "Unit tests", "Manual exploratory", "Performance tests"],
        correct: 1,
        competency: "Test design",
      },
      {
        type: "MCQ",
        prompt: "A bug report that's hardest to action lacks…",
        options: ["A screenshot", "Expected vs actual and reproduction steps", "A severity", "The reporter's name"],
        correct: 1,
        competency: "Reporting",
      },
      {
        type: "Scenario",
        prompt: "You're asked to 'test everything' before a release. How to respond?",
        options: [
          "Try to test everything",
          "Propose a risk-based plan: highest-impact paths first, explicit trade-offs",
          "Automate everything overnight",
          "Postpone the release",
        ],
        correct: 1,
        competency: "Risk",
      },
      {
        type: "MCQ",
        prompt: "Boundary value of an input field that accepts 1–100?",
        options: ["50, 51", "0, 1, 100, 101", "Any positive number", "-1 only"],
        correct: 1,
        competency: "Test design",
      },
      {
        type: "Timed",
        prompt: "30s: A nightly suite takes 4 hours. Highest-leverage lever?",
        options: [
          "Delete slow tests",
          "Parallelise independent suites and prune duplication",
          "Add more VMs forever",
          "Run weekly instead",
        ],
        correct: 1,
        competency: "Automation",
      },
    ],
  },
  {
    id: "cyber",
    title: "Cybersecurity Analyst",
    icon: "🛡",
    blurb: "Defends systems, people, and data.",
    measures: ["Threat modeling", "Detection", "Access control", "Incident handling"],
    competencies: ["Threat modeling", "Detection", "AuthN/Z", "Response"],
    items: [
      {
        type: "MCQ",
        prompt: "OWASP Top 10 item most commonly behind credential-stuffing incidents?",
        options: ["SQL injection", "Broken authentication", "XSS", "Security misconfiguration"],
        correct: 1,
        competency: "AuthN/Z",
      },
      {
        type: "MCQ",
        prompt: "Principle of least privilege means…",
        options: [
          "Grant admin by default",
          "Give each actor only the permissions strictly needed for their task",
          "Share credentials to keep things moving",
          "Grant permissions by team, not individual",
        ],
        correct: 1,
        competency: "AuthN/Z",
      },
      {
        type: "Scenario",
        prompt: "You see 10k failed logins for one user from many IPs overnight. First move?",
        options: [
          "Delete the account",
          "Rate-limit / lockout the account, alert the user, review for takeover indicators",
          "Ignore if none succeeded",
          "Email the SOC lead and wait",
        ],
        correct: 1,
        competency: "Detection",
      },
      {
        type: "MCQ",
        prompt: "STRIDE is a mnemonic for…",
        options: ["Threat categories (Spoofing, Tampering, Repudiation, Info disclosure, DoS, Elevation)", "Phases of response", "Encryption modes", "Audit steps"],
        correct: 0,
        competency: "Threat modeling",
      },
      {
        type: "MCQ",
        prompt: "Which control best reduces phishing success rates?",
        options: ["Longer passwords", "Hardware-based MFA / WebAuthn", "Perimeter firewall", "Password hints"],
        correct: 1,
        competency: "AuthN/Z",
      },
      {
        type: "Scenario",
        prompt: "Incident declared. You've contained the attacker. What's the next step before eradication?",
        options: ["Rebuild production", "Preserve forensic evidence & scope the blast radius", "Send public statement", "Delete logs"],
        correct: 1,
        competency: "Response",
      },
      {
        type: "MCQ",
        prompt: "Zero Trust at its core asserts…",
        options: ["VPN makes things safe", "Never trust the network; verify every request on every hop", "Only trust IP allowlists", "All access requires paperwork"],
        correct: 1,
        competency: "Threat modeling",
      },
      {
        type: "Timed",
        prompt: "30s: An alert says 'unusual outbound traffic from DB server'. Most valuable first datum?",
        options: ["CPU usage", "Destination IP + process identity", "Memory usage", "DB version"],
        correct: 1,
        competency: "Detection",
      },
    ],
  },
  {
    id: "project-manager",
    title: "Project Manager",
    icon: "🗂",
    blurb: "Moves outcomes across teams, time, and constraints.",
    measures: ["Planning", "Risk management", "Stakeholder comms", "Execution"],
    competencies: ["Planning", "Risk", "Comms", "Execution"],
    items: [
      {
        type: "MCQ",
        prompt: "Critical path in a project schedule is…",
        options: [
          "The most expensive tasks",
          "The longest dependency chain — any delay moves the end date",
          "The tasks assigned to your best engineer",
          "Tasks with external blockers",
        ],
        correct: 1,
        competency: "Planning",
      },
      {
        type: "Scenario",
        prompt: "Two workstreams will collide in three weeks. Best move today?",
        options: [
          "Wait and see",
          "Surface the collision with both leads now, align on sequencing or scope",
          "Push one group's timeline",
          "Reorg the teams",
        ],
        correct: 1,
        competency: "Risk",
      },
      {
        type: "MCQ",
        prompt: "A RACI matrix disambiguates…",
        options: ["Budget allocation", "Who is Responsible, Accountable, Consulted, Informed per task", "Sprint velocity", "Requirements changes"],
        correct: 1,
        competency: "Comms",
      },
      {
        type: "MCQ",
        prompt: "Best status update for an exec sponsor is typically…",
        options: ["A full task list", "Headline on-track/at-risk + top 3 risks + ask", "Team Slack digest", "A Gantt chart screenshot"],
        correct: 1,
        competency: "Comms",
      },
      {
        type: "Scenario",
        prompt: "A scope addition lands halfway through. Right first response?",
        options: [
          "Say yes and figure it out",
          "Say no flatly",
          "Clarify impact on date, cost, and quality — bring an explicit trade to the sponsor",
          "Build it in a hidden sprint",
        ],
        correct: 2,
        competency: "Execution",
      },
      {
        type: "MCQ",
        prompt: "A risk register should at minimum capture…",
        options: ["Risk, likelihood, impact, mitigation owner", "Risk and hope", "Only critical risks", "Status colour only"],
        correct: 0,
        competency: "Risk",
      },
      {
        type: "MCQ",
        prompt: "Burn-up vs burn-down chart — which better reflects mid-project scope growth?",
        options: ["Burn-down", "Burn-up", "Neither", "Both equally"],
        correct: 1,
        competency: "Execution",
      },
      {
        type: "Timed",
        prompt: "30s: Vendor slips a milestone by 2 weeks. First action?",
        options: [
          "Terminate the contract",
          "Re-baseline the plan, identify critical-path impact, negotiate recovery plan",
          "Lower the scope silently",
          "Hide it from sponsor",
        ],
        correct: 1,
        competency: "Planning",
      },
    ],
  },
];

export const ROLE_BY_ID: Record<RoleId, Role> = Object.fromEntries(
  ROLES.map((r) => [r.id, r])
) as Record<RoleId, Role>;

/* ---------- 6. Values (Values Sort game) ---------- */

export const WORK_VALUES = [
  "Impact",
  "Autonomy",
  "Mastery",
  "Stability",
  "Compensation",
  "Learning",
  "Belonging",
  "Recognition",
  "Creativity",
  "Service",
  "Work-life balance",
  "Growth",
];

/* ---------- 7. Strengths (Strengths Spotlight game) ---------- */

export const STRENGTH_WORDS = [
  "Analytical",
  "Empathetic",
  "Decisive",
  "Patient",
  "Curious",
  "Persistent",
  "Strategic",
  "Communicative",
  "Adaptable",
  "Collaborative",
  "Organised",
  "Creative",
  "Principled",
  "Driven",
  "Reliable",
  "Mentoring",
];

/* ---------- 8. Scenario Sprint (short, SJT-style) ---------- */

export const SPRINT_SCENARIOS = [
  { prompt: "Tight deadline. Peer blocked. You:", good: "Offer help if you can unblock in <10 min, else flag it" },
  { prompt: "Ambiguous requirements. You:", good: "Write a one-pager of assumptions and share for correction" },
  { prompt: "Heated meeting. You:", good: "Name the tension, propose a 5-min pause" },
  { prompt: "You don't know the answer. You:", good: "Say so, note it, and commit to a follow-up time" },
  { prompt: "Feedback stings. You:", good: "Ask for a concrete example, thank the giver, sit with it" },
];

/* ---------- 9. Chat library (pre-authored Rita replies) ---------- */

export interface ChatPrompt {
  id: string;
  label: string;
  reply: string;
}

/**
 * Replies are written in an ICF-credentialed coach + senior HR specialist
 * register: open question first, framework-grounded response (GROW / SMART /
 * STAR / OSKAR), clear next step. Kept deliberately concise because they
 * stream token-by-token in the UI.
 */
export const CHAT_LIBRARY: ChatPrompt[] = [
  {
    id: "direction",
    label: "I'm unsure about my career direction",
    reply:
      "I hear you. Before we try to solve it — what would a good next six months look like to you, in one sentence? Using GROW: Goal (that sentence), Reality (what's actually happening right now), Options (what paths are live for you), Will (which one are you most likely to take action on this week). Try step one: draft that goal sentence and bring it back here. Small is fine.",
  },
  {
    id: "transition",
    label: "How do I transition to a new role?",
    reply:
      "Role transitions are rarely about readiness and often about evidence. What role are you aiming at, and what's one artefact that would let a hiring manager see you could already do 60% of it? A side project, a write-up of a past project re-framed for the new role, a talk. Pick one, ship it in two weeks. That single piece of evidence moves more than another month of 'preparing'.",
  },
  {
    id: "salary",
    label: "Help me negotiate my salary",
    reply:
      "Great — negotiation is a skill, not a personality trait. Three questions before tactics: What's the target company's band for this role (levels.fyi / public job posts / a peer)? What's your best alternative if they say no? What's the full package you'd accept (base, equity, sign-on, ramp)? Name those, then we'll work on the opening number and the silence after it.",
  },
  {
    id: "manager-conflict",
    label: "I'm having conflict with my manager",
    reply:
      "That's hard. Let's use STAR to get specific: Situation — one recent incident, not a pattern. Task — what you were trying to do. Action — what you actually did. Result — what happened, including how you felt. Once you can say that cleanly, we can tell if this is a style mismatch, an unspoken expectation, or a boundary issue — and each has a different move.",
  },
  {
    id: "burnout",
    label: "I think I'm burning out",
    reply:
      "Thank you for telling me. Burnout isn't weakness — it's a signal that demand is persistently outstripping recovery. One diagnostic: on a 1–10 scale today, what's your energy, your mood, your sense of control? If any are below 4, the near-term move is rest and reducing load, not more productivity. What's the smallest thing you could drop this week, and who would you need to tell?",
  },
  {
    id: "imposter",
    label: "I struggle with imposter syndrome",
    reply:
      "Very common, especially among people who do hard things. Notice the pattern: 'everyone else knows what they're doing' is almost always a comparison between your inside (doubt) and their outside (polish). Try this: list three pieces of evidence from the last six months that you can do your job. Keep the list. Reread when the feeling visits. Feelings aren't data; outcomes are.",
  },
  {
    id: "learning-recs",
    label: "What should I learn next?",
    reply:
      "Depends on the gap. From your TELOS profile, the roadmap page already lists two or three targeted resources matched to your learning style. Want me to rank them by shortest-to-value, or by depth?",
  },
  {
    id: "perf-review",
    label: "Help me prepare for a performance review",
    reply:
      "Reviews go best when you bring the narrative, not just tasks. OSKAR frame: Outcome (what changed because of your work), Scales (evidence — metrics, quotes, artefacts), Know-how (what you got better at), Affirm (what you're proud of), Review (what you'd do differently). Want to draft the Outcome section together? Bring one project and I'll coach you through it.",
  },
  {
    id: "balance",
    label: "How do I find work-life balance?",
    reply:
      "Balance is rarely a daily equilibrium — it's usually a weekly or monthly one. What do you protect most — sleep, exercise, a relationship, a craft? Name one. Now audit last week: did that thing get the time you say it deserves? Balance is mostly a calendar problem disguised as a values problem. Start with the calendar.",
  },
];

/* ---------- 10. Badges ---------- */

export interface BadgeDef {
  id: string;
  icon: string;
  title: string;
  desc: string;
}

export const BADGES: BadgeDef[] = [
  { id: "first-insight", icon: "✨", title: "First Insight", desc: "Complete your first module" },
  { id: "triangulated", icon: "📐", title: "Triangulated", desc: "Finish all four soft-skill modules" },
  { id: "role-ready", icon: "🎯", title: "Role Ready", desc: "Complete the technical assessment" },
  { id: "reflective", icon: "🪞", title: "Reflective Practitioner", desc: "Chat with Rita three times" },
  { id: "streak-7", icon: "🌠", title: "Streak: 7 Cosmos", desc: "Show up 7 days in a row" },
  { id: "values-sorted", icon: "🏆", title: "Values Sorted", desc: "Complete the Values podium" },
  { id: "quick-thinker", icon: "⚡", title: "Quick Thinker", desc: "Score ≥80 in Scenario Sprint" },
  { id: "integrator", icon: "🧬", title: "Integrator", desc: "Reach the Roadmap stage" },
];

/* ---------- 11. Roadmap: doc packs (role × learning-style) ---------- */

export interface DocResource {
  title: string;
  format: "course" | "doc" | "video" | "book" | "community" | "project";
  provider: string;
  url: string;
  why: string;
}

/** Curated to free/public resources. Ordered roughly shortest-to-value. */
export const DOC_PACKS: Record<RoleId, Record<LearningStyle, DocResource[]>> = {
  frontend: {
    "hands-on": [
      { title: "Build a Tic-Tac-Toe in React", format: "project", provider: "React.dev", url: "https://react.dev/learn/tutorial-tic-tac-toe", why: "Working component model in one sitting." },
      { title: "Frontend Mentor challenges", format: "community", provider: "Frontend Mentor", url: "https://www.frontendmentor.io/challenges", why: "Pixel-accurate builds with a real design spec." },
      { title: "The Odin Project: Full Stack JS", format: "course", provider: "The Odin Project", url: "https://www.theodinproject.com/paths/full-stack-javascript", why: "Project-driven path, free." },
    ],
    visual: [
      { title: "What the heck, z-index??", format: "video", provider: "Josh W Comeau", url: "https://www.joshwcomeau.com/css/stacking-contexts/", why: "Visual mental model of stacking contexts." },
      { title: "CSS Grid: 60-sec masterclass", format: "video", provider: "Jen Simmons (YouTube)", url: "https://www.youtube.com/@jensimmons", why: "Short, visual, authoritative." },
      { title: "React DevTools, shown visually", format: "video", provider: "React.dev", url: "https://react.dev/learn/react-developer-tools", why: "See component trees light up." },
    ],
    reading: [
      { title: "MDN: Learn web development", format: "doc", provider: "MDN Web Docs", url: "https://developer.mozilla.org/en-US/docs/Learn", why: "The reference every frontend dev keeps open." },
      { title: "You Don't Know JS Yet", format: "book", provider: "Kyle Simpson (free online)", url: "https://github.com/getify/You-Dont-Know-JS", why: "Deep JS mental models." },
      { title: "A11y Project checklist", format: "doc", provider: "The A11y Project", url: "https://www.a11yproject.com/checklist/", why: "Scan-friendly accessibility essentials." },
    ],
    social: [
      { title: "Frontend Masters Discord community", format: "community", provider: "Frontend Masters", url: "https://discord.gg/code", why: "Ask real people real questions." },
      { title: "React community events", format: "community", provider: "Meetup.com", url: "https://www.meetup.com/topics/reactjs/", why: "Meet others at your level; ship together." },
      { title: "Study group: freeCodeCamp", format: "course", provider: "freeCodeCamp", url: "https://www.freecodecamp.org/", why: "Thousands learning in the open." },
    ],
  },
  backend: {
    "hands-on": [
      { title: "Build a URL shortener in your stack", format: "project", provider: "Self-paced", url: "https://roadmap.sh/projects/url-shortening-service", why: "DB schema, REST, caching in one project." },
      { title: "Postgres Exercises", format: "project", provider: "pgexercises.com", url: "https://pgexercises.com/", why: "Interactive SQL reps." },
      { title: "Build your own Redis (step-by-step)", format: "project", provider: "Build your own X", url: "https://github.com/codecrafters-io/build-your-own-x", why: "Learn by implementing primitives." },
    ],
    visual: [
      { title: "System Design primer", format: "video", provider: "ByteByteGo (YouTube)", url: "https://www.youtube.com/@ByteByteGo", why: "Visual architecture explainers." },
      { title: "Postgres Explain visualised", format: "video", provider: "Dalibo Visualizer", url: "https://explain.dalibo.com/", why: "See query plans as trees." },
    ],
    reading: [
      { title: "Designing Data-Intensive Applications", format: "book", provider: "Martin Kleppmann", url: "https://dataintensive.net/", why: "Canonical backend reference." },
      { title: "PostgreSQL documentation", format: "doc", provider: "PostgreSQL.org", url: "https://www.postgresql.org/docs/", why: "Authoritative; well-organised." },
      { title: "Google SRE book (free)", format: "book", provider: "Google", url: "https://sre.google/books/", why: "Reliability thinking from first principles." },
    ],
    social: [
      { title: "Postgres Slack community", format: "community", provider: "postgresteam.slack.com", url: "https://postgres-slack.herokuapp.com/", why: "Real DBAs, real questions." },
      { title: "r/ExperiencedDevs", format: "community", provider: "Reddit", url: "https://www.reddit.com/r/ExperiencedDevs/", why: "Career-level backend discussion." },
    ],
  },
  "data-analyst": {
    "hands-on": [
      { title: "Mode SQL tutorial", format: "course", provider: "Mode Analytics", url: "https://mode.com/sql-tutorial/", why: "SQL you can run in-browser." },
      { title: "Kaggle mini-courses", format: "course", provider: "Kaggle", url: "https://www.kaggle.com/learn", why: "Short, project-based." },
    ],
    visual: [
      { title: "The Visual Display of Quantitative Info", format: "book", provider: "Edward Tufte", url: "https://www.edwardtufte.com/tufte/books_vdqi", why: "The charts-as-thinking book." },
      { title: "Storytelling with Data blog", format: "doc", provider: "Cole Nussbaumer Knaflic", url: "https://www.storytellingwithdata.com/blog", why: "Visual before/afters you can steal." },
    ],
    reading: [
      { title: "Think Stats, 2nd ed.", format: "book", provider: "Allen Downey (free PDF)", url: "https://greenteapress.com/thinkstats2/", why: "Stat literacy with code." },
      { title: "Google's Analytics Academy", format: "course", provider: "Google Analytics Academy", url: "https://analytics.google.com/analytics/academy/", why: "Free, structured." },
    ],
    social: [
      { title: "Analytics Engineering Club", format: "community", provider: "dbt Slack", url: "https://www.getdbt.com/community/", why: "Modern analytics practice, active community." },
    ],
  },
  "data-scientist": {
    "hands-on": [
      { title: "fast.ai practical deep learning", format: "course", provider: "fast.ai", url: "https://course.fast.ai/", why: "Build models on day one." },
      { title: "Kaggle competitions (intro tier)", format: "community", provider: "Kaggle", url: "https://www.kaggle.com/competitions", why: "End-to-end ML reps." },
    ],
    visual: [
      { title: "3Blue1Brown: Essence of Linear Algebra", format: "video", provider: "3Blue1Brown (YouTube)", url: "https://www.3blue1brown.com/topics/linear-algebra", why: "Intuition for everything ML rests on." },
      { title: "Distill.pub archive", format: "doc", provider: "Distill", url: "https://distill.pub/", why: "ML concepts as interactive visuals." },
    ],
    reading: [
      { title: "Introduction to Statistical Learning", format: "book", provider: "ISL (free PDF)", url: "https://www.statlearning.com/", why: "Gold-standard ML intro." },
      { title: "scikit-learn user guide", format: "doc", provider: "scikit-learn", url: "https://scikit-learn.org/stable/user_guide.html", why: "Readable, example-rich." },
    ],
    social: [
      { title: "Kaggle forums", format: "community", provider: "Kaggle", url: "https://www.kaggle.com/discussions", why: "Practitioners solving real problems." },
    ],
  },
  devops: {
    "hands-on": [
      { title: "Killercoda scenarios", format: "project", provider: "Killercoda", url: "https://killercoda.com/", why: "Play with real Kubernetes / Linux in-browser." },
      { title: "KodeKloud labs", format: "project", provider: "KodeKloud", url: "https://kodekloud.com/", why: "Hands-on infra practice." },
    ],
    visual: [
      { title: "ByteByteGo: Systems deep dives", format: "video", provider: "ByteByteGo (YouTube)", url: "https://www.youtube.com/@ByteByteGo", why: "Visual explanations of infra primitives." },
    ],
    reading: [
      { title: "Google SRE workbook", format: "book", provider: "Google", url: "https://sre.google/workbook/table-of-contents/", why: "How SREs actually work." },
      { title: "Terraform tutorials", format: "doc", provider: "HashiCorp", url: "https://developer.hashicorp.com/terraform/tutorials", why: "IaC done well." },
    ],
    social: [
      { title: "CNCF Slack", format: "community", provider: "CNCF", url: "https://slack.cncf.io/", why: "Every cloud-native project, one Slack." },
    ],
  },
  pm: {
    "hands-on": [
      { title: "Reforge product essays", format: "doc", provider: "Reforge", url: "https://www.reforge.com/blog", why: "How senior PMs actually think." },
      { title: "Write a one-pager for a feature you care about", format: "project", provider: "Self-paced", url: "https://www.lennysnewsletter.com/p/how-to-write-an-exceptional-product", why: "PM thinking made visible." },
    ],
    visual: [
      { title: "Lenny's Podcast", format: "video", provider: "Lenny Rachitsky (YouTube)", url: "https://www.youtube.com/@LennysPodcast", why: "Conversations with top operators." },
    ],
    reading: [
      { title: "Inspired", format: "book", provider: "Marty Cagan", url: "https://svpg.com/inspired-how-to-create-products-customers-love/", why: "The PM canon." },
      { title: "Continuous Discovery Habits", format: "book", provider: "Teresa Torres", url: "https://www.producttalk.org/book/", why: "Discovery as a habit, not an event." },
    ],
    social: [
      { title: "Mind the Product community", format: "community", provider: "Mind the Product", url: "https://www.mindtheproduct.com/community/", why: "Global PM practitioners." },
    ],
  },
  ux: {
    "hands-on": [
      { title: "Redesign a product you use daily", format: "project", provider: "Self-paced", url: "https://bootcamp.uxdesign.cc/", why: "Portfolio piece with real constraints." },
      { title: "Figma Community files", format: "project", provider: "Figma", url: "https://www.figma.com/community", why: "Remix real files." },
    ],
    visual: [
      { title: "NN/g videos", format: "video", provider: "Nielsen Norman Group (YouTube)", url: "https://www.youtube.com/@NNgroup", why: "Research-backed UX short videos." },
    ],
    reading: [
      { title: "Don't Make Me Think", format: "book", provider: "Steve Krug", url: "https://sensible.com/dont-make-me-think/", why: "Timeless usability primer." },
      { title: "Laws of UX", format: "doc", provider: "Jon Yablonski", url: "https://lawsofux.com/", why: "Heuristics as flashcards." },
    ],
    social: [
      { title: "Designer Hangout Slack", format: "community", provider: "Designer Hangout", url: "https://www.designerhangout.co/", why: "UX professionals, closed community." },
    ],
  },
  qa: {
    "hands-on": [
      { title: "Ministry of Testing challenges", format: "project", provider: "Ministry of Testing", url: "https://www.ministryoftesting.com/", why: "Exploratory testing in the open." },
      { title: "Cypress real-world app", format: "project", provider: "Cypress", url: "https://github.com/cypress-io/cypress-realworld-app", why: "Production-scale test suite to read & extend." },
    ],
    visual: [
      { title: "Testing pyramid visualised", format: "video", provider: "Martin Fowler", url: "https://martinfowler.com/articles/practical-test-pyramid.html", why: "Canonical explanation." },
    ],
    reading: [
      { title: "Explore It!", format: "book", provider: "Elisabeth Hendrickson", url: "https://pragprog.com/titles/ehxta/explore-it/", why: "Exploratory testing done right." },
    ],
    social: [
      { title: "Ministry of Testing community", format: "community", provider: "MoT", url: "https://www.ministryoftesting.com/community", why: "Global QA practitioners." },
    ],
  },
  cyber: {
    "hands-on": [
      { title: "TryHackMe: beginner path", format: "project", provider: "TryHackMe", url: "https://tryhackme.com/path/outline/beginner", why: "Hands-on labs, structured progression." },
      { title: "HackTheBox Starting Point", format: "project", provider: "HackTheBox", url: "https://www.hackthebox.com/starting-point", why: "Guided intro to offensive security." },
    ],
    visual: [
      { title: "NetworkChuck (YouTube)", format: "video", provider: "NetworkChuck", url: "https://www.youtube.com/@NetworkChuck", why: "Approachable visuals, real-world tools." },
    ],
    reading: [
      { title: "OWASP Cheat Sheets", format: "doc", provider: "OWASP", url: "https://cheatsheetseries.owasp.org/", why: "Short, operational security guidance." },
      { title: "The Web Application Hacker's Handbook", format: "book", provider: "Stuttard & Pinto", url: "https://portswigger.net/web-security", why: "Read in tandem with PortSwigger Academy." },
    ],
    social: [
      { title: "r/netsec", format: "community", provider: "Reddit", url: "https://www.reddit.com/r/netsec/", why: "Curated security news & discussion." },
    ],
  },
  "project-manager": {
    "hands-on": [
      { title: "Run a micro-project with clear scope & date", format: "project", provider: "Self-paced", url: "https://www.pmi.org/learning/library", why: "Practice the full PM loop." },
    ],
    visual: [
      { title: "PMI explainer videos", format: "video", provider: "PMI (YouTube)", url: "https://www.youtube.com/@ProjectManagementInstitute", why: "Core concepts in short form." },
    ],
    reading: [
      { title: "Making Things Happen", format: "book", provider: "Scott Berkun", url: "https://scottberkun.com/mth/", why: "PM as a craft, not a checklist." },
      { title: "PMBOK Guide overview (free resources)", format: "doc", provider: "PMI", url: "https://www.pmi.org/pmbok-guide-standards", why: "Reference-grade terminology." },
    ],
    social: [
      { title: "r/projectmanagement", format: "community", provider: "Reddit", url: "https://www.reddit.com/r/projectmanagement/", why: "Practical peer discussion." },
    ],
  },
};
