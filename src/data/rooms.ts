import { p, type Photo } from "@/lib/images";

/** Keys map to the icon set in `src/components/ui/Icons.tsx`. */
export type AmenityKey =
  | "wifi"
  | "ac"
  | "minibar"
  | "tv"
  | "toiletries"
  | "tea"
  | "roomService"
  | "safe"
  | "hairDryer"
  | "bathrobe";

export const AMENITY_LABELS: Record<AmenityKey, string> = {
  wifi: "Wi-Fi",
  ac: "Air Conditioning",
  minibar: "Minibar",
  tv: "Smart TV",
  toiletries: "Premium Toiletries",
  tea: "Tea & Coffee",
  roomService: "Room Service",
  safe: "Safe",
  hairDryer: "Hair Dryer",
  bathrobe: "Bathrobe",
};

/** Present in every category. */
export const STANDARD_AMENITIES: AmenityKey[] = [
  "wifi",
  "ac",
  "minibar",
  "tv",
  "toiletries",
  "tea",
  "roomService",
  "safe",
  "hairDryer",
  "bathrobe",
];

export type Room = {
  slug: string;
  name: string;
  category: "Room" | "Suite";
  tagline: string;
  /** One line for cards and the booking results list. */
  summary: string;
  description: string[];
  sqft: number;
  sqm: number;
  bed: string;
  view: string;
  maxGuests: number;
  /** Lowest published nightly rate, before season and weekend movement. */
  baseRate: number;
  /** Physical keys of this category — the four categories total 42. */
  inventory: number;
  /** Three short lines used on the room card. */
  highlights: string[];
  amenities: AmenityKey[];
  extras: string[];
  inclusions: string[];
  photos: Photo[];
  featuredOnHome: boolean;
};

export const rooms: Room[] = [
  {
    slug: "garden-verandah-room",
    name: "Garden Verandah Room",
    category: "Room",
    tagline: "Ground floor, opening onto the gardens",
    summary:
      "A ground-floor room with its own shaded verandah, two chairs and a view down the garden path.",
    description: [
      "The garden rooms run along the lower wing, each with a verandah wide enough for two chairs and a table. Most guests end up having their morning tea out there rather than indoors.",
      "Inside, the room is calm and uncluttered: lime-plastered walls, a hand-knotted rug, cotton dhurrie curtains and a writing desk under the window. The bathroom has a walk-in rain shower and a window that opens onto planting.",
      "Best for couples and solo travellers who want the garden at their doorstep and the pool a two-minute walk away.",
    ],
    sqft: 480,
    sqm: 45,
    bed: "King or Twin",
    view: "Garden View",
    maxGuests: 2,
    baseRate: 15500,
    inventory: 12,
    highlights: ["480 sq ft", "Private verandah", "Rain shower"],
    amenities: STANDARD_AMENITIES,
    extras: ["Private verandah with seating", "Walk-in rain shower", "Writing desk", "Daily fruit"],
    inclusions: ["Breakfast for two at The Courtyard", "Evening tea in the courtyard", "Wi-Fi"],
    photos: [
      p("6585757", "A calm room with the bed set between curtained windows and warm bedside lighting"),
      p("13316618", "The bed with reading lights and a low upholstered stool"),
      p("5677270", "A bright bathroom with a window looking onto plants"),
      p("14036441", "The garden path outside the verandah in afternoon light"),
      p("28933066", "Two chairs on the verandah facing the garden"),
    ],
    featuredOnHome: false,
  },
  {
    slug: "royal-courtyard-room",
    name: "Royal Courtyard Room",
    category: "Room",
    tagline: "Around the old courtyard",
    summary:
      "A room on the original courtyard, with a deep window seat and arches that hold the light all morning.",
    description: [
      "These rooms sit around the oldest part of the property — a square courtyard with a stone water channel down the middle and frangipani in the corners. Morning light enters through the courtyard before the city wakes.",
      "The rooms are generous rather than grand: a carved teak headboard, a deep window seat with bolsters, brass fittings and a marble bathroom with twin basins. Blockprinted quilts are made by a family workshop in Bagru, about four hours from here.",
      "A favourite with couples on a first visit to Udaipur, and with anyone who prefers to be a few steps from the courtyard breakfast rather than the pool.",
    ],
    sqft: 520,
    sqm: 48,
    bed: "King Bed",
    view: "Courtyard View",
    maxGuests: 2,
    baseRate: 18500,
    inventory: 18,
    highlights: ["520 sq ft", "Window seat", "Twin marble basins"],
    amenities: STANDARD_AMENITIES,
    extras: [
      "Deep window seat over the courtyard",
      "Marble bathroom with twin basins",
      "Hand-blockprinted quilts",
      "Turndown with warm milk and jaggery",
    ],
    inclusions: [
      "Breakfast for two at The Courtyard",
      "Evening tea in the courtyard",
      "One heritage walk for two",
      "Wi-Fi",
    ],
    photos: [
      p("6466236", "A room with a tall upholstered headboard and layered cushions"),
      p("2736384", "Close view of white linen and a folded throw at the foot of the bed"),
      p("7167060", "A marble bathroom with a wooden vanity and freestanding tub"),
      p("33485959", "The courtyard outside, framed by scalloped arches and planting"),
      p("8525638", "A courtyard table laid for breakfast in the morning"),
    ],
    featuredOnHome: true,
  },
  {
    slug: "lake-view-suite",
    name: "Lake View Suite",
    category: "Suite",
    tagline: "Upper floor, facing the water",
    summary:
      "A corner suite on the upper floor with a sitting area, a soaking tub and the lake through every window.",
    description: [
      "Eight suites occupy the upper corners of the main building, which is where the view opens out — water in the foreground, the Aravallis behind it, and the city lights appearing one by one after seven.",
      "There is a separate sitting area with a daybed, a dressing room, and a bathroom with a soaking tub set below a jaali screen. The balcony takes two chairs and a small table; we lay it for dinner on request at no extra charge.",
      "Suite guests are met at the airport, and the concierge sets aside a boat on Lake Pichola for one evening of the stay.",
    ],
    sqft: 780,
    sqm: 72,
    bed: "King Bed",
    view: "Lake View",
    maxGuests: 2,
    baseRate: 26500,
    inventory: 8,
    highlights: ["780 sq ft", "Sitting area & balcony", "Soaking tub"],
    amenities: STANDARD_AMENITIES,
    extras: [
      "Separate sitting area with daybed",
      "Balcony laid for private dining on request",
      "Soaking tub below a carved screen",
      "Dressing room",
      "Nespresso and a chest of teas",
    ],
    inclusions: [
      "Breakfast for two at The Courtyard",
      "Airport transfer both ways",
      "One sunset boat on Lake Pichola for two",
      "Evening canapés",
      "Wi-Fi",
    ],
    photos: [
      p("28054852", "A bright suite bedroom with tall windows opening to the view"),
      p("2736388", "The bed with bedside lamps lit and curtains drawn back"),
      p("16113326", "A marble bathroom with a soaking tub beside a screened window"),
      p("26925305", "The balcony with two chairs facing the water and the hills"),
      p("34037668", "Lake Pichola in the late afternoon from the upper floor"),
    ],
    featuredOnHome: true,
  },
  {
    slug: "royal-haveli-suite",
    name: "Royal Haveli Suite",
    category: "Suite",
    tagline: "Two floors and a private terrace",
    summary:
      "The largest suite: two floors, a private terrace with a plunge pool, and space for a family of four.",
    description: [
      "Four haveli suites sit at the north end of the property, each occupying two floors of the original building with its own stair and entrance. Downstairs is a living room with a fireplace that gets used in December and January; upstairs is the bedroom and a terrace of its own.",
      "The terrace is the reason people book these. It has a plunge pool, a swing, a dining table for six and enough distance from everything else that you can spend a whole evening on it without seeing another guest.",
      "Four guests are comfortable here — two adults and two children, or two couples travelling together. A butler is assigned to the suite for the length of the stay.",
    ],
    sqft: 1250,
    sqm: 116,
    bed: "King Bed",
    view: "Private Terrace",
    maxGuests: 4,
    baseRate: 42000,
    inventory: 4,
    highlights: ["1,250 sq ft", "Private terrace & plunge pool", "Butler service"],
    amenities: STANDARD_AMENITIES,
    extras: [
      "Private terrace with plunge pool",
      "Living room across two floors",
      "Butler assigned for the stay",
      "Dining table for six on the terrace",
      "Fireplace, lit on winter evenings",
    ],
    inclusions: [
      "Breakfast for up to four at The Courtyard",
      "Airport transfer both ways",
      "One private dinner on the terrace",
      "Sunset boat on Lake Pichola",
      "60-minute spa ritual for two",
      "Wi-Fi",
    ],
    photos: [
      p("8082217", "A large suite bedroom with a chandelier and a seating corner"),
      p("2725675", "The living room downstairs with a sofa and low table"),
      p("2134224", "A bathroom with a marble tub and warm wooden joinery"),
      p("13871334", "The private terrace with loungers and a plunge pool"),
      p("9119782", "The terrace at dusk, water lit from below"),
    ],
    featuredOnHome: true,
  },
];

export const TOTAL_KEYS = rooms.reduce((sum, room) => sum + room.inventory, 0);

export function getRoom(slug: string): Room | undefined {
  return rooms.find((room) => room.slug === slug);
}

export function roomSlugs(): string[] {
  return rooms.map((room) => room.slug);
}

export const featuredRooms = rooms.filter((room) => room.featuredOnHome);

/** Cheapest published rate on the property — used in "from ₹" copy. */
export const lowestRate = Math.min(...rooms.map((room) => room.baseRate));
