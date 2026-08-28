/**
 * Booking domain types. The engine is a self-contained demo: it computes real
 * seasonal rates, real Indian GST and deterministic availability, but it never
 * talks to a PMS or a payment gateway. Swapping in a live provider means
 * replacing `availability.ts` and `@/lib/payments` only.
 */

export type SeasonKey = "season" | "summer" | "monsoon" | "festive";

export type Season = {
  key: SeasonKey;
  label: string;
  note: string;
  /** Applied to the room's published floor rate. */
  multiplier: number;
};

export type NightRate = {
  /** yyyy-mm-dd */
  date: string;
  /** The room's published floor rate, before any movement. */
  base: number;
  /** What this specific night costs, rounded to ₹100. */
  rate: number;
  season: SeasonKey;
  weekend: boolean;
};

export type StaySearch = {
  checkIn: string;
  checkOut: string;
  guests: number;
  rooms: number;
  promoCode?: string;
};

export type PromoResult = {
  code: string;
  applied: boolean;
  label: string;
  /** Reason it was rejected, shown quietly next to the field. */
  message?: string;
  amount: number;
};

export type Charges = {
  nights: NightRate[];
  roomCount: number;
  nightCount: number;
  /** rooms × sum of nightly rates, before discount. */
  subtotal: number;
  discount: number;
  /** subtotal − discount, the GST-able value. */
  taxable: number;
  taxes: number;
  total: number;
  averageNightly: number;
  /** Blended GST percentage, for the "incl. 18% GST" line. */
  effectiveTaxRate: number;
};

export type RoomOffer = {
  roomSlug: string;
  /** Keys of this category free for every night of the stay. */
  available: number;
  /** Enough keys for the requested room count. */
  bookable: boolean;
  fitsGuests: boolean;
  charges: Charges;
  /** Cheapest single night in the stay — used for the "from" line. */
  lowestNightly: number;
  /** Set when the category is nearly gone, e.g. "Only 2 keys left". */
  scarcity?: string;
};

export type SearchResult = {
  search: StaySearch;
  nightCount: number;
  offers: RoomOffer[];
  /** Categories that cannot take this stay, kept so the UI can explain why. */
  withheld: RoomOffer[];
  promo: PromoResult | null;
  /** Nights inside the range that the property has on exclusive use. */
  blockedNights: string[];
  seasons: SeasonKey[];
};

export type SearchStatus = "idle" | "loading" | "ready" | "empty" | "error";

export type GuestDetails = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  arrival: string;
  occasion: string;
  requests: string;
};

export type PaymentMode = "pay-now" | "pay-at-hotel";

export type Reservation = {
  code: string;
  createdAt: string;
  status: "confirmed";
  search: StaySearch;
  roomSlug: string;
  roomName: string;
  charges: Charges;
  guest: GuestDetails;
  paymentMode: PaymentMode;
  paymentProvider: string;
  /** True only when a live gateway is configured. Always false in the demo. */
  paymentCaptured: boolean;
};

export const EMPTY_GUEST: GuestDetails = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  city: "",
  arrival: "",
  occasion: "",
  requests: "",
};
