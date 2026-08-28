import { cn } from "@/lib/utils";

type ContainerProps = {
  children: React.ReactNode;
  /** `wide` for full-bleed editorial rows, `narrow` for reading columns. */
  width?: "narrow" | "default" | "wide";
  className?: string;
  as?: "div" | "section" | "header" | "footer" | "nav" | "main" | "article";
};

const WIDTHS = {
  narrow: "max-w-3xl",
  default: "max-w-[82rem]",
  wide: "max-w-[104rem]",
} as const;

export function Container({
  children,
  width = "default",
  className,
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag className={cn("mx-auto w-full px-5 sm:px-8 lg:px-12", WIDTHS[width], className)}>
      {children}
    </Tag>
  );
}
