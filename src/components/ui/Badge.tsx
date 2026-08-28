import { cn } from "@/lib/utils";

type BadgeProps = {
  children: React.ReactNode;
  tone?: "default" | "brass" | "light" | "success" | "warn" | "solid";
  className?: string;
};

const TONES = {
  default: "border-line bg-cream/70 text-espresso",
  brass: "border-brass/35 bg-brass/8 text-brass",
  light: "border-cream/35 bg-cream/10 text-cream",
  success: "border-success/30 bg-success/8 text-success",
  warn: "border-terracotta/30 bg-terracotta/8 text-terracotta",
  solid: "border-ink bg-ink text-cream",
} as const;

export function Badge({ children, tone = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-xs border px-2.5 py-1 text-[0.6875rem] leading-none tracking-[0.14em] uppercase",
        TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Skeleton({ className }: { className?: string }) {
  return <span aria-hidden="true" className={cn("skeleton block rounded-xs", className)} />;
}

/** Thin brass diamond used between sections and above pull quotes. */
export function Diamond({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className={cn("rule-diamond", className)}>
      <svg width="9" height="9" viewBox="0 0 9 9" className="shrink-0 text-brass/70">
        <path d="M4.5 0 9 4.5 4.5 9 0 4.5Z" fill="currentColor" />
      </svg>
    </span>
  );
}
