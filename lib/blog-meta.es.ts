import type { BlogRegion, BlogPost } from "./blog";

export const BLOG_REGIONS: { id: BlogRegion; label: string; icon: string; description: string }[] = [
  { id: "root", label: "Marruecos", icon: "🇲🇦", description: "La guía de viaje completa de Marruecos" },
  { id: "atlas-mountains", label: "Montañas del Atlas", icon: "⛰️", description: "Trekking, pueblos bereberes y el Alto Atlas" },
  { id: "sahara-south", label: "Sáhara y Sur", icon: "🏜️", description: "Campamentos en el desierto, dunas y el valle del Draa" },
  { id: "imperial-cities", label: "Ciudades imperiales", icon: "🕌", description: "Marrakech, Fez, Chefchaouen y más allá" },
  { id: "coast-atlantic", label: "Costa atlántica", icon: "🌊", description: "Essaouira, pueblos de surf y la costa atlántica" },
  { id: "agadir-region", label: "Región de Agadir", icon: "🌴", description: "Playas del sur, gargantas y el Anti-Atlas" },
];

export const BLOG_CATEGORIES: { id: BlogPost["category"]; label: string; icon: string }[] = [
  { id: "trekking", label: "Trekking", icon: "⛰️" },
  { id: "desert", label: "Desierto", icon: "🏜️" },
  { id: "culture", label: "Cultura", icon: "🕌" },
  { id: "tips", label: "Consejos de viaje", icon: "🧭" },
  { id: "wildlife", label: "Fauna", icon: "🦅" },
];
