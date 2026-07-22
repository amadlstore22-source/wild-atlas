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
    heroImage: "https://images.unsplash.com/photo-1611859836043-a9177f500a27?w=1600&q=85",
  },
  {
    id: "desert",
    label: "Tour nel Deserto",
    icon: "🏜️",
    description: "Escursioni in cammello nel Sahara, campi tendati nel deserto e le dune dorate più iconiche del Marocco.",
    heroImage: "https://images.unsplash.com/photo-1617374128851-c84e37dc9f37?w=1600&q=85",
  },
  {
    id: "day-tours",
    label: "Gite Giornaliere",
    icon: "🌄",
    description: "Escursioni di un giorno da Marrakech e Agadir: cascate, valli, costa. Rientro in serata.",
    heroImage: "https://images.unsplash.com/photo-1739464889400-e87ec57f246d?w=1600&q=85",
  },
  {
    id: "cultural",
    label: "Tour Culturali",
    icon: "🕌",
    description: "Medine, ksour e souk, visitati con guide che vi sono cresciute.",
    heroImage: "https://images.unsplash.com/photo-1761062403563-103fb5ee768c?w=1600&q=85",
  },
];
