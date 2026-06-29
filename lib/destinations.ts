export interface DestinationSeason {
  name: string;
  emoji: string;
  rating: 1 | 2 | 3 | 4 | 5;
  note: string;
}

export interface DestinationFaq {
  q: string;
  a: string;
}

export interface Destination {
  slug: string;
  name: string;
  subtitle: string;
  region: string;
  lat: number;
  lng: number;
  heroImage: string;
  about: string;
  knownFor: string[];
  highlights: { title: string; desc: string }[];
  seasons: DestinationSeason[];
  faqs: DestinationFaq[];
  travelTips: string[];
  relatedCategories: string[];
  relatedOrigins: string[];
  seoTitle: string;
  seoDescription: string;
}

export const DESTINATIONS: Destination[] = [
  {
    slug: "marrakech",
    name: "Marrakech",
    subtitle: "The Red City",
    region: "Marrakech-Safi",
    lat: 31.6295,
    lng: -7.9811,
    heroImage: "https://images.unsplash.com/photo-1708823081494-3e5bbd2ce931?w=1400&q=85",
    about:
      "Marrakech is Morocco's most vibrant city — a 1,000-year-old labyrinth of souks, palaces, and street theatre built from rose-coloured stone. The medina of Marrakech is a UNESCO World Heritage Site and one of the most densely populated urban areas in the world, home to over 90,000 people in a space smaller than two square kilometres. At its heart is Djemaa el-Fna, the most extraordinary public square on earth: by day a spice market and juice stand, by night a carnival of storytellers, acrobats, and gnawa musicians that has been running every single evening for 900 years.",
    knownFor: [
      "Djemaa el-Fna — the world's greatest open-air theatre",
      "14 specialist craft guild souks inside the ancient medina",
      "Koutoubia Mosque & the Saadian Tombs",
      "Majorelle Garden & the Museum of Berber Arts",
      "Hidden riads & traditional hammam culture",
      "Gateway to the High Atlas Mountains (1 hour away)",
    ],
    highlights: [
      { title: "The Medina", desc: "A UNESCO-listed walled city of 9,000+ alleyways, every one leading somewhere unexpected. Home to Morocco's most famous souks, tanneries, and spice markets." },
      { title: "Djemaa el-Fna", desc: "The great square transforms completely twice a day. The same families have run the same food stalls for generations — grilled merguez, harira soup, and fresh-squeezed orange juice." },
      { title: "Majorelle Garden", desc: "Designed by French painter Jacques Majorelle in the 1920s and later restored by Yves Saint Laurent, the garden is an oasis of cobalt blue, bamboo groves, and rare cacti." },
      { title: "Day Trip Hub", desc: "Marrakech is the ideal base for the entire region: the High Atlas and Toubkal summit (1 hour), Ouzoud Waterfalls (3 hours), the Sahara (10 hours by car or overnight), and Essaouira on the Atlantic coast (3 hours)." },
    ],
    seasons: [
      { name: "Spring", emoji: "🌸", rating: 5, note: "March–May is peak season — warm, green, wildflowers in the Atlas. Book early." },
      { name: "Summer", emoji: "☀️", rating: 2, note: "June–August temperatures reach 40°C+ in the city. Not ideal for walking tours." },
      { name: "Autumn", emoji: "🍂", rating: 5, note: "September–November is excellent — comfortable heat, harvest season, fewer crowds." },
      { name: "Winter", emoji: "❄️", rating: 3, note: "December–February is mild and sunny in the city. Atlas trails may have snow above 2,000m." },
    ],
    travelTips: [
      "The medina is best explored on foot — hire a local guide to unlock the neighbourhoods behind the main tourist streets.",
      "Negotiate prices in the souks — the first offer is rarely the real price.",
      "Wear lightweight, breathable clothing. Modest dress (covered shoulders and knees) is appreciated in the medina and mosques.",
      "Carry small denomination dirham coins for food stalls and tips.",
      "Many of the best riads are invisible from the outside — a plain door in a blank wall.",
    ],
    faqs: [
      { q: "How do I get from Marrakech airport to the medina?", a: "A taxi from Menara airport to the medina costs around 100–150 MAD (€9–€13) and takes 15–20 minutes. Agree the price before getting in. Some riads offer airport pickup." },
      { q: "Is Marrakech safe for solo travelers?", a: "Yes — Marrakech is generally safe and has a strong tourist infrastructure. Common issues are persistent touts in the medina and scooters in narrow streets. Stay alert in crowds and keep your valuables secure." },
      { q: "What is the best area to stay in Marrakech?", a: "The medina (old city) is the most atmospheric. The Kasbah and Mouassine neighbourhoods offer the quietest riad options with the shortest walk to key sites. Gueliz (the modern city) is more Westernised with easier parking." },
      { q: "Do I need a visa for Morocco?", a: "Citizens of the EU, UK, USA, Canada, Australia, and most Western countries do not need a visa for stays under 90 days. Your passport must be valid for at least 6 months from your entry date." },
      { q: "What currency is used and can I pay by card?", a: "Morocco uses the dirham (MAD). Cards are accepted in most hotels and larger restaurants but souks and smaller vendors are cash-only. ATMs are widely available in the medina and Gueliz." },
    ],
    relatedCategories: ["cultural", "day-tours"],
    relatedOrigins: ["marrakech"],
    seoTitle: "Marrakech Travel Guide — Best Tours, Tips & Adventures | Marrakech Eco Tours",
    seoDescription: "Complete guide to Marrakech: medina walks, souks, Djemaa el-Fna, and day trips to the Atlas Mountains and Sahara. Book small-group tours with local Berber guides.",
  },
  {
    slug: "high-atlas",
    name: "High Atlas Mountains",
    subtitle: "Roof of North Africa",
    region: "Marrakech-Safi",
    lat: 31.0573,
    lng: -7.9149,
    heroImage: "https://images.unsplash.com/photo-1611859836043-a9177f500a27?w=1400&q=85",
    about:
      "The High Atlas is one of Africa's great mountain ranges — a 2,400 km spine of glaciated peaks, Berber villages, and ancient mule trails stretching from the Atlantic to the Algerian border. At its highest point stands Jbel Toubkal (4,167 m), the roof of North Africa and the most accessible 4,000-metre summit on the continent. For millennia, Berber communities have farmed the terraced valleys and tracked the high passes on routes unchanged since medieval caravan trade.",
    knownFor: [
      "Jbel Toubkal — North Africa's highest peak at 4,167 m",
      "Imlil village — traditional starting point for the Toubkal ascent",
      "Berber mountain communities with centuries of highland tradition",
      "Alpine lakes, gorges, and glacial valleys",
      "Mgoun Massif traverse — the most remote trekking route in Morocco",
      "Spectacular views from high ridges spanning Morocco to Spain",
    ],
    highlights: [
      { title: "Toubkal Summit", desc: "The 4-day Toubkal trek is Morocco's most iconic mountain challenge. Starting from Imlil at 1,740m, the ascent crosses Berber villages, mountain refuges, and the Tizi n'Ouanoums pass before the final push to the summit at 4,167m." },
      { title: "Imlil Valley", desc: "The gateway village for all High Atlas trekking. Surrounded by walnut groves and terraced wheat fields, Imlil is home to a community of mountain guides whose families have worked these trails for generations." },
      { title: "Berber Villages", desc: "The Atlas is home to indigenous Amazigh (Berber) communities who have preserved their language, culture, and architecture throughout centuries of history. Many villages have no road access — only mule trails." },
      { title: "Mgoun Massif", desc: "For experienced trekkers seeking solitude, the Mgoun traverse (7–10 days) passes through some of the most spectacular gorge and ridge terrain in North Africa with almost no tourist infrastructure." },
    ],
    seasons: [
      { name: "Spring", emoji: "🌸", rating: 5, note: "April–June: wildflowers, snow retreating from high passes, ideal trekking weather." },
      { name: "Summer", emoji: "☀️", rating: 4, note: "July–August: summit trails clear, hot in valleys but cool at altitude. Peak season." },
      { name: "Autumn", emoji: "🍂", rating: 5, note: "September–October: arguably the best conditions — stable skies, vivid colours, fewer trekkers." },
      { name: "Winter", emoji: "❄️", rating: 3, note: "November–March: Toubkal summit requires crampons and ice axe. Beautiful but challenging." },
    ],
    travelTips: [
      "Acclimatise in Marrakech (at 460m) for at least one day before heading up to Imlil (1,740m).",
      "Toubkal requires good fitness but no technical climbing skills in summer. In winter it's a serious mountaineering objective.",
      "Hire a local licensed Berber guide — they know every stone of the mountain and are required for the Toubkal National Park.",
      "Mules can carry gear on most Atlas routes — take advantage of this to travel lighter.",
      "Pack warm layers even in summer: temperatures at the Toubkal refuge can drop below zero at night.",
    ],
    faqs: [
      { q: "How difficult is the Toubkal trek?", a: "Toubkal is a demanding trekking objective (not technical climbing) requiring good cardiovascular fitness. You should be comfortable hiking 6–8 hours per day with a daypack. In summer, no special equipment is needed. In winter, crampons and ice axe are essential." },
      { q: "How long does it take to reach Toubkal summit?", a: "The standard route from Imlil to the summit and back takes 3–4 days. Day 1: Imlil to refuge (4–5 hours). Day 2: Summit attempt from refuge (3–4 hours up, 2.5 hours down). Day 3–4: descent and optional Berber village visits." },
      { q: "Is a guide required for the Toubkal trek?", a: "A licensed guide is not legally mandatory but is strongly recommended and required by most responsible operators. The terrain is serious, weather changes fast, and local guides provide safety, route knowledge, and valuable cultural context." },
      { q: "What is the best base for High Atlas trekking?", a: "Imlil village (1,740m), 62km from Marrakech, is the classic starting point for Toubkal. Azilal is the base for Mgoun Massif treks. Both require a guide and proper preparation." },
    ],
    relatedCategories: ["trekking", "hiking"],
    relatedOrigins: ["marrakech"],
    seoTitle: "High Atlas Mountains Travel Guide — Toubkal Trek & Berber Villages | Marrakech Eco Tours",
    seoDescription: "Explore the High Atlas Mountains with certified local guides: Toubkal summit trek (4,167m), Berber village walks, and multi-day Atlas traverses. Small groups from Marrakech.",
  },
  {
    slug: "sahara",
    name: "Sahara Desert",
    subtitle: "The Golden Dunes of Erg Chebbi",
    region: "Drâa-Tafilalet",
    lat: 31.1513,
    lng: -3.9785,
    heroImage: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1400&q=85",
    about:
      "Erg Chebbi, near the village of Merzouga, is Morocco's most spectacular section of Saharan sand sea — a 50 km² field of star dunes rising to 150 metres above the flat hamada (gravel plain). The dunes are entirely composed of fine orange-red sand sculpted by prevailing northwesterly winds into classic crescent barchan shapes. At sunset and sunrise, the light transforms the Erg into a landscape of molten gold and copper that exists nowhere else on earth.",
    knownFor: [
      "Dunes reaching 150 m — among the highest in Morocco",
      "Camel trekking at sunset into the heart of the Erg",
      "Authentic Berber nomadic camp nights under the stars",
      "Milky Way stargazing far from any light pollution",
      "Merzouga village — gateway to the desert",
      "Quad biking and 4×4 desert excursions",
    ],
    highlights: [
      { title: "The Erg Chebbi Dunes", desc: "The dune field is most dramatic at golden hour — arrive at sunset for the light show that turns the sand every shade of copper, amber, and rose. At dawn, the colours reverse, cool blues giving way to warm gold as the sun climbs the ridge of the dunes." },
      { title: "Camel Trekking", desc: "The traditional crossing of the Erg is done by camel — a slow, meditative journey into the desert that connects you to millennia of caravan trade routes. Our Berber guides lead the same paths their ancestors walked." },
      { title: "Desert Camp Nights", desc: "Sleeping in a Berber tent inside the Erg, far from any road or settlement, is one of the most profound experiences in travel. The silence is absolute. The Milky Way, in a sky unaffected by any light pollution, is extraordinary." },
      { title: "Desert Activities", desc: "Beyond the classic camel trek, the Erg and surrounding hamada offer sandboarding on the dune faces, quad biking across the gravel plains, and 4×4 excursions to desert oases and fossils sites." },
    ],
    seasons: [
      { name: "Spring", emoji: "🌸", rating: 5, note: "March–May: ideal temperatures (20–28°C), occasional wildflowers in the hamada after winter rains." },
      { name: "Summer", emoji: "☀️", rating: 1, note: "June–August: extreme heat (40–48°C). Desert travel is not recommended in high summer." },
      { name: "Autumn", emoji: "🍂", rating: 5, note: "September–November: warm days, cool nights — perfect conditions for desert camping." },
      { name: "Winter", emoji: "❄️", rating: 4, note: "December–February: cold nights (near freezing in January) but stunning clear skies. Bring warm clothing for camp." },
    ],
    travelTips: [
      "Pack warm clothing for desert nights — temperatures drop dramatically after sunset even in spring and autumn.",
      "Bring a torch and extra water on camel treks. The dunes can be disorienting in the dark.",
      "Sand gets everywhere. Use a dry bag for camera equipment and seal toiletries.",
      "Sandboarding is fun but physically demanding — the climb back up 150m dunes is exhausting.",
      "Sunrise over the Erg is as spectacular as sunset — set an alarm and walk up the nearest dune ridge before light.",
    ],
    faqs: [
      { q: "How far is Merzouga from Marrakech?", a: "Merzouga is approximately 560km from Marrakech — about 9–10 hours by car. Most desert tours drive one way (usually through Dades Gorge and the Valley of a Thousand Kasbahs) and return via a different southern route. An overnight 2-way drive is also possible for budget tours." },
      { q: "Is a 3-day Sahara tour enough?", a: "3 days gives you the essential experience: drive through the Atlas and kasbah country, one full night in the desert camp, and the return journey. For a more complete experience, 4–5 days allows you to explore the Valley of Roses, Todra Gorge, and multiple dune areas." },
      { q: "What is included in a Sahara camp night?", a: "Standard camp nights include a traditional Berber tent, dinner (tagine and couscous), live music around the campfire, and breakfast before the sunrise camel ride. More luxurious private camps have proper beds and ensuite facilities." },
      { q: "Can I visit the Sahara independently?", a: "Yes, but the experience is significantly richer with a knowledgeable local guide. Navigation in the dunes is non-trivial, and local guides provide cultural context, language access with Berber families, and logistics that would take days to arrange independently." },
    ],
    relatedCategories: ["desert"],
    relatedOrigins: ["marrakech"],
    seoTitle: "Sahara Desert Tour from Marrakech — Erg Chebbi & Merzouga Guide | Marrakech Eco Tours",
    seoDescription: "Discover the Sahara Desert with certified guides: camel trekking, Berber camp nights, and sunrise over Erg Chebbi's 150m dunes. 2-4 day desert tours from Marrakech.",
  },
  {
    slug: "fes",
    name: "Fes el-Bali",
    subtitle: "The Living Medieval City",
    region: "Fès-Meknès",
    lat: 34.0545,
    lng: -4.9815,
    heroImage: "https://images.unsplash.com/photo-1582742850838-24590fb39fdc?w=1400&q=85",
    about:
      "Fes el-Bali is arguably the most remarkable urban survival on earth — a fully functioning medieval city of 156,000 people, covering 256 hectares, that has been continuously inhabited since 789 AD. It is the world's largest car-free urban area. Every street in its 9,400-alley labyrinth carries goods by hand or by mule. The same crafts have been produced in the same workshops for a thousand years: leather tanning, ceramic glazing, brass inlaying, zellige tilework. The city was founded by Moulay Idriss I and expanded under the Marinid dynasty into the great seat of Islamic learning it remains today.",
    knownFor: [
      "World's largest car-free urban zone — 9,400 alleyways",
      "Chouara Tannery — unchanged since the 11th century",
      "University of al-Qarawiyyin, founded 859 AD — the world's oldest",
      "Bou Inania Madrasa & the Attarine Madrasa",
      "The Mellah (Jewish quarter) and its rooftop views",
      "Living craft tradition: zellige, embroidery, copper, leather",
    ],
    highlights: [
      { title: "Chouara Tannery", desc: "The most photographed sight in Morocco after the Sahara. Stone vats filled with dye (saffron, poppy, henna, indigo) where leather workers stand knee-deep, processing hides in exactly the same way as 800 years ago. Best viewed from the leather shop terraces overlooking the pits." },
      { title: "Al-Qarawiyyin Mosque & University", desc: "Founded in 859 AD by a woman (Fatima al-Fihri), al-Qarawiyyin is recognised by UNESCO as the world's oldest continuously operating university. Non-Muslims cannot enter the mosque, but the courtyard glimpsed through the carved doorways is one of Morocco's great architectural sights." },
      { title: "The Medina Maze", desc: "Unlike Marrakech's medina, Fes is genuinely labyrinthine — even experienced guides use landmarks rather than mental maps. Getting slightly lost is the best way to find the real Fes: tiny bakeries, carpet weavers, neighbourhood mosques, and small squares where old men play cards." },
      { title: "The Mellah", desc: "The Jewish quarter of old Fes, once home to one of North Africa's most important Jewish communities, contains magnificent mid-20th century architecture, a restored synagogue, and the city's best views from its elevated terraces and cemetery." },
    ],
    seasons: [
      { name: "Spring", emoji: "🌸", rating: 5, note: "March–May: pleasant temperatures (18–26°C), long evenings, green surroundings." },
      { name: "Summer", emoji: "☀️", rating: 2, note: "June–August: very hot (35–40°C). The medina becomes oppressive. Morning-only visits recommended." },
      { name: "Autumn", emoji: "🍂", rating: 5, note: "September–November: perfect climate, harvest season, Fes Festival of Sacred Music (November)." },
      { name: "Winter", emoji: "❄️", rating: 3, note: "December–February: cool and occasionally rainy. The tanneries are less busy and more accessible." },
    ],
    travelTips: [
      "Fes is a 3–4 hour drive from Marrakech. Most imperial city tours combine Fes, Meknes, and Volubilis over 3+ days.",
      "A local guide is invaluable in the medina — self-navigation leads to frustration. Even locals get lost.",
      "The tanneries are most colourful in the morning (afternoon tanning happens later in the day).",
      "Buy leather goods at the tannery shops — the quality is genuine and the source is traceable.",
      "Try the signature Fassi dishes: pastilla (pigeon and almond pie), harira soup, and bastilla au lait (milk pastry).",
    ],
    faqs: [
      { q: "How many days do I need in Fes?", a: "Two full days is the minimum to cover the major medina sights, the tanneries, and the Ville Nouvelle. Three days allows you to explore the Mellah, Andalusian quarter, day trip to Volubilis Roman ruins, and the medina at a relaxed pace." },
      { q: "Is Fes on the Marrakech to Fes road trip route?", a: "Yes — Marrakech to Fes is Morocco's classic overland route, typically taking 3–6 days via the Dades Gorge, Todra Gorge, Merzouga Sahara, and Middle Atlas cedar forests. This is one of the great road trips in North Africa." },
      { q: "Should I stay inside the medina or in the Ville Nouvelle?", a: "Stay inside the medina. The riad experience is central to understanding Fes — entering a plain external wall to find an ornate interior courtyard with a fountain is one of Morocco's most atmospheric moments. The Ville Nouvelle has no historic character." },
    ],
    relatedCategories: ["cultural"],
    relatedOrigins: ["marrakech"],
    seoTitle: "Fes el-Bali Travel Guide — Medina Tours, Tanneries & Imperial City | Marrakech Eco Tours",
    seoDescription: "Explore Fes el-Bali: the world's most intact medieval city. Guided tours of the Chouara Tannery, al-Qarawiyyin University, and the 9,400-alley medina. Day trips and multi-day tours from Marrakech.",
  },
  {
    slug: "chefchaouen",
    name: "Chefchaouen",
    subtitle: "The Blue Pearl of Morocco",
    region: "Tanger-Tétouan-Al Hoceïma",
    lat: 35.1688,
    lng: -5.2689,
    heroImage: "https://images.unsplash.com/photo-1569383746724-6f1b882b8f46?w=1400&q=85",
    about:
      "Chefchaouen sits on the slopes of the Rif Mountains at 600m above sea level — a small, remarkably well-preserved medina whose walls, staircases, and flower pots are uniformly washed in blue and white. The blue-painting tradition, introduced by Jewish refugees from the Spanish Reconquista in the 1930s, has become so central to the town's identity that residents repaint their own homes every spring. The effect is completely unlike anywhere else in Morocco: serene, photogenic, and genuinely unhurried.",
    knownFor: [
      "Medina painted entirely in blue and white",
      "Rif Mountain setting with dramatic gorge views",
      "Ras el-Ma river, waterfall, and laundry rocks",
      "Plaza Uta el-Hammam — the main square surrounded by cafés",
      "Artisan wool weaving and traditional Rif crafts",
      "Gateway to the Talassemtane National Park",
    ],
    highlights: [
      { title: "The Blue Medina", desc: "Every wall, step, and doorframe is painted in shades from pale sky blue to deep indigo. The medina is small enough to explore fully in a day but rewarding enough to stay in for three. Every corner is a photograph." },
      { title: "Ras el-Ma", desc: "A short walk from the medina, the Ras el-Ma spring flows out of the mountain into a small river where locals wash laundry in the traditional way. A peaceful escape from the more tourist-heavy central square." },
      { title: "Talassemtane National Park", desc: "The park begins at the edge of the medina and offers half-day hikes through cedar and oak forest, gorge walks above the Laou river, and views back down to the blue-washed city below." },
      { title: "Spanish Mosque", desc: "A 20-minute uphill walk from the medina (or accessible via a rocky trail) leads to a Spanish-built mosque with panoramic views over the entire blue city and the surrounding Rif valleys — best at sunset." },
    ],
    seasons: [
      { name: "Spring", emoji: "🌸", rating: 5, note: "April–June: mild temperatures, green hills, wildflowers on the Rif slopes. Peak season." },
      { name: "Summer", emoji: "☀️", rating: 4, note: "July–August: warm but manageable at altitude. Evenings are cool. Very busy — book ahead." },
      { name: "Autumn", emoji: "🍂", rating: 4, note: "September–November: comfortable temperatures, quieter than summer." },
      { name: "Winter", emoji: "❄️", rating: 2, note: "December–March: can be cold and rainy. Occasional snow on the Rif ridges. Very quiet." },
    ],
    travelTips: [
      "Chefchaouen is best visited as an overnight stay, not a day trip — the city is most magical in the early morning before tour buses arrive.",
      "The blue streets are most vivid in early morning light (before 9am) and late afternoon gold.",
      "Excellent base for Rif Mountain hikes. Ask at your riad about local trail guides.",
      "The medina is small — getting 'lost' intentionally leads to the most interesting alleys and artisan workshops.",
      "Buy local: the wool blankets, djellaba robes, and leather goods are Rif-tradition and excellent quality.",
    ],
    faqs: [
      { q: "How do I get to Chefchaouen from Marrakech?", a: "There is no direct route — Chefchaouen is 530km from Marrakech, approximately 6–7 hours by car or bus. Most visitors travel via Fes or Tangier. The most practical approach is a multi-day imperial cities tour that includes Fes, Chefchaouen, Meknes, and the return to Marrakech." },
      { q: "Why is Chefchaouen painted blue?", a: "The blue-painting tradition was introduced in the 1930s by Jewish refugees fleeing the Spanish Reconquista. Blue, in Jewish tradition, symbolises the sky and heaven. Over time the entire medina adopted the practice as part of its identity, and locals repaint their homes every spring." },
      { q: "Is Chefchaouen worth the trip from Marrakech?", a: "Yes — but it requires at least one overnight stay to appreciate it properly. Visiting as a day trip (which is only possible from Fes or Tangier, 1.5–2 hours away) leaves too little time. An overnight stay allows you to experience the medina at its quietest and most beautiful." },
    ],
    relatedCategories: ["cultural"],
    relatedOrigins: ["marrakech"],
    seoTitle: "Chefchaouen Travel Guide — The Blue City of Morocco | Marrakech Eco Tours",
    seoDescription: "Discover Chefchaouen, Morocco's famous blue city in the Rif Mountains. Guided tours, hiking in Talassemtane National Park, and overnight stays in the painted medina.",
  },
  {
    slug: "agadir",
    name: "Agadir",
    subtitle: "Atlantic Coast & Surf Capital",
    region: "Souss-Massa",
    lat: 30.4278,
    lng: -9.5981,
    heroImage: "https://images.unsplash.com/photo-1562874732-260714dfe537?w=1400&q=85",
    about:
      "Agadir is Morocco's principal beach resort city — a modern Atlantic port rebuilt entirely after a catastrophic earthquake in 1960. Set at the foot of the Anti-Atlas Mountains with a nine-kilometre crescent of white sand beach, Agadir serves as the southern gateway to Morocco for both package tourists and adventurers. Thirty minutes north lies Taghazout, a village that has grown into one of the world's most famous surf destinations. The Souss-Massa region surrounding Agadir is home to national parks, argan oil forests, flamingo-filled wetlands, and Berber communities maintaining a way of life centuries old.",
    knownFor: [
      "9 km of Atlantic beach — Morocco's longest urban beach",
      "Taghazout — world-class surfing (Anchor Point, Hash Point, Killer Point)",
      "Souss-Massa National Park (flamingos, bald ibis, gazelles)",
      "Paradise Valley — palm oasis, turquoise pools, and natural swimming",
      "Argan oil cooperatives — the Souss is the world's only argan forest",
      "Fresh seafood at Agadir's working fishing port",
    ],
    highlights: [
      { title: "Taghazout Surf", desc: "The village of Taghazout (30 min north of Agadir) has world-class reef breaks suitable for all levels. Anchor Point produces Morocco's longest rides. The surf season runs year-round, with the biggest swells from October to March." },
      { title: "Souss-Massa National Park", desc: "A coastal wetland reserve 45 minutes south of Agadir, home to one of the last wild Northern Bald Ibis colonies on earth, large flamingo flocks, and the endangered Dorcas gazelle. An extraordinary and often-overlooked natural asset." },
      { title: "Paradise Valley", desc: "A hidden oasis 30km inland from Agadir — a narrow palm-lined gorge with a series of natural turquoise swimming holes. Reached by a short scramble from the road, it's a perfect half-day escape from the beach." },
      { title: "Argan Country", desc: "The Souss Plain between Agadir and Taroudant is the only place in the world where argan trees grow wild. Women's cooperatives harvest and press the oil by hand. Visiting one is an authentic and important tourism experience." },
    ],
    seasons: [
      { name: "Spring", emoji: "🌸", rating: 5, note: "March–May: warm, sunny, ideal for beach and surf. Atlantic water still fresh but swimmable." },
      { name: "Summer", emoji: "☀️", rating: 4, note: "June–August: reliably warm. Trade winds from the Atlantic keep temperatures lower than inland Morocco." },
      { name: "Autumn", emoji: "🍂", rating: 5, note: "September–November: best surf season begins. Warm sea, consistent swells." },
      { name: "Winter", emoji: "❄️", rating: 4, note: "December–February: mild by Moroccan standards (15–20°C). Biggest surf of the year. Less crowded beach." },
    ],
    travelTips: [
      "Agadir is 3 hours south of Marrakech by road (256km) or 40 minutes by direct flight.",
      "The beach promenade is excellent for cycling — several rental shops operate along the seafront.",
      "Surf lessons are available year-round in Taghazout for beginners. Book through the surf camp directly, not through tour desks.",
      "The souks of Inezgane (10km south of Agadir) are a more authentic and less tourist-oriented alternative to Agadir's city souk.",
      "Agadir's restored kasbah hill was flattened in the 1960 earthquake — only the walls remain, but the view over the bay is worth the climb.",
    ],
    faqs: [
      { q: "Is Agadir a good base for exploring southern Morocco?", a: "Yes — Agadir is ideally positioned for day trips to Paradise Valley, Immouzer du Kandar, Taroudant (the 'little Marrakech'), Tiznit silver jewellery souk, and the Anti-Atlas mountains. Multi-day trips to Sahara desert are also possible from Agadir (560km to Merzouga)." },
      { q: "What is the surf season in Taghazout?", a: "Taghazout produces rideable surf year-round. The biggest and most powerful swells arrive October through March. April through September is softer and more suitable for beginner-intermediate surfers. The water temperature ranges from 16°C in winter to 22°C in summer." },
      { q: "Can I combine Agadir and Marrakech in one trip?", a: "Absolutely — this is the standard approach for many of our tours. Fly into Marrakech, travel to Agadir by road (passing through the Atlas foothills and argan country), and return to Marrakech for your flight home. Or vice versa. The Tizi n'Test mountain pass route is spectacular." },
    ],
    relatedCategories: ["day-tours", "hiking"],
    relatedOrigins: ["agadir"],
    seoTitle: "Agadir Travel Guide — Atlantic Beach, Surf & Day Tours | Marrakech Eco Tours",
    seoDescription: "Complete guide to Agadir: surf at Taghazout, Souss-Massa National Park, Paradise Valley, and day tours from Morocco's Atlantic coast. Small-group tours with local guides.",
  },
  {
    slug: "ouzoud",
    name: "Ouzoud Waterfalls",
    subtitle: "Morocco's Most Spectacular Natural Wonder",
    region: "Béni Mellal-Khénifra",
    lat: 32.0187,
    lng: -6.7188,
    heroImage: "https://images.unsplash.com/photo-1535027341838-aa4d6ab54a25?w=1400&q=85",
    about:
      "The Cascades d'Ouzoud are the most spectacular waterfall in North Africa — a triple cascade dropping 110 metres over reddish cliffs into a turquoise pool fed by the El-Abid river. The name 'Ouzoud' means 'olive grinding' in Tamazight (Berber), a reference to the traditional olive mills that have operated here for generations. The site sits in a deep gorge surrounded by olive and fig groves, and is home to a colony of wild Barbary macaques — the only wild primates in Africa outside sub-Saharan Africa.",
    knownFor: [
      "110m triple waterfall — most spectacular in Morocco",
      "Wild Barbary macaque colony (North Africa's only wild primate)",
      "Turquoise natural swimming pool at the base",
      "Rainbow mist visible at midday when sun is high",
      "Traditional Berber olive oil mills in the gorge",
      "Dramatic gorge hike along the El-Abid river",
    ],
    highlights: [
      { title: "The Falls", desc: "Three parallel streams converge at a series of rocky ledges before the main drop. The volume is highest after winter rains (January–March) but the falls flow year-round. At midday in spring and summer, a permanent rainbow forms in the mist — one of Morocco's most beautiful natural phenomena." },
      { title: "Barbary Macaques", desc: "The colony of wild Barbary macaques (Macaca sylvanus) at Ouzoud is one of the most accessible primate populations in the world. The macaques are habituated to human presence but remain wild — do not feed them and keep your food secured. They are protected under Moroccan law." },
      { title: "The Gorge Walk", desc: "A path descends from the top of the falls alongside the cascades, crosses the river at the base pool, and continues through the gorge. The full circuit (3–4 hours) passes traditional olive mills, swimming spots, and viewpoints back up at the falls from below." },
      { title: "Olive Mills", desc: "Berber families have operated stone-wheel olive presses in the gorge below the falls for centuries. In the olive harvest season (November–January) you can watch traditional cold-pressing being done exactly as it has been for generations." },
    ],
    seasons: [
      { name: "Spring", emoji: "🌸", rating: 5, note: "March–May: highest water flow, permanent rainbow, wildflowers. The best time to visit." },
      { name: "Summer", emoji: "☀️", rating: 4, note: "June–August: hot (35°C+) but the swimming pool is refreshing. Very busy on weekends." },
      { name: "Autumn", emoji: "🍂", rating: 4, note: "September–November: olive harvest season, good water flow, comfortable temperatures." },
      { name: "Winter", emoji: "❄️", rating: 3, note: "December–February: highest rainfall, falls at maximum power, but cool and occasionally muddy." },
    ],
    travelTips: [
      "Ouzoud is 3 hours from Marrakech (150km). Most visitors combine it with a day hike and return the same evening.",
      "Arrive early (before 9am) to have the falls and base pool largely to yourself.",
      "The descent path to the base can be slippery — wear shoes with grip, not sandals.",
      "Bring a change of clothes — the mist and swimming make getting wet inevitable.",
      "Do not feed the macaques — it disrupts their natural behaviour and habituates them to human food.",
    ],
    faqs: [
      { q: "How far are the Ouzoud Waterfalls from Marrakech?", a: "Ouzoud is approximately 150km from Marrakech — about 3 hours by car. The drive passes through Azilal and the Béni Mellal plateau. We offer full-day guided excursions from Marrakech including transport, guide, and the gorge walk." },
      { q: "Can I swim at the bottom of the waterfalls?", a: "Yes — the natural pool at the base of the falls is one of the most beautiful swimming spots in Morocco. The water is cold (fed from mountain springs) but refreshing, especially in summer." },
      { q: "Is Ouzoud a good day trip from Marrakech?", a: "Yes — it's the most popular day excursion from Marrakech. A full day (7am–7pm) allows 4–5 hours at the falls and gorge. An overnight stay in the village allows a morning visit before the day-trip crowds arrive, which is the best way to experience it." },
    ],
    relatedCategories: ["hiking", "day-tours"],
    relatedOrigins: ["marrakech"],
    seoTitle: "Ouzoud Waterfalls Day Trip from Marrakech — Guide & Tours | Marrakech Eco Tours",
    seoDescription: "Visit the Ouzoud Waterfalls (110m) from Marrakech: guided gorge hikes, wild Barbary macaques, swimming pools, and natural rainbow mist. Full-day tours with local guides.",
  },
  {
    slug: "essaouira",
    name: "Essaouira",
    subtitle: "The Windy Walled Atlantic City",
    region: "Marrakech-Safi",
    lat: 31.5085,
    lng: -9.7595,
    heroImage: "https://images.unsplash.com/photo-1555686367-56d5186965d5?w=1400&q=85",
    about:
      "Essaouira is the great Atlantic counterpoint to Marrakech — whitewashed where Marrakech is rose-red, windswept where Marrakech is still, and deeply relaxed where Marrakech is electric. The city's 18th-century Portuguese-built fortifications jut into the Atlantic surf, enclosing a UNESCO World Heritage medina of arched blue shutters, fishing net repairs, and Gnawa music floating from café doorways. Essaouira has long attracted artists, musicians, and writers — Jimi Hendrix famously visited in 1969 and inspired a generation of travellers to follow.",
    knownFor: [
      "UNESCO-listed medina with 18th-century Portuguese sea walls",
      "World-class kitesurfing and windsurfing (consistent Atlantic winds)",
      "Gnawa music — the spiritual blues of Morocco's African heritage",
      "Working blue fishing fleet and fresh seafood",
      "Thuya wood marquetry — Essaouira's signature artisan craft",
      "The Skala fortress ramparts — cannon-lined walk over the Atlantic",
    ],
    highlights: [
      { title: "The Ramparts", desc: "Essaouira's sea walls were built in the 18th century by a French architect commissioned by the Alaouite Sultan. The Skala de la Ville, a broad cannon-lined terrace overlooking the Atlantic, is one of the most dramatic walks in Morocco, especially at sunset when the fishing boats come in." },
      { title: "Gnawa Music", desc: "Essaouira is the spiritual home of Gnawa — Morocco's ancient African-influenced musical tradition, rooted in the culture of West African communities brought to Morocco as enslaved people. The Gnawa and World Music Festival (June) draws musicians from across Africa and beyond." },
      { title: "Kitesurfing Paradise", desc: "The consistent Alizée trade winds that blow from the northeast through the summer months make Essaouira one of the world's great kitesurfing destinations. The beach south of the city is used year-round by surfers, kiters, and windsurfers." },
      { title: "The Medina", desc: "Unlike Marrakech's labyrinthine medina, Essaouira's is logically planned on a grid — easier to navigate but equally atmospheric. The Porte de la Marine, the spice and jewellery souks, and the fish auction at the port are among its highlights." },
    ],
    seasons: [
      { name: "Spring", emoji: "🌸", rating: 4, note: "April–June: warm, moderate winds, long evenings. Gnawa Festival in June." },
      { name: "Summer", emoji: "☀️", rating: 5, note: "July–August: trade winds at full strength — perfect for kitesurfing. Cool by Moroccan standards (22–26°C)." },
      { name: "Autumn", emoji: "🍂", rating: 4, note: "September–November: pleasant temperatures, good surf, fewer tourists than summer." },
      { name: "Winter", emoji: "❄️", rating: 3, note: "December–March: windiest and coolest season. The city is at its quietest and most atmospheric." },
    ],
    travelTips: [
      "Essaouira is 3 hours from Marrakech (170km). Day trips are possible but an overnight stay is much better.",
      "Pack a windproof layer even in summer — the constant Alizée wind can make the seafront chilly.",
      "The freshest seafood is at the port fish stalls (east of the main gate) — choose your fish and have it grilled immediately.",
      "Thuya wood marquetry is the local craft specialty — look for genuine pieces made from the arborvitae root burl, not pine-stained imitations.",
      "Walk the ramparts at sunset for the best light over the Atlantic and fishing fleet.",
    ],
    faqs: [
      { q: "How do I get from Marrakech to Essaouira?", a: "Supratours buses run twice daily from Marrakech (Bab Doukkala) and take 2.5–3 hours. Shared taxis are faster but more crowded. Private cars and tour transfers take 2.5 hours on the A7 motorway. There is no train connection." },
      { q: "Is Essaouira good for non-surfers?", a: "Absolutely — Essaouira is one of Morocco's most complete destinations for non-surfers. The medina, ramparts, Gnawa music, seafood, artisan workshops, and beach walks offer a full itinerary without any water sports." },
      { q: "Why did Jimi Hendrix visit Essaouira?", a: "Hendrix visited Essaouira in 1969 during his extended stay in Morocco, drawn by the city's artistic community and the Gnawa music traditions. He stayed for several days and the visit has since become a celebrated part of the city's cultural mythology. A house he supposedly stayed in near the medina is now a small museum, though its historical accuracy is contested." },
    ],
    relatedCategories: ["day-tours", "cultural"],
    relatedOrigins: ["marrakech"],
    seoTitle: "Essaouira Travel Guide — Kitesurfing, Gnawa Music & Medina | Marrakech Eco Tours",
    seoDescription: "Discover Essaouira: UNESCO-listed Atlantic medina, world-class kitesurfing, Gnawa music, and seafood. Day trips and overnight tours from Marrakech with local guides.",
  },
];

export function getDestination(slug: string): Destination | undefined {
  return DESTINATIONS.find((d) => d.slug === slug);
}
