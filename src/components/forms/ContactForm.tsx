"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Field, Input, Select, Textarea } from "@/components/ui/Field";
import { IconCheck, IconSpinner, IconWhatsApp } from "@/components/ui/Icons";
import {
  submitEnquiry,
  validateEnquiry,
  type Enquiry,
  type EnquiryErrors,
  type EnquiryReceipt,
} from "@/lib/enquiry";
import { site, whatsappHref } from "@/lib/site";

const GUEST_OPTIONS = ["1 guest", "2 guests", "3 guests", "4 guests", "5 – 8 guests", "More than 8"];

const EMPTY: Enquiry = {
  kind: "stay",
  name: "",
  email: "",
  phone: "",
  dates: "",
  guests: "2 guests",
  message: "",
};

type Status = "idle" | "sending" | "sent" | "failed";

export function ContactForm() {
  const [enquiry, setEnquiry] = useState<Enquiry>(EMPTY);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [receipt, setReceipt] = useState<EnquiryReceipt | null>(null);

  /** A field stops being wrong the moment the guest starts fixing it. */
  function set(patch: Partial<Enquiry>) {
    setEnquiry((current) => ({ ...current, ...patch }));
    setErrors((current) => {
      const next = { ...current };
      for (const key of Object.keys(patch) as (keyof EnquiryErrors)[]) delete next[key];
      return next;
    });
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const found = validateEnquiry(enquiry);
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
      <div className="border border-line bg-cream p-8 lg:p-12" aria-live="polite">
        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-brass/40 text-brass">
          <IconCheck className="h-5 w-5" />
        </span>
        <h2 className="t-h3 mt-6 text-ink">Thank you — the desk has it.</h2>
        <p className="t-body mt-4 max-w-lg text-espresso">
          {enquiry.name.split(" ")[0]}, your enquiry is with the reservations team. Someone will
          write back within {receipt.replyWithin}, usually with two or three options rather than a
          brochure.
        </p>
        <dl className="mt-8 grid gap-x-10 gap-y-4 border-y border-line py-6 sm:grid-cols-2">
          <div>
            <dt className="t-caption tracking-[0.18em] uppercase text-muted">Reference</dt>
            <dd className="num mt-1.5 font-serif text-xl font-normal text-ink">
              {receipt.reference}
            </dd>
          </div>
          <div>
            <dt className="t-caption tracking-[0.18em] uppercase text-muted">Replying to</dt>
            <dd className="t-small mt-1.5 break-words text-ink">{enquiry.email}</dd>
          </div>
        </dl>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button
            href={whatsappHref(
              `Hello Royal Haven, I have just sent enquiry ${receipt.reference}. Could we continue here?`,
            )}
            external
          >
            <IconWhatsApp className="h-4 w-4" />
            Continue on WhatsApp
          </Button>
          <Button
            type="button"
            variant="quiet"
            onClick={() => {
              setEnquiry(EMPTY);
              setReceipt(null);
              setStatus("idle");
            }}
          >
            Send another enquiry
          </Button>
        </div>
        <p className="t-caption mt-8 border-t border-line pt-5 text-stone">
          Demo site — the enquiry was validated and acknowledged in the browser. Connecting a mail
          service or CRM replaces one function in <code className="text-espresso">lib/enquiry.ts</code>.
        </p>
      </div>
    );
  }
  const sending = status === "sending";
  const invalidCount = Object.keys(errors).length;

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="border border-line bg-cream p-6 lg:p-9"
      aria-describedby="enquiry-note"
    >
      <h2 className="t-h3 text-ink">Send an enquiry</h2>
      <p className="t-small mt-3 max-w-lg text-muted">
        Written by a person, answered by a person. If you already know your dates, the booking page
        will be quicker.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <Field label="Name" htmlFor="c-name" required error={errors.name}>
          <Input
            id="c-name"
            name="name"
            autoComplete="name"
            value={enquiry.name}
            invalid={Boolean(errors.name)}
            onChange={(event) => set({ name: event.target.value })}
          />
        </Field>
        <Field label="Email" htmlFor="c-email" required error={errors.email}>
          <Input
            id="c-email"
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
        <Field label="Phone" htmlFor="c-phone" required error={errors.phone}>
          <Input
            id="c-phone"
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
          label="Preferred dates"
          htmlFor="c-dates"
          hint="Approximate is fine — “first week of November”."
        >
          <Input
            id="c-dates"
            name="dates"
            value={enquiry.dates}
            placeholder="12 – 15 November 2026"
            onChange={(event) => set({ dates: event.target.value })}
          />
        </Field>
        <Field label="Guests" htmlFor="c-guests">
          <Select
            id="c-guests"
            name="guests"
            value={enquiry.guests}
            onChange={(event) => set({ guests: event.target.value })}
          >
            {GUEST_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </Field>
        <Field
          label="Message"
          htmlFor="c-message"
          required
          error={errors.message}
          className="sm:col-span-2"
          hint="Anniversary, a family trip, a quiet week to work — whatever is useful for us to know."
        >
          <Textarea
            id="c-message"
            name="message"
            rows={5}
            value={enquiry.message}
            invalid={Boolean(errors.message)}
            onChange={(event) => set({ message: event.target.value })}
          />
        </Field>
      </div>
      {invalidCount > 0 ? (
        <p className="t-caption mt-6 border-l-2 border-danger pl-4 text-danger" role="alert">
          {invalidCount === 1
            ? "One field needs a moment."
            : `${invalidCount} fields need a moment.`}{" "}
          They are marked below their labels.
        </p>
      ) : null}

      {status === "failed" ? (
        <p className="t-caption mt-6 border-l-2 border-danger pl-4 text-danger" role="alert">
          The enquiry did not go through. Please try once more, or message the desk on WhatsApp —
          that reaches us immediately.
        </p>
      ) : null}

      <div className="mt-9 flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg" disabled={sending}>
          {sending ? (
            <>
              <IconSpinner className="h-4 w-4 animate-spin" />
              Sending
            </>
          ) : (
            "Send Enquiry"
          )}
        </Button>
        <Button
          href={whatsappHref()}
          variant="quiet"
          external
          className="text-brass hover:text-ink"
        >
          <IconWhatsApp className="h-4 w-4" />
          Or message us instead
        </Button>
      </div>

      <p id="enquiry-note" className="t-caption mt-7 border-t border-line pt-5 text-stone">
        We reply from {site.contact.email}. Your details are not shared with anyone, and this demo
        stores nothing.
      </p>
    </form>
  );
}
