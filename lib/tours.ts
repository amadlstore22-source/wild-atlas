import type { Faq } from "@/lib/seo/types";

export type Difficulty = "easy" | "moderate" | "challenging" | "expert";
export type Category =
  | "trekking"
  | "hiking"
  | "desert"
  | "cultural"
  | "day-tours";

export type Origin = "marrakech" | "agadir";

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  /** Key geographic stop for this day, plotted on the tour map and connected
   *  into the route line. Optional: days without a distinct location (e.g. a
   *  summit-and-return day) can omit it, and tours with no stops fall back to
   *  the single meetingPoint marker. Coordinates must be real, verified places. */
  stop?: { name: string; lat: number; lng: number };
  /** Real per-day logistics, rendered as chips under the day description. All
   *  optional so a day only shows what actually applies — the itinerary no
   *  longer prints a blanket "meals/transport/accommodation included" on every
   *  day regardless of truth. `meals` is a compact code like "B,L,D" / "B,D";
   *  `stay` is where you sleep that night (omit on the final day). `walking`,
   *  `driving`, `distance`, and `ascent` are short human strings ("6–7 h",
   *  "≈250 km", "+1,000 m"). */
  meals?: string;
  stay?: string;
  walking?: string;
  driving?: string;
  distance?: string;
  ascent?: string;
}

export interface Tour {
  id: string;
  /** Stable identity across every locale. NEVER translate this — it is the key
   *  the locale merge joins on, so a translated `slug` in a locale file silently
   *  matches nothing and that tour falls back to English. To localise the URL,
   *  set `localizedSlug` in the locale file and leave this alone. */
  slug: string;
  /** Optional locale-specific URL segment, set only in lib/tours.<locale>.ts.
   *  When present the tour is served at /<lang>/tours/<localizedSlug> and the
   *  English URL 308s to it (see proxy.ts). Both resolve, so existing backlinks
   *  and inline links inside translated copy keep working. */
  localizedSlug?: string;
  title: string;
  category: Category;
  origin: Origin;
  difficulty: Difficulty;
  duration: string;
  groupSize: string;
  /** Private = your party only, guide/vehicle exclusive to you. Shared = you may
   *  join other travellers. Drives the card badge and the group-size pricing model
   *  (private tours price per booking; shared price per person). Defaults to
   *  "shared" when omitted so existing behaviour is unchanged. */
  tourType?: "private" | "shared";
  /** Optional per-person price tiers: the price each traveller pays once the group
   *  reaches `minPeople`. Larger groups share fixed costs (guide, vehicle), so the
   *  per-person price drops. Tiers must be sorted ascending by minPeople and start
   *  at 1. When omitted, `groupPriceTiers()` derives sensible tiers from `price`. */
  groupPricing?: { minPeople: number; price: number }[];
  /** Smallest bookable group. Tiers below this are dropped, so the page never
   *  quotes a group size that cannot actually be booked. Omit for tours that
   *  take a single traveller. */
  minPeople?: number;
  /** @deprecated Placeholder figures, not a real review corpus — the sum across
   *  tours (~2,276) far exceeds our actual 122 TripAdvisor reviews. Not rendered
   *  and not emitted as schema. Delete once real per-tour reviews exist, or
   *  repopulate from a verified source and reinstate AggregateRating. */
  reviewCount: number;
  /** @deprecated See reviewCount. Display uses TRIPADVISOR.rating instead. */
  rating: number;
  price: number;
  priceMax?: number;
  depositAmount: number;
  heroImage: string;
  gallery: string[];
  shortDescription: string;
  description: string;
  highlights: string[];
  includes: string[];
  excludes: string[];
  itinerary: ItineraryDay[];
  meetingPoint: { lat: number; lng: number; name: string };
  featured: boolean;
  isDayTour?: boolean;
  seoTitle?: string;
  seoDescription?: string;
  /** Hand-written Q&A. Renders visibly AND as FAQPage schema — never one
   *  without the other, which is why this is optional rather than synthesised.
   *  Google treats schema with no visible counterpart as a violation. */
  faq?: Faq[];
  /** Optional curated list of blog-post slugs to surface in the tour page's
   *  "Related Guides" section (RelatedGuides). When omitted, guides are matched
   *  automatically by region + category. Flows blog topical authority into the
   *  money page and answers pre-booking questions. */
  relatedPosts?: string[];
}

export const TOURS: Tour[] = [
  // ─────────────────────────────────────────────
  // MARRAKECH TOURS
  // ─────────────────────────────────────────────
  {
    id: "1",
    slug: "toubkal-summit-trek-4day",
    relatedPosts: ["toubkal-4-day-trek-cost", "toubkal-2-day-vs-4-day-which-trek", "how-hard-is-toubkal-difficulty-guide", "what-to-pack-high-atlas-trek-morocco"],
    title: "Marrakech to Toubkal Summit — 4-Day Trek",
    category: "trekking",
    origin: "marrakech",
    difficulty: "challenging",
    duration: "4 days / 3 nights",
    groupSize: "2–10 people",
    tourType: "private",
    reviewCount: 48,
    rating: 4.9,
    // Real ladder, not the derived curve: a solo trekker pays for the whole
    // private guide and vehicle, so solo is ~2x the two-person rate rather
    // than the shallow premium groupPriceTiers() would assume.
    // EUR 650 / 360 / 320 / 290 / 270 / 260 at the rate in lib/currency-core.ts.
    groupPricing: [
      { minPeople: 1, price: 750 },
      { minPeople: 2, price: 415 },
      { minPeople: 3, price: 369 },
      { minPeople: 4, price: 335 },
      { minPeople: 5, price: 311 },
      { minPeople: 6, price: 300 },
    ],
    price: 750,
    depositAmount: 165,
    // Real photographs from our own Toubkal departures (in public/gallery),
    // ordered to follow the trek: summit celebration, the Imlil valley start,
    // the ascent, and the summit ridge.
    heroImage: "/gallery/toubkal-summit-guide-thumbs-up.jpg",
    gallery: [
      "/gallery/toubkal-summit-guide-thumbs-up.jpg",
      "/gallery/toubkal-group-snow-ascent.jpg",
      "/gallery/toubkal-predawn-summit-start-crampons.jpg",
      "/gallery/toubkal-summit-ridge-climbers.jpg",
      "/gallery/toubkal-summit-panorama-high-atlas.jpg",
          "/gallery/toubkal-national-park-entrance-sign.jpg",
      "/gallery/toubkal-trail-turquoise-pool-waterfall.jpg",
      "/gallery/toubkal-national-park-peak-clouds.jpg",
],
    shortDescription:
      "Conquer Jbel Toubkal (4,167 m) — the roof of North Africa — through Berber villages and high alpine valleys.",
    description:
      "The Toubkal Summit Trek is the definitive High Atlas adventure. Cross ancient mule paths, sleep in mountain refuges, and stand on the highest point in North Africa as sunrise spreads across Morocco. A life-changing four days that requires fitness but no technical climbing.",
    highlights: [
      "Summit Jbel Toubkal at 4,167 m — highest peak in North Africa",
      "Sleep in traditional Berber mountain refuges at 3,207 m",
      "Start in the trailhead village of Imlil, deep in the Atlas",
      "Panoramic views spanning Morocco and Algeria",
    ],
    includes: [
      "Professional licensed mountain guide",
      "3 nights mountain refuge accommodation",
      "All meals during the trek",
      "Mule porter for group gear",
      "National park entrance fees",
      "Round-trip transfer from Marrakech",
    ],
    excludes: [
      "Travel insurance (mandatory)",
      "Personal trekking equipment",
      "Tips for guide and porter",
    ],
    itinerary: [
      {
        day: 1,
        meals: "D",
        stay: "Guesthouse",
        walking: "1–2 h",
        driving: "1.5 h",
        stop: { name: "Imlil", lat: 31.1369, lng: -7.9169 },
        title: "Marrakech → Imlil (1,740 m)",
        description:
          "Transfer from Marrakech to Imlil (1h30), the trailhead village for Toubkal. Settle in, meet your guide, and take a short acclimatisation walk through the terraced Berber fields. Welcome dinner.",
      },
      {
        day: 2,
        meals: "B,L,D",
        stay: "Mountain refuge",
        walking: "5 h",
        distance: "≈11 km",
        ascent: "+1,470 m",
        stop: { name: "Toubkal Refuge", lat: 31.0782, lng: -7.9192 },
        title: "Imlil → Toubkal Refuge (3,207 m)",
        description:
          "Trek up the Mizane Valley past the Sidi Chamharouch shrine to the mountain refuge. Afternoon acclimatisation walk above camp. Early sleep before summit day.",
      },
      {
        day: 3,
        meals: "B,L,D",
        stay: "Mountain refuge",
        walking: "6–7 h",
        ascent: "+960 m / −960 m",
        stop: { name: "Jbel Toubkal Summit", lat: 31.0606, lng: -7.9153 },
        title: "Summit Day — Toubkal (4,167 m)",
        description:
          "Pre-dawn start at 5:00 am. Steep ascent via the South Cirque scree. Summit at sunrise. Descent back to refuge for celebratory dinner.",
      },
      {
        day: 4,
        meals: "B",
        walking: "5–6 h",
        driving: "1.5 h",
        stop: { name: "Imlil", lat: 31.1369, lng: -7.9169 },
        title: "Refuge → Imlil → Marrakech",
        description:
          "Morning descent through wildflower meadows. Transfer back to Marrakech. Tour ends mid-afternoon.",
      },
    ],
    faq: [
      { q: "Is the 4-day trek better than the 2-day for a first Toubkal attempt?", a: "For most people, yes. The extra days are spent acclimatising rather than covering more ground, and altitude — not fitness — is the usual reason people struggle near the summit. If you have never been near 4,000 metres, this is the version to book." },
      { q: "What is the accommodation like on this trek?", a: "A mix of village guesthouse and the Toubkal Refuge at 3,207 metres. The refuge is a working mountain hut: shared dormitory rooms, bunks with mattresses and blankets, communal meals and cold nights. Bring a sleeping bag liner, head torch and earplugs." },
      { q: "Do I need to carry my own bag?", a: "Only a daypack with water, layers and a camera. Mules carry the main baggage between stops, which is what makes consecutive big walking days manageable for people who have not trekked at altitude before." },
      { q: "What time does summit day start?", a: "Before dawn. The summit push from the refuge takes around three hours, and an early start means reaching the top for sunrise and getting down before the afternoon weather builds. It is the coldest part of the day, so the warm layer you have been carrying finally earns its place." },
    ],
    meetingPoint: { lat: 31.1369, lng: -7.9169, name: "Imlil Village, Atlas Mountains" },
    seoTitle: "Toubkal Summit Trek 4 Days — Climb North Africa's Highest Peak | Marrakech Eco Tours",
    seoDescription: "Conquer Jbel Toubkal (4,167 m) with a licensed Berber guide. 4-day summit trek from Marrakech — refuges, all meals, and round-trip transfer included. From $750.",
    featured: true,
  },
  {
    id: "2",
    slug: "sahara-3day-marrakech",
    relatedPosts: ["3-day-sahara-tour-cost-marrakech", "agafay-vs-merzouga-vs-zagora", "what-to-pack-desert-tour-morocco", "sahara-desert-morocco-what-to-expect"],
    title: "Marrakech to Merzouga — 3-Day Desert Tour",
    category: "desert",
    origin: "marrakech",
    difficulty: "easy",
    duration: "3 days / 2 nights",
    groupSize: "2–12 people",
    tourType: "private",
    reviewCount: 124,
    rating: 4.8,
    // Stored in USD (see lib/currency-core.ts). Benchmarked against
    // marrakech-desert-trips.com's published 3-day Merzouga table
    // (verified Aug 2026) and set 10% under it at every bracket.
    price: 1230,
    depositAmount: 271,
    // Priced per exact group size, mirroring how these trips are quoted.
    // NOT flat brackets: flattening 2–3 and 4–5 to one rate made four
    // people total less than three (€1,172 vs €1,176), so a trio was
    // better off booking a phantom fourth. Per-size tiers never invert.
    // The 1→2 drop is steep because the vehicle and driver-guide cost the
    // same either way; only camp, meals and fees scale per head.
    groupPricing: [
      { minPeople: 1, price: 1230 },
      { minPeople: 2, price: 565 },
      { minPeople: 3, price: 454 },
      { minPeople: 4, price: 388 },
      { minPeople: 5, price: 338 },
      { minPeople: 6, price: 292 },
      { minPeople: 7, price: 269 },
      { minPeople: 10, price: 243 },
      { minPeople: 14, price: 226 },
    ],
    heroImage:
      "/gallery/blog-hero-sahara-dunes-golden.jpg",
    gallery: [
      "/gallery/category-hero-medina-doorway.jpg",
      "/gallery/blog-what-to-pack-desert-tour-morocco.jpg",
      "/gallery/blog-how-much-does-a-morocco-desert-tour-cost.jpg",
      "/gallery/blog-marrakech-to-fes-road-trip-guide.jpg",
    ],
    shortDescription:
      "Ride camels into the golden Erg Chebbi dunes and sleep under a million stars in a traditional Berber desert camp.",
    description:
      "Three days from Marrakech to the Sahara and back, on a loop rather than an out-and-back. Cross the High Atlas by the Tizi n'Tichka, stop at the UNESCO Ksar of Aït Ben Haddou, sleep in the Dades Gorges, walk the Todra canyon, then ride camels into Erg Chebbi as the sun melts into the dunes. The return runs west through Alnif and Tazarine — fossil country, and far quieter than the road you came in on.",
    highlights: [
      "Camel trek into Erg Chebbi dunes at sunset",
      "Overnight in a traditional Berber desert camp",
      "Aït Ben Haddou UNESCO World Heritage Ksar",
      "Dades Gorges and the Todra canyon on the way out",
      "A different road home via Alnif and Tazarine — no backtracking",
    ],
    includes: [
      "Private 4x4 transport throughout",
      "Sunset camel ride",
      "1 night desert camp (dinner + breakfast)",
      "1 night hotel or kasbah in the Dades Gorges (dinner + breakfast)",
      "Experienced desert guide",
    ],
    excludes: [
      "Lunches",
      "Personal expenses and tips",
    ],
    itinerary: [
      {
        day: 1,
        meals: "D",
        stay: "Hotel / Kasbah",
        driving: "≈7 h",
        distance: "≈420 km",
        stop: { name: "Dades Gorges", lat: 31.5203, lng: -5.9906 },
        title: "Marrakech → Aït Ben Haddou → Dades Gorges",
        description:
          "Depart Marrakech at 7:00 am and cross the Tizi n'Tichka pass (2,260 m) through the High Atlas. Visit the UNESCO Ksar of Aït Ben Haddou, then continue past Ouarzazate and along the Valley of a Thousand Kasbahs. Night in the Dades Gorges.",
      },
      {
        day: 2,
        meals: "B,D",
        stay: "Desert camp",
        driving: "≈5 h",
        distance: "≈300 km",
        stop: { name: "Erg Chebbi, Merzouga", lat: 31.1, lng: -3.98 },
        title: "Dades → Todra Gorge → Erfoud → Erg Chebbi",
        description:
          "Morning in the Todra Gorge, where the canyon walls narrow to 10 m and rise 300 m. Continue via Erfoud to Merzouga, arriving mid-afternoon. Camel trek into the Erg Chebbi dunes at sunset, then dinner and Gnawa drumming at camp.",
      },
      {
        day: 3,
        meals: "B",
        driving: "≈9 h",
        distance: "≈560 km",
        stop: { name: "Marrakech", lat: 31.6295, lng: -7.9811 },
        title: "Erg Chebbi → Alnif → Tazarine → Ouarzazate → Marrakech",
        description:
          "Sunrise over the dunes and a return camel ride to breakfast. Drive west on the desert road through Alnif and Tazarine — fossil country, far quieter than the main route — then Ouarzazate and back over the Tizi n'Tichka. Arrive Marrakech in the evening.",
      },
    ],
    faq: [
      { q: "Why does this trip take three days?", a: "Because Merzouga and the Erg Chebbi dunes are on the far side of the Atlas. Three days is what the distance requires — anything shorter either goes somewhere that is not the real Sahara, or spends almost all of it driving." },
      { q: "What do we see on the drive?", a: "The route crosses the Tizi n'Tichka pass and takes in Aït Ben Haddou and the gorge country, so the journey carries its own sights rather than being time lost getting somewhere. The driving is broken into stages with stops rather than done in one push." },
      { q: "What is the night in the desert camp like?", a: "Beds with blankets in a tent, dinner together, and complete quiet once the generators stop. The dunes are genuinely dark, which is why most people remember the night sky rather than the camel ride. Bring a warm layer — desert nights get cold outside summer." },
      { q: "Do I have to ride a camel?", a: "No. The camel leg into the camp is short and optional, and walking that stretch instead is common enough that the guides expect it. All the real distance is covered by vehicle." },
    ],
    meetingPoint: { lat: 31.0580, lng: -4.0127, name: "Merzouga, Erg Chebbi Sahara" },
    seoTitle: "3-Day Sahara Desert Tour from Marrakech — Camels, Dunes & Desert Camp | Marrakech Eco Tours",
    seoDescription: "Camel trek into Erg Chebbi at sunset and sleep under the stars. 3-day Marrakech to Sahara tour via Aït Ben Haddou, Dades and Todra gorges, returning through Alnif and Tazarine. From €1,066 for one traveller, €490 each for two, €394 for three, and less again for larger groups.",
    featured: true,
  },
  {
    id: "3",
    slug: "ourika-valley-day-hike",
    title: "Marrakech to Ourika Valley — Day Hike",
    category: "day-tours",
    origin: "marrakech",
    difficulty: "easy",
    duration: "1 day",
    groupSize: "2–15 people",
    tourType: "private",
    reviewCount: 203,
    rating: 4.7,
    // Ladder scaled from the confirmed price, read as the two-person rate.
    // Curve measured from the tours with operator-confirmed ladders:
    // day tour. Solo carries the whole guide/vehicle, so it sits ~1.8x above.
    groupPricing: [
      { minPeople: 1, price: 99 },
      { minPeople: 2, price: 46 },
      { minPeople: 3, price: 40 },
      { minPeople: 4, price: 36 },
      { minPeople: 5, price: 33 },
      { minPeople: 6, price: 30 },
    ],
    price: 99,
    depositAmount: 22,
    heroImage:
      "/gallery/tours-ourika-valley-day-hike.jpg",
    gallery: [
      "/gallery/category-hero-desert-caravan.jpg",
      "https://images.unsplash.com/photo-1568241360857-e23e825c4e08?w=1200&q=85",
      "https://images.unsplash.com/photo-1597823262196-cc7e878d73ce?w=1200&q=85",
    ],
    shortDescription:
      "A full-day hike through walnut groves, Berber villages, and mountain streams just 45 minutes from Marrakech.",
    description:
      "The Ourika Valley is a world apart from the city — terraced fields cling to red rock hillsides, Berber women weave carpets outside their homes, and mountain streams rush between the paths. Perfect for families and first-time hikers. The Setti Fatma waterfalls at the head of the valley are the highlight.",
    highlights: [
      "Hike to the Setti Fatma waterfalls (7 cascades)",
      "Walk through Berber villages rarely visited by tourists",
      "Swim in natural mountain pools",
      "Traditional Berber lunch with a local family",
    ],
    includes: [
      "Certified hiking guide",
      "Round-trip transport from Marrakech",
      "Traditional Berber lunch",
      "Mineral water throughout",
    ],
    excludes: ["Personal hiking gear", "Tips"],
    itinerary: [
      {
        day: 1,
        meals: "L",
        walking: "3–4 h",
        driving: "≈1 h each way",
        distance: "≈65 km each way",
        title: "Full Day — Ourika Valley",
        description:
          "Depart Marrakech at 8:30 am. Begin hiking at 9:30 am through villages and terraced fields. Swim at the waterfalls. Traditional Berber lunch. Return to Marrakech by 5:00 pm.",
      },
    ],
    faq: [
      { q: "Is this hike suitable for families and beginners?", a: "Yes. It is graded easy and built for first-time hikers and families — the route follows valley paths up to the Setti Fatma waterfalls rather than any real climb. Children comfortable on uneven ground manage it well." },
      { q: "What does the price include?", a: "A certified hiking guide, round-trip transport from Marrakech, a traditional Berber lunch with a local family, and mineral water throughout. Personal hiking gear and tips are not included." },
      { q: "Can you swim in the valley?", a: "Yes — there are natural mountain pools along the way, so bring swimwear in warm weather. The seven Setti Fatma cascades at the head of the valley are the highlight." },
      { q: "How large is the group?", a: "Between 2 and 15 people. It is a shared day tour, so you may walk with others." },
    ],
    meetingPoint: { lat: 31.3489, lng: -7.7411, name: "Ourika Valley, High Atlas" },
    seoTitle: "Ourika Valley Day Hike from Marrakech — Waterfalls & Berber Villages | Marrakech Eco Tours",
    seoDescription: "Hike to the Setti Fatma waterfalls through Berber villages and mountain streams, just 45 minutes from Marrakech. Guided day trip with Berber lunch included. From $99.",
    featured: true,
  },
  {
    id: "4",
    slug: "ouzoud-waterfalls-day-trip",
    title: "Marrakech to Ouzoud Waterfalls — Day Trip",
    category: "day-tours",
    origin: "marrakech",
    difficulty: "easy",
    duration: "1 day",
    groupSize: "2–15 people",
    tourType: "private",
    reviewCount: 167,
    rating: 4.8,
    // Ladder scaled from the confirmed price, read as the two-person rate.
    // Curve measured from the tours with operator-confirmed ladders:
    // day tour. Solo carries the whole guide/vehicle, so it sits ~1.8x above.
    groupPricing: [
      { minPeople: 1, price: 86 },
      { minPeople: 2, price: 40 },
      { minPeople: 3, price: 35 },
      { minPeople: 4, price: 31 },
      { minPeople: 5, price: 29 },
      { minPeople: 6, price: 25 },
    ],
    price: 86,
    depositAmount: 19,
    heroImage:
      "/gallery/tours-ouzoud-waterfalls-day-trip.jpg",
    gallery: [
      "/gallery/tours-ouzoud-waterfalls-day-trip.jpg",
      "https://images.unsplash.com/photo-1768498681713-e100323adb3c?w=1200&q=85",
      "https://images.unsplash.com/photo-1603982626518-eff2f11a4e70?w=1200&q=85",
    ],
    shortDescription:
      "Morocco's most spectacular waterfalls — 110 m of cascading water, wild Barbary macaques, and a stunning gorge.",
    description:
      "At 110 metres, the Ouzoud Falls are the highest waterfalls in North Africa. The mist-soaked gorge is home to troops of wild Barbary macaques, rainbow-framed pools at the base, and traditional mill houses still grinding argan. A two-hour drive from Marrakech and completely worth it.",
    highlights: [
      "The Ouzoud Falls — 110 m cascade, highest in North Africa",
      "Wild Barbary macaques in their natural habitat",
      "Boat ride at the base of the falls",
      "Traditional watermill visit",
      "Scenic gorge walk with local guide",
    ],
    includes: [
      "Round-trip transport from Marrakech",
      "Certified guide",
      "Boat ride at the falls",
      "Mineral water",
    ],
    excludes: ["Lunch", "Tips", "Personal purchases"],
    itinerary: [
      {
        day: 1,
        walking: "2–3 h",
        driving: "≈2 h each way",
        distance: "≈150 km each way",
        title: "Full Day — Ouzoud Waterfalls",
        description:
          "Depart Marrakech at 7:30 am. Arrive Ouzoud by 9:30 am. Guided walk to the falls, gorge trail, boat ride, macaque spotting. Free time for lunch. Return to Marrakech by 6:00 pm.",
      },
    ],
    faq: [
      { q: "How much walking is involved at Ouzoud?", a: "Not much — it is an easy day. The main effort is the walk down into the gorge to the base of the 110 m falls and back up, which most people manage at their own pace." },
      { q: "Is lunch included?", a: "No. Lunch is not included, though there are restaurants overlooking the falls. The price covers round-trip transport from Marrakech, a certified guide, the boat ride at the falls, and mineral water." },
      { q: "Will we see the wild monkeys?", a: "Ouzoud has a resident colony of wild Barbary macaques around the upper falls, and sightings are common, though as wild animals they are never guaranteed." },
      { q: "How big is the group?", a: "Between 2 and 15 people on a shared day trip." },
    ],
    meetingPoint: { lat: 32.0061, lng: -6.7200, name: "Ouzoud Falls, Middle Atlas" },
    seoTitle: "Ouzoud Waterfalls Day Trip from Marrakech — Barbary Macaques & 110m Falls | Marrakech Eco Tours",
    seoDescription: "Visit Morocco's highest waterfall — 110 metres of cascading water, wild Barbary macaques, and a gorge boat ride. Day trip from Marrakech with guide included. From $86.",
    featured: false,
  },
  {
    id: "5",
    slug: "agafay-desert-sunset",
    title: "Marrakech to Agafay Desert — Sunset & Dinner",
    category: "day-tours",
    origin: "marrakech",
    difficulty: "easy",
    duration: "1 day (afternoon–evening)",
    groupSize: "2–20 people",
    tourType: "private",
    reviewCount: 89,
    rating: 4.6,
    // Ladder scaled from the confirmed price, read as the two-person rate.
    // Curve measured from the tours with operator-confirmed ladders:
    // day tour. Solo carries the whole guide/vehicle, so it sits ~1.8x above.
    groupPricing: [
      { minPeople: 1, price: 214 },
      { minPeople: 2, price: 100 },
      { minPeople: 3, price: 86 },
      { minPeople: 4, price: 77 },
      { minPeople: 5, price: 70 },
      { minPeople: 6, price: 65 },
    ],
    price: 214,
    depositAmount: 47,
    heroImage:
      "/gallery/tours-agafay-desert-sunset.jpg",
    gallery: [
      "/gallery/tours-agafay-desert-sunset.jpg",
      "/gallery/blog-what-to-pack-desert-tour-morocco.jpg",
      "/gallery/blog-erg-chebbi-vs-erg-chegaga.jpg",
    ],
    shortDescription:
      "The Sahara in 30 minutes — sunset quad biking, camel rides, and a traditional Berber dinner in the Agafay stone desert.",
    description:
      "You don't need three days to feel the desert. The Agafay — a vast lunar landscape of rocky hammada just 30 km from Marrakech — delivers a true Saharan atmosphere at sunset. Quad bike across the plateau, ride a camel to the camp, and sit down to a traditional Berber feast with Atlas Mountain views.",
    highlights: [
      "Quad biking across the Agafay stone desert",
      "Camel ride to the sunset viewpoint",
      "Traditional Berber dinner in a desert camp",
      "Atlas Mountains on the horizon at dusk",
      "Only 30 minutes from Marrakech",
    ],
    includes: [
      "Round-trip transport from Marrakech",
      "1-hour quad biking",
      "Camel ride",
      "Traditional Berber dinner",
      "Mint tea ceremony",
    ],
    excludes: ["Alcoholic drinks", "Tips"],
    itinerary: [
      {
        day: 1,
        meals: "D",
        driving: "30 min each way",
        distance: "≈40 km each way",
        title: "Afternoon in the Agafay Desert",
        description:
          "Pick up from Marrakech at 3:00 pm. Arrive Agafay by 3:30 pm. Quad biking session, camel ride at sunset (5:30–6:30 pm). Traditional Berber dinner under the stars. Return to Marrakech by 10:00 pm.",
      },
    ],
    faq: [
      { q: "What happens on this afternoon-to-evening trip?", a: "You are driven from Marrakech to the Agafay's rocky desert, do an hour of quad biking, take a camel ride, then sit down to a traditional Berber dinner with a mint tea ceremony as the sun sets. It is an easy half-day built around the evening." },
      { q: "Is the Agafay a real sand desert?", a: "No — the Agafay is a rocky, lunar-style hammada about 30 km from Marrakech, not Saharan dunes. Its appeal is a genuine desert atmosphere at sunset within easy reach of the city, without the long drive south." },
      { q: "What is included?", a: "Round-trip transport from Marrakech, one hour of quad biking, a camel ride, a traditional Berber dinner, and the mint tea ceremony. Alcoholic drinks and tips are not included." },
      { q: "Do I need quad-biking experience?", a: "No. The quad session includes basic instruction and is run at an easy pace suitable for first-timers." },
    ],
    meetingPoint: { lat: 31.4969, lng: -8.1073, name: "Agafay Desert, Marrakech Region" },
    seoTitle: "Agafay Desert Sunset Tour from Marrakech — Quad Biking, Camels & Berber Dinner | Marrakech Eco Tours",
    seoDescription: "Experience the Sahara in 30 minutes — quad biking, camel ride at sunset, and a traditional Berber dinner in the Agafay stone desert near Marrakech. From $214.",
    featured: false,
  },
  {
    id: "6",
    slug: "marrakech-medina-cultural-tour",
    title: "Marrakech Medina — Cultural Tour",
    category: "cultural",
    origin: "marrakech",
    difficulty: "easy",
    isDayTour: true,
    duration: "Half day (4 hours)",
    groupSize: "2–8 people",
    tourType: "private",
    reviewCount: 97,
    rating: 4.9,
    // Ladder scaled from the confirmed price, read as the two-person rate.
    // Curve measured from the tours with operator-confirmed ladders:
    // day tour. Solo carries the whole guide/vehicle, so it sits ~1.8x above.
    groupPricing: [
      { minPeople: 1, price: 84 },
      { minPeople: 2, price: 47 },
      { minPeople: 3, price: 42 },
      { minPeople: 4, price: 39 },
      { minPeople: 5, price: 38 },
      { minPeople: 6, price: 36 },
    ],
    price: 84,
    depositAmount: 18,
    heroImage:
      "/gallery/tours-marrakech-medina-cultural-tour.jpg",
    gallery: [
      "/gallery/blog-best-time-to-visit-morocco.jpg",
      "/gallery/blog-how-many-days-do-you-need-in-morocco.jpg",
      "https://images.unsplash.com/photo-1653260137243-2b3daabf9aab?w=1200&q=85",
    ],
    shortDescription:
      "Navigate Marrakech's labyrinthine souks with a local expert — spices, tanneries, artisans, and hidden riad gardens.",
    description:
      "Marrakech's medina is a UNESCO World Heritage site and one of the most vibrant urban labyrinths on earth. Your local guide will take you through the ancient souks, past spice mountains and hand-painted ceramics, into the working tanneries, and finally to a rooftop above the Koutoubia Mosque.",
    highlights: [
      "Djemaa El-Fna square at its most vibrant",
      "Leather tanneries viewed from a private rooftop",
      "Ben Youssef Madrasa — 16th-century Islamic college",
      "Spice souk and argan oil cooperative",
      "Hidden riad garden and traditional mint tea",
    ],
    includes: [
      "Private English/French/Spanish/Arabic guide",
      "Entrance fees to monuments",
      "Traditional mint tea ceremony",
      "4-hour guided walking tour",
    ],
    excludes: ["Lunch", "Shopping and souvenirs", "Tips"],
    itinerary: [
      {
        day: 1,
        walking: "4 h (on foot)",
        title: "Full Medina Immersion",
        description:
          "Start at 9:00 am at the Koutoubia Mosque. Walk through the Mellah, Ben Youssef Madrasa, craft souks, tanneries, and Djemaa El-Fna. Mint tea at a hidden riad. Ends at 1:00 pm.",
      },
    ],
    faq: [
      { q: "Is this a private tour?", a: "Yes. It is a private, half-day (4-hour) guided walk with your own guide, available in English, French, Spanish, or Arabic, so the pace and focus can follow your interests." },
      { q: "What does the tour cover and include?", a: "A 4-hour guided walk through the medina with entrance fees to the monuments visited and a traditional mint tea ceremony included. Lunch, shopping, and tips are not included." },
      { q: "How much walking should I expect?", a: "It is graded easy, but it is a walking tour through the souks and monuments, so wear comfortable shoes. The route can be adjusted to your pace." },
      { q: "How large is the group?", a: "Small — between 2 and 8 people, and private to your party." },
    ],
    meetingPoint: { lat: 31.6295, lng: -7.9811, name: "Koutoubia Mosque, Marrakech" },
    seoTitle: "Marrakech Medina Cultural Tour — Souks, Tanneries & Riads | Marrakech Eco Tours",
    seoDescription: "Explore the UNESCO Marrakech medina with a local guide — leather tanneries, Ben Youssef Madrasa, Djemaa El-Fna, and hidden riad gardens. Private half-day tour. From $84.",
    featured: false,
  },
  {
    id: "7",
    slug: "marrakech-to-fes-3day",
    title: "Marrakech to Fes — 3-Day Imperial Cities Tour",
    category: "cultural",
    origin: "marrakech",
    difficulty: "easy",
    duration: "3 days / 2 nights",
    groupSize: "2–12 people",
    tourType: "private",
    reviewCount: 61,
    rating: 4.7,
    // Stored in USD (see lib/currency-core.ts). Benchmarked against
    // marrakech-desert-trips.com's published 3-day Marrakech to Fes table
    // (verified Aug 2026) and set 10% under it at every bracket.
    price: 1179,
    depositAmount: 258,
    // Priced per exact group size, mirroring how these trips are quoted.
    // NOT flat brackets: flattening 2–3 and 4–5 to one rate made four
    // people total less than three (€1,172 vs €1,176), so a trio was
    // better off booking a phantom fourth. Per-size tiers never invert.
    // The 1→2 drop is steep because the vehicle and driver-guide cost the
    // same either way; only camp, meals and fees scale per head.
    groupPricing: [
      { minPeople: 1, price: 1179 }, // €1022
      { minPeople: 2, price: 660 }, // €572
      { minPeople: 3, price: 565 }, // €490
      { minPeople: 4, price: 515 }, // €446
      { minPeople: 5, price: 482 }, // €418
      { minPeople: 6, price: 431 }, // €374
      { minPeople: 7, price: 411 }, // €356
      { minPeople: 10, price: 370 }, // €321  (raised from €310: the source table inverts here)
      { minPeople: 14, price: 345 }, // €299  (raised from €284: the source table inverts here)
    ],
    heroImage:
      "/gallery/tours-marrakech-to-fes-3day.jpg",
    gallery: [
      "/gallery/tours-marrakech-to-fes-3day.jpg",
      "https://images.unsplash.com/photo-1697028733028-e2a104b952b9?w=1200&q=85",
      "https://images.unsplash.com/photo-1604569251410-025ed59f126a?w=1200&q=85",
    ],
    shortDescription:
      "Two of Morocco's greatest cities in three days — High Atlas pass, Ifrane, cedar forest, and the ancient medina of Fes.",
    description:
      "The road from Marrakech to Fes is one of the most spectacular drives in Africa. Cross the High Atlas via Tizi n'Tichka, stop at the UNESCO Ksar of Aït Ben Haddou, wind through the Middle Atlas cedar forests where wild Barbary macaques roam, and arrive in Fes el-Bali — the world's largest living medieval city.",
    highlights: [
      "Tizi n'Tichka mountain pass (2,260 m)",
      "Aït Ben Haddou UNESCO World Heritage Ksar",
      "Ifrane — Morocco's Alpine village",
      "Cedar Forest of Azrou and Barbary macaques",
      "Fes el-Bali medina and Chouara Tanneries",
    ],
    includes: [
      "Private 4x4 transport throughout",
      "English/French-speaking guide",
      "2 nights riad accommodation",
      "Breakfast daily",
      "All transfers and tolls",
    ],
    excludes: ["Lunches and dinners", "Tips", "Return transport from Fes"],
    itinerary: [
      {
        day: 1,
        meals: "D",
        stay: "Hotel",
        driving: "≈6 h",
        distance: "≈340 km",
        stop: { name: "Midelt", lat: 32.68, lng: -4.745 },
        title: "Marrakech → Tizi n'Tichka → Aït Ben Haddou → Midelt",
        description:
          "Depart at 7:30 am. Ascend the Atlas via Tizi n'Tichka. Visit Aït Ben Haddou. Continue through the Ziz Valley to Midelt for the night.",
      },
      {
        day: 2,
        meals: "B,D",
        stay: "Hotel",
        driving: "≈4 h",
        distance: "≈220 km",
        stop: { name: "Fes", lat: 34.033, lng: -5.0 },
        title: "Midelt → Ifrane → Azrou Cedar Forest → Fes",
        description:
          "Drive through the Middle Atlas. Stop in Ifrane and the cedar forest at Azrou to spot wild Barbary macaques. Arrive Fes by afternoon. Check in to your riad.",
      },
      {
        day: 3,
        meals: "B",
        stop: { name: "Fes", lat: 34.033, lng: -5.0 },
        title: "Fes Medina Full Day",
        description:
          "Guided exploration of Fes el-Bali: Chouara Tanneries, Al-Qarawiyyin University, Medersa Bou Inania, and the labyrinthine souks. Tour concludes in Fes.",
      },
    ],
    faq: [
      { q: "Does this trip end in Fes rather than returning to Marrakech?", a: "Yes. It is a one-way journey from Marrakech to Fes over three days, so return transport from Fes is not included — plan your onward travel from there." },
      { q: "What is included?", a: "Private 4x4 transport throughout, an English/French-speaking guide, two nights of riad accommodation, daily breakfast, and all transfers and tolls. Lunches, dinners, and tips are not included." },
      { q: "How demanding is it?", a: "Easy. The distance is covered by private 4x4 with stops along the way, so the effort is limited to short walks at the sights rather than any trekking." },
      { q: "What kind of accommodation is it?", a: "Two nights in riads — traditional courtyard guesthouses — with breakfast each morning." },
    ],
    meetingPoint: { lat: 34.0331, lng: -5.0003, name: "Fes el-Bali, Imperial City" },
    seoTitle: "3-Day Marrakech to Fes Tour — Imperial Cities & High Atlas | Marrakech Eco Tours",
    seoDescription: "Drive from Marrakech to Fes via Tizi n'Tichka, Aït Ben Haddou, and the cedar forests of the Middle Atlas. 3-day private 4x4 tour with riad accommodation. From $1179 solo, far less per person for two or more.",
    featured: false,
  },
  {
    id: "8",
    slug: "mgoun-massif-trek",
    title: "Marrakech to Mgoun Massif — 7-Day Traverse",
    category: "trekking",
    origin: "marrakech",
    difficulty: "expert",
    duration: "7 days / 6 nights",
    groupSize: "2–8 people",
    tourType: "private",
    reviewCount: 31,
    rating: 5.0,
    // Real ladder, not the derived curve: a solo trekker pays for the whole
    // private guide, mules and vehicle across seven days, so solo is ~1.8x
    // the two-person rate rather than the shallow premium the curve assumes.
    // EUR 1350 / 760 / 710 / 680 / 625 / 596 at the rate in lib/currency-core.ts.
    groupPricing: [
      { minPeople: 1, price: 1557 },
      { minPeople: 2, price: 877 },
      { minPeople: 3, price: 819 },
      { minPeople: 4, price: 784 },
      { minPeople: 5, price: 721 },
      { minPeople: 6, price: 687 },
    ],
    price: 1557,
    depositAmount: 343,
    heroImage:
      "/gallery/category-hero-mgoun-massif.jpg",
    gallery: [
      "/gallery/category-hero-mgoun-massif.jpg",
      "/gallery/blog-anti-atlas-trekking-guide.jpg",
      "/gallery/category-hero-atlas-ridge.jpg",
    ],
    shortDescription:
      "Morocco's wildest trek — 7 days crossing the remote Mgoun Massif (4,068 m) with no other tourists in sight.",
    description:
      "The Mgoun Massif Traverse is for serious trekkers who want to go beyond the tourist trail. Seven days of remote high-altitude wilderness, crossing passes above 3,600 m, sleeping with Berber families, and summiting Jbel Mgoun — Morocco's second highest peak — with barely another traveller in sight.",
    highlights: [
      "Summit Jbel Mgoun — Morocco's 2nd highest peak at 4,068 m",
      "Completely off the tourist trail",
      "Berber family homestays in remote villages",
      "Tessaoute and Mgoun gorge crossings",
      "7 days of pure high-altitude wilderness",
    ],
    includes: [
      "Expert licensed high-mountain guide",
      "All meals throughout",
      "Mule team for equipment",
      "Berber family homestays and camping",
      "Emergency satellite communication",
      "National park fees",
    ],
    excludes: [
      "Travel and medical insurance (mandatory)",
      "Technical mountaineering equipment",
      "Tips",
    ],
    itinerary: [
      { day: 1, title: "Marrakech → Aït M'hamed", description: "Drive to the trailhead. Meet mule team and crew. First night with a Berber family.", stop: { name: "Aït M'hamed", lat: 31.747, lng: -6.437 }, meals: "L,D", stay: "Village gîte", driving: "5 h" },
      { day: 2, title: "Aït M'hamed → Agouti (2,600 m)", description: "Trek through the Aït Bouguemez 'Happy Valley'. Camp at Agouti.", stop: { name: "Agouti", lat: 31.6372, lng: -6.4889 }, meals: "B,L,D", stay: "Wild camp", walking: "5 h", ascent: "+800 m" },
      { day: 3, title: "Agouti → Tizi n'Ait Imi (3,650 m) → Tarkeddit", description: "First high pass. Breathtaking panoramas. Wild camp at Tarkeddit.", stop: { name: "Tarkeddit", lat: 31.548, lng: -6.447 }, meals: "B,L,D", stay: "Wild camp", walking: "6–7 h", ascent: "+1,050 m" },
      { day: 4, title: "Mgoun Summit (4,068 m)", description: "Pre-dawn start. Summit Jbel Mgoun. Descent to the Tessaoute gorge camp.", stop: { name: "Jbel Mgoun Summit", lat: 31.517, lng: -6.42 }, meals: "B,L,D", stay: "Wild camp", walking: "7–8 h", ascent: "+420 m / −1,150 m" },
      { day: 5, title: "Tessaoute Gorge Traverse", description: "Walk through the dramatic red-walled gorge. Wild swimming in the river.", stop: { name: "Tessaout Gorge", lat: 31.47, lng: -6.32 }, meals: "B,L,D", stay: "Wild camp", walking: "5–6 h" },
      { day: 6, title: "Gorge Exit → Bou Tharar", description: "Exit the gorge. Night in Bou Tharar village with a local family.", stop: { name: "Bou Tharar", lat: 31.49, lng: -6.15 }, meals: "B,L,D", stay: "Guesthouse", walking: "5 h" },
      { day: 7, title: "Bou Tharar → Marrakech", description: "Transfer back to Marrakech via the rose valley. Tour concludes by 4:00 pm.", stop: { name: "Marrakech", lat: 31.6295, lng: -7.9811 }, meals: "B", driving: "4 h" },
    ],
    faq: [
      { q: "Is M'Goun harder than Toubkal?", a: "Over a week, yes. We rate this expert against challenging for the Toubkal routes — not because any single day is technical, but because it is seven consecutive days in remote country with fewer places to stop or turn back. Sustained effort rather than a single hard day." },
      { q: "How remote is this trek?", a: "Genuinely remote. The route crosses high country and gorges, passing villages where trekking groups are still uncommon. That is the appeal, and it is also why the route needs a guide who knows the water sources and the weather patterns." },
      { q: "What experience do I need for the M'Goun traverse?", a: "Previous multi-day trekking. This is not a first big walk: you should already know how your body handles consecutive days on rough ground and how you respond to altitude. If you have done Toubkal comfortably, you have a reasonable basis for this." },
    ],
    meetingPoint: { lat: 31.6558, lng: -6.4561, name: "Aït M'hamed, Mgoun Massif" },
    seoTitle: "Mgoun Massif Trek 7 Days — Morocco's Wildest High-Altitude Traverse | Marrakech Eco Tours",
    seoDescription: "7-day expert trek across the remote Mgoun Massif — summit Jbel Mgoun (4,068 m), cross high passes, and sleep in Berber family homes with no other tourists. From $1557.",
    featured: false,
  },

  // ─────────────────────────────────────────────
  // AGADIR TOURS
  // ─────────────────────────────────────────────
  {
    id: "9",
    slug: "paradise-valley-agadir",
    title: "Agadir to Paradise Valley & Immouzer Waterfalls",
    category: "day-tours",
    origin: "agadir",
    difficulty: "easy",
    duration: "1 day",
    groupSize: "2–15 people",
    tourType: "private",
    reviewCount: 142,
    rating: 4.8,
    // Ladder scaled from the confirmed price, read as the two-person rate.
    // Curve measured from the tours with operator-confirmed ladders:
    // day tour. Solo carries the whole guide/vehicle, so it sits ~1.8x above.
    groupPricing: [
      { minPeople: 1, price: 86 },
      { minPeople: 2, price: 40 },
      { minPeople: 3, price: 35 },
      { minPeople: 4, price: 31 },
      { minPeople: 5, price: 29 },
      { minPeople: 6, price: 25 },
    ],
    price: 86,
    depositAmount: 19,
    heroImage: "/gallery/blog-hero-atlas-valley-panorama.jpg",
    gallery: [
      "/gallery/blog-paradise-valley-agadir-complete-guide.jpg",
      "/gallery/blog-marrakech-vs-agadir-which-base.jpg",
      "/gallery/blog-paradise-valley-agadir-complete-guide.jpg",
    ],
    shortDescription:
      "A hidden paradise of palm-lined gorges, natural swimming pools, and crystal-clear streams 35 km from Agadir.",
    description:
      "Paradise Valley is one of Morocco's best-kept secrets — a lush palm canyon carved by the Tamraght river just 35 km north of Agadir. Hike between natural rock pools fed by ice-cold mountain springs, swim under overhanging cliffs, and picnic in the shade of towering palm trees. A perfect escape from the beach.",
    highlights: [
      "Natural swimming pools in a palm gorge",
      "Hike through dramatic canyon scenery",
      "Immouzer waterfall (seasonal)",
      "Wild palm forest and argan trees",
      "Cool mountain air, zero crowds",
    ],
    includes: [
      "Round-trip transport from Agadir",
      "Certified local guide",
      "Traditional Berber lunch",
      "Mineral water",
    ],
    excludes: ["Personal swimming gear", "Tips"],
    itinerary: [
      {
        day: 1,
        meals: "L",
        walking: "2–3 h",
        driving: "≈1.5 h each way",
        distance: "≈70 km each way",
        title: "Full Day — Paradise Valley",
        description:
          "Depart Agadir at 9:00 am. Arrive Paradise Valley by 10:00 am. Guided gorge hike, swimming in natural pools, Berber lunch under the palms. Return to Agadir by 5:00 pm.",
      },
    ],
    faq: [
      { q: "Will there be water in the pools?", a: "It depends on the season. Levels swing hard: after winter rain the pools are at their best, and after a long dry spell some shrink or disappear. Spring is the most reliable window. We will tell you honestly what the current conditions are before you travel." },
      { q: "Can children do this trip?", a: "Yes, it is one of our more family-friendly day trips. The walk to the main pools is short and straightforward, and the swimming is the point. The jumping rocks are optional and there is plenty to do without them." },
      { q: "How early should we leave?", a: "Early. Paradise Valley is about ninety minutes from Agadir, and arriving before the mid-morning crowd changes the experience considerably — the difference between having a pool largely to yourselves and sharing it." },
    ],
    meetingPoint: { lat: 30.5376, lng: -9.5000, name: "Paradise Valley, Tamraght" },
    seoTitle: "Paradise Valley Day Trip from Agadir — Natural Swimming Pools & Palm Gorge | Marrakech Eco Tours",
    seoDescription: "Hidden palm gorge with natural swimming pools 35 km from Agadir. Guided hike through canyon scenery, Immouzer waterfall, and Berber lunch included. From $86.",
    featured: true,
  },
  {
    id: "10",
    slug: "sous-massa-national-park",
    title: "Agadir to Souss-Massa National Park — Wildlife Tour",
    category: "day-tours",
    origin: "agadir",
    difficulty: "easy",
    duration: "1 day",
    groupSize: "2–12 people",
    tourType: "private",
    reviewCount: 58,
    rating: 4.7,
    // Ladder scaled from the confirmed price, read as the two-person rate.
    // Curve measured from the tours with operator-confirmed ladders:
    // day tour. Solo carries the whole guide/vehicle, so it sits ~1.8x above.
    groupPricing: [
      { minPeople: 1, price: 198 },
      { minPeople: 2, price: 92 },
      { minPeople: 3, price: 80 },
      { minPeople: 4, price: 71 },
      { minPeople: 5, price: 65 },
      { minPeople: 6, price: 59 },
    ],
    price: 198,
    depositAmount: 44,
    heroImage:
      "/gallery/tours-sous-massa-national-park.jpg",
    gallery: [
      "/gallery/tours-sous-massa-national-park.jpg",
      "https://images.unsplash.com/photo-1497206365907-f5e630693df0?w=1200&q=85",
      "https://images.unsplash.com/photo-1697703297863-26350bad726b?w=1200&q=85",
    ],
    shortDescription:
      "Spot the critically endangered Northern Bald Ibis and flamingos in Morocco's most important wildlife reserve.",
    description:
      "Souss-Massa National Park stretches 70 km of Atlantic coastline and river estuary south of Agadir. It is one of the last refuges of the Northern Bald Ibis — one of the world's rarest birds — and home to flamingos, ospreys, oystercatchers, and African otters. A must for nature lovers.",
    highlights: [
      "Northern Bald Ibis — one of the world's 10 rarest birds",
      "Flamingo colonies on the Massa estuary",
      "Atlantic dunes and coastal trail",
      "Souss River birdwatching from hides",
      "Argan and acacia woodland walk",
    ],
    includes: [
      "Round-trip transport from Agadir",
      "Expert naturalist guide",
      "National park entrance fee",
      "Binoculars provided",
      "Picnic lunch",
    ],
    excludes: ["Personal camera equipment", "Tips"],
    itinerary: [
      {
        day: 1,
        meals: "L",
        walking: "2–3 h",
        driving: "≈1 h each way",
        distance: "≈60 km each way",
        title: "Full Day — Souss-Massa",
        description:
          "Depart Agadir at 8:00 am. Morning session at the Massa estuary for ibis and flamingos. Coastal trail and Atlantic dune walk after lunch. Return to Agadir by 5:00 pm.",
      },
    ],
    faq: [
      { q: "What wildlife might we see?", a: "Souss-Massa is a birdwatching park — it is one of the last strongholds of the northern bald ibis, and flamingos and other waterbirds are common along the estuary. An expert naturalist guide leads the day and binoculars are provided." },
      { q: "Is this suitable for casual visitors, not just birders?", a: "Yes. It is an easy day out combining the estuary, coastline, and park landscapes; the naturalist guide pitches it to the group's interest, so you do not need to be a dedicated birder." },
      { q: "What is included?", a: "Round-trip transport from Agadir, an expert naturalist guide, the park entrance fee, binoculars, and a picnic lunch. Personal camera equipment and tips are not included." },
      { q: "How big is the group?", a: "Between 2 and 12 people — a small shared group, so the naturalist guide can still point out birds and wildlife to everyone." },
    ],
    meetingPoint: { lat: 30.0559, lng: -9.6320, name: "Souss-Massa National Park, Massa" },
    seoTitle: "Souss-Massa National Park Wildlife Tour from Agadir — Rare Northern Bald Ibis | Marrakech Eco Tours",
    seoDescription: "Spot the critically endangered Northern Bald Ibis and flamingos in Morocco's most important wildlife reserve. Expert naturalist guide, binoculars, and picnic included. From $198.",
    featured: true,
  },
  {
    id: "11",
    slug: "taroudant-day-trip-agadir",
    title: "Agadir to Taroudant — Day Trip",
    category: "cultural",
    origin: "agadir",
    difficulty: "easy",
    isDayTour: true,
    duration: "1 day",
    groupSize: "2–14 people",
    tourType: "private",
    reviewCount: 84,
    rating: 4.6,
    // Ladder scaled from the confirmed price, read as the two-person rate.
    // Curve measured from the tours with operator-confirmed ladders:
    // day tour. Solo carries the whole guide/vehicle, so it sits ~1.8x above.
    groupPricing: [
      { minPeople: 1, price: 77 },
      { minPeople: 2, price: 43 },
      { minPeople: 3, price: 39 },
      { minPeople: 4, price: 36 },
      { minPeople: 5, price: 34 },
      { minPeople: 6, price: 33 },
    ],
    price: 77,
    depositAmount: 17,
    heroImage:
      "/gallery/tours-taroudant-day-trip-agadir.jpg",
    gallery: [
      "/gallery/tours-taroudant-day-trip-agadir.jpg",
      "https://images.unsplash.com/photo-1598590971729-d3040c9112cb?w=1200&q=85",
      "https://images.unsplash.com/photo-1573133001449-a19835a04971?w=1200&q=85",
    ],
    shortDescription:
      "The 'grandmother of Marrakech' — ancient rose-red walls, spice souks, and a Berber market untouched by mass tourism.",
    description:
      "Taroudant is what Marrakech was 50 years ago — the full medieval medina experience without the tourist crowds. The 16th-century ochre ramparts are among the best-preserved in Morocco. The tanneries, spice souk, and silver jewellery market are authentic and unhurried. Just 80 km from Agadir.",
    highlights: [
      "16th-century ramparts — best preserved in Morocco",
      "Authentic Berber market and spice souk",
      "Taroudant tanneries (smaller and less crowded than Fes)",
      "Tiout Oasis and kasbah (optional)",
      "Traditional silver Souss jewellery",
    ],
    includes: [
      "Round-trip transport from Agadir",
      "Local expert guide",
      "Rampart walk",
      "Mint tea in a riad",
    ],
    excludes: ["Lunch", "Shopping", "Tips"],
    itinerary: [
      {
        day: 1,
        walking: "2–3 h",
        driving: "≈1 h each way",
        distance: "≈80 km each way",
        title: "Full Day — Taroudant",
        description:
          "Depart Agadir at 8:30 am. Arrive Taroudant by 9:30 am. Guided medina walk, ramparts, souks, and tanneries. Optional Tiout Oasis stop. Return to Agadir by 5:00 pm.",
      },
    ],
    faq: [
      { q: "What is Taroudant known for?", a: "Its intact ramparts — Taroudant is sometimes called 'little Marrakech' for its earthen walls and unhurried souks. The day includes a walk along the ramparts and mint tea in a riad." },
      { q: "What does the trip include?", a: "Round-trip transport from Agadir, a local expert guide, the rampart walk, and mint tea in a riad. Lunch, shopping, and tips are not included." },
      { q: "How strenuous is it?", a: "Easy. It is a relaxed cultural day of walking the walls and old town rather than any hiking." },
      { q: "How large is the group?", a: "Between 2 and 14 people on a shared day trip." },
    ],
    meetingPoint: { lat: 30.4702, lng: -8.8773, name: "Taroudant, Souss Valley" },
    seoTitle: "Taroudant Day Trip from Agadir — Ancient Ramparts & Berber Market | Marrakech Eco Tours",
    seoDescription: "Discover Morocco's best-preserved 16th-century ramparts and authentic Berber markets in Taroudant — 80 km from Agadir, without the tourist crowds. From $77.",
    featured: false,
  },
  {
    id: "12",
    slug: "agadir-surf-lesson",
    title: "Agadir Beach Surf Lesson",
    category: "day-tours",
    origin: "agadir",
    difficulty: "easy",
    duration: "Half day (2–3 hours)",
    groupSize: "2–8 people",
    tourType: "private",
    reviewCount: 211,
    rating: 4.7,
    // Ladder scaled from the confirmed price, read as the two-person rate.
    // Curve measured from the tours with operator-confirmed ladders:
    // day tour. Solo carries the whole guide/vehicle, so it sits ~1.8x above.
    groupPricing: [
      { minPeople: 1, price: 81 },
      { minPeople: 2, price: 38 },
      { minPeople: 3, price: 32 },
      { minPeople: 4, price: 29 },
      { minPeople: 5, price: 26 },
      { minPeople: 6, price: 24 },
    ],
    price: 81,
    depositAmount: 18,
    heroImage:
      "/gallery/tours-agadir-surf-lesson.jpg",
    gallery: [
      "/gallery/tours-agadir-surf-lesson.jpg",
      "https://images.unsplash.com/photo-1553458287-b25ff2a8a778?w=1200&q=85",
      "/gallery/blog-best-day-trips-from-agadir.jpg",
    ],
    shortDescription:
      "Learn to surf on Agadir's warm Atlantic waves — professional instruction, board and wetsuit included.",
    description:
      "Agadir's bay offers consistent beginner-friendly Atlantic swells and warm water year-round, making it one of the best places in Morocco to learn to surf. Our certified instructors work with complete beginners to intermediate surfers. Board, wetsuit, and all equipment provided.",
    highlights: [
      "Professional certified surf instructors",
      "Board and wetsuit included",
      "Beginner and intermediate levels",
      "Warm Atlantic waves on Agadir Bay",
      "Year-round surfing conditions",
    ],
    includes: [
      "2-hour surf lesson",
      "Surfboard and wetsuit rental",
      "Certified ISA instructor",
      "Warm-up and safety briefing",
    ],
    excludes: ["Transport to beach (5-min walk from centre)", "Tips"],
    itinerary: [
      {
        day: 1,
        walking: "2 h session",
        title: "Surf Session — Agadir Bay",
        description:
          "Meet your instructor at the beach at the agreed time. 30-min land lesson (technique + safety), 90 min in the water. Available morning and afternoon sessions daily.",
      },
    ],
    faq: [
      { q: "Do I need any surfing experience?", a: "No. It is graded easy and built for beginners — the session opens with a warm-up and safety briefing led by a certified ISA instructor before you get in the water." },
      { q: "Is equipment provided?", a: "Yes. Surfboard and wetsuit rental are included, along with the 2-hour lesson and the certified instructor. Tips are not included." },
      { q: "How do I get to the beach?", a: "Transport is not included because the beach is about a 5-minute walk from the centre. You meet at the beach for the lesson." },
      { q: "How long is the lesson?", a: "The session runs 2–3 hours in total, including the warm-up, safety briefing, and time in the water, in a small group of 2–8." },
    ],
    meetingPoint: { lat: 30.4206, lng: -9.5981, name: "Agadir Beach, Agadir Bay" },
    seoTitle: "Surf Lesson Agadir — Learn to Surf on Morocco's Atlantic Coast | Marrakech Eco Tours",
    seoDescription: "Learn to surf on Agadir Bay's warm Atlantic waves with a certified ISA instructor. Board, wetsuit, and safety briefing included. Beginner and intermediate levels. From $81.",
    featured: false,
  },
  {
    id: "13",
    slug: "anti-atlas-trekking-agadir",
    title: "Agadir to Anti-Atlas Mountains — 3-Day Trek",
    category: "trekking",
    origin: "agadir",
    difficulty: "moderate",
    duration: "3 days / 2 nights",
    groupSize: "2–8 people",
    tourType: "private",
    reviewCount: 29,
    rating: 4.8,
    // Ladder scaled from the confirmed price, read as the two-person rate.
    // Curve measured from the tours with operator-confirmed ladders:
    // trekking. Solo carries the whole guide/vehicle, so it sits ~1.8x above.
    groupPricing: [
      { minPeople: 1, price: 527 },
      { minPeople: 2, price: 298 },
      { minPeople: 3, price: 262 },
      { minPeople: 4, price: 244 },
      { minPeople: 5, price: 229 },
      { minPeople: 6, price: 215 },
    ],
    price: 527,
    depositAmount: 116,
    heroImage:
      "/gallery/tours-anti-atlas-trekking-agadir.jpg",
    gallery: [
      "/gallery/tours-anti-atlas-trekking-agadir.jpg",
      "https://images.unsplash.com/photo-1604569251410-025ed59f126a?w=1200&q=85",
      "https://images.unsplash.com/photo-1729442045686-fe062f3c6c16?w=1200&q=85",
    ],
    shortDescription:
      "Three days in the ancient Anti-Atlas — painted valleys, almond blossom gorges, and Berber villages with no other tourists.",
    description:
      "The Anti-Atlas is Morocco's most underrated mountain range — older than the Atlas, stranger in shape, and completely untouched by tourism. Pink granite peaks, saffron-toned gorges, almond groves in blossom, and Berber villages where life has not changed in centuries. Starting from Agadir, this is real Morocco.",
    highlights: [
      "Ancient pink granite peaks of the Anti-Atlas",
      "Tafraoute — the painted rocks valley",
      "Almond blossom gorges (February–March)",
      "Berber villages with no other tourists",
      "Dramatic valley views at sunset",
    ],
    includes: [
      "Certified mountain guide",
      "2 nights Berber guesthouse accommodation",
      "All meals",
      "Round-trip transport from Agadir",
      "Mule for equipment",
    ],
    excludes: ["Travel insurance (recommended)", "Personal hiking gear", "Tips"],
    itinerary: [
      {
        day: 1,
        meals: "L,D",
        stay: "Wild camp",
        walking: "3–4 h",
        driving: "≈3 h",
        stop: { name: "Tafraoute", lat: 29.72, lng: -8.976 },
        title: "Agadir → Tafraoute → First Camp",
        description:
          "Drive to Tafraoute (2h30). Visit the painted rocks. Begin trekking into the almond gorges. Night in a Berber guesthouse.",
      },
      {
        day: 2,
        meals: "B,L,D",
        stay: "Wild camp",
        walking: "6 h",
        ascent: "+700 m",
        stop: { name: "Tafraoute", lat: 29.72, lng: -8.976 },
        title: "High Ridge Traverse",
        description:
          "Full day trekking through pink granite ridges with views of the Ameln Valley below. Night camping or guesthouse in a remote village.",
      },
      {
        day: 3,
        meals: "B,L",
        walking: "4–5 h",
        driving: "≈3 h",
        stop: { name: "Agadir", lat: 30.428, lng: -9.598 },
        title: "Valley Descent → Agadir",
        description:
          "Morning descent through argan forest. Traditional lunch in a village. Drive back to Agadir. Arrive by late afternoon.",
      },
    ],
    faq: [
      { q: "How hard is this trek?", a: "It is graded moderate — three days on foot in the Anti-Atlas with two nights in Berber guesthouses. It is more demanding than a day walk but does not require prior high-altitude experience." },
      { q: "Do I have to carry my own bags?", a: "No. A mule carries the equipment between stops, so you walk with a daypack. Personal hiking gear is not provided." },
      { q: "What is included?", a: "A certified mountain guide, two nights of Berber guesthouse accommodation, all meals, round-trip transport from Agadir, and a mule for equipment. Travel insurance (recommended), personal hiking gear, and tips are not included." },
      { q: "Where do we sleep?", a: "In Berber guesthouses in mountain villages — simple, hosted accommodation rather than hotels, with all meals included." },
    ],
    meetingPoint: { lat: 29.7231, lng: -8.9762, name: "Tafraoute, Anti-Atlas Mountains" },
    seoTitle: "Anti-Atlas Mountains Trek 3 Days from Agadir — Pink Granite & Painted Rocks | Marrakech Eco Tours",
    seoDescription: "3-day trek through Morocco's most underrated mountain range — pink granite peaks, almond blossom gorges, and remote Berber villages. Private tour from Agadir. From $527.",
    featured: true,
  },
  {
    id: "14",
    slug: "sahara-2day-agadir",
    relatedPosts: ["sahara-tour-from-agadir-cost", "sahara-desert-from-agadir", "agafay-vs-merzouga-vs-zagora", "what-to-pack-desert-tour-morocco"],
    title: "Agadir to the Sahara — 2-Day Desert Tour",
    category: "desert",
    origin: "agadir",
    difficulty: "easy",
    duration: "2 days / 1 night",
    groupSize: "2–10 people",
    tourType: "private",
    reviewCount: 47,
    rating: 4.9,
    // Ladder scaled from the confirmed price, read as the two-person rate.
    // Curve measured from the tours with operator-confirmed ladders:
    // vehicle-based. Solo carries the whole guide/vehicle, so it sits ~1.8x above.
    groupPricing: [
      { minPeople: 1, price: 556 },
      { minPeople: 2, price: 259 },
      { minPeople: 3, price: 204 },
      { minPeople: 4, price: 171 },
      { minPeople: 5, price: 148 },
      { minPeople: 6, price: 129 },
    ],
    price: 556,
    depositAmount: 122,
    heroImage:
      "/gallery/tours-sahara-2day-agadir.jpg",
    gallery: [
      "/gallery/blog-what-to-pack-desert-tour-morocco.jpg",
      "/gallery/category-hero-medina-doorway.jpg",
      "/gallery/blog-how-much-does-a-morocco-desert-tour-cost.jpg",
    ],
    shortDescription:
      "Cross the Anti-Atlas and Draa Valley to the Sahara — camel trek, desert camp, and a sunrise over Erg Chegaga.",
    description:
      "Most Sahara tours leave from Marrakech — this one takes you through the less-travelled southern route via the Draa Valley and Erg Chegaga, the largest and most remote dune field in Morocco. A two-day escape from Agadir that feels like a week away from the world.",
    highlights: [
      "Erg Chegaga — the remote dune field fewer tourists reach",
      "Draa Valley palmery and ancient kasbahs",
      "Sunset and sunrise camel treks",
      "Luxury Berber desert camp under the Milky Way",
      "Southern route through Tata and Foum Zguid",
    ],
    includes: [
      "4x4 transport throughout",
      "Experienced desert guide",
      "1 night luxury desert camp (dinner + breakfast)",
      "All camel rides",
    ],
    excludes: ["Lunch on day 1", "Personal items and tips"],
    itinerary: [
      {
        day: 1,
        meals: "D",
        stay: "Desert camp",
        driving: "≈8 h",
        distance: "≈450 km",
        stop: { name: "Erg Chegaga", lat: 29.928, lng: -5.928 },
        title: "Agadir → Tata → Foum Zguid → Erg Chegaga",
        description:
          "Depart Agadir at 6:30 am. Drive south through the Anti-Atlas foothills via Tata. Cross the hammada to Foum Zguid. Camel trek into Erg Chegaga at sunset. Berber camp dinner.",
      },
      {
        day: 2,
        meals: "B",
        driving: "≈8 h",
        distance: "≈450 km",
        stop: { name: "Agadir", lat: 30.428, lng: -9.598 },
        title: "Sunrise → Draa Valley → Agadir",
        description:
          "Dawn camel trek for the sunrise over the dunes. Breakfast at camp. Drive north through the magnificent Draa Valley palm groves. Arrive Agadir by evening.",
      },
    ],
    faq: [
      { q: "Can you really reach the desert from Agadir in two days?", a: "Yes — this two-day trip uses 4x4 transport to reach a desert camp for one night, with all camel rides included. It is the shortest genuine desert overnight from Agadir." },
      { q: "What is the camp like?", a: "A luxury desert camp for one night, with dinner and breakfast included. The night sky and quiet are what most people remember." },
      { q: "What is included?", a: "4x4 transport throughout, an experienced desert guide, one night at the luxury desert camp with dinner and breakfast, and all camel rides. Lunch on day one, personal items, and tips are not included." },
      { q: "How demanding is it?", a: "Easy. The distance is covered by 4x4, and the camel rides are short and optional." },
    ],
    meetingPoint: { lat: 29.8671, lng: -7.9386, name: "Erg Chegaga, Western Sahara" },
    seoTitle: "2-Day Sahara Tour from Agadir — Erg Chegaga Desert Camp & Draa Valley | Marrakech Eco Tours",
    seoDescription: "The remote Erg Chegaga dunes via the southern Draa Valley route — camel trek, luxury desert camp, and a sunrise over the Sahara. 2-day tour from Agadir. From $556.",
    featured: true,
  },
  {
    id: "15",
    slug: "souss-valley-cultural-tour",
    title: "Agadir to Souss Valley — Argan & Berber Culture Tour",
    category: "cultural",
    origin: "agadir",
    difficulty: "easy",
    isDayTour: true,
    duration: "1 day",
    groupSize: "2–14 people",
    tourType: "private",
    reviewCount: 73,
    rating: 4.7,
    // Ladder scaled from the confirmed price, read as the two-person rate.
    // Curve measured from the tours with operator-confirmed ladders:
    // day tour. Solo carries the whole guide/vehicle, so it sits ~1.8x above.
    groupPricing: [
      { minPeople: 1, price: 72 },
      { minPeople: 2, price: 40 },
      { minPeople: 3, price: 36 },
      { minPeople: 4, price: 34 },
      { minPeople: 5, price: 32 },
      { minPeople: 6, price: 30 },
    ],
    price: 72,
    depositAmount: 16,
    heroImage:
      "/gallery/tours-souss-valley-cultural-tour.jpg",
    gallery: [
      "/gallery/tours-souss-valley-cultural-tour.jpg",
      "https://images.unsplash.com/photo-1750981081058-acc10295bc11?w=1200&q=85",
      "https://images.unsplash.com/photo-1596750320291-a082a23dcc19?w=1200&q=85",
    ],
    shortDescription:
      "Visit a women-run argan cooperative, a honey village, and a Berber family lunch in the Souss Valley.",
    description:
      "The Souss Valley south of Agadir is the heartland of Moroccan argan production — a UNESCO-protected biosphere where Berber women run the cooperatives that produce the world's most prized oil. Visit the cooperative, watch the traditional extraction process, taste pure argan products, and share a home-cooked lunch with a Berber family.",
    highlights: [
      "Women-run argan oil cooperative visit and tasting",
      "Honey village — local beekeeper demonstration",
      "Traditional Berber family lunch",
      "Souss Valley panoramic viewpoint",
      "Aït Baha market (if market day)",
    ],
    includes: [
      "Round-trip transport from Agadir",
      "Bilingual guide (English/French)",
      "Argan cooperative entrance and tasting",
      "Traditional Berber lunch",
      "Honey tasting",
    ],
    excludes: ["Argan product purchases", "Tips"],
    itinerary: [
      {
        day: 1,
        meals: "L",
        driving: "≈1.5 h round trip",
        distance: "≈90 km round trip",
        title: "Full Day — Souss Valley",
        description:
          "Depart Agadir at 9:00 am. Visit argan cooperative (10:00 am). Drive to honey village. Berber family lunch (1:00 pm). Afternoon visit to Aït Baha or valley viewpoint. Return to Agadir by 5:00 pm.",
      },
    ],
    faq: [
      { q: "What does this day focus on?", a: "The argan story and rural Souss culture — you visit an argan cooperative for a tasting, sample local honey, and share a traditional Berber lunch. It is an easy cultural day from Agadir." },
      { q: "Is the argan cooperative visit a sales stop?", a: "You visit a working cooperative with entrance and tasting included; buying argan products is optional and not part of the price." },
      { q: "What is included?", a: "Round-trip transport from Agadir, a bilingual (English/French) guide, the argan cooperative entrance and tasting, a traditional Berber lunch, and a honey tasting. Argan purchases and tips are not included." },
      { q: "How large is the group?", a: "Between 2 and 14 people on a shared day trip, so you may be travelling alongside others rather than in a private group." },
    ],
    meetingPoint: { lat: 30.0667, lng: -8.6500, name: "Souss Valley, Aït Baha Region" },
    seoTitle: "Souss Valley Argan & Culture Day Trip from Agadir — Women's Cooperative | Marrakech Eco Tours",
    seoDescription: "Visit a women-run argan oil cooperative, a honey village beekeeper, and share a Berber family lunch in the Souss Valley — Morocco's argan heartland. From $72.",
    featured: false,
  },
  {
    id: "16",
    slug: "agadir-to-essaouira-day-trip",
    title: "Agadir to Essaouira — Day Trip",
    category: "day-tours",
    origin: "agadir",
    difficulty: "easy",
    duration: "1 day",
    groupSize: "2–14 people",
    tourType: "private",
    reviewCount: 118,
    rating: 4.8,
    // Ladder scaled from the confirmed price, read as the two-person rate.
    // Curve measured from the tours with operator-confirmed ladders:
    // day tour. Solo carries the whole guide/vehicle, so it sits ~1.8x above.
    groupPricing: [
      { minPeople: 1, price: 116 },
      { minPeople: 2, price: 54 },
      { minPeople: 3, price: 47 },
      { minPeople: 4, price: 41 },
      { minPeople: 5, price: 37 },
      { minPeople: 6, price: 35 },
    ],
    price: 116,
    depositAmount: 26,
    heroImage:
      "/gallery/tours-agadir-to-essaouira-day-trip.jpg",
    gallery: [
      "/gallery/blog-essaouira-day-trip-from-agadir.jpg",
      "https://images.unsplash.com/photo-1624802746702-60ca95bdb605?w=1200&q=85",
      "/gallery/blog-taghazout-surf-guide-morocco.jpg",
    ],
    shortDescription:
      "The Atlantic coast's most magical city — blue boats, ancient ramparts, and the freshest seafood in Morocco.",
    description:
      "Essaouira is two hours north of Agadir along the Atlantic coast. Its blue-and-white UNESCO medina tumbles straight into crashing ocean waves. Stroll the 18th-century Portuguese ramparts, buy silver Berber jewellery from artisans, eat grilled sardines on the harbour wall, and feel the famous Essaouira trade wind.",
    highlights: [
      "18th-century Portuguese seafront ramparts",
      "UNESCO-listed medina and blue fishing harbour",
      "Fresh seafood lunch on the harbour wall",
      "Artisan workshops: woodwork, jewellery, textiles",
      "Famous Essaouira Atlantic wind",
    ],
    includes: [
      "Round-trip transport from Agadir",
      "English-speaking guide",
      "2-hour guided medina walk",
    ],
    excludes: ["Lunch and personal purchases", "Tips"],
    itinerary: [
      {
        day: 1,
        walking: "2–3 h",
        driving: "≈2 h each way",
        distance: "≈175 km each way",
        title: "Agadir → Essaouira → Agadir",
        description:
          "Depart Agadir at 8:00 am. Arrive Essaouira by 10:00 am. Guided medina, ramparts, and harbour walk. Free time for lunch and exploration. Depart 4:30 pm. Back in Agadir by 6:30 pm.",
      },
    ],
    faq: [
      { q: "How much time do we get in Essaouira?", a: "The day includes a 2-hour guided walk of the medina, with free time around it to explore the ramparts, port, and cafés at your own pace." },
      { q: "What is included?", a: "Round-trip transport from Agadir, an English-speaking guide, and the 2-hour guided medina walk. Lunch, personal purchases, and tips are not included." },
      { q: "Is it a lot of driving?", a: "It is an easy full-day trip up the coast; the drive is broken by the guided walk and free time in the walled town." },
      { q: "How big is the group?", a: "Between 2 and 14 people on a shared day trip." },
    ],
    meetingPoint: { lat: 31.5085, lng: -9.7595, name: "Essaouira Medina, Atlantic Coast" },
    seoTitle: "Essaouira Day Trip from Agadir — UNESCO Medina & Atlantic Ramparts | Marrakech Eco Tours",
    seoDescription: "Day trip from Agadir to Essaouira's blue-and-white UNESCO medina — 18th-century Portuguese ramparts, fresh harbour seafood, and artisan workshops. From $116.",
    featured: false,
  },
  {
    id: "17",
    slug: "marrakech-to-chefchaouen-4day",
    relatedPosts: ["marrakech-to-chefchaouen-tour-cost", "chefchaouen-complete-travel-guide", "fes-medina-travel-guide", "marrakech-to-fes-road-trip-guide"],
    title: "Marrakech to Chefchaouen — 4-Day Blue City Tour",
    category: "cultural",
    origin: "marrakech",
    difficulty: "easy",
    duration: "4 days / 3 nights",
    groupSize: "2–12 people",
    tourType: "private",
    reviewCount: 43,
    rating: 4.9,
    // Ladder scaled from the confirmed price, read as the two-person rate.
    // Curve measured from the tours with operator-confirmed ladders:
    // vehicle-based. Solo carries the whole guide/vehicle, so it sits ~1.8x above.
    groupPricing: [
      { minPeople: 1, price: 646 },
      { minPeople: 2, price: 361 },
      { minPeople: 3, price: 296 },
      { minPeople: 4, price: 260 },
      { minPeople: 5, price: 235 },
      { minPeople: 6, price: 213 },
    ],
    price: 646,
    depositAmount: 142,
    heroImage:
      "/gallery/blog-hero-desert-camp-night.jpg",
    gallery: [
      "/gallery/blog-chefchaouen-complete-travel-guide.jpg",
      "https://images.unsplash.com/photo-1538600838042-6a0c694ffab5?w=1200&q=85",
      "https://images.unsplash.com/photo-1707400015348-b0a5851ab163?w=1200&q=85",
    ],
    shortDescription:
      "Four days through Morocco's most iconic imperial cities — ending in the magical blue-washed streets of Chefchaouen in the Rif Mountains.",
    description:
      "This tour links three of Morocco's most photogenic destinations in four days. Drive north from Marrakech through the Middle Atlas cedar forests, spend a day exploring Fes el-Bali — the world's largest medieval city — then continue to Chefchaouen, the legendary Blue City tumbling down the flanks of the Rif Mountains. Cobalt walls, mountain streams, and zero mass tourism.",
    highlights: [
      "Chefchaouen — the Blue City of the Rif Mountains",
      "Fes el-Bali UNESCO medina and Chouara Tanneries",
      "Cedar Forest of Azrou and wild Barbary macaques",
      "Volubilis Roman ruins (UNESCO World Heritage)",
      "Meknes — the Moroccan Versailles",
    ],
    includes: [
      "Private 4x4 transport throughout",
      "English/French-speaking guide",
      "3 nights riad accommodation",
      "Breakfast daily",
      "All transfers and tolls",
    ],
    excludes: ["Lunches and dinners", "Tips", "Return transport from Chefchaouen"],
    itinerary: [
      {
        day: 1,
        meals: "D",
        stay: "Hotel",
        driving: "≈7 h",
        distance: "≈480 km",
        stop: { name: "Fes", lat: 34.033, lng: -5.0 },
        title: "Marrakech → Ifrane → Fes",
        description:
          "Depart Marrakech at 7:00 am. Cross the Middle Atlas. Stop in Ifrane and the Azrou cedar forest for Barbary macaques. Arrive Fes by evening. Check in to your riad.",
      },
      {
        day: 2,
        meals: "B",
        stay: "Hotel",
        stop: { name: "Fes", lat: 34.033, lng: -5.0 },
        title: "Fes Medina Full Day",
        description:
          "Full guided day in Fes el-Bali: Chouara Tanneries, Al-Qarawiyyin University, Medersa Bou Inania, and the ancient souks. Evening walk on the medina walls.",
      },
      {
        day: 3,
        meals: "B,D",
        stay: "Hotel",
        driving: "≈4 h",
        distance: "≈200 km",
        stop: { name: "Chefchaouen", lat: 35.169, lng: -5.263 },
        title: "Fes → Volubilis → Meknes → Chefchaouen",
        description:
          "Morning visit to Volubilis — Morocco's best-preserved Roman ruins. Drive to Meknes (the Moroccan Versailles). Continue to Chefchaouen in the Rif Mountains. Arrive by evening.",
      },
      {
        day: 4,
        meals: "B",
        stop: { name: "Chefchaouen", lat: 35.169, lng: -5.263 },
        title: "Chefchaouen Full Day",
        description:
          "Full day in the Blue City. Guided walk through the medina's blue-washed lanes, the Spanish Mosque viewpoint, and the Ras El-Maa waterfall. Tour concludes in Chefchaouen.",
      },
    ],
    faq: [
      { q: "Does this tour finish in Chefchaouen?", a: "Yes. It is a one-way journey from Marrakech to Chefchaouen over four days, so return transport from Chefchaouen is not included — plan your onward travel." },
      { q: "What is included?", a: "Private 4x4 transport throughout, an English/French-speaking guide, three nights of riad accommodation, daily breakfast, and all transfers and tolls. Lunches, dinners, and tips are not included." },
      { q: "How demanding is the trip?", a: "Easy. It is a road journey by private 4x4 with sightseeing stops, not a trek." },
      { q: "Where do we stay?", a: "Three nights in riads with breakfast each morning." },
    ],
    meetingPoint: { lat: 35.1688, lng: -5.2636, name: "Chefchaouen, Rif Mountains" },
    seoTitle: "Marrakech to Chefchaouen 4-Day Blue City Tour — Fes, Volubilis & Rif Mountains | Marrakech Eco Tours",
    seoDescription: "4-day tour from Marrakech to the blue-washed streets of Chefchaouen via Fes, Volubilis Roman ruins, and Meknes. Private 4x4 with riad accommodation. From $646.",
    featured: false,
  },
  {
    id: "18",
    slug: "marrakech-imperial-cities-5day",
    title: "Marrakech — All 4 Imperial Cities — 5-Day Grand Tour",
    category: "cultural",
    origin: "marrakech",
    difficulty: "easy",
    duration: "5 days / 4 nights",
    groupSize: "2–12 people",
    tourType: "private",
    reviewCount: 27,
    rating: 4.8,
    // Ladder scaled from the confirmed price, read as the two-person rate.
    // Curve measured from the tours with operator-confirmed ladders:
    // vehicle-based. Solo carries the whole guide/vehicle, so it sits ~1.8x above.
    groupPricing: [
      { minPeople: 1, price: 913 },
      { minPeople: 2, price: 510 },
      { minPeople: 3, price: 418 },
      { minPeople: 4, price: 367 },
      { minPeople: 5, price: 332 },
      { minPeople: 6, price: 301 },
    ],
    price: 913,
    depositAmount: 201,
    heroImage:
      "/gallery/tours-marrakech-imperial-cities-5day.jpg",
    gallery: [
      "/gallery/tours-marrakech-to-fes-3day.jpg",
      "https://images.unsplash.com/photo-1697028733028-e2a104b952b9?w=1200&q=85",
      "/gallery/blog-marrakech-medina-complete-guide.jpg",
    ],
    shortDescription:
      "Morocco's four imperial capitals in five days — Marrakech, Meknes, Fes, and Rabat — from a country that has had four seats of power for a thousand years.",
    description:
      "Morocco's four imperial cities — Marrakech, Meknes, Fes, and Rabat — each carry a different chapter of the country's history. This five-day grand circuit takes you through all of them: the labyrinthine medina of Fes, the monumental gates of Meknes, the UNESCO coastal capital of Rabat, and back to the rose city of Marrakech. One of the great overland journeys in Africa.",
    highlights: [
      "All 4 Imperial Cities: Marrakech, Meknes, Fes, Rabat",
      "Volubilis Roman ruins (UNESCO World Heritage)",
      "Hassan II Mosque in Rabat",
      "Chouara Tanneries in Fes",
      "Bab Mansour — the greatest gate in North Africa",
    ],
    includes: [
      "Private 4x4 transport throughout",
      "English/French/Spanish-speaking guide",
      "4 nights riad accommodation",
      "Breakfast daily",
      "All transfers, tolls, and entrance fees",
    ],
    excludes: ["Lunches and dinners", "Tips"],
    itinerary: [
      {
        day: 1,
        meals: "D",
        stay: "Hotel",
        driving: "≈6 h",
        distance: "≈360 km",
        stop: { name: "Midelt", lat: 32.68, lng: -4.745 },
        title: "Marrakech → Aït Ben Haddou → Ouarzazate → Midelt",
        description:
          "Drive north from Marrakech via the Atlas. Stop at Aït Ben Haddou. Continue to Midelt for the night in the high plains between the two Atlas ranges.",
      },
      {
        day: 2,
        meals: "B,D",
        stay: "Hotel",
        driving: "≈5 h",
        distance: "≈300 km",
        stop: { name: "Meknes", lat: 33.893, lng: -5.547 },
        title: "Midelt → Volubilis → Meknes",
        description:
          "Morning at the Volubilis Roman ruins. Afternoon in Meknes: Bab Mansour gate, the royal granaries, and the medina souks. Night in Meknes.",
      },
      {
        day: 3,
        meals: "B",
        stay: "Hotel",
        stop: { name: "Fes", lat: 34.033, lng: -5.0 },
        title: "Meknes → Fes Full Day",
        description:
          "Full day in Fes el-Bali with an expert guide. Chouara Tanneries, Al-Qarawiyyin, Medersa Bou Inania, and the ancient jewellers' souk. Night in Fes.",
      },
      {
        day: 4,
        meals: "B,D",
        stay: "Hotel",
        driving: "≈3 h",
        distance: "≈200 km",
        stop: { name: "Rabat", lat: 34.021, lng: -6.842 },
        title: "Fes → Rabat",
        description:
          "Drive west to Rabat on the Atlantic coast. Visit the Hassan Tower and Mohammed V Mausoleum, the Kasbah of the Udayas, and the walled medina. Night in Rabat.",
      },
      {
        day: 5,
        meals: "B",
        driving: "≈4 h",
        distance: "≈240 km",
        stop: { name: "Marrakech", lat: 31.6295, lng: -7.9811 },
        title: "Rabat → Casablanca → Marrakech",
        description:
          "Optional stop at the Hassan II Mosque in Casablanca (exterior — the world's largest mosque outside of Saudi Arabia). Continue south to Marrakech. Arrive by evening.",
      },
    ],
    faq: [
      { q: "Which cities does this cover?", a: "Morocco's imperial cities over five days from Marrakech, by private 4x4, with all transfers, tolls, and entrance fees included so you are not paying at each monument." },
      { q: "What is included?", a: "Private 4x4 transport, an English/French/Spanish-speaking guide, four nights of riad accommodation, daily breakfast, and all transfers, tolls, and entrance fees. Lunches, dinners, and tips are not included." },
      { q: "How much walking is there?", a: "It is graded easy, but expect plenty of walking through medinas and monuments each day, so comfortable shoes matter." },
      { q: "Is it private?", a: "Yes, it runs as a private tour for your party of 2–12 with your own guide and vehicle." },
    ],
    meetingPoint: { lat: 34.0209, lng: -6.8416, name: "Rabat, Atlantic Capital" },
    seoTitle: "All 4 Imperial Cities Morocco 5-Day Tour — Marrakech, Meknes, Fes & Rabat | Marrakech Eco Tours",
    seoDescription: "Grand circuit through Morocco's four imperial capitals in 5 days. Volubilis Roman ruins, Chouara Tanneries, Bab Mansour, and Hassan Tower. Private 4x4 from Marrakech. From $913.",
    featured: false,
  },

  // ─────────────────────────────────────────────
  // DESERT TOURS FROM MARRAKECH (new)
  // ─────────────────────────────────────────────
  {
    id: "23",
    slug: "zagora-2day-marrakech",
    title: "Marrakech to Zagora — 2-Day Desert Tour",
    category: "desert",
    origin: "marrakech",
    difficulty: "easy",
    duration: "2 days / 1 night",
    groupSize: "2–12 people",
    tourType: "private",
    reviewCount: 143,
    rating: 4.8,
    // Shared departure: a flat per-seat price with no group tiers,
    // because a seat costs the same however many people book it.
    // Benchmarked on their 2-day Zagora shared seat at €69, less 10%.
    // Ladder scaled from the confirmed price, read as the two-person rate.
    // Curve measured from the tours with operator-confirmed ladders:
    // vehicle-based. Solo carries the whole guide/vehicle, so it sits ~1.8x above.
    groupPricing: [
      { minPeople: 1, price: 190 },
      { minPeople: 2, price: 89 },
      { minPeople: 3, price: 70 },
      { minPeople: 4, price: 59 },
      { minPeople: 5, price: 51 },
      { minPeople: 6, price: 45 },
    ],
    price: 190,
    depositAmount: 42,
    heroImage:
      "/gallery/tours-zagora-2day-marrakech.jpg",
    gallery: [
      "/gallery/blog-marrakech-to-fes-road-trip-guide.jpg",
      "/gallery/blog-how-much-does-a-morocco-desert-tour-cost.jpg",
      "/gallery/blog-what-to-pack-desert-tour-morocco.jpg",
    ],
    shortDescription:
      "The fastest route to the Sahara from Marrakech — through Aït Ben Haddou and the 200 km Draa Valley palmery to a desert camp under the stars near Zagora.",
    description:
      "Two days to the desert and back. Zagora offers a genuine Saharan experience — camel treks, a night in a Berber camp, and a vast star-filled sky — without the longer drive to Merzouga. The route through the Draa Valley is one of the most beautiful in Morocco: 200 km of date palm oasis, ancient kasbahs, and Berber villages lining the river. The dunes at Erg Lehoudi are quieter and less crowded than Erg Chebbi, making this the perfect trip for travellers with limited time who still want the full desert experience.",
    highlights: [
      "Draa Valley — Morocco's longest oasis, 200 km of date palms and kasbahs",
      "Camel trek on the Erg Lehoudi dunes at sunset",
      "Overnight in a Berber desert camp with traditional music",
      "UNESCO Ksar of Aït Ben Haddou",
      "Tamegroute — a 14th-century Koranic library still open to visitors",
      "Less crowded than Merzouga — a more intimate desert experience",
    ],
    includes: [
      "Air-conditioned minibus transport throughout",
      "English-speaking driver-guide",
      "1 night Berber desert camp (dinner + breakfast)",
      "Sunset camel trek",
      "Mineral water and tea",
    ],
    excludes: [
      "Lunches on both days",
      "Personal travel insurance",
      "Tips",
    ],
    itinerary: [
      {
        day: 1,
        meals: "D",
        stay: "Desert camp",
        driving: "≈7 h",
        distance: "≈360 km",
        stop: { name: "Zagora", lat: 30.332, lng: -5.838 },
        title: "Marrakech → Aït Ben Haddou → Draa Valley → Zagora Camp",
        description:
          "Pick-up from your Marrakech accommodation at 7:00 am. Cross the Tizi n'Tichka pass and stop at the UNESCO Ksar of Aït Ben Haddou. Lunch in Ouarzazate. Drive south through the full length of the Draa Valley oasis — palm groves, mud-brick villages, and ancient granary kasbahs lining the road. Stop at Tamegroute to see the 14th-century library and famous green pottery workshops. Arrive the desert camp near Zagora by late afternoon. Mount a camel for the sunset ride across the dunes. Traditional Berber dinner and music around the campfire.",
      },
      {
        day: 2,
        meals: "B",
        driving: "≈7 h",
        distance: "≈360 km",
        stop: { name: "Marrakech", lat: 31.6295, lng: -7.9811 },
        title: "Sunrise over the Dunes → Draa Valley → Marrakech",
        description:
          "Early morning walk or optional camel ride for the desert sunrise. Breakfast at camp. Depart 8:30 am through the Draa Valley oasis in the morning light — a very different atmosphere from the afternoon. Lunch stop in Ouarzazate or en route. Cross back over the High Atlas. Arrive Marrakech by 6:30 pm.",
      },
    ],
    faq: [
      { q: "Is Zagora the full Sahara or a closer desert?", a: "Zagora is the nearer desert option from Marrakech, reachable in a two-day trip. It offers a genuine camp night and camel trek without the longer drive to the big Erg Chebbi dunes." },
      { q: "What is the desert night like?", a: "One night in a Berber desert camp with dinner and breakfast, reached by a sunset camel trek. Nights get cold outside summer, so bring a warm layer." },
      { q: "What is included?", a: "Air-conditioned minibus transport, an English-speaking driver-guide, one night at the Berber camp with dinner and breakfast, the sunset camel trek, and mineral water and tea. Lunches on both days, personal travel insurance, and tips are not included." },
      { q: "How demanding is it?", a: "Easy — the distance is covered by minibus and the camel trek is short." },
    ],
    meetingPoint: { lat: 30.3323, lng: -5.8366, name: "Zagora, Draa Valley" },
    featured: false,
    seoTitle: "Marrakech to Zagora 2-Day Desert Tour — Draa Valley, Camel Trek & Berber Camp | Marrakech Eco Tours",
    seoDescription: "The fastest route to the Sahara — Aït Ben Haddou, the 200 km Draa Valley palmery, and a camel trek into the dunes. 2-day desert tour from Marrakech with Berber camp. From $190.",
  },
  {
    id: "24",
    slug: "erg-chegaga-3day-marrakech",
    title: "Erg Chegaga from Marrakech — 3-Day Remote Desert Expedition",
    category: "desert",
    origin: "marrakech",
    difficulty: "moderate",
    duration: "3 days / 2 nights",
    groupSize: "2–8 people",
    tourType: "private",
    reviewCount: 64,
    rating: 4.9,
    // Stored in USD (see lib/currency-core.ts). Benchmarked against
    // marrakech-desert-trips.com's published 3-day Erg Chigaga table
    // (verified Aug 2026) and set 10% under it at every bracket.
    price: 1464,
    depositAmount: 322,
    // Priced per exact group size, mirroring how these trips are quoted.
    // NOT flat brackets: flattening 2–3 and 4–5 to one rate made four
    // people total less than three (€1,172 vs €1,176), so a trio was
    // better off booking a phantom fourth. Per-size tiers never invert.
    // The 1→2 drop is steep because the vehicle and driver-guide cost the
    // same either way; only camp, meals and fees scale per head.
    groupPricing: [
      { minPeople: 1, price: 1464 },
      { minPeople: 2, price: 662 },
      { minPeople: 3, price: 479 },
      { minPeople: 4, price: 388 },
      { minPeople: 5, price: 324 },
    ],
    heroImage:
      "/gallery/tours-erg-chegaga-3day-marrakech.jpg",
    gallery: [
      "/gallery/category-hero-medina-doorway.jpg",
      "/gallery/blog-sahara-desert-facts.jpg",
      "/gallery/blog-marrakech-to-fes-road-trip-guide.jpg",
      "/gallery/blog-how-much-does-a-morocco-desert-tour-cost.jpg",
    ],
    shortDescription:
      "Morocco's most remote desert — Erg Chegaga requires a 4x4 off-road journey past the last paved road to reach dunes rising 120 m above a vast and unpopulated sea of sand.",
    description:
      "Erg Chegaga is the Sahara that most tourists never find. Unlike Erg Chebbi near Merzouga — where camel trains file past each other in view of hotels — Chegaga requires an off-road 4x4 journey beyond the end of the tarmac at M'Hamid, the last village before the true Sahara. The dune field stretches for kilometres with barely another soul in sight. Three days from Marrakech through Aït Ben Haddou, the Saffron Valley of Taliouine, and the edge of the known world — then two nights deep in the desert where silence is the only sound.",
    highlights: [
      "Erg Chegaga — fewer tourists, 120 m dunes, profound silence",
      "4x4 off-road desert crossing from M'Hamid into the dune field",
      "2 nights in a desert camp with no other camps in sight",
      "Saffron Valley of Taliouine — Morocco's spice capital",
      "UNESCO Ksar of Aït Ben Haddou",
      "Sunrise and sunset camel treks in a private corner of the Sahara",
    ],
    includes: [
      "Private 4x4 transport throughout",
      "Experienced desert guide with off-road expertise",
      "1 night hotel in M'Hamid or Dades Valley",
      "2 nights Berber desert camp (all meals)",
      "All camel treks",
      "Mineral water and mint tea",
    ],
    excludes: [
      "Lunches on day 1 and day 3",
      "Personal travel insurance",
      "Tips",
      "Optional quad biking near M'Hamid (available on site)",
    ],
    itinerary: [
      {
        day: 1,
        meals: "D",
        stay: "Guesthouse",
        driving: "≈8 h",
        distance: "≈460 km",
        stop: { name: "M'Hamid", lat: 29.828, lng: -5.718 },
        title: "Marrakech → Aït Ben Haddou → Taliouine → M'Hamid",
        description:
          "Pick-up at 7:00 am. Cross the Tizi n'Tichka pass and visit Aït Ben Haddou. Continue south through Ouarzazate and into the Saffron Valley near Taliouine — Morocco's saffron capital — for a short stop. Continue to M'Hamid, the last town before the open Sahara. Dinner and overnight in M'Hamid.",
      },
      {
        day: 2,
        meals: "B,D",
        stay: "Desert camp",
        driving: "3–4 h (4x4)",
        distance: "≈60 km",
        stop: { name: "Erg Chegaga", lat: 29.928, lng: -5.928 },
        title: "M'Hamid → Erg Chegaga (4x4 Crossing)",
        description:
          "After breakfast, board the 4x4 — the paved road ends here. Two to three hours of off-road driving through open desert, past scattered nomad camps and fossil-strewn hamada plains. Reach the edge of Erg Chegaga by midday. Camel trek deep into the dune field. Camp is set up in the heart of the erg — no roads, no other camps, no light pollution. Sunset over the dunes. Traditional dinner and a sky blazing with stars.",
      },
      {
        day: 3,
        meals: "B",
        driving: "≈8 h",
        distance: "≈460 km",
        stop: { name: "Marrakech", lat: 31.6295, lng: -7.9811 },
        title: "Sahara Sunrise → M'Hamid → Marrakech",
        description:
          "Pre-dawn wake-up to climb the dune crest for sunrise. Breakfast at camp. The 4x4 returns across the desert to M'Hamid. Begin the long, beautiful drive north through Zagora, the Draa Valley, and back over the High Atlas. Arrive Marrakech by 7:30 pm.",
      },
    ],
    faq: [
      { q: "How is Erg Chegaga different from Merzouga?", a: "Chegaga is remoter and quieter. The dune field is wider but lower than Erg Chebbi, and the final approach is by 4x4 across open desert rather than surfaced road. You may see no other camp at all, which is the entire reason to choose it." },
      { q: "Why is this trip rated moderate rather than easy?", a: "The access. Reaching Chegaga means a 4x4 transfer across open desert, which is rougher going than the road route to Merzouga. The walking itself is not demanding — the rating reflects the journey rather than the effort." },
      { q: "Is Erg Chegaga worth the extra effort over Merzouga?", a: "If solitude is what you are actually after, yes. If you want the tall sculpted dunes from the photographs with straightforward access, Merzouga is the better use of the same three days. Neither is a consolation prize; they are different experiences." },
    ],
    meetingPoint: { lat: 29.8250, lng: -5.7246, name: "M'Hamid, Gateway to Erg Chegaga" },
    featured: true,
    seoTitle: "Erg Chegaga 3-Day Desert Tour from Marrakech — Remote Dunes & 4x4 Sahara Expedition | Marrakech Eco Tours",
    seoDescription: "Morocco's most remote desert experience — 3 days from Marrakech to Erg Chegaga via 4x4 off-road crossing, 2 nights in a private Berber camp. No crowds, 120 m dunes. From $1464 solo, far less per person for two or more.",
  },
  {
    id: "25",
    slug: "desert-4day-marrakech",
    title: "Marrakech Desert Grand Tour — 4 Days",
    category: "desert",
    origin: "marrakech",
    difficulty: "easy",
    duration: "4 days / 3 nights",
    groupSize: "2–10 people",
    tourType: "private",
    reviewCount: 98,
    rating: 4.9,
    // Ladder scaled from the confirmed price, read as the two-person rate.
    // Curve measured from the tours with operator-confirmed ladders:
    // vehicle-based. Solo carries the whole guide/vehicle, so it sits ~1.8x above.
    groupPricing: [
      { minPeople: 1, price: 1026 },
      { minPeople: 2, price: 478 },
      { minPeople: 3, price: 376 },
      { minPeople: 4, price: 316 },
      { minPeople: 5, price: 273 },
      { minPeople: 6, price: 238 },
    ],
    price: 1026,
    depositAmount: 226,
    heroImage:
      "/gallery/tours-desert-4day-marrakech.jpg",
    gallery: [
      "/gallery/blog-what-to-pack-desert-tour-morocco.jpg",
      "/gallery/blog-sahara-desert-facts.jpg",
      "/gallery/category-hero-medina-doorway.jpg",
      "/gallery/blog-marrakech-to-fes-road-trip-guide.jpg",
    ],
    shortDescription:
      "Four days through the full sweep of Morocco's south — mountains, canyons, film studios, a night in the desert, and the Road of a Thousand Kasbahs — all the way to Erg Chebbi and back.",
    description:
      "This is the definitive Marrakech desert circuit. Four days to experience everything the south of Morocco offers: the drama of the High Atlas, the cinematic grandeur of Aït Ben Haddou (used in Game of Thrones, Gladiator, and Lawrence of Arabia), the 400 m walls of Todra Gorge, a full night in an Erg Chebbi desert camp, and the return journey via the legendary Road of a Thousand Kasbahs. A tour with enough time to breathe, explore, and genuinely absorb one of the most spectacular landscapes on earth.",
    highlights: [
      "Full night at an Erg Chebbi desert camp — sunset and sunrise camel treks",
      "Todra Gorge — Morocco's most dramatic canyon (400 m walls, 4 km walk)",
      "UNESCO Ksar of Aït Ben Haddou — Gladiator and Game of Thrones location",
      "Dades Valley — Valley of a Thousand Kasbahs",
      "Skoura Oasis — sea of date palms and ancient earthen kasbahs",
      "Return via the Road of a Thousand Kasbahs — Draa Valley corridor",
    ],
    includes: [
      "Air-conditioned minibus/4x4 transport throughout",
      "Professional bilingual driver-guide (English/French)",
      "1 night hotel in Dades Valley (dinner + breakfast)",
      "1 night traditional Berber desert camp (dinner + breakfast)",
      "1 night hotel in Ouarzazate (breakfast)",
      "Sunset and sunrise camel treks at Erg Chebbi",
      "All transfers and access fees",
      "Mineral water and tea throughout",
    ],
    excludes: [
      "Lunches (recommended budget: €12–15 per meal)",
      "Atlas Film Studios entry ticket (optional, ~€7)",
      "Alcoholic beverages",
      "Personal travel insurance",
      "Tips",
    ],
    itinerary: [
      {
        day: 1,
        meals: "D",
        stay: "Hotel",
        driving: "≈6 h",
        distance: "≈360 km",
        stop: { name: "Aït Ben Haddou", lat: 31.047, lng: -7.129 },
        title: "Marrakech → Aït Ben Haddou → Ouarzazate → Dades Valley",
        description:
          "Pick-up at 7:00 am. Ascend the Tizi n'Tichka pass through the High Atlas (2,260 m). Stop at the UNESCO Ksar of Aït Ben Haddou for a full 45-minute exploration. Lunch break in Ouarzazate with the option to visit the Atlas Film Studios (where Gladiator and Game of Thrones were filmed). Continue through the dramatic Dades Valley — rose-red kasbahs, oasis villages, and the 'monkey fingers' rock formations. Arrive hotel in Dades Valley by 5:00 pm. Dinner and overnight.",
      },
      {
        day: 2,
        meals: "B,D",
        stay: "Desert camp",
        driving: "≈4 h",
        distance: "≈220 km",
        stop: { name: "Todra Gorge", lat: 31.58, lng: -5.6 },
        title: "Dades Valley → Todra Gorge → Merzouga Desert Camp",
        description:
          "Breakfast at the hotel. Walk into Todra Gorge at its narrowest point — a 40 m wide corridor between 400 m limestone walls with a clear river underfoot. Continue east through the pre-Saharan plains, past oasis towns and nomad pastures. Arrive Merzouga in the afternoon. Board your camel for the sunset trek into Erg Chebbi's towering dunes. Arrive at camp as the sky turns red. Traditional Moroccan tagine for dinner, Berber music around the fire, and a sky alive with stars.",
      },
      {
        day: 3,
        meals: "B,D",
        stay: "Hotel",
        driving: "≈5 h",
        distance: "≈300 km",
        stop: { name: "Erg Chebbi, Merzouga", lat: 31.1, lng: -3.98 },
        title: "Sahara Sunrise → Merzouga Village → Ouarzazate",
        description:
          "Rise at 5:30 am to climb the dune and watch the Sahara wake up. Return camel to camp, breakfast, and freshen up at the Merzouga guesthouse. Begin the return via the 'Road of a Thousand Kasbahs' — a different, more southern route through Tazarine and N'Kob, a string of ancient earthen kasbahs along an old caravan route. Arrive Ouarzazate in the evening. Overnight in hotel.",
      },
      {
        day: 4,
        meals: "B",
        driving: "≈4 h",
        distance: "≈200 km",
        stop: { name: "Marrakech", lat: 31.6295, lng: -7.9811 },
        title: "Ouarzazate → Aït Ben Haddou → Tizi n'Tichka → Marrakech",
        description:
          "Morning visit to Taourirt Kasbah in Ouarzazate (optional). Brief return stop at Aït Ben Haddou for a second angle in the morning light. Climb back over the Tizi n'Tichka pass with panoramic Atlas views. Arrive Marrakech by 5:00 pm.",
      },
    ],
    faq: [
      { q: "How much walking or difficulty is involved?", a: "Very little — it is graded easy. Most distance is by air-conditioned minibus or 4x4; effort is limited to short walks at Todra Gorge and Aït Ben Haddou and the optional camel treks." },
      { q: "Where do we sleep each night?", a: "One night in a Dades Valley hotel, one night in a Berber camp at Erg Chebbi, and one night in an Ouarzazate hotel. Dinner and breakfast are included except the final Ouarzazate morning (breakfast only)." },
      { q: "What is not included?", a: "Lunches (budget roughly €12–15 per meal), the optional Atlas Film Studios ticket (~€7), alcoholic drinks, personal travel insurance, and tips." },
      { q: "Do we reach the real Sahara?", a: "Yes — you reach Erg Chebbi with a full night at a desert camp plus sunset and sunrise camel treks. The four-day length is what crossing the Atlas properly requires." },
    ],
    meetingPoint: { lat: 31.0580, lng: -4.0127, name: "Merzouga, Erg Chebbi Sahara" },
    featured: true,
    seoTitle: "4-Day Desert Tour from Marrakech — Erg Chebbi, Todra Gorge & Road of a Thousand Kasbahs | Marrakech Eco Tours",
    seoDescription: "The complete Marrakech desert circuit — 4 days through Aït Ben Haddou, Todra Gorge, an Erg Chebbi desert camp, and the Road of a Thousand Kasbahs. From $1026.",
  },

  // ─────────────────────────────────────────────
  // DESERT TOURS FROM AGADIR (new)
  // ─────────────────────────────────────────────
  {
    id: "26",
    slug: "merzouga-3day-agadir",
    title: "Agadir to Merzouga — 3-Day Sahara Desert Tour",
    category: "desert",
    origin: "agadir",
    difficulty: "easy",
    duration: "3 days / 2 nights",
    groupSize: "2–10 people",
    tourType: "private",
    reviewCount: 52,
    rating: 4.8,
    // Ladder scaled from the confirmed price, read as the two-person rate.
    // Curve measured from the tours with operator-confirmed ladders:
    // vehicle-based. Solo carries the whole guide/vehicle, so it sits ~1.8x above.
    groupPricing: [
      { minPeople: 1, price: 840 },
      { minPeople: 2, price: 391 },
      { minPeople: 3, price: 308 },
      { minPeople: 4, price: 259 },
      { minPeople: 5, price: 223 },
      { minPeople: 6, price: 196 },
    ],
    price: 840,
    depositAmount: 185,
    heroImage:
      "/gallery/tours-merzouga-3day-agadir.jpg",
    gallery: [
      "/gallery/blog-how-much-does-a-morocco-desert-tour-cost.jpg",
      "/gallery/blog-sahara-desert-facts.jpg",
      "/gallery/category-hero-medina-doorway.jpg",
      "/gallery/blog-what-to-pack-desert-tour-morocco.jpg",
    ],
    shortDescription:
      "From Agadir's Atlantic coast to the Sahara's most iconic dune field — through Taroudant, Taliouine, Aït Ben Haddou, and Todra Gorge to a sunset camel trek on Erg Chebbi.",
    description:
      "Most Sahara tours leave from Marrakech. This one starts from Agadir — and the southern route adds two places most tourists miss: Taroudant, Morocco's best-preserved medieval rampart city, and Taliouine, the saffron capital of the world. From there the itinerary follows the classic route east through Ouarzazate, Aït Ben Haddou, and Todra Gorge before delivering you to Erg Chebbi — the Sahara's most dramatic dune field — in time for the sunset camel trek. Three days that cover the full width of southern Morocco.",
    highlights: [
      "Erg Chebbi — camel trek at sunset into 160 m dunes",
      "Overnight in a Berber desert camp under the stars",
      "Taroudant — Morocco's finest medieval walled city",
      "Taliouine — the world's saffron capital",
      "UNESCO Ksar of Aït Ben Haddou",
      "Todra Gorge canyon walk (400 m walls)",
    ],
    includes: [
      "Air-conditioned 4x4 transport throughout",
      "English-speaking driver-guide",
      "1 night hotel in Dades Valley or Tinghir (dinner + breakfast)",
      "1 night Berber desert camp at Erg Chebbi (dinner + breakfast)",
      "Sunset and sunrise camel treks",
      "Mineral water and mint tea throughout",
    ],
    excludes: [
      "Lunches on all three days",
      "Personal travel insurance",
      "Tips",
    ],
    itinerary: [
      {
        day: 1,
        meals: "D",
        stay: "Guesthouse",
        driving: "≈7 h",
        distance: "≈420 km",
        stop: { name: "Dades Valley", lat: 31.356, lng: -6.01 },
        title: "Agadir → Taroudant → Taliouine → Aït Ben Haddou → Dades Valley",
        description:
          "Early pick-up from your Agadir hotel at 6:30 am. Drive east to Taroudant (1 hour) — walk the 16th-century ramparts and the spice souk of this perfectly preserved medieval city. Continue to Taliouine, Morocco's saffron-growing heartland, for a short stop. Drive through Ouarzazate and visit the UNESCO Ksar of Aït Ben Haddou. Continue through the Dades Valley. Arrive hotel by 6:00 pm. Dinner and overnight.",
      },
      {
        day: 2,
        meals: "B,D",
        stay: "Desert camp",
        driving: "≈4 h",
        distance: "≈240 km",
        stop: { name: "Erg Chebbi, Merzouga", lat: 31.1, lng: -3.98 },
        title: "Dades Valley → Todra Gorge → Erg Chebbi Camp",
        description:
          "Breakfast at hotel. Walk the floor of Todra Gorge — 400 m walls of pink limestone framing a narrow river corridor. Drive east across the desert plains to Merzouga. Board your camel at sunset and ride into the towering dunes of Erg Chebbi. Camp is reached as the sky darkens. Traditional tagine dinner, Berber music, and stargazing in the Saharan dark.",
      },
      {
        day: 3,
        meals: "B",
        driving: "≈9 h",
        distance: "≈560 km",
        stop: { name: "Agadir", lat: 30.428, lng: -9.598 },
        title: "Sahara Sunrise → Merzouga → Agadir",
        description:
          "Rise at 5:30 am for the sunrise over the dunes. Return camel ride, breakfast at camp, freshen up in Merzouga. Begin the long return journey west and south — through Rissani, Tazarine, and the desert plains, back over the Tizi n'Tichka pass and down to Agadir. Arrive by 8:00–9:00 pm.",
      },
    ],
    faq: [
      { q: "Does this reach the big Erg Chebbi dunes?", a: "Yes — over three days from Agadir you reach the Erg Chebbi dunes at Merzouga, with a camp night and sunset and sunrise camel treks." },
      { q: "Where do we stay?", a: "One night in a hotel in the Dades Valley or Tinghir and one night in a Berber desert camp at Erg Chebbi, both with dinner and breakfast." },
      { q: "What is included?", a: "Air-conditioned 4x4 transport, an English-speaking driver-guide, the two nights described with dinner and breakfast, sunset and sunrise camel treks, and mineral water and mint tea throughout. Lunches on all three days, personal travel insurance, and tips are not included." },
      { q: "How demanding is it?", a: "Easy — the route is covered by 4x4 with stops, and camel rides are short and optional." },
    ],
    meetingPoint: { lat: 30.4202, lng: -9.5981, name: "Agadir City Centre" },
    featured: false,
    seoTitle: "Agadir to Merzouga 3-Day Desert Tour — Erg Chebbi, Taroudant & Taliouine | Marrakech Eco Tours",
    seoDescription: "From Agadir's Atlantic coast to the Sahara — via Taroudant, Taliouine, Aït Ben Haddou, and a sunset camel trek on Erg Chebbi. 3-day desert tour with Berber camp. From $840.",
  },
  {
    id: "27",
    slug: "zagora-2day-agadir",
    title: "Agadir to Zagora — 2-Day Desert Tour",
    category: "desert",
    origin: "agadir",
    difficulty: "easy",
    duration: "2 days / 1 night",
    groupSize: "2–10 people",
    tourType: "private",
    reviewCount: 41,
    rating: 4.7,
    // Ladder scaled from the confirmed price, read as the two-person rate.
    // Curve measured from the tours with operator-confirmed ladders:
    // vehicle-based. Solo carries the whole guide/vehicle, so it sits ~1.8x above.
    groupPricing: [
      { minPeople: 1, price: 510 },
      { minPeople: 2, price: 238 },
      { minPeople: 3, price: 187 },
      { minPeople: 4, price: 158 },
      { minPeople: 5, price: 136 },
      { minPeople: 6, price: 119 },
    ],
    price: 510,
    depositAmount: 112,
    heroImage:
      "/gallery/tours-zagora-2day-agadir.jpg",
    gallery: [
      "/gallery/blog-marrakech-to-fes-road-trip-guide.jpg",
      "/gallery/blog-how-much-does-a-morocco-desert-tour-cost.jpg",
      "/gallery/blog-what-to-pack-desert-tour-morocco.jpg",
    ],
    shortDescription:
      "Two days from Agadir's Atlantic beaches to the desert — via the walled city of Taroudant, the carpet capital of Taznakht, and the 200 km Draa Valley palmery to the Zagora dunes.",
    description:
      "The quickest route from Agadir to the desert does not go through Marrakech. It heads east through Taroudant and Taznakht, entering the Draa Valley from the south — Morocco's longest oasis, a ribbon of date palms, ancient kasbahs, and Berber settlements stretching 200 km through the pre-Saharan south. Zagora's dunes are quieter than Merzouga, the atmosphere is more intimate, and after a night in a traditional Berber camp listening to music under an immense black sky, the drive back feels entirely worth it.",
    highlights: [
      "Zagora dunes — a quieter, more intimate desert camp experience",
      "Draa Valley — 200 km of date palm oasis and ancient kasbahs",
      "Taroudant — best-preserved medieval ramparts in Morocco",
      "Taznakht — Berber carpet weaving capital",
      "Sunset camel trek and stargazing from the desert",
      "Tamegroute's 14th-century Koranic library",
    ],
    includes: [
      "Air-conditioned transport throughout",
      "English-speaking driver-guide",
      "1 night Berber desert camp (dinner + breakfast)",
      "Sunset camel trek",
      "Mineral water and mint tea",
    ],
    excludes: [
      "Lunches on both days",
      "Personal travel insurance",
      "Tips",
    ],
    itinerary: [
      {
        day: 1,
        meals: "D",
        stay: "Desert camp",
        driving: "≈8 h",
        distance: "≈500 km",
        stop: { name: "Zagora", lat: 30.332, lng: -5.838 },
        title: "Agadir → Taroudant → Taznakht → Draa Valley → Zagora",
        description:
          "Pick-up from your Agadir hotel at 7:30 am. Drive east to Taroudant — walk the 16th-century ochre ramparts and the Berber market. Continue to Taznakht, the Berber carpet-weaving capital. Enter the Draa Valley from the west and follow it south through date palm groves and ancient villages to Zagora. Arrive the desert camp in time for a sunset camel ride on the dunes. Traditional Berber dinner and music under the stars.",
      },
      {
        day: 2,
        meals: "B",
        driving: "≈8 h",
        distance: "≈500 km",
        stop: { name: "Agadir", lat: 30.428, lng: -9.598 },
        title: "Sunrise → Tamegroute → Draa Valley → Agadir",
        description:
          "Optional early morning camel ride for the sunrise. Breakfast at camp. Stop at Tamegroute — a village with a 14th-century Koranic library housing hand-illuminated manuscripts and a famous green-glazed pottery cooperative. Drive north through the full length of the Draa Valley in the morning light. Return through Ouarzazate and back to Agadir. Arrive by 6:30 pm.",
      },
    ],
    faq: [
      { q: "Is this the full Sahara?", a: "Zagora is the nearer desert from Agadir, done as a two-day trip with a Berber camp night and a sunset camel trek — a genuine desert overnight without the longest drives." },
      { q: "What is included?", a: "Air-conditioned transport, an English-speaking driver-guide, one night at a Berber desert camp with dinner and breakfast, the sunset camel trek, and mineral water and mint tea. Lunches on both days, personal travel insurance, and tips are not included." },
      { q: "What is the camp night like?", a: "A Berber desert camp with dinner and breakfast; bring a warm layer as desert nights get cold outside summer." },
      { q: "How demanding is it?", a: "Easy — transport does the distance and the camel trek is short." },
    ],
    meetingPoint: { lat: 30.4202, lng: -9.5981, name: "Agadir City Centre" },
    featured: false,
    seoTitle: "Agadir to Zagora 2-Day Desert Tour — Draa Valley, Taroudant & Berber Camp | Marrakech Eco Tours",
    seoDescription: "From Agadir's coast to the Zagora desert in 2 days — via Taroudant, the 200 km Draa Valley palmery, and a sunset camel trek. Berber camp under the stars. From $510.",
  },
  {
    id: "28",
    slug: "erg-chegaga-3day-agadir",
    relatedPosts: ["sahara-tour-from-agadir-cost", "erg-chebbi-vs-erg-chegaga", "sahara-desert-from-agadir", "what-to-pack-desert-tour-morocco"],
    title: "Agadir to Erg Chegaga — 3-Day Remote Desert Tour",
    category: "desert",
    origin: "agadir",
    difficulty: "moderate",
    duration: "3 days / 2 nights",
    groupSize: "2–8 people",
    tourType: "private",
    reviewCount: 28,
    rating: 4.9,
    // Benchmarked 10% under their 3-day Agadir to Erg Chigaga — same trip
    // (published table, verified Aug 2026).
    price: 1395,
    depositAmount: 307,
    groupPricing: [
      { minPeople: 1, price: 1395 },
      { minPeople: 2, price: 680 },
      { minPeople: 3, price: 493 },
      { minPeople: 4, price: 377 },
      { minPeople: 5, price: 324 },
    ],
    heroImage:
      "/gallery/tours-erg-chegaga-3day-agadir.jpg",
    gallery: [
      "/gallery/blog-sahara-desert-facts.jpg",
      "/gallery/category-hero-medina-doorway.jpg",
      "/gallery/blog-how-much-does-a-morocco-desert-tour-cost.jpg",
    ],
    shortDescription:
      "Agadir's best Sahara route — south through the Anti-Atlas foothills and Draa Valley to reach Erg Chegaga, Morocco's most remote dune field, by 4x4.",
    description:
      "From Agadir, the route to Erg Chegaga is the most natural in Morocco. Head south through the Anti-Atlas foothills via Tata and Foum Zguid, entering the edge of the Sahara from the west — a very different approach than the standard Marrakech route. Erg Chegaga is the Sahara for those who want fewer tourists, larger dunes in total, and a more genuine feeling of wilderness. The 4x4 crossing from M'Hamid is part of the adventure. Two nights deep in the desert, away from everything.",
    highlights: [
      "Erg Chegaga — Morocco's most remote dune field, reached by 4x4",
      "Unique southern approach via Anti-Atlas foothills and Tata",
      "2 nights in a Berber camp with no other camps in sight",
      "Draa Valley return — full 200 km oasis corridor",
      "Sunset and sunrise camel treks on vast, empty dunes",
      "Some of the darkest skies in North Africa for stargazing",
    ],
    includes: [
      "Private 4x4 transport throughout",
      "Experienced desert guide with off-road expertise",
      "1 night accommodation in Foum Zguid or M'Hamid",
      "2 nights Berber desert camp at Erg Chegaga (all meals)",
      "All camel treks",
      "Mineral water and tea throughout",
    ],
    excludes: [
      "Lunches on days 1 and 3",
      "Personal travel insurance",
      "Tips",
    ],
    itinerary: [
      {
        day: 1,
        meals: "D",
        stay: "Guesthouse",
        driving: "≈7 h",
        distance: "≈400 km",
        stop: { name: "Foum Zguid", lat: 30.087, lng: -6.868 },
        title: "Agadir → Anti-Atlas Foothills → Tata → Foum Zguid / M'Hamid",
        description:
          "Early pick-up from Agadir at 6:30 am. Drive south through the Anti-Atlas foothills — the oldest mountain range in Morocco, stranger and more ancient-looking than the High Atlas. Pass through the oasis town of Tata and continue to Foum Zguid or M'Hamid, the last settlements before Erg Chegaga. Dinner and overnight.",
      },
      {
        day: 2,
        meals: "B,D",
        stay: "Desert camp",
        driving: "3–4 h (4x4)",
        distance: "≈70 km",
        stop: { name: "Erg Chegaga", lat: 29.928, lng: -5.928 },
        title: "4x4 Crossing into Erg Chegaga",
        description:
          "After breakfast, the paved road ends. Board the 4x4 for the off-road crossing — two to three hours of desert driving through open hammada, fossil plains, and scattered acacia. Arrive at the edge of Erg Chegaga by midday. Camel trek into the dune field. Camp is set deep in the erg. Sunset over the dunes, dinner by firelight, a silence you will not forget.",
      },
      {
        day: 3,
        meals: "B",
        driving: "≈8 h",
        distance: "≈450 km",
        stop: { name: "Agadir", lat: 30.428, lng: -9.598 },
        title: "Sunrise → M'Hamid → Draa Valley → Agadir",
        description:
          "Rise before dawn for the full sunrise over the dunes. Breakfast at camp. The 4x4 returns across the desert to M'Hamid. Drive north through the Draa Valley — one of the most beautiful drives in Morocco — and back to Agadir via Zagora and Ouarzazate. Arrive Agadir by 8:00 pm.",
      },
    ],
    faq: [
      { q: "How is Erg Chegaga different from other desert trips?", a: "Erg Chegaga is the wilder, less-visited big dune field, reached by off-road 4x4. This trip is graded moderate and spends two nights at a desert camp there — more remote than the Zagora or Merzouga routes." },
      { q: "Where do we stay?", a: "One night in Foum Zguid or M'Hamid and two nights at the Berber desert camp at Erg Chegaga with all meals included at the camp." },
      { q: "What is included?", a: "Private 4x4 transport with an off-road-experienced desert guide, the three nights described (two at camp with all meals), all camel treks, and mineral water and tea throughout. Lunches on days 1 and 3, personal travel insurance, and tips are not included." },
      { q: "Why is it graded moderate?", a: "The remoteness and long off-road driving to reach Erg Chegaga make it more involved than the easy desert circuits, though it is not a trek." },
    ],
    meetingPoint: { lat: 30.4202, lng: -9.5981, name: "Agadir City Centre" },
    featured: false,
    seoTitle: "Agadir to Erg Chegaga 3-Day Desert Tour — Remote Sahara & 4x4 Expedition | Marrakech Eco Tours",
    seoDescription: "Morocco's most remote desert from Agadir — 3 days through the Anti-Atlas to Erg Chegaga via 4x4, 2 nights in a private Berber camp. Fewer tourists, bigger silence. From $1395.",
  },
  {
    id: "29",
    slug: "desert-4day-agadir",
    relatedPosts: ["sahara-tour-from-agadir-cost", "sahara-desert-from-agadir", "best-day-trips-from-agadir", "what-to-pack-desert-tour-morocco"],
    title: "Agadir Desert Grand Tour — 4 Days",
    category: "desert",
    origin: "agadir",
    difficulty: "easy",
    duration: "4 days / 3 nights",
    groupSize: "2–10 people",
    tourType: "private",
    reviewCount: 39,
    rating: 4.8,
    // Ladder scaled from the confirmed price, read as the two-person rate.
    // Curve measured from the tours with operator-confirmed ladders:
    // vehicle-based. Solo carries the whole guide/vehicle, so it sits ~1.8x above.
    groupPricing: [
      { minPeople: 1, price: 1196 },
      { minPeople: 2, price: 556 },
      { minPeople: 3, price: 438 },
      { minPeople: 4, price: 368 },
      { minPeople: 5, price: 318 },
      { minPeople: 6, price: 279 },
    ],
    price: 1196,
    depositAmount: 263,
    heroImage:
      "/gallery/tours-desert-4day-agadir.jpg",
    gallery: [
      "/gallery/blog-what-to-pack-desert-tour-morocco.jpg",
      "/gallery/blog-how-much-does-a-morocco-desert-tour-cost.jpg",
      "/gallery/blog-sahara-desert-facts.jpg",
      "/gallery/blog-marrakech-to-fes-road-trip-guide.jpg",
    ],
    shortDescription:
      "Four days from the Atlantic coast to the Sahara and back — Taroudant, Aït Ben Haddou, Todra Gorge, a full night in an Erg Chebbi desert camp, and the Road of a Thousand Kasbahs.",
    description:
      "The ultimate desert circuit starting from Agadir — and it has one advantage over every Marrakech tour: two destinations that Marrakech tourists miss. Taroudant's perfectly preserved 16th-century ramparts and Taliouine's saffron fields are worth the early start. From there the itinerary follows the great southern arc: Aït Ben Haddou, Ouarzazate, the Dades Valley, Todra Gorge, and Erg Chebbi — the most iconic dune field in Morocco. Four days that show you the full width and depth of the Moroccan south.",
    highlights: [
      "Erg Chebbi desert camp — two camel treks, a full desert night",
      "Taroudant — medieval walled city unique to the Agadir route",
      "Taliouine — the world's saffron capital (unique to Agadir route)",
      "UNESCO Ksar of Aït Ben Haddou",
      "Todra Gorge — walk between 400 m canyon walls",
      "Road of a Thousand Kasbahs — return via ancient caravan route",
    ],
    includes: [
      "Air-conditioned 4x4 transport throughout",
      "Professional bilingual driver-guide (English/French)",
      "1 night hotel in Dades Valley (dinner + breakfast)",
      "1 night Berber desert camp at Erg Chebbi (dinner + breakfast)",
      "1 night hotel in Ouarzazate (breakfast)",
      "Sunset and sunrise camel treks",
      "Mineral water and mint tea throughout",
    ],
    excludes: [
      "Lunches throughout (budget €12–15 per meal)",
      "Atlas Film Studios entry (optional, ~€7)",
      "Alcoholic beverages",
      "Personal travel insurance",
      "Tips",
    ],
    itinerary: [
      {
        day: 1,
        meals: "D",
        stay: "Guesthouse",
        driving: "≈7 h",
        distance: "≈420 km",
        stop: { name: "Dades Valley", lat: 31.356, lng: -6.01 },
        title: "Agadir → Taroudant → Taliouine → Aït Ben Haddou → Dades Valley",
        description:
          "Pick-up from your Agadir hotel at 6:30 am. Drive east to Taroudant — explore the best-preserved 16th-century ramparts in Morocco and the ancient Berber spice market. Continue to Taliouine for a saffron cooperative visit. Drive through Ouarzazate and stop at the UNESCO Ksar of Aït Ben Haddou. Continue through the dramatic Dades Valley. Arrive hotel by 6:00 pm. Dinner and overnight.",
      },
      {
        day: 2,
        meals: "B,D",
        stay: "Desert camp",
        driving: "≈4 h",
        distance: "≈240 km",
        stop: { name: "Erg Chebbi, Merzouga", lat: 31.1, lng: -3.98 },
        title: "Dades Valley → Todra Gorge → Erg Chebbi Camp",
        description:
          "Breakfast at hotel. Walk the floor of Todra Gorge — 400 m limestone walls, a river underfoot, and almost no crowds in the early morning. Drive east through the pre-Saharan oasis landscape to Merzouga. Mount your camel at the dune edge and ride into Erg Chebbi as the sun sets. Reach camp as darkness falls. Traditional tagine, Gnawa music, stargazing in the Saharan sky.",
      },
      {
        day: 3,
        meals: "B,D",
        stay: "Hotel",
        driving: "≈5 h",
        distance: "≈300 km",
        stop: { name: "Ouarzazate", lat: 30.92, lng: -6.893 },
        title: "Sahara Sunrise → Road of a Thousand Kasbahs → Ouarzazate",
        description:
          "Pre-dawn wake-up for the sunrise over the dunes. Return camel to camp. Breakfast and freshen up. Take the Road of a Thousand Kasbahs — a southern return route through Tazarine, N'Kob, and the Draa Valley corridor, lined with ancient earthen kasbahs that once served the trans-Saharan caravans. Arrive Ouarzazate by evening. Overnight in hotel.",
      },
      {
        day: 4,
        meals: "B",
        driving: "≈6 h",
        distance: "≈360 km",
        stop: { name: "Agadir", lat: 30.428, lng: -9.598 },
        title: "Ouarzazate → Aït Ben Haddou → Tizi n'Tichka → Agadir",
        description:
          "Optional morning visit to the Atlas Film Studios or Taourirt Kasbah in Ouarzazate. Brief stop at Aït Ben Haddou in the morning light. Cross back through Marrakech and over the Anti-Atlas to Agadir. Arrive by 8:00 pm.",
      },
    ],
    faq: [
      { q: "How demanding is this four-day desert trip?", a: "Easy. Distances are covered by air-conditioned 4x4; the effort is short walks at the sights and the optional camel treks at Erg Chebbi." },
      { q: "Where do we sleep?", a: "One night in a Dades Valley hotel, one night in a Berber camp at Erg Chebbi, and one night in an Ouarzazate hotel. Dinner and breakfast are included except the final Ouarzazate morning (breakfast only)." },
      { q: "What is not included?", a: "Lunches throughout (budget €12–15 per meal), the optional Atlas Film Studios entry (~€7), alcoholic drinks, personal travel insurance, and tips." },
      { q: "Does it reach the real dunes?", a: "Yes — Erg Chebbi at Merzouga, with sunset and sunrise camel treks and a full camp night." },
    ],
    meetingPoint: { lat: 30.4202, lng: -9.5981, name: "Agadir City Centre" },
    featured: false,
    seoTitle: "4-Day Desert Tour from Agadir — Erg Chebbi, Taroudant, Todra Gorge & Road of 1000 Kasbahs | Marrakech Eco Tours",
    seoDescription: "The complete Agadir desert grand tour — 4 days through Taroudant, Aït Ben Haddou, Todra Gorge, an Erg Chebbi camp, and the Road of a Thousand Kasbahs. From $1196.",
  },

  // ─────────────────────────────────────────────
  // IMPERIAL CITIES FROM AGADIR
  // ─────────────────────────────────────────────
  {
    id: "19",
    slug: "agadir-to-fes-4day",
    title: "Agadir to Fes — 4-Day Imperial Cities Tour",
    category: "cultural",
    origin: "agadir",
    difficulty: "easy",
    duration: "4 days / 3 nights",
    groupSize: "2–12 people",
    tourType: "private",
    reviewCount: 34,
    rating: 4.7,
    // Benchmarked 10% under their 4-day Agadir to Merzouga — same length, same start point
    // (published table, verified Aug 2026).
    price: 1188,
    depositAmount: 261,
    groupPricing: [
      { minPeople: 1, price: 1188 }, // €1030
      { minPeople: 2, price: 654 }, // €567
      { minPeople: 3, price: 544 }, // €472
      { minPeople: 4, price: 482 }, // €418
      { minPeople: 5, price: 411 }, // €356
      { minPeople: 6, price: 374 }, // €324
      { minPeople: 7, price: 353 }, // €306
      { minPeople: 10, price: 337 }, // €292
      { minPeople: 14, price: 314 }, // €272  (raised from €266 — the source table inverts here)
    ],
    heroImage:
      "/gallery/tours-agadir-to-fes-4day.jpg",
    gallery: [
      "/gallery/tours-marrakech-to-fes-3day.jpg",
      "https://images.unsplash.com/photo-1697028733028-e2a104b952b9?w=1200&q=85",
      "https://images.unsplash.com/photo-1604569251410-025ed59f126a?w=1200&q=85",
    ],
    shortDescription:
      "From the Atlantic coast to the medieval heart of Morocco — Marrakech, the High Atlas, the cedar forests, and the ancient medina of Fes.",
    description:
      "Starting from Agadir, this four-day journey climbs from the Atlantic coast through Marrakech and over the High Atlas before reaching Fes el-Bali — the world's largest living medieval city. Cross the Tizi n'Tichka pass, pause at the UNESCO Ksar of Aït Ben Haddou, wander the Middle Atlas cedar forests where wild Barbary macaques roam, and lose yourself in the labyrinthine souks of Fes.",
    highlights: [
      "Tizi n'Tichka mountain pass (2,260 m)",
      "Aït Ben Haddou UNESCO World Heritage Ksar",
      "Ifrane — Morocco's Alpine village",
      "Cedar Forest of Azrou and Barbary macaques",
      "Fes el-Bali medina and Chouara Tanneries",
    ],
    includes: [
      "Private 4x4 transport throughout",
      "English/French-speaking guide",
      "3 nights riad accommodation",
      "Breakfast daily",
      "All transfers and tolls",
    ],
    excludes: ["Lunches and dinners", "Tips", "Return transport from Fes"],
    itinerary: [
      {
        day: 1,
        meals: "D",
        stay: "Hotel",
        driving: "≈4 h",
        distance: "≈250 km",
        stop: { name: "Marrakech", lat: 31.6295, lng: -7.9811 },
        title: "Agadir → Marrakech",
        description:
          "Depart Agadir in the morning. Drive north along the Atlantic plain to Marrakech (3h). Afternoon at leisure or optional medina walk. Night in a Marrakech riad.",
      },
      {
        day: 2,
        meals: "B,D",
        stay: "Hotel",
        driving: "≈6 h",
        distance: "≈340 km",
        stop: { name: "Midelt", lat: 32.68, lng: -4.745 },
        title: "Marrakech → Tizi n'Tichka → Aït Ben Haddou → Midelt",
        description:
          "Ascend the Atlas via Tizi n'Tichka. Visit Aït Ben Haddou. Continue through the Ziz Valley to Midelt for the night.",
      },
      {
        day: 3,
        meals: "B,D",
        stay: "Hotel",
        driving: "≈4 h",
        distance: "≈220 km",
        stop: { name: "Fes", lat: 34.033, lng: -5.0 },
        title: "Midelt → Ifrane → Azrou Cedar Forest → Fes",
        description:
          "Drive through the Middle Atlas. Stop in Ifrane and the cedar forest at Azrou to spot wild Barbary macaques. Arrive Fes by afternoon. Check in to your riad.",
      },
      {
        day: 4,
        meals: "B",
        stop: { name: "Fes", lat: 34.033, lng: -5.0 },
        title: "Fes Medina Full Day",
        description:
          "Guided exploration of Fes el-Bali: Chouara Tanneries, Al-Qarawiyyin University, Medersa Bou Inania, and the labyrinthine souks. Tour concludes in Fes.",
      },
    ],
    faq: [
      { q: "Does this trip end in Fes?", a: "Yes — it is a one-way journey from Agadir to Fes over four days, so return transport from Fes is not included." },
      { q: "What is included?", a: "Private 4x4 transport throughout, an English/French-speaking guide, three nights of riad accommodation, daily breakfast, and all transfers and tolls. Lunches, dinners, and tips are not included." },
      { q: "How demanding is it?", a: "Easy — a road journey by private 4x4 with sightseeing stops rather than any trekking." },
      { q: "Where do we stay?", a: "Three nights in riads with breakfast each morning." },
    ],
    meetingPoint: { lat: 34.0331, lng: -5.0003, name: "Fes el-Bali, Imperial City" },
    seoTitle: "4-Day Agadir to Fes Tour — High Atlas, Aït Ben Haddou & Imperial City | Marrakech Eco Tours",
    seoDescription: "Drive from Agadir to Fes via Marrakech, Tizi n'Tichka, and the cedar forests of the Middle Atlas. 4-day private 4x4 tour with riad accommodation. From $1188.",
    featured: false,
  },
  {
    id: "20",
    slug: "agadir-to-chefchaouen-5day",
    title: "Agadir to Chefchaouen — 5-Day Blue City Tour",
    category: "cultural",
    origin: "agadir",
    difficulty: "easy",
    duration: "5 days / 4 nights",
    groupSize: "2–12 people",
    tourType: "private",
    reviewCount: 22,
    rating: 4.9,
    // Ladder scaled from the confirmed price, read as the two-person rate.
    // Curve measured from the tours with operator-confirmed ladders:
    // vehicle-based. Solo carries the whole guide/vehicle, so it sits ~1.8x above.
    groupPricing: [
      { minPeople: 1, price: 797 },
      { minPeople: 2, price: 445 },
      { minPeople: 3, price: 365 },
      { minPeople: 4, price: 320 },
      { minPeople: 5, price: 289 },
      { minPeople: 6, price: 263 },
    ],
    price: 797,
    depositAmount: 175,
    heroImage:
      "/gallery/tours-agadir-to-chefchaouen-5day.jpg",
    gallery: [
      "/gallery/blog-chefchaouen-complete-travel-guide.jpg",
      "https://images.unsplash.com/photo-1538600838042-6a0c694ffab5?w=1200&q=85",
      "https://images.unsplash.com/photo-1707400015348-b0a5851ab163?w=1200&q=85",
    ],
    shortDescription:
      "Five days from the Atlantic coast to the blue-washed streets of Chefchaouen — via Marrakech, Fes, and the Roman ruins of Volubilis.",
    description:
      "This five-day circuit begins in Agadir and threads together Morocco's most photogenic destinations. Drive up to Marrakech, cross the Middle Atlas cedar forests, explore Fes el-Bali — the world's largest medieval city — visit the Roman ruins of Volubilis and the imperial gates of Meknes, then finish in Chefchaouen, the legendary Blue City tumbling down the flanks of the Rif Mountains.",
    highlights: [
      "Chefchaouen — the Blue City of the Rif Mountains",
      "Fes el-Bali UNESCO medina and Chouara Tanneries",
      "Cedar Forest of Azrou and wild Barbary macaques",
      "Volubilis Roman ruins (UNESCO World Heritage)",
      "Meknes — the Moroccan Versailles",
    ],
    includes: [
      "Private 4x4 transport throughout",
      "English/French-speaking guide",
      "4 nights riad accommodation",
      "Breakfast daily",
      "All transfers and tolls",
    ],
    excludes: ["Lunches and dinners", "Tips", "Return transport from Chefchaouen"],
    itinerary: [
      {
        day: 1,
        meals: "D",
        stay: "Hotel",
        driving: "≈4 h",
        distance: "≈250 km",
        stop: { name: "Marrakech", lat: 31.6295, lng: -7.9811 },
        title: "Agadir → Marrakech",
        description:
          "Depart Agadir in the morning. Drive north to Marrakech (3h). Afternoon at leisure. Night in a Marrakech riad.",
      },
      {
        day: 2,
        meals: "B,D",
        stay: "Hotel",
        driving: "≈7 h",
        distance: "≈480 km",
        stop: { name: "Fes", lat: 34.033, lng: -5.0 },
        title: "Marrakech → Ifrane → Fes",
        description:
          "Depart Marrakech early. Cross the Middle Atlas. Stop in Ifrane and the Azrou cedar forest for Barbary macaques. Arrive Fes by evening. Check in to your riad.",
      },
      {
        day: 3,
        meals: "B",
        stay: "Hotel",
        stop: { name: "Fes", lat: 34.033, lng: -5.0 },
        title: "Fes Medina Full Day",
        description:
          "Full guided day in Fes el-Bali: Chouara Tanneries, Al-Qarawiyyin University, Medersa Bou Inania, and the ancient souks. Evening walk on the medina walls.",
      },
      {
        day: 4,
        meals: "B,D",
        stay: "Hotel",
        driving: "≈4 h",
        distance: "≈200 km",
        stop: { name: "Chefchaouen", lat: 35.169, lng: -5.263 },
        title: "Fes → Volubilis → Meknes → Chefchaouen",
        description:
          "Morning visit to Volubilis — Morocco's best-preserved Roman ruins. Drive to Meknes (the Moroccan Versailles). Continue to Chefchaouen in the Rif Mountains. Arrive by evening.",
      },
      {
        day: 5,
        meals: "B",
        stop: { name: "Chefchaouen", lat: 35.169, lng: -5.263 },
        title: "Chefchaouen Full Day",
        description:
          "Full day in the Blue City. Guided walk through the medina's blue-washed lanes, the Spanish Mosque viewpoint, and the Ras El-Maa waterfall. Tour concludes in Chefchaouen.",
      },
    ],
    faq: [
      { q: "Does this finish in Chefchaouen?", a: "Yes — a one-way journey from Agadir to the blue city over five days, so return transport from Chefchaouen is not included." },
      { q: "What is included?", a: "Private 4x4 transport, an English/French-speaking guide, four nights of riad accommodation, daily breakfast, and all transfers and tolls. Lunches, dinners, and tips are not included." },
      { q: "How demanding is the trip?", a: "Easy — it is a private road journey with stops, not a trek." },
      { q: "Where do we stay?", a: "Four nights in riads with breakfast each morning." },
    ],
    meetingPoint: { lat: 35.1688, lng: -5.2636, name: "Chefchaouen, Rif Mountains" },
    seoTitle: "5-Day Agadir to Chefchaouen Tour — Fes, Volubilis & Blue City | Marrakech Eco Tours",
    seoDescription: "5-day tour from Agadir to Morocco's Blue City via Marrakech, Fes, the Roman ruins of Volubilis, and the imperial gates of Meknes. Private 4x4 with riads. From $797.",
    featured: false,
  },
  {
    id: "21",
    slug: "agadir-imperial-cities-6day",
    title: "Agadir — All 4 Imperial Cities — 6-Day Grand Tour",
    category: "cultural",
    origin: "agadir",
    difficulty: "easy",
    duration: "6 days / 5 nights",
    groupSize: "2–12 people",
    tourType: "private",
    reviewCount: 18,
    rating: 4.8,
    // Ladder scaled from the confirmed price, read as the two-person rate.
    // Curve measured from the tours with operator-confirmed ladders:
    // vehicle-based. Solo carries the whole guide/vehicle, so it sits ~1.8x above.
    groupPricing: [
      { minPeople: 1, price: 1063 },
      { minPeople: 2, price: 594 },
      { minPeople: 3, price: 487 },
      { minPeople: 4, price: 428 },
      { minPeople: 5, price: 386 },
      { minPeople: 6, price: 350 },
    ],
    price: 1063,
    depositAmount: 234,
    heroImage:
      "/gallery/tours-agadir-imperial-cities-6day.jpg",
    gallery: [
      "/gallery/tours-marrakech-to-fes-3day.jpg",
      "https://images.unsplash.com/photo-1697028733028-e2a104b952b9?w=1200&q=85",
      "/gallery/blog-marrakech-medina-complete-guide.jpg",
    ],
    shortDescription:
      "Morocco's four imperial capitals in six days from the Atlantic coast — Marrakech, Meknes, Fes, and Rabat.",
    description:
      "Starting from Agadir, this six-day grand circuit takes in all four of Morocco's imperial cities — Marrakech, Meknes, Fes, and Rabat — each a different chapter of the country's thousand-year history. From the rose city of Marrakech to the labyrinthine medina of Fes, the monumental gates of Meknes, and the UNESCO coastal capital of Rabat. One of the great overland journeys in Africa.",
    highlights: [
      "All 4 Imperial Cities: Marrakech, Meknes, Fes, Rabat",
      "Volubilis Roman ruins (UNESCO World Heritage)",
      "Hassan II Mosque in Rabat",
      "Chouara Tanneries in Fes",
      "Bab Mansour — the greatest gate in North Africa",
    ],
    includes: [
      "Private 4x4 transport throughout",
      "English/French/Spanish-speaking guide",
      "5 nights riad accommodation",
      "Breakfast daily",
      "All transfers, tolls, and entrance fees",
    ],
    excludes: ["Lunches and dinners", "Tips"],
    itinerary: [
      {
        day: 1,
        meals: "D",
        stay: "Hotel",
        driving: "≈4 h",
        distance: "≈250 km",
        stop: { name: "Marrakech", lat: 31.6295, lng: -7.9811 },
        title: "Agadir → Marrakech",
        description:
          "Depart Agadir in the morning. Drive north to Marrakech (3h). Afternoon medina walk or at leisure. Night in a Marrakech riad.",
      },
      {
        day: 2,
        meals: "B,D",
        stay: "Hotel",
        driving: "≈6 h",
        distance: "≈360 km",
        stop: { name: "Midelt", lat: 32.68, lng: -4.745 },
        title: "Marrakech → Aït Ben Haddou → Ouarzazate → Midelt",
        description:
          "Drive north from Marrakech via the Atlas. Stop at Aït Ben Haddou. Continue to Midelt for the night in the high plains between the two Atlas ranges.",
      },
      {
        day: 3,
        meals: "B,D",
        stay: "Hotel",
        driving: "≈5 h",
        distance: "≈300 km",
        stop: { name: "Meknes", lat: 33.893, lng: -5.547 },
        title: "Midelt → Volubilis → Meknes",
        description:
          "Morning at the Volubilis Roman ruins. Afternoon in Meknes: Bab Mansour gate, the royal granaries, and the medina souks. Night in Meknes.",
      },
      {
        day: 4,
        meals: "B",
        stay: "Hotel",
        stop: { name: "Fes", lat: 34.033, lng: -5.0 },
        title: "Meknes → Fes Full Day",
        description:
          "Full day in Fes el-Bali with an expert guide. Chouara Tanneries, Al-Qarawiyyin, Medersa Bou Inania, and the ancient jewellers' souk. Night in Fes.",
      },
      {
        day: 5,
        meals: "B,D",
        stay: "Hotel",
        driving: "≈3 h",
        distance: "≈200 km",
        stop: { name: "Rabat", lat: 34.021, lng: -6.842 },
        title: "Fes → Rabat",
        description:
          "Drive west to Rabat on the Atlantic coast. Visit the Hassan Tower and Mohammed V Mausoleum, the Kasbah of the Udayas, and the walled medina. Night in Rabat.",
      },
      {
        day: 6,
        meals: "B",
        driving: "≈4 h",
        distance: "≈240 km",
        stop: { name: "Marrakech", lat: 31.6295, lng: -7.9811 },
        title: "Rabat → Casablanca → Marrakech",
        description:
          "Optional stop at the Hassan II Mosque in Casablanca (exterior — the world's largest mosque outside of Saudi Arabia). Continue south to Marrakech. Onward transfer to Agadir or overnight. Tour concludes.",
      },
    ],
    faq: [
      { q: "What does this six-day tour cover?", a: "Morocco's imperial cities over six days from Agadir, by private 4x4, with all transfers, tolls, and entrance fees included." },
      { q: "What is included?", a: "Private 4x4 transport, an English/French/Spanish-speaking guide, five nights of riad accommodation, daily breakfast, and all transfers, tolls, and entrance fees. Lunches, dinners, and tips are not included." },
      { q: "How much walking is there?", a: "Graded easy, but each day involves plenty of walking through medinas and monuments, so comfortable shoes help." },
      { q: "Is it private?", a: "Yes — a private tour for your party of 2–12 with your own guide and vehicle." },
    ],
    meetingPoint: { lat: 34.0209, lng: -6.8416, name: "Rabat, Atlantic Capital" },
    seoTitle: "All 4 Imperial Cities Morocco 6-Day Tour from Agadir — Marrakech, Meknes, Fes & Rabat | Marrakech Eco Tours",
    seoDescription: "Grand 6-day circuit from Agadir through all four Moroccan imperial cities — Marrakech, Meknes, Fes, and Rabat. Private 4x4 with riad accommodation. From $1063.",
    featured: false,
  },

  // ─────────────────────────────────────────────
  // NEW HIGH ATLAS / TOUBKAL TREKS
  // ─────────────────────────────────────────────
  {
    id: "30",
    slug: "toubkal-circuit-ifni-lake-6day",
    relatedPosts: ["toubkal-circuit-ifni-lake-cost", "best-multi-day-treks-morocco", "what-to-pack-high-atlas-trek-morocco", "toubkal-weather-by-month"],
    title: "Toubkal Circuit & Ifni Lake from Marrakech — 6-Day Trek",
    category: "trekking",
    origin: "marrakech",
    difficulty: "challenging",
    duration: "6 days / 5 nights",
    groupSize: "2–12 people",
    tourType: "private",
    reviewCount: 21,
    rating: 4.9,
    // Real ladder, not the derived curve: a solo traveller pays for the whole
    // private guide and vehicle, so solo is far above the shallow premium
    // groupPriceTiers() would assume.
    // EUR 990 / 790 / 585 / 510 / 480 / 450 at the rate in lib/currency-core.ts.
    groupPricing: [
      { minPeople: 1, price: 1142 },
      { minPeople: 2, price: 911 },
      { minPeople: 3, price: 675 },
      { minPeople: 4, price: 588 },
      { minPeople: 5, price: 554 },
      { minPeople: 6, price: 519 },
    ],
    price: 1142,
    depositAmount: 251,
    // Our own photographs, ordered to follow the itinerary: the high approach
    // and azib pastures of days 1-4, the lake the tour is named after, then the
    // Toubkal summit day that closes it. The summit frames are snow and the
    // valley frames are summer — the sequence makes that read as the route
    // changing with altitude and season rather than as mismatched stock.
    heroImage: "/gallery/ifni-lake-from-the-pass.jpg",
    gallery: [
      "/gallery/ifni-lake-from-the-pass.jpg",
      "/gallery/ifni-mule-approach-toubkal-behind.jpg",
      "/gallery/ifni-cattle-stream-azib.jpg",
      "/gallery/ifni-loaded-mule-high-scree.jpg",
      "/gallery/toubkal-trekkers-below-summit.jpg",
      "/gallery/toubkal-summit-ridge-climbers.jpg",
      "/gallery/toubkal-summit-panorama-high-atlas.jpg",
    ],
    shortDescription:
      "The full loop around Jbel Toubkal — remote Berber villages, high passes over 3,600 m, the turquoise Lake Ifni, and a summit finale at 4,167 m.",
    description:
      "The Toubkal Circuit is the complete High Atlas traverse — a full ring around the massif that few trekkers ever complete. Over six days you cross four major passes, walk through the remote grazing lands and villages of the Toubkal National Park, camp beside the extraordinary turquoise Lake Ifni, and finish by summiting Jbel Toubkal itself. Far more varied and remote than the standard summit push, it is the connoisseur's Toubkal.",
    highlights: [
      "Camp beside the turquoise Lake Ifni (2,295 m), the Atlas's most beautiful lake",
      "Cross four high passes including Tizi n'Ouanoums (3,664 m) and Tizi Likemt (3,555 m)",
      "Summit Jbel Toubkal (4,167 m) — the highest peak in North Africa",
      "Sleep in remote Berber villages rarely reached by other trekkers",
    ],
    includes: [
      "Professional licensed mountain guide",
      "5 nights accommodation (refuges, village gîtes, and camping)",
      "All meals during the trek",
      "Mules and muleteers for group gear and camp",
      "Toubkal National Park entrance fees",
      "Round-trip transfer from Marrakech",
    ],
    excludes: [
      "Travel insurance (mandatory)",
      "Personal trekking equipment and sleeping bag",
      "Tips for guide, cook, and muleteers",
    ],
    itinerary: [
      {
        day: 1,
        meals: "L,D",
        stay: "Village gîte",
        walking: "4 h",
        driving: "1.5 h",
        ascent: "+560 m",
        stop: { name: "Tachedirt", lat: 31.149, lng: -7.83 },
        title: "Marrakech → Imlil → Tachedirt (2,300 m)",
        description:
          "Transfer from Marrakech to Imlil (1h30). Trek through the Imenane Valley past terraced fields and Berber villages to Tachedirt. Around 5 hours walking.",
      },
      {
        day: 2,
        meals: "B,L,D",
        stay: "Wild camp",
        walking: "6–7 h",
        ascent: "+1,255 m / −1,305 m",
        stop: { name: "Azib Likemt", lat: 31.11, lng: -7.83 },
        title: "Tachedirt → Tizi Likemt (3,555 m) → Azib Likemt (2,250 m)",
        description:
          "Climb the Tizi Likemt pass with sweeping High Atlas views, then descend into the high summer grazing pastures of Azib Likemt. 6–7 hours.",
      },
      {
        day: 3,
        meals: "B,L,D",
        stay: "Village gîte",
        walking: "6 h",
        distance: "≈14 km",
        stop: { name: "Amsouzart", lat: 31.045, lng: -7.78 },
        title: "Azib Likemt → Tizi n'Ourai → Amsouzart (1,740 m)",
        description:
          "Follow the Ourai river, cross a scenic pass, and descend to the welcoming village of Amsouzart for an overnight in a family gîte. Around 6 hours.",
      },
      {
        day: 4,
        meals: "B,L,D",
        stay: "Wild camp",
        walking: "5 h",
        ascent: "+555 m",
        stop: { name: "Lake Ifni", lat: 31.03, lng: -7.86 },
        title: "Amsouzart → Lake Ifni (2,295 m)",
        description:
          "A gradual climb brings you to the turquoise Lake Ifni, set dramatically among steep peaks. Afternoon at leisure by the water. 4–5 hours.",
      },
      {
        day: 5,
        meals: "B,L,D",
        stay: "Mountain refuge",
        walking: "6–7 h",
        ascent: "+1,370 m / −460 m",
        stop: { name: "Toubkal Refuge", lat: 31.0782, lng: -7.9192 },
        title: "Lake Ifni → Tizi n'Ouanoums (3,664 m) → Toubkal Refuge (3,207 m)",
        description:
          "A steep, rocky ascent to the Ouanoums pass overlooking the lake, then a descent to the Toubkal Refuge. Early night before summit day. Around 6 hours.",
      },
      {
        day: 6,
        meals: "B",
        walking: "7–8 h",
        driving: "1.5 h",
        ascent: "+960 m / −2,430 m",
        stop: { name: "Jbel Toubkal Summit", lat: 31.0606, lng: -7.9153 },
        title: "Summit Toubkal (4,167 m) → Imlil → Marrakech",
        description:
          "Pre-dawn ascent via the South Cirque to the roof of North Africa at sunrise. Descend to Imlil and transfer back to Marrakech. A long, rewarding final day.",
      },
    ],
    faq: [
      { q: "How hard is the Ifni Lake circuit?", a: "It is graded challenging — six days in the high Toubkal massif including the summit and the remote Lake Ifni side, with several consecutive days on rough ground at altitude. Fitness and some prior trekking help." },
      { q: "Where do we sleep over the six days?", a: "A mix of mountain refuges, village gîtes, and camping, all with meals included during the trek. A sleeping bag is not provided." },
      { q: "Do I carry my own gear?", a: "No — mules and muleteers carry the group gear and camp, so you walk with a daypack. Personal trekking equipment and a sleeping bag are your own." },
      { q: "What is required but not included?", a: "Travel insurance is mandatory and not included, along with personal trekking equipment and tips for the guide, cook, and muleteers." },
    ],
    meetingPoint: { lat: 31.1369, lng: -7.9169, name: "Imlil Village, Atlas Mountains" },
    seoTitle: "6-Day Toubkal Circuit Trek via Lake Ifni from Marrakech — Summit & Circuit | Marrakech Eco Tours",
    seoDescription: "The complete 6-day Toubkal circuit from Marrakech — high passes, the turquoise Lake Ifni, and the Jbel Toubkal summit (4,167 m). Licensed Berber guide, all meals & transfers. From $1142.",
    featured: false,
  },
  {
    id: "31",
    slug: "toubkal-summit-2day-marrakech",
    relatedPosts: ["toubkal-2-day-trek-cost", "how-to-climb-toubkal-in-2-days", "toubkal-2-day-vs-4-day-which-trek", "how-hard-is-toubkal-difficulty-guide"],
    title: "Mount Toubkal Express — 2-Day Summit from Marrakech",
    category: "trekking",
    origin: "marrakech",
    difficulty: "challenging",
    duration: "2 days / 1 night",
    groupSize: "2–12 people",
    tourType: "private",
    reviewCount: 34,
    rating: 4.7,
    // Real ladder, not the derived curve: a solo trekker pays for the whole
    // private guide and vehicle, so solo is ~2x the two-person rate rather
    // than the shallow premium groupPriceTiers() would assume.
    // EUR 350 / 195 / 185 / 175 / 165 / 153 at the rate in lib/currency-core.ts.
    groupPricing: [
      { minPeople: 1, price: 404 },
      { minPeople: 2, price: 225 },
      { minPeople: 3, price: 213 },
      { minPeople: 4, price: 202 },
      { minPeople: 5, price: 190 },
      { minPeople: 6, price: 176 },
    ],
    price: 404,
    depositAmount: 89,
    // Real photos from our Toubkal departures. A different selection from the
    // 4-day tour so the two pages don't look identical — this focuses on the
    // fast summit push: the snow slope, the ridge, and the summit ridge climbers.
    heroImage: "/gallery/toubkal-summit-ridge-climbers.jpg",
    gallery: [
      "/gallery/toubkal-summit-ridge-climbers.jpg",
      "/gallery/toubkal-trekker-snow-slope.jpg",
      "/gallery/toubkal-final-snow-slope-dawn.jpg",
      "/gallery/toubkal-summit-panorama-high-atlas.jpg",
          "/gallery/toubkal-national-park-entrance-sign.jpg",
      "/gallery/toubkal-trail-waterfall-gorge.jpg",
],
    shortDescription:
      "The fastest way to the roof of North Africa — summit Jbel Toubkal (4,167 m) in a focused two-day ascent from Marrakech.",
    description:
      "Short on time but determined to stand on the highest point in North Africa? The 2-day Toubkal ascent is the most direct route to the summit. Drive from Marrakech to Imlil, trek up to the Toubkal Refuge past the Sidi Chamharouch shrine on day one, then make the pre-dawn summit push on day two before descending all the way back to Marrakech. It is demanding — with no acclimatisation day — so a good level of fitness is essential, but it delivers the whole Toubkal experience in a single weekend.",
    highlights: [
      "Summit Jbel Toubkal (4,167 m) in just two days from Marrakech",
      "Overnight in the Toubkal Refuge at 3,207 m",
      "Pass the Sidi Chamharouch shrine and its waterfall",
      "Sunrise panorama across the entire High Atlas range",
    ],
    includes: [
      "Professional licensed mountain guide",
      "1 night in the Toubkal Refuge",
      "All meals during the trek",
      "Mule porter for group gear",
      "Toubkal National Park entrance fees",
      "Round-trip transfer from Marrakech",
    ],
    excludes: [
      "Travel insurance (mandatory)",
      "Personal trekking equipment",
      "Tips for guide and porter",
      "Crampons and ice axe in winter (rental available)",
    ],
    itinerary: [
      {
        day: 1,
        meals: "L,D",
        stay: "Mountain refuge",
        walking: "5 h",
        driving: "1.5 h",
        ascent: "+1,470 m",
        stop: { name: "Toubkal Refuge", lat: 31.0782, lng: -7.9192 },
        title: "Marrakech → Imlil → Toubkal Refuge (3,207 m)",
        description:
          "Early transfer from Marrakech to Imlil (1h30). Trek up the Aït Mizane valley past the Sidi Chamharouch shrine to the Toubkal Refuge. 4–5 hours walking. Dinner and early night.",
      },
      {
        day: 2,
        meals: "B",
        walking: "7–8 h",
        driving: "1.5 h",
        ascent: "+960 m / −2,430 m",
        stop: { name: "Jbel Toubkal Summit", lat: 31.0606, lng: -7.9153 },
        title: "Summit Toubkal (4,167 m) → Imlil → Marrakech",
        description:
          "Pre-dawn start for the summit via the South Cirque (around 3 hours up). Sunrise from the roof of North Africa, then descend to the refuge for lunch and continue down to Imlil (4–5 hours total descent). Transfer back to Marrakech.",
      },
    ],
    faq: [
      { q: "Is two days really enough to climb Toubkal?", a: "It is enough to summit, and fit walkers do it regularly. What it does not give you is time to acclimatise — you go from Marrakech to 4,167 metres in around thirty hours. If you have hillwalking experience and a tight schedule it works; for a first time at altitude the 4-day is the safer choice." },
      { q: "What does day one involve?", a: "An early transfer from Marrakech to Imlil, about an hour and a half, then four to five hours walking up the Aït Mizane valley past the Sidi Chamharouch shrine to the Toubkal Refuge at 3,207 metres. Dinner at the refuge and an early night before the summit start." },
      { q: "How hard is the descent?", a: "Longer than people expect. After the summit you come back down to the refuge and continue to Imlil — four to five hours of descent in total, on loose ground, on tired legs. This is where knees complain, and it is worth training for specifically." },
      { q: "Can I do this trek in winter?", a: "Only with winter equipment and a guide qualified for those conditions. From roughly November to March the upper route is snow-covered and requires crampons, an ice axe and the skills to use them. It becomes a mountaineering trip rather than a walk." },
    ],
    meetingPoint: { lat: 31.1369, lng: -7.9169, name: "Imlil Village, Atlas Mountains" },
    seoTitle: "2-Day Mount Toubkal Trek from Marrakech — Express Summit 4,167 m | Marrakech Eco Tours",
    seoDescription: "Climb Jbel Toubkal (4,167 m) in 2 days from Marrakech — the fastest route to North Africa's highest peak. Refuge night, all meals, licensed Berber guide & transfers. From $404.",
    featured: true,
  },
  {
    id: "32",
    slug: "toubkal-aguelzim-pass-3day",
    title: "Toubkal via Aguelzim Pass from Marrakech — 3-Day Trek",
    category: "trekking",
    origin: "marrakech",
    difficulty: "challenging",
    duration: "3 days / 2 nights",
    groupSize: "2–12 people",
    tourType: "private",
    reviewCount: 18,
    rating: 4.8,
    // Real ladder, not the derived curve: a solo traveller pays for the whole
    // private guide and vehicle, so solo is far above the shallow premium
    // groupPriceTiers() would assume.
    // EUR 600 / 280 / 270 / 260 / 250 / 230 at the rate in lib/currency-core.ts.
    groupPricing: [
      { minPeople: 1, price: 692 },
      { minPeople: 2, price: 323 },
      { minPeople: 3, price: 311 },
      { minPeople: 4, price: 300 },
      { minPeople: 5, price: 288 },
      { minPeople: 6, price: 265 },
    ],
    price: 692,
    depositAmount: 152,
    heroImage:
      "/gallery/tours-toubkal-aguelzim-pass-3day.jpg",
    gallery: [
      "/gallery/category-hero-mgoun-massif.jpg",
      "/gallery/category-hero-atlas-ridge.jpg",
      "https://images.unsplash.com/photo-1597662786834-8eea85ad4841?w=1200&q=85",
      "/gallery/destination-hero-toubkal-snow.jpg",
    ],
    shortDescription:
      "The scenic route to the summit — through the Azzaden Valley, past the Ighouliden waterfalls, over the Aguelzim Pass (3,560 m) to Toubkal.",
    description:
      "This three-day route takes the quieter, more beautiful back way to Toubkal. Instead of the direct Aït Mizane valley, you trek into the wild Azzaden Valley, past the Ighouliden waterfalls and the Azib Tamsoult meadows, then cross the dramatic Aguelzim Pass (3,560 m) to reach the Toubkal Refuge. The final day is the summit push. It is a more rewarding and scenic approach than the standard route, with real high-mountain variety. Note: the Aguelzim pass is only passable roughly May–October.",
    highlights: [
      "Trek the wild Azzaden Valley — quieter and greener than the standard route",
      "Pass the spectacular Ighouliden (Tamsoult) waterfalls",
      "Cross the high Aguelzim Pass at 3,560 m",
      "Summit Jbel Toubkal (4,167 m), the highest peak in North Africa",
    ],
    includes: [
      "Professional licensed mountain guide",
      "2 nights accommodation (mountain refuges)",
      "All meals during the trek",
      "Mule porter for group gear",
      "Toubkal National Park entrance fees",
      "Round-trip transfer from Marrakech",
    ],
    excludes: [
      "Travel insurance (mandatory)",
      "Personal trekking equipment",
      "Tips for guide and porter",
    ],
    itinerary: [
      {
        day: 1,
        meals: "L,D",
        stay: "Wild camp",
        walking: "5–6 h",
        driving: "1.5 h",
        ascent: "+900 m",
        stop: { name: "Azzaden Valley", lat: 31.09, lng: -7.95 },
        title: "Marrakech → Imlil → Azzaden Valley (Azib Tamsoult)",
        description:
          "Transfer from Marrakech to Imlil. Trek over the Tizi n'Mzik pass (2,450 m) into the Azzaden Valley, past the Ighouliden waterfalls to the refuge near Azib Tamsoult. Around 6 hours.",
      },
      {
        day: 2,
        meals: "B,L,D",
        stay: "Mountain refuge",
        walking: "6–7 h",
        ascent: "+1,100 m",
        stop: { name: "Toubkal Refuge", lat: 31.0782, lng: -7.9192 },
        title: "Azzaden → Aguelzim Pass (3,560 m) → Toubkal Refuge (3,207 m)",
        description:
          "A stiff climb out of the Azzaden Valley over the Aguelzim Pass, with big views of the western Atlas, then a descent to the Toubkal Refuge. Around 6–7 hours. Early night before the summit.",
      },
      {
        day: 3,
        meals: "B",
        walking: "7 h",
        driving: "1.5 h",
        ascent: "+960 m / −2,430 m",
        stop: { name: "Jbel Toubkal Summit", lat: 31.0606, lng: -7.9153 },
        title: "Summit Toubkal (4,167 m) → Imlil → Marrakech",
        description:
          "Pre-dawn ascent via the South Cirque to the summit at sunrise. Long descent all the way back to Imlil (via the refuge), then transfer to Marrakech. A demanding but unforgettable final day.",
      },
    ],
    faq: [
      { q: "How hard is this compared with the standard Toubkal route?", a: "It is graded challenging. The difficulty is not technical climbing but the high Aguelzim Pass (3,560 m) on the approach plus the summit at 4,167 m, so altitude is the main test. It is a more scenic, quieter way in." },
      { q: "Where do we stay?", a: "Two nights in mountain refuges — working huts with shared bunks, blankets, and communal meals. Bring a sleeping bag liner and head torch." },
      { q: "Do I carry all my gear?", a: "No — a mule porter carries the group gear, so you carry only a daypack. Personal trekking equipment is your own." },
      { q: "Is travel insurance required?", a: "Yes, it is mandatory for this trek and not included. Tips for the guide and porter are also not included." },
    ],
    meetingPoint: { lat: 31.1369, lng: -7.9169, name: "Imlil Village, Atlas Mountains" },
    seoTitle: "3-Day Toubkal Trek via Aguelzim Pass from Marrakech — Azzaden Valley Route | Marrakech Eco Tours",
    seoDescription: "Climb Toubkal (4,167 m) the scenic way — 3 days via the Azzaden Valley, Ighouliden waterfalls and the Aguelzim Pass (3,560 m). Licensed guide, refuges, all meals & transfers. From $692.",
    featured: false,
  },
  {
    id: "33",
    slug: "toubkal-three-peaks-4000m-3day",
    title: "Toubkal Three 4,000 m Peaks from Marrakech — 3-Day Challenge",
    category: "trekking",
    origin: "marrakech",
    difficulty: "expert",
    duration: "3 days / 2 nights",
    groupSize: "2–10 people",
    tourType: "private",
    reviewCount: 12,
    rating: 4.9,
    // Real ladder, not the derived curve: a solo traveller pays for the whole
    // private guide and vehicle, so solo is far above the shallow premium
    // groupPriceTiers() would assume.
    // EUR 600 / 280 / 270 / 260 / 250 / 230 at the rate in lib/currency-core.ts.
    groupPricing: [
      { minPeople: 1, price: 692 },
      { minPeople: 2, price: 323 },
      { minPeople: 3, price: 311 },
      { minPeople: 4, price: 300 },
      { minPeople: 5, price: 288 },
      { minPeople: 6, price: 265 },
    ],
    price: 692,
    depositAmount: 152,
    heroImage:
      "/gallery/destination-hero-toubkal-snow.jpg",
    gallery: [
      "/gallery/destination-hero-toubkal-snow.jpg",
      "/gallery/category-hero-atlas-ridge.jpg",
      "/gallery/category-hero-mgoun-massif.jpg",
      "https://images.unsplash.com/photo-1597662786834-8eea85ad4841?w=1200&q=85",
    ],
    shortDescription:
      "Bag three of the High Atlas's 4,000 m summits in three days — Ras Ouanoukrim, Timesguida, and Jbel Toubkal.",
    description:
      "For strong, experienced trekkers, this is the ultimate High Atlas challenge: three 4,000-metre summits in three days. From the Toubkal Refuge you climb the twin peaks of Ouanoukrim — Timesguida (4,089 m) and Ras (4,083 m) — before the grand finale on Jbel Toubkal (4,167 m) itself. With limited time to acclimatise and 1,000 m of ascent on consecutive days, it demands genuine fitness and mountain experience, but rewards you with three of the highest points in North Africa.",
    highlights: [
      "Summit three 4,000 m peaks: Timesguida (4,089 m), Ras Ouanoukrim (4,083 m) & Toubkal (4,167 m)",
      "One of the toughest and most rewarding treks in the High Atlas",
      "Base from the Toubkal Refuge at 3,207 m",
      "Sunrise summits and vast views to the Sahara and Anti-Atlas",
    ],
    includes: [
      "Professional licensed mountain guide (high-altitude qualified)",
      "2 nights in the Toubkal Refuge",
      "All meals during the trek",
      "Mule porter for group gear",
      "Toubkal National Park entrance fees",
      "Round-trip transfer from Marrakech",
    ],
    excludes: [
      "Travel insurance with altitude cover (mandatory)",
      "Personal trekking equipment",
      "Tips for guide and porter",
      "Crampons and ice axe in winter (rental available)",
    ],
    itinerary: [
      {
        day: 1,
        meals: "L,D",
        stay: "Mountain refuge",
        walking: "5 h",
        driving: "1.5 h",
        ascent: "+1,470 m",
        stop: { name: "Toubkal Refuge", lat: 31.0782, lng: -7.9192 },
        title: "Marrakech → Imlil → Toubkal Refuge (3,207 m)",
        description:
          "Transfer from Marrakech to Imlil. Trek up the Aït Mizane valley past Sidi Chamharouch to the Toubkal Refuge. 4–5 hours. Acclimatisation and rest before two big summit days.",
      },
      {
        day: 2,
        meals: "B,L,D",
        stay: "Mountain refuge",
        walking: "7–8 h",
        distance: "≈9 km",
        ascent: "+880 m",
        stop: { name: "Ouanoukrim", lat: 31.052, lng: -7.928 },
        title: "Ouanoukrim — Timesguida (4,089 m) & Ras (4,083 m)",
        description:
          "Ascend to the Tizi n'Ouanoums area and climb the twin Ouanoukrim summits, Timesguida and Ras, both over 4,000 m. Return to the Toubkal Refuge for the night. A demanding full day.",
      },
      {
        day: 3,
        meals: "B",
        walking: "6 h",
        driving: "1.5 h",
        ascent: "+960 m / −2,430 m",
        stop: { name: "Jbel Toubkal Summit", lat: 31.0606, lng: -7.9153 },
        title: "Summit Toubkal (4,167 m) → Imlil → Marrakech",
        description:
          "Final summit push up Jbel Toubkal via the South Cirque at sunrise — the highest of the three. Long descent to Imlil and transfer back to Marrakech.",
      },
    ],
    faq: [
      { q: "Who is this three-peaks route for?", a: "Experienced trekkers — it is graded expert, linking three 4,000 m summits in the Toubkal massif over three days. You should already be comfortable at altitude and on sustained ascents." },
      { q: "Do I need special equipment?", a: "In winter, crampons and an ice axe are required (rental available) and the guide is high-altitude qualified. Personal trekking equipment is your own, and travel insurance with altitude cover is mandatory." },
      { q: "Where do we stay?", a: "Two nights in the Toubkal Refuge with all trek meals included. It is a working mountain hut — shared bunks and cold nights." },
      { q: "Do I carry my own gear?", a: "No — a mule porter carries the group gear to the refuge, so you climb with a daypack on summit days." },
    ],
    meetingPoint: { lat: 31.1369, lng: -7.9169, name: "Imlil Village, Atlas Mountains" },
    seoTitle: "Toubkal Three Peaks 4,000 m Challenge — 3-Day High Atlas Trek | Marrakech Eco Tours",
    seoDescription: "Summit three 4,000 m High Atlas peaks in 3 days — Timesguida (4,089 m), Ras Ouanoukrim (4,083 m) and Toubkal (4,167 m). Expert-level trek from Marrakech with licensed guide. From $692.",
    featured: false,
  },
  {
    id: "34",
    slug: "marrakech-food-market-tour",
    title: "Marrakech Food & Market Tour — Half-Day Culinary Walk",
    category: "day-tours",
    origin: "marrakech",
    difficulty: "easy",
    isDayTour: true,
    duration: "Half day (4 hours)",
    groupSize: "2–8 people",
    tourType: "private",
    reviewCount: 34,
    rating: 4.9,
    // Ladder scaled from the confirmed price, read as the two-person rate.
    // Curve measured from the tours with operator-confirmed ladders:
    // day tour. Solo carries the whole guide/vehicle, so it sits ~1.8x above.
    groupPricing: [
      { minPeople: 1, price: 126 },
      { minPeople: 2, price: 59 },
      { minPeople: 3, price: 50 },
      { minPeople: 4, price: 45 },
      { minPeople: 5, price: 42 },
      { minPeople: 6, price: 38 },
    ],
    price: 126,
    depositAmount: 28,
    heroImage:
      "/gallery/tours-marrakech-food-market-tour.jpg",
    gallery: [
      "/gallery/tours-marrakech-food-market-tour.jpg",
      "/gallery/blog-what-to-pack-desert-tour-morocco.jpg",
      "/gallery/blog-morocco-food-guide-what-to-eat.jpg",
      "https://images.unsplash.com/photo-1596750320291-a082a23dcc19?w=1200&q=85",
    ],
    shortDescription:
      "Walk the spice souks and market stalls of the medina with a local guide, tasting as you go, then cook a tagine from scratch.",
    description:
      "Marrakech is the culinary capital of Morocco, and this half-day walk is built around that fact. Start in Rahba Kedima, the spice square, learning to tell real saffron from dyed imitations and the dozen-plus spices that go into ras el hanout. Move through the food souks tasting olives, dates, msemen, and fresh-pressed orange juice from the Jemaa el-Fnaa stalls. Finish at a local family kitchen for a hands-on tagine and Moroccan mint tea lesson — you eat what you cook.",
    highlights: [
      "Rahba Kedima spice square — real saffron vs. dyed imitations",
      "Guided tastings through the medina's working food souks",
      "Hands-on tagine cooking class with a local family",
      "Moroccan mint tea ceremony, the proper way",
    ],
    includes: [
      "Local English-speaking food guide",
      "All tastings along the route",
      "Cooking class ingredients and instruction",
      "Full tagine lunch you help prepare",
      "Mint tea ceremony",
    ],
    excludes: ["Hotel pickup outside the medina", "Tips for guide and host family"],
    itinerary: [
      {
        day: 1,
        meals: "L",
        walking: "4 h (on foot)",
        title: "Half Day — Medina Markets & Cooking Class",
        description:
          "Meet at Rahba Kedima spice square at 9:30 am. Guided walk through the spice and food souks with tastings (90 minutes). Continue to a local family kitchen for a hands-on tagine cooking class. Sit down to the tagine you cooked, finished with mint tea. Finish by 1:30 pm.",
      },
    ],
    meetingPoint: { lat: 31.6316, lng: -7.9868, name: "Rahba Kedima Spice Square, Marrakech Medina" },
    seoTitle: "Marrakech Food & Market Tour — Spice Souk Walk & Cooking Class | Marrakech Eco Tours",
    seoDescription: "Half-day Marrakech food tour: taste your way through the spice souks, then cook a real tagine with a local family. Small group, local guide. From $126.",
    faq: [
      { q: "Is this tour suitable for vegetarians?", a: "Yes. The cooking class and tastings can be fully vegetarian on request — let us know when booking. Most of the souk tastings (olives, dates, spices, fresh juice) are vegetarian by default." },
      { q: "Do we need to arrive hungry?", a: "Come with an appetite but not empty-handed — the walk includes a dozen small tastings before you even reach the cooking class, so pace yourself, and skip a big breakfast." },
      { q: "How is this different from a regular medina tour?", a: "A general medina tour covers monuments and history. This one is built entirely around food — where locals actually shop and eat, not the tourist-facing stalls near Jemaa el-Fnaa — and ends with you cooking, not just watching." },
    ],
    featured: false,
  },
  {
    id: "35",
    slug: "merzouga-stargazing-desert-tour",
    title: "Merzouga Stargazing from Marrakech — 2-Day Dark Sky Desert Tour",
    category: "desert",
    origin: "marrakech",
    difficulty: "easy",
    duration: "2 days / 1 night",
    groupSize: "2–10 people",
    tourType: "private",
    reviewCount: 21,
    rating: 4.9,
    // Ladder scaled from the confirmed price, read as the two-person rate.
    // Curve measured from the tours with operator-confirmed ladders:
    // vehicle-based. Solo carries the whole guide/vehicle, so it sits ~1.8x above.
    groupPricing: [
      { minPeople: 1, price: 598 },
      { minPeople: 2, price: 279 },
      { minPeople: 3, price: 220 },
      { minPeople: 4, price: 185 },
      { minPeople: 5, price: 160 },
      { minPeople: 6, price: 140 },
    ],
    price: 598,
    depositAmount: 132,
    heroImage:
      "/gallery/tours-merzouga-stargazing-desert-tour.jpg",
    gallery: [
      "/gallery/tours-merzouga-stargazing-desert-tour.jpg",
      "/gallery/category-hero-medina-doorway.jpg",
      "/gallery/blog-what-to-pack-desert-tour-morocco.jpg",
      "/gallery/category-hero-atlas-ridge.jpg",
    ],
    shortDescription:
      "Camel trek into Erg Chebbi at sunset, then a guided naked-eye and telescope stargazing session under one of the darkest skies in North Africa.",
    description:
      "Erg Chebbi sits far enough from any city that the Milky Way is visible to the naked eye on a clear night — this trip is built around that fact rather than treating it as a bonus. After the sunset camel trek and dinner at camp, a local astronomy guide sets up a telescope and walks the group through the visible planets, constellations, and deep-sky objects, explained in plain language rather than jargon. Best October through May, when the desert night sky is at its clearest and the heat has dropped enough to sit outside comfortably for hours.",
    highlights: [
      "Guided naked-eye and telescope stargazing session with an astronomy guide",
      "Sunset camel trek into the Erg Chebbi dunes",
      "One night in a traditional Berber desert camp, far from any light pollution",
      "Best desert night sky in Morocco — no city glow in any direction",
    ],
    includes: [
      "Round-trip transport from Marrakech",
      "Camel trek at sunset",
      "1 night desert camp accommodation",
      "Telescope and guided stargazing session",
      "Dinner and breakfast at camp",
    ],
    excludes: [
      "Travel insurance",
      "Lunch en route (stops available)",
      "Tips for guide and camp crew",
    ],
    itinerary: [
      {
        day: 1,
        meals: "D",
        stay: "Desert camp",
        driving: "≈8 h",
        distance: "≈560 km",
        stop: { name: "Erg Chebbi, Merzouga", lat: 31.1, lng: -3.98 },
        title: "Marrakech → Erg Chebbi Desert Camp",
        description:
          "Depart Marrakech early, crossing the High Atlas and the Draa Valley to Merzouga. Sunset camel trek into the Erg Chebbi dunes. Dinner at camp, followed by the guided stargazing session once full darkness falls.",
      },
      {
        day: 2,
        meals: "B",
        driving: "≈8 h",
        distance: "≈560 km",
        stop: { name: "Marrakech", lat: 31.6295, lng: -7.9811 },
        title: "Sunrise → Merzouga → Marrakech",
        description:
          "Optional sunrise viewing over the dunes. Breakfast at camp, camel or 4x4 transfer back to Merzouga, and the return drive to Marrakech, arriving evening.",
      },
    ],
    meetingPoint: { lat: 31.0580, lng: -4.0127, name: "Merzouga, Erg Chebbi Sahara" },
    seoTitle: "Merzouga Stargazing Tour — 2-Day Sahara Dark Sky Desert Trip | Marrakech Eco Tours",
    seoDescription: "2-day Marrakech to Merzouga stargazing tour — sunset camel trek, telescope-guided night sky session, and a night in an Erg Chebbi desert camp. From $598.",
    faq: [
      { q: "Do I need my own astronomy knowledge or equipment?", a: "No. The guide provides the telescope and explains everything from scratch — this is designed for complete beginners as much as anyone with an interest in astronomy." },
      { q: "What's the best time of year for this tour?", a: "October through May. The sky is clearest and the desert night is cool enough to sit outside comfortably; summer nights are still starry but far hotter." },
      { q: "What happens if it's cloudy?", a: "Clear skies in Erg Chebbi are the norm outside of rare winter storm systems, but if cloud cover blocks the stargazing session, the camp experience, camel trek, and dinner still go ahead as planned." },
    ],
    featured: false,
  },
  {
    id: "36",
    slug: "azzaden-valley-2day-trek",
    title: "Azzaden Valley from Marrakech — 2-Day Atlas Mountains Trek",
    category: "trekking",
    origin: "marrakech",
    difficulty: "moderate",
    duration: "2 days / 1 night",
    groupSize: "2–12 people",
    tourType: "private",
    reviewCount: 0,
    rating: 4.9,
    // Ladder scaled from the confirmed price, read as the two-person rate.
    // Curve measured from the tours with operator-confirmed ladders:
    // trekking. Solo carries the whole guide/vehicle, so it sits ~1.8x above.
    groupPricing: [
      { minPeople: 1, price: 329 },
      { minPeople: 2, price: 186 },
      { minPeople: 3, price: 164 },
      { minPeople: 4, price: 153 },
      { minPeople: 5, price: 143 },
      { minPeople: 6, price: 134 },
    ],
    price: 329,
    depositAmount: 72,
    heroImage: "/gallery/ifni-cattle-stream-azib.jpg",
    gallery: [
      "/gallery/ifni-cattle-stream-azib.jpg",
      "/gallery/toubkal-summit-panorama-high-atlas.jpg",
      "/gallery/ifni-loaded-mule-high-scree.jpg",
      "/gallery/toubkal-berber-guide-snow-trail.jpg",
    ],
    shortDescription:
      "A two-day crossing into the quiet Azzaden Valley over the Tizi Mzik pass, sleeping in a Berber village guesthouse away from the Toubkal crowds.",
    description:
      "The Azzaden is the valley next door to the busy Imlil–Toubkal corridor, and it stays far quieter for it. Over two days you cross the Tizi Mzik pass (2,684 m) with the whole Toubkal massif opening up behind you, drop through juniper forest into the string of villages along the Azzaden river, and spend a night in a family-run guesthouse in Tizi Oussem. The second day traverses the Tizi Oudid pass and descends through terraced hamlets to Aguersioual. No technical ground, no altitude extremes — just a proper taste of Berber mountain life in two days from Marrakech.",
    highlights: [
      "Cross the Tizi Mzik pass (2,684 m) with panoramic High Atlas views",
      "Overnight in a family-run Berber guesthouse in Tizi Oussem village",
      "Walk the quiet Azzaden Valley — juniper forest, terraced fields, walnut groves",
      "A genuine village-to-village traverse, well away from the Toubkal crowds",
    ],
    includes: [
      "Professional licensed mountain guide",
      "1 night Berber guesthouse accommodation",
      "All meals during the trek",
      "Mule to carry group luggage",
      "Round-trip transfer from Marrakech",
    ],
    excludes: [
      "Travel insurance (recommended)",
      "Personal trekking equipment",
      "Tips for guide and muleteer",
    ],
    itinerary: [
      {
        day: 1,
        meals: "L,D",
        stay: "Village gîte",
        walking: "5–6 h",
        driving: "1.5 h",
        ascent: "+700 m",
        stop: { name: "Tizi Oussem", lat: 31.15, lng: -7.98 },
        title: "Marrakech → Imlil → Tizi Mzik → Tizi Oussem (1,850 m)",
        description:
          "Morning transfer from Marrakech to Imlil (1h30). Trek up to the Tizi Mzik pass (2,684 m) for lunch with views back over the Imlil valley and the Toubkal peaks, then descend through juniper forest into the Azzaden Valley to the village of Tizi Oussem. Around 6 hours walking. Dinner and overnight in a Berber guesthouse.",
      },
      {
        day: 2,
        meals: "B,L",
        walking: "5 h",
        driving: "1.5 h",
        distance: "≈12 km",
        stop: { name: "Aguersioual", lat: 31.17, lng: -7.93 },
        title: "Tizi Oussem → Tizi Oudid → Aguersioual → Marrakech",
        description:
          "Descend to Id Issa, then climb to the Tizi Oudid pass and traverse through a string of Berber hamlets and terraced farmland down to Aguersioual. Around 5 hours walking. Transfer back to Marrakech, arriving late afternoon.",
      },
    ],
    meetingPoint: { lat: 31.1369, lng: -7.9169, name: "Imlil Village, Atlas Mountains" },
    seoTitle: "Azzaden Valley 2-Day Trek — Quiet Atlas Mountains Hike from Marrakech | Marrakech Eco Tours",
    seoDescription: "2-day Azzaden Valley trek from Marrakech: cross the Tizi Mzik pass, sleep in a Berber village guesthouse, and walk the quiet side of the High Atlas. From $329.",
    faq: [
      { q: "How fit do I need to be for the Azzaden trek?", a: "It is graded moderate: two days with roughly 5–6 hours of walking each, crossing passes up to 2,684 m. There is no technical climbing, but you should be comfortable on uphill and downhill trails for several hours. It suits reasonably active walkers rather than complete beginners." },
      { q: "How is this different from the Toubkal treks?", a: "The Azzaden is the valley beside the main Imlil–Toubkal route, so it sees far fewer trekkers. You get the same Berber villages, passes and mountain scenery, but no summit push and no high-altitude refuge night — a gentler, quieter alternative." },
      { q: "Where do we sleep?", a: "One night in a family-run Berber guesthouse in Tizi Oussem village — a real home rather than a hotel, with dinner and breakfast included. Rooms are simple and shared bathrooms are the norm." },
      { q: "Do I carry my own luggage?", a: "No. A mule carries the group's main luggage between Imlil and the village, so you walk with just a daypack for water, layers and a camera." },
    ],
    featured: false,
  },
  {
    id: "37",
    slug: "atlas-mountains-3day-trek",
    title: "High Atlas Villages from Marrakech — 3-Day Trek",
    category: "trekking",
    origin: "marrakech",
    difficulty: "moderate",
    duration: "3 days / 2 nights",
    groupSize: "2–12 people",
    tourType: "private",
    reviewCount: 0,
    rating: 4.9,
    // Ladder scaled from the confirmed price, read as the two-person rate.
    // Curve measured from the tours with operator-confirmed ladders:
    // trekking. Solo carries the whole guide/vehicle, so it sits ~1.8x above.
    groupPricing: [
      { minPeople: 1, price: 480 },
      { minPeople: 2, price: 271 },
      { minPeople: 3, price: 238 },
      { minPeople: 4, price: 222 },
      { minPeople: 5, price: 209 },
      { minPeople: 6, price: 195 },
    ],
    price: 480,
    depositAmount: 106,
    heroImage: "/gallery/ifni-mule-approach-toubkal-behind.jpg",
    gallery: [
      "/gallery/ifni-mule-approach-toubkal-behind.jpg",
      "/gallery/ifni-cattle-stream-azib.jpg",
      "/gallery/toubkal-summit-panorama-high-atlas.jpg",
      "/gallery/ifni-loaded-mule-high-scree.jpg",
          "/gallery/toubkal-trail-turquoise-pool-waterfall.jpg",
      "/gallery/imlil-village-green-valley.jpg",
],
    shortDescription:
      "Three days linking the Imlil, Azzaden and Ourika valleys over Berber passes, sleeping in village guesthouses — the classic High Atlas village circuit.",
    description:
      "This is the High Atlas without the summit fixation: three days walking valley to valley through the heart of Berber country. From Imlil you cross into the Azzaden, then traverse eastward over grazing passes toward the Ourika watershed, sleeping each night in a different village guesthouse. The walking is steady rather than severe — high passes but no scree slogs or altitude beyond about 2,700 m — and the point is the villages, the terraced fields, the shepherds' azibs and the changing valleys rather than a single high point. A strong three-day introduction to trekking in Morocco.",
    highlights: [
      "Link three Atlas valleys — Imlil, Azzaden and the Ourika watershed",
      "Cross several Berber passes with High Atlas panoramas",
      "Two nights in different village guesthouses, hosted by local families",
      "Steady moderate walking with no summit push or high-altitude nights",
    ],
    includes: [
      "Professional licensed mountain guide",
      "2 nights Berber guesthouse accommodation",
      "All meals during the trek",
      "Mule to carry group luggage",
      "Round-trip transfer from Marrakech",
    ],
    excludes: [
      "Travel insurance (recommended)",
      "Personal trekking equipment",
      "Tips for guide and muleteer",
    ],
    itinerary: [
      {
        day: 1,
        meals: "L,D",
        stay: "Village gîte",
        walking: "4–5 h",
        driving: "1.5 h",
        stop: { name: "Azzaden Valley", lat: 31.12, lng: -7.97 },
        title: "Marrakech → Imlil → Azzaden Valley",
        description:
          "Transfer from Marrakech to Imlil (1h30). Trek over the Tizi Mzik pass (2,684 m) into the Azzaden Valley, descending through juniper forest to a village guesthouse. Around 5–6 hours walking. Dinner and overnight in the village.",
      },
      {
        day: 2,
        meals: "B,L,D",
        stay: "Village gîte",
        walking: "6 h",
        ascent: "+800 m",
        stop: { name: "Tacheddirt", lat: 31.149, lng: -7.83 },
        title: "Azzaden → high pastures → Tacheddirt (2,300 m)",
        description:
          "A full traverse day, climbing over a grazing pass and dropping into the upper Imlil and Tacheddirt valleys — the highest permanently inhabited village in the region. Around 6 hours walking. Dinner and overnight in a village guesthouse.",
      },
      {
        day: 3,
        meals: "B,L",
        walking: "5 h",
        driving: "1 h",
        stop: { name: "Ourika Valley", lat: 31.317, lng: -7.75 },
        title: "Tacheddirt → Ourika Valley → Marrakech",
        description:
          "Descend the Ourika watershed through walnut groves and terraced fields to the roadhead. Around 4–5 hours walking. Transfer back to Marrakech, arriving late afternoon.",
      },
    ],
    meetingPoint: { lat: 31.1369, lng: -7.9169, name: "Imlil Village, Atlas Mountains" },
    seoTitle: "3-Day Atlas Mountains Trek — High Atlas Berber Villages from Marrakech | Marrakech Eco Tours",
    seoDescription: "3-day High Atlas village trek from Marrakech linking the Imlil, Azzaden and Ourika valleys. Berber guesthouses, mountain passes, no summit push. From $480.",
    faq: [
      { q: "Is this trek suitable as a first multi-day hike?", a: "Yes — it is graded moderate and designed as a solid introduction to trekking in Morocco. There is no summit or technical ground; the days are 4–6 hours over passes up to about 2,700 m. If you walk regularly you will be fine." },
      { q: "What is the accommodation like?", a: "Two nights in village guesthouses, each hosted by a local family, with all meals included. These are simple homes — shared bathrooms, mattresses on floor platforms or basic beds — rather than hotels, which is the point of the trek." },
      { q: "Why is there no summit on this trek?", a: "It is built around the valleys and villages rather than a peak. That keeps the altitude moderate and the days steady, so it works for walkers who want real High Atlas trekking without the demands of a Toubkal summit attempt." },
      { q: "Do mules carry the luggage?", a: "Yes. A mule carries the group's main luggage between guesthouses, so you walk with a daypack. Personal trekking gear is your own to bring." },
    ],
    featured: false,
  },
  {
    id: "38",
    slug: "family-atlas-4day-trek",
    title: "Family High Atlas from Marrakech — 4-Day Gentle Trek",
    category: "trekking",
    origin: "marrakech",
    difficulty: "easy",
    duration: "4 days / 3 nights",
    groupSize: "3–14 people",
    tourType: "private",
    reviewCount: 0,
    rating: 4.9,
    // Sold to families: three is the smallest booking.
    minPeople: 3,
    // Ladder scaled from the confirmed price, read as the two-person rate.
    // Curve measured from the tours with operator-confirmed ladders:
    // trekking. Solo carries the whole guide/vehicle, so it sits ~1.8x above.
    groupPricing: [
      { minPeople: 1, price: 639 },
      { minPeople: 2, price: 361 },
      { minPeople: 3, price: 318 },
      { minPeople: 4, price: 296 },
      { minPeople: 5, price: 278 },
      { minPeople: 6, price: 260 },
    ],
    price: 639,
    depositAmount: 141,
    heroImage: "/gallery/ifni-cattle-stream-azib.jpg",
    gallery: [
      "/gallery/ifni-cattle-stream-azib.jpg",
      "/gallery/ifni-mule-approach-toubkal-behind.jpg",
      "/gallery/toubkal-summit-panorama-high-atlas.jpg",
      "/gallery/toubkal-berber-guide-snow-trail.jpg",
          "/gallery/toubkal-trail-waterfall-gorge.jpg",
      "/gallery/imlil-berber-village-kittens.jpg",
],
    shortDescription:
      "A four-day High Atlas trek paced for families: short walking days, gentle valleys, village guesthouses, and plenty of time with Berber families along the way.",
    description:
      "Trekking with children in the Atlas works when the days are short, the ground is easy, and there is something to see rather than just kilometres to cover — which is exactly how this trip is built. Four days move at a family pace through the lower Imlil and Ourika valleys: river crossings, walnut groves, waterfalls, bread baking in a village home, and half-days short enough to leave time for kids to actually be kids. Mules carry everything and can carry tired younger children too. No high passes, no long slogs — a real mountain adventure that a family with school-age children can do together.",
    highlights: [
      "Short, gentle walking days built around a family pace (3–4 hours)",
      "Village guesthouse nights with Berber families — bread baking, mint tea",
      "Waterfalls, river pools and walnut groves rather than high passes",
      "Mules carry all luggage and can carry tired younger children",
    ],
    includes: [
      "Professional licensed mountain guide experienced with families",
      "3 nights Berber guesthouse accommodation",
      "All meals during the trek",
      "Mules to carry luggage (and tired children)",
      "Round-trip transfer from Marrakech",
    ],
    excludes: [
      "Travel insurance (recommended)",
      "Personal hiking gear",
      "Tips for guide and muleteers",
    ],
    itinerary: [
      {
        day: 1,
        meals: "L,D",
        stay: "Guesthouse",
        walking: "2–3 h",
        driving: "1.5 h",
        stop: { name: "Imlil", lat: 31.1369, lng: -7.9169 },
        title: "Marrakech → Imlil → first village (short walk)",
        description:
          "Transfer from Marrakech to Imlil (1h30). An easy afternoon walk through terraced fields and walnut groves to the first village guesthouse — short enough to settle in without tiring young legs. Around 2–3 hours. Dinner with the host family.",
      },
      {
        day: 2,
        meals: "B,L,D",
        stay: "Village gîte",
        walking: "4 h",
        stop: { name: "Imlil", lat: 31.1369, lng: -7.9169 },
        title: "Valley walk & waterfalls",
        description:
          "A gentle day following the river up the valley to waterfalls and natural pools, with plenty of stops. Around 3–4 hours at a relaxed pace. Overnight in a village guesthouse, with time in the afternoon for the kids to explore or help bake bread.",
      },
      {
        day: 3,
        meals: "B,L,D",
        stay: "Village gîte",
        walking: "4–5 h",
        stop: { name: "Tacheddirt", lat: 31.149, lng: -7.83 },
        title: "Cross to the Ourika side",
        description:
          "An easy crossing over a low grazing pass into the greener Ourika valley, with mules on hand for anyone who tires. Around 3–4 hours. Overnight in a village guesthouse.",
      },
      {
        day: 4,
        meals: "B,L",
        walking: "3 h",
        driving: "1 h",
        stop: { name: "Ourika Valley", lat: 31.317, lng: -7.75 },
        title: "Ourika Valley → Marrakech",
        description:
          "A short final descent through the Ourika valley to the roadhead, with a last riverside stop. Around 2 hours. Transfer back to Marrakech, arriving early afternoon.",
      },
    ],
    meetingPoint: { lat: 31.1369, lng: -7.9169, name: "Imlil Village, Atlas Mountains" },
    seoTitle: "Family Atlas Mountains Trek 4 Days — Gentle Berber Village Hike from Marrakech | Marrakech Eco Tours",
    seoDescription: "4-day family-friendly High Atlas trek from Marrakech: short walking days, waterfalls, Berber village guesthouses, mules for kids. Built for families. From $639.",
    faq: [
      { q: "What age children is this trek suitable for?", a: "It works well for school-age children roughly 6 and up who are used to walking and playing outdoors. Days are short (2–4 hours) at an easy grade, and mules are on hand to carry younger children who tire. For toddlers it is not ideal — the walking, while gentle, is still on mountain trails." },
      { q: "What if a child gets tired mid-walk?", a: "The mules that carry the luggage can also carry a tired younger child, and the guide sets the pace around the group rather than a schedule. Short days and frequent stops are built in precisely so that no one is pushed." },
      { q: "Where do we stay?", a: "Three nights in Berber village guesthouses hosted by local families, with all meals included. Families often eat together with the hosts, and there is usually bread baking or animals around that children enjoy. Bathrooms are simple and shared." },
      { q: "Is it safe for families?", a: "Yes. The routes stay on easy valley trails with no exposure or high passes, the guide is experienced with families, and there is no altitude concern below about 2,200 m. Standard sensible precautions — sun, water, sturdy shoes — are all that is needed." },
    ],
    featured: false,
  },
  {
    id: "39",
    slug: "family-desert-4day-marrakech",
    relatedPosts: ["family-desert-tour-morocco-cost", "sahara-desert-morocco-what-to-expect", "what-to-pack-desert-tour-morocco", "agafay-vs-merzouga-vs-zagora"],
    title: "Family Desert Adventure — 4-Day Marrakech to Sahara",
    category: "desert",
    origin: "marrakech",
    difficulty: "easy",
    duration: "4 days / 3 nights",
    groupSize: "2–12 people",
    tourType: "private",
    reviewCount: 0,
    rating: 4.9,
    // Benchmarked 10% under their 4-day Marrakech to Merzouga — same length, same route
    // (published table, verified Aug 2026).
    price: 1395,
    depositAmount: 307,
    groupPricing: [
      { minPeople: 1, price: 1395 },
      { minPeople: 2, price: 644 },
      { minPeople: 3, price: 529 },
      { minPeople: 4, price: 459 },
      { minPeople: 5, price: 416 },
      { minPeople: 6, price: 357 },
      { minPeople: 7, price: 335 },
      { minPeople: 10, price: 325 },
      { minPeople: 14, price: 303 },
    ],
    heroImage: "/gallery/tours-family-desert-4day-marrakech.jpg",
    gallery: [
      "/gallery/blog-merzouga-vs-zagora-which-desert-tour.jpg",
      "https://images.pexels.com/photos/36218738/pexels-photo-36218738.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/35032238/pexels-photo-35032238.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
    shortDescription:
      "A four-day Marrakech-to-Sahara circuit paced for families: a comfortable vehicle, a kasbah film set, a night on the dunes, camel rides, and short easy stops.",
    description:
      "The classic Marrakech desert circuit, adapted so it works with children. The distances are the same — over the Atlas to Aït Ben Haddou, through the gorge country to the Erg Chebbi dunes and back — but the driving is broken into shorter, comfortable stages with proper stops, hotel nights with pools, and a desert camp built for families rather than a spartan bivouac. Kids get camel rides, a Game-of-Thrones film set to explore, sandboarding on the dunes, and a night under a sky full of stars. Everything moves in an air-conditioned vehicle, so there is no walking demand — just a big, memorable adventure the whole family can share.",
    highlights: [
      "A full night on the Erg Chebbi dunes in a family-friendly desert camp",
      "Camel rides and sandboarding on the dunes for the kids",
      "Explore the Aït Ben Haddou kasbah — a Game of Thrones and Gladiator film set",
      "Comfortable air-conditioned vehicle with short, broken-up driving stages",
    ],
    includes: [
      "Air-conditioned minibus/4x4 transport throughout",
      "Professional bilingual driver-guide (English/French)",
      "1 night hotel in Dades Valley (dinner + breakfast)",
      "1 night family desert camp at Erg Chebbi (dinner + breakfast)",
      "1 night hotel in Ouarzazate (breakfast)",
      "Sunset and sunrise camel rides at Erg Chebbi",
      "All transfers and access fees",
    ],
    excludes: [
      "Lunches (recommended budget: €12–15 per meal)",
      "Atlas Film Studios entry ticket (optional, ~€7)",
      "Personal travel insurance",
      "Tips",
    ],
    itinerary: [
      {
        day: 1,
        meals: "D",
        stay: "Hotel",
        driving: "≈5 h",
        distance: "≈300 km",
        stop: { name: "Dades Valley", lat: 31.356, lng: -6.01 },
        title: "Marrakech → Aït Ben Haddou → Dades Valley",
        description:
          "Cross the Tizi n'Tichka pass over the High Atlas with photo stops, then explore the earthen kasbah of Aït Ben Haddou — a favourite with kids who recognise it from films. Continue to a hotel in the Dades Valley for the night, with a pool to cool off in. Dinner and overnight.",
      },
      {
        day: 2,
        meals: "B,D",
        stay: "Desert camp",
        driving: "≈4 h",
        distance: "≈240 km",
        stop: { name: "Erg Chebbi, Merzouga", lat: 31.1, lng: -3.98 },
        title: "Dades Gorge → Todra Gorge → Erg Chebbi desert camp",
        description:
          "A gentle morning walk in the dramatic Todra Gorge (flat and easy), then on to Merzouga. Arrive at the dunes for a sunset camel ride into a family desert camp. Dinner around the fire and stargazing. Overnight at the camp.",
      },
      {
        day: 3,
        meals: "B,D",
        stay: "Hotel",
        driving: "≈4 h",
        distance: "≈240 km",
        stop: { name: "Ouarzazate", lat: 30.92, lng: -6.893 },
        title: "Sunrise dunes → Ouarzazate",
        description:
          "Sunrise over the dunes and time for sandboarding before breakfast. Drive back west along the Road of a Thousand Kasbahs, with stops, to Ouarzazate. Overnight in a comfortable hotel.",
      },
      {
        day: 4,
        meals: "B",
        driving: "≈4 h",
        distance: "≈200 km",
        stop: { name: "Marrakech", lat: 31.6295, lng: -7.9811 },
        title: "Ouarzazate → Marrakech",
        description:
          "Optional visit to the Atlas Film Studios, then the drive back over the Atlas to Marrakech, arriving in the late afternoon.",
      },
    ],
    meetingPoint: { lat: 31.0580, lng: -4.0127, name: "Merzouga, Erg Chebbi Sahara" },
    seoTitle: "Family Desert Tour 4 Days — Marrakech to Sahara with Kids | Marrakech Eco Tours",
    seoDescription: "4-day family desert tour from Marrakech to the Erg Chebbi dunes: camel rides, sandboarding, a kasbah film set, hotel pools and a family desert camp. From $1395.",
    faq: [
      { q: "Is this desert tour suitable for young children?", a: "Yes. There is no walking demand — everything moves in an air-conditioned vehicle, and the stops (kasbah, gorge, dunes) are short and easy. The driving is real, though, so it suits children who travel reasonably well in a car; the stages are deliberately broken up with frequent stops to help." },
      { q: "What makes the desert camp family-friendly?", a: "The camp used on this trip has proper beds, private or shared bathroom tents, and dinner served together rather than a bare bivouac. The camel rides are short and led on foot, and there is space around the fire for children in the evening." },
      { q: "How long is each day in the car?", a: "The longest driving days are the first and the last, crossing the Atlas — several hours each, but broken by the kasbah, gorges and photo stops rather than done in one push. The middle days are shorter, with more time actually in the desert." },
      { q: "What isn't included?", a: "Lunches (budget roughly €12–15 per meal), the optional Atlas Film Studios ticket (~€7), personal travel insurance, and tips. Everything else — transport, three nights' accommodation with the meals listed, camel rides and access fees — is covered." },
    ],
    featured: false,
  },
  {
    id: "40",
    slug: "high-atlas-grand-traverse-15day",
    title: "High Atlas Grand Traverse — 15-Day M'Goun to Toubkal Trek from Marrakech",
    category: "trekking",
    origin: "marrakech",
    difficulty: "expert",
    duration: "15 days / 14 nights",
    groupSize: "2–10 people",
    tourType: "private",
    reviewCount: 0,
    rating: 4.9,
    // Real ladder, not the derived curve: a solo traveller pays for the whole
    // private guide and vehicle, so solo is far above the shallow premium
    // groupPriceTiers() would assume.
    // Sold from two travellers up - not offered solo.
    minPeople: 2,
    // Real ladder, not the derived curve.
    // EUR 1700 / 1400 / 1290 / 1230 / 1100 for 2/3/4/5/6+.
    groupPricing: [
      { minPeople: 2, price: 1961 },
      { minPeople: 3, price: 1615 },
      { minPeople: 4, price: 1488 },
      { minPeople: 5, price: 1419 },
      { minPeople: 6, price: 1269 },
    ],
    price: 1961,
    depositAmount: 431,
    heroImage: "/gallery/toubkal-summit-panorama-high-atlas.jpg",
    gallery: [
      "/gallery/toubkal-summit-panorama-high-atlas.jpg",
      "/gallery/ifni-mule-approach-toubkal-behind.jpg",
      "/gallery/ifni-loaded-mule-high-scree.jpg",
      "/gallery/ifni-cattle-stream-azib.jpg",
      "/gallery/toubkal-summit-ridge-climbers.jpg",
    ],
    shortDescription:
      "The full west-to-east crossing of the High Atlas on foot: from the Aït Bougmez 'Happy Valley' over M'Goun (4,068 m) to a summit of Toubkal (4,167 m), linking North Africa's two highest peaks in fifteen days.",
    description:
      "This is the great walk of the High Atlas — a genuine range traverse rather than a single-peak trip. Starting in the Aït Bougmez valley, the 'Happy Valley' of terraced fields and earthen villages, you cross the M'Goun massif and stand on its 4,068 m summit, then spend a week and a half moving west through gorges, high plateaus, shepherds' pastures and villages that see almost no outside visitors — including Magdaz, which UNESCO has called Morocco's most beautiful village. The traverse finishes in the Toubkal massif with a summit of Jbel Toubkal (4,167 m), the highest point in North Africa, before descending to Imlil. Fifteen days of remote, high, physically demanding trekking with full mule support — the most serious trip we run, and the finest.",
    highlights: [
      "Summit both of North Africa's highest peaks — M'Goun (4,068 m) and Toubkal (4,167 m)",
      "Begin in the Aït Bougmez 'Happy Valley', the classic western trailhead",
      "Pass through Magdaz — called Morocco's most beautiful village by UNESCO",
      "Cross remote high plateaus and gorges rarely seen by outside trekkers",
      "Full mule support and a mountain crew across the entire 15-day traverse",
    ],
    includes: [
      "Professional licensed high-altitude mountain guide",
      "14 nights accommodation (village gîtes, mountain refuges, and camping)",
      "All meals throughout the trek",
      "Cook and full mule team carrying gear, food, and camp",
      "Toubkal and M'Goun national park / access fees",
      "Round-trip transfer from Marrakech to the trailheads",
    ],
    excludes: [
      "Travel insurance with high-altitude cover (mandatory)",
      "Personal trekking equipment and sleeping bag",
      "Crampons and ice axe in winter conditions (rental available)",
      "Tips for guide, cook, and muleteers",
    ],
    itinerary: [
      { day: 1, title: "Marrakech → Aït Bougmez (1,800 m)", description: "Drive over the High Atlas via Aït M'hamed into the Aït Bougmez 'Happy Valley'. Settle in, meet the crew, and take a short acclimatisation walk among the terraced fields. Overnight in a village gîte.", stop: { name: "Aït Bougmez", lat: 31.644, lng: -6.447 }, meals: "L,D", stay: "Village gîte", walking: "1–2 h", driving: "5–6 h" },
      { day: 2, title: "Aït Bougmez → Tarkeddit plateau (2,900 m)", description: "Climb steadily out of the valley onto the approaches of the M'Goun massif, camping on the Tarkeddit plateau beneath the summit ridge. Around 6 hours walking.", stop: { name: "Tarkeddit", lat: 31.548, lng: -6.447 }, meals: "B,L,D", stay: "Wild camp", walking: "6 h", ascent: "+1,100 m" },
      { day: 3, title: "Summit M'Goun (4,068 m) → Oulilimt valley", description: "Pre-dawn start for the long ridge to the M'Goun summit, the second-highest in North Africa, then a long descent into the Oulilimt valley to camp. A big day, around 8–9 hours.", stop: { name: "Jbel Mgoun Summit", lat: 31.517, lng: -6.42 }, meals: "B,L,D", stay: "Wild camp", walking: "8–9 h", ascent: "+1,168 m / −1,150 m" },
      { day: 4, title: "Oulilimt → Tessaout gorges", description: "Follow the young Tessaout river down through a spectacular gorge system, with river crossings and dramatic rock walls. Around 6 hours. Camp by the river.", stop: { name: "Tessaout Gorge", lat: 31.47, lng: -6.32 }, meals: "B,L,D", stay: "Wild camp", walking: "6 h" },
      { day: 5, title: "Tessaout → Magdaz village (1,900 m)", description: "Continue down the Tessaout valley to Magdaz, the cluster of tall earthen houses UNESCO has called Morocco's most beautiful village. Around 5 hours. Overnight in a village gîte.", stop: { name: "Magdaz", lat: 31.47, lng: -6.26 }, meals: "B,L,D", stay: "Village gîte", walking: "5 h" },
      { day: 6, title: "Magdaz → Amezri → high pastures", description: "Leave the Tessaout, climbing westward over grazing country toward the next watershed. Around 6 hours. Camp in the high pastures among the shepherds' azibs.", stop: { name: "Oulilimt", lat: 31.5, lng: -6.36 }, meals: "B,L,D", stay: "Wild camp", walking: "6 h", ascent: "+900 m" },
      { day: 7, title: "Rest and acclimatisation day", description: "A slower day to recover mid-traverse — a short optional walk, laundry, and time with the crew before the higher country ahead. Overnight camp or village gîte.", meals: "B,L,D", stay: "Wild camp", walking: "2–3 h" },
      { day: 8, title: "Over the western passes", description: "A sustained day crossing a high pass (around 3,500 m) into a new valley system, moving steadily west across the range. Around 7 hours. Camp.", stop: { name: "Oulilimt", lat: 31.5, lng: -6.36 }, meals: "B,L,D", stay: "Wild camp", walking: "6–7 h", ascent: "+850 m" },
      { day: 9, title: "Remote valleys traverse", description: "A full day through valleys and hamlets that see almost no trekkers, following mule paths between villages. Around 6–7 hours. Overnight in a village gîte.", meals: "B,L,D", stay: "Wild camp", walking: "6 h" },
      { day: 10, title: "Approach the Toubkal massif", description: "Climb toward the eastern edge of the Toubkal massif, the scenery turning higher and more alpine. Around 6 hours. Camp.", stop: { name: "Azzaden Valley", lat: 31.12, lng: -7.97 }, meals: "B,L,D", stay: "Village gîte", walking: "6–7 h" },
      { day: 11, title: "Tacheddirt (2,300 m)", description: "Descend to Tacheddirt, the highest permanently inhabited village in the Toubkal region, and the gateway to the final summit approach. Around 5 hours. Overnight in a village gîte.", stop: { name: "Tacheddirt", lat: 31.149, lng: -7.83 }, meals: "B,L,D", stay: "Village gîte", walking: "5 h", ascent: "+560 m" },
      { day: 12, title: "Tacheddirt → Toubkal Refuge (3,207 m)", description: "Cross the Tizi n'Tacheddirt and traverse into the Mizane valley to the Toubkal Refuge. Around 6 hours. Afternoon acclimatisation walk above the refuge. Early night.", stop: { name: "Toubkal Refuge", lat: 31.0782, lng: -7.9192 }, meals: "B,L,D", stay: "Mountain refuge", walking: "6 h", ascent: "+900 m" },
      { day: 13, title: "Summit Toubkal (4,167 m) → Refuge", description: "Pre-dawn summit push up the South Cirque to the highest point in North Africa for sunrise, then descend back to the refuge. Around 7 hours round trip. Celebratory dinner.", stop: { name: "Jbel Toubkal Summit", lat: 31.0606, lng: -7.9153 }, meals: "B,L,D", stay: "Mountain refuge", walking: "7 h", ascent: "+960 m / −960 m" },
      { day: 14, title: "Refuge → Imlil (1,740 m)", description: "Descend the Mizane valley past the Sidi Chamharouch shrine to Imlil. Around 4 hours. A final night in an Imlil guesthouse to mark the end of the traverse.", stop: { name: "Imlil", lat: 31.1369, lng: -7.9169 }, meals: "B,L,D", stay: "Guesthouse", walking: "5 h" },
      { day: 15, title: "Imlil → Marrakech", description: "Transfer back to Marrakech, arriving late morning. Tour ends.", stop: { name: "Marrakech", lat: 31.6295, lng: -7.9811 }, meals: "B", driving: "1.5 h" },
    ],
    meetingPoint: { lat: 31.6558, lng: -6.4561, name: "Aït Bougmez / Aït M'hamed, M'Goun Trailhead" },
    seoTitle: "High Atlas Grand Traverse 15 Days — M'Goun to Toubkal Trek | Marrakech Eco Tours",
    seoDescription: "The full 15-day High Atlas traverse from the Aït Bougmez valley over M'Goun (4,068 m) to a Toubkal (4,167 m) summit. Remote villages, full mule support. From $1961.",
    faq: [
      { q: "How fit and experienced do I need to be for the Grand Traverse?", a: "This is graded expert — the most demanding trip we run. It is fifteen consecutive days of walking, several of them long (8–9 hours), with two 4,000 m summits and high passes. You should already have multi-day trekking experience, be comfortable at altitude, and be prepared for consecutive hard days in remote country. It is not a first big trek." },
      { q: "Which peaks does the traverse summit?", a: "Both of North Africa's highest: M'Goun (4,068 m) early in the route from the Aït Bougmez side, and Jbel Toubkal (4,167 m) near the end. Weather permitting, both summits are part of the standard itinerary rather than optional extras." },
      { q: "Where do we sleep over the fifteen days?", a: "A mix of village gîtes (simple family guesthouses), the Toubkal Refuge, and wild camping on the high plateaus where there are no villages. The crew carries and sets up the camp; you carry only a daypack. A sleeping bag is not provided." },
      { q: "What is the best season for this trek?", a: "Late spring (May–June) and autumn (September–October) are ideal: the high passes are clear of most snow and the temperatures are workable. In winter the traverse becomes a serious mountaineering undertaking requiring crampons and an ice axe, and some passes may be impassable." },
      { q: "How is the trek supported?", a: "Fully. A licensed high-altitude guide leads, a cook handles all meals, and a mule team carries the gear, food, and camp for the whole traverse. That support is what makes fifteen days in remote high country feasible — you walk with a daypack while the logistics are handled." },
    ],
    featured: true,
  },
  {
    id: "41",
    slug: "toubkal-summit-sahara-5day",
    title: "Toubkal & Sahara from Marrakech — 5-Day Mountain-to-Desert Tour",
    category: "trekking",
    origin: "marrakech",
    difficulty: "challenging",
    duration: "5 days / 4 nights",
    groupSize: "2–10 people",
    tourType: "private",
    reviewCount: 0,
    rating: 4.9,
    // Benchmarked 10% under their 5-day Toubkal Trek & Sahara — same trip, same length
    // (published table, verified Aug 2026).
    price: 1096,
    // No priceMax: the group tiers below express the real spread. The old
    // 690-790 band was a seasonal range on a single per-person price and
    // would now sit BELOW the solo rate, inverting the displayed range.
    depositAmount: 241,
    groupPricing: [
      { minPeople: 1, price: 1096 }, // €950
      { minPeople: 2, price: 743 }, // €644
      { minPeople: 3, price: 524 }, // €454
      { minPeople: 4, price: 452 }, // €392
      { minPeople: 5, price: 431 }, // €374
      { minPeople: 6, price: 420 }, // €364
      { minPeople: 7, price: 411 }, // €356
      { minPeople: 10, price: 378 }, // €328
      { minPeople: 14, price: 358 }, // €310
    ],
    heroImage: "/gallery/toubkal-summit-panorama-high-atlas.jpg",
    gallery: [
      "/gallery/toubkal-summit-panorama-high-atlas.jpg",
      "/gallery/toubkal-predawn-summit-start-crampons.jpg",
      "/gallery/tours-desert-4day-marrakech.jpg",
      "/gallery/tours-sahara-2day-agadir.jpg",
      "/gallery/toubkal-summit-ridge-climbers.jpg",
          "/gallery/toubkal-national-park-peak-clouds.jpg",
      "/gallery/toubkal-trail-turquoise-pool-waterfall.jpg",
],
    shortDescription:
      "The two great Moroccan adventures in one trip: summit Jbel Toubkal (4,167 m), then cross the Atlas to sleep under the stars on the Erg Chebbi dunes.",
    description:
      "This is Morocco's two headline experiences combined into a single, well-paced week: the highest summit in North Africa and the great dunes of the Sahara, back to back. The first two days climb Jbel Toubkal (4,167 m) from the Berber trailhead village of Imlil, with a refuge night at 3,207 m and a sunrise summit. Then, rather than returning to a hotel and starting again, you cross the High Atlas by road to the desert — through Aït Ben Haddou and the gorge country — for two nights that finish on the Erg Chebbi dunes at Merzouga, with a camel trek and a night in a desert camp. Mountain and desert, summit and Sahara, in five connected days. Run privately for your group.",
    highlights: [
      "Summit Jbel Toubkal (4,167 m) — the highest peak in North Africa",
      "Sunrise from the roof of North Africa, then breakfast back at the refuge",
      "Cross the Tizi n'Tichka pass and the UNESCO kasbah of Aït Ben Haddou",
      "Camel trek into the Erg Chebbi dunes and a night in a Sahara desert camp",
      "Two of Morocco's biggest experiences in one private, connected itinerary",
    ],
    includes: [
      "Professional licensed mountain guide for the Toubkal trek",
      "Private bilingual driver-guide (English/French) for the desert leg",
      "1 night mountain refuge + 1 night Imlil guesthouse (trek)",
      "1 night hotel in Dades Valley + 1 night Erg Chebbi desert camp",
      "All meals during the trek; dinner + breakfast on desert-camp and Dades nights",
      "Mule porter on the trek; sunset and sunrise camel treks at Erg Chebbi",
      "Toubkal National Park fees, all transfers, and round-trip from Marrakech",
    ],
    excludes: [
      "Travel insurance (mandatory for the trek)",
      "Personal trekking equipment and sleeping bag",
      "Lunches on the desert days (budget €12–15 per meal)",
      "Crampons and ice axe if summiting in winter (rental available)",
      "Tips for guides, driver, cook, and muleteer",
    ],
    itinerary: [
      {
        day: 1,
        meals: "L,D",
        stay: "Mountain refuge",
        walking: "5 h",
        driving: "1.5 h",
        ascent: "+1,470 m",
        stop: { name: "Toubkal Refuge", lat: 31.0782, lng: -7.9192 },
        title: "Marrakech → Imlil → Toubkal Refuge (3,207 m)",
        description:
          "Morning transfer from Marrakech to Imlil (1,740 m), about 90 minutes, where you meet your mountain guide. Trek up the Mizane valley past the Sidi Chamharouch shrine to the Toubkal Refuge (3,207 m) — roughly 5 hours with a mule carrying the bags. Afternoon acclimatisation walk above the refuge, early dinner, and an early night before summit day.",
      },
      {
        day: 2,
        meals: "B,L,D",
        stay: "Guesthouse",
        walking: "6–7 h",
        ascent: "+960 m / −2,430 m",
        stop: { name: "Jbel Toubkal Summit", lat: 31.0606, lng: -7.9153 },
        title: "Summit Toubkal (4,167 m) → Imlil",
        description:
          "Pre-dawn start by head torch for the steep push up the South Cirque to the summit for sunrise, with the whole High Atlas — and the edge of the Sahara — below. Descend to the refuge for a proper breakfast, then continue down to Imlil. Night in an Imlil guesthouse to rest tired legs before the desert leg.",
      },
      {
        day: 3,
        meals: "D",
        stay: "Hotel",
        driving: "≈5 h",
        distance: "≈300 km",
        stop: { name: "Aït Ben Haddou", lat: 31.047, lng: -7.129 },
        title: "Imlil → Aït Ben Haddou → Dades Valley",
        description:
          "Meet your desert driver-guide and cross the High Atlas by the Tizi n'Tichka pass. Stop at the earthen kasbah of Aït Ben Haddou (a Game of Thrones and Gladiator location), then follow the Road of a Thousand Kasbahs to a hotel in the Dades Valley. Dinner and overnight.",
      },
      {
        day: 4,
        meals: "B,D",
        stay: "Desert camp",
        walking: "1–2 h",
        driving: "≈4 h",
        distance: "≈240 km",
        stop: { name: "Erg Chebbi, Merzouga", lat: 31.1, lng: -3.98 },
        title: "Dades → Todra Gorge → Erg Chebbi Desert Camp",
        description:
          "Morning walk in the dramatic Todra Gorge (400 m walls), then east across the desert to Merzouga. Arrive at the Erg Chebbi dunes for a sunset camel trek into a Berber desert camp. Dinner around the fire and stargazing under one of the darkest skies in Morocco. Overnight at the camp.",
      },
      {
        day: 5,
        meals: "B",
        driving: "≈8 h",
        distance: "≈560 km",
        stop: { name: "Marrakech", lat: 31.6295, lng: -7.9811 },
        title: "Sunrise Dunes → Marrakech",
        description:
          "Optional sunrise camel ride over the dunes and breakfast at camp, then the drive back across the Atlas to Marrakech via Ouarzazate, arriving in the evening. Tour ends.",
      },
    ],
    meetingPoint: { lat: 31.1369, lng: -7.9169, name: "Imlil Village, Atlas Mountains" },
    seoTitle: "Toubkal Summit & Sahara 5-Day Tour from Marrakech | Marrakech Eco Tours",
    seoDescription:
      "Combine both of Morocco's headline adventures: summit Jbel Toubkal (4,167 m) then cross to the Erg Chebbi Sahara dunes. Private 5-day mountain-to-desert tour from Marrakech. From $1096 solo, far less per person for two or more.",
    faq: [
      { q: "How fit do I need to be for the Toubkal and Sahara combo?", a: "The trek half is graded challenging: two mountain days with a pre-dawn summit push at 4,167 m, so you need to be a fit, regular walker comfortable at altitude. The desert half is easy and vehicle-based, so it acts as a rest after the summit. If you can manage a hard two-day mountain trek, the rest of the trip is comfortable." },
      { q: "Why do Toubkal first and the desert second?", a: "The summit is the physically demanding part, so it goes first while you are fresh, and the desert days — mostly driving with short walks and camel rides — become a natural wind-down afterwards. It also means the toughest weather variable (the summit) is dealt with early in the trip." },
      { q: "Where do we sleep across the five days?", a: "One night in the Toubkal Refuge (a shared mountain hut at 3,207 m), one night in an Imlil village guesthouse, one night in a Dades Valley hotel, and one night in a Berber desert camp on the Erg Chebbi dunes. A sleeping bag liner is worth bringing for the refuge and camp." },
      { q: "Is this a private tour?", a: "Yes. It runs privately for your party of 2–10, with a licensed mountain guide for the trek and a dedicated driver-guide and vehicle for the desert leg. You are not joined to other groups." },
      { q: "Can the 5-day combo run in winter?", a: "Yes, but the Toubkal summit becomes a snow climb from roughly November to March, needing crampons and an ice axe (rental available) and a bit more mountain experience. The desert leg runs year-round; winter desert nights are cold, so pack warm layers." },
    ],
    featured: true,
  },
  {
    id: "42",
    slug: "chegaga-camel-trek-8day",
    title: "Draa Valley to M'hamid — 8-Day Chegaga Camel Trek",
    category: "desert",
    origin: "marrakech",
    difficulty: "moderate",
    duration: "8 days / 7 nights",
    groupSize: "2–16 people",
    tourType: "private",
    groupPricing: [
      { minPeople: 1, price: 3114 },
      { minPeople: 2, price: 1500 },
      { minPeople: 3, price: 1218 },
      { minPeople: 4, price: 1048 },
      { minPeople: 5, price: 882 },
    ],
    reviewCount: 18,
    rating: 5.0,
    price: 3114,
    depositAmount: 685,
    heroImage: "/gallery/tours-erg-chegaga-3day-marrakech.jpg",
    gallery: [
      "/gallery/tours-erg-chegaga-3day-marrakech.jpg",
      "/gallery/blog-merzouga-vs-zagora-which-desert-tour.jpg",
      "/gallery/blog-hero-sahara-dunes-golden.jpg",
    ],
    shortDescription:
      "Six days walking beside a camel caravan from the Draa Valley to the Chegaga dunes — no vehicle, no fixed camp, no road.",
    description:
      "This is the Sahara on foot. Not an hour on a camel at sunset, but six full days walking beside a caravan that carries the camp, from the last palms of the Draa Valley across the hamada to the 50 km dune sea at Erg Chegaga and out to M’hamid.\n\nYou walk roughly five to seven hours a day at the caravan’s pace, which is slower than yours. The camels carry the tents, the food and the water; you carry a day pack. Each night the crew makes camp wherever the day ended — a different place every time, with no facilities and no other travellers, because a mobile camp cannot be booked by anyone else.\n\nThe two ends are vehicle days: Marrakech over the Tizi n’Tichka to the Draa, and M’hamid back to Marrakech. Everything between is walking, and there is no road on that section to change your mind on.\n\nGraded moderate rather than hard: the terrain is flat and the altitude negligible, but the consecutive days and the sand make it a real trek. If you have walked a multi-day route before, you are ready for this.",
    highlights: [
      "Six days walking with a camel caravan — not a one-hour ride",
      "Erg Chegaga: 50 km of dunes, reached on foot rather than by 4x4",
      "A different wild camp every night, with no fixed site and no other groups",
      "The Draa Valley palm belt, the Abbes pass and the Oued Naam dunes",
      "Berber guide and cook travelling with you for the whole crossing",
      "Some of the darkest night skies in Morocco, seven nights running",
    ],
    includes: [
      "Private transfers Marrakech ↔ the desert at both ends",
      "Licensed Berber desert guide (English and French)",
      "Camels and camel handlers to carry all luggage and equipment",
      "Cook, kitchen crew and all camp equipment",
      "All meals from dinner on day 1 to lunch on day 8",
      "Seven nights: hotel in Marrakech and mobile desert camps",
      "Drinking water throughout the trek",
    ],
    excludes: [
      "International flights",
      "Travel insurance — required for this trek",
      "Sleeping bag (rental available on request)",
      "A camel to ride rather than walk beside (€20 per camel per day)",
      "Soft drinks and bottled beverages",
      "Tips for the guide, cook and camel handlers",
    ],
    itinerary: [
      {
        day: 1,
        title: "Marrakech — arrival and briefing",
        description:
          "Arrive in Marrakech and settle into the hotel. Your guide meets you in the evening to run through the route, check kit and answer the questions everyone has before a first desert crossing. If you land early there is time for the medina.",
        stop: { name: "Marrakech", lat: 31.6295, lng: -7.9811 },
        meals: "D",
        stay: "Hotel in Marrakech",
      },
      {
        day: 2,
        title: "Marrakech → Draa Valley — meeting the caravan",
        description:
          "The long drive south over the Tizi n’Tichka pass, through Ouarzazate and down the Draa Valley past Agdz and Zagora. In the late afternoon you leave the road at Faija to meet the camels, the handlers and the cook. First night under canvas, with the caravan loaded and ready.",
        stop: { name: "Draa Valley (Faija)", lat: 30.3167, lng: -5.8375 },
        meals: "B,L,D",
        stay: "Mobile desert camp",
        driving: "8–9 h",
        distance: "≈460 km",
      },
      {
        day: 3,
        title: "Draa Valley → the hamada",
        description:
          "The first full walking day. You leave the palm belt and cross onto the hamada — the stone desert — with the Jbel Bani ridge on the horizon. Lunch and a long rest at an oasis while the sun is high, then on to camp as the light goes.",
        stop: { name: "Hamada du Draa", lat: 30.1500, lng: -5.9500 },
        meals: "B,L,D",
        stay: "Mobile desert camp",
        walking: "6–7 h",
      },
      {
        day: 4,
        title: "Abbes pass → Erg Chegaga",
        description:
          "Over the Abbes pass and into sand. The dunes build through the morning until, by afternoon, you reach Erg Chegaga itself — the largest dune field in Morocco, 50 km long and 15 km wide. Arriving on foot after two days of walking is a different experience from stepping out of a 4x4.",
        stop: { name: "Erg Chegaga", lat: 29.9167, lng: -6.0333 },
        meals: "B,L,D",
        stay: "Mobile camp in the dunes",
        walking: "6–7 h",
      },
      {
        day: 5,
        title: "Erg Chegaga → Bougarne dunes",
        description:
          "A gentler day through the dune sea towards M’hamid, with the midday hours spent under tamarisk trees while the heat passes. The dunes here are quieter than Chegaga’s western edge, where the day-trip vehicles turn around.",
        stop: { name: "Erg Bougarne", lat: 29.8500, lng: -5.8500 },
        meals: "B,L,D",
        stay: "Mobile desert camp",
        walking: "5–6 h",
      },
      {
        day: 6,
        title: "Bougarne → Oued Naam",
        description:
          "An early start to walk in the cool, crossing a rocky plateau between two dune systems before dropping into the Oued Naam dunes. This is the emptiest section of the route — you are unlikely to see anyone outside your own group all day.",
        stop: { name: "Oued Naam", lat: 29.8000, lng: -5.7500 },
        meals: "B,L,D",
        stay: "Mobile desert camp",
        walking: "6–7 h",
      },
      {
        day: 7,
        title: "Oued Naam → M’hamid → Marrakech",
        description:
          "A last shorter walk through Regaga to M’hamid el Ghizlane, where the road restarts and the caravan ends. Say goodbye to the camel crew, then drive back up the Draa Valley to Marrakech for a bed, a shower and a tap.",
        stop: { name: "M’hamid el Ghizlane", lat: 29.8264, lng: -5.7222 },
        meals: "B,L,D",
        stay: "Hotel in Marrakech",
        walking: "3 h",
        driving: "7–8 h",
      },
      {
        day: 8,
        title: "Marrakech — departure",
        description:
          "Breakfast, and time in the city if your flight allows, before the airport transfer.",
        stop: { name: "Marrakech", lat: 31.6295, lng: -7.9811 },
        meals: "B",
      },
    ],
    meetingPoint: { lat: 31.6295, lng: -7.9811, name: "Marrakech — your hotel or riad" },
    featured: false,
    seoTitle: "8-Day Chegaga Camel Trek from Marrakech — Draa Valley to M'hamid",
    seoDescription:
      "Walk the Sahara with a camel caravan: six days on foot from the Draa Valley to the Erg Chegaga dunes and M'hamid. Mobile camps, Berber guide, full board. From $3114 per person.",
    faq: [
      {
        q: "Do I ride the camel or walk?",
        a: "You walk. The camels carry the tents, food, water and your luggage — you carry only a day pack. That is what makes this a trek rather than a camel ride. If you would rather ride part of the way, a riding camel can be added for about €20 per camel per day, arranged before departure.",
      },
      {
        q: "How hard is it, really?",
        a: "Moderate. You walk five to seven hours a day for six consecutive days, but the ground is flat, there is no altitude, and the caravan sets a slow pace. The difficulty is the repetition and the sand rather than any single hard day. Anyone who has done a multi-day walking route before will manage it comfortably.",
      },
      {
        q: "What are the camps like?",
        a: "Mobile and basic, which is the point. The crew pitches traditional Berber tents wherever the day ends, so it is a different site every night, with no fixed structures, no electricity and no washblock — a toilet tent is set up at each camp. In exchange you sleep somewhere no vehicle can reach and where no other group is staying.",
      },
      {
        q: "Is there a minimum number of people?",
        a: "Yes — two. Trips longer than seven days need a minimum of two travellers to run, because a full camel crew, guide and cook go out regardless of headcount. The per-person price falls sharply as the group grows: €1,040 each for two, €790 each for four and €695 each from five upwards.",
      },
      {
        q: "When is the best time to go?",
        a: "October to May. Summer in this part of the Sahara reaches temperatures that make multi-day walking genuinely unsafe, so we do not run the trek from June to September. The clearest, coldest nights — and the best stars — are December through February, when a warm sleeping bag matters.",
      },
      {
        q: "How is this different from your 3-day Erg Chegaga tour?",
        a: "The [3-day tour](/en/tours/erg-chegaga-3day-marrakech) reaches the same dunes by 4x4 and stays at a fixed camp, and it is the right choice if you have three days. This is eight days on foot: you approach Chegaga across two days of desert, sleep in a different wild camp each night, and continue through the dunes to M'hamid rather than turning around.",
      },
    ],
  },
];

export function getTour(slug: string): Tour | undefined {
  return TOURS.find((t) => t.slug === slug);
}

export function getFeaturedTours(): Tour[] {
  return TOURS.filter((t) => t.featured);
}

export function getToursByCategory(category: Category): Tour[] {
  if (category === "day-tours") {
    return TOURS.filter((t) => t.category === "day-tours" || t.isDayTour);
  }
  return TOURS.filter((t) => t.category === category);
}

export type DurationBucket = "day" | "short" | "long";

/**
 * Day count for filtering/bucketing, derived from `itinerary.length` rather
 * than parsing the free-text `duration` string — `duration` is translated
 * per-locale ("4 days" / "4 Tage" / "4 jours"), but `itinerary` always has
 * exactly one entry per day (a half-day tour has a single `day: 1` entry),
 * so this stays correct in every language without locale-specific parsing.
 */
export function durationDays(tour: Tour): number {
  return tour.itinerary.length || 1;
}

/** Bucket a tour into the listing's duration filter groups. */
export function durationBucket(tour: Tour): DurationBucket {
  const days = durationDays(tour);
  if (days <= 1) return "day";
  if (days <= 3) return "short";
  return "long";
}

export const CATEGORIES: {
  id: Category;
  label: string;
  icon: string;
  description: string;
  heroImage: string;
}[] = [
  {
    id: "trekking",
    label: "Trekking",
    icon: "⛰️",
    description: "Multi-day high-altitude treks through Morocco's most dramatic mountain terrain.",
    heroImage: "/gallery/category-hero-atlas-ridge.jpg",
  },
  {
    id: "desert",
    label: "Desert Tours",
    icon: "🏜️",
    description: "Sahara camel treks, desert camps, and Morocco's most iconic golden dune landscapes.",
    heroImage: "/gallery/category-hero-medina-doorway.jpg",
  },
  {
    id: "day-tours",
    label: "Day Tours",
    icon: "🌄",
    description: "Single-day escapes from Marrakech and Agadir: waterfalls, valleys, coastline. Back by evening.",
    heroImage: "/gallery/blog-paradise-valley-agadir-complete-guide.jpg",
  },
  {
    id: "cultural",
    label: "Cultural Tours",
    icon: "🕌",
    description: "Medinas, ksour, and souks, walked with guides who grew up in them.",
    heroImage: "/gallery/categories-cultural.jpg",
  },
];

/** Tour count per category.
 *
 *  Deliberately written as literals rather than derived from TOURS. A value
 *  computed from the array (TOURS.filter(...).length) keeps a live reference to
 *  it, so any client component importing the count would pull the entire ~2,200
 *  line catalogue — itineraries, SEO prose, galleries — into the browser bundle
 *  just to render four integers.
 *
 *  `tourCountsMatchCatalogue` in __tests__/lib/tours.test.ts fails if these
 *  drift from the real catalogue, so they cannot silently go stale. */
export const TOUR_COUNT_BY_CATEGORY: Partial<Record<Category, number>> = {
  trekking: 12,
  desert: 12,
  cultural: 9,
  "day-tours": 8,
  // "hiking" is declared in Category but has no tours and no CATEGORIES entry.
};

/**
 * Per-person price tiers for a tour, largest groups cheapest. Uses the tour's
 * own `groupPricing` when set; otherwise derives tiers from the base `price`.
 *
 * WHY THE CURVE IS SHAPED THIS WAY
 * The dominant cost on a private multi-day tour is the vehicle and the
 * driver-guide, and that cost is fixed however many seats are filled. Moroccan
 * operators price accordingly: they quote per vehicle and divide by headcount.
 * Three published tier tables from marrakech-desert-trips.com (3-day Merzouga,
 * 4-day Merzouga, 4-day Marrakech-Fes) follow near-identical curves — 2 people
 * pay ~56% of the solo rate, 4 pay ~43%, 6 pay ~36%. Fitting a line through
 * their totals gives roughly EUR 585 fixed + EUR 172 per head.
 *
 * We do NOT copy that depth. Their solo price (EUR 790) is above our entire
 * solo price (EUR 320), so the same split would price us near or below cost.
 * What transfers is the SHAPE, not the numbers: steep from 1 to 2, flattening
 * after 4.
 *
 * DURATION DECIDES THE DEPTH
 * A multi-day tour carries a large fixed cost (vehicle, fuel, driver-guide for
 * several days), so spreading it across a full car is a real saving and a deep
 * curve is honest. A one-day walking or city tour is mostly per-head — the
 * guide's fee barely shrinks per person — so the same discount would sell below
 * cost. Applying one curve to both took a EUR 35 private day tour down to
 * EUR 22 per person at six, which is not a saving, it is a loss.
 *
 *   multi-day  100 / 93 / 88 / 84 / 81 / 79%   (21% off at six)
 *   single-day 100 / 96 / 94 / 92 / 91 / 90%   (10% off at six)
 *
 * WHY NOT DEEPER
 * Modelling the cost from published Moroccan rates — 4x4 with driver at
 * EUR 150-300/day, desert camp 400-1,200 MAD pp, Dades hotel 150-300 MAD pp —
 * puts a 3-day departure at roughly EUR 270 fixed + EUR 51 per head at the
 * lean end. On that basis a EUR 320 solo booking makes about nothing, and the
 * profit on a booking is carried almost entirely by travellers 2 and up.
 *
 * Matching the market's 36%-off-at-six curve would cut profit per booking by
 * roughly a third, which only pays for itself if it wins 47-71% MORE bookings.
 * That is a large bet on price sensitivity nobody here has measured yet. This
 * curve keeps ~84% of the profit of a flat curve while still undercutting the
 * published competitor table at every group size. Revisit once the enquiry
 * sheet shows how group size actually distributes — see docs/PRICING.md.
 *
 * SHARED tours are excluded entirely: a seat on a shared departure costs the
 * same whether one or six people book it, so there is no fixed cost to spread
 * and a group discount would just be lost margin.
 *
 * NOT rounded to $5. Rounding the stored USD fights the EUR target — the site
 * sells in EUR, and $5 steps land 2-person totals up to EUR 8 away from the
 * intended figure. Rounding happens once, at display, in formatPrice().
 *
 * The multipliers are the one number to revisit once real booking data is in:
 * see docs/PRICING.md.
 */
export function groupPriceTiers(tour: Tour): { minPeople: number; price: number }[] {
  // A tour with a booking minimum must not advertise smaller groups. Applied
  // to every branch below, so explicit and derived ladders behave the same.
  const floor = (tiers: { minPeople: number; price: number }[]) => {
    const min = tour.minPeople ?? 1;
    if (min <= 1) return tiers;
    const kept = tiers.filter((t) => t.minPeople >= min);
    // Re-base the first surviving tier to the minimum itself, so a tour whose
    // ladder jumps (say 1, 2, 4, 6) with a minimum of 3 still opens at 3
    // rather than silently starting at 4.
    const below = [...tiers].reverse().find((t) => t.minPeople <= min);
    return kept.length && kept[0].minPeople === min
      ? kept
      : [{ minPeople: min, price: (below ?? tiers[0]).price }, ...kept];
  };

  if (tour.groupPricing?.length) return floor(tour.groupPricing);
  // Shared departures are sold per seat — no vehicle cost to divide.
  if (tour.tourType === "shared") return floor([{ minPeople: 1, price: tour.price }]);

  const multiDay = durationDays(tour) >= 2;
  const m = multiDay
    ? [1, 0.93, 0.88, 0.84, 0.81, 0.79]
    : [1, 0.96, 0.94, 0.92, 0.91, 0.9];

  return floor(
    m.map((mult, i) => ({
      minPeople: i + 1,
      price: Math.round(tour.price * mult),
    })),
  );
}

/** The cheapest per-person price and the group size that unlocks it.
 *
 *  Listing cards used to show `tour.price`, which is the SOLO rate — the most
 *  expensive per-person figure a tour has. On the 8-day camel trek that meant
 *  advertising EUR1,800 when a group of five pays EUR695, so the headline number
 *  scared people off before they reached the tier table. Cards now lead with
 *  the lowest rate and say what group size it needs, which is both the more
 *  attractive number and the honest one.
 *
 *  `minPeople` is 1 when a tour has no group discount, so callers can tell
 *  whether a qualifier is needed at all. */
export function lowestGroupPrice(tour: Tour): { price: number; minPeople: number } {
  const tiers = groupPriceTiers(tour);
  let best = tiers[0];
  for (const t of tiers) {
    if (t.price < best.price) best = t;
  }
  return { price: best.price, minPeople: best.minPeople };
}

/** The per-person price for a given group size, from the applicable tier. */
export function perPersonPrice(tour: Tour, people: number): number {
  const tiers = groupPriceTiers(tour);
  let price = tiers[0].price;
  for (const t of tiers) {
    if (people >= t.minPeople) price = t.price;
  }
  return price;
}

// Difficulty badges as one cold-palette family: indigo-wash → saffron-wash →
// terracotta-tint → deep terracotta. Structural tints on plaster, AA text.
export const DIFFICULTY_COLORS: Record<Difficulty, string> = {
  easy: "bg-[#E3E7F0] text-[#2B3A67]",
  moderate: "bg-[#F6EADB] text-[#8A5312]",
  challenging: "bg-[#F1DDD4] text-[#9A3A22]",
  expert: "bg-[#EAD0C6] text-[#7E2E1A]",
};
