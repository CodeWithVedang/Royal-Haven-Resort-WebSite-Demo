import { rooms, type Room } from "@/data/rooms";
import { daysInMonth, isWeekendNight, stayNights, toISODate } from "@/lib/format";
import { clamp, seededRandom } from "@/lib/utils";
import { rateForNight, seasonFor } from "./rates";
import type { SeasonKey } from "./types";

/**
 * Deterministic demo inventory. Every figure below is derived from a hash of
 * the room slug and the date, so the same search always returns the same
 * result — on the server, in the browser, and after a refresh. Replace this
 * module with a PMS or channel-manager client to go live; the shape of
 * `availabilityFor` and `dayInfo` is all the UI depends on.
 */

/** Typical occupancy the property runs at, by season. */
const OCCUPANCY: Record<SeasonKey, number> = {
  monsoon: 0.42,
  summer: 0.38,
  season: 0.74,
  festive: 0.93,
};

const WEEKEND_PRESSURE = 0.12;

/**
 * Peak-season weekends the resort holds for a single celebration. These read
 * as blocked dates in the calendar, with the reason shown to the guest.
 */
export function buyoutStartFor(year: number, month: number): string | null {
  const probe = `${year}-${month}`;
  const key = seasonFor(toISODate(new Date(year, month, 15)));
  if (key !== "season") return null;

  const fridays: number[] = [];
  const total = daysInMonth(year, month);
  for (let day = 1; day <= total; day += 1) {
    if (new Date(year, month, day).getDay() === 5) fridays.push(day);
  }
  if (fridays.length === 0) return null;

  const pick = fridays[Math.floor(seededRandom(`buyout:${probe}`) * fridays.length)];
  return toISODate(new Date(year, month, pick ?? fridays[0]));
}

export function isBuyoutNight(iso: string): boolean {
  const [year, month, day] = iso.split("-").map(Number);
  const start = buyoutStartFor(year, (month ?? 1) - 1);
  if (!start) return false;
  const startDay = Number(start.split("-")[2]);
  return day >= startDay && day <= startDay + 1;
}

/** Keys of one category free on one night. */
export function keysFreeOn(room: Room, iso: string): number {
  if (isBuyoutNight(iso)) return 0;

  const season = seasonFor(iso);
  const weekend = isWeekendNight(iso);
  const jitter = (seededRandom(`${room.slug}:${iso}`) - 0.5) * 0.34;
  const pressure = OCCUPANCY[season] + (weekend ? WEEKEND_PRESSURE : 0) + jitter;
  const sold = Math.round(room.inventory * clamp(pressure, 0, 1));
  return clamp(room.inventory - sold, 0, room.inventory);
}

/** Keys free for every night of the stay — the number actually bookable. */
export function availabilityFor(room: Room, checkIn: string, checkOut: string): number {
  const nights = stayNights(checkIn, checkOut);
  if (nights.length === 0) return 0;
  return nights.reduce((least, iso) => Math.min(least, keysFreeOn(room, iso)), room.inventory);
}

export type DayInfo = {
  date: string;
  season: SeasonKey;
  /** Cheapest room rate that night, across categories with keys free. */
  lowestRate: number;
  keysFree: number;
  soldOut: boolean;
  buyout: boolean;
};

export function dayInfo(iso: string): DayInfo {
  const buyout = isBuyoutNight(iso);
  let keysFree = 0;
  let lowestRate = Number.POSITIVE_INFINITY;

  for (const room of rooms) {
    const free = keysFreeOn(room, iso);
    keysFree += free;
    if (free > 0) lowestRate = Math.min(lowestRate, rateForNight(room.baseRate, iso).rate);
  }

  return {
    date: iso,
    season: seasonFor(iso),
    lowestRate: Number.isFinite(lowestRate) ? lowestRate : 0,
    keysFree,
    soldOut: keysFree === 0,
    buyout,
  };
}

/** One entry per calendar day of the given month, for the availability grid. */
export function monthInfo(year: number, month: number): DayInfo[] {
  const total = daysInMonth(year, month);
  const out: DayInfo[] = [];
  for (let day = 1; day <= total; day += 1) {
    out.push(dayInfo(toISODate(new Date(year, month, day))));
  }
  return out;
}

/** Nights inside a range that cannot be sold at all. */
export function blockedNightsIn(checkIn: string, checkOut: string): string[] {
  return stayNights(checkIn, checkOut).filter((iso) => dayInfo(iso).soldOut);
}
