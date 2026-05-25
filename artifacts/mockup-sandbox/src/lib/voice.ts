// Browser speech-synthesis helper. Picks a natural voice per preference,
// fires boundary events for lip-sync, and gracefully degrades when the
// platform doesn't ship a usable voice (e.g. headless / some Linux builds).

export type VoiceId = "rita" | "coach";

interface VoicePreset {
  preferredNames: string[];
  rate: number;
  pitch: number;
  volume: number;
}

const PRESETS: Record<VoiceId, VoicePreset> = {
  rita: {
    // Warm, contralto-ish female voices, ranked by sound quality we've
    // seen across Chrome / Safari / Edge on real devices.
    preferredNames: [
      "Google UK English Female",
      "Microsoft Aria Online (Natural)",
      "Samantha",
      "Karen",
      "Google US English",
      "Microsoft Jenny Online (Natural)",
    ],
    rate: 1,
    pitch: 1.05,
    volume: 1,
  },
  coach: {
    preferredNames: [
      "Google UK English Male",
      "Microsoft Guy Online (Natural)",
      "Daniel",
      "Alex",
      "Microsoft Ryan Online (Natural)",
    ],
    rate: 0.98,
    pitch: 0.95,
    volume: 1,
  },
};

export function pickVoice(id: VoiceId): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    return null;
  }
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;
  const pref = PRESETS[id];
  for (const name of pref.preferredNames) {
    const match = voices.find((v) => v.name === name);
    if (match) return match;
  }
  // Fallback: first English voice that matches the rough gender hint.
  const englishVoices = voices.filter((v) =>
    v.lang.toLowerCase().startsWith("en")
  );
  if (id === "rita") {
    const female = englishVoices.find((v) => /female|samantha|karen|aria|jenny|zira/i.test(v.name));
    if (female) return female;
  } else {
    const male = englishVoices.find((v) => /male|daniel|alex|guy|ryan|david/i.test(v.name));
    if (male) return male;
  }
  return englishVoices[0] ?? voices[0];
}

export interface SpeakOptions {
  voice?: VoiceId;
  onStart?: () => void;
  onEnd?: () => void;
  onBoundary?: (charIndex: number, charLength: number) => void;
  muted?: boolean;
}

/**
 * Speak text via the browser SpeechSynthesis API.
 * Returns a cancel function so callers can stop mid-utterance.
 */
export function speak(text: string, opts: SpeakOptions = {}): () => void {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    opts.onEnd?.();
    return () => undefined;
  }
  if (opts.muted) {
    opts.onEnd?.();
    return () => undefined;
  }

  // Cancel any outstanding utterance first — otherwise queued speech will
  // overlap the next greeting and sound garbled on some browsers.
  try {
    window.speechSynthesis.cancel();
  } catch {
    /* noop */
  }

  const u = new SpeechSynthesisUtterance(text);
  u.lang = "en-US";
  const preset = PRESETS[opts.voice ?? "rita"];
  u.rate = preset.rate;
  u.pitch = preset.pitch;
  u.volume = preset.volume;
  const v = pickVoice(opts.voice ?? "rita");
  if (v) u.voice = v;

  u.onstart = () => opts.onStart?.();
  u.onend = () => opts.onEnd?.();
  u.onerror = () => opts.onEnd?.();
  u.onboundary = (event: SpeechSynthesisEvent) => {
    opts.onBoundary?.(event.charIndex, (event as any).charLength ?? 0);
  };

  try {
    window.speechSynthesis.speak(u);
  } catch {
    opts.onEnd?.();
  }

  return () => {
    try {
      window.speechSynthesis.cancel();
    } catch {
      /* noop */
    }
  };
}

/** Prime the voice list. Some browsers load it lazily. */
export function primeVoices(): void {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  // Triggers the voiceschanged event on first call on Chrome.
  window.speechSynthesis.getVoices();
}
