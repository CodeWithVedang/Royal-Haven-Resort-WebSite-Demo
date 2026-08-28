import Link from "next/link";
import { Figure } from "@/components/ui/Figure";
import { Reveal } from "@/components/ui/Reveal";
import type { Experience } from "@/data/experiences";
import { cn } from "@/lib/utils";

/** Large overlay frame — one per section, so the eye has somewhere to land. */
export function ExperienceFeature({ experience }: { experience: Experience }) {
  return (
    <Reveal variant="img" as="article" className="group relative isolate">
      <Link href={`/experiences#${experience.slug}`} className="block">
        <Figure
          photo={experience.photo}
          sizes="(min-width: 1024px) 56vw, 100vw"
          source="band"
          zoom
          scrim="bottom"
          className="aspect-4/5 sm:aspect-3/2 lg:aspect-4/3"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 p-6 lg:p-10">
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
      </Link>
    </Reveal>
  );
}

/**
 * Compact overlay tile. The copy sits on the photograph rather than under it, so
 * a row of these still reads as photography instead of a card grid.
 */
export function ExperienceTile({
  experience,
  sizes,
  className,
  delay = 0,
}: {
  experience: Experience;
  sizes: string;
  className?: string;
  delay?: number;
}) {
  return (
    <Reveal variant="img" as="article" delay={delay} className={cn("group relative isolate", className)}>
      <Link href={`/experiences#${experience.slug}`} className="block h-full">
        <Figure
          photo={experience.photo}
          sizes={sizes}
          source="card"
          zoom
          scrim="bottom"
          className="h-full"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5 lg:p-6">
          <div className="on-dark">
            <p className="t-caption tracking-[0.18em] uppercase text-brass-soft">
              {experience.kicker}
            </p>
            <h3 className="t-h4 mt-2 text-cream">{experience.title}</h3>
            <p className="t-caption num mt-2 text-cream/70">
              {experience.duration} · {experience.price}
            </p>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}
