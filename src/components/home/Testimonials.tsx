import { Section } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { IconStar } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { guestRating, testimonials } from "@/data/testimonials";

const featured = testimonials.slice(0, 3);

export function Testimonials() {
  return (
    <Section tone="cream">
      <Container width="wide">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <SectionHeading
                eyebrow="Guests"
                title="What people say once they are home."
                size="h3"
              />
            </Reveal>

            <Reveal delay={120} className="mt-10 border-t border-line pt-8">
              <p className="flex items-baseline gap-3">
                <span className="num font-serif text-5xl leading-none font-light text-ink">
                  {guestRating.score}
                </span>
                <span className="t-small num text-muted">/ {guestRating.outOf}</span>
              </p>
              <p aria-hidden="true" className="mt-4 flex gap-1.5">
                {Array.from({ length: 5 }).map((_, index) => (
                  <IconStar key={index} className="h-3.5 w-3.5 text-brass" />
                ))}
              </p>
              <p className="t-caption mt-4 tracking-[0.14em] uppercase text-muted">
                {guestRating.label} · {guestRating.reviews.toLocaleString("en-IN")} reviews
              </p>
              <p className="t-small mt-4 text-muted">{guestRating.note}</p>
            </Reveal>
          </div>

          <ul className="space-y-10 lg:col-span-8 lg:grid lg:grid-cols-3 lg:gap-10 lg:space-y-0">
            {featured.map((testimonial, index) => (
              <Reveal
                as="li"
                key={testimonial.name}
                delay={index * 110}
                className="flex flex-col border-t border-line pt-8 first:border-t-0 first:pt-0 lg:border-t-0 lg:pt-0"
              >
                <blockquote className="flex flex-1 flex-col">
                  <span aria-hidden="true" className="font-serif text-4xl leading-none text-brass/45">
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
        </div>
      </Container>
    </Section>
  );
}
