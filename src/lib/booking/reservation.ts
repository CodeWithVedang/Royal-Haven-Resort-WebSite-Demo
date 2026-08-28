import { site } from "@/lib/site";
import type { Charges, GuestDetails, PaymentMode, Reservation, StaySearch } from "./types";

const STORAGE_KEY = "royal-haven:reservation";

/** Unambiguous in print and on the phone — no O, I, 0 or 1. */
const CODE_ALPHABET = "ACDEFHJKLMNPQRTUVWXY23456789";

/** RH-2026-7K4Q */
export function makeReservationCode(now: Date = new Date()): string {
  let suffix = "";
  for (let i = 0; i < 4; i += 1) {
    suffix += CODE_ALPHABET[Math.floor(Math.random() * CODE_ALPHABET.length)];
  }
  return `RH-${now.getFullYear()}-${suffix}`;
}

export function createReservation(input: {
  search: StaySearch;
  roomSlug: string;
  roomName: string;
  charges: Charges;
  guest: GuestDetails;
  paymentMode: PaymentMode;
}): Reservation {
  const now = new Date();
  return {
    code: makeReservationCode(now),
    createdAt: now.toISOString(),
    status: "confirmed",
    paymentProvider: site.integrations.paymentProvider,
    /** A live gateway would set this from the provider's callback. */
    paymentCaptured: false,
    ...input,
  };
}

/* -------------------------------------------------------------------------- */
/* Persistence — session only, so a refresh on the confirmation page works     */
/* but nothing is retained after the tab closes.                              */
/* -------------------------------------------------------------------------- */

export function saveReservation(reservation: Reservation): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(reservation));
  } catch {
    /* Private browsing or a full quota — the confirmation still renders. */
  }
}

export function loadReservation(): Reservation | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Reservation;
    return parsed?.code ? parsed : null;
  } catch {
    return null;
  }
}

export function clearReservation(): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    /* Nothing to clean up. */
  }
}
