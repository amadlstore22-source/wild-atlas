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
    heroImage: "https://images.unsplash.com/photo-1611859836043-a9177f500a27?w=1600&q=85",
  },
  {
    id: "desert",
    label: "Circuits Désert",
    icon: "🏜️",
    description: "Randonnées à dos de chameau dans le Sahara, campements désertiques et les dunes dorées les plus emblématiques du Maroc.",
    heroImage: "https://images.unsplash.com/photo-1617374128851-c84e37dc9f37?w=1600&q=85",
  },
  {
    id: "day-tours",
    label: "Excursions d'une journée",
    icon: "🌄",
    description: "Escapades d'une journée depuis Marrakech et Agadir : cascades, vallées, littoral. Retour le soir même.",
    heroImage: "https://images.unsplash.com/photo-1739464889400-e87ec57f246d?w=1600&q=85",
  },
  {
    id: "cultural",
    label: "Circuits Culturels",
    icon: "🕌",
    description: "Médinas, ksour et souks, parcourus avec des guides qui y ont grandi.",
    heroImage: "https://images.unsplash.com/photo-1761062403563-103fb5ee768c?w=1600&q=85",
  },
];
