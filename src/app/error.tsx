"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { IconPhone, IconWhatsApp } from "@/components/ui/Icons";
import { site, telHref, whatsappHref } from "@/lib/site";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // A real property would forward this to its monitoring service.
    console.error("Unhandled error:", error);
  }, [error]);

  return (
    <section className="flex min-h-[80svh] items-center bg-ivory py-24">
      <Container width="default">
        <p className="t-eyebrow text-brass">Something went wrong</p>
        <h1 className="t-h1 mt-5 max-w-2xl text-balance text-ink">
          That did not load the way it should have.
        </h1>
        <p className="t-lead mt-6 max-w-xl">
          Try again — it is usually momentary. If it keeps happening, the reservations desk can take
          your booking directly, which is often quicker anyway.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button type="button" size="lg" onClick={reset}>
            Try again
          </Button>
          <Button href="/" variant="outline" size="lg" arrow>
            Back to the homepage
          </Button>
        </div>

        <div className="mt-12 flex flex-wrap gap-x-10 gap-y-4 border-t border-line pt-7">
          <a
            href={telHref}
            className="t-small flex items-center gap-2.5 text-espresso transition-colors duration-300 hover:text-brass"
          >
            <IconPhone className="h-4 w-4 text-brass" />
            <span className="num">{site.contact.phoneDisplay}</span>
          </a>
          <a
            href={whatsappHref()}
            target="_blank"
            rel="noreferrer noopener"
            className="t-small flex items-center gap-2.5 text-espresso transition-colors duration-300 hover:text-brass"
          >
            <IconWhatsApp className="h-4 w-4 text-brass" />
            Plan Your Stay on WhatsApp
          </a>
        </div>

        {error.digest ? (
          <p className="t-caption mt-8 text-stone">Reference {error.digest}</p>
        ) : null}
      </Container>
    </section>
  );
}
