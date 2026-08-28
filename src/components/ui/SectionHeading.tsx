import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: React.ReactNode;
  standfirst?: React.ReactNode;
  align?: "left" | "center";
  level?: "h1" | "h2" | "h3";
  size?: "display" | "h1" | "h2" | "h3";
  /** `light` for headings that sit on the olive or ink bands. */
  tone?: "ink" | "light";
  className?: string;
  /** Buttons or links placed opposite the heading on wide screens. */
  action?: React.ReactNode;
};

const SIZES = {
  display: "t-display",
  h1: "t-h1",
  h2: "t-h2",
  h3: "t-h3",
} as const;

export function SectionHeading({
  eyebrow,
  title,
  standfirst,
  align = "left",
  level = "h2",
  size = "h2",
  tone = "ink",
  className,
  action,
}: SectionHeadingProps) {
  const Tag = level;
  const centered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-6",
        action ? "lg:flex-row lg:items-end lg:justify-between lg:gap-16" : undefined,
        className,
      )}
    >
      <div className={cn("max-w-3xl", centered && "mx-auto text-center")}>
        {eyebrow ? (
          <p className="t-eyebrow mb-5 flex items-center gap-3">
            {centered ? null : (
              <span aria-hidden="true" className="inline-block h-px w-8 bg-brass/50" />
            )}
            {eyebrow}
          </p>
        ) : null}
        <Tag className={cn(SIZES[size], "text-balance", tone === "light" ? "text-cream" : "text-ink")}>
          {title}
        </Tag>

        {standfirst ? (
          <div className={cn("t-lead mt-6 max-w-2xl", centered && "mx-auto")}>{standfirst}</div>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
