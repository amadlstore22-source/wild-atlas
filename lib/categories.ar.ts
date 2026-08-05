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
    label: "التسلق",
    icon: "⛰️",
    description: "رحلات تسلق لعدة أيام في المرتفعات الشاهقة عبر أكثر التضاريس الجبلية إثارة في المغرب.",
    heroImage: "/gallery/category-hero-atlas-ridge.jpg",
  },
  {
    id: "desert",
    label: "الجولات الصحراوية",
    icon: "🏜️",
    description: "رحلات بالجمال في الصحراء، ومخيمات صحراوية، وأشهر الكثبان الذهبية في المغرب.",
    heroImage: "/gallery/category-hero-medina-doorway.jpg",
  },
  {
    id: "day-tours",
    label: "جولات ليوم واحد",
    icon: "🌄",
    description: "رحلات ليوم واحد من مراكش وأݣادير: شلالات وأودية وسواحل، مع العودة في المساء.",
    heroImage: "/gallery/category-hero-desert-caravan.jpg",
  },
  {
    id: "cultural",
    label: "الجولات الثقافية",
    icon: "🕌",
    description: "مدن عتيقة وقصور وأسواق تقليدية، تُكتشف برفقة مرشدين نشأوا فيها.",
    heroImage: "https://images.unsplash.com/photo-1761062403563-103fb5ee768c?w=1600&q=85",
  },
];
