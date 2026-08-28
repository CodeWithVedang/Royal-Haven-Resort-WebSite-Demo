import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Figure } from "@/components/ui/Figure";
import { brandMoments } from "@/data/photos";
import { primaryNav } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[86svh] items-center">
      <div aria-hidden="true" className="absolute inset-0">
        <Figure
          photo={brandMoments.archway}
          source="hero"
          priority
          quality={75}
          sizes="100vw"
          className="h-full w-full"
        />
      </div>
      <span aria-hidden="true" className="absolute inset-0 bg-ink/72" />

      <Container width="wide" className="relative py-24">
        <div className="on-dark max-w-2xl">
          <p className="t-eyebrow">Error 404</p>
          <h1 className="t-h1 mt-5 text-balance text-cream">
            This page seems to have checked out.
          </h1>
          <p className="t-lead mt-6 max-w-lg text-cream/78">
            The link may be old, or we may have moved something. The front desk is always awake if
            you were looking for something in particular.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="/" variant="light" size="lg" arrow>
              Back to the resort
            </Button>
            <Button href="/booking" variant="brass" size="lg">
              Book Your Stay
            </Button>
          </div>

          <nav aria-label="Main pages" className="mt-12 border-t border-cream/20 pt-6">
            <ul className="flex flex-wrap gap-x-7 gap-y-3">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="t-caption tracking-[0.16em] uppercase text-cream/65 transition-colors duration-300 hover:text-brass-soft"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/contact"
                  className="t-caption tracking-[0.16em] uppercase text-cream/65 transition-colors duration-300 hover:text-brass-soft"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </Container>
    </section>
  );
}
