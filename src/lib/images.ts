/**
 * Photography layer.
 *
 * Every image on the site is described by a small `Photo` object — an id plus
 * its alt text — and turned into a URL here. Swapping the demo library for the
 * property's own shoot means changing `buildUrl` (and the ids in `src/data`),
 * nothing else.
 *
 * Demo images are licensed stock served from Pexels' CDN and passed through
 * the Next.js image optimiser (see `next.config.ts`).
 */

export type Photo = {
  /** Pexels photo id — replace with the property's own asset id or path. */
  id: string;
  /** Written for screen readers: what is in the frame, not "image of". */
  alt: string;
  /** Natural orientation, used by the masonry gallery to pick a span. */
  shape?: "landscape" | "portrait" | "square";
};

const IMAGE_HOST = "https://images.pexels.com/photos";

/** Source widths requested from the CDN, per usage context. */
export const SOURCE_WIDTH = {
  hero: 2400,
  band: 1800,
  feature: 1400,
  card: 1000,
  thumb: 560,
} as const;

export type SourceWidth = keyof typeof SOURCE_WIDTH | number;

function resolveWidth(width: SourceWidth): number {
  return typeof width === "number" ? width : SOURCE_WIDTH[width];
}

export function photoUrl(photo: Photo, width: SourceWidth = "band"): string {
  const w = resolveWidth(width);
  return `${IMAGE_HOST}/${photo.id}/pexels-photo-${photo.id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;
}

/**
 * 8×5 warm sand gradient, inlined so remote images fade in from the palette
 * instead of flashing white. Cheap (< 400 bytes) and identical everywhere.
 */
export const BLUR_DATA_URL =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjUiPjxmaWx0ZXIgaWQ9ImIiPjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjIiLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI1IiBmaWxsPSIjZTVkYmM5Ii8+PHJlY3Qgd2lkdGg9IjgiIGhlaWdodD0iMi40IiBmaWxsPSIjZDljY2I4IiBmaWx0ZXI9InVybCgjYikiLz48L3N2Zz4=";

/** Shorthand used across the data files. */
export function p(id: string, alt: string, shape?: Photo["shape"]): Photo {
  return shape ? { id, alt, shape } : { id, alt };
}
