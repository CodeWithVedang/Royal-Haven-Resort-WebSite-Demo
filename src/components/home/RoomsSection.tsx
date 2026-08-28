import { Section } from "@/components/layout/PageHero";
import { RoomRow } from "@/components/rooms/RoomRow";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { featuredRooms } from "@/data/rooms";

export function RoomsSection() {
  return (
    <Section tone="cream" id="rooms">
      <Container width="wide">
        <Reveal>
          <SectionHeading
            eyebrow="Rooms & Suites"
            title="Rooms designed for slow mornings and long evenings."
            standfirst="Four categories, none of them small. Every room looks onto something — a courtyard, the garden, the water, or a terrace of its own."
            action={
              <Button href="/rooms" variant="quiet" arrow>
                All rooms & suites
              </Button>
            }
          />
        </Reveal>

        <div className="mt-16 space-y-24 lg:mt-24 lg:space-y-32">
          {featuredRooms.map((room, index) => (
            <RoomRow key={room.slug} room={room} index={index} reverse={index % 2 === 1} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
