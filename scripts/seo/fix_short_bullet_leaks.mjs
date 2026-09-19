/**
 * TRANSLATE THE SHORT "INCLUDES / EXCLUDES / HIGHLIGHTS" BULLETS.
 *
 * THE INCIDENT (found 2026-09-19 while investigating low tour-page conversion).
 *
 * 590 bullets across 35 of 48 tours were byte-identical to English in fr/de/
 * it/ar (and 70 in es, which commit c70f204 had partly fixed). They are the
 * "What's included" and "What's not included" lists, which render directly
 * under the price box -- the last thing a buyer reads before deciding.
 *
 * A French reader on /fr/tours/... saw a fully French page whose purchase
 * summary read:
 *
 *     Camel trek at sunset
 *     Lunches / Drinks / Tips / Entry fees
 *
 * WHY NOTHING CAUGHT IT. locale-english-leak.test.ts already guards exactly
 * this failure, but it skips any string under MIN_LEN = 25 characters, because
 * short strings are legitimately identical across languages ("Marrakech",
 * "4x4", "Erg Chebbi"). Every string here is under 25 characters. The
 * threshold that keeps that test usable is the same threshold that hid 590
 * real leaks -- so the test passed, the build passed, and five locales sold
 * tours with an English receipt.
 *
 * WHAT THIS SCRIPT DOES. Replaces each known English bullet with its
 * translation, per locale, matching only exact quoted string literals inside
 * the locale catalogues. Route lines and proper nouns are not in the map and
 * are left alone.
 *
 * Locale files are CRLF and lib/tours.ts is LF; this only ever edits the
 * locale files and preserves whatever EOL each already uses, because it
 * rewrites individual quoted literals rather than whole lines.
 *
 * Usage: node scripts/seo/fix_short_bullet_leaks.mjs [--dry]
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(import.meta.dirname, "..", "..");
const DRY = process.argv.includes("--dry");

/**
 * en -> { fr, es, de, it, ar }
 *
 * Deliberately literal, not marketing copy: these are line items on a receipt.
 * "Certified" is rendered with the term each market actually uses for a
 * licensed guide -- "diplômé" in French, "titulado" in Spanish, "staatlich
 * geprüft" in German, "qualificato" in Italian, "معتمد" in Arabic.
 */
const MAP = {
  "Sunset camel ride": {
    fr: "Balade à dos de chameau au coucher du soleil",
    es: "Paseo en camello al atardecer",
    de: "Kamelritt bei Sonnenuntergang",
    it: "Giro in cammello al tramonto",
    ar: "جولة على الجمال عند الغروب",
  },
  "Sunset camel trek": {
    fr: "Randonnée à dos de chameau au coucher du soleil",
    es: "Excursión en camello al atardecer",
    de: "Kameltrekking bei Sonnenuntergang",
    it: "Escursione in cammello al tramonto",
    ar: "رحلة على الجمال عند الغروب",
  },
  "Camel trek at sunset": {
    fr: "Randonnée à dos de chameau au coucher du soleil",
    es: "Excursión en camello al atardecer",
    de: "Kameltrekking bei Sonnenuntergang",
    it: "Escursione in cammello al tramonto",
    ar: "رحلة على الجمال عند الغروب",
  },
  "Camel ride": {
    fr: "Balade à dos de chameau",
    es: "Paseo en camello",
    de: "Kamelritt",
    it: "Giro in cammello",
    ar: "جولة على الجمال",
  },
  "All camel rides": {
    fr: "Toutes les balades à dos de chameau",
    es: "Todos los paseos en camello",
    de: "Alle Kamelritte",
    it: "Tutti i giri in cammello",
    ar: "جميع جولات الجمال",
  },
  "All camel treks": {
    fr: "Toutes les randonnées à dos de chameau",
    es: "Todas las excursiones en camello",
    de: "Alle Kameltrekkings",
    it: "Tutte le escursioni in cammello",
    ar: "جميع رحلات الجمال",
  },
  "Experienced desert guide": {
    fr: "Guide du désert expérimenté",
    es: "Guía del desierto con experiencia",
    de: "Erfahrener Wüstenführer",
    it: "Guida del deserto esperta",
    ar: "مرشد صحراوي ذو خبرة",
  },
  "Certified hiking guide": {
    fr: "Guide de randonnée diplômé",
    es: "Guía de senderismo titulado",
    de: "Staatlich geprüfter Wanderführer",
    it: "Guida escursionistica qualificata",
    ar: "مرشد جبلي معتمد",
  },
  "Certified guide": {
    fr: "Guide diplômé",
    es: "Guía titulado",
    de: "Staatlich geprüfter Guide",
    it: "Guida qualificata",
    ar: "مرشد معتمد",
  },
  "Certified local guide": {
    fr: "Guide local diplômé",
    es: "Guía local titulado",
    de: "Staatlich geprüfter lokaler Guide",
    it: "Guida locale qualificata",
    ar: "مرشد محلي معتمد",
  },
  "Certified mountain guide": {
    fr: "Guide de montagne diplômé",
    es: "Guía de montaña titulado",
    de: "Staatlich geprüfter Bergführer",
    it: "Guida alpina qualificata",
    ar: "مرشد جبال معتمد",
  },
  "Certified ISA instructor": {
    fr: "Moniteur certifié ISA",
    es: "Instructor certificado ISA",
    de: "ISA-zertifizierter Surflehrer",
    it: "Istruttore certificato ISA",
    ar: "مدرّب معتمد من ISA",
  },
  "Expert naturalist guide": {
    fr: "Guide naturaliste expert",
    es: "Guía naturalista experto",
    de: "Fachkundiger Naturführer",
    it: "Guida naturalistica esperta",
    ar: "مرشد طبيعي خبير",
  },
  "Local expert guide": {
    fr: "Guide local expert",
    es: "Guía local experto",
    de: "Ortskundiger Guide",
    it: "Guida locale esperta",
    ar: "مرشد محلي خبير",
  },
  "English-speaking guide": {
    fr: "Guide anglophone",
    es: "Guía de habla inglesa",
    de: "Englischsprachiger Guide",
    it: "Guida di lingua inglese",
    ar: "مرشد يتحدث الإنجليزية",
  },
  "Local guide at the falls": {
    fr: "Guide local aux cascades",
    es: "Guía local en las cascadas",
    de: "Lokaler Guide an den Wasserfällen",
    it: "Guida locale alle cascate",
    ar: "مرشد محلي عند الشلالات",
  },
  "Guide inside the medina": {
    fr: "Guide dans la médina",
    es: "Guía dentro de la medina",
    de: "Guide in der Medina",
    it: "Guida all'interno della medina",
    ar: "مرشد داخل المدينة القديمة",
  },
  "Traditional Berber lunch": {
    fr: "Déjeuner berbère traditionnel",
    es: "Almuerzo bereber tradicional",
    de: "Traditionelles Berber-Mittagessen",
    it: "Pranzo berbero tradizionale",
    ar: "غداء أمازيغي تقليدي",
  },
  "Mineral water throughout": {
    fr: "Eau minérale tout au long du circuit",
    es: "Agua mineral durante todo el recorrido",
    de: "Mineralwasser während der gesamten Tour",
    it: "Acqua minerale per tutta la durata",
    ar: "مياه معدنية طوال الرحلة",
  },
  "Mineral water and tea": {
    fr: "Eau minérale et thé",
    es: "Agua mineral y té",
    de: "Mineralwasser und Tee",
    it: "Acqua minerale e tè",
    ar: "مياه معدنية وشاي",
  },
  "Mineral water": {
    fr: "Eau minérale",
    es: "Agua mineral",
    de: "Mineralwasser",
    it: "Acqua minerale",
    ar: "مياه معدنية",
  },
  "Boat ride at the falls": {
    fr: "Tour en barque au pied des cascades",
    es: "Paseo en barca en las cascadas",
    de: "Bootsfahrt an den Wasserfällen",
    it: "Giro in barca alle cascate",
    ar: "جولة بالقارب عند الشلالات",
  },
  "Boat ride ticket": {
    fr: "Billet pour le tour en barque",
    es: "Entrada para el paseo en barca",
    de: "Ticket für die Bootsfahrt",
    it: "Biglietto per il giro in barca",
    ar: "تذكرة جولة القارب",
  },
  "1-hour quad biking": {
    fr: "1 heure de quad",
    es: "1 hora de quad",
    de: "1 Stunde Quadfahren",
    it: "1 ora di quad",
    ar: "ساعة من قيادة الدراجات الرباعية",
  },
  "Mint tea ceremony": {
    fr: "Cérémonie du thé à la menthe",
    es: "Ceremonia del té a la menta",
    de: "Minztee-Zeremonie",
    it: "Cerimonia del tè alla menta",
    ar: "مراسم الشاي بالنعناع",
  },
  "Mint tea in a riad": {
    fr: "Thé à la menthe dans un riad",
    es: "Té a la menta en un riad",
    de: "Minztee in einem Riad",
    it: "Tè alla menta in un riad",
    ar: "شاي بالنعناع في رياض",
  },
  "Breakfast daily": {
    fr: "Petit-déjeuner chaque jour",
    es: "Desayuno diario",
    de: "Täglich Frühstück",
    it: "Colazione ogni giorno",
    ar: "فطور يومي",
  },
  "All transfers and tolls": {
    fr: "Tous les transferts et péages",
    es: "Todos los traslados y peajes",
    de: "Alle Transfers und Mautgebühren",
    it: "Tutti i trasferimenti e i pedaggi",
    ar: "جميع التنقلات ورسوم الطرق",
  },
  "All meals throughout": {
    fr: "Tous les repas du circuit",
    es: "Todas las comidas del circuito",
    de: "Alle Mahlzeiten während der Tour",
    it: "Tutti i pasti del tour",
    ar: "جميع الوجبات طوال الرحلة",
  },
  "All meals": {
    fr: "Tous les repas",
    es: "Todas las comidas",
    de: "Alle Mahlzeiten",
    it: "Tutti i pasti",
    ar: "جميع الوجبات",
  },
  "Mule team for equipment": {
    fr: "Mules pour le portage du matériel",
    es: "Mulas para el transporte del equipaje",
    de: "Maultiere für den Gepäcktransport",
    it: "Muli per il trasporto dell'attrezzatura",
    ar: "بغال لنقل المعدات",
  },
  "Mule for equipment": {
    fr: "Mule pour le portage du matériel",
    es: "Mula para el transporte del equipaje",
    de: "Maultier für den Gepäcktransport",
    it: "Mulo per il trasporto dell'attrezzatura",
    ar: "بغل لنقل المعدات",
  },
  "National park fees": {
    fr: "Droits d'entrée du parc national",
    es: "Tasas del parque nacional",
    de: "Nationalpark-Gebühren",
    it: "Tasse del parco nazionale",
    ar: "رسوم المنتزه الوطني",
  },
  "Binoculars provided": {
    fr: "Jumelles fournies",
    es: "Prismáticos incluidos",
    de: "Ferngläser werden gestellt",
    it: "Binocolo fornito",
    ar: "مناظير مقدَّمة",
  },
  "Picnic lunch": {
    fr: "Déjeuner pique-nique",
    es: "Almuerzo picnic",
    de: "Picknick-Mittagessen",
    it: "Pranzo al sacco",
    ar: "غداء نزهة",
  },
  "Rampart walk": {
    fr: "Promenade sur les remparts",
    es: "Paseo por las murallas",
    de: "Spaziergang auf der Stadtmauer",
    it: "Passeggiata sui bastioni",
    ar: "تجوّل على الأسوار",
  },
  "2-hour surf lesson": {
    fr: "Cours de surf de 2 heures",
    es: "Clase de surf de 2 horas",
    de: "2-stündige Surfstunde",
    it: "Lezione di surf di 2 ore",
    ar: "درس ركمجة لمدة ساعتين",
  },
  "4x4 transport throughout": {
    fr: "Transport en 4x4 sur tout le circuit",
    es: "Transporte en 4x4 durante todo el recorrido",
    de: "4x4-Transport während der gesamten Tour",
    it: "Trasporto in 4x4 per tutto il tour",
    ar: "التنقّل بسيارة دفع رباعي طوال الرحلة",
  },
  "Lunch on day 1": {
    fr: "Déjeuner le jour 1",
    es: "Almuerzo el día 1",
    de: "Mittagessen an Tag 1",
    it: "Pranzo il giorno 1",
    ar: "الغداء في اليوم الأول",
  },
  "Lunches on both days": {
    fr: "Déjeuners les deux jours",
    es: "Almuerzos ambos días",
    de: "Mittagessen an beiden Tagen",
    it: "Pranzi in entrambi i giorni",
    ar: "الغداء في كلا اليومين",
  },
  "Lunches on days 1 and 3": {
    fr: "Déjeuners les jours 1 et 3",
    es: "Almuerzos los días 1 y 3",
    de: "Mittagessen an Tag 1 und 3",
    it: "Pranzi nei giorni 1 e 3",
    ar: "الغداء في اليومين الأول والثالث",
  },
  "Honey tasting": {
    fr: "Dégustation de miel",
    es: "Degustación de miel",
    de: "Honigverkostung",
    it: "Degustazione di miele",
    ar: "تذوّق العسل",
  },
  "Three-course dinner": {
    fr: "Dîner trois plats",
    es: "Cena de tres platos",
    de: "Drei-Gänge-Abendessen",
    it: "Cena di tre portate",
    ar: "عشاء من ثلاثة أطباق",
  },
  "Dinner and breakfast": {
    fr: "Dîner et petit-déjeuner",
    es: "Cena y desayuno",
    de: "Abendessen und Frühstück",
    it: "Cena e colazione",
    ar: "العشاء والفطور",
  },
  "Live music and fire show": {
    fr: "Musique live et spectacle de feu",
    es: "Música en vivo y espectáculo de fuego",
    de: "Live-Musik und Feuershow",
    it: "Musica dal vivo e spettacolo del fuoco",
    ar: "موسيقى حيّة وعرض النار",
  },
  "Free time in the medina": {
    fr: "Temps libre dans la médina",
    es: "Tiempo libre en la medina",
    de: "Freizeit in der Medina",
    it: "Tempo libero nella medina",
    ar: "وقت حر في المدينة القديمة",
  },
  "Dades and Todra gorges": {
    fr: "Gorges du Dadès et du Todra",
    es: "Gargantas del Dades y del Todra",
    de: "Dades- und Todra-Schlucht",
    it: "Gole del Dades e del Todra",
    ar: "مضيقا دادس وتودغا",
  },
  "Draa Valley palm groves": {
    fr: "Palmeraies de la vallée du Draa",
    es: "Palmerales del valle del Draa",
    de: "Palmenhaine des Draa-Tals",
    it: "Palmeti della valle del Draa",
    ar: "واحات نخيل وادي درعة",
  },
  "Personal items and tips": {
    fr: "Dépenses personnelles et pourboires",
    es: "Gastos personales y propinas",
    de: "Persönliche Ausgaben und Trinkgelder",
    it: "Spese personali e mance",
    ar: "المصاريف الشخصية والإكراميات",
  },
  "Personal hiking gear": {
    fr: "Équipement de randonnée personnel",
    es: "Equipo de senderismo personal",
    de: "Persönliche Wanderausrüstung",
    it: "Attrezzatura da trekking personale",
    ar: "معدات المشي الشخصية",
  },
  "Personal swimming gear": {
    fr: "Affaires de bain personnelles",
    es: "Equipo de baño personal",
    de: "Persönliche Badesachen",
    it: "Attrezzatura da bagno personale",
    ar: "مستلزمات السباحة الشخصية",
  },
  "Personal purchases": {
    fr: "Achats personnels",
    es: "Compras personales",
    de: "Persönliche Einkäufe",
    it: "Acquisti personali",
    ar: "المشتريات الشخصية",
  },
  "Argan product purchases": {
    fr: "Achats de produits à l'argan",
    es: "Compras de productos de argán",
    de: "Käufe von Arganprodukten",
    it: "Acquisti di prodotti all'argan",
    ar: "شراء منتجات الأركان",
  },
  "Shopping and souvenirs": {
    fr: "Achats et souvenirs",
    es: "Compras y recuerdos",
    de: "Einkäufe und Souvenirs",
    it: "Acquisti e souvenir",
    ar: "التسوّق والهدايا التذكارية",
  },
  "Shopping": {
    fr: "Achats",
    es: "Compras",
    de: "Einkäufe",
    it: "Acquisti",
    ar: "التسوّق",
  },
  "Alcoholic beverages": {
    fr: "Boissons alcoolisées",
    es: "Bebidas alcohólicas",
    de: "Alkoholische Getränke",
    it: "Bevande alcoliche",
    ar: "المشروبات الكحولية",
  },
  "Alcoholic drinks": {
    fr: "Boissons alcoolisées",
    es: "Bebidas alcohólicas",
    de: "Alkoholische Getränke",
    it: "Bevande alcoliche",
    ar: "المشروبات الكحولية",
  },
  "Travel insurance": {
    fr: "Assurance voyage",
    es: "Seguro de viaje",
    de: "Reiseversicherung",
    it: "Assicurazione di viaggio",
    ar: "تأمين السفر",
  },
  "International flights": {
    fr: "Vols internationaux",
    es: "Vuelos internacionales",
    de: "Internationale Flüge",
    it: "Voli internazionali",
    ar: "الرحلات الجوية الدولية",
  },
  "Lunches and dinners": {
    fr: "Déjeuners et dîners",
    es: "Almuerzos y cenas",
    de: "Mittag- und Abendessen",
    it: "Pranzi e cene",
    ar: "وجبات الغداء والعشاء",
  },
  "Lunches": {
    fr: "Déjeuners",
    es: "Almuerzos",
    de: "Mittagessen",
    it: "Pranzi",
    ar: "وجبات الغداء",
  },
  "Lunch": {
    fr: "Déjeuner",
    es: "Almuerzo",
    de: "Mittagessen",
    it: "Pranzo",
    ar: "الغداء",
  },
  "Drinks": {
    fr: "Boissons",
    es: "Bebidas",
    de: "Getränke",
    it: "Bevande",
    ar: "المشروبات",
  },
  "Tips": {
    fr: "Pourboires",
    es: "Propinas",
    de: "Trinkgelder",
    it: "Mance",
    ar: "الإكراميات",
  },
  "Entry fees": {
    fr: "Droits d'entrée",
    es: "Entradas",
    de: "Eintrittsgelder",
    it: "Biglietti d'ingresso",
    ar: "رسوم الدخول",
  },
};

/** Longest first, so "Lunches on both days" is never eaten by "Lunches". */
const KEYS = Object.keys(MAP).sort((a, b) => b.length - a.length);

const LOCALES = ["fr", "es", "de", "it", "ar"];
let grand = 0;

for (const lang of LOCALES) {
  const file = join(ROOT, "lib", `tours.${lang}.ts`);
  let src = readFileSync(file, "utf8");
  let n = 0;

  for (const en of KEYS) {
    const to = MAP[en][lang];
    if (!to) continue;
    // Only an exact, whole quoted literal -- never a substring of prose.
    const needle = `"${en}"`;
    let at = 0;
    while ((at = src.indexOf(needle, at)) !== -1) {
      src = src.slice(0, at) + `"${to}"` + src.slice(at + needle.length);
      at += to.length + 2;
      n++;
    }
  }

  grand += n;
  console.log(`${lang}: ${n} bullets translated`);
  if (!DRY) writeFileSync(file, src, "utf8");
}

console.log(`\n${grand} total${DRY ? " (dry run, nothing written)" : ""}`);
