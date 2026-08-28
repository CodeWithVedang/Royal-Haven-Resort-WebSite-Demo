import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "solid" | "brass" | "outline" | "light" | "quiet";
type Size = "sm" | "md" | "lg";

const BASE =
  "group/btn relative inline-flex items-center justify-center gap-2.5 t-nav whitespace-nowrap rounded-xs " +
  "transition-[background-color,color,border-color,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] " +
  "disabled:pointer-events-none disabled:opacity-45";

const VARIANTS: Record<Variant, string> = {
  solid: "bg-ink text-cream border border-ink hover:bg-charcoal",
  brass: "bg-brass text-cream border border-brass hover:bg-[#755a26]",
  outline: "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-cream",
  light: "border border-cream/45 text-cream hover:bg-cream hover:text-ink",
  quiet: "text-brass hover:text-ink px-0",
};

const SIZES: Record<Size, string> = {
  sm: "h-10 px-5 text-[0.6875rem]",
  md: "h-12 px-7",
  lg: "h-14 px-9",
};

type CommonProps = {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Adds the hairline arrow that travels on hover. */
  arrow?: boolean;
  block?: boolean;
};

type ButtonAsButton = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & { href?: never };

type ButtonAsLink = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & {
    href: string;
    /** Set for mailto:, tel:, wa.me and other external targets. */
    external?: boolean;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

function Inner({ children, arrow }: { children: React.ReactNode; arrow?: boolean }) {
  return (
    <>
      <span>{children}</span>
      {arrow ? (
        <span
          aria-hidden="true"
          className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:translate-x-1"
        >
          →
        </span>
      ) : null}
    </>
  );
}

export function Button(props: ButtonProps) {
  const {
    children,
    variant = "solid",
    size = "md",
    className,
    arrow,
    block,
    ...rest
  } = props as CommonProps & Record<string, unknown>;

  const classes = cn(
    BASE,
    VARIANTS[variant],
    variant === "quiet" ? "h-auto" : SIZES[size],
    block && "w-full",
    className,
  );

  if (typeof rest.href === "string") {
    const { href, external, ...anchorRest } = rest as { href: string; external?: boolean };
    const isExternal = external ?? /^(https?:|mailto:|tel:)/.test(href);

    if (isExternal) {
      return (
        <a
          {...anchorRest}
          href={href}
          className={classes}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noreferrer noopener" : undefined}
        >
          <Inner arrow={arrow}>{children}</Inner>
        </a>
      );
    }

    return (
      <Link {...anchorRest} href={href} className={classes}>
        <Inner arrow={arrow}>{children}</Inner>
      </Link>
    );
  }

  return (
    <button {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)} className={classes}>
      <Inner arrow={arrow}>{children}</Inner>
    </button>
  );
}
