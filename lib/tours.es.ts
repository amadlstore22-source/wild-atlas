import type { Tour } from "./tours";

export const TOURS: Tour[] = [
  // ─────────────────────────────────────────────
  // TOURS DESDE MARRAKECH
  // ─────────────────────────────────────────────
  {
    id: "1",
    slug: "toubkal-summit-trek-4day",
    title: "Marrakech a la Cima del Toubkal — Trekking de 4 Días",
    category: "trekking",
    origin: "marrakech",
    difficulty: "challenging",
    duration: "4 días / 3 noches",
    groupSize: "2–10 people",
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
      "Conquista el Jbel Toubkal (4.167 m) — el techo del norte de África — a través de pueblos bereberes y valles alpinos de alta montaña.",
    description:
      "El trekking a la cima del Toubkal es la gran aventura del Alto Atlas por excelencia. Recorre antiguas rutas de mulas, duerme en refugios de montaña y ponte de pie sobre el punto más alto del norte de África mientras el amanecer se extiende sobre Marruecos. Cuatro días que cambian la forma de ver las cosas, exigentes en lo físico pero sin escalada técnica.",
    highlights: [
      "Cima del Jbel Toubkal a 4.167 m — el pico más alto del norte de África",
      "Duerme en refugios bereberes tradicionales de montaña a 3.207 m",
      "Sale del pueblo de Imlil, en pleno corazón del Atlas",
      "Vistas panorámicas que abarcan Marruecos y Argelia",
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
        title: "Marrakech → Imlil (1.740 m)",
        description:
          "Traslado desde Marrakech a Imlil (1h30), el pueblo de partida hacia el Toubkal. Instalación, encuentro con el guía y breve caminata de aclimatación por los campos bereberes en terrazas. Cena de bienvenida.",
      },
      {
        day: 2,
        title: "Imlil → Refugio del Toubkal (3.207 m)",
        description:
          "Ascenso por el valle de Mizane, pasando por el santuario de Sidi Chamharouch, hasta el refugio de montaña. Caminata de aclimatación por la tarde, por encima del campamento. Descanso temprano antes del día de cima.",
      },
      {
        day: 3,
        title: "Día de Cima — Toubkal (4.167 m)",
        description:
          "Salida antes del amanecer, a las 5:00. Ascenso pronunciado por el pedregal del Circo Sur. Cima al amanecer. Descenso al refugio para una cena de celebración.",
      },
      {
        day: 4,
        title: "Refugio → Imlil → Marrakech",
        description:
          "Descenso matinal entre praderas de flores silvestres. Traslado de regreso a Marrakech. El tour termina a media tarde.",
      },
    ],
    faq: [
      { q: "¿Es mejor el trekking de 4 días que el de 2 días para un primer intento al Toubkal?", a: "Para la mayoría de la gente, sí. Los días extra se dedican a la aclimatación más que a cubrir distancia, y la altitud —no la forma física— suele ser la razón por la que la gente sufre cerca de la cima. Si nunca has estado cerca de los 4.000 metros, esta es la versión que conviene reservar." },
      { q: "¿Cómo es el alojamiento en este trekking?", a: "Una combinación de casa de huéspedes en el pueblo y el Refugio del Toubkal, a 3.207 metros. El refugio es una cabaña de montaña en funcionamiento: dormitorios compartidos, literas con colchón y mantas, comidas comunitarias y noches frías. Lleva un saco sábana, frontal y tapones para los oídos." },
      { q: "¿Tengo que cargar mi propia mochila?", a: "Solo una mochila de día con agua, capas de ropa y cámara. Las mulas transportan el equipaje principal entre etapas, lo que hace manejables varios días seguidos de caminata larga incluso para quienes nunca han hecho trekking en altitud." },
      { q: "¿A qué hora empieza el día de cima?", a: "Antes del amanecer. El ascenso final desde el refugio dura unas tres horas, y salir temprano permite llegar arriba con el amanecer y bajar antes de que se complique el tiempo por la tarde. Es la parte más fría del día, así que la capa de abrigo que has llevado cargando por fin se gana su lugar." },
    ],
    meetingPoint: { lat: 31.1369, lng: -7.9169, name: "Imlil Village, Atlas Mountains" },
    seoTitle: "Trekking a la Cima del Toubkal 4 Días — Sube al Pico Más Alto del Norte de África | Marrakech Eco Tours",
    seoDescription: "Conquista el Jbel Toubkal (4.167 m) con un guía bereber titulado. Trekking de cima de 4 días desde Marrakech, con refugios, todas las comidas y traslado de ida y vuelta incluidos. Desde 380 $.",
    featured: true,
  },
  {
    id: "2",
    slug: "sahara-3day-marrakech",
    title: "Marrakech al Sáhara — Tour de 3 Días por el Desierto",
    category: "desert",
    origin: "marrakech",
    difficulty: "easy",
    duration: "3 días / 2 noches",
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
      "Adéntrate en camello en las doradas dunas de Erg Chebbi y duerme bajo un millón de estrellas en un campamento bereber de lujo en el desierto.",
    description:
      "Tres días de ida y vuelta desde Marrakech hasta el Sáhara. Cruza el Alto Atlas, para en el Ksar de Aït Ben Haddou, Patrimonio de la Humanidad por la UNESCO, atraviesa el valle del Draa y monta en camello hacia Erg Chebbi mientras el sol se funde entre las dunas. Una noche bajo las estrellas en un auténtico campamento de lujo.",
    highlights: [
      "Paseo en camello por las dunas de Erg Chebbi al atardecer",
      "Noche en un campamento bereber de lujo en el desierto",
      "Ksar de Aït Ben Haddou, Patrimonio de la Humanidad por la UNESCO",
      "Observación de estrellas sin contaminación lumínica",
      "Sandboard en las grandes dunas",
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
          "Salida de Marrakech a las 7:00. Cruce del puerto de Tizi n'Tichka (2.260 m). Visita a Aït Ben Haddou. Noche en Ouarzazate, la puerta del desierto.",
      },
      {
        day: 2,
        title: "Ouarzazate → Valle del Draa → Campamento de Erg Chebbi",
        description:
          "Recorrido por el palmeral del valle del Draa. Llegada a Merzouga a media tarde. Paseo en camello hacia Erg Chebbi al atardecer. Cena y música gnawa bajo las estrellas.",
      },
      {
        day: 3,
        title: "Amanecer en el Sáhara → Garganta de Todra → Marrakech",
        description:
          "Despertar antes del amanecer para ver salir el sol sobre las dunas. Paseo en camello de regreso y desayuno. Vuelta pasando por la garganta de Todra. Llegada a Marrakech por la tarde-noche.",
      },
    ],
    faq: [
      { q: "¿Por qué dura tres días este viaje?", a: "Porque Merzouga y las dunas de Erg Chebbi están al otro lado del Atlas. Tres días es lo que exige la distancia: cualquier trayecto más corto o bien lleva a un lugar que no es el auténtico Sáhara, o se pasa casi todo el tiempo conduciendo." },
      { q: "¿Qué vemos durante el trayecto?", a: "La ruta cruza el puerto de Tizi n'Tichka e incluye Aït Ben Haddou y la región de las gargantas, así que el viaje tiene interés propio en lugar de ser tiempo perdido para llegar a algún sitio. El trayecto se divide en etapas con paradas, no se hace de un tirón." },
      { q: "¿Cómo es la noche en el campamento del desierto?", a: "Camas con mantas dentro de una jaima, cena en grupo y silencio absoluto en cuanto se apagan los generadores. Las dunas son verdaderamente oscuras, por eso la mayoría recuerda el cielo estrellado más que el paseo en camello. Lleva una capa de abrigo: las noches del desierto son frías fuera del verano." },
      { q: "¿Tengo que montar en camello obligatoriamente?", a: "No. El tramo en camello hasta el campamento es corto y opcional, y caminar ese tramo en vez de montar es lo bastante habitual como para que los guías lo tengan previsto. Toda la distancia real se cubre en vehículo." },
    ],
    meetingPoint: { lat: 31.0580, lng: -4.0127, name: "Merzouga, Erg Chebbi Sahara" },
    seoTitle: "Tour de 3 Días por el Desierto del Sáhara desde Marrakech — Camellos, Dunas y Campamento | Marrakech Eco Tours",
    seoDescription: "Paseo en camello hacia Erg Chebbi al atardecer y noche bajo las estrellas. Tour de 3 días de Marrakech al Sáhara con Aït Ben Haddou, valle del Draa y campamento bereber de lujo. Desde 245 $.",
    featured: true,
  },
  {
    id: "3",
    slug: "ourika-valley-day-hike",
    title: "Marrakech al Valle de Ourika — Excursión de un Día",
    category: "day-tours",
    origin: "marrakech",
    difficulty: "easy",
    duration: "1 día",
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
      "Una excursión de día completo entre nogales, pueblos bereberes y arroyos de montaña, a solo 45 minutos de Marrakech.",
    description:
      "El valle de Ourika es un mundo aparte de la ciudad: campos en terrazas se aferran a laderas de roca roja, mujeres bereberes tejen alfombras a la puerta de sus casas y arroyos de montaña corren entre los senderos. Perfecto para familias y para quienes hacen senderismo por primera vez. Las cascadas de Setti Fatma, en la cabecera del valle, son el punto culminante.",
    highlights: [
      "Excursión a las cascadas de Setti Fatma (7 saltos de agua)",
      "Paseo por pueblos bereberes poco visitados por turistas",
      "Baño en piscinas naturales de montaña",
      "Almuerzo bereber tradicional con una familia local",
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
        title: "Día Completo — Valle de Ourika",
        description:
          "Salida de Marrakech a las 8:30. Inicio de la caminata a las 9:30 por pueblos y campos en terrazas. Baño en las cascadas. Almuerzo bereber tradicional. Regreso a Marrakech antes de las 17:00.",
      },
    ],
    meetingPoint: { lat: 31.3489, lng: -7.7411, name: "Ourika Valley, High Atlas" },
    seoTitle: "Excursión de un Día al Valle de Ourika desde Marrakech — Cascadas y Pueblos Bereberes | Marrakech Eco Tours",
    seoDescription: "Camina hasta las cascadas de Setti Fatma a través de pueblos bereberes y arroyos de montaña, a solo 45 minutos de Marrakech. Excursión guiada de un día con almuerzo bereber incluido. Desde 35 $.",
    featured: true,
  },
  {
    id: "4",
    slug: "ouzoud-waterfalls-day-trip",
    title: "Marrakech a las Cascadas de Ouzoud — Excursión de un Día",
    category: "day-tours",
    origin: "marrakech",
    difficulty: "easy",
    duration: "1 día",
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
      "Las cascadas más espectaculares de Marruecos — 110 m de agua en caída, monos de Berbería salvajes y una garganta impresionante.",
    description:
      "Con sus 110 metros, las cascadas de Ouzoud son las más altas del norte de África. La garganta, envuelta en niebla, alberga grupos de monos de Berbería salvajes, pozas enmarcadas por arcoíris en la base y molinos tradicionales que aún muelen argán. Dos horas de trayecto desde Marrakech y absolutamente merece la pena.",
    highlights: [
      "Las cascadas de Ouzoud — caída de 110 m, la más alta del norte de África",
      "Monos de Berbería salvajes en su hábitat natural",
      "Paseo en barca al pie de las cascadas",
      "Visita a un molino tradicional",
      "Paseo panorámico por la garganta con guía local",
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
        title: "Día Completo — Cascadas de Ouzoud",
        description:
          "Salida de Marrakech a las 7:30. Llegada a Ouzoud a las 9:30. Paseo guiado hasta las cascadas, ruta por la garganta, paseo en barca y avistamiento de monos. Tiempo libre para almorzar. Regreso a Marrakech antes de las 18:00.",
      },
    ],
    meetingPoint: { lat: 32.0061, lng: -6.7200, name: "Ouzoud Falls, Middle Atlas" },
    seoTitle: "Excursión de un Día a las Cascadas de Ouzoud desde Marrakech — Monos de Berbería y 110 m de Cascada | Marrakech Eco Tours",
    seoDescription: "Visita la cascada más alta de Marruecos — 110 metros de agua en caída, monos de Berbería salvajes y un paseo en barca por la garganta. Excursión de un día desde Marrakech con guía incluido. Desde 30 $.",
    featured: false,
  },
  {
    id: "5",
    slug: "agafay-desert-sunset",
    title: "Marrakech al Desierto de Agafay — Atardecer y Cena",
    category: "day-tours",
    origin: "marrakech",
    difficulty: "easy",
    duration: "1 día (tarde–noche)",
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
      "El Sáhara en 30 minutos — quad al atardecer, paseos en camello y una cena bereber tradicional en el desierto de piedra de Agafay.",
    description:
      "No hacen falta tres días para sentir el desierto. El Agafay —un vasto paisaje lunar de hammada rocosa a solo 30 km de Marrakech— ofrece una atmósfera sahariana auténtica al atardecer. Conduce un quad por la meseta, monta en camello hasta el campamento y siéntate a disfrutar de un festín bereber tradicional con el Atlas como telón de fondo.",
    highlights: [
      "Quad por el desierto de piedra de Agafay",
      "Paseo en camello hasta el mirador del atardecer",
      "Cena bereber tradicional en un campamento del desierto",
      "El Atlas en el horizonte al anochecer",
      "A solo 30 minutos de Marrakech",
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
        title: "Tarde en el Desierto de Agafay",
        description:
          "Recogida en Marrakech a las 15:00. Llegada a Agafay a las 15:30. Sesión de quad, paseo en camello al atardecer (17:30–18:30). Cena bereber tradicional bajo las estrellas. Regreso a Marrakech antes de las 22:00.",
      },
    ],
    meetingPoint: { lat: 31.4969, lng: -8.1073, name: "Agafay Desert, Marrakech Region" },
    seoTitle: "Tour al Atardecer en el Desierto de Agafay desde Marrakech — Quad, Camellos y Cena Bereber | Marrakech Eco Tours",
    seoDescription: "Vive el Sáhara en 30 minutos — quad, paseo en camello al atardecer y una cena bereber tradicional en el desierto de piedra de Agafay, cerca de Marrakech. Desde 75 $.",
    featured: false,
  },
  {
    id: "6",
    slug: "marrakech-medina-cultural-tour",
    title: "Medina de Marrakech — Tour Cultural",
    category: "cultural",
    origin: "marrakech",
    difficulty: "easy",
    isDayTour: true,
    duration: "Medio día (4 horas)",
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
      "Recorre el laberinto de zocos de Marrakech con un experto local — especias, curtidurías, artesanos y jardines ocultos de riad.",
    description:
      "La medina de Marrakech es Patrimonio de la Humanidad por la UNESCO y uno de los laberintos urbanos más vibrantes del planeta. Tu guía local te llevará por los antiguos zocos, entre montañas de especias y cerámica pintada a mano, hasta las curtidurías en activo y, finalmente, a una azotea sobre la mezquita de la Koutoubia.",
    highlights: [
      "La plaza de Jemaa el-Fna en su momento más vibrante",
      "Curtidurías vistas desde una azotea privada",
      "Medersa Ben Yusef — colegio islámico del siglo XVI",
      "Zoco de las especias y cooperativa de aceite de argán",
      "Jardín oculto de un riad y té de menta tradicional",
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
        title: "Inmersión Completa en la Medina",
        description:
          "Comienzo a las 9:00 en la mezquita de la Koutoubia. Paseo por la Mellah, la Medersa Ben Yusef, los zocos de artesanos, las curtidurías y Jemaa el-Fna. Té de menta en un riad escondido. Finaliza a la 13:00.",
      },
    ],
    meetingPoint: { lat: 31.6295, lng: -7.9811, name: "Koutoubia Mosque, Marrakech" },
    seoTitle: "Tour Cultural por la Medina de Marrakech — Zocos, Curtidurías y Riads | Marrakech Eco Tours",
    seoDescription: "Explora la medina de Marrakech, Patrimonio de la UNESCO, con un guía local — curtidurías, Medersa Ben Yusef, Jemaa el-Fna y jardines ocultos de riad. Tour privado de medio día. Desde 45 $.",
    featured: false,
  },
  {
    id: "7",
    slug: "marrakech-to-fes-3day",
    title: "Marrakech a Fez — Tour de 3 Días por las Ciudades Imperiales",
    category: "cultural",
    origin: "marrakech",
    difficulty: "easy",
    duration: "3 días / 2 noches",
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
      "Dos de las grandes ciudades de Marruecos en tres días — el puerto del Alto Atlas, Ifrane, el bosque de cedros y la antigua medina de Fez.",
    description:
      "La carretera de Marrakech a Fez es una de las más espectaculares de África. Cruza el Alto Atlas por Tizi n'Tichka, para en el Ksar de Aït Ben Haddou, Patrimonio de la UNESCO, atraviesa los bosques de cedros del Atlas Medio donde campan monos de Berbería salvajes, y llega a Fez el-Bali, la ciudad medieval habitada más grande del mundo.",
    highlights: [
      "Puerto de montaña de Tizi n'Tichka (2.260 m)",
      "Ksar de Aït Ben Haddou, Patrimonio de la Humanidad por la UNESCO",
      "Ifrane — el pueblo alpino de Marruecos",
      "Bosque de cedros de Azrou y monos de Berbería",
      "Medina de Fez el-Bali y curtidurías Chouara",
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
          "Salida a las 7:30. Ascenso del Atlas por Tizi n'Tichka. Visita a Aït Ben Haddou. Continuación por el valle del Ziz hasta Midelt para pasar la noche.",
      },
      {
        day: 2,
        title: "Midelt → Ifrane → Bosque de Cedros de Azrou → Fez",
        description:
          "Trayecto por el Atlas Medio. Parada en Ifrane y en el bosque de cedros de Azrou para ver monos de Berbería salvajes. Llegada a Fez por la tarde. Instalación en el riad.",
      },
      {
        day: 3,
        title: "Día Completo en la Medina de Fez",
        description:
          "Exploración guiada de Fez el-Bali: curtidurías Chouara, Universidad de Al-Qarawiyyin, Medersa Bou Inania y los zocos laberínticos. El tour termina en Fez.",
      },
    ],
    meetingPoint: { lat: 34.0331, lng: -5.0003, name: "Fes el-Bali, Imperial City" },
    seoTitle: "Tour de 3 Días de Marrakech a Fez — Ciudades Imperiales y Alto Atlas | Marrakech Eco Tours",
    seoDescription: "Viaja de Marrakech a Fez pasando por Tizi n'Tichka, Aït Ben Haddou y los bosques de cedros del Atlas Medio. Tour privado en 4x4 de 3 días con alojamiento en riad. Desde 290 $.",
    featured: false,
  },
  {
    id: "8",
    slug: "mgoun-massif-trek",
    title: "Marrakech al Macizo del M'Goun — Travesía de 7 Días",
    category: "trekking",
    origin: "marrakech",
    difficulty: "expert",
    duration: "7 días / 6 noches",
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
      "El trekking más salvaje de Marruecos — 7 días cruzando el remoto macizo del M'Goun (4.068 m) sin otro turista a la vista.",
    description:
      "La travesía del macizo del M'Goun es para senderistas experimentados que quieren ir más allá de la ruta turística. Siete días de auténtica naturaleza salvaje de alta montaña, cruzando puertos por encima de los 3.600 m, durmiendo con familias bereberes y coronando el Jbel M'Goun —el segundo pico más alto de Marruecos— con apenas otro viajero a la vista.",
    highlights: [
      "Cima del Jbel M'Goun — el 2.º pico más alto de Marruecos, a 4.068 m",
      "Completamente fuera de la ruta turística",
      "Alojamiento con familias bereberes en pueblos remotos",
      "Cruces de las gargantas del Tessaute y del M'Goun",
      "7 días de pura naturaleza salvaje de alta montaña",
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
      { day: 1, title: "Marrakech → Aït M'hamed", description: "Traslado hasta el punto de partida. Encuentro con el equipo de mulas y el personal. Primera noche con una familia bereber." },
      { day: 2, title: "Aït M'hamed → Agouti (2.600 m)", description: "Trekking a través del Aït Bouguemez, el 'Valle Feliz'. Campamento en Agouti." },
      { day: 3, title: "Agouti → Tizi n'Ait Imi (3.650 m) → Tarkeddit", description: "Primer puerto de altura. Panorámicas impresionantes. Campamento salvaje en Tarkeddit." },
      { day: 4, title: "Cima del M'Goun (4.068 m)", description: "Salida antes del amanecer. Ascenso al Jbel M'Goun. Descenso al campamento de la garganta del Tessaute." },
      { day: 5, title: "Travesía de la Garganta del Tessaute", description: "Recorrido por la espectacular garganta de paredes rojizas. Baño salvaje en el río." },
      { day: 6, title: "Salida de la Garganta → Bou Tharar", description: "Salida de la garganta. Noche en el pueblo de Bou Tharar con una familia local." },
      { day: 7, title: "Bou Tharar → Marrakech", description: "Traslado de regreso a Marrakech pasando por el valle de las rosas. El tour concluye hacia las 16:00." },
    ],
    faq: [
      { q: "¿Es el M'Goun más duro que el Toubkal?", a: "En el conjunto de una semana, sí. Calificamos esta ruta como de nivel experto frente al nivel exigente de las rutas del Toubkal, no porque un día concreto sea técnico, sino porque son siete días seguidos en terreno remoto con menos lugares donde parar o dar la vuelta. Es esfuerzo sostenido más que un día especialmente duro." },
      { q: "¿Qué tan remoto es este trekking?", a: "Verdaderamente remoto. La ruta cruza terreno de altura y gargantas, pasando por pueblos donde los grupos de trekking siguen siendo poco frecuentes. Ese es precisamente su atractivo, y también la razón por la que la ruta necesita un guía que conozca los puntos de agua y los patrones del tiempo." },
      { q: "¿Qué experiencia necesito para la travesía del M'Goun?", a: "Experiencia previa en trekking de varios días. No es una primera gran caminata: conviene saber ya cómo responde tu cuerpo a días seguidos en terreno difícil y cómo te afecta la altitud. Si has hecho el Toubkal sin problemas, tienes una base razonable para esto." },
    ],
    meetingPoint: { lat: 31.6558, lng: -6.4561, name: "Aït M'hamed, Mgoun Massif" },
    seoTitle: "Trekking al Macizo del M'Goun 7 Días — La Travesía de Alta Montaña Más Salvaje de Marruecos | Marrakech Eco Tours",
    seoDescription: "Trekking de nivel experto de 7 días por el remoto macizo del M'Goun — cima del Jbel M'Goun (4.068 m), cruces de puertos de altura y noches con familias bereberes, sin otros turistas. Desde 820 $.",
    featured: false,
  },

  // ─────────────────────────────────────────────
  // TOURS DESDE AGADIR
  // ─────────────────────────────────────────────
  {
    id: "9",
    slug: "paradise-valley-agadir",
    title: "Agadir al Valle del Paraíso y las Cascadas de Immouzer",
    category: "day-tours",
    origin: "agadir",
    difficulty: "easy",
    duration: "1 día",
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
      "Un paraíso escondido de cañones bordeados de palmeras, piscinas naturales y arroyos cristalinos a 35 km de Agadir.",
    description:
      "El Valle del Paraíso es uno de los secretos mejor guardados de Marruecos: un frondoso cañón de palmeras tallado por el río Tamraght, a solo 35 km al norte de Agadir. Camina entre pozas naturales alimentadas por manantiales de montaña helados, nada bajo salientes rocosos y disfruta de un pícnic a la sombra de altísimas palmeras. La escapada perfecta lejos de la playa.",
    highlights: [
      "Piscinas naturales en un cañón de palmeras",
      "Caminata por un paisaje de cañón espectacular",
      "Cascada de Immouzer (estacional)",
      "Bosque salvaje de palmeras y argán",
      "Aire fresco de montaña, sin aglomeraciones",
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
        title: "Día Completo — Valle del Paraíso",
        description:
          "Salida de Agadir a las 9:00. Llegada al Valle del Paraíso a las 10:00. Caminata guiada por el cañón, baño en piscinas naturales, almuerzo bereber bajo las palmeras. Regreso a Agadir antes de las 17:00.",
      },
    ],
    faq: [
      { q: "¿Habrá agua en las piscinas?", a: "Depende de la temporada. Los niveles varían mucho: tras las lluvias de invierno las piscinas están en su mejor momento, y tras una larga sequía algunas se reducen o desaparecen. La primavera es la ventana más fiable. Te informaremos con sinceridad de las condiciones actuales antes de que viajes." },
      { q: "¿Pueden hacer esta excursión los niños?", a: "Sí, es una de nuestras excursiones de día más adecuadas para familias. El camino hasta las piscinas principales es corto y sencillo, y el baño es el objetivo del día. Saltar desde las rocas es opcional y hay mucho que hacer sin necesidad de ello." },
      { q: "¿Con cuánta antelación deberíamos salir?", a: "Cuanto antes mejor. El Valle del Paraíso está a unos noventa minutos de Agadir, y llegar antes de la afluencia de media mañana cambia mucho la experiencia: la diferencia entre tener una piscina prácticamente para vosotros solos o compartirla." },
    ],
    meetingPoint: { lat: 30.5376, lng: -9.5000, name: "Paradise Valley, Tamraght" },
    seoTitle: "Excursión de un Día al Valle del Paraíso desde Agadir — Piscinas Naturales y Cañón de Palmeras | Marrakech Eco Tours",
    seoDescription: "Cañón de palmeras escondido con piscinas naturales a 35 km de Agadir. Caminata guiada por el cañón, cascada de Immouzer y almuerzo bereber incluido. Desde 30 $.",
    featured: true,
  },
  {
    id: "10",
    slug: "sous-massa-national-park",
    title: "Agadir al Parque Nacional de Souss-Massa — Tour de Fauna",
    category: "day-tours",
    origin: "agadir",
    difficulty: "easy",
    duration: "1 día",
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
      "Observa el ibis eremita, en peligro crítico de extinción, y flamencos en la reserva natural más importante de Marruecos.",
    description:
      "El Parque Nacional de Souss-Massa se extiende a lo largo de 70 km de costa atlántica y estuario fluvial al sur de Agadir. Es uno de los últimos refugios del ibis eremita —una de las aves más raras del mundo— y hogar de flamencos, águilas pescadoras, ostreros y nutrias africanas. Una visita obligada para los amantes de la naturaleza.",
    highlights: [
      "Ibis eremita — una de las 10 aves más raras del mundo",
      "Colonias de flamencos en el estuario del Massa",
      "Dunas atlánticas y sendero costero",
      "Observación de aves en el río Souss desde puestos ocultos",
      "Paseo por el bosque de argán y acacias",
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
        title: "Día Completo — Souss-Massa",
        description:
          "Salida de Agadir a las 8:00. Sesión matinal en el estuario del Massa para ver ibis y flamencos. Sendero costero y paseo por las dunas atlánticas después del almuerzo. Regreso a Agadir antes de las 17:00.",
      },
    ],
    meetingPoint: { lat: 30.0559, lng: -9.6320, name: "Souss-Massa National Park, Massa" },
    seoTitle: "Tour de Fauna en el Parque Nacional de Souss-Massa desde Agadir — El Raro Ibis Eremita | Marrakech Eco Tours",
    seoDescription: "Observa el ibis eremita, en peligro crítico de extinción, y flamencos en la reserva natural más importante de Marruecos. Guía naturalista experto, prismáticos y pícnic incluidos. Desde 70 $.",
    featured: true,
  },
  {
    id: "11",
    slug: "taroudant-day-trip-agadir",
    title: "Agadir a Taroudant — Excursión de un Día",
    category: "cultural",
    origin: "agadir",
    difficulty: "easy",
    isDayTour: true,
    duration: "1 día",
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
      "La 'abuela de Marrakech' — antiguas murallas de tono rosado, zocos de especias y un mercado bereber ajeno al turismo de masas.",
    description:
      "Taroudant es lo que era Marrakech hace 50 años: la experiencia completa de una medina medieval, sin las multitudes de turistas. Las murallas ocres del siglo XVI se encuentran entre las mejor conservadas de Marruecos. Las curtidurías, el zoco de especias y el mercado de joyería de plata son auténticos y sin prisas. A solo 80 km de Agadir.",
    highlights: [
      "Murallas del siglo XVI — las mejor conservadas de Marruecos",
      "Mercado bereber y zoco de especias auténticos",
      "Curtidurías de Taroudant (más pequeñas y menos concurridas que las de Fez)",
      "Oasis y kasbah de Tiout (opcional)",
      "Joyería tradicional de plata del Souss",
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
        title: "Día Completo — Taroudant",
        description:
          "Salida de Agadir a las 8:30. Llegada a Taroudant a las 9:30. Paseo guiado por la medina, las murallas, los zocos y las curtidurías. Parada opcional en el oasis de Tiout. Regreso a Agadir antes de las 17:00.",
      },
    ],
    meetingPoint: { lat: 30.4702, lng: -8.8773, name: "Taroudant, Souss Valley" },
    seoTitle: "Excursión de un Día a Taroudant desde Agadir — Antiguas Murallas y Mercado Bereber | Marrakech Eco Tours",
    seoDescription: "Descubre las murallas del siglo XVI mejor conservadas de Marruecos y los auténticos mercados bereberes de Taroudant, a 80 km de Agadir, sin las multitudes de turistas. Desde 40 $.",
    featured: false,
  },
  {
    id: "12",
    slug: "agadir-surf-lesson",
    title: "Clase de Surf en la Playa de Agadir",
    category: "day-tours",
    origin: "agadir",
    difficulty: "easy",
    duration: "Medio día (2–3 horas)",
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
      "Aprende a surfear en las cálidas olas atlánticas de Agadir — clases profesionales, tabla y traje de neopreno incluidos.",
    description:
      "La bahía de Agadir ofrece un oleaje atlántico constante y apto para principiantes, con agua cálida durante todo el año, lo que la convierte en uno de los mejores lugares de Marruecos para aprender a surfear. Nuestros instructores titulados trabajan tanto con principiantes absolutos como con surfistas de nivel intermedio. Tabla, traje de neopreno y todo el equipo incluidos.",
    highlights: [
      "Instructores de surf profesionales y titulados",
      "Tabla y traje de neopreno incluidos",
      "Niveles principiante e intermedio",
      "Cálidas olas atlánticas en la bahía de Agadir",
      "Condiciones de surf durante todo el año",
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
        title: "Sesión de Surf — Bahía de Agadir",
        description:
          "Encuentro con tu instructor en la playa a la hora acordada. 30 minutos de clase en tierra (técnica y seguridad) y 90 minutos en el agua. Sesiones disponibles cada día por la mañana y por la tarde.",
      },
    ],
    meetingPoint: { lat: 30.4206, lng: -9.5981, name: "Agadir Beach, Agadir Bay" },
    seoTitle: "Clase de Surf en Agadir — Aprende a Surfear en la Costa Atlántica de Marruecos | Marrakech Eco Tours",
    seoDescription: "Aprende a surfear en las cálidas olas atlánticas de la bahía de Agadir con un instructor ISA titulado. Tabla, traje de neopreno y briefing de seguridad incluidos. Niveles principiante e intermedio. Desde 28 $.",
    featured: false,
  },
  {
    id: "13",
    slug: "anti-atlas-trekking-agadir",
    title: "Agadir al Antiatlas — Trekking de 3 Días",
    category: "trekking",
    origin: "agadir",
    difficulty: "moderate",
    duration: "3 días / 2 noches",
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
      "Tres días en el antiguo Antiatlas — valles pintados, gargantas floridas de almendros y pueblos bereberes sin otro turista.",
    description:
      "El Antiatlas es la cadena montañosa más infravalorada de Marruecos: más antigua que el Atlas, de formas más extrañas y completamente ajena al turismo. Picos de granito rosa, gargantas con tonos de azafrán, almendros en flor y pueblos bereberes donde la vida apenas ha cambiado en siglos. Partiendo de Agadir, esto es el Marruecos auténtico.",
    highlights: [
      "Antiguos picos de granito rosa del Antiatlas",
      "Tafraout — el valle de las rocas pintadas",
      "Gargantas floridas de almendros (febrero–marzo)",
      "Pueblos bereberes sin otros turistas",
      "Vistas dramáticas del valle al atardecer",
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
        title: "Agadir → Tafraout → Primer Campamento",
        description:
          "Trayecto hasta Tafraout (2h30). Visita a las rocas pintadas. Inicio del trekking hacia las gargantas de almendros. Noche en una casa de huéspedes bereber.",
      },
      {
        day: 2,
        title: "Travesía de la Cresta Alta",
        description:
          "Día completo de trekking por crestas de granito rosa con vistas al valle de Ameln, abajo. Noche en tienda de campaña o casa de huéspedes en un pueblo remoto.",
      },
      {
        day: 3,
        title: "Descenso del Valle → Agadir",
        description:
          "Descenso matinal a través del bosque de argán. Almuerzo tradicional en un pueblo. Trayecto de vuelta a Agadir. Llegada a última hora de la tarde.",
      },
    ],
    meetingPoint: { lat: 29.7231, lng: -8.9762, name: "Tafraoute, Anti-Atlas Mountains" },
    seoTitle: "Trekking al Antiatlas 3 Días desde Agadir — Granito Rosa y Rocas Pintadas | Marrakech Eco Tours",
    seoDescription: "Trekking de 3 días por la cadena montañosa más infravalorada de Marruecos — picos de granito rosa, gargantas floridas de almendros y pueblos bereberes remotos. Tour privado desde Agadir. Desde 280 $.",
    featured: true,
  },
  {
    id: "14",
    slug: "sahara-2day-agadir",
    title: "Agadir al Sáhara — Tour de 2 Días por el Desierto",
    category: "desert",
    origin: "agadir",
    difficulty: "easy",
    duration: "2 días / 1 noche",
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
      "Cruza el Antiatlas y el valle del Draa hasta el Sáhara — paseo en camello, campamento en el desierto y amanecer sobre Erg Chegaga.",
    description:
      "La mayoría de los tours al Sáhara salen de Marrakech; este te lleva por la ruta sur, menos transitada, vía el valle del Draa y Erg Chegaga, el campo de dunas más grande y remoto de Marruecos. Una escapada de dos días desde Agadir que se siente como una semana lejos del mundo.",
    highlights: [
      "Erg Chegaga — el campo de dunas remoto al que llegan menos turistas",
      "Palmeral del valle del Draa y antiguas kasbahs",
      "Paseos en camello al atardecer y al amanecer",
      "Campamento bereber de lujo bajo la Vía Láctea",
      "Ruta sur pasando por Tata y Foum Zguid",
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
          "Salida de Agadir a las 6:30. Trayecto hacia el sur por las estribaciones del Antiatlas, vía Tata. Cruce de la hammada hasta Foum Zguid. Paseo en camello hacia Erg Chegaga al atardecer. Cena en el campamento bereber.",
      },
      {
        day: 2,
        title: "Amanecer → Valle del Draa → Agadir",
        description:
          "Paseo en camello al amanecer para ver salir el sol sobre las dunas. Desayuno en el campamento. Trayecto hacia el norte por los magníficos palmerales del valle del Draa. Llegada a Agadir por la tarde-noche.",
      },
    ],
    meetingPoint: { lat: 29.8671, lng: -7.9386, name: "Erg Chegaga, Western Sahara" },
    seoTitle: "Tour de 2 Días al Sáhara desde Agadir — Campamento en Erg Chegaga y Valle del Draa | Marrakech Eco Tours",
    seoDescription: "Las remotas dunas de Erg Chegaga por la ruta sur del valle del Draa — paseo en camello, campamento de lujo en el desierto y amanecer sobre el Sáhara. Tour de 2 días desde Agadir. Desde 195 $.",
    featured: true,
  },
  {
    id: "15",
    slug: "souss-valley-cultural-tour",
    title: "Agadir al Valle del Souss — Tour de Argán y Cultura Bereber",
    category: "cultural",
    origin: "agadir",
    difficulty: "easy",
    isDayTour: true,
    duration: "1 día",
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
      "Visita una cooperativa de argán gestionada por mujeres, un pueblo de la miel y almuerza con una familia bereber en el valle del Souss.",
    description:
      "El valle del Souss, al sur de Agadir, es el corazón de la producción de argán en Marruecos: una biosfera protegida por la UNESCO donde mujeres bereberes dirigen las cooperativas que producen el aceite más preciado del mundo. Visita la cooperativa, observa el proceso de extracción tradicional, prueba productos de argán puro y comparte un almuerzo casero con una familia bereber.",
    highlights: [
      "Visita y degustación en una cooperativa de aceite de argán gestionada por mujeres",
      "Pueblo de la miel — demostración de un apicultor local",
      "Almuerzo bereber tradicional en familia",
      "Mirador panorámico del valle del Souss",
      "Mercado de Aït Baha (si coincide con día de mercado)",
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
        title: "Día Completo — Valle del Souss",
        description:
          "Salida de Agadir a las 9:00. Visita a la cooperativa de argán (10:00). Trayecto al pueblo de la miel. Almuerzo bereber en familia (13:00). Visita por la tarde a Aït Baha o al mirador del valle. Regreso a Agadir antes de las 17:00.",
      },
    ],
    meetingPoint: { lat: 30.0667, lng: -8.6500, name: "Souss Valley, Aït Baha Region" },
    seoTitle: "Excursión de un Día de Argán y Cultura en el Valle del Souss desde Agadir — Cooperativa de Mujeres | Marrakech Eco Tours",
    seoDescription: "Visita una cooperativa de aceite de argán gestionada por mujeres, un apicultor de un pueblo de la miel y comparte un almuerzo bereber en familia en el valle del Souss, el corazón argánico de Marruecos. Desde 38 $.",
    featured: false,
  },
  {
    id: "16",
    slug: "agadir-to-essaouira-day-trip",
    title: "Agadir a Essaouira — Excursión de un Día",
    category: "day-tours",
    origin: "agadir",
    difficulty: "easy",
    duration: "1 día",
    groupSize: "2–14 people",
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
      "La ciudad más mágica de la costa atlántica — barcas azules, antiguas murallas y el marisco más fresco de Marruecos.",
    description:
      "Essaouira está a dos horas al norte de Agadir por la costa atlántica. Su medina azul y blanca, Patrimonio de la UNESCO, cae directamente sobre las olas del océano. Pasea por las murallas portuguesas del siglo XVIII, compra joyería bereber de plata a los artesanos, come sardinas a la parrilla en el muelle del puerto y siente el famoso viento de Essaouira.",
    highlights: [
      "Murallas portuguesas del siglo XVIII frente al mar",
      "Medina azul, Patrimonio de la UNESCO, y puerto pesquero",
      "Almuerzo de marisco fresco en el muelle del puerto",
      "Talleres de artesanos: madera, joyería, textiles",
      "El famoso viento atlántico de Essaouira",
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
          "Salida de Agadir a las 8:00. Llegada a Essaouira a las 10:00. Paseo guiado por la medina, las murallas y el puerto. Tiempo libre para almorzar y explorar. Salida a las 16:30. De vuelta en Agadir a las 18:30.",
      },
    ],
    meetingPoint: { lat: 31.5085, lng: -9.7595, name: "Essaouira Medina, Atlantic Coast" },
    seoTitle: "Excursión de un Día a Essaouira desde Agadir — Medina UNESCO y Murallas Atlánticas | Marrakech Eco Tours",
    seoDescription: "Excursión de un día desde Agadir hasta la medina azul y blanca de Essaouira, Patrimonio de la UNESCO — murallas portuguesas del siglo XVIII, marisco fresco en el puerto y talleres de artesanos. Desde 40 $.",
    featured: false,
  },
  {
    id: "17",
    slug: "marrakech-to-chefchaouen-4day",
    title: "Marrakech a Chefchaouen — Tour de 4 Días por la Ciudad Azul",
    category: "cultural",
    origin: "marrakech",
    difficulty: "easy",
    duration: "4 días / 3 noches",
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
      "Cuatro días por las ciudades imperiales más icónicas de Marruecos — terminando en las mágicas calles azules de Chefchaouen, en las montañas del Rif.",
    description:
      "Este tour conecta tres de los destinos más fotogénicos de Marruecos en cuatro días. Conduce hacia el norte desde Marrakech a través de los bosques de cedros del Atlas Medio, dedica un día a explorar Fez el-Bali —la ciudad medieval más grande del mundo— y continúa hasta Chefchaouen, la legendaria Ciudad Azul que se derrama por las laderas del Rif. Muros de color añil, arroyos de montaña y nada de turismo de masas.",
    highlights: [
      "Chefchaouen — la Ciudad Azul de las montañas del Rif",
      "Medina de Fez el-Bali, Patrimonio UNESCO, y curtidurías Chouara",
      "Bosque de cedros de Azrou y monos de Berbería salvajes",
      "Ruinas romanas de Volubilis (Patrimonio de la Humanidad por la UNESCO)",
      "Mequinez — el Versalles marroquí",
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
        title: "Marrakech → Ifrane → Fez",
        description:
          "Salida de Marrakech a las 7:00. Cruce del Atlas Medio. Parada en Ifrane y en el bosque de cedros de Azrou para ver monos de Berbería. Llegada a Fez por la tarde. Instalación en el riad.",
      },
      {
        day: 2,
        title: "Día Completo en la Medina de Fez",
        description:
          "Día completo guiado por Fez el-Bali: curtidurías Chouara, Universidad de Al-Qarawiyyin, Medersa Bou Inania y los antiguos zocos. Paseo por la tarde-noche sobre las murallas de la medina.",
      },
      {
        day: 3,
        title: "Fez → Volubilis → Mequinez → Chefchaouen",
        description:
          "Visita matinal a Volubilis, las ruinas romanas mejor conservadas de Marruecos. Trayecto a Mequinez (el Versalles marroquí). Continuación hasta Chefchaouen, en las montañas del Rif. Llegada por la tarde-noche.",
      },
      {
        day: 4,
        title: "Día Completo en Chefchaouen",
        description:
          "Día completo en la Ciudad Azul. Paseo guiado por los callejones azules de la medina, el mirador de la Mezquita Española y la cascada de Ras El-Maa. El tour concluye en Chefchaouen.",
      },
    ],
    meetingPoint: { lat: 35.1688, lng: -5.2636, name: "Chefchaouen, Rif Mountains" },
    seoTitle: "Tour de 4 Días de Marrakech a Chefchaouen — Fez, Volubilis y Montañas del Rif | Marrakech Eco Tours",
    seoDescription: "Tour de 4 días desde Marrakech hasta las calles azules de Chefchaouen, pasando por Fez, las ruinas romanas de Volubilis y Mequinez. 4x4 privado con alojamiento en riad. Desde 340 $.",
    featured: false,
  },
  {
    id: "18",
    slug: "marrakech-imperial-cities-5day",
    title: "Marrakech — Las 4 Ciudades Imperiales — Gran Tour de 5 Días",
    category: "cultural",
    origin: "marrakech",
    difficulty: "easy",
    duration: "5 días / 4 noches",
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
      "Las cuatro capitales imperiales de Marruecos en cinco días — Marrakech, Mequinez, Fez y Rabat — de un país que ha tenido cuatro sedes de poder durante mil años.",
    description:
      "Las cuatro ciudades imperiales de Marruecos —Marrakech, Mequinez, Fez y Rabat— encierran cada una un capítulo distinto de la historia del país. Este gran circuito de cinco días te lleva por todas ellas: la medina laberíntica de Fez, las puertas monumentales de Mequinez, la capital costera de Rabat, Patrimonio de la UNESCO, y de vuelta a la ciudad rosa de Marrakech. Uno de los grandes viajes terrestres de África.",
    highlights: [
      "Las 4 Ciudades Imperiales: Marrakech, Mequinez, Fez, Rabat",
      "Ruinas romanas de Volubilis (Patrimonio de la Humanidad por la UNESCO)",
      "Mezquita Hassan II en Rabat",
      "Curtidurías Chouara en Fez",
      "Bab Mansour — la gran puerta del norte de África",
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
          "Trayecto hacia el norte desde Marrakech a través del Atlas. Parada en Aït Ben Haddou. Continuación hasta Midelt para pasar la noche en la altiplanicie entre las dos cadenas del Atlas.",
      },
      {
        day: 2,
        title: "Midelt → Volubilis → Mequinez",
        description:
          "Mañana en las ruinas romanas de Volubilis. Tarde en Mequinez: la puerta de Bab Mansour, los graneros reales y los zocos de la medina. Noche en Mequinez.",
      },
      {
        day: 3,
        title: "Mequinez → Día Completo en Fez",
        description:
          "Día completo en Fez el-Bali con un guía experto. Curtidurías Chouara, Al-Qarawiyyin, Medersa Bou Inania y el antiguo zoco de los joyeros. Noche en Fez.",
      },
      {
        day: 4,
        title: "Fez → Rabat",
        description:
          "Trayecto hacia el oeste hasta Rabat, en la costa atlántica. Visita a la Torre Hassan y el Mausoleo de Mohammed V, la Kasbah de los Oudayas y la medina amurallada. Noche en Rabat.",
      },
      {
        day: 5,
        title: "Rabat → Casablanca → Marrakech",
        description:
          "Parada opcional en la Mezquita Hassan II de Casablanca (exterior — la mayor mezquita del mundo fuera de Arabia Saudí). Continuación hacia el sur, a Marrakech. Llegada por la tarde-noche.",
      },
    ],
    meetingPoint: { lat: 34.0209, lng: -6.8416, name: "Rabat, Atlantic Capital" },
    seoTitle: "Tour de 5 Días por las 4 Ciudades Imperiales de Marruecos — Marrakech, Mequinez, Fez y Rabat | Marrakech Eco Tours",
    seoDescription: "Gran circuito por las cuatro capitales imperiales de Marruecos en 5 días. Ruinas romanas de Volubilis, curtidurías Chouara, Bab Mansour y la Torre Hassan. 4x4 privado desde Marrakech. Desde 480 $.",
    featured: false,
  },

  // ─────────────────────────────────────────────
  // TOURS DE DESIERTO DESDE MARRAKECH (nuevos)
  // ─────────────────────────────────────────────
  {
    id: "23",
    slug: "zagora-2day-marrakech",
    title: "Marrakech a Zagora — Tour de 2 Días por el Desierto",
    category: "desert",
    origin: "marrakech",
    difficulty: "easy",
    duration: "2 días / 1 noche",
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
      "La ruta más rápida al Sáhara desde Marrakech — pasando por Aït Ben Haddou y los 200 km de palmeral del valle del Draa hasta un campamento del desierto bajo las estrellas, cerca de Zagora.",
    description:
      "Dos días de ida y vuelta al desierto. Zagora ofrece una auténtica experiencia sahariana —paseos en camello, una noche en un campamento bereber y un cielo repleto de estrellas— sin el trayecto más largo hasta Merzouga. La ruta por el valle del Draa es una de las más bellas de Marruecos: 200 km de oasis de palmeras datileras, antiguas kasbahs y pueblos bereberes bordeando el río. Las dunas de Erg Lehoudi son más tranquilas y menos concurridas que las de Erg Chebbi, lo que convierte este viaje en la opción perfecta para quienes tienen poco tiempo pero aun así quieren la experiencia completa del desierto.",
    highlights: [
      "Valle del Draa — el oasis más largo de Marruecos, 200 km de palmeras y kasbahs",
      "Paseo en camello por las dunas de Erg Lehoudi al atardecer",
      "Noche en un campamento bereber del desierto con música tradicional",
      "Ksar de Aït Ben Haddou, Patrimonio de la UNESCO",
      "Tamegroute — una biblioteca coránica del siglo XIV, aún abierta a visitantes",
      "Menos concurrido que Merzouga — una experiencia del desierto más íntima",
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
        title: "Marrakech → Aït Ben Haddou → Valle del Draa → Campamento de Zagora",
        description:
          "Recogida en tu alojamiento de Marrakech a las 7:00. Cruce del puerto de Tizi n'Tichka y parada en el Ksar de Aït Ben Haddou, Patrimonio de la UNESCO. Almuerzo en Ouarzazate. Trayecto hacia el sur por toda la extensión del oasis del valle del Draa — palmerales, pueblos de adobe y antiguas kasbahs graneras bordeando la carretera. Parada en Tamegroute para ver la biblioteca del siglo XIV y los famosos talleres de cerámica verde. Llegada al campamento del desierto cerca de Zagora a última hora de la tarde. Paseo en camello al atardecer por las dunas. Cena bereber tradicional y música alrededor de la hoguera.",
      },
      {
        day: 2,
        title: "Amanecer sobre las Dunas → Valle del Draa → Marrakech",
        description:
          "Paseo matinal o paseo opcional en camello para ver el amanecer en el desierto. Desayuno en el campamento. Salida a las 8:30 por el oasis del valle del Draa con la luz de la mañana, una atmósfera muy distinta a la de la tarde. Parada para almorzar en Ouarzazate o en ruta. Regreso a través del Alto Atlas. Llegada a Marrakech a las 18:30.",
      },
    ],
    meetingPoint: { lat: 30.3323, lng: -5.8366, name: "Zagora, Draa Valley" },
    featured: false,
    seoTitle: "Tour de 2 Días de Marrakech a Zagora — Valle del Draa, Paseo en Camello y Campamento Bereber | Marrakech Eco Tours",
    seoDescription: "La ruta más rápida al Sáhara — Aït Ben Haddou, los 200 km de palmeral del valle del Draa y un paseo en camello por las dunas. Tour de desierto de 2 días desde Marrakech con campamento bereber. Desde 149 $.",
  },
  {
    id: "24",
    slug: "erg-chegaga-3day-marrakech",
    title: "Erg Chegaga — Expedición de 3 Días al Desierto Remoto",
    category: "desert",
    origin: "marrakech",
    difficulty: "moderate",
    duration: "3 días / 2 noches",
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
      "El desierto más remoto de Marruecos — Erg Chegaga exige un trayecto en 4x4 campo a través, más allá de la última carretera asfaltada, hasta dunas de 120 m sobre un vasto e inhabitado mar de arena.",
    description:
      "Erg Chegaga es el Sáhara que la mayoría de los turistas nunca encuentran. A diferencia de Erg Chebbi, cerca de Merzouga —donde las caravanas de camellos se cruzan a la vista de los hoteles—, Chegaga exige un trayecto en 4x4 campo a través, más allá del final del asfalto en M'Hamid, el último pueblo antes del auténtico Sáhara. El campo de dunas se extiende kilómetros con apenas otra alma a la vista. Tres días desde Marrakech pasando por Aït Ben Haddou, el Valle del Azafrán de Taliouine y el borde del mundo conocido, seguidos de dos noches en pleno desierto, donde el silencio es el único sonido.",
    highlights: [
      "Erg Chegaga — menos turistas, dunas de 120 m, un silencio profundo",
      "Cruce del desierto en 4x4 campo a través desde M'Hamid hasta el campo de dunas",
      "2 noches en un campamento del desierto sin otro campamento a la vista",
      "Valle del Azafrán de Taliouine — la capital de las especias de Marruecos",
      "Ksar de Aït Ben Haddou, Patrimonio de la UNESCO",
      "Paseos en camello al amanecer y al atardecer en un rincón privado del Sáhara",
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
          "Recogida a las 7:00. Cruce del puerto de Tizi n'Tichka y visita a Aït Ben Haddou. Continuación hacia el sur, pasando por Ouarzazate, hasta el Valle del Azafrán cerca de Taliouine —la capital marroquí del azafrán— para una breve parada. Continuación hasta M'Hamid, el último pueblo antes del Sáhara abierto. Cena y noche en M'Hamid.",
      },
      {
        day: 2,
        title: "M'Hamid → Erg Chegaga (Cruce en 4x4)",
        description:
          "Tras el desayuno, se sube al 4x4 — el asfalto termina aquí. Dos o tres horas de conducción todoterreno por desierto abierto, pasando junto a campamentos nómadas dispersos y llanuras de hammada con fósiles. Se llega al borde de Erg Chegaga hacia el mediodía. Paseo en camello adentrándose en el campo de dunas. El campamento se instala en el corazón del erg: sin carreteras, sin otros campamentos, sin contaminación lumínica. Atardecer sobre las dunas. Cena tradicional y un cielo cuajado de estrellas.",
      },
      {
        day: 3,
        title: "Amanecer en el Sáhara → M'Hamid → Marrakech",
        description:
          "Despertar antes del amanecer para subir a la cresta de la duna y ver salir el sol. Desayuno en el campamento. El 4x4 regresa a través del desierto hasta M'Hamid. Comienza el largo y bello trayecto hacia el norte por Zagora, el valle del Draa y de vuelta sobre el Alto Atlas. Llegada a Marrakech a las 19:30.",
      },
    ],
    faq: [
      { q: "¿En qué se diferencia Erg Chegaga de Merzouga?", a: "Chegaga es más remoto y tranquilo. El campo de dunas es más amplio pero menos alto que el de Erg Chebbi, y el acceso final se hace en 4x4 por desierto abierto en lugar de por carretera asfaltada. Es posible no ver ningún otro campamento en absoluto, que es precisamente la razón para elegirlo." },
      { q: "¿Por qué está calificado este viaje como moderado y no como fácil?", a: "Por el acceso. Llegar a Chegaga implica un traslado en 4x4 por desierto abierto, más exigente que la ruta por carretera hacia Merzouga. La caminata en sí no es dura: la calificación refleja el trayecto más que el esfuerzo físico." },
      { q: "¿Merece la pena el esfuerzo extra de Erg Chegaga frente a Merzouga?", a: "Si lo que buscas de verdad es soledad, sí. Si quieres las dunas altas y esculpidas de las fotografías con un acceso sencillo, Merzouga aprovecha mejor esos mismos tres días. Ninguna de las dos opciones es un premio de consolación: son experiencias distintas." },
    ],
    meetingPoint: { lat: 29.8250, lng: -5.7246, name: "M'Hamid, Gateway to Erg Chegaga" },
    featured: true,
    seoTitle: "Tour de Desierto de 3 Días a Erg Chegaga desde Marrakech — Dunas Remotas y Expedición en 4x4 al Sáhara | Marrakech Eco Tours",
    seoDescription: "La experiencia más remota del desierto de Marruecos — 3 días desde Marrakech a Erg Chegaga vía cruce en 4x4, 2 noches en un campamento bereber privado. Sin multitudes, dunas de 120 m. Desde 320 $.",
  },
  {
    id: "25",
    slug: "desert-4day-marrakech",
    title: "Gran Tour del Desierto desde Marrakech — 4 Días",
    category: "desert",
    origin: "marrakech",
    difficulty: "easy",
    duration: "4 días / 3 noches",
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
      "Cuatro días recorriendo toda la amplitud del sur de Marruecos — montañas, cañones, estudios de cine, una noche en el desierto y la Ruta de las Mil Kasbahs — hasta Erg Chebbi y de vuelta.",
    description:
      "Este es el circuito de desierto por excelencia desde Marrakech. Cuatro días para vivir todo lo que ofrece el sur de Marruecos: la grandiosidad del Alto Atlas, la majestuosidad cinematográfica de Aït Ben Haddou (escenario de Juego de Tronos, Gladiator y Lawrence de Arabia), los 400 m de paredes de la garganta de Todra, una noche completa en un campamento de Erg Chebbi y el regreso por la legendaria Ruta de las Mil Kasbahs. Un tour con tiempo suficiente para respirar, explorar y absorber de verdad uno de los paisajes más espectaculares del planeta.",
    highlights: [
      "Noche completa en un campamento del desierto de Erg Chebbi — paseos en camello al atardecer y al amanecer",
      "Garganta de Todra — el cañón más espectacular de Marruecos (paredes de 400 m, ruta de 4 km)",
      "Ksar de Aït Ben Haddou, UNESCO — escenario de Gladiator y Juego de Tronos",
      "Valle del Dades — el Valle de las Mil Kasbahs",
      "Oasis de Skoura — un mar de palmeras datileras y antiguas kasbahs de adobe",
      "Regreso por la Ruta de las Mil Kasbahs — corredor del valle del Draa",
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
        title: "Marrakech → Aït Ben Haddou → Ouarzazate → Valle del Dades",
        description:
          "Recogida a las 7:00. Ascenso del puerto de Tizi n'Tichka a través del Alto Atlas (2.260 m). Parada en el Ksar de Aït Ben Haddou, Patrimonio de la UNESCO, para una exploración completa de 45 minutos. Pausa para almorzar en Ouarzazate, con la opción de visitar los Estudios Atlas (donde se rodaron Gladiator y Juego de Tronos). Continuación por el espectacular valle del Dades — kasbahs de tono rosado, pueblos de oasis y las formaciones rocosas de 'dedos de mono'. Llegada al hotel del valle del Dades a las 17:00. Cena y noche.",
      },
      {
        day: 2,
        title: "Valle del Dades → Garganta de Todra → Campamento del Desierto en Merzouga",
        description:
          "Desayuno en el hotel. Caminata por el punto más estrecho de la garganta de Todra: un corredor de 40 m de ancho entre paredes de piedra caliza de 400 m, con un río claro bajo los pies. Continuación hacia el este por las llanuras presaharianas, pasando pueblos de oasis y pastos nómadas. Llegada a Merzouga por la tarde. Salida en camello para el paseo al atardecer hacia las imponentes dunas de Erg Chebbi. Llegada al campamento cuando el cielo se tiñe de rojo. Tajín marroquí tradicional de cena, música bereber junto al fuego y un cielo repleto de estrellas.",
      },
      {
        day: 3,
        title: "Amanecer en el Sáhara → Pueblo de Merzouga → Ouarzazate",
        description:
          "Despertar a las 5:30 para subir a la duna y ver despertar al Sáhara. Regreso en camello al campamento, desayuno y aseo en la casa de huéspedes de Merzouga. Inicio del regreso por la 'Ruta de las Mil Kasbahs', una ruta distinta y más meridional a través de Tazarine y N'Kob, una hilera de antiguas kasbahs de adobe a lo largo de una vieja ruta de caravanas. Llegada a Ouarzazate por la tarde-noche. Noche en hotel.",
      },
      {
        day: 4,
        title: "Ouarzazate → Aït Ben Haddou → Tizi n'Tichka → Marrakech",
        description:
          "Visita matinal a la Kasbah Taourirt en Ouarzazate (opcional). Breve parada de regreso en Aït Ben Haddou para verlo con otra luz por la mañana. Ascenso de vuelta por el puerto de Tizi n'Tichka con vistas panorámicas del Atlas. Llegada a Marrakech a las 17:00.",
      },
    ],
    meetingPoint: { lat: 31.0580, lng: -4.0127, name: "Merzouga, Erg Chebbi Sahara" },
    featured: true,
    seoTitle: "Tour de Desierto de 4 Días desde Marrakech — Erg Chebbi, Garganta de Todra y Ruta de las Mil Kasbahs | Marrakech Eco Tours",
    seoDescription: "El circuito completo del desierto desde Marrakech — 4 días por Aït Ben Haddou, la garganta de Todra, un campamento del desierto en Erg Chebbi y la Ruta de las Mil Kasbahs. Desde 360 $.",
  },

  // ─────────────────────────────────────────────
  // TOURS DE DESIERTO DESDE AGADIR (nuevos)
  // ─────────────────────────────────────────────
  {
    id: "26",
    slug: "merzouga-3day-agadir",
    title: "Agadir a Merzouga — Tour de 3 Días por el Desierto del Sáhara",
    category: "desert",
    origin: "agadir",
    difficulty: "easy",
    duration: "3 días / 2 noches",
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
      "De la costa atlántica de Agadir al campo de dunas más icónico del Sáhara — pasando por Taroudant, Taliouine, Aït Ben Haddou y la garganta de Todra hasta un paseo en camello al atardecer en Erg Chebbi.",
    description:
      "La mayoría de los tours al Sáhara salen de Marrakech. Este empieza en Agadir, y la ruta sur añade dos lugares que la mayoría de los turistas se pierden: Taroudant, la ciudad amurallada medieval mejor conservada de Marruecos, y Taliouine, la capital mundial del azafrán. Desde ahí, el itinerario sigue la ruta clásica hacia el este, por Ouarzazate, Aït Ben Haddou y la garganta de Todra, antes de llevarte hasta Erg Chebbi —el campo de dunas más espectacular del Sáhara— a tiempo para el paseo en camello al atardecer. Tres días que cubren toda la amplitud del sur de Marruecos.",
    highlights: [
      "Erg Chebbi — paseo en camello al atardecer entre dunas de 160 m",
      "Noche en un campamento bereber del desierto bajo las estrellas",
      "Taroudant — la mejor ciudad amurallada medieval de Marruecos",
      "Taliouine — la capital mundial del azafrán",
      "Ksar de Aït Ben Haddou, Patrimonio de la UNESCO",
      "Caminata por la garganta de Todra (paredes de 400 m)",
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
        title: "Agadir → Taroudant → Taliouine → Aït Ben Haddou → Valle del Dades",
        description:
          "Recogida temprana en tu hotel de Agadir a las 6:30. Trayecto hacia el este hasta Taroudant (1 hora) — paseo por las murallas del siglo XVI y el zoco de especias de esta ciudad medieval perfectamente conservada. Continuación hasta Taliouine, el corazón azafranero de Marruecos, para una breve parada. Trayecto por Ouarzazate y visita al Ksar de Aït Ben Haddou, Patrimonio de la UNESCO. Continuación por el valle del Dades. Llegada al hotel a las 18:00. Cena y noche.",
      },
      {
        day: 2,
        title: "Valle del Dades → Garganta de Todra → Campamento de Erg Chebbi",
        description:
          "Desayuno en el hotel. Caminata por el suelo de la garganta de Todra — paredes de 400 m de piedra caliza rosada que enmarcan un estrecho corredor fluvial. Trayecto hacia el este, cruzando las llanuras del desierto, hasta Merzouga. Salida en camello al atardecer para adentrarte en las imponentes dunas de Erg Chebbi. Se llega al campamento cuando oscurece. Cena de tajín tradicional, música bereber y observación de estrellas en la oscuridad del Sáhara.",
      },
      {
        day: 3,
        title: "Amanecer en el Sáhara → Merzouga → Agadir",
        description:
          "Despertar a las 5:30 para el amanecer sobre las dunas. Paseo en camello de regreso, desayuno en el campamento, aseo en Merzouga. Comienza el largo trayecto de regreso hacia el oeste y el sur, pasando por Rissani, Tazarine y las llanuras del desierto, de vuelta sobre el puerto de Tizi n'Tichka hasta Agadir. Llegada entre las 20:00 y las 21:00.",
      },
    ],
    meetingPoint: { lat: 30.4202, lng: -9.5981, name: "Agadir City Centre" },
    featured: false,
    seoTitle: "Tour de Desierto de 3 Días de Agadir a Merzouga — Erg Chebbi, Taroudant y Taliouine | Marrakech Eco Tours",
    seoDescription: "De la costa atlántica de Agadir al Sáhara — vía Taroudant, Taliouine, Aït Ben Haddou y un paseo en camello al atardecer en Erg Chebbi. Tour de desierto de 3 días con campamento bereber. Desde 295 $.",
  },
  {
    id: "27",
    slug: "zagora-2day-agadir",
    title: "Agadir a Zagora — Tour de 2 Días por el Desierto",
    category: "desert",
    origin: "agadir",
    difficulty: "easy",
    duration: "2 días / 1 noche",
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
      "Dos días desde las playas atlánticas de Agadir hasta el desierto — pasando por la ciudad amurallada de Taroudant, la capital de la alfombra de Taznakht y los 200 km de palmeral del valle del Draa hasta las dunas de Zagora.",
    description:
      "La ruta más rápida de Agadir al desierto no pasa por Marrakech. Se dirige hacia el este por Taroudant y Taznakht, entrando al valle del Draa desde el sur —el oasis más largo de Marruecos, una cinta de palmeras datileras, antiguas kasbahs y asentamientos bereberes que se extiende 200 km por el sur presahariano. Las dunas de Zagora son más tranquilas que las de Merzouga, el ambiente es más íntimo, y tras una noche en un campamento bereber tradicional escuchando música bajo un cielo negro inmenso, el trayecto de vuelta merece por completo la pena.",
    highlights: [
      "Dunas de Zagora — una experiencia de campamento del desierto más tranquila e íntima",
      "Valle del Draa — 200 km de oasis de palmeras datileras y antiguas kasbahs",
      "Taroudant — las murallas medievales mejor conservadas de Marruecos",
      "Taznakht — capital bereber del tejido de alfombras",
      "Paseo en camello al atardecer y observación de estrellas desde el desierto",
      "Biblioteca coránica del siglo XIV de Tamegroute",
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
        title: "Agadir → Taroudant → Taznakht → Valle del Draa → Zagora",
        description:
          "Recogida en tu hotel de Agadir a las 7:30. Trayecto hacia el este hasta Taroudant: paseo por las murallas ocres del siglo XVI y el mercado bereber. Continuación hasta Taznakht, la capital bereber del tejido de alfombras. Entrada al valle del Draa por el oeste y recorrido hacia el sur entre palmerales y pueblos antiguos hasta Zagora. Llegada al campamento del desierto a tiempo para un paseo en camello por las dunas al atardecer. Cena bereber tradicional y música bajo las estrellas.",
      },
      {
        day: 2,
        title: "Amanecer → Tamegroute → Valle del Draa → Agadir",
        description:
          "Paseo opcional en camello al amanecer para ver salir el sol. Desayuno en el campamento. Parada en Tamegroute, un pueblo con una biblioteca coránica del siglo XIV que alberga manuscritos iluminados a mano y una famosa cooperativa de cerámica esmaltada en verde. Trayecto hacia el norte por toda la extensión del valle del Draa con la luz de la mañana. Regreso pasando por Ouarzazate hasta Agadir. Llegada a las 18:30.",
      },
    ],
    meetingPoint: { lat: 30.4202, lng: -9.5981, name: "Agadir City Centre" },
    featured: false,
    seoTitle: "Tour de Desierto de 2 Días de Agadir a Zagora — Valle del Draa, Taroudant y Campamento Bereber | Marrakech Eco Tours",
    seoDescription: "De la costa de Agadir al desierto de Zagora en 2 días — vía Taroudant, los 200 km de palmeral del valle del Draa y un paseo en camello al atardecer. Campamento bereber bajo las estrellas. Desde 179 $.",
  },
  {
    id: "28",
    slug: "erg-chegaga-3day-agadir",
    title: "Agadir a Erg Chegaga — Tour de 3 Días al Desierto Remoto",
    category: "desert",
    origin: "agadir",
    difficulty: "moderate",
    duration: "3 días / 2 noches",
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
      "La mejor ruta de Agadir al Sáhara — hacia el sur, por las estribaciones del Antiatlas y el valle del Draa, hasta llegar en 4x4 a Erg Chegaga, el campo de dunas más remoto de Marruecos.",
    description:
      "Desde Agadir, la ruta hacia Erg Chegaga es la más natural de Marruecos. Dirígete hacia el sur por las estribaciones del Antiatlas, vía Tata y Foum Zguid, entrando al borde del Sáhara desde el oeste, un enfoque muy distinto al de la ruta habitual desde Marrakech. Erg Chegaga es el Sáhara para quienes quieren menos turistas, dunas de mayor extensión total y una sensación más genuina de naturaleza salvaje. El cruce en 4x4 desde M'Hamid forma parte de la aventura. Dos noches en pleno desierto, lejos de todo.",
    highlights: [
      "Erg Chegaga — el campo de dunas más remoto de Marruecos, al que se llega en 4x4",
      "Enfoque sur único vía las estribaciones del Antiatlas y Tata",
      "2 noches en un campamento bereber sin otro campamento a la vista",
      "Regreso por el valle del Draa — corredor completo de 200 km de oasis",
      "Paseos en camello al atardecer y al amanecer en dunas vastas y vacías",
      "Algunos de los cielos más oscuros del norte de África para observar estrellas",
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
        title: "Agadir → Estribaciones del Antiatlas → Tata → Foum Zguid / M'Hamid",
        description:
          "Recogida temprana en Agadir a las 6:30. Trayecto hacia el sur por las estribaciones del Antiatlas —la cadena montañosa más antigua de Marruecos, de aspecto más extraño y ancestral que el Alto Atlas. Paso por el pueblo oasis de Tata y continuación hasta Foum Zguid o M'Hamid, los últimos asentamientos antes de Erg Chegaga. Cena y noche.",
      },
      {
        day: 2,
        title: "Cruce en 4x4 hacia Erg Chegaga",
        description:
          "Tras el desayuno, el asfalto se acaba. Se sube al 4x4 para el cruce todoterreno: dos o tres horas de conducción por hammada abierta, llanuras con fósiles y acacias dispersas. Llegada al borde de Erg Chegaga hacia el mediodía. Paseo en camello adentrándose en el campo de dunas. El campamento se instala en pleno erg. Atardecer sobre las dunas, cena a la luz del fuego, un silencio que no olvidarás.",
      },
      {
        day: 3,
        title: "Amanecer → M'Hamid → Valle del Draa → Agadir",
        description:
          "Despertar antes del amanecer para ver salir el sol por completo sobre las dunas. Desayuno en el campamento. El 4x4 regresa a través del desierto hasta M'Hamid. Trayecto hacia el norte por el valle del Draa —uno de los trayectos más bellos de Marruecos— y de vuelta a Agadir vía Zagora y Ouarzazate. Llegada a Agadir a las 20:00.",
      },
    ],
    meetingPoint: { lat: 30.4202, lng: -9.5981, name: "Agadir City Centre" },
    featured: false,
    seoTitle: "Tour de Desierto de 3 Días de Agadir a Erg Chegaga — Sáhara Remoto y Expedición en 4x4 | Marrakech Eco Tours",
    seoDescription: "El desierto más remoto de Marruecos desde Agadir — 3 días por el Antiatlas hasta Erg Chegaga en 4x4, 2 noches en un campamento bereber privado. Menos turistas, más silencio. Desde 345 $.",
  },
  {
    id: "29",
    slug: "desert-4day-agadir",
    title: "Gran Tour del Desierto desde Agadir — 4 Días",
    category: "desert",
    origin: "agadir",
    difficulty: "easy",
    duration: "4 días / 3 noches",
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
      "Cuatro días desde la costa atlántica hasta el Sáhara y de vuelta — Taroudant, Aït Ben Haddou, la garganta de Todra, una noche completa en un campamento de Erg Chebbi y la Ruta de las Mil Kasbahs.",
    description:
      "El circuito de desierto definitivo partiendo de Agadir, con una ventaja sobre cualquier tour desde Marrakech: dos destinos que los turistas de Marrakech se pierden. Las murallas del siglo XVI perfectamente conservadas de Taroudant y los campos de azafrán de Taliouine bien merecen la madrugada. Desde ahí, el itinerario sigue el gran arco sur: Aït Ben Haddou, Ouarzazate, el valle del Dades, la garganta de Todra y Erg Chebbi, el campo de dunas más icónico de Marruecos. Cuatro días que muestran toda la amplitud y profundidad del sur marroquí.",
    highlights: [
      "Campamento del desierto en Erg Chebbi — dos paseos en camello, una noche completa en el desierto",
      "Taroudant — ciudad amurallada medieval exclusiva de la ruta desde Agadir",
      "Taliouine — la capital mundial del azafrán (exclusiva de la ruta desde Agadir)",
      "Ksar de Aït Ben Haddou, Patrimonio de la UNESCO",
      "Garganta de Todra — camina entre paredes de cañón de 400 m",
      "Ruta de las Mil Kasbahs — regreso por una antigua ruta de caravanas",
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
        title: "Agadir → Taroudant → Taliouine → Aït Ben Haddou → Valle del Dades",
        description:
          "Recogida en tu hotel de Agadir a las 6:30. Trayecto hacia el este hasta Taroudant — recorre las murallas del siglo XVI mejor conservadas de Marruecos y el antiguo mercado bereber de especias. Continuación hasta Taliouine para visitar una cooperativa de azafrán. Trayecto por Ouarzazate y parada en el Ksar de Aït Ben Haddou, Patrimonio de la UNESCO. Continuación por el espectacular valle del Dades. Llegada al hotel a las 18:00. Cena y noche.",
      },
      {
        day: 2,
        title: "Valle del Dades → Garganta de Todra → Campamento de Erg Chebbi",
        description:
          "Desayuno en el hotel. Caminata por el suelo de la garganta de Todra — paredes de piedra caliza de 400 m, un río bajo los pies y casi ninguna multitud a primera hora de la mañana. Trayecto hacia el este por el paisaje de oasis presahariano hasta Merzouga. Sube al camello en el borde de la duna y adéntrate en Erg Chebbi mientras se pone el sol. Llegada al campamento al caer la noche. Tajín tradicional, música gnawa y observación de estrellas en el cielo del Sáhara.",
      },
      {
        day: 3,
        title: "Amanecer en el Sáhara → Ruta de las Mil Kasbahs → Ouarzazate",
        description:
          "Despertar antes del amanecer para ver salir el sol sobre las dunas. Regreso en camello al campamento. Desayuno y aseo. Toma la Ruta de las Mil Kasbahs, una ruta de regreso meridional a través de Tazarine, N'Kob y el corredor del valle del Draa, jalonada de antiguas kasbahs de adobe que en su día sirvieron a las caravanas transaharianas. Llegada a Ouarzazate por la tarde-noche. Noche en hotel.",
      },
      {
        day: 4,
        title: "Ouarzazate → Aït Ben Haddou → Tizi n'Tichka → Agadir",
        description:
          "Visita matinal opcional a los Estudios Atlas o a la Kasbah Taourirt en Ouarzazate. Breve parada en Aït Ben Haddou con la luz de la mañana. Cruce por Marrakech y el Antiatlas hasta Agadir. Llegada a las 20:00.",
      },
    ],
    meetingPoint: { lat: 30.4202, lng: -9.5981, name: "Agadir City Centre" },
    featured: false,
    seoTitle: "Tour de Desierto de 4 Días desde Agadir — Erg Chebbi, Taroudant, Garganta de Todra y Ruta de las Mil Kasbahs | Marrakech Eco Tours",
    seoDescription: "El gran tour de desierto completo desde Agadir — 4 días por Taroudant, Aït Ben Haddou, la garganta de Todra, un campamento en Erg Chebbi y la Ruta de las Mil Kasbahs. Desde 420 $.",
  },

  // ─────────────────────────────────────────────
  // CIUDADES IMPERIALES DESDE AGADIR
  // ─────────────────────────────────────────────
  {
    id: "19",
    slug: "agadir-to-fes-4day",
    title: "Agadir a Fez — Tour de 4 Días por las Ciudades Imperiales",
    category: "cultural",
    origin: "agadir",
    difficulty: "easy",
    duration: "4 días / 3 noches",
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
      "De la costa atlántica al corazón medieval de Marruecos — Marrakech, el Alto Atlas, los bosques de cedros y la antigua medina de Fez.",
    description:
      "Partiendo de Agadir, este viaje de cuatro días asciende desde la costa atlántica, atravesando Marrakech y el Alto Atlas, hasta llegar a Fez el-Bali, la ciudad medieval habitada más grande del mundo. Cruza el puerto de Tizi n'Tichka, detente en el Ksar de Aït Ben Haddou, Patrimonio de la UNESCO, camina por los bosques de cedros del Atlas Medio donde campan monos de Berbería salvajes, y piérdete en los laberínticos zocos de Fez.",
    highlights: [
      "Puerto de montaña de Tizi n'Tichka (2.260 m)",
      "Ksar de Aït Ben Haddou, Patrimonio de la Humanidad por la UNESCO",
      "Ifrane — el pueblo alpino de Marruecos",
      "Bosque de cedros de Azrou y monos de Berbería",
      "Medina de Fez el-Bali y curtidurías Chouara",
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
          "Salida de Agadir por la mañana. Trayecto hacia el norte por la llanura atlántica hasta Marrakech (3h). Tarde libre o paseo opcional por la medina. Noche en un riad de Marrakech.",
      },
      {
        day: 2,
        title: "Marrakech → Tizi n'Tichka → Aït Ben Haddou → Midelt",
        description:
          "Ascenso del Atlas por Tizi n'Tichka. Visita a Aït Ben Haddou. Continuación por el valle del Ziz hasta Midelt para pasar la noche.",
      },
      {
        day: 3,
        title: "Midelt → Ifrane → Bosque de Cedros de Azrou → Fez",
        description:
          "Trayecto por el Atlas Medio. Parada en Ifrane y en el bosque de cedros de Azrou para ver monos de Berbería salvajes. Llegada a Fez por la tarde. Instalación en el riad.",
      },
      {
        day: 4,
        title: "Día Completo en la Medina de Fez",
        description:
          "Exploración guiada de Fez el-Bali: curtidurías Chouara, Universidad de Al-Qarawiyyin, Medersa Bou Inania y los zocos laberínticos. El tour termina en Fez.",
      },
    ],
    meetingPoint: { lat: 34.0331, lng: -5.0003, name: "Fes el-Bali, Imperial City" },
    seoTitle: "Tour de 4 Días de Agadir a Fez — Alto Atlas, Aït Ben Haddou y Ciudad Imperial | Marrakech Eco Tours",
    seoDescription: "Viaja de Agadir a Fez pasando por Marrakech, Tizi n'Tichka y los bosques de cedros del Atlas Medio. Tour privado en 4x4 de 4 días con alojamiento en riad. Desde 360 $.",
    featured: false,
  },
  {
    id: "20",
    slug: "agadir-to-chefchaouen-5day",
    title: "Agadir a Chefchaouen — Tour de 5 Días por la Ciudad Azul",
    category: "cultural",
    origin: "agadir",
    difficulty: "easy",
    duration: "5 días / 4 noches",
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
      "Cinco días desde la costa atlántica hasta las calles azules de Chefchaouen — pasando por Marrakech, Fez y las ruinas romanas de Volubilis.",
    description:
      "Este circuito de cinco días comienza en Agadir y va enlazando los destinos más fotogénicos de Marruecos. Sube hasta Marrakech, cruza los bosques de cedros del Atlas Medio, explora Fez el-Bali —la ciudad medieval más grande del mundo—, visita las ruinas romanas de Volubilis y las puertas imperiales de Mequinez, y termina en Chefchaouen, la legendaria Ciudad Azul que se derrama por las laderas del Rif.",
    highlights: [
      "Chefchaouen — la Ciudad Azul de las montañas del Rif",
      "Medina de Fez el-Bali, Patrimonio UNESCO, y curtidurías Chouara",
      "Bosque de cedros de Azrou y monos de Berbería salvajes",
      "Ruinas romanas de Volubilis (Patrimonio de la Humanidad por la UNESCO)",
      "Mequinez — el Versalles marroquí",
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
          "Salida de Agadir por la mañana. Trayecto hacia el norte hasta Marrakech (3h). Tarde libre. Noche en un riad de Marrakech.",
      },
      {
        day: 2,
        title: "Marrakech → Ifrane → Fez",
        description:
          "Salida temprana de Marrakech. Cruce del Atlas Medio. Parada en Ifrane y en el bosque de cedros de Azrou para ver monos de Berbería. Llegada a Fez por la tarde. Instalación en el riad.",
      },
      {
        day: 3,
        title: "Día Completo en la Medina de Fez",
        description:
          "Día completo guiado por Fez el-Bali: curtidurías Chouara, Universidad de Al-Qarawiyyin, Medersa Bou Inania y los antiguos zocos. Paseo por la tarde-noche sobre las murallas de la medina.",
      },
      {
        day: 4,
        title: "Fez → Volubilis → Mequinez → Chefchaouen",
        description:
          "Visita matinal a Volubilis, las ruinas romanas mejor conservadas de Marruecos. Trayecto a Mequinez (el Versalles marroquí). Continuación hasta Chefchaouen, en las montañas del Rif. Llegada por la tarde-noche.",
      },
      {
        day: 5,
        title: "Día Completo en Chefchaouen",
        description:
          "Día completo en la Ciudad Azul. Paseo guiado por los callejones azules de la medina, el mirador de la Mezquita Española y la cascada de Ras El-Maa. El tour concluye en Chefchaouen.",
      },
    ],
    meetingPoint: { lat: 35.1688, lng: -5.2636, name: "Chefchaouen, Rif Mountains" },
    seoTitle: "Tour de 5 Días de Agadir a Chefchaouen — Fez, Volubilis y Ciudad Azul | Marrakech Eco Tours",
    seoDescription: "Tour de 5 días desde Agadir hasta la Ciudad Azul de Marruecos, pasando por Marrakech, Fez, las ruinas romanas de Volubilis y las puertas imperiales de Mequinez. 4x4 privado con riads. Desde 420 $.",
    featured: false,
  },
  {
    id: "21",
    slug: "agadir-imperial-cities-6day",
    title: "Agadir — Las 4 Ciudades Imperiales — Gran Tour de 6 Días",
    category: "cultural",
    origin: "agadir",
    difficulty: "easy",
    duration: "6 días / 5 noches",
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
      "Las cuatro capitales imperiales de Marruecos en seis días desde la costa atlántica — Marrakech, Mequinez, Fez y Rabat.",
    description:
      "Partiendo de Agadir, este gran circuito de seis días recorre las cuatro ciudades imperiales de Marruecos —Marrakech, Mequinez, Fez y Rabat—, cada una un capítulo distinto de los mil años de historia del país. De la ciudad rosa de Marrakech a la medina laberíntica de Fez, las puertas monumentales de Mequinez y la capital costera de Rabat, Patrimonio de la UNESCO. Uno de los grandes viajes terrestres de África.",
    highlights: [
      "Las 4 Ciudades Imperiales: Marrakech, Mequinez, Fez, Rabat",
      "Ruinas romanas de Volubilis (Patrimonio de la Humanidad por la UNESCO)",
      "Mezquita Hassan II en Rabat",
      "Curtidurías Chouara en Fez",
      "Bab Mansour — la gran puerta del norte de África",
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
          "Salida de Agadir por la mañana. Trayecto hacia el norte hasta Marrakech (3h). Paseo por la medina por la tarde o tiempo libre. Noche en un riad de Marrakech.",
      },
      {
        day: 2,
        title: "Marrakech → Aït Ben Haddou → Ouarzazate → Midelt",
        description:
          "Trayecto hacia el norte desde Marrakech a través del Atlas. Parada en Aït Ben Haddou. Continuación hasta Midelt para pasar la noche en la altiplanicie entre las dos cadenas del Atlas.",
      },
      {
        day: 3,
        title: "Midelt → Volubilis → Mequinez",
        description:
          "Mañana en las ruinas romanas de Volubilis. Tarde en Mequinez: la puerta de Bab Mansour, los graneros reales y los zocos de la medina. Noche en Mequinez.",
      },
      {
        day: 4,
        title: "Mequinez → Día Completo en Fez",
        description:
          "Día completo en Fez el-Bali con un guía experto. Curtidurías Chouara, Al-Qarawiyyin, Medersa Bou Inania y el antiguo zoco de los joyeros. Noche en Fez.",
      },
      {
        day: 5,
        title: "Fez → Rabat",
        description:
          "Trayecto hacia el oeste hasta Rabat, en la costa atlántica. Visita a la Torre Hassan y el Mausoleo de Mohammed V, la Kasbah de los Oudayas y la medina amurallada. Noche en Rabat.",
      },
      {
        day: 6,
        title: "Rabat → Casablanca → Marrakech",
        description:
          "Parada opcional en la Mezquita Hassan II de Casablanca (exterior — la mayor mezquita del mundo fuera de Arabia Saudí). Continuación hacia el sur, a Marrakech. Traslado a Agadir o noche adicional. El tour concluye.",
      },
    ],
    meetingPoint: { lat: 34.0209, lng: -6.8416, name: "Rabat, Atlantic Capital" },
    seoTitle: "Tour de 6 Días por las 4 Ciudades Imperiales de Marruecos desde Agadir — Marrakech, Mequinez, Fez y Rabat | Marrakech Eco Tours",
    seoDescription: "Gran circuito de 6 días desde Agadir por las cuatro ciudades imperiales de Marruecos — Marrakech, Mequinez, Fez y Rabat. 4x4 privado con alojamiento en riad. Desde 560 $.",
    featured: false,
  },

  // ─────────────────────────────────────────────
  // NUEVOS TREKKINGS DEL ALTO ATLAS / TOUBKAL
  // ─────────────────────────────────────────────
  {
    id: "30",
    slug: "toubkal-circuit-ifni-lake-6day",
    title: "Circuito del Toubkal y Lago Ifni — Trekking de 6 Días",
    category: "trekking",
    origin: "marrakech",
    difficulty: "challenging",
    duration: "6 días / 5 noches",
    groupSize: "2–12 people",
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
      "El circuito completo alrededor del Jbel Toubkal — remotos pueblos bereberes, puertos de más de 3.600 m, el turquesa Lago Ifni y un final de cima a 4.167 m.",
    description:
      "El circuito del Toubkal es la travesía completa del Alto Atlas: un anillo entero alrededor del macizo que pocos senderistas llegan a completar. A lo largo de seis días cruzarás cuatro puertos importantes, caminarás por las remotas zonas de pasto y los pueblos del Parque Nacional del Toubkal, acamparás junto al extraordinario Lago Ifni de aguas turquesa y terminarás coronando el propio Jbel Toubkal. Mucho más variado y remoto que el ascenso directo a la cima, este es el Toubkal para conocedores.",
    highlights: [
      "Acampa junto al turquesa Lago Ifni (2.295 m), el lago más bello del Atlas",
      "Cruza cuatro puertos de altura, incluidos Tizi n'Ouanoums (3.664 m) y Tizi Likemt (3.555 m)",
      "Cima del Jbel Toubkal (4.167 m) — el pico más alto del norte de África",
      "Duerme en remotos pueblos bereberes a los que rara vez llegan otros senderistas",
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
        title: "Marrakech → Imlil → Tachedirt (2.300 m)",
        description:
          "Traslado desde Marrakech a Imlil (1h30). Trekking por el valle de Imenane, pasando campos en terrazas y pueblos bereberes, hasta Tachedirt. Unas 5 horas de caminata.",
      },
      {
        day: 2,
        title: "Tachedirt → Tizi Likemt (3.555 m) → Azib Likemt (2.250 m)",
        description:
          "Ascenso al puerto de Tizi Likemt con amplias vistas del Alto Atlas, y descenso hasta los pastos de verano de Azib Likemt. 6–7 horas.",
      },
      {
        day: 3,
        title: "Azib Likemt → Tizi n'Ourai → Amsouzart (1.740 m)",
        description:
          "Se sigue el río Ourai, se cruza un puerto muy escénico y se desciende hasta el acogedor pueblo de Amsouzart para pasar la noche en una casa de familia. Unas 6 horas.",
      },
      {
        day: 4,
        title: "Amsouzart → Lago Ifni (2.295 m)",
        description:
          "Una subida gradual lleva hasta el turquesa Lago Ifni, situado dramáticamente entre picos escarpados. Tarde libre junto al agua. 4–5 horas.",
      },
      {
        day: 5,
        title: "Lago Ifni → Tizi n'Ouanoums (3.664 m) → Refugio del Toubkal (3.207 m)",
        description:
          "Ascenso pronunciado y pedregoso hasta el puerto de Ouanoums, con vistas sobre el lago, y descenso hasta el Refugio del Toubkal. Noche temprana antes del día de cima. Unas 6 horas.",
      },
      {
        day: 6,
        title: "Cima del Toubkal (4.167 m) → Imlil → Marrakech",
        description:
          "Ascenso antes del amanecer por el Circo Sur hasta el techo del norte de África, con la cima al amanecer. Descenso a Imlil y traslado de vuelta a Marrakech. Un último día largo y gratificante.",
      },
    ],
    meetingPoint: { lat: 31.1369, lng: -7.9169, name: "Imlil Village, Atlas Mountains" },
    seoTitle: "Trekking de 6 Días — Circuito del Toubkal vía Lago Ifni desde Marrakech | Marrakech Eco Tours",
    seoDescription: "El circuito completo de 6 días del Toubkal desde Marrakech — puertos de altura, el turquesa Lago Ifni y la cima del Jbel Toubkal (4.167 m). Guía bereber titulado, todas las comidas y traslados. Desde 620 $.",
    featured: false,
  },
  {
    id: "31",
    slug: "toubkal-summit-2day-marrakech",
    title: "Toubkal Exprés — Cima en 2 Días desde Marrakech",
    category: "trekking",
    origin: "marrakech",
    difficulty: "challenging",
    duration: "2 días / 1 noche",
    groupSize: "2–12 people",
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
      "La forma más rápida de llegar al techo del norte de África — corona el Jbel Toubkal (4.167 m) en un ascenso concentrado de dos días desde Marrakech.",
    description:
      "¿Poco tiempo pero decidido a ponerte de pie en el punto más alto del norte de África? El ascenso al Toubkal en 2 días es la ruta más directa hasta la cima. Conduce desde Marrakech hasta Imlil, sube al Refugio del Toubkal pasando por el santuario de Sidi Chamharouch el primer día, y realiza el ascenso final antes del amanecer el segundo día, antes de bajar todo el camino de vuelta a Marrakech. Es exigente —sin día de aclimatación— así que hace falta buena condición física, pero ofrece toda la experiencia del Toubkal en un solo fin de semana.",
    highlights: [
      "Cima del Jbel Toubkal (4.167 m) en solo dos días desde Marrakech",
      "Noche en el Refugio del Toubkal, a 3.207 m",
      "Paso por el santuario de Sidi Chamharouch y su cascada",
      "Panorámica del amanecer sobre todo el Alto Atlas",
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
        title: "Marrakech → Imlil → Refugio del Toubkal (3.207 m)",
        description:
          "Traslado matinal desde Marrakech a Imlil (1h30). Ascenso por el valle de Aït Mizane, pasando por el santuario de Sidi Chamharouch, hasta el Refugio del Toubkal. 4–5 horas de caminata. Cena y noche temprana.",
      },
      {
        day: 2,
        title: "Cima del Toubkal (4.167 m) → Imlil → Marrakech",
        description:
          "Salida antes del amanecer para la cima vía el Circo Sur (unas 3 horas de ascenso). Amanecer desde el techo del norte de África, y después descenso al refugio para almorzar y continuar bajando hasta Imlil (4–5 horas de descenso en total). Traslado de vuelta a Marrakech.",
      },
    ],
    faq: [
      { q: "¿De verdad bastan dos días para subir al Toubkal?", a: "Es suficiente para hacer cima, y los senderistas con buena forma física lo consiguen habitualmente. Lo que no ofrece es tiempo para aclimatarse: pasas de Marrakech a 4.167 metros en unas treinta horas. Si tienes experiencia en montaña y poco tiempo, funciona; para una primera vez en altitud, el de 4 días es la opción más segura." },
      { q: "¿Qué implica el primer día?", a: "Un traslado temprano desde Marrakech a Imlil, de hora y media, y después cuatro o cinco horas de caminata por el valle de Aït Mizane, pasando por el santuario de Sidi Chamharouch, hasta el Refugio del Toubkal, a 3.207 metros. Cena en el refugio y noche temprana antes de la salida hacia la cima." },
      { q: "¿Qué tan duro es el descenso?", a: "Más largo de lo que la gente espera. Tras la cima se baja de nuevo al refugio y se continúa hasta Imlil: cuatro o cinco horas de descenso en total, sobre terreno suelto y con las piernas cansadas. Aquí es donde se resienten las rodillas, y merece la pena entrenarlo específicamente." },
      { q: "¿Puedo hacer este trekking en invierno?", a: "Solo con equipo de invierno y un guía cualificado para esas condiciones. De aproximadamente noviembre a marzo, la parte alta de la ruta está cubierta de nieve y exige crampones, piolet y la técnica para usarlos. Se convierte en una salida de montañismo más que en una simple caminata." },
    ],
    meetingPoint: { lat: 31.1369, lng: -7.9169, name: "Imlil Village, Atlas Mountains" },
    seoTitle: "Trekking al Monte Toubkal en 2 Días desde Marrakech — Cima Exprés a 4.167 m | Marrakech Eco Tours",
    seoDescription: "Sube al Jbel Toubkal (4.167 m) en 2 días desde Marrakech — la ruta más rápida al pico más alto del norte de África. Noche en refugio, todas las comidas, guía bereber titulado y traslados. Desde 210 $.",
    featured: false,
  },
  {
    id: "32",
    slug: "toubkal-aguelzim-pass-3day",
    title: "Cima del Toubkal vía el Puerto de Aguelzim — Trekking de 3 Días",
    category: "trekking",
    origin: "marrakech",
    difficulty: "challenging",
    duration: "3 días / 2 noches",
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
      "La ruta escénica hacia la cima — por el valle de Azzaden, pasando las cascadas de Ighouliden, hasta el Puerto de Aguelzim (3.560 m) y el Toubkal.",
    description:
      "Esta ruta de tres días toma el camino trasero, más tranquilo y bello, hacia el Toubkal. En lugar del valle directo de Aït Mizane, te adentras en el salvaje valle de Azzaden, pasando las cascadas de Ighouliden y los prados de Azib Tamsoult, y cruzas el dramático Puerto de Aguelzim (3.560 m) para llegar al Refugio del Toubkal. El último día es el ascenso final. Es un enfoque más gratificante y escénico que la ruta estándar, con auténtica variedad de alta montaña. Nota: el puerto de Aguelzim solo es transitable, en general, entre mayo y octubre.",
    highlights: [
      "Trekking por el salvaje valle de Azzaden — más tranquilo y verde que la ruta estándar",
      "Paso por las espectaculares cascadas de Ighouliden (Tamsoult)",
      "Cruce del alto Puerto de Aguelzim, a 3.560 m",
      "Cima del Jbel Toubkal (4.167 m), el pico más alto del norte de África",
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
        title: "Marrakech → Imlil → Valle de Azzaden (Azib Tamsoult)",
        description:
          "Traslado desde Marrakech a Imlil. Ascenso por el puerto de Tizi n'Mzik (2.450 m) hacia el valle de Azzaden, pasando las cascadas de Ighouliden, hasta el refugio cerca de Azib Tamsoult. Unas 6 horas.",
      },
      {
        day: 2,
        title: "Azzaden → Puerto de Aguelzim (3.560 m) → Refugio del Toubkal (3.207 m)",
        description:
          "Ascenso exigente para salir del valle de Azzaden por el Puerto de Aguelzim, con grandes vistas del Atlas occidental, y descenso hasta el Refugio del Toubkal. Unas 6–7 horas. Noche temprana antes de la cima.",
      },
      {
        day: 3,
        title: "Cima del Toubkal (4.167 m) → Imlil → Marrakech",
        description:
          "Ascenso antes del amanecer por el Circo Sur hasta la cima con el amanecer. Largo descenso hasta Imlil (pasando por el refugio), y traslado a Marrakech. Un último día exigente pero inolvidable.",
      },
    ],
    meetingPoint: { lat: 31.1369, lng: -7.9169, name: "Imlil Village, Atlas Mountains" },
    seoTitle: "Trekking de 3 Días al Toubkal vía el Puerto de Aguelzim desde Marrakech — Ruta del Valle de Azzaden | Marrakech Eco Tours",
    seoDescription: "Sube al Toubkal (4.167 m) por la ruta escénica — 3 días por el valle de Azzaden, las cascadas de Ighouliden y el Puerto de Aguelzim (3.560 m). Guía titulado, refugios, todas las comidas y traslados. Desde 330 $.",
    featured: false,
  },
  {
    id: "33",
    slug: "toubkal-three-peaks-4000m-3day",
    title: "Toubkal: Tres Picos de 4.000 m — Desafío de 3 Días",
    category: "trekking",
    origin: "marrakech",
    difficulty: "expert",
    duration: "3 días / 2 noches",
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
      "Corona tres de las cumbres de 4.000 m del Alto Atlas en tres días — Ras Ouanoukrim, Timesguida y el Jbel Toubkal.",
    description:
      "Para senderistas fuertes y experimentados, este es el desafío definitivo del Alto Atlas: tres cimas de 4.000 metros en tres días. Desde el Refugio del Toubkal se ascienden los picos gemelos de Ouanoukrim —Timesguida (4.089 m) y Ras (4.083 m)— antes del gran final en el propio Jbel Toubkal (4.167 m). Con poco tiempo para aclimatarse y 1.000 m de desnivel positivo en días consecutivos, exige forma física y experiencia de montaña reales, pero recompensa con tres de los puntos más altos del norte de África.",
    highlights: [
      "Corona tres cimas de 4.000 m: Timesguida (4.089 m), Ras Ouanoukrim (4.083 m) y Toubkal (4.167 m)",
      "Uno de los trekkings más duros y gratificantes del Alto Atlas",
      "Base en el Refugio del Toubkal, a 3.207 m",
      "Cimas al amanecer y vistas inmensas hacia el Sáhara y el Antiatlas",
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
        title: "Marrakech → Imlil → Refugio del Toubkal (3.207 m)",
        description:
          "Traslado desde Marrakech a Imlil. Ascenso por el valle de Aït Mizane, pasando por Sidi Chamharouch, hasta el Refugio del Toubkal. 4–5 horas. Aclimatación y descanso antes de dos grandes días de cima.",
      },
      {
        day: 2,
        title: "Ouanoukrim — Timesguida (4.089 m) y Ras (4.083 m)",
        description:
          "Ascenso hasta la zona de Tizi n'Ouanoums y escalada de las dos cumbres gemelas de Ouanoukrim, Timesguida y Ras, ambas por encima de los 4.000 m. Regreso al Refugio del Toubkal para pasar la noche. Un día completo y exigente.",
      },
      {
        day: 3,
        title: "Cima del Toubkal (4.167 m) → Imlil → Marrakech",
        description:
          "Ascenso final al Jbel Toubkal por el Circo Sur al amanecer, la más alta de las tres cimas. Largo descenso hasta Imlil y traslado de vuelta a Marrakech.",
      },
    ],
    meetingPoint: { lat: 31.1369, lng: -7.9169, name: "Imlil Village, Atlas Mountains" },
    seoTitle: "Desafío de los Tres Picos de 4.000 m del Toubkal — Trekking de 3 Días por el Alto Atlas | Marrakech Eco Tours",
    seoDescription: "Corona tres cimas de 4.000 m del Alto Atlas en 3 días — Timesguida (4.089 m), Ras Ouanoukrim (4.083 m) y Toubkal (4.167 m). Trekking de nivel experto desde Marrakech con guía titulado. Desde 360 $.",
    featured: false,
  },
  {
    id: "34",
    slug: "marrakech-food-market-tour",
    title: "Tour Gastronómico y de Mercados de Marrakech — Ruta Culinaria de Medio Día",
    category: "day-tours",
    origin: "marrakech",
    difficulty: "easy",
    isDayTour: true,
    duration: "Medio día (4 horas)",
    groupSize: "2–8 people",
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
      "Recorre los zocos de especias y los puestos de mercado de la medina con un guía local, probando platos por el camino, y termina cocinando un tajín desde cero.",
    description:
      "Marrakech es la capital gastronómica de Marruecos, y esta ruta de medio día está construida precisamente en torno a esa idea. Empieza en Rahba Kedima, la plaza de las especias, aprendiendo a distinguir el azafrán auténtico de las imitaciones teñidas y a reconocer la docena larga de especias que componen el ras el hanout. Continúa por los zocos de alimentación probando aceitunas, dátiles, msemen y zumo de naranja recién exprimido en los puestos de la Jemaa el-Fna. Termina en la cocina de una familia local con una clase práctica de tajín y té de menta marroquí: te comes lo que cocinas.",
    highlights: [
      "Plaza de especias de Rahba Kedima — azafrán auténtico frente a imitaciones teñidas",
      "Degustaciones guiadas por los zocos de alimentación en funcionamiento de la medina",
      "Clase práctica de cocina de tajín con una familia local",
      "Ceremonia del té de menta marroquí, como es debido",
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
        title: "Medio Día — Mercados de la Medina y Clase de Cocina",
        description:
          "Encuentro en la plaza de especias de Rahba Kedima a las 9:30. Paseo guiado por los zocos de especias y alimentación con degustaciones (90 minutos). Continuación hasta la cocina de una familia local para una clase práctica de tajín. Almuerzo del tajín que has cocinado, rematado con té de menta. Finaliza a la 13:30.",
      },
    ],
    meetingPoint: { lat: 31.6316, lng: -7.9868, name: "Rahba Kedima Spice Square, Marrakech Medina" },
    seoTitle: "Tour Gastronómico y de Mercados de Marrakech — Ruta por el Zoco de Especias y Clase de Cocina | Marrakech Eco Tours",
    seoDescription: "Tour gastronómico de medio día por Marrakech: recorre los zocos de especias probando platos y luego cocina un auténtico tajín con una familia local. Grupo reducido, guía local. Desde 45 $.",
    faq: [
      { q: "¿Es adecuado este tour para vegetarianos?", a: "Sí. La clase de cocina y las degustaciones pueden ser totalmente vegetarianas si lo solicitas — avísanos al reservar. La mayoría de las degustaciones del zoco (aceitunas, dátiles, especias, zumo fresco) son vegetarianas por defecto." },
      { q: "¿Necesitamos llegar con hambre?", a: "Ven con apetito, pero no del todo en ayunas: el paseo incluye una docena de pequeñas degustaciones antes incluso de llegar a la clase de cocina, así que dosifícate y evita un desayuno copioso." },
      { q: "¿En qué se diferencia de un tour normal por la medina?", a: "Un tour genérico de la medina cubre monumentos e historia. Este está construido enteramente en torno a la comida —donde compran y comen realmente los locales, no los puestos orientados al turista cerca de Jemaa el-Fna— y termina con tu propia cocina, no solo mirando." },
    ],
    featured: false,
  },
  {
    id: "35",
    slug: "merzouga-stargazing-desert-tour",
    title: "Observación de Estrellas en el Sáhara de Merzouga — Tour de 2 Días por el Desierto de Cielos Oscuros",
    category: "desert",
    origin: "marrakech",
    difficulty: "easy",
    duration: "2 días / 1 noche",
    groupSize: "2–10 people",
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
      "Paseo en camello por Erg Chebbi al atardecer, seguido de una sesión guiada de observación de estrellas a simple vista y con telescopio bajo uno de los cielos más oscuros del norte de África.",
    description:
      "Erg Chebbi está lo bastante lejos de cualquier ciudad como para que la Vía Láctea se vea a simple vista en una noche despejada — este viaje está construido en torno a ese hecho, no lo trata como un simple extra. Después del paseo en camello al atardecer y la cena en el campamento, un guía de astronomía local monta un telescopio y lleva al grupo por los planetas visibles, las constelaciones y los objetos de cielo profundo, explicado en lenguaje sencillo, sin tecnicismos. Mejor entre octubre y mayo, cuando el cielo nocturno del desierto está en su punto más despejado y el calor ha bajado lo suficiente como para sentarse fuera cómodamente durante horas.",
    highlights: [
      "Sesión guiada de observación de estrellas a simple vista y con telescopio, con un guía de astronomía",
      "Paseo en camello al atardecer por las dunas de Erg Chebbi",
      "Una noche en un campamento bereber tradicional del desierto, lejos de toda contaminación lumínica",
      "El mejor cielo nocturno del desierto en Marruecos — sin resplandor urbano en ninguna dirección",
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
        title: "Marrakech → Campamento del Desierto en Erg Chebbi",
        description:
          "Salida temprana de Marrakech, cruzando el Alto Atlas y el valle del Draa hasta Merzouga. Paseo en camello al atardecer por las dunas de Erg Chebbi. Cena en el campamento, seguida de la sesión guiada de observación de estrellas una vez cae la noche cerrada.",
      },
      {
        day: 2,
        title: "Amanecer → Merzouga → Marrakech",
        description:
          "Observación opcional del amanecer sobre las dunas. Desayuno en el campamento, traslado en camello o 4x4 de vuelta a Merzouga, y trayecto de regreso a Marrakech, con llegada por la tarde-noche.",
      },
    ],
    meetingPoint: { lat: 31.0580, lng: -4.0127, name: "Merzouga, Erg Chebbi Sahara" },
    seoTitle: "Tour de Observación de Estrellas en Merzouga — Viaje de 2 Días al Desierto de Cielos Oscuros del Sáhara | Marrakech Eco Tours",
    seoDescription: "Tour de 2 días de Marrakech a Merzouga para observar estrellas — paseo en camello al atardecer, sesión guiada con telescopio y una noche en un campamento del desierto en Erg Chebbi. Desde 210 $.",
    faq: [
      { q: "¿Necesito conocimientos previos de astronomía o mi propio equipo?", a: "No. El guía aporta el telescopio y lo explica todo desde cero: está pensado tanto para principiantes absolutos como para quienes ya tienen interés en la astronomía." },
      { q: "¿Cuál es la mejor época del año para este tour?", a: "De octubre a mayo. El cielo está más despejado y la noche del desierto es lo bastante fresca como para estar sentado fuera cómodamente; las noches de verano también son estrelladas, pero mucho más calurosas." },
      { q: "¿Qué pasa si está nublado?", a: "Los cielos despejados en Erg Chebbi son lo habitual, salvo en raras tormentas invernales, pero si las nubes impiden la sesión de observación de estrellas, la experiencia del campamento, el paseo en camello y la cena se mantienen igualmente." },
    ],
    featured: false,
  },
];
