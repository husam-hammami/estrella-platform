// Scoring helpers for every assessment surface. Mirrors the math used in the
// shipped Telos_demo HTML but rewritten in TS with typed inputs and
// 0-100 normalisation so the results viz can render uniformly.

import {
  FORCED_CHOICE_BLOCKS,
  RIASEC_PAIRS,
  SJT_SCENARIOS,
  COGNITIVE_ITEMS,
  FREQUENCY_ITEMS,
  Trait,
  RiasecCode,
  RoleId,
  ROLE_BY_ID,
  TechItem,
} from "./data";

/* ---------- personality (forced choice) ---------- */

export type FcAnswer = {
  most: number | null;
  least: number | null;
};

export interface PersonalityScore {
  scores: Record<Trait, number>; // 0-100
  dominant: Trait;
}

const TRAITS: Trait[] = ["O", "C", "E", "A", "ES"];

export function scorePersonality(answers: FcAnswer[]): PersonalityScore {
  const raw: Record<Trait, number> = { O: 0, C: 0, E: 0, A: 0, ES: 0 };
  FORCED_CHOICE_BLOCKS.forEach((block, bi) => {
    const ans = answers[bi];
    if (!ans) return;
    if (ans.most != null) {
      const it = block.items[ans.most];
      raw[it.trait] += it.sign * 2;
    }
    if (ans.least != null) {
      const it = block.items[ans.least];
      raw[it.trait] -= it.sign * 2;
    }
  });
  // Normalise into 0-100. Range is roughly [-10, +10] across five blocks.
  const scores = TRAITS.reduce((acc, t) => {
    acc[t] = Math.round(Math.max(0, Math.min(100, 50 + raw[t] * 5)));
    return acc;
  }, {} as Record<Trait, number>);
  const dominant = TRAITS.reduce((best, t) =>
    scores[t] > scores[best] ? t : best
  );
  return { scores, dominant };
}

/* ---------- interests (RIASEC paired comparison) ---------- */

export interface InterestScore {
  scores: Record<RiasecCode, number>; // 0-100
  holland: [RiasecCode, RiasecCode, RiasecCode]; // top-3
}

const RIASEC: RiasecCode[] = ["R", "I", "A", "S", "E", "C"];

export function scoreInterests(picks: Array<RiasecCode | null>): InterestScore {
  const raw: Record<RiasecCode, number> = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
  picks.forEach((code) => {
    if (code) raw[code] += 1;
  });
  const maxPossible = RIASEC_PAIRS.length;
  const scores = RIASEC.reduce((acc, c) => {
    acc[c] = Math.round((raw[c] / maxPossible) * 100);
    return acc;
  }, {} as Record<RiasecCode, number>);
  const sorted = [...RIASEC].sort((a, b) => scores[b] - scores[a]);
  return { scores, holland: [sorted[0], sorted[1], sorted[2]] };
}

/* ---------- judgment (SJT weighted + frequency likert) ---------- */

export interface JudgmentScore {
  sjt: number; // 0-100
  freq: number; // 0-100
  combined: number; // 0-100 (mean)
  lines: { label: string; value: number }[]; // for the bar viz
}

export function scoreJudgment(
  sjtPicks: Array<number | null>,
  freqPicks: Array<number | null>
): JudgmentScore {
  // SJT: each picked option has weight 1-4; normalise to percentage of max.
  let sjtSum = 0;
  let sjtMax = 0;
  SJT_SCENARIOS.forEach((sc, i) => {
    sjtMax += 4;
    const pick = sjtPicks[i];
    if (pick != null) sjtSum += sc.options[pick].w;
  });
  const sjt = Math.round((sjtSum / (sjtMax || 1)) * 100);

  // Frequency: 0-3 → percentage of max.
  let freqSum = 0;
  const freqMax = FREQUENCY_ITEMS.length * 3;
  freqPicks.forEach((p) => {
    if (p != null) freqSum += p;
  });
  const freq = Math.round((freqSum / (freqMax || 1)) * 100);

  return {
    sjt,
    freq,
    combined: Math.round((sjt + freq) / 2),
    lines: [
      { label: "Situational judgment", value: sjt },
      { label: "Self-reported frequency", value: freq },
    ],
  };
}

/* ---------- cognitive (timed) ---------- */

export interface CognitiveScore {
  score: number; // 0-100
  correct: number;
  total: number;
  band: "Developing" | "On pace" | "Strong";
}

export function scoreCognitive(
  answers: Array<{ pick: number | null; elapsed: number }>
): CognitiveScore {
  let correct = 0;
  let weighted = 0;
  COGNITIVE_ITEMS.forEach((item, i) => {
    const a = answers[i];
    if (!a) return;
    const right = a.pick === item.correct;
    if (right) {
      correct += 1;
      // Speed bonus: answer in half the time → +25%
      const ratio = 1 - Math.min(1, a.elapsed / item.timeLimit);
      weighted += 100 + ratio * 25;
    }
  });
  const score = Math.round(weighted / (COGNITIVE_ITEMS.length * 1.25));
  const band: CognitiveScore["band"] =
    score >= 70 ? "Strong" : score >= 45 ? "On pace" : "Developing";
  return { score, correct, total: COGNITIVE_ITEMS.length, band };
}

/* ---------- hard / technical ---------- */

export interface RoleCompetencyScore {
  label: string;
  value: number; // 0-100
  correct: number;
  total: number;
}

export interface HardScore {
  overall: number; // 0-100
  correct: number;
  total: number;
  competencies: RoleCompetencyScore[];
}

export function scoreHard(
  roleId: RoleId,
  answers: Array<number | null>
): HardScore {
  const role = ROLE_BY_ID[roleId];
  const byComp: Record<string, { correct: number; total: number }> = {};
  let correct = 0;
  role.items.forEach((item: TechItem, i: number) => {
    const comp = item.competency;
    if (!byComp[comp]) byComp[comp] = { correct: 0, total: 0 };
    byComp[comp].total += 1;
    const a = answers[i];
    if (a != null && a === item.correct) {
      correct += 1;
      byComp[comp].correct += 1;
    }
  });
  const total = role.items.length;
  const overall = Math.round((correct / (total || 1)) * 100);
  const competencies: RoleCompetencyScore[] = Object.entries(byComp).map(
    ([label, agg]) => ({
      label,
      value: Math.round((agg.correct / (agg.total || 1)) * 100),
      correct: agg.correct,
      total: agg.total,
    })
  );
  return { overall, correct, total, competencies };
}

/* ---------- TELOS Index ---------- */

export interface TelosIndex {
  value: number; // 0-100
  band: "Emerging" | "Developing" | "On pace" | "Strong" | "Exceptional";
  desc: string;
}

export function telosIndex(
  personality: PersonalityScore,
  interests: InterestScore,
  judgment: JudgmentScore,
  cognitive: CognitiveScore,
  hard: HardScore | null
): TelosIndex {
  const traits = (personality.scores.C + personality.scores.ES) / 2;
  const fit =
    Math.max(...Object.values(interests.scores)) +
    (interests.scores[interests.holland[0]] +
      interests.scores[interests.holland[1]]) /
      2;
  const judg = judgment.combined;
  const cog = cognitive.score;
  const hardScore = hard?.overall ?? 55;
  const raw = traits * 0.18 + fit * 0.15 + judg * 0.2 + cog * 0.2 + hardScore * 0.27;
  const value = Math.round(Math.max(0, Math.min(100, raw)));

  let band: TelosIndex["band"] = "Developing";
  let desc = "";
  if (value >= 85) {
    band = "Exceptional";
    desc =
      "You're operating at the top of the distribution for your target role. Prioritise stretch opportunities and visibility — leadership exposure will compound fastest from here.";
  } else if (value >= 70) {
    band = "Strong";
    desc =
      "You have the ingredients for a senior trajectory. The gap between you and the next level is mostly about deliberate practice on the 2–3 weakest areas below.";
  } else if (value >= 55) {
    band = "On pace";
    desc =
      "You're tracking the median for your role. Focused 6–12 week sprints on your top competency gaps will move the needle measurably.";
  } else if (value >= 40) {
    band = "Developing";
    desc =
      "You're building the foundations. The roadmap below sequences foundation → application → visibility so momentum compounds.";
  } else {
    band = "Emerging";
    desc =
      "You're at the start of this path. That's a strength — start with one foundation skill and one visible project, and let everything else wait.";
  }
  return { value, band, desc };
}
