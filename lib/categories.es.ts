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
    heroImage: "/gallery/category-hero-atlas-ridge.jpg",
  },
  {
    id: "desert",
    label: "Tours por el Desierto",
    icon: "🏜️",
    description: "Rutas en camello por el Sahara, campamentos en el desierto y las dunas doradas más icónicas de Marruecos.",
    heroImage: "/gallery/category-hero-medina-doorway.jpg",
  },
  {
    id: "day-tours",
    label: "Excursiones de un Día",
    icon: "🌄",
    description: "Escapadas de un día desde Marrakech y Agadir: cascadas, valles, costa. De vuelta por la noche.",
    heroImage: "/gallery/category-hero-desert-caravan.jpg",
  },
  {
    id: "cultural",
    label: "Tours Culturales",
    icon: "🕌",
    description: "Medinas, ksour y zocos, recorridos con guías que crecieron en ellos.",
    heroImage: "/gallery/categories-cultural.jpg",
  },
];
