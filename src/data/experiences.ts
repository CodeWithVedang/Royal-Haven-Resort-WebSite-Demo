import { p, type Photo } from "@/lib/images";

export type Experience = {
  slug: string;
  title: string;
  kicker: string;
  duration: string;
  timing: string;
  price: string;
  priceNote?: string;
  groupSize: string;
  summary: string;
  description: string[];
  includes: string[];
  bestFor: ("Couples" | "Families" | "Solo" | "Groups")[];
  photo: Photo;
  /** Secondary frame used by the wide editorial rows. */
  secondaryPhoto?: Photo;
};

export const experiences: Experience[] = [
  {
    slug: "sunrise-at-the-aravallis",
    title: "Sunrise at the Aravallis",
    kicker: "Mornings",
    duration: "3 hours",
    timing: "Departs 5:15 AM",
    price: "₹2,500 per person",
    groupSize: "Up to 6 guests",
    summary:
      "A short drive into the hills, a flask of chai, and the twenty minutes before the light arrives.",
    description: [
      "We leave while it is still dark and drive twenty minutes into the hills behind the resort. There is a stone platform there that a former custodian of the property built for exactly this — it faces east across two ridges and a stepwell.",
      "Chai and Kesar Badam milk come out of flasks. Nobody talks much. You are back by half past eight, in time for breakfast in the courtyard.",
    ],
    includes: ["Private vehicle and driver", "Chai, coffee and warm milk", "Blankets", "Naturalist guide"],
    bestFor: ["Couples", "Solo"],
    photo: p("570032", "Sunrise over the Aravalli hills, ridges layered in mist"),
    secondaryPhoto: p("20551859", "A misty morning view over hills and fields"),
  },
  {
    slug: "royal-heritage-walk",
    title: "Royal Heritage Walk",
    kicker: "Afternoons",
    duration: "2 hours 30 minutes",
    timing: "Departs 4:00 PM",
    price: "₹1,800 per person",
    priceNote: "Complimentary for suite guests",
    groupSize: "Up to 8 guests",
    summary:
      "The old city on foot with Vikram, who grew up two lanes behind the City Palace and knows which doors open.",
    description: [
      "Udaipur is a walking city if you know where to start. Vikram begins at the ghats, moves through the brass and silver lanes, and ends at a rooftop above Jagdish Temple as the lamps are lit.",
      "The route deliberately avoids the coach parking. You will stop for a kachori, meet a family of miniature painters who have worked on the same street for four generations, and be back for dinner.",
    ],
    includes: ["Resident historian", "Temple entry", "Street tasting", "Return transfer"],
    bestFor: ["Couples", "Families", "Solo"],
    photo: p("14477034", "Looking through a carved gateway into an old courtyard"),
    secondaryPhoto: p("33658452", "The City Palace seen across the water in the afternoon"),
  },
  {
    slug: "sunset-boat-on-lake-pichola",
    title: "Sunset Boat on Lake Pichola",
    kicker: "Evenings",
    duration: "90 minutes",
    timing: "Departs 5:00 PM",
    price: "₹4,500 for two",
    priceNote: "Included with suites",
    groupSize: "Private boat",
    summary: "A slow circuit of the lake with the palace on one side and the hills on the other.",
    description: [
      "A private wooden boat leaves from the jetty a short drive from the resort. The route passes below the City Palace, cuts across to Jag Mandir, and turns back with the light behind the Aravallis.",
      "There is a cool towel, a flask of nimbu paani and, if you would like it, a bottle of something from the cellar. It is the best ninety minutes of most people's stay.",
    ],
    includes: ["Private boat", "Cold towels and drinks", "Return transfer", "Photography stop"],
    bestFor: ["Couples", "Families"],
    photo: p("31060396", "A wooden boat on Lake Pichola with the hills beyond"),
    secondaryPhoto: p("4291428", "Boats moored on the lake in the early light"),
  },
  {
    slug: "village-and-craft-trail",
    title: "Village & Craft Trail",
    kicker: "Mornings",
    duration: "4 hours",
    timing: "Departs 9:30 AM",
    price: "₹3,200 per person",
    groupSize: "Up to 6 guests",
    summary:
      "Two villages, a potter's wheel you are expected to try, and a blockprinting shed that smells of indigo.",
    description: [
      "Forty minutes south of the resort, two villages still work the way they always have. Bheruji throws pots on a wheel his grandfather turned; four streets away, the Chhipa family prints cotton with tamarind-wood blocks and dries it on the roof.",
      "You will make something badly and take it home. Lunch is a simple thali eaten sitting on the floor, which is how it should be eaten.",
    ],
    includes: [
      "Private vehicle and guide",
      "Pottery and printing workshops",
      "Village thali lunch",
      "Everything you make",
    ],
    bestFor: ["Families", "Groups"],
    photo: p("20242195", "A potter shaping clay in a village workshop"),
    secondaryPhoto: p("15020640", "Blockprinted cotton drying in the sun"),
  },
  {
    slug: "private-poolside-evening",
    title: "Private Poolside Evening",
    kicker: "Evenings",
    duration: "2 hours",
    timing: "From 7:00 PM",
    price: "₹9,500 for two",
    groupSize: "Two to eight guests",
    summary:
      "The pool after hours: lanterns in the water, a small menu of tandoor plates, and nobody else.",
    description: [
      "After the pool closes at seven we clear it, float lanterns along the far edge and set a low table at the shallow end. A chef works the tandoor a few steps away and sends plates over as they come off.",
      "Some evenings are better spent doing absolutely nothing. This is the version of that with better food.",
    ],
    includes: ["Exclusive use of the pool terrace", "Live tandoor", "Sommelier selection", "Butler service"],
    bestFor: ["Couples", "Groups"],
    photo: p("9119782", "A lit pool at dusk beside a domed pavilion"),
    secondaryPhoto: p("12387870", "Palms and lanterns reflected in the pool at night"),
  },
  {
    slug: "private-dinner-under-the-stars",
    title: "Private Dinner Under the Stars",
    kicker: "Evenings",
    duration: "Three hours, unhurried",
    timing: "From 7:30 PM",
    price: "₹12,500 for two",
    groupSize: "Two guests",
    summary:
      "One table, set wherever you would like it: the stepwell, the upper terrace, or the lawn at the far end.",
    description: [
      "You choose the setting in the morning and the chef builds a six-course menu around it. The stepwell is the one people remember — candles in the wall niches, the table on the lowest dry step, a musician somewhere above you.",
      "Take your time. There is no second sitting.",
    ],
    includes: [
      "Six-course tasting menu",
      "Wine pairing or mocktails",
      "Private butler and musician",
      "Setting of your choice",
    ],
    bestFor: ["Couples"],
    photo: p("17788657", "A table laid outdoors under warm string lights at sunset"),
    secondaryPhoto: p("3937246", "Candles and glassware on a private dinner table"),
  },
];

export function getExperience(slug: string): Experience | undefined {
  return experiences.find((experience) => experience.slug === slug);
}
