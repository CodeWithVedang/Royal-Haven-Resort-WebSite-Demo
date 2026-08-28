import { Section } from "@/components/layout/PageHero";
import { MapPanel } from "@/components/location/MapPanel";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Figure } from "@/components/ui/Figure";
import { IconPin } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { distances } from "@/data/location";
import { locationPhotos } from "@/data/photos";
import { addressOneLine, directionsHref, site } from "@/lib/site";

/** What the map cannot show — the three places guests actually ask about. */
const nearby = [
  {
    label: "Lake Pichola",
    detail: "A boat at six, back by eight",
    photo: locationPhotos.lakeSunset,
  },
  { label: "City Palace", detail: "25 minutes, best before ten", photo: locationPhotos.cityPalace },
  { label: "Jag Niwas", detail: "Seen from our lake terrace", photo: locationPhotos.lakePalace },
];

export function LocationSection() {
  return (
    <Section tone="ivory" id="location">
      <Container width="wide">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionHeading
                eyebrow="Location · Udaipur, Rajasthan"
                title="Close enough to the old city. Far enough to hear nothing."
                standfirst="Twelve acres on Rajmahal Road, on the quiet side of Lake Pichola — thirty-five minutes from the airport, twenty-five from the ghats."
              />
            </Reveal>

            <Reveal delay={120}>
              <dl className="mt-11">
                {distances.map((distance) => (
                  <div key={distance.place} className="border-t border-line py-5">
                    <div className="flex items-baseline justify-between gap-6">
                      <dt className="t-small font-medium text-ink">{distance.place}</dt>
                      <dd className="num t-caption shrink-0 tracking-[0.14em] uppercase text-brass">
                        {distance.minutes}
                      </dd>
                    </div>
                    <p className="t-small mt-1.5 max-w-md text-muted">{distance.detail}</p>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={160} className="mt-9 flex flex-wrap items-start gap-x-10 gap-y-6">
              <address className="t-small not-italic text-espresso">
                <span className="flex items-start gap-2.5">
                  <IconPin className="mt-0.5 h-4 w-4 shrink-0 text-brass" />
                  <span>
                    {site.contact.address.line1}
                    <br />
                    {addressOneLine}
                  </span>
                </span>
              </address>
              <Button href={directionsHref} variant="outline" arrow>
                Get directions
              </Button>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal variant="img">
              <MapPanel className="aspect-4/3 w-full overflow-hidden border border-line bg-sand lg:aspect-3/2" />
            </Reveal>
            <Reveal delay={120} className="mt-4 flex flex-wrap items-baseline justify-between gap-3">
              <p className="t-caption text-muted">
                {site.contact.coordinates.lat}° N, {site.contact.coordinates.lng}° E
              </p>
              <p className="t-caption text-stone">
                Illustrated map · live Google Maps loads once an API key is configured
              </p>
            </Reveal>

            <ul className="mt-8 grid grid-cols-3 gap-3.5 lg:gap-5">
              {nearby.map((place, index) => (
                <Reveal as="li" variant="img" key={place.label} delay={80 + index * 70}>
                  <Figure
                    photo={place.photo}
                    sizes="(min-width: 1024px) 19vw, 32vw"
                    source="card"
                    className="aspect-3/4"
                  />
                  <p className="t-caption mt-3 tracking-[0.14em] uppercase text-muted">
                    {place.label}
                  </p>
                  <p className="t-caption text-stone">{place.detail}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}
