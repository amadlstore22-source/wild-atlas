import { NextRequest, NextResponse } from "next/server";

/* Localised blog URL segments, English slug -> locale segment.
 *
 * Must stay in sync with `localizedSlug` in lib/blog.<locale>.part*.ts —
 * __tests__/lib/blog.test.ts asserts they match, because a drift here would
 * 301 a live URL into a 404.
 *
 * Arabic is deliberately absent: Arabic-script URLs are percent-encoded to
 * unreadable byte strings when shared, which loses the readability that is the
 * only real benefit of localising the slug in the first place. */
const BLOG_SLUGS_FR: Record<string, string> = {
  "altitude-sickness-toubkal-guide": "mal-aigu-des-montagnes-toubkal",
  "morocco-camel-trek-sahara-guide": "trek-dromadaire-sahara-maroc",
  "toubkal-2-day-trek-cost": "prix-trek-toubkal-2-jours",
  "toubkal-4-day-trek-cost": "prix-trek-toubkal-4-jours",
  "toubkal-circuit-ifni-lake-cost": "prix-circuit-toubkal-lac-ifni",
  "toubkal-guide-cost": "prix-guide-toubkal",
  "marrakech-to-chefchaouen-tour-cost": "prix-circuit-marrakech-chefchaouen",
  "3-day-sahara-tour-cost-marrakech": "prix-circuit-sahara-3-jours-marrakech",
  "sahara-tour-from-agadir-cost": "prix-circuit-sahara-agadir",
  "family-desert-tour-morocco-cost": "prix-circuit-desert-famille-maroc",
  "toubkal-three-peaks-trek-cost": "prix-trek-trois-sommets-toubkal",
  "mgoun-massif-trek-cost": "prix-trek-massif-mgoun",
  "high-atlas-grand-traverse-cost": "prix-grande-traversee-haut-atlas",
  "toubkal-sahara-5day-cost": "prix-toubkal-sahara-5-jours",
  "high-atlas-village-trek-cost": "prix-trek-villages-haut-atlas",
  "morocco-tour-price-group-size": "prix-circuit-maroc-taille-groupe",
  "private-vs-shared-desert-tour-morocco": "circuit-desert-prive-ou-partage",
  "booking-morocco-tour-direct-vs-platform": "reserver-circuit-maroc-direct-ou-plateforme",
};

const BLOG_SLUGS_ES: Record<string, string> = {
  "morocco-camel-trek-sahara-guide": "trekking-camello-sahara-marruecos",
  "toubkal-2-day-trek-cost": "precio-trek-toubkal-2-dias",
  "toubkal-4-day-trek-cost": "precio-trek-toubkal-4-dias",
  "toubkal-circuit-ifni-lake-cost": "precio-circuito-toubkal-lago-ifni",
  "toubkal-guide-cost": "precio-guia-toubkal",
  "marrakech-to-chefchaouen-tour-cost": "precio-tour-marrakech-chefchaouen",
  "3-day-sahara-tour-cost-marrakech": "precio-tour-sahara-3-dias-marrakech",
  "sahara-tour-from-agadir-cost": "precio-tour-sahara-agadir",
  "family-desert-tour-morocco-cost": "precio-tour-desierto-familia-marruecos",
  "toubkal-three-peaks-trek-cost": "precio-trek-tres-cumbres-toubkal",
  "mgoun-massif-trek-cost": "precio-trek-macizo-mgoun",
  "high-atlas-grand-traverse-cost": "precio-gran-travesia-alto-atlas",
  "toubkal-sahara-5day-cost": "precio-toubkal-sahara-5-dias",
  "high-atlas-village-trek-cost": "precio-trek-pueblos-alto-atlas",
  "morocco-tour-price-group-size": "precio-circuito-marruecos-tamano-grupo",
  "private-vs-shared-desert-tour-morocco": "circuito-desierto-privado-o-compartido",
  "booking-morocco-tour-direct-vs-platform": "reservar-circuito-marruecos-directo-o-plataforma",
};

const BLOG_SLUGS_DE: Record<string, string> = {
  "morocco-camel-trek-sahara-guide": "kameltrekking-sahara-marokko",
  "toubkal-2-day-trek-cost": "toubkal-trek-2-tage-kosten",
  "toubkal-4-day-trek-cost": "toubkal-trek-4-tage-kosten",
  "toubkal-circuit-ifni-lake-cost": "toubkal-runde-ifni-see-kosten",
  "toubkal-guide-cost": "toubkal-bergfuehrer-kosten",
  "marrakech-to-chefchaouen-tour-cost": "marrakesch-chefchaouen-tour-kosten",
  "3-day-sahara-tour-cost-marrakech": "sahara-tour-3-tage-marrakesch-kosten",
  "sahara-tour-from-agadir-cost": "sahara-tour-agadir-kosten",
  "family-desert-tour-morocco-cost": "familien-wuestentour-marokko-kosten",
  "toubkal-three-peaks-trek-cost": "toubkal-drei-gipfel-trek-kosten",
  "mgoun-massif-trek-cost": "mgoun-massiv-trek-kosten",
  "high-atlas-grand-traverse-cost": "hoher-atlas-grand-traverse-kosten",
  "toubkal-sahara-5day-cost": "toubkal-sahara-5-tage-kosten",
  "high-atlas-village-trek-cost": "hoher-atlas-dorftrek-kosten",
  "morocco-tour-price-group-size": "marokko-tour-preis-gruppengroesse",
  "private-vs-shared-desert-tour-morocco": "wuestentour-privat-oder-geteilt",
  "booking-morocco-tour-direct-vs-platform": "marokko-tour-direkt-oder-plattform-buchen",
};

const BLOG_SLUGS_IT: Record<string, string> = {
  "morocco-camel-trek-sahara-guide": "trekking-cammello-sahara-marocco",
  "toubkal-2-day-trek-cost": "prezzo-trek-toubkal-2-giorni",
  "toubkal-4-day-trek-cost": "prezzo-trek-toubkal-4-giorni",
  "toubkal-circuit-ifni-lake-cost": "prezzo-circuito-toubkal-lago-ifni",
  "toubkal-guide-cost": "prezzo-guida-toubkal",
  "marrakech-to-chefchaouen-tour-cost": "prezzo-tour-marrakech-chefchaouen",
  "3-day-sahara-tour-cost-marrakech": "prezzo-tour-sahara-3-giorni-marrakech",
  "sahara-tour-from-agadir-cost": "prezzo-tour-sahara-agadir",
  "family-desert-tour-morocco-cost": "prezzo-tour-deserto-famiglia-marocco",
  "toubkal-three-peaks-trek-cost": "prezzo-trek-tre-cime-toubkal",
  "mgoun-massif-trek-cost": "prezzo-trek-massiccio-mgoun",
  "high-atlas-grand-traverse-cost": "prezzo-grande-traversata-alto-atlante",
  "toubkal-sahara-5day-cost": "prezzo-toubkal-sahara-5-giorni",
  "high-atlas-village-trek-cost": "prezzo-trek-villaggi-alto-atlante",
  "morocco-tour-price-group-size": "prezzo-tour-marocco-dimensione-gruppo",
  "private-vs-shared-desert-tour-morocco": "tour-deserto-privato-o-condiviso",
  "booking-morocco-tour-direct-vs-platform": "prenotare-tour-marocco-diretto-o-piattaforma",
};

/* Localised tour URL segments, English slug -> locale segment.
 * Same contract as the blog maps above: must stay in sync with
 * `localizedSlug` in lib/tours.<locale>.ts, which a test asserts. */
const TOUR_SLUGS_FR: Record<string, string> = {
  "shared-merzouga-3day-marrakech": "desert-merzouga-3-jours-partage",
  "shared-zagora-2day-marrakech": "desert-zagora-2-jours-partage",
  "shared-ouzoud-waterfalls-day-trip": "excursion-partagee-cascades-ouzoud",
  "shared-agafay-dinner-camel-ride": "agafay-diner-dromadaire-spectacle-feu",
  "shared-essaouira-day-trip": "excursion-partagee-essaouira",
  "toubkal-summit-trek-4day": "trek-sommet-toubkal-4-jours",
  "sahara-3day-marrakech": "circuit-desert-3-jours-marrakech",
  "ourika-valley-day-hike": "randonnee-vallee-ourika-journee",
  "ouzoud-waterfalls-day-trip": "excursion-cascades-ouzoud",
  "agafay-desert-sunset": "coucher-soleil-desert-agafay",
  "marrakech-medina-cultural-tour": "visite-culturelle-medina-marrakech",
  "marrakech-to-fes-3day": "marrakech-fes-3-jours",
  "mgoun-massif-trek": "trek-massif-mgoun-7-jours",
  "paradise-valley-agadir": "paradise-valley-agadir-journee",
  "sous-massa-national-park": "parc-national-souss-massa",
  "taroudant-day-trip-agadir": "excursion-taroudant-agadir",
  "agadir-surf-lesson": "cours-surf-agadir",
  "anti-atlas-trekking-agadir": "trek-anti-atlas-agadir",
  "sahara-2day-agadir": "circuit-desert-2-jours-agadir",
  "souss-valley-cultural-tour": "circuit-culturel-vallee-souss",
  "agadir-to-essaouira-day-trip": "excursion-essaouira-agadir",
  "marrakech-to-chefchaouen-4day": "marrakech-chefchaouen-4-jours",
  "marrakech-imperial-cities-5day": "villes-imperiales-marrakech-5-jours",
  "zagora-2day-marrakech": "circuit-zagora-2-jours-marrakech",
  "erg-chegaga-3day-marrakech": "erg-chegaga-3-jours-marrakech",
  "desert-4day-marrakech": "circuit-desert-4-jours-marrakech",
  "merzouga-3day-agadir": "merzouga-3-jours-agadir",
  "zagora-2day-agadir": "circuit-zagora-2-jours-agadir",
  "erg-chegaga-3day-agadir": "erg-chegaga-3-jours-agadir",
  "desert-4day-agadir": "circuit-desert-4-jours-agadir",
  "agadir-to-fes-4day": "agadir-fes-4-jours",
  "agadir-to-chefchaouen-5day": "agadir-chefchaouen-5-jours",
  "agadir-imperial-cities-6day": "villes-imperiales-agadir-6-jours",
  "toubkal-circuit-ifni-lake-6day": "circuit-toubkal-lac-ifni-6-jours",
  "toubkal-summit-2day-marrakech": "ascension-toubkal-2-jours",
  "toubkal-aguelzim-pass-3day": "toubkal-col-aguelzim-3-jours",
  "toubkal-three-peaks-4000m-3day": "toubkal-trois-sommets-4000m-3-jours",
  "marrakech-food-market-tour": "visite-gastronomique-marrakech",
  "merzouga-stargazing-desert-tour": "nuit-etoilee-merzouga",
  "azzaden-valley-2day-trek": "trek-vallee-azzaden-2-jours",
  "atlas-mountains-3day-trek": "trek-villages-haut-atlas-3-jours",
  "family-atlas-4day-trek": "trek-atlas-famille-4-jours",
  "family-desert-4day-marrakech": "circuit-desert-famille-4-jours",
  "high-atlas-grand-traverse-15day": "grande-traversee-haut-atlas-15-jours",
  "toubkal-summit-sahara-5day": "toubkal-sahara-5-jours",
  "chegaga-camel-trek-8day": "trek-chameau-chegaga-8-jours",
};

const TOUR_SLUGS_ES: Record<string, string> = {
  "shared-merzouga-3day-marrakech": "desierto-merzouga-3-dias-compartido",
  "shared-zagora-2day-marrakech": "desierto-zagora-2-dias-compartido",
  "shared-ouzoud-waterfalls-day-trip": "excursion-compartida-cascadas-ouzoud",
  "shared-agafay-dinner-camel-ride": "agafay-cena-camello-espectaculo-fuego",
  "shared-essaouira-day-trip": "excursion-compartida-essaouira",
  "toubkal-summit-trek-4day": "trek-cumbre-toubkal-4-dias",
  "sahara-3day-marrakech": "tour-desierto-3-dias-marrakech",
  "ourika-valley-day-hike": "senderismo-valle-ourika",
  "ouzoud-waterfalls-day-trip": "excursion-cascadas-ouzoud",
  "agafay-desert-sunset": "atardecer-desierto-agafay",
  "marrakech-medina-cultural-tour": "tour-cultural-medina-marrakech",
  "marrakech-to-fes-3day": "marrakech-fez-3-dias",
  "mgoun-massif-trek": "trek-macizo-mgoun-7-dias",
  "paradise-valley-agadir": "paradise-valley-agadir-dia",
  "sous-massa-national-park": "parque-nacional-souss-massa",
  "taroudant-day-trip-agadir": "excursion-taroudant-agadir",
  "agadir-surf-lesson": "clase-surf-agadir",
  "anti-atlas-trekking-agadir": "trek-anti-atlas-agadir",
  "sahara-2day-agadir": "tour-desierto-2-dias-agadir",
  "souss-valley-cultural-tour": "tour-cultural-valle-souss",
  "agadir-to-essaouira-day-trip": "excursion-essaouira-agadir",
  "marrakech-to-chefchaouen-4day": "marrakech-chefchaouen-4-dias",
  "marrakech-imperial-cities-5day": "ciudades-imperiales-marrakech-5-dias",
  "zagora-2day-marrakech": "tour-zagora-2-dias-marrakech",
  "erg-chegaga-3day-marrakech": "erg-chegaga-3-dias-marrakech",
  "desert-4day-marrakech": "tour-desierto-4-dias-marrakech",
  "merzouga-3day-agadir": "merzouga-3-dias-agadir",
  "zagora-2day-agadir": "tour-zagora-2-dias-agadir",
  "erg-chegaga-3day-agadir": "erg-chegaga-3-dias-agadir",
  "desert-4day-agadir": "tour-desierto-4-dias-agadir",
  "agadir-to-fes-4day": "agadir-fez-4-dias",
  "agadir-to-chefchaouen-5day": "agadir-chefchaouen-5-dias",
  "agadir-imperial-cities-6day": "ciudades-imperiales-agadir-6-dias",
  "toubkal-circuit-ifni-lake-6day": "circuito-toubkal-lago-ifni-6-dias",
  "toubkal-summit-2day-marrakech": "ascension-toubkal-2-dias",
  "toubkal-aguelzim-pass-3day": "toubkal-collado-aguelzim-3-dias",
  "toubkal-three-peaks-4000m-3day": "toubkal-tres-cumbres-4000m-3-dias",
  "marrakech-food-market-tour": "tour-gastronomico-marrakech",
  "merzouga-stargazing-desert-tour": "noche-estrellas-merzouga",
  "azzaden-valley-2day-trek": "trek-valle-azzaden-2-dias",
  "atlas-mountains-3day-trek": "trek-pueblos-alto-atlas-3-dias",
  "family-atlas-4day-trek": "trek-atlas-familia-4-dias",
  "family-desert-4day-marrakech": "tour-desierto-familia-4-dias",
  "high-atlas-grand-traverse-15day": "gran-travesia-alto-atlas-15-dias",
  "toubkal-summit-sahara-5day": "toubkal-sahara-5-dias",
  "chegaga-camel-trek-8day": "trek-camellos-chegaga-8-dias",
};

const TOUR_SLUGS_DE: Record<string, string> = {
  "shared-merzouga-3day-marrakech": "merzouga-wueste-3-tage-geteilt",
  "shared-zagora-2day-marrakech": "zagora-wueste-2-tage-geteilt",
  "shared-ouzoud-waterfalls-day-trip": "ouzoud-wasserfaelle-gruppentour",
  "shared-agafay-dinner-camel-ride": "agafay-abendessen-kamelritt-feuershow",
  "shared-essaouira-day-trip": "essaouira-gruppentagestour",
  "toubkal-summit-trek-4day": "toubkal-gipfel-trek-4-tage",
  "sahara-3day-marrakech": "wuestentour-3-tage-marrakesch",
  "ourika-valley-day-hike": "wanderung-ourika-tal",
  "ouzoud-waterfalls-day-trip": "ausflug-ouzoud-wasserfaelle",
  "agafay-desert-sunset": "sonnenuntergang-agafay-wueste",
  "marrakech-medina-cultural-tour": "kulturtour-medina-marrakesch",
  "marrakech-to-fes-3day": "marrakesch-fes-3-tage",
  "mgoun-massif-trek": "mgoun-massiv-trek-7-tage",
  "paradise-valley-agadir": "paradise-valley-agadir-tagestour",
  "sous-massa-national-park": "nationalpark-souss-massa",
  "taroudant-day-trip-agadir": "ausflug-taroudant-agadir",
  "agadir-surf-lesson": "surfkurs-agadir",
  "anti-atlas-trekking-agadir": "anti-atlas-trekking-agadir",
  "sahara-2day-agadir": "wuestentour-2-tage-agadir",
  "souss-valley-cultural-tour": "kulturtour-souss-tal",
  "agadir-to-essaouira-day-trip": "ausflug-essaouira-agadir",
  "marrakech-to-chefchaouen-4day": "marrakesch-chefchaouen-4-tage",
  "marrakech-imperial-cities-5day": "koenigsstaedte-marrakesch-5-tage",
  "zagora-2day-marrakech": "zagora-tour-2-tage-marrakesch",
  "erg-chegaga-3day-marrakech": "erg-chegaga-3-tage-marrakesch",
  "desert-4day-marrakech": "wuestentour-4-tage-marrakesch",
  "merzouga-3day-agadir": "merzouga-3-tage-agadir",
  "zagora-2day-agadir": "zagora-tour-2-tage-agadir",
  "erg-chegaga-3day-agadir": "erg-chegaga-3-tage-agadir",
  "desert-4day-agadir": "wuestentour-4-tage-agadir",
  "agadir-to-fes-4day": "agadir-fes-4-tage",
  "agadir-to-chefchaouen-5day": "agadir-chefchaouen-5-tage",
  "agadir-imperial-cities-6day": "koenigsstaedte-agadir-6-tage",
  "toubkal-circuit-ifni-lake-6day": "toubkal-runde-ifni-see-6-tage",
  "toubkal-summit-2day-marrakech": "toubkal-besteigung-2-tage",
  "toubkal-aguelzim-pass-3day": "toubkal-aguelzim-pass-3-tage",
  "toubkal-three-peaks-4000m-3day": "toubkal-drei-gipfel-4000m-3-tage",
  "marrakech-food-market-tour": "kulinarische-tour-marrakesch",
  "merzouga-stargazing-desert-tour": "sternenhimmel-merzouga",
  "azzaden-valley-2day-trek": "azzaden-tal-trek-2-tage",
  "atlas-mountains-3day-trek": "hoher-atlas-dorftrek-3-tage",
  "family-atlas-4day-trek": "familien-atlas-trek-4-tage",
  "family-desert-4day-marrakech": "familien-wuestentour-4-tage",
  "high-atlas-grand-traverse-15day": "hoher-atlas-durchquerung-15-tage",
  "toubkal-summit-sahara-5day": "toubkal-sahara-5-tage",
  "chegaga-camel-trek-8day": "kameltrekking-chegaga-8-tage",
};

const TOUR_SLUGS_IT: Record<string, string> = {
  "shared-merzouga-3day-marrakech": "deserto-merzouga-3-giorni-condiviso",
  "shared-zagora-2day-marrakech": "deserto-zagora-2-giorni-condiviso",
  "shared-ouzoud-waterfalls-day-trip": "escursione-condivisa-cascate-ouzoud",
  "shared-agafay-dinner-camel-ride": "agafay-cena-cammello-spettacolo-fuoco",
  "shared-essaouira-day-trip": "escursione-condivisa-essaouira",
  "toubkal-summit-trek-4day": "trek-cima-toubkal-4-giorni",
  "sahara-3day-marrakech": "tour-deserto-3-giorni-marrakech",
  "ourika-valley-day-hike": "escursione-valle-ourika",
  "ouzoud-waterfalls-day-trip": "gita-cascate-ouzoud",
  "agafay-desert-sunset": "tramonto-deserto-agafay",
  "marrakech-medina-cultural-tour": "tour-culturale-medina-marrakech",
  "marrakech-to-fes-3day": "marrakech-fes-3-giorni",
  "mgoun-massif-trek": "trek-massiccio-mgoun-7-giorni",
  "paradise-valley-agadir": "paradise-valley-agadir-giornata",
  "sous-massa-national-park": "parco-nazionale-souss-massa",
  "taroudant-day-trip-agadir": "gita-taroudant-agadir",
  "agadir-surf-lesson": "lezione-surf-agadir",
  "anti-atlas-trekking-agadir": "trek-anti-atlante-agadir",
  "sahara-2day-agadir": "tour-deserto-2-giorni-agadir",
  "souss-valley-cultural-tour": "tour-culturale-valle-souss",
  "agadir-to-essaouira-day-trip": "gita-essaouira-agadir",
  "marrakech-to-chefchaouen-4day": "marrakech-chefchaouen-4-giorni",
  "marrakech-imperial-cities-5day": "citta-imperiali-marrakech-5-giorni",
  "zagora-2day-marrakech": "tour-zagora-2-giorni-marrakech",
  "erg-chegaga-3day-marrakech": "erg-chegaga-3-giorni-marrakech",
  "desert-4day-marrakech": "tour-deserto-4-giorni-marrakech",
  "merzouga-3day-agadir": "merzouga-3-giorni-agadir",
  "zagora-2day-agadir": "tour-zagora-2-giorni-agadir",
  "erg-chegaga-3day-agadir": "erg-chegaga-3-giorni-agadir",
  "desert-4day-agadir": "tour-deserto-4-giorni-agadir",
  "agadir-to-fes-4day": "agadir-fes-4-giorni",
  "agadir-to-chefchaouen-5day": "agadir-chefchaouen-5-giorni",
  "agadir-imperial-cities-6day": "citta-imperiali-agadir-6-giorni",
  "toubkal-circuit-ifni-lake-6day": "circuito-toubkal-lago-ifni-6-giorni",
  "toubkal-summit-2day-marrakech": "salita-toubkal-2-giorni",
  "toubkal-aguelzim-pass-3day": "toubkal-passo-aguelzim-3-giorni",
  "toubkal-three-peaks-4000m-3day": "toubkal-tre-cime-4000m-3-giorni",
  "marrakech-food-market-tour": "tour-gastronomico-marrakech",
  "merzouga-stargazing-desert-tour": "notte-stellata-merzouga",
  "azzaden-valley-2day-trek": "trek-valle-azzaden-2-giorni",
  "atlas-mountains-3day-trek": "trek-villaggi-alto-atlante-3-giorni",
  "family-atlas-4day-trek": "trek-atlante-famiglia-4-giorni",
  "family-desert-4day-marrakech": "tour-deserto-famiglia-4-giorni",
  "high-atlas-grand-traverse-15day": "grande-traversata-alto-atlante-15-giorni",
  "toubkal-summit-sahara-5day": "toubkal-sahara-5-giorni",
  "chegaga-camel-trek-8day": "trek-cammelli-chegaga-8-giorni",
};

const LOCALES = ["en", "fr", "es", "de", "it", "ar"];
const DEFAULT_LOCALE = "en";

// Search-engine and AI crawlers. Matched loosely on purpose: a false positive
// only means a bot gets English, which is the canonical version anyway.
const CRAWLER_UA =
  /bot|crawler|spider|crawling|googlebot|bingbot|yandex|duckduckbot|baiduspider|slurp|facebookexternalhit|embedly|quora link preview|showyoubot|outbrain|pinterest|slackbot|vkshare|w3c_validator|whatsapp|telegram|discord|gptbot|chatgpt|perplexity|claudebot|anthropic|applebot|amazonbot|ccbot/i;

function isCrawler(request: NextRequest): boolean {
  return CRAWLER_UA.test(request.headers.get("user-agent") ?? "");
}

function getLocale(request: NextRequest): string {
  const acceptLang = request.headers.get("accept-language") ?? "";
  for (const segment of acceptLang.split(",")) {
    const lang = segment.trim().split(";")[0].toLowerCase().split("-")[0];
    if (LOCALES.includes(lang)) return lang;
  }
  return DEFAULT_LOCALE;
}

/** Does this path already start with a /<locale> segment? Shared by the www
 *  handler and the fall-through locale redirect so the two cannot disagree
 *  about what counts as already-localised. */
function hasLocalePrefix(pathname: string) {
  return LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
}

export function proxy(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  if (host.endsWith(".vercel.app")) {
    const url = new URL(request.url);
    url.host = "marrakechecotours.com";
    url.protocol = "https";
    return NextResponse.redirect(url, 308);
  }

  // Consolidate the www host onto the bare apex, which every canonical, the
  // sitemap, and all JSON-LD already point to. Without this Googlebot indexes
  // www.* and marrakechecotours.* as separate duplicate URLs. 308 (permanent)
  // so ranking signals consolidate onto the apex.
  if (host.startsWith("www.")) {
    const url = new URL(request.url);
    url.host = host.slice(4);
    url.protocol = "https";
    // Add the locale prefix here too when the path lacks one, so www root goes
    // straight to https://apex/en instead of chaining apex root -> apex/en.
    // Search Console listed both www roots under "Page with redirect", and a
    // two-hop chain is a wasted crawl on the single most-linked URL on the site.
    if (!hasLocalePrefix(url.pathname)) {
      const locale = isCrawler(request) ? DEFAULT_LOCALE : getLocale(request);
      url.pathname = `/${locale}${url.pathname === "/" ? "" : url.pathname}`;
    }
    return NextResponse.redirect(url, 308);
  }

  const { pathname } = request.nextUrl;

  // Redirect guessed/legacy category slugs to a real category so external links
  // (and Googlebot's URL guesses like /categories/imperial) land on a live page
  // instead of a 404. Keys are the bad slug, values the real CATEGORIES id.
  const CATEGORY_ALIASES: Record<string, string> = {
    imperial: "cultural",
    "imperial-cities": "cultural",
    culture: "cultural",
    trek: "trekking",
    trekking: "trekking",
    sahara: "desert",
    "day-trips": "day-tours",
    "day-tour": "day-tours",
  };
  // Posts whose URL segment differs per locale. English slug -> per-locale
  // segment. Only posts published from 2026-08 are listed: older posts are
  // already indexed and ranking under the English slug, and renaming those
  // would trade real positions for a marginal gain.
  //
  // Kept as a literal rather than imported from lib/blog so the edge bundle
  // does not pull in the whole 5,000-line post corpus.
  const BLOG_LOCALIZED_SLUGS: Record<string, Record<string, string>> = {
    fr: BLOG_SLUGS_FR,
    es: BLOG_SLUGS_ES,
    de: BLOG_SLUGS_DE,
    it: BLOG_SLUGS_IT,
  };
  const TOUR_LOCALIZED_SLUGS: Record<string, Record<string, string>> = {
    fr: TOUR_SLUGS_FR,
    es: TOUR_SLUGS_ES,
    de: TOUR_SLUGS_DE,
    it: TOUR_SLUGS_IT,
  };
  const tourMatch = pathname.match(/^\/([a-z]{2})\/tours\/([^/]+)\/?$/);
  if (tourMatch) {
    const [, loc, slug] = tourMatch;
    const target = TOUR_LOCALIZED_SLUGS[loc]?.[slug];
    if (target && target !== slug) {
      const url = request.nextUrl.clone();
      url.pathname = `/${loc}/tours/${target}`;
      // 308 rather than 301: these are the booking pages, and 308 preserves the
      // request method. Permanent either way, so ranking signals consolidate.
      return NextResponse.redirect(url, 308);
    }
  }

  const blogMatch = pathname.match(/^\/([a-z]{2})\/blog\/([^/]+)\/?$/);
  if (blogMatch) {
    const [, loc, slug] = blogMatch;
    const target = BLOG_LOCALIZED_SLUGS[loc]?.[slug];
    if (target && target !== slug) {
      const url = request.nextUrl.clone();
      url.pathname = `/${loc}/blog/${target}`;
      // 301: the localised URL is canonical, so consolidate signals onto it.
      return NextResponse.redirect(url, 301);
    }
  }

  const catMatch = pathname.match(/^\/([a-z]{2})\/categories\/([^/]+)\/?$/);
  if (catMatch) {
    const [, loc, slug] = catMatch;
    const target = CATEGORY_ALIASES[slug];
    if (target && target !== slug) {
      const url = request.nextUrl.clone();
      url.pathname = `/${loc}/categories/${target}`;
      return NextResponse.redirect(url, 301);
    }
  }

  if (hasLocalePrefix(pathname)) return;

  // Crawlers get the canonical default locale, never an Accept-Language guess.
  // Googlebot commonly sends "Accept-Language: it" or similar, and honouring it
  // meant /tours redirected to /it/tours — which is how 66 Italian URLs ended
  // up indexed against 25 English ones. Real users still get their language.
  const locale = isCrawler(request) ? DEFAULT_LOCALE : getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  // 308, not the default 307: routing an unprefixed path to a locale is a
  // permanent decision, and Google only consolidates ranking signals through
  // a permanent redirect. A 307 leaves both URLs as separate candidates.
  return NextResponse.redirect(request.nextUrl, 308);
}

export const config = {
  // Skip Next internals, the API, and any request for a file with an extension
  // (og-image.jpg, icon.svg, the IndexNow key .txt, etc.) so static assets in
  // /public are served directly instead of being swept into the locale redirect.
  matcher: ["/((?!_next|api|.*\\.[\\w]+$).*)"],
};
