/**
 * Single source of truth for everything that changes when this template is
 * handed to a real property: brand strings, contact channels, integration
 * keys and commercial policy.
 *
 * Anything sensitive or environment-specific is read from `NEXT_PUBLIC_*`
 * variables with a safe demo fallback, so the site never ships a real number.
 */

const env = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
  phone: process.env.NEXT_PUBLIC_PHONE,
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
  email: process.env.NEXT_PUBLIC_EMAIL,
  mapsKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  paymentProvider: process.env.NEXT_PUBLIC_PAYMENT_PROVIDER,
};

/** Digits only, international format — used to build tel: and wa.me links. */
const PHONE = env.phone?.replace(/\D/g, "") || "919000000000";
const WHATSAPP = env.whatsapp?.replace(/\D/g, "") || "919000000000";

/** +91 98765 43210 */
function formatIndianPhone(digits: string): string {
  if (digits.startsWith("91") && digits.length === 12) {
    return `+91 ${digits.slice(2, 7)} ${digits.slice(7)}`;
  }
  return `+${digits}`;
}

export const site = {
  brand: {
    name: "Royal Haven",
    legalName: "Royal Haven Resort",
    fullName: "Royal Haven Resort",
    subBrand: "Luxury Resort · Udaipur",
    monogram: "RHR",
    positioning: "A timeless escape in the heart of Rajasthan.",
    support: "Where heritage, tranquillity and thoughtful hospitality come together.",
    established: 2008,
  },

  url: env.siteUrl?.replace(/\/$/, "") || "http://localhost:3000",

  contact: {
    /** Reservations mobile — the number guests are asked to save. */
    phone: PHONE,
    phoneDisplay: formatIndianPhone(PHONE),
    /** Udaipur landline for the front desk. */
    landline: "912944000000",
    landlineDisplay: "+91 294 400 0000",
    whatsapp: WHATSAPP,
    whatsappDisplay: formatIndianPhone(WHATSAPP),
    email: env.email || "reservations@royalhaven.example",
    weddingsEmail: "weddings@royalhaven.example",
    address: {
      line1: "Royal Haven Resort",
      line2: "Rajmahal Road, off Lake Pichola",
      city: "Udaipur",
      state: "Rajasthan",
      postalCode: "313001",
      country: "India",
    },
    coordinates: { lat: 24.576, lng: 73.679 },
    hours: {
      reservations: "Reservations desk · 8:00 – 22:00 IST, every day",
      frontDesk: "Front desk · 24 hours",
    },
  },

  policy: {
    checkIn: "2:00 PM",
    checkOut: "11:00 AM",
    cancellation: "Complimentary cancellation up to 72 hours before arrival.",
    children: "Children of all ages are welcome. Under 6 stay free with existing bedding.",
    pets: "Pets are not accommodated, with the exception of service animals.",
    smoking: "All rooms are non-smoking. Designated terraces are available.",
    extraBed: "One extra bed permitted in suites, charged at ₹3,500 per night.",
    /** Indian hotel GST slabs, applied per room-night. */
    gst: { lowerRate: 0.12, upperRate: 0.18, slabThreshold: 7500 },
    currency: "INR",
    maxNights: 21,
    maxRooms: 4,
    maxGuestsPerRoom: 4,
  },

  social: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Facebook", href: "https://facebook.com" },
    { label: "Pinterest", href: "https://pinterest.com" },
  ],

  awards: [
    "Condé Nast Traveller India · Readers' Choice 2025",
    "Travel + Leisure · Best Heritage Resort, Rajasthan",
    "Certificate of Excellence · 2019 – 2025",
  ],

  integrations: {
    /** Empty key → the illustrated fallback map renders instead. */
    googleMapsApiKey: env.mapsKey || "",
    /** "demo" keeps the checkout in simulation; swap for razorpay | stripe | payu. */
    paymentProvider: (env.paymentProvider || "demo") as "demo" | "razorpay" | "stripe" | "payu",
  },

  /** Studio credit in the footer. One place to change when the site is handed over. */
  credit: {
    label: "CodeWithVedang",
    href: "https://github.com/CodeWithVedang",
    stack: "Next.js, React & Tailwind CSS",
  },
} as const;

/* -------------------------------------------------------------------------- */
/* Navigation                                                                 */
/* -------------------------------------------------------------------------- */

export type NavItem = { label: string; href: string; description?: string };

export const primaryNav: NavItem[] = [
  { label: "Stay", href: "/rooms", description: "Rooms & suites" },
  { label: "Experiences", href: "/experiences", description: "Days at the resort" },
  { label: "Dining", href: "/dining", description: "The Courtyard" },
  { label: "Wellness", href: "/wellness", description: "The Haven Spa" },
  { label: "Weddings", href: "/weddings", description: "Celebrations" },
  { label: "Gallery", href: "/gallery", description: "Photography" },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "The Resort",
    items: [
      { label: "Rooms & Suites", href: "/rooms" },
      { label: "Experiences", href: "/experiences" },
      { label: "The Courtyard", href: "/dining" },
      { label: "The Haven Spa", href: "/wellness" },
      { label: "Gallery", href: "/gallery" },
    ],
  },
  {
    title: "Plan",
    items: [
      { label: "Book Your Stay", href: "/booking" },
      { label: "Weddings & Events", href: "/weddings" },
      { label: "Contact & Directions", href: "/contact" },
      { label: "Frequently Asked", href: "/contact#faq" },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* Outbound links                                                             */
/* -------------------------------------------------------------------------- */

export const telHref = `tel:+${site.contact.phone}`;
export const mailHref = `mailto:${site.contact.email}`;

/** Pre-filled WhatsApp deep link. Works on mobile and desktop web. */
export function whatsappHref(message?: string): string {
  const text =
    message ??
    `Hello Royal Haven, I would like to plan a stay in Udaipur. Could you share availability and rates?`;
  return `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(text)}`;
}

/** Plain Google Maps link — no API key required. */
export const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${site.contact.coordinates.lat},${site.contact.coordinates.lng}`;

export const addressOneLine = [
  site.contact.address.line2,
  site.contact.address.city,
  `${site.contact.address.state} ${site.contact.address.postalCode}`,
  site.contact.address.country,
].join(", ");
