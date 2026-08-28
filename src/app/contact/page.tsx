import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageHero, Section } from "@/components/layout/PageHero";
import { MapPanel } from "@/components/location/MapPanel";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { IconClock, IconMail, IconPhone, IconPin, IconWhatsApp } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { bookingFaqs, generalFaqs } from "@/data/faq";
import { arrival, distances } from "@/data/location";
import { pageHero } from "@/data/photos";
import {
  addressOneLine,
  directionsHref,
  mailHref,
  site,
  telHref,
  whatsappHref,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact & Directions",
  description:
    "Reach Royal Haven Resort, Udaipur — reservations by phone and WhatsApp, an enquiry form answered by a person, directions from Udaipur Airport, and answers to the questions guests ask most.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact | Royal Haven Resort",
    description: "Reservations, directions and enquiries — Royal Haven Resort, Udaipur.",
  },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        photo={pageHero.contact}
        height="compact"
        eyebrow="Contact"
        title="Ask us anything. A person answers."
        standfirst="The reservations desk is small and reads every message. If your question is urgent, WhatsApp is quickest."
        meta={[site.contact.hours.reservations, site.contact.hours.frontDesk]}
      />
      <Section tone="ivory">
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal>
                <p className="t-eyebrow text-brass">Reservations</p>
                <h2 className="t-h2 mt-4 text-balance text-ink">
                  Three ways to reach us, all of them staffed.
                </h2>
                <p className="t-body mt-5 text-espresso">
                  Call between 8:00 and 22:00 IST and you will speak to someone at the desk in
                  Udaipur, not a contact centre. The front desk is awake all night if you are
                  arriving on a late flight.
                </p>
              </Reveal>

              <Reveal delay={100} className="mt-9 divide-y divide-line border-y border-line">
                <a
                  href={telHref}
                  className="group flex items-center gap-4 py-5 transition-colors duration-300 hover:text-brass"
                >
                  <IconPhone className="h-4.5 w-4.5 shrink-0 text-brass" />
                  <span>
                    <span className="t-caption block tracking-[0.18em] uppercase text-muted">
                      Call us
                    </span>
                    <span className="num t-body mt-1 block text-ink group-hover:text-brass">
                      {site.contact.phoneDisplay}
                    </span>
                  </span>
                </a>
                <a
                  href={whatsappHref()}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group flex items-center gap-4 py-5 transition-colors duration-300 hover:text-brass"
                >
                  <IconWhatsApp className="h-4.5 w-4.5 shrink-0 text-brass" />
                  <span>
                    <span className="t-caption block tracking-[0.18em] uppercase text-muted">
                      WhatsApp us
                    </span>
                    <span className="t-body mt-1 block text-ink group-hover:text-brass">
                      Plan Your Stay on WhatsApp
                    </span>
                  </span>
                </a>
                <a
                  href={mailHref}
                  className="group flex items-center gap-4 py-5 transition-colors duration-300 hover:text-brass"
                >
                  <IconMail className="h-4.5 w-4.5 shrink-0 text-brass" />
                  <span className="min-w-0">
                    <span className="t-caption block tracking-[0.18em] uppercase text-muted">
                      Email
                    </span>
                    <span className="t-body mt-1 block break-all text-ink group-hover:text-brass">
                      {site.contact.email}
                    </span>
                  </span>
                </a>
              </Reveal>
              <Reveal delay={150} className="mt-9">
                <p className="t-caption flex items-start gap-3 text-muted">
                  <IconPin className="mt-0.5 h-4 w-4 shrink-0 text-brass" />
                  <span className="not-italic">
                    <span className="block text-ink">{site.contact.address.line1}</span>
                    {addressOneLine}
                  </span>
                </p>
                <p className="t-caption mt-4 flex items-start gap-3 text-muted">
                  <IconClock className="mt-0.5 h-4 w-4 shrink-0 text-brass" />
                  <span>
                    {site.contact.hours.reservations}
                    <br />
                    {site.contact.hours.frontDesk}
                  </span>
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Button href={directionsHref} variant="outline" external>
                    Get Directions
                  </Button>
                  <Button href="/booking" variant="quiet" arrow>
                    Check Availability
                  </Button>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="cream" id="directions">
        <Container width="wide">
          <SectionHeading
            eyebrow="Getting here"
            title="Twenty-two kilometres from the airport, and the last one is the prettiest."
            standfirst="The resort sits west of Lake Pichola on Rajmahal Road, far enough from the old city to be quiet and close enough to be there in twenty-five minutes."
          />

          <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-14">
            <Reveal variant="img" as="div" className="lg:col-span-7">
              <MapPanel className="aspect-4/3 w-full overflow-hidden border border-line bg-sand" />
              <p className="t-caption mt-3 text-stone">
                Illustrated map — a Google Maps embed appears here once an API key is configured.
              </p>
            </Reveal>

            <Reveal delay={110} className="lg:col-span-5">
              <dl className="divide-y divide-line border-y border-line">
                {distances.map((distance) => (
                  <div key={distance.place} className="py-5">
                    <div className="flex items-baseline justify-between gap-6">
                      <dt className="t-h4 text-ink">{distance.place}</dt>
                      <span className="num t-caption shrink-0 tracking-[0.16em] uppercase text-brass">
                        {distance.minutes}
                      </span>
                    </div>
                    <dd className="t-small mt-2 text-muted">{distance.detail}</dd>
                  </div>
                ))}
              </dl>
              <ul className="mt-8 space-y-3">
                {arrival.notes.map((note) => (
                  <li key={note.slice(0, 24)} className="t-small text-espresso">
                    {note}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </Section>
      <Section tone="ivory" id="faq">
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <SectionHeading
                eyebrow="Frequently asked"
                title="Answers, without the brochure voice."
              />
              <p className="t-small mt-7 max-w-sm text-muted">
                Still unanswered? WhatsApp the desk — most questions come back within a few minutes
                during the day.
              </p>
              <Button
                href={whatsappHref("Hello Royal Haven, I have a question about a stay.")}
                variant="outline"
                external
                className="mt-6"
              >
                <IconWhatsApp className="h-4 w-4" />
                Ask on WhatsApp
              </Button>
            </div>

            <div className="lg:col-span-8">
              {[
                { title: "Staying here", items: generalFaqs },
                { title: "Rates & booking", items: bookingFaqs },
              ].map((group) => (
                <div key={group.title} className="mt-10 first:mt-0">
                  <h3 className="t-caption tracking-[0.2em] uppercase text-stone">{group.title}</h3>
                  <div className="mt-4 divide-y divide-line border-y border-line">
                    {group.items.map((faq) => (
                      <details key={faq.question} className="group py-5">
                        <summary className="flex cursor-pointer list-none items-start justify-between gap-6">
                          <h4 className="t-h4 text-ink">{faq.question}</h4>
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
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
