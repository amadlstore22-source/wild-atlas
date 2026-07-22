import type { BlogRegion, BlogPost } from "./blog";

export const BLOG_REGIONS: { id: BlogRegion; label: string; icon: string; description: string }[] = [
  { id: "root", label: "Marokko", icon: "🇲🇦", description: "Der vollständige Marokko-Reiseführer" },
  { id: "atlas-mountains", label: "Atlasgebirge", icon: "⛰️", description: "Trekking, Berberdörfer und der Hohe Atlas" },
  { id: "sahara-south", label: "Sahara und Süden", icon: "🏜️", description: "Wüstencamps, Dünen und das Draa-Tal" },
  { id: "imperial-cities", label: "Kaiserstädte", icon: "🕌", description: "Marrakesch, Fès, Chefchaouen und mehr" },
  { id: "coast-atlantic", label: "Atlantikküste", icon: "🌊", description: "Essaouira, Surfstädte und die Atlantikküste" },
  { id: "agadir-region", label: "Region Agadir", icon: "🌴", description: "Südliche Strände, Schluchten und der Anti-Atlas" },
];

export const BLOG_CATEGORIES: { id: BlogPost["category"]; label: string; icon: string }[] = [
  { id: "trekking", label: "Trekking", icon: "⛰️" },
  { id: "desert", label: "Wüste", icon: "🏜️" },
  { id: "culture", label: "Kultur", icon: "🕌" },
  { id: "tips", label: "Reisetipps", icon: "🧭" },
  { id: "wildlife", label: "Tierwelt", icon: "🦅" },
];
