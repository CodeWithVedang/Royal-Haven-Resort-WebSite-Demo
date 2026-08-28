import { Section } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { Figure } from "@/components/ui/Figure";
import { IconStar } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { brandMoments } from "@/data/photos";
import { guestRating, testimonials } from "@/data/testimonials";

const featured = testimonials.slice(0, 3);

/** One photograph per quote, in the same order — the guest, not a stock portrait. */
const quotePhotos = [brandMoments.couple, brandMoments.breakfast, brandMoments.coupleHill];

export function Testimonials() {
  return (
    <Section tone="cream">
      <Container width="wide">
        <Reveal>
          <SectionHeading
            eyebrow="Guests"
            title="What people say once they are home."
            standfirst="Three of the notes left after this season. Nothing here was written for us; it was written to us."
            action={
              <div className="flex items-center gap-5">
                <p className="flex items-baseline gap-2">
                  <span className="num font-serif text-5xl leading-none font-light text-ink">
                    {guestRating.score}
                  </span>
                  <span className="t-small num text-muted">/ {guestRating.outOf}</span>
                </p>
                <span aria-hidden="true" className="h-10 w-px bg-line" />
                <div>
                  <p aria-hidden="true" className="flex gap-1.5">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <IconStar key={index} className="h-3.5 w-3.5 text-brass" />
                    ))}
                  </p>
                  <p className="t-caption mt-2 tracking-[0.14em] uppercase text-muted">
                    {guestRating.label} · {guestRating.reviews.toLocaleString("en-IN")} reviews
                  </p>
                </div>
              </div>
            }
          />
        </Reveal>

        <ul className="mt-14 grid gap-10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-12">
          {featured.map((testimonial, index) => (
            <Reveal
              as="li"
              key={testimonial.name}
              delay={index * 110}
              className={index === 2 ? "flex flex-col sm:col-span-2 lg:col-span-1" : "flex flex-col"}
            >
              <Figure
                photo={quotePhotos[index]}
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 48vw, 100vw"
                source="card"
                className={index === 2 ? "aspect-3/2 lg:aspect-4/5" : "aspect-4/5"}
              />
              <blockquote className="flex flex-1 flex-col">
                <span aria-hidden="true" className="mt-7 font-serif text-4xl leading-none text-brass/45">
                  &ldquo;
                </span>
                <p className="t-quote mt-3 flex-1 text-espresso">{testimonial.quote}</p>
                <footer className="mt-7 border-t border-line pt-5">
                  <p className="t-small font-medium text-ink">
                    {testimonial.name}
                    <span className="text-muted"> · {testimonial.city}</span>
                  </p>
                  <p className="t-caption mt-1.5 tracking-[0.14em] uppercase text-muted">
                    {testimonial.context} · {testimonial.stayed}
                  </p>
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={120}>
          <p className="t-caption mt-14 border-t border-line pt-6 text-muted">{guestRating.note}</p>
        </Reveal>
      </Container>
    </Section>
  );
}
