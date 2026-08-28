"use client";

import { useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/** Locks body scroll while any overlay is open, refcounted so nesting works. */
let lockCount = 0;

export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    lockCount += 1;
    const { body } = document;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    body.classList.add("scroll-locked");
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;

    return () => {
      lockCount -= 1;
      if (lockCount === 0) {
        body.classList.remove("scroll-locked");
        body.style.paddingRight = "";
      }
    };
  }, [active]);
}

const FOCUSABLE =
  'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

/** Esc to close, Tab cycles inside, focus restored on unmount. */
export function useFocusTrap(active: boolean, onClose: () => void) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active) return;
    const node = ref.current;
    const previous = document.activeElement as HTMLElement | null;

    const focusFirst = () => {
      const targets = node?.querySelectorAll<HTMLElement>(FOCUSABLE);
      (targets?.[0] ?? node)?.focus();
    };
    const raf = requestAnimationFrame(focusFirst);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !node) return;

      const targets = Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (element) => element.offsetParent !== null,
      );
      if (targets.length === 0) return;

      const first = targets[0];
      const last = targets[targets.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", onKeyDown);
      previous?.focus?.();
    };
  }, [active, onClose]);

  return ref;
}

type ModalProps = {
  open: boolean;
  onClose: () => void;
  label: string;
  children: React.ReactNode;
  className?: string;
  /** `sheet` slides up on mobile, `panel` is centred. */
  variant?: "panel" | "sheet";
};

export function Modal({ open, onClose, label, children, className, variant = "panel" }: ModalProps) {
  const close = useCallback(() => onClose(), [onClose]);
  const ref = useFocusTrap(open, close);
  useScrollLock(open);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-90 flex items-end justify-center sm:items-center">
      <button
        type="button"
        aria-label="Close"
        onClick={close}
        className="absolute inset-0 animate-fade-in bg-ink/55 backdrop-blur-[2px]"
      />
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        tabIndex={-1}
        className={cn(
          "relative z-10 max-h-[92vh] w-full overflow-y-auto border border-line bg-cream shadow-lift animate-fade-up",
          variant === "sheet" ? "sm:max-w-lg" : "sm:max-w-2xl",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}
