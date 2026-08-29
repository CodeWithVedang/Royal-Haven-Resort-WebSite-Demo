import { p, type Photo } from "@/lib/images";

export type WeddingVenue = {
  slug: string;
  name: string;
  setting: "Outdoor" | "Semi-covered" | "Indoor";
  seated: number;
  standing: number;
  area: string;
  bestFor: string;
  description: string;
  photo: Photo;
};

export type WeddingPackage = {
  slug: string;
  name: string;
  guests: string;
  nights: number;
  keys: number;
  events: number;
  from: number;
  summary: string;
  inclusions: string[];
  featured?: boolean;
};

export const weddingsIntro = {
  headline: "Your celebration deserves its own setting.",
  standfirst:
    "Royal Haven hosts eighteen weddings a season and no more. The whole property can be yours — four venues, forty-two keys, one team that has done this often enough to stay calm.",
  stats: [
    { figure: "500", label: "Guests at capacity" },
    { figure: "4", label: "Venues on one property" },
    { figure: "42", label: "Keys on exclusive use" },
    { figure: "12", label: "In the wedding team" },
  ],
  photos: [
    p("34079355", "A floral mandap under chandeliers, ready for the ceremony"),
    p("8414416", "The lawn set with rows of chairs for a ceremony, seen from above"),
    p("10994594", "Hanging lights and florals over a reception at dusk"),
    p("32483856", "A couple in wedding dress being celebrated by their guests"),
    p("7410739", "Mehndi and bangles on a bride's hands"),
    p("29215357", "Marigolds and lit diyas arranged for a ceremony"),
  ],
};

export const weddingVenues: WeddingVenue[] = [
  {
    slug: "baradari-lawn",
    name: "The Baradari Lawn",
    setting: "Outdoor",
    seated: 500,
    standing: 700,
    area: "18,000 sq ft",
    bestFor: "Pheras and reception",
    description:
      "The largest of the four, with a stone baradari pavilion at the head of it that most couples use as the mandap. Level ground, its own service road behind the hedge, and power for a full production rig.",
    photo: p("8414416", "A large lawn laid out with seating for a wedding ceremony"),
  },
  {
    slug: "the-grand-courtyard",
    name: "The Grand Courtyard",
    setting: "Semi-covered",
    seated: 250,
    standing: 320,
    area: "6,500 sq ft",
    bestFor: "Mehndi and sangeet",
    description:
      "Scalloped arches on all four sides and a water channel down the middle. The acoustics suit live singers; the arcade keeps elderly guests out of the sun and out of the rain.",
    photo: p("12432503", "A decorated stage under arches surrounded by florals"),
  },
  {
    slug: "the-lake-terrace",
    name: "The Lake Terrace",
    setting: "Outdoor",
    seated: 120,
    standing: 180,
    area: "3,200 sq ft",
    bestFor: "Ceremony at sunset, cocktails",
    description:
      "The west-facing terrace on the upper floor. Small, and deliberately so — this is where intimate weddings put the ceremony, with the hills behind the couple and the light going down at exactly the right hour.",
    photo: p("1341883", "String lights over a terrace at dusk"),
  },
  {
    slug: "durbar-hall",
    name: "Durbar Hall",
    setting: "Indoor",
    seated: 200,
    standing: 260,
    area: "4,800 sq ft",
    bestFor: "Reception, monsoon cover",
    description:
      "Air-conditioned, chandeliered, and the reason a July wedding here is not a gamble. Kept as the wet-weather plan for every outdoor event on the property.",
    photo: p("14646749", "A chandeliered hall arranged for a reception"),
  },
];

export const weddingPackages: WeddingPackage[] = [
  {
    slug: "intimate-haveli",
    name: "Intimate Haveli",
    guests: "Up to 60 guests",
    nights: 2,
    keys: 20,
    events: 3,
    from: 1250000,
    summary: "For a close wedding: two nights, three events, half the property to yourselves.",
    inclusions: [
      "20 rooms and suites for two nights",
      "Mehndi in the courtyard, ceremony on the Lake Terrace, dinner on the lawn",
      "Base florals and lighting for all three events",
      "All meals for resident guests, with a Rajasthani thali lunch",
      "Wedding manager and two coordinators",
      "Bridal suite with a couple's spa ritual",
    ],
  },
  {
    slug: "signature-celebration",
    name: "Signature Celebration",
    guests: "Up to 250 guests",
    nights: 3,
    keys: 42,
    events: 5,
    from: 3800000,
    featured: true,
    summary:
      "The whole resort for three nights and five events — the format most families choose.",
    inclusions: [
      "Exclusive use of all 42 keys for three nights",
      "Five events across all four venues",
      "Full decor, floral and lighting production",
      "Fourteen live counters and a midnight menu",
      "Twelve-person wedding team, on site from setup to departure",
      "Haldi, mehndi and sangeet setups included",
      "Airport transfers for all resident guests",
      "Two-hour photography of the property before guests arrive",
    ],
  },
  {
    slug: "the-royal-wedding",
    name: "The Royal Wedding",
    guests: "Up to 500 guests",
    nights: 4,
    keys: 42,
    events: 7,
    from: 7500000,
    summary:
      "Four nights, seven events, a full property buyout and a production team that stays until the last car leaves.",
    inclusions: [
      "Complete buyout for four nights",
      "Seven events, including a welcome dinner and farewell brunch",
      "Bespoke design with an appointed creative director",
      "Live entertainment programming and sound production",
      "Three kitchens, dedicated Jain and satvik brigades",
      "Guest logistics desk with 24-hour transport",
      "Licences, permits and police liaison handled by us",
      "Anniversary stay for the couple, on the house",
    ],
  },
];

export const weddingServices = [
  {
    title: "Planning",
    body: "One manager owns your wedding from the first call to the last departure. You will have their mobile number, not a shared inbox.",
  },
  {
    title: "Decor & Florals",
    body: "Three design partners we have worked with for years — from marigold and mango leaf to imported blooms. Mock-ups approved before anything is ordered.",
  },
  {
    title: "Catering",
    body: "Three kitchens, fourteen live counters, and separate Jain and satvik brigades. Tastings for the family sixty days out.",
  },
  {
    title: "Entertainment",
    body: "Folk musicians and dhol from Udaipur, DJs from Mumbai, and a sound rig that satisfies the state noise rules without ruining the party.",
  },
  {
    title: "Guest Logistics",
    body: "Airport pickups, room allocation, welcome hampers, and a desk in the lobby staffed from 6:00 AM.",
  },
  {
    title: "Permissions",
    body: "Liquor permits, sound licences, drone clearance and fireworks approvals are arranged by our team, not yours.",
  },
];

export const weddingTimeline = [
  {
    step: "Enquiry",
    when: "Day 1",
    body: "Tell us the dates, the guest count and roughly what you have in mind. We reply within one working day with availability and an indicative budget.",
  },
  {
    step: "Site visit",
    when: "Week 1–2",
    body: "In person, or a live walkthrough on video for families abroad. You meet the wedding manager who would run your event.",
  },
  {
    step: "Proposal & hold",
    when: "Week 2–3",
    body: "A costed proposal with venue plans and menus. Dates are held for seven days without payment.",
  },
  {
    step: "Planning",
    when: "12 weeks out",
    body: "Design mock-ups, tastings, room allocation, run-of-show. Weekly calls from week eight.",
  },
  {
    step: "The wedding",
    when: "The week itself",
    body: "Setup begins three days before. Our team is on site throughout, including the night shift.",
  },
];

export const weddingFaqs = [
  {
    question: "Can we hold the ceremony outdoors during the monsoon?",
    answer:
      "Yes — every outdoor event has Durbar Hall held as the wet-weather plan, at no extra cost. The switch decision is taken four hours before the event with you.",
  },
  {
    question: "Is there a minimum room block?",
    answer:
      "Weddings for more than 120 guests take all 42 keys for the nights of the celebration. Smaller weddings start at a 20-room block.",
  },
  {
    question: "What are the timings for music?",
    answer:
      "Outdoor amplified music runs until 10:00 PM in line with Rajasthan noise regulations. Durbar Hall is enclosed and can go later, and most families move the party there.",
  },
  {
    question: "Do you handle liquor and fireworks permits?",
    answer:
      "We do. Liquor permits, sound licences and cold-pyro clearances are applied for by our team. Aerial fireworks are subject to district approval and are confirmed in writing.",
  },
  {
    question: "How does payment work?",
    answer:
      "25% to confirm the dates, 50% at ninety days, the balance seven days before arrival. A single invoice, GST included, no hidden production margin.",
  },
  {
    question: "Can our own planner work with you?",
    answer:
      "Often the case, and it works well. Our team runs the property and hospitality; your planner runs the design and the family. We share a single run-of-show.",
  },
  {
    question: "Can we bring an outside caterer?",
    answer:
      "The kitchen cooks every meal, and it is the one thing we do not outsource — 500 covers off our own fires is what the brigade is built for. Specialist counters, a halwai from home, or a chaat cart are welcome alongside, and we give them a prep bay and a gas line.",
  },
  {
    question: "Is the property vegetarian-only? Can you cook Jain?",
    answer:
      "Both menus run. Vegetarian and non-vegetarian kitchens are kept separate, and Jain food is prepared without onion, garlic or root vegetables in a dedicated section — tell us the count and we plan the line around it.",
  },
  {
    question: "How does the baraat arrive?",
    answer:
      "Through the main gate and up the drive, which is wide enough for a horse, a vintage car or a band of twenty. Elephants are not used here. The drive is held for forty minutes so no arriving guest is caught behind the procession.",
  },
  {
    question: "What happens if we have to postpone?",
    answer:
      "Dates can be moved once, up to sixty days before arrival, into any open date within the following twelve months — the amount paid moves with you. Beyond sixty days the standard cancellation terms apply, and they are written into the contract rather than left to a conversation.",
  },
];
