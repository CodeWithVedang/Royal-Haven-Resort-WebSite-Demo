"use client";

import { getRoom } from "@/data/rooms";
import { formatINR, formatLongDate, stayHeadline } from "@/lib/format";
import { site } from "@/lib/site";
import type { Charges, StaySearch } from "@/lib/booking/types";

type SummaryPanelProps = {
  search: StaySearch;
  roomSlug: string | null;
  charges: Charges | null;
  promoLabel?: string;
  /** Rendered under the totals — the primary action for the current step. */
  footer?: React.ReactNode;
  className?: string;
};

/** The running bill. Sticky on desktop, inline above the action on mobile. */
export function SummaryPanel({
  search,
  roomSlug,
  charges,
  promoLabel,
  footer,
  className,
}: SummaryPanelProps) {
  const room = roomSlug ? getRoom(roomSlug) : undefined;

  return (
    <aside
      aria-label="Reservation summary"
      className={`border border-line bg-cream p-6 lg:p-7 ${className ?? ""}`}
    >
      <p className="t-eyebrow text-brass">Your stay</p>

      <dl className="mt-6 space-y-4">
        <div className="flex items-baseline justify-between gap-4 border-b border-line pb-4">
          <dt className="t-caption tracking-[0.14em] uppercase text-muted">Check-in</dt>
          <dd className="t-small text-right text-ink">
            {formatLongDate(search.checkIn)}
            <span className="num block text-muted">from {site.policy.checkIn}</span>
          </dd>
        </div>
        <div className="flex items-baseline justify-between gap-4 border-b border-line pb-4">
          <dt className="t-caption tracking-[0.14em] uppercase text-muted">Check-out</dt>
          <dd className="t-small text-right text-ink">
            {formatLongDate(search.checkOut)}
            <span className="num block text-muted">by {site.policy.checkOut}</span>
          </dd>
        </div>
        <div className="flex items-baseline justify-between gap-4 border-b border-line pb-4">
          <dt className="t-caption tracking-[0.14em] uppercase text-muted">Party</dt>
          <dd className="t-small num text-right text-ink">
            {stayHeadline(search.guests, search.rooms, charges?.nightCount ?? 0)}
          </dd>
        </div>
        {room ? (
          <div className="flex items-baseline justify-between gap-4 border-b border-line pb-4">
            <dt className="t-caption tracking-[0.14em] uppercase text-muted">Room</dt>
            <dd className="t-small text-right text-ink">
              {room.name}
              {search.rooms > 1 ? <span className="num text-muted"> × {search.rooms}</span> : null}
            </dd>
          </div>
        ) : null}
      </dl>

      {charges ? (
        <dl className="mt-6 space-y-3">
          <div className="flex items-baseline justify-between gap-4">
            <dt className="t-small text-espresso">
              {charges.nightCount} {charges.nightCount === 1 ? "night" : "nights"}
              {charges.roomCount > 1 ? ` × ${charges.roomCount} rooms` : ""}
            </dt>
            <dd className="t-small num text-ink">{formatINR(charges.subtotal)}</dd>
          </div>
          {charges.discount > 0 ? (
            <div className="flex items-baseline justify-between gap-4">
              <dt className="t-small text-success">{promoLabel ?? "Promotion"}</dt>
              <dd className="t-small num text-success">− {formatINR(charges.discount)}</dd>
            </div>
          ) : null}
          <div className="flex items-baseline justify-between gap-4">
            <dt className="t-small text-espresso">
              GST
              <span className="num text-muted">
                {" "}
                · {Math.round(charges.effectiveTaxRate * 100)}%
              </span>
            </dt>
            <dd className="t-small num text-ink">{formatINR(charges.taxes)}</dd>
          </div>
          <div className="mt-4 flex items-baseline justify-between gap-4 border-t border-ink/15 pt-4">
            <dt className="t-caption tracking-[0.16em] uppercase text-espresso">Total payable</dt>
            <dd className="num font-serif text-3xl leading-none font-normal text-ink">
              {formatINR(charges.total)}
            </dd>
          </div>
        </dl>
      ) : (
        <p className="t-small mt-6 text-muted">
          Choose a room to see the full breakdown, taxes included.
        </p>
      )}

      {footer ? <div className="mt-7">{footer}</div> : null}

      <p className="t-caption mt-6 border-t border-line pt-5 text-stone">
        {site.policy.cancellation} Rates include breakfast for two.
      </p>
    </aside>
  );
}
