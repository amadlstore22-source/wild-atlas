import type { Locale } from "@/app/[lang]/dictionaries";
import type { Category, Tour } from "./tours";

/**
 * Search title, heading and description for the four category pages.
 *
 * WHY THIS EXISTS (2026-10-20). The category pages used the bare label as
 * their title and h1: "Desert Tours | Marrakech Eco Tours", "Wüstentouren",
 * "Circuits Désert". The owner searched Google for "sahara desert tours from
 * marrakech" and found nothing from MET in three pages, while the operators
 * who rank put the whole phrase in both places ("Marrakech Desert Tours —
 * Guided Sahara Journeys Since 2008"). Search Console agreed: over 90 days
 * /en/categories/desert had no impressions at all for any desert-tour query.
 * A label says what the section is called; a search title has to say what
 * someone types.
 *
 * Arabic leaves out {count} and the day range: the noun after a number
 * changes form with the number (3-10 take the plural, 11+ the singular), so a
 * filled-in count would read wrongly the day it moved across that line.
 *
 * Numbers are never written here. `{count}`, `{from}`, `{minDays}` and
 * `{maxDays}` are filled from the category's live tours, so a price change
 * or a new tour cannot leave a stale figure in the search snippet (the blog
 * prices drifted exactly that way, see blog-price-rot.test.ts).
 *
 * Title budget: the layout appends " | Marrakech Eco Tours" (22 chars) and
 * seo-meta-length.test.ts allows 65 in total, so each title is at most 43.
 */
type Seo = { title: string; heading: string; description: string };

const SEO: Record<Locale, Partial<Record<Category, Seo>>> = {
  en: {
    desert: {
      title: "Sahara Desert Tours from Marrakech & Agadir",
      heading: "Sahara Desert Tours from Marrakech & Agadir",
      description: "{count} Sahara tours from Marrakech and Agadir to Merzouga, Zagora and Erg Chegaga: camel treks, desert camps, {minDays} to {maxDays} days, private or shared. From €{from} pp.",
    },
    trekking: {
      title: "Toubkal & High Atlas Treks from Marrakech",
      heading: "Toubkal & High Atlas Treks from Marrakech",
      description: "{count} guided treks: the Toubkal summit, M'Goun, Berber villages and the Anti-Atlas, {minDays} to {maxDays} days, with licensed mountain guides. From €{from} pp.",
    },
    "day-tours": {
      title: "Day Trips from Marrakech & Agadir",
      heading: "Day Trips from Marrakech & Agadir",
      description: "{count} day trips from Marrakech and Agadir: Ouzoud and Immouzer waterfalls, Ourika and Paradise valleys, Agafay, Essaouira and more. Back the same day. From €{from} pp.",
    },
    cultural: {
      title: "Imperial Cities & Cultural Tours of Morocco",
      heading: "Imperial Cities & Cultural Tours of Morocco",
      description: "{count} cultural tours: Fes, Meknes, Rabat and Chefchaouen from Marrakech, Agadir or Casablanca, plus medina walks and Taroudant. From €{from} pp.",
    },
  },
  fr: {
    desert: {
      title: "Circuits Sahara depuis Marrakech & Agadir",
      heading: "Circuits dans le Sahara depuis Marrakech et Agadir",
      description: "{count} circuits dans le Sahara depuis Marrakech et Agadir : Merzouga, Zagora et Erg Chegaga, balade à dos de chameau et bivouac, de {minDays} à {maxDays} jours. Dès {from} €.",
    },
    trekking: {
      title: "Treks Toubkal & Haut Atlas depuis Marrakech",
      heading: "Treks Toubkal et Haut Atlas depuis Marrakech",
      description: "{count} treks guidés : ascension du Toubkal, M'Goun, villages berbères et Anti-Atlas, de {minDays} à {maxDays} jours, avec des guides de montagne agréés. Dès {from} €.",
    },
    "day-tours": {
      title: "Excursions d'une journée depuis Marrakech",
      heading: "Excursions d'une journée depuis Marrakech et Agadir",
      description: "{count} excursions d'une journée depuis Marrakech et Agadir : cascades d'Ouzoud et d'Immouzer, vallées de l'Ourika et du Paradis, Agafay, Essaouira. Dès {from} €.",
    },
    cultural: {
      title: "Villes impériales et circuits culturels",
      heading: "Villes impériales et circuits culturels au Maroc",
      description: "{count} circuits culturels : Fès, Meknès, Rabat et Chefchaouen depuis Marrakech, Agadir ou Casablanca, visites de médina et Taroudant. Dès {from} €.",
    },
  },
  es: {
    desert: {
      title: "Excursiones al desierto desde Marrakech",
      heading: "Excursiones al desierto del Sáhara desde Marrakech y Agadir",
      description: "{count} tours por el Sáhara desde Marrakech y Agadir: Merzouga, Zagora y Erg Chegaga, camello y campamento, de {minDays} a {maxDays} días, privados o compartidos. Desde {from} €.",
    },
    trekking: {
      title: "Trekking al Toubkal y el Alto Atlas",
      heading: "Trekking al Toubkal y el Alto Atlas desde Marrakech",
      description: "{count} treks guiados: cumbre del Toubkal, M'Goun, pueblos bereberes y el Antiatlas, de {minDays} a {maxDays} días, con guías de montaña con licencia. Desde {from} €.",
    },
    "day-tours": {
      title: "Excursiones de un día desde Marrakech",
      heading: "Excursiones de un día desde Marrakech y Agadir",
      description: "{count} excursiones de un día desde Marrakech y Agadir: cascadas de Ouzoud e Immouzer, valles de Ourika y del Paraíso, Agafay, Esauira y más. Desde {from} €.",
    },
    cultural: {
      title: "Ciudades imperiales y tours culturales",
      heading: "Ciudades imperiales y tours culturales por Marruecos",
      description: "{count} tours culturales: Fez, Mequinez, Rabat y Chefchaouen desde Marrakech, Agadir o Casablanca, visitas a la medina y Tarudant. Desde {from} €.",
    },
  },
  de: {
    desert: {
      title: "Wüstentouren ab Marrakesch & Agadir",
      heading: "Sahara-Wüstentouren ab Marrakesch und Agadir",
      description: "{count} Sahara-Touren ab Marrakesch und Agadir nach Merzouga, Zagora und Erg Chegaga: Kamelritt und Wüstencamp, {minDays} bis {maxDays} Tage, privat oder in der Gruppe. Ab {from} €.",
    },
    trekking: {
      title: "Toubkal- & Atlas-Trekking ab Marrakesch",
      heading: "Toubkal- und Atlas-Trekking ab Marrakesch",
      description: "{count} geführte Trekkingtouren: Toubkal-Gipfel, M'Goun, Berberdörfer und Antiatlas, {minDays} bis {maxDays} Tage, mit lizenzierten Bergführern. Ab {from} €.",
    },
    "day-tours": {
      title: "Tagesausflüge ab Marrakesch & Agadir",
      heading: "Tagesausflüge ab Marrakesch und Agadir",
      description: "{count} Tagesausflüge ab Marrakesch und Agadir: Ouzoud- und Immouzer-Wasserfälle, Ourika- und Paradiestal, Agafay, Essaouira und mehr. Ab {from} €.",
    },
    cultural: {
      title: "Königsstädte & Kulturreisen in Marokko",
      heading: "Königsstädte und Kulturreisen in Marokko",
      description: "{count} Kulturtouren: Fès, Meknès, Rabat und Chefchaouen ab Marrakesch, Agadir oder Casablanca, dazu Medina-Führungen und Taroudant. Ab {from} €.",
    },
  },
  it: {
    desert: {
      title: "Tour nel deserto da Marrakech e Agadir",
      heading: "Tour nel deserto del Sahara da Marrakech e Agadir",
      description: "{count} tour nel Sahara da Marrakech e Agadir: Merzouga, Zagora ed Erg Chegaga, giro in cammello e campo tendato, da {minDays} a {maxDays} giorni, privati o condivisi. Da {from} €.",
    },
    trekking: {
      title: "Trekking Toubkal e Alto Atlas da Marrakech",
      heading: "Trekking sul Toubkal e nell'Alto Atlas da Marrakech",
      description: "{count} trekking guidati: vetta del Toubkal, M'Goun, villaggi berberi e Anti-Atlante, da {minDays} a {maxDays} giorni, con guide di montagna autorizzate. Da {from} €.",
    },
    "day-tours": {
      title: "Escursioni di un giorno da Marrakech",
      heading: "Escursioni di un giorno da Marrakech e Agadir",
      description: "{count} escursioni di un giorno da Marrakech e Agadir: cascate di Ouzoud e Immouzer, valli dell'Ourika e del Paradiso, Agafay, Essaouira e altro. Da {from} €.",
    },
    cultural: {
      title: "Città imperiali e tour culturali",
      heading: "Città imperiali e tour culturali in Marocco",
      description: "{count} tour culturali: Fès, Meknès, Rabat e Chefchaouen da Marrakech, Agadir o Casablanca, visite della medina e Taroudant. Da {from} €.",
    },
  },
  ar: {
    desert: {
      title: "رحلات الصحراء من مراكش وأݣادير",
      heading: "رحلات الصحراء الكبرى من مراكش وأݣادير",
      description: "رحلات إلى الصحراء من مراكش وأݣادير: مرزوكة وزاكورة وعرق شݣاݣة، ركوب الجمال والمبيت في مخيم صحراوي، رحلات خاصة أو جماعية. ابتداءً من €{from}.",
    },
    trekking: {
      title: "رحلات المشي في توبقال والأطلس الكبير",
      heading: "رحلات المشي في توبقال والأطلس الكبير من مراكش",
      description: "رحلات مشي مع مرشد: قمة توبقال، مكون، القرى الأمازيغية والأطلس الصغير، مع مرشدين جبليين مرخصين. ابتداءً من €{from}.",
    },
    "day-tours": {
      title: "رحلات يومية من مراكش وأݣادير",
      heading: "رحلات يومية من مراكش وأݣادير",
      description: "رحلات يومية من مراكش وأݣادير: شلالات أوزود وإموزار، وادي أوريكا ووادي الجنة، أكفاي، الصويرة وغيرها. العودة في اليوم نفسه. ابتداءً من €{from}.",
    },
    cultural: {
      title: "المدن الإمبراطورية والجولات الثقافية",
      heading: "المدن الإمبراطورية والجولات الثقافية في المغرب",
      description: "جولات ثقافية: فاس ومكناس والرباط وشفشاون انطلاقًا من مراكش أو أݣادير أو الدار البيضاء، مع جولات في المدينة العتيقة وتارودانت. ابتداءً من €{from}.",
    },
  },
};

/** Lowest per-person price a tour is sold at (its largest-group tier). */
const lowest = (t: Tour) => Math.min(...(t.groupPricing ?? [{ minPeople: 1, price: t.price }]).map((g) => g.price));
/** Leading day count of "3 days / 2 nights"; half-day and evening tours count as 1. */
const days = (t: Tour) => Number((t.duration.match(/\d+/) ?? ["1"])[0]);

export function categorySeoFor(lang: Locale, id: Category, tours: Tour[]): Seo | null {
  const seo = SEO[lang]?.[id] ?? SEO.en[id];
  if (!seo || tours.length === 0) return null;
  const d = tours.map(days);
  const fill = (s: string) =>
    s
      .replace("{count}", String(tours.length))
      .replace("{from}", String(Math.min(...tours.map(lowest))))
      .replace("{minDays}", String(Math.min(...d)))
      .replace("{maxDays}", String(Math.max(...d)));
  return { title: fill(seo.title), heading: fill(seo.heading), description: fill(seo.description) };
}
