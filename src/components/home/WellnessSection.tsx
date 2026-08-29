import { Section } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Figure } from "@/components/ui/Figure";
import { IconClock } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { spa, treatments } from "@/data/wellness";
import { formatINR } from "@/lib/format";

export function WellnessSection() {
  return (
    <Section tone="sand" id="wellness">
      <Container width="wide">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Reveal>
              <SectionHeading
                eyebrow={`Wellness · ${spa.name}`}
                title={spa.headline}
                standfirst={spa.intro}
              />
            </Reveal>

            <Reveal delay={120}>
              <ul className="mt-12">
                {treatments.slice(0, 6).map((treatment) => {
                  const shortest = treatment.durations[0];
                  return (
                    <li
                      key={treatment.slug}
                      className="flex items-baseline justify-between gap-6 border-b border-clay/70 py-4"
                    >
                      <span>
                        <span className="font-serif text-xl leading-tight font-normal text-ink">
                          {treatment.name}
                        </span>
                        <span className="t-caption mt-1 block tracking-[0.14em] uppercase text-muted">
                          {treatment.kicker} · {shortest.minutes} minutes
                        </span>
                      </span>
                      <span className="num t-small shrink-0 text-espresso">
                        {formatINR(shortest.price)}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </Reveal>

            {/* The two questions the spa desk is asked most, answered before they are asked. */}
            <Reveal delay={140}>
              <p className="t-small mt-8 border-t border-clay/70 pt-6 text-espresso">
                Treatments run from forty-five minutes to two hours, and the price above is for the
                shortest version of each. There are four treatment rooms, so the morning slots go
                first — most guests book theirs at check-in.
              </p>
            </Reveal>

            <Reveal delay={180} className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              <p className="t-caption flex items-center gap-2.5 text-muted">
                <IconClock className="h-4 w-4 text-brass" />
                {spa.hours}
              </p>
              <Button href="/wellness" variant="outline" arrow>
                The Haven Spa
              </Button>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <div className="grid grid-cols-6 gap-4 lg:gap-6">
              <Reveal variant="img" as="figure" className="col-span-6">
                <Figure
                  photo={spa.photos[0]}
                  sizes="(min-width: 1024px) 48vw, 100vw"
                  source="feature"
                  className="aspect-3/2"
                />
              </Reveal>
              <Reveal variant="img" as="figure" delay={140} className="col-span-3">
                <Figure
                  photo={spa.photos[1]}
                  sizes="(min-width: 1024px) 24vw, 48vw"
                  source="card"
                  className="aspect-square"
                />
              </Reveal>
              <Reveal variant="img" as="figure" delay={220} className="col-span-3">
                <Figure
                  photo={spa.photos[2]}
                  sizes="(min-width: 1024px) 24vw, 48vw"
                  source="card"
                  className="aspect-square"
                />
              </Reveal>
              <Reveal variant="img" as="figure" delay={280} className="col-span-6">
                <Figure
                  photo={spa.photos[3]}
                  sizes="(min-width: 1024px) 48vw, 100vw"
                  source="feature"
                  className="aspect-21/9"
                />
              </Reveal>
            </div>

            <Reveal delay={180}>
              <ul className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {spa.facilities.map((facility) => (
                  <li key={facility} className="t-small flex items-start gap-3 text-espresso">
                    <span aria-hidden="true" className="mt-2.5 h-px w-4 shrink-0 bg-brass/60" />
                    {facility}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
