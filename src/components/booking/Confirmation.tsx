"use client";

import { Button } from "@/components/ui/Button";
import { Figure } from "@/components/ui/Figure";
import { IconCheck, IconPhone, IconWhatsApp } from "@/components/ui/Icons";
import { getRoom } from "@/data/rooms";
import { formatINR, formatFullDate, formatGuestPhone, stayHeadline } from "@/lib/format";
import { site, telHref, whatsappHref } from "@/lib/site";
import type { PaymentOutcome } from "@/lib/payments";
import type { Reservation } from "@/lib/booking/types";

export function Confirmation({
  reservation,
  payment,
}: {
  reservation: Reservation;
  payment: PaymentOutcome | null;
}) {
  const room = getRoom(reservation.roomSlug);
  const { charges, guest, search } = reservation;

  const rows = [
    { label: "Reservation", value: reservation.code, mono: true },
    { label: "Room", value: `${reservation.roomName}${search.rooms > 1 ? ` × ${search.rooms}` : ""}` },
    { label: "Check-in", value: `${formatFullDate(search.checkIn)}, from ${site.policy.checkIn}` },
    { label: "Check-out", value: `${formatFullDate(search.checkOut)}, by ${site.policy.checkOut}` },
    { label: "Guests", value: stayHeadline(search.guests, search.rooms, charges.nightCount) },
    { label: "Total", value: `${formatINR(charges.total)} incl. GST`, mono: true },
    { label: "Contact", value: `${guest.email} · ${formatGuestPhone(guest.phone)}` },
  ];

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-7">
        <p className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-success/40 bg-success/8">
            <IconCheck className="h-4 w-4 text-success" />
          </span>
          <span className="t-eyebrow text-brass">Confirmed</span>
        </p>

        <h1 className="t-h1 mt-6 text-balance text-ink">Your stay is reserved.</h1>
        <p className="t-lead mt-5 max-w-xl">
          Thank you, {guest.firstName}. A confirmation is on its way to {guest.email}. The
          reservations desk will call a day before arrival to arrange your transfer.
        </p>

        <dl className="mt-11 border-t border-line">
          {rows.map((row) => (
            <div
              key={row.label}
              className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 border-b border-line py-4"
            >
              <dt className="t-caption tracking-[0.16em] uppercase text-muted">{row.label}</dt>
              <dd
                className={`t-small text-right text-ink ${row.mono ? "num tracking-[0.08em]" : ""}`}
              >
                {row.value}
              </dd>
            </div>
          ))}
        </dl>

        {guest.requests.trim() ? (
          <p className="t-small mt-6 border-l border-brass/40 pl-5 text-espresso">
            <span className="t-caption block tracking-[0.16em] uppercase text-muted">
              Noted for your arrival
            </span>
            {guest.requests}
          </p>
        ) : null}

        <p className="t-caption mt-8 border border-line bg-ivory p-5 text-muted">
          {payment?.message ??
            `Held without payment. ${reservation.paymentMode === "pay-at-hotel" ? "Settle the bill at the front desk on departure." : ""}`}{" "}
          This is a demonstration booking engine — no reservation has been created in a live property
          management system.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/experiences" size="lg" arrow>
            Continue Exploring Royal Haven
          </Button>
          <Button href={whatsappHref(`Hello Royal Haven, this is ${guest.firstName}. My reservation is ${reservation.code}.`)} variant="outline" size="lg" external>
            <IconWhatsApp className="h-4 w-4" />
            Message the concierge
          </Button>
        </div>

        <p className="t-small mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-muted">
          <a href={telHref} className="link-underline flex items-center gap-2.5 text-espresso">
            <IconPhone className="h-4 w-4 text-brass" />
            {site.contact.phoneDisplay}
          </a>
          <span>{site.contact.hours.reservations}</span>
        </p>
      </div>

      <div className="lg:col-span-5">
        {room ? (
          <Figure
            photo={room.photos[0]}
            sizes="(min-width: 1024px) 40vw, 100vw"
            source="feature"
            className="aspect-4/5"
          />
        ) : null}
        <div className="mt-6 border border-line bg-cream p-6">
          <p className="t-eyebrow text-brass">Before you arrive</p>
          <ul className="mt-5 space-y-3">
            {[
              "Send us your flight or train number and we will hold the room for early check-in.",
              "Spa treatments and the sunset boat are worth reserving now — both are limited.",
              site.policy.children,
            ].map((line) => (
              <li key={line} className="t-small flex items-start gap-3 text-espresso">
                <span aria-hidden="true" className="mt-2.5 h-px w-4 shrink-0 bg-brass/60" />
                {line}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
