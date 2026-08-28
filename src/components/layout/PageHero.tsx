import { Container } from "@/components/ui/Container";
import { Figure } from "@/components/ui/Figure";
import type { Photo } from "@/lib/images";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  photo: Photo;
  eyebrow: string;
  title: string;
  standfirst?: string;
  /** Short facts shown on a hairline row under the title. */
  meta?: string[];
  actions?: React.ReactNode;
  height?: "compact" | "tall";
  objectPosition?: string;
};

export function PageHero({
  photo,
  eyebrow,
  title,
  standfirst,
  meta,
  actions,
  height = "tall",
  objectPosition,
}: PageHeroProps) {
  return (
    <section className="relative isolate">
      <Figure
        photo={photo}
        source="hero"
        priority
        quality={82}
        sizes="100vw"
        objectPosition={objectPosition}
        className={cn(
          "w-full",
          height === "tall" ? "h-[76svh] min-h-[30rem]" : "h-[58svh] min-h-[24rem]",
        )}
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/35 to-ink/45"
      />
      <div className="absolute inset-x-0 bottom-0 pb-12 lg:pb-20">
        <Container width="wide">
          <div className="on-dark max-w-3xl animate-fade-up">
            <p className="t-eyebrow">{eyebrow}</p>
            <h1 className="t-h1 mt-5 text-balance text-cream">{title}</h1>
            {standfirst ? (
              <p className="t-lead mt-6 max-w-xl text-cream/78">{standfirst}</p>
            ) : null}
            {meta && meta.length > 0 ? (
              <ul className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-cream/20 pt-5">
                {meta.map((item) => (
                  <li key={item} className="t-caption tracking-[0.16em] uppercase text-cream/70">
                    {item}
                  </li>
                ))}
              </ul>
            ) : null}
            {actions ? <div className="mt-9 flex flex-wrap gap-3">{actions}</div> : null}
          </div>
        </Container>
      </div>
    </section>
  );
}

/** Standard vertical rhythm for every content band on the site. */
export function Section({
  children,
  className,
  tone = "ivory",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "ivory" | "cream" | "sand" | "olive" | "ink";
  id?: string;
}) {
  const tones = {
    ivory: "bg-ivory",
    cream: "bg-cream",
    sand: "bg-sand",
    olive: "on-dark bg-olive",
    ink: "on-dark bg-ink",
  } as const;

  return (
    <section id={id} className={cn("py-18 lg:py-28", tones[tone], className)}>
      {children}
    </section>
  );
}
