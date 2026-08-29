import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileCtaBar, WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { photoUrl } from "@/lib/images";
import { pageHero } from "@/data/photos";
import { guestRating } from "@/data/testimonials";
import { addressOneLine, site } from "@/lib/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Royal Haven Resort | Luxury Resort in Udaipur, Rajasthan",
    template: `%s | ${site.brand.fullName}`,
  },
  description:
    "A 42-room heritage resort in Udaipur, twenty-five minutes from Lake Pichola. Courtyard rooms and lake-view suites, Rajasthani cooking at The Courtyard, The Haven Spa, and four venues for weddings of up to 500 guests.",
  keywords: [
    "luxury resort Udaipur",
    "Udaipur hotels",
    "destination wedding Udaipur",
    "Rajasthan heritage resort",
    "resort near Lake Pichola",
    "wedding venue Udaipur 500 guests",
    "Royal Haven Resort",
  ],
  authors: [{ name: site.brand.legalName }],
  creator: site.brand.legalName,
  publisher: site.brand.legalName,
  category: "Travel",
  formatDetection: { telephone: true, address: true, email: true },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: site.url,
    siteName: site.brand.fullName,
    title: "Royal Haven Resort | Luxury Resort in Udaipur, Rajasthan",
    description:
      "Forty-two rooms and suites, four wedding venues and a spa, ten minutes from Lake Pichola.",
    images: [
      {
        url: photoUrl(pageHero.home, "feature"),
        width: 1400,
        height: 933,
        alt: pageHero.home.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Royal Haven Resort | Luxury Resort in Udaipur, Rajasthan",
    description:
      "A timeless escape in the heart of Rajasthan — rooms, suites, dining, spa and destination weddings.",
    images: [photoUrl(pageHero.home, "feature")],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

/** Amenities Google recognises for lodging results, kept to what the property has. */
const amenities = [
  "Free high-speed Wi-Fi",
  "Outdoor swimming pool",
  "Spa",
  "Restaurant",
  "Room service",
  "Airport transfer",
  "Free parking",
  "Air conditioning",
  "Wedding venue",
  "Family rooms",
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Resort",
  "@id": `${site.url}/#resort`,
  name: site.brand.fullName,
  description: site.brand.support,
  slogan: site.brand.positioning,
  url: site.url,
  telephone: `+${site.contact.phone}`,
  email: site.contact.email,
  priceRange: "₹₹₹₹",
  currenciesAccepted: site.policy.currency,
  starRating: { "@type": "Rating", ratingValue: "5" },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: guestRating.score,
    bestRating: guestRating.outOf,
    worstRating: "1",
    reviewCount: guestRating.reviews,
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: site.contact.address.line2,
    addressLocality: site.contact.address.city,
    addressRegion: site.contact.address.state,
    postalCode: site.contact.address.postalCode,
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: site.contact.coordinates.lat,
    longitude: site.contact.coordinates.lng,
  },
  checkinTime: "14:00",
  checkoutTime: "11:00",
  numberOfRooms: 42,
  petsAllowed: false,
  smokingAllowed: false,
  availableLanguage: ["en", "hi"],
  amenityFeature: amenities.map((name) => ({
    "@type": "LocationFeatureSpecification",
    name,
    value: true,
  })),
  sameAs: site.social.map((channel) => channel.href),
  image: [photoUrl(pageHero.home, "feature"), photoUrl(pageHero.weddings, "feature")],
  hasMap: `https://www.google.com/maps?q=${site.contact.coordinates.lat},${site.contact.coordinates.lng}`,
  areaServed: addressOneLine,
  potentialAction: {
    "@type": "ReserveAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${site.url}/booking`,
      actionPlatform: [
        "http://schema.org/DesktopWebPlatform",
        "http://schema.org/MobileWebPlatform",
      ],
    },
    result: { "@type": "LodgingReservation", name: "Room reservation" },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${cormorant.variable} ${jost.variable}`}>
      <body>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppButton />
        <MobileCtaBar />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
