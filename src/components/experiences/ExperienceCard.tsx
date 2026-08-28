import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Figure } from "@/components/ui/Figure";
import { Reveal } from "@/components/ui/Reveal";
import type { Experience } from "@/data/experiences";
import { cn } from "@/lib/utils";

/** Large overlay frame — one per section, so the eye has somewhere to land. */
export function ExperienceFeature({ experience }: { experience: Experience }) {
  return (
    <Reveal variant="img" as="article" className="group relative isolate">
      <Figure
        photo={experience.photo}
        sizes="(min-width: 1024px) 66vw, 100vw"
        source="band"
        zoom
        scrim="bottom"
        className="aspect-4/5 sm:aspect-3/2 lg:aspect-16/9"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-6 lg:p-12">
        <div className="on-dark max-w-xl">
          <p className="t-eyebrow text-brass-soft">{experience.kicker}</p>
          <h3 className="t-h2 mt-4 text-cream">{experience.title}</h3>
          <p className="t-body mt-4 text-cream/80">{experience.summary}</p>
          <ul className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
            {[experience.timing, experience.duration, experience.price].map((fact) => (
              <li key={fact} className="t-caption tracking-[0.16em] uppercase text-cream/65">
                {fact}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Reveal>
  );
}

/** Hairline index row — the quiet way to list the rest without a card grid. */
export function ExperienceRow({
  experience,
  index,
  href = "/experiences",
}: {
  experience: Experience;
  index: number;
  href?: string;
}) {
  return (
    <Reveal as="li" delay={index * 70}>
      <Link
        href={href}
        className="group flex items-center gap-5 border-b border-line py-6 transition-colors duration-500 hover:border-ink/30 lg:gap-8"
      >
        <span className="t-caption num w-6 shrink-0 text-stone">{`0${index + 1}`}</span>
        <Figure
          photo={experience.photo}
          sizes="112px"
          source="thumb"
          zoom
          className="hidden h-20 w-28 shrink-0 sm:block"
        />
        <span className="min-w-0 flex-1">
          <span className="t-caption block tracking-[0.18em] uppercase text-brass">
            {experience.kicker}
          </span>
          <span className="t-h4 mt-1.5 block text-ink transition-colors duration-500 group-hover:text-brass">
            {experience.title}
          </span>
          <span className="t-small mt-1.5 hidden text-muted lg:block">{experience.summary}</span>
        </span>
        <span className="hidden shrink-0 text-right lg:block">
          <span className="t-small num block text-espresso">{experience.price}</span>
          <span className="t-caption block text-stone">{experience.duration}</span>
        </span>
        <span
          aria-hidden="true"
          className="t-nav shrink-0 text-brass transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
        >
          →
        </span>
      </Link>
    </Reveal>
  );
}

/** Portrait card used on the experiences page grid. */
export function ExperienceCard({
  experience,
  className,
  delay = 0,
}: {
  experience: Experience;
  className?: string;
  delay?: number;
}) {
  return (
    <Reveal as="article" delay={delay} className={cn("group flex flex-col", className)}>
      <Figure
        photo={experience.photo}
        sizes="(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 100vw"
        source="card"
        zoom
        className="aspect-4/5"
      />
      <div className="mt-6 flex flex-1 flex-col">
        <div className="flex items-center justify-between gap-4">
          <p className="t-caption tracking-[0.18em] uppercase text-brass">{experience.kicker}</p>
          <Badge tone="default">{experience.duration}</Badge>
        </div>
        <h3 className="t-h3 mt-4 text-ink">{experience.title}</h3>
        <p className="t-small mt-3 flex-1 text-espresso">{experience.summary}</p>
        <dl className="mt-6 border-t border-line pt-4">
          <div className="flex items-baseline justify-between gap-4">
            <dt className="t-caption tracking-[0.16em] uppercase text-muted">{experience.timing}</dt>
            <dd className="t-small num text-ink">{experience.price}</dd>
          </div>
        </dl>
      </div>
    </Reveal>
  );
}
