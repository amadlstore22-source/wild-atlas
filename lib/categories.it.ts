import type { Category } from "./tours";

export const CATEGORIES: {
  id: Category;
  label: string;
  icon: string;
  description: string;
  heroImage: string;
}[] = [
  {
    id: "trekking",
    label: "Trekking",
    icon: "⛰️",
    description: "Trekking di più giorni in alta quota attraverso i paesaggi montani più spettacolari del Marocco.",
    heroImage: "/gallery/category-hero-atlas-ridge.jpg",
  },
  {
    id: "desert",
    label: "Tour nel Deserto",
    icon: "🏜️",
    description: "Escursioni in cammello nel Sahara, campi tendati nel deserto e le dune dorate più iconiche del Marocco.",
    heroImage: "/gallery/category-hero-medina-doorway.jpg",
  },
  {
    id: "day-tours",
    label: "Gite Giornaliere",
    icon: "🌄",
    description: "Escursioni di un giorno da Marrakech e Agadir: cascate, valli, costa. Rientro in serata.",
    heroImage: "/gallery/category-hero-desert-caravan.jpg",
  },
  {
    id: "cultural",
    label: "Tour Culturali",
    icon: "🕌",
    description: "Medine, ksour e souk, visitati con guide che vi sono cresciute.",
    heroImage: "https://images.unsplash.com/photo-1761062403563-103fb5ee768c?w=1600&q=85",
  },
];
