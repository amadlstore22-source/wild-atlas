import type { Tour } from "./tours";

export const TOURS: Tour[] = [
  // ─────────────────────────────────────────────
  // MARRAKESCH-TOUREN
  // ─────────────────────────────────────────────
  {
    id: "1",
    slug: "toubkal-summit-trek-4day",
    title: "Von Marrakesch zum Toubkal-Gipfel — 4-tägige Trekkingtour",
    category: "trekking",
    origin: "marrakech",
    difficulty: "challenging",
    duration: "4 Tage / 3 Nächte",
    groupSize: "2–10 Personen",
    reviewCount: 48,
    rating: 4.9,
    price: 380,
    depositAmount: 95,
    heroImage: "/gallery/toubkal-summit-guide-thumbs-up.jpg",
    gallery: [
      "/gallery/toubkal-summit-guide-thumbs-up.jpg",
      "/gallery/toubkal-group-snow-ascent.jpg",
      "/gallery/toubkal-predawn-summit-start-crampons.jpg",
      "/gallery/toubkal-summit-ridge-climbers.jpg",
      "/gallery/toubkal-summit-panorama-high-atlas.jpg",
    ],
    shortDescription:
      "Bezwingen Sie den Jbel Toubkal (4.167 m) — das Dach Nordafrikas — vorbei an Berberdörfern und hochgelegenen Alpentälern.",
    description:
      "Der Toubkal-Gipfeltrek ist das ultimative Abenteuer im Hohen Atlas. Sie folgen jahrhundertealten Maultierpfaden, übernachten in Bergrefugien und stehen bei Sonnenaufgang auf dem höchsten Punkt Nordafrikas, während sich das Licht über ganz Marokko ausbreitet. Vier Tage, die Ihr Leben verändern können — anspruchsvoll, aber ohne technische Kletterei.",
    highlights: [
      "Besteigung des Jbel Toubkal auf 4.167 m — höchster Gipfel Nordafrikas",
      "Übernachtung in traditionellen Berber-Bergrefugien auf 3.207 m",
      "Start im Ausgangsdorf Imlil, mitten im Atlasgebirge",
      "Panoramablick über Marokko und Algerien",
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
        title: "Marrakesch → Imlil (1.740 m)",
        description:
          "Transfer von Marrakesch nach Imlil (1,5 Std.), dem Ausgangsdorf für den Toubkal. Ankommen, den Guide kennenlernen und ein kurzer Akklimatisierungsspaziergang durch die terrassierten Berberfelder. Willkommensessen.",
      },
      {
        day: 2,
        title: "Imlil → Toubkal-Refugium (3.207 m)",
        description:
          "Aufstieg durch das Mizane-Tal vorbei am Schrein von Sidi Chamharouch bis zum Bergrefugium. Nachmittäglicher Akklimatisierungsspaziergang oberhalb des Lagers. Früh schlafen vor dem Gipfeltag.",
      },
      {
        day: 3,
        title: "Gipfeltag — Toubkal (4.167 m)",
        description:
          "Start vor Sonnenaufgang um 5:00 Uhr. Steiler Aufstieg über das Geröllfeld des South Cirque. Gipfelankunft bei Sonnenaufgang. Abstieg zum Refugium zum feierlichen Abendessen.",
      },
      {
        day: 4,
        title: "Refugium → Imlil → Marrakesch",
        description:
          "Abstieg am Morgen durch Wildblumenwiesen. Transfer zurück nach Marrakesch. Ende der Tour am frühen Nachmittag.",
      },
    ],
    faq: [
      { q: "Ist der 4-tägige Trek besser als der 2-tägige für einen ersten Toubkal-Versuch?", a: "Für die meisten Menschen ja. Die zusätzlichen Tage dienen der Akklimatisierung statt zusätzlicher Strecke, und die Höhe — nicht die Fitness — ist meist der Grund, warum Menschen nahe des Gipfels Schwierigkeiten bekommen. Wenn Sie noch nie in der Nähe von 4.000 Metern waren, ist dies die richtige Wahl." },
      { q: "Wie sind die Unterkünfte bei diesem Trek?", a: "Eine Mischung aus Dorfpension und dem Toubkal-Refugium auf 3.207 Metern. Das Refugium ist eine funktionierende Berghütte: Gemeinschaftsschlafsäle mit Etagenbetten, Matratzen und Decken, gemeinsame Mahlzeiten und kalte Nächte. Bringen Sie einen Schlafsack-Inlett, eine Stirnlampe und Ohrstöpsel mit." },
      { q: "Muss ich meinen eigenen Rucksack tragen?", a: "Nur einen Tagesrucksack mit Wasser, Kleidungsschichten und Kamera. Maultiere transportieren das Hauptgepäck zwischen den Etappen — das macht aufeinanderfolgende lange Wandertage für Menschen ohne Höhenerfahrung überhaupt erst machbar." },
      { q: "Wann beginnt der Gipfeltag?", a: "Vor Sonnenaufgang. Der Gipfelanstieg vom Refugium dauert etwa drei Stunden, und ein früher Start bedeutet, den Gipfel zum Sonnenaufgang zu erreichen und vor dem nachmittäglichen Wetterumschwung wieder unten zu sein. Es ist der kälteste Teil des Tages — die warme Schicht, die Sie die ganze Zeit mitgeschleppt haben, zahlt sich endlich aus." },
    ],
    meetingPoint: { lat: 31.1369, lng: -7.9169, name: "Imlil Village, Atlas Mountains" },
    seoTitle: "Toubkal-Gipfeltrek 4 Tage — Besteigen Sie Nordafrikas höchsten Gipfel | Marrakech Eco Tours",
    seoDescription: "Bezwingen Sie den Jbel Toubkal (4.167 m) mit einem lizenzierten Berberführer. 4-tägiger Gipfeltrek ab Marrakesch — inklusive Refugien, Vollverpflegung und Transfer. Ab $380.",
    featured: true,
  },
  {
    id: "2",
    slug: "sahara-3day-marrakech",
    title: "Von Marrakesch nach Merzouga — 3-tägige Wüstentour",
    category: "desert",
    origin: "marrakech",
    difficulty: "easy",
    duration: "3 Tage / 2 Nächte",
    groupSize: "2–12 Personen",
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
      "Reiten Sie auf Kamelen in die goldenen Dünen von Erg Chebbi und schlafen Sie unter einem Sternenmeer in einem luxuriösen Berber-Wüstencamp.",
    description:
      "Drei Tage von Marrakesch in die Sahara und zurück. Überqueren Sie den Hohen Atlas, halten Sie an der UNESCO-Ksar Aït Ben Haddou, durchqueren Sie das Draa-Tal und reiten Sie auf Kamelen in den Erg Chebbi, während die Sonne in den Dünen versinkt. Eine Nacht unter den Sternen in einem traditionellen Luxuscamp.",
    highlights: [
      "Kameltrekking in die Dünen von Erg Chebbi bei Sonnenuntergang",
      "Übernachtung in einem luxuriösen Berber-Wüstencamp",
      "UNESCO-Weltkulturerbe Ksar Aït Ben Haddou",
      "Sternenbeobachtung ganz ohne Lichtverschmutzung",
      "Sandboarding auf den großen Dünen",
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
        title: "Marrakesch → Aït Ben Haddou → Ouarzazate",
        description:
          "Abfahrt aus Marrakesch um 7:00 Uhr. Überquerung des Tizi-n'-Tichka-Passes (2.260 m). Besuch von Aït Ben Haddou. Übernachtung in Ouarzazate — dem Tor zur Wüste.",
      },
      {
        day: 2,
        title: "Ouarzazate → Draa-Tal → Erg-Chebbi-Camp",
        description:
          "Fahrt durch die Palmenoase des Draa-Tals. Ankunft in Merzouga am frühen Nachmittag. Kameltrekking in den Erg Chebbi bei Sonnenuntergang. Abendessen mit Gnaoua-Musik unter den Sternen.",
      },
      {
        day: 3,
        title: "Sonnenaufgang in der Sahara → Todra-Schlucht → Marrakesch",
        description:
          "Aufstehen vor Sonnenaufgang für den Blick über die Dünen. Rückritt mit dem Kamel und Frühstück. Rückfahrt über die Todra-Schlucht. Ankunft in Marrakesch am Abend.",
      },
    ],
    faq: [
      { q: "Warum dauert diese Reise drei Tage?", a: "Weil Merzouga und die Dünen von Erg Chebbi auf der anderen Seite des Atlas liegen. Drei Tage sind das, was die Entfernung erfordert — alles Kürzere führt entweder woanders hin als in die echte Sahara oder besteht fast nur aus Fahrt." },
      { q: "Was sehen wir während der Fahrt?", a: "Die Route führt über den Tizi-n'-Tichka-Pass und schließt Aït Ben Haddou sowie die Schluchtenlandschaft mit ein, sodass die Anreise selbst schon sehenswert ist, statt nur verlorene Zeit zu sein. Die Fahrt ist in Etappen mit Zwischenstopps unterteilt, nicht in einem Rutsch." },
      { q: "Wie ist die Nacht im Wüstencamp?", a: "Betten mit Decken im Zelt, gemeinsames Abendessen und vollkommene Stille, sobald die Generatoren abgeschaltet sind. Die Dünen sind wirklich dunkel, weshalb sich die meisten eher an den Sternenhimmel als an den Kamelritt erinnern. Bringen Sie eine warme Schicht mit — außerhalb des Sommers wird es nachts kalt." },
      { q: "Muss ich auf einem Kamel reiten?", a: "Nein. Der Kamelabschnitt zum Camp ist kurz und freiwillig — diese Strecke stattdessen zu Fuß zurückzulegen, ist üblich genug, dass die Guides damit rechnen. Die eigentliche Strecke wird ohnehin mit dem Fahrzeug zurückgelegt." },
    ],
    meetingPoint: { lat: 31.0580, lng: -4.0127, name: "Merzouga, Erg Chebbi Sahara" },
    seoTitle: "3-tägige Sahara-Wüstentour ab Marrakesch — Kamele, Dünen & Wüstencamp | Marrakech Eco Tours",
    seoDescription: "Kameltrekking bei Sonnenuntergang in den Erg Chebbi und Übernachtung unter den Sternen. 3-tägige Tour von Marrakesch in die Sahara mit Aït Ben Haddou, Draa-Tal und luxuriösem Berbercamp. Ab $245.",
    featured: true,
  },
  {
    id: "3",
    slug: "ourika-valley-day-hike",
    title: "Von Marrakesch ins Ourika-Tal — Tageswanderung",
    category: "day-tours",
    origin: "marrakech",
    difficulty: "easy",
    duration: "1 Tag",
    groupSize: "2–15 Personen",
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
      "Eine Tageswanderung durch Walnusshaine, Berberdörfer und Gebirgsbäche, nur 45 Minuten von Marrakesch entfernt.",
    description:
      "Das Ourika-Tal ist eine andere Welt als die Stadt — terrassierte Felder klammern sich an rote Felshänge, Berberfrauen weben Teppiche vor ihren Häusern, und Gebirgsbäche rauschen zwischen den Wegen. Perfekt für Familien und Wanderanfänger. Die Wasserfälle von Setti Fatma am Talende sind das Highlight.",
    highlights: [
      "Wanderung zu den Wasserfällen von Setti Fatma (7 Kaskaden)",
      "Spaziergang durch Berberdörfer abseits des Tourismus",
      "Baden in natürlichen Gebirgsbecken",
      "Traditionelles Berber-Mittagessen bei einer Familie",
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
        title: "Ganztägig — Ourika-Tal",
        description:
          "Abfahrt aus Marrakesch um 8:30 Uhr. Wanderbeginn um 9:30 Uhr durch Dörfer und Terrassenfelder. Baden an den Wasserfällen. Traditionelles Berber-Mittagessen. Rückkehr nach Marrakesch bis 17:00 Uhr.",
      },
    ],
    meetingPoint: { lat: 31.3489, lng: -7.7411, name: "Ourika Valley, High Atlas" },
    seoTitle: "Ourika-Tal Tageswanderung ab Marrakesch — Wasserfälle & Berberdörfer | Marrakech Eco Tours",
    seoDescription: "Wandern Sie zu den Wasserfällen von Setti Fatma durch Berberdörfer und Gebirgsbäche, nur 45 Minuten von Marrakesch. Geführter Tagesausflug inklusive Berber-Mittagessen. Ab $35.",
    featured: true,
  },
  {
    id: "4",
    slug: "ouzoud-waterfalls-day-trip",
    title: "Von Marrakesch zu den Ouzoud-Wasserfällen — Tagesausflug",
    category: "day-tours",
    origin: "marrakech",
    difficulty: "easy",
    duration: "1 Tag",
    groupSize: "2–15 Personen",
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
      "Marokkos spektakulärste Wasserfälle — 110 m stürzendes Wasser, wilde Berberaffen und eine atemberaubende Schlucht.",
    description:
      "Mit 110 Metern sind die Ouzoud-Fälle die höchsten Wasserfälle Nordafrikas. In der nebelfeuchten Schlucht leben Gruppen wilder Berberaffen, am Fuß der Fälle liegen regenbogenumrahmte Becken, und traditionelle Mühlen mahlen noch heute Arganöl. Zwei Stunden Fahrt von Marrakesch — und jede Minute wert.",
    highlights: [
      "Die Ouzoud-Fälle — 110 m Kaskade, die höchste Nordafrikas",
      "Wilde Berberaffen in ihrem natürlichen Lebensraum",
      "Bootsfahrt am Fuß der Wasserfälle",
      "Besuch einer traditionellen Wassermühle",
      "Malerische Schluchtenwanderung mit lokalem Guide",
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
        title: "Ganztägig — Ouzoud-Wasserfälle",
        description:
          "Abfahrt aus Marrakesch um 7:30 Uhr. Ankunft in Ouzoud um 9:30 Uhr. Geführte Wanderung zu den Fällen, Schluchtenpfad, Bootsfahrt, Affenbeobachtung. Freizeit zum Mittagessen. Rückkehr nach Marrakesch bis 18:00 Uhr.",
      },
    ],
    meetingPoint: { lat: 32.0061, lng: -6.7200, name: "Ouzoud Falls, Middle Atlas" },
    seoTitle: "Ouzoud-Wasserfälle Tagesausflug ab Marrakesch — Berberaffen & 110 m Fälle | Marrakech Eco Tours",
    seoDescription: "Besuchen Sie Marokkos höchsten Wasserfall — 110 Meter stürzendes Wasser, wilde Berberaffen und eine Bootsfahrt durch die Schlucht. Tagesausflug ab Marrakesch mit Guide. Ab $30.",
    featured: false,
  },
  {
    id: "5",
    slug: "agafay-desert-sunset",
    title: "Von Marrakesch in die Agafay-Wüste — Sonnenuntergang & Dinner",
    category: "day-tours",
    origin: "marrakech",
    difficulty: "easy",
    duration: "1 Tag (Nachmittag–Abend)",
    groupSize: "2–20 Personen",
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
      "Die Sahara in 30 Minuten — Quad-Biking bei Sonnenuntergang, Kamelritte und ein traditionelles Berber-Dinner in der Steinwüste Agafay.",
    description:
      "Sie brauchen keine drei Tage, um die Wüste zu spüren. Die Agafay — eine weite Mondlandschaft aus felsiger Hammada nur 30 km von Marrakesch entfernt — bietet bei Sonnenuntergang eine echte Sahara-Atmosphäre. Fahren Sie mit dem Quad über das Plateau, reiten Sie auf einem Kamel zum Camp und genießen Sie ein traditionelles Berberfest mit Blick auf das Atlasgebirge.",
    highlights: [
      "Quad-Biking durch die Steinwüste Agafay",
      "Kamelritt zum Sonnenuntergangs-Aussichtspunkt",
      "Traditionelles Berber-Dinner im Wüstencamp",
      "Atlasgebirge am Horizont in der Abenddämmerung",
      "Nur 30 Minuten von Marrakesch entfernt",
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
        title: "Nachmittag in der Agafay-Wüste",
        description:
          "Abholung in Marrakesch um 15:00 Uhr. Ankunft in der Agafay um 15:30 Uhr. Quad-Biking-Session, Kamelritt bei Sonnenuntergang (17:30–18:30 Uhr). Traditionelles Berber-Dinner unter den Sternen. Rückkehr nach Marrakesch bis 22:00 Uhr.",
      },
    ],
    meetingPoint: { lat: 31.4969, lng: -8.1073, name: "Agafay Desert, Marrakech Region" },
    seoTitle: "Agafay-Wüste Sonnenuntergangstour ab Marrakesch — Quad-Biking, Kamele & Berber-Dinner | Marrakech Eco Tours",
    seoDescription: "Erleben Sie die Sahara in 30 Minuten — Quad-Biking, Kamelritt bei Sonnenuntergang und ein traditionelles Berber-Dinner in der Steinwüste Agafay bei Marrakesch. Ab $75.",
    featured: false,
  },
  {
    id: "6",
    slug: "marrakech-medina-cultural-tour",
    title: "Medina von Marrakesch — Kulturelle Stadtführung",
    category: "cultural",
    origin: "marrakech",
    difficulty: "easy",
    isDayTour: true,
    duration: "Halbtags (4 Stunden)",
    groupSize: "2–8 Personen",
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
      "Erkunden Sie das labyrinthische Souk von Marrakesch mit einem Ortskenner — Gewürze, Gerbereien, Kunsthandwerker und versteckte Riad-Gärten.",
    description:
      "Die Medina von Marrakesch ist UNESCO-Weltkulturerbe und eines der lebendigsten urbanen Labyrinthe der Welt. Ihr lokaler Guide führt Sie durch die alten Souks, vorbei an Gewürzbergen und handbemalter Keramik, in die Gerbereien und schließlich auf eine Dachterrasse oberhalb der Koutoubia-Moschee.",
    highlights: [
      "Der Djemaa el-Fna in seiner lebendigsten Form",
      "Ledergerbereien, betrachtet von einer privaten Dachterrasse",
      "Ben-Youssef-Medersa — islamische Hochschule aus dem 16. Jahrhundert",
      "Gewürzsouk und Arganöl-Kooperative",
      "Versteckter Riad-Garten und traditioneller Minztee",
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
        title: "Vollständiges Medina-Erlebnis",
        description:
          "Beginn um 9:00 Uhr an der Koutoubia-Moschee. Spaziergang durch das Mellah, die Ben-Youssef-Medersa, Handwerkersouks, Gerbereien und den Djemaa el-Fna. Minztee in einem versteckten Riad. Ende um 13:00 Uhr.",
      },
    ],
    meetingPoint: { lat: 31.6295, lng: -7.9811, name: "Koutoubia Mosque, Marrakech" },
    seoTitle: "Kulturelle Stadtführung Medina Marrakesch — Souks, Gerbereien & Riads | Marrakech Eco Tours",
    seoDescription: "Entdecken Sie die UNESCO-Medina von Marrakesch mit einem lokalen Guide — Ledergerbereien, Ben-Youssef-Medersa, Djemaa el-Fna und versteckte Riad-Gärten. Private Halbtagestour. Ab $45.",
    featured: false,
  },
  {
    id: "7",
    slug: "marrakech-to-fes-3day",
    title: "Von Marrakesch nach Fès — 3-tägige Rundreise der Kaiserstädte",
    category: "cultural",
    origin: "marrakech",
    difficulty: "easy",
    duration: "3 Tage / 2 Nächte",
    groupSize: "2–12 Personen",
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
      "Zwei von Marokkos großartigsten Städten in drei Tagen — Hoher-Atlas-Pass, Ifrane, Zedernwald und die alte Medina von Fès.",
    description:
      "Die Straße von Marrakesch nach Fès gehört zu den spektakulärsten Fahrstrecken Afrikas. Überqueren Sie den Hohen Atlas über den Tizi n'Tichka, halten Sie an der UNESCO-Ksar Aït Ben Haddou, durchqueren Sie die Zedernwälder des Mittleren Atlas, wo wilde Berberaffen leben, und erreichen Sie Fès el-Bali — die größte noch bewohnte mittelalterliche Stadt der Welt.",
    highlights: [
      "Gebirgspass Tizi n'Tichka (2.260 m)",
      "UNESCO-Weltkulturerbe Ksar Aït Ben Haddou",
      "Ifrane — Marokkos alpines Dorf",
      "Zedernwald von Azrou und Berberaffen",
      "Medina Fès el-Bali und die Chouara-Gerbereien",
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
        title: "Marrakesch → Tizi n'Tichka → Aït Ben Haddou → Midelt",
        description:
          "Abfahrt um 7:30 Uhr. Aufstieg über den Atlas via Tizi n'Tichka. Besuch von Aït Ben Haddou. Weiterfahrt durch das Ziz-Tal nach Midelt zur Übernachtung.",
      },
      {
        day: 2,
        title: "Midelt → Ifrane → Zedernwald von Azrou → Fès",
        description:
          "Fahrt durch den Mittleren Atlas. Stopp in Ifrane und im Zedernwald von Azrou zur Beobachtung wilder Berberaffen. Ankunft in Fès am Nachmittag. Check-in im Riad.",
      },
      {
        day: 3,
        title: "Ganztägig Medina von Fès",
        description:
          "Geführte Erkundung von Fès el-Bali: Chouara-Gerbereien, Al-Qarawiyyin-Universität, Bou-Inania-Medersa und die labyrinthischen Souks. Ende der Tour in Fès.",
      },
    ],
    meetingPoint: { lat: 34.0331, lng: -5.0003, name: "Fes el-Bali, Imperial City" },
    seoTitle: "3-Tage-Tour Marrakesch nach Fès — Kaiserstädte & Hoher Atlas | Marrakech Eco Tours",
    seoDescription: "Fahrt von Marrakesch nach Fès über den Tizi n'Tichka, Aït Ben Haddou und die Zedernwälder des Mittleren Atlas. 3-tägige private 4x4-Tour mit Riad-Unterkunft. Ab $290.",
    featured: false,
  },
  {
    id: "8",
    slug: "mgoun-massif-trek",
    title: "Von Marrakesch zum Mgoun-Massiv — 7-tägige Durchquerung",
    category: "trekking",
    origin: "marrakech",
    difficulty: "expert",
    duration: "7 Tage / 6 Nächte",
    groupSize: "2–8 Personen",
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
      "Marokkos wildester Trek — 7 Tage durch das abgelegene Mgoun-Massiv (4.068 m) ohne einen anderen Touristen weit und breit.",
    description:
      "Die Mgoun-Massiv-Durchquerung ist für erfahrene Trekker gedacht, die abseits der Touristenpfade unterwegs sein wollen. Sieben Tage abgelegene Hochgebirgswildnis, Pässe über 3.600 m, Übernachtungen bei Berberfamilien und die Besteigung des Jbel Mgoun — Marokkos zweithöchsten Gipfels — kaum einem anderen Reisenden begegnend.",
    highlights: [
      "Besteigung des Jbel Mgoun — Marokkos 2. höchster Gipfel mit 4.068 m",
      "Vollständig abseits der Touristenpfade",
      "Übernachtungen bei Berberfamilien in abgelegenen Dörfern",
      "Durchquerung der Tessaoute- und Mgoun-Schluchten",
      "7 Tage pure Hochgebirgswildnis",
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
      { day: 1, title: "Marrakesch → Aït M'hamed", description: "Fahrt zum Ausgangspunkt. Treffen mit dem Maultierteam und der Crew. Erste Nacht bei einer Berberfamilie." },
      { day: 2, title: "Aït M'hamed → Agouti (2.600 m)", description: "Wanderung durch das 'glückliche Tal' Aït Bouguemez. Camp in Agouti." },
      { day: 3, title: "Agouti → Tizi n'Ait Imi (3.650 m) → Tarkeddit", description: "Erster Hochpass. Atemberaubende Panoramen. Wildcamp in Tarkeddit." },
      { day: 4, title: "Mgoun-Gipfel (4.068 m)", description: "Start vor Sonnenaufgang. Besteigung des Jbel Mgoun. Abstieg zum Camp in der Tessaoute-Schlucht." },
      { day: 5, title: "Durchquerung der Tessaoute-Schlucht", description: "Wanderung durch die dramatische rotwandige Schlucht. Wildes Baden im Fluss." },
      { day: 6, title: "Ausgang der Schlucht → Bou Tharar", description: "Ausgang aus der Schlucht. Übernachtung im Dorf Bou Tharar bei einer lokalen Familie." },
      { day: 7, title: "Bou Tharar → Marrakesch", description: "Transfer zurück nach Marrakesch durch das Rosental. Ende der Tour bis 16:00 Uhr." },
    ],
    faq: [
      { q: "Ist der M'Goun schwerer als der Toubkal?", a: "Über eine Woche gesehen, ja. Wir stufen ihn als 'expert' ein gegenüber 'challenging' bei den Toubkal-Routen — nicht weil ein einzelner Tag technisch anspruchsvoll wäre, sondern weil es sieben aufeinanderfolgende Tage in abgelegenem Gelände mit wenigen Möglichkeiten zum Anhalten oder Umkehren sind. Es geht um anhaltende Anstrengung statt um einen einzelnen harten Tag." },
      { q: "Wie abgelegen ist dieser Trek?", a: "Wirklich abgelegen. Die Route führt durch Hochgebirge und Schluchten, vorbei an Dörfern, in denen Trekkinggruppen noch immer selten sind. Genau das macht den Reiz aus — und deshalb braucht die Route auch einen Guide, der die Wasserstellen und Wettermuster kennt." },
      { q: "Welche Erfahrung brauche ich für die M'Goun-Durchquerung?", a: "Erfahrung mit mehrtägigem Trekking. Dies ist keine erste große Wanderung: Sie sollten bereits wissen, wie Ihr Körper mit aufeinanderfolgenden Tagen auf unwegsamem Gelände und mit Höhenlagen umgeht. Wenn Sie den Toubkal problemlos gemeistert haben, haben Sie eine solide Grundlage dafür." },
    ],
    meetingPoint: { lat: 31.6558, lng: -6.4561, name: "Aït M'hamed, Mgoun Massif" },
    seoTitle: "Mgoun-Massiv-Trek 7 Tage — Marokkos wildeste Hochgebirgsdurchquerung | Marrakech Eco Tours",
    seoDescription: "7-tägiger Expertentrek durch das abgelegene Mgoun-Massiv — Besteigung des Jbel Mgoun (4.068 m), Hochpässe und Übernachtungen bei Berberfamilien, ohne andere Touristen. Ab $820.",
    featured: false,
  },

  // ─────────────────────────────────────────────
  // AGADIR-TOUREN
  // ─────────────────────────────────────────────
  {
    id: "9",
    slug: "paradise-valley-agadir",
    title: "Von Agadir ins Paradise Valley & zu den Immouzer-Wasserfällen",
    category: "day-tours",
    origin: "agadir",
    difficulty: "easy",
    duration: "1 Tag",
    groupSize: "2–15 Personen",
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
      "Ein verstecktes Paradies aus palmengesäumten Schluchten, natürlichen Schwimmbecken und glasklaren Bächen, 35 km von Agadir entfernt.",
    description:
      "Das Paradise Valley ist eines von Marokkos bestgehüteten Geheimnissen — eine üppige Palmenschlucht, geformt vom Tamraght-Fluss, nur 35 km nördlich von Agadir. Wandern Sie zwischen natürlichen Felsbecken, gespeist von eiskalten Bergquellen, schwimmen Sie unter überhängenden Klippen und picknicken Sie im Schatten hoher Palmen. Der perfekte Ausflug abseits des Strandes.",
    highlights: [
      "Natürliche Schwimmbecken in einer Palmenschlucht",
      "Wanderung durch dramatische Canyon-Landschaft",
      "Immouzer-Wasserfall (saisonal)",
      "Wilder Palmenwald und Arganbäume",
      "Kühle Bergluft, keine Menschenmassen",
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
        title: "Ganztägig — Paradise Valley",
        description:
          "Abfahrt aus Agadir um 9:00 Uhr. Ankunft im Paradise Valley um 10:00 Uhr. Geführte Schluchtenwanderung, Schwimmen in natürlichen Becken, Berber-Mittagessen unter den Palmen. Rückkehr nach Agadir bis 17:00 Uhr.",
      },
    ],
    faq: [
      { q: "Gibt es Wasser in den Becken?", a: "Das hängt von der Jahreszeit ab. Der Wasserstand schwankt stark: Nach den Winterregen sind die Becken am schönsten, nach einer langen Trockenperiode schrumpfen manche oder verschwinden ganz. Der Frühling ist die verlässlichste Zeit. Wir sagen Ihnen ehrlich, wie die aktuellen Bedingungen sind, bevor Sie reisen." },
      { q: "Können Kinder diesen Ausflug mitmachen?", a: "Ja, es ist einer unserer familienfreundlichsten Tagesausflüge. Der Weg zu den Hauptbecken ist kurz und unkompliziert, und das Schwimmen steht im Mittelpunkt. Die Sprungfelsen sind optional, und es gibt auch ohne sie genug zu erleben." },
      { q: "Wie früh sollten wir losfahren?", a: "Früh. Das Paradise Valley liegt etwa neunzig Minuten von Agadir entfernt, und vor dem Ansturm am späten Vormittag anzukommen, macht einen erheblichen Unterschied — zwischen einem Becken fast für sich allein und einem, das man mit vielen teilt." },
    ],
    meetingPoint: { lat: 30.5376, lng: -9.5000, name: "Paradise Valley, Tamraght" },
    seoTitle: "Paradise Valley Tagesausflug ab Agadir — Natürliche Schwimmbecken & Palmenschlucht | Marrakech Eco Tours",
    seoDescription: "Versteckte Palmenschlucht mit natürlichen Schwimmbecken, 35 km von Agadir entfernt. Geführte Wanderung durch Canyon-Landschaft, Immouzer-Wasserfall und Berber-Mittagessen inklusive. Ab $30.",
    featured: true,
  },
  {
    id: "10",
    slug: "sous-massa-national-park",
    title: "Von Agadir in den Souss-Massa-Nationalpark — Wildtiertour",
    category: "day-tours",
    origin: "agadir",
    difficulty: "easy",
    duration: "1 Tag",
    groupSize: "2–12 Personen",
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
      "Beobachten Sie den vom Aussterben bedrohten Waldrapp und Flamingos in Marokkos wichtigstem Naturschutzgebiet.",
    description:
      "Der Souss-Massa-Nationalpark erstreckt sich über 70 km Atlantikküste und Flussmündung südlich von Agadir. Er ist eines der letzten Rückzugsgebiete des Waldrapps — einem der seltensten Vögel der Welt — und Heimat von Flamingos, Fischadlern, Austernfischern und afrikanischen Fischottern. Ein Muss für Naturliebhaber.",
    highlights: [
      "Waldrapp — einer der zehn seltensten Vögel der Welt",
      "Flamingokolonien an der Massa-Mündung",
      "Atlantikdünen und Küstenpfad",
      "Vogelbeobachtung am Souss-Fluss von Beobachtungshütten aus",
      "Spaziergang durch Argan- und Akazienwald",
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
        title: "Ganztägig — Souss-Massa",
        description:
          "Abfahrt aus Agadir um 8:00 Uhr. Vormittägliche Beobachtung an der Massa-Mündung nach Waldrapp und Flamingos. Küstenpfad und Wanderung durch die Atlantikdünen nach dem Mittagessen. Rückkehr nach Agadir bis 17:00 Uhr.",
      },
    ],
    meetingPoint: { lat: 30.0559, lng: -9.6320, name: "Souss-Massa National Park, Massa" },
    seoTitle: "Souss-Massa-Nationalpark Wildtiertour ab Agadir — Seltener Waldrapp | Marrakech Eco Tours",
    seoDescription: "Beobachten Sie den vom Aussterben bedrohten Waldrapp und Flamingos in Marokkos wichtigstem Naturschutzgebiet. Fachkundiger Naturführer, Fernglas und Picknick inklusive. Ab $70.",
    featured: true,
  },
  {
    id: "11",
    slug: "taroudant-day-trip-agadir",
    title: "Von Agadir nach Taroudant — Tagesausflug",
    category: "cultural",
    origin: "agadir",
    difficulty: "easy",
    isDayTour: true,
    duration: "1 Tag",
    groupSize: "2–14 Personen",
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
      "Die 'Großmutter von Marrakesch' — uralte rostrote Stadtmauern, Gewürzsouks und ein Berbermarkt, den der Massentourismus verschont hat.",
    description:
      "Taroudant ist das, was Marrakesch vor 50 Jahren war — das volle mittelalterliche Medina-Erlebnis ohne die Touristenmassen. Die ockerfarbenen Stadtmauern aus dem 16. Jahrhundert gehören zu den besterhaltenen Marokkos. Die Gerbereien, der Gewürzsouk und der Silberschmuckmarkt sind authentisch und unaufgeregt. Nur 80 km von Agadir entfernt.",
    highlights: [
      "Stadtmauern aus dem 16. Jahrhundert — die besterhaltenen Marokkos",
      "Authentischer Berbermarkt und Gewürzsouk",
      "Gerbereien von Taroudant (kleiner und weniger überlaufen als in Fès)",
      "Oase und Kasbah von Tiout (optional)",
      "Traditioneller Silberschmuck der Souss-Region",
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
        title: "Ganztägig — Taroudant",
        description:
          "Abfahrt aus Agadir um 8:30 Uhr. Ankunft in Taroudant um 9:30 Uhr. Geführter Medina-Spaziergang, Stadtmauern, Souks und Gerbereien. Optionaler Stopp an der Oase von Tiout. Rückkehr nach Agadir bis 17:00 Uhr.",
      },
    ],
    meetingPoint: { lat: 30.4702, lng: -8.8773, name: "Taroudant, Souss Valley" },
    seoTitle: "Taroudant Tagesausflug ab Agadir — Antike Stadtmauern & Berbermarkt | Marrakech Eco Tours",
    seoDescription: "Entdecken Sie Marokkos besterhaltene Stadtmauern aus dem 16. Jahrhundert und authentische Berbermärkte in Taroudant — 80 km von Agadir, fernab der Touristenmassen. Ab $40.",
    featured: false,
  },
  {
    id: "12",
    slug: "agadir-surf-lesson",
    title: "Surfkurs am Strand von Agadir",
    category: "day-tours",
    origin: "agadir",
    difficulty: "easy",
    duration: "Halbtags (2–3 Stunden)",
    groupSize: "2–8 Personen",
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
      "Lernen Sie auf Agadirs warmen Atlantikwellen surfen — professioneller Unterricht, Board und Neoprenanzug inklusive.",
    description:
      "Die Bucht von Agadir bietet konstante, anfängerfreundliche Atlantikwellen und ganzjährig warmes Wasser — einer der besten Orte Marokkos, um Surfen zu lernen. Unsere zertifizierten Lehrer betreuen Sie vom kompletten Anfänger bis zum fortgeschrittenen Surfer. Board, Neoprenanzug und die gesamte Ausrüstung sind inklusive.",
    highlights: [
      "Professionelle, zertifizierte Surflehrer",
      "Board und Neoprenanzug inklusive",
      "Für Anfänger und Fortgeschrittene",
      "Warme Atlantikwellen in der Bucht von Agadir",
      "Ganzjährig gute Surfbedingungen",
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
        title: "Surf-Session — Bucht von Agadir",
        description:
          "Treffen mit Ihrem Lehrer am Strand zur vereinbarten Zeit. 30 Minuten Landunterricht (Technik + Sicherheit), 90 Minuten im Wasser. Vormittags- und Nachmittagssessions täglich verfügbar.",
      },
    ],
    meetingPoint: { lat: 30.4206, lng: -9.5981, name: "Agadir Beach, Agadir Bay" },
    seoTitle: "Surfkurs Agadir — Surfen lernen an Marokkos Atlantikküste | Marrakech Eco Tours",
    seoDescription: "Lernen Sie in der Bucht von Agadir auf warmen Atlantikwellen surfen, mit einem zertifizierten ISA-Lehrer. Board, Neoprenanzug und Sicherheitseinweisung inklusive. Für Anfänger und Fortgeschrittene. Ab $28.",
    featured: false,
  },
  {
    id: "13",
    slug: "anti-atlas-trekking-agadir",
    title: "Von Agadir in den Anti-Atlas — 3-tägiger Trek",
    category: "trekking",
    origin: "agadir",
    difficulty: "moderate",
    duration: "3 Tage / 2 Nächte",
    groupSize: "2–8 Personen",
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
      "Drei Tage im uralten Anti-Atlas — bemalte Täler, Mandelblüten-Schluchten und Berberdörfer ohne andere Touristen.",
    description:
      "Der Anti-Atlas ist Marokkos meist unterschätztes Gebirge — älter als der Hohe Atlas, ungewöhnlicher in seiner Form und vom Tourismus vollkommen unberührt. Rosafarbene Granitgipfel, safranfarbene Schluchten, blühende Mandelhaine und Berberdörfer, in denen sich das Leben seit Jahrhunderten kaum verändert hat. Ab Agadir — das ist das echte Marokko.",
    highlights: [
      "Uralte rosafarbene Granitgipfel des Anti-Atlas",
      "Tafraoute — das Tal der bemalten Felsen",
      "Mandelblüten-Schluchten (Februar–März)",
      "Berberdörfer ohne andere Touristen",
      "Dramatische Talblicke bei Sonnenuntergang",
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
        title: "Agadir → Tafraoute → Erstes Camp",
        description:
          "Fahrt nach Tafraoute (2,5 Std.). Besuch der bemalten Felsen. Beginn der Wanderung in die Mandelschluchten. Übernachtung in einer Berber-Pension.",
      },
      {
        day: 2,
        title: "Durchquerung des Hochgrats",
        description:
          "Ganztägige Wanderung durch rosafarbene Granitgrate mit Blick auf das Ameln-Tal darunter. Übernachtung im Zelt oder in einer Pension in einem abgelegenen Dorf.",
      },
      {
        day: 3,
        title: "Talabstieg → Agadir",
        description:
          "Abstieg am Morgen durch Arganwald. Traditionelles Mittagessen in einem Dorf. Rückfahrt nach Agadir. Ankunft am späten Nachmittag.",
      },
    ],
    meetingPoint: { lat: 29.7231, lng: -8.9762, name: "Tafraoute, Anti-Atlas Mountains" },
    seoTitle: "Anti-Atlas-Trek 3 Tage ab Agadir — Rosa Granit & bemalte Felsen | Marrakech Eco Tours",
    seoDescription: "3-tägiger Trek durch Marokkos meist unterschätztes Gebirge — rosafarbene Granitgipfel, Mandelblüten-Schluchten und abgelegene Berberdörfer. Private Tour ab Agadir. Ab $280.",
    featured: true,
  },
  {
    id: "14",
    slug: "sahara-2day-agadir",
    title: "Von Agadir in die Sahara — 2-tägige Wüstentour",
    category: "desert",
    origin: "agadir",
    difficulty: "easy",
    duration: "2 Tage / 1 Nacht",
    groupSize: "2–10 Personen",
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
      "Durchqueren Sie den Anti-Atlas und das Draa-Tal bis zur Sahara — Kameltrekking, Wüstencamp und Sonnenaufgang über dem Erg Chegaga.",
    description:
      "Die meisten Sahara-Touren starten in Marrakesch — diese führt Sie über die weniger befahrene südliche Route durch das Draa-Tal zum Erg Chegaga, dem größten und abgelegensten Dünenfeld Marokkos. Ein zweitägiger Ausflug ab Agadir, der sich anfühlt wie eine ganze Woche fernab der Welt.",
    highlights: [
      "Erg Chegaga — das abgelegene Dünenfeld, das nur wenige Touristen erreichen",
      "Palmenoase des Draa-Tals und uralte Kasbahs",
      "Kameltrekking bei Sonnenuntergang und Sonnenaufgang",
      "Luxuriöses Berber-Wüstencamp unter der Milchstraße",
      "Südroute über Tata und Foum Zguid",
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
          "Abfahrt aus Agadir um 6:30 Uhr. Fahrt nach Süden durch die Ausläufer des Anti-Atlas über Tata. Überquerung der Hammada nach Foum Zguid. Kameltrekking in den Erg Chegaga bei Sonnenuntergang. Abendessen im Berbercamp.",
      },
      {
        day: 2,
        title: "Sonnenaufgang → Draa-Tal → Agadir",
        description:
          "Kameltrekking im Morgengrauen für den Sonnenaufgang über den Dünen. Frühstück im Camp. Fahrt nach Norden durch die prächtigen Palmenhaine des Draa-Tals. Ankunft in Agadir am Abend.",
      },
    ],
    meetingPoint: { lat: 29.8671, lng: -7.9386, name: "Erg Chegaga, Western Sahara" },
    seoTitle: "2-tägige Sahara-Tour ab Agadir — Erg-Chegaga-Wüstencamp & Draa-Tal | Marrakech Eco Tours",
    seoDescription: "Die abgelegenen Dünen von Erg Chegaga über die südliche Draa-Tal-Route — Kameltrekking, luxuriöses Wüstencamp und Sonnenaufgang über der Sahara. 2-tägige Tour ab Agadir. Ab $195.",
    featured: true,
  },
  {
    id: "15",
    slug: "souss-valley-cultural-tour",
    title: "Von Agadir ins Souss-Tal — Argan- & Berberkultur-Tour",
    category: "cultural",
    origin: "agadir",
    difficulty: "easy",
    isDayTour: true,
    duration: "1 Tag",
    groupSize: "2–14 Personen",
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
      "Besuchen Sie eine von Frauen geführte Arganöl-Kooperative, ein Honigdorf und genießen Sie ein Berber-Familienessen im Souss-Tal.",
    description:
      "Das Souss-Tal südlich von Agadir ist das Herzland der marokkanischen Arganölproduktion — ein UNESCO-geschütztes Biosphärenreservat, in dem Berberfrauen die Kooperativen leiten, die das begehrteste Öl der Welt herstellen. Besuchen Sie die Kooperative, beobachten Sie den traditionellen Gewinnungsprozess, probieren Sie reine Arganprodukte und teilen Sie ein hausgekochtes Mittagessen mit einer Berberfamilie.",
    highlights: [
      "Besuch und Verkostung in einer von Frauen geführten Arganöl-Kooperative",
      "Honigdorf — Vorführung eines lokalen Imkers",
      "Traditionelles Berber-Familienessen",
      "Panoramablick über das Souss-Tal",
      "Markt von Aït Baha (an Markttagen)",
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
        title: "Ganztägig — Souss-Tal",
        description:
          "Abfahrt aus Agadir um 9:00 Uhr. Besuch der Arganöl-Kooperative (10:00 Uhr). Fahrt zum Honigdorf. Berber-Familienessen (13:00 Uhr). Nachmittäglicher Besuch in Aït Baha oder am Aussichtspunkt über das Tal. Rückkehr nach Agadir bis 17:00 Uhr.",
      },
    ],
    meetingPoint: { lat: 30.0667, lng: -8.6500, name: "Souss Valley, Aït Baha Region" },
    seoTitle: "Souss-Tal Argan- & Kulturtagesausflug ab Agadir — Frauenkooperative | Marrakech Eco Tours",
    seoDescription: "Besuchen Sie eine von Frauen geführte Arganöl-Kooperative, ein Honigdorf und genießen Sie ein Berber-Familienessen im Souss-Tal — Marokkos Arganöl-Herzland. Ab $38.",
    featured: false,
  },
  {
    id: "16",
    slug: "agadir-to-essaouira-day-trip",
    title: "Von Agadir nach Essaouira — Tagesausflug",
    category: "day-tours",
    origin: "agadir",
    difficulty: "easy",
    duration: "1 Tag",
    groupSize: "2–14 Personen",
    reviewCount: 118,
    rating: 4.8,
    price: 40,
    depositAmount: 10,
    heroImage:
      "https://images.unsplash.com/photo-1565985482571-03a42ea59d80?w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1565985482571-03a42ea59d80?w=1200&q=85",
      "https://images.unsplash.com/photo-1624802746702-60ca95bdb605?w=1200&q=85",
      "https://images.unsplash.com/photo-1538053367502-742497073841?w=1200&q=85",
    ],
    shortDescription:
      "Die magischste Stadt an der Atlantikküste — blaue Boote, alte Stadtmauern und die frischesten Meeresfrüchte Marokkos.",
    description:
      "Essaouira liegt zwei Stunden nördlich von Agadir an der Atlantikküste. Die blau-weiße UNESCO-Medina fällt direkt in die brechenden Ozeanwellen. Schlendern Sie über die portugiesischen Stadtmauern aus dem 18. Jahrhundert, kaufen Sie silbernen Berberschmuck von Kunsthandwerkern, essen Sie gegrillte Sardinen auf der Hafenmauer und spüren Sie den berühmten Wind von Essaouira.",
    highlights: [
      "Portugiesische Küstenmauern aus dem 18. Jahrhundert",
      "UNESCO-gelistete Medina und blauer Fischereihafen",
      "Frisches Meeresfrüchte-Mittagessen auf der Hafenmauer",
      "Handwerksateliers: Holzarbeiten, Schmuck, Textilien",
      "Der berühmte Atlantikwind von Essaouira",
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
          "Abfahrt aus Agadir um 8:00 Uhr. Ankunft in Essaouira um 10:00 Uhr. Geführter Spaziergang durch Medina, Stadtmauern und Hafen. Freizeit zum Mittagessen und Erkunden. Abfahrt um 16:30 Uhr. Zurück in Agadir um 18:30 Uhr.",
      },
    ],
    meetingPoint: { lat: 31.5085, lng: -9.7595, name: "Essaouira Medina, Atlantic Coast" },
    seoTitle: "Essaouira Tagesausflug ab Agadir — UNESCO-Medina & Atlantikmauern | Marrakech Eco Tours",
    seoDescription: "Tagesausflug von Agadir nach Essaouiras blau-weißer UNESCO-Medina — portugiesische Stadtmauern aus dem 18. Jahrhundert, frische Meeresfrüchte am Hafen und Handwerksateliers. Ab $40.",
    featured: false,
  },
  {
    id: "17",
    slug: "marrakech-to-chefchaouen-4day",
    title: "Von Marrakesch nach Chefchaouen — 4-tägige Tour zur Blauen Stadt",
    category: "cultural",
    origin: "marrakech",
    difficulty: "easy",
    duration: "4 Tage / 3 Nächte",
    groupSize: "2–12 Personen",
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
      "Vier Tage durch Marokkos ikonischste Kaiserstädte — mit Ziel in den magischen blau getünchten Gassen von Chefchaouen im Rifgebirge.",
    description:
      "Diese Tour verbindet drei von Marokkos fotogensten Reisezielen in vier Tagen. Fahren Sie von Marrakesch nach Norden durch die Zedernwälder des Mittleren Atlas, verbringen Sie einen Tag in Fès el-Bali — der größten mittelalterlichen Stadt der Welt — und weiter nach Chefchaouen, der legendären Blauen Stadt, die sich die Hänge des Rifgebirges hinabzieht. Kobaltblaue Mauern, Gebirgsbäche und kein Massentourismus.",
    highlights: [
      "Chefchaouen — die Blaue Stadt des Rifgebirges",
      "UNESCO-Medina Fès el-Bali und die Chouara-Gerbereien",
      "Zedernwald von Azrou und wilde Berberaffen",
      "Römische Ruinen von Volubilis (UNESCO-Weltkulturerbe)",
      "Meknès — das marokkanische Versailles",
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
        title: "Marrakesch → Ifrane → Fès",
        description:
          "Abfahrt aus Marrakesch um 7:00 Uhr. Überquerung des Mittleren Atlas. Stopp in Ifrane und im Zedernwald von Azrou wegen der Berberaffen. Ankunft in Fès am Abend. Check-in im Riad.",
      },
      {
        day: 2,
        title: "Ganztägig Medina von Fès",
        description:
          "Ganztägig geführte Tour durch Fès el-Bali: Chouara-Gerbereien, Al-Qarawiyyin-Universität, Bou-Inania-Medersa und die alten Souks. Abendspaziergang auf den Medina-Mauern.",
      },
      {
        day: 3,
        title: "Fès → Volubilis → Meknès → Chefchaouen",
        description:
          "Vormittäglicher Besuch von Volubilis — Marokkos besterhaltene römische Ruinen. Fahrt nach Meknès (dem marokkanischen Versailles). Weiterfahrt nach Chefchaouen im Rifgebirge. Ankunft am Abend.",
      },
      {
        day: 4,
        title: "Ganztägig Chefchaouen",
        description:
          "Ganzer Tag in der Blauen Stadt. Geführter Spaziergang durch die blau getünchten Gassen der Medina, den Aussichtspunkt der Spanischen Moschee und den Wasserfall Ras El-Maa. Ende der Tour in Chefchaouen.",
      },
    ],
    meetingPoint: { lat: 35.1688, lng: -5.2636, name: "Chefchaouen, Rif Mountains" },
    seoTitle: "4-Tage-Tour Marrakesch nach Chefchaouen — Fès, Volubilis & Rifgebirge | Marrakech Eco Tours",
    seoDescription: "4-tägige Tour von Marrakesch zu den blau getünchten Gassen Chefchaouens über Fès, die römischen Ruinen von Volubilis und Meknès. Privates 4x4 mit Riad-Unterkunft. Ab $340.",
    featured: false,
  },
  {
    id: "18",
    slug: "marrakech-imperial-cities-5day",
    title: "Marrakesch — Alle 4 Kaiserstädte — 5-tägige Grand Tour",
    category: "cultural",
    origin: "marrakech",
    difficulty: "easy",
    duration: "5 Tage / 4 Nächte",
    groupSize: "2–12 Personen",
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
      "Marokkos vier Kaiserstädte in fünf Tagen — Marrakesch, Meknès, Fès und Rabat — von einem Land, das seit tausend Jahren vier Machtzentren hat.",
    description:
      "Marokkos vier Kaiserstädte — Marrakesch, Meknès, Fès und Rabat — tragen jeweils ein anderes Kapitel der Landesgeschichte in sich. Diese fünftägige Grand-Tour führt Sie durch alle: das labyrinthische Medina von Fès, die monumentalen Tore von Meknès, die UNESCO-Küstenhauptstadt Rabat und zurück in die Rosenstadt Marrakesch. Eine der großen Überlandreisen Afrikas.",
    highlights: [
      "Alle 4 Kaiserstädte: Marrakesch, Meknès, Fès, Rabat",
      "Römische Ruinen von Volubilis (UNESCO-Weltkulturerbe)",
      "Hassan-II.-Moschee in Rabat",
      "Chouara-Gerbereien in Fès",
      "Bab Mansour — das größte Tor Nordafrikas",
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
        title: "Marrakesch → Aït Ben Haddou → Ouarzazate → Midelt",
        description:
          "Fahrt nach Norden von Marrakesch über den Atlas. Stopp bei Aït Ben Haddou. Weiterfahrt nach Midelt zur Übernachtung in der Hochebene zwischen den beiden Atlasgebirgen.",
      },
      {
        day: 2,
        title: "Midelt → Volubilis → Meknès",
        description:
          "Vormittag bei den römischen Ruinen von Volubilis. Nachmittag in Meknès: Bab-Mansour-Tor, die königlichen Kornspeicher und die Medina-Souks. Übernachtung in Meknès.",
      },
      {
        day: 3,
        title: "Meknès → Ganztägig Fès",
        description:
          "Ganzer Tag in Fès el-Bali mit einem fachkundigen Guide. Chouara-Gerbereien, Al-Qarawiyyin, Bou-Inania-Medersa und der alte Juweliersouk. Übernachtung in Fès.",
      },
      {
        day: 4,
        title: "Fès → Rabat",
        description:
          "Fahrt nach Westen an die Atlantikküste nach Rabat. Besuch des Hassan-Turms und des Mausoleums Mohammeds V., der Kasbah der Oudaias und der ummauerten Medina. Übernachtung in Rabat.",
      },
      {
        day: 5,
        title: "Rabat → Casablanca → Marrakesch",
        description:
          "Optionaler Stopp bei der Hassan-II.-Moschee in Casablanca (Außenansicht — die größte Moschee außerhalb Saudi-Arabiens). Weiterfahrt nach Süden nach Marrakesch. Ankunft am Abend.",
      },
    ],
    meetingPoint: { lat: 34.0209, lng: -6.8416, name: "Rabat, Atlantic Capital" },
    seoTitle: "Alle 4 Kaiserstädte Marokkos 5-Tage-Tour — Marrakesch, Meknès, Fès & Rabat | Marrakech Eco Tours",
    seoDescription: "Grand Tour durch Marokkos vier Kaiserstädte in 5 Tagen. Römische Ruinen von Volubilis, Chouara-Gerbereien, Bab Mansour und der Hassan-Turm. Privates 4x4 ab Marrakesch. Ab $480.",
    featured: false,
  },

  // ─────────────────────────────────────────────
  // WÜSTENTOUREN AB MARRAKESCH (neu)
  // ─────────────────────────────────────────────
  {
    id: "23",
    slug: "zagora-2day-marrakech",
    title: "Von Marrakesch nach Zagora — 2-tägige Wüstentour",
    category: "desert",
    origin: "marrakech",
    difficulty: "easy",
    duration: "2 Tage / 1 Nacht",
    groupSize: "2–12 Personen",
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
      "Die schnellste Route zur Sahara ab Marrakesch — über Aït Ben Haddou und die 200 km lange Palmenoase des Draa-Tals zu einem Wüstencamp unter den Sternen bei Zagora.",
    description:
      "Zwei Tage in die Wüste und zurück. Zagora bietet ein echtes Sahara-Erlebnis — Kameltrekking, eine Nacht im Berbercamp und ein riesiger, sternenübersäter Himmel — ohne die längere Fahrt nach Merzouga. Die Route durch das Draa-Tal gehört zu den schönsten Marokkos: 200 km Dattelpalmenoase, uralte Kasbahs und Berberdörfer entlang des Flusses. Die Dünen bei Erg Lehoudi sind ruhiger und weniger überlaufen als Erg Chebbi — der perfekte Trip für Reisende mit wenig Zeit, die trotzdem das volle Wüstenerlebnis wollen.",
    highlights: [
      "Draa-Tal — Marokkos längste Oase, 200 km Dattelpalmen und Kasbahs",
      "Kameltrekking auf den Dünen von Erg Lehoudi bei Sonnenuntergang",
      "Übernachtung im Berber-Wüstencamp mit traditioneller Musik",
      "UNESCO-Ksar Aït Ben Haddou",
      "Tamegroute — eine noch heute geöffnete Koranbibliothek aus dem 14. Jahrhundert",
      "Weniger überlaufen als Merzouga — ein intimeres Wüstenerlebnis",
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
        title: "Marrakesch → Aït Ben Haddou → Draa-Tal → Zagora-Camp",
        description:
          "Abholung von Ihrer Unterkunft in Marrakesch um 7:00 Uhr. Überquerung des Tizi-n'-Tichka-Passes mit Stopp an der UNESCO-Ksar Aït Ben Haddou. Mittagessen in Ouarzazate. Fahrt nach Süden durch die gesamte Länge der Draa-Tal-Oase — Palmenhaine, Lehmziegeldörfer und alte Speicher-Kasbahs säumen die Straße. Stopp in Tamegroute für die Bibliothek aus dem 14. Jahrhundert und die berühmten Töpferwerkstätten mit grüner Glasur. Ankunft im Wüstencamp bei Zagora am späten Nachmittag. Kamelritt bei Sonnenuntergang über die Dünen. Traditionelles Berber-Abendessen mit Musik am Lagerfeuer.",
      },
      {
        day: 2,
        title: "Sonnenaufgang über den Dünen → Draa-Tal → Marrakesch",
        description:
          "Früher Morgenspaziergang oder optionaler Kamelritt zum Wüstensonnenaufgang. Frühstück im Camp. Abfahrt um 8:30 Uhr durch die Draa-Tal-Oase im Morgenlicht — eine ganz andere Atmosphäre als am Nachmittag. Mittagspause in Ouarzazate oder unterwegs. Rückfahrt über den Hohen Atlas. Ankunft in Marrakesch bis 18:30 Uhr.",
      },
    ],
    meetingPoint: { lat: 30.3323, lng: -5.8366, name: "Zagora, Draa Valley" },
    featured: false,
    seoTitle: "Marrakesch nach Zagora 2-tägige Wüstentour — Draa-Tal, Kameltrekking & Berbercamp | Marrakech Eco Tours",
    seoDescription: "Die schnellste Route zur Sahara — Aït Ben Haddou, die 200 km lange Draa-Tal-Palmenoase und ein Kameltrekking in die Dünen. 2-tägige Wüstentour ab Marrakesch mit Berbercamp. Ab $149.",
  },
  {
    id: "24",
    slug: "erg-chegaga-3day-marrakech",
    title: "Erg Chegaga — 3-tägige abgelegene Wüstenexpedition",
    category: "desert",
    origin: "marrakech",
    difficulty: "moderate",
    duration: "3 Tage / 2 Nächte",
    groupSize: "2–8 Personen",
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
      "Marokkos abgelegenste Wüste — Erg Chegaga erfordert eine 4x4-Offroad-Fahrt hinter der letzten Teerstraße, zu Dünen, die 120 m über ein weites, menschenleeres Sandmeer aufragen.",
    description:
      "Erg Chegaga ist die Sahara, die die meisten Touristen nie finden. Anders als der Erg Chebbi bei Merzouga — wo Kamelkarawanen in Sichtweite der Hotels aneinander vorbeiziehen — erfordert Chegaga eine Offroad-4x4-Fahrt jenseits des Teerbelags von M'Hamid, dem letzten Dorf vor der echten Sahara. Das Dünenfeld erstreckt sich über Kilometer, kaum eine andere Seele in Sicht. Drei Tage ab Marrakesch über Aït Ben Haddou, das Safrantal von Taliouine und den Rand der bekannten Welt — dann zwei Nächte tief in der Wüste, wo Stille der einzige Klang ist.",
    highlights: [
      "Erg Chegaga — weniger Touristen, 120 m hohe Dünen, tiefe Stille",
      "4x4-Offroad-Wüstendurchquerung von M'Hamid ins Dünenfeld",
      "2 Nächte in einem Wüstencamp ohne andere Camps in Sicht",
      "Safrantal von Taliouine — Marokkos Gewürzhauptstadt",
      "UNESCO-Ksar Aït Ben Haddou",
      "Kameltrekking bei Sonnenauf- und -untergang in einem privaten Winkel der Sahara",
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
        title: "Marrakesch → Aït Ben Haddou → Taliouine → M'Hamid",
        description:
          "Abholung um 7:00 Uhr. Überquerung des Tizi-n'-Tichka-Passes und Besuch von Aït Ben Haddou. Weiterfahrt südlich durch Ouarzazate und ins Safrantal bei Taliouine — Marokkos Safranhauptstadt — für einen kurzen Stopp. Weiterfahrt nach M'Hamid, dem letzten Ort vor der offenen Sahara. Abendessen und Übernachtung in M'Hamid.",
      },
      {
        day: 2,
        title: "M'Hamid → Erg Chegaga (4x4-Durchquerung)",
        description:
          "Nach dem Frühstück geht es in den 4x4 — hier endet die Teerstraße. Zwei bis drei Stunden Offroad-Fahrt durch offene Wüste, vorbei an verstreuten Nomadenlagern und fossilübersäten Hammada-Ebenen. Ankunft am Rand des Erg Chegaga gegen Mittag. Kameltrekking tief ins Dünenfeld. Das Camp wird im Herzen des Erg aufgeschlagen — keine Straßen, keine anderen Camps, keine Lichtverschmutzung. Sonnenuntergang über den Dünen. Traditionelles Abendessen und ein Himmel voller Sterne.",
      },
      {
        day: 3,
        title: "Sonnenaufgang in der Sahara → M'Hamid → Marrakesch",
        description:
          "Weckruf vor Sonnenaufgang, um den Dünenkamm für den Sonnenaufgang zu besteigen. Frühstück im Camp. Der 4x4 fährt durch die Wüste zurück nach M'Hamid. Beginn der langen, wunderschönen Fahrt nach Norden durch Zagora, das Draa-Tal und über den Hohen Atlas zurück. Ankunft in Marrakesch bis 19:30 Uhr.",
      },
    ],
    faq: [
      { q: "Wie unterscheidet sich Erg Chegaga von Merzouga?", a: "Chegaga ist abgelegener und ruhiger. Das Dünenfeld ist breiter, aber niedriger als Erg Chebbi, und die letzte Etappe erfolgt per 4x4 durch offene Wüste statt auf befestigter Straße. Möglicherweise sehen Sie überhaupt kein anderes Camp — genau das ist der Grund, sich dafür zu entscheiden." },
      { q: "Warum wird diese Reise als 'moderate' statt 'easy' eingestuft?", a: "Wegen der Anreise. Um Chegaga zu erreichen, ist ein 4x4-Transfer durch offene Wüste nötig, der anspruchsvoller ist als die Straßenroute nach Merzouga. Das Gehen selbst ist nicht fordernd — die Einstufung spiegelt die Reise wider, nicht die körperliche Anstrengung." },
      { q: "Lohnt sich der zusätzliche Aufwand für Erg Chegaga gegenüber Merzouga?", a: "Wenn Sie wirklich Einsamkeit suchen, ja. Wenn Sie die hohen, kunstvoll geformten Dünen aus den Fotos mit unkomplizierter Anreise wollen, ist Merzouga die bessere Nutzung derselben drei Tage. Keines von beiden ist ein Trostpreis — es sind unterschiedliche Erlebnisse." },
    ],
    meetingPoint: { lat: 29.8250, lng: -5.7246, name: "M'Hamid, Gateway to Erg Chegaga" },
    featured: true,
    seoTitle: "Erg Chegaga 3-tägige Wüstentour ab Marrakesch — Abgelegene Dünen & 4x4-Sahara-Expedition | Marrakech Eco Tours",
    seoDescription: "Marokkos abgelegenstes Wüstenerlebnis — 3 Tage ab Marrakesch zum Erg Chegaga per 4x4-Offroad-Durchquerung, 2 Nächte in einem privaten Berbercamp. Keine Menschenmassen, 120 m hohe Dünen. Ab $320.",
  },
  {
    id: "25",
    slug: "desert-4day-marrakech",
    title: "Marrakesch Wüsten-Grand-Tour — 4 Tage",
    category: "desert",
    origin: "marrakech",
    difficulty: "easy",
    duration: "4 Tage / 3 Nächte",
    groupSize: "2–10 Personen",
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
      "Vier Tage durch den gesamten Süden Marokkos — Berge, Schluchten, Filmstudios, eine Nacht in der Wüste und die Straße der Tausend Kasbahs — bis zum Erg Chebbi und zurück.",
    description:
      "Dies ist die ultimative Wüstenrundreise ab Marrakesch. Vier Tage, um alles zu erleben, was der Süden Marokkos zu bieten hat: die Dramatik des Hohen Atlas, die filmreife Pracht von Aït Ben Haddou (Drehort von Game of Thrones, Gladiator und Lawrence von Arabien), die 400 m hohen Wände der Todra-Schlucht, eine ganze Nacht in einem Erg-Chebbi-Wüstencamp und die Rückreise über die legendäre Straße der Tausend Kasbahs. Eine Tour mit genug Zeit zum Durchatmen, Entdecken und wirklichen Aufsaugen einer der spektakulärsten Landschaften der Erde.",
    highlights: [
      "Ganze Nacht in einem Erg-Chebbi-Wüstencamp — Kameltrekking bei Sonnenauf- und -untergang",
      "Todra-Schlucht — Marokkos dramatischste Schlucht (400 m Wände, 4 km Weg)",
      "UNESCO-Ksar Aït Ben Haddou — Drehort von Gladiator und Game of Thrones",
      "Dades-Tal — Tal der Tausend Kasbahs",
      "Oase von Skoura — ein Meer aus Dattelpalmen und alten Lehmkasbahs",
      "Rückreise über die Straße der Tausend Kasbahs — Draa-Tal-Korridor",
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
        title: "Marrakesch → Aït Ben Haddou → Ouarzazate → Dades-Tal",
        description:
          "Abholung um 7:00 Uhr. Aufstieg über den Tizi-n'-Tichka-Pass durch den Hohen Atlas (2.260 m). Stopp an der UNESCO-Ksar Aït Ben Haddou für eine ausführliche 45-minütige Besichtigung. Mittagspause in Ouarzazate mit der Option, die Atlas-Filmstudios zu besuchen (Drehort von Gladiator und Game of Thrones). Weiterfahrt durch das dramatische Dades-Tal — rosarote Kasbahs, Oasendörfer und die Felsformationen der 'Affenfinger'. Ankunft im Hotel im Dades-Tal bis 17:00 Uhr. Abendessen und Übernachtung.",
      },
      {
        day: 2,
        title: "Dades-Tal → Todra-Schlucht → Merzouga-Wüstencamp",
        description:
          "Frühstück im Hotel. Wanderung an der engsten Stelle der Todra-Schlucht — ein 40 m breiter Korridor zwischen 400 m hohen Kalksteinwänden mit einem klaren Fluss darunter. Weiterfahrt nach Osten durch die vorsaharische Ebene, vorbei an Oasenstädten und Nomadenweiden. Ankunft in Merzouga am Nachmittag. Aufsteigen auf das Kamel für den Sonnenuntergangs-Trek in die hoch aufragenden Dünen von Erg Chebbi. Ankunft im Camp, während sich der Himmel rot färbt. Traditioneller marokkanischer Tajine zum Abendessen, Berbermusik am Feuer und ein sternenübersäter Himmel.",
      },
      {
        day: 3,
        title: "Sahara-Sonnenaufgang → Dorf Merzouga → Ouarzazate",
        description:
          "Aufstehen um 5:30 Uhr, um die Düne zu besteigen und das Erwachen der Sahara zu beobachten. Rückritt mit dem Kamel zum Camp, Frühstück und Auffrischen in der Pension von Merzouga. Beginn der Rückreise über die 'Straße der Tausend Kasbahs' — eine andere, südlichere Route durch Tazarine und N'Kob, eine Reihe alter Lehmkasbahs entlang einer alten Karawanenroute. Ankunft in Ouarzazate am Abend. Übernachtung im Hotel.",
      },
      {
        day: 4,
        title: "Ouarzazate → Aït Ben Haddou → Tizi n'Tichka → Marrakesch",
        description:
          "Vormittäglicher Besuch der Taourirt-Kasbah in Ouarzazate (optional). Kurzer Zwischenstopp bei Aït Ben Haddou für einen anderen Blickwinkel im Morgenlicht. Rückfahrt über den Tizi-n'-Tichka-Pass mit Panoramablick auf den Atlas. Ankunft in Marrakesch bis 17:00 Uhr.",
      },
    ],
    meetingPoint: { lat: 31.0580, lng: -4.0127, name: "Merzouga, Erg Chebbi Sahara" },
    featured: true,
    seoTitle: "4-tägige Wüstentour ab Marrakesch — Erg Chebbi, Todra-Schlucht & Straße der Tausend Kasbahs | Marrakech Eco Tours",
    seoDescription: "Die komplette Wüstenrundreise ab Marrakesch — 4 Tage durch Aït Ben Haddou, die Todra-Schlucht, ein Erg-Chebbi-Wüstencamp und die Straße der Tausend Kasbahs. Ab $360.",
  },

  // ─────────────────────────────────────────────
  // WÜSTENTOUREN AB AGADIR (neu)
  // ─────────────────────────────────────────────
  {
    id: "26",
    slug: "merzouga-3day-agadir",
    title: "Von Agadir nach Merzouga — 3-tägige Sahara-Wüstentour",
    category: "desert",
    origin: "agadir",
    difficulty: "easy",
    duration: "3 Tage / 2 Nächte",
    groupSize: "2–10 Personen",
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
      "Von Agadirs Atlantikküste zum ikonischsten Dünenfeld der Sahara — über Taroudant, Taliouine, Aït Ben Haddou und die Todra-Schlucht zu einem Kameltrekking bei Sonnenuntergang auf dem Erg Chebbi.",
    description:
      "Die meisten Sahara-Touren starten in Marrakesch. Diese beginnt in Agadir — und die südliche Route bietet zwei Orte, die den meisten Touristen entgehen: Taroudant, Marokkos besterhaltene mittelalterliche Stadtmauernstadt, und Taliouine, die Safranhauptstadt der Welt. Von dort folgt die Route dem klassischen Weg nach Osten über Ouarzazate, Aït Ben Haddou und die Todra-Schlucht, bevor Sie rechtzeitig zum Kameltrekking bei Sonnenuntergang den Erg Chebbi erreichen — das dramatischste Dünenfeld der Sahara. Drei Tage, die die gesamte Breite Südmarokkos abdecken.",
    highlights: [
      "Erg Chebbi — Kameltrekking bei Sonnenuntergang in 160 m hohe Dünen",
      "Übernachtung im Berber-Wüstencamp unter den Sternen",
      "Taroudant — Marokkos schönste mittelalterliche Stadtmauernstadt",
      "Taliouine — die Safranhauptstadt der Welt",
      "UNESCO-Ksar Aït Ben Haddou",
      "Wanderung durch die Todra-Schlucht (400 m hohe Wände)",
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
        title: "Agadir → Taroudant → Taliouine → Aït Ben Haddou → Dades-Tal",
        description:
          "Frühe Abholung von Ihrem Hotel in Agadir um 6:30 Uhr. Fahrt nach Osten nach Taroudant (1 Std.) — Spaziergang über die Stadtmauern aus dem 16. Jahrhundert und den Gewürzsouk dieser makellos erhaltenen mittelalterlichen Stadt. Weiterfahrt nach Taliouine, Marokkos Safran-Herzland, für einen kurzen Stopp. Fahrt durch Ouarzazate und Besuch der UNESCO-Ksar Aït Ben Haddou. Weiterfahrt durch das Dades-Tal. Ankunft im Hotel bis 18:00 Uhr. Abendessen und Übernachtung.",
      },
      {
        day: 2,
        title: "Dades-Tal → Todra-Schlucht → Erg-Chebbi-Camp",
        description:
          "Frühstück im Hotel. Wanderung auf dem Grund der Todra-Schlucht — 400 m hohe rosafarbene Kalksteinwände rahmen einen schmalen Flusskorridor. Fahrt nach Osten durch die Wüstenebenen nach Merzouga. Aufsteigen auf das Kamel bei Sonnenuntergang und Ritt in die hoch aufragenden Dünen von Erg Chebbi. Ankunft im Camp, während der Himmel dunkler wird. Traditionelles Tajine-Abendessen, Berbermusik und Sternenbeobachtung in der Dunkelheit der Sahara.",
      },
      {
        day: 3,
        title: "Sahara-Sonnenaufgang → Merzouga → Agadir",
        description:
          "Aufstehen um 5:30 Uhr für den Sonnenaufgang über den Dünen. Rückritt mit dem Kamel, Frühstück im Camp, Auffrischen in Merzouga. Beginn der langen Rückreise nach Westen und Süden — über Rissani, Tazarine und die Wüstenebenen, zurück über den Tizi-n'-Tichka-Pass und hinunter nach Agadir. Ankunft zwischen 20:00 und 21:00 Uhr.",
      },
    ],
    meetingPoint: { lat: 30.4202, lng: -9.5981, name: "Agadir City Centre" },
    featured: false,
    seoTitle: "Agadir nach Merzouga 3-tägige Wüstentour — Erg Chebbi, Taroudant & Taliouine | Marrakech Eco Tours",
    seoDescription: "Von Agadirs Atlantikküste in die Sahara — über Taroudant, Taliouine, Aït Ben Haddou und ein Kameltrekking bei Sonnenuntergang auf dem Erg Chebbi. 3-tägige Wüstentour mit Berbercamp. Ab $295.",
  },
  {
    id: "27",
    slug: "zagora-2day-agadir",
    title: "Von Agadir nach Zagora — 2-tägige Wüstentour",
    category: "desert",
    origin: "agadir",
    difficulty: "easy",
    duration: "2 Tage / 1 Nacht",
    groupSize: "2–10 Personen",
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
      "Zwei Tage von Agadirs Atlantikstränden in die Wüste — über die Stadtmauern von Taroudant, die Teppichhauptstadt Taznakht und die 200 km lange Draa-Tal-Oase zu den Dünen von Zagora.",
    description:
      "Die schnellste Route von Agadir in die Wüste führt nicht über Marrakesch. Sie verläuft nach Osten über Taroudant und Taznakht und erreicht das Draa-Tal von Süden — Marokkos längste Oase, ein Band aus Dattelpalmen, alten Kasbahs und Berbersiedlungen, das sich 200 km durch den vorsaharischen Süden zieht. Die Dünen von Zagora sind ruhiger als die von Merzouga, die Atmosphäre intimer, und nach einer Nacht im traditionellen Berbercamp mit Musik unter einem gewaltigen schwarzen Himmel fühlt sich die Rückfahrt vollkommen lohnenswert an.",
    highlights: [
      "Dünen von Zagora — ein ruhigeres, intimeres Wüstencamp-Erlebnis",
      "Draa-Tal — 200 km Dattelpalmenoase und alte Kasbahs",
      "Taroudant — die besterhaltenen mittelalterlichen Stadtmauern Marokkos",
      "Taznakht — Hauptstadt der Berber-Teppichweberei",
      "Kameltrekking bei Sonnenuntergang und Sternenbeobachtung in der Wüste",
      "Die Koranbibliothek von Tamegroute aus dem 14. Jahrhundert",
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
        title: "Agadir → Taroudant → Taznakht → Draa-Tal → Zagora",
        description:
          "Abholung von Ihrem Hotel in Agadir um 7:30 Uhr. Fahrt nach Osten nach Taroudant — Spaziergang über die ockerfarbenen Stadtmauern aus dem 16. Jahrhundert und den Berbermarkt. Weiterfahrt nach Taznakht, der Hauptstadt der Berber-Teppichweberei. Eintritt ins Draa-Tal von Westen und Fahrt nach Süden durch Dattelpalmenhaine und alte Dörfer bis Zagora. Ankunft im Wüstencamp rechtzeitig für einen Kamelritt bei Sonnenuntergang über die Dünen. Traditionelles Berber-Abendessen mit Musik unter den Sternen.",
      },
      {
        day: 2,
        title: "Sonnenaufgang → Tamegroute → Draa-Tal → Agadir",
        description:
          "Optionaler früher Kamelritt für den Sonnenaufgang. Frühstück im Camp. Stopp in Tamegroute — einem Dorf mit einer Koranbibliothek aus dem 14. Jahrhundert mit handilluminierten Manuskripten und einer berühmten grün glasierten Töpferkooperative. Fahrt nach Norden durch die gesamte Länge des Draa-Tals im Morgenlicht. Rückfahrt über Ouarzazate nach Agadir. Ankunft bis 18:30 Uhr.",
      },
    ],
    meetingPoint: { lat: 30.4202, lng: -9.5981, name: "Agadir City Centre" },
    featured: false,
    seoTitle: "Agadir nach Zagora 2-tägige Wüstentour — Draa-Tal, Taroudant & Berbercamp | Marrakech Eco Tours",
    seoDescription: "Von Agadirs Küste in die Wüste von Zagora in 2 Tagen — über Taroudant, die 200 km lange Draa-Tal-Palmenoase und ein Kameltrekking bei Sonnenuntergang. Berbercamp unter den Sternen. Ab $179.",
  },
  {
    id: "28",
    slug: "erg-chegaga-3day-agadir",
    title: "Von Agadir zum Erg Chegaga — 3-tägige abgelegene Wüstentour",
    category: "desert",
    origin: "agadir",
    difficulty: "moderate",
    duration: "3 Tage / 2 Nächte",
    groupSize: "2–8 Personen",
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
      "Agadirs beste Sahara-Route — nach Süden durch die Ausläufer des Anti-Atlas und das Draa-Tal, um mit dem 4x4 den Erg Chegaga zu erreichen, Marokkos abgelegenstes Dünenfeld.",
    description:
      "Von Agadir aus ist die Route zum Erg Chegaga die natürlichste in Marokko. Fahren Sie nach Süden durch die Ausläufer des Anti-Atlas über Tata und Foum Zguid und erreichen Sie den Rand der Sahara von Westen — ein ganz anderer Zugang als die Standardroute über Marrakesch. Erg Chegaga ist die Sahara für alle, die weniger Touristen, insgesamt größere Dünen und ein echteres Gefühl von Wildnis suchen. Die 4x4-Durchquerung ab M'Hamid ist Teil des Abenteuers. Zwei Nächte tief in der Wüste, fernab von allem.",
    highlights: [
      "Erg Chegaga — Marokkos abgelegenstes Dünenfeld, erreichbar per 4x4",
      "Einzigartiger südlicher Zugang über die Ausläufer des Anti-Atlas und Tata",
      "2 Nächte im Berbercamp ohne andere Camps in Sicht",
      "Rückfahrt durch das Draa-Tal — vollständiger 200 km langer Oasenkorridor",
      "Kameltrekking bei Sonnenauf- und -untergang auf weiten, leeren Dünen",
      "Einige der dunkelsten Himmel Nordafrikas für die Sternenbeobachtung",
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
        title: "Agadir → Ausläufer des Anti-Atlas → Tata → Foum Zguid / M'Hamid",
        description:
          "Frühe Abholung in Agadir um 6:30 Uhr. Fahrt nach Süden durch die Ausläufer des Anti-Atlas — das älteste Gebirge Marokkos, ungewöhnlicher und uralter wirkend als der Hohe Atlas. Durchfahrt durch die Oasenstadt Tata und weiter nach Foum Zguid oder M'Hamid, den letzten Siedlungen vor Erg Chegaga. Abendessen und Übernachtung.",
      },
      {
        day: 2,
        title: "4x4-Durchquerung zum Erg Chegaga",
        description:
          "Nach dem Frühstück endet die Teerstraße. Einsteigen in den 4x4 für die Offroad-Durchquerung — zwei bis drei Stunden Wüstenfahrt durch offene Hammada, Fossilienebenen und verstreute Akazien. Ankunft am Rand des Erg Chegaga gegen Mittag. Kameltrekking ins Dünenfeld. Das Camp wird tief im Erg aufgeschlagen. Sonnenuntergang über den Dünen, Abendessen im Feuerschein, eine Stille, die Sie nicht vergessen werden.",
      },
      {
        day: 3,
        title: "Sonnenaufgang → M'Hamid → Draa-Tal → Agadir",
        description:
          "Aufstehen vor Sonnenaufgang für den vollen Sonnenaufgang über den Dünen. Frühstück im Camp. Der 4x4 fährt durch die Wüste zurück nach M'Hamid. Fahrt nach Norden durch das Draa-Tal — eine der schönsten Fahrstrecken Marokkos — und zurück nach Agadir über Zagora und Ouarzazate. Ankunft in Agadir bis 20:00 Uhr.",
      },
    ],
    meetingPoint: { lat: 30.4202, lng: -9.5981, name: "Agadir City Centre" },
    featured: false,
    seoTitle: "Agadir zum Erg Chegaga 3-tägige Wüstentour — Abgelegene Sahara & 4x4-Expedition | Marrakech Eco Tours",
    seoDescription: "Marokkos abgelegenste Wüste ab Agadir — 3 Tage durch den Anti-Atlas zum Erg Chegaga per 4x4, 2 Nächte in einem privaten Berbercamp. Weniger Touristen, mehr Stille. Ab $345.",
  },
  {
    id: "29",
    slug: "desert-4day-agadir",
    title: "Agadir Wüsten-Grand-Tour — 4 Tage",
    category: "desert",
    origin: "agadir",
    difficulty: "easy",
    duration: "4 Tage / 3 Nächte",
    groupSize: "2–10 Personen",
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
      "Vier Tage von der Atlantikküste in die Sahara und zurück — Taroudant, Aït Ben Haddou, Todra-Schlucht, eine ganze Nacht im Erg-Chebbi-Wüstencamp und die Straße der Tausend Kasbahs.",
    description:
      "Die ultimative Wüstenrundreise ab Agadir — mit einem Vorteil gegenüber jeder Marrakesch-Tour: zwei Reiseziele, die Marrakesch-Touristen entgehen. Die makellos erhaltenen Stadtmauern Taroudants aus dem 16. Jahrhundert und die Safranfelder von Taliouine sind den frühen Start wert. Von dort folgt die Route dem großen südlichen Bogen: Aït Ben Haddou, Ouarzazate, das Dades-Tal, die Todra-Schlucht und der Erg Chebbi — das ikonischste Dünenfeld Marokkos. Vier Tage, die Ihnen die volle Breite und Tiefe des marokkanischen Südens zeigen.",
    highlights: [
      "Erg-Chebbi-Wüstencamp — zwei Kameltrekkings, eine ganze Wüstennacht",
      "Taroudant — mittelalterliche Stadtmauernstadt, einzigartig auf der Agadir-Route",
      "Taliouine — die Safranhauptstadt der Welt (einzigartig auf der Agadir-Route)",
      "UNESCO-Ksar Aït Ben Haddou",
      "Todra-Schlucht — Wanderung zwischen 400 m hohen Canyon-Wänden",
      "Straße der Tausend Kasbahs — Rückfahrt über die alte Karawanenroute",
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
        title: "Agadir → Taroudant → Taliouine → Aït Ben Haddou → Dades-Tal",
        description:
          "Abholung von Ihrem Hotel in Agadir um 6:30 Uhr. Fahrt nach Osten nach Taroudant — Erkundung der besterhaltenen Stadtmauern Marokkos aus dem 16. Jahrhundert und des alten Berber-Gewürzmarkts. Weiterfahrt nach Taliouine für den Besuch einer Safran-Kooperative. Fahrt durch Ouarzazate mit Stopp an der UNESCO-Ksar Aït Ben Haddou. Weiterfahrt durch das dramatische Dades-Tal. Ankunft im Hotel bis 18:00 Uhr. Abendessen und Übernachtung.",
      },
      {
        day: 2,
        title: "Dades-Tal → Todra-Schlucht → Erg-Chebbi-Camp",
        description:
          "Frühstück im Hotel. Wanderung auf dem Grund der Todra-Schlucht — 400 m hohe Kalksteinwände, ein Fluss darunter und am frühen Morgen fast keine Menschenmassen. Fahrt nach Osten durch die vorsaharische Oasenlandschaft nach Merzouga. Aufsteigen auf das Kamel am Dünenrand und Ritt in den Erg Chebbi, während die Sonne untergeht. Ankunft im Camp bei Einbruch der Dunkelheit. Traditionelles Tajine, Gnaoua-Musik, Sternenbeobachtung am Sahara-Himmel.",
      },
      {
        day: 3,
        title: "Sahara-Sonnenaufgang → Straße der Tausend Kasbahs → Ouarzazate",
        description:
          "Weckruf vor Sonnenaufgang für den Blick über die Dünen. Rückritt mit dem Kamel zum Camp. Frühstück und Auffrischen. Fahrt über die Straße der Tausend Kasbahs — eine südliche Rückroute durch Tazarine, N'Kob und den Draa-Tal-Korridor, gesäumt von alten Lehmkasbahs, die einst den transsaharischen Karawanen dienten. Ankunft in Ouarzazate am Abend. Übernachtung im Hotel.",
      },
      {
        day: 4,
        title: "Ouarzazate → Aït Ben Haddou → Tizi n'Tichka → Agadir",
        description:
          "Optionaler vormittäglicher Besuch der Atlas-Filmstudios oder der Taourirt-Kasbah in Ouarzazate. Kurzer Stopp bei Aït Ben Haddou im Morgenlicht. Rückfahrt über Marrakesch und den Anti-Atlas nach Agadir. Ankunft bis 20:00 Uhr.",
      },
    ],
    meetingPoint: { lat: 30.4202, lng: -9.5981, name: "Agadir City Centre" },
    featured: false,
    seoTitle: "4-tägige Wüstentour ab Agadir — Erg Chebbi, Taroudant, Todra-Schlucht & Straße der 1000 Kasbahs | Marrakech Eco Tours",
    seoDescription: "Die komplette Wüsten-Grand-Tour ab Agadir — 4 Tage durch Taroudant, Aït Ben Haddou, die Todra-Schlucht, ein Erg-Chebbi-Camp und die Straße der Tausend Kasbahs. Ab $420.",
  },

  // ─────────────────────────────────────────────
  // KAISERSTÄDTE AB AGADIR
  // ─────────────────────────────────────────────
  {
    id: "19",
    slug: "agadir-to-fes-4day",
    title: "Von Agadir nach Fès — 4-tägige Rundreise der Kaiserstädte",
    category: "cultural",
    origin: "agadir",
    difficulty: "easy",
    duration: "4 Tage / 3 Nächte",
    groupSize: "2–12 Personen",
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
      "Von der Atlantikküste ins mittelalterliche Herz Marokkos — Marrakesch, der Hohe Atlas, die Zedernwälder und die alte Medina von Fès.",
    description:
      "Ab Agadir führt diese viertägige Reise von der Atlantikküste über Marrakesch und den Hohen Atlas bis nach Fès el-Bali — der größten noch bewohnten mittelalterlichen Stadt der Welt. Überqueren Sie den Tizi-n'-Tichka-Pass, halten Sie an der UNESCO-Ksar Aït Ben Haddou, durchstreifen Sie die Zedernwälder des Mittleren Atlas, wo wilde Berberaffen leben, und verlieren Sie sich in den labyrinthischen Souks von Fès.",
    highlights: [
      "Gebirgspass Tizi n'Tichka (2.260 m)",
      "UNESCO-Weltkulturerbe Ksar Aït Ben Haddou",
      "Ifrane — Marokkos alpines Dorf",
      "Zedernwald von Azrou und Berberaffen",
      "Medina Fès el-Bali und die Chouara-Gerbereien",
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
        title: "Agadir → Marrakesch",
        description:
          "Abfahrt aus Agadir am Morgen. Fahrt nach Norden entlang der Atlantikebene nach Marrakesch (3 Std.). Freier Nachmittag oder optionaler Medina-Spaziergang. Übernachtung in einem Riad in Marrakesch.",
      },
      {
        day: 2,
        title: "Marrakesch → Tizi n'Tichka → Aït Ben Haddou → Midelt",
        description:
          "Aufstieg über den Atlas via Tizi n'Tichka. Besuch von Aït Ben Haddou. Weiterfahrt durch das Ziz-Tal nach Midelt zur Übernachtung.",
      },
      {
        day: 3,
        title: "Midelt → Ifrane → Zedernwald von Azrou → Fès",
        description:
          "Fahrt durch den Mittleren Atlas. Stopp in Ifrane und im Zedernwald von Azrou zur Beobachtung wilder Berberaffen. Ankunft in Fès am Nachmittag. Check-in im Riad.",
      },
      {
        day: 4,
        title: "Ganztägig Medina von Fès",
        description:
          "Geführte Erkundung von Fès el-Bali: Chouara-Gerbereien, Al-Qarawiyyin-Universität, Bou-Inania-Medersa und die labyrinthischen Souks. Ende der Tour in Fès.",
      },
    ],
    meetingPoint: { lat: 34.0331, lng: -5.0003, name: "Fes el-Bali, Imperial City" },
    seoTitle: "4-Tage-Tour Agadir nach Fès — Hoher Atlas, Aït Ben Haddou & Kaiserstadt | Marrakech Eco Tours",
    seoDescription: "Fahrt von Agadir nach Fès über Marrakesch, den Tizi n'Tichka und die Zedernwälder des Mittleren Atlas. 4-tägige private 4x4-Tour mit Riad-Unterkunft. Ab $360.",
    featured: false,
  },
  {
    id: "20",
    slug: "agadir-to-chefchaouen-5day",
    title: "Von Agadir nach Chefchaouen — 5-tägige Tour zur Blauen Stadt",
    category: "cultural",
    origin: "agadir",
    difficulty: "easy",
    duration: "5 Tage / 4 Nächte",
    groupSize: "2–12 Personen",
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
      "Fünf Tage von der Atlantikküste zu den blau getünchten Gassen Chefchaouens — über Marrakesch, Fès und die römischen Ruinen von Volubilis.",
    description:
      "Diese fünftägige Rundreise beginnt in Agadir und verbindet Marokkos fotogenste Reiseziele. Fahren Sie hinauf nach Marrakesch, überqueren Sie die Zedernwälder des Mittleren Atlas, erkunden Sie Fès el-Bali — die größte mittelalterliche Stadt der Welt —, besuchen Sie die römischen Ruinen von Volubilis und die kaiserlichen Tore von Meknès, und beenden Sie die Reise in Chefchaouen, der legendären Blauen Stadt, die sich die Hänge des Rifgebirges hinabzieht.",
    highlights: [
      "Chefchaouen — die Blaue Stadt des Rifgebirges",
      "UNESCO-Medina Fès el-Bali und die Chouara-Gerbereien",
      "Zedernwald von Azrou und wilde Berberaffen",
      "Römische Ruinen von Volubilis (UNESCO-Weltkulturerbe)",
      "Meknès — das marokkanische Versailles",
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
        title: "Agadir → Marrakesch",
        description:
          "Abfahrt aus Agadir am Morgen. Fahrt nach Norden nach Marrakesch (3 Std.). Freier Nachmittag. Übernachtung in einem Riad in Marrakesch.",
      },
      {
        day: 2,
        title: "Marrakesch → Ifrane → Fès",
        description:
          "Frühe Abfahrt aus Marrakesch. Überquerung des Mittleren Atlas. Stopp in Ifrane und im Zedernwald von Azrou wegen der Berberaffen. Ankunft in Fès am Abend. Check-in im Riad.",
      },
      {
        day: 3,
        title: "Ganztägig Medina von Fès",
        description:
          "Ganztägig geführte Tour durch Fès el-Bali: Chouara-Gerbereien, Al-Qarawiyyin-Universität, Bou-Inania-Medersa und die alten Souks. Abendspaziergang auf den Medina-Mauern.",
      },
      {
        day: 4,
        title: "Fès → Volubilis → Meknès → Chefchaouen",
        description:
          "Vormittäglicher Besuch von Volubilis — Marokkos besterhaltene römische Ruinen. Fahrt nach Meknès (dem marokkanischen Versailles). Weiterfahrt nach Chefchaouen im Rifgebirge. Ankunft am Abend.",
      },
      {
        day: 5,
        title: "Ganztägig Chefchaouen",
        description:
          "Ganzer Tag in der Blauen Stadt. Geführter Spaziergang durch die blau getünchten Gassen der Medina, den Aussichtspunkt der Spanischen Moschee und den Wasserfall Ras El-Maa. Ende der Tour in Chefchaouen.",
      },
    ],
    meetingPoint: { lat: 35.1688, lng: -5.2636, name: "Chefchaouen, Rif Mountains" },
    seoTitle: "5-Tage-Tour Agadir nach Chefchaouen — Fès, Volubilis & Blaue Stadt | Marrakech Eco Tours",
    seoDescription: "5-tägige Tour von Agadir zu Marokkos Blauer Stadt über Marrakesch, Fès, die römischen Ruinen von Volubilis und die kaiserlichen Tore von Meknès. Privates 4x4 mit Riads. Ab $420.",
    featured: false,
  },
  {
    id: "21",
    slug: "agadir-imperial-cities-6day",
    title: "Agadir — Alle 4 Kaiserstädte — 6-tägige Grand Tour",
    category: "cultural",
    origin: "agadir",
    difficulty: "easy",
    duration: "6 Tage / 5 Nächte",
    groupSize: "2–12 Personen",
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
      "Marokkos vier Kaiserstädte in sechs Tagen ab der Atlantikküste — Marrakesch, Meknès, Fès und Rabat.",
    description:
      "Ab Agadir führt diese sechstägige Grand-Tour durch alle vier Kaiserstädte Marokkos — Marrakesch, Meknès, Fès und Rabat —, von denen jede ein anderes Kapitel der tausendjährigen Landesgeschichte trägt. Von der Rosenstadt Marrakesch über die labyrinthische Medina von Fès und die monumentalen Tore von Meknès bis zur UNESCO-Küstenhauptstadt Rabat. Eine der großen Überlandreisen Afrikas.",
    highlights: [
      "Alle 4 Kaiserstädte: Marrakesch, Meknès, Fès, Rabat",
      "Römische Ruinen von Volubilis (UNESCO-Weltkulturerbe)",
      "Hassan-II.-Moschee in Rabat",
      "Chouara-Gerbereien in Fès",
      "Bab Mansour — das größte Tor Nordafrikas",
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
        title: "Agadir → Marrakesch",
        description:
          "Abfahrt aus Agadir am Morgen. Fahrt nach Norden nach Marrakesch (3 Std.). Nachmittäglicher Medina-Spaziergang oder freie Zeit. Übernachtung in einem Riad in Marrakesch.",
      },
      {
        day: 2,
        title: "Marrakesch → Aït Ben Haddou → Ouarzazate → Midelt",
        description:
          "Fahrt nach Norden von Marrakesch über den Atlas. Stopp bei Aït Ben Haddou. Weiterfahrt nach Midelt zur Übernachtung in der Hochebene zwischen den beiden Atlasgebirgen.",
      },
      {
        day: 3,
        title: "Midelt → Volubilis → Meknès",
        description:
          "Vormittag bei den römischen Ruinen von Volubilis. Nachmittag in Meknès: Bab-Mansour-Tor, die königlichen Kornspeicher und die Medina-Souks. Übernachtung in Meknès.",
      },
      {
        day: 4,
        title: "Meknès → Ganztägig Fès",
        description:
          "Ganzer Tag in Fès el-Bali mit einem fachkundigen Guide. Chouara-Gerbereien, Al-Qarawiyyin, Bou-Inania-Medersa und der alte Juweliersouk. Übernachtung in Fès.",
      },
      {
        day: 5,
        title: "Fès → Rabat",
        description:
          "Fahrt nach Westen an die Atlantikküste nach Rabat. Besuch des Hassan-Turms und des Mausoleums Mohammeds V., der Kasbah der Oudaias und der ummauerten Medina. Übernachtung in Rabat.",
      },
      {
        day: 6,
        title: "Rabat → Casablanca → Marrakesch",
        description:
          "Optionaler Stopp bei der Hassan-II.-Moschee in Casablanca (Außenansicht — die größte Moschee außerhalb Saudi-Arabiens). Weiterfahrt nach Süden nach Marrakesch. Anschlusstransfer nach Agadir oder Übernachtung. Ende der Tour.",
      },
    ],
    meetingPoint: { lat: 34.0209, lng: -6.8416, name: "Rabat, Atlantic Capital" },
    seoTitle: "Alle 4 Kaiserstädte Marokkos 6-Tage-Tour ab Agadir — Marrakesch, Meknès, Fès & Rabat | Marrakech Eco Tours",
    seoDescription: "Grand 6-Tage-Rundreise ab Agadir durch alle vier marokkanischen Kaiserstädte — Marrakesch, Meknès, Fès und Rabat. Privates 4x4 mit Riad-Unterkunft. Ab $560.",
    featured: false,
  },

  // ─────────────────────────────────────────────
  // NEUE HOHER-ATLAS- / TOUBKAL-TREKS
  // ─────────────────────────────────────────────
  {
    id: "30",
    slug: "toubkal-circuit-ifni-lake-6day",
    title: "Toubkal-Rundtour & Ifni-See — 6-tägiger Trek",
    category: "trekking",
    origin: "marrakech",
    difficulty: "challenging",
    duration: "6 Tage / 5 Nächte",
    groupSize: "2–12 Personen",
    reviewCount: 21,
    rating: 4.9,
    price: 620,
    depositAmount: 155,
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
      "Die vollständige Umrundung des Jbel Toubkal — abgelegene Berberdörfer, Hochpässe über 3.600 m, der türkisfarbene Ifni-See und ein Gipfelfinale auf 4.167 m.",
    description:
      "Die Toubkal-Rundtour ist die vollständige Durchquerung des Hohen Atlas — ein kompletter Ring um das Massiv, den nur wenige Trekker jemals vollenden. Über sechs Tage überqueren Sie vier Hauptpässe, wandern durch die abgelegenen Weidegebiete und Dörfer des Toubkal-Nationalparks, campen am außergewöhnlichen türkisfarbenen Ifni-See und schließen mit der Besteigung des Jbel Toubkal selbst ab. Weitaus abwechslungsreicher und abgelegener als der Standard-Gipfelanstieg — der Toubkal für Kenner.",
    highlights: [
      "Camp am türkisfarbenen Ifni-See (2.295 m), dem schönsten See des Atlas",
      "Überquerung von vier Hochpässen, darunter Tizi n'Ouanoums (3.664 m) und Tizi Likemt (3.555 m)",
      "Besteigung des Jbel Toubkal (4.167 m) — der höchste Gipfel Nordafrikas",
      "Übernachtungen in abgelegenen Berberdörfern, die nur selten von anderen Trekkern erreicht werden",
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
        title: "Marrakesch → Imlil → Tachedirt (2.300 m)",
        description:
          "Transfer von Marrakesch nach Imlil (1,5 Std.). Wanderung durch das Imenane-Tal vorbei an Terrassenfeldern und Berberdörfern nach Tachedirt. Etwa 5 Stunden Gehzeit.",
      },
      {
        day: 2,
        title: "Tachedirt → Tizi Likemt (3.555 m) → Azib Likemt (2.250 m)",
        description:
          "Aufstieg über den Tizi-Likemt-Pass mit weiten Blicken über den Hohen Atlas, dann Abstieg in die hochgelegenen Sommerweiden von Azib Likemt. 6–7 Stunden.",
      },
      {
        day: 3,
        title: "Azib Likemt → Tizi n'Ourai → Amsouzart (1.740 m)",
        description:
          "Entlang des Ourai-Flusses, Überquerung eines malerischen Passes und Abstieg zum gastfreundlichen Dorf Amsouzart zur Übernachtung in einer Familienpension. Etwa 6 Stunden.",
      },
      {
        day: 4,
        title: "Amsouzart → Ifni-See (2.295 m)",
        description:
          "Ein allmählicher Anstieg führt zum türkisfarbenen Ifni-See, dramatisch umgeben von steilen Gipfeln. Freier Nachmittag am Wasser. 4–5 Stunden.",
      },
      {
        day: 5,
        title: "Ifni-See → Tizi n'Ouanoums (3.664 m) → Toubkal-Refugium (3.207 m)",
        description:
          "Ein steiler, felsiger Aufstieg zum Ouanoums-Pass mit Blick auf den See, dann Abstieg zum Toubkal-Refugium. Früh schlafen vor dem Gipfeltag. Etwa 6 Stunden.",
      },
      {
        day: 6,
        title: "Gipfel Toubkal (4.167 m) → Imlil → Marrakesch",
        description:
          "Aufstieg vor Sonnenaufgang über den South Cirque zum Dach Nordafrikas bei Sonnenaufgang. Abstieg nach Imlil und Transfer zurück nach Marrakesch. Ein langer, lohnender letzter Tag.",
      },
    ],
    meetingPoint: { lat: 31.1369, lng: -7.9169, name: "Imlil Village, Atlas Mountains" },
    seoTitle: "6-tägiger Toubkal-Rundtrek über den Ifni-See ab Marrakesch — Gipfel & Rundtour | Marrakech Eco Tours",
    seoDescription: "Die vollständige 6-tägige Toubkal-Rundtour ab Marrakesch — Hochpässe, der türkisfarbene Ifni-See und der Gipfel des Jbel Toubkal (4.167 m). Lizenzierter Berberführer, Vollverpflegung & Transfers. Ab $620.",
    featured: false,
  },
  {
    id: "31",
    slug: "toubkal-summit-2day-marrakech",
    title: "Mount Toubkal Express — 2-tägiger Gipfelanstieg ab Marrakesch",
    category: "trekking",
    origin: "marrakech",
    difficulty: "challenging",
    duration: "2 Tage / 1 Nacht",
    groupSize: "2–12 Personen",
    reviewCount: 34,
    rating: 4.7,
    price: 210,
    depositAmount: 55,
    heroImage: "/gallery/toubkal-summit-ridge-climbers.jpg",
    gallery: [
      "/gallery/toubkal-summit-ridge-climbers.jpg",
      "/gallery/toubkal-trekker-snow-slope.jpg",
      "/gallery/toubkal-final-snow-slope-dawn.jpg",
      "/gallery/toubkal-summit-panorama-high-atlas.jpg",
    ],
    shortDescription:
      "Der schnellste Weg zum Dach Nordafrikas — besteigen Sie den Jbel Toubkal (4.167 m) in einem fokussierten zweitägigen Aufstieg ab Marrakesch.",
    description:
      "Wenig Zeit, aber fest entschlossen, auf dem höchsten Punkt Nordafrikas zu stehen? Der 2-tägige Toubkal-Aufstieg ist die direkteste Route zum Gipfel. Fahren Sie von Marrakesch nach Imlil, wandern Sie am ersten Tag vorbei am Schrein von Sidi Chamharouch zum Toubkal-Refugium und unternehmen Sie am zweiten Tag den Gipfelanstieg vor Sonnenaufgang, bevor Sie den ganzen Weg zurück nach Marrakesch absteigen. Es ist anspruchsvoll — ohne Akklimatisierungstag — daher ist ein gutes Fitnessniveau unerlässlich, aber es bietet das volle Toubkal-Erlebnis an einem einzigen Wochenende.",
    highlights: [
      "Besteigung des Jbel Toubkal (4.167 m) in nur zwei Tagen ab Marrakesch",
      "Übernachtung im Toubkal-Refugium auf 3.207 m",
      "Vorbei am Schrein von Sidi Chamharouch und seinem Wasserfall",
      "Sonnenaufgangs-Panorama über den gesamten Hohen Atlas",
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
        title: "Marrakesch → Imlil → Toubkal-Refugium (3.207 m)",
        description:
          "Früher Transfer von Marrakesch nach Imlil (1,5 Std.). Aufstieg durch das Aït-Mizane-Tal vorbei am Schrein von Sidi Chamharouch zum Toubkal-Refugium. 4–5 Stunden Gehzeit. Abendessen und früh schlafen.",
      },
      {
        day: 2,
        title: "Gipfel Toubkal (4.167 m) → Imlil → Marrakesch",
        description:
          "Start vor Sonnenaufgang zum Gipfel über den South Cirque (etwa 3 Stunden Aufstieg). Sonnenaufgang vom Dach Nordafrikas, dann Abstieg zum Refugium zum Mittagessen und weiter nach Imlil (4–5 Stunden Gesamtabstieg). Transfer zurück nach Marrakesch.",
      },
    ],
    faq: [
      { q: "Reichen zwei Tage wirklich aus, um den Toubkal zu besteigen?", a: "Es reicht für den Gipfel, und fitte Wanderer schaffen es regelmäßig. Was es Ihnen nicht gibt, ist Zeit zur Akklimatisierung — Sie gehen innerhalb von etwa dreißig Stunden von Marrakesch auf 4.167 Meter. Mit Bergwandererfahrung und knappem Zeitplan funktioniert es; für den ersten Kontakt mit großer Höhe ist der 4-Tage-Trek die sicherere Wahl." },
      { q: "Was beinhaltet der erste Tag?", a: "Einen frühen Transfer von Marrakesch nach Imlil, etwa anderthalb Stunden, dann vier bis fünf Stunden Aufstieg durch das Aït-Mizane-Tal vorbei am Schrein von Sidi Chamharouch zum Toubkal-Refugium auf 3.207 Metern. Abendessen im Refugium und früh schlafen vor dem Gipfelstart." },
      { q: "Wie anstrengend ist der Abstieg?", a: "Länger als die meisten erwarten. Nach dem Gipfel geht es zurück zum Refugium und weiter nach Imlil — insgesamt vier bis fünf Stunden Abstieg auf losem Untergrund und müden Beinen. Hier machen sich die Knie bemerkbar, und es lohnt sich, gezielt dafür zu trainieren." },
      { q: "Kann ich diesen Trek im Winter machen?", a: "Nur mit Winterausrüstung und einem für diese Bedingungen qualifizierten Guide. Von etwa November bis März ist die obere Route schneebedeckt und erfordert Steigeisen, einen Eispickel und die Fähigkeit, diese einzusetzen. Aus einer Wanderung wird dann eine Bergtour." },
    ],
    meetingPoint: { lat: 31.1369, lng: -7.9169, name: "Imlil Village, Atlas Mountains" },
    seoTitle: "2-tägiger Mount-Toubkal-Trek ab Marrakesch — Express-Gipfel 4.167 m | Marrakech Eco Tours",
    seoDescription: "Besteigen Sie den Jbel Toubkal (4.167 m) in 2 Tagen ab Marrakesch — die schnellste Route zu Nordafrikas höchstem Gipfel. Refugiumsnacht, Vollverpflegung, lizenzierter Berberführer & Transfers. Ab $210.",
    featured: false,
  },
  {
    id: "32",
    slug: "toubkal-aguelzim-pass-3day",
    title: "Toubkal-Gipfel über den Aguelzim-Pass — 3-tägiger Trek",
    category: "trekking",
    origin: "marrakech",
    difficulty: "challenging",
    duration: "3 Tage / 2 Nächte",
    groupSize: "2–12 Personen",
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
      "Die landschaftlich schönste Route zum Gipfel — durch das Azzaden-Tal, vorbei an den Ighouliden-Wasserfällen, über den Aguelzim-Pass (3.560 m) zum Toubkal.",
    description:
      "Diese dreitägige Route nimmt den ruhigeren, schöneren Umweg zum Toubkal. Statt des direkten Aït-Mizane-Tals wandern Sie in das wilde Azzaden-Tal, vorbei an den Ighouliden-Wasserfällen und den Wiesen von Azib Tamsoult, bevor Sie den dramatischen Aguelzim-Pass (3.560 m) überqueren, um das Toubkal-Refugium zu erreichen. Der letzte Tag ist der Gipfelanstieg. Ein lohnenderer und landschaftlich reizvollerer Zugang als die Standardroute, mit echter Hochgebirgsvielfalt. Hinweis: Der Aguelzim-Pass ist nur etwa von Mai bis Oktober passierbar.",
    highlights: [
      "Wanderung durch das wilde Azzaden-Tal — ruhiger und grüner als die Standardroute",
      "Vorbei an den spektakulären Ighouliden-Wasserfällen (Tamsoult)",
      "Überquerung des hohen Aguelzim-Passes auf 3.560 m",
      "Besteigung des Jbel Toubkal (4.167 m), des höchsten Gipfels Nordafrikas",
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
        title: "Marrakesch → Imlil → Azzaden-Tal (Azib Tamsoult)",
        description:
          "Transfer von Marrakesch nach Imlil. Wanderung über den Tizi-n'Mzik-Pass (2.450 m) ins Azzaden-Tal, vorbei an den Ighouliden-Wasserfällen zum Refugium bei Azib Tamsoult. Etwa 6 Stunden.",
      },
      {
        day: 2,
        title: "Azzaden → Aguelzim-Pass (3.560 m) → Toubkal-Refugium (3.207 m)",
        description:
          "Ein steiler Anstieg aus dem Azzaden-Tal über den Aguelzim-Pass mit weiten Blicken über den westlichen Atlas, dann Abstieg zum Toubkal-Refugium. Etwa 6–7 Stunden. Früh schlafen vor dem Gipfel.",
      },
      {
        day: 3,
        title: "Gipfel Toubkal (4.167 m) → Imlil → Marrakesch",
        description:
          "Aufstieg vor Sonnenaufgang über den South Cirque zum Gipfel bei Sonnenaufgang. Langer Abstieg den ganzen Weg zurück nach Imlil (über das Refugium), dann Transfer nach Marrakesch. Ein fordernder, aber unvergesslicher letzter Tag.",
      },
    ],
    meetingPoint: { lat: 31.1369, lng: -7.9169, name: "Imlil Village, Atlas Mountains" },
    seoTitle: "3-tägiger Toubkal-Trek über den Aguelzim-Pass ab Marrakesch — Azzaden-Tal-Route | Marrakech Eco Tours",
    seoDescription: "Besteigen Sie den Toubkal (4.167 m) auf dem landschaftlich schönen Weg — 3 Tage über das Azzaden-Tal, die Ighouliden-Wasserfälle und den Aguelzim-Pass (3.560 m). Lizenzierter Guide, Refugien, Vollverpflegung & Transfers. Ab $330.",
    featured: false,
  },
  {
    id: "33",
    slug: "toubkal-three-peaks-4000m-3day",
    title: "Toubkal Drei 4.000-m-Gipfel — 3-tägige Herausforderung",
    category: "trekking",
    origin: "marrakech",
    difficulty: "expert",
    duration: "3 Tage / 2 Nächte",
    groupSize: "2–10 Personen",
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
      "Besteigen Sie drei der 4.000-m-Gipfel des Hohen Atlas in drei Tagen — Ras Ouanoukrim, Timesguida und Jbel Toubkal.",
    description:
      "Für starke, erfahrene Trekker ist dies die ultimative Herausforderung im Hohen Atlas: drei 4.000-Meter-Gipfel in drei Tagen. Vom Toubkal-Refugium aus besteigen Sie die Zwillingsgipfel von Ouanoukrim — Timesguida (4.089 m) und Ras (4.083 m) —, bevor das große Finale auf dem Jbel Toubkal (4.167 m) selbst folgt. Mit begrenzter Zeit zur Akklimatisierung und 1.000 Höhenmetern an aufeinanderfolgenden Tagen verlangt dies echte Fitness und Bergerfahrung, belohnt Sie aber mit drei der höchsten Punkte Nordafrikas.",
    highlights: [
      "Besteigung von drei 4.000-m-Gipfeln: Timesguida (4.089 m), Ras Ouanoukrim (4.083 m) & Toubkal (4.167 m)",
      "Einer der anspruchsvollsten und lohnendsten Treks im Hohen Atlas",
      "Basis im Toubkal-Refugium auf 3.207 m",
      "Gipfel bei Sonnenaufgang und weite Blicke bis zur Sahara und zum Anti-Atlas",
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
        title: "Marrakesch → Imlil → Toubkal-Refugium (3.207 m)",
        description:
          "Transfer von Marrakesch nach Imlil. Aufstieg durch das Aït-Mizane-Tal vorbei an Sidi Chamharouch zum Toubkal-Refugium. 4–5 Stunden. Akklimatisierung und Erholung vor zwei großen Gipfeltagen.",
      },
      {
        day: 2,
        title: "Ouanoukrim — Timesguida (4.089 m) & Ras (4.083 m)",
        description:
          "Aufstieg zum Gebiet des Tizi n'Ouanoums und Besteigung der Zwillingsgipfel von Ouanoukrim, Timesguida und Ras, beide über 4.000 m. Rückkehr zum Toubkal-Refugium zur Übernachtung. Ein fordernder ganzer Tag.",
      },
      {
        day: 3,
        title: "Gipfel Toubkal (4.167 m) → Imlil → Marrakesch",
        description:
          "Letzter Gipfelanstieg auf den Jbel Toubkal über den South Cirque bei Sonnenaufgang — der höchste der drei. Langer Abstieg nach Imlil und Transfer zurück nach Marrakesch.",
      },
    ],
    meetingPoint: { lat: 31.1369, lng: -7.9169, name: "Imlil Village, Atlas Mountains" },
    seoTitle: "Toubkal Drei-Gipfel-4.000-m-Herausforderung — 3-tägiger Hoher-Atlas-Trek | Marrakech Eco Tours",
    seoDescription: "Besteigen Sie drei 4.000-m-Gipfel des Hohen Atlas in 3 Tagen — Timesguida (4.089 m), Ras Ouanoukrim (4.083 m) und Toubkal (4.167 m). Expertentrek ab Marrakesch mit lizenziertem Guide. Ab $360.",
    featured: false,
  },
  {
    id: "34",
    slug: "marrakech-food-market-tour",
    title: "Marrakesch Essens- & Markttour — Halbtägiger kulinarischer Spaziergang",
    category: "day-tours",
    origin: "marrakech",
    difficulty: "easy",
    isDayTour: true,
    duration: "Halbtags (4 Stunden)",
    groupSize: "2–8 Personen",
    reviewCount: 34,
    rating: 4.9,
    price: 45,
    depositAmount: 10,
    heroImage:
      "https://images.unsplash.com/photo-1761255240953-c571ba0b98d7?w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1761255240953-c571ba0b98d7?w=1200&q=85",
      "https://images.unsplash.com/photo-1685311572420-513619470404?w=1200&q=85",
      "https://images.unsplash.com/photo-1661083098412-054431ab7112?w=1200&q=85",
      "https://images.unsplash.com/photo-1596750320291-a082a23dcc19?w=1200&q=85",
    ],
    shortDescription:
      "Erkunden Sie die Gewürzsouks und Marktstände der Medina mit einem lokalen Guide, probieren Sie sich durch und kochen Sie anschließend einen Tajine von Grund auf.",
    description:
      "Marrakesch ist die kulinarische Hauptstadt Marokkos, und dieser halbtägige Spaziergang baut genau darauf auf. Beginnen Sie auf der Rahba Kedima, dem Gewürzplatz, und lernen Sie, echten Safran von gefärbten Imitaten sowie die über ein Dutzend Gewürze, die in Ras el-Hanout gehören, zu unterscheiden. Ziehen Sie weiter durch die Lebensmittelsouks und probieren Sie Oliven, Datteln, Msemen und frisch gepressten Orangensaft von den Ständen am Jemaa el-Fnaa. Zum Abschluss geht es in eine lokale Familienküche für eine praktische Tajine- und Minztee-Lektion — Sie essen, was Sie kochen.",
    highlights: [
      "Gewürzplatz Rahba Kedima — echter Safran vs. gefärbte Imitate",
      "Geführte Verkostungen durch die aktiven Lebensmittelsouks der Medina",
      "Praktischer Tajine-Kochkurs bei einer lokalen Familie",
      "Marokkanische Minztee-Zeremonie, so wie es sich gehört",
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
        title: "Halbtags — Medina-Märkte & Kochkurs",
        description:
          "Treffen am Gewürzplatz Rahba Kedima um 9:30 Uhr. Geführter Spaziergang durch die Gewürz- und Lebensmittelsouks mit Verkostungen (90 Minuten). Weiter zu einer lokalen Familienküche für einen praktischen Tajine-Kochkurs. Gemeinsames Essen des selbst gekochten Tajines, abgerundet mit Minztee. Ende bis 13:30 Uhr.",
      },
    ],
    meetingPoint: { lat: 31.6316, lng: -7.9868, name: "Rahba Kedima Spice Square, Marrakech Medina" },
    seoTitle: "Marrakesch Essens- & Markttour — Gewürzsouk-Spaziergang & Kochkurs | Marrakech Eco Tours",
    seoDescription: "Halbtägige Marrakesch-Foodtour: Probieren Sie sich durch die Gewürzsouks und kochen Sie anschließend einen echten Tajine mit einer lokalen Familie. Kleine Gruppe, lokaler Guide. Ab $45.",
    faq: [
      { q: "Ist diese Tour für Vegetarier geeignet?", a: "Ja. Der Kochkurs und die Verkostungen können auf Wunsch vollständig vegetarisch gestaltet werden — teilen Sie uns dies bei der Buchung mit. Die meisten Souk-Verkostungen (Oliven, Datteln, Gewürze, frischer Saft) sind ohnehin standardmäßig vegetarisch." },
      { q: "Sollten wir hungrig kommen?", a: "Kommen Sie mit Appetit, aber nicht mit leerem Magen — der Spaziergang umfasst bereits ein Dutzend kleine Verkostungen, bevor Sie überhaupt beim Kochkurs ankommen, also teilen Sie sich Ihre Kräfte gut ein und lassen Sie ein großes Frühstück aus." },
      { q: "Wie unterscheidet sich das von einer normalen Medina-Tour?", a: "Eine allgemeine Medina-Tour behandelt Monumente und Geschichte. Diese hier dreht sich vollständig um Essen — dort, wo Einheimische wirklich einkaufen und essen, nicht an den touristenorientierten Ständen nahe dem Jemaa el-Fnaa — und endet damit, dass Sie selbst kochen, statt nur zuzuschauen." },
    ],
    featured: false,
  },
  {
    id: "35",
    slug: "merzouga-stargazing-desert-tour",
    title: "Merzouga Sahara-Sternenbeobachtung — 2-tägige Dark-Sky-Wüstentour",
    category: "desert",
    origin: "marrakech",
    difficulty: "easy",
    duration: "2 Tage / 1 Nacht",
    groupSize: "2–10 Personen",
    reviewCount: 21,
    rating: 4.9,
    price: 210,
    depositAmount: 55,
    heroImage:
      "https://images.unsplash.com/photo-1683138155815-d7edd806d8a3?w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1683138155815-d7edd806d8a3?w=1200&q=85",
      "https://images.unsplash.com/photo-1617374128851-c84e37dc9f37?w=1200&q=85",
      "https://images.unsplash.com/photo-1685311572420-513619470404?w=1200&q=85",
      "https://images.unsplash.com/photo-1611859836043-a9177f500a27?w=1200&q=85",
    ],
    shortDescription:
      "Kameltrekking in den Erg Chebbi bei Sonnenuntergang, gefolgt von einer geführten Sternenbeobachtung mit bloßem Auge und Teleskop unter einem der dunkelsten Himmel Nordafrikas.",
    description:
      "Der Erg Chebbi liegt weit genug von jeder Stadt entfernt, dass die Milchstraße in einer klaren Nacht mit bloßem Auge sichtbar ist — dieser Ausflug baut genau darauf auf, statt es als bloße Zugabe zu behandeln. Nach dem Kameltrekking bei Sonnenuntergang und dem Abendessen im Camp baut ein lokaler Astronomie-Guide ein Teleskop auf und führt die Gruppe durch die sichtbaren Planeten, Sternbilder und Deep-Sky-Objekte — in einfachen Worten statt Fachjargon erklärt. Am besten von Oktober bis Mai, wenn der Wüstenhimmel nachts am klarsten ist und die Hitze so weit gesunken ist, dass man stundenlang bequem draußen sitzen kann.",
    highlights: [
      "Geführte Sternenbeobachtung mit bloßem Auge und Teleskop mit einem Astronomie-Guide",
      "Kameltrekking bei Sonnenuntergang in die Dünen von Erg Chebbi",
      "Eine Nacht in einem traditionellen Berber-Wüstencamp, fernab jeder Lichtverschmutzung",
      "Der beste Wüstennachthimmel Marokkos — keine Stadtaufhellung in irgendeiner Richtung",
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
        title: "Marrakesch → Erg-Chebbi-Wüstencamp",
        description:
          "Frühe Abfahrt aus Marrakesch, über den Hohen Atlas und das Draa-Tal nach Merzouga. Kameltrekking bei Sonnenuntergang in die Dünen von Erg Chebbi. Abendessen im Camp, gefolgt von der geführten Sternenbeobachtung, sobald es vollständig dunkel ist.",
      },
      {
        day: 2,
        title: "Sonnenaufgang → Merzouga → Marrakesch",
        description:
          "Optionale Sonnenaufgangsbeobachtung über den Dünen. Frühstück im Camp, Kamel- oder 4x4-Transfer zurück nach Merzouga und die Rückfahrt nach Marrakesch, Ankunft am Abend.",
      },
    ],
    meetingPoint: { lat: 31.0580, lng: -4.0127, name: "Merzouga, Erg Chebbi Sahara" },
    seoTitle: "Merzouga Sternenbeobachtungstour — 2-tägige Sahara-Dark-Sky-Wüstenreise | Marrakech Eco Tours",
    seoDescription: "2-tägige Sternenbeobachtungstour von Marrakesch nach Merzouga — Kameltrekking bei Sonnenuntergang, teleskopgeführte Nachthimmel-Session und eine Nacht im Erg-Chebbi-Wüstencamp. Ab $210.",
    faq: [
      { q: "Brauche ich eigene Astronomiekenntnisse oder Ausrüstung?", a: "Nein. Der Guide stellt das Teleskop und erklärt alles von Grund auf — dieser Ausflug ist ebenso für völlige Anfänger konzipiert wie für alle mit Interesse an Astronomie." },
      { q: "Was ist die beste Jahreszeit für diese Tour?", a: "Oktober bis Mai. Der Himmel ist am klarsten, und die Wüstennacht ist kühl genug, um bequem draußen zu sitzen; auch im Sommer ist der Sternenhimmel schön, aber die Nächte sind deutlich heißer." },
      { q: "Was passiert, wenn es bewölkt ist?", a: "Klarer Himmel ist im Erg Chebbi außerhalb seltener winterlicher Sturmsysteme die Norm, aber sollte Bewölkung die Sternenbeobachtung verhindern, finden das Camp-Erlebnis, das Kameltrekking und das Abendessen trotzdem wie geplant statt." },
    ],
    featured: false,
  },
];
