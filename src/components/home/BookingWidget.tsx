"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { AvailabilityCalendar, type DateRange } from "@/components/booking/AvailabilityCalendar";
import { Button } from "@/components/ui/Button";
import { IconCalendar, IconSpinner } from "@/components/ui/Icons";
import { Stepper } from "@/components/ui/Stepper";
import { validateSearch } from "@/lib/booking/service";
import { formatShortDate, nightsBetween } from "@/lib/format";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * The property's search box. It collects a stay and hands it to /booking as
 * query parameters, so the booking flow is linkable and refresh-safe.
 */
export function BookingWidget({ className }: { className?: string }) {
  const router = useRouter();
  const [range, setRange] = useState<DateRange>({ checkIn: null, checkOut: null });
  const [guests, setGuests] = useState(2);
  const [roomCount, setRoomCount] = useState(1);
  const [promo, setPromo] = useState("");
  const [showPromo, setShowPromo] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const nights = range.checkIn && range.checkOut ? nightsBetween(range.checkIn, range.checkOut) : 0;

  const dateLabel = range.checkIn
    ? `${formatShortDate(range.checkIn)} → ${range.checkOut ? formatShortDate(range.checkOut) : "Departure"}`
    : "Add your dates";

  function handleRange(next: DateRange) {
    setRange(next);
    setError(null);
    if (next.checkIn && next.checkOut) setOpen(false);
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const issues = validateSearch({
      checkIn: range.checkIn ?? undefined,
      checkOut: range.checkOut ?? undefined,
      guests,
      rooms: roomCount,
    });

    if (issues.length > 0) {
      setError(issues[0].message);
      if (issues[0].field === "checkIn" || issues[0].field === "checkOut") setOpen(true);
      return;
    }

    setError(null);
    setPending(true);
    const params = new URLSearchParams({
      checkIn: range.checkIn as string,
      checkOut: range.checkOut as string,
      guests: String(guests),
      rooms: String(roomCount),
    });
    if (promo.trim()) params.set("promo", promo.trim().toUpperCase());
    router.push(`/booking?${params.toString()}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("border border-line bg-cream shadow-lift", className)}
      aria-label="Check availability"
    >
      <div className="grid divide-y divide-line lg:grid-cols-[1.5fr_1fr_1fr_1.1fr] lg:divide-x lg:divide-y-0">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          className="flex items-center justify-between gap-5 px-6 py-5 text-left transition-colors duration-300 hover:bg-ivory"
        >
          <span>
            <span className="t-caption block font-medium tracking-[0.16em] uppercase text-espresso">
              Dates
            </span>
            <span className="mt-2 block font-serif text-xl leading-none font-light text-ink">
              {dateLabel}
            </span>
          </span>
          <IconCalendar className="h-5 w-5 shrink-0 text-brass" />
        </button>

        <div className="px-6 py-5">
          <Stepper
            label="Guests"
            value={guests}
            min={1}
            max={site.policy.maxRooms * site.policy.maxGuestsPerRoom}
            onChange={(value) => {
              setGuests(value);
              setError(null);
            }}
          />
        </div>

        <div className="px-6 py-5">
          <Stepper
            label="Rooms"
            value={roomCount}
            min={1}
            max={site.policy.maxRooms}
            onChange={(value) => {
              setRoomCount(value);
              setError(null);
            }}
          />
        </div>

        <div className="p-5 lg:p-4">
          <Button type="submit" size="lg" block disabled={pending} className="h-full">
            {pending ? (
              <>
                <IconSpinner className="h-4 w-4 animate-spin" />
                Searching
              </>
            ) : (
              "Check Availability"
            )}
          </Button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-line px-5 py-6 lg:px-8 lg:py-8">
          <AvailabilityCalendar value={range} onChange={handleRange} />
        </div>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-line bg-ivory px-6 py-4">
        {error ? (
          <p role="alert" className="t-small text-danger">
            {error}
          </p>
        ) : (
          <p className="t-caption text-muted">
            {nights > 0
              ? `${nights} ${nights === 1 ? "night" : "nights"} · rates include breakfast, before GST`
              : `Direct rates include breakfast · ${site.policy.cancellation}`}
          </p>
        )}

        {showPromo ? (
          <label className="flex items-center gap-3">
            <span className="t-caption font-medium tracking-[0.16em] uppercase text-espresso">
              Promo
            </span>
            <input
              value={promo}
              onChange={(event) => setPromo(event.target.value)}
              placeholder="HAVEN10"
              aria-label="Promo code"
              maxLength={16}
              className="num h-9 w-32 border border-line bg-cream px-3 text-sm tracking-[0.12em] uppercase text-ink placeholder:text-stone/70 focus:border-brass focus:outline-none"
            />
          </label>
        ) : (
          <button
            type="button"
            onClick={() => setShowPromo(true)}
            className="link-underline t-caption tracking-[0.18em] uppercase text-brass"
          >
            Add a promo code
          </button>
        )}
      </div>
    </form>
  );
}
