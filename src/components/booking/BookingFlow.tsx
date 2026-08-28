"use client";

import { useCallback, useEffect, useMemo, useReducer } from "react";
import { useRouter } from "next/navigation";
import { Confirmation } from "@/components/booking/Confirmation";
import { DatesStep } from "@/components/booking/DatesStep";
import { GuestForm, validateGuest, type GuestErrors } from "@/components/booking/GuestForm";
import { ReviewStep } from "@/components/booking/ReviewStep";
import { RoomOfferCard, WithheldOffer } from "@/components/booking/RoomOfferCard";
import { StepRail, type BookingStep } from "@/components/booking/StepRail";
import { SummaryPanel } from "@/components/booking/SummaryPanel";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Badge";
import { IconWhatsApp } from "@/components/ui/Icons";
import { getRoom } from "@/data/rooms";
import { searchStays, validateSearch } from "@/lib/booking/service";
import { createReservation, saveReservation } from "@/lib/booking/reservation";
import { authorisePayment, type PaymentOutcome } from "@/lib/payments";
import { whatsappHref } from "@/lib/site";
import { EMPTY_GUEST } from "@/lib/booking/types";
import type {
  GuestDetails,
  PaymentMode,
  Reservation,
  RoomOffer,
  SearchResult,
  SearchStatus,
  StaySearch,
} from "@/lib/booking/types";
import type { DateRange } from "@/components/booking/AvailabilityCalendar";

export type BookingIntent = {
  checkIn: string | null;
  checkOut: string | null;
  guests: number;
  rooms: number;
  promo: string;
  /** True when the URL already carried a valid stay, so we search on mount. */
  ready: boolean;
};

type State = {
  step: BookingStep;
  range: DateRange;
  guests: number;
  rooms: number;
  promo: string;
  status: SearchStatus;
  result: SearchResult | null;
  error: string | null;
  selected: string | null;
  guest: GuestDetails;
  guestErrors: GuestErrors;
  paymentMode: PaymentMode;
  pending: boolean;
  reservation: Reservation | null;
  payment: PaymentOutcome | null;
};

type Action =
  | { type: "range"; range: DateRange }
  | { type: "guests"; value: number }
  | { type: "rooms"; value: number }
  | { type: "promo"; value: string }
  | { type: "step"; step: BookingStep }
  | { type: "search:start" }
  | { type: "search:done"; result: SearchResult }
  | { type: "search:fail"; message: string }
  | { type: "search:invalid"; message: string }
  | { type: "select"; roomSlug: string }
  | { type: "guest:patch"; patch: Partial<GuestDetails> }
  | { type: "guest:errors"; errors: GuestErrors }
  | { type: "payment:mode"; mode: PaymentMode }
  | { type: "confirm:start" }
  | { type: "confirm:done"; reservation: Reservation; payment: PaymentOutcome };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "range":
      return { ...state, range: action.range, error: null };
    case "guests":
      return { ...state, guests: action.value, error: null };
    case "rooms":
      return { ...state, rooms: action.value, error: null };
    case "promo":
      return { ...state, promo: action.value };
    case "step":
      return { ...state, step: action.step, error: null };
    case "search:start":
      return { ...state, status: "loading", error: null, selected: null, step: "rooms" };
    case "search:done":
      return {
        ...state,
        status: action.result.offers.length > 0 ? "ready" : "empty",
        result: action.result,
        step: "rooms",
      };
    case "search:fail":
      return { ...state, status: "error", error: action.message, step: "rooms" };
    case "search:invalid":
      return { ...state, status: "idle", error: action.message, step: "dates" };
    case "select":
      return { ...state, selected: action.roomSlug, step: "review" };
    case "guest:patch":
      return { ...state, guest: { ...state.guest, ...action.patch } };
    case "guest:errors":
      return { ...state, guestErrors: action.errors, pending: false };
    case "payment:mode":
      return { ...state, paymentMode: action.mode };
    case "confirm:start":
      return { ...state, pending: true, guestErrors: {} };
    case "confirm:done":
      return {
        ...state,
        pending: false,
        reservation: action.reservation,
        payment: action.payment,
        step: "confirmed",
      };
    default:
      return state;
  }
}

function initialState(intent: BookingIntent): State {
  return {
    step: intent.ready ? "rooms" : "dates",
    range: { checkIn: intent.checkIn, checkOut: intent.checkOut },
    guests: intent.guests,
    rooms: intent.rooms,
    promo: intent.promo,
    status: intent.ready ? "loading" : "idle",
    result: null,
    error: null,
    selected: null,
    guest: EMPTY_GUEST,
    guestErrors: {},
    paymentMode: "pay-at-hotel",
    pending: false,
    reservation: null,
    payment: null,
  };
}
export function BookingFlow({ intent }: { intent: BookingIntent }) {
  const router = useRouter();
  const [state, dispatch] = useReducer(reducer, intent, initialState);

  const selectedOffer: RoomOffer | null = useMemo(() => {
    if (!state.result || !state.selected) return null;
    return state.result.offers.find((offer) => offer.roomSlug === state.selected) ?? null;
  }, [state.result, state.selected]);

  const runSearch = useCallback(
    async (search: StaySearch) => {
      dispatch({ type: "search:start" });
      try {
        const result = await searchStays(search);
        dispatch({ type: "search:done", result });
      } catch {
        dispatch({
          type: "search:fail",
          message: "We could not reach the availability service. Please try again.",
        });
      }
    },
    [dispatch],
  );

  /** A stay arriving in the URL is searched immediately, once. */
  useEffect(() => {
    if (!intent.ready || !intent.checkIn || !intent.checkOut) return;
    void runSearch({
      checkIn: intent.checkIn,
      checkOut: intent.checkOut,
      guests: intent.guests,
      rooms: intent.rooms,
      promoCode: intent.promo || undefined,
    });
  }, [intent, runSearch]);

  function handleSearch() {
    const issues = validateSearch({
      checkIn: state.range.checkIn ?? undefined,
      checkOut: state.range.checkOut ?? undefined,
      guests: state.guests,
      rooms: state.rooms,
    });

    if (issues.length > 0) {
      dispatch({ type: "search:invalid", message: issues[0].message });
      return;
    }

    const search: StaySearch = {
      checkIn: state.range.checkIn as string,
      checkOut: state.range.checkOut as string,
      guests: state.guests,
      rooms: state.rooms,
      promoCode: state.promo.trim() || undefined,
    };

    const params = new URLSearchParams({
      checkIn: search.checkIn,
      checkOut: search.checkOut,
      guests: String(search.guests),
      rooms: String(search.rooms),
    });
    if (search.promoCode) params.set("promo", search.promoCode);
    router.replace(`/booking?${params.toString()}`, { scroll: false });

    void runSearch(search);
  }

  async function handleConfirm() {
    if (!selectedOffer || !state.result) return;

    const errors = validateGuest(state.guest);
    if (Object.keys(errors).length > 0) {
      dispatch({ type: "guest:errors", errors });
      return;
    }

    dispatch({ type: "confirm:start" });

    const room = getRoom(selectedOffer.roomSlug);
    const reservation = createReservation({
      search: state.result.search,
      roomSlug: selectedOffer.roomSlug,
      roomName: room?.name ?? "Room",
      charges: selectedOffer.charges,
      guest: state.guest,
      paymentMode: state.paymentMode,
    });

    const payment =
      state.paymentMode === "pay-now"
        ? await authorisePayment({
            amount: selectedOffer.charges.total,
            currency: "INR",
            reference: reservation.code,
            description: `${reservation.roomName} · ${selectedOffer.charges.nightCount} nights`,
          })
        : {
            provider: reservation.paymentProvider as PaymentOutcome["provider"],
            status: "simulated" as const,
            captured: false,
            message: "Nothing charged now — the bill is settled at the front desk on departure.",
          };

    saveReservation(reservation);
    dispatch({ type: "confirm:done", reservation, payment });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  if (state.step === "confirmed" && state.reservation) {
    return <Confirmation reservation={state.reservation} payment={state.payment} />;
  }

  const search = state.result?.search;
  const charges = selectedOffer?.charges ?? null;

  return (
    <div>
      <StepRail
        current={state.step}
        onJump={(step) => {
          if (step === "dates") dispatch({ type: "step", step: "dates" });
          if (step === "rooms" && state.result) dispatch({ type: "step", step: "rooms" });
          if (step === "review" && selectedOffer) dispatch({ type: "step", step: "review" });
        }}
      />

      <div className="mt-10 lg:mt-14">
        {state.step === "dates" ? (
          <DatesStep
            range={state.range}
            guests={state.guests}
            rooms={state.rooms}
            promo={state.promo}
            error={state.error}
            pending={state.status === "loading"}
            onRange={(range) => dispatch({ type: "range", range })}
            onGuests={(value) => dispatch({ type: "guests", value })}
            onRooms={(value) => dispatch({ type: "rooms", value })}
            onPromo={(value) => dispatch({ type: "promo", value })}
            onSubmit={handleSearch}
          />
        ) : null}

        {state.step !== "dates" && search ? (
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-8">
              {state.step === "rooms" ? (
                <RoomsStepBody
                  status={state.status}
                  result={state.result}
                  selected={state.selected}
                  error={state.error}
                  onSelect={(roomSlug) => dispatch({ type: "select", roomSlug })}
                  onEditDates={() => dispatch({ type: "step", step: "dates" })}
                />
              ) : null}

              {state.step === "review" && selectedOffer ? (
                <ReviewStep
                  offer={selectedOffer}
                  onContinue={() => dispatch({ type: "step", step: "guest" })}
                  onBack={() => dispatch({ type: "step", step: "rooms" })}
                />
              ) : null}

              {state.step === "guest" && selectedOffer ? (
                <GuestForm
                  guest={state.guest}
                  errors={state.guestErrors}
                  paymentMode={state.paymentMode}
                  pending={state.pending}
                  onChange={(patch) => dispatch({ type: "guest:patch", patch })}
                  onPaymentModeChange={(mode) => dispatch({ type: "payment:mode", mode })}
                  onSubmit={() => void handleConfirm()}
                  onBack={() => dispatch({ type: "step", step: "review" })}
                />
              ) : null}
            </div>

            <div className="lg:col-span-4">
              <SummaryPanel
                search={search}
                roomSlug={state.selected}
                charges={charges}
                promoLabel={state.result?.promo?.label}
                className="lg:sticky lg:top-28"
                footer={
                  state.step === "rooms" ? (
                    <Button variant="outline" block onClick={() => dispatch({ type: "step", step: "dates" })}>
                      Change dates
                    </Button>
                  ) : null
                }
              />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
/** The results step: loading, ready, sold-out and failure states all live here. */
function RoomsStepBody({
  status,
  result,
  selected,
  error,
  onSelect,
  onEditDates,
}: {
  status: SearchStatus;
  result: SearchResult | null;
  selected: string | null;
  error: string | null;
  onSelect: (roomSlug: string) => void;
  onEditDates: () => void;
}) {
  if (status === "loading") {
    return (
      <div>
        <h2 className="t-h3 text-ink">Checking the chart…</h2>
        <p className="t-small mt-3 text-muted">Holding rates for your dates while we look.</p>
        <div className="mt-9 space-y-5">
          {[0, 1, 2].map((row) => (
            <div key={row} className="grid gap-6 border border-line bg-cream p-4 sm:grid-cols-[13rem_1fr] lg:grid-cols-[17rem_1fr] lg:gap-8 lg:p-5">
              <Skeleton className="aspect-4/3 w-full sm:aspect-square lg:aspect-4/3" />
              <div className="space-y-3 py-1">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-6 w-2/3" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-4/5" />
                <Skeleton className="mt-6 h-9 w-40" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="border border-line bg-cream p-7 lg:p-9">
        <h2 className="t-h3 text-ink">The chart did not load.</h2>
        <p className="t-small mt-3 max-w-md text-muted">
          {error ?? "Something interrupted the availability service."} Our reservations desk can
          confirm the same rates by message.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Button onClick={onEditDates}>Try different dates</Button>
          <Button href={whatsappHref()} variant="outline" external>
            <IconWhatsApp className="h-4 w-4" />
            Plan Your Stay on WhatsApp
          </Button>
        </div>
      </div>
    );
  }
  if (!result) return null;

  const promo = result.promo;

  if (status === "empty") {
    return (
      <div>
        <h2 className="t-h3 text-ink">Nothing free on these dates.</h2>
        <p className="t-small mt-3 max-w-lg text-muted">
          The house is full, or the party is larger than a single category takes. Shifting the stay
          by a night usually opens something — and the desk can split a booking across two rooms.
        </p>

        {result.withheld.length > 0 ? (
          <ul className="mt-8 border-t border-line">
            {result.withheld.map((offer) => (
              <WithheldOffer key={offer.roomSlug} offer={offer} />
            ))}
          </ul>
        ) : null}

        <div className="mt-8 flex flex-wrap gap-3">
          <Button onClick={onEditDates} arrow>
            Change dates
          </Button>
          <Button href={whatsappHref("Hello Royal Haven, I could not find availability online. Could you help me with dates?")} variant="outline" external>
            <IconWhatsApp className="h-4 w-4" />
            Ask the reservations desk
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="t-h3 text-ink">
        {result.offers.length === 1 ? "One category is open" : `${result.offers.length} categories are open`}
      </h2>
      <p className="t-small mt-3 max-w-xl text-muted">
        Rates below are for the whole stay, per room, and include breakfast for two. Taxes are shown
        in the summary — nothing is charged until the front desk.
      </p>

      {promo && !promo.applied && promo.message ? (
        <p className="t-caption mt-5 border-l-2 border-brass/60 pl-4 text-muted">{promo.message}</p>
      ) : null}
      {promo?.applied ? (
        <p className="t-caption mt-5 border-l-2 border-success/60 pl-4 text-success">
          {promo.label} applied to every night.
        </p>
      ) : null}
      <div className="mt-9 space-y-5">
        {result.offers.map((offer) => (
          <RoomOfferCard
            key={offer.roomSlug}
            offer={offer}
            selected={selected === offer.roomSlug}
            onSelect={() => onSelect(offer.roomSlug)}
          />
        ))}
      </div>

      {result.withheld.length > 0 ? (
        <div className="mt-11">
          <p className="t-caption tracking-[0.16em] uppercase text-muted">Not available for this stay</p>
          <ul className="mt-4 border-t border-line">
            {result.withheld.map((offer) => (
              <WithheldOffer key={offer.roomSlug} offer={offer} />
            ))}
          </ul>
        </div>
      ) : null}

      <p className="t-caption mt-9 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-line pt-6 text-muted">
        Prefer to talk it through?
        <a
          href={whatsappHref("Hello Royal Haven, I am looking at rooms for my dates and have a question.")}
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline inline-flex items-center gap-2 text-espresso"
        >
          <IconWhatsApp className="h-4 w-4 text-brass" />
          Message the reservations desk
        </a>
      </p>
    </div>
  );
}
