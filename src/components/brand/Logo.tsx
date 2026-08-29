import Link from "next/link";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Hairline diamond monogram — the mark used where the wordmark will not fit. */
export function Monogram({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 44 44" aria-hidden="true" className={cn("h-10 w-10", className)}>
      <path
        d="M22 1.6 42.4 22 22 42.4 1.6 22Z"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.45"
        strokeWidth="1"
      />
      <text
        x="22"
        y="26.4"
        textAnchor="middle"
        fill="currentColor"
        style={{
          font: "400 11.5px var(--font-serif)",
          letterSpacing: "0.14em",
        }}
      >
        {site.brand.monogram}
      </text>
    </svg>
  );
}

type LogoProps = {
  tone?: "ink" | "light";
  /** Hides the sub-brand line — used in tight headers. */
  compact?: boolean;
  className?: string;
  href?: string;
};

export function Logo({ tone = "ink", compact, className, href = "/" }: LogoProps) {
  return (
    <Link
      href={href}
      aria-label={`${site.brand.fullName} — home`}
      className={cn("group inline-flex flex-col leading-none", className)}
    >
      <span
        className={cn(
          "font-serif text-[1.375rem] leading-none font-normal tracking-[0.2em] uppercase transition-colors duration-500 sm:text-[1.5rem]",
          tone === "light" ? "text-cream" : "text-ink",
        )}
      >
        {site.brand.name}
      </span>
      {compact ? null : (
        <span
          className={cn(
            "mt-2 text-[0.5rem] leading-none tracking-[0.34em] uppercase sm:text-[0.5625rem]",
            tone === "light" ? "text-cream/65" : "text-muted",
          )}
        >
          {site.brand.subBrand}
        </span>
      )}
    </Link>
  );
}
