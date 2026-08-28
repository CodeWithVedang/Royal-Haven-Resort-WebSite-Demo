import { Section } from "@/components/layout/PageHero";
import { ExperienceFeature, ExperienceTile } from "@/components/experiences/ExperienceCard";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { experiences } from "@/data/experiences";

const [feature, ...rest] = experiences;
const beside = rest.slice(0, 2);
const below = rest.slice(2, 5);

export function ExperiencesSection() {
  return (
    <Section tone="ivory" id="experiences">
      <Container width="wide">
        <Reveal>
          <SectionHeading
            eyebrow="Experiences"
            title="More than a stay."
            standfirst="Six things worth getting out of bed for, all of them arranged in-house and none of them shared with a coach party."
            action={
              <Button href="/experiences" variant="quiet" arrow>
                All experiences
              </Button>
            }
          />
        </Reveal>

        <div className="mt-14 grid gap-4 lg:mt-20 lg:grid-cols-12 lg:gap-5">
          <div className="lg:col-span-7">
            <ExperienceFeature experience={feature} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1 lg:gap-5">
            {beside.map((experience, index) => (
              <ExperienceTile
                key={experience.slug}
                experience={experience}
                delay={80 + index * 80}
                sizes="(min-width: 1024px) 38vw, (min-width: 640px) 48vw, 100vw"
                className="aspect-3/2 sm:aspect-4/5 lg:min-h-44 lg:flex-1 lg:aspect-auto"
              />
            ))}
          </div>

          {below.map((experience, index) => (
            <ExperienceTile
              key={experience.slug}
              experience={experience}
              delay={index * 80}
              sizes="(min-width: 1024px) 30vw, (min-width: 640px) 48vw, 100vw"
              className="aspect-3/2 sm:aspect-4/5 lg:col-span-4 lg:aspect-3/2"
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
