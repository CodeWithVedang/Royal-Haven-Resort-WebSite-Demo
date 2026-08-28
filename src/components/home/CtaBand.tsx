import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Figure } from "@/components/ui/Figure";
import { IconPhone, IconWhatsApp } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { brandMoments } from "@/data/photos";
import { site, telHref, whatsappHref } from "@/lib/site";

/** Why a guest should book here rather than through an aggregator. */
const directBooking = [
  {
    label: "Best available rate",
    detail: "Direct rates are the lowest we publish. No channel markup, no member tier to join.",
  },
  {
    label: "No prepayment",
    detail: "Flexible rates are held on confirmation and settled at the property.",
  },
  {
    label: "Free cancellation",
    detail: "Up to 48 hours before arrival on flexible rates.",
  },
  {
    label: "GST invoice",
    detail: "Issued at checkout with your company details, if you need one.",
  },
];

export function CtaBand() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* The copy sets the band height, so the photograph is positioned out of flow —
          a `Figure` stays `relative`, and h-full against an auto parent collapses. */}
      <div aria-hidden="true" className="absolute inset-0">
        <Figure
          photo={brandMoments.poolNight}
          source="band"
          sizes="100vw"
          objectPosition="center 60%"
          className="h-full w-full"
        />
      </div>
      {/* Graded rather than flat, so the photograph still reads on the right. */}
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-ink/88 via-ink/74 to-ink/50"
      />

      <Container width="wide" className="relative py-20 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-16">
          <Reveal className="on-dark lg:col-span-7">
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
              <a
                href={telHref}
                className="flex items-center gap-2.5 transition-colors hover:text-cream"
              >
                <IconPhone className="h-4 w-4 text-brass-soft" />
                {site.contact.phoneDisplay}
              </a>
              <span className="text-cream/45">{site.contact.hours.reservations}</span>
            </p>
          </Reveal>

          <Reveal delay={140} className="on-dark lg:col-span-5">
            <div className="border border-cream/18 bg-ink/60 p-7 backdrop-blur-sm lg:p-9">
              <p className="t-caption tracking-[0.2em] uppercase text-brass-soft">
                Booking direct
              </p>
              <dl className="mt-6">
                {directBooking.map((item) => (
                  <div key={item.label} className="border-t border-cream/12 py-4 first:border-t-0 first:pt-0">
                    <dt className="t-small font-medium text-cream">{item.label}</dt>
                    <dd className="t-caption mt-1.5 text-cream/65">{item.detail}</dd>
                  </div>
                ))}
              </dl>
              <p className="t-caption mt-5 border-t border-cream/12 pt-5 text-cream/50">
                Rates are per room, per night, inclusive of breakfast. Taxes as applicable.
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
