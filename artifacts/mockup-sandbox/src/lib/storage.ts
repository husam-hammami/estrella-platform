// Thin localStorage wrapper. Every persisted key lives under a single
// TELOS_* namespace so "Reset demo" can wipe cleanly. All reads are
// defensive — a corrupt JSON blob shouldn't crash the walkthrough.

const NS = "telos_v1";

function key(k: string): string {
  return `${NS}.${k}`;
}

export function load<T>(k: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key(k));
    if (raw == null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function save<T>(k: string, value: T): void {
  try {
    localStorage.setItem(key(k), JSON.stringify(value));
  } catch {
    // Quota or private mode — fall through silently.
  }
}

export function remove(k: string): void {
  try {
    localStorage.removeItem(key(k));
  } catch {
    /* noop */
  }
}

/** Wipe every TELOS_* key. Used by the Reset-demo affordance. */
export function resetAll(): void {
  try {
    const toRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(`${NS}.`)) toRemove.push(k);
    }
    toRemove.forEach((k) => localStorage.removeItem(k));
  } catch {
    /* noop */
  }
}
