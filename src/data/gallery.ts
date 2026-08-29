import { p, type Photo } from "@/lib/images";

export const galleryCategories = [
  "Resort",
  "Rooms",
  "Dining",
  "Experiences",
  "Weddings",
  "Wellness",
] as const;

export type GalleryCategory = (typeof galleryCategories)[number];

export type GalleryItem = {
  photo: Photo;
  category: GalleryCategory;
  /** Short line shown under the image in the lightbox. */
  caption: string;
};

export const galleryItems: GalleryItem[] = [
  /* ---------------------------------- Resort -------------------------------- */
  {
    photo: p("32109604", "Arched colonnades and carved stone of a Rajasthani palace", "landscape"),
    category: "Resort",
    caption: "The west colonnade, late afternoon",
  },
  {
    photo: p("33485959", "The resort courtyard with scalloped arches and planted beds", "landscape"),
    category: "Resort",
    caption: "The old courtyard, where breakfast is laid",
  },
  {
    photo: p("6735852", "A carved sandstone pavilion with a tree growing beside it", "portrait"),
    category: "Resort",
    caption: "The baradari pavilion on the lawn",
  },
  {
    photo: p("36795124", "Close detail of a carved stone lattice screen", "portrait"),
    category: "Resort",
    caption: "Jaali screen, cut by hand in Jaisalmer stone",
  },
  {
    photo: p("13273991", "A painted and carved ceiling in the Rajasthani tradition", "landscape"),
    category: "Resort",
    caption: "The Durbar Hall ceiling, restored in 2019",
  },
  {
    photo: p("34669530", "Carved brackets and shuttered windows of an old haveli", "portrait"),
    category: "Resort",
    caption: "The original haveli façade",
  },
  {
    photo: p("12387874", "The main pool with loungers under the trees", "landscape"),
    category: "Resort",
    caption: "The pool, open from seven",
  },
  {
    photo: p("12387870", "The pool lit at night, lined with palms", "landscape"),
    category: "Resort",
    caption: "After hours, when the lanterns go in",
  },
  {
    photo: p("14024974", "A walkway through the gardens shaded by palms", "portrait"),
    category: "Resort",
    caption: "The garden walk to the spa",
  },
  {
    photo: p("28933066", "Chairs on a quiet terrace overlooking the valley", "landscape"),
    category: "Resort",
    caption: "Two chairs, nothing scheduled",
  },
  {
    photo: p("35266294", "The lake palace at Udaipur at sunset with the Aravalli hills behind", "landscape"),
    category: "Resort",
    caption: "Udaipur at sunset, twenty-five minutes away",
  },
  {
    photo: p("6474521", "A doorman waiting at the entrance to welcome arriving guests", "portrait"),
    category: "Resort",
    caption: "Arrival",
  },
  /* ----------------------------------- Rooms -------------------------------- */
  {
    photo: p("34645081", "A softly lit suite with carved furniture and layered textiles", "landscape"),
    category: "Rooms",
    caption: "Lake View Suite, turned down for the night",
  },
  {
    photo: p("6585757", "A calm room with the bed set between curtained windows and warm bedside lighting", "landscape"),
    category: "Rooms",
    caption: "Garden Verandah Room",
  },
  {
    photo: p("6466236", "A room with a tall upholstered headboard and layered cushions", "landscape"),
    category: "Rooms",
    caption: "Royal Courtyard Room",
  },
  {
    photo: p("2736384", "White linen and a folded throw at the foot of the bed", "portrait"),
    category: "Rooms",
    caption: "Cotton from a workshop in Bagru",
  },
  {
    photo: p("7167060", "A marble bathroom with a wooden vanity and freestanding tub", "portrait"),
    category: "Rooms",
    caption: "Twin basins, Makrana marble",
  },
  {
    photo: p("28054852", "A bright suite bedroom with tall windows opening to the view", "landscape"),
    category: "Rooms",
    caption: "The upper floor, facing the water",
  },
  {
    photo: p("16113326", "A marble bathroom with a soaking tub beside a screened window", "portrait"),
    category: "Rooms",
    caption: "A tub below the jaali",
  },
  {
    photo: p("26925305", "A balcony with two chairs facing the water and the hills", "landscape"),
    category: "Rooms",
    caption: "Suite balcony, laid for dinner on request",
  },
  {
    photo: p("8082217", "A large suite bedroom with a chandelier and a seating corner", "landscape"),
    category: "Rooms",
    caption: "Royal Haveli Suite, upstairs",
  },
  {
    photo: p("13871334", "A private terrace with loungers and a plunge pool", "landscape"),
    category: "Rooms",
    caption: "The private terrace and plunge pool",
  },
  /* ---------------------------------- Dining -------------------------------- */
  {
    photo: p("10135116", "The dining room under carved arches, lit for the evening", "landscape"),
    category: "Dining",
    caption: "The Courtyard, set for dinner",
  },
  {
    photo: p("8525638", "A courtyard table laid for breakfast with pastries and fruit", "landscape"),
    category: "Dining",
    caption: "Breakfast under the arcade until eleven",
  },
  {
    photo: p("35008222", "A thali of dal, breads, rice and accompaniments", "landscape"),
    category: "Dining",
    caption: "Dal Baati Royale, with churma",
  },
  {
    photo: p("35532841", "A dark red curry served in a copper bowl", "square"),
    category: "Dining",
    caption: "Laal maas — Mathania chilli, mustard oil",
  },
  {
    photo: p("31860138", "Tandoor-cooked meat rested over rice and herbs", "landscape"),
    category: "Dining",
    caption: "Sikandari raan, forty-five minutes",
  },
  {
    photo: p("33643313", "A dry vegetable preparation in a traditional bowl", "square"),
    category: "Dining",
    caption: "Ker sangri, dried in Barmer",
  },
  {
    photo: p("36576778", "Kulfi in a bowl with chopped nuts", "portrait"),
    category: "Dining",
    caption: "Saffron kulfi, set in the old moulds",
  },
  {
    photo: p("5864464", "A terrace table set with candles at dusk", "landscape"),
    category: "Dining",
    caption: "Sunset Terrace, from five",
  },
  {
    photo: p("15082977", "Saffron milk in a glass with pistachio", "portrait"),
    category: "Dining",
    caption: "Kesar badam milk at turndown",
  },
  /* -------------------------------- Experiences ----------------------------- */
  {
    photo: p("570032", "Sunrise over the Aravalli hills, ridges layered in mist", "landscape"),
    category: "Experiences",
    caption: "Sunrise at the Aravallis, 5:15 AM",
  },
  {
    photo: p("31060396", "A wooden boat on Lake Pichola with the hills beyond", "landscape"),
    category: "Experiences",
    caption: "Sunset boat on Lake Pichola",
  },
  {
    photo: p("14477034", "Looking through a carved gateway into an old courtyard", "portrait"),
    category: "Experiences",
    caption: "The heritage walk, through the old city",
  },
  {
    photo: p("20242195", "A potter shaping clay in a village workshop", "landscape"),
    category: "Experiences",
    caption: "Bheruji at the wheel",
  },
  {
    photo: p("15020640", "Blockprinted cotton drying in the sun", "portrait"),
    category: "Experiences",
    caption: "Indigo drying on the roof",
  },
  {
    photo: p("17788657", "A table laid outdoors under warm string lights at sunset", "landscape"),
    category: "Experiences",
    caption: "Private dinner under the stars",
  },
  {
    photo: p("9119782", "A lit pool at dusk beside a domed pavilion", "landscape"),
    category: "Experiences",
    caption: "The pool, cleared for the evening",
  },
  {
    photo: p("4291428", "Wooden boats moored on Lake Pichola at first light", "landscape"),
    category: "Experiences",
    caption: "First light at the ghat",
  },
  {
    photo: p("11266606", "A father and two children playing on a float in the pool", "landscape"),
    category: "Experiences",
    caption: "Afternoons, mostly spent here",
  },
  {
    photo: p("15124016", "A couple looking out over the city from the hills", "portrait"),
    category: "Experiences",
    caption: "The ridge above Sajjangarh",
  },
  /* --------------------------------- Weddings ------------------------------- */
  {
    photo: p("34079355", "A floral mandap under chandeliers, set for a wedding ceremony", "landscape"),
    category: "Weddings",
    caption: "The mandap in Durbar Hall",
  },
  {
    photo: p("8414416", "A large lawn laid out with seating for a wedding ceremony", "landscape"),
    category: "Weddings",
    caption: "The Baradari Lawn, set for 400",
  },
  {
    photo: p("10994594", "Hanging lights and florals over a reception at dusk", "landscape"),
    category: "Weddings",
    caption: "Reception, the hour before guests arrive",
  },
  {
    photo: p("12432503", "A decorated stage under arches surrounded by florals", "landscape"),
    category: "Weddings",
    caption: "Sangeet in the Grand Courtyard",
  },
  {
    photo: p("32483856", "A couple in wedding dress being celebrated by their guests", "landscape"),
    category: "Weddings",
    caption: "The baraat, coming down the drive",
  },
  {
    photo: p("7410739", "Mehndi and bangles on a bride's hands", "portrait"),
    category: "Weddings",
    caption: "Mehndi, the afternoon before",
  },
  {
    photo: p("29548010", "A bride in traditional Indian wedding jewellery and dress", "portrait"),
    category: "Weddings",
    caption: "Getting ready in the bridal suite",
  },
  {
    photo: p("29215357", "Marigolds and lit diyas arranged for a ceremony", "square"),
    category: "Weddings",
    caption: "Marigold and diyas, laid at dusk",
  },
  {
    photo: p("14646749", "A chandeliered hall arranged for a reception", "landscape"),
    category: "Weddings",
    caption: "Durbar Hall, the wet-weather plan",
  },
  {
    photo: p("1341883", "String lights over a terrace at dusk", "landscape"),
    category: "Weddings",
    caption: "The Lake Terrace after the ceremony",
  },
  /* --------------------------------- Wellness ------------------------------- */
  {
    photo: p("433626", "Oils and copper vessels on a wooden tray in a treatment room", "landscape"),
    category: "Wellness",
    caption: "Oils blended here, in small batches",
  },
  {
    photo: p("6629603", "A back massage with warm oil in a quiet room", "landscape"),
    category: "Wellness",
    caption: "Royal Abhyanga, two therapists",
  },
  {
    photo: p("28321599", "A slow head massage in a candlelit treatment room", "portrait"),
    category: "Wellness",
    caption: "Shirodhara — twenty-five minutes",
  },
  {
    photo: p("1926811", "Candles, towels and flowers set out in a spa suite", "landscape"),
    category: "Wellness",
    caption: "The couple's suite, with its own bath",
  },
  {
    photo: p("32298479", "A figure seated in meditation beside still water at sunrise", "landscape"),
    category: "Wellness",
    caption: "Yoga in the pavilion at seven",
  },
  {
    photo: p("34478574", "Eucalyptus, citrus and towels arranged for a treatment", "square"),
    category: "Wellness",
    caption: "Before a treatment",
  },
  {
    photo: p("6560348", "A bowl of herbs and a lit candle beside folded linen", "portrait"),
    category: "Wellness",
    caption: "The formulary, kept since 2008",
  },
];

export function itemsByCategory(category: GalleryCategory | "All"): GalleryItem[] {
  if (category === "All") return galleryItems;
  return galleryItems.filter((item) => item.category === category);
}

export function categoryCount(category: GalleryCategory): number {
  return galleryItems.filter((item) => item.category === category).length;
}

/** A tight, mixed selection for the homepage preview strip. */
export const galleryPreview: GalleryItem[] = [
  "Resort",
  "Rooms",
  "Weddings",
  "Dining",
  "Experiences",
  "Wellness",
].flatMap((category) => itemsByCategory(category as GalleryCategory).slice(0, 1));

export type { Photo };
