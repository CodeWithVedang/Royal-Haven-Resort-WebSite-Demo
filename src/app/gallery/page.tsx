import type { Metadata } from "next";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { PageHero, Section } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { galleryItems } from "@/data/gallery";
import { pageHero } from "@/data/photos";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photography from Royal Haven Resort, Udaipur — the courtyards, rooms and suites, The Courtyard restaurant, the spa, weddings on the Baradari Lawn and the Aravalli hills beyond.",
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: "Gallery | Royal Haven Resort",
    description: `${galleryItems.length} photographs of the resort, rooms, dining, weddings and the spa.`,
  },
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        photo={pageHero.gallery}
        height="compact"
        eyebrow="Gallery"
        title="The property, as it actually looks."
        standfirst="No renders and no borrowed views. Photographed across a full year, from January mornings on the terrace to the monsoon in the gardens."
      />

      <Section tone="ivory">
        <Container width="wide">
          <GalleryGrid />
        </Container>
      </Section>

      <Section tone="cream" className="border-t border-line">
        <Container>
          <div className="max-w-2xl">
            <h2 className="t-h3 text-balance text-ink">Seen enough to pick a room?</h2>
            <p className="t-body mt-5 text-espresso">
              Four categories, forty-two keys, and a reservations desk that answers on WhatsApp
              before it answers email.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/rooms" size="lg" arrow>
                Explore Rooms
              </Button>
              <Button href="/booking" variant="outline" size="lg">
                Check Availability
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
