import type { Locale } from "@/app/[lang]/dictionaries";

/**
 * The homepage map's place text (components/map/ToursMap.tsx) in every
 * language. Until 2026-10-13 the map's names, descriptions and "known for"
 * lists were English on all six locales; the English stays in the component,
 * these replace it per locale, place by place.
 *
 * Facts must match the English exactly: change a figure there, change it here.
 */
export interface PlaceText {
  name: string;
  subtitle: string;
  description: string;
  known: string[];
}

/** Map category pill and the panel's button to the destination page. */
export interface CategoryText {
  pill: string;
  cta: string;
}

export const MAP_CATEGORY_TEXT: Record<Locale, Record<string, CategoryText>> = {
  en: {
    cultural: { pill: "Cultural", cta: "Browse Cultural tours →" },
    trekking: { pill: "Trekking", cta: "Browse Trekking tours →" },
    desert: { pill: "Desert", cta: "Browse Desert tours →" },
    "day-tours": { pill: "Day Tours", cta: "Browse Day Tours →" },
    hiking: { pill: "Hiking", cta: "Browse Hiking tours →" },
  },
  fr: {
    cultural: { pill: "Culturel", cta: "Voir les circuits culturels →" },
    trekking: { pill: "Trekking", cta: "Voir les treks →" },
    desert: { pill: "Désert", cta: "Voir les circuits dans le désert →" },
    "day-tours": { pill: "Excursion", cta: "Voir les excursions →" },
    hiking: { pill: "Randonnée", cta: "Voir les randonnées →" },
  },
  es: {
    cultural: { pill: "Cultural", cta: "Ver tours culturales →" },
    trekking: { pill: "Trekking", cta: "Ver trekkings →" },
    desert: { pill: "Desierto", cta: "Ver tours por el desierto →" },
    "day-tours": { pill: "Excursión", cta: "Ver excursiones →" },
    hiking: { pill: "Senderismo", cta: "Ver rutas de senderismo →" },
  },
  de: {
    cultural: { pill: "Kultur", cta: "Kulturtouren ansehen →" },
    trekking: { pill: "Trekking", cta: "Trekkingtouren ansehen →" },
    desert: { pill: "Wüste", cta: "Wüstentouren ansehen →" },
    "day-tours": { pill: "Tagesausflug", cta: "Tagesausflüge ansehen →" },
    hiking: { pill: "Wandern", cta: "Wandertouren ansehen →" },
  },
  it: {
    cultural: { pill: "Cultura", cta: "Scopri i tour culturali →" },
    trekking: { pill: "Trekking", cta: "Scopri i trekking →" },
    desert: { pill: "Deserto", cta: "Scopri i tour nel deserto →" },
    "day-tours": { pill: "Gita", cta: "Scopri le gite giornaliere →" },
    hiking: { pill: "Escursionismo", cta: "Scopri le escursioni →" },
  },
  ar: {
    cultural: { pill: "ثقافة", cta: "تصفح الجولات الثقافية ←" },
    trekking: { pill: "تسلق", cta: "تصفح رحلات التسلق ←" },
    desert: { pill: "صحراء", cta: "تصفح الجولات الصحراوية ←" },
    "day-tours": { pill: "رحلة يوم", cta: "تصفح جولات اليوم الواحد ←" },
    hiking: { pill: "مشي", cta: "تصفح رحلات المشي ←" },
  },
};

export const MAP_PLACE_TEXT: Partial<Record<Locale, Record<string, PlaceText>>> = {
  fr: {
    marrakech: {
      name: "Marrakech",
      subtitle: "La Ville rouge",
      description: "La ville la plus vibrante du Maroc, un labyrinthe millénaire de souks, de palais et de spectacles de rue à l'ombre de l'Atlas.",
      known: ["Jemaa el-Fna, le plus grand théâtre à ciel ouvert du monde", "Réseau de souks des 14 corporations et médina ancienne", "Mosquée Koutoubia et tombeaux saadiens", "Jardin Majorelle et riads cachés", "Porte d'entrée du Haut Atlas"],
    },
    toubkal: {
      name: "Jbel Toubkal",
      subtitle: "Le toit de l'Afrique du Nord",
      description: "Le grand défi du Haut Atlas : monter à travers villages berbères et vallées glaciaires jusqu'au plus haut sommet d'Afrique du Nord, à 4 167 m.",
      known: ["Plus haut sommet d'Afrique du Nord, 4 167 m", "Vallée d'Imlil et villages berbères de montagne", "Refuges d'altitude et lacs glaciaires", "Trek toute l'année, neige en hiver", "Vue du Maroc jusqu'au Sahara"],
    },
    sahara: {
      name: "Erg Chebbi",
      subtitle: "Le Sahara doré",
      description: "Un océan de dunes dorées qui s'étend jusqu'à la frontière algérienne. Arrivée à dos de dromadaire, nuit dans un camp berbère, et le lever du soleil qui teinte le Sahara de cuivre et d'or.",
      known: ["Dunes jusqu'à 150 m au-dessus du désert", "Balades à dromadaire au lever et au coucher du soleil", "Camps berbères authentiques", "Voie lactée dans un silence absolu", "Quad et excursions en 4x4"],
    },
    fes: {
      name: "Fès el-Bali",
      subtitle: "La ville médiévale vivante",
      description: "La ville médiévale la plus intacte au monde : plus de 9 000 ruelles, la plus ancienne université du monde et la célèbre tannerie Chouara, inchangée depuis le XIe siècle.",
      known: ["Plus grande zone urbaine sans voitures au monde", "Tannerie Chouara, en activité depuis le XIe siècle", "Université al-Qarawiyyin, fondée en 859", "Médersa Bou Inania et portes du palais royal", "Médina classée au patrimoine mondial de l'UNESCO"],
    },
    chefchaouen: {
      name: "Chefchaouen",
      subtitle: "La perle bleue",
      description: "Nichée dans les montagnes du Rif, la médina de Chefchaouen est peinte en bleu jusqu'au dernier mur : sereine, photogénique, et sans équivalent au Maroc.",
      known: ["Médina entièrement bleue et blanche", "Cadre de montagne du Rif et sentiers de randonnée", "Promenade et cascade de Ras el-Ma", "Tissage de laine artisanal et cafés", "Paradis des photographes, chaque ruelle est un cadre"],
    },
    agadir: {
      name: "Agadir et Taghazout",
      subtitle: "Côte atlantique et surf",
      description: "La grande station balnéaire du sud du Maroc : 9 km de sable blanc sur l'Atlantique, des spots de surf de classe mondiale à Taghazout, et l'Anti-Atlas derrière la ville.",
      known: ["9 km de plage atlantique", "Surf de classe mondiale au village de Taghazout", "Parc national de Souss-Massa et flamants roses", "Coopératives d'argan et Paradise Valley", "Coucher de soleil depuis la colline de l'ancienne kasbah"],
    },
    ouzoud: {
      name: "Cascades d'Ouzoud",
      subtitle: "La merveille naturelle du Maroc",
      description: "Une triple cascade qui plonge de 110 m dans un bassin turquoise. Macaques de Barbarie sauvages, arcs-en-ciel dans la brume et des paysages de gorges parmi les plus beaux du Maroc.",
      known: ["Chute de 110 m, la plus spectaculaire du Maroc", "Colonie de macaques de Barbarie sauvages", "Descente dans la gorge jusqu'au bassin au pied des chutes", "Arc-en-ciel dans la brume en plein midi", "Moulins à huile berbères et oliveraies"],
    },
    essaouira: {
      name: "Essaouira",
      subtitle: "La cité fortifiée des vents",
      description: "Un port atlantique blanchi à la chaux, avec ses remparts du XVIIIe siècle, son vent constant, la musique gnaoua et une médina qui ne ressemble à aucune autre.",
      known: ["Médina UNESCO et remparts du XVIIIe siècle", "Kitesurf et planche à voile de classe mondiale", "Capitale marocaine de la musique gnaoua", "Barques bleues et marché aux poissons", "Jimi Hendrix y est passé en 1969"],
    },
    "ait-ben-haddou": {
      name: "Aït Ben Haddou",
      subtitle: "Le ksar de cinéma",
      description: "Un village fortifié de kasbahs en terre, classé à l'UNESCO, près de Ouarzazate. Décor de dizaines de films et première grande étape sur la route du Sahara.",
      known: ["Ksar classé au patrimoine mondial de l'UNESCO", "Lieu de tournage de dizaines de films", "Kasbahs en terre au-dessus de la rivière", "Sur tous les circuits désert au départ de Marrakech"],
    },
    dades: {
      name: "Gorges du Dadès",
      subtitle: "La route des mille kasbahs",
      description: "Routes en lacets, roche rouge rosé et kasbahs accrochées aux falaises : le passage le plus spectaculaire de la route du Sahara, et la première nuit des circuits désert.",
      known: ["La célèbre route en lacets", "Formations rocheuses rouge rosé", "Kasbahs accrochées aux falaises", "Première nuit des circuits désert de 3 jours"],
    },
    todra: {
      name: "Gorges du Todra",
      subtitle: "Des falaises de 300 m",
      description: "Un canyon calcaire aux parois de 300 mètres, sur la route de Merzouga. Tous les circuits désert s'y arrêtent pour une marche au fond du canyon.",
      known: ["Parois de 300 m de haut", "Courte marche au fond du canyon", "Sur la route de Merzouga"],
    },
    zagora: {
      name: "Zagora",
      subtitle: "Les palmeraies du Drâa",
      description: "Le désert le plus proche de Marrakech : une escapade de deux jours dans les dunes, à travers les palmeraies de la vallée du Drâa, avec une nuit dans un camp.",
      known: ["Circuit désert de deux jours depuis Marrakech", "Oasis et palmeraies de la vallée du Drâa", "Nuit dans un camp du désert"],
    },
    chegaga: {
      name: "Erg Chegaga",
      subtitle: "La mer de sable isolée",
      description: "L'autre grande mer de sable du Maroc, au-delà de la fin de la route à M'hamid. Si isolée que vous ne verrez peut-être aucun autre camp.",
      known: ["La deuxième grande mer de sable du Maroc", "Au-delà de la fin de la route, à M'hamid", "Peu d'autres camps en vue"],
    },
    agafay: {
      name: "Désert d'Agafay",
      subtitle: "Le désert de pierre",
      description: "Un vaste paysage de pierre et de silence à environ 40 km de Marrakech : balade à dromadaire au coucher du soleil, dîner dans un camp face à l'Atlas, retour le soir même.",
      known: ["À environ 40 km de Marrakech", "Balade à dromadaire au coucher du soleil", "Dîner et musique dans un camp", "Retour à Marrakech le soir même"],
    },
    ourika: {
      name: "Vallée de l'Ourika",
      subtitle: "Le Haut Atlas le plus proche",
      description: "À environ 60 km de Marrakech, le vrai paysage du Haut Atlas le plus proche de la ville : villages berbères, une rivière bien vivante et une randonnée jusqu'aux cascades de Setti Fatma.",
      known: ["À environ 60 km de Marrakech", "Randonnée aux cascades de Setti Fatma", "Villages berbères le long de la rivière"],
    },
    mgoun: {
      name: "Massif du M'Goun",
      subtitle: "Le deuxième sommet du Maroc",
      description: "Le deuxième plus haut sommet du Maroc, avec une fraction de la fréquentation du Toubkal. Une traversée de plusieurs jours entre gîtes chez l'habitant, bivouacs et muletiers.",
      known: ["Jbel M'Goun, 4 071 m", "Bien plus calme que le Toubkal", "Gîtes chez l'habitant, bivouac et mules"],
    },
    tafraoute: {
      name: "Tafraoute",
      subtitle: "L'Anti-Atlas",
      description: "Le cœur de l'Anti-Atlas, une chaîne plus ancienne que l'Himalaya et bien moins visitée que le Haut Atlas : les rochers peints, la vallée des Ammeln et les amandiers en fleurs.",
      known: ["Les rochers peints", "Villages de la vallée des Ammeln", "Amandiers en fleurs en saison"],
    },
    "souss-massa": {
      name: "Souss-Massa",
      subtitle: "Parc national",
      description: "À une demi-heure au sud d'Agadir : l'un des derniers refuges de l'ibis chauve, et des flamants roses dans l'estuaire de la Massa.",
      known: ["L'ibis chauve", "Flamants roses dans l'estuaire de la Massa", "À une demi-heure d'Agadir"],
    },
    rabat: {
      name: "Rabat",
      subtitle: "La capitale",
      description: "Une médina classée à l'UNESCO, une kasbah du XIIe siècle au-dessus de l'Atlantique et la tour Hassan, presque sans la foule de Marrakech ou de Fès.",
      known: ["La tour Hassan", "La kasbah des Oudayas", "La nécropole du Chellah et ses cigognes"],
    },
    volubilis: {
      name: "Volubilis",
      subtitle: "Le Maroc romain",
      description: "Le site romain le mieux conservé du Maroc, près de Meknès, et le seul où les mosaïques sont encore dans les sols où elles ont été posées.",
      known: ["Mosaïques toujours en place", "Arc de Caracalla", "Près de Meknès, sur la route des villes impériales"],
    },
  },
  es: {
    marrakech: {
      name: "Marrakech",
      subtitle: "La Ciudad Roja",
      description: "La ciudad más vibrante de Marruecos, un laberinto milenario de zocos, palacios y espectáculo callejero a la sombra del Atlas.",
      known: ["Yemaa el-Fna, el mayor teatro al aire libre del mundo", "Red de zocos de 14 gremios y medina antigua", "Mezquita Kutubía y tumbas saadíes", "Jardín Majorelle y riads escondidos", "Puerta de entrada al Alto Atlas"],
    },
    toubkal: {
      name: "Jbel Toubkal",
      subtitle: "El techo del norte de África",
      description: "El gran reto del Alto Atlas: subir entre aldeas bereberes y valles glaciares hasta la cumbre más alta del norte de África, a 4.167 m.",
      known: ["Cumbre más alta del norte de África, 4.167 m", "Valle de Imlil y aldeas bereberes de montaña", "Refugios de montaña y lagos glaciares", "Trekking todo el año, nieve en invierno", "Vistas de Marruecos hasta el Sáhara"],
    },
    sahara: {
      name: "Erg Chebbi",
      subtitle: "El Sáhara dorado",
      description: "Un océano de dunas doradas que se extiende hasta la frontera argelina. Llegada en camello, noche en un campamento bereber y un amanecer que tiñe el Sáhara de cobre y oro.",
      known: ["Dunas de hasta 150 m sobre el desierto", "Paseos en camello al amanecer y al atardecer", "Auténticos campamentos bereberes", "La Vía Láctea en silencio absoluto", "Quad y excursiones en 4x4"],
    },
    fes: {
      name: "Fez el-Bali",
      subtitle: "La ciudad medieval viva",
      description: "La ciudad medieval más intacta del mundo: más de 9.000 callejuelas, la universidad más antigua del mundo y la legendaria curtiduría Chouara, sin cambios desde el siglo XI.",
      known: ["La mayor zona urbana sin coches del mundo", "Curtiduría Chouara, en uso desde el siglo XI", "Universidad de al-Qarawiyyin, fundada en 859", "Madrasa Bou Inania y puertas del palacio real", "Medina Patrimonio Mundial de la UNESCO"],
    },
    chefchaouen: {
      name: "Chefchaouen",
      subtitle: "La perla azul",
      description: "En las montañas del Rif, cada muro de la medina de Chefchaouen está pintado de azul: serena, fotogénica y distinta a cualquier otro lugar de Marruecos.",
      known: ["Medina pintada entera de azul y blanco", "Montañas del Rif con rutas de senderismo", "Paseo y cascada de Ras el-Ma", "Tejido artesanal de lana y cafés", "Paraíso fotográfico, cada callejón es una foto"],
    },
    agadir: {
      name: "Agadir y Taghazout",
      subtitle: "Costa atlántica y surf",
      description: "El gran destino de playa del sur de Marruecos: 9 km de arena blanca atlántica, olas de surf de primer nivel en Taghazout y el Anti-Atlas detrás de la ciudad.",
      known: ["9 km de playa atlántica", "Surf de primer nivel en el pueblo de Taghazout", "Parque Nacional de Souss-Massa y flamencos", "Cooperativas de argán y Paradise Valley", "Atardecer desde la colina de la antigua kasbah"],
    },
    ouzoud: {
      name: "Cascadas de Ouzoud",
      subtitle: "La maravilla natural de Marruecos",
      description: "Una triple cascada que cae 110 m sobre una poza turquesa. Macacos de Berbería salvajes, arcoíris en la bruma y algunos de los paisajes de garganta más bellos de Marruecos.",
      known: ["Cascada de 110 m, la más espectacular de Marruecos", "Colonia de macacos de Berbería salvajes", "Bajada por la garganta hasta la poza al pie de la cascada", "Arcoíris en la bruma a mediodía", "Molinos de aceite bereberes y olivares"],
    },
    essaouira: {
      name: "Esauira",
      subtitle: "La ciudad amurallada del viento",
      description: "Un puerto atlántico encalado, con murallas portuguesas del siglo XVIII, viento constante, música gnawa y una medina con carácter propio.",
      known: ["Medina UNESCO y murallas del siglo XVIII", "Kitesurf y windsurf de primer nivel", "Capital de la música gnawa en Marruecos", "Barcas azules y mercado de pescado", "Jimi Hendrix la visitó en 1969"],
    },
    "ait-ben-haddou": {
      name: "Aït Ben Haddou",
      subtitle: "El ksar de cine",
      description: "Un pueblo fortificado de kasbahs de tierra, Patrimonio de la UNESCO, cerca de Uarzazat. Escenario de decenas de películas y primera gran parada camino del Sáhara.",
      known: ["Ksar Patrimonio Mundial de la UNESCO", "Escenario de decenas de rodajes", "Kasbahs de tierra sobre el río", "En todos los tours por el desierto desde Marrakech"],
    },
    dades: {
      name: "Gargantas del Dades",
      subtitle: "La ruta de las mil kasbahs",
      description: "Carreteras en zigzag, roca rojo rosado y kasbahs excavadas en los acantilados: el tramo más espectacular del camino al Sáhara, y donde los tours por el desierto pasan la primera noche.",
      known: ["La famosa carretera de curvas", "Formaciones de roca rojo rosado", "Kasbahs en los acantilados", "Primera noche de los tours de 3 días"],
    },
    todra: {
      name: "Garganta del Todra",
      subtitle: "Paredes de 300 m",
      description: "Un cañón de caliza con paredes de 300 metros, camino de Merzouga. Todos los tours por el desierto paran aquí para caminar por el fondo del cañón.",
      known: ["Paredes de 300 m de altura", "Paseo corto por el fondo del cañón", "En la ruta hacia Merzouga"],
    },
    zagora: {
      name: "Zagora",
      subtitle: "Los palmerales del Draa",
      description: "El desierto más cercano a Marrakech: una escapada de dos días a las dunas entre los palmerales del valle del Draa, con una noche en un campamento.",
      known: ["Tour de dos días por el desierto desde Marrakech", "Oasis de palmeras del valle del Draa", "Noche en un campamento del desierto"],
    },
    chegaga: {
      name: "Erg Chegaga",
      subtitle: "El mar de arena remoto",
      description: "El otro gran mar de arena de Marruecos, más allá del final de la carretera en M'hamid. Tan remoto que puede que no veas ningún otro campamento.",
      known: ["El segundo gran mar de arena de Marruecos", "Más allá del final de la carretera, en M'hamid", "Pocos campamentos a la vista"],
    },
    agafay: {
      name: "Desierto de Agafay",
      subtitle: "El desierto de piedra",
      description: "Un vasto paisaje de piedra y silencio a unos 40 km de Marrakech: paseo en camello al atardecer, cena en un campamento frente al Atlas y vuelta esa misma noche.",
      known: ["A unos 40 km de Marrakech", "Paseo en camello al atardecer", "Cena y música en un campamento", "Vuelta a Marrakech esa misma noche"],
    },
    ourika: {
      name: "Valle del Ourika",
      subtitle: "El Alto Atlas más cercano",
      description: "A unos 60 km de Marrakech, el paisaje de Alto Atlas auténtico más cercano a la ciudad: aldeas bereberes, un río vivo y una ruta a las cascadas de Setti Fatma.",
      known: ["A unos 60 km de Marrakech", "Ruta a las cascadas de Setti Fatma", "Aldeas bereberes junto al río"],
    },
    mgoun: {
      name: "Macizo del M'Goun",
      subtitle: "La segunda cumbre de Marruecos",
      description: "La segunda cumbre más alta de Marruecos, con una fracción del tráfico del Toubkal. Una travesía de varios días entre casas locales, acampadas y un equipo de mulas.",
      known: ["Jbel M'Goun, 4.071 m", "Mucho más tranquilo que el Toubkal", "Casas locales, acampada y mulas"],
    },
    tafraoute: {
      name: "Tafraoute",
      subtitle: "El Anti-Atlas",
      description: "El corazón del Anti-Atlas, una cordillera más antigua que el Himalaya y mucho menos visitada que el Alto Atlas: las rocas pintadas, el valle de Ameln y los almendros en flor.",
      known: ["Las rocas pintadas", "Pueblos del valle de Ameln", "Almendros en flor en temporada"],
    },
    "souss-massa": {
      name: "Souss-Massa",
      subtitle: "Parque nacional",
      description: "A media hora al sur de Agadir: uno de los últimos refugios del ibis eremita y flamencos en el estuario del Massa.",
      known: ["El ibis eremita", "Flamencos en el estuario del Massa", "A media hora de Agadir"],
    },
    rabat: {
      name: "Rabat",
      subtitle: "La capital",
      description: "Una medina Patrimonio de la UNESCO, una kasbah del siglo XII sobre el Atlántico y la Torre Hassan, casi sin las multitudes de Marrakech o Fez.",
      known: ["La Torre Hassan", "La kasbah de los Udayas", "La necrópolis de Chellah y sus cigüeñas"],
    },
    volubilis: {
      name: "Volubilis",
      subtitle: "El Marruecos romano",
      description: "El yacimiento romano mejor conservado de Marruecos, cerca de Mequinez, y el único donde los mosaicos siguen en los suelos donde se colocaron.",
      known: ["Mosaicos aún en su suelo original", "Arco de Caracalla", "Cerca de Mequinez, en la ruta de las ciudades imperiales"],
    },
  },
  de: {
    marrakech: {
      name: "Marrakesch",
      subtitle: "Die Rote Stadt",
      description: "Marokkos lebendigste Stadt, ein tausendjähriges Labyrinth aus Souks, Palästen und Straßentheater im Schatten des Atlas.",
      known: ["Djemaa el-Fna, das größte Freilufttheater der Welt", "Souk-Netz der 14 Zünfte und alte Medina", "Koutoubia-Moschee und Saadier-Gräber", "Jardin Majorelle und versteckte Riads", "Tor zum Hohen Atlas"],
    },
    toubkal: {
      name: "Jbel Toubkal",
      subtitle: "Das Dach Nordafrikas",
      description: "Die große Herausforderung im Hohen Atlas: durch Berberdörfer und Gletschertäler hinauf zum höchsten Gipfel Nordafrikas auf 4.167 m.",
      known: ["Höchster Gipfel Nordafrikas, 4.167 m", "Imlil-Tal und Berberdörfer in den Bergen", "Berghütten und Gletscherseen", "Trekking das ganze Jahr, Schnee im Winter", "Blick von Marokko bis zur Sahara"],
    },
    sahara: {
      name: "Erg Chebbi",
      subtitle: "Die goldene Sahara",
      description: "Ein Meer aus goldenen Dünen bis zur algerischen Grenze. Ankunft auf dem Kamel, Nacht im Berbercamp und ein Sonnenaufgang, der die Sahara in Kupfer und Gold taucht.",
      known: ["Dünen bis 150 m über dem Wüstenboden", "Kamelritte bei Sonnenauf- und -untergang", "Echte Berber-Wüstencamps", "Die Milchstraße in völliger Stille", "Quad und 4x4-Ausflüge in die Wüste"],
    },
    fes: {
      name: "Fès el-Bali",
      subtitle: "Die lebendige Altstadt",
      description: "Die am besten erhaltene mittelalterliche Stadt der Welt: über 9.000 Gassen, die älteste Universität der Welt und die legendäre Gerberei Chouara, unverändert seit dem 11. Jahrhundert.",
      known: ["Größte autofreie Stadtzone der Welt", "Gerberei Chouara, in Betrieb seit dem 11. Jahrhundert", "Universität al-Qarawiyyin, gegründet 859", "Medersa Bou Inania und Tore des Königspalasts", "Medina als UNESCO-Welterbe"],
    },
    chefchaouen: {
      name: "Chefchaouen",
      subtitle: "Die blaue Perle",
      description: "Im Rifgebirge gelegen, ist jede Mauer der Medina von Chefchaouen blau gestrichen: ruhig, fotogen und anders als jeder andere Ort in Marokko.",
      known: ["Medina ganz in Blau und Weiß", "Rifgebirge mit Wanderwegen", "Spaziergang und Wasserfall von Ras el-Ma", "Wollweberei und Cafés", "Ein Paradies für Fotografen, jede Gasse ein Motiv"],
    },
    agadir: {
      name: "Agadir und Taghazout",
      subtitle: "Atlantikküste und Surfen",
      description: "Marokkos Strandzentrum im Süden: 9 km weißer Atlantiksand, Surfspots von Weltklasse in Taghazout und der Antiatlas hinter der Stadt.",
      known: ["9 km Atlantikstrand", "Surfen auf Weltniveau im Dorf Taghazout", "Nationalpark Souss-Massa und Flamingos", "Arganöl-Kooperativen und Paradise Valley", "Sonnenuntergang vom alten Kasbah-Hügel"],
    },
    ouzoud: {
      name: "Ouzoud-Wasserfälle",
      subtitle: "Marokkos Naturwunder",
      description: "Ein dreistufiger Wasserfall, der 110 m in ein türkisfarbenes Becken stürzt. Wilde Berberaffen, Regenbögen im Sprühnebel und einige der schönsten Schluchtenlandschaften Marokkos.",
      known: ["110 m hoher Wasserfall, der spektakulärste Marokkos", "Kolonie wilder Berberaffen", "Wanderung durch die Schlucht zum tosenden Becken", "Regenbogen im Sprühnebel zur Mittagszeit", "Traditionelle Berber-Ölmühlen und Olivenhaine"],
    },
    essaouira: {
      name: "Essaouira",
      subtitle: "Die windige Stadt hinter Mauern",
      description: "Ein weiß getünchter Atlantikhafen mit portugiesischen Wällen aus dem 18. Jahrhundert, ständigem Wind, Gnawa-Musik und einer Medina mit ganz eigenem Charakter.",
      known: ["UNESCO-Medina und Seemauern aus dem 18. Jahrhundert", "Kite- und Windsurfen auf Weltniveau", "Marokkos Hauptstadt der Gnawa-Musik", "Blaue Fischerboote und Fischmarkt", "Jimi Hendrix war 1969 hier"],
    },
    "ait-ben-haddou": {
      name: "Aït Ben Haddou",
      subtitle: "Der Ksar aus dem Kino",
      description: "Ein befestigtes Lehmdorf aus Kasbahs bei Ouarzazate, UNESCO-Welterbe, Kulisse für Dutzende Filme und der erste große Halt auf dem Weg in die Sahara.",
      known: ["Ksar und UNESCO-Welterbe", "Drehort für Dutzende Produktionen", "Lehm-Kasbahs über dem Fluss", "Auf jeder Wüstentour ab Marrakesch"],
    },
    dades: {
      name: "Dades-Schlucht",
      subtitle: "Straße der tausend Kasbahs",
      description: "Serpentinen, rosarote Felsen und Kasbahs an den Klippen: der spektakulärste Abschnitt der Fahrt in die Sahara und die erste Nacht der Wüstentouren.",
      known: ["Die berühmte Serpentinenstraße", "Rosarote Felsformationen", "Kasbahs an den Klippen", "Erste Nacht der 3-tägigen Wüstentouren"],
    },
    todra: {
      name: "Todra-Schlucht",
      subtitle: "300 m hohe Felswände",
      description: "Ein Kalksteincanyon mit 300 Meter hohen Wänden auf dem Weg nach Merzouga. Jede Wüstentour hält hier für einen Spaziergang über den Canyonboden.",
      known: ["300 m hohe Canyonwände", "Kurzer Spaziergang über den Canyonboden", "Auf dem Weg nach Merzouga"],
    },
    zagora: {
      name: "Zagora",
      subtitle: "Die Palmen des Draa-Tals",
      description: "Die Marrakesch nächstgelegene Wüste: zwei Tage in den Dünen, durch die Palmenhaine des Draa-Tals, mit einer Nacht im Wüstencamp.",
      known: ["Zweitägige Wüstentour ab Marrakesch", "Palmenoase des Draa-Tals", "Nacht im Wüstencamp"],
    },
    chegaga: {
      name: "Erg Chegaga",
      subtitle: "Das abgelegene Sandmeer",
      description: "Marokkos zweites großes Sandmeer, jenseits des Straßenendes bei M'hamid. So abgelegen, dass Sie vielleicht kein anderes Camp sehen.",
      known: ["Marokkos zweites großes Sandmeer", "Jenseits des Straßenendes bei M'hamid", "Kaum andere Camps in Sicht"],
    },
    agafay: {
      name: "Agafay-Wüste",
      subtitle: "Die Steinwüste",
      description: "Eine weite Landschaft aus Stein und Stille, etwa 40 km von Marrakesch: Kamelritt bei Sonnenuntergang, Abendessen im Camp mit Blick auf den Atlas, Rückkehr am selben Abend.",
      known: ["Etwa 40 km von Marrakesch", "Kamelritt bei Sonnenuntergang", "Abendessen und Musik im Camp", "Am selben Abend zurück in Marrakesch"],
    },
    ourika: {
      name: "Ourika-Tal",
      subtitle: "Der nächste Hohe Atlas",
      description: "Etwa 60 km von Marrakesch, die nächstgelegene echte Hoher-Atlas-Landschaft: Berberdörfer, ein lebendiger Fluss und eine Wanderung zu den Wasserfällen von Setti Fatma.",
      known: ["Etwa 60 km von Marrakesch", "Wanderung zu den Wasserfällen von Setti Fatma", "Berberdörfer am Fluss"],
    },
    mgoun: {
      name: "M'Goun-Massiv",
      subtitle: "Marokkos zweithöchster Gipfel",
      description: "Marokkos zweithöchster Gipfel, mit einem Bruchteil des Betriebs am Toubkal. Eine mehrtägige Durchquerung mit Gastfamilien, Zeltnächten und Maultierteam.",
      known: ["Jbel M'Goun, 4.071 m", "Viel ruhiger als der Toubkal", "Gastfamilien, Zelten und Maultiere"],
    },
    tafraoute: {
      name: "Tafraoute",
      subtitle: "Der Antiatlas",
      description: "Das Herz des Antiatlas, eines Gebirges, das älter ist als der Himalaya und viel weniger besucht als der Hohe Atlas: die bemalten Felsen, das Ammeln-Tal und die Mandelblüte.",
      known: ["Die bemalten Felsen", "Dörfer im Ammeln-Tal", "Mandelblüte in der Saison"],
    },
    "souss-massa": {
      name: "Souss-Massa",
      subtitle: "Nationalpark",
      description: "Eine halbe Stunde südlich von Agadir: eine der letzten Hochburgen des Waldrapps und Flamingos in der Mündung des Massa.",
      known: ["Der Waldrapp", "Flamingos in der Massa-Mündung", "Eine halbe Stunde von Agadir"],
    },
    rabat: {
      name: "Rabat",
      subtitle: "Die Hauptstadt",
      description: "Eine Medina als UNESCO-Welterbe, eine Kasbah aus dem 12. Jahrhundert über dem Atlantik und der Hassan-Turm, fast ohne die Menschenmengen von Marrakesch oder Fès.",
      known: ["Der Hassan-Turm", "Die Kasbah des Oudayas", "Die Nekropole Chellah und ihre Störche"],
    },
    volubilis: {
      name: "Volubilis",
      subtitle: "Das römische Marokko",
      description: "Die besterhaltene römische Stätte Marokkos, bei Meknès, und die einzige, an der die Mosaiken noch in den Böden liegen, in die sie gelegt wurden.",
      known: ["Mosaiken noch in ihren Böden", "Caracalla-Bogen", "Bei Meknès, auf der Route der Königsstädte"],
    },
  },
  it: {
    marrakech: {
      name: "Marrakech",
      subtitle: "La Città Rossa",
      description: "La città più vibrante del Marocco, un labirinto millenario di souk, palazzi e spettacoli di strada all'ombra dell'Atlante.",
      known: ["Jemaa el-Fna, il più grande teatro all'aperto del mondo", "Rete di souk delle 14 corporazioni e medina antica", "Moschea Koutoubia e tombe saadiane", "Giardino Majorelle e riad nascosti", "Porta d'accesso all'Alto Atlante"],
    },
    toubkal: {
      name: "Jbel Toubkal",
      subtitle: "Il tetto del Nord Africa",
      description: "La grande sfida dell'Alto Atlante: salire tra villaggi berberi e valli glaciali fino alla vetta più alta del Nord Africa, a 4.167 m.",
      known: ["Vetta più alta del Nord Africa, 4.167 m", "Valle di Imlil e villaggi berberi di montagna", "Rifugi d'alta quota e laghi glaciali", "Trekking tutto l'anno, neve d'inverno", "Vista dal Marocco fino al Sahara"],
    },
    sahara: {
      name: "Erg Chebbi",
      subtitle: "Il Sahara dorato",
      description: "Un oceano di dune dorate fino al confine algerino. Arrivo in dromedario, notte in un campo berbero e un'alba che tinge il Sahara di rame e oro.",
      known: ["Dune fino a 150 m sopra il deserto", "Dromedario all'alba e al tramonto", "Autentici campi berberi", "La Via Lattea nel silenzio assoluto", "Quad ed escursioni in 4x4"],
    },
    fes: {
      name: "Fès el-Bali",
      subtitle: "La città medievale viva",
      description: "La città medievale più intatta al mondo: oltre 9.000 vicoli, l'università più antica del mondo e la leggendaria conceria Chouara, immutata dall'XI secolo.",
      known: ["La più grande zona urbana senza auto al mondo", "Conceria Chouara, attiva dall'XI secolo", "Università al-Qarawiyyin, fondata nell'859", "Madrasa Bou Inania e porte del palazzo reale", "Medina Patrimonio dell'UNESCO"],
    },
    chefchaouen: {
      name: "Chefchaouen",
      subtitle: "La perla blu",
      description: "Tra le montagne del Rif, ogni muro della medina di Chefchaouen è dipinto di blu: serena, fotogenica e diversa da qualsiasi altro luogo del Marocco.",
      known: ["Medina tutta blu e bianca", "Montagne del Rif con sentieri", "Passeggiata e cascata di Ras el-Ma", "Tessitura artigianale della lana e caffè", "Paradiso dei fotografi, ogni vicolo è un'inquadratura"],
    },
    agadir: {
      name: "Agadir e Taghazout",
      subtitle: "Costa atlantica e surf",
      description: "La grande meta balneare del sud del Marocco: 9 km di sabbia bianca sull'Atlantico, onde da surf di livello mondiale a Taghazout e l'Anti-Atlante alle spalle della città.",
      known: ["9 km di spiaggia atlantica", "Surf di livello mondiale nel villaggio di Taghazout", "Parco nazionale di Souss-Massa e fenicotteri", "Cooperative di argan e Paradise Valley", "Tramonto dalla collina dell'antica kasbah"],
    },
    ouzoud: {
      name: "Cascate di Ouzoud",
      subtitle: "La meraviglia naturale del Marocco",
      description: "Una tripla cascata che precipita per 110 m in una pozza turchese. Bertucce selvatiche, arcobaleni nella nebbiolina e alcune delle gole più belle del Marocco.",
      known: ["Cascata di 110 m, la più spettacolare del Marocco", "Colonia di bertucce selvatiche", "Discesa nella gola fino alla pozza ai piedi delle cascate", "Arcobaleno nella nebbiolina a mezzogiorno", "Frantoi berberi tradizionali e uliveti"],
    },
    essaouira: {
      name: "Essaouira",
      subtitle: "La città murata del vento",
      description: "Un porto atlantico imbiancato a calce, con bastioni portoghesi del XVIII secolo, vento costante, musica gnawa e una medina dal carattere tutto suo.",
      known: ["Medina UNESCO e mura del XVIII secolo", "Kitesurf e windsurf di livello mondiale", "Capitale della musica gnawa in Marocco", "Barche blu e mercato del pesce", "Jimi Hendrix la visitò nel 1969"],
    },
    "ait-ben-haddou": {
      name: "Aït Ben Haddou",
      subtitle: "Lo ksar del cinema",
      description: "Un villaggio fortificato di kasbah in terra, Patrimonio UNESCO, vicino a Ouarzazate. Set di decine di film e prima grande tappa sulla strada per il Sahara.",
      known: ["Ksar Patrimonio Mondiale UNESCO", "Set di decine di produzioni", "Kasbah in terra sopra il fiume", "In ogni tour nel deserto da Marrakech"],
    },
    dades: {
      name: "Gole del Dades",
      subtitle: "La strada delle mille kasbah",
      description: "Tornanti, roccia rosso rosato e kasbah scavate nelle pareti: il tratto più spettacolare della strada per il Sahara, dove i tour nel deserto passano la prima notte.",
      known: ["La famosa strada a tornanti", "Formazioni di roccia rosso rosato", "Kasbah scavate nelle pareti", "Prima notte dei tour nel deserto di 3 giorni"],
    },
    todra: {
      name: "Gole del Todra",
      subtitle: "Pareti di 300 m",
      description: "Un canyon calcareo con pareti alte 300 metri, sulla strada per Merzouga. Ogni tour nel deserto si ferma qui per una passeggiata sul fondo del canyon.",
      known: ["Pareti alte 300 m", "Breve passeggiata sul fondo del canyon", "Sulla strada per Merzouga"],
    },
    zagora: {
      name: "Zagora",
      subtitle: "I palmeti del Draa",
      description: "Il deserto più vicino a Marrakech: una fuga di due giorni tra le dune attraverso i palmeti della valle del Draa, con una notte in un campo tendato.",
      known: ["Tour di due giorni nel deserto da Marrakech", "Oasi di palme della valle del Draa", "Notte in un campo nel deserto"],
    },
    chegaga: {
      name: "Erg Chegaga",
      subtitle: "Il mare di sabbia remoto",
      description: "L'altro grande mare di sabbia del Marocco, oltre la fine della strada a M'hamid. Così remoto che potreste non vedere nessun altro campo.",
      known: ["Il secondo grande mare di sabbia del Marocco", "Oltre la fine della strada, a M'hamid", "Pochi altri campi in vista"],
    },
    agafay: {
      name: "Deserto di Agafay",
      subtitle: "Il deserto di pietra",
      description: "Un vasto paesaggio di pietra e silenzio a circa 40 km da Marrakech: dromedario al tramonto, cena in un campo davanti all'Atlante e ritorno la sera stessa.",
      known: ["A circa 40 km da Marrakech", "Dromedario al tramonto", "Cena e musica in un campo", "Ritorno a Marrakech la sera stessa"],
    },
    ourika: {
      name: "Valle dell'Ourika",
      subtitle: "L'Alto Atlante più vicino",
      description: "A circa 60 km da Marrakech, il vero paesaggio dell'Alto Atlante più vicino alla città: villaggi berberi, un fiume vivo e un'escursione alle cascate di Setti Fatma.",
      known: ["A circa 60 km da Marrakech", "Escursione alle cascate di Setti Fatma", "Villaggi berberi lungo il fiume"],
    },
    mgoun: {
      name: "Massiccio del M'Goun",
      subtitle: "La seconda vetta del Marocco",
      description: "La seconda vetta più alta del Marocco, con una minima parte del traffico del Toubkal. Una traversata di più giorni tra ospitalità in famiglia, campeggio e una squadra di muli.",
      known: ["Jbel M'Goun, 4.071 m", "Molto più tranquillo del Toubkal", "Ospitalità in famiglia, campeggio e muli"],
    },
    tafraoute: {
      name: "Tafraoute",
      subtitle: "L'Anti-Atlante",
      description: "Il cuore dell'Anti-Atlante, una catena più antica dell'Himalaya e molto meno visitata dell'Alto Atlante: le rocce dipinte, la valle di Ameln e i mandorli in fiore.",
      known: ["Le rocce dipinte", "Villaggi della valle di Ameln", "Mandorli in fiore in stagione"],
    },
    "souss-massa": {
      name: "Souss-Massa",
      subtitle: "Parco nazionale",
      description: "A mezz'ora a sud di Agadir: una delle ultime roccaforti dell'ibis eremita e fenicotteri nell'estuario del Massa.",
      known: ["L'ibis eremita", "Fenicotteri nell'estuario del Massa", "A mezz'ora da Agadir"],
    },
    rabat: {
      name: "Rabat",
      subtitle: "La capitale",
      description: "Una medina Patrimonio UNESCO, una kasbah del XII secolo sopra l'Atlantico e la Torre Hassan, quasi senza le folle di Marrakech o di Fès.",
      known: ["La Torre Hassan", "La kasbah degli Oudaya", "La necropoli di Chellah e le sue cicogne"],
    },
    volubilis: {
      name: "Volubilis",
      subtitle: "Il Marocco romano",
      description: "Il sito romano meglio conservato del Marocco, vicino a Meknès, e l'unico dove i mosaici sono ancora nei pavimenti in cui furono posati.",
      known: ["Mosaici ancora nei pavimenti originali", "Arco di Caracalla", "Vicino a Meknès, sulla rotta delle città imperiali"],
    },
  },
  ar: {
    marrakech: {
      name: "مراكش",
      subtitle: "المدينة الحمراء",
      description: "أكثر مدن المغرب حيوية، متاهة عمرها ألف عام من الأسواق والقصور وفنون الشارع في ظل جبال الأطلس.",
      known: ["ساحة جامع الفنا، أكبر مسرح مفتوح في العالم", "شبكة أسواق الحرف الأربع عشرة والمدينة القديمة", "جامع الكتبية وقبور السعديين", "حديقة ماجوريل والرياضات المخفية", "بوابة الأطلس الكبير"],
    },
    toubkal: {
      name: "جبل توبقال",
      subtitle: "سقف شمال أفريقيا",
      description: "التحدي الأكبر في الأطلس الكبير: صعود عبر القرى الأمازيغية والأودية الجليدية حتى أعلى قمة في شمال أفريقيا على ارتفاع 4167 م.",
      known: ["أعلى قمة في شمال أفريقيا، 4167 م", "وادي إمليل والقرى الأمازيغية الجبلية", "ملاجئ جبلية وبحيرات جليدية", "رحلات طوال السنة، وثلوج في الشتاء", "إطلالة تمتد من المغرب حتى الصحراء"],
    },
    sahara: {
      name: "عرق الشبي",
      subtitle: "الصحراء الذهبية",
      description: "محيط من الكثبان الذهبية يمتد حتى الحدود الجزائرية. تصل على ظهر الجمل، وتنام في مخيم أمازيغي، وتشاهد شروق الشمس يصبغ الصحراء بالنحاسي والذهبي.",
      known: ["كثبان يصل ارتفاعها إلى 150 م", "ركوب الجمال عند الشروق والغروب", "مخيمات أمازيغية أصيلة", "درب التبانة في صمت تام", "دراجات رباعية ورحلات بسيارات الدفع الرباعي"],
    },
    fes: {
      name: "فاس البالي",
      subtitle: "المدينة الوسيطية الحية",
      description: "أكثر مدن العصور الوسطى حفاظاً على حالها في العالم: أكثر من 9000 زقاق، وأقدم جامعة في العالم، ودار الدباغة الشوارة الشهيرة التي لم تتغير منذ القرن الحادي عشر.",
      known: ["أكبر منطقة حضرية خالية من السيارات في العالم", "دار الدباغة الشوارة، تعمل منذ القرن الحادي عشر", "جامعة القرويين، تأسست سنة 859", "المدرسة البوعنانية وأبواب القصر الملكي", "مدينة مسجلة في التراث العالمي لليونسكو"],
    },
    chefchaouen: {
      name: "شفشاون",
      subtitle: "اللؤلؤة الزرقاء",
      description: "في قلب جبال الريف، كل جدار في مدينة شفشاون العتيقة مطلي بالأزرق: هادئة وجميلة في الصور ولا تشبه أي مكان آخر في المغرب.",
      known: ["مدينة عتيقة بالأزرق والأبيض", "جبال الريف ومسارات المشي", "نزهة رأس الماء وشلالها", "نسيج الصوف التقليدي والمقاهي", "جنة المصورين، كل زقاق لوحة"],
    },
    agadir: {
      name: "أكادير وتغازوت",
      subtitle: "ساحل الأطلسي وركوب الأمواج",
      description: "أهم وجهة شاطئية في جنوب المغرب: 9 كم من الرمال البيضاء على الأطلسي، ومواقع عالمية لركوب الأمواج في تغازوت، والأطلس الصغير خلف المدينة.",
      known: ["9 كم من شاطئ الأطلسي", "ركوب أمواج عالمي في قرية تغازوت", "منتزه سوس ماسة الوطني وطيور النحام", "تعاونيات الأركان ووادي الجنة", "الغروب من تلة القصبة القديمة"],
    },
    ouzoud: {
      name: "شلالات أوزود",
      subtitle: "أعجوبة المغرب الطبيعية",
      description: "شلال ثلاثي يهوي 110 م في حوض فيروزي. قردة المكاك البرية، وأقواس قزح في الرذاذ، ومن أجمل مناظر الخوانق في المغرب.",
      known: ["شلال بارتفاع 110 م، الأروع في المغرب", "مستعمرة من قردة المكاك البرية", "نزول عبر الخانق إلى الحوض أسفل الشلال", "قوس قزح في الرذاذ عند الظهيرة", "معاصر زيتون أمازيغية تقليدية وبساتين زيتون"],
    },
    essaouira: {
      name: "الصويرة",
      subtitle: "مدينة الرياح المسوّرة",
      description: "ميناء أطلسي مطلي بالأبيض، بأسوار برتغالية من القرن الثامن عشر، ورياح دائمة، وموسيقى كناوة، ومدينة عتيقة لها طابعها الخاص.",
      known: ["مدينة عتيقة مسجلة لدى اليونسكو وأسوار من القرن الثامن عشر", "ركوب الأمواج الشراعي على مستوى عالمي", "عاصمة موسيقى كناوة في المغرب", "قوارب الصيد الزرقاء وسوق السمك", "زارها جيمي هندريكس سنة 1969"],
    },
    "ait-ben-haddou": {
      name: "آيت بن حدو",
      subtitle: "قصر السينما",
      description: "قرية محصنة من القصبات الطينية قرب ورزازات، مسجلة لدى اليونسكو، صُوّرت فيها عشرات الأفلام، وأول محطة كبرى على الطريق إلى الصحراء.",
      known: ["قصر مسجل في التراث العالمي لليونسكو", "موقع تصوير لعشرات الإنتاجات", "قصبات طينية فوق النهر", "في كل جولة صحراوية من مراكش"],
    },
    dades: {
      name: "مضايق دادس",
      subtitle: "طريق الألف قصبة",
      description: "طرق متعرجة، وصخور حمراء وردية، وقصبات مبنية في المنحدرات: أجمل مقطع في الطريق إلى الصحراء، وفيه تقضي الجولات الصحراوية ليلتها الأولى.",
      known: ["الطريق المتعرج الشهير", "تكوينات صخرية حمراء وردية", "قصبات مبنية في المنحدرات", "الليلة الأولى في جولات الصحراء لثلاثة أيام"],
    },
    todra: {
      name: "مضايق تودغى",
      subtitle: "جدران بارتفاع 300 م",
      description: "خانق كلسي بجدران يبلغ ارتفاعها 300 متر على الطريق إلى مرزوكة. تتوقف كل جولة صحراوية هنا للمشي في قاع الخانق.",
      known: ["جدران بارتفاع 300 م", "مشي قصير في قاع الخانق", "على الطريق إلى مرزوكة"],
    },
    zagora: {
      name: "زاكورة",
      subtitle: "نخيل وادي درعة",
      description: "أقرب صحراء إلى مراكش: رحلة يومين إلى الكثبان عبر واحات نخيل وادي درعة، مع ليلة في مخيم صحراوي.",
      known: ["رحلة صحراوية ليومين من مراكش", "واحة نخيل وادي درعة", "ليلة في مخيم صحراوي"],
    },
    chegaga: {
      name: "عرق شقاق",
      subtitle: "بحر الرمال النائي",
      description: "بحر الرمال الكبير الآخر في المغرب، بعد نهاية الطريق في امحاميد. نائٍ إلى حد أنك قد لا ترى أي مخيم آخر.",
      known: ["ثاني أكبر بحر رمال في المغرب", "بعد نهاية الطريق في امحاميد", "قلة المخيمات الأخرى في الأفق"],
    },
    agafay: {
      name: "صحراء أكفاي",
      subtitle: "الصحراء الحجرية",
      description: "منظر واسع من الحجر والسكون على بعد نحو 40 كم من مراكش: ركوب الجمال عند الغروب، وعشاء في مخيم أمام الأطلس، والعودة في الليلة نفسها.",
      known: ["على بعد نحو 40 كم من مراكش", "ركوب الجمال عند الغروب", "عشاء وموسيقى في مخيم", "العودة إلى مراكش في الليلة نفسها"],
    },
    ourika: {
      name: "وادي أوريكة",
      subtitle: "أقرب أطلس كبير",
      description: "على بعد نحو 60 كم من مراكش، أقرب مناظر حقيقية للأطلس الكبير إلى المدينة: قرى أمازيغية، ونهر نابض بالحياة، ومسار إلى شلالات ستي فاطمة.",
      known: ["على بعد نحو 60 كم من مراكش", "مسار إلى شلالات ستي فاطمة", "قرى أمازيغية على ضفاف النهر"],
    },
    mgoun: {
      name: "كتلة مكون",
      subtitle: "ثاني قمة في المغرب",
      description: "ثاني أعلى قمة في المغرب، بجزء صغير من زوار توبقال. عبور لعدة أيام بين الإقامة لدى السكان والتخييم وفريق من البغال.",
      known: ["جبل مكون، 4071 م", "أهدأ بكثير من توبقال", "إقامة لدى السكان وتخييم وبغال"],
    },
    tafraoute: {
      name: "تافراوت",
      subtitle: "الأطلس الصغير",
      description: "قلب الأطلس الصغير، سلسلة أقدم من جبال الهيمالايا وأقل زيارة بكثير من الأطلس الكبير: الصخور الملونة، ووادي أملن، وأزهار اللوز.",
      known: ["الصخور الملونة", "قرى وادي أملن", "أزهار اللوز في موسمها"],
    },
    "souss-massa": {
      name: "سوس ماسة",
      subtitle: "منتزه وطني",
      description: "على بعد نصف ساعة جنوب أكادير: أحد آخر معاقل طائر أبو منجل الأصلع، وطيور النحام في مصب وادي ماسة.",
      known: ["طائر أبو منجل الأصلع", "طيور النحام في مصب ماسة", "على بعد نصف ساعة من أكادير"],
    },
    rabat: {
      name: "الرباط",
      subtitle: "العاصمة",
      description: "مدينة عتيقة مسجلة لدى اليونسكو، وقصبة من القرن الثاني عشر فوق الأطلسي، وصومعة حسان، دون زحام مراكش أو فاس تقريباً.",
      known: ["صومعة حسان", "قصبة الأوداية", "موقع شالة ولقالقه"],
    },
    volubilis: {
      name: "وليلي",
      subtitle: "المغرب الروماني",
      description: "أفضل موقع روماني محفوظ في المغرب، قرب مكناس، والوحيد الذي ما تزال فسيفساؤه في الأرضيات التي وُضعت فيها.",
      known: ["فسيفساء ما تزال في أرضياتها", "قوس كاراكالا", "قرب مكناس، على طريق المدن الإمبراطورية"],
    },
  },
};
