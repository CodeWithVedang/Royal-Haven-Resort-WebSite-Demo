import { locationPhotos } from "./photos";
import { site } from "@/lib/site";

export type Distance = {
  place: string;
  minutes: string;
  detail: string;
};

export const distances: Distance[] = [
  {
    place: "Udaipur Airport (UDR)",
    minutes: "35 min",
    detail: "Maharana Pratap Airport, Dabok — 22 km. Met on arrival, no queue at the desk.",
  },
  {
    place: "Udaipur City Palace",
    minutes: "25 min",
    detail: "The old city, the ghats and the palace complex — 9 km through Ambamata.",
  },
  {
    place: "Lake Pichola",
    minutes: "25 min",
    detail: "Our boat jetty at Rameshwar Ghat, where the sunset cruise leaves from.",
  },
  {
    place: "Udaipur Railway Station",
    minutes: "30 min",
    detail: "11 km. Transfers arranged for the overnight trains from Delhi and Ahmedabad.",
  },
];

export const nearby = [
  { name: "Jagdish Temple", note: "17th-century, in the middle of the old city", minutes: "25 min" },
  { name: "Saheliyon ki Bari", note: "Fountains and lotus pools, best before ten", minutes: "20 min" },
  { name: "Monsoon Palace", note: "Sajjangarh, on the ridge — go at sunset", minutes: "30 min" },
  { name: "Eklingji & Nagda", note: "Temple complex north of the city", minutes: "45 min" },
  { name: "Kumbhalgarh Fort", note: "A full day, and worth it", minutes: "2 hr" },
  { name: "Ranakpur Jain Temple", note: "1,444 carved pillars, no two alike", minutes: "2 hr 15 min" },
];

export const arrival = {
  headline: "Getting here",
  address: site.contact.address,
  coordinates: site.contact.coordinates,
  notes: [
    "Airport transfers are arranged by the concierge and are complimentary for all suites. Sedans, SUVs and a Tempo Traveller are available.",
    "If you are driving, the property is signposted from Rajmahal Road. The gate is manned around the clock and parking is on site.",
    "Trains from Delhi, Jaipur and Ahmedabad arrive early morning. Rooms are held for early check-in when we know the train number.",
  ],
  photo: locationPhotos.lakeSunset,
};

export const seasons = [
  {
    label: "October – March",
    title: "The season",
    body: "Days at 24–28°C, cool evenings, and the light photographers come for. Book well ahead — this is also when the weddings are.",
  },
  {
    label: "April – June",
    title: "Hot and quiet",
    body: "Warm afternoons, empty courtyards, and our lowest rates. Mornings and evenings outdoors, the pool and the spa in between.",
  },
  {
    label: "July – September",
    title: "The monsoon",
    body: "The Aravallis turn green, the lakes fill, and the property is at its most beautiful. Rain comes in short bursts, not all day.",
  },
];
