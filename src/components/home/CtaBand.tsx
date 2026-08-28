import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Figure } from "@/components/ui/Figure";
import { IconPhone, IconWhatsApp } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { brandMoments } from "@/data/photos";
import { site, telHref, whatsappHref } from "@/lib/site";

export function CtaBand() {
  return (
    <section className="relative isolate overflow-hidden">
      <Figure
        photo={brandMoments.poolNight}
        source="band"
        sizes="100vw"
        objectPosition="center 60%"
        className="absolute inset-0 h-full w-full"
      />
      <span aria-hidden="true" className="absolute inset-0 bg-ink/72" />

      <Container width="wide" className="relative py-20 lg:py-28">
        <Reveal className="on-dark max-w-2xl">
          <p className="t-eyebrow text-brass-soft">Reservations</p>
          <h2 className="t-h1 mt-5 text-balance text-cream">
            Some evenings are better spent doing absolutely nothing.
          </h2>
          <p className="t-lead mt-6 max-w-xl text-cream/78">
            Check the calendar for your dates, or send us a message — the reservations desk answers
            between 8:00 and 22:00 IST, and usually within the hour.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="/booking" variant="brass" size="lg" arrow>
              Book Your Stay
            </Button>
            <Button href={whatsappHref()} variant="light" size="lg" external>
              <IconWhatsApp className="h-4 w-4" />
              Plan Your Stay on WhatsApp
            </Button>
          </div>

          <p className="t-small mt-9 flex flex-wrap items-center gap-x-8 gap-y-3 text-cream/70">
            <a href={telHref} className="flex items-center gap-2.5 transition-colors hover:text-cream">
              <IconPhone className="h-4 w-4 text-brass-soft" />
              {site.contact.phoneDisplay}
            </a>
            <span className="text-cream/45">{site.contact.hours.reservations}</span>
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
