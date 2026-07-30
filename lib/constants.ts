export const SITE = {
  name: "Marrakech Eco Tours",
  tagline: "Expert-guided adventures in Morocco's most breathtaking landscapes.",
  url: "https://marrakechecotours.com",
  /** Public-facing / data-controller address shown on the site, in mailto links,
   *  and in schema. Branded, professional, and the address GDPR / Law 09-08
   *  requests are directed to. */
  email: "info@marrakechecotours.com",
  /** Where the contact + newsletter forms actually DELIVER. Kept separate from
   *  `email` on purpose: info@ only receives once Cloudflare Email Routing is
   *  live, so until then forms deliver to a verified Gmail that works today.
   *  Point this at info@marrakechecotours.com once routing is confirmed. */
  emailInbox: "marrakechecotours@gmail.com",
  /** Obfuscated for display so the address is not trivially scraped off the
   *  page. The real address lives in `email` and is used for mailto/schema. */
  emailDisplay: "info@···.com",
  phone: "+212 653 936 003",
  phoneDial: "+212653936003",
  whatsapp: "212653936003",
  /** PayPal.Me handle that RECEIVES deposits. Customers see this name at the
   *  moment they pay, so it must match the business.
   *
   *  EMPTY ON PURPOSE — do not put a guess here. The old "wildatlas" handle was
   *  removed because paypal.me/wildatlas resolves (HTTP 200) as an unclaimed
   *  namespace: anyone who registered it would have received real customer
   *  deposits, on our domain, with nothing to warn the payer. A wrong handle on
   *  a payment link is worse than no link at all.
   *
   *  While this is empty the deposit button is replaced by a "request a payment
   *  link" prompt (see BookingSidebar). Set the real handle and the button
   *  returns automatically — no other change needed. */
  paypal: "",
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
  // Imlil / Tachdirt in the High Atlas — terraced valley below the snow-capped
  // Toubkal peaks, our flagship trekking base. Pexels (Mohamed Khettouch),
  // verified subject and landscape orientation.
  //
  // w=1920, not 2400: this is the SOURCE next/image fetches before transcoding,
  // and the largest bucket we now generate is 1920 (see deviceSizes in
  // next.config.ts). Asking Pexels for more pixels than we ever emit just adds
  // download and transcode time to the first uncached request — which field data
  // identified as the homepage's LCP bottleneck.
  heroPoster:
    "https://images.pexels.com/photos/37538532/pexels-photo-37538532.jpeg?auto=compress&cs=tinysrgb&w=1920",
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
  // Direct "write a review" link (skips straight to the form).
  writeReviewUrl:
    "https://www.tripadvisor.com/UserReviewEdit-g293734-d18455591-Morocco_Tours_With_Locals-Marrakech_Marrakech_Safi.html",
  listingName: "Morocco Tours With Locals",
  rating: 5.0,
  reviewCount: 122,
  ranking: 310,
  rankingOutOf: 3979,
} as const;

// Google Business Profile review link. To activate the Google button on the
// /review page, replace PLACE_ID with the real Place ID (find it via Google's
// Place ID Finder) — the URL below opens the "write a review" dialog directly.
// Leave empty ("") to hide the Google button until you have it.
export const GOOGLE_REVIEW_URL = "";

export const WHATSAPP_MESSAGES = {
  general: "Hello! I'm interested in booking a tour with Marrakech Eco Tours.",
  custom: "Hello! I'd like to plan a custom Morocco adventure. Could you help me?",
  tour: (tourName: string) =>
    `Hello! I'm interested in booking the "${tourName}" tour. Could you send me more details and availability?`,
} as const;

export function whatsappUrl(message: string) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}
