export const SITE = {
  name: "Marrakech Eco Tours",
  tagline: "Expert-guided adventures in Morocco's most breathtaking landscapes.",
  url: "https://marrakechecotours.com",
  email: "hello@marrakechecotours.com",
  phone: "+212 653 936 003",
  phoneDial: "+212653936003",
  whatsapp: "212653936003",
  paypal: "wildatlas",
  address: "Marrakech, Morocco",
  country: "MA",
  tourCount: "30+",
  experienceYears: 10,
  clientCount: "1,000+",
  countryCount: "40+",
  foundedYear: 2012,
  depositDays: 14,
  responseHours: 24,
  // Optional full-screen hero video (mp4/webm). Leave empty to use the
  // Ken Burns still image instead — the hero falls back automatically.
  heroVideo: "",
  heroPoster: "https://images.unsplash.com/photo-1560789590-ee4cc7125967?w=1920&q=85",
} as const;

export const SOCIAL = {
  instagram: "https://instagram.com/met_morocco",
  facebook: "https://facebook.com/marrakechecotours",
  youtube: "https://youtube.com/@marrakechecotours",
} as const;

export const WHATSAPP_MESSAGES = {
  general: "Hello! I'm interested in booking a tour with Marrakech Eco Tours.",
  custom: "Hello! I'd like to plan a custom Morocco adventure. Could you help me?",
  tour: (tourName: string) =>
    `Hello! I'm interested in booking the "${tourName}" tour. Could you send me more details and availability?`,
} as const;

export function whatsappUrl(message: string) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}
