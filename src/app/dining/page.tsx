import type { Metadata } from "next";
import { PageHero, Section } from "@/components/layout/PageHero";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Figure } from "@/components/ui/Figure";
import { IconChilli, IconLeaf, IconWhatsApp } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { chefNote, diningNotes, menu, venues } from "@/data/dining";
import { pageHero } from "@/data/photos";
import { formatINR } from "@/lib/format";
import { whatsappHref } from "@/lib/site";
import { cn } from "@/lib/utils";

const courtyard = venues[0];

export const metadata: Metadata = {
  title: "Dining",
  description:
    "The Courtyard at Royal Haven Resort, Udaipur — contemporary Indian cuisine rooted in Rajasthan. Dal Baati Royale, laal maas, ker sangri and saffron kulfi, with half the menu vegetarian.",
  alternates: { canonical: "/dining" },
  openGraph: {
    title: "Dining | Royal Haven Resort",
    description: courtyard.cuisine,
  },
};

export default function DiningPage() {
  return (
    <>
      <PageHero
        photo={pageHero.dining}
        eyebrow={`Dining · ${courtyard.name}`}
        title="Contemporary Indian cuisine, rooted in Rajasthan."
        standfirst={courtyard.summary}
        meta={["Breakfast until 11:00", "Half the menu vegetarian", "Jain preparations on request"]}
      />
      <Section tone="ivory">
        <Container width="wide">
          <div className="space-y-20 lg:space-y-32">
            {venues.map((venue, index) => (
              <article
                key={venue.slug}
                id={venue.slug}
                className="grid gap-8 lg:grid-cols-12 lg:gap-14"
              >
                <div
                  className={cn(
                    "lg:col-span-6",
                    index % 2 === 1 ? "lg:order-2 lg:col-start-7" : undefined,
                  )}
                >
                  <Reveal variant="img" as="div" className="grid gap-4">
                    <Figure
                      photo={venue.photos[0]}
                      sizes="(min-width: 1024px) 48vw, 100vw"
                      source="band"
                      className="aspect-3/2"
                    />
                    {venue.photos.length > 1 ? (
                      <div className="grid grid-cols-2 gap-4">
                        {venue.photos.slice(1, 3).map((photo) => (
                          <Figure
                            key={photo.id}
                            photo={photo}
                            sizes="(min-width: 1024px) 24vw, 46vw"
                            source="card"
                            className="aspect-4/3"
                          />
                        ))}
                      </div>
                    ) : null}
                  </Reveal>
                </div>

                <Reveal delay={110} className="lg:col-span-6 lg:pl-4">
                  <p className="t-caption tracking-[0.2em] uppercase text-brass">{venue.kicker}</p>
                  <h2 className="t-h2 mt-4 text-balance text-ink">{venue.name}</h2>
                  <p className="t-lead mt-4">{venue.cuisine}</p>

                  <dl className="mt-8 grid gap-x-8 gap-y-5 border-y border-line py-5 sm:grid-cols-3">
                    {venue.hours.map((slot) => (
                      <div key={slot.label}>
                        <dt className="t-caption tracking-[0.18em] uppercase text-muted">
                          {slot.label}
                        </dt>
                        <dd className="num mt-1.5 font-serif text-xl font-normal text-ink">
                          {slot.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  <div className="mt-7 space-y-4">
                    {venue.description.map((paragraph) => (
                      <p key={paragraph.slice(0, 24)} className="t-body text-espresso">
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  <ul className="t-caption mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-muted">
                    {venue.seats > 0 ? <li>{venue.seats} covers</li> : <li>Every room, every hour</li>}
                    {venue.dressCode ? <li>{venue.dressCode}</li> : null}
                  </ul>
                </Reveal>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="ink">
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
            <Reveal variant="img" as="figure" className="lg:col-span-5">
              <Figure
                photo={chefNote.photo}
                sizes="(min-width: 1024px) 40vw, 100vw"
                source="feature"
                className="aspect-4/5"
              />
            </Reveal>
            <Reveal delay={120} className="lg:col-span-7 lg:pl-6">
              <p className="t-eyebrow text-brass-soft">In the kitchen</p>
              <blockquote className="t-quote mt-7 text-cream/92">
                <span aria-hidden="true" className="mr-1 text-brass">
                  &ldquo;
                </span>
                {chefNote.quote}
              </blockquote>
              <p className="t-caption mt-7 tracking-[0.2em] uppercase text-brass-soft">
                {chefNote.name} · {chefNote.role}
              </p>
              <p className="t-small mt-8 max-w-xl text-cream/70">
                Chef Rathore joined from a family kitchen in Jodhpur in 2016. The suppliers she
                brought with her — a chilli farmer in Mathania, a sangri drier in Barmer, a millet
                mill outside Bhilwara — are still the ones the kitchen buys from.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>
      <Section tone="cream" id="menu">
        <Container width="wide">
          <SectionHeading
            eyebrow="The Courtyard menu"
            title="What the kitchen is cooking this season."
            standfirst="A working menu rather than a showpiece — it changes when the market changes. Vegetarian dishes are marked, and the kitchen will adjust heat without being asked twice."
          />

          <nav aria-label="Menu sections" className="mt-10 -mx-5 overflow-x-auto px-5 lg:mx-0 lg:px-0">
            <ul className="flex min-w-max items-center gap-2 lg:min-w-0 lg:flex-wrap">
              {menu.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="t-caption block border border-line px-4 py-2.5 tracking-[0.16em] uppercase text-muted transition-colors duration-300 hover:border-brass/60 hover:text-ink"
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-14 grid gap-x-16 gap-y-16 lg:grid-cols-2">
            {menu.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-28">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-ink/15 pb-4">
                  <h3 className="t-h4 text-ink">{section.title}</h3>
                  {section.note ? (
                    <p className="t-caption text-stone">{section.note}</p>
                  ) : null}
                </div>

                <ul>
                  {section.dishes.map((dish) => (
                    <li
                      key={dish.name}
                      className="flex items-baseline justify-between gap-6 border-b border-line py-4"
                    >
                      <div className="min-w-0">
                        <p className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                          <span className="font-serif text-xl leading-tight font-normal text-ink">
                            {dish.name}
                          </span>
                          {dish.vegetarian ? (
                            <IconLeaf className="h-3.5 w-3.5 shrink-0 text-success" label="Vegetarian" />
                          ) : null}
                          {dish.heat ? (
                            <IconChilli
                              className="h-3.5 w-3.5 shrink-0 text-terracotta"
                              label={dish.heat > 1 ? "Hot" : "Mildly spiced"}
                            />
                          ) : null}
                          {dish.signature ? <Badge tone="brass">Signature</Badge> : null}
                        </p>
                        <p className="t-small mt-1.5 text-muted">{dish.description}</p>
                      </div>
                      <span className="num t-small shrink-0 text-espresso">{formatINR(dish.price)}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
          <ul className="mt-14 space-y-2.5 border-t border-line pt-8">
            {diningNotes.map((note) => (
              <li key={note.slice(0, 20)} className="t-caption text-stone">
                {note}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button
              href={whatsappHref(
                "Hello Royal Haven, I would like to reserve a table at The Courtyard.",
              )}
              size="lg"
              external
            >
              <IconWhatsApp className="h-4 w-4" />
              Reserve a table
            </Button>
            <Button href="/booking" variant="outline" size="lg" arrow>
              Check Availability
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
