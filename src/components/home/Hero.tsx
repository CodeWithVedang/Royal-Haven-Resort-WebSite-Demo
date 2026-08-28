import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Figure } from "@/components/ui/Figure";
import { pageHero } from "@/data/photos";
import { guestRating } from "@/data/testimonials";
import { TOTAL_KEYS } from "@/data/rooms";

/** Short facts that answer "what is this place, and where" above the fold. */
const facts = [
  "Udaipur · Rajasthan",
  `${TOTAL_KEYS} rooms & suites`,
  "Airport 35 minutes",
  `${guestRating.score}/${guestRating.outOf} guest rating`,
];

export function Hero() {
  return (
    <section className="relative isolate flex h-[100svh] min-h-[36rem] flex-col justify-end overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 animate-ken-burns">
        <Figure
          photo={pageHero.home}
          source="hero"
          priority
          quality={82}
          sizes="100vw"
          objectPosition="center 58%"
          className="h-full w-full"
        />
      </div>
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-ink/88 via-ink/30 to-ink/55"
      />

      <Container width="wide" className="relative pb-30 lg:pb-36">
        <div className="on-dark max-w-3xl">
          <p className="t-eyebrow animate-fade-up text-brass-soft">Welcome to Royal Haven</p>
          <h1
            className="t-display mt-6 animate-fade-up text-balance text-cream"
            style={{ animationDelay: "140ms" }}
          >
            A Timeless Escape in the Heart of Rajasthan
          </h1>
          <p
            className="t-lead mt-7 max-w-lg animate-fade-up text-cream/80"
            style={{ animationDelay: "280ms" }}
          >
            Where heritage, tranquillity and thoughtful hospitality come together.
          </p>
          <div
            className="mt-10 flex flex-wrap items-center gap-3 animate-fade-up"
            style={{ animationDelay: "420ms" }}
          >
            <Button href="/rooms" variant="light" size="lg">
              Explore Rooms
            </Button>
            <Button href="/booking" variant="brass" size="lg" arrow>
              Book Your Stay
            </Button>
          </div>
        </div>
      </Container>

      {/* Hairline fact strip — the questions a guest asks in the first five seconds. */}
      <div className="relative hidden border-t border-cream/15 lg:block">
        <Container width="wide">
          <div className="on-dark flex items-center justify-between gap-8 py-5">
            <ul className="flex flex-wrap items-center gap-x-8 gap-y-2">
              {facts.map((fact) => (
                <li key={fact} className="t-caption tracking-[0.16em] uppercase text-cream/65">
                  {fact}
                </li>
              ))}
            </ul>
            <span className="t-caption flex items-center gap-3 tracking-[0.22em] uppercase text-cream/50">
              Scroll
              <span aria-hidden="true" className="relative block h-10 w-px bg-cream/25">
                <span className="absolute inset-x-0 top-0 h-3 animate-scroll-hint bg-brass-soft" />
              </span>
            </span>
          </div>
        </Container>
      </div>
    </section>
  );
}
