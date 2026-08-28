import { p, type Photo } from "@/lib/images";

export type Treatment = {
  slug: string;
  name: string;
  kicker: string;
  durations: { minutes: number; price: number }[];
  summary: string;
  description: string;
  good_for: string[];
  photo: Photo;
};

export const spa = {
  name: "The Haven Spa",
  headline: "Ancient Indian rituals meet contemporary wellness.",
  intro:
    "Four treatment rooms, a couple's suite, a steam and cold plunge, and a yoga pavilion that sits above the garden. Therapists are trained in Kerala; the oils are blended here, in small batches, from a formulary the resort has kept since it opened.",
  hours: "8:00 – 20:00, daily · last treatment 19:00",
  facilities: [
    "Four single treatment rooms",
    "Couple's suite with private bath",
    "Steam room and cold plunge",
    "Open-air yoga pavilion",
    "Relaxation courtyard",
    "Consultation room",
  ],
  etiquette: [
    "Arrive fifteen minutes early — the tea before a treatment is part of it.",
    "Treatments can be taken in your room or on a suite terrace at no extra charge.",
    "Cancellations within four hours are charged in full.",
    "The pavilion holds a complimentary group yoga session at 7:00 AM.",
  ],
  photos: [
    p("433626", "Oils and copper vessels on a wooden tray in a treatment room"),
    p("35884499", "A massage table set with a folded towel and a candle"),
    p("6560348", "A bowl of herbs and a lit candle beside folded linen"),
    p("34478574", "Eucalyptus, citrus and towels arranged for a treatment"),
  ],
};

export const treatments: Treatment[] = [
  {
    slug: "royal-abhyanga",
    name: "Royal Abhyanga",
    kicker: "Signature",
    durations: [{ minutes: 90, price: 7500 }],
    summary:
      "Two therapists, warm sesame and ashwagandha oil, worked in long strokes along the length of the body.",
    description:
      "The oldest treatment on the menu and still the one we would recommend first. Two therapists work in unison — the rhythm is the point of it. Finishes with steam and a cup of ginger and tulsi.",
    good_for: ["Long flights", "Deep fatigue", "Sleep"],
    photo: p("6629603", "A back massage with warm oil in a quiet room"),
  },
  {
    slug: "ayurvedic-massage",
    name: "Ayurvedic Massage",
    kicker: "Classic",
    durations: [
      { minutes: 60, price: 4500 },
      { minutes: 90, price: 6200 },
    ],
    summary: "A single-therapist oil massage, adjusted to your constitution after a short consultation.",
    description:
      "Warm oil, medium pressure, and a therapist who will actually ask where it hurts. The oil is chosen after a five-minute pulse and constitution reading.",
    good_for: ["Stiffness", "Circulation", "First-time guests"],
    photo: p("6628696", "Hands working with oil during an aromatherapy massage"),
  },
  {
    slug: "deep-relaxation-therapy",
    name: "Deep Relaxation Therapy",
    kicker: "Restorative",
    durations: [{ minutes: 75, price: 6000 }],
    summary:
      "Shirodhara — a thin, unbroken stream of warm oil over the forehead — followed by a scalp and neck massage.",
    description:
      "For guests who cannot switch off. The stream runs for twenty-five minutes; most people are asleep by the tenth. Best taken in the late afternoon, with nothing planned afterwards.",
    good_for: ["Racing mind", "Headaches", "Jet lag"],
    photo: p("28321599", "A slow head massage in a candlelit treatment room"),
  },
  {
    slug: "couples-ritual",
    name: "Couple's Ritual",
    kicker: "For two",
    durations: [{ minutes: 120, price: 14500 }],
    summary:
      "A private suite for two hours: foot bath, salt and rose scrub, oil massage, and a bath drawn with milk and marigold.",
    description:
      "The couple's suite has its own bath and courtyard, so nobody has to move between rooms. Ends with kulfi and cold towels on the terrace. Frequently booked the evening before a wedding.",
    good_for: ["Anniversaries", "Honeymoons", "Pre-wedding"],
    photo: p("1926811", "Candles, towels and flowers set out in a spa suite"),
  },
  {
    slug: "yoga-session",
    name: "Yoga Session",
    kicker: "Movement",
    durations: [{ minutes: 60, price: 1800 }],
    summary:
      "Private hatha or pranayama in the pavilion, on your terrace, or on the lawn at the far end of the garden.",
    description:
      "Ravi teaches a slow, joint-friendly hatha sequence and is unusually good with beginners and stiff backs. A complimentary group session runs at 7:00 AM for all guests.",
    good_for: ["Mornings", "Beginners", "Back and hips"],
    photo: p("32298479", "A figure seated in meditation beside still water at sunrise"),
  },
  {
    slug: "private-wellness-consultation",
    name: "Private Wellness Consultation",
    kicker: "Guidance",
    durations: [{ minutes: 45, price: 2500 }],
    summary:
      "A sit-down with the resident Ayurvedic physician: constitution, sleep, digestion, and what to actually do about it.",
    description:
      "Dr Anjali Nair holds consultations every morning. You will leave with a short written plan — food, timing, two or three practices — that is possible to keep up at home. Complimentary for stays of four nights or more.",
    good_for: ["Longer stays", "Diet", "Ongoing niggles"],
    photo: p("37229294", "A calm treatment room during a facial therapy"),
  },
];

export const spaJourneys = [
  {
    name: "The Three-Day Reset",
    duration: "Three days · five treatments",
    price: 34500,
    inclusions: [
      "Wellness consultation and closing review",
      "Royal Abhyanga, Shirodhara and a herbal scrub",
      "Two private yoga sessions",
      "A menu written for you by the kitchen",
    ],
  },
  {
    name: "The Bridal Week",
    duration: "Five days · seven treatments",
    price: 58000,
    inclusions: [
      "Skin and scalp programme with a haldi ritual",
      "Daily massage and steam",
      "Two couple's rituals",
      "Morning yoga and breathwork",
    ],
  },
];

export function getTreatment(slug: string): Treatment | undefined {
  return treatments.find((treatment) => treatment.slug === slug);
}
