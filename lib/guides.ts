export interface Guide {
  id: string;
  name: string;
  role: string;
  /** Path under /public/images/guides/ — TODO: drop real photo here */
  photo: string | null;
  /** TODO: Nn to confirm real certificate number */
  certificationNumber: string | null;
  yearsGuiding: number;
  languages: string[];
  regions: string[];
  specialties: string[];
  shortBio: string;
  longBio: string;
  /** Slugs from lib/tours.ts that this guide leads */
  routesLed: string[];
  isFounder: boolean;
  isLegacy?: boolean;
}

export const GUIDES: Guide[] = [
  {
    id: "smail-aitidar",
    name: "Smail Aitidar",
    role: "Co-founder & Lead Guide",
    photo: null, // TODO: drop /public/images/guides/smail.jpg (600×600 px, face centred)
    certificationNumber: null, // TODO: Nn to confirm official ONMT / FRMGT guide number
    yearsGuiding: 30,
    languages: ["Arabic", "Berber (Tachelhit)", "French", "English", "Spanish"],
    regions: ["High Atlas", "Sahara", "Draa Valley", "Marrakech Medina"],
    specialties: ["High-altitude trekking", "Toubkal summit", "Multi-day traverses", "Desert expeditions"],
    shortBio:
      "Born in the foothills of the High Atlas, Smail grew up walking the routes he now leads — part of a family guiding tradition that stretches back more than 30 years. He co-founded Marrakech Eco Tours in 2010, building on his father Lahsen's legacy.",
    longBio: `Smail Aitidar was raised in a village on the southern slopes of the High Atlas, where the paths to Toubkal begin. His father, Lahsen, was among the first licensed Berber guides in the region, and Smail walked those routes before he could read a map.

By his twenties he had summited Toubkal more than a hundred times across every season — spring snowfields, summer stone fields, autumn mist, and winter ice. In 2010, he and his brother Mohamed formalised what had always been a family vocation, founding Marrakech Eco Tours and building it into the operation it is today.

Smail speaks five languages and is licensed by Morocco's National Office for Tourism. He leads the most technically demanding routes personally — Toubkal summit attempts, the Mgoun Massif traverse, and multi-week High Atlas crossings — and trains every guide who joins the team.

His guiding philosophy: "A guide's job is not to show people the mountain. It is to make them feel it."`,
    routesLed: [
      "toubkal-summit-trek-4day",
      "mgoun-massif-traverse-7day",
      "3-day-sahara-desert-tour-from-marrakech",
    ],
    isFounder: true,
  },
  {
    id: "mohamed-aitidar",
    name: "Mohamed Aitidar",
    role: "Co-founder & Cultural Guide",
    photo: null, // TODO: drop /public/images/guides/mohamed.jpg (600×600 px, face centred)
    certificationNumber: null, // TODO: Nn to confirm official guide number
    yearsGuiding: 30,
    languages: ["Arabic", "Berber (Tachelhit)", "French", "English", "German"],
    regions: ["Marrakech Medina", "Imperial Cities", "Atlas Foothills", "Agadir & Anti-Atlas"],
    specialties: ["Cultural & heritage tours", "Imperial cities", "Agadir region", "Food & spice routes"],
    shortBio:
      "Mohamed handles the cultural side of the operation — medina tours, imperial city routes, and the Agadir base. His deep knowledge of Moroccan history and architecture makes every medina tour a different discovery.",
    longBio: `Mohamed Aitidar shares the same High Atlas roots as his brother Smail, but his passion is the human landscape of Morocco — the medinas, souks, riads, and traditions that have shaped life here for centuries.

After spending years leading cultural tours in Marrakech and the imperial cities, Mohamed opened the Agadir base in 2018, extending the family operation to the Atlantic coast and unlocking the Anti-Atlas, Souss-Massa National Park, and Paradise Valley for travellers based in the south.

He leads the cultural and medina tours personally and trains guides in the cities. His knowledge of Moroccan architecture, ceramics, textile history, and culinary tradition is encyclopaedic — guests often describe his medina tours as the single best hour they spent in Morocco.

Mohamed speaks five languages and holds an official guiding licence from the Moroccan National Office for Tourism.`,
    routesLed: [
      "marrakech-medina-cultural-tour",
      "fes-medina-full-day-tour",
      "chefchaouen-and-rif-mountains-day-tour",
    ],
    isFounder: true,
  },
  {
    id: "lahsen-aitidar",
    name: "Lahsen Aitidar",
    role: "Founder — The First Guide",
    photo: null, // TODO: drop /public/images/guides/lahsen.jpg if photo available
    certificationNumber: null,
    yearsGuiding: 40,
    languages: ["Arabic", "Berber (Tachelhit)", "French"],
    regions: ["High Atlas", "Toubkal", "Ourika Valley", "Aït Benhaddou"],
    specialties: ["High Atlas pioneering routes", "Traditional Berber knowledge", "Toubkal"],
    shortBio:
      "Lahsen was one of the first licensed Berber mountain guides in the High Atlas — leading trekkers through Toubkal and the Atlas valleys long before Morocco had a formal tourism industry. Everything Smail and Mohamed know, they learned from him.",
    longBio: `Lahsen Aitidar began guiding in the 1980s, before the trails to Toubkal had a name in any guidebook. A Berber born in the High Atlas, he was among the first in the region to receive an official guiding licence — a recognition of knowledge he had built by walking every route, in every season, for years.

He led groups of travellers through the Atlas at a time when the logistics were entirely improvised: mules hired from neighbouring villages, food sourced from Berber families along the route, shelter found in stone shepherds' huts. He built trust with every group the only way he knew: by knowing the land completely and treating every guest with the same hospitality he would offer a family member.

He passed that standard — and every route — to his sons Smail and Mohamed. Lahsen is now retired from active guiding, but his knowledge still informs every itinerary the company runs.`,
    routesLed: [],
    isFounder: false,
    isLegacy: true,
  },
];

export function getGuide(id: string): Guide | undefined {
  return GUIDES.find((g) => g.id === id);
}
