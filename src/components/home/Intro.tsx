import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Figure } from "@/components/ui/Figure";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Section } from "@/components/layout/PageHero";
import { brandMoments } from "@/data/photos";
import { TOTAL_KEYS } from "@/data/rooms";
import { guestRating } from "@/data/testimonials";
import { site } from "@/lib/site";

const stats = [
  { figure: String(TOTAL_KEYS), label: "Luxury rooms & suites" },
  { figure: `${new Date().getFullYear() - site.brand.established}+`, label: "Years of hospitality" },
  { figure: `${guestRating.score}/${guestRating.outOf}`, label: "Guest rating" },
  { figure: "24/7", label: "Personal concierge" },
];

export function Intro() {
  return (
    <Section tone="ivory" id="the-resort">
      <Container width="wide">
        <div className="grid items-start gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5 lg:pt-6">
            <Reveal>
              <SectionHeading
                eyebrow="The property"
                title="Stay somewhere worth remembering."
              />
            </Reveal>
            <Reveal delay={120} className="mt-8 space-y-6">
              <p className="t-body text-espresso">
                Royal Haven was built as a private residence in the 1890s and opened to guests in{" "}
                {site.brand.established}. The same family still runs it, which is why the person who
                meets you at the gate is likely to know your name by dinner.
              </p>
              <p className="t-body text-espresso">
                Twelve acres of garden, a stepwell older than the house, {TOTAL_KEYS} rooms and
                suites, and a kitchen that cooks Rajasthani food the way it is cooked at home. The
                old city is twenty-five minutes away when you want it, and out of earshot when you
                don&rsquo;t.
              </p>
              <p className="t-body text-espresso">
                Nothing here is hurried. Morning light enters through the courtyard before the city
                wakes, breakfast is served until eleven, and the staff are trained to read a room
                before they enter it.
              </p>
            </Reveal>
            <Reveal delay={200} className="mt-10">
              <Button href="/rooms" variant="outline" arrow>
                See Rooms & Suites
              </Button>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-12 gap-4 lg:gap-6">
              <Reveal variant="img" as="figure" className="col-span-8">
                <Figure
                  photo={brandMoments.courtyard}
                  sizes="(min-width: 1024px) 46vw, 66vw"
                  source="feature"
                  className="aspect-4/5"
                />
              </Reveal>
              <Reveal variant="img" as="figure" delay={160} className="col-span-4 self-end">
                <Figure
                  photo={brandMoments.jaali}
                  sizes="(min-width: 1024px) 23vw, 33vw"
                  source="card"
                  className="aspect-3/4"
                />
              </Reveal>
              <Reveal variant="img" as="figure" delay={260} className="col-span-7 col-start-5">
                <Figure
                  photo={brandMoments.morningCoffee}
                  sizes="(min-width: 1024px) 40vw, 58vw"
                  source="feature"
                  className="aspect-3/2"
                  caption="Coffee on the terrace, a little after seven."
                  scrim="bottom"
                />
              </Reveal>
            </div>
          </div>
        </div>

        <Reveal delay={120}>
          <dl className="mt-20 grid grid-cols-2 gap-y-10 border-t border-line pt-12 lg:mt-28 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="px-1 lg:px-0">
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="num block font-serif text-5xl leading-none font-light text-ink lg:text-6xl">
                    {stat.figure}
                  </span>
                  <span className="t-caption mt-4 block max-w-36 tracking-[0.18em] uppercase text-muted">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </Section>
  );
}
