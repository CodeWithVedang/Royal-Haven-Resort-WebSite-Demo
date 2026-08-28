"use client";

import { AvailabilityCalendar, type DateRange } from "@/components/booking/AvailabilityCalendar";
import { Button } from "@/components/ui/Button";
import { Field, Input } from "@/components/ui/Field";
import { IconSpinner } from "@/components/ui/Icons";
import { Stepper } from "@/components/ui/Stepper";
import { promoOffers } from "@/lib/booking/pricing";
import { site } from "@/lib/site";

/** Step one: the stay itself. The calendar is always open on this page. */
export function DatesStep({
  range,
  guests,
  rooms,
  promo,
  error,
  pending,
  onRange,
  onGuests,
  onRooms,
  onPromo,
  onSubmit,
}: {
  range: DateRange;
  guests: number;
  rooms: number;
  promo: string;
  error: string | null;
  pending: boolean;
  onRange: (range: DateRange) => void;
  onGuests: (value: number) => void;
  onRooms: (value: number) => void;
  onPromo: (value: string) => void;
  onSubmit: () => void;
}) {
  return (
    <form
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
      className="grid gap-10 lg:grid-cols-12 lg:gap-14"
    >
      <div className="lg:col-span-8">
        <h2 className="t-h3 text-ink">When would you like to arrive?</h2>
        <p className="t-small mt-3 max-w-xl text-muted">
          Rates move with the season, so the calendar shows the lowest available rate for each night.
          Stays of up to {site.policy.maxNights} nights can be booked here.
        </p>

        <div className="mt-9 border border-line bg-cream p-5 lg:p-7">
          <AvailabilityCalendar value={range} onChange={onRange} months={2} />
        </div>
      </div>

      <div className="lg:col-span-4">
        <div className="border border-line bg-cream p-6 lg:p-7">
          <p className="t-eyebrow text-brass">Your party</p>

          <div className="mt-6 space-y-6">
            <Stepper
              label="Guests"
              value={guests}
              min={1}
              max={site.policy.maxRooms * site.policy.maxGuestsPerRoom}
              onChange={onGuests}
            />
            <div className="border-t border-line pt-6">
              <Stepper
                label="Rooms"
                value={rooms}
                min={1}
                max={site.policy.maxRooms}
                onChange={onRooms}
              />
            </div>
          </div>

          <div className="mt-7 border-t border-line pt-6">
            <Field label="Promo code" htmlFor="promo" hint="Optional">
              <Input
                id="promo"
                name="promo"
                value={promo}
                maxLength={16}
                placeholder="HAVEN10"
                onChange={(event) => onPromo(event.target.value.toUpperCase())}
                className="num tracking-[0.12em] uppercase"
              />
            </Field>
            <ul className="mt-4 space-y-2">
              {promoOffers.map((offer) => (
                <li key={offer.code} className="t-caption text-muted">
                  <button
                    type="button"
                    onClick={() => onPromo(offer.code)}
                    className="num tracking-[0.14em] text-brass transition-colors hover:text-ink"
                  >
                    {offer.code}
                  </button>
                  <span className="ml-2">{offer.blurb}</span>
                </li>
              ))}
            </ul>
          </div>

          {error ? (
            <p role="alert" className="t-small mt-6 border-l-2 border-danger pl-4 text-danger">
              {error}
            </p>
          ) : null}

          <Button type="submit" size="lg" block disabled={pending} className="mt-7">
            {pending ? (
              <>
                <IconSpinner className="h-4 w-4 animate-spin" />
                Checking availability
              </>
            ) : (
              "Check Availability"
            )}
          </Button>

          <p className="t-caption mt-5 text-stone">
            {site.policy.cancellation} No card details are needed to hold a room.
          </p>
        </div>
      </div>
    </form>
  );
}
