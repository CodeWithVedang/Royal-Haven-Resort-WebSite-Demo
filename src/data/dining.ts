import { p, type Photo } from "@/lib/images";

export type Dish = {
  name: string;
  description: string;
  price: number;
  vegetarian: boolean;
  /** 0–2 chillies, shown as a small glyph on the menu. */
  heat?: 0 | 1 | 2;
  signature?: boolean;
  photo?: Photo;
};

export type MenuSection = {
  id: string;
  title: string;
  note?: string;
  dishes: Dish[];
};

export type Venue = {
  slug: string;
  name: string;
  kicker: string;
  cuisine: string;
  hours: { label: string; value: string }[];
  seats: number;
  summary: string;
  description: string[];
  photo: Photo;
  photos: Photo[];
  dressCode?: string;
};

export const venues: Venue[] = [
  {
    slug: "the-courtyard",
    name: "The Courtyard",
    kicker: "All day",
    cuisine: "Contemporary Indian cuisine, rooted in Rajasthan",
    hours: [
      { label: "Breakfast", value: "7:00 – 11:00" },
      { label: "Lunch", value: "12:30 – 15:00" },
      { label: "Dinner", value: "19:00 – 23:00" },
    ],
    seats: 64,
    summary:
      "Breakfast under the arches, thalis at lunch, and a Rajasthani table at night that changes with what the market has.",
    description: [
      "The Courtyard is the centre of the property in the way a kitchen is the centre of a house. Breakfast is served under the arcade until eleven, which most guests take as an invitation to come down late.",
      "Chef Meera Rathore cooks the food she grew up on in Jodhpur, with the fat reduced and the spicing left alone. Laal maas is still made with Mathania chillies and mustard oil; the ker sangri still comes from a supplier in Barmer who dries it himself.",
      "Dinner is à la carte, with a six-course Rajasthani tasting menu for tables that want to be led. Half the menu is vegetarian, and Jain preparations are made without a fuss.",
    ],
    photo: p("10135116", "The dining room under carved arches, lit for the evening"),
    photos: [
      p("10135116", "The dining room under carved arches, lit for the evening"),
      p("32568165", "Wooden tables and rattan chairs in the arcade"),
      p("156650", "A table set with brass and linen before service"),
      p("8525638", "Breakfast laid on a courtyard table with pastries and fruit"),
    ],
    dressCode: "Smart casual after 7:00 PM",
  },
  {
    slug: "sunset-terrace",
    name: "Sunset Terrace",
    kicker: "Evenings",
    cuisine: "Small plates, cocktails and the last of the light",
    hours: [
      { label: "Bar", value: "17:00 – 23:30" },
      { label: "Kitchen", value: "18:00 – 22:30" },
    ],
    seats: 38,
    summary:
      "The top of the west wing, four tables deep, facing the hills. Order the kachori and stay for the second drink.",
    description: [
      "There are twelve tables on the terrace and no way to reserve the two in the corner — they go to whoever comes up first. The bar leans on Indian spirits and garden botanicals: a gin with kokum and curry leaf, a whisky sour cut with jaggery.",
      "Food is deliberately small: things to eat with one hand while the sun goes down behind the ridge.",
    ],
    photo: p("5864464", "A terrace table set with candles at dusk"),
    photos: [
      p("5864464", "A terrace table set with candles at dusk"),
      p("28933066", "Chairs on the terrace facing the hills"),
      p("12181763", "Glassware and a bottle on a low table in warm light"),
    ],
  },
  {
    slug: "in-room-dining",
    name: "In-Room Dining",
    kicker: "Around the clock",
    cuisine: "The full menu, wherever you are",
    hours: [{ label: "Service", value: "24 hours" }],
    seats: 0,
    summary:
      "Breakfast on the verandah, a late thali after a wedding, or khichdi at three in the morning if that is what is needed.",
    description: [
      "The kitchen keeps a night brigade, so the full menu runs until midnight and a shorter comfort menu runs through to dawn — khichdi, kadhi, toast, soup, and warm milk with jaggery.",
      "Suite terraces can be laid for dinner at no additional charge; tell the butler in the morning.",
    ],
    photo: p("3769980", "A tray of coffee being carried along the colonnade"),
    photos: [
      p("3769980", "A tray of coffee being carried along the colonnade"),
      p("8525638", "A verandah table laid for breakfast in the morning"),
      p("34768070", "Coffee poured at an outdoor table before the day begins"),
    ],
  },
];

export const menu: MenuSection[] = [
  {
    id: "to-begin",
    title: "To Begin",
    note: "Served from 12:30 PM",
    dishes: [
      {
        name: "Mirchi Vada",
        description: "Bhavnagri chilli, potato and fennel, fried to order, tamarind on the side",
        price: 650,
        vegetarian: true,
        heat: 1,
      },
      {
        name: "Corn & Chilli Kachori",
        description: "Flaky kachori, sweetcorn, green chilli, mint chutney",
        price: 620,
        vegetarian: true,
        heat: 1,
      },
      {
        name: "Paneer Tikka Kali Mirch",
        description: "House paneer, crushed pepper, hung curd, charred in the tandoor",
        price: 820,
        vegetarian: true,
        heat: 0,
      },
      {
        name: "Ajwaini Fish Tikka",
        description: "River sole, carom seed, gram flour, lime",
        price: 950,
        vegetarian: false,
        heat: 0,
      },
    ],
  },
  {
    id: "from-the-tandoor",
    title: "From the Tandoor",
    dishes: [
      {
        name: "Sikandari Raan",
        description: "Slow-cooked leg of lamb, whole spice, finished over coals — 45 minutes, for two",
        price: 2400,
        vegetarian: false,
        heat: 1,
        signature: true,
        photo: p("31860138", "Tandoor-cooked meat rested over rice and herbs"),
      },
      {
        name: "Murgh Malai Tikka",
        description: "Corn-fed chicken, cream, cheese, green cardamom",
        price: 1050,
        vegetarian: false,
        heat: 0,
      },
      {
        name: "Tandoori Broccoli",
        description: "Broccoli, smoked yoghurt, walnut, honey from Kumbhalgarh",
        price: 890,
        vegetarian: true,
        heat: 0,
      },
    ],
  },
  {
    id: "the-royal-table",
    title: "The Royal Table",
    note: "Main courses — half of this section is vegetarian",
    dishes: [
      {
        name: "Dal Baati Royale",
        description:
          "Wheat baati baked in the wood oven, five-lentil dal, churma with ghee and jaggery",
        price: 1150,
        vegetarian: true,
        heat: 0,
        signature: true,
        photo: p("35008222", "A thali of dal, breads, rice and accompaniments"),
      },
      {
        name: "Laal Maas",
        description:
          "Mutton on the bone, Mathania chilli, mustard oil, garlic — the way it is cooked in Jodhpur",
        price: 1650,
        vegetarian: false,
        heat: 2,
        signature: true,
        photo: p("35532841", "A dark red curry served in a copper bowl"),
      },
      {
        name: "Ker Sangri",
        description: "Desert berry and bean, dried and tempered with red chilli and asafoetida",
        price: 980,
        vegetarian: true,
        heat: 1,
        signature: true,
        photo: p("33643313", "A dry vegetable preparation in a traditional bowl"),
      },
      {
        name: "Safed Maas",
        description: "Lamb braised in cashew, white pepper and curd, no chilli",
        price: 1620,
        vegetarian: false,
        heat: 0,
      },
      {
        name: "Gatte ki Sabzi",
        description: "Gram flour dumplings in a curd gravy, ajwain, coriander",
        price: 920,
        vegetarian: true,
        heat: 1,
      },
      {
        name: "Shahi Paneer Haveli",
        description: "House paneer, tomato and cashew, saffron, a little butter",
        price: 1050,
        vegetarian: true,
        heat: 0,
        photo: p("10345736", "Paneer in a rich tomato gravy on a rustic table"),
      },
    ],
  },
  {
    id: "breads-and-rice",
    title: "Breads & Rice",
    dishes: [
      {
        name: "Khoba Roti",
        description: "Thick hand-pressed wheat roti, ghee, from the clay oven",
        price: 280,
        vegetarian: true,
      },
      { name: "Bajra Roti", description: "Pearl millet, white butter, jaggery", price: 260, vegetarian: true },
      {
        name: "Missi Roti",
        description: "Gram flour, onion seed, green chilli",
        price: 240,
        vegetarian: true,
        heat: 1,
      },
      {
        name: "Saffron Pulao",
        description: "Long-grain rice, saffron from Kashmir, fried onion",
        price: 460,
        vegetarian: true,
      },
    ],
  },
  {
    id: "to-finish",
    title: "To Finish",
    dishes: [
      {
        name: "Saffron Kulfi",
        description: "Milk reduced for four hours, saffron, pistachio, set in the old moulds",
        price: 580,
        vegetarian: true,
        signature: true,
        photo: p("36576778", "Kulfi in a bowl with chopped nuts"),
      },
      {
        name: "Ghevar with Rabri",
        description: "Honeycomb ghevar from the Jaipur recipe, thickened milk, rose",
        price: 620,
        vegetarian: true,
        photo: p("39193454", "An Indian dessert with thickened milk and pistachio"),
      },
      {
        name: "Jaggery & Millet Kheer",
        description: "Bajra, palm jaggery, coconut, no refined sugar",
        price: 540,
        vegetarian: true,
      },
      {
        name: "Kesar Phirni",
        description: "Broken rice, saffron, almond, served cold in earthenware",
        price: 560,
        vegetarian: true,
        photo: p("33430555", "A saffron rice pudding served in a golden bowl"),
      },
    ],
  },
  {
    id: "to-drink",
    title: "To Drink",
    dishes: [
      {
        name: "Kesar Badam Milk",
        description: "Warm almond milk, saffron, cardamom — served at turndown, and on request",
        price: 320,
        vegetarian: true,
        photo: p("15082977", "Saffron milk in a glass with pistachio"),
      },
      { name: "Masala Chai", description: "Assam leaf, ginger, clove, boiled the long way", price: 260, vegetarian: true },
      { name: "Aam Panna", description: "Raw mango, black salt, roasted cumin", price: 320, vegetarian: true },
      {
        name: "Garden Gin & Kokum",
        description: "Indian dry gin, kokum, curry leaf, soda",
        price: 950,
        vegetarian: true,
      },
    ],
  },
];

export const diningNotes = [
  "Vegetarian dishes are marked. Jain, vegan and gluten-free preparations are made to order — please mention it when you sit down.",
  "Prices are in Indian Rupees and exclude applicable taxes.",
  "Chilli glyphs indicate heat, not authenticity. The kitchen will cook to your preference.",
];

export const chefNote = {
  name: "Meera Rathore",
  role: "Executive Chef",
  quote:
    "I am not interested in reinventing laal maas. I am interested in cooking it the way my grandmother did and then getting out of the way.",
  photo: p("29148133", "A Rajasthani thali laid out with breads, curries and rice"),
};

export const signatureDishes = menu
  .flatMap((section) => section.dishes)
  .filter((dish) => dish.signature);
