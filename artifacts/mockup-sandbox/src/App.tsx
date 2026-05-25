// Root app orchestrator. Stage router + speech engine + chat/games overlay.
//
// Design-locked: brand surfaces (topbar / mascot / voice pill / streak chip)
// are permanent. Stage content is swapped via the reducer's `stage` key.

import { useCallback, useEffect, useRef, useState } from "react";
import { TopBar } from "./components/TopBar";
import { ChatPanel } from "./components/ChatPanel";
import { BadgeTray } from "./components/BadgeTray";
import { MethodologyPanel } from "./components/MethodologyPanel";
import { WelcomeStage } from "./stages/Welcome";
import { SoftDashboard } from "./stages/Dashboard";
import { ForcedChoiceModule } from "./stages/modules/ForcedChoice";
import { RiasecModule } from "./stages/modules/RiasecPairs";
import { JudgmentModule } from "./stages/modules/JudgmentModule";
import { CognitiveModule } from "./stages/modules/CognitiveModule";
import { HardSkillsStage } from "./stages/HardSkills";
import { CombinedStage } from "./stages/Combined";
import { RoadmapStage } from "./stages/Roadmap";
import { ValuesSortGame } from "./games/ValuesSort";
import { StrengthsSpotlightGame } from "./games/StrengthsSpotlight";
import { ScenarioSprintGame } from "./games/ScenarioSprint";
import { SoftModuleId, useAppState } from "./lib/state";
import { primeVoices, speak } from "./lib/voice";
import { resetAll } from "./lib/storage";
import {
  FORCED_CHOICE_BLOCKS,
  RIASEC_PAIRS,
  SJT_SCENARIOS,
  FREQUENCY_ITEMS,
  COGNITIVE_ITEMS,
} from "./lib/data";

type Overlay = "values" | "strengths" | "sprint" | null;

export default function App() {
  const { state, dispatch, levelProgress } = useAppState();
  const [speaking, setSpeaking] = useState(false);
  const [overlay, setOverlay] = useState<Overlay>(null);
  const [toast, setToast] = useState<string>("");
  const cancelRef = useRef<() => void>(() => undefined);

  // Prime SpeechSynthesis voices once on mount.
  useEffect(() => {
    primeVoices();
    // Safari triggers voiceschanged lazily; re-prime briefly.
    const t = setTimeout(() => primeVoices(), 400);
    return () => clearTimeout(t);
  }, []);

  const onSpeak = useCallback(
    (text: string) => {
      try {
        cancelRef.current();
      } catch {
        /* noop */
      }
      cancelRef.current = speak(text, {
        voice: state.voiceId,
        muted: state.muted,
        onStart: () => setSpeaking(true),
        onEnd: () => setSpeaking(false),
      });
    },
    [state.voiceId, state.muted]
  );

  const onStopSpeech = useCallback(() => {
    try {
      cancelRef.current();
    } catch {
      /* noop */
    }
    setSpeaking(false);
  }, []);

  const flashToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2400);
  }, []);

  const onReset = () => {
    if (
      !window.confirm(
        "Reset the demo? This wipes your walkthrough progress, XP, badges, and chat — everything stored locally."
      )
    )
      return;
    resetAll();
    dispatch({ type: "RESET" });
    flashToast("Demo reset — starting fresh.");
    onStopSpeech();
  };

  /* ---------- module progress (for the dashboard cards) ---------- */

  const softProgress: Record<SoftModuleId, number> = {
    personality: ratio(state.forcedChoice.filter((a) => a?.most != null && a?.least != null).length, FORCED_CHOICE_BLOCKS.length),
    interests: ratio(state.riasec.filter(Boolean).length, RIASEC_PAIRS.length),
    judgment: ratio(
      state.sjt.filter((a) => a != null).length + state.freq.filter((a) => a != null).length,
      SJT_SCENARIOS.length + FREQUENCY_ITEMS.length
    ),
    cognitive: ratio(state.cog.filter((a) => a != null).length, COGNITIVE_ITEMS.length),
  };
  const allSoftDone =
    state.softDone.personality &&
    state.softDone.interests &&
    state.softDone.judgment &&
    state.softDone.cognitive;

  /* ---------- stage routing ---------- */

  const renderStage = () => {
    if (state.stage === "welcome") {
      return (
        <WelcomeStage
          state={state}
          dispatch={dispatch}
          onSpeak={onSpeak}
          speaking={speaking}
          onContinue={() => {
            dispatch({ type: "XP_ADD", amount: 30 });
            dispatch({ type: "BADGE_EARN", id: "first-step" });
            flashToast("+30 XP · Badge earned: First step");
            dispatch({ type: "SET_STAGE", stage: "dashboard" });
          }}
        />
      );
    }

    if (state.stage === "dashboard") {
      if (state.activeModule === "personality")
        return (
          <ForcedChoiceModule
            state={state}
            dispatch={dispatch}
            onExit={() => dispatch({ type: "SET_MODULE", id: null })}
            onComplete={() => {
              dispatch({ type: "MODULE_COMPLETE", id: "personality" });
              dispatch({ type: "XP_ADD", amount: 60 });
              dispatch({ type: "BADGE_EARN", id: "self-aware" });
              flashToast("+60 XP · Personality module complete");
            }}
          />
        );
      if (state.activeModule === "interests")
        return (
          <RiasecModule
            state={state}
            dispatch={dispatch}
            onExit={() => dispatch({ type: "SET_MODULE", id: null })}
            onComplete={() => {
              dispatch({ type: "MODULE_COMPLETE", id: "interests" });
              dispatch({ type: "XP_ADD", amount: 60 });
              dispatch({ type: "BADGE_EARN", id: "explorer" });
              flashToast("+60 XP · Interests module complete");
            }}
          />
        );
      if (state.activeModule === "judgment")
        return (
          <JudgmentModule
            state={state}
            dispatch={dispatch}
            onExit={() => dispatch({ type: "SET_MODULE", id: null })}
            onComplete={() => {
              dispatch({ type: "MODULE_COMPLETE", id: "judgment" });
              dispatch({ type: "XP_ADD", amount: 60 });
              dispatch({ type: "BADGE_EARN", id: "steady-hand" });
              flashToast("+60 XP · Judgement module complete");
            }}
          />
        );
      if (state.activeModule === "cognitive")
        return (
          <CognitiveModule
            state={state}
            dispatch={dispatch}
            onExit={() => dispatch({ type: "SET_MODULE", id: null })}
            onComplete={() => {
              dispatch({ type: "MODULE_COMPLETE", id: "cognitive" });
              dispatch({ type: "XP_ADD", amount: 60 });
              dispatch({ type: "BADGE_EARN", id: "quick-thinker" });
              flashToast("+60 XP · Reasoning module complete");
            }}
          />
        );

      return (
        <>
          <SoftDashboard
            name={state.welcome.name}
            softDone={state.softDone}
            softProgress={softProgress}
            canGenerate={allSoftDone}
            onOpenModule={(id) => dispatch({ type: "SET_MODULE", id })}
            onGenerate={() => dispatch({ type: "SET_STAGE", stage: "hard" })}
          />

          <div className="wrap narrow" style={{ marginTop: 32 }}>
            <div className="card">
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: 1.5,
                  textTransform: "uppercase",
                  color: "var(--text3)",
                  marginBottom: 6,
                }}
              >
                Mini-games
              </div>
              <div
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: 18,
                  marginBottom: 8,
                }}
              >
                Short reflections between modules
              </div>
              <p className="sub-text" style={{ marginBottom: 14 }}>
                Optional. They don't affect your scores — but they sharpen the
                narrative Rita will reflect back to you.
              </p>
              <div className="btn-row">
                <button
                  className="btn secondary"
                  onClick={() => setOverlay("values")}
                >
                  ✦ Values Sort
                </button>
                <button
                  className="btn secondary"
                  onClick={() => setOverlay("strengths")}
                >
                  ◆ Strengths Spotlight
                </button>
                <button
                  className="btn secondary"
                  onClick={() => setOverlay("sprint")}
                >
                  ⚡ Scenario Sprint
                </button>
              </div>
            </div>
            <BadgeTray earnedIds={state.badgeIds} />
          </div>
        </>
      );
    }

    if (state.stage === "hard") {
      return (
        <HardSkillsStage
          state={state}
          dispatch={dispatch}
          onExit={() => dispatch({ type: "SET_STAGE", stage: "dashboard" })}
          onComplete={() => {
            dispatch({ type: "XP_ADD", amount: 100 });
            dispatch({ type: "BADGE_EARN", id: "benchmarked" });
            flashToast("+100 XP · Technical benchmark complete");
            dispatch({ type: "SET_STAGE", stage: "results" });
          }}
        />
      );
    }

    if (state.stage === "results") {
      return (
        <CombinedStage
          state={state}
          dispatch={dispatch}
          onSpeak={onSpeak}
          onContinue={() => dispatch({ type: "SET_STAGE", stage: "roadmap" })}
        />
      );
    }

    if (state.stage === "roadmap") {
      return (
        <RoadmapStage
          state={state}
          dispatch={dispatch}
          onSpeak={onSpeak}
          onRestart={onReset}
        />
      );
    }

    return null;
  };

  /* ---------- render ---------- */

  return (
    <div className="page">
      <span className="bg-glow" aria-hidden="true" />

      <TopBar
        speaking={speaking}
        muted={state.muted}
        onToggleMute={() => {
          dispatch({ type: "TOGGLE_MUTE" });
          onStopSpeech();
        }}
        streak={state.streak}
        xp={state.xp}
        level={state.level}
        levelProgress={levelProgress}
        onReset={onReset}
      />

      <div className={`toast ${toast ? "show" : ""}`} role="status" aria-live="polite">
        {toast}
      </div>

      {renderStage()}

      {state.stage !== "welcome" && <MethodologyPanel />}

      <ChatPanel
        state={state}
        dispatch={dispatch}
        speaking={speaking}
        onSpeak={onSpeak}
        onStop={onStopSpeech}
      />

      {overlay === "values" && (
        <ModalOverlay onClose={() => setOverlay(null)}>
          <ValuesSortGame
            onClose={() => setOverlay(null)}
            onComplete={() => {
              dispatch({ type: "XP_ADD", amount: 40 });
              dispatch({ type: "BADGE_EARN", id: "values-sorter" });
              flashToast("+40 XP · Values locked in");
              setOverlay(null);
            }}
          />
        </ModalOverlay>
      )}
      {overlay === "strengths" && (
        <ModalOverlay onClose={() => setOverlay(null)}>
          <StrengthsSpotlightGame
            onClose={() => setOverlay(null)}
            onComplete={() => {
              dispatch({ type: "XP_ADD", amount: 40 });
              dispatch({ type: "BADGE_EARN", id: "strengths-spotter" });
              flashToast("+40 XP · Strengths saved");
              setOverlay(null);
            }}
          />
        </ModalOverlay>
      )}
      {overlay === "sprint" && (
        <ModalOverlay onClose={() => setOverlay(null)}>
          <ScenarioSprintGame
            onClose={() => setOverlay(null)}
            onComplete={() => {
              dispatch({ type: "XP_ADD", amount: 40 });
              dispatch({ type: "BADGE_EARN", id: "sprinter" });
              flashToast("+40 XP · Scenario Sprint complete");
              setOverlay(null);
            }}
          />
        </ModalOverlay>
      )}
    </div>
  );
}

function ratio(n: number, d: number): number {
  if (d === 0) return 0;
  return Math.max(0, Math.min(1, n / d));
}

function ModalOverlay({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(4, 7, 21, 0.72)",
        backdropFilter: "blur(6px)",
        zIndex: 120,
        overflowY: "auto",
        padding: "80px 16px 40px",
      }}
    >
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
}
