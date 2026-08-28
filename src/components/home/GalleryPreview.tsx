import Link from "next/link";
import { Section } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Figure } from "@/components/ui/Figure";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { galleryItems, galleryPreview } from "@/data/gallery";

/**
 * Six frames in an asymmetric strip. Spans are paired so each desktop row
 * resolves to the same height without cropping the photography twice.
 */
const FRAMES = [
  { span: "lg:col-span-2", ratio: "aspect-4/5", sizes: "(min-width: 1024px) 22vw, 48vw" },
  { span: "lg:col-span-4", ratio: "lg:aspect-8/5", sizes: "(min-width: 1024px) 44vw, 48vw" },
  { span: "lg:col-span-3", ratio: "lg:aspect-3/2", sizes: "(min-width: 1024px) 33vw, 48vw" },
  { span: "lg:col-span-3", ratio: "lg:aspect-3/2", sizes: "(min-width: 1024px) 33vw, 48vw" },
  { span: "lg:col-span-4", ratio: "lg:aspect-8/5", sizes: "(min-width: 1024px) 44vw, 48vw" },
  { span: "lg:col-span-2", ratio: "aspect-4/5", sizes: "(min-width: 1024px) 22vw, 48vw" },
];

export function GalleryPreview() {
  return (
    <Section tone="ivory" id="gallery">
      <Container width="wide">
        <Reveal>
          <SectionHeading
            eyebrow="Gallery"
            title="Photographed over one season."
            standfirst={`${galleryItems.length} frames of the property, the rooms, the food and the celebrations — no stock photography, no renders.`}
            action={
              <Button href="/gallery" variant="quiet" arrow>
                Open the gallery
              </Button>
            }
          />
        </Reveal>

        <ul className="mt-14 grid grid-cols-2 gap-3 lg:mt-20 lg:grid-cols-6 lg:gap-4">
          {galleryPreview.map((item, index) => {
            const frame = FRAMES[index];
            return (
              <Reveal
                as="li"
                variant="img"
                key={item.photo.id + item.category}
                delay={index * 70}
                className={frame.span}
              >
                <Link
                  href="/gallery"
                  className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass"
                >
                  <Figure
                    photo={item.photo}
                    sizes={frame.sizes}
                    source="card"
                    zoom
                    className={`aspect-4/5 ${frame.ratio}`}
                  />
                  <span className="t-caption mt-3 flex items-baseline justify-between gap-4 text-muted">
                    <span className="tracking-[0.16em] uppercase text-brass">{item.category}</span>
                    <span className="hidden truncate sm:block">{item.caption}</span>
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
