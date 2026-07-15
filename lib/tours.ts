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
}

export interface Tour {
  id: string;
  slug: string;
  title: string;
  category: Category;
  origin: Origin;
  difficulty: Difficulty;
  duration: string;
  groupSize: string;
  reviewCount: number;
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
}

export const TOURS: Tour[] = [
  // ─────────────────────────────────────────────
  // MARRAKECH TOURS
  // ─────────────────────────────────────────────
  {
    id: "1",
    slug: "toubkal-summit-trek-4day",
    title: "Marrakech to Toubkal Summit — 4-Day Trek",
    category: "trekking",
    origin: "marrakech",
    difficulty: "challenging",
    duration: "4 days / 3 nights",
    groupSize: "2–10 people",
    reviewCount: 48,
    rating: 4.9,
    price: 380,
    depositAmount: 95,
    heroImage:
      "https://images.unsplash.com/photo-1611859836043-a9177f500a27?w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1611859836043-a9177f500a27?w=1200&q=85",
      "https://images.unsplash.com/photo-1766680460144-56a2937a5433?w=1200&q=85",
      "https://images.unsplash.com/photo-1560789590-ee4cc7125967?w=1200&q=85",
      "https://images.unsplash.com/photo-1593535988128-7214bc2cbedc?w=1200&q=85",
    ],
    shortDescription:
      "Conquer Jbel Toubkal (4,167 m) — the roof of North Africa — through Berber villages and high alpine valleys.",
    description:
      "The Toubkal Summit Trek is the definitive High Atlas adventure. Cross ancient mule paths, sleep in mountain refuges, and stand on the highest point in North Africa as sunrise spreads across Morocco. A life-changing four days that requires fitness but no technical climbing.",
    highlights: [
      "Summit Jbel Toubkal at 4,167 m — highest peak in North Africa",
      "Sleep in traditional Berber mountain refuges at 3,207 m",
      "Walk through the scenic Imlil and Aremd villages",
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
        title: "Marrakech → Imlil → Aremd (1,840 m)",
        description:
          "Transfer from Marrakech to Imlil (1h30). Trek through terraced Berber villages to Aremd. Welcome dinner with your guide.",
      },
      {
        day: 2,
        title: "Aremd → Toubkal Refuge (3,207 m)",
        description:
          "Ascend via the Mizane Valley past the Sidi Chamharouch shrine. Afternoon acclimatisation walk. Early sleep before summit day.",
      },
      {
        day: 3,
        title: "Summit Day — Toubkal (4,167 m)",
        description:
          "Pre-dawn start at 5:00 am. Steep ascent via the South Cirque scree. Summit at sunrise. Descent back to refuge for celebratory dinner.",
      },
      {
        day: 4,
        title: "Refuge → Imlil → Marrakech",
        description:
          "Morning descent through wildflower meadows. Transfer back to Marrakech. Tour ends mid-afternoon.",
      },
    ],
    meetingPoint: { lat: 31.1369, lng: -7.9169, name: "Imlil Village, Atlas Mountains" },
    seoTitle: "Toubkal Summit Trek 4 Days — Climb North Africa's Highest Peak | Marrakech Eco Tours",
    seoDescription: "Conquer Jbel Toubkal (4,167 m) with a licensed Berber guide. 4-day summit trek from Marrakech — refuges, all meals, and round-trip transfer included. From $380.",
    featured: true,
  },
  {
    id: "2",
    slug: "sahara-3day-marrakech",
    title: "Marrakech to the Sahara — 3-Day Desert Tour",
    category: "desert",
    origin: "marrakech",
    difficulty: "easy",
    duration: "3 days / 2 nights",
    groupSize: "2–12 people",
    reviewCount: 124,
    rating: 4.8,
    price: 245,
    depositAmount: 65,
    heroImage:
      "https://images.unsplash.com/photo-1617374128851-c84e37dc9f37?w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1617374128851-c84e37dc9f37?w=1200&q=85",
      "https://images.unsplash.com/photo-1685311572420-513619470404?w=1200&q=85",
      "https://images.unsplash.com/photo-1489573280374-2e193c63726c?w=1200&q=85",
      "https://images.unsplash.com/photo-1565458901745-4c797b564f73?w=1200&q=85",
    ],
    shortDescription:
      "Ride camels into the golden Erg Chebbi dunes and sleep under a million stars in a luxury Berber desert camp.",
    description:
      "Three days from Marrakech to the Sahara and back. Cross the High Atlas, stop at the UNESCO Ksar of Aït Ben Haddou, wind through the Draa Valley, and ride camels into Erg Chebbi as the sun melts into the dunes. One night under the stars in a traditional luxury camp.",
    highlights: [
      "Camel trek into Erg Chebbi dunes at sunset",
      "Overnight in a luxury Berber desert camp",
      "Aït Ben Haddou UNESCO World Heritage Ksar",
      "Stargazing with zero light pollution",
      "Sandboarding on the great dunes",
    ],
    includes: [
      "Private 4x4 transport throughout",
      "Sunset camel ride",
      "1 night luxury desert camp (dinner + breakfast)",
      "1 night hotel in Ouarzazate or Merzouga",
      "Experienced desert guide",
      "Sandboarding equipment",
    ],
    excludes: [
      "Lunches on days 1 and 3",
      "Personal expenses and tips",
    ],
    itinerary: [
      {
        day: 1,
        title: "Marrakech → Aït Ben Haddou → Ouarzazate",
        description:
          "Depart Marrakech at 7:00 am. Cross the Tizi n'Tichka pass (2,260 m). Visit Aït Ben Haddou. Night in Ouarzazate — the door of the desert.",
      },
      {
        day: 2,
        title: "Ouarzazate → Draa Valley → Erg Chebbi Camp",
        description:
          "Drive the Draa Valley palmery. Arrive Merzouga mid-afternoon. Camel trek into Erg Chebbi at sunset. Dinner and Gnawa music under the stars.",
      },
      {
        day: 3,
        title: "Sahara Sunrise → Todra Gorge → Marrakech",
        description:
          "Wake before dawn for the sunrise over the dunes. Return camel ride and breakfast. Drive back via the Todra Gorge. Arrive Marrakech by evening.",
      },
    ],
    meetingPoint: { lat: 31.0580, lng: -4.0127, name: "Merzouga, Erg Chebbi Sahara" },
    seoTitle: "3-Day Sahara Desert Tour from Marrakech — Camels, Dunes & Desert Camp | Marrakech Eco Tours",
    seoDescription: "Camel trek into Erg Chebbi at sunset and sleep under the stars. 3-day Marrakech to Sahara tour with Aït Ben Haddou, Draa Valley, and luxury Berber camp. From $245.",
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
    reviewCount: 203,
    rating: 4.7,
    price: 35,
    depositAmount: 10,
    heroImage:
      "https://images.unsplash.com/photo-1739464889400-e87ec57f246d?w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1739464889400-e87ec57f246d?w=1200&q=85",
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
        title: "Full Day — Ourika Valley",
        description:
          "Depart Marrakech at 8:30 am. Begin hiking at 9:30 am through villages and terraced fields. Swim at the waterfalls. Traditional Berber lunch. Return to Marrakech by 5:00 pm.",
      },
    ],
    meetingPoint: { lat: 31.3489, lng: -7.7411, name: "Ourika Valley, High Atlas" },
    seoTitle: "Ourika Valley Day Hike from Marrakech — Waterfalls & Berber Villages | Marrakech Eco Tours",
    seoDescription: "Hike to the Setti Fatma waterfalls through Berber villages and mountain streams, just 45 minutes from Marrakech. Guided day trip with Berber lunch included. From $35.",
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
    reviewCount: 167,
    rating: 4.8,
    price: 30,
    depositAmount: 8,
    heroImage:
      "https://images.unsplash.com/photo-1683028094236-7e5655c6607b?w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1683028094236-7e5655c6607b?w=1200&q=85",
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
        title: "Full Day — Ouzoud Waterfalls",
        description:
          "Depart Marrakech at 7:30 am. Arrive Ouzoud by 9:30 am. Guided walk to the falls, gorge trail, boat ride, macaque spotting. Free time for lunch. Return to Marrakech by 6:00 pm.",
      },
    ],
    meetingPoint: { lat: 32.0061, lng: -6.7200, name: "Ouzoud Falls, Middle Atlas" },
    seoTitle: "Ouzoud Waterfalls Day Trip from Marrakech — Barbary Macaques & 110m Falls | Marrakech Eco Tours",
    seoDescription: "Visit Morocco's highest waterfall — 110 metres of cascading water, wild Barbary macaques, and a gorge boat ride. Day trip from Marrakech with guide included. From $30.",
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
    reviewCount: 89,
    rating: 4.6,
    price: 75,
    depositAmount: 20,
    heroImage:
      "https://images.unsplash.com/photo-1535191059345-c16453b851b2?w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1535191059345-c16453b851b2?w=1200&q=85",
      "https://images.unsplash.com/photo-1685311572420-513619470404?w=1200&q=85",
      "https://images.unsplash.com/photo-1743890914315-b53fb9e704cf?w=1200&q=85",
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
        title: "Afternoon in the Agafay Desert",
        description:
          "Pick up from Marrakech at 3:00 pm. Arrive Agafay by 3:30 pm. Quad biking session, camel ride at sunset (5:30–6:30 pm). Traditional Berber dinner under the stars. Return to Marrakech by 10:00 pm.",
      },
    ],
    meetingPoint: { lat: 31.4969, lng: -8.1073, name: "Agafay Desert, Marrakech Region" },
    seoTitle: "Agafay Desert Sunset Tour from Marrakech — Quad Biking, Camels & Berber Dinner | Marrakech Eco Tours",
    seoDescription: "Experience the Sahara in 30 minutes — quad biking, camel ride at sunset, and a traditional Berber dinner in the Agafay stone desert near Marrakech. From $75.",
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
    reviewCount: 97,
    rating: 4.9,
    price: 45,
    depositAmount: 12,
    heroImage:
      "https://images.unsplash.com/photo-1722180862276-970599009d51?w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1722180862276-970599009d51?w=1200&q=85",
      "https://images.unsplash.com/photo-1772580310425-63f2290c2ba7?w=1200&q=85",
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
        title: "Full Medina Immersion",
        description:
          "Start at 9:00 am at the Koutoubia Mosque. Walk through the Mellah, Ben Youssef Madrasa, craft souks, tanneries, and Djemaa El-Fna. Mint tea at a hidden riad. Ends at 1:00 pm.",
      },
    ],
    meetingPoint: { lat: 31.6295, lng: -7.9811, name: "Koutoubia Mosque, Marrakech" },
    seoTitle: "Marrakech Medina Cultural Tour — Souks, Tanneries & Riads | Marrakech Eco Tours",
    seoDescription: "Explore the UNESCO Marrakech medina with a local guide — leather tanneries, Ben Youssef Madrasa, Djemaa El-Fna, and hidden riad gardens. Private half-day tour. From $45.",
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
    reviewCount: 61,
    rating: 4.7,
    price: 290,
    depositAmount: 75,
    heroImage:
      "https://images.unsplash.com/photo-1767936925033-9a5b59925613?w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1767936925033-9a5b59925613?w=1200&q=85",
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
        title: "Marrakech → Tizi n'Tichka → Aït Ben Haddou → Midelt",
        description:
          "Depart at 7:30 am. Ascend the Atlas via Tizi n'Tichka. Visit Aït Ben Haddou. Continue through the Ziz Valley to Midelt for the night.",
      },
      {
        day: 2,
        title: "Midelt → Ifrane → Azrou Cedar Forest → Fes",
        description:
          "Drive through the Middle Atlas. Stop in Ifrane and the cedar forest at Azrou to spot wild Barbary macaques. Arrive Fes by afternoon. Check in to your riad.",
      },
      {
        day: 3,
        title: "Fes Medina Full Day",
        description:
          "Guided exploration of Fes el-Bali: Chouara Tanneries, Al-Qarawiyyin University, Medersa Bou Inania, and the labyrinthine souks. Tour concludes in Fes.",
      },
    ],
    meetingPoint: { lat: 34.0331, lng: -5.0003, name: "Fes el-Bali, Imperial City" },
    seoTitle: "3-Day Marrakech to Fes Tour — Imperial Cities & High Atlas | Marrakech Eco Tours",
    seoDescription: "Drive from Marrakech to Fes via Tizi n'Tichka, Aït Ben Haddou, and the cedar forests of the Middle Atlas. 3-day private 4x4 tour with riad accommodation. From $290.",
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
    reviewCount: 31,
    rating: 5.0,
    price: 820,
    depositAmount: 200,
    heroImage:
      "https://images.unsplash.com/photo-1766680460144-56a2937a5433?w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1766680460144-56a2937a5433?w=1200&q=85",
      "https://images.unsplash.com/photo-1575064038796-5f31308aa3e9?w=1200&q=85",
      "https://images.unsplash.com/photo-1611859836043-a9177f500a27?w=1200&q=85",
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
      { day: 1, title: "Marrakech → Aït M'hamed", description: "Drive to the trailhead. Meet mule team and crew. First night with a Berber family." },
      { day: 2, title: "Aït M'hamed → Agouti (2,600 m)", description: "Trek through the Aït Bouguemez 'Happy Valley'. Camp at Agouti." },
      { day: 3, title: "Agouti → Tizi n'Ait Imi (3,650 m) → Tarkeddit", description: "First high pass. Breathtaking panoramas. Wild camp at Tarkeddit." },
      { day: 4, title: "Mgoun Summit (4,068 m)", description: "Pre-dawn start. Summit Jbel Mgoun. Descent to the Tessaoute gorge camp." },
      { day: 5, title: "Tessaoute Gorge Traverse", description: "Walk through the dramatic red-walled gorge. Wild swimming in the river." },
      { day: 6, title: "Gorge Exit → Bou Tharar", description: "Exit the gorge. Night in Bou Tharar village with a local family." },
      { day: 7, title: "Bou Tharar → Marrakech", description: "Transfer back to Marrakech via the rose valley. Tour concludes by 4:00 pm." },
    ],
    meetingPoint: { lat: 31.6558, lng: -6.4561, name: "Aït M'hamed, Mgoun Massif" },
    seoTitle: "Mgoun Massif Trek 7 Days — Morocco's Wildest High-Altitude Traverse | Marrakech Eco Tours",
    seoDescription: "7-day expert trek across the remote Mgoun Massif — summit Jbel Mgoun (4,068 m), cross high passes, and sleep in Berber family homes with no other tourists. From $820.",
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
    reviewCount: 142,
    rating: 4.8,
    price: 30,
    depositAmount: 8,
    heroImage:
      "https://images.unsplash.com/photo-1777815966041-7d8a58fb7fad?w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1777815966041-7d8a58fb7fad?w=1200&q=85",
      "https://images.unsplash.com/photo-1701793347370-bde5c22670e9?w=1200&q=85",
      "https://images.unsplash.com/photo-1777815966041-7d8a58fb7fad?w=1200&q=85",
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
        title: "Full Day — Paradise Valley",
        description:
          "Depart Agadir at 9:00 am. Arrive Paradise Valley by 10:00 am. Guided gorge hike, swimming in natural pools, Berber lunch under the palms. Return to Agadir by 5:00 pm.",
      },
    ],
    meetingPoint: { lat: 30.5376, lng: -9.5000, name: "Paradise Valley, Tamraght" },
    seoTitle: "Paradise Valley Day Trip from Agadir — Natural Swimming Pools & Palm Gorge | Marrakech Eco Tours",
    seoDescription: "Hidden palm gorge with natural swimming pools 35 km from Agadir. Guided hike through canyon scenery, Immouzer waterfall, and Berber lunch included. From $30.",
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
    reviewCount: 58,
    rating: 4.7,
    price: 70,
    depositAmount: 18,
    heroImage:
      "https://images.unsplash.com/photo-1593253029968-940e0625b482?w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1593253029968-940e0625b482?w=1200&q=85",
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
        title: "Full Day — Souss-Massa",
        description:
          "Depart Agadir at 8:00 am. Morning session at the Massa estuary for ibis and flamingos. Coastal trail and Atlantic dune walk after lunch. Return to Agadir by 5:00 pm.",
      },
    ],
    meetingPoint: { lat: 30.0559, lng: -9.6320, name: "Souss-Massa National Park, Massa" },
    seoTitle: "Souss-Massa National Park Wildlife Tour from Agadir — Rare Northern Bald Ibis | Marrakech Eco Tours",
    seoDescription: "Spot the critically endangered Northern Bald Ibis and flamingos in Morocco's most important wildlife reserve. Expert naturalist guide, binoculars, and picnic included. From $70.",
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
    reviewCount: 84,
    rating: 4.6,
    price: 40,
    depositAmount: 10,
    heroImage:
      "https://images.unsplash.com/photo-1778339517491-167ba786167b?w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1778339517491-167ba786167b?w=1200&q=85",
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
        title: "Full Day — Taroudant",
        description:
          "Depart Agadir at 8:30 am. Arrive Taroudant by 9:30 am. Guided medina walk, ramparts, souks, and tanneries. Optional Tiout Oasis stop. Return to Agadir by 5:00 pm.",
      },
    ],
    meetingPoint: { lat: 30.4702, lng: -8.8773, name: "Taroudant, Souss Valley" },
    seoTitle: "Taroudant Day Trip from Agadir — Ancient Ramparts & Berber Market | Marrakech Eco Tours",
    seoDescription: "Discover Morocco's best-preserved 16th-century ramparts and authentic Berber markets in Taroudant — 80 km from Agadir, without the tourist crowds. From $40.",
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
    reviewCount: 211,
    rating: 4.7,
    price: 28,
    depositAmount: 8,
    heroImage:
      "https://images.unsplash.com/photo-1537174621888-eba6137cf6c9?w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1537174621888-eba6137cf6c9?w=1200&q=85",
      "https://images.unsplash.com/photo-1553458287-b25ff2a8a778?w=1200&q=85",
      "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=1200&q=85",
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
        title: "Surf Session — Agadir Bay",
        description:
          "Meet your instructor at the beach at the agreed time. 30-min land lesson (technique + safety), 90 min in the water. Available morning and afternoon sessions daily.",
      },
    ],
    meetingPoint: { lat: 30.4206, lng: -9.5981, name: "Agadir Beach, Agadir Bay" },
    seoTitle: "Surf Lesson Agadir — Learn to Surf on Morocco's Atlantic Coast | Marrakech Eco Tours",
    seoDescription: "Learn to surf on Agadir Bay's warm Atlantic waves with a certified ISA instructor. Board, wetsuit, and safety briefing included. Beginner and intermediate levels. From $28.",
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
    reviewCount: 29,
    rating: 4.8,
    price: 280,
    depositAmount: 70,
    heroImage:
      "https://images.unsplash.com/photo-1517227062101-68105352ffc7?w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1517227062101-68105352ffc7?w=1200&q=85",
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
        title: "Agadir → Tafraoute → First Camp",
        description:
          "Drive to Tafraoute (2h30). Visit the painted rocks. Begin trekking into the almond gorges. Night in a Berber guesthouse.",
      },
      {
        day: 2,
        title: "High Ridge Traverse",
        description:
          "Full day trekking through pink granite ridges with views of the Ameln Valley below. Night camping or guesthouse in a remote village.",
      },
      {
        day: 3,
        title: "Valley Descent → Agadir",
        description:
          "Morning descent through argan forest. Traditional lunch in a village. Drive back to Agadir. Arrive by late afternoon.",
      },
    ],
    meetingPoint: { lat: 29.7231, lng: -8.9762, name: "Tafraoute, Anti-Atlas Mountains" },
    seoTitle: "Anti-Atlas Mountains Trek 3 Days from Agadir — Pink Granite & Painted Rocks | Marrakech Eco Tours",
    seoDescription: "3-day trek through Morocco's most underrated mountain range — pink granite peaks, almond blossom gorges, and remote Berber villages. Private tour from Agadir. From $280.",
    featured: true,
  },
  {
    id: "14",
    slug: "sahara-2day-agadir",
    title: "Agadir to the Sahara — 2-Day Desert Tour",
    category: "desert",
    origin: "agadir",
    difficulty: "easy",
    duration: "2 days / 1 night",
    groupSize: "2–10 people",
    reviewCount: 47,
    rating: 4.9,
    price: 195,
    depositAmount: 50,
    heroImage:
      "https://images.unsplash.com/photo-1685311572420-513619470404?w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1685311572420-513619470404?w=1200&q=85",
      "https://images.unsplash.com/photo-1617374128851-c84e37dc9f37?w=1200&q=85",
      "https://images.unsplash.com/photo-1489573280374-2e193c63726c?w=1200&q=85",
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
        title: "Agadir → Tata → Foum Zguid → Erg Chegaga",
        description:
          "Depart Agadir at 6:30 am. Drive south through the Anti-Atlas foothills via Tata. Cross the hammada to Foum Zguid. Camel trek into Erg Chegaga at sunset. Berber camp dinner.",
      },
      {
        day: 2,
        title: "Sunrise → Draa Valley → Agadir",
        description:
          "Dawn camel trek for the sunrise over the dunes. Breakfast at camp. Drive north through the magnificent Draa Valley palm groves. Arrive Agadir by evening.",
      },
    ],
    meetingPoint: { lat: 29.8671, lng: -7.9386, name: "Erg Chegaga, Western Sahara" },
    seoTitle: "2-Day Sahara Tour from Agadir — Erg Chegaga Desert Camp & Draa Valley | Marrakech Eco Tours",
    seoDescription: "The remote Erg Chegaga dunes via the southern Draa Valley route — camel trek, luxury desert camp, and a sunrise over the Sahara. 2-day tour from Agadir. From $195.",
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
    reviewCount: 73,
    rating: 4.7,
    price: 38,
    depositAmount: 10,
    heroImage:
      "https://images.unsplash.com/photo-1593253029656-9aaee080fb29?w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1593253029656-9aaee080fb29?w=1200&q=85",
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
        title: "Full Day — Souss Valley",
        description:
          "Depart Agadir at 9:00 am. Visit argan cooperative (10:00 am). Drive to honey village. Berber family lunch (1:00 pm). Afternoon visit to Aït Baha or valley viewpoint. Return to Agadir by 5:00 pm.",
      },
    ],
    meetingPoint: { lat: 30.0667, lng: -8.6500, name: "Souss Valley, Aït Baha Region" },
    seoTitle: "Souss Valley Argan & Culture Day Trip from Agadir — Women's Cooperative | Marrakech Eco Tours",
    seoDescription: "Visit a women-run argan oil cooperative, a honey village beekeeper, and share a Berber family lunch in the Souss Valley — Morocco's argan heartland. From $38.",
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
    reviewCount: 118,
    rating: 4.8,
    price: 40,
    depositAmount: 10,
    heroImage:
      "https://images.unsplash.com/photo-1565985482571-03a42ea59d80?w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1565985482571-03a42ea59d80?w=1200&q=85",
      "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=1200&q=85",
      "https://images.unsplash.com/photo-1624802746702-60ca95bdb605?w=1200&q=85",
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
        title: "Agadir → Essaouira → Agadir",
        description:
          "Depart Agadir at 8:00 am. Arrive Essaouira by 10:00 am. Guided medina, ramparts, and harbour walk. Free time for lunch and exploration. Depart 4:30 pm. Back in Agadir by 6:30 pm.",
      },
    ],
    meetingPoint: { lat: 31.5085, lng: -9.7595, name: "Essaouira Medina, Atlantic Coast" },
    seoTitle: "Essaouira Day Trip from Agadir — UNESCO Medina & Atlantic Ramparts | Marrakech Eco Tours",
    seoDescription: "Day trip from Agadir to Essaouira's blue-and-white UNESCO medina — 18th-century Portuguese ramparts, fresh harbour seafood, and artisan workshops. From $40.",
    featured: false,
  },
  {
    id: "17",
    slug: "marrakech-to-chefchaouen-4day",
    title: "Marrakech to Chefchaouen — 4-Day Blue City Tour",
    category: "cultural",
    origin: "marrakech",
    difficulty: "easy",
    duration: "4 days / 3 nights",
    groupSize: "2–12 people",
    reviewCount: 43,
    rating: 4.9,
    price: 340,
    depositAmount: 85,
    heroImage:
      "https://images.unsplash.com/photo-1564507004663-b6dfb3c824d5?w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1564507004663-b6dfb3c824d5?w=1200&q=85",
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
        title: "Marrakech → Ifrane → Fes",
        description:
          "Depart Marrakech at 7:00 am. Cross the Middle Atlas. Stop in Ifrane and the Azrou cedar forest for Barbary macaques. Arrive Fes by evening. Check in to your riad.",
      },
      {
        day: 2,
        title: "Fes Medina Full Day",
        description:
          "Full guided day in Fes el-Bali: Chouara Tanneries, Al-Qarawiyyin University, Medersa Bou Inania, and the ancient souks. Evening walk on the medina walls.",
      },
      {
        day: 3,
        title: "Fes → Volubilis → Meknes → Chefchaouen",
        description:
          "Morning visit to Volubilis — Morocco's best-preserved Roman ruins. Drive to Meknes (the Moroccan Versailles). Continue to Chefchaouen in the Rif Mountains. Arrive by evening.",
      },
      {
        day: 4,
        title: "Chefchaouen Full Day",
        description:
          "Full day in the Blue City. Guided walk through the medina's blue-washed lanes, the Spanish Mosque viewpoint, and the Ras El-Maa waterfall. Tour concludes in Chefchaouen.",
      },
    ],
    meetingPoint: { lat: 35.1688, lng: -5.2636, name: "Chefchaouen, Rif Mountains" },
    seoTitle: "Marrakech to Chefchaouen 4-Day Blue City Tour — Fes, Volubilis & Rif Mountains | Marrakech Eco Tours",
    seoDescription: "4-day tour from Marrakech to the blue-washed streets of Chefchaouen via Fes, Volubilis Roman ruins, and Meknes. Private 4x4 with riad accommodation. From $340.",
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
    reviewCount: 27,
    rating: 4.8,
    price: 480,
    depositAmount: 120,
    heroImage:
      "https://images.unsplash.com/photo-1767936925033-9a5b59925613?w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1767936925033-9a5b59925613?w=1200&q=85",
      "https://images.unsplash.com/photo-1697028733028-e2a104b952b9?w=1200&q=85",
      "https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=1200&q=85",
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
        title: "Marrakech → Aït Ben Haddou → Ouarzazate → Midelt",
        description:
          "Drive north from Marrakech via the Atlas. Stop at Aït Ben Haddou. Continue to Midelt for the night in the high plains between the two Atlas ranges.",
      },
      {
        day: 2,
        title: "Midelt → Volubilis → Meknes",
        description:
          "Morning at the Volubilis Roman ruins. Afternoon in Meknes: Bab Mansour gate, the royal granaries, and the medina souks. Night in Meknes.",
      },
      {
        day: 3,
        title: "Meknes → Fes Full Day",
        description:
          "Full day in Fes el-Bali with an expert guide. Chouara Tanneries, Al-Qarawiyyin, Medersa Bou Inania, and the ancient jewellers' souk. Night in Fes.",
      },
      {
        day: 4,
        title: "Fes → Rabat",
        description:
          "Drive west to Rabat on the Atlantic coast. Visit the Hassan Tower and Mohammed V Mausoleum, the Kasbah of the Udayas, and the walled medina. Night in Rabat.",
      },
      {
        day: 5,
        title: "Rabat → Casablanca → Marrakech",
        description:
          "Optional stop at the Hassan II Mosque in Casablanca (exterior — the world's largest mosque outside of Saudi Arabia). Continue south to Marrakech. Arrive by evening.",
      },
    ],
    meetingPoint: { lat: 34.0209, lng: -6.8416, name: "Rabat, Atlantic Capital" },
    seoTitle: "All 4 Imperial Cities Morocco 5-Day Tour — Marrakech, Meknes, Fes & Rabat | Marrakech Eco Tours",
    seoDescription: "Grand circuit through Morocco's four imperial capitals in 5 days. Volubilis Roman ruins, Chouara Tanneries, Bab Mansour, and Hassan Tower. Private 4x4 from Marrakech. From $480.",
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
    reviewCount: 143,
    rating: 4.8,
    price: 149,
    depositAmount: 38,
    heroImage:
      "https://images.unsplash.com/photo-1565458901745-4c797b564f73?w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1565458901745-4c797b564f73?w=1200&q=85",
      "https://images.unsplash.com/photo-1489573280374-2e193c63726c?w=1200&q=85",
      "https://images.unsplash.com/photo-1685311572420-513619470404?w=1200&q=85",
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
        title: "Marrakech → Aït Ben Haddou → Draa Valley → Zagora Camp",
        description:
          "Pick-up from your Marrakech accommodation at 7:00 am. Cross the Tizi n'Tichka pass and stop at the UNESCO Ksar of Aït Ben Haddou. Lunch in Ouarzazate. Drive south through the full length of the Draa Valley oasis — palm groves, mud-brick villages, and ancient granary kasbahs lining the road. Stop at Tamegroute to see the 14th-century library and famous green pottery workshops. Arrive the desert camp near Zagora by late afternoon. Mount a camel for the sunset ride across the dunes. Traditional Berber dinner and music around the campfire.",
      },
      {
        day: 2,
        title: "Sunrise over the Dunes → Draa Valley → Marrakech",
        description:
          "Early morning walk or optional camel ride for the desert sunrise. Breakfast at camp. Depart 8:30 am through the Draa Valley oasis in the morning light — a very different atmosphere from the afternoon. Lunch stop in Ouarzazate or en route. Cross back over the High Atlas. Arrive Marrakech by 6:30 pm.",
      },
    ],
    meetingPoint: { lat: 30.3323, lng: -5.8366, name: "Zagora, Draa Valley" },
    featured: false,
    seoTitle: "Marrakech to Zagora 2-Day Desert Tour — Draa Valley, Camel Trek & Berber Camp | Marrakech Eco Tours",
    seoDescription: "The fastest route to the Sahara — Aït Ben Haddou, the 200 km Draa Valley palmery, and a camel trek into the dunes. 2-day desert tour from Marrakech with Berber camp. From $149.",
  },
  {
    id: "24",
    slug: "erg-chegaga-3day-marrakech",
    title: "Erg Chegaga — 3-Day Remote Desert Expedition",
    category: "desert",
    origin: "marrakech",
    difficulty: "moderate",
    duration: "3 days / 2 nights",
    groupSize: "2–8 people",
    reviewCount: 64,
    rating: 4.9,
    price: 320,
    depositAmount: 80,
    heroImage:
      "https://images.unsplash.com/photo-1617374128851-c84e37dc9f37?w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1617374128851-c84e37dc9f37?w=1200&q=85",
      "https://images.unsplash.com/photo-1542401886-65d6c61db217?w=1200&q=85",
      "https://images.unsplash.com/photo-1565458901745-4c797b564f73?w=1200&q=85",
      "https://images.unsplash.com/photo-1489573280374-2e193c63726c?w=1200&q=85",
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
        title: "Marrakech → Aït Ben Haddou → Taliouine → M'Hamid",
        description:
          "Pick-up at 7:00 am. Cross the Tizi n'Tichka pass and visit Aït Ben Haddou. Continue south through Ouarzazate and into the Saffron Valley near Taliouine — Morocco's saffron capital — for a short stop. Continue to M'Hamid, the last town before the open Sahara. Dinner and overnight in M'Hamid.",
      },
      {
        day: 2,
        title: "M'Hamid → Erg Chegaga (4x4 Crossing)",
        description:
          "After breakfast, board the 4x4 — the paved road ends here. Two to three hours of off-road driving through open desert, past scattered nomad camps and fossil-strewn hamada plains. Reach the edge of Erg Chegaga by midday. Camel trek deep into the dune field. Camp is set up in the heart of the erg — no roads, no other camps, no light pollution. Sunset over the dunes. Traditional dinner and a sky blazing with stars.",
      },
      {
        day: 3,
        title: "Sahara Sunrise → M'Hamid → Marrakech",
        description:
          "Pre-dawn wake-up to climb the dune crest for sunrise. Breakfast at camp. The 4x4 returns across the desert to M'Hamid. Begin the long, beautiful drive north through Zagora, the Draa Valley, and back over the High Atlas. Arrive Marrakech by 7:30 pm.",
      },
    ],
    meetingPoint: { lat: 29.8250, lng: -5.7246, name: "M'Hamid, Gateway to Erg Chegaga" },
    featured: true,
    seoTitle: "Erg Chegaga 3-Day Desert Tour from Marrakech — Remote Dunes & 4x4 Sahara Expedition | Marrakech Eco Tours",
    seoDescription: "Morocco's most remote desert experience — 3 days from Marrakech to Erg Chegaga via 4x4 off-road crossing, 2 nights in a private Berber camp. No crowds, 120 m dunes. From $320.",
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
    reviewCount: 98,
    rating: 4.9,
    price: 360,
    depositAmount: 90,
    heroImage:
      "https://images.unsplash.com/photo-1685311572420-513619470404?w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1685311572420-513619470404?w=1200&q=85",
      "https://images.unsplash.com/photo-1542401886-65d6c61db217?w=1200&q=85",
      "https://images.unsplash.com/photo-1617374128851-c84e37dc9f37?w=1200&q=85",
      "https://images.unsplash.com/photo-1565458901745-4c797b564f73?w=1200&q=85",
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
        title: "Marrakech → Aït Ben Haddou → Ouarzazate → Dades Valley",
        description:
          "Pick-up at 7:00 am. Ascend the Tizi n'Tichka pass through the High Atlas (2,260 m). Stop at the UNESCO Ksar of Aït Ben Haddou for a full 45-minute exploration. Lunch break in Ouarzazate with the option to visit the Atlas Film Studios (where Gladiator and Game of Thrones were filmed). Continue through the dramatic Dades Valley — rose-red kasbahs, oasis villages, and the 'monkey fingers' rock formations. Arrive hotel in Dades Valley by 5:00 pm. Dinner and overnight.",
      },
      {
        day: 2,
        title: "Dades Valley → Todra Gorge → Merzouga Desert Camp",
        description:
          "Breakfast at the hotel. Walk into Todra Gorge at its narrowest point — a 40 m wide corridor between 400 m limestone walls with a clear river underfoot. Continue east through the pre-Saharan plains, past oasis towns and nomad pastures. Arrive Merzouga in the afternoon. Board your camel for the sunset trek into Erg Chebbi's towering dunes. Arrive at camp as the sky turns red. Traditional Moroccan tagine for dinner, Berber music around the fire, and a sky alive with stars.",
      },
      {
        day: 3,
        title: "Sahara Sunrise → Merzouga Village → Ouarzazate",
        description:
          "Rise at 5:30 am to climb the dune and watch the Sahara wake up. Return camel to camp, breakfast, and freshen up at the Merzouga guesthouse. Begin the return via the 'Road of a Thousand Kasbahs' — a different, more southern route through Tazarine and N'Kob, a string of ancient earthen kasbahs along an old caravan route. Arrive Ouarzazate in the evening. Overnight in hotel.",
      },
      {
        day: 4,
        title: "Ouarzazate → Aït Ben Haddou → Tizi n'Tichka → Marrakech",
        description:
          "Morning visit to Taourirt Kasbah in Ouarzazate (optional). Brief return stop at Aït Ben Haddou for a second angle in the morning light. Climb back over the Tizi n'Tichka pass with panoramic Atlas views. Arrive Marrakech by 5:00 pm.",
      },
    ],
    meetingPoint: { lat: 31.0580, lng: -4.0127, name: "Merzouga, Erg Chebbi Sahara" },
    featured: true,
    seoTitle: "4-Day Desert Tour from Marrakech — Erg Chebbi, Todra Gorge & Road of a Thousand Kasbahs | Marrakech Eco Tours",
    seoDescription: "The complete Marrakech desert circuit — 4 days through Aït Ben Haddou, Todra Gorge, an Erg Chebbi desert camp, and the Road of a Thousand Kasbahs. From $360.",
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
    reviewCount: 52,
    rating: 4.8,
    price: 295,
    depositAmount: 75,
    heroImage:
      "https://images.unsplash.com/photo-1489573280374-2e193c63726c?w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1489573280374-2e193c63726c?w=1200&q=85",
      "https://images.unsplash.com/photo-1542401886-65d6c61db217?w=1200&q=85",
      "https://images.unsplash.com/photo-1617374128851-c84e37dc9f37?w=1200&q=85",
      "https://images.unsplash.com/photo-1685311572420-513619470404?w=1200&q=85",
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
        title: "Agadir → Taroudant → Taliouine → Aït Ben Haddou → Dades Valley",
        description:
          "Early pick-up from your Agadir hotel at 6:30 am. Drive east to Taroudant (1 hour) — walk the 16th-century ramparts and the spice souk of this perfectly preserved medieval city. Continue to Taliouine, Morocco's saffron-growing heartland, for a short stop. Drive through Ouarzazate and visit the UNESCO Ksar of Aït Ben Haddou. Continue through the Dades Valley. Arrive hotel by 6:00 pm. Dinner and overnight.",
      },
      {
        day: 2,
        title: "Dades Valley → Todra Gorge → Erg Chebbi Camp",
        description:
          "Breakfast at hotel. Walk the floor of Todra Gorge — 400 m walls of pink limestone framing a narrow river corridor. Drive east across the desert plains to Merzouga. Board your camel at sunset and ride into the towering dunes of Erg Chebbi. Camp is reached as the sky darkens. Traditional tagine dinner, Berber music, and stargazing in the Saharan dark.",
      },
      {
        day: 3,
        title: "Sahara Sunrise → Merzouga → Agadir",
        description:
          "Rise at 5:30 am for the sunrise over the dunes. Return camel ride, breakfast at camp, freshen up in Merzouga. Begin the long return journey west and south — through Rissani, Tazarine, and the desert plains, back over the Tizi n'Tichka pass and down to Agadir. Arrive by 8:00–9:00 pm.",
      },
    ],
    meetingPoint: { lat: 30.4202, lng: -9.5981, name: "Agadir City Centre" },
    featured: false,
    seoTitle: "Agadir to Merzouga 3-Day Desert Tour — Erg Chebbi, Taroudant & Taliouine | Marrakech Eco Tours",
    seoDescription: "From Agadir's Atlantic coast to the Sahara — via Taroudant, Taliouine, Aït Ben Haddou, and a sunset camel trek on Erg Chebbi. 3-day desert tour with Berber camp. From $295.",
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
    reviewCount: 41,
    rating: 4.7,
    price: 179,
    depositAmount: 45,
    heroImage:
      "https://images.unsplash.com/photo-1565458901745-4c797b564f73?w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1565458901745-4c797b564f73?w=1200&q=85",
      "https://images.unsplash.com/photo-1489573280374-2e193c63726c?w=1200&q=85",
      "https://images.unsplash.com/photo-1685311572420-513619470404?w=1200&q=85",
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
        title: "Agadir → Taroudant → Taznakht → Draa Valley → Zagora",
        description:
          "Pick-up from your Agadir hotel at 7:30 am. Drive east to Taroudant — walk the 16th-century ochre ramparts and the Berber market. Continue to Taznakht, the Berber carpet-weaving capital. Enter the Draa Valley from the west and follow it south through date palm groves and ancient villages to Zagora. Arrive the desert camp in time for a sunset camel ride on the dunes. Traditional Berber dinner and music under the stars.",
      },
      {
        day: 2,
        title: "Sunrise → Tamegroute → Draa Valley → Agadir",
        description:
          "Optional early morning camel ride for the sunrise. Breakfast at camp. Stop at Tamegroute — a village with a 14th-century Koranic library housing hand-illuminated manuscripts and a famous green-glazed pottery cooperative. Drive north through the full length of the Draa Valley in the morning light. Return through Ouarzazate and back to Agadir. Arrive by 6:30 pm.",
      },
    ],
    meetingPoint: { lat: 30.4202, lng: -9.5981, name: "Agadir City Centre" },
    featured: false,
    seoTitle: "Agadir to Zagora 2-Day Desert Tour — Draa Valley, Taroudant & Berber Camp | Marrakech Eco Tours",
    seoDescription: "From Agadir's coast to the Zagora desert in 2 days — via Taroudant, the 200 km Draa Valley palmery, and a sunset camel trek. Berber camp under the stars. From $179.",
  },
  {
    id: "28",
    slug: "erg-chegaga-3day-agadir",
    title: "Agadir to Erg Chegaga — 3-Day Remote Desert Tour",
    category: "desert",
    origin: "agadir",
    difficulty: "moderate",
    duration: "3 days / 2 nights",
    groupSize: "2–8 people",
    reviewCount: 28,
    rating: 4.9,
    price: 345,
    depositAmount: 87,
    heroImage:
      "https://images.unsplash.com/photo-1542401886-65d6c61db217?w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1542401886-65d6c61db217?w=1200&q=85",
      "https://images.unsplash.com/photo-1617374128851-c84e37dc9f37?w=1200&q=85",
      "https://images.unsplash.com/photo-1489573280374-2e193c63726c?w=1200&q=85",
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
        title: "Agadir → Anti-Atlas Foothills → Tata → Foum Zguid / M'Hamid",
        description:
          "Early pick-up from Agadir at 6:30 am. Drive south through the Anti-Atlas foothills — the oldest mountain range in Morocco, stranger and more ancient-looking than the High Atlas. Pass through the oasis town of Tata and continue to Foum Zguid or M'Hamid, the last settlements before Erg Chegaga. Dinner and overnight.",
      },
      {
        day: 2,
        title: "4x4 Crossing into Erg Chegaga",
        description:
          "After breakfast, the paved road ends. Board the 4x4 for the off-road crossing — two to three hours of desert driving through open hammada, fossil plains, and scattered acacia. Arrive at the edge of Erg Chegaga by midday. Camel trek into the dune field. Camp is set deep in the erg. Sunset over the dunes, dinner by firelight, a silence you will not forget.",
      },
      {
        day: 3,
        title: "Sunrise → M'Hamid → Draa Valley → Agadir",
        description:
          "Rise before dawn for the full sunrise over the dunes. Breakfast at camp. The 4x4 returns across the desert to M'Hamid. Drive north through the Draa Valley — one of the most beautiful drives in Morocco — and back to Agadir via Zagora and Ouarzazate. Arrive Agadir by 8:00 pm.",
      },
    ],
    meetingPoint: { lat: 30.4202, lng: -9.5981, name: "Agadir City Centre" },
    featured: false,
    seoTitle: "Agadir to Erg Chegaga 3-Day Desert Tour — Remote Sahara & 4x4 Expedition | Marrakech Eco Tours",
    seoDescription: "Morocco's most remote desert from Agadir — 3 days through the Anti-Atlas to Erg Chegaga via 4x4, 2 nights in a private Berber camp. Fewer tourists, bigger silence. From $345.",
  },
  {
    id: "29",
    slug: "desert-4day-agadir",
    title: "Agadir Desert Grand Tour — 4 Days",
    category: "desert",
    origin: "agadir",
    difficulty: "easy",
    duration: "4 days / 3 nights",
    groupSize: "2–10 people",
    reviewCount: 39,
    rating: 4.8,
    price: 420,
    depositAmount: 105,
    heroImage:
      "https://images.unsplash.com/photo-1685311572420-513619470404?w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1685311572420-513619470404?w=1200&q=85",
      "https://images.unsplash.com/photo-1489573280374-2e193c63726c?w=1200&q=85",
      "https://images.unsplash.com/photo-1542401886-65d6c61db217?w=1200&q=85",
      "https://images.unsplash.com/photo-1565458901745-4c797b564f73?w=1200&q=85",
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
        title: "Agadir → Taroudant → Taliouine → Aït Ben Haddou → Dades Valley",
        description:
          "Pick-up from your Agadir hotel at 6:30 am. Drive east to Taroudant — explore the best-preserved 16th-century ramparts in Morocco and the ancient Berber spice market. Continue to Taliouine for a saffron cooperative visit. Drive through Ouarzazate and stop at the UNESCO Ksar of Aït Ben Haddou. Continue through the dramatic Dades Valley. Arrive hotel by 6:00 pm. Dinner and overnight.",
      },
      {
        day: 2,
        title: "Dades Valley → Todra Gorge → Erg Chebbi Camp",
        description:
          "Breakfast at hotel. Walk the floor of Todra Gorge — 400 m limestone walls, a river underfoot, and almost no crowds in the early morning. Drive east through the pre-Saharan oasis landscape to Merzouga. Mount your camel at the dune edge and ride into Erg Chebbi as the sun sets. Reach camp as darkness falls. Traditional tagine, Gnawa music, stargazing in the Saharan sky.",
      },
      {
        day: 3,
        title: "Sahara Sunrise → Road of a Thousand Kasbahs → Ouarzazate",
        description:
          "Pre-dawn wake-up for the sunrise over the dunes. Return camel to camp. Breakfast and freshen up. Take the Road of a Thousand Kasbahs — a southern return route through Tazarine, N'Kob, and the Draa Valley corridor, lined with ancient earthen kasbahs that once served the trans-Saharan caravans. Arrive Ouarzazate by evening. Overnight in hotel.",
      },
      {
        day: 4,
        title: "Ouarzazate → Aït Ben Haddou → Tizi n'Tichka → Agadir",
        description:
          "Optional morning visit to the Atlas Film Studios or Taourirt Kasbah in Ouarzazate. Brief stop at Aït Ben Haddou in the morning light. Cross back through Marrakech and over the Anti-Atlas to Agadir. Arrive by 8:00 pm.",
      },
    ],
    meetingPoint: { lat: 30.4202, lng: -9.5981, name: "Agadir City Centre" },
    featured: false,
    seoTitle: "4-Day Desert Tour from Agadir — Erg Chebbi, Taroudant, Todra Gorge & Road of 1000 Kasbahs | Marrakech Eco Tours",
    seoDescription: "The complete Agadir desert grand tour — 4 days through Taroudant, Aït Ben Haddou, Todra Gorge, an Erg Chebbi camp, and the Road of a Thousand Kasbahs. From $420.",
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
    reviewCount: 34,
    rating: 4.7,
    price: 360,
    depositAmount: 90,
    heroImage:
      "https://images.unsplash.com/photo-1767936925033-9a5b59925613?w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1767936925033-9a5b59925613?w=1200&q=85",
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
        title: "Agadir → Marrakech",
        description:
          "Depart Agadir in the morning. Drive north along the Atlantic plain to Marrakech (3h). Afternoon at leisure or optional medina walk. Night in a Marrakech riad.",
      },
      {
        day: 2,
        title: "Marrakech → Tizi n'Tichka → Aït Ben Haddou → Midelt",
        description:
          "Ascend the Atlas via Tizi n'Tichka. Visit Aït Ben Haddou. Continue through the Ziz Valley to Midelt for the night.",
      },
      {
        day: 3,
        title: "Midelt → Ifrane → Azrou Cedar Forest → Fes",
        description:
          "Drive through the Middle Atlas. Stop in Ifrane and the cedar forest at Azrou to spot wild Barbary macaques. Arrive Fes by afternoon. Check in to your riad.",
      },
      {
        day: 4,
        title: "Fes Medina Full Day",
        description:
          "Guided exploration of Fes el-Bali: Chouara Tanneries, Al-Qarawiyyin University, Medersa Bou Inania, and the labyrinthine souks. Tour concludes in Fes.",
      },
    ],
    meetingPoint: { lat: 34.0331, lng: -5.0003, name: "Fes el-Bali, Imperial City" },
    seoTitle: "4-Day Agadir to Fes Tour — High Atlas, Aït Ben Haddou & Imperial City | Marrakech Eco Tours",
    seoDescription: "Drive from Agadir to Fes via Marrakech, Tizi n'Tichka, and the cedar forests of the Middle Atlas. 4-day private 4x4 tour with riad accommodation. From $360.",
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
    reviewCount: 22,
    rating: 4.9,
    price: 420,
    depositAmount: 105,
    heroImage:
      "https://images.unsplash.com/photo-1564507004663-b6dfb3c824d5?w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1564507004663-b6dfb3c824d5?w=1200&q=85",
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
        title: "Agadir → Marrakech",
        description:
          "Depart Agadir in the morning. Drive north to Marrakech (3h). Afternoon at leisure. Night in a Marrakech riad.",
      },
      {
        day: 2,
        title: "Marrakech → Ifrane → Fes",
        description:
          "Depart Marrakech early. Cross the Middle Atlas. Stop in Ifrane and the Azrou cedar forest for Barbary macaques. Arrive Fes by evening. Check in to your riad.",
      },
      {
        day: 3,
        title: "Fes Medina Full Day",
        description:
          "Full guided day in Fes el-Bali: Chouara Tanneries, Al-Qarawiyyin University, Medersa Bou Inania, and the ancient souks. Evening walk on the medina walls.",
      },
      {
        day: 4,
        title: "Fes → Volubilis → Meknes → Chefchaouen",
        description:
          "Morning visit to Volubilis — Morocco's best-preserved Roman ruins. Drive to Meknes (the Moroccan Versailles). Continue to Chefchaouen in the Rif Mountains. Arrive by evening.",
      },
      {
        day: 5,
        title: "Chefchaouen Full Day",
        description:
          "Full day in the Blue City. Guided walk through the medina's blue-washed lanes, the Spanish Mosque viewpoint, and the Ras El-Maa waterfall. Tour concludes in Chefchaouen.",
      },
    ],
    meetingPoint: { lat: 35.1688, lng: -5.2636, name: "Chefchaouen, Rif Mountains" },
    seoTitle: "5-Day Agadir to Chefchaouen Tour — Fes, Volubilis & Blue City | Marrakech Eco Tours",
    seoDescription: "5-day tour from Agadir to Morocco's Blue City via Marrakech, Fes, the Roman ruins of Volubilis, and the imperial gates of Meknes. Private 4x4 with riads. From $420.",
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
    reviewCount: 18,
    rating: 4.8,
    price: 560,
    depositAmount: 140,
    heroImage:
      "https://images.unsplash.com/photo-1767936925033-9a5b59925613?w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1767936925033-9a5b59925613?w=1200&q=85",
      "https://images.unsplash.com/photo-1697028733028-e2a104b952b9?w=1200&q=85",
      "https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=1200&q=85",
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
        title: "Agadir → Marrakech",
        description:
          "Depart Agadir in the morning. Drive north to Marrakech (3h). Afternoon medina walk or at leisure. Night in a Marrakech riad.",
      },
      {
        day: 2,
        title: "Marrakech → Aït Ben Haddou → Ouarzazate → Midelt",
        description:
          "Drive north from Marrakech via the Atlas. Stop at Aït Ben Haddou. Continue to Midelt for the night in the high plains between the two Atlas ranges.",
      },
      {
        day: 3,
        title: "Midelt → Volubilis → Meknes",
        description:
          "Morning at the Volubilis Roman ruins. Afternoon in Meknes: Bab Mansour gate, the royal granaries, and the medina souks. Night in Meknes.",
      },
      {
        day: 4,
        title: "Meknes → Fes Full Day",
        description:
          "Full day in Fes el-Bali with an expert guide. Chouara Tanneries, Al-Qarawiyyin, Medersa Bou Inania, and the ancient jewellers' souk. Night in Fes.",
      },
      {
        day: 5,
        title: "Fes → Rabat",
        description:
          "Drive west to Rabat on the Atlantic coast. Visit the Hassan Tower and Mohammed V Mausoleum, the Kasbah of the Udayas, and the walled medina. Night in Rabat.",
      },
      {
        day: 6,
        title: "Rabat → Casablanca → Marrakech",
        description:
          "Optional stop at the Hassan II Mosque in Casablanca (exterior — the world's largest mosque outside of Saudi Arabia). Continue south to Marrakech. Onward transfer to Agadir or overnight. Tour concludes.",
      },
    ],
    meetingPoint: { lat: 34.0209, lng: -6.8416, name: "Rabat, Atlantic Capital" },
    seoTitle: "All 4 Imperial Cities Morocco 6-Day Tour from Agadir — Marrakech, Meknes, Fes & Rabat | Marrakech Eco Tours",
    seoDescription: "Grand 6-day circuit from Agadir through all four Moroccan imperial cities — Marrakech, Meknes, Fes, and Rabat. Private 4x4 with riad accommodation. From $560.",
    featured: false,
  },

  // ─────────────────────────────────────────────
  // NEW HIGH ATLAS / TOUBKAL TREKS
  // ─────────────────────────────────────────────
  {
    id: "30",
    slug: "toubkal-circuit-ifni-lake-6day",
    title: "Toubkal Circuit & Ifni Lake — 6-Day Trek",
    category: "trekking",
    origin: "marrakech",
    difficulty: "challenging",
    duration: "6 days / 5 nights",
    groupSize: "2–12 people",
    reviewCount: 21,
    rating: 4.9,
    price: 620,
    depositAmount: 155,
    heroImage:
      "https://images.unsplash.com/photo-1597662786834-8eea85ad4841?w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1597662786834-8eea85ad4841?w=1200&q=85",
      "https://images.unsplash.com/photo-1611859836043-a9177f500a27?w=1200&q=85",
      "https://images.unsplash.com/photo-1766680460144-56a2937a5433?w=1200&q=85",
      "https://images.unsplash.com/photo-1560789590-ee4cc7125967?w=1200&q=85",
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
        title: "Marrakech → Imlil → Tachedirt (2,300 m)",
        description:
          "Transfer from Marrakech to Imlil (1h30). Trek through the Imenane Valley past terraced fields and Berber villages to Tachedirt. Around 5 hours walking.",
      },
      {
        day: 2,
        title: "Tachedirt → Tizi Likemt (3,555 m) → Azib Likemt (2,250 m)",
        description:
          "Climb the Tizi Likemt pass with sweeping High Atlas views, then descend into the high summer grazing pastures of Azib Likemt. 6–7 hours.",
      },
      {
        day: 3,
        title: "Azib Likemt → Tizi n'Ourai → Amsouzart (1,740 m)",
        description:
          "Follow the Ourai river, cross a scenic pass, and descend to the welcoming village of Amsouzart for an overnight in a family gîte. Around 6 hours.",
      },
      {
        day: 4,
        title: "Amsouzart → Lake Ifni (2,295 m)",
        description:
          "A gradual climb brings you to the turquoise Lake Ifni, set dramatically among steep peaks. Afternoon at leisure by the water. 4–5 hours.",
      },
      {
        day: 5,
        title: "Lake Ifni → Tizi n'Ouanoums (3,664 m) → Toubkal Refuge (3,207 m)",
        description:
          "A steep, rocky ascent to the Ouanoums pass overlooking the lake, then a descent to the Toubkal Refuge. Early night before summit day. Around 6 hours.",
      },
      {
        day: 6,
        title: "Summit Toubkal (4,167 m) → Imlil → Marrakech",
        description:
          "Pre-dawn ascent via the South Cirque to the roof of North Africa at sunrise. Descend to Imlil and transfer back to Marrakech. A long, rewarding final day.",
      },
    ],
    meetingPoint: { lat: 31.1369, lng: -7.9169, name: "Imlil Village, Atlas Mountains" },
    seoTitle: "6-Day Toubkal Circuit Trek via Lake Ifni from Marrakech — Summit & Circuit | Marrakech Eco Tours",
    seoDescription: "The complete 6-day Toubkal circuit from Marrakech — high passes, the turquoise Lake Ifni, and the Jbel Toubkal summit (4,167 m). Licensed Berber guide, all meals & transfers. From $620.",
    featured: false,
  },
  {
    id: "31",
    slug: "toubkal-summit-2day-marrakech",
    title: "Mount Toubkal Express — 2-Day Summit from Marrakech",
    category: "trekking",
    origin: "marrakech",
    difficulty: "challenging",
    duration: "2 days / 1 night",
    groupSize: "2–12 people",
    reviewCount: 34,
    rating: 4.7,
    price: 210,
    depositAmount: 55,
    heroImage:
      "https://images.unsplash.com/photo-1611859836043-a9177f500a27?w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1611859836043-a9177f500a27?w=1200&q=85",
      "https://images.unsplash.com/photo-1766680460144-56a2937a5433?w=1200&q=85",
      "https://images.unsplash.com/photo-1597662786834-8eea85ad4841?w=1200&q=85",
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
        title: "Marrakech → Imlil → Toubkal Refuge (3,207 m)",
        description:
          "Early transfer from Marrakech to Imlil (1h30). Trek up the Aït Mizane valley through Aremd and past the Sidi Chamharouch shrine to the Toubkal Refuge. 4–5 hours walking. Dinner and early night.",
      },
      {
        day: 2,
        title: "Summit Toubkal (4,167 m) → Imlil → Marrakech",
        description:
          "Pre-dawn start for the summit via the South Cirque (around 3 hours up). Sunrise from the roof of North Africa, then descend to the refuge for lunch and continue down to Imlil (4–5 hours total descent). Transfer back to Marrakech.",
      },
    ],
    meetingPoint: { lat: 31.1369, lng: -7.9169, name: "Imlil Village, Atlas Mountains" },
    seoTitle: "2-Day Mount Toubkal Trek from Marrakech — Express Summit 4,167 m | Marrakech Eco Tours",
    seoDescription: "Climb Jbel Toubkal (4,167 m) in 2 days from Marrakech — the fastest route to North Africa's highest peak. Refuge night, all meals, licensed Berber guide & transfers. From $210.",
    featured: false,
  },
  {
    id: "32",
    slug: "toubkal-aguelzim-pass-3day",
    title: "Toubkal Summit via Aguelzim Pass — 3-Day Trek",
    category: "trekking",
    origin: "marrakech",
    difficulty: "challenging",
    duration: "3 days / 2 nights",
    groupSize: "2–12 people",
    reviewCount: 18,
    rating: 4.8,
    price: 330,
    depositAmount: 85,
    heroImage:
      "https://images.unsplash.com/photo-1766680460144-56a2937a5433?w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1766680460144-56a2937a5433?w=1200&q=85",
      "https://images.unsplash.com/photo-1611859836043-a9177f500a27?w=1200&q=85",
      "https://images.unsplash.com/photo-1597662786834-8eea85ad4841?w=1200&q=85",
      "https://images.unsplash.com/photo-1560789590-ee4cc7125967?w=1200&q=85",
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
        title: "Marrakech → Imlil → Azzaden Valley (Azib Tamsoult)",
        description:
          "Transfer from Marrakech to Imlil. Trek over the Tizi n'Mzik pass (2,450 m) into the Azzaden Valley, past the Ighouliden waterfalls to the refuge near Azib Tamsoult. Around 6 hours.",
      },
      {
        day: 2,
        title: "Azzaden → Aguelzim Pass (3,560 m) → Toubkal Refuge (3,207 m)",
        description:
          "A stiff climb out of the Azzaden Valley over the Aguelzim Pass, with big views of the western Atlas, then a descent to the Toubkal Refuge. Around 6–7 hours. Early night before the summit.",
      },
      {
        day: 3,
        title: "Summit Toubkal (4,167 m) → Imlil → Marrakech",
        description:
          "Pre-dawn ascent via the South Cirque to the summit at sunrise. Long descent all the way back to Imlil (via the refuge), then transfer to Marrakech. A demanding but unforgettable final day.",
      },
    ],
    meetingPoint: { lat: 31.1369, lng: -7.9169, name: "Imlil Village, Atlas Mountains" },
    seoTitle: "3-Day Toubkal Trek via Aguelzim Pass from Marrakech — Azzaden Valley Route | Marrakech Eco Tours",
    seoDescription: "Climb Toubkal (4,167 m) the scenic way — 3 days via the Azzaden Valley, Ighouliden waterfalls and the Aguelzim Pass (3,560 m). Licensed guide, refuges, all meals & transfers. From $330.",
    featured: false,
  },
  {
    id: "33",
    slug: "toubkal-three-peaks-4000m-3day",
    title: "Toubkal Three 4,000 m Peaks — 3-Day Challenge",
    category: "trekking",
    origin: "marrakech",
    difficulty: "expert",
    duration: "3 days / 2 nights",
    groupSize: "2–10 people",
    reviewCount: 12,
    rating: 4.9,
    price: 360,
    depositAmount: 90,
    heroImage:
      "https://images.unsplash.com/photo-1560789590-ee4cc7125967?w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1560789590-ee4cc7125967?w=1200&q=85",
      "https://images.unsplash.com/photo-1611859836043-a9177f500a27?w=1200&q=85",
      "https://images.unsplash.com/photo-1766680460144-56a2937a5433?w=1200&q=85",
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
        title: "Marrakech → Imlil → Toubkal Refuge (3,207 m)",
        description:
          "Transfer from Marrakech to Imlil. Trek up the Aït Mizane valley past Sidi Chamharouch to the Toubkal Refuge. 4–5 hours. Acclimatisation and rest before two big summit days.",
      },
      {
        day: 2,
        title: "Ouanoukrim — Timesguida (4,089 m) & Ras (4,083 m)",
        description:
          "Ascend to the Tizi n'Ouanoums area and climb the twin Ouanoukrim summits, Timesguida and Ras, both over 4,000 m. Return to the Toubkal Refuge for the night. A demanding full day.",
      },
      {
        day: 3,
        title: "Summit Toubkal (4,167 m) → Imlil → Marrakech",
        description:
          "Final summit push up Jbel Toubkal via the South Cirque at sunrise — the highest of the three. Long descent to Imlil and transfer back to Marrakech.",
      },
    ],
    meetingPoint: { lat: 31.1369, lng: -7.9169, name: "Imlil Village, Atlas Mountains" },
    seoTitle: "Toubkal Three Peaks 4,000 m Challenge — 3-Day High Atlas Trek | Marrakech Eco Tours",
    seoDescription: "Summit three 4,000 m High Atlas peaks in 3 days — Timesguida (4,089 m), Ras Ouanoukrim (4,083 m) and Toubkal (4,167 m). Expert-level trek from Marrakech with licensed guide. From $360.",
    featured: false,
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
 * Parse the free-text `duration` string ("4 days / 3 nights", "Half day (4
 * hours)", "1 day") into a whole-day count, so it can be filtered/bucketed.
 * A half-day or an hours-only tour counts as a single day.
 */
export function durationDays(tour: Tour): number {
  const d = tour.duration.toLowerCase();
  const dayMatch = d.match(/(\d+)\s*day/);
  if (dayMatch) return parseInt(dayMatch[1], 10);
  // "Half day", "hours", etc. — treat as a single day.
  return 1;
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
    heroImage: "https://images.unsplash.com/photo-1611859836043-a9177f500a27?w=1600&q=85",
  },
  {
    id: "desert",
    label: "Desert Tours",
    icon: "🏜️",
    description: "Sahara camel treks, desert camps, and Morocco's most iconic golden dune landscapes.",
    heroImage: "https://images.unsplash.com/photo-1617374128851-c84e37dc9f37?w=1600&q=85",
  },
  {
    id: "day-tours",
    label: "Day Tours",
    icon: "🌄",
    description: "Single-day escapes from Marrakech and Agadir: waterfalls, valleys, coastline. Back by evening.",
    heroImage: "https://images.unsplash.com/photo-1739464889400-e87ec57f246d?w=1600&q=85",
  },
  {
    id: "cultural",
    label: "Cultural Tours",
    icon: "🕌",
    description: "Medinas, ksour, and souks, walked with guides who grew up in them.",
    heroImage: "https://images.unsplash.com/photo-1761062403563-103fb5ee768c?w=1600&q=85",
  },
];

// Difficulty badges as one cold-palette family: indigo-wash → saffron-wash →
// terracotta-tint → deep terracotta. Structural tints on plaster, AA text.
export const DIFFICULTY_COLORS: Record<Difficulty, string> = {
  easy: "bg-[#E3E7F0] text-[#2B3A67]",
  moderate: "bg-[#F6EADB] text-[#8A5312]",
  challenging: "bg-[#F1DDD4] text-[#9A3A22]",
  expert: "bg-[#EAD0C6] text-[#7E2E1A]",
};
