import type { Locale } from "@/app/[lang]/dictionaries";
import type { Faq } from "./types";

/**
 * FAQ per tour category in all six locales. Rendered visibly on the category
 * page and emitted as FAQPage schema — the two must always ship together.
 *
 * WHY LOCALISED (2026-11-20). CATEGORY_FAQ previously existed only in English,
 * so all 20 non-English category hubs (/fr/categories/*, /es/categories/*,
 * /de/categories/*, /it/categories/*, /ar/categories/*) printed English Q&As
 * and emitted English FAQPage schema on translated pages.
 *
 * Answers avoid quoting prices: tours update independently, so a figure in
 * prose would drift from the cards beside it. Cost questions point at the tour
 * pages instead.
 *
 * Keyed loosely rather than by Category so a category with no FAQ simply
 * renders nothing.
 */
export const CATEGORY_FAQ: Record<string, Faq[]> = {
  trekking: [
    {
      q: "Do I need a guide to trek in the Moroccan Atlas?",
      a: "In the Toubkal massif, yes — since the winter of 2018–19 foreign trekkers are required to be accompanied by a qualified mountain guide, and this is checked at Imlil. Elsewhere in the Atlas it is not a legal requirement, but the paths are unmarked and the villages are spread out, so most people take one anyway.",
    },
    {
      q: "How fit do I need to be for a multi-day trek?",
      a: "Enough to walk uphill for five to six hours on consecutive days carrying a daypack. These are long walks rather than technical climbs, so stamina matters far more than climbing experience. Our tour pages give each trek a difficulty rating, and moderate routes are realistic for a regular hillwalker.",
    },
    {
      q: "Do I carry all my own gear?",
      a: "On our 3-day and longer treks, mules carry the main baggage, camping equipment and food between stops, so you walk with a daypack holding water, layers and a camera. On the 2-day Toubkal Express there is no mule, so walkers carry their own overnight bag.",
    },
    {
      q: "What is the best season for trekking in Morocco?",
      a: "May to October for the High Atlas, when the high passes are clear of snow. Winter snow season runs roughly November to April and requires crampons and an ice axe (rented in Imlil) plus winter walking skills. The Anti-Atlas flips this: late winter and spring are ideal, and summer is too hot and exposed.",
    },
    {
      q: "Where do we sleep on a multi-day trek?",
      a: "A mix of mountain refuges and Berber village guesthouses depending on the route, with camping on longer circuits such as Lake Ifni and M'Goun. Village guesthouses have private bathrooms; mountain refuges are working huts with shared bunks and simple freshly cooked meals. Each itinerary lists the stay night by night.",
    },
  ],

  desert: [
    {
      q: "Can I visit the Sahara as a day trip?",
      a: "Not the real dunes. Erg Chebbi and Erg Chegaga are on the far side of the Atlas, which is why we run them over two to four days. The one-day desert experience near Marrakech is Agafay, a rocky desert rather than sand dunes — good for a sunset, but it is not the Sahara.",
    },
    {
      q: "What is the difference between Merzouga, Zagora and Erg Chegaga?",
      a: "Merzouga sits beside Erg Chebbi, the tall classic dunes most people picture, and needs three days. Zagora is closer and doable in two, with smaller dunes. Erg Chegaga is the remote option, reached by 4x4, where you see far fewer other camps. Distance and solitude both rise in that order.",
    },
    {
      q: "What is the desert camp like — is there a bathroom?",
      a: "Our private desert tours use permanent camps with proper beds and private en-suite bathrooms. On the shared Merzouga 3-day tour, standard tents use a shared bathroom block with blankets (a private bathroom tent with a heater is available as an upgrade), while shared Zagora tents each have their own bathroom and heater.",
    },
    {
      q: "What should I pack for a desert tour?",
      a: "A small overnight bag for the camp — your main luggage stays in the vehicle — plus a warm layer, something to cover your head, sunglasses and sunscreen. Desert nights get cold outside summer, and people consistently underpack for that rather than for the heat.",
    },
    {
      q: "Do I have to ride a camel?",
      a: "No. The camel leg into the camp is short and entirely optional, and walking that stretch instead is common enough that guides expect it. The vehicle covers all the real distance; the camels are the last stretch into the dunes.",
    },
  ],

  cultural: [
    {
      q: "What does a cultural tour actually involve?",
      a: "Walking the medinas, souks and historic quarters with a guide who can explain what you are looking at and negotiate the parts that are hard to navigate alone. Depending on the route it takes in the imperial cities, Ait Ben Haddou, artisan workshops and food, rather than a fixed list of monuments.",
    },
    {
      q: "Is a guide worth it in Marrakech or Fes?",
      a: "In the Fes medina especially, yes. It is one of the largest car-free urban areas in the world and genuinely disorienting on a first visit. A guide is the difference between seeing the tanneries and workshops and spending the afternoon trying to find your way back out.",
    },
    {
      q: "What should I wear when visiting medinas and religious sites?",
      a: "Covering shoulders and knees is the practical baseline for both men and women, and it draws noticeably less attention in the older quarters. Nothing more formal is expected. Comfortable shoes matter more than anything else, since medina streets are uneven and you will be on foot for hours.",
    },
    {
      q: "Can cultural tours be combined with desert or trekking trips?",
      a: "Yes, and most of our longer itineraries already do. The road between Marrakech and the Sahara passes Ait Ben Haddou and the gorges, so the cultural stops are built into the drive rather than bolted on. Tell us what you want to see and we can route around it.",
    },
  ],

  "day-tours": [
    {
      q: "What day trips are worth doing from Marrakech?",
      a: "The Ourika Valley and Atlas foothills for mountains and waterfalls, Ouzoud for the falls themselves, Agafay for a desert sunset without the long drive, and Essaouira for the coast. Each is a full day; the mountain trips get you into real Atlas scenery within about an hour of the city.",
    },
    {
      q: "Are day tours private or shared?",
      a: "We run both. Shared departures keep the cost down and put you with a small group; private trips let you set the departure time and pace, which is worth it with children or if you want to linger somewhere. The tour pages list the group size for each.",
    },
    {
      q: "What time do day tours start and finish?",
      a: "Most leave early morning and return late afternoon or early evening, since the destinations are one to three hours out. Early starts genuinely pay off at popular spots like Paradise Valley and Ouzoud, where the difference between arriving at nine and at eleven is substantial.",
    },
    {
      q: "Is hotel pickup included?",
      a: "Yes, from central accommodation in the departure city. If you are staying outside the centre or in a riad down a pedestrian alley, we will arrange a nearby meeting point instead — the guides know the medinas and will tell you exactly where to stand.",
    },
  ],
};

export const CATEGORY_FAQ_BY_LOCALE: Record<Locale, Record<string, Faq[]>> = {
  en: CATEGORY_FAQ,

  fr: {
    trekking: [
      {
        q: "Faut-il un guide pour randonner dans l'Atlas marocain ?",
        a: "Dans le massif du Toubkal, oui : depuis l'hiver 2018-2019, les randonneurs étrangers doivent être accompagnés d'un guide de montagne agréé, ce qui est contrôlé à Imlil. Ailleurs dans l'Atlas, ce n'est pas obligatoire, mais les sentiers ne sont pas balisés et les villages sont isolés.",
      },
      {
        q: "Quel niveau physique faut-il pour un trek de plusieurs jours ?",
        a: "Pouvoir marcher en montée cinq à six heures par jour sur plusieurs jours avec un petit sac à dos. Ce sont de longues marches plutôt que de l'escalade technique : l'endurance compte plus que l'expérience d'alpinisme. Chaque fiche indique le niveau de difficulté.",
      },
      {
        q: "Dois-je porter toutes mes affaires ?",
        a: "Sur nos treks de 3 jours et plus, des mules portent les bagages principaux, le matériel et la nourriture entre les étapes : vous ne portez qu'un sac de journée. Sur le Toubkal Express en 2 jours, il n'y a pas de mule et chacun porte son sac pour la nuit.",
      },
      {
        q: "Quelle est la meilleure saison pour un trek au Maroc ?",
        a: "De mai à octobre pour le Haut Atlas, lorsque les hauts cols sont dégagés. La saison enneigée s'étend environ de novembre à avril et demande crampons et piolet (en location à Imlil). L'Anti-Atlas fonctionne à l'inverse : idéal de la fin de l'hiver au printemps.",
      },
      {
        q: "Où dort-on lors d'un trek de plusieurs jours ?",
        a: "Dans des gîtes berbères de village (chambres avec salle de bain privée) et en refuge de montagne selon l'itinéraire, avec des nuits sous tente sur les grands circuits comme le lac d'Ifni ou le M'Goun. Chaque fiche détaille l'hébergement nuit par nuit.",
      },
    ],
    desert: [
      {
        q: "Peut-on visiter le Sahara en excursion d'une journée ?",
        a: "Pas les vraies dunes. Erg Chebbi et Erg Chegaga se trouvent de l'autre côté de l'Atlas, d'où des circuits de deux à quatre jours. L'excursion désert en une journée depuis Marrakech est Agafay, un désert de pierre idéal au coucher du soleil, mais ce n'est pas le Sahara.",
      },
      {
        q: "Quelle est la différence entre Merzouga, Zagora et Erg Chegaga ?",
        a: "Merzouga borde les hautes dunes d'Erg Chebbi et demande trois jours. Zagora est plus proche et accessible en deux jours, avec des dunes plus modestes. Erg Chegaga est l'option la plus isolée, atteinte en 4x4, avec beaucoup moins de campements.",
      },
      {
        q: "À quoi ressemble le campement dans le désert — y a-t-il une salle de bain ?",
        a: "Nos circuits privés utilisent des campements permanents avec vrais lits et salle de bain privative. En circuit partagé à Merzouga (3 jours), les tentes standard partagent des sanitaires (option tente avec salle de bain privée et chauffage disponible). À Zagora en partagé, chaque tente a sa salle de bain et son chauffage.",
      },
      {
        q: "Que faut-il emporter pour un circuit dans le désert ?",
        a: "Un petit sac pour la nuit au bivouac — vos valises restent dans le véhicule — plus une couche chaude, de quoi couvrir la tête, des lunettes de soleil et de la crème solaire. Les nuits dans le désert sont fraîches hors été.",
      },
      {
        q: "Est-il obligatoire de monter à dos de dromadaire ?",
        a: "Non. La balade à dromadaire jusqu'au campement est courte et totalement facultative : vous pouvez marcher à la place, nos guides en ont l'habitude. Tout le trajet longue distance se fait en véhicule.",
      },
    ],
    cultural: [
      {
        q: "En quoi consiste exactement un circuit culturel ?",
        a: "Explorer les médinas, souks et quartiers historiques avec un guide local qui explique l'architecture, l'histoire et l'artisanat. Selon l'itinéraire, le voyage relie les villes impériales, Aït Ben Haddou, les ateliers d'artisans et la cuisine marocaine.",
      },
      {
        q: "Un guide est-il utile à Marrakech ou à Fès ?",
        a: "Dans la médina de Fès en particulier, oui : c'est l'une des plus grandes zones urbaines sans voiture au monde et on s'y perd vite la première fois. Un guide fait la différence entre découvrir les tanneries et les ateliers ou tourner en rond.",
      },
      {
        q: "Comment s'habiller pour visiter les médinas et sites historiques ?",
        a: "Couvrir les épaules et les genoux est une règle simple et respectueuse pour les hommes comme pour les femmes. Des chaussures confortables sont indispensables : les ruelles des médinas sont pavées et irrégulières.",
      },
      {
        q: "Peut-on combiner un circuit culturel avec le désert ou un trek ?",
        a: "Oui, et la plupart de nos itinéraires de plusieurs jours le font déjà. La route entre Marrakech et le Sahara traverse Aït Ben Haddou et les gorges, et nous pouvons aussi adapter un circuit sur mesure selon vos envies.",
      },
    ],
    "day-tours": [
      {
        q: "Quelles excursions d'une journée valent le détour depuis Marrakech ?",
        a: "La vallée de l'Ourika pour les montagnes et cascades, les cascades d'Ouzoud, le désert d'Agafay pour un dîner au coucher du soleil sans longue route, et Essaouira pour la côte atlantique. Chaque sortie se fait facilement sur la journée.",
      },
      {
        q: "Les excursions à la journée sont-elles privées ou partagées ?",
        a: "Nous proposons les deux. Les départs partagés réduisent le budget en petit groupe ; les excursions privées vous laissent choisir l'horaire et le rythme, idéal en famille. Chaque page indique le format et la taille du groupe.",
      },
      {
        q: "À quelle heure partent et rentrent les excursions d'une journée ?",
        a: "La plupart partent tôt le matin et reviennent en fin d'après-midi ou début de soirée, selon la distance (1 à 3 heures de route). Partir tôt permet d'éviter la foule à Ouzoud ou dans la vallée du Paradis.",
      },
      {
        q: "La prise en charge à l'hôtel est-elle incluse ?",
        a: "Oui, depuis les hébergements centraux de la ville de départ. Si votre riad se trouve dans une ruelle piétonne de la médina, nous fixons un point de rendez-vous très proche que nos chauffeurs connaissent bien.",
      },
    ],
  },

  es: {
    trekking: [
      {
        q: "¿Necesito un guía para hacer trekking en el Atlas de Marruecos?",
        a: "En el macizo del Toubkal, sí: desde el invierno de 2018-19 los excursionistas extranjeros deben ir acompañados por un guía de montaña titulado, y se comprueba en Imlil. En otras zonas del Atlas no es obligatorio por ley, pero los senderos no están señalizados.",
      },
      {
        q: "¿Qué nivel físico necesito para un trek de varios días?",
        a: "Poder caminar cuesta arriba entre cinco y seis horas al día durante varios días con una mochila ligera. Son caminatas largas y no escalada técnica, así que la resistencia importa más que la experiencia en alpinismo. Cada ruta indica su dificultad.",
      },
      {
        q: "¿Tengo que cargar con todo mi equipaje?",
        a: "En nuestros treks de 3 días o más, las mulas transportan el equipaje principal, el material y la comida entre etapas, así que solo llevas una mochila de día. En el Toubkal Express de 2 días no hay mula y cada caminante lleva su mochila para la noche.",
      },
      {
        q: "¿Cuál es la mejor época para hacer trekking en Marruecos?",
        a: "De mayo a octubre en el Alto Atlas, cuando los pasos altos están sin nieve. La temporada de nieve va de noviembre a abril y exige crampones y piolet (de alquiler en Imlil). El Antiatlas es al revés: ideal a finales del invierno y en primavera.",
      },
      {
        q: "¿Dónde se duerme durante un trek de varios días?",
        a: "En casas bereberes de pueblo (con baño privado) y en refugios de montaña según la ruta, además de acampada en circuitos largos como el lago Ifni o M'Goun. Cada itinerario detalla el alojamiento noche por noche.",
      },
    ],
    desert: [
      {
        q: "¿Se puede visitar el Sáhara en una excursión de un día?",
        a: "No las grandes dunas de arena. Erg Chebbi y Erg Chegaga están al otro lado del Atlas, por eso los circuitos duran entre dos y cuatro días. La opción de un día desde Marrakech es Agafay, un desierto rocoso ideal para el atardecer, pero no es el Sáhara.",
      },
      {
        q: "¿Cuál es la diferencia entre Merzouga, Zagora y Erg Chegaga?",
        a: "Merzouga está junto a las dunas altas de Erg Chebbi y requiere tres días. Zagora queda más cerca y se hace en dos días, con dunas más pequeñas. Erg Chegaga es la opción más remota en 4x4, con muchos menos campamentos.",
      },
      {
        q: "¿Cómo es el campamento en el desierto — tiene baño?",
        a: "Nuestros tours privados usan campamentos permanentes con camas de verdad y baño privado. En el tour compartido a Merzouga (3 días), las jaimas estándar tienen baño compartido y mantas (hay opción con baño privado y calefacción). En Zagora compartido, cada jaima tiene baño privado y calefacción.",
      },
      {
        q: "¿Qué debo llevar para un tour por el desierto?",
        a: "Una bolsa pequeña para pasar la noche en el campamento — las maletas grandes se quedan en el vehículo — además de ropa de abrigo, gorra o pañuelo, gafas de sol y protector solar. Fuera del verano las noches refrescan mucho.",
      },
      {
        q: "¿Es obligatorio montar en camello?",
        a: "No. El paseo en camello hasta el campamento es corto y totalmente opcional; caminar ese tramo es habitual y los guías están acostumbrados. Todo el trayecto largo se hace en vehículo.",
      },
    ],
    cultural: [
      {
        q: "¿Qué incluye realmente un tour cultural?",
        a: "Recorrer medinas, zocos y barrios históricos con un guía local que explica la historia, la arquitectura y los oficios tradicionales. Según la ruta, abarca ciudades imperiales, Ait Ben Haddou, talleres artesanales y gastronomía local.",
      },
      {
        q: "¿Merece la pena un guía en Marrakech o Fez?",
        a: "En la medina de Fez especialmente, sí: es una de las zonas urbanas sin coches más grandes del mundo y resulta muy fácil perderse la primera vez. Un guía marca la diferencia entre conocer las curtidurías y talleres o pasar la tarde buscando la salida.",
      },
      {
        q: "¿Qué ropa conviene llevar en medinas y lugares históricos?",
        a: "Cubrir hombros y rodillas es una pauta sencilla y respetuosa tanto para hombres como para mujeres. Lo más importante es llevar calzado cómodo, porque las calles de las medinas son irregulares y se camina varias horas.",
      },
      {
        q: "¿Se pueden combinar los tours culturales con desierto o trekking?",
        a: "Sí, y muchos de nuestros circuitos ya lo hacen. La carretera entre Marrakech y el Sáhara pasa por Ait Ben Haddou y las gargantas, y también diseñamos rutas a medida según lo que quieras visitar.",
      },
    ],
    "day-tours": [
      {
        q: "¿Qué excursiones de un día merecen la pena desde Marrakech?",
        a: "El valle de Ourika para montaña y cascadas, las cascadas de Ouzoud, el desierto de Agafay para un atardecer con cena sin horas de carretera, y Esauira para la costa atlántica. Todas se hacen cómodamente en el día.",
      },
      {
        q: "¿Las excursiones de un día son privadas o compartidas?",
        a: "Ofrecemos ambas opciones. Las salidas compartidas ajustan el precio en grupo reducido; los tours privados permiten elegir la hora de salida y el ritmo, ideal para familias. Cada página detalla el formato.",
      },
      {
        q: "¿A qué hora empiezan y terminan las excursiones de un día?",
        a: "La mayoría salen temprano por la mañana y regresan a última hora de la tarde, según la distancia (entre 1 y 3 horas por trayecto). Salir pronto evita las horas más concurridas en Ouzoud o Paradise Valley.",
      },
      {
        q: "¿Está incluida la recogida en el hotel?",
        a: "Sí, en alojamientos céntricos de la ciudad de salida. Si te alojas en un riad dentro de un callejón peatonal de la medina, acordamos un punto de encuentro cercano fácil de localizar.",
      },
    ],
  },

  de: {
    trekking: [
      {
        q: "Brauche ich einen Bergführer für Trekking im marokkanischen Atlas?",
        a: "Im Toubkal-Massiv ja: Seit dem Winter 2018/19 sind ausländische Wanderer verpflichtet, mit einem lizenzierten Bergführer unterwegs zu sein, was in Imlil kontrolliert wird. Anderswo im Atlas ist es nicht vorgeschrieben, aber die Wege sind unmarkiert.",
      },
      {
        q: "Wie fit muss ich für einen Mehrtages-Trek sein?",
        a: "Sie sollten an mehreren Tagen hintereinander fünf bis sechs Stunden bergauf mit Tagesrucksack gehen können. Es handelt sich um lange Wanderungen, nicht um technisches Klettern — Ausdauer zählt mehr als Klettererfahrung.",
      },
      {
        q: "Muss ich mein gesamtes Gepäck selbst tragen?",
        a: "Auf unseren Treks ab 3 Tagen tragen Maultiere das Hauptgepäck, die Ausrüstung und Verpflegung zwischen den Etappen, sodass Sie nur einen Tagesrucksack tragen. Beim 2-tägigen Toubkal Express gibt es kein Maultier; hier tragen Wanderer ihr Übernachtungsgepäck selbst.",
      },
      {
        q: "Wann ist die beste Jahreszeit für Trekking in Marokko?",
        a: "Mai bis Oktober im Hohen Atlas, wenn die hohen Pässe schneefrei sind. Die Schneesaison dauert etwa von November bis April und erfordert Steigeisen und Eispickel (Verleih in Imlil). Im Antiatlas sind Spätwinter und Frühling ideal.",
      },
      {
        q: "Wo übernachten wir auf einem Mehrtages-Trek?",
        a: "In Berber-Dorfgästehäusern (mit eigenem Bad) und Berghütten je nach Route, auf längeren Touren wie dem Ifni-See oder M'Goun auch im Zelt. Jede Tour nennt die Unterkunft für jede einzelne Nacht.",
      },
    ],
    desert: [
      {
        q: "Kann man die Sahara als Tagesausflug besuchen?",
        a: "Nicht die echten Sanddünen. Erg Chebbi und Erg Chegaga liegen jenseits des Atlas, weshalb wir sie in zwei bis vier Tagen fahren. Der Tagesausflug ab Marrakesch ist die Steinwüste Agafay — stimmungsvoll zum Sonnenuntergang, aber nicht die Sahara.",
      },
      {
        q: "Was ist der Unterschied zwischen Merzouga, Zagora und Erg Chegaga?",
        a: "Merzouga liegt an den hohen Dünen des Erg Chebbi und braucht drei Tage. Zagora ist näher und in zwei Tagen machbar, mit kleineren Dünen. Erg Chegaga ist die abgelegenste Option per 4x4 mit deutlich weniger Camps.",
      },
      {
        q: "Wie ist das Wüstencamp ausgestattet — gibt es ein Bad?",
        a: "Unsere privaten Wüstentouren nutzen feste Camps mit richtigen Betten und eigenem Bad. Bei der geteilten 3-Tage-Tour nach Merzouga haben Standardzelte Gemeinschaftsbäder und Decken (Privatbad mit Heizung optional buchbar); bei der geteilten Zagora-Tour hat jedes Zelt eigenes Bad und Heizung.",
      },
      {
        q: "Was sollte ich für eine Wüstentour einpacken?",
        a: "Eine kleine Übernachtungstasche fürs Camp — das Hauptgepäck bleibt im Fahrzeug — plus eine warme Schicht, Kopfbedeckung, Sonnenbrille und Sonnenschutz. Außerhalb des Sommers werden Wüstennächte überraschend kalt.",
      },
      {
        q: "Muss ich auf einem Kamel reiten?",
        a: "Nein. Der Kamelritt ins Camp ist kurz und völlig freiwillig — zu Fuß gehen ist üblich und für unsere Guides selbstverständlich. Alle langen Strecken werden im Fahrzeug zurückgelegt.",
      },
    ],
    cultural: [
      {
        q: "Was erwartet mich auf einer Kulturreise?",
        a: "Geführte Erkundungen durch Medinas, Souks und historische Viertel mit einem lokalen Guide, der Geschichte, Architektur und Handwerk erklärt. Je nach Route gehören Königsstädte, Aït Ben Haddou, Werkstätten und regionale Küche dazu.",
      },
      {
        q: "Lohnt sich ein Guide in Marrakesch oder Fès?",
        a: "Besonders in der Medina von Fès ja: Sie ist eine der größten autofreien Stadtzonen der Welt und beim ersten Besuch schwer zu überblicken. Mit Guide erleben Sie Gerbereien und Werkstätten, statt den Ausgang zu suchen.",
      },
      {
        q: "Was sollte man in Medinas und an historischen Orten tragen?",
        a: "Bedeckte Schultern und Knie sind für Frauen und Männer eine respektvolle, praktische Grundlage. Am wichtigsten sind bequeme Schuhe, da die Gassen uneben sind und man mehrere Stunden zu Fuß unterwegs ist.",
      },
      {
        q: "Lassen sich Kulturreisen mit Wüste oder Trekking verbinden?",
        a: "Ja, viele unserer längeren Routen verbinden beides bereits. Die Strecke zwischen Marrakesch und der Sahara führt an Aït Ben Haddou und den Schluchten vorbei; individuelle Kombinationen planen wir ebenfalls gern.",
      },
    ],
    "day-tours": [
      {
        q: "Welche Tagesausflüge ab Marrakesch lohnen sich?",
        a: "Das Ourika-Tal für Berge und Wasserfälle, die Ouzoud-Wasserfälle, die Agafay-Wüste für Sonnenuntergang und Abendessen ohne lange Fahrt sowie Essaouira an der Atlantikküste. Alles lässt sich gut an einem Tag erleben.",
      },
      {
        q: "Sind die Tagesausflüge privat oder in der Gruppe?",
        a: "Wir bieten beides an. Geteilte Ausflüge halten die Kosten niedrig; private Touren lassen Ihnen freie Hand bei Abfahrtszeit und Tempo — besonders angenehm mit Kindern. Jede Tour-Seite nennt das Format.",
      },
      {
        q: "Wann starten und enden Tagesausflüge?",
        a: "Die meisten starten früh am Morgen und kehren am späten Nachmittag oder frühen Abend zurück (1 bis 3 Stunden Fahrt je Strecke). Ein früher Start lohnt sich besonders in Ouzoud und im Paradise Valley.",
      },
      {
        q: "Ist die Abholung vom Hotel inbegriffen?",
        a: "Ja, ab zentralen Unterkünften in der Abfahrtsstadt. Liegt Ihr Riad in einer autofreien Gasse der Medina, vereinbaren wir einen leicht erreichbaren Treffpunkt ganz in der Nähe.",
      },
    ],
  },

  it: {
    trekking: [
      {
        q: "Serve una guida per fare trekking sull'Atlante in Marocco?",
        a: "Nel massiccio del Toubkal sì: dall'inverno 2018-19 gli escursionisti stranieri devono essere accompagnati da una guida alpina autorizzata, con controllo a Imlil. Altrove sull'Atlante non è obbligatorio per legge, ma i sentieri non sono segnalati.",
      },
      {
        q: "Quanto devo essere allenato per un trekking di più giorni?",
        a: "Abbastanza da camminare in salita cinque o sei ore al giorno per più giorni consecutivi con uno zaino leggero. Sono lunghe camminate, non arrampicata tecnica: conta più la resistenza dell'esperienza alpinistica.",
      },
      {
        q: "Devo portare tutto il mio bagaglio?",
        a: "Nei trekking da 3 giorni in su i muli trasportano i bagagli principali, l'attrezzatura e i pasti tra le tappe, quindi cammini solo con uno zaino da giornata. Sul Toubkal Express di 2 giorni non c'è mulo e ciascuno porta il proprio zaino per la notte.",
      },
      {
        q: "Qual è la stagione migliore per il trekking in Marocco?",
        a: "Da maggio a ottobre nell'Alto Atlante, quando i passi in quota sono liberi dalla neve. La stagione nevosa va circa da novembre ad aprile e richiede ramponi e piccozza (a noleggio a Imlil). Nell'Anti-Atlante sono ideali tardo inverno e primavera.",
      },
      {
        q: "Dove si dorme durante un trekking di più giorni?",
        a: "In case berbere di villaggio (con bagno privato) e rifugi di montagna a seconda del percorso, con notti in tenda sui circuiti più lunghi come il lago Ifni e il M'Goun. Ogni scheda indica l'alloggio notte per notte.",
      },
    ],
    desert: [
      {
        q: "Si può visitare il Sahara in giornata?",
        a: "Non le vere dune di sabbia. Erg Chebbi ed Erg Chegaga si trovano oltre l'Atlante, per questo i tour durano da due a quattro giorni. L'esperienza in giornata da Marrakech è Agafay, un deserto roccioso perfetto al tramonto ma diverso dal Sahara.",
      },
      {
        q: "Qual è la differenza tra Merzouga, Zagora ed Erg Chegaga?",
        a: "Merzouga è accanto alle alte dune di Erg Chebbi e richiede tre giorni. Zagora è più vicina e fattibile in due giorni, con dune più basse. Erg Chegaga è la meta più remota in 4x4, con pochissimi campi.",
      },
      {
        q: "Com'è il campo nel deserto — c'è il bagno?",
        a: "I nostri tour privati usano campi permanenti con veri letti e bagno privato in tenda. Nel tour condiviso a Merzouga (3 giorni) le tende standard hanno bagni condivisi e coperte (con opzione tenda con bagno privato e riscaldamento); a Zagora condiviso ogni tenda ha bagno privato e riscaldamento.",
      },
      {
        q: "Cosa portare per un tour nel deserto?",
        a: "Uno zainetto per la notte al campo — la valigia principale resta nel veicolo — più uno strato caldo, copricapo, occhiali da sole e crema solare. Fuori dall'estate le notti nel deserto sono fredde.",
      },
      {
        q: "È obbligatorio andare in cammello?",
        a: "No. Il tratto in cammello fino al campo è breve e facoltativo: puoi farlo a piedi, le nostre guide sono abituate. Tutti i lunghi spostamenti avvengono in veicolo.",
      },
    ],
    cultural: [
      {
        q: "Cosa include un tour culturale?",
        a: "Visite guidate di medine, souk e quartieri storici con una guida locale che spiega storia, architettura e artigianato. In base all'itinerario tocca le città imperiali, Aït Ben Haddou, laboratori artigianali e cucina tradizionale.",
      },
      {
        q: "Vale la pena avere una guida a Marrakech o Fes?",
        a: "Nella medina di Fes in particolare, sì: è una delle più grandi aree urbane senza auto al mondo ed è facile perdere l'orientamento la prima volta. Una guida ti porta tra concerie e botteghe senza sprecare ore a cercare l'uscita.",
      },
      {
        q: "Come vestirsi nelle medine e nei siti storici?",
        a: "Coprire spalle e ginocchia è la scelta più pratica e rispettosa per uomini e donne. La cosa più importante sono scarpe comode, perché le strade delle medine sono irregolari e si cammina a lungo.",
      },
      {
        q: "I tour culturali si possono abbinare a deserto o trekking?",
        a: "Sì, molti dei nostri itinerari più lunghi già li uniscono. La strada tra Marrakech e il Sahara attraversa Aït Ben Haddou e le gole, e possiamo creare anche un percorso su misura.",
      },
    ],
    "day-tours": [
      {
        q: "Quali escursioni di un giorno meritano da Marrakech?",
        a: "La valle dell'Ourika per montagne e cascate, le cascate di Ouzoud, il deserto di Agafay per cena al tramonto senza ore di guida, ed Essaouira sulla costa atlantica. Tutte si fanno comodamente in giornata.",
      },
      {
        q: "Le escursioni giornaliere sono private o condivise?",
        a: "Offriamo entrambe le formule. Le partenze condivise contengono il costo in piccolo gruppo; i tour privati lasciano flessibilità su orari e ritmo, ideali con bambini. Ogni scheda indica il tipo di tour.",
      },
      {
        q: "A che ora iniziano e finiscono le escursioni di un giorno?",
        a: "Quasi tutte partono al mattino presto e rientrano nel tardo pomeriggio o in prima serata (1–3 ore di strada per tratta). Partire presto evita la folla a Ouzoud e nella Paradise Valley.",
      },
      {
        q: "Il prelievo in hotel è incluso?",
        a: "Sì, dagli alloggi centrali della città di partenza. Se il tuo riad è in un vicolo pedonale della medina, fissiamo un punto d'incontro vicinissimo e facile da raggiungere.",
      },
    ],
  },

  ar: {
    trekking: [
      {
        q: "هل أحتاج إلى مرشد للمشي الجبلي في جبال الأطلس بالمغرب؟",
        a: "في جبل توبقال نعم: منذ شتاء 2018–2019 يُلزم المسافرون الأجانب بمرافقة مرشد جبلي مرخّص، ويتم التحقق من ذلك في إمليل. في بقية مناطق الأطلس ليس الأمر إلزامياً قانونياً، لكن المسارات غير معلّمة والقرى متباعدة، لذا يفضّل معظم الزوار مرافقة مرشد.",
      },
      {
        q: "ما مستوى اللياقة المطلوب لرحلة مشي لعدة أيام؟",
        a: "القدرة على المشي صعوداً لمدة خمس إلى ست ساعات يومياً لعدة أيام متتالية مع حقيبة نهارية خفيفة. هذه رحلات مشي طويلة وليست تسلقاً تقنياً بالحبال، لذا فالقدرة على التحمل أهم من خبرة التسلق.",
      },
      {
        q: "هل أحمل كل أمتعتي بنفسي؟",
        a: "في رحلات المشي لمدة 3 أيام فأكثر، تحمل البغال الأمتعة الرئيسية ومعدات التخييم والطعام بين المحطات، فتحمل حقيبة نهارية فقط. أما في رحلة توبقال السريعة ليومين فلا توجد بغال، ويحمل كل مشارك حقيبة مبيته.",
      },
      {
        q: "ما أفضل موسم للمشي الجبلي في المغرب؟",
        a: "من مايو إلى أكتوبر في الأطلس الكبير عندما تخلو الممرات العالية من الثلوج. يمتد موسم الثلج تقريباً من نوفمبر إلى أبريل ويتطلب كرامبون وفأس جليد (متاحان للإيجار في إمليل). أما الأطلس الصغير فأفضل أوقاته أواخر الشتاء والربيع.",
      },
      {
        q: "أين ننام خلال رحلة مشي متعددة الأيام؟",
        a: "في دور ضيافة قروية أمازيغية (بغرف ذات حمام خاص) ومآوي جبلية حسب المسار، مع ليالي تخييم في المسارات الطويلة مثل بحيرة إفني ومكون. وتوضح كل صفحة رحلة مكان الإقامة لكل ليلة.",
      },
    ],
    desert: [
      {
        q: "هل يمكن زيارة الصحراء الكبرى في رحلة يوم واحد؟",
        a: "ليس الكثبان الرملية الحقيقية. تقع عرق الشبي وعرق شݣاݣة خلف جبال الأطلس، لذلك ننظّم الرحلات إليها في يومين إلى أربعة أيام. أما رحلة اليوم الواحد من مراكش فهي صحراء أكفاي الصخرية، وهي رائعة عند الغروب لكنها ليست الصحراء الكبرى.",
      },
      {
        q: "ما الفرق بين مرزوكة وزاكورة وعرق شݣاݣة؟",
        a: "تقع مرزوكة بجانب كثبان عرق الشبي العالية وتحتاج إلى ثلاثة أيام. زاكورة أقرب ويمكن زيارتها في يومين بكثبان أصغر. أما عرق شݣاݣة فهو الخيار الأكثر عزلة بسيارة دفع رباعي وبمخيمات أقل بكثير.",
      },
      {
        q: "كيف يكون المخيم الصحراوي — وهل يوجد حمام؟",
        a: "تعتمد جولاتنا الخاصة على مخيمات دائمة بأسرّة مريحة وحمام خاص داخل الخيمة. في رحلة مرزوكة الجماعية (3 أيام)، تستخدم الخيام العادية حمامات مشتركة مع بطانيات (مع خيار الترقية لخيمة بحمام خاص وتدفئة)، بينما في رحلة زاكورة الجماعية لكل خيمة حمامها الخاص وتدفئتها.",
      },
      {
        q: "ماذا يجب أن أحزم لرحلة الصحراء؟",
        a: "حقيبة صغيرة لمبيت الليلة في المخيم — بينما تبقى حقائبك الكبيرة في السيارة — مع ملابس دافئة للمساء وغطاء للرأس ونظارات شمسية وواقي شمس، فليالي الصحراء باردة خارج فصل الصيف.",
      },
      {
        q: "هل ركوب الجمل إجباري؟",
        a: "لا. جولة الجمل إلى المخيم قصيرة واختيارية تماماً، ويمكنك المشي بدلاً من ذلك وهو أمر شائع ومعتاد لدى مرشدينا. وتُقطع جميع المسافات الطويلة بالسيارة.",
      },
    ],
    cultural: [
      {
        q: "ماذا تتضمن الجولة الثقافية فعلياً؟",
        a: "استكشاف المدن العتيقة والأسواق والأحياء التاريخية مع مرشد محلي يشرح التاريخ والعمارة والحرف التقليدية. وحسب المسار تشمل الجولة المدن الإمبراطورية وقصر آيت بن حدو وورش الحرفيين والمطبخ المغربي.",
      },
      {
        q: "هل يستحق الأمر وجود مرشد في مراكش أو فاس؟",
        a: "في المدينة العتيقة لفاس خصوصاً، نعم؛ فهي من أكبر المناطق الحضرية الخالية من السيارات في العالم ويسهل التيه فيها في الزيارة الأولى. المرشد هو الفارق بين اكتشاف المدابغ والورش وبين قضاء الوقت في البحث عن المخرج.",
      },
      {
        q: "ماذا يفضّل ارتداؤه عند زيارة المدن العتيقة والمواقع التاريخية؟",
        a: "تغطية الكتفين والركبتين قاعدة عملية ومحترمة للرجال والنساء على حد سواء. والأهم هو ارتداء حذاء مريح لأن أزقة المدن العتيقة غير مستوية وتستلزم المشي لساعات.",
      },
      {
        q: "هل يمكن دمج الجولات الثقافية مع الصحراء أو المشي الجبلي؟",
        a: "نعم، ومعظم برامجنا الأطول تجمع بينها بالفعل. الطريق بين مراكش والصحراء يمرّ بآيت بن حدو والمضايق، ويمكننا أيضاً تصميم مسار مخصص حسب ما ترغب في زيارته.",
      },
    ],
    "day-tours": [
      {
        q: "ما أفضل الرحلات اليومية من مراكش؟",
        a: "وادي أوريكا للجبال والشلالات، وشلالات أوزود، وصحراء أكفاي لعشاء عند الغروب دون قيادة طويلة، ومدينة الصويرة الساحلية. كل واحدة منها رحلة مريحة ليوم كامل.",
      },
      {
        q: "هل الرحلات اليومية خاصة أم جماعية؟",
        a: "نوفر الخيارين معاً. الرحلات الجماعية تخفّض التكلفة ضمن مجموعة صغيرة، بينما تتيح لك الجولات الخاصة اختيار وقت الانطلاق ووتيرة اليوم، وهو الأنسب للعائلات. وتوضح صفحة كل جولة نوعها.",
      },
      {
        q: "متى تنطلق وتنتهي الرحلات اليومية؟",
        a: "تنطلق معظم الرحلات صباحاً باكراً وتعود في أواخر بعد الظهر أو بداية المساء حسب المسافة (ساعة إلى ثلاث ساعات بالسيارة لكل اتجاه). الانطلاق المبكر يجنبك الازدحام في أوزود ووادي الجنة.",
      },
      {
        q: "هل يشمل السعر الاستقبال من الفندق؟",
        a: "نعم، من أماكن الإقامة المركزية في مدينة الانطلاق. وإذا كان رياضك داخل زقاق للمشاة في المدينة العتيقة، نحدد نقطة لقاء قريبة جداً يسهل الوصول إليها.",
      },
    ],
  },
};

export function categoryFaqFor(lang: Locale, categoryId: string): Faq[] {
  return CATEGORY_FAQ_BY_LOCALE[lang]?.[categoryId] ?? CATEGORY_FAQ[categoryId] ?? [];
}
