// Persistent chat with Rita. Pre-authored replies matched by keyword; if nothing
// matches, we return a generic GROW-coach fallback. Rita's replies are spoken
// via the browser SpeechSynthesis API with lip-sync driven by boundary events.

import { useEffect, useMemo, useRef, useState } from "react";
import { CHAT_LIBRARY } from "@/lib/data";
import { AppAction, AppState } from "@/lib/state";
import { cn } from "@/lib/utils";
import { LogoMascot } from "./Mascot";

interface Props {
  state: AppState;
  dispatch: (a: AppAction) => void;
  speaking: boolean;
  onSpeak: (text: string) => void;
  onStop: () => void;
}

function matchReply(input: string): string {
  const q = input.toLowerCase();
  const keywords: Array<[string[], string]> = [
    [["direction", "lost", "unsure", "what next", "don't know"], "direction"],
    [["transition", "switch", "pivot", "change role", "new role"], "transition"],
    [["salary", "pay", "compensation", "raise", "negotiate"], "salary"],
    [["manager", "boss", "conflict", "difficult"], "manager-conflict"],
    [["burn", "exhaust", "tired", "overwhelm"], "burnout"],
    [["imposter", "fraud", "not good enough", "fake"], "imposter"],
    [["learn", "study", "course", "resources"], "learning-recs"],
    [["review", "performance", "promotion case", "perf"], "perf-review"],
    [["balance", "family", "hours", "time"], "balance"],
  ];
  for (const [words, id] of keywords) {
    if (words.some((w) => q.includes(w))) {
      return CHAT_LIBRARY.find((c) => c.id === id)!.reply;
    }
  }
  // Fallback: GROW nudge.
  return "I don't want to guess — can you tell me a little more? What feels urgent, and what would a good outcome look like for you? If I had one sentence of context I could match you to a framework (GROW for direction, STAR for an incident, OSKAR for a review, SMART for a goal).";
}

export function ChatPanel({
  state,
  dispatch,
  speaking,
  onSpeak,
  onStop,
}: Props) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const bodyRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [state.chat, open]);

  const suggestions = useMemo(
    () => CHAT_LIBRARY.slice(0, 5).map((c) => c.label),
    []
  );

  const send = (userText: string) => {
    const clean = userText.trim();
    if (!clean) return;
    dispatch({ type: "CHAT_PUSH", from: "user", text: clean });
    const reply = matchReply(clean);
    // Simulate a 400ms "thinking" pause before Rita answers.
    setTimeout(() => {
      dispatch({ type: "CHAT_PUSH", from: "rita", text: reply });
      onSpeak(reply);
    }, 380);
    setText("");
  };

  return (
    <>
      {!open && (
        <button
          className="chat-fab"
          onClick={() => setOpen(true)}
          aria-label="Open chat with Rita"
        >
          <LogoMascot size={28} speaking={speaking} />
          <span>Talk to Rita</span>
        </button>
      )}
      {open && (
        <div className="chat-panel" role="dialog" aria-label="Chat with Rita">
          <header className="chat-head">
            <LogoMascot size={36} speaking={speaking} />
            <div>
              <div className="chat-head-title">Rita</div>
              <div className="chat-head-sub">
                ICF-credentialed career coach · pre-authored demo replies
              </div>
            </div>
            <div className="chat-head-controls">
              <button
                className={cn(
                  "voice-toggle",
                  state.voiceId === "rita" && "active"
                )}
                onClick={() => dispatch({ type: "SET_VOICE", voice: "rita" })}
                title="Female voice"
              >
                ♀
              </button>
              <button
                className={cn(
                  "voice-toggle",
                  state.voiceId === "coach" && "active"
                )}
                onClick={() => dispatch({ type: "SET_VOICE", voice: "coach" })}
                title="Male voice"
              >
                ♂
              </button>
              <button
                className="voice-toggle"
                onClick={() => {
                  onStop();
                  setOpen(false);
                }}
                title="Close"
              >
                ×
              </button>
            </div>
          </header>

          <div className="chat-body" ref={bodyRef}>
            {state.chat.length === 0 && (
              <div className="chat-msg rita">
                <strong>Rita</strong>
                Hi — I'm Rita. Ask me anything about career direction, role
                transitions, salary, performance reviews, or burnout. I work
                like an ICF coach: fewer answers, better questions.
              </div>
            )}
            {state.chat.map((m, i) => (
              <div key={i} className={cn("chat-msg", m.from)}>
                <strong>{m.from === "rita" ? "Rita" : "You"}</strong>
                {m.text}
              </div>
            ))}
          </div>

          <div className="chat-suggestions">
            {suggestions.map((s) => (
              <button
                key={s}
                className="chip"
                onClick={() => send(s)}
              >
                {s}
              </button>
            ))}
          </div>

          <form
            className="chat-input-row"
            onSubmit={(e) => {
              e.preventDefault();
              send(text);
            }}
          >
            <input
              className="chat-input"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Ask Rita anything about your career…"
            />
            <button className="chat-send" type="submit" aria-label="Send">
              ➤
            </button>
          </form>
        </div>
      )}
    </>
  );
}
