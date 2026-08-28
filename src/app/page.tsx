import { BookingWidget } from "@/components/home/BookingWidget";
import { CtaBand } from "@/components/home/CtaBand";
import { DiningSection } from "@/components/home/DiningSection";
import { ExperiencesSection } from "@/components/home/ExperiencesSection";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { Hero } from "@/components/home/Hero";
import { Intro } from "@/components/home/Intro";
import { LocationSection } from "@/components/home/LocationSection";
import { RoomsSection } from "@/components/home/RoomsSection";
import { Testimonials } from "@/components/home/Testimonials";
import { WeddingsSection } from "@/components/home/WeddingsSection";
import { WellnessSection } from "@/components/home/WellnessSection";
import { Container } from "@/components/ui/Container";

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* The search box straddles the hero, so availability is the first act. */}
      <div className="relative z-20 bg-ivory pb-18 lg:pb-24">
        <Container width="wide">
          <BookingWidget className="-mt-10 lg:-mt-16" />
        </Container>
      </div>

      <Intro />
      <RoomsSection />
      <ExperiencesSection />
      <DiningSection />
      <WellnessSection />
      <WeddingsSection />
      <GalleryPreview />
      <Testimonials />
      <LocationSection />
      <CtaBand />
    </>
  );
}
