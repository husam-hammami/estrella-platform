// Central app-state types + a single `useAppState` hook that snapshots
// everything to localStorage on change. The Forced-Choice bug in the old
// demo was state-only — so the fix here is structural: one reducer, one
// persistent blob, hydrate-on-mount.

import { useEffect, useMemo, useReducer } from "react";
import { load, save } from "./storage";
import { LearningStyle, RoleId } from "./data";
import { FcAnswer } from "./scoring";
import { todayKey, dayDiff } from "./utils";

export type StageId =
  | "welcome"
  | "dashboard"
  | "soft"
  | "hard"
  | "results"
  | "roadmap";

export type SoftModuleId =
  | "personality"
  | "interests"
  | "judgment"
  | "cognitive";

export interface WelcomeAnswers {
  name: string;
  currentRole: string;
  yearsExp: string;
  learningStyle: LearningStyle | "";
  interestsText: string;
  goals: string[];
}

export interface AppState {
  stage: StageId;
  activeModule: SoftModuleId | null;
  welcome: WelcomeAnswers;
  forcedChoice: FcAnswer[];
  fcIndex: number;
  riasec: Array<string | null>;
  riasecIndex: number;
  sjt: Array<number | null>;
  sjtIndex: number;
  freq: Array<number | null>;
  cog: Array<{ pick: number | null; elapsed: number }>;
  cogIndex: number;
  softDone: Record<SoftModuleId, boolean>;

  hardRole: RoleId | null;
  hardAnswers: Record<string, Array<number | null>>;
  hardIndex: number;
  hardDone: Record<string, boolean>;

  // Gamification
  xp: number;
  level: number;
  streak: number;
  lastVisit: string;
  badgeIds: string[];

  // Settings
  muted: boolean;
  voiceId: "rita" | "coach";

  // Chat
  chat: Array<{
    from: "user" | "rita";
    text: string;
    ts: number;
  }>;
}

const STORAGE_KEY = "app";

const DEFAULT_STATE: AppState = {
  stage: "welcome",
  activeModule: null,
  welcome: {
    name: "",
    currentRole: "",
    yearsExp: "",
    learningStyle: "",
    interestsText: "",
    goals: [],
  },
  forcedChoice: [],
  fcIndex: 0,
  riasec: [],
  riasecIndex: 0,
  sjt: [],
  sjtIndex: 0,
  freq: [],
  cog: [],
  cogIndex: 0,
  softDone: {
    personality: false,
    interests: false,
    judgment: false,
    cognitive: false,
  },
  hardRole: null,
  hardAnswers: {},
  hardIndex: 0,
  hardDone: {},
  xp: 0,
  level: 1,
  streak: 0,
  lastVisit: "",
  badgeIds: [],
  muted: false,
  voiceId: "rita",
  chat: [],
};

export type AppAction =
  | { type: "HYDRATE"; payload: AppState }
  | { type: "SET_STAGE"; stage: StageId }
  | { type: "SET_MODULE"; id: SoftModuleId | null }
  | { type: "WELCOME_UPDATE"; patch: Partial<WelcomeAnswers> }
  | { type: "WELCOME_TOGGLE_GOAL"; goal: string }
  | { type: "FC_SET"; index: number; answer: FcAnswer }
  | { type: "FC_INDEX"; index: number }
  | { type: "RIASEC_SET"; index: number; code: string | null }
  | { type: "RIASEC_INDEX"; index: number }
  | { type: "SJT_SET"; index: number; pick: number | null }
  | { type: "SJT_INDEX"; index: number }
  | { type: "FREQ_SET"; index: number; pick: number | null }
  | { type: "COG_SET"; index: number; answer: { pick: number | null; elapsed: number } }
  | { type: "COG_INDEX"; index: number }
  | { type: "MODULE_COMPLETE"; id: SoftModuleId }
  | { type: "HARD_PICK_ROLE"; role: RoleId }
  | { type: "HARD_SET"; role: RoleId; index: number; pick: number | null }
  | { type: "HARD_INDEX"; index: number }
  | { type: "HARD_COMPLETE"; role: RoleId }
  | { type: "XP_ADD"; amount: number }
  | { type: "BADGE_EARN"; id: string }
  | { type: "STREAK_TICK"; today: string }
  | { type: "TOGGLE_MUTE" }
  | { type: "SET_VOICE"; voice: "rita" | "coach" }
  | { type: "CHAT_PUSH"; from: "user" | "rita"; text: string }
  | { type: "CHAT_CLEAR" }
  | { type: "RESET" };

function xpToLevel(xp: number): number {
  return 1 + Math.floor(xp / 400);
}

function reducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "HYDRATE":
      return action.payload;
    case "SET_STAGE":
      return { ...state, stage: action.stage, activeModule: null };
    case "SET_MODULE":
      return { ...state, activeModule: action.id };
    case "WELCOME_UPDATE":
      return { ...state, welcome: { ...state.welcome, ...action.patch } };
    case "WELCOME_TOGGLE_GOAL": {
      const exists = state.welcome.goals.includes(action.goal);
      const goals = exists
        ? state.welcome.goals.filter((g) => g !== action.goal)
        : [...state.welcome.goals, action.goal];
      return { ...state, welcome: { ...state.welcome, goals } };
    }
    case "FC_SET": {
      const next = [...state.forcedChoice];
      next[action.index] = action.answer;
      return { ...state, forcedChoice: next };
    }
    case "FC_INDEX":
      return { ...state, fcIndex: action.index };
    case "RIASEC_SET": {
      const next = [...state.riasec];
      next[action.index] = action.code;
      return { ...state, riasec: next };
    }
    case "RIASEC_INDEX":
      return { ...state, riasecIndex: action.index };
    case "SJT_SET": {
      const next = [...state.sjt];
      next[action.index] = action.pick;
      return { ...state, sjt: next };
    }
    case "SJT_INDEX":
      return { ...state, sjtIndex: action.index };
    case "FREQ_SET": {
      const next = [...state.freq];
      next[action.index] = action.pick;
      return { ...state, freq: next };
    }
    case "COG_SET": {
      const next = [...state.cog];
      next[action.index] = action.answer;
      return { ...state, cog: next };
    }
    case "COG_INDEX":
      return { ...state, cogIndex: action.index };
    case "MODULE_COMPLETE":
      return {
        ...state,
        softDone: { ...state.softDone, [action.id]: true },
        activeModule: null,
      };
    case "HARD_PICK_ROLE":
      return { ...state, hardRole: action.role, hardIndex: 0 };
    case "HARD_SET": {
      const existing = state.hardAnswers[action.role] ?? [];
      const next = [...existing];
      next[action.index] = action.pick;
      return {
        ...state,
        hardAnswers: { ...state.hardAnswers, [action.role]: next },
      };
    }
    case "HARD_INDEX":
      return { ...state, hardIndex: action.index };
    case "HARD_COMPLETE":
      return {
        ...state,
        hardDone: { ...state.hardDone, [action.role]: true },
      };
    case "XP_ADD": {
      const xp = state.xp + action.amount;
      return { ...state, xp, level: xpToLevel(xp) };
    }
    case "BADGE_EARN": {
      if (state.badgeIds.includes(action.id)) return state;
      return { ...state, badgeIds: [...state.badgeIds, action.id] };
    }
    case "STREAK_TICK": {
      if (state.lastVisit === action.today) return state;
      let streak = state.streak;
      if (!state.lastVisit) {
        streak = 1;
      } else {
        const diff = dayDiff(state.lastVisit, action.today);
        if (diff === 1) streak = state.streak + 1;
        else if (diff > 1) streak = 1;
      }
      return { ...state, streak, lastVisit: action.today };
    }
    case "TOGGLE_MUTE":
      return { ...state, muted: !state.muted };
    case "SET_VOICE":
      return { ...state, voiceId: action.voice };
    case "CHAT_PUSH":
      return {
        ...state,
        chat: [
          ...state.chat,
          { from: action.from, text: action.text, ts: Date.now() },
        ],
      };
    case "CHAT_CLEAR":
      return { ...state, chat: [] };
    case "RESET":
      return { ...DEFAULT_STATE };
    default:
      return state;
  }
}

export function useAppState() {
  const [state, dispatch] = useReducer(reducer, DEFAULT_STATE);

  // Hydrate on mount + tick streak.
  useEffect(() => {
    const stored = load<AppState | null>(STORAGE_KEY, null);
    if (stored) {
      // Shallow-merge defaults in for forward compatibility.
      dispatch({ type: "HYDRATE", payload: { ...DEFAULT_STATE, ...stored } });
    }
    dispatch({ type: "STREAK_TICK", today: todayKey() });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist every state change.
  useEffect(() => {
    save(STORAGE_KEY, state);
  }, [state]);

  const levelProgress = useMemo(() => {
    const floor = (state.level - 1) * 400;
    return Math.min(1, (state.xp - floor) / 400);
  }, [state.xp, state.level]);

  return { state, dispatch, levelProgress };
}
