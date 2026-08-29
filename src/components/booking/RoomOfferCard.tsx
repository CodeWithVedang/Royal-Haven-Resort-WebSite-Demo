"use client";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Figure } from "@/components/ui/Figure";
import { getRoom } from "@/data/rooms";
import { formatINR } from "@/lib/format";
import type { RoomOffer } from "@/lib/booking/types";

/** One available category in the results list. */
export function RoomOfferCard({
  offer,
  onSelect,
  selected,
}: {
  offer: RoomOffer;
  onSelect: () => void;
  selected?: boolean;
}) {
  const room = getRoom(offer.roomSlug);
  if (!room) return null;

  const { charges } = offer;

  return (
    <article
      className={`grid gap-6 border bg-cream p-4 transition-colors duration-500 sm:grid-cols-[13rem_1fr] lg:grid-cols-[17rem_1fr] lg:gap-8 lg:p-5 ${
        selected ? "border-brass" : "border-line"
      }`}
    >
      <Figure
        photo={room.photos[0]}
        sizes="(min-width: 1024px) 17rem, (min-width: 640px) 13rem, 100vw"
        source="card"
        className="aspect-4/3 sm:aspect-square lg:aspect-4/3"
      />

      <div className="flex flex-col">
        <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
          <div>
            <p className="t-caption tracking-[0.16em] uppercase text-brass">{room.view}</p>
            <h3 className="t-h4 mt-1.5 text-ink">{room.name}</h3>
          </div>
          {offer.scarcity ? <Badge tone="brass">{offer.scarcity}</Badge> : null}
        </div>

        <p className="t-small mt-3 text-espresso">{room.summary}</p>

        <ul className="t-caption mt-4 flex flex-wrap gap-x-5 gap-y-1.5 tracking-[0.14em] uppercase text-muted">
          <li>{room.sqft} sq ft</li>
          <li>{room.bed}</li>
          <li>Up to {room.maxGuests} guests</li>
        </ul>

        <div className="mt-5 flex flex-wrap items-end justify-between gap-x-6 gap-y-4 border-t border-line pt-4">
          <div>
            <p className="flex flex-wrap items-baseline gap-x-2.5">
              <span className="num t-price text-ink">{formatINR(charges.averageNightly)}</span>
              {charges.discount > 0 ? (
                <span className="num t-caption text-stone line-through">
                  {formatINR(charges.averageNightlyBefore)}
                </span>
              ) : null}
            </p>
            <p className="t-caption mt-1 text-muted">
              average per night · {formatINR(charges.total)} total
              {charges.roomCount > 1 ? ` for ${charges.roomCount} rooms` : ""} incl. taxes
            </p>
            {charges.discount > 0 ? (
              <p className="t-caption mt-1 text-success">
                Promotion applied — you save {formatINR(charges.discount)}
              </p>
            ) : null}
          </div>
          <Button onClick={onSelect} variant={selected ? "brass" : "solid"} arrow={!selected}>
            {selected ? "Selected" : "Select Room"}
          </Button>
        </div>
      </div>
    </article>
  );
}

/** A category we cannot sell for this stay, with the reason left visible. */
export function WithheldOffer({ offer }: { offer: RoomOffer }) {
  const room = getRoom(offer.roomSlug);
  if (!room) return null;

  const reason = !offer.fitsGuests
    ? `Takes up to ${room.maxGuests} guests per room`
    : offer.available === 0
      ? "No keys free on these dates"
      : `Only ${offer.available} ${offer.available === 1 ? "key" : "keys"} free`;

  return (
    <li className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-line py-3.5">
      <span className="t-small text-muted">{room.name}</span>
      <span className="t-caption tracking-[0.14em] uppercase text-stone">{reason}</span>
    </li>
  );
}
