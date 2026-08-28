"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Field, Input, Select, Textarea } from "@/components/ui/Field";
import { IconSpinner } from "@/components/ui/Icons";
import { acceptedMethods, activeProvider, isLiveGateway } from "@/lib/payments";
import { site } from "@/lib/site";
import type { GuestDetails, PaymentMode } from "@/lib/booking/types";

export type GuestErrors = Partial<Record<keyof GuestDetails, string>>;

const ARRIVAL_WINDOWS = [
  "Before 2:00 PM (early check-in on request)",
  "2:00 PM – 5:00 PM",
  "5:00 PM – 9:00 PM",
  "After 9:00 PM",
  "Not sure yet",
];

const OCCASIONS = ["A holiday", "Anniversary", "Honeymoon", "Birthday", "Work and quiet", "Wedding in the family"];

/** Validation runs on submit only — nobody wants to be corrected mid-word. */
export function validateGuest(guest: GuestDetails): GuestErrors {
  const errors: GuestErrors = {};
  if (guest.firstName.trim().length < 2) errors.firstName = "Please enter your first name.";
  if (guest.lastName.trim().length < 2) errors.lastName = "Please enter your last name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(guest.email.trim())) {
    errors.email = "We need a working email for the confirmation.";
  }
  const digits = guest.phone.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 13) {
    errors.phone = "Enter a 10-digit mobile number, or include your country code.";
  }
  if (guest.city.trim().length < 2) errors.city = "Which city are you travelling from?";
  return errors;
}

export function GuestForm({
  guest,
  errors,
  paymentMode,
  pending,
  onChange,
  onPaymentModeChange,
  onSubmit,
  onBack,
}: {
  guest: GuestDetails;
  errors: GuestErrors;
  paymentMode: PaymentMode;
  pending: boolean;
  onChange: (patch: Partial<GuestDetails>) => void;
  onPaymentModeChange: (mode: PaymentMode) => void;
  onSubmit: () => void;
  onBack: () => void;
}) {
  const [touchedPayment, setTouchedPayment] = useState(false);

  return (
    <form
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
      className="border border-line bg-cream p-6 lg:p-9"
    >
      <h2 className="t-h3 text-ink">Who is staying?</h2>
      <p className="t-small mt-3 max-w-xl text-muted">
        The reservation is held in this name. We use the mobile number only for arrival details.
      </p>

      <div className="mt-9 grid gap-6 sm:grid-cols-2">
        <Field label="First name" htmlFor="firstName" required error={errors.firstName}>
          <Input
            id="firstName"
            name="firstName"
            autoComplete="given-name"
            value={guest.firstName}
            invalid={Boolean(errors.firstName)}
            onChange={(event) => onChange({ firstName: event.target.value })}
          />
        </Field>
        <Field label="Last name" htmlFor="lastName" required error={errors.lastName}>
          <Input
            id="lastName"
            name="lastName"
            autoComplete="family-name"
            value={guest.lastName}
            invalid={Boolean(errors.lastName)}
            onChange={(event) => onChange({ lastName: event.target.value })}
          />
        </Field>
        <Field label="Email" htmlFor="email" required error={errors.email}>
          <Input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={guest.email}
            invalid={Boolean(errors.email)}
            onChange={(event) => onChange({ email: event.target.value })}
          />
        </Field>
        <Field
          label="Mobile"
          htmlFor="phone"
          required
          error={errors.phone}
          hint="Indian mobile, or with country code"
        >
          <Input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+91 98765 43210"
            value={guest.phone}
            invalid={Boolean(errors.phone)}
            onChange={(event) => onChange({ phone: event.target.value })}
          />
        </Field>
        <Field label="City" htmlFor="city" required error={errors.city}>
          <Input
            id="city"
            name="city"
            autoComplete="address-level2"
            placeholder="Mumbai"
            value={guest.city}
            invalid={Boolean(errors.city)}
            onChange={(event) => onChange({ city: event.target.value })}
          />
        </Field>
        <Field label="Expected arrival" htmlFor="arrival">
          <Select
            id="arrival"
            name="arrival"
            value={guest.arrival}
            onChange={(event) => onChange({ arrival: event.target.value })}
          >
            <option value="">Select a window</option>
            {ARRIVAL_WINDOWS.map((window) => (
              <option key={window} value={window}>
                {window}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Occasion" htmlFor="occasion" className="sm:col-span-2">
          <Select
            id="occasion"
            name="occasion"
            value={guest.occasion}
            onChange={(event) => onChange({ occasion: event.target.value })}
          >
            <option value="">Nothing in particular</option>
            {OCCASIONS.map((occasion) => (
              <option key={occasion} value={occasion}>
                {occasion}
              </option>
            ))}
          </Select>
        </Field>
        <Field
          label="Anything we should know?"
          htmlFor="requests"
          className="sm:col-span-2"
          hint="Dietary needs, a quiet room, an early breakfast — we read every one of these."
        >
          <Textarea
            id="requests"
            name="requests"
            value={guest.requests}
            onChange={(event) => onChange({ requests: event.target.value })}
          />
        </Field>
      </div>

      <fieldset className="mt-10 border-t border-line pt-8">
        <legend className="t-caption font-medium tracking-[0.16em] uppercase text-espresso">
          Payment
        </legend>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {(
            [
              {
                mode: "pay-at-hotel" as PaymentMode,
                title: "Pay at the hotel",
                body: `Nothing charged now. ${site.policy.cancellation}`,
              },
              {
                mode: "pay-now" as PaymentMode,
                title: "Pay now",
                body: isLiveGateway
                  ? `Secure checkout via ${activeProvider} · ${acceptedMethods.join(" · ")}`
                  : `Demo checkout — no money moves. ${acceptedMethods.join(" · ")} once a gateway is connected.`,
              },
            ] as const
          ).map((option) => (
            <label
              key={option.mode}
              className={`flex cursor-pointer gap-3 border p-4 transition-colors duration-300 ${
                paymentMode === option.mode
                  ? "border-brass bg-brass/6"
                  : "border-line hover:border-ink/25"
              }`}
            >
              <input
                type="radio"
                name="paymentMode"
                value={option.mode}
                checked={paymentMode === option.mode}
                onChange={() => {
                  onPaymentModeChange(option.mode);
                  setTouchedPayment(true);
                }}
                className="mt-1 h-4 w-4 shrink-0 accent-brass"
              />
              <span>
                <span className="t-small block font-medium text-ink">{option.title}</span>
                <span className="t-caption mt-1.5 block text-muted">{option.body}</span>
              </span>
            </label>
          ))}
        </div>
        {paymentMode === "pay-now" && touchedPayment && !isLiveGateway ? (
          <p className="t-caption mt-4 text-terracotta">
            This demo simulates the gateway round-trip and confirms the reservation without taking
            payment.
          </p>
        ) : null}
      </fieldset>

      <div className="mt-10 flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg" disabled={pending}>
          {pending ? (
            <>
              <IconSpinner className="h-4 w-4 animate-spin" />
              Confirming
            </>
          ) : (
            "Confirm Reservation"
          )}
        </Button>
        <Button type="button" variant="quiet" onClick={onBack} disabled={pending}>
          Back to the summary
        </Button>
      </div>
    </form>
  );
}
