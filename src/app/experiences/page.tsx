import type { Metadata } from "next";
import { PageHero, Section } from "@/components/layout/PageHero";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Figure } from "@/components/ui/Figure";
import { IconWhatsApp } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { experiences } from "@/data/experiences";
import { pageHero } from "@/data/photos";
import { whatsappHref } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Experiences",
  description:
    "Sunrise in the Aravallis, a heritage walk through old Udaipur, a private boat on Lake Pichola, a village craft trail and dinner under the stars — arranged by the Royal Haven concierge.",
  alternates: { canonical: "/experiences" },
  openGraph: {
    title: "Experiences | Royal Haven Resort",
    description: "Six things worth leaving the room for, arranged by people who live here.",
  },
};

export default function ExperiencesPage() {
  return (
    <>
      <PageHero
        photo={pageHero.experiences}
        eyebrow="Experiences"
        title="More than a stay."
        standfirst="Everything here is run by people who live in Udaipur — a historian who grew up behind the City Palace, a potter forty minutes south, a boatman who has worked the lake for thirty years."
        meta={["Six experiences", "Private by default", "Arranged the day before"]}
      />
      <Section tone="ivory">
        <Container width="wide">
          <SectionHeading
            eyebrow="What people actually do here"
            title="Half of it happens before eight in the morning."
            standfirst="Nothing is scheduled unless you ask for it. Tell the concierge the night before — or the same morning, if you wake early."
          />

          <div className="mt-16 space-y-24 lg:mt-24 lg:space-y-36">
            {experiences.map((experience, index) => {
              const reverse = index % 2 === 1;

              return (
                <article
                  key={experience.slug}
                  id={experience.slug}
                  className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-14"
                >
                  <Reveal
                    variant="img"
                    as="div"
                    className={cn("relative lg:col-span-7", reverse ? "lg:order-2" : "lg:order-1")}
                  >
                    <Figure
                      photo={experience.photo}
                      sizes="(min-width: 1024px) 56vw, 100vw"
                      source="band"
                      className="aspect-4/3 lg:aspect-3/2"
                    />
                    {experience.secondaryPhoto ? (
                      <Figure
                        photo={experience.secondaryPhoto}
                        sizes="18vw"
                        source="thumb"
                        className={cn(
                          "absolute -bottom-8 hidden aspect-square w-40 border-8 border-ivory lg:block",
                          reverse ? "-right-8" : "-left-8",
                        )}
                      />
                    ) : null}
                  </Reveal>

                  <Reveal
                    delay={110}
                    className={cn("lg:col-span-5", reverse ? "lg:order-1" : "lg:order-2")}
                  >
                    <div className="flex items-center gap-4">
                      <span className="t-caption num text-stone">{`0${index + 1}`}</span>
                      <span aria-hidden="true" className="h-px w-10 bg-brass/45" />
                      <span className="t-caption tracking-[0.2em] uppercase text-brass">
                        {experience.kicker}
                      </span>
                    </div>

                    <h3 className="t-h2 mt-5 text-balance text-ink">{experience.title}</h3>
                    <div className="mt-6 space-y-4">
                      {experience.description.map((paragraph) => (
                        <p key={paragraph.slice(0, 24)} className="t-body text-espresso">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                    <ul className="mt-7 grid gap-x-8 gap-y-2 sm:grid-cols-2">
                      {experience.includes.map((item) => (
                        <li key={item} className="t-caption flex items-start gap-2.5 text-muted">
                          <span aria-hidden="true" className="mt-2 h-px w-3 shrink-0 bg-brass/60" />
                          {item}
                        </li>
                      ))}
                    </ul>

                    <dl className="mt-7 grid grid-cols-2 gap-x-8 gap-y-4 border-y border-line py-5">
                      {[
                        { term: "When", detail: experience.timing },
                        { term: "How long", detail: experience.duration },
                        { term: "Party", detail: experience.groupSize },
                        {
                          term: "Rate",
                          detail: experience.priceNote
                            ? `${experience.price} · ${experience.priceNote}`
                            : experience.price,
                        },
                      ].map((fact) => (
                        <div key={fact.term}>
                          <dt className="t-caption tracking-[0.16em] uppercase text-stone">
                            {fact.term}
                          </dt>
                          <dd className="t-small mt-1 text-espresso">{fact.detail}</dd>
                        </div>
                      ))}
                    </dl>

                    <div className="mt-6 flex flex-wrap items-center gap-2.5">
                      {experience.bestFor.map((audience) => (
                        <Badge key={audience} tone="default">
                          {audience}
                        </Badge>
                      ))}
                    </div>

                    <Button
                      href={whatsappHref(
                        `Hello Royal Haven, I would like to arrange the ${experience.title} during my stay.`,
                      )}
                      variant="quiet"
                      external
                      className="mt-6"
                    >
                      <IconWhatsApp className="h-4 w-4" />
                      Arrange this with the concierge
                    </Button>
                  </Reveal>
                </article>
              );
            })}
          </div>
        </Container>
      </Section>
      <Section tone="olive">
        <Container width="wide">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-16">
            <div className="lg:col-span-7">
              <SectionHeading
                tone="light"
                size="h2"
                eyebrow="Booking an experience"
                title="Ask at breakfast. Most of it can be ready by evening."
                standfirst={
                  <span className="text-cream/78">
                    Experiences are charged to the room and confirmed by the concierge — nothing is
                    paid online. Suite rates already include the heritage walk and the sunset boat.
                  </span>
                }
              />
            </div>
            <div className="lg:col-span-5">
              <div className="flex flex-wrap gap-3">
                <Button href="/booking" variant="brass" size="lg" arrow>
                  Book Your Stay
                </Button>
                <Button
                  href={whatsappHref(
                    "Hello Royal Haven, I would like to plan a few experiences for our stay.",
                  )}
                  variant="light"
                  size="lg"
                  external
                >
                  <IconWhatsApp className="h-4 w-4" />
                  Plan Your Stay on WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
