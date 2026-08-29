import type { Metadata } from "next";
import { PageHero, Section } from "@/components/layout/PageHero";
import { WeddingEnquiryForm } from "@/components/forms/WeddingEnquiryForm";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Figure } from "@/components/ui/Figure";
import { IconCheck, IconMail, IconPhone, IconWhatsApp } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pageHero } from "@/data/photos";
import {
  weddingFaqs,
  weddingPackages,
  weddingServices,
  weddingTimeline,
  weddingVenues,
  weddingsIntro,
} from "@/data/weddings";
import { formatINR } from "@/lib/format";
import { site, telHref, whatsappHref } from "@/lib/site";

const weddingsMailHref = `mailto:${site.contact.weddingsEmail}`;

export const metadata: Metadata = {
  title: "Weddings & Celebrations",
  description:
    "Destination weddings at Royal Haven Resort, Udaipur — four venues, up to 500 guests, 42 keys on exclusive use, and a twelve-person wedding team. Packages, capacities and enquiries.",
  alternates: { canonical: "/weddings" },
  openGraph: {
    title: "Weddings at Royal Haven Resort, Udaipur",
    description: weddingsIntro.standfirst,
  },
};

export default function WeddingsPage() {
  return (
    <>
      <PageHero
        photo={pageHero.weddings}
        eyebrow="Weddings & Celebrations"
        title={weddingsIntro.headline}
        standfirst={weddingsIntro.standfirst}
        meta={["Up to 500 guests", "Four venues", "42 keys on exclusive use"]}
        actions={
          <>
            <Button href="#enquiry" variant="brass" size="lg">
              Check Your Date
            </Button>
            <Button href="#packages" variant="light" size="lg" arrow>
              See Packages
            </Button>
          </>
        }
      />
      <Section tone="ivory">
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <p className="t-eyebrow text-brass">Why families choose it</p>
              <h2 className="t-h2 mt-4 text-balance text-ink">
                One property, one team, and no other wedding running beside yours.
              </h2>
            </Reveal>
            <Reveal delay={100} className="lg:col-span-7 lg:pl-6">
              <p className="t-lead">
                Eighteen weddings a season is a deliberate number. It means the lawn is never turned
                around overnight, the kitchen is never split between two families, and the manager
                you meet at the site visit is the one standing at the gate when your guests arrive.
              </p>
              <p className="t-body mt-5 text-espresso">
                The resort sits twenty-five minutes from the City Palace and thirty-five from the
                airport, so guests who fly in the same morning still make the mehndi. Every outdoor
                venue has Durbar Hall held behind it as the wet-weather plan — at no extra cost, with
                the switch decided four hours before, together with you.
              </p>

              <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-line pt-8 sm:grid-cols-4">
                {weddingsIntro.stats.map((stat) => (
                  <div key={stat.label}>
                    <dt className="num font-serif text-4xl leading-none font-normal text-ink lg:text-5xl">
                      {stat.figure}
                    </dt>
                    <dd className="t-caption mt-3 tracking-[0.16em] uppercase text-muted">
                      {stat.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <Reveal variant="img" as="div" className="mt-16 grid gap-4 sm:grid-cols-3 lg:mt-20">
            {weddingsIntro.photos.slice(0, 3).map((photo, index) => (
              <Figure
                key={photo.id}
                photo={photo}
                sizes="(min-width: 640px) 31vw, 100vw"
                source="card"
                className={index === 1 ? "aspect-4/5" : "aspect-4/5 sm:aspect-3/4"}
                zoom
              />
            ))}
          </Reveal>
        </Container>
      </Section>
      <Section tone="cream" id="venues">
        <Container width="wide">
          <SectionHeading
            eyebrow="The venues"
            title="Four settings, and a plan for the rain behind each one."
            standfirst="Capacities below are seated with a stage and dance floor in place. Most families use three of the four across a celebration, moving guests from the courtyard to the lawn to the hall as the days go on."
          />

          <div className="mt-14 space-y-16 lg:space-y-24">
            {weddingVenues.map((venue, index) => (
              <article
                key={venue.slug}
                id={venue.slug}
                className="grid scroll-mt-28 gap-8 lg:grid-cols-12 lg:gap-14"
              >
                <Reveal
                  variant="img"
                  as="div"
                  className={
                    index % 2 === 1 ? "lg:col-span-7 lg:order-2 lg:col-start-6" : "lg:col-span-7"
                  }
                >
                  <Figure
                    photo={venue.photo}
                    sizes="(min-width: 1024px) 56vw, 100vw"
                    source="feature"
                    className="aspect-3/2"
                    zoom
                  />
                </Reveal>

                <Reveal delay={110} className="lg:col-span-5 lg:self-center">
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge tone="brass">{venue.setting}</Badge>
                    <p className="t-caption tracking-[0.16em] uppercase text-muted">{venue.area}</p>
                  </div>
                  <h3 className="t-h2 mt-4 text-balance text-ink">{venue.name}</h3>
                  <p className="t-body mt-4 text-espresso">{venue.description}</p>

                  <dl className="mt-8 grid grid-cols-3 gap-x-6 gap-y-4 border-y border-line py-5">
                    <div>
                      <dt className="t-caption tracking-[0.16em] uppercase text-muted">Seated</dt>
                      <dd className="num mt-1.5 font-serif text-2xl font-normal text-ink">
                        {venue.seated}
                      </dd>
                    </div>
                    <div>
                      <dt className="t-caption tracking-[0.16em] uppercase text-muted">Standing</dt>
                      <dd className="num mt-1.5 font-serif text-2xl font-normal text-ink">
                        {venue.standing}
                      </dd>
                    </div>
                    <div>
                      <dt className="t-caption tracking-[0.16em] uppercase text-muted">Best for</dt>
                      <dd className="t-small mt-1.5 text-ink">{venue.bestFor}</dd>
                    </div>
                  </dl>
                </Reveal>
              </article>
            ))}
          </div>
        </Container>
      </Section>
      <Section tone="ink" id="packages">
        <Container width="wide">
          <SectionHeading
            eyebrow="Packages"
            title="Three formats, priced honestly."
            standfirst="Indicative starting prices for a full celebration — rooms, food, venues, base decor and the team included. Nothing is loaded afterwards as a production margin, and everything below can be rearranged."
            tone="light"
          />

          <div className="mt-14 grid gap-8 lg:grid-cols-3 lg:gap-6">
            {weddingPackages.map((pkg, index) => (
              <Reveal
                key={pkg.slug}
                as="article"
                delay={index * 90}
                className={`flex flex-col border p-7 lg:p-8 ${
                  pkg.featured ? "border-brass/55 bg-brass/8" : "border-cream/18"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <p className="t-caption tracking-[0.2em] uppercase text-brass-soft">
                    {pkg.guests}
                  </p>
                  {pkg.featured ? <Badge tone="light">Most chosen</Badge> : null}
                </div>
                <h3 className="t-h3 mt-4 text-cream">{pkg.name}</h3>
                <p className="t-small mt-3 text-cream/70">{pkg.summary}</p>

                <ul className="t-caption mt-6 flex flex-wrap gap-x-5 gap-y-2 border-y border-cream/15 py-4 tracking-[0.14em] uppercase text-cream/60">
                  <li>{pkg.nights} nights</li>
                  <li>{pkg.events} events</li>
                  <li>{pkg.keys} keys</li>
                </ul>

                <ul className="mt-6 mb-8 space-y-3">
                  {pkg.inclusions.map((inclusion) => (
                    <li key={inclusion} className="t-small flex gap-3 text-cream/78">
                      <IconCheck className="mt-1 h-3.5 w-3.5 shrink-0 text-brass-soft" />
                      {inclusion}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto border-t border-cream/15 pt-6">
                  <p className="t-caption tracking-[0.18em] uppercase text-cream/55">Starting at</p>
                  <p className="num t-price mt-1.5 text-cream">{formatINR(pkg.from)}</p>
                  <p className="t-caption mt-2 text-cream/50">
                    All in, before GST. Scaled to your guest count.
                  </p>
                  <Button
                    href="#enquiry"
                    variant={pkg.featured ? "brass" : "light"}
                    block
                    className="mt-6"
                  >
                    Enquire About This
                  </Button>
                </div>
              </Reveal>
            ))}
          </div>

          <p className="t-caption mt-10 max-w-2xl text-cream/55">
            Smaller celebrations — a mehndi lunch, an anniversary dinner, a court marriage with
            twenty people — are quoted per event rather than per package. Ask, and the team will
            write one line back with a number.
          </p>
        </Container>
      </Section>
      <Section tone="ivory" id="services">
        <Container width="wide">
          <SectionHeading
            eyebrow="What the team handles"
            title="The parts that usually go wrong, handled by people who have done it before."
            standfirst="Twelve people work on weddings here, and they stay through the night shift. You are welcome to bring your own planner — most families do, and the division of work is straightforward."
          />

          <div className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {weddingServices.map((service, index) => (
              <Reveal
                key={service.title}
                as="article"
                delay={(index % 3) * 80}
                className="border-t border-line pt-6"
              >
                <p className="num t-caption tracking-[0.2em] text-brass">
                  {`${index + 1}`.padStart(2, "0")}
                </p>
                <h3 className="t-h4 mt-3 text-ink">{service.title}</h3>
                <p className="t-small mt-3 text-muted">{service.body}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="sand">
        <Container width="wide">
          <Reveal variant="img" as="div" className="grid gap-4 sm:grid-cols-3">
            {weddingsIntro.photos.slice(3, 6).map((photo) => (
              <Figure
                key={photo.id}
                photo={photo}
                sizes="(min-width: 640px) 31vw, 100vw"
                source="card"
                className="aspect-4/3"
                zoom
              />
            ))}
          </Reveal>

          <SectionHeading
            className="mt-16 lg:mt-20"
            eyebrow="How it goes"
            title="From the first message to the last car leaving."
          />

          <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
            {weddingTimeline.map((stage, index) => (
              <Reveal
                key={stage.step}
                as="li"
                delay={index * 70}
                className="border-t border-ink/15 pt-5"
              >
                <p className="t-caption tracking-[0.18em] uppercase text-brass">{stage.when}</p>
                <h3 className="t-h4 mt-2.5 text-ink">{stage.step}</h3>
                <p className="t-small mt-3 text-muted">{stage.body}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>
      <Section tone="cream" id="questions">
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <SectionHeading
                eyebrow="Asked at every site visit"
                title="The questions families actually ask."
              />
              <p className="t-small mt-7 max-w-sm text-muted">
                Anything not answered here, ask on WhatsApp — the wedding desk replies between 9:00
                and 21:00, and reads messages after that.
              </p>
            </div>

            <div className="lg:col-span-8">
              <div className="divide-y divide-line border-y border-line">
                {weddingFaqs.map((faq) => (
                  <details key={faq.question} className="group py-5">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-6">
                      <h3 className="t-h4 text-ink">{faq.question}</h3>
                      <span
                        aria-hidden="true"
                        className="mt-1.5 shrink-0 text-brass transition-transform duration-300 group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <p className="t-body mt-4 max-w-2xl pr-10 text-espresso">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>
      <Section tone="ink" id="enquiry">
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Enquire"
                title="Start with the date. Everything else follows from it."
                standfirst="Peak season here runs November to March, and the good dates go eleven months ahead. Send what you know and the team will tell you honestly whether your date is open."
                tone="light"
              />

              <dl className="mt-10 space-y-6 border-t border-cream/15 pt-8">
                <div>
                  <dt className="t-caption tracking-[0.18em] uppercase text-cream/55">
                    Wedding desk
                  </dt>
                  <dd className="mt-2 space-y-2">
                    <a
                      href={telHref}
                      className="t-body flex items-center gap-3 text-cream transition-colors duration-300 hover:text-brass-soft"
                    >
                      <IconPhone className="h-4 w-4 text-brass-soft" />
                      <span className="num">{site.contact.phoneDisplay}</span>
                    </a>
                    <a
                      href={weddingsMailHref}
                      className="t-body flex items-center gap-3 break-all text-cream transition-colors duration-300 hover:text-brass-soft"
                    >
                      <IconMail className="h-4 w-4 shrink-0 text-brass-soft" />
                      {site.contact.weddingsEmail}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="t-caption tracking-[0.18em] uppercase text-cream/55">
                    Site visits
                  </dt>
                  <dd className="t-small mt-2 text-cream/70">
                    Any day between 10:00 and 18:00, with lunch on us. Families abroad get a live
                    walkthrough on video instead.
                  </dd>
                </div>
                <div>
                  <dt className="t-caption tracking-[0.18em] uppercase text-cream/55">Payments</dt>
                  <dd className="t-small mt-2 text-cream/70">
                    25% confirms the dates, 50% at ninety days, the balance a week before arrival.
                    One invoice, GST included.
                  </dd>
                </div>
              </dl>

              <Button
                href={whatsappHref(
                  "Hello Royal Haven, we are planning a wedding in Udaipur and would like to check available dates.",
                )}
                variant="light"
                size="lg"
                external
                className="mt-9"
              >
                <IconWhatsApp className="h-4 w-4" />
                Plan Your Stay on WhatsApp
              </Button>
            </div>

            <div className="lg:col-span-7">
              <WeddingEnquiryForm />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
