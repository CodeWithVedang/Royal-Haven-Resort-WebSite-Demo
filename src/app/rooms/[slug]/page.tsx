import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/layout/PageHero";
import { RoomGallery } from "@/components/rooms/RoomGallery";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Figure } from "@/components/ui/Figure";
import { AmenityIcons, IconCheck, IconWhatsApp } from "@/components/ui/Icons";
import { AMENITY_LABELS, getRoom, rooms, roomSlugs } from "@/data/rooms";
import { floorRate } from "@/lib/booking/rates";
import { gstNote } from "@/lib/booking/pricing";
import { formatINR } from "@/lib/format";
import { photoUrl } from "@/lib/images";
import { site, whatsappHref } from "@/lib/site";

export function generateStaticParams() {
  return roomSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const room = getRoom(slug);
  if (!room) return { title: "Room not found" };

  const from = formatINR(floorRate(room.baseRate));

  return {
    title: room.name,
    description: `${room.summary} ${room.sqft} sq ft, ${room.bed}, ${room.view}. From ${from} per night at Royal Haven Resort, Udaipur.`,
    alternates: { canonical: `/rooms/${room.slug}` },
    openGraph: {
      title: `${room.name} | Royal Haven Resort`,
      description: room.summary,
      images: [{ url: photoUrl(room.photos[0], "feature"), width: 1400, height: 933, alt: room.photos[0].alt }],
    },
  };
}
export default async function RoomPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const room = getRoom(slug);
  if (!room) notFound();

  const from = floorRate(room.baseRate);
  const others = rooms.filter((entry) => entry.slug !== room.slug);
  const reserveLabel = room.category === "Suite" ? "Reserve This Suite" : "Reserve This Room";
  const bookingHref = `/booking?guests=${Math.min(2, room.maxGuests)}&rooms=1`;

  return (
    <>
      <Section tone="ivory" className="pt-10 pb-0 lg:pt-14 lg:pb-0">
        <Container width="wide">
          <nav aria-label="Breadcrumb" className="t-caption tracking-[0.16em] uppercase text-stone">
            <Link href="/rooms" className="transition-colors hover:text-brass">
              Stay
            </Link>
            <span aria-hidden="true" className="mx-2.5 text-line">
              /
            </span>
            <span className="text-muted">{room.name}</span>
          </nav>

          <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-14">
            <div className="lg:col-span-8">
              <p className="t-caption tracking-[0.18em] uppercase text-brass">
                {room.category} · {room.view}
              </p>
              <h1 className="t-h1 mt-4 text-balance text-ink">{room.name}</h1>
              <p className="t-lead mt-5 max-w-xl">{room.tagline}</p>
            </div>
            <div className="lg:col-span-4 lg:text-right">
              <span className="t-caption block tracking-[0.18em] uppercase text-muted">From</span>
              <span className="num t-h3 mt-1.5 block text-ink">{formatINR(from)}</span>
              <span className="t-caption text-stone">per night, before taxes</span>
            </div>
          </div>

          <ul className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-3 border-y border-line py-4">
            {[`${room.sqft} sq ft`, `${room.sqm} sq m`, room.bed, `Up to ${room.maxGuests} guests`, room.view].map(
              (fact) => (
                <li key={fact} className="t-small text-espresso">
                  {fact}
                </li>
              ),
            )}
          </ul>

          <div className="mt-10">
            <RoomGallery photos={room.photos} roomName={room.name} />
          </div>
        </Container>
      </Section>
      <Section tone="ivory">
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <div className="space-y-6">
                {room.description.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)} className="t-body text-espresso">
                    {paragraph}
                  </p>
                ))}
              </div>

              <h2 className="t-h4 mt-12 text-ink">In this {room.category.toLowerCase()}</h2>
              <ul className="mt-5 grid gap-x-10 gap-y-3 sm:grid-cols-2">
                {room.extras.map((extra) => (
                  <li key={extra} className="t-small flex items-start gap-3 text-espresso">
                    <IconCheck className="mt-1 h-3.5 w-3.5 shrink-0 text-brass" />
                    {extra}
                  </li>
                ))}
              </ul>

              <h2 className="t-h4 mt-12 text-ink">Amenities</h2>
              <ul className="mt-5 grid grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-3">
                {room.amenities.map((key) => {
                  const Icon = AmenityIcons[key];
                  return (
                    <li key={key} className="flex items-center gap-3">
                      <Icon className="h-4.5 w-4.5 shrink-0 text-brass" />
                      <span className="t-small text-espresso">{AMENITY_LABELS[key]}</span>
                    </li>
                  );
                })}
              </ul>

              <h2 className="t-h4 mt-12 text-ink">The details</h2>
              <dl className="mt-5 border-t border-line">
                {[
                  { term: "Check-in", detail: `From ${site.policy.checkIn}` },
                  { term: "Check-out", detail: `By ${site.policy.checkOut}` },
                  { term: "Cancellation", detail: site.policy.cancellation },
                  { term: "Children", detail: site.policy.children },
                  { term: "Extra bed", detail: site.policy.extraBed },
                  { term: "Smoking", detail: site.policy.smoking },
                  { term: "Pets", detail: site.policy.pets },
                ].map((item) => (
                  <div
                    key={item.term}
                    className="flex flex-wrap gap-x-10 gap-y-1 border-b border-line py-3.5"
                  >
                    <dt className="t-caption w-32 shrink-0 tracking-[0.16em] uppercase text-muted">
                      {item.term}
                    </dt>
                    <dd className="t-small flex-1 text-espresso">{item.detail}</dd>
                  </div>
                ))}
              </dl>
              <p className="t-caption mt-6 text-stone">{gstNote}</p>
            </div>
            <aside className="lg:col-span-5">
              <div className="border border-line bg-cream p-6 lg:sticky lg:top-28 lg:p-8">
                <p className="t-eyebrow text-brass">Reserve</p>
                <p className="mt-5 flex items-baseline gap-2.5">
                  <span className="num t-h3 text-ink">{formatINR(from)}</span>
                  <span className="t-caption text-muted">per night, before taxes</span>
                </p>
                <p className="t-small mt-4 text-espresso">
                  Rates move with the season. Check your dates to see every night priced, with GST
                  and any promotion applied.
                </p>

                <Button href={bookingHref} size="lg" block arrow className="mt-7">
                  {reserveLabel}
                </Button>
                <Button
                  href={whatsappHref(
                    `Hello Royal Haven, I would like to enquire about the ${room.name}.`,
                  )}
                  variant="outline"
                  block
                  external
                  className="mt-3"
                >
                  <IconWhatsApp className="h-4 w-4" />
                  Ask about this room
                </Button>

                <p className="t-caption mt-6 border-t border-line pt-5 text-muted">
                  {site.policy.cancellation} No card details are needed to hold a room.
                </p>

                <p className="t-caption mt-7 tracking-[0.16em] uppercase text-muted">Included</p>
                <ul className="mt-4 space-y-2.5">
                  {room.inclusions.map((inclusion) => (
                    <li key={inclusion} className="t-small flex items-start gap-3 text-espresso">
                      <span aria-hidden="true" className="mt-2.5 h-px w-3.5 shrink-0 bg-brass/60" />
                      {inclusion}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </Container>
      </Section>
      <Section tone="cream" className="border-t border-line">
        <Container width="wide">
          <h2 className="t-h3 text-balance text-ink">Other categories</h2>
          <ul className="mt-10 grid gap-8 sm:grid-cols-3 lg:gap-10">
            {others.map((other) => (
              <li key={other.slug} className="group">
                <Link href={`/rooms/${other.slug}`} className="block">
                  <Figure
                    photo={other.photos[0]}
                    sizes="(min-width: 640px) 30vw, 92vw"
                    source="card"
                    zoom
                    className="aspect-4/3"
                  />
                  <p className="t-caption mt-4 tracking-[0.16em] uppercase text-brass">
                    {other.view}
                  </p>
                  <h3 className="t-h4 mt-2 text-ink transition-colors duration-300 group-hover:text-brass">
                    {other.name}
                  </h3>
                  <p className="t-small mt-2.5 text-muted">{other.tagline}</p>
                  <p className="num t-small mt-3 text-espresso">
                    From {formatINR(floorRate(other.baseRate))}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
