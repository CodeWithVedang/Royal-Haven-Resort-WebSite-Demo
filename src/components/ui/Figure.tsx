import Image from "next/image";
import { BLUR_DATA_URL, photoUrl, type Photo, type SourceWidth } from "@/lib/images";
import { cn } from "@/lib/utils";

type FigureProps = {
  photo: Photo;
  /** Always pass a real sizes string — it decides which srcset entry is fetched. */
  sizes: string;
  source?: SourceWidth;
  priority?: boolean;
  /** Wrapper classes: aspect ratio, rounding, positioning. */
  className?: string;
  /** Slow zoom when an ancestor with `group` is hovered. */
  zoom?: boolean;
  /** Warm scrim, for images that carry text. */
  scrim?: "none" | "soft" | "strong" | "bottom";
  quality?: 60 | 68 | 75 | 82;
  caption?: string;
  objectPosition?: string;
};

const SCRIMS = {
  none: null,
  soft: "bg-ink/25",
  strong: "bg-ink/45",
  bottom: "bg-gradient-to-t from-ink/75 via-ink/20 to-transparent",
} as const;

export function Figure({
  photo,
  sizes,
  source = "band",
  priority,
  className,
  zoom,
  scrim = "none",
  quality = 75,
  caption,
  objectPosition,
}: FigureProps) {
  const scrimClass = SCRIMS[scrim];

  return (
    <figure className={cn("relative overflow-hidden bg-sand", className)}>
      <Image
        src={photoUrl(photo, source)}
        alt={photo.alt}
        fill
        sizes={sizes}
        priority={priority}
        loading={priority ? undefined : "lazy"}
        quality={quality}
        placeholder="blur"
        blurDataURL={BLUR_DATA_URL}
        style={objectPosition ? { objectPosition } : undefined}
        className={cn(
          "img-cover",
          zoom &&
            "transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.045]",
        )}
      />
      {scrimClass ? <span aria-hidden="true" className={cn("absolute inset-0", scrimClass)} /> : null}
      {caption ? (
        <figcaption className="absolute inset-x-0 bottom-0 p-4 t-caption text-cream/85">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
