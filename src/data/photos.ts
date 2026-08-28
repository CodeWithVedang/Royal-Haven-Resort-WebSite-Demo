import { p, type Photo } from "@/lib/images";

/**
 * Site-wide photography. Entity photography (rooms, dishes, treatments) lives
 * with its content in the other files in this folder.
 */

export const pageHero: Record<string, Photo> = {
  home: p(
    "35266294",
    "The lake palace at Udaipur at sunset, with the Aravalli hills behind it",
  ),
  rooms: p("34645081", "A softly lit suite with carved furniture and layered textiles"),
  experiences: p("570032", "Sunrise over the Aravalli hills outside Udaipur"),
  dining: p("10135116", "A warm dining room set for the evening service"),
  wellness: p("433626", "Massage oils on a wooden tray in a quiet treatment room"),
  weddings: p("34079355", "A floral mandap under chandeliers, set for a wedding ceremony"),
  gallery: p("32109604", "Arched colonnades and carved stone of a Rajasthani palace"),
  contact: p("37912066", "A courtyard seen through a carved archway in the late afternoon"),
  booking: p("33485959", "A planted courtyard framed by scalloped arches"),
};

export const brandMoments: Record<string, Photo> = {
  archway: p("6735852", "A carved sandstone pavilion with a tree growing beside it"),
  courtyard: p("33485959", "The resort courtyard with scalloped arches and planted beds"),
  jaali: p("36795124", "Close detail of a carved stone lattice screen"),
  ceiling: p("13273991", "A painted and carved ceiling in the Rajasthani tradition"),
  marbleWall: p("19195960", "Geometric inlay on a pale marble wall"),
  havelDetail: p("34669530", "Carved brackets and shuttered windows of an old haveli"),
  arrival: p("6474521", "A doorman waiting at the entrance to welcome arriving guests"),
  reception: p("5378703", "Guests being received at the front desk"),
  roomService: p("3769980", "A tray of coffee carried along a colonnade for in-room dining"),
  breakfast: p("8525638", "A courtyard table laid for breakfast with pastries and fruit"),
  morningCoffee: p("34768070", "Coffee being poured at an outdoor table in morning light"),
  diya: p("33360798", "A brass diya lit at dusk"),
  diyaDetail: p("34056592", "A traditional brass oil lamp with engraved detail"),
  textiles: p("4566670", "Hand-printed cottons stacked in a Rajasthani workshop"),
  pool: p("12387874", "The main pool with loungers under the trees"),
  poolNight: p("12387870", "The pool lit at night, lined with palms"),
  gardens: p("14024974", "A walkway through the gardens shaded by palms"),
  gardenPath: p("14036478", "A garden path leading between planted beds"),
  terrace: p("28933066", "Chairs on a quiet terrace overlooking the valley"),
  couple: p("15185197", "A couple under the stone arches of an old palace"),
  coupleHill: p("15124016", "A couple looking out over the city from the hills"),
  family: p("11266606", "A father and two children playing on a float in the pool"),
};

export const locationPhotos: Record<string, Photo> = {
  lakeSunset: p("35338838", "Sunset over Lake Pichola with the city beyond"),
  cityPalace: p("33658452", "Udaipur City Palace seen from across the water"),
  lakePalace: p("27960113", "The Lake Palace sitting low on Lake Pichola"),
  aerial: p("17547457", "Udaipur from the air at dusk, lakes and hills together"),
  boats: p("4291428", "Wooden boats moored on Lake Pichola at first light"),
};
