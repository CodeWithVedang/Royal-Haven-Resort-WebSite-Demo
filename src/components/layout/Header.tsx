"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { Button } from "@/components/ui/Button";
import { IconMenu } from "@/components/ui/Icons";
import { primaryNav } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  // Remembering the route the drawer opened on closes it on navigation —
  // including browser back — without a route-watching effect.
  const [openedOn, setOpenedOn] = useState<string | null>(null);
  const menuOpen = openedOn === pathname;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || menuOpen;
  const tone = solid ? "ink" : "light";

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:bg-ink focus:px-4 focus:py-2 focus:t-nav focus:text-cream"
      >
        Skip to content
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-70 transition-[background-color,box-shadow,height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          solid ? "bg-cream/97 shadow-header backdrop-blur-sm" : "bg-transparent",
        )}
      >
        <div
          className={cn(
            "mx-auto flex w-full max-w-[104rem] items-center justify-between gap-8 px-5 transition-[height] duration-500 sm:px-8 lg:px-12",
            solid ? "h-18 lg:h-20" : "h-22 lg:h-28",
          )}
        >
          <Logo tone={tone} compact={solid} className="shrink-0" />

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {primaryNav.map((item) => {
                const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      data-active={active}
                      className={cn(
                        "link-underline t-nav transition-colors duration-400",
                        solid ? "text-espresso hover:text-ink" : "text-cream/85 hover:text-cream",
                        active && (solid ? "text-ink" : "text-cream"),
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="hidden items-center gap-6 lg:flex">
            <Link
              href="/contact"
              className={cn(
                "link-underline t-nav transition-colors duration-400",
                solid ? "text-espresso hover:text-ink" : "text-cream/85 hover:text-cream",
              )}
            >
              Contact
            </Link>
            <Button href="/booking" size="sm" variant={solid ? "solid" : "light"}>
              Book Your Stay
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setOpenedOn(pathname)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            className={cn(
              "-mr-2 flex h-11 w-11 items-center justify-center transition-colors lg:hidden",
              solid ? "text-ink" : "text-cream",
            )}
          >
            <IconMenu className="h-6 w-6" />
          </button>
        </div>
        <span
          aria-hidden="true"
          className={cn(
            "block h-px origin-left bg-line transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
            solid ? "scale-x-100" : "scale-x-0",
          )}
        />
      </header>

      <MobileMenu open={menuOpen} onClose={() => setOpenedOn(null)} pathname={pathname} />
    </>
  );
}
