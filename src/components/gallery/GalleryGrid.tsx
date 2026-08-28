"use client";

import { useMemo, useState } from "react";
import { Figure } from "@/components/ui/Figure";
import { Lightbox } from "@/components/gallery/Lightbox";
import { galleryCategories, galleryItems, type GalleryCategory } from "@/data/gallery";

type Filter = GalleryCategory | "All";

const RATIOS: Record<string, string> = {
  portrait: "aspect-4/5",
  square: "aspect-square",
  landscape: "aspect-4/3",
};

/** Category filter over a column masonry, with the shared lightbox attached. */
export function GalleryGrid() {
  const [filter, setFilter] = useState<Filter>("All");
  const [index, setIndex] = useState<number | null>(null);

  const items = useMemo(
    () => (filter === "All" ? galleryItems : galleryItems.filter((item) => item.category === filter)),
    [filter],
  );

  const filters: Filter[] = ["All", ...galleryCategories];

  return (
    <div>
      <div className="-mx-5 overflow-x-auto px-5 lg:mx-0 lg:overflow-visible lg:px-0">
        <ul className="flex min-w-max items-center gap-2 lg:min-w-0 lg:flex-wrap">
          {filters.map((category) => {
            const active = category === filter;
            const count =
              category === "All"
                ? galleryItems.length
                : galleryItems.filter((item) => item.category === category).length;

            return (
              <li key={category}>
                <button
                  type="button"
                  aria-pressed={active}
                  onClick={() => {
                    setFilter(category);
                    setIndex(null);
                  }}
                  className={`t-caption flex items-baseline gap-2 border px-4 py-2.5 tracking-[0.16em] uppercase transition-colors duration-300 ${
                    active
                      ? "border-ink bg-ink text-cream"
                      : "border-line text-muted hover:border-brass/60 hover:text-ink"
                  }`}
                >
                  {category}
                  <span className={`num text-[0.6875rem] ${active ? "text-cream/60" : "text-stone"}`}>
                    {count}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <p aria-live="polite" className="t-caption mt-6 text-stone">
        {items.length} {items.length === 1 ? "photograph" : "photographs"}
        {filter === "All" ? " across the property" : ` · ${filter.toLowerCase()}`}
      </p>

      <div className="mt-8 gap-4 sm:columns-2 lg:mt-10 lg:columns-3 lg:gap-6">
        {items.map((item, position) => (
          <button
            key={`${item.photo.id}-${position}`}
            type="button"
            onClick={() => setIndex(position)}
            aria-label={`Open photograph: ${item.caption ?? item.photo.alt}`}
            className="group mb-4 block w-full break-inside-avoid text-left lg:mb-6"
          >
            <Figure
              photo={item.photo}
              sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 92vw"
              source="card"
              zoom
              className={RATIOS[item.photo.shape ?? "landscape"]}
            />
            <span className="t-caption mt-2.5 flex items-baseline justify-between gap-4">
              <span className="text-muted transition-colors duration-300 group-hover:text-ink">
                {item.caption}
              </span>
              <span className="shrink-0 tracking-[0.16em] uppercase text-stone">{item.category}</span>
            </span>
          </button>
        ))}
      </div>

      <Lightbox
        items={items}
        index={index}
        onIndex={setIndex}
        onClose={() => setIndex(null)}
        label={`Royal Haven photography — ${filter}`}
      />
    </div>
  );
}
