"use client";

import { Button } from "@/components/ui/Button";
import { Figure } from "@/components/ui/Figure";
import { SEASONS } from "@/lib/booking/rates";
import { gstNote } from "@/lib/booking/pricing";
import { getRoom } from "@/data/rooms";
import { formatINR, formatLongDate, isWeekendNight } from "@/lib/format";
import { site } from "@/lib/site";
import type { RoomOffer } from "@/lib/booking/types";

/** Step three: every night priced, in the open, before any details are asked for. */
export function ReviewStep({
  offer,
  onContinue,
  onBack,
}: {
  offer: RoomOffer;
  onContinue: () => void;
  onBack: () => void;
}) {
  const room = getRoom(offer.roomSlug);
  if (!room) return null;

  const { charges } = offer;

  return (
    <div>
      <h2 className="t-h3 text-ink">Review your reservation</h2>
      <p className="t-small mt-3 max-w-xl text-muted">
        Nothing is charged yet. Rates are per room, per night, and include breakfast for two.
      </p>

      <div className="mt-9 grid gap-8 border border-line bg-cream p-5 sm:grid-cols-[14rem_1fr] lg:gap-10 lg:p-7">
        <Figure
          photo={room.photos[0]}
          sizes="(min-width: 640px) 14rem, 100vw"
          source="card"
          className="aspect-4/3 sm:aspect-square"
        />
        <div>
          <p className="t-caption tracking-[0.16em] uppercase text-brass">
            {room.category} · {room.view}
          </p>
          <h3 className="t-h4 mt-2 text-ink">{room.name}</h3>
          <p className="t-small mt-3 text-espresso">{room.summary}</p>
          <ul className="mt-5 grid gap-x-8 gap-y-2 sm:grid-cols-2">
            {room.inclusions.map((inclusion) => (
              <li key={inclusion} className="t-caption flex items-start gap-2.5 text-muted">
                <span aria-hidden="true" className="mt-2 h-px w-3 shrink-0 bg-brass/60" />
                {inclusion}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <table className="mt-9 w-full border-collapse text-left">
        <caption className="t-caption mb-3 text-left tracking-[0.16em] uppercase text-muted">
          Night by night{charges.roomCount > 1 ? ` · × ${charges.roomCount} rooms` : ""}
        </caption>
        <thead>
          <tr className="border-y border-line">
            <th scope="col" className="t-caption py-3 font-medium tracking-[0.14em] uppercase text-muted">
              Night
            </th>
            <th scope="col" className="t-caption py-3 font-medium tracking-[0.14em] uppercase text-muted">
              Season
            </th>
            <th
              scope="col"
              className="t-caption py-3 text-right font-medium tracking-[0.14em] uppercase text-muted"
            >
              Rate
            </th>
          </tr>
        </thead>
        <tbody>
          {charges.nights.map((night) => (
            <tr key={night.date} className="border-b border-line">
              <td className="t-small py-3.5 text-ink">
                {formatLongDate(night.date)}
                {isWeekendNight(night.date) ? (
                  <span className="t-caption ml-2 text-stone">weekend</span>
                ) : null}
              </td>
              <td className="t-caption py-3.5 text-muted">{SEASONS[night.season].label}</td>
              <td className="t-small num py-3.5 text-right text-ink">{formatINR(night.rate)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="t-caption mt-5 text-stone">{gstNote}</p>

      <div className="mt-9 flex flex-wrap items-center gap-4">
        <Button onClick={onContinue} size="lg" arrow>
          Add guest details
        </Button>
        <Button onClick={onBack} variant="quiet">
          Choose a different room
        </Button>
      </div>

      <p className="t-caption mt-7 border-t border-line pt-5 text-muted">
        Check-in from {site.policy.checkIn} · check-out by {site.policy.checkOut} ·{" "}
        {site.policy.children}
      </p>
    </div>
  );
}
