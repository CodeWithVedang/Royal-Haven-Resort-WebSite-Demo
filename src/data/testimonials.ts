export type Testimonial = {
  quote: string;
  name: string;
  city: string;
  context: string;
  stayed: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Every detail felt considered. From the courtyard breakfast to the evening service, Royal Haven made our anniversary unforgettable.",
    name: "Ananya Mehta",
    city: "Mumbai",
    context: "Anniversary · Lake View Suite",
    stayed: "March 2026",
  },
  {
    quote:
      "Beautiful property, exceptional hospitality and an atmosphere that genuinely feels peaceful.",
    name: "Arjun Kapoor",
    city: "Delhi",
    context: "Three nights · Royal Courtyard Room",
    stayed: "February 2026",
  },
  {
    quote: "Our wedding weekend was handled beautifully from start to finish.",
    name: "Rhea & Karan",
    city: "Bengaluru",
    context: "Wedding · 210 guests",
    stayed: "December 2025",
  },
  {
    quote:
      "We came with two children and a grandmother, which is usually a compromise somewhere. Nothing was a compromise here.",
    name: "Farhan Qureshi",
    city: "Hyderabad",
    context: "Family holiday · Royal Haveli Suite",
    stayed: "January 2026",
  },
  {
    quote:
      "I booked four nights to work quietly and ended up leaving the laptop shut. The team read that correctly and left me alone.",
    name: "Divya Raghunathan",
    city: "Chennai",
    context: "Solo stay · Garden Verandah Room",
    stayed: "November 2025",
  },
];

export const guestRating = {
  score: "4.9",
  outOf: "5",
  reviews: 1284,
  label: "Average guest rating",
  note: "Across our own post-stay surveys and third-party travel platforms.",
};
