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

/** The three things guests mention first, kept short so the column stays quiet. */
const knownFor = [
  { label: "Family-run", detail: "The same family, four generations in." },
  { label: "Twelve acres", detail: "Gardens, a stepwell, and shade by four o’clock." },
  { label: "Twenty-five minutes", detail: "To the City Palace, and back out of earshot." },
];

export function Intro() {
  return (
    <Section tone="ivory" id="the-resort">
      <Container width="wide">
        <div className="grid items-start gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5 lg:pt-6">
            <Reveal>
              <SectionHeading eyebrow="The property" title="Stay somewhere worth remembering." />
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

            <Reveal delay={200} className="mt-10 border-t border-line pt-8">
              <dl className="grid gap-5 sm:grid-cols-3 lg:grid-cols-1 lg:gap-4">
                {knownFor.map((item) => (
                  <div key={item.label} className="lg:flex lg:items-baseline lg:gap-5">
                    <dt className="t-caption tracking-[0.16em] uppercase text-brass lg:w-44 lg:shrink-0">
                      {item.label}
                    </dt>
                    <dd className="t-small mt-1.5 text-espresso lg:mt-0">{item.detail}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={260} className="mt-9">
              <Button href="/rooms" variant="outline" arrow>
                See Rooms &amp; Suites
              </Button>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-5 gap-3.5 lg:gap-5">
              <Reveal variant="img" delay={60} className="col-span-3">
                <Figure
                  photo={brandMoments.courtyard}
                  sizes="(min-width: 1024px) 33vw, 58vw"
                  source="feature"
                  className="aspect-4/5"
                />
              </Reveal>

              <div className="col-span-2 flex flex-col gap-3.5 lg:gap-5">
                <Reveal variant="img" delay={140} className="min-h-32 flex-1">
                  <Figure
                    photo={brandMoments.jaali}
                    sizes="(min-width: 1024px) 22vw, 38vw"
                    source="card"
                    className="h-full"
                  />
                </Reveal>
                <Reveal variant="img" delay={200} className="min-h-32 flex-1">
                  <Figure
                    photo={brandMoments.gardens}
                    sizes="(min-width: 1024px) 22vw, 38vw"
                    source="card"
                    className="h-full"
                  />
                </Reveal>
              </div>

              <Reveal variant="img" delay={260} className="col-span-5">
                <Figure
                  photo={brandMoments.morningCoffee}
                  sizes="(min-width: 1024px) 56vw, 100vw"
                  source="feature"
                  className="aspect-21/9"
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
                  <span className="num block font-serif text-5xl leading-none font-normal text-ink lg:text-6xl">
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
