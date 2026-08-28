export type ClassValue = string | number | false | null | undefined;

/** Tiny class joiner — keeps component APIs tidy without a runtime dependency. */
export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(" ");
}

/** Deterministic 32-bit hash. Used to generate stable demo inventory. */
export function hashString(value: string): number {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return Math.abs(hash);
}

/** 0–1 pseudo random, stable for a given seed. */
export function seededRandom(seed: string): number {
  return (hashString(seed) % 10000) / 10000;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** "01", "02" … used for the editorial section numbering. */
export function pad2(value: number): string {
  return value.toString().padStart(2, "0");
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Waits — used to make demo services feel like real network calls. */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
