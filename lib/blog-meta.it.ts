import type { BlogRegion, BlogPost } from "./blog";

export const BLOG_REGIONS: { id: BlogRegion; label: string; icon: string; description: string }[] = [
  { id: "root", label: "Marocco", icon: "🇲🇦", description: "La guida di viaggio completa del Marocco" },
  { id: "atlas-mountains", label: "Montagne dell'Atlante", icon: "⛰️", description: "Trekking, villaggi berberi e l'Alto Atlante" },
  { id: "sahara-south", label: "Sahara e Sud", icon: "🏜️", description: "Campi tendati nel deserto, dune e la valle del Draa" },
  { id: "imperial-cities", label: "Città imperiali", icon: "🕌", description: "Marrakech, Fes, Chefchaouen e oltre" },
  { id: "coast-atlantic", label: "Costa atlantica", icon: "🌊", description: "Essaouira, città del surf e la costa atlantica" },
  { id: "agadir-region", label: "Regione di Agadir", icon: "🌴", description: "Spiagge del sud, gole e l'Anti-Atlante" },
];

export const BLOG_CATEGORIES: { id: BlogPost["category"]; label: string; icon: string }[] = [
  { id: "trekking", label: "Trekking", icon: "⛰️" },
  { id: "desert", label: "Deserto", icon: "🏜️" },
  { id: "culture", label: "Cultura", icon: "🕌" },
  { id: "tips", label: "Consigli di viaggio", icon: "🧭" },
  { id: "wildlife", label: "Fauna selvatica", icon: "🦅" },
];
