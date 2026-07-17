export const SITE = {
  name: "Marrakech Eco Tours",
  tagline: "Expert-guided adventures in Morocco's most breathtaking landscapes.",
  url: "https://marrakechecotours.com",
  email: "infoaitidar@gmail.com",
  /** Obfuscated for display so the address is not trivially scraped off the
   *  page. The real address lives in `email` and is used for mailto/schema. */
  emailDisplay: "infoaitidar@···.com",
  phone: "+212 653 936 003",
  phoneDial: "+212653936003",
  whatsapp: "212653936003",
  paypal: "wildatlas",
  address: "Marrakech, Morocco",
  country: "MA",
  /** Marketing-safe catalogue size. Kept deliberately vague ("30+") so it does
   *  not drift every time a tour is added; the exact figure is STATS.tourCount,
   *  computed from TOURS. Server components should prefer STATS. */
  tourCount: "30+",
  /** Years our GUIDES have been leading in the Atlas — a family tradition that
   *  predates the company (founded 2010). Always label it as guiding experience
   *  or heritage, never as company age, or it contradicts foundedYear. */
  guidingHeritageYears: 30,
  clientCount: "1,000+",
  countryCount: "40+",
  foundedYear: 2010,
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

// Sister brand, same team — bike touring & ski touring in the Atlas. Linked in
// the footer as a related service and declared in `sameAs` structured data.
export const SISTER_SITE = {
  name: "Morocco Bike & Ski Tours",
  url: "https://moroccobike-skitours.com",
  blurb: "Road cycling, mountain biking & ski touring in the Atlas",
} as const;

// TripAdvisor listing: "Morocco Tours With Locals" (same team, sister brand).
// Real, verifiable numbers — keep these in sync with the live listing and use
// them everywhere a rating is shown so structured data stays consistent.
export const TRIPADVISOR = {
  url: "https://www.tripadvisor.com/Attraction_Review-g293734-d18455591-Reviews-Morocco_Tours_With_Locals-Marrakech_Marrakech_Safi.html",
  listingName: "Morocco Tours With Locals",
  rating: 5.0,
  reviewCount: 122,
  ranking: 310,
  rankingOutOf: 3979,
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
