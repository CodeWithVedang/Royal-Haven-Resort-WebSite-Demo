import { Section } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Figure } from "@/components/ui/Figure";
import { IconChilli, IconLeaf } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { chefNote, signatureDishes, venues } from "@/data/dining";
import { formatINR } from "@/lib/format";

const courtyard = venues[0];

export function DiningSection() {
  return (
    <Section tone="ink" id="dining">
      <Container width="wide">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal variant="img" as="figure">
              <Figure
                photo={courtyard.photo}
                sizes="(min-width: 1024px) 40vw, 100vw"
                source="feature"
                className="aspect-4/5"
              />
            </Reveal>
            <Reveal delay={140} className="mt-10 border-l border-brass/40 pl-6">
              <p className="t-quote text-cream/90">&ldquo;{chefNote.quote}&rdquo;</p>
              <p className="t-caption mt-5 tracking-[0.2em] uppercase text-brass-soft">
                {chefNote.name} · {chefNote.role}
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7 lg:pl-4">
            <Reveal>
              <SectionHeading
                eyebrow={`Dining · ${courtyard.name}`}
                title="Contemporary Indian cuisine, rooted in Rajasthan."
                standfirst={courtyard.summary}
                tone="light"
              />
            </Reveal>

            <Reveal delay={100}>
              <dl className="mt-10 grid gap-x-8 gap-y-5 border-y border-cream/15 py-6 sm:grid-cols-3">
                {courtyard.hours.map((slot) => (
                  <div key={slot.label}>
                    <dt className="t-caption tracking-[0.2em] uppercase text-cream/55">
                      {slot.label}
                    </dt>
                    <dd className="num mt-2 font-serif text-xl font-normal text-cream">
                      {slot.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={160}>
              <p className="t-eyebrow mt-10 text-brass-soft">On the menu tonight</p>
              <ul className="mt-6">
                {signatureDishes.slice(0, 4).map((dish) => (
                  <li
                    key={dish.name}
                    className="flex items-baseline justify-between gap-6 border-b border-cream/12 py-4"
                  >
                    <span className="min-w-0">
                      <span className="flex items-center gap-2.5">
                        <span className="font-serif text-xl leading-tight font-normal text-cream">
                          {dish.name}
                        </span>
                        {dish.vegetarian ? (
                          <IconLeaf
                            className="h-3.5 w-3.5 shrink-0 text-success"
                            label="Vegetarian"
                          />
                        ) : null}
                        {dish.heat ? (
                          <IconChilli
                            className="h-3.5 w-3.5 shrink-0 text-terracotta"
                            label={dish.heat > 1 ? "Hot" : "Mildly spiced"}
                          />
                        ) : null}
                      </span>
                      <span className="t-small mt-1.5 block text-cream/60">{dish.description}</span>
                    </span>
                    <span className="num t-small shrink-0 text-cream/85">
                      {formatINR(dish.price)}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={200} className="mt-10 flex flex-wrap gap-3">
              <Button href="/dining" variant="light" arrow>
                The Full Menu
              </Button>
              <Button href="/contact" variant="quiet" className="text-brass-soft hover:text-cream">
                Reserve a table
              </Button>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
