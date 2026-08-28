import type { Metadata } from "next";
import { PageHero, Section } from "@/components/layout/PageHero";
import { RoomRow } from "@/components/rooms/RoomRow";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AmenityIcons } from "@/components/ui/Icons";
import { AMENITY_LABELS, STANDARD_AMENITIES, TOTAL_KEYS, lowestRate, rooms } from "@/data/rooms";
import { pageHero } from "@/data/photos";
import { floorRate } from "@/lib/booking/rates";
import { formatINR } from "@/lib/format";
import { gstNote } from "@/lib/booking/pricing";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Rooms & Suites",
  description:
    "Forty-two rooms and suites at Royal Haven Resort, Udaipur — garden verandah rooms, courtyard rooms, lake view suites and two-floor haveli suites with private terraces.",
  alternates: { canonical: "/rooms" },
  openGraph: {
    title: "Rooms & Suites | Royal Haven Resort",
    description:
      "Four categories, from a 480 sq ft garden room to a 1,250 sq ft haveli suite with a plunge pool.",
  },
};

export default function RoomsPage() {
  return (
    <>
      <PageHero
        photo={pageHero.rooms}
        eyebrow="Stay"
        title="Rooms designed for slow mornings and long evenings."
        standfirst="Four categories across the old haveli and the garden wing. Every one of them has breakfast for two, a courtyard within walking distance, and nobody hurrying you out at eleven."
        meta={[
          `${TOTAL_KEYS} rooms & suites`,
          `From ${formatINR(floorRate(lowestRate))} per night`,
          "Breakfast for two included",
        ]}
      />
      <Section tone="ivory">
        <Container width="wide">
          <div className="space-y-20 lg:space-y-32">
            {rooms.map((room, index) => (
              <RoomRow key={room.slug} room={room} index={index} reverse={index % 2 === 1} />
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="cream">
        <Container width="wide">
          <SectionHeading
            eyebrow="In every room"
            title="The things you should not have to ask for."
            standfirst="The same ten fittings in all forty-two rooms, whichever category you book."
          />

          <ul className="mt-12 grid grid-cols-2 gap-x-8 gap-y-7 sm:grid-cols-3 lg:mt-16 lg:grid-cols-5">
            {STANDARD_AMENITIES.map((key, index) => {
              const Icon = AmenityIcons[key];
              return (
                <Reveal as="li" key={key} delay={index * 40} className="flex items-center gap-3.5">
                  <Icon className="h-5 w-5 shrink-0 text-brass" />
                  <span className="t-small text-espresso">{AMENITY_LABELS[key]}</span>
                </Reveal>
              );
            })}
          </ul>

          <dl className="mt-14 grid gap-8 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
            {[
              { term: "Check-in", detail: `From ${site.policy.checkIn}, and earlier when the room is ready.` },
              { term: "Check-out", detail: `By ${site.policy.checkOut}. Late check-out is usually possible.` },
              { term: "Children", detail: site.policy.children },
              { term: "Extra bed", detail: site.policy.extraBed },
            ].map((item) => (
              <div key={item.term}>
                <dt className="t-caption tracking-[0.16em] uppercase text-muted">{item.term}</dt>
                <dd className="t-small mt-2.5 text-espresso">{item.detail}</dd>
              </div>
            ))}
          </dl>

          <p className="t-caption mt-10 text-stone">{gstNote}</p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="/booking" size="lg" arrow>
              Check Availability
            </Button>
            <Button href="/gallery" variant="outline" size="lg">
              See the photography
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
