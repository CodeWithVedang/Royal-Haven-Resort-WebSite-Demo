import { gstRateFor } from "@/lib/format";
import { site } from "@/lib/site";
import { ratesForStay, seasonFor } from "./rates";
import type { Charges, NightRate, PromoResult, SeasonKey } from "./types";

/* -------------------------------------------------------------------------- */
/* Promotions                                                                 */
/* -------------------------------------------------------------------------- */

type PromoDefinition = {
  code: string;
  label: string;
  /** Shown on the booking page so the demo codes are discoverable. */
  blurb: string;
  requirement: string;
  qualifies(nights: NightRate[]): boolean;
  amount(nights: NightRate[], roomCount: number): number;
};

const PROMOS: PromoDefinition[] = [
  {
    code: "HAVEN10",
    label: "10% off your stay",
    blurb: "10% off two nights or more",
    requirement: "Valid on stays of two nights or more.",
    qualifies: (nights) => nights.length >= 2,
    amount: (nights, roomCount) =>
      nights.reduce((sum, night) => sum + night.rate, 0) * roomCount * 0.1,
  },
  {
    code: "STAY4PAY3",
    label: "Fourth night on us",
    blurb: "Stay four nights, pay for three",
    requirement: "Valid on stays of four nights or more — your cheapest night is free.",
    qualifies: (nights) => nights.length >= 4,
    amount: (nights, roomCount) =>
      Math.min(...nights.map((night) => night.rate)) * roomCount,
  },
  {
    code: "MONSOON20",
    label: "Monsoon offer · 20% off",
    blurb: "20% off between July and September",
    requirement: "Valid when every night of the stay falls between July and September.",
    qualifies: (nights) => nights.every((night) => night.season === "monsoon"),
    amount: (nights, roomCount) =>
      nights.reduce((sum, night) => sum + night.rate, 0) * roomCount * 0.2,
  },
];

export const promoOffers = PROMOS.map(({ code, blurb, requirement }) => ({
  code,
  blurb,
  requirement,
}));

export function evaluatePromo(
  input: string | undefined,
  nights: NightRate[],
  roomCount: number,
): PromoResult | null {
  const code = input?.trim().toUpperCase();
  if (!code) return null;

  const promo = PROMOS.find((entry) => entry.code === code);
  if (!promo) {
    return {
      code,
      applied: false,
      label: "Not recognised",
      message: "We could not find that code. Check the spelling, or leave it blank.",
      amount: 0,
    };
  }

  if (!promo.qualifies(nights)) {
    return {
      code,
      applied: false,
      label: promo.label,
      message: promo.requirement,
      amount: 0,
    };
  }

  return {
    code,
    applied: true,
    label: promo.label,
    amount: Math.round(promo.amount(nights, roomCount)),
  };
}

/* -------------------------------------------------------------------------- */
/* Charges                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * GST is charged per room-night on the value actually paid, so any discount is
 * spread across the nights before the slab is decided — which is how an Indian
 * hotel invoice is built.
 */
export function buildCharges(
  baseRate: number,
  checkIn: string,
  checkOut: string,
  roomCount: number,
  promo: PromoResult | null,
): Charges {
  const nights = ratesForStay(baseRate, checkIn, checkOut);
  const nightCount = nights.length;
  const subtotal = nights.reduce((sum, night) => sum + night.rate, 0) * roomCount;
  const discount = promo?.applied ? Math.min(promo.amount, subtotal) : 0;
  const taxable = subtotal - discount;
  const keepRatio = subtotal > 0 ? taxable / subtotal : 0;

  const taxes = Math.round(
    nights.reduce((sum, night) => {
      const perRoom = night.rate * keepRatio;
      return sum + perRoom * gstRateFor(perRoom) * roomCount;
    }, 0),
  );

  return {
    nights,
    roomCount,
    nightCount,
    subtotal,
    discount,
    taxable,
    taxes,
    total: taxable + taxes,
    averageNightly: nightCount > 0 ? Math.round(subtotal / (nightCount * roomCount)) : 0,
    effectiveTaxRate: taxable > 0 ? taxes / taxable : 0,
  };
}

/** Cheapest single night in a set — the "from ₹" figure on a results card. */
export function lowestNightly(nights: NightRate[]): number {
  return nights.length === 0 ? 0 : Math.min(...nights.map((night) => night.rate));
}

export function seasonOf(iso: string): SeasonKey {
  return seasonFor(iso);
}

export const gstNote = `GST is charged at ${site.policy.gst.lowerRate * 100}% on room nights up to ${
  site.policy.gst.slabThreshold
} and ${site.policy.gst.upperRate * 100}% above, as required in India.`;
