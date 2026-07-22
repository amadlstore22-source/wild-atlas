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
    heroImage: "https://images.unsplash.com/photo-1611859836043-a9177f500a27?w=1600&q=85",
  },
  {
    id: "desert",
    label: "Wüstentouren",
    icon: "🏜️",
    description: "Kamelritte durch die Sahara, Wüstencamps und Marokkos berühmteste goldene Dünenlandschaften.",
    heroImage: "https://images.unsplash.com/photo-1617374128851-c84e37dc9f37?w=1600&q=85",
  },
  {
    id: "day-tours",
    label: "Tagesausflüge",
    icon: "🌄",
    description: "Tagesausflüge ab Marrakesch und Agadir: Wasserfälle, Täler, Küste. Rückkehr am Abend.",
    heroImage: "https://images.unsplash.com/photo-1739464889400-e87ec57f246d?w=1600&q=85",
  },
  {
    id: "cultural",
    label: "Kulturelle Touren",
    icon: "🕌",
    description: "Medinas, Ksours und Souks, erkundet mit Guides, die dort aufgewachsen sind.",
    heroImage: "https://images.unsplash.com/photo-1761062403563-103fb5ee768c?w=1600&q=85",
  },
];
