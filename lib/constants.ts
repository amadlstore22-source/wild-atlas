export const SITE = {
  name: "Marrakech Eco Tours",
  tagline: "Expert-guided adventures in Morocco's most breathtaking landscapes.",
  url: "https://marrakechecotours.com",
  email: "hello@marrakechecotours.com",
  phone: "+212 600 000 000",
  phoneDial: "+212600000000",
  whatsapp: "212600000000",
  paypal: "wildatlas",
  address: "Marrakech, Morocco",
  country: "MA",
  tourCount: 21,
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
  instagram: "https://instagram.com",
  facebook: "https://facebook.com",
  youtube: "https://youtube.com",
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
