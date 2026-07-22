import type { BlogRegion, BlogPost } from "./blog";

export const BLOG_REGIONS: { id: BlogRegion; label: string; icon: string; description: string }[] = [
  { id: "root", label: "Maroc", icon: "🇲🇦", description: "Le guide de voyage complet du Maroc" },
  { id: "atlas-mountains", label: "Montagnes de l'Atlas", icon: "⛰️", description: "Trekking, villages berbères et le Haut Atlas" },
  { id: "sahara-south", label: "Sahara et Sud", icon: "🏜️", description: "Campements désertiques, dunes et la vallée du Drâa" },
  { id: "imperial-cities", label: "Villes impériales", icon: "🕌", description: "Marrakech, Fès, Chefchaouen et au-delà" },
  { id: "coast-atlantic", label: "Côte atlantique", icon: "🌊", description: "Essaouira, villes de surf et le littoral atlantique" },
  { id: "agadir-region", label: "Région d'Agadir", icon: "🌴", description: "Plages du sud, gorges et l'Anti-Atlas" },
];

export const BLOG_CATEGORIES: { id: BlogPost["category"]; label: string; icon: string }[] = [
  { id: "trekking", label: "Trekking", icon: "⛰️" },
  { id: "desert", label: "Désert", icon: "🏜️" },
  { id: "culture", label: "Culture", icon: "🕌" },
  { id: "tips", label: "Conseils de voyage", icon: "🧭" },
  { id: "wildlife", label: "Faune", icon: "🦅" },
];
