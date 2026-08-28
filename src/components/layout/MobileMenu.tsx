"use client";

import Link from "next/link";
import { Monogram } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { IconClose, IconPhone, IconWhatsApp } from "@/components/ui/Icons";
import { useFocusTrap, useScrollLock } from "@/components/ui/Modal";
import { primaryNav, site, telHref, whatsappHref } from "@/lib/site";
import { cn } from "@/lib/utils";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  pathname: string;
};

export function MobileMenu({ open, onClose, pathname }: MobileMenuProps) {
  const ref = useFocusTrap(open, onClose);
  useScrollLock(open);

  if (!open) return null;

  return (
    <div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      tabIndex={-1}
      className="fixed inset-0 z-80 flex flex-col bg-cream animate-fade-in lg:hidden"
    >
      <div className="flex h-22 shrink-0 items-center justify-between border-b border-line px-5 sm:px-8">
        <span className="flex items-center gap-3 text-brass">
          <Monogram className="h-9 w-9" />
          <span className="t-caption tracking-[0.28em] uppercase text-muted">
            {site.brand.subBrand}
          </span>
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="-mr-2 flex h-11 w-11 items-center justify-center text-ink"
        >
          <IconClose className="h-6 w-6" />
        </button>
      </div>

      <nav aria-label="Primary" className="flex-1 overflow-y-auto px-5 py-4 sm:px-8">
        <ul>
          {primaryNav.map((item, index) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <li key={item.href} className="border-b border-line/70">
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="group flex items-baseline justify-between gap-4 py-5"
                >
                  <span
                    className={cn(
                      "t-h3 transition-colors duration-300",
                      active ? "text-brass" : "text-ink group-hover:text-brass",
                    )}
                  >
                    {item.label}
                  </span>
                  <span className="t-caption num shrink-0 text-stone">
                    {`0${index + 1}`}
                    <span className="sr-only">.</span>
                  </span>
                </Link>
              </li>
            );
          })}
          <li className="border-b border-line/70">
            <Link
              href="/contact"
              onClick={onClose}
              className="group flex items-baseline justify-between gap-4 py-5"
            >
              <span className="t-h3 text-ink transition-colors duration-300 group-hover:text-brass">
                Contact
              </span>
              <span className="t-caption num shrink-0 text-stone">07</span>
            </Link>
          </li>
        </ul>

        <div className="mt-8 grid gap-3">
          <Button href="/booking" onClick={onClose} block size="lg">
            Book Your Stay
          </Button>
          <Button href={whatsappHref()} variant="outline" block size="lg">
            <IconWhatsApp className="h-4 w-4" />
            Plan Your Stay on WhatsApp
          </Button>
        </div>
      </nav>

      <div className="shrink-0 border-t border-line bg-ivory px-5 py-6 sm:px-8">
        <a href={telHref} className="flex items-center gap-3 text-ink">
          <IconPhone className="h-4 w-4 text-brass" />
          <span className="num text-[0.9375rem]">{site.contact.phoneDisplay}</span>
        </a>
        <p className="t-caption mt-3 text-muted">
          {site.contact.address.line2}, {site.contact.address.city}
        </p>
      </div>
    </div>
  );
}
