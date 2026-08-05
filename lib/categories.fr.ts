import type { Category } from "./tours";

// Traduction française de CATEGORIES (lib/tours.ts). Seul `label` est
// traduit — id, icon, description et heroImage sont copiés à l'identique
// depuis la source anglaise (description n'est pas dans le périmètre de
// traduction demandé, elle reste ici pour préserver la forme du type).
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
    description: "Des treks de plusieurs jours en haute altitude à travers les paysages montagneux les plus spectaculaires du Maroc.",
    heroImage: "/gallery/category-hero-atlas-ridge.jpg",
  },
  {
    id: "desert",
    label: "Circuits Désert",
    icon: "🏜️",
    description: "Randonnées à dos de chameau dans le Sahara, campements désertiques et les dunes dorées les plus emblématiques du Maroc.",
    heroImage: "/gallery/category-hero-medina-doorway.jpg",
  },
  {
    id: "day-tours",
    label: "Excursions d'une journée",
    icon: "🌄",
    description: "Escapades d'une journée depuis Marrakech et Agadir : cascades, vallées, littoral. Retour le soir même.",
    heroImage: "/gallery/category-hero-desert-caravan.jpg",
  },
  {
    id: "cultural",
    label: "Circuits Culturels",
    icon: "🕌",
    description: "Médinas, ksour et souks, parcourus avec des guides qui y ont grandi.",
    heroImage: "https://images.unsplash.com/photo-1761062403563-103fb5ee768c?w=1600&q=85",
  },
];
