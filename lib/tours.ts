export type Difficulty = "easy" | "moderate" | "challenging" | "expert";
export type Category =
  | "trekking"
  | "hiking"
  | "desert"
  | "cultural"
  | "day-tours"
  | "imperial";

export type Origin = "marrakech" | "agadir";

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
}

export type TourType = "shared" | "private";

export interface Tour {
  id: string;
  slug: string;
  title: string;
  category: Category;
  origin: Origin;
  tourType: TourType;
  difficulty: Difficulty;
  duration: string;
  groupSize: string;
  reviewCount: number;
  rating: number;
  price: number;
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
    tourType: "shared",
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
    tourType: "shared",
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
    tourType: "shared",
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
    tourType: "shared",
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
    tourType: "shared",
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
    title: "Marrakech Medina — Private Cultural Tour",
    category: "cultural",
    origin: "marrakech",
    tourType: "private",
    difficulty: "easy",
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
    seoTitle: "Marrakech Medina Private Cultural Tour — Souks, Tanneries & Riads | Marrakech Eco Tours",
    seoDescription: "Explore the UNESCO Marrakech medina with a local guide — leather tanneries, Ben Youssef Madrasa, Djemaa El-Fna, and hidden riad gardens. Private half-day tour. From $45.",
    featured: false,
  },
  {
    id: "7",
    slug: "marrakech-to-fes-3day",
    title: "Marrakech to Fes — 3-Day Imperial Cities Tour",
    category: "imperial",
    origin: "marrakech",
    tourType: "shared",
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
    tourType: "private",
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
    tourType: "shared",
    difficulty: "easy",
    duration: "1 day",
    groupSize: "2–15 people",
    reviewCount: 142,
    rating: 4.8,
    price: 30,
    depositAmount: 8,
    heroImage:
      "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=1200&q=85",
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
    tourType: "shared",
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
    tourType: "shared",
    difficulty: "easy",
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
    tourType: "shared",
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
    tourType: "private",
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
    tourType: "shared",
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
    tourType: "shared",
    difficulty: "easy",
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
    tourType: "shared",
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
    category: "imperial",
    origin: "marrakech",
    tourType: "shared",
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
    category: "imperial",
    origin: "marrakech",
    tourType: "shared",
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
  // IMPERIAL CITIES FROM AGADIR
  // ─────────────────────────────────────────────
  {
    id: "19",
    slug: "agadir-to-fes-4day",
    title: "Agadir to Fes — 4-Day Imperial Cities Tour",
    category: "imperial",
    origin: "agadir",
    tourType: "shared",
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
    category: "imperial",
    origin: "agadir",
    tourType: "shared",
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
    category: "imperial",
    origin: "agadir",
    tourType: "shared",
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
];

export function getTour(slug: string): Tour | undefined {
  return TOURS.find((t) => t.slug === slug);
}

export function getFeaturedTours(): Tour[] {
  return TOURS.filter((t) => t.featured);
}

export function getToursByCategory(category: Category): Tour[] {
  return TOURS.filter((t) => t.category === category);
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
    heroImage: "https://images.unsplash.com/photo-1548018560-4cb48a8837c1?w=1600&q=85",
  },
  {
    id: "desert",
    label: "Desert Tours",
    icon: "🏜️",
    description: "Sahara camel treks, desert camps, and Morocco's most iconic golden dune landscapes.",
    heroImage: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1600&q=85",
  },
  {
    id: "day-tours",
    label: "Day Tours",
    icon: "🌄",
    description: "Full-day and half-day excursions from Marrakech and Agadir — waterfalls, valleys, medinas, and more.",
    heroImage: "https://images.unsplash.com/photo-1548695607-9c73430fce18?w=1600&q=85",
  },
  {
    id: "imperial",
    label: "Imperial Cities",
    icon: "🏛️",
    description: "Multi-day tours through Morocco's four imperial capitals — Marrakech, Fes, Meknes, and Rabat.",
    heroImage: "https://images.unsplash.com/photo-1539020140153-e479b8f22986?w=1600&q=85",
  },
  {
    id: "cultural",
    label: "Cultural Tours",
    icon: "🕌",
    description: "Medina walks, argan cooperatives, Berber villages, and Morocco's living heritage.",
    heroImage: "https://images.unsplash.com/photo-1577147060571-e02c2de0c7de?w=1600&q=85",
  },
];

export const DIFFICULTY_COLORS: Record<Difficulty, string> = {
  easy: "bg-green-100 text-green-800",
  moderate: "bg-yellow-100 text-yellow-800",
  challenging: "bg-orange-100 text-orange-800",
  expert: "bg-red-100 text-red-800",
};
