"use client";

import { cn } from "@/lib/utils";
import { IconMinus, IconPlus } from "./Icons";

type StepperProps = {
  label: string;
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  hint?: string;
  className?: string;
};

/** Touch-friendly counter — 44px targets, no native number spinner. */
export function Stepper({
  label,
  value,
  min = 1,
  max = 9,
  onChange,
  hint,
  className,
}: StepperProps) {
  const atMin = value <= min;
  const atMax = value >= max;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <span className="t-caption font-medium tracking-[0.16em] uppercase text-espresso">
        {label}
      </span>
      <div className="flex h-12 items-center justify-between rounded-xs border border-line bg-cream px-1.5">
        <button
          type="button"
          onClick={() => onChange(value - 1)}
          disabled={atMin}
          aria-label={`Fewer ${label.toLowerCase()}`}
          className="flex h-10 w-10 items-center justify-center text-espresso transition-colors hover:text-brass disabled:opacity-30 disabled:hover:text-espresso"
        >
          <IconMinus className="h-4 w-4" />
        </button>
        <span aria-live="polite" className="t-price num text-lg text-ink">
          {value}
        </span>
        <button
          type="button"
          onClick={() => onChange(value + 1)}
          disabled={atMax}
          aria-label={`More ${label.toLowerCase()}`}
          className="flex h-10 w-10 items-center justify-center text-espresso transition-colors hover:text-brass disabled:opacity-30 disabled:hover:text-espresso"
        >
          <IconPlus className="h-4 w-4" />
        </button>
      </div>
      {hint ? <p className="t-caption text-stone">{hint}</p> : null}
    </div>
  );
}
