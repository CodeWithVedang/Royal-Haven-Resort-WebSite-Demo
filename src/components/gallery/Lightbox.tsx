"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { IconArrowLeft, IconArrowRight, IconClose } from "@/components/ui/Icons";
import { useFocusTrap, useScrollLock } from "@/components/ui/Modal";
import { BLUR_DATA_URL, photoUrl, type Photo } from "@/lib/images";

export type LightboxItem = {
  photo: Photo;
  caption?: string;
  category?: string;
};

/**
 * Full-screen viewer shared by the gallery and the room pages. Arrow keys and
 * swipe move between frames, Esc closes, focus is trapped and restored.
 */
export function Lightbox({
  items,
  index,
  onIndex,
  onClose,
  label = "Photography",
}: {
  items: LightboxItem[];
  /** Null closes the viewer. */
  index: number | null;
  onIndex: (next: number) => void;
  onClose: () => void;
  label?: string;
}) {
  const open = index !== null;
  const close = useCallback(() => onClose(), [onClose]);
  const trapRef = useFocusTrap(open, close);
  useScrollLock(open);
  const touchX = useRef<number | null>(null);

  const count = items.length;
  const step = useCallback(
    (delta: number) => {
      if (index === null || count === 0) return;
      onIndex((index + delta + count) % count);
    },
    [count, index, onIndex],
  );
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        step(1);
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        step(-1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, step]);

  if (index === null) return null;
  const item = items[index];
  if (!item) return null;

  return (
    <div
      ref={trapRef}
      role="dialog"
      aria-modal="true"
      aria-label={label}
      tabIndex={-1}
      className="fixed inset-0 z-90 flex animate-fade-in flex-col bg-ink/96"
      onTouchStart={(event) => {
        touchX.current = event.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        const start = touchX.current;
        const end = event.changedTouches[0]?.clientX;
        touchX.current = null;
        if (start === null || end === undefined) return;
        if (Math.abs(end - start) > 48) step(end < start ? 1 : -1);
      }}
    >
      <div className="flex shrink-0 items-center justify-between gap-6 px-5 py-4 lg:px-8 lg:py-5">
        <p className="t-caption num tracking-[0.18em] text-cream/70">
          {index + 1} / {count}
        </p>
        <button
          type="button"
          onClick={close}
          aria-label="Close gallery"
          className="flex h-11 w-11 items-center justify-center border border-cream/25 text-cream transition-colors duration-300 hover:border-cream/60 hover:bg-cream/10"
        >
          <IconClose className="h-4 w-4" />
        </button>
      </div>
      <div className="relative min-h-0 flex-1">
        <Image
          key={item.photo.id}
          src={photoUrl(item.photo, "hero")}
          alt={item.photo.alt}
          fill
          sizes="100vw"
          quality={82}
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          className="animate-fade-in object-contain"
        />
      </div>

      <div className="flex shrink-0 items-center justify-between gap-6 px-5 py-5 lg:px-8 lg:py-6">
        <button
          type="button"
          onClick={() => step(-1)}
          aria-label="Previous photograph"
          className="flex h-11 w-11 shrink-0 items-center justify-center border border-cream/25 text-cream transition-colors duration-300 hover:border-cream/60 hover:bg-cream/10"
        >
          <IconArrowLeft className="h-4 w-4" />
        </button>

        <div className="min-w-0 text-center">
          {item.category ? (
            <p className="t-caption tracking-[0.18em] uppercase text-brass">{item.category}</p>
          ) : null}
          <p className="t-small mt-1.5 text-cream/80">{item.caption ?? item.photo.alt}</p>
        </div>

        <button
          type="button"
          onClick={() => step(1)}
          aria-label="Next photograph"
          className="flex h-11 w-11 shrink-0 items-center justify-center border border-cream/25 text-cream transition-colors duration-300 hover:border-cream/60 hover:bg-cream/10"
        >
          <IconArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
