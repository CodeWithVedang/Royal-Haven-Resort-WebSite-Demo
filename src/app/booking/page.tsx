import type { Metadata } from "next";
import { BookingFlow, type BookingIntent } from "@/components/booking/BookingFlow";
import { PageHero, Section } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { IconPhone, IconWhatsApp } from "@/components/ui/Icons";
import { pageHero } from "@/data/photos";
import { validateSearch } from "@/lib/booking/service";
import { isValidISODate } from "@/lib/format";
import { site, telHref, whatsappHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book Your Stay",
  description:
    "Check availability and reserve a room or suite at Royal Haven Resort, Udaipur. Seasonal rates, GST shown in full, and no card needed to hold a room.",
  alternates: { canonical: "/booking" },
  openGraph: {
    title: "Book Your Stay | Royal Haven Resort",
    description: "Choose your dates, see every night priced, and reserve in a few steps.",
  },
};

type RawParams = Record<string, string | string[] | undefined>;

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function clampInt(raw: string | undefined, fallback: number, min: number, max: number): number {
  const parsed = Number.parseInt(raw ?? "", 10);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(max, Math.max(min, parsed));
}

/** The stay can arrive from the homepage widget, a deep link or a refresh. */
function readIntent(params: RawParams): BookingIntent {
  const rawCheckIn = first(params.checkIn);
  const rawCheckOut = first(params.checkOut);
  const hasCheckIn = isValidISODate(rawCheckIn);
  const hasCheckOut = isValidISODate(rawCheckOut);

  const guests = clampInt(
    first(params.guests),
    2,
    1,
    site.policy.maxRooms * site.policy.maxGuestsPerRoom,
  );
  const rooms = clampInt(first(params.rooms), 1, 1, site.policy.maxRooms);
  const promo = (first(params.promo) ?? "").trim().toUpperCase().slice(0, 16);
  const checkIn = hasCheckIn && hasCheckOut ? rawCheckIn : null;
  const checkOut = hasCheckIn && hasCheckOut ? rawCheckOut : null;

  const ready =
    checkIn !== null &&
    checkOut !== null &&
    validateSearch({ checkIn, checkOut, guests, rooms }).length === 0;

  return { checkIn, checkOut, guests, rooms, promo, ready };
}

export default async function BookingPage({ searchParams }: { searchParams: Promise<RawParams> }) {
  const intent = readIntent(await searchParams);

  return (
    <>
      <PageHero
        photo={pageHero.booking}
        height="compact"
        eyebrow="Reservations"
        title="Choose your dates."
        standfirst="Forty-two rooms and suites, seasonal rates shown night by night, and no card details needed to hold one."
        meta={[
          `Check-in ${site.policy.checkIn}`,
          `Check-out ${site.policy.checkOut}`,
          "Breakfast for two included",
        ]}
      />

      <Section tone="ivory">
        <Container width="wide">
          <BookingFlow intent={intent} />
        </Container>
      </Section>

      <Section tone="cream" className="border-t border-line">
        <Container width="wide">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <p className="t-eyebrow text-brass">Reservations desk</p>
              <h2 className="t-h3 mt-5 text-balance text-ink">
                Something unusual about the trip? Tell us and we will arrange it.
              </h2>
              <p className="t-small mt-5 max-w-md text-muted">
                Connecting rooms, a late arrival, a buyout for a wedding party, a driver waiting at
                the airport — all of it is easier in a conversation than in a form.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={whatsappHref("Hello Royal Haven, I am booking a stay and would like some help.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline t-small inline-flex items-center gap-2.5 text-espresso"
                >
                  <IconWhatsApp className="h-4 w-4 text-brass" />
                  Plan Your Stay on WhatsApp
                </a>
                <a href={telHref} className="link-underline t-small inline-flex items-center gap-2.5 text-espresso">
                  <IconPhone className="h-4 w-4 text-brass" />
                  {site.contact.phoneDisplay}
                </a>
              </div>
            </div>
            <dl className="lg:col-span-7 lg:grid lg:grid-cols-2 lg:gap-x-10">
              {[
                {
                  term: "What you pay now",
                  detail:
                    "Nothing. Rooms are held on request and settled at the front desk, or online once a gateway is connected.",
                },
                {
                  term: "Cancellation",
                  detail: site.policy.cancellation,
                },
                {
                  term: "Taxes",
                  detail:
                    "GST is calculated per room-night on the tariff after any promotion, and shown in the summary before you confirm.",
                },
                {
                  term: "Children",
                  detail: site.policy.children,
                },
              ].map((item) => (
                <div key={item.term} className="border-t border-line py-5 first:border-t-0 first:pt-0 lg:border-t lg:first:border-t lg:first:pt-5">
                  <dt className="t-caption tracking-[0.16em] uppercase text-muted">{item.term}</dt>
                  <dd className="t-small mt-2.5 text-espresso">{item.detail}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </Section>
    </>
  );
}
