import type { Metadata } from "next";
import { PageHero, Section } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Figure } from "@/components/ui/Figure";
import { IconClock, IconWhatsApp } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pageHero } from "@/data/photos";
import { spa, spaJourneys, treatments } from "@/data/wellness";
import { formatINR } from "@/lib/format";
import { whatsappHref } from "@/lib/site";

const signature = treatments[0];
const rest = treatments.slice(1);

export const metadata: Metadata = {
  title: "Wellness",
  description:
    "The Haven Spa at Royal Haven Resort, Udaipur — Royal Abhyanga, Ayurvedic massage, shirodhara, a couple's ritual, private yoga and consultations with a resident Ayurvedic physician.",
  alternates: { canonical: "/wellness" },
  openGraph: {
    title: "Wellness | Royal Haven Resort",
    description: spa.headline,
  },
};

export default function WellnessPage() {
  return (
    <>
      <PageHero
        photo={pageHero.wellness}
        eyebrow={`Wellness · ${spa.name}`}
        title={spa.headline}
        standfirst="Four treatment rooms, a couple's suite, a steam and cold plunge, and a yoga pavilion above the garden. Therapists trained in Kerala; oils blended here in small batches."
        meta={[spa.hours, "Four treatment rooms", "Oils blended on site"]}
      />
      <Section tone="ivory">
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal variant="img" as="div" className="lg:col-span-6">
              <Figure
                photo={signature.photo}
                sizes="(min-width: 1024px) 48vw, 100vw"
                source="feature"
                className="aspect-4/5"
                priority
              />
            </Reveal>

            <Reveal delay={110} className="lg:col-span-6 lg:self-center lg:pl-4">
              <p className="t-caption tracking-[0.2em] uppercase text-brass">{signature.kicker}</p>
              <h2 className="t-h1 mt-4 text-balance text-ink">{signature.name}</h2>
              <p className="t-lead mt-5">{signature.summary}</p>
              <p className="t-body mt-5 text-espresso">{signature.description}</p>

              <div className="mt-9 flex flex-wrap items-end gap-x-10 gap-y-5 border-y border-line py-6">
                {signature.durations.map((duration) => (
                  <div key={duration.minutes}>
                    <p className="t-caption flex items-center gap-2 tracking-[0.18em] uppercase text-muted">
                      <IconClock className="h-3.5 w-3.5" />
                      {duration.minutes} minutes
                    </p>
                    <p className="num t-price mt-2 text-ink">{formatINR(duration.price)}</p>
                  </div>
                ))}
                <p className="t-caption max-w-56 text-stone">
                  Two therapists. Steam and ginger tulsi tea to finish.
                </p>
              </div>

              <ul className="t-caption mt-6 flex flex-wrap gap-x-6 gap-y-2 text-muted">
                {signature.good_for.map((item) => (
                  <li key={item}>Good for {item.toLowerCase()}</li>
                ))}
              </ul>

              <div className="mt-9 flex flex-wrap gap-3">
                <Button
                  href={whatsappHref(
                    `Hello Royal Haven, I would like to book the ${signature.name} at The Haven Spa.`,
                  )}
                  external
                >
                  <IconWhatsApp className="h-4 w-4" />
                  Book this treatment
                </Button>
                <Button href="#treatments" variant="quiet">
                  See the full menu
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
      <Section tone="cream" id="treatments">
        <Container width="wide">
          <SectionHeading
            eyebrow="The treatment menu"
            title="Five more, and none of them rushed."
            standfirst="Every treatment begins with tea and a short conversation, because the therapist needs to know what your day has been like. Prices are per person and include use of the steam room and plunge for the rest of the day."
          />

          <div className="mt-14 grid gap-x-14 gap-y-16 sm:grid-cols-2">
            {rest.map((treatment, index) => (
              <Reveal
                key={treatment.slug}
                as="article"
                id={treatment.slug}
                delay={(index % 2) * 90}
                className="scroll-mt-28"
              >
                <Figure
                  photo={treatment.photo}
                  sizes="(min-width: 640px) 44vw, 100vw"
                  source="card"
                  className="aspect-4/3"
                  zoom
                />
                <p className="t-caption mt-6 tracking-[0.2em] uppercase text-brass">
                  {treatment.kicker}
                </p>
                <h3 className="t-h3 mt-3 text-balance text-ink">{treatment.name}</h3>
                <p className="t-body mt-3 text-espresso">{treatment.summary}</p>
                <p className="t-small mt-3 text-muted">{treatment.description}</p>

                <ul className="mt-6 divide-y divide-line border-y border-line">
                  {treatment.durations.map((duration) => (
                    <li
                      key={duration.minutes}
                      className="flex items-baseline justify-between gap-6 py-3"
                    >
                      <span className="t-caption tracking-[0.16em] uppercase text-muted">
                        {duration.minutes} minutes
                      </span>
                      <span className="num font-serif text-xl font-normal text-ink">
                        {formatINR(duration.price)}
                      </span>
                    </li>
                  ))}
                </ul>

                <p className="t-caption mt-4 text-stone">{treatment.good_for.join(" · ")}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
      <Section tone="ink">
        <Container width="wide">
          <SectionHeading
            eyebrow="Journeys"
            title="For guests who would rather not decide each morning."
            standfirst="Two programmes, both built around a consultation on the first day and a short review on the last. Treatments are scheduled around your plans, not the other way round."
            tone="light"
          />

          <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-14">
            {spaJourneys.map((journey, index) => (
              <Reveal
                key={journey.name}
                as="article"
                delay={index * 100}
                className="flex flex-col border-t border-cream/20 pt-8"
              >
                <p className="t-caption tracking-[0.2em] uppercase text-brass-soft">
                  {journey.duration}
                </p>
                <h3 className="t-h2 mt-4 text-balance text-cream">{journey.name}</h3>

                <ul className="mt-7 mb-9 space-y-3.5">
                  {journey.inclusions.map((inclusion) => (
                    <li key={inclusion} className="t-body flex gap-3.5 text-cream/75">
                      <span aria-hidden="true" className="mt-2.5 h-px w-4 shrink-0 bg-brass" />
                      {inclusion}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex flex-wrap items-end justify-between gap-6 border-t border-cream/15 pt-6">
                  <p>
                    <span className="t-caption block tracking-[0.18em] uppercase text-cream/55">
                      Per person
                    </span>
                    <span className="num t-price mt-1.5 block text-cream">
                      {formatINR(journey.price)}
                    </span>
                  </p>
                  <Button
                    href={whatsappHref(
                      `Hello Royal Haven, I would like to know more about ${journey.name} at The Haven Spa.`,
                    )}
                    variant="light"
                    external
                  >
                    Enquire
                  </Button>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
      <Section tone="ivory">
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal variant="img" as="div" className="grid grid-cols-2 gap-4 lg:col-span-6">
              {spa.photos.map((photo, index) => (
                <Figure
                  key={photo.id}
                  photo={photo}
                  sizes="(min-width: 1024px) 24vw, 46vw"
                  source="card"
                  className={index % 3 === 0 ? "aspect-4/5" : "aspect-square"}
                />
              ))}
            </Reveal>

            <div className="lg:col-span-6 lg:pl-4">
              <Reveal>
                <p className="t-eyebrow text-brass">{spa.name}</p>
                <h2 className="t-h2 mt-4 text-balance text-ink">
                  The spa is a building, not a room at the back.
                </h2>
                <p className="t-body mt-5 text-espresso">{spa.intro}</p>
                <p className="t-caption mt-6 flex items-center gap-2.5 text-muted">
                  <IconClock className="h-4 w-4 text-brass" />
                  {spa.hours}
                </p>
              </Reveal>

              <Reveal delay={110}>
                <h3 className="t-caption mt-10 tracking-[0.2em] uppercase text-stone">
                  What is here
                </h3>
                <ul className="mt-4 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                  {spa.facilities.map((facility) => (
                    <li key={facility} className="t-small text-espresso">
                      {facility}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={160}>
                <h3 className="t-caption mt-10 tracking-[0.2em] uppercase text-stone">
                  Before you come down
                </h3>
                <ul className="mt-4 space-y-2.5 border-t border-line pt-4">
                  {spa.etiquette.map((note) => (
                    <li key={note.slice(0, 24)} className="t-small text-muted">
                      {note}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={200} className="mt-10 flex flex-wrap gap-3">
                <Button
                  href={whatsappHref(
                    "Hello Royal Haven, I would like to book a treatment at The Haven Spa.",
                  )}
                  size="lg"
                  external
                >
                  <IconWhatsApp className="h-4 w-4" />
                  Book a treatment
                </Button>
                <Button href="/booking" variant="outline" size="lg" arrow>
                  Check Availability
                </Button>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
