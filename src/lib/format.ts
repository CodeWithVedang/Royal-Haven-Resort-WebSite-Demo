import { site } from "./site";

/* -------------------------------------------------------------------------- */
/* Currency — Indian numbering system                                         */
/* -------------------------------------------------------------------------- */

const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const inrPlain = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 });

/** ₹18,500 */
export function formatINR(amount: number): string {
  return inr.format(Math.round(amount));
}

/** 18,500 — when the ₹ is rendered separately for typographic control. */
export function formatAmount(amount: number): string {
  return inrPlain.format(Math.round(amount));
}

/** ₹18.5K — compact label for calendar cells. */
export function formatCompactINR(amount: number): string {
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(amount % 100000 === 0 ? 0 : 1)}L`;
  if (amount >= 1000) {
    const k = amount / 1000;
    return `₹${k % 1 === 0 ? k : k.toFixed(1)}K`;
  }
  return `₹${amount}`;
}

/* -------------------------------------------------------------------------- */
/* Dates — all handling is calendar-day based, in local time, ISO yyyy-mm-dd  */
/* -------------------------------------------------------------------------- */

export const WEEKDAY_LABELS = ["M", "T", "W", "T", "F", "S", "S"] as const;
export const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

/** yyyy-mm-dd in local time (never UTC — avoids the off-by-one-day bug). */
export function toISODate(date: Date): string {
  const y = date.getFullYear();
  const m = `${date.getMonth() + 1}`.padStart(2, "0");
  const d = `${date.getDate()}`.padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function fromISODate(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1);
}

export function isValidISODate(value: string | null | undefined): value is string {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = fromISODate(value);
  return !Number.isNaN(date.getTime()) && toISODate(date) === value;
}

export function startOfToday(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

export function addDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

export function addMonths(date: Date, months: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + months, 1);
}

export function nightsBetween(checkIn: string, checkOut: string): number {
  const start = fromISODate(checkIn).getTime();
  const end = fromISODate(checkOut).getTime();
  return Math.max(0, Math.round((end - start) / 86400000));
}

/** Every night in the stay, i.e. excludes the check-out date. */
export function stayNights(checkIn: string, checkOut: string): string[] {
  const out: string[] = [];
  const total = nightsBetween(checkIn, checkOut);
  const start = fromISODate(checkIn);
  for (let i = 0; i < total; i += 1) out.push(toISODate(addDays(start, i)));
  return out;
}

export function isWeekendNight(iso: string): boolean {
  const day = fromISODate(iso).getDay();
  return day === 5 || day === 6; // Friday & Saturday nights
}

/** "Thu, 12 Nov 2026" */
export function formatLongDate(iso: string): string {
  return fromISODate(iso).toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/** "12 Nov" */
export function formatShortDate(iso: string): string {
  return fromISODate(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

/** "Thursday 12 November" — for confirmation documents. */
export function formatFullDate(iso: string): string {
  return fromISODate(iso).toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function monthLabel(date: Date): string {
  return `${MONTH_NAMES[date.getMonth()]} ${date.getFullYear()}`;
}

/** Monday-first weekday index. */
export function mondayIndex(date: Date): number {
  return (date.getDay() + 6) % 7;
}

export function daysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

export function isSameISO(a: string | null, b: string | null): boolean {
  return Boolean(a && b && a === b);
}

export function isBetweenISO(iso: string, start: string, end: string): boolean {
  return iso > start && iso < end;
}

/* -------------------------------------------------------------------------- */
/* Misc                                                                      */
/* -------------------------------------------------------------------------- */

/** "2 guests · 1 room · 3 nights" */
export function stayHeadline(guests: number, rooms: number, nights: number): string {
  return [
    `${guests} ${guests === 1 ? "guest" : "guests"}`,
    `${rooms} ${rooms === 1 ? "room" : "rooms"}`,
    `${nights} ${nights === 1 ? "night" : "nights"}`,
  ].join(" · ");
}

export function gstRateFor(nightlyRate: number): number {
  const { slabThreshold, lowerRate, upperRate } = site.policy.gst;
  return nightlyRate > slabThreshold ? upperRate : lowerRate;
}

/**
 * A guest-typed mobile number, shown back to them the way it is written in
 * India: "+91 98200 98200". Anything that is not a recognisable Indian mobile
 * is returned untouched rather than mangled.
 */
export function formatGuestPhone(input: string): string {
  const digits = input.replace(/\D/g, "");
  if (digits.length === 10) return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
  if (digits.length === 12 && digits.startsWith("91")) {
    return `+91 ${digits.slice(2, 7)} ${digits.slice(7)}`;
  }
  if (digits.length === 11 && digits.startsWith("0")) {
    return `+91 ${digits.slice(1, 6)} ${digits.slice(6)}`;
  }
  return input.trim();
}
