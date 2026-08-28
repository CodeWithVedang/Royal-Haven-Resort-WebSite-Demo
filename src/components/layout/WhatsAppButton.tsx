"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { IconWhatsApp } from "@/components/ui/Icons";
import { whatsappHref } from "@/lib/site";
import { cn } from "@/lib/utils";

const LABEL = "Plan Your Stay on WhatsApp";

/** Desktop: a quiet floating button that appears once the hero is behind you. */
export function WhatsAppButton() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={whatsappHref()}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={LABEL}
      className={cn(
        "no-print group fixed right-6 bottom-6 z-60 hidden items-center gap-0 overflow-hidden rounded-xs border border-ink/10 bg-olive pl-4 text-cream shadow-lift transition-all duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-ink lg:flex",
        shown ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <span className="flex h-13 items-center">
        <IconWhatsApp className="h-5 w-5 text-brass-soft transition-colors group-hover:text-cream" />
      </span>
      <span className="t-nav max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:max-w-64 group-hover:pr-5 group-hover:pl-3 group-hover:opacity-100">
        {LABEL}
      </span>
    </a>
  );
}

/**
 * Mobile: the booking CTA is always one thumb away. Suppressed on the booking
 * flow itself, which has its own sticky footer.
 */
export function MobileCtaBar() {
  const pathname = usePathname();
  if (pathname.startsWith("/booking")) return null;

  return (
    <>
      <div aria-hidden="true" className="h-16 lg:hidden" />
      <div className="no-print fixed inset-x-0 bottom-0 z-60 flex h-16 border-t border-line bg-cream/97 backdrop-blur-sm lg:hidden">
        <Link
          href="/booking"
          className="t-nav flex flex-1 items-center justify-center bg-ink text-cream"
        >
          Book Your Stay
        </Link>
        <a
          href={whatsappHref()}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={LABEL}
          className="flex w-16 shrink-0 items-center justify-center border-l border-line text-olive"
        >
          <IconWhatsApp className="h-6 w-6" />
        </a>
      </div>
    </>
  );
}
