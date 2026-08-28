import { fromISODate, isWeekendNight, stayNights } from "@/lib/format";
import type { NightRate, Season, SeasonKey } from "./types";

/**
 * Udaipur has three distinct trading seasons and one festive fortnight. The
 * multiplier is applied to each room's published floor rate — which is the
 * monsoon rate, so the "from ₹" figures quoted on the site are always honest.
 */
export const SEASONS: Record<SeasonKey, Season> = {
  monsoon: {
    key: "monsoon",
    label: "Monsoon",
    note: "July to September. The hills turn green and the property is quiet.",
    multiplier: 1,
  },
  summer: {
    key: "summer",
    label: "Summer",
    note: "April to June. Warm afternoons, long evenings, lower rates.",
    multiplier: 1.06,
  },
  season: {
    key: "season",
    label: "Peak season",
    note: "October to March, when Udaipur is at its best.",
    multiplier: 1.32,
  },
  festive: {
    key: "festive",
    label: "Festive",
    note: "24 December to 2 January, with the New Year programme included.",
    multiplier: 1.78,
  },
};

/** Friday and Saturday nights carry a modest uplift. */
const WEEKEND_UPLIFT = 1.12;

/** Rates are always published in clean hundreds. */
function roundRate(value: number): number {
  return Math.round(value / 100) * 100;
}

export function seasonFor(iso: string): SeasonKey {
  const date = fromISODate(iso);
  const month = date.getMonth();
  const day = date.getDate();

  if ((month === 11 && day >= 24) || (month === 0 && day <= 2)) return "festive";
  if (month >= 9 || month <= 2) return "season";
  if (month >= 3 && month <= 5) return "summer";
  return "monsoon";
}

export function rateForNight(base: number, iso: string): NightRate {
  const season = seasonFor(iso);
  const weekend = isWeekendNight(iso);
  const seasonal = base * SEASONS[season].multiplier;
  const rate = roundRate(weekend ? seasonal * WEEKEND_UPLIFT : seasonal);
  return { date: iso, base, rate, season, weekend };
}

export function ratesForStay(base: number, checkIn: string, checkOut: string): NightRate[] {
  return stayNights(checkIn, checkOut).map((iso) => rateForNight(base, iso));
}

/** The lowest a room ever goes — used for every "from ₹" figure on the site. */
export function floorRate(base: number): number {
  return roundRate(base * SEASONS.monsoon.multiplier);
}

/** Distinct seasons touched by a stay, in the order they occur. */
export function seasonsInStay(checkIn: string, checkOut: string): SeasonKey[] {
  const seen: SeasonKey[] = [];
  for (const iso of stayNights(checkIn, checkOut)) {
    const key = seasonFor(iso);
    if (!seen.includes(key)) seen.push(key);
  }
  return seen;
}
