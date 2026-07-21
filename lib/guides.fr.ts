import type { Guide } from "./guides";

export const GUIDES: Guide[] = [
  {
    id: "smail-aitidar",
    name: "Smail Aitidar",
    role: "Cofondateur et guide principal",
    photo: null,
    certificationNumber: null,
    yearsGuiding: 30,
    languages: ["Arabe", "Berbère (Tachelhit)", "Français", "Anglais", "Espagnol"],
    regions: ["Haut Atlas", "Sahara", "Vallée du Drâa", "Médina de Marrakech"],
    specialties: ["Trekking en haute altitude", "Sommet du Toubkal", "Traversées de plusieurs jours", "Expéditions dans le désert"],
    shortBio:
      "Né sur les contreforts du Haut Atlas, Smail a grandi en parcourant les itinéraires qu'il guide aujourd'hui — dans la continuité d'une tradition familiale de guides vieille de plus de 30 ans. Il a cofondé Marrakech Eco Tours en 2010, en s'appuyant sur l'héritage de son père Lahsen.",
    longBio: `Smail Aitidar a grandi dans un village sur les versants méridionaux du Haut Atlas, là où débutent les sentiers vers le Toubkal. Son père, Lahsen, fut l'un des premiers guides berbères agréés de la région, et Smail arpentait ces itinéraires avant même de savoir lire une carte.

À vingt ans passés, il avait déjà atteint le sommet du Toubkal plus d'une centaine de fois, à travers toutes les saisons — champs de neige printaniers, éboulis rocheux estivaux, brume automnale et glace hivernale. En 2010, avec son frère Mohamed, il officialise ce qui avait toujours été une vocation familiale, fondant Marrakech Eco Tours et le développant jusqu'à en faire l'entreprise qu'elle est aujourd'hui.

Smail parle cinq langues et est agréé par l'Office National Marocain du Tourisme. Il mène personnellement les itinéraires les plus techniquement exigeants — tentatives de sommet du Toubkal, traversée du massif du M'Goun, et traversées du Haut Atlas de plusieurs semaines — et forme chaque guide qui rejoint l'équipe.

Sa philosophie de guide : « Le travail d'un guide n'est pas de montrer la montagne aux gens. C'est de la leur faire ressentir. »`,
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
    role: "Cofondateur et guide culturel",
    photo: null,
    certificationNumber: null,
    yearsGuiding: 30,
    languages: ["Arabe", "Berbère (Tachelhit)", "Français", "Anglais", "Allemand"],
    regions: ["Médina de Marrakech", "Villes impériales", "Contreforts de l'Atlas", "Agadir et Anti-Atlas"],
    specialties: ["Circuits culturels et patrimoniaux", "Villes impériales", "Région d'Agadir", "Routes gastronomiques et des épices"],
    shortBio:
      "Mohamed gère le volet culturel de l'agence — visites de la médina, circuits des villes impériales et base d'Agadir. Sa profonde connaissance de l'histoire et de l'architecture marocaines fait de chaque visite de médina une découverte différente.",
    longBio: `Mohamed Aitidar partage les mêmes racines du Haut Atlas que son frère Smail, mais sa passion, c'est le paysage humain du Maroc — les médinas, les souks, les riads et les traditions qui façonnent la vie ici depuis des siècles.

Après des années à mener des circuits culturels à Marrakech et dans les villes impériales, Mohamed a ouvert la base d'Agadir en 2018, étendant l'activité familiale jusqu'à la côte atlantique et ouvrant l'Anti-Atlas, le Parc National de Souss-Massa et la Vallée du Paradis aux voyageurs basés dans le sud.

Il mène personnellement les circuits culturels et les visites de médina, et forme les guides dans les villes. Sa connaissance de l'architecture marocaine, de la céramique, de l'histoire textile et de la tradition culinaire est encyclopédique — les clients décrivent souvent ses visites de médina comme la meilleure heure passée au Maroc.

Mohamed parle cinq langues et détient une licence officielle de guide délivrée par l'Office National Marocain du Tourisme.`,
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
    role: "Fondateur — Le tout premier guide",
    photo: null,
    certificationNumber: null,
    yearsGuiding: 40,
    languages: ["Arabe", "Berbère (Tachelhit)", "Français"],
    regions: ["Haut Atlas", "Toubkal", "Vallée de l'Ourika", "Aït Benhaddou"],
    specialties: ["Itinéraires pionniers du Haut Atlas", "Savoir berbère traditionnel", "Toubkal"],
    shortBio:
      "Lahsen fut l'un des premiers guides de montagne berbères agréés du Haut Atlas — conduisant des randonneurs à travers le Toubkal et les vallées de l'Atlas bien avant que le Maroc ne dispose d'une industrie touristique formelle. Tout ce que Smail et Mohamed savent, ils l'ont appris de lui.",
    longBio: `Lahsen Aitidar a commencé à guider dans les années 1980, avant même que les sentiers du Toubkal ne figurent dans le moindre guide de voyage. Berbère né dans le Haut Atlas, il fut l'un des premiers de la région à recevoir une licence de guide officielle — une reconnaissance d'un savoir bâti en parcourant chaque itinéraire, à chaque saison, pendant des années.

Il a conduit des groupes de voyageurs à travers l'Atlas à une époque où la logistique était entièrement improvisée : mules louées dans les villages voisins, nourriture trouvée auprès des familles berbères le long du parcours, abri trouvé dans des huttes de bergers en pierre. Il a bâti la confiance de chaque groupe de la seule façon qu'il connaissait : en connaissant le terrain à la perfection et en traitant chaque client avec la même hospitalité qu'il aurait offerte à un membre de sa famille.

Il a transmis cette exigence — et chaque itinéraire — à ses fils Smail et Mohamed. Lahsen est aujourd'hui retiré du guidage actif, mais son savoir continue d'éclairer chaque itinéraire que l'entreprise propose.`,
    routesLed: [],
    isFounder: false,
    isLegacy: true,
  },
];

export function getGuide(id: string): Guide | undefined {
  return GUIDES.find((g) => g.id === id);
}
