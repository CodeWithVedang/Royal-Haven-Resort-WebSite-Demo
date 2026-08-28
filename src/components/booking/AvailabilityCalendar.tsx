"use client";

import { useState, useSyncExternalStore } from "react";
import { Skeleton } from "@/components/ui/Badge";
import { IconArrowLeft, IconArrowRight } from "@/components/ui/Icons";
import { dayInfo, monthInfo, type DayInfo } from "@/lib/booking/availability";
import {
  WEEKDAY_LABELS,
  addDays,
  addMonths,
  formatCompactINR,
  formatFullDate,
  fromISODate,
  isBetweenISO,
  mondayIndex,
  monthLabel,
  nightsBetween,
  startOfToday,
  toISODate,
} from "@/lib/format";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export type DateRange = { checkIn: string | null; checkOut: string | null };

type CalendarProps = {
  value: DateRange;
  onChange: (range: DateRange) => void;
  /** Second month appears from `lg` upwards. */
  months?: 1 | 2;
  showRates?: boolean;
  className?: string;
};

/** How far ahead the demo inventory is published. */
const MAX_MONTHS_AHEAD = 17;

/** Client-only render gate: no subscription, so the snapshot never changes. */
const subscribeNothing = () => () => {};

/** Every night from `start` (inclusive) to `end` (exclusive) must be sellable. */
function rangeIsOpen(start: string, end: string): boolean {
  for (let iso = start; iso < end; iso = toISODate(addDays(fromISODate(iso), 1))) {
    const info = dayInfo(iso);
    if (info.soldOut || info.buyout) return false;
  }
  return true;
}

export function AvailabilityCalendar({
  value,
  onChange,
  months = 2,
  showRates = true,
  className,
}: CalendarProps) {
  // The grid depends on today's date, so it is rendered after mount to keep
  // server and client markup identical across time zones.
  const mounted = useSyncExternalStore(
    subscribeNothing,
    () => true,
    () => false,
  );
  // Opens on the month of an incoming check-in (URL params, or a range carried
  // back from a later step); after that the guest's paging decides the view.
  const [cursor, setCursor] = useState(() =>
    value.checkIn ? fromISODate(value.checkIn) : startOfToday(),
  );
  const [hover, setHover] = useState<string | null>(null);

  const today = startOfToday();
  const todayISO = toISODate(today);
  const monthStart = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
  const monthsAhead =
    (monthStart.getFullYear() - today.getFullYear()) * 12 + monthStart.getMonth() - today.getMonth();
  const canGoBack = monthsAhead > 0;
  const canGoForward = monthsAhead < MAX_MONTHS_AHEAD - (months - 1);

  const { checkIn, checkOut } = value;
  const picking = Boolean(checkIn && !checkOut);
  const rangeEnd = checkOut ?? (picking && hover && checkIn && hover > checkIn ? hover : null);

  function select(iso: string) {
    if (!checkIn || checkOut || iso <= checkIn) {
      onChange({ checkIn: iso, checkOut: null });
      return;
    }
    const nights = nightsBetween(checkIn, iso);
    if (nights > site.policy.maxNights || !rangeIsOpen(checkIn, iso)) {
      onChange({ checkIn: iso, checkOut: null });
      return;
    }
    onChange({ checkIn, checkOut: iso });
  }

  function renderDay(info: DayInfo) {
    const iso = info.date;
    const past = iso < todayISO;
    const closed = info.soldOut || info.buyout;
    const asCheckOut =
      picking &&
      checkIn !== null &&
      iso > checkIn &&
      nightsBetween(checkIn, iso) <= site.policy.maxNights &&
      rangeIsOpen(checkIn, iso);
    const disabled = past || (closed && !asCheckOut);
    const isStart = iso === checkIn;
    const isEnd = iso === rangeEnd;
    const inRange = Boolean(checkIn && rangeEnd && isBetweenISO(iso, checkIn, rangeEnd));

    const reason = info.buyout
      ? "held for a private celebration"
      : past
        ? "in the past"
        : "no availability";

    return (
      <button
        key={iso}
        type="button"
        disabled={disabled}
        onClick={() => select(iso)}
        onMouseEnter={() => setHover(iso)}
        onFocus={() => setHover(iso)}
        aria-label={
          disabled
            ? `${formatFullDate(iso)} — ${reason}`
            : `${formatFullDate(iso)}, from ${formatCompactINR(info.lowestRate)} a night`
        }
        aria-pressed={isStart || isEnd}
        className={cn(
          "relative flex h-13 flex-col items-center justify-center gap-1 border border-transparent transition-colors duration-200",
          disabled && "cursor-not-allowed text-stone/45",
          !disabled &&
            !isStart &&
            !isEnd &&
            !inRange &&
            "text-charcoal hover:border-ink/15 hover:bg-sand",
          inRange && "bg-sand text-ink",
          (isStart || isEnd) && "bg-ink text-cream",
        )}
      >
        <span
          className={cn(
            "num text-[0.9375rem] leading-none",
            disabled && closed && "line-through decoration-stone/50",
          )}
        >
          {fromISODate(iso).getDate()}
        </span>
        {showRates ? (
          <span
            className={cn(
              "num text-[0.5625rem] leading-none tracking-wide",
              isStart || isEnd ? "text-cream/70" : "text-muted",
            )}
          >
            {closed ? "—" : formatCompactINR(info.lowestRate)}
          </span>
        ) : null}
      </button>
    );
  }

  function renderMonth(offset: number) {
    const date = addMonths(monthStart, offset);
    return (
      <div key={offset} className={offset > 0 ? "hidden lg:block" : undefined}>
        <div className="grid grid-cols-7">
          {WEEKDAY_LABELS.map((day, index) => (
            <span key={index} className="t-caption pb-2 text-center text-stone">
              {day}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-px" onMouseLeave={() => setHover(null)}>
          {Array.from({ length: mondayIndex(date) }, (_, i) => (
            <span key={`lead-${i}`} aria-hidden="true" />
          ))}
          {monthInfo(date.getFullYear(), date.getMonth()).map(renderDay)}
        </div>
      </div>
    );
  }

  if (!mounted) {
    return (
      <div className={cn("select-none", className)} aria-busy="true">
        <div className="flex items-center justify-between border-b border-line pb-4">
          <Skeleton className="h-6 w-36" />
          <Skeleton className="h-6 w-20" />
        </div>
        <div className="mt-6 grid grid-cols-7 gap-px lg:grid-cols-14">
          {Array.from({ length: 35 }, (_, i) => (
            <Skeleton key={i} className="h-13" />
          ))}
        </div>
        <span className="sr-only">Loading availability…</span>
      </div>
    );
  }

  const nights = checkIn && checkOut ? nightsBetween(checkIn, checkOut) : 0;
  const status = !checkIn
    ? "Select your arrival date."
    : !checkOut
      ? "Now select your departure date."
      : `${nights} ${nights === 1 ? "night" : "nights"} · ${formatFullDate(checkIn)} to ${formatFullDate(checkOut)}`;

  return (
    <div className={cn("select-none", className)}>
      <div className="flex items-center gap-2 border-b border-line pb-4">
        <button
          type="button"
          onClick={() => setCursor(addMonths(monthStart, -1))}
          disabled={!canGoBack}
          aria-label="Previous month"
          className="flex h-11 w-11 shrink-0 items-center justify-center border border-line text-ink transition-colors duration-300 hover:border-ink disabled:pointer-events-none disabled:opacity-30"
        >
          <IconArrowLeft className="h-4 w-4" />
        </button>
        <div className="flex flex-1 items-center justify-around gap-4">
          <p className="t-h4 text-ink">{monthLabel(monthStart)}</p>
          {months === 2 ? (
            <p className="t-h4 hidden text-ink lg:block">{monthLabel(addMonths(monthStart, 1))}</p>
          ) : null}
        </div>
        <button
          type="button"
          onClick={() => setCursor(addMonths(monthStart, 1))}
          disabled={!canGoForward}
          aria-label="Next month"
          className="flex h-11 w-11 shrink-0 items-center justify-center border border-line text-ink transition-colors duration-300 hover:border-ink disabled:pointer-events-none disabled:opacity-30"
        >
          <IconArrowRight className="h-4 w-4" />
        </button>
      </div>

      <p className="t-caption mt-4 text-muted" aria-live="polite">
        {status}
      </p>

      <div className={cn("mt-4 grid gap-10", months === 2 && "lg:grid-cols-2")}>
        {Array.from({ length: months }, (_, offset) => renderMonth(offset))}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
        <ul className="t-caption flex flex-wrap items-center gap-x-6 gap-y-2 text-muted">
          <li className="flex items-center gap-2">
            <span aria-hidden="true" className="h-3 w-3 bg-ink" />
            Selected
          </li>
          <li className="flex items-center gap-2">
            <span aria-hidden="true" className="h-3 w-3 bg-sand" />
            Your stay
          </li>
          <li className="flex items-center gap-2">
            <span aria-hidden="true" className="h-3 w-3 border border-line text-stone" />
            Unavailable
          </li>
          <li>Rates shown are the lowest available, per room, per night.</li>
        </ul>
        {checkIn ? (
          <button
            type="button"
            onClick={() => onChange({ checkIn: null, checkOut: null })}
            className="link-underline t-caption tracking-[0.18em] uppercase text-brass"
          >
            Clear dates
          </button>
        ) : null}
      </div>
    </div>
  );
}

