import { Section } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Figure } from "@/components/ui/Figure";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { weddingPackages, weddingsIntro, weddingVenues } from "@/data/weddings";
import { formatINR } from "@/lib/format";

/** The package most families pick — teased under the venue list so the column fills. */
const signature = weddingPackages.find((pkg) => pkg.featured) ?? weddingPackages[0];

export function WeddingsSection() {
  return (
    <Section tone="olive" id="weddings">
      <Container width="wide">
        <Reveal>
          <SectionHeading
            eyebrow="Weddings & Celebrations"
            title={weddingsIntro.headline}
            standfirst={weddingsIntro.standfirst}
            tone="light"
            action={
              <Button href="/weddings" variant="light" arrow>
                Weddings at Royal Haven
              </Button>
            }
          />
        </Reveal>

        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <div className="grid grid-cols-6 gap-4 lg:gap-5">
              <Reveal variant="img" as="figure" className="col-span-6">
                <Figure
                  photo={weddingsIntro.photos[0]}
                  sizes="(min-width: 1024px) 56vw, 100vw"
                  source="feature"
                  className="aspect-16/9"
                />
              </Reveal>
              <Reveal variant="img" as="figure" delay={120} className="col-span-2">
                <Figure
                  photo={weddingsIntro.photos[1]}
                  sizes="(min-width: 1024px) 19vw, 32vw"
                  source="card"
                  className="aspect-square"
                />
              </Reveal>
              <Reveal variant="img" as="figure" delay={180} className="col-span-2">
                <Figure
                  photo={weddingsIntro.photos[3]}
                  sizes="(min-width: 1024px) 19vw, 32vw"
                  source="card"
                  className="aspect-square"
                />
              </Reveal>
              <Reveal variant="img" as="figure" delay={240} className="col-span-2">
                <Figure
                  photo={weddingsIntro.photos[5]}
                  sizes="(min-width: 1024px) 19vw, 32vw"
                  source="card"
                  className="aspect-square"
                />
              </Reveal>
            </div>

            <Reveal delay={140}>
              <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-7 border-t border-cream/15 pt-8 sm:grid-cols-4">
                {weddingsIntro.stats.map((stat) => (
                  <div key={stat.label}>
                    <dt className="sr-only">{stat.label}</dt>
                    <dd>
                      <span className="num block font-serif text-4xl leading-none font-light text-cream lg:text-5xl">
                        {stat.figure}
                      </span>
                      <span className="t-caption mt-2.5 block tracking-[0.16em] uppercase text-cream/60">
                        {stat.label}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={100}>
              <p className="t-eyebrow text-brass-soft">Four venues, one property</p>
              <ul className="mt-6">
                {weddingVenues.map((venue) => (
                  <li key={venue.slug} className="border-b border-cream/12 py-5">
                    <div className="flex items-baseline justify-between gap-6">
                      <h3 className="font-serif text-xl leading-tight font-light text-cream">
                        {venue.name}
                      </h3>
                      <span className="num t-caption shrink-0 tracking-[0.14em] uppercase text-brass-soft">
                        {venue.seated} seated
                      </span>
                    </div>
                    <p className="t-caption mt-2 tracking-[0.14em] uppercase text-cream/50">
                      {venue.setting} · {venue.area} · {venue.bestFor}
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={180} className="mt-9">
              <p className="t-small text-cream/70">
                Eighteen weddings a season, and never two at once. Tell us the dates and we will come
                back within a working day with what is open and what it costs.
              </p>
              <Button href="/weddings#enquiry" variant="brass" arrow className="mt-7">
                Enquire about your date
              </Button>
            </Reveal>

            {signature ? (
              <Reveal variant="img" delay={220} className="group relative isolate mt-10">
                <Figure
                  photo={weddingsIntro.photos[2]}
                  sizes="(min-width: 1024px) 38vw, 100vw"
                  source="feature"
                  scrim="bottom"
                  zoom
                  className="aspect-3/2 lg:aspect-16/9"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 p-6">
                  <p className="t-caption tracking-[0.18em] uppercase text-brass-soft">
                    Most-booked package
                  </p>
                  <p className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="font-serif text-2xl leading-none font-light text-cream">
                      {signature.name}
                    </span>
                    <span className="t-caption num text-cream/70">
                      {signature.guests} · from {formatINR(signature.from)}
                    </span>
                  </p>
                </div>
              </Reveal>
            ) : null}
          </div>
        </div>
      </Container>
    </Section>
  );
}
