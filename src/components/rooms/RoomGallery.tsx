"use client";

import { useState } from "react";
import { Figure } from "@/components/ui/Figure";
import { Lightbox } from "@/components/gallery/Lightbox";
import type { Photo } from "@/lib/images";

/**
 * Room detail gallery: one large frame, a thumbnail rail, and the shared
 * lightbox for the full set.
 */
export function RoomGallery({ photos, roomName }: { photos: Photo[]; roomName: string }) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const current = photos[active] ?? photos[0];

  return (
    <div>
      <button
        type="button"
        onClick={() => setLightbox(active)}
        aria-label={`Open ${roomName} photographs full screen`}
        className="group block w-full"
      >
        <Figure
          photo={current}
          sizes="(min-width: 1024px) 66vw, 100vw"
          source="band"
          priority
          quality={82}
          zoom
          className="aspect-4/3 w-full lg:aspect-3/2"
        />
      </button>

      <div className="mt-3 flex gap-3 overflow-x-auto pb-1 lg:mt-4 lg:grid lg:grid-cols-5 lg:gap-4 lg:overflow-visible lg:pb-0">
        {photos.map((photo, index) => (
          <button
            key={photo.id}
            type="button"
            onClick={() => setActive(index)}
            aria-label={`Show photograph ${index + 1} of ${photos.length}`}
            aria-current={index === active ? "true" : undefined}
            className={`w-28 shrink-0 border transition-colors duration-300 lg:w-auto ${
              index === active ? "border-brass" : "border-transparent hover:border-line"
            }`}
          >
            <Figure
              photo={photo}
              sizes="(min-width: 1024px) 13vw, 7rem"
              source="thumb"
              className="aspect-4/3"
            />
          </button>
        ))}
      </div>

      <p className="t-caption mt-4 text-stone">
        {photos.length} photographs · click any frame to open it full screen
      </p>

      <Lightbox
        items={photos.map((photo) => ({ photo, caption: photo.alt, category: roomName }))}
        index={lightbox}
        onIndex={(next) => {
          setLightbox(next);
          setActive(next);
        }}
        onClose={() => setLightbox(null)}
        label={`${roomName} photographs`}
      />
    </div>
  );
}
