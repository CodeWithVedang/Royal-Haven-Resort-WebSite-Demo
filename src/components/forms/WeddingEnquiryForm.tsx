"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Field, Input, Select, Textarea } from "@/components/ui/Field";
import { IconCheck, IconSpinner, IconWhatsApp } from "@/components/ui/Icons";
import { weddingVenues } from "@/data/weddings";
import {
  submitEnquiry,
  validateEnquiry,
  type Enquiry,
  type EnquiryErrors,
  type EnquiryReceipt,
} from "@/lib/enquiry";
import { site, whatsappHref } from "@/lib/site";

const GUEST_BANDS = [
  "Up to 60 guests",
  "60 – 150 guests",
  "150 – 250 guests",
  "250 – 400 guests",
  "400 – 500 guests",
];

const EVENT_COUNTS = ["1 – 2 events", "3 events", "4 – 5 events", "6 or more events"];

const BUDGETS = [
  "₹12 – 20 lakh",
  "₹20 – 40 lakh",
  "₹40 – 75 lakh",
  "Above ₹75 lakh",
  "Still working it out",
];

const EMPTY: Enquiry = {
  kind: "wedding",
  name: "",
  email: "",
  phone: "",
  dates: "",
  guests: GUEST_BANDS[1],
  message: "",
  extra: { venue: "Not decided yet", events: EVENT_COUNTS[1], budget: BUDGETS[4] },
};

type Status = "idle" | "sending" | "sent" | "failed";
export function WeddingEnquiryForm() {
  const [enquiry, setEnquiry] = useState<Enquiry>(EMPTY);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [receipt, setReceipt] = useState<EnquiryReceipt | null>(null);

  function set(patch: Partial<Enquiry>) {
    setEnquiry((current) => ({ ...current, ...patch }));
  }

  function setExtra(patch: Record<string, string>) {
    setEnquiry((current) => ({ ...current, extra: { ...current.extra, ...patch } }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const found = validateEnquiry(enquiry);
    if (enquiry.dates.trim().length < 3) {
      found.dates = "Even a month helps — dates decide almost everything else.";
    }
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setStatus("sending");
    try {
      setReceipt(await submitEnquiry(enquiry));
      setStatus("sent");
    } catch {
      setStatus("failed");
    }
  }

  if (status === "sent" && receipt) {
    return (
      <div className="border border-cream/20 bg-cream/5 p-8 lg:p-12" aria-live="polite">
        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-brass/50 text-brass-soft">
          <IconCheck className="h-5 w-5" />
        </span>
        <h3 className="t-h3 mt-6 text-cream">We have your dates.</h3>
        <p className="t-body mt-4 max-w-lg text-cream/75">
          {enquiry.name.split(" ")[0]}, the wedding team will come back within{" "}
          {receipt.replyWithin} with availability, an indicative budget and two venue plans. Dates
          can be held for seven days without payment.
        </p>
        <dl className="mt-8 grid gap-x-10 gap-y-4 border-y border-cream/15 py-6 sm:grid-cols-3">
          <div>
            <dt className="t-caption tracking-[0.18em] uppercase text-cream/55">Reference</dt>
            <dd className="num mt-1.5 font-serif text-xl font-normal text-cream">
              {receipt.reference}
            </dd>
          </div>
          <div>
            <dt className="t-caption tracking-[0.18em] uppercase text-cream/55">Dates</dt>
            <dd className="t-small mt-1.5 text-cream">{enquiry.dates}</dd>
          </div>
          <div>
            <dt className="t-caption tracking-[0.18em] uppercase text-cream/55">Guests</dt>
            <dd className="t-small mt-1.5 text-cream">{enquiry.guests}</dd>
          </div>
        </dl>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button
            href={whatsappHref(
              `Hello Royal Haven, I have sent wedding enquiry ${receipt.reference} for ${enquiry.dates}.`,
            )}
            variant="light"
            external
          >
            <IconWhatsApp className="h-4 w-4" />
            Talk to the wedding team
          </Button>
          <Button
            type="button"
            variant="quiet"
            className="text-brass-soft hover:text-cream"
            onClick={() => {
              setEnquiry(EMPTY);
              setReceipt(null);
              setStatus("idle");
            }}
          >
            Send another enquiry
          </Button>
        </div>
        <p className="t-caption mt-8 border-t border-cream/15 pt-5 text-cream/50">
          Demo site — the enquiry was acknowledged in the browser. A live property would route this
          to its sales and catering system.
        </p>
      </div>
    );
  }

  const sending = status === "sending";
  const invalidCount = Object.keys(errors).length;
  return (
    <form noValidate onSubmit={handleSubmit} className="border border-cream/20 bg-cream/5 p-6 lg:p-9">
      <h3 className="t-h3 text-cream">Tell us about the wedding</h3>
      <p className="t-small mt-3 max-w-lg text-cream/65">
        Dates and guest count are enough to start. You will hear from the manager who would actually
        run your event — not a call centre.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <Field label="Your name" htmlFor="w-name" tone="dark" required error={errors.name}>
          <Input
            id="w-name"
            name="name"
            autoComplete="name"
            value={enquiry.name}
            invalid={Boolean(errors.name)}
            onChange={(event) => set({ name: event.target.value })}
          />
        </Field>
        <Field label="Email" htmlFor="w-email" tone="dark" required error={errors.email}>
          <Input
            id="w-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={enquiry.email}
            invalid={Boolean(errors.email)}
            onChange={(event) => set({ email: event.target.value })}
          />
        </Field>
        <Field label="Phone" htmlFor="w-phone" tone="dark" required error={errors.phone}>
          <Input
            id="w-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+91 98765 43210"
            value={enquiry.phone}
            invalid={Boolean(errors.phone)}
            onChange={(event) => set({ phone: event.target.value })}
          />
        </Field>
        <Field
          label="Wedding dates"
          htmlFor="w-dates"
          tone="dark"
          required
          error={errors.dates}
          hint="A month is fine if the dates are not fixed."
        >
          <Input
            id="w-dates"
            name="dates"
            value={enquiry.dates}
            placeholder="21 – 24 February 2027"
            invalid={Boolean(errors.dates)}
            onChange={(event) => set({ dates: event.target.value })}
          />
        </Field>
        <Field label="Guests" htmlFor="w-guests" tone="dark">
          <Select
            id="w-guests"
            name="guests"
            value={enquiry.guests}
            onChange={(event) => set({ guests: event.target.value })}
          >
            {GUEST_BANDS.map((band) => (
              <option key={band} value={band}>
                {band}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Events" htmlFor="w-events" tone="dark">
          <Select
            id="w-events"
            name="events"
            value={enquiry.extra?.events}
            onChange={(event) => setExtra({ events: event.target.value })}
          >
            {EVENT_COUNTS.map((count) => (
              <option key={count} value={count}>
                {count}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Venue in mind" htmlFor="w-venue" tone="dark">
          <Select
            id="w-venue"
            name="venue"
            value={enquiry.extra?.venue}
            onChange={(event) => setExtra({ venue: event.target.value })}
          >
            <option value="Not decided yet">Not decided yet</option>
            {weddingVenues.map((venue) => (
              <option key={venue.slug} value={venue.name}>
                {venue.name} · up to {venue.seated} seated
              </option>
            ))}
            <option value="Whole property">The whole property</option>
          </Select>
        </Field>
        <Field label="Budget" htmlFor="w-budget" tone="dark" hint="Total, all events included.">
          <Select
            id="w-budget"
            name="budget"
            value={enquiry.extra?.budget}
            onChange={(event) => setExtra({ budget: event.target.value })}
          >
            {BUDGETS.map((budget) => (
              <option key={budget} value={budget}>
                {budget}
              </option>
            ))}
          </Select>
        </Field>
        <Field
          label="What are you planning?"
          htmlFor="w-message"
          tone="dark"
          required
          error={errors.message}
          className="sm:col-span-2"
          hint="Rituals, family numbers, a planner already appointed, anything you have decided."
        >
          <Textarea
            id="w-message"
            name="message"
            rows={5}
            value={enquiry.message}
            invalid={Boolean(errors.message)}
            onChange={(event) => set({ message: event.target.value })}
          />
        </Field>
      </div>

      {invalidCount > 0 ? (
        <p className="t-caption mt-6 border-l-2 border-danger-soft pl-4 text-danger-soft" role="alert">
          {invalidCount === 1 ? "One field needs a moment." : `${invalidCount} fields need a moment.`}{" "}
          They are marked below their labels.
        </p>
      ) : null}

      {status === "failed" ? (
        <p className="t-caption mt-6 border-l-2 border-danger-soft pl-4 text-danger-soft" role="alert">
          The enquiry did not go through. Try again, or reach the wedding team on WhatsApp.
        </p>
      ) : null}

      <div className="mt-9 flex flex-wrap items-center gap-4">
        <Button type="submit" variant="brass" size="lg" disabled={sending}>
          {sending ? (
            <>
              <IconSpinner className="h-4 w-4 animate-spin" />
              Sending
            </>
          ) : (
            "Send Wedding Enquiry"
          )}
        </Button>
        <Button
          href={whatsappHref(
            "Hello Royal Haven, we are planning a wedding and would like to check dates.",
          )}
          variant="quiet"
          external
          className="text-brass-soft hover:text-cream"
        >
          <IconWhatsApp className="h-4 w-4" />
          Or message the wedding team
        </Button>
      </div>

      <p className="t-caption mt-7 border-t border-cream/15 pt-5 text-cream/45">
        Enquiries reach {site.contact.weddingsEmail}. Nothing is stored in this demo.
      </p>
    </form>
  );
}
