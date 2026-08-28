import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileCtaBar, WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { photoUrl } from "@/lib/images";
import { pageHero } from "@/data/photos";
import { addressOneLine, site } from "@/lib/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
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
    "Experience timeless luxury, thoughtful hospitality and unforgettable stays at Royal Haven Resort in Udaipur, Rajasthan.",
  keywords: [
    "luxury resort Udaipur",
    "Udaipur hotels",
    "destination wedding Udaipur",
    "Rajasthan heritage resort",
    "Royal Haven Resort",
  ],
  authors: [{ name: site.brand.legalName }],
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

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Resort",
  name: site.brand.fullName,
  description: site.brand.support,
  url: site.url,
  telephone: `+${site.contact.phone}`,
  email: site.contact.email,
  priceRange: "₹₹₹₹",
  starRating: { "@type": "Rating", ratingValue: "5" },
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
  image: [photoUrl(pageHero.home, "feature"), photoUrl(pageHero.weddings, "feature")],
  hasMap: `https://www.google.com/maps?q=${site.contact.coordinates.lat},${site.contact.coordinates.lng}`,
  areaServed: addressOneLine,
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
