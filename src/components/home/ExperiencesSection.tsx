import { Section } from "@/components/layout/PageHero";
import { ExperienceFeature, ExperienceRow } from "@/components/experiences/ExperienceCard";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { experiences } from "@/data/experiences";

const [feature, ...rest] = experiences;

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

        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <ExperienceFeature experience={feature} />
          </div>
          <ul className="lg:col-span-5">
            {rest.slice(0, 4).map((experience, index) => (
              <ExperienceRow key={experience.slug} experience={experience} index={index + 1} />
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
