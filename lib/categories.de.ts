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
    label: "Trekkingtouren",
    icon: "⛰️",
    description: "Mehrtägige Hochgebirgstrekkings durch Marokkos eindrucksvollste Bergwelt.",
    heroImage: "/gallery/category-hero-atlas-ridge.jpg",
  },
  {
    id: "desert",
    label: "Wüstentouren",
    icon: "🏜️",
    description: "Kamelritte durch die Sahara, Wüstencamps und Marokkos berühmteste goldene Dünenlandschaften.",
    heroImage: "/gallery/category-hero-medina-doorway.jpg",
  },
  {
    id: "day-tours",
    label: "Tagesausflüge",
    icon: "🌄",
    description: "Tagesausflüge ab Marrakesch und Agadir: Wasserfälle, Täler, Küste. Rückkehr am Abend.",
    heroImage: "/gallery/category-hero-desert-caravan.jpg",
  },
  {
    id: "cultural",
    label: "Kulturelle Touren",
    icon: "🕌",
    description: "Medinas, Ksours und Souks, erkundet mit Guides, die dort aufgewachsen sind.",
    heroImage: "/gallery/categories-cultural.jpg",
  },
];
