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
  /** Shown in full since 2026-10-07 (owner's request). It used to read
   *  "info@···.com" to deter scrapers, but the full address was already in
   *  every mailto link and in the schema, so the mask hid it from people only. */
  emailDisplay: "info@marrakechecotours.com",
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
  /** Where the business is. The owner placed it by a Maps pin (2026-09-28) on
   *  the RP2030 road in Taourirt n'Ait Mizane, Imlil — the village the family
   *  guiding tradition comes from (see lib/guides.ts) — and said the office is
   *  "close to" it. Reverse-geocoded with OpenStreetMap Nominatim. There is no
   *  house number, so none is claimed. Tours still DEPART from Marrakech and
   *  Agadir; this is where the company is, not where trips start. */
  address: "Imlil 42152, Al Haouz, Morocco",
  addressShort: "Imlil, High Atlas, Morocco",
  postalAddress: {
    streetAddress: "RP2030",
    addressLocality: "Imlil",
    addressRegion: "Al Haouz, Marrakech-Safi",
    postalCode: "42152",
    addressCountry: "MA",
  },
  /** The owner's pin, 5 decimals as Google's LocalBusiness docs ask. */
  geo: { latitude: 31.13583, longitude: -7.91962 },
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
  /** Owner, 2026-09-28: new enquiries are answered "in less than an hour".
   *  The wording lives in the dictionaries ("within the hour, 8:00–20:00
   *  Morocco time", matching openingHoursSpecification) because "{hours}
   *  hours" cannot say one hour in six languages. Kept as data for any code
   *  that needs the number; __tests__/lib/reply-promise.test.ts keeps the two
   *  in step. */
  responseHours: 1,
  // Optional full-screen hero video (mp4/webm). Leave empty to use the
  // Ken Burns still image instead — the hero falls back automatically.
  heroVideo: "",
  // Imlil / Tachdirt in the High Atlas — terraced valley below the snow-capped
  // Toubkal peaks, our flagship trekking base. Pexels (Mohamed Khettouch),
  // used under the Pexels licence, which permits self-hosting.
  //
  // Self-hosted, NOT hotlinked from Pexels. next/image proxies a remote src
  // through /_next/image on our own domain, so the SERVER fetches the original
  // before it can transcode — an extra round trip in front of first paint on
  // every cold cache. Field data measured that as the homepage LCP bottleneck
  // (6.8s mobile). Serving from /public removes the hop entirely.
  //
  // Fetched at w=2400 by scripts/fetch-hero-images.ps1 and downsized per
  // breakpoint at build time; the largest bucket we emit is 1920 (deviceSizes
  // in next.config.ts), so visitors never receive the full-size file.
  heroPoster: "/gallery/imlil-valley-high-atlas-hero.jpg",
} as const;

export const SOCIAL = {
  instagram: "https://instagram.com/met_morocco",
  facebook: "https://facebook.com/marrakechecotours",
  youtube: "https://youtube.com/@marrakechecotours",
} as const;

/**
 * Sister brand — same team, different sport. Shown in the footer as a
 * related service.
 *
 * UPDATED 2026-09-21 from "Morocco Bike & Ski Tours"
 * (moroccobike-skitours.com) to Atlas Pedals. The bike side was rebuilt
 * and rebranded; the old domain still resolves, which is precisely why
 * this needed changing rather than leaving alone — a link that returns
 * 200 looks correct forever while quietly sending visitors to a site the
 * business no longer runs.
 *
 * NOT IN `sameAs`. The old entry was, and that was defensible when both
 * brands were one operation under one trading name. schema.org `sameAs`
 * asserts "this is another official page of THIS organisation", and
 * Atlas Pedals is a separate brand with its own domain, its own Search
 * Console property and its own structured data declaring its own
 * identity. Claiming it here would tell Google two different
 * organisations are one, which risks the entity resolution of both.
 * A footer link is the honest signal and carries the referral just as
 * well.
 */
export const SISTER_SITE = {
  name: "Atlas Pedals",
  url: "https://atlaspedals.com",
  blurb: "Guided mountain bike, e-bike and gravel tours in the High Atlas",
} as const;

// TripAdvisor listing. Renamed by the owner in Aug 2026 from "Morocco Tours
// With Locals" to match this site's brand — same listing, same reviews, same
// id (d18455591), so the rating and count below are unaffected.
//
// `listingName` now matches SITE.name, which is why TripAdvisorBadge no longer
// prints an "as <other name>" line: that disclosure existed only because the
// listing was under a different trading name, and repeating the brand back to
// the reader would be noise. Restore it if the names ever diverge again — see
// the badge component, which decides this by comparison rather than by a flag.
//
// TripAdvisor URLs resolve on the numeric id, not the slug, so the old
// Morocco_Tours_With_Locals links still work; these use the current slug so
// nothing depends on a redirect.
//
// Real, verifiable numbers — keep these in sync with the live listing and use
// them everywhere a rating is shown so structured data stays consistent.
export const TRIPADVISOR = {
  url: "https://www.tripadvisor.com/Attraction_Review-g293734-d18455591-Reviews-Marrakech_Eco_Tours-Marrakech_Marrakech_Safi.html",
  // Direct "write a review" link (skips straight to the form).
  writeReviewUrl:
    "https://www.tripadvisor.com/UserReviewEdit-g293734-d18455591-Marrakech_Eco_Tours-Marrakech_Marrakech_Safi.html",
  listingName: "Marrakech Eco Tours",
  rating: 5.0,
  reviewCount: 122,
  ranking: 310,
  rankingOutOf: 3979,
} as const;

// Trustpilot profile, claimed by the owner 2026-09-29. Plain links only: the
// free plan's one TrustBox is a "review us" button, which a link does without
// loading Trustpilot's script. Trustpilot's guidelines (v7.2): invite EVERY
// guest the same way at the same point, no incentives, no staff or family.
export const TRUSTPILOT = {
  url: "https://www.trustpilot.com/review/marrakechecotours.com",
  writeReviewUrl: "https://www.trustpilot.com/evaluate/marrakechecotours.com",
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
