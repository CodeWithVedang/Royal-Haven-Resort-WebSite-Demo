"use client";

import { IconCheck } from "@/components/ui/Icons";

export const BOOKING_STEPS = [
  { key: "dates", label: "Dates & guests" },
  { key: "rooms", label: "Choose a room" },
  { key: "review", label: "Review" },
  { key: "guest", label: "Guest details" },
  { key: "confirmed", label: "Confirmed" },
] as const;

export type BookingStep = (typeof BOOKING_STEPS)[number]["key"];

/** Horizontal on desktop, a single "step 2 of 5" line on small screens. */
export function StepRail({
  current,
  onJump,
}: {
  current: BookingStep;
  onJump?: (step: BookingStep) => void;
}) {
  const index = BOOKING_STEPS.findIndex((step) => step.key === current);
  const active = BOOKING_STEPS[index];

  return (
    <nav aria-label="Booking progress">
      <p className="t-caption tracking-[0.16em] uppercase text-muted lg:hidden">
        Step {index + 1} of {BOOKING_STEPS.length}
        <span className="ml-2 text-ink">{active.label}</span>
      </p>

      <ol className="hidden border-y border-line lg:flex">
        {BOOKING_STEPS.map((step, position) => {
          const done = position < index;
          const isCurrent = position === index;
          const clickable = Boolean(onJump) && done && current !== "confirmed";

          return (
            <li key={step.key} className="flex-1 border-r border-line last:border-r-0">
              <button
                type="button"
                disabled={!clickable}
                onClick={clickable ? () => onJump?.(step.key) : undefined}
                aria-current={isCurrent ? "step" : undefined}
                className={`flex w-full items-center gap-3 px-5 py-4 text-left transition-colors duration-300 ${
                  clickable ? "hover:bg-ivory" : ""
                } ${isCurrent ? "bg-ivory" : ""}`}
              >
                <span
                  className={`num flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-[0.6875rem] ${
                    done
                      ? "border-brass bg-brass text-cream"
                      : isCurrent
                        ? "border-ink text-ink"
                        : "border-line text-stone"
                  }`}
                >
                  {done ? <IconCheck className="h-3 w-3" /> : position + 1}
                </span>
                <span
                  className={`t-caption tracking-[0.16em] uppercase ${
                    isCurrent ? "text-ink" : done ? "text-espresso" : "text-stone"
                  }`}
                >
                  {step.label}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
