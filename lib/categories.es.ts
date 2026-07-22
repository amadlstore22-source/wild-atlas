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
    description: "Trekkings de varios días en alta montaña por los paisajes más espectaculares de Marruecos.",
    heroImage: "https://images.unsplash.com/photo-1611859836043-a9177f500a27?w=1600&q=85",
  },
  {
    id: "desert",
    label: "Tours por el Desierto",
    icon: "🏜️",
    description: "Rutas en camello por el Sahara, campamentos en el desierto y las dunas doradas más icónicas de Marruecos.",
    heroImage: "https://images.unsplash.com/photo-1617374128851-c84e37dc9f37?w=1600&q=85",
  },
  {
    id: "day-tours",
    label: "Excursiones de un Día",
    icon: "🌄",
    description: "Escapadas de un día desde Marrakech y Agadir: cascadas, valles, costa. De vuelta por la noche.",
    heroImage: "https://images.unsplash.com/photo-1739464889400-e87ec57f246d?w=1600&q=85",
  },
  {
    id: "cultural",
    label: "Tours Culturales",
    icon: "🕌",
    description: "Medinas, ksour y zocos, recorridos con guías que crecieron en ellos.",
    heroImage: "https://images.unsplash.com/photo-1761062403563-103fb5ee768c?w=1600&q=85",
  },
];
