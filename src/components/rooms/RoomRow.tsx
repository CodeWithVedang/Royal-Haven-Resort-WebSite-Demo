import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Figure } from "@/components/ui/Figure";
import { Reveal } from "@/components/ui/Reveal";
import type { Room } from "@/data/rooms";
import { floorRate } from "@/lib/booking/rates";
import { formatINR } from "@/lib/format";
import { cn } from "@/lib/utils";

type RoomRowProps = {
  room: Room;
  index: number;
  /** Photography moves to the right on odd rows. */
  reverse?: boolean;
};

/**
 * The editorial room row — one wide frame, one column of facts. Used on the
 * homepage and on /rooms so a category always reads the same way.
 */
export function RoomRow({ room, index, reverse }: RoomRowProps) {
  const from = floorRate(room.baseRate);

  return (
    <article className="group grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
      <Reveal
        variant="img"
        as="div"
        className={cn(
          "relative lg:col-span-7",
          reverse ? "lg:order-2 lg:col-start-6" : "lg:order-1",
        )}
      >
        <Link href={`/rooms/${room.slug}`} aria-label={`${room.name} — view details`}>
          <Figure
            photo={room.photos[0]}
            sizes="(min-width: 1024px) 56vw, 100vw"
            source="band"
            zoom
            className="aspect-4/3"
          />
        </Link>
        {room.photos[3] ? (
          <Figure
            photo={room.photos[3]}
            sizes="18vw"
            source="thumb"
            className={cn(
              "absolute -bottom-8 hidden aspect-square w-40 border-8 border-ivory lg:block",
              reverse ? "-left-10" : "-right-10",
            )}
          />
        ) : null}
      </Reveal>

      <Reveal
        delay={120}
        className={cn("lg:col-span-5", reverse ? "lg:order-1 lg:row-start-1" : "lg:order-2")}
      >
        <div className="flex items-baseline gap-4">
          <span className="t-caption num text-stone">{`0${index + 1}`}</span>
          <span aria-hidden="true" className="h-px w-10 bg-brass/45" />
          <span className="t-caption tracking-[0.2em] uppercase text-brass">{room.category}</span>
        </div>

        <h3 className="t-h2 mt-5 text-ink">
          <Link href={`/rooms/${room.slug}`} className="transition-colors hover:text-brass">
            {room.name}
          </Link>
        </h3>
        <p className="t-figure mt-3 text-muted">{room.tagline}</p>
        <p className="t-body mt-6 text-espresso">{room.summary}</p>

        <ul className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 border-y border-line py-4">
          {room.highlights.map((highlight) => (
            <li key={highlight} className="t-small text-espresso">
              {highlight}
            </li>
          ))}
        </ul>

        <div className="mt-7 flex flex-wrap items-end justify-between gap-6">
          <p>
            <span className="t-caption block tracking-[0.18em] uppercase text-muted">From</span>
            <span className="t-price num mt-1 block text-2xl text-ink">{formatINR(from)}</span>
            <span className="t-caption text-stone">per night, before taxes</span>
          </p>
          <Button href={`/rooms/${room.slug}`} variant="outline" arrow>
            View Details
          </Button>
        </div>
      </Reveal>
    </article>
  );
}
