import type { Tour } from "./tours";

// Traduction française du catalogue de circuits. Structure identique à
// TOURS dans ./tours — seuls les champs éditoriaux (title, descriptions,
// highlights, itinerary, seoTitle/seoDescription, faq) sont traduits.
// id, slug, category, origin, difficulty, duration, groupSize, reviewCount,
// rating, price, priceMax, depositAmount, heroImage, gallery, includes,
// excludes, meetingPoint, featured et isDayTour sont copiés à l'identique
// depuis la source anglaise (includes/excludes sont de toute façon
// remplacés à l'affichage par lib/tour-includes.fr.ts).

export const TOURS: Tour[] = [
  // ─────────────────────────────────────────────
  // CIRCUITS AU DÉPART DE MARRAKECH
  // ─────────────────────────────────────────────
  {
    id: "1",
    slug: "toubkal-summit-trek-4day",
    title: "Marrakech au sommet du Toubkal — Trek de 4 jours",
    category: "trekking",
    origin: "marrakech",
    difficulty: "challenging",
    duration: "4 jours / 3 nuits",
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
      "Conquérez le Jbel Toubkal (4 167 m) — le toit de l'Afrique du Nord — à travers villages berbères et vallées alpines d'altitude.",
    description:
      "Le trek du sommet du Toubkal est l'aventure incontournable du Haut Atlas. Empruntez d'antiques chemins muletiers, dormez en refuge de montagne et tenez-vous au point culminant de l'Afrique du Nord tandis que le soleil se lève sur le Maroc. Quatre jours qui changent une vie, exigeants physiquement mais sans escalade technique.",
    highlights: [
      "Atteindre le sommet du Jbel Toubkal à 4 167 m — plus haut sommet d'Afrique du Nord",
      "Nuits en refuges de montagne berbères traditionnels à 3 207 m",
      "Départ du village d'Imlil, au cœur de l'Atlas",
      "Vues panoramiques s'étendant sur le Maroc et l'Algérie",
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
        title: "Marrakech → Imlil (1 740 m)",
        description:
          "Transfert de Marrakech à Imlil (1h30), village de départ du Toubkal. Installation, rencontre avec le guide et courte marche d'acclimatation à travers les champs en terrasses berbères. Dîner de bienvenue.",
      },
      {
        day: 2,
        title: "Imlil → Refuge du Toubkal (3 207 m)",
        description:
          "Montée dans la vallée du Mizane, en passant par le sanctuaire de Sidi Chamharouch, jusqu'au refuge de montagne. Marche d'acclimatation l'après-midi au-dessus du camp. Coucher tôt avant le jour du sommet.",
      },
      {
        day: 3,
        title: "Jour du sommet — Toubkal (4 167 m)",
        description:
          "Départ avant l'aube à 5h00. Montée raide par les éboulis du Cirque Sud. Sommet au lever du soleil. Descente au refuge pour un dîner de célébration.",
      },
      {
        day: 4,
        title: "Refuge → Imlil → Marrakech",
        description:
          "Descente matinale à travers des prairies fleuries. Transfert retour à Marrakech. Fin du circuit en milieu d'après-midi.",
      },
    ],
    faq: [
      { q: "Le trek de 4 jours est-il préférable au 2 jours pour une première tentative du Toubkal ?", a: "Pour la plupart des gens, oui. Les jours supplémentaires servent à l'acclimatation plutôt qu'à couvrir plus de distance, et c'est l'altitude — pas la condition physique — qui pose généralement problème près du sommet. Si vous n'êtes jamais monté près de 4 000 mètres, c'est cette version qu'il faut réserver." },
      { q: "Comment sont les hébergements sur ce trek ?", a: "Un mélange de gîte de village et le refuge du Toubkal à 3 207 mètres. Le refuge est un vrai refuge de montagne : dortoirs collectifs, couchettes avec matelas et couvertures, repas communs et nuits fraîches. Prévoyez un drap de sac, une lampe frontale et des bouchons d'oreilles." },
      { q: "Dois-je porter mon propre sac ?", a: "Seulement un sac à dos avec eau, couches vestimentaires et appareil photo. Les mulets transportent les bagages principaux d'une étape à l'autre, ce qui rend les journées de marche consécutives gérables même pour ceux qui n'ont jamais trekké en altitude." },
      { q: "À quelle heure commence le jour du sommet ?", a: "Avant l'aube. L'ascension finale depuis le refuge prend environ trois heures, et un départ matinal permet d'atteindre le sommet au lever du soleil et de redescendre avant que le temps ne se dégrade l'après-midi. C'est le moment le plus froid de la journée, la couche chaude que vous portez depuis le début trouve enfin son utilité." },
    ],
    meetingPoint: { lat: 31.1369, lng: -7.9169, name: "Imlil Village, Atlas Mountains" },
    seoTitle: "Trek au sommet du Toubkal en 4 jours — Gravir le plus haut sommet d'Afrique du Nord | Marrakech Eco Tours",
    seoDescription: "Conquérez le Jbel Toubkal (4 167 m) avec un guide berbère diplômé. Trek de 4 jours au départ de Marrakech — refuges, tous les repas et transfert aller-retour inclus. À partir de 380 $.",
    featured: true,
  },
  {
    id: "2",
    slug: "sahara-3day-marrakech",
    title: "Marrakech au Sahara — Circuit désert de 3 jours",
    category: "desert",
    origin: "marrakech",
    difficulty: "easy",
    duration: "3 jours / 2 nuits",
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
      "Chevauchez un chameau dans les dunes dorées de l'Erg Chebbi et dormez sous un million d'étoiles dans un camp berbère de luxe.",
    description:
      "Trois jours de Marrakech au Sahara, aller-retour. Traversez le Haut Atlas, arrêtez-vous au ksar classé à l'UNESCO d'Aït Ben Haddou, serpentez dans la vallée du Drâa, puis chevauchez un chameau dans l'Erg Chebbi tandis que le soleil se fond dans les dunes. Une nuit sous les étoiles dans un camp de luxe traditionnel.",
    highlights: [
      "Balade à dos de chameau dans les dunes de l'Erg Chebbi au coucher du soleil",
      "Nuit dans un camp berbère de luxe dans le désert",
      "Ksar d'Aït Ben Haddou, patrimoine mondial de l'UNESCO",
      "Observation des étoiles sans aucune pollution lumineuse",
      "Sandboard sur les grandes dunes",
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
          "Départ de Marrakech à 7h00. Franchissement du col du Tizi n'Tichka (2 260 m). Visite d'Aït Ben Haddou. Nuit à Ouarzazate — la porte du désert.",
      },
      {
        day: 2,
        title: "Ouarzazate → Vallée du Drâa → Camp de l'Erg Chebbi",
        description:
          "Traversée de la palmeraie de la vallée du Drâa. Arrivée à Merzouga en milieu d'après-midi. Balade à dos de chameau dans l'Erg Chebbi au coucher du soleil. Dîner et musique gnaoua sous les étoiles.",
      },
      {
        day: 3,
        title: "Lever de soleil sur le Sahara → Gorges du Todra → Marrakech",
        description:
          "Réveil avant l'aube pour admirer le lever du soleil sur les dunes. Retour à dos de chameau et petit-déjeuner. Retour en passant par les gorges du Todra. Arrivée à Marrakech en soirée.",
      },
    ],
    faq: [
      { q: "Pourquoi ce circuit dure-t-il trois jours ?", a: "Parce que Merzouga et les dunes de l'Erg Chebbi se trouvent de l'autre côté de l'Atlas. Trois jours, c'est ce qu'exige la distance — tout circuit plus court va soit ailleurs que le vrai Sahara, soit passe presque tout son temps sur la route." },
      { q: "Que voit-on pendant le trajet ?", a: "L'itinéraire franchit le col du Tizi n'Tichka et traverse Aït Ben Haddou ainsi que la région des gorges, si bien que le voyage a ses propres attraits plutôt que d'être du temps perdu sur la route. Le trajet est fractionné en étapes avec des arrêts plutôt que parcouru d'une traite." },
      { q: "Comment se passe la nuit au camp du désert ?", a: "Des lits avec couvertures sous tente, un dîner tous ensemble, et un silence complet une fois les groupes électrogènes coupés. Les dunes sont vraiment plongées dans le noir, c'est pourquoi la plupart des voyageurs se souviennent davantage du ciel étoilé que de la balade à dos de chameau. Prévoyez une couche chaude — les nuits désertiques sont fraîches hors été." },
      { q: "Dois-je obligatoirement monter à dos de chameau ?", a: "Non. Le tronçon à dos de chameau jusqu'au camp est court et facultatif, et marcher ce passage à la place est suffisamment courant pour que les guides s'y attendent. Toute la vraie distance est couverte en véhicule." },
    ],
    meetingPoint: { lat: 31.0580, lng: -4.0127, name: "Merzouga, Erg Chebbi Sahara" },
    seoTitle: "Circuit désert du Sahara de 3 jours au départ de Marrakech — Chameaux, dunes et camp désertique | Marrakech Eco Tours",
    seoDescription: "Balade à dos de chameau dans l'Erg Chebbi au coucher du soleil et nuit sous les étoiles. Circuit de 3 jours Marrakech-Sahara avec Aït Ben Haddou, vallée du Drâa et camp berbère de luxe. À partir de 245 $.",
    featured: true,
  },
  {
    id: "3",
    slug: "ourika-valley-day-hike",
    title: "Marrakech à la vallée de l'Ourika — Randonnée d'une journée",
    category: "day-tours",
    origin: "marrakech",
    difficulty: "easy",
    duration: "1 jour",
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
      "Une randonnée d'une journée complète à travers noyeraies, villages berbères et torrents de montagne, à seulement 45 minutes de Marrakech.",
    description:
      "La vallée de l'Ourika est un autre monde loin de la ville — des champs en terrasses s'accrochent aux collines de roche rouge, des femmes berbères tissent des tapis devant leurs maisons, et des torrents de montagne dévalent entre les sentiers. Idéale pour les familles et les randonneurs débutants. Les cascades de Setti Fatma, en tête de vallée, en sont le point d'orgue.",
    highlights: [
      "Randonnée jusqu'aux cascades de Setti Fatma (7 chutes)",
      "Traversée de villages berbères rarement visités par les touristes",
      "Baignade dans des bassins naturels de montagne",
      "Déjeuner berbère traditionnel chez une famille locale",
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
        title: "Journée complète — Vallée de l'Ourika",
        description:
          "Départ de Marrakech à 8h30. Début de la randonnée à 9h30 à travers villages et champs en terrasses. Baignade aux cascades. Déjeuner berbère traditionnel. Retour à Marrakech vers 17h00.",
      },
    ],
    meetingPoint: { lat: 31.3489, lng: -7.7411, name: "Ourika Valley, High Atlas" },
    seoTitle: "Randonnée d'une journée dans la vallée de l'Ourika au départ de Marrakech — Cascades et villages berbères | Marrakech Eco Tours",
    seoDescription: "Randonnée jusqu'aux cascades de Setti Fatma à travers villages berbères et torrents de montagne, à seulement 45 minutes de Marrakech. Excursion guidée d'une journée avec déjeuner berbère inclus. À partir de 35 $.",
    featured: true,
  },
  {
    id: "4",
    slug: "ouzoud-waterfalls-day-trip",
    title: "Marrakech aux cascades d'Ouzoud — Excursion d'une journée",
    category: "day-tours",
    origin: "marrakech",
    difficulty: "easy",
    duration: "1 jour",
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
      "Les plus spectaculaires cascades du Maroc — 110 m d'eau en cascade, des macaques de Barbarie sauvages et des gorges époustouflantes.",
    description:
      "Avec ses 110 mètres, les cascades d'Ouzoud sont les plus hautes chutes d'Afrique du Nord. Les gorges baignées d'embruns abritent des troupes de macaques de Barbarie sauvages, des bassins irisés d'arcs-en-ciel au pied des chutes, et des moulins traditionnels qui pressent toujours l'argan. Deux heures de route depuis Marrakech, et ça les vaut amplement.",
    highlights: [
      "Les cascades d'Ouzoud — 110 m de chute, les plus hautes d'Afrique du Nord",
      "Macaques de Barbarie sauvages dans leur habitat naturel",
      "Balade en barque au pied des chutes",
      "Visite d'un moulin traditionnel",
      "Randonnée pittoresque dans les gorges avec un guide local",
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
        title: "Journée complète — Cascades d'Ouzoud",
        description:
          "Départ de Marrakech à 7h30. Arrivée à Ouzoud vers 9h30. Marche guidée jusqu'aux chutes, sentier des gorges, balade en barque, observation des macaques. Temps libre pour le déjeuner. Retour à Marrakech vers 18h00.",
      },
    ],
    meetingPoint: { lat: 32.0061, lng: -6.7200, name: "Ouzoud Falls, Middle Atlas" },
    seoTitle: "Excursion d'une journée aux cascades d'Ouzoud au départ de Marrakech — Macaques de Barbarie et chutes de 110 m | Marrakech Eco Tours",
    seoDescription: "Visitez la plus haute cascade du Maroc — 110 mètres d'eau en chute, des macaques de Barbarie sauvages et une balade en barque dans les gorges. Excursion d'une journée depuis Marrakech avec guide inclus. À partir de 30 $.",
    featured: false,
  },
  {
    id: "5",
    slug: "agafay-desert-sunset",
    title: "Marrakech au désert d'Agafay — Coucher de soleil et dîner",
    category: "day-tours",
    origin: "marrakech",
    difficulty: "easy",
    duration: "1 jour (après-midi–soirée)",
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
      "Le Sahara en 30 minutes — balade en quad au coucher du soleil, balades à dos de chameau et dîner berbère traditionnel dans le désert de pierre d'Agafay.",
    description:
      "Nul besoin de trois jours pour ressentir le désert. L'Agafay — un vaste paysage lunaire de hamada rocailleuse à seulement 30 km de Marrakech — offre une véritable atmosphère saharienne au coucher du soleil. Traversez le plateau en quad, rejoignez le camp à dos de chameau, et attablez-vous pour un festin berbère traditionnel avec vue sur les montagnes de l'Atlas.",
    highlights: [
      "Balade en quad à travers le désert de pierre d'Agafay",
      "Balade à dos de chameau jusqu'au point de vue du coucher de soleil",
      "Dîner berbère traditionnel dans un camp du désert",
      "Montagnes de l'Atlas à l'horizon au crépuscule",
      "À seulement 30 minutes de Marrakech",
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
        title: "Après-midi dans le désert d'Agafay",
        description:
          "Prise en charge à Marrakech à 15h00. Arrivée à Agafay vers 15h30. Session de quad, balade à dos de chameau au coucher du soleil (17h30–18h30). Dîner berbère traditionnel sous les étoiles. Retour à Marrakech vers 22h00.",
      },
    ],
    meetingPoint: { lat: 31.4969, lng: -8.1073, name: "Agafay Desert, Marrakech Region" },
    seoTitle: "Circuit coucher de soleil au désert d'Agafay au départ de Marrakech — Quad, chameaux et dîner berbère | Marrakech Eco Tours",
    seoDescription: "Vivez le Sahara en 30 minutes — balade en quad, balade à dos de chameau au coucher du soleil et dîner berbère traditionnel dans le désert de pierre d'Agafay près de Marrakech. À partir de 75 $.",
    featured: false,
  },
  {
    id: "6",
    slug: "marrakech-medina-cultural-tour",
    title: "Médina de Marrakech — Circuit culturel",
    category: "cultural",
    origin: "marrakech",
    difficulty: "easy",
    isDayTour: true,
    duration: "Demi-journée (4 heures)",
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
      "Naviguez dans les souks labyrinthiques de Marrakech avec un expert local — épices, tanneries, artisans et jardins de riads cachés.",
    description:
      "La médina de Marrakech est classée au patrimoine mondial de l'UNESCO et compte parmi les labyrinthes urbains les plus vivants au monde. Votre guide local vous emmène à travers les souks ancestraux, devant des montagnes d'épices et des céramiques peintes à la main, jusque dans les tanneries en activité, puis sur une terrasse dominant la mosquée Koutoubia.",
    highlights: [
      "La place Jemaa el-Fnaa dans toute son animation",
      "Tanneries en cuir observées depuis une terrasse privée",
      "Médersa Ben Youssef — collège islamique du XVIe siècle",
      "Souk aux épices et coopérative d'huile d'argan",
      "Jardin de riad caché et thé à la menthe traditionnel",
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
        title: "Immersion complète dans la médina",
        description:
          "Départ à 9h00 depuis la mosquée Koutoubia. Traversée du Mellah, de la médersa Ben Youssef, des souks d'artisanat, des tanneries et de la place Jemaa el-Fnaa. Thé à la menthe dans un riad caché. Fin vers 13h00.",
      },
    ],
    meetingPoint: { lat: 31.6295, lng: -7.9811, name: "Koutoubia Mosque, Marrakech" },
    seoTitle: "Circuit culturel de la médina de Marrakech — Souks, tanneries et riads | Marrakech Eco Tours",
    seoDescription: "Explorez la médina de Marrakech classée UNESCO avec un guide local — tanneries en cuir, médersa Ben Youssef, place Jemaa el-Fnaa et jardins de riads cachés. Circuit privé d'une demi-journée. À partir de 45 $.",
    featured: false,
  },
  {
    id: "7",
    slug: "marrakech-to-fes-3day",
    title: "Marrakech à Fès — Circuit des villes impériales de 3 jours",
    category: "cultural",
    origin: "marrakech",
    difficulty: "easy",
    duration: "3 jours / 2 nuits",
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
      "Deux des plus grandes villes du Maroc en trois jours — col du Haut Atlas, Ifrane, forêt de cèdres et l'antique médina de Fès.",
    description:
      "La route entre Marrakech et Fès est l'une des plus spectaculaires d'Afrique. Traversez le Haut Atlas par le Tizi n'Tichka, arrêtez-vous au ksar d'Aït Ben Haddou classé à l'UNESCO, serpentez à travers les forêts de cèdres du Moyen Atlas où rôdent des macaques de Barbarie sauvages, puis arrivez à Fès el-Bali — la plus grande cité médiévale encore habitée au monde.",
    highlights: [
      "Col du Tizi n'Tichka (2 260 m)",
      "Ksar d'Aït Ben Haddou, patrimoine mondial de l'UNESCO",
      "Ifrane — le village alpin du Maroc",
      "Forêt de cèdres d'Azrou et macaques de Barbarie",
      "Médina de Fès el-Bali et tanneries Chouara",
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
          "Départ à 7h30. Ascension de l'Atlas par le Tizi n'Tichka. Visite d'Aït Ben Haddou. Poursuite par la vallée du Ziz jusqu'à Midelt pour la nuit.",
      },
      {
        day: 2,
        title: "Midelt → Ifrane → Forêt de cèdres d'Azrou → Fès",
        description:
          "Traversée du Moyen Atlas. Arrêt à Ifrane et dans la forêt de cèdres d'Azrou pour observer les macaques de Barbarie sauvages. Arrivée à Fès en après-midi. Installation au riad.",
      },
      {
        day: 3,
        title: "Journée complète dans la médina de Fès",
        description:
          "Exploration guidée de Fès el-Bali : tanneries Chouara, université Al-Qarawiyyin, médersa Bou Inania et souks labyrinthiques. Fin du circuit à Fès.",
      },
    ],
    meetingPoint: { lat: 34.0331, lng: -5.0003, name: "Fes el-Bali, Imperial City" },
    seoTitle: "Circuit Marrakech-Fès de 3 jours — Villes impériales et Haut Atlas | Marrakech Eco Tours",
    seoDescription: "Route de Marrakech à Fès via le Tizi n'Tichka, Aït Ben Haddou et les forêts de cèdres du Moyen Atlas. Circuit privé de 3 jours en 4x4 avec hébergement en riad. À partir de 290 $.",
    featured: false,
  },
  {
    id: "8",
    slug: "mgoun-massif-trek",
    title: "Marrakech au massif du M'Goun — Traversée de 7 jours",
    category: "trekking",
    origin: "marrakech",
    difficulty: "expert",
    duration: "7 jours / 6 nuits",
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
      "Le trek le plus sauvage du Maroc — 7 jours à travers le massif reculé du M'Goun (4 068 m), sans un seul autre touriste en vue.",
    description:
      "La traversée du massif du M'Goun s'adresse aux trekkeurs chevronnés voulant aller au-delà des sentiers touristiques. Sept jours de nature sauvage en haute altitude, franchissant des cols au-dessus de 3 600 m, dormant chez des familles berbères et gravissant le Jbel M'Goun — deuxième plus haut sommet du Maroc — sans presque aucun autre voyageur en vue.",
    highlights: [
      "Sommet du Jbel M'Goun — 2e plus haut sommet du Maroc à 4 068 m",
      "Complètement en dehors des sentiers touristiques",
      "Nuits chez l'habitant berbère dans des villages reculés",
      "Traversées des gorges de la Tessaoute et du M'Goun",
      "7 jours de nature sauvage pure en haute altitude",
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
      { day: 1, title: "Marrakech → Aït M'hamed", description: "Route jusqu'au point de départ. Rencontre avec l'équipe et les mulets. Première nuit chez une famille berbère." },
      { day: 2, title: "Aït M'hamed → Agouti (2 600 m)", description: "Trek à travers la « vallée heureuse » d'Aït Bouguemez. Camp à Agouti." },
      { day: 3, title: "Agouti → Tizi n'Aït Imi (3 650 m) → Tarkeddit", description: "Premier col d'altitude. Panoramas à couper le souffle. Camp sauvage à Tarkeddit." },
      { day: 4, title: "Sommet du M'Goun (4 068 m)", description: "Départ avant l'aube. Ascension du Jbel M'Goun. Descente jusqu'au camp des gorges de la Tessaoute." },
      { day: 5, title: "Traversée des gorges de la Tessaoute", description: "Marche à travers les spectaculaires gorges aux parois rouges. Baignade sauvage dans la rivière." },
      { day: 6, title: "Sortie des gorges → Bou Tharar", description: "Sortie des gorges. Nuit à Bou Tharar chez une famille locale." },
      { day: 7, title: "Bou Tharar → Marrakech", description: "Transfert retour à Marrakech via la vallée des roses. Fin du circuit vers 16h00." },
    ],
    faq: [
      { q: "Le M'Goun est-il plus difficile que le Toubkal ?", a: "Sur une semaine, oui. Nous classons ce trek en niveau expert contre difficile pour les itinéraires du Toubkal — non pas qu'une journée précise soit techniquement ardue, mais parce que ce sont sept jours consécutifs en terrain reculé, avec moins d'occasions de s'arrêter ou de faire demi-tour. C'est l'effort soutenu qui compte, plus qu'une seule journée difficile." },
      { q: "À quel point ce trek est-il isolé ?", a: "Vraiment isolé. L'itinéraire traverse de hauts plateaux et des gorges, passant par des villages où les groupes de trekkeurs restent rares. C'est justement ce qui en fait l'attrait, et c'est aussi pourquoi l'itinéraire exige un guide connaissant les points d'eau et les conditions météo." },
      { q: "Quelle expérience faut-il pour la traversée du M'Goun ?", a: "Une expérience préalable du trek sur plusieurs jours. Ce n'est pas une première grande randonnée : vous devez déjà savoir comment votre corps réagit à des jours consécutifs sur terrain accidenté et comment vous répondez à l'altitude. Si vous avez fait le Toubkal sans difficulté, vous avez une base raisonnable pour celui-ci." },
    ],
    meetingPoint: { lat: 31.6558, lng: -6.4561, name: "Aït M'hamed, Mgoun Massif" },
    seoTitle: "Trek du massif du M'Goun en 7 jours — La traversée d'altitude la plus sauvage du Maroc | Marrakech Eco Tours",
    seoDescription: "Trek expert de 7 jours à travers le massif reculé du M'Goun — sommet du Jbel M'Goun (4 068 m), franchissement de cols d'altitude et nuits chez l'habitant berbère, sans autre touriste. À partir de 820 $.",
    featured: false,
  },

  // ─────────────────────────────────────────────
  // CIRCUITS AU DÉPART D'AGADIR
  // ─────────────────────────────────────────────
  {
    id: "9",
    slug: "paradise-valley-agadir",
    title: "Agadir à Paradise Valley et aux cascades d'Immouzer",
    category: "day-tours",
    origin: "agadir",
    difficulty: "easy",
    duration: "1 jour",
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
      "Un paradis caché de gorges bordées de palmiers, de bassins naturels et de ruisseaux cristallins, à 35 km d'Agadir.",
    description:
      "Paradise Valley est l'un des secrets les mieux gardés du Maroc — un luxuriant canyon de palmiers creusé par la rivière Tamraght, à seulement 35 km au nord d'Agadir. Randonnez entre des bassins naturels alimentés par des sources de montagne glacées, baignez-vous sous des falaises en surplomb et pique-niquez à l'ombre de hauts palmiers. Une parfaite échappée loin de la plage.",
    highlights: [
      "Bassins naturels dans une gorge de palmiers",
      "Randonnée dans un canyon aux paysages spectaculaires",
      "Cascade d'Immouzer (saisonnière)",
      "Forêt de palmiers sauvages et arganiers",
      "Air de montagne frais, zéro foule",
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
        title: "Journée complète — Paradise Valley",
        description:
          "Départ d'Agadir à 9h00. Arrivée à Paradise Valley vers 10h00. Randonnée guidée dans les gorges, baignade dans les bassins naturels, déjeuner berbère sous les palmiers. Retour à Agadir vers 17h00.",
      },
    ],
    faq: [
      { q: "Y aura-t-il de l'eau dans les bassins ?", a: "Cela dépend de la saison. Les niveaux varient fortement : après les pluies d'hiver, les bassins sont à leur meilleur, et après une longue période de sécheresse, certains rétrécissent ou disparaissent. Le printemps est la période la plus fiable. Nous vous indiquerons honnêtement les conditions actuelles avant votre départ." },
      { q: "Les enfants peuvent-ils faire cette excursion ?", a: "Oui, c'est l'une de nos excursions d'une journée les plus adaptées aux familles. La marche jusqu'aux bassins principaux est courte et facile, et la baignade en est le point central. Les rochers pour sauter sont facultatifs, il y a largement de quoi s'occuper sans eux." },
      { q: "À quelle heure faut-il partir ?", a: "Tôt. Paradise Valley se trouve à environ une heure et demie d'Agadir, et arriver avant l'affluence de milieu de matinée change considérablement l'expérience — la différence entre avoir un bassin presque pour soi seul ou le partager." },
    ],
    meetingPoint: { lat: 30.5376, lng: -9.5000, name: "Paradise Valley, Tamraght" },
    seoTitle: "Excursion d'une journée à Paradise Valley au départ d'Agadir — Bassins naturels et gorge de palmiers | Marrakech Eco Tours",
    seoDescription: "Gorge de palmiers cachée avec bassins naturels à 35 km d'Agadir. Randonnée guidée dans un canyon spectaculaire, cascade d'Immouzer et déjeuner berbère inclus. À partir de 30 $.",
    featured: true,
  },
  {
    id: "10",
    slug: "sous-massa-national-park",
    title: "Agadir au parc national de Souss-Massa — Circuit faune sauvage",
    category: "day-tours",
    origin: "agadir",
    difficulty: "easy",
    duration: "1 jour",
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
      "Observez l'ibis chauve, gravement menacé, et des flamants roses dans la réserve naturelle la plus importante du Maroc.",
    description:
      "Le parc national de Souss-Massa s'étend sur 70 km de côte atlantique et d'estuaire au sud d'Agadir. C'est l'un des derniers refuges de l'ibis chauve — l'un des oiseaux les plus rares au monde — et l'habitat de flamants roses, balbuzards, huîtriers et loutres d'Afrique. Une visite incontournable pour les amoureux de la nature.",
    highlights: [
      "Ibis chauve — l'un des 10 oiseaux les plus rares au monde",
      "Colonies de flamants roses sur l'estuaire de la Massa",
      "Dunes atlantiques et sentier côtier",
      "Observation des oiseaux depuis des affûts sur le Souss",
      "Promenade dans les bois d'arganiers et d'acacias",
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
        title: "Journée complète — Souss-Massa",
        description:
          "Départ d'Agadir à 8h00. Session matinale à l'estuaire de la Massa pour observer ibis et flamants. Sentier côtier et dunes atlantiques après le déjeuner. Retour à Agadir vers 17h00.",
      },
    ],
    meetingPoint: { lat: 30.0559, lng: -9.6320, name: "Souss-Massa National Park, Massa" },
    seoTitle: "Circuit faune sauvage au parc national de Souss-Massa au départ d'Agadir — Le rare ibis chauve | Marrakech Eco Tours",
    seoDescription: "Observez l'ibis chauve, gravement menacé, et des flamants roses dans la réserve naturelle la plus importante du Maroc. Guide naturaliste expert, jumelles et pique-nique inclus. À partir de 70 $.",
    featured: true,
  },
  {
    id: "11",
    slug: "taroudant-day-trip-agadir",
    title: "Agadir à Taroudant — Excursion d'une journée",
    category: "cultural",
    origin: "agadir",
    difficulty: "easy",
    isDayTour: true,
    duration: "1 jour",
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
      "La « grand-mère de Marrakech » — remparts ocre ancestraux, souks aux épices et marché berbère préservé du tourisme de masse.",
    description:
      "Taroudant, c'est ce qu'était Marrakech il y a 50 ans — l'expérience complète de la médina médiévale sans la foule touristique. Les remparts ocre du XVIe siècle comptent parmi les mieux conservés du Maroc. Les tanneries, le souk aux épices et le marché de bijoux en argent y sont authentiques et sans hâte. À seulement 80 km d'Agadir.",
    highlights: [
      "Remparts du XVIe siècle — les mieux conservés du Maroc",
      "Marché berbère authentique et souk aux épices",
      "Tanneries de Taroudant (plus petites et moins fréquentées qu'à Fès)",
      "Oasis et kasbah de Tiout (en option)",
      "Bijouterie en argent traditionnelle du Souss",
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
        title: "Journée complète — Taroudant",
        description:
          "Départ d'Agadir à 8h30. Arrivée à Taroudant vers 9h30. Visite guidée de la médina, des remparts, des souks et des tanneries. Arrêt facultatif à l'oasis de Tiout. Retour à Agadir vers 17h00.",
      },
    ],
    meetingPoint: { lat: 30.4702, lng: -8.8773, name: "Taroudant, Souss Valley" },
    seoTitle: "Excursion d'une journée à Taroudant au départ d'Agadir — Remparts anciens et marché berbère | Marrakech Eco Tours",
    seoDescription: "Découvrez les remparts du XVIe siècle les mieux conservés du Maroc et les marchés berbères authentiques de Taroudant — à 80 km d'Agadir, loin de la foule touristique. À partir de 40 $.",
    featured: false,
  },
  {
    id: "12",
    slug: "agadir-surf-lesson",
    title: "Cours de surf sur la plage d'Agadir",
    category: "day-tours",
    origin: "agadir",
    difficulty: "easy",
    duration: "Demi-journée (2–3 heures)",
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
      "Apprenez à surfer sur les vagues atlantiques et chaudes d'Agadir — cours professionnel, planche et combinaison inclus.",
    description:
      "La baie d'Agadir offre des vagues atlantiques régulières et adaptées aux débutants, avec une eau chaude toute l'année, ce qui en fait l'un des meilleurs endroits du Maroc pour apprendre à surfer. Nos moniteurs diplômés accompagnent aussi bien les débutants complets que les surfeurs de niveau intermédiaire. Planche, combinaison et tout l'équipement sont fournis.",
    highlights: [
      "Moniteurs de surf professionnels diplômés",
      "Planche et combinaison incluses",
      "Niveaux débutant et intermédiaire",
      "Vagues atlantiques chaudes dans la baie d'Agadir",
      "Conditions de surf toute l'année",
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
        title: "Session de surf — Baie d'Agadir",
        description:
          "Rendez-vous avec votre moniteur à la plage à l'heure convenue. 30 min de cours au sol (technique et sécurité), 90 min dans l'eau. Sessions disponibles matin et après-midi tous les jours.",
      },
    ],
    meetingPoint: { lat: 30.4206, lng: -9.5981, name: "Agadir Beach, Agadir Bay" },
    seoTitle: "Cours de surf à Agadir — Apprenez à surfer sur la côte atlantique du Maroc | Marrakech Eco Tours",
    seoDescription: "Apprenez à surfer sur les vagues atlantiques chaudes de la baie d'Agadir avec un moniteur ISA certifié. Planche, combinaison et briefing sécurité inclus. Niveaux débutant et intermédiaire. À partir de 28 $.",
    featured: false,
  },
  {
    id: "13",
    slug: "anti-atlas-trekking-agadir",
    title: "Agadir aux montagnes de l'Anti-Atlas — Trek de 3 jours",
    category: "trekking",
    origin: "agadir",
    difficulty: "moderate",
    duration: "3 jours / 2 nuits",
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
      "Trois jours dans l'antique Anti-Atlas — vallées peintes, gorges en fleurs d'amandiers et villages berbères sans autre touriste.",
    description:
      "L'Anti-Atlas est la chaîne de montagnes la plus méconnue du Maroc — plus ancienne que l'Atlas, aux formes plus étranges, et totalement épargnée par le tourisme. Pics de granit rose, gorges aux tons safran, vergers d'amandiers en fleurs, et villages berbères où la vie n'a pas changé depuis des siècles. Au départ d'Agadir, voici le vrai Maroc.",
    highlights: [
      "Pics de granit rose ancestraux de l'Anti-Atlas",
      "Tafraoute — la vallée des roches peintes",
      "Gorges en fleurs d'amandiers (février-mars)",
      "Villages berbères sans aucun autre touriste",
      "Vues spectaculaires sur la vallée au coucher du soleil",
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
        title: "Agadir → Tafraoute → Premier camp",
        description:
          "Route jusqu'à Tafraoute (2h30). Visite des roches peintes. Début du trek dans les gorges d'amandiers. Nuit dans un gîte berbère.",
      },
      {
        day: 2,
        title: "Traversée de la crête",
        description:
          "Journée complète de trek à travers les crêtes de granit rose, avec vue sur la vallée d'Ameln en contrebas. Nuit en camping ou en gîte dans un village reculé.",
      },
      {
        day: 3,
        title: "Descente de la vallée → Agadir",
        description:
          "Descente matinale à travers la forêt d'arganiers. Déjeuner traditionnel dans un village. Retour en voiture à Agadir. Arrivée en fin d'après-midi.",
      },
    ],
    meetingPoint: { lat: 29.7231, lng: -8.9762, name: "Tafraoute, Anti-Atlas Mountains" },
    seoTitle: "Trek de 3 jours dans les montagnes de l'Anti-Atlas au départ d'Agadir — Granit rose et roches peintes | Marrakech Eco Tours",
    seoDescription: "Trek de 3 jours à travers la chaîne de montagnes la plus méconnue du Maroc — pics de granit rose, gorges en fleurs d'amandiers et villages berbères reculés. Circuit privé au départ d'Agadir. À partir de 280 $.",
    featured: true,
  },
  {
    id: "14",
    slug: "sahara-2day-agadir",
    title: "Agadir au Sahara — Circuit désert de 2 jours",
    category: "desert",
    origin: "agadir",
    difficulty: "easy",
    duration: "2 jours / 1 nuit",
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
      "Traversez l'Anti-Atlas et la vallée du Drâa jusqu'au Sahara — balade à dos de chameau, camp du désert et lever de soleil sur l'Erg Chegaga.",
    description:
      "La plupart des circuits sahariens partent de Marrakech — celui-ci vous emmène par la route sud, moins fréquentée, via la vallée du Drâa et l'Erg Chegaga, le champ de dunes le plus vaste et le plus reculé du Maroc. Une escapade de deux jours au départ d'Agadir qui donne l'impression d'une semaine loin du monde.",
    highlights: [
      "Erg Chegaga — le champ de dunes reculé que peu de touristes atteignent",
      "Palmeraie de la vallée du Drâa et kasbahs anciennes",
      "Balades à dos de chameau au coucher et au lever du soleil",
      "Camp berbère de luxe dans le désert, sous la Voie lactée",
      "Route méridionale via Tata et Foum Zguid",
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
          "Départ d'Agadir à 6h30. Route vers le sud à travers les contreforts de l'Anti-Atlas via Tata. Traversée de la hamada jusqu'à Foum Zguid. Balade à dos de chameau dans l'Erg Chegaga au coucher du soleil. Dîner au camp berbère.",
      },
      {
        day: 2,
        title: "Lever de soleil → Vallée du Drâa → Agadir",
        description:
          "Balade à dos de chameau à l'aube pour le lever du soleil sur les dunes. Petit-déjeuner au camp. Route vers le nord à travers les magnifiques palmeraies de la vallée du Drâa. Arrivée à Agadir en soirée.",
      },
    ],
    meetingPoint: { lat: 29.8671, lng: -7.9386, name: "Erg Chegaga, Western Sahara" },
    seoTitle: "Circuit Sahara de 2 jours au départ d'Agadir — Camp désertique de l'Erg Chegaga et vallée du Drâa | Marrakech Eco Tours",
    seoDescription: "Les dunes reculées de l'Erg Chegaga via la route méridionale de la vallée du Drâa — balade à dos de chameau, camp de luxe dans le désert et lever de soleil sur le Sahara. Circuit de 2 jours au départ d'Agadir. À partir de 195 $.",
    featured: true,
  },
  {
    id: "15",
    slug: "souss-valley-cultural-tour",
    title: "Agadir à la vallée du Souss — Circuit argan et culture berbère",
    category: "cultural",
    origin: "agadir",
    difficulty: "easy",
    isDayTour: true,
    duration: "1 jour",
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
      "Visitez une coopérative d'argan gérée par des femmes, un village de miel et partagez un déjeuner en famille berbère dans la vallée du Souss.",
    description:
      "La vallée du Souss, au sud d'Agadir, est le cœur de la production d'argan marocaine — une biosphère protégée par l'UNESCO où des femmes berbères dirigent les coopératives produisant l'huile la plus prisée au monde. Visitez la coopérative, observez le processus d'extraction traditionnel, goûtez des produits d'argan pur et partagez un déjeuner fait maison chez une famille berbère.",
    highlights: [
      "Visite et dégustation dans une coopérative d'huile d'argan gérée par des femmes",
      "Village de miel — démonstration par un apiculteur local",
      "Déjeuner berbère traditionnel en famille",
      "Point de vue panoramique sur la vallée du Souss",
      "Marché d'Aït Baha (si jour de marché)",
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
        title: "Journée complète — Vallée du Souss",
        description:
          "Départ d'Agadir à 9h00. Visite de la coopérative d'argan (10h00). Route vers le village de miel. Déjeuner en famille berbère (13h00). Visite l'après-midi d'Aït Baha ou du point de vue sur la vallée. Retour à Agadir vers 17h00.",
      },
    ],
    meetingPoint: { lat: 30.0667, lng: -8.6500, name: "Souss Valley, Aït Baha Region" },
    seoTitle: "Excursion argan et culture d'une journée dans la vallée du Souss au départ d'Agadir — Coopérative de femmes | Marrakech Eco Tours",
    seoDescription: "Visitez une coopérative d'huile d'argan gérée par des femmes, un village de miel et partagez un déjeuner en famille berbère dans la vallée du Souss — le cœur de l'argan marocain. À partir de 38 $.",
    featured: false,
  },
  {
    id: "16",
    slug: "agadir-to-essaouira-day-trip",
    title: "Agadir à Essaouira — Excursion d'une journée",
    category: "day-tours",
    origin: "agadir",
    difficulty: "easy",
    duration: "1 jour",
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
      "La ville la plus envoûtante de la côte atlantique — barques bleues, remparts anciens et les fruits de mer les plus frais du Maroc.",
    description:
      "Essaouira se trouve à deux heures au nord d'Agadir, le long de la côte atlantique. Sa médina bleu et blanc, classée à l'UNESCO, plonge directement dans les vagues déferlantes de l'océan. Flânez sur les remparts portugais du XVIIIe siècle, achetez des bijoux en argent berbère auprès des artisans, dégustez des sardines grillées sur le mur du port, et sentez le célèbre vent d'Essaouira.",
    highlights: [
      "Remparts portugais du XVIIIe siècle en front de mer",
      "Médina classée UNESCO et port de pêche bleu",
      "Déjeuner de fruits de mer frais sur le mur du port",
      "Ateliers d'artisans : bois, bijouterie, textiles",
      "Le célèbre vent atlantique d'Essaouira",
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
          "Départ d'Agadir à 8h00. Arrivée à Essaouira vers 10h00. Visite guidée de la médina, des remparts et du port. Temps libre pour le déjeuner et l'exploration. Départ à 16h30. Retour à Agadir vers 18h30.",
      },
    ],
    meetingPoint: { lat: 31.5085, lng: -9.7595, name: "Essaouira Medina, Atlantic Coast" },
    seoTitle: "Excursion d'une journée à Essaouira au départ d'Agadir — Médina UNESCO et remparts atlantiques | Marrakech Eco Tours",
    seoDescription: "Excursion d'une journée d'Agadir à la médina bleu et blanc d'Essaouira classée UNESCO — remparts portugais du XVIIIe siècle, fruits de mer frais du port et ateliers d'artisans. À partir de 40 $.",
    featured: false,
  },
  {
    id: "17",
    slug: "marrakech-to-chefchaouen-4day",
    title: "Marrakech à Chefchaouen — Circuit de la ville bleue en 4 jours",
    category: "cultural",
    origin: "marrakech",
    difficulty: "easy",
    duration: "4 jours / 3 nuits",
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
      "Quatre jours à travers les villes impériales les plus emblématiques du Maroc — pour finir dans les ruelles bleutées et magiques de Chefchaouen, dans les montagnes du Rif.",
    description:
      "Ce circuit relie trois des destinations les plus photogéniques du Maroc en quatre jours. Roulez vers le nord depuis Marrakech à travers les forêts de cèdres du Moyen Atlas, passez une journée à explorer Fès el-Bali — la plus grande cité médiévale du monde — puis continuez vers Chefchaouen, la légendaire ville bleue dévalant les flancs des montagnes du Rif. Murs bleu cobalt, torrents de montagne et zéro tourisme de masse.",
    highlights: [
      "Chefchaouen — la ville bleue des montagnes du Rif",
      "Médina de Fès el-Bali classée UNESCO et tanneries Chouara",
      "Forêt de cèdres d'Azrou et macaques de Barbarie sauvages",
      "Ruines romaines de Volubilis (patrimoine mondial de l'UNESCO)",
      "Meknès — le Versailles marocain",
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
        title: "Marrakech → Ifrane → Fès",
        description:
          "Départ de Marrakech à 7h00. Traversée du Moyen Atlas. Arrêt à Ifrane et dans la forêt de cèdres d'Azrou pour observer les macaques de Barbarie. Arrivée à Fès en soirée. Installation au riad.",
      },
      {
        day: 2,
        title: "Journée complète dans la médina de Fès",
        description:
          "Journée guidée complète à Fès el-Bali : tanneries Chouara, université Al-Qarawiyyin, médersa Bou Inania et souks anciens. Promenade en soirée sur les remparts de la médina.",
      },
      {
        day: 3,
        title: "Fès → Volubilis → Meknès → Chefchaouen",
        description:
          "Visite matinale de Volubilis — les ruines romaines les mieux conservées du Maroc. Route vers Meknès (le Versailles marocain). Poursuite vers Chefchaouen, dans les montagnes du Rif. Arrivée en soirée.",
      },
      {
        day: 4,
        title: "Journée complète à Chefchaouen",
        description:
          "Journée complète dans la ville bleue. Promenade guidée dans les ruelles bleutées de la médina, point de vue de la Mosquée espagnole et cascade de Ras El-Maa. Fin du circuit à Chefchaouen.",
      },
    ],
    meetingPoint: { lat: 35.1688, lng: -5.2636, name: "Chefchaouen, Rif Mountains" },
    seoTitle: "Circuit de la ville bleue de Marrakech à Chefchaouen en 4 jours — Fès, Volubilis et montagnes du Rif | Marrakech Eco Tours",
    seoDescription: "Circuit de 4 jours de Marrakech aux ruelles bleutées de Chefchaouen via Fès, les ruines romaines de Volubilis et Meknès. 4x4 privé avec hébergement en riad. À partir de 340 $.",
    featured: false,
  },
  {
    id: "18",
    slug: "marrakech-imperial-cities-5day",
    title: "Marrakech — Les 4 villes impériales — Grand circuit de 5 jours",
    category: "cultural",
    origin: "marrakech",
    difficulty: "easy",
    duration: "5 jours / 4 nuits",
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
      "Les quatre capitales impériales du Maroc en cinq jours — Marrakech, Meknès, Fès et Rabat — d'un pays qui compte quatre sièges de pouvoir depuis mille ans.",
    description:
      "Les quatre villes impériales du Maroc — Marrakech, Meknès, Fès et Rabat — portent chacune un chapitre différent de l'histoire du pays. Ce grand circuit de cinq jours vous mène à travers toutes : la médina labyrinthique de Fès, les portes monumentales de Meknès, la capitale côtière classée à l'UNESCO de Rabat, et retour à la ville rose de Marrakech. L'un des grands voyages terrestres d'Afrique.",
    highlights: [
      "Les 4 villes impériales : Marrakech, Meknès, Fès, Rabat",
      "Ruines romaines de Volubilis (patrimoine mondial de l'UNESCO)",
      "Mosquée Hassan II à Rabat",
      "Tanneries Chouara à Fès",
      "Bab Mansour — la plus grande porte d'Afrique du Nord",
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
          "Route vers le nord depuis Marrakech via l'Atlas. Arrêt à Aït Ben Haddou. Poursuite vers Midelt pour la nuit, sur les hauts plateaux entre les deux chaînes de l'Atlas.",
      },
      {
        day: 2,
        title: "Midelt → Volubilis → Meknès",
        description:
          "Matinée aux ruines romaines de Volubilis. Après-midi à Meknès : porte Bab Mansour, greniers royaux et souks de la médina. Nuit à Meknès.",
      },
      {
        day: 3,
        title: "Meknès → Journée complète à Fès",
        description:
          "Journée complète à Fès el-Bali avec un guide expert. Tanneries Chouara, Al-Qarawiyyin, médersa Bou Inania et l'ancien souk des joailliers. Nuit à Fès.",
      },
      {
        day: 4,
        title: "Fès → Rabat",
        description:
          "Route vers l'ouest jusqu'à Rabat, sur la côte atlantique. Visite de la tour Hassan et du mausolée Mohammed V, de la kasbah des Oudayas et de la médina fortifiée. Nuit à Rabat.",
      },
      {
        day: 5,
        title: "Rabat → Casablanca → Marrakech",
        description:
          "Arrêt facultatif à la mosquée Hassan II à Casablanca (extérieur — la plus grande mosquée hors d'Arabie saoudite). Poursuite vers le sud jusqu'à Marrakech. Arrivée en soirée.",
      },
    ],
    meetingPoint: { lat: 34.0209, lng: -6.8416, name: "Rabat, Atlantic Capital" },
    seoTitle: "Circuit des 4 villes impériales du Maroc en 5 jours — Marrakech, Meknès, Fès et Rabat | Marrakech Eco Tours",
    seoDescription: "Grand circuit à travers les quatre capitales impériales du Maroc en 5 jours. Ruines romaines de Volubilis, tanneries Chouara, Bab Mansour et tour Hassan. 4x4 privé au départ de Marrakech. À partir de 480 $.",
    featured: false,
  },

  // ─────────────────────────────────────────────
  // CIRCUITS DÉSERT AU DÉPART DE MARRAKECH (nouveaux)
  // ─────────────────────────────────────────────
  {
    id: "23",
    slug: "zagora-2day-marrakech",
    title: "Marrakech à Zagora — Circuit désert de 2 jours",
    category: "desert",
    origin: "marrakech",
    difficulty: "easy",
    duration: "2 jours / 1 nuit",
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
      "La route la plus rapide vers le Sahara depuis Marrakech — par Aït Ben Haddou et les 200 km de palmeraie de la vallée du Drâa jusqu'à un camp désertique sous les étoiles près de Zagora.",
    description:
      "Deux jours pour aller au désert et en revenir. Zagora offre une véritable expérience saharienne — balades à dos de chameau, nuit dans un camp berbère et un vaste ciel étoilé — sans le trajet plus long jusqu'à Merzouga. La route à travers la vallée du Drâa est l'une des plus belles du Maroc : 200 km d'oasis de palmiers-dattiers, de kasbahs anciennes et de villages berbères bordant la rivière. Les dunes de l'Erg Lehoudi sont plus calmes et moins fréquentées que celles de l'Erg Chebbi, ce qui en fait le circuit idéal pour les voyageurs disposant de peu de temps mais désireux de vivre l'expérience désertique complète.",
    highlights: [
      "Vallée du Drâa — la plus longue oasis du Maroc, 200 km de palmiers-dattiers et de kasbahs",
      "Balade à dos de chameau sur les dunes de l'Erg Lehoudi au coucher du soleil",
      "Nuit dans un camp désertique berbère avec musique traditionnelle",
      "Ksar d'Aït Ben Haddou classé à l'UNESCO",
      "Tamegroute — une bibliothèque coranique du XIVe siècle toujours ouverte aux visiteurs",
      "Moins fréquenté que Merzouga — une expérience désertique plus intimiste",
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
        title: "Marrakech → Aït Ben Haddou → Vallée du Drâa → Camp de Zagora",
        description:
          "Prise en charge à votre hébergement de Marrakech à 7h00. Franchissement du col du Tizi n'Tichka et arrêt au ksar d'Aït Ben Haddou classé UNESCO. Déjeuner à Ouarzazate. Route vers le sud à travers toute la longueur de l'oasis de la vallée du Drâa — palmeraies, villages en pisé et anciennes kasbahs-greniers bordant la route. Arrêt à Tamegroute pour découvrir la bibliothèque du XIVe siècle et les célèbres ateliers de poterie verte. Arrivée au camp du désert près de Zagora en fin d'après-midi. En selle sur un chameau pour la balade au coucher du soleil à travers les dunes. Dîner berbère traditionnel et musique autour du feu de camp.",
      },
      {
        day: 2,
        title: "Lever de soleil sur les dunes → Vallée du Drâa → Marrakech",
        description:
          "Marche matinale ou balade à dos de chameau facultative pour le lever de soleil sur le désert. Petit-déjeuner au camp. Départ à 8h30 à travers l'oasis de la vallée du Drâa dans la lumière du matin — une atmosphère très différente de l'après-midi. Halte déjeuner à Ouarzazate ou en chemin. Retour par le Haut Atlas. Arrivée à Marrakech vers 18h30.",
      },
    ],
    meetingPoint: { lat: 30.3323, lng: -5.8366, name: "Zagora, Draa Valley" },
    featured: false,
    seoTitle: "Circuit désert de Marrakech à Zagora en 2 jours — Vallée du Drâa, balade à dos de chameau et camp berbère | Marrakech Eco Tours",
    seoDescription: "La route la plus rapide vers le Sahara — Aït Ben Haddou, les 200 km de palmeraie de la vallée du Drâa et une balade à dos de chameau dans les dunes. Circuit désert de 2 jours au départ de Marrakech avec camp berbère. À partir de 149 $.",
  },
  {
    id: "24",
    slug: "erg-chegaga-3day-marrakech",
    title: "Erg Chegaga — Expédition désertique reculée de 3 jours",
    category: "desert",
    origin: "marrakech",
    difficulty: "moderate",
    duration: "3 jours / 2 nuits",
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
      "Le désert le plus reculé du Maroc — l'Erg Chegaga exige un trajet hors piste en 4x4 au-delà de la dernière route goudronnée pour atteindre des dunes s'élevant à 120 m au-dessus d'une mer de sable vaste et déserte.",
    description:
      "L'Erg Chegaga, c'est le Sahara que la plupart des touristes ne trouvent jamais. Contrairement à l'Erg Chebbi près de Merzouga — où les caravanes de chameaux se croisent à la vue des hôtels — Chegaga exige un trajet hors piste en 4x4 au-delà de la fin du bitume à M'Hamid, dernier village avant le vrai Sahara. Le champ de dunes s'étend sur des kilomètres, presque sans âme qui vive. Trois jours au départ de Marrakech, via Aït Ben Haddou, la vallée du safran de Taliouine, et le bout du monde connu — puis deux nuits au cœur du désert, où le silence est le seul bruit.",
    highlights: [
      "Erg Chegaga — moins de touristes, dunes de 120 m, silence profond",
      "Traversée désertique hors piste en 4x4 depuis M'Hamid jusqu'au champ de dunes",
      "2 nuits dans un camp désertique sans aucun autre camp en vue",
      "Vallée du safran de Taliouine — la capitale des épices du Maroc",
      "Ksar d'Aït Ben Haddou classé à l'UNESCO",
      "Balades à dos de chameau au lever et au coucher du soleil dans un coin privé du Sahara",
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
          "Prise en charge à 7h00. Franchissement du col du Tizi n'Tichka et visite d'Aït Ben Haddou. Poursuite vers le sud via Ouarzazate et la vallée du safran près de Taliouine — capitale marocaine du safran — pour une courte halte. Poursuite vers M'Hamid, dernière ville avant le Sahara à ciel ouvert. Dîner et nuit à M'Hamid.",
      },
      {
        day: 2,
        title: "M'Hamid → Erg Chegaga (traversée en 4x4)",
        description:
          "Après le petit-déjeuner, embarquement en 4x4 — la route goudronnée s'arrête ici. Deux à trois heures de conduite hors piste à travers le désert ouvert, longeant des campements nomades éparpillés et des plaines de hamada fossilifères. Atteinte de la lisière de l'Erg Chegaga vers midi. Balade à dos de chameau au cœur du champ de dunes. Le camp est monté au centre de l'erg — aucune route, aucun autre camp, aucune pollution lumineuse. Coucher de soleil sur les dunes. Dîner traditionnel et un ciel embrasé d'étoiles.",
      },
      {
        day: 3,
        title: "Lever de soleil sur le Sahara → M'Hamid → Marrakech",
        description:
          "Réveil avant l'aube pour gravir la crête de la dune et admirer le lever du soleil. Petit-déjeuner au camp. Le 4x4 retraverse le désert jusqu'à M'Hamid. Début du long et magnifique trajet vers le nord, via Zagora, la vallée du Drâa, puis le Haut Atlas. Arrivée à Marrakech vers 19h30.",
      },
    ],
    faq: [
      { q: "En quoi l'Erg Chegaga diffère-t-il de Merzouga ?", a: "Chegaga est plus reculé et plus calme. Le champ de dunes est plus large mais moins haut que l'Erg Chebbi, et l'approche finale se fait en 4x4 à travers le désert ouvert plutôt que sur route goudronnée. Il se peut que vous n'aperceviez aucun autre camp, ce qui est précisément la raison de le choisir." },
      { q: "Pourquoi ce circuit est-il classé modéré plutôt que facile ?", a: "C'est l'accès qui compte. Rejoindre Chegaga implique un transfert en 4x4 à travers le désert ouvert, plus accidenté que la route menant à Merzouga. La marche en elle-même n'est pas exigeante — c'est le trajet, pas l'effort physique, qui justifie ce classement." },
      { q: "L'Erg Chegaga vaut-il l'effort supplémentaire par rapport à Merzouga ?", a: "Si c'est la solitude que vous recherchez réellement, oui. Si vous voulez les hautes dunes sculptées des photos avec un accès simple, Merzouga est le meilleur choix pour les mêmes trois jours. Ni l'un ni l'autre n'est un lot de consolation ; ce sont deux expériences différentes." },
    ],
    meetingPoint: { lat: 29.8250, lng: -5.7246, name: "M'Hamid, Gateway to Erg Chegaga" },
    featured: true,
    seoTitle: "Circuit désert de 3 jours à l'Erg Chegaga au départ de Marrakech — Dunes reculées et expédition 4x4 dans le Sahara | Marrakech Eco Tours",
    seoDescription: "L'expérience désertique la plus reculée du Maroc — 3 jours de Marrakech à l'Erg Chegaga via une traversée hors piste en 4x4, 2 nuits dans un camp berbère privé. Sans foule, dunes de 120 m. À partir de 320 $.",
  },
  {
    id: "25",
    slug: "desert-4day-marrakech",
    title: "Grand circuit désert de Marrakech — 4 jours",
    category: "desert",
    origin: "marrakech",
    difficulty: "easy",
    duration: "4 jours / 3 nuits",
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
      "Quatre jours à travers l'ensemble du sud marocain — montagnes, canyons, studios de cinéma, une nuit dans le désert et la route des Mille Kasbahs — jusqu'à l'Erg Chebbi et retour.",
    description:
      "Voici le circuit désertique de référence au départ de Marrakech. Quatre jours pour vivre tout ce qu'offre le sud du Maroc : le spectacle du Haut Atlas, la grandeur cinématographique d'Aït Ben Haddou (utilisé dans Game of Thrones, Gladiator et Lawrence d'Arabie), les parois de 400 m des gorges du Todra, une nuit complète dans un camp désertique de l'Erg Chebbi, et le retour par la légendaire route des Mille Kasbahs. Un circuit avec assez de temps pour respirer, explorer et véritablement s'imprégner de l'un des paysages les plus spectaculaires de la planète.",
    highlights: [
      "Nuit complète dans un camp désertique de l'Erg Chebbi — balades à dos de chameau au coucher et au lever du soleil",
      "Gorges du Todra — le canyon le plus spectaculaire du Maroc (parois de 400 m, marche de 4 km)",
      "Ksar d'Aït Ben Haddou classé UNESCO — lieu de tournage de Gladiator et Game of Thrones",
      "Vallée du Dadès — vallée des Mille Kasbahs",
      "Oasis de Skoura — mer de palmiers-dattiers et anciennes kasbahs en terre",
      "Retour via la route des Mille Kasbahs — corridor de la vallée du Drâa",
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
        title: "Marrakech → Aït Ben Haddou → Ouarzazate → Vallée du Dadès",
        description:
          "Prise en charge à 7h00. Ascension du col du Tizi n'Tichka à travers le Haut Atlas (2 260 m). Arrêt au ksar d'Aït Ben Haddou classé UNESCO pour une exploration complète de 45 minutes. Pause déjeuner à Ouarzazate avec possibilité de visiter les studios de cinéma de l'Atlas (où furent tournés Gladiator et Game of Thrones). Poursuite à travers la spectaculaire vallée du Dadès — kasbahs rose-rouge, villages oasiens et formations rocheuses en « doigts de singe ». Arrivée à l'hôtel de la vallée du Dadès vers 17h00. Dîner et nuit sur place.",
      },
      {
        day: 2,
        title: "Vallée du Dadès → Gorges du Todra → Camp désertique de Merzouga",
        description:
          "Petit-déjeuner à l'hôtel. Marche dans les gorges du Todra à leur point le plus étroit — un corridor de 40 m de large entre des parois calcaires de 400 m, avec une rivière limpide sous les pieds. Poursuite vers l'est à travers les plaines présahariennes, entre villes-oasis et pâturages nomades. Arrivée à Merzouga en après-midi. En selle sur un chameau pour la balade au coucher du soleil dans les dunes majestueuses de l'Erg Chebbi. Arrivée au camp tandis que le ciel devient rouge. Tajine marocain traditionnel pour le dîner, musique berbère autour du feu et un ciel vivant d'étoiles.",
      },
      {
        day: 3,
        title: "Lever de soleil sur le Sahara → Village de Merzouga → Ouarzazate",
        description:
          "Lever à 5h30 pour gravir la dune et observer le réveil du Sahara. Retour à dos de chameau au camp, petit-déjeuner et rafraîchissement au gîte de Merzouga. Début du retour par la « route des Mille Kasbahs » — un itinéraire différent, plus au sud, via Tazarine et N'Kob, un chapelet d'anciennes kasbahs en terre le long d'une ancienne route caravanière. Arrivée à Ouarzazate en soirée. Nuit à l'hôtel.",
      },
      {
        day: 4,
        title: "Ouarzazate → Aït Ben Haddou → Tizi n'Tichka → Marrakech",
        description:
          "Visite matinale facultative de la kasbah Taourirt à Ouarzazate. Bref arrêt de retour à Aït Ben Haddou pour un second angle sous la lumière du matin. Remontée du col du Tizi n'Tichka avec vues panoramiques sur l'Atlas. Arrivée à Marrakech vers 17h00.",
      },
    ],
    meetingPoint: { lat: 31.0580, lng: -4.0127, name: "Merzouga, Erg Chebbi Sahara" },
    featured: true,
    seoTitle: "Circuit désert de 4 jours au départ de Marrakech — Erg Chebbi, gorges du Todra et route des Mille Kasbahs | Marrakech Eco Tours",
    seoDescription: "Le circuit désertique complet au départ de Marrakech — 4 jours à travers Aït Ben Haddou, les gorges du Todra, un camp désertique de l'Erg Chebbi et la route des Mille Kasbahs. À partir de 360 $.",
  },

  // ─────────────────────────────────────────────
  // CIRCUITS DÉSERT AU DÉPART D'AGADIR (nouveaux)
  // ─────────────────────────────────────────────
  {
    id: "26",
    slug: "merzouga-3day-agadir",
    title: "Agadir à Merzouga — Circuit désert du Sahara de 3 jours",
    category: "desert",
    origin: "agadir",
    difficulty: "easy",
    duration: "3 jours / 2 nuits",
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
      "De la côte atlantique d'Agadir au champ de dunes le plus emblématique du Sahara — via Taroudant, Taliouine, Aït Ben Haddou et les gorges du Todra jusqu'à une balade à dos de chameau au coucher du soleil sur l'Erg Chebbi.",
    description:
      "La plupart des circuits sahariens partent de Marrakech. Celui-ci part d'Agadir — et la route méridionale ajoute deux lieux que la plupart des touristes manquent : Taroudant, la ville aux remparts médiévaux les mieux conservés du Maroc, et Taliouine, la capitale mondiale du safran. De là, l'itinéraire suit la route classique vers l'est, via Ouarzazate, Aït Ben Haddou et les gorges du Todra, avant de vous mener à l'Erg Chebbi — le champ de dunes le plus spectaculaire du Sahara — à temps pour la balade à dos de chameau au coucher du soleil. Trois jours qui couvrent toute la largeur du sud marocain.",
    highlights: [
      "Erg Chebbi — balade à dos de chameau au coucher du soleil dans des dunes de 160 m",
      "Nuit dans un camp désertique berbère sous les étoiles",
      "Taroudant — la plus belle ville fortifiée médiévale du Maroc",
      "Taliouine — la capitale mondiale du safran",
      "Ksar d'Aït Ben Haddou classé à l'UNESCO",
      "Marche dans les gorges du Todra (parois de 400 m)",
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
        title: "Agadir → Taroudant → Taliouine → Aït Ben Haddou → Vallée du Dadès",
        description:
          "Prise en charge matinale à votre hôtel d'Agadir à 6h30. Route vers l'est jusqu'à Taroudant (1 heure) — promenade sur les remparts du XVIe siècle et dans le souk aux épices de cette ville médiévale parfaitement conservée. Poursuite vers Taliouine, cœur marocain de la culture du safran, pour une courte halte. Traversée d'Ouarzazate et visite du ksar d'Aït Ben Haddou classé UNESCO. Poursuite à travers la vallée du Dadès. Arrivée à l'hôtel vers 18h00. Dîner et nuit sur place.",
      },
      {
        day: 2,
        title: "Vallée du Dadès → Gorges du Todra → Camp de l'Erg Chebbi",
        description:
          "Petit-déjeuner à l'hôtel. Marche au fond des gorges du Todra — parois de calcaire rose de 400 m encadrant un étroit corridor fluvial. Route vers l'est à travers les plaines désertiques jusqu'à Merzouga. En selle sur un chameau au coucher du soleil pour rejoindre les dunes majestueuses de l'Erg Chebbi. Le camp est atteint tandis que le ciel s'assombrit. Dîner au tajine traditionnel, musique berbère et observation des étoiles dans l'obscurité saharienne.",
      },
      {
        day: 3,
        title: "Lever de soleil sur le Sahara → Merzouga → Agadir",
        description:
          "Lever à 5h30 pour le lever du soleil sur les dunes. Retour à dos de chameau, petit-déjeuner au camp, rafraîchissement à Merzouga. Début du long trajet retour vers l'ouest et le sud — via Rissani, Tazarine et les plaines désertiques, puis le col du Tizi n'Tichka jusqu'à Agadir. Arrivée entre 20h00 et 21h00.",
      },
    ],
    meetingPoint: { lat: 30.4202, lng: -9.5981, name: "Agadir City Centre" },
    featured: false,
    seoTitle: "Circuit désert d'Agadir à Merzouga en 3 jours — Erg Chebbi, Taroudant et Taliouine | Marrakech Eco Tours",
    seoDescription: "De la côte atlantique d'Agadir au Sahara — via Taroudant, Taliouine, Aït Ben Haddou et une balade à dos de chameau au coucher du soleil sur l'Erg Chebbi. Circuit désert de 3 jours avec camp berbère. À partir de 295 $.",
  },
  {
    id: "27",
    slug: "zagora-2day-agadir",
    title: "Agadir à Zagora — Circuit désert de 2 jours",
    category: "desert",
    origin: "agadir",
    difficulty: "easy",
    duration: "2 jours / 1 nuit",
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
      "Deux jours des plages atlantiques d'Agadir au désert — via la ville fortifiée de Taroudant, la capitale du tapis de Taznakht et les 200 km de palmeraie de la vallée du Drâa jusqu'aux dunes de Zagora.",
    description:
      "La route la plus rapide d'Agadir au désert ne passe pas par Marrakech. Elle file vers l'est via Taroudant et Taznakht, entrant dans la vallée du Drâa par le sud — la plus longue oasis du Maroc, un ruban de palmiers-dattiers, de kasbahs anciennes et de villages berbères s'étirant sur 200 km à travers le sud présaharien. Les dunes de Zagora sont plus calmes que celles de Merzouga, l'atmosphère y est plus intimiste, et après une nuit dans un camp berbère traditionnel à écouter de la musique sous un ciel immense et noir, le trajet du retour en vaut entièrement la peine.",
    highlights: [
      "Dunes de Zagora — une expérience de camp désertique plus calme et intimiste",
      "Vallée du Drâa — 200 km d'oasis de palmiers-dattiers et de kasbahs anciennes",
      "Taroudant — remparts médiévaux les mieux conservés du Maroc",
      "Taznakht — capitale du tissage de tapis berbères",
      "Balade à dos de chameau au coucher du soleil et observation des étoiles depuis le désert",
      "Bibliothèque coranique du XIVe siècle de Tamegroute",
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
        title: "Agadir → Taroudant → Taznakht → Vallée du Drâa → Zagora",
        description:
          "Prise en charge à votre hôtel d'Agadir à 7h30. Route vers l'est jusqu'à Taroudant — promenade sur les remparts ocre du XVIe siècle et dans le marché berbère. Poursuite vers Taznakht, capitale berbère du tissage de tapis. Entrée dans la vallée du Drâa par l'ouest, suivie vers le sud à travers palmeraies et villages anciens jusqu'à Zagora. Arrivée au camp désertique à temps pour une balade à dos de chameau au coucher du soleil sur les dunes. Dîner berbère traditionnel et musique sous les étoiles.",
      },
      {
        day: 2,
        title: "Lever de soleil → Tamegroute → Vallée du Drâa → Agadir",
        description:
          "Balade matinale facultative à dos de chameau pour le lever du soleil. Petit-déjeuner au camp. Arrêt à Tamegroute — un village doté d'une bibliothèque coranique du XIVe siècle abritant des manuscrits enluminés et une célèbre coopérative de poterie vernissée verte. Route vers le nord à travers toute la longueur de la vallée du Drâa dans la lumière matinale. Retour via Ouarzazate jusqu'à Agadir. Arrivée vers 18h30.",
      },
    ],
    meetingPoint: { lat: 30.4202, lng: -9.5981, name: "Agadir City Centre" },
    featured: false,
    seoTitle: "Circuit désert d'Agadir à Zagora en 2 jours — Vallée du Drâa, Taroudant et camp berbère | Marrakech Eco Tours",
    seoDescription: "De la côte d'Agadir au désert de Zagora en 2 jours — via Taroudant, les 200 km de palmeraie de la vallée du Drâa et une balade à dos de chameau au coucher du soleil. Camp berbère sous les étoiles. À partir de 179 $.",
  },
  {
    id: "28",
    slug: "erg-chegaga-3day-agadir",
    title: "Agadir à l'Erg Chegaga — Circuit désert reculé de 3 jours",
    category: "desert",
    origin: "agadir",
    difficulty: "moderate",
    duration: "3 jours / 2 nuits",
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
      "La meilleure route saharienne au départ d'Agadir — vers le sud à travers les contreforts de l'Anti-Atlas et la vallée du Drâa pour atteindre en 4x4 l'Erg Chegaga, le champ de dunes le plus reculé du Maroc.",
    description:
      "Depuis Agadir, la route vers l'Erg Chegaga est la plus naturelle du Maroc. Direction le sud à travers les contreforts de l'Anti-Atlas via Tata et Foum Zguid, en entrant dans le Sahara par l'ouest — une approche très différente de l'itinéraire classique au départ de Marrakech. L'Erg Chegaga, c'est le Sahara pour ceux qui veulent moins de touristes, davantage de dunes au total, et un sentiment de nature sauvage plus authentique. La traversée en 4x4 depuis M'Hamid fait partie de l'aventure. Deux nuits au cœur du désert, loin de tout.",
    highlights: [
      "Erg Chegaga — le champ de dunes le plus reculé du Maroc, atteint en 4x4",
      "Approche méridionale unique via les contreforts de l'Anti-Atlas et Tata",
      "2 nuits dans un camp berbère sans aucun autre camp en vue",
      "Retour par la vallée du Drâa — corridor complet de 200 km d'oasis",
      "Balades à dos de chameau au coucher et au lever du soleil sur de vastes dunes désertes",
      "Parmi les ciels les plus sombres d'Afrique du Nord pour l'observation des étoiles",
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
        title: "Agadir → Contreforts de l'Anti-Atlas → Tata → Foum Zguid / M'Hamid",
        description:
          "Prise en charge matinale à Agadir à 6h30. Route vers le sud à travers les contreforts de l'Anti-Atlas — la plus ancienne chaîne de montagnes du Maroc, plus étrange et plus antique d'aspect que le Haut Atlas. Traversée de la ville-oasis de Tata puis poursuite vers Foum Zguid ou M'Hamid, dernières localités avant l'Erg Chegaga. Dîner et nuit sur place.",
      },
      {
        day: 2,
        title: "Traversée en 4x4 vers l'Erg Chegaga",
        description:
          "Après le petit-déjeuner, la route goudronnée s'arrête. Embarquement en 4x4 pour la traversée hors piste — deux à trois heures de conduite désertique à travers hamada ouverte, plaines fossilifères et acacias épars. Arrivée à la lisière de l'Erg Chegaga vers midi. Balade à dos de chameau dans le champ de dunes. Le camp est installé au cœur de l'erg. Coucher de soleil sur les dunes, dîner à la lueur du feu, un silence que vous n'oublierez pas.",
      },
      {
        day: 3,
        title: "Lever de soleil → M'Hamid → Vallée du Drâa → Agadir",
        description:
          "Réveil avant l'aube pour le lever de soleil complet sur les dunes. Petit-déjeuner au camp. Le 4x4 retraverse le désert jusqu'à M'Hamid. Route vers le nord à travers la vallée du Drâa — l'un des plus beaux trajets du Maroc — puis retour à Agadir via Zagora et Ouarzazate. Arrivée à Agadir vers 20h00.",
      },
    ],
    meetingPoint: { lat: 30.4202, lng: -9.5981, name: "Agadir City Centre" },
    featured: false,
    seoTitle: "Circuit désert de 3 jours d'Agadir à l'Erg Chegaga — Sahara reculé et expédition 4x4 | Marrakech Eco Tours",
    seoDescription: "Le désert le plus reculé du Maroc au départ d'Agadir — 3 jours à travers l'Anti-Atlas jusqu'à l'Erg Chegaga en 4x4, 2 nuits dans un camp berbère privé. Moins de touristes, plus de silence. À partir de 345 $.",
  },
  {
    id: "29",
    slug: "desert-4day-agadir",
    title: "Grand circuit désert d'Agadir — 4 jours",
    category: "desert",
    origin: "agadir",
    difficulty: "easy",
    duration: "4 jours / 3 nuits",
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
      "Quatre jours de la côte atlantique au Sahara et retour — Taroudant, Aït Ben Haddou, gorges du Todra, une nuit complète dans un camp désertique de l'Erg Chebbi et la route des Mille Kasbahs.",
    description:
      "Le circuit désertique ultime au départ d'Agadir — avec un avantage sur tous les circuits partant de Marrakech : deux destinations que les touristes de Marrakech ratent. Les remparts parfaitement conservés du XVIe siècle de Taroudant et les champs de safran de Taliouine valent bien le lever matinal. De là, l'itinéraire suit le grand arc méridional : Aït Ben Haddou, Ouarzazate, la vallée du Dadès, les gorges du Todra et l'Erg Chebbi — le champ de dunes le plus emblématique du Maroc. Quatre jours qui révèlent toute la largeur et la profondeur du sud marocain.",
    highlights: [
      "Camp désertique de l'Erg Chebbi — deux balades à dos de chameau, une nuit complète dans le désert",
      "Taroudant — ville fortifiée médiévale, unique à l'itinéraire d'Agadir",
      "Taliouine — la capitale mondiale du safran (unique à l'itinéraire d'Agadir)",
      "Ksar d'Aït Ben Haddou classé à l'UNESCO",
      "Gorges du Todra — marche entre des parois de canyon de 400 m",
      "Route des Mille Kasbahs — retour par l'ancienne route caravanière",
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
        title: "Agadir → Taroudant → Taliouine → Aït Ben Haddou → Vallée du Dadès",
        description:
          "Prise en charge à votre hôtel d'Agadir à 6h30. Route vers l'est jusqu'à Taroudant — découverte des remparts du XVIe siècle les mieux conservés du Maroc et de l'ancien marché aux épices berbère. Poursuite vers Taliouine pour une visite d'une coopérative de safran. Traversée d'Ouarzazate et arrêt au ksar d'Aït Ben Haddou classé UNESCO. Poursuite à travers la spectaculaire vallée du Dadès. Arrivée à l'hôtel vers 18h00. Dîner et nuit sur place.",
      },
      {
        day: 2,
        title: "Vallée du Dadès → Gorges du Todra → Camp de l'Erg Chebbi",
        description:
          "Petit-déjeuner à l'hôtel. Marche au fond des gorges du Todra — parois calcaires de 400 m, une rivière sous les pieds, et presque aucune foule tôt le matin. Route vers l'est à travers le paysage oasien présaharien jusqu'à Merzouga. En selle sur un chameau à la lisière des dunes pour rejoindre l'Erg Chebbi au coucher du soleil. Arrivée au camp à la tombée de la nuit. Tajine traditionnel, musique gnaoua, observation des étoiles dans le ciel saharien.",
      },
      {
        day: 3,
        title: "Lever de soleil sur le Sahara → Route des Mille Kasbahs → Ouarzazate",
        description:
          "Réveil avant l'aube pour le lever du soleil sur les dunes. Retour à dos de chameau au camp. Petit-déjeuner et rafraîchissement. Emprunt de la route des Mille Kasbahs — un itinéraire de retour méridional via Tazarine, N'Kob et le corridor de la vallée du Drâa, bordé d'anciennes kasbahs en terre qui servaient jadis aux caravanes transsahariennes. Arrivée à Ouarzazate en soirée. Nuit à l'hôtel.",
      },
      {
        day: 4,
        title: "Ouarzazate → Aït Ben Haddou → Tizi n'Tichka → Agadir",
        description:
          "Visite matinale facultative des studios de cinéma de l'Atlas ou de la kasbah Taourirt à Ouarzazate. Bref arrêt à Aït Ben Haddou dans la lumière du matin. Retour via Marrakech puis à travers l'Anti-Atlas jusqu'à Agadir. Arrivée vers 20h00.",
      },
    ],
    meetingPoint: { lat: 30.4202, lng: -9.5981, name: "Agadir City Centre" },
    featured: false,
    seoTitle: "Circuit désert de 4 jours au départ d'Agadir — Erg Chebbi, Taroudant, gorges du Todra et route des Mille Kasbahs | Marrakech Eco Tours",
    seoDescription: "Le grand circuit désertique complet au départ d'Agadir — 4 jours à travers Taroudant, Aït Ben Haddou, les gorges du Todra, un camp de l'Erg Chebbi et la route des Mille Kasbahs. À partir de 420 $.",
  },

  // ─────────────────────────────────────────────
  // VILLES IMPÉRIALES AU DÉPART D'AGADIR
  // ─────────────────────────────────────────────
  {
    id: "19",
    slug: "agadir-to-fes-4day",
    title: "Agadir à Fès — Circuit des villes impériales en 4 jours",
    category: "cultural",
    origin: "agadir",
    difficulty: "easy",
    duration: "4 jours / 3 nuits",
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
      "De la côte atlantique au cœur médiéval du Maroc — Marrakech, le Haut Atlas, les forêts de cèdres et l'antique médina de Fès.",
    description:
      "Au départ d'Agadir, ce voyage de quatre jours monte de la côte atlantique à travers Marrakech puis par-dessus le Haut Atlas avant d'atteindre Fès el-Bali — la plus grande cité médiévale encore habitée au monde. Franchissez le col du Tizi n'Tichka, faites halte au ksar d'Aït Ben Haddou classé UNESCO, arpentez les forêts de cèdres du Moyen Atlas où rôdent des macaques de Barbarie sauvages, et perdez-vous dans les souks labyrinthiques de Fès.",
    highlights: [
      "Col du Tizi n'Tichka (2 260 m)",
      "Ksar d'Aït Ben Haddou, patrimoine mondial de l'UNESCO",
      "Ifrane — le village alpin du Maroc",
      "Forêt de cèdres d'Azrou et macaques de Barbarie",
      "Médina de Fès el-Bali et tanneries Chouara",
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
          "Départ d'Agadir le matin. Route vers le nord le long de la plaine atlantique jusqu'à Marrakech (3h). Après-midi libre ou promenade facultative dans la médina. Nuit dans un riad à Marrakech.",
      },
      {
        day: 2,
        title: "Marrakech → Tizi n'Tichka → Aït Ben Haddou → Midelt",
        description:
          "Ascension de l'Atlas par le Tizi n'Tichka. Visite d'Aït Ben Haddou. Poursuite par la vallée du Ziz jusqu'à Midelt pour la nuit.",
      },
      {
        day: 3,
        title: "Midelt → Ifrane → Forêt de cèdres d'Azrou → Fès",
        description:
          "Traversée du Moyen Atlas. Arrêt à Ifrane et dans la forêt de cèdres d'Azrou pour observer les macaques de Barbarie sauvages. Arrivée à Fès en après-midi. Installation au riad.",
      },
      {
        day: 4,
        title: "Journée complète dans la médina de Fès",
        description:
          "Exploration guidée de Fès el-Bali : tanneries Chouara, université Al-Qarawiyyin, médersa Bou Inania et souks labyrinthiques. Fin du circuit à Fès.",
      },
    ],
    meetingPoint: { lat: 34.0331, lng: -5.0003, name: "Fes el-Bali, Imperial City" },
    seoTitle: "Circuit de 4 jours d'Agadir à Fès — Haut Atlas, Aït Ben Haddou et cité impériale | Marrakech Eco Tours",
    seoDescription: "Route d'Agadir à Fès via Marrakech, le Tizi n'Tichka et les forêts de cèdres du Moyen Atlas. Circuit privé de 4 jours en 4x4 avec hébergement en riad. À partir de 360 $.",
    featured: false,
  },
  {
    id: "20",
    slug: "agadir-to-chefchaouen-5day",
    title: "Agadir à Chefchaouen — Circuit de la ville bleue en 5 jours",
    category: "cultural",
    origin: "agadir",
    difficulty: "easy",
    duration: "5 jours / 4 nuits",
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
      "Cinq jours de la côte atlantique aux ruelles bleutées de Chefchaouen — via Marrakech, Fès et les ruines romaines de Volubilis.",
    description:
      "Ce circuit de cinq jours commence à Agadir et relie les destinations les plus photogéniques du Maroc. Roulez jusqu'à Marrakech, traversez les forêts de cèdres du Moyen Atlas, explorez Fès el-Bali — la plus grande cité médiévale du monde —, visitez les ruines romaines de Volubilis et les portes impériales de Meknès, puis terminez à Chefchaouen, la légendaire ville bleue dévalant les flancs des montagnes du Rif.",
    highlights: [
      "Chefchaouen — la ville bleue des montagnes du Rif",
      "Médina de Fès el-Bali classée UNESCO et tanneries Chouara",
      "Forêt de cèdres d'Azrou et macaques de Barbarie sauvages",
      "Ruines romaines de Volubilis (patrimoine mondial de l'UNESCO)",
      "Meknès — le Versailles marocain",
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
          "Départ d'Agadir le matin. Route vers le nord jusqu'à Marrakech (3h). Après-midi libre. Nuit dans un riad à Marrakech.",
      },
      {
        day: 2,
        title: "Marrakech → Ifrane → Fès",
        description:
          "Départ matinal de Marrakech. Traversée du Moyen Atlas. Arrêt à Ifrane et dans la forêt de cèdres d'Azrou pour observer les macaques de Barbarie. Arrivée à Fès en soirée. Installation au riad.",
      },
      {
        day: 3,
        title: "Journée complète dans la médina de Fès",
        description:
          "Journée guidée complète à Fès el-Bali : tanneries Chouara, université Al-Qarawiyyin, médersa Bou Inania et souks anciens. Promenade en soirée sur les remparts de la médina.",
      },
      {
        day: 4,
        title: "Fès → Volubilis → Meknès → Chefchaouen",
        description:
          "Visite matinale de Volubilis — les ruines romaines les mieux conservées du Maroc. Route vers Meknès (le Versailles marocain). Poursuite vers Chefchaouen, dans les montagnes du Rif. Arrivée en soirée.",
      },
      {
        day: 5,
        title: "Journée complète à Chefchaouen",
        description:
          "Journée complète dans la ville bleue. Promenade guidée dans les ruelles bleutées de la médina, point de vue de la Mosquée espagnole et cascade de Ras El-Maa. Fin du circuit à Chefchaouen.",
      },
    ],
    meetingPoint: { lat: 35.1688, lng: -5.2636, name: "Chefchaouen, Rif Mountains" },
    seoTitle: "Circuit de 5 jours d'Agadir à Chefchaouen — Fès, Volubilis et ville bleue | Marrakech Eco Tours",
    seoDescription: "Circuit de 5 jours d'Agadir à la ville bleue du Maroc via Marrakech, Fès, les ruines romaines de Volubilis et les portes impériales de Meknès. 4x4 privé avec riads. À partir de 420 $.",
    featured: false,
  },
  {
    id: "21",
    slug: "agadir-imperial-cities-6day",
    title: "Agadir — Les 4 villes impériales — Grand circuit de 6 jours",
    category: "cultural",
    origin: "agadir",
    difficulty: "easy",
    duration: "6 jours / 5 nuits",
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
      "Les quatre capitales impériales du Maroc en six jours au départ de la côte atlantique — Marrakech, Meknès, Fès et Rabat.",
    description:
      "Au départ d'Agadir, ce grand circuit de six jours parcourt les quatre villes impériales du Maroc — Marrakech, Meknès, Fès et Rabat — chacune incarnant un chapitre différent de l'histoire millénaire du pays. De la ville rose de Marrakech à la médina labyrinthique de Fès, en passant par les portes monumentales de Meknès et la capitale côtière classée à l'UNESCO de Rabat. L'un des grands voyages terrestres d'Afrique.",
    highlights: [
      "Les 4 villes impériales : Marrakech, Meknès, Fès, Rabat",
      "Ruines romaines de Volubilis (patrimoine mondial de l'UNESCO)",
      "Mosquée Hassan II à Rabat",
      "Tanneries Chouara à Fès",
      "Bab Mansour — la plus grande porte d'Afrique du Nord",
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
          "Départ d'Agadir le matin. Route vers le nord jusqu'à Marrakech (3h). Promenade dans la médina l'après-midi ou temps libre. Nuit dans un riad à Marrakech.",
      },
      {
        day: 2,
        title: "Marrakech → Aït Ben Haddou → Ouarzazate → Midelt",
        description:
          "Route vers le nord depuis Marrakech via l'Atlas. Arrêt à Aït Ben Haddou. Poursuite vers Midelt pour la nuit, sur les hauts plateaux entre les deux chaînes de l'Atlas.",
      },
      {
        day: 3,
        title: "Midelt → Volubilis → Meknès",
        description:
          "Matinée aux ruines romaines de Volubilis. Après-midi à Meknès : porte Bab Mansour, greniers royaux et souks de la médina. Nuit à Meknès.",
      },
      {
        day: 4,
        title: "Meknès → Journée complète à Fès",
        description:
          "Journée complète à Fès el-Bali avec un guide expert. Tanneries Chouara, Al-Qarawiyyin, médersa Bou Inania et l'ancien souk des joailliers. Nuit à Fès.",
      },
      {
        day: 5,
        title: "Fès → Rabat",
        description:
          "Route vers l'ouest jusqu'à Rabat, sur la côte atlantique. Visite de la tour Hassan et du mausolée Mohammed V, de la kasbah des Oudayas et de la médina fortifiée. Nuit à Rabat.",
      },
      {
        day: 6,
        title: "Rabat → Casablanca → Marrakech",
        description:
          "Arrêt facultatif à la mosquée Hassan II à Casablanca (extérieur — la plus grande mosquée hors d'Arabie saoudite). Poursuite vers le sud jusqu'à Marrakech. Transfert vers Agadir ou nuit sur place. Fin du circuit.",
      },
    ],
    meetingPoint: { lat: 34.0209, lng: -6.8416, name: "Rabat, Atlantic Capital" },
    seoTitle: "Circuit des 4 villes impériales du Maroc en 6 jours au départ d'Agadir — Marrakech, Meknès, Fès et Rabat | Marrakech Eco Tours",
    seoDescription: "Grand circuit de 6 jours au départ d'Agadir à travers les quatre villes impériales marocaines — Marrakech, Meknès, Fès et Rabat. 4x4 privé avec hébergement en riad. À partir de 560 $.",
    featured: false,
  },

  // ─────────────────────────────────────────────
  // NOUVEAUX TREKS HAUT ATLAS / TOUBKAL
  // ─────────────────────────────────────────────
  {
    id: "30",
    slug: "toubkal-circuit-ifni-lake-6day",
    title: "Circuit du Toubkal et lac d'Ifni — Trek de 6 jours",
    category: "trekking",
    origin: "marrakech",
    difficulty: "challenging",
    duration: "6 jours / 5 nuits",
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
      "La boucle complète autour du Jbel Toubkal — villages berbères reculés, cols à plus de 3 600 m, le lac turquoise d'Ifni et un final au sommet à 4 167 m.",
    description:
      "Le circuit du Toubkal est la traversée complète du Haut Atlas — une boucle entière autour du massif que peu de trekkeurs achèvent. Sur six jours, vous franchissez quatre grands cols, traversez les pâturages et villages reculés du parc national du Toubkal, campez au bord de l'extraordinaire lac turquoise d'Ifni, et terminez par l'ascension du Jbel Toubkal lui-même. Bien plus varié et isolé que la simple ascension du sommet, c'est le Toubkal du connaisseur.",
    highlights: [
      "Camper au bord du lac turquoise d'Ifni (2 295 m), le plus beau lac de l'Atlas",
      "Franchir quatre cols d'altitude, dont le Tizi n'Ouanoums (3 664 m) et le Tizi Likemt (3 555 m)",
      "Atteindre le sommet du Jbel Toubkal (4 167 m) — le plus haut sommet d'Afrique du Nord",
      "Dormir dans des villages berbères reculés que peu d'autres trekkeurs atteignent",
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
        title: "Marrakech → Imlil → Tachedirt (2 300 m)",
        description:
          "Transfert de Marrakech à Imlil (1h30). Trek à travers la vallée de l'Imenane, entre champs en terrasses et villages berbères, jusqu'à Tachedirt. Environ 5 heures de marche.",
      },
      {
        day: 2,
        title: "Tachedirt → Tizi Likemt (3 555 m) → Azib Likemt (2 250 m)",
        description:
          "Ascension du col du Tizi Likemt avec de vastes vues sur le Haut Atlas, puis descente vers les hauts pâturages d'été d'Azib Likemt. 6 à 7 heures.",
      },
      {
        day: 3,
        title: "Azib Likemt → Tizi n'Ourai → Amsouzart (1 740 m)",
        description:
          "Suivez la rivière Ourai, franchissez un col pittoresque, et descendez vers le village accueillant d'Amsouzart pour une nuit dans un gîte familial. Environ 6 heures.",
      },
      {
        day: 4,
        title: "Amsouzart → Lac d'Ifni (2 295 m)",
        description:
          "Une montée progressive vous mène au lac turquoise d'Ifni, niché de façon spectaculaire entre des pics abrupts. Après-midi libre au bord de l'eau. 4 à 5 heures.",
      },
      {
        day: 5,
        title: "Lac d'Ifni → Tizi n'Ouanoums (3 664 m) → Refuge du Toubkal (3 207 m)",
        description:
          "Une ascension raide et rocailleuse jusqu'au col d'Ouanoums dominant le lac, puis une descente vers le refuge du Toubkal. Coucher tôt avant le jour du sommet. Environ 6 heures.",
      },
      {
        day: 6,
        title: "Sommet du Toubkal (4 167 m) → Imlil → Marrakech",
        description:
          "Ascension avant l'aube par le Cirque Sud jusqu'au toit de l'Afrique du Nord, au lever du soleil. Descente vers Imlil et transfert retour à Marrakech. Une dernière journée longue et gratifiante.",
      },
    ],
    meetingPoint: { lat: 31.1369, lng: -7.9169, name: "Imlil Village, Atlas Mountains" },
    seoTitle: "Trek du circuit du Toubkal en 6 jours via le lac d'Ifni au départ de Marrakech — Sommet et circuit | Marrakech Eco Tours",
    seoDescription: "Le circuit complet du Toubkal en 6 jours au départ de Marrakech — cols d'altitude, le lac turquoise d'Ifni et le sommet du Jbel Toubkal (4 167 m). Guide berbère diplômé, tous les repas et transferts inclus. À partir de 620 $.",
    featured: false,
  },
  {
    id: "31",
    slug: "toubkal-summit-2day-marrakech",
    title: "Toubkal Express — Sommet en 2 jours au départ de Marrakech",
    category: "trekking",
    origin: "marrakech",
    difficulty: "challenging",
    duration: "2 jours / 1 nuit",
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
      "Le moyen le plus rapide d'atteindre le toit de l'Afrique du Nord — sommet du Jbel Toubkal (4 167 m) en une ascension ciblée de deux jours depuis Marrakech.",
    description:
      "Peu de temps devant vous, mais bien décidé à vous tenir au point culminant de l'Afrique du Nord ? L'ascension du Toubkal en 2 jours est la route la plus directe vers le sommet. Roulez de Marrakech à Imlil, montez jusqu'au refuge du Toubkal en passant par le sanctuaire de Sidi Chamharouch le premier jour, puis lancez l'ascension finale avant l'aube le second jour avant de redescendre entièrement jusqu'à Marrakech. C'est exigeant — sans jour d'acclimatation — une bonne condition physique est donc indispensable, mais vous vivez toute l'expérience du Toubkal en un seul week-end.",
    highlights: [
      "Sommet du Jbel Toubkal (4 167 m) en seulement deux jours depuis Marrakech",
      "Nuit au refuge du Toubkal à 3 207 m",
      "Passage par le sanctuaire de Sidi Chamharouch et sa cascade",
      "Panorama au lever du soleil sur l'ensemble du Haut Atlas",
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
        title: "Marrakech → Imlil → Refuge du Toubkal (3 207 m)",
        description:
          "Transfert matinal de Marrakech à Imlil (1h30). Montée dans la vallée d'Aït Mizane, en passant par le sanctuaire de Sidi Chamharouch, jusqu'au refuge du Toubkal. 4 à 5 heures de marche. Dîner et coucher tôt.",
      },
      {
        day: 2,
        title: "Sommet du Toubkal (4 167 m) → Imlil → Marrakech",
        description:
          "Départ avant l'aube pour le sommet via le Cirque Sud (environ 3 heures de montée). Lever de soleil depuis le toit de l'Afrique du Nord, puis descente au refuge pour le déjeuner et poursuite jusqu'à Imlil (4 à 5 heures de descente au total). Transfert retour à Marrakech.",
      },
    ],
    faq: [
      { q: "Deux jours suffisent-ils vraiment pour gravir le Toubkal ?", a: "C'est suffisant pour atteindre le sommet, et des marcheurs en bonne forme le font régulièrement. Ce que cela ne vous laisse pas, c'est le temps de vous acclimater — vous passez de Marrakech à 4 167 mètres en environ trente heures. Si vous avez de l'expérience en randonnée de montagne et un emploi du temps serré, ça fonctionne ; pour une première fois en altitude, le format 4 jours est le choix plus sûr." },
      { q: "Que comporte la première journée ?", a: "Un transfert matinal de Marrakech à Imlil, environ une heure et demie, puis quatre à cinq heures de marche dans la vallée d'Aït Mizane en passant par le sanctuaire de Sidi Chamharouch jusqu'au refuge du Toubkal à 3 207 mètres. Dîner au refuge et coucher tôt avant le départ pour le sommet." },
      { q: "La descente est-elle difficile ?", a: "Plus longue qu'on ne l'imagine. Après le sommet, vous redescendez au refuge puis poursuivez jusqu'à Imlil — quatre à cinq heures de descente au total, sur terrain instable, avec des jambes fatiguées. C'est là que les genoux se plaignent, et cela vaut la peine de s'y préparer spécifiquement." },
      { q: "Puis-je faire ce trek en hiver ?", a: "Uniquement avec un équipement hivernal et un guide qualifié pour ces conditions. De novembre à mars environ, la partie haute de l'itinéraire est enneigée et nécessite crampons, piolet et la maîtrise de leur usage. Cela devient alors une expédition d'alpinisme plutôt qu'une randonnée." },
    ],
    meetingPoint: { lat: 31.1369, lng: -7.9169, name: "Imlil Village, Atlas Mountains" },
    seoTitle: "Trek du Mont Toubkal en 2 jours au départ de Marrakech — Sommet express à 4 167 m | Marrakech Eco Tours",
    seoDescription: "Gravissez le Jbel Toubkal (4 167 m) en 2 jours depuis Marrakech — la route la plus rapide vers le plus haut sommet d'Afrique du Nord. Nuit en refuge, tous les repas, guide berbère diplômé et transferts. À partir de 210 $.",
    featured: false,
  },
  {
    id: "32",
    slug: "toubkal-aguelzim-pass-3day",
    title: "Sommet du Toubkal via le col d'Aguelzim — Trek de 3 jours",
    category: "trekking",
    origin: "marrakech",
    difficulty: "challenging",
    duration: "3 jours / 2 nuits",
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
      "La route pittoresque vers le sommet — par la vallée d'Azzaden, les cascades d'Ighouliden, et le col d'Aguelzim (3 560 m) jusqu'au Toubkal.",
    description:
      "Cet itinéraire de trois jours emprunte la voie plus calme et plus belle vers le Toubkal. Au lieu de la vallée directe d'Aït Mizane, vous marchez dans la sauvage vallée d'Azzaden, passez les cascades d'Ighouliden et les prairies d'Azib Tamsoult, puis franchissez le spectaculaire col d'Aguelzim (3 560 m) pour atteindre le refuge du Toubkal. La dernière journée est consacrée à l'ascension du sommet. Une approche plus gratifiante et plus pittoresque que l'itinéraire classique, offrant une véritable diversité de haute montagne. À noter : le col d'Aguelzim n'est praticable qu'entre mai et octobre environ.",
    highlights: [
      "Trek dans la sauvage vallée d'Azzaden — plus calme et plus verte que l'itinéraire classique",
      "Passage par les spectaculaires cascades d'Ighouliden (Tamsoult)",
      "Franchissement du col d'altitude d'Aguelzim à 3 560 m",
      "Sommet du Jbel Toubkal (4 167 m), le plus haut sommet d'Afrique du Nord",
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
        title: "Marrakech → Imlil → Vallée d'Azzaden (Azib Tamsoult)",
        description:
          "Transfert de Marrakech à Imlil. Trek par le col du Tizi n'Mzik (2 450 m) jusqu'à la vallée d'Azzaden, en passant par les cascades d'Ighouliden jusqu'au refuge près d'Azib Tamsoult. Environ 6 heures.",
      },
      {
        day: 2,
        title: "Azzaden → Col d'Aguelzim (3 560 m) → Refuge du Toubkal (3 207 m)",
        description:
          "Une montée soutenue hors de la vallée d'Azzaden par le col d'Aguelzim, avec de vastes vues sur l'Atlas occidental, puis une descente vers le refuge du Toubkal. Environ 6 à 7 heures. Coucher tôt avant le sommet.",
      },
      {
        day: 3,
        title: "Sommet du Toubkal (4 167 m) → Imlil → Marrakech",
        description:
          "Ascension avant l'aube par le Cirque Sud jusqu'au sommet, au lever du soleil. Longue descente jusqu'à Imlil (en passant par le refuge), puis transfert vers Marrakech. Une dernière journée exigeante mais inoubliable.",
      },
    ],
    meetingPoint: { lat: 31.1369, lng: -7.9169, name: "Imlil Village, Atlas Mountains" },
    seoTitle: "Trek du Toubkal en 3 jours via le col d'Aguelzim au départ de Marrakech — Itinéraire de la vallée d'Azzaden | Marrakech Eco Tours",
    seoDescription: "Gravissez le Toubkal (4 167 m) par la route pittoresque — 3 jours via la vallée d'Azzaden, les cascades d'Ighouliden et le col d'Aguelzim (3 560 m). Guide diplômé, refuges, tous les repas et transferts. À partir de 330 $.",
    featured: false,
  },
  {
    id: "33",
    slug: "toubkal-three-peaks-4000m-3day",
    title: "Toubkal — Trois sommets à 4 000 m — Défi de 3 jours",
    category: "trekking",
    origin: "marrakech",
    difficulty: "expert",
    duration: "3 jours / 2 nuits",
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
      "Gravissez trois sommets de 4 000 m du Haut Atlas en trois jours — Ras Ouanoukrim, Timesguida et le Jbel Toubkal.",
    description:
      "Pour les trekkeurs forts et expérimentés, voici le défi ultime du Haut Atlas : trois sommets de 4 000 mètres en trois jours. Depuis le refuge du Toubkal, vous gravissez les pics jumeaux de l'Ouanoukrim — Timesguida (4 089 m) et Ras (4 083 m) — avant le grand final sur le Jbel Toubkal (4 167 m) lui-même. Avec peu de temps pour s'acclimater et 1 000 m de dénivelé sur des jours consécutifs, cela exige une véritable condition physique et de l'expérience en montagne, mais récompense par trois des points les plus élevés d'Afrique du Nord.",
    highlights: [
      "Sommet de trois pics à 4 000 m : Timesguida (4 089 m), Ras Ouanoukrim (4 083 m) et Toubkal (4 167 m)",
      "L'un des treks les plus exigeants et gratifiants du Haut Atlas",
      "Base au refuge du Toubkal à 3 207 m",
      "Sommets au lever du soleil et vues immenses sur le Sahara et l'Anti-Atlas",
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
        title: "Marrakech → Imlil → Refuge du Toubkal (3 207 m)",
        description:
          "Transfert de Marrakech à Imlil. Trek dans la vallée d'Aït Mizane en passant par Sidi Chamharouch jusqu'au refuge du Toubkal. 4 à 5 heures. Acclimatation et repos avant deux grandes journées de sommet.",
      },
      {
        day: 2,
        title: "Ouanoukrim — Timesguida (4 089 m) et Ras (4 083 m)",
        description:
          "Montée vers la zone du Tizi n'Ouanoums et ascension des deux sommets jumeaux de l'Ouanoukrim, Timesguida et Ras, tous deux au-dessus de 4 000 m. Retour au refuge du Toubkal pour la nuit. Une journée complète et exigeante.",
      },
      {
        day: 3,
        title: "Sommet du Toubkal (4 167 m) → Imlil → Marrakech",
        description:
          "Ascension finale du Jbel Toubkal par le Cirque Sud au lever du soleil — le plus haut des trois. Longue descente jusqu'à Imlil et transfert retour à Marrakech.",
      },
    ],
    meetingPoint: { lat: 31.1369, lng: -7.9169, name: "Imlil Village, Atlas Mountains" },
    seoTitle: "Défi des trois sommets à 4 000 m du Toubkal — Trek de 3 jours dans le Haut Atlas | Marrakech Eco Tours",
    seoDescription: "Gravissez trois sommets de 4 000 m du Haut Atlas en 3 jours — Timesguida (4 089 m), Ras Ouanoukrim (4 083 m) et Toubkal (4 167 m). Trek de niveau expert au départ de Marrakech avec guide diplômé. À partir de 360 $.",
    featured: false,
  },
  {
    id: "34",
    slug: "marrakech-food-market-tour",
    title: "Circuit gourmand et marchés de Marrakech — Balade culinaire d'une demi-journée",
    category: "day-tours",
    origin: "marrakech",
    difficulty: "easy",
    isDayTour: true,
    duration: "Demi-journée (4 heures)",
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
      "Parcourez les souks aux épices et les étals de marché de la médina avec un guide local, en dégustant en chemin, puis cuisinez un tajine à partir de zéro.",
    description:
      "Marrakech est la capitale culinaire du Maroc, et cette balade d'une demi-journée est bâtie autour de ce fait. Commencez à Rahba Kedima, la place aux épices, en apprenant à distinguer le vrai safran des imitations teintées et la douzaine d'épices qui composent le ras el hanout. Traversez les souks alimentaires en goûtant olives, dattes, msemen et jus d'orange fraîchement pressé aux étals de Jemaa el-Fnaa. Terminez dans une cuisine familiale locale pour un cours pratique de tajine et de thé à la menthe marocain — vous mangez ce que vous cuisinez.",
    highlights: [
      "Place aux épices de Rahba Kedima — vrai safran contre imitations teintées",
      "Dégustations guidées à travers les souks alimentaires actifs de la médina",
      "Cours de cuisine pratique du tajine avec une famille locale",
      "Cérémonie du thé à la menthe marocain, dans les règles de l'art",
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
        title: "Demi-journée — Marchés de la médina et cours de cuisine",
        description:
          "Rendez-vous à la place aux épices de Rahba Kedima à 9h30. Balade guidée à travers les souks aux épices et à l'alimentation avec dégustations (90 minutes). Poursuite vers une cuisine familiale locale pour un cours pratique de tajine. Dégustation du tajine que vous avez cuisiné, accompagné de thé à la menthe. Fin vers 13h30.",
      },
    ],
    meetingPoint: { lat: 31.6316, lng: -7.9868, name: "Rahba Kedima Spice Square, Marrakech Medina" },
    seoTitle: "Circuit gourmand et marchés de Marrakech — Balade dans les souks aux épices et cours de cuisine | Marrakech Eco Tours",
    seoDescription: "Circuit gastronomique d'une demi-journée à Marrakech : dégustez votre chemin à travers les souks aux épices, puis cuisinez un vrai tajine avec une famille locale. Petit groupe, guide local. À partir de 45 $.",
    faq: [
      { q: "Ce circuit convient-il aux végétariens ?", a: "Oui. Le cours de cuisine et les dégustations peuvent être entièrement végétariens sur demande — indiquez-le lors de la réservation. La plupart des dégustations au souk (olives, dattes, épices, jus frais) sont végétariennes par défaut." },
      { q: "Devons-nous arriver affamés ?", a: "Venez avec de l'appétit, mais pas les mains vides — la balade comprend une douzaine de petites dégustations avant même d'atteindre le cours de cuisine, alors dosez-vous et évitez un gros petit-déjeuner." },
      { q: "En quoi ce circuit diffère-t-il d'une visite classique de la médina ?", a: "Une visite classique de la médina couvre monuments et histoire. Celle-ci est entièrement construite autour de la nourriture — là où les habitants font réellement leurs courses et mangent, pas les étals destinés aux touristes près de Jemaa el-Fnaa — et se termine par la cuisine, pas seulement l'observation." },
    ],
    featured: false,
  },
  {
    id: "35",
    slug: "merzouga-stargazing-desert-tour",
    title: "Observation des étoiles dans le Sahara à Merzouga — Circuit désert ciel étoilé de 2 jours",
    category: "desert",
    origin: "marrakech",
    difficulty: "easy",
    duration: "2 jours / 1 nuit",
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
      "Balade à dos de chameau dans l'Erg Chebbi au coucher du soleil, suivie d'une session guidée d'observation des étoiles à l'œil nu et au télescope sous l'un des ciels les plus sombres d'Afrique du Nord.",
    description:
      "L'Erg Chebbi se trouve assez loin de toute ville pour que la Voie lactée y soit visible à l'œil nu par nuit claire — ce circuit est construit autour de ce fait plutôt que de le traiter comme un bonus. Après la balade à dos de chameau au coucher du soleil et le dîner au camp, un guide astronome local installe un télescope et présente au groupe les planètes visibles, les constellations et les objets du ciel profond, expliqués en termes simples plutôt qu'en jargon. Idéal d'octobre à mai, quand le ciel nocturne du désert est le plus clair et que la chaleur est suffisamment retombée pour rester assis dehors confortablement pendant des heures.",
    highlights: [
      "Session guidée d'observation des étoiles à l'œil nu et au télescope avec un guide astronome",
      "Balade à dos de chameau au coucher du soleil dans les dunes de l'Erg Chebbi",
      "Une nuit dans un camp désertique berbère traditionnel, loin de toute pollution lumineuse",
      "Le meilleur ciel nocturne du désert au Maroc — aucune lueur urbaine dans aucune direction",
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
        title: "Marrakech → Camp désertique de l'Erg Chebbi",
        description:
          "Départ matinal de Marrakech, traversant le Haut Atlas et la vallée du Drâa jusqu'à Merzouga. Balade à dos de chameau au coucher du soleil dans les dunes de l'Erg Chebbi. Dîner au camp, suivi de la session guidée d'observation des étoiles une fois la nuit complètement tombée.",
      },
      {
        day: 2,
        title: "Lever de soleil → Merzouga → Marrakech",
        description:
          "Observation facultative du lever de soleil sur les dunes. Petit-déjeuner au camp, transfert à dos de chameau ou en 4x4 retour à Merzouga, puis route retour vers Marrakech, arrivée en soirée.",
      },
    ],
    meetingPoint: { lat: 31.0580, lng: -4.0127, name: "Merzouga, Erg Chebbi Sahara" },
    seoTitle: "Circuit d'observation des étoiles à Merzouga — Voyage désertique ciel étoilé du Sahara en 2 jours | Marrakech Eco Tours",
    seoDescription: "Circuit de 2 jours Marrakech-Merzouga pour observer les étoiles — balade à dos de chameau au coucher du soleil, session guidée au télescope et nuit dans un camp désertique de l'Erg Chebbi. À partir de 210 $.",
    faq: [
      { q: "Ai-je besoin de connaissances ou de matériel d'astronomie personnels ?", a: "Non. Le guide fournit le télescope et explique tout depuis le début — ce circuit est conçu aussi bien pour les débutants complets que pour les passionnés d'astronomie." },
      { q: "Quelle est la meilleure période de l'année pour ce circuit ?", a: "D'octobre à mai. Le ciel est le plus clair et la nuit désertique est assez fraîche pour rester dehors confortablement ; les nuits d'été restent étoilées mais bien plus chaudes." },
      { q: "Que se passe-t-il s'il y a des nuages ?", a: "Un ciel clair est la norme dans l'Erg Chebbi, en dehors des rares épisodes de tempête hivernale, mais si la couverture nuageuse empêche la session d'observation des étoiles, l'expérience du camp, la balade à dos de chameau et le dîner ont tout de même lieu comme prévu." },
    ],
    featured: false,
  },
];
