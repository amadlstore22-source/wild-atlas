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
    heroImage: "https://images.unsplash.com/photo-1611859836043-a9177f500a27?w=1600&q=85",
  },
  {
    id: "desert",
    label: "الجولات الصحراوية",
    icon: "🏜️",
    description: "رحلات بالجمال في الصحراء، ومخيمات صحراوية، وأشهر الكثبان الذهبية في المغرب.",
    heroImage: "https://images.unsplash.com/photo-1617374128851-c84e37dc9f37?w=1600&q=85",
  },
  {
    id: "day-tours",
    label: "جولات ليوم واحد",
    icon: "🌄",
    description: "رحلات ليوم واحد من مراكش وأݣادير: شلالات وأودية وسواحل، مع العودة في المساء.",
    heroImage: "https://images.unsplash.com/photo-1739464889400-e87ec57f246d?w=1600&q=85",
  },
  {
    id: "cultural",
    label: "الجولات الثقافية",
    icon: "🕌",
    description: "مدن عتيقة وقصور وأسواق تقليدية، تُكتشف برفقة مرشدين نشأوا فيها.",
    heroImage: "https://images.unsplash.com/photo-1761062403563-103fb5ee768c?w=1600&q=85",
  },
];
