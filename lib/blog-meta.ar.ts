import type { BlogRegion, BlogPost } from "./blog";

export const BLOG_REGIONS: { id: BlogRegion; label: string; icon: string; description: string }[] = [
  { id: "root", label: "المغرب", icon: "🇲🇦", description: "الدليل الشامل للسفر إلى المغرب" },
  { id: "atlas-mountains", label: "جبال الأطلس", icon: "⛰️", description: "رحلات المشي، القرى الأمازيغية، والأطلس الكبير" },
  { id: "sahara-south", label: "الصحراء والجنوب", icon: "🏜️", description: "المخيمات الصحراوية والكثبان الرملية ووادي درعة" },
  { id: "imperial-cities", label: "المدن الإمبراطورية", icon: "🕌", description: "مراكش وفاس وشفشاون وما وراءها" },
  { id: "coast-atlantic", label: "الساحل الأطلسي", icon: "🌊", description: "الصويرة ومدن ركوب الأمواج والساحل الأطلسي" },
  { id: "agadir-region", label: "منطقة أݣادير", icon: "🌴", description: "شواطئ الجنوب والأخاديد والأطلس الصغير" },
];

export const BLOG_CATEGORIES: { id: BlogPost["category"]; label: string; icon: string }[] = [
  { id: "trekking", label: "التسلق", icon: "⛰️" },
  { id: "desert", label: "الصحراء", icon: "🏜️" },
  { id: "culture", label: "الثقافة", icon: "🕌" },
  { id: "tips", label: "نصائح السفر", icon: "🧭" },
  { id: "wildlife", label: "الحياة البرية", icon: "🦅" },
];
