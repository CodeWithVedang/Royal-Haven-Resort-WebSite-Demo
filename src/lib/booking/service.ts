import { rooms } from "@/data/rooms";
import { isValidISODate, nightsBetween, startOfToday, toISODate } from "@/lib/format";
import { site } from "@/lib/site";
import { delay } from "@/lib/utils";
import { availabilityFor, blockedNightsIn } from "./availability";
import { buildCharges, evaluatePromo, lowestNightly } from "./pricing";
import { ratesForStay, seasonsInStay } from "./rates";
import type { RoomOffer, SearchResult, StaySearch } from "./types";

export type SearchIssue = {
  field: "checkIn" | "checkOut" | "guests" | "rooms";
  message: string;
};

export function validateSearch(search: Partial<StaySearch>): SearchIssue[] {
  const issues: SearchIssue[] = [];
  const { checkIn, checkOut, guests = 2, rooms: roomCount = 1 } = search;
  const today = toISODate(startOfToday());

  if (!isValidISODate(checkIn)) {
    issues.push({ field: "checkIn", message: "Choose an arrival date." });
  } else if (checkIn < today) {
    issues.push({ field: "checkIn", message: "Arrival cannot be in the past." });
  }

  if (!isValidISODate(checkOut)) {
    issues.push({ field: "checkOut", message: "Choose a departure date." });
  }

  if (isValidISODate(checkIn) && isValidISODate(checkOut)) {
    const nights = nightsBetween(checkIn, checkOut);
    if (nights < 1) {
      issues.push({ field: "checkOut", message: "Departure must be after arrival." });
    } else if (nights > site.policy.maxNights) {
      issues.push({
        field: "checkOut",
        message: `Stays of more than ${site.policy.maxNights} nights are arranged by our reservations team.`,
      });
    }
  }

  if (roomCount < 1 || roomCount > site.policy.maxRooms) {
    issues.push({
      field: "rooms",
      message: `Up to ${site.policy.maxRooms} rooms can be booked online. For more, talk to us.`,
    });
  }

  const capacity = roomCount * site.policy.maxGuestsPerRoom;
  if (guests < 1) {
    issues.push({ field: "guests", message: "At least one guest." });
  } else if (guests > capacity) {
    issues.push({
      field: "guests",
      message: `${guests} guests need more than ${roomCount} ${roomCount === 1 ? "room" : "rooms"}.`,
    });
  }

  return issues;
}

function scarcityLabel(available: number): string | undefined {
  if (available === 1) return "Last key at this rate";
  if (available === 2) return "Only 2 keys left";
  if (available === 3) return "3 keys left";
  return undefined;
}

/**
 * The demo equivalent of a channel-manager search. Everything is computed
 * locally and deterministically; the delay is there so the interface has to
 * handle a real loading state.
 */
export async function searchStays(search: StaySearch): Promise<SearchResult> {
  await delay(560);

  const { checkIn, checkOut, guests, rooms: roomCount } = search;
  const nightCount = nightsBetween(checkIn, checkOut);
  /**
   * Whether a code qualifies depends only on the nights in the stay, so it is
   * evaluated once here for the label. The money is recomputed per category
   * below, because a percentage is worth more on a suite than on a garden room.
   */
  const promo = evaluatePromo(
    search.promoCode,
    ratesForStay(rooms[0].baseRate, checkIn, checkOut),
    roomCount,
  );

  const offers: RoomOffer[] = [];
  const withheld: RoomOffer[] = [];

  for (const room of rooms) {
    const available = availabilityFor(room, checkIn, checkOut);
    const fitsGuests = guests <= roomCount * room.maxGuests;
    const roomPromo = promo?.applied
      ? evaluatePromo(search.promoCode, ratesForStay(room.baseRate, checkIn, checkOut), roomCount)
      : promo;
    const charges = buildCharges(room.baseRate, checkIn, checkOut, roomCount, roomPromo);

    const offer: RoomOffer = {
      roomSlug: room.slug,
      available,
      bookable: available >= roomCount,
      fitsGuests,
      charges,
      lowestNightly: lowestNightly(charges.nights),
      scarcity: available >= roomCount ? scarcityLabel(available) : undefined,
    };

    if (offer.bookable && offer.fitsGuests) offers.push(offer);
    else withheld.push(offer);
  }

  return {
    search,
    nightCount,
    offers,
    withheld,
    promo,
    blockedNights: blockedNightsIn(checkIn, checkOut),
    seasons: seasonsInStay(checkIn, checkOut),
  };
}
