import type { Locale } from "@/app/[lang]/dictionaries";

/**
 * Translating a URL when the visitor changes language.
 *
 * THE BUG THIS EXISTS TO FIX (reported 2026-08-17, reproduced from the code):
 * the header's language switcher replaced only the locale segment --
 *
 *     const segments = pathname.split("/");
 *     segments[1] = newLang;   // /fr/blog/prix-guide-toubkal
 *                              //   -> /en/blog/prix-guide-toubkal
 *
 * -- leaving the slug in the OLD language. `/en/blog/prix-guide-toubkal` is not
 * a page: English serves `toubkal-guide-cost`. So switching from French to
 * English on any post published from 2026-08 onwards produced a hard 404 on a
 * live, indexed, ranking page. proxy.ts could not catch it either: its maps run
 * English -> localised only, so nothing handled the reverse direction.
 *
 * The maps below are the INVERSE of proxy.ts's, generated from it rather than
 * hand-copied -- hand-copying is what allowed the two to disagree in the first
 * place. `__tests__/lib/locale-switch.test.ts` asserts they stay in sync.
 *
 * Kept as literals, as proxy.ts does, so the client bundle does not pull in the
 * 45,000-line post corpus.
 */
/** localised segment -> English slug. Blog posts. Generated; see scripts. */
const BLOG_TO_EN: Record<string, Record<string, string>> = {
  fr: {
    "prix-circuit-sahara-3-jours-marrakech": "3-day-sahara-tour-cost-marrakech",
    "itineraire-7-jours-maroc-depuis-agadir": "7-day-agadir-itinerary-morocco",
    "mal-aigu-des-montagnes-toubkal": "altitude-sickness-toubkal-guide",
    "que-faire-au-maroc": "best-things-to-do-in-morocco",
    "reserver-circuit-maroc-direct-ou-plateforme": "booking-morocco-tour-direct-vs-platform",
    "prix-circuit-desert-famille-maroc": "family-desert-tour-morocco-cost",
    "prix-grande-traversee-haut-atlas": "high-atlas-grand-traverse-cost",
    "prix-trek-villages-haut-atlas": "high-atlas-village-trek-cost",
    "campement-desert-luxe-ou-standard": "luxury-vs-standard-desert-camp-morocco",
    "prix-circuit-marrakech-chefchaouen": "marrakech-to-chefchaouen-tour-cost",
    "prix-trek-massif-mgoun": "mgoun-massif-trek-cost",
    "cours-de-cuisine-marrakech": "moroccan-cooking-class-marrakech-guide",
    "trek-dromadaire-sahara-maroc": "morocco-camel-trek-sahara-guide",
    "prix-circuit-maroc-taille-groupe": "morocco-tour-price-group-size",
    "maroc-en-famille-avec-enfants": "morocco-with-kids-family-guide",
    "circuit-desert-prive-ou-partage": "private-vs-shared-desert-tour-morocco",
    "prix-circuit-sahara-agadir": "sahara-tour-from-agadir-cost",
    "circuits-partages-maroc": "shared-group-tours-morocco-guide",
    "prix-trek-toubkal-2-jours": "toubkal-2-day-trek-cost",
    "prix-trek-toubkal-4-jours": "toubkal-4-day-trek-cost",
    "prix-circuit-toubkal-lac-ifni": "toubkal-circuit-ifni-lake-cost",
    "prix-guide-toubkal": "toubkal-guide-cost",
    "prix-toubkal-sahara-5-jours": "toubkal-sahara-5day-cost",
    "prix-trek-trois-sommets-toubkal": "toubkal-three-peaks-trek-cost",
  },
  es: {
    "precio-tour-sahara-3-dias-marrakech": "3-day-sahara-tour-cost-marrakech",
    "itinerario-7-dias-marruecos-desde-agadir": "7-day-agadir-itinerary-morocco",
    "mal-de-altura-toubkal": "altitude-sickness-toubkal-guide",
    "que-hacer-en-marruecos": "best-things-to-do-in-morocco",
    "reservar-circuito-marruecos-directo-o-plataforma": "booking-morocco-tour-direct-vs-platform",
    "precio-tour-desierto-familia-marruecos": "family-desert-tour-morocco-cost",
    "precio-gran-travesia-alto-atlas": "high-atlas-grand-traverse-cost",
    "precio-trek-pueblos-alto-atlas": "high-atlas-village-trek-cost",
    "campamento-desierto-lujo-o-estandar": "luxury-vs-standard-desert-camp-morocco",
    "precio-tour-marrakech-chefchaouen": "marrakech-to-chefchaouen-tour-cost",
    "precio-trek-macizo-mgoun": "mgoun-massif-trek-cost",
    "clase-de-cocina-marrakech": "moroccan-cooking-class-marrakech-guide",
    "trekking-camello-sahara-marruecos": "morocco-camel-trek-sahara-guide",
    "precio-circuito-marruecos-tamano-grupo": "morocco-tour-price-group-size",
    "marruecos-con-ninos-guia-familiar": "morocco-with-kids-family-guide",
    "circuito-desierto-privado-o-compartido": "private-vs-shared-desert-tour-morocco",
    "precio-tour-sahara-agadir": "sahara-tour-from-agadir-cost",
    "circuitos-compartidos-marruecos": "shared-group-tours-morocco-guide",
    "precio-trek-toubkal-2-dias": "toubkal-2-day-trek-cost",
    "precio-trek-toubkal-4-dias": "toubkal-4-day-trek-cost",
    "precio-circuito-toubkal-lago-ifni": "toubkal-circuit-ifni-lake-cost",
    "precio-guia-toubkal": "toubkal-guide-cost",
    "precio-toubkal-sahara-5-dias": "toubkal-sahara-5day-cost",
    "precio-trek-tres-cumbres-toubkal": "toubkal-three-peaks-trek-cost",
  },
  de: {
    "sahara-tour-3-tage-marrakesch-kosten": "3-day-sahara-tour-cost-marrakech",
    "7-tage-marokko-route-ab-agadir": "7-day-agadir-itinerary-morocco",
    "hoehenkrankheit-toubkal": "altitude-sickness-toubkal-guide",
    "was-man-in-marokko-machen-kann": "best-things-to-do-in-morocco",
    "marokko-tour-direkt-oder-plattform-buchen": "booking-morocco-tour-direct-vs-platform",
    "familien-wuestentour-marokko-kosten": "family-desert-tour-morocco-cost",
    "hoher-atlas-grand-traverse-kosten": "high-atlas-grand-traverse-cost",
    "hoher-atlas-dorftrek-kosten": "high-atlas-village-trek-cost",
    "wuestencamp-luxus-oder-standard": "luxury-vs-standard-desert-camp-morocco",
    "marrakesch-chefchaouen-tour-kosten": "marrakech-to-chefchaouen-tour-cost",
    "mgoun-massiv-trek-kosten": "mgoun-massif-trek-cost",
    "kochkurs-marrakesch": "moroccan-cooking-class-marrakech-guide",
    "kameltrekking-sahara-marokko": "morocco-camel-trek-sahara-guide",
    "marokko-tour-preis-gruppengroesse": "morocco-tour-price-group-size",
    "marokko-mit-kindern-familienreise": "morocco-with-kids-family-guide",
    "wuestentour-privat-oder-geteilt": "private-vs-shared-desert-tour-morocco",
    "sahara-tour-agadir-kosten": "sahara-tour-from-agadir-cost",
    "gruppentouren-marokko": "shared-group-tours-morocco-guide",
    "toubkal-trek-2-tage-kosten": "toubkal-2-day-trek-cost",
    "toubkal-trek-4-tage-kosten": "toubkal-4-day-trek-cost",
    "toubkal-runde-ifni-see-kosten": "toubkal-circuit-ifni-lake-cost",
    "toubkal-bergfuehrer-kosten": "toubkal-guide-cost",
    "toubkal-sahara-5-tage-kosten": "toubkal-sahara-5day-cost",
    "toubkal-drei-gipfel-trek-kosten": "toubkal-three-peaks-trek-cost",
  },
  it: {
    "prezzo-tour-sahara-3-giorni-marrakech": "3-day-sahara-tour-cost-marrakech",
    "itinerario-7-giorni-marocco-da-agadir": "7-day-agadir-itinerary-morocco",
    "mal-di-montagna-toubkal": "altitude-sickness-toubkal-guide",
    "cosa-fare-in-marocco": "best-things-to-do-in-morocco",
    "prenotare-tour-marocco-diretto-o-piattaforma": "booking-morocco-tour-direct-vs-platform",
    "prezzo-tour-deserto-famiglia-marocco": "family-desert-tour-morocco-cost",
    "prezzo-grande-traversata-alto-atlante": "high-atlas-grand-traverse-cost",
    "prezzo-trek-villaggi-alto-atlante": "high-atlas-village-trek-cost",
    "campo-deserto-lusso-o-standard": "luxury-vs-standard-desert-camp-morocco",
    "prezzo-tour-marrakech-chefchaouen": "marrakech-to-chefchaouen-tour-cost",
    "prezzo-trek-massiccio-mgoun": "mgoun-massif-trek-cost",
    "corso-di-cucina-marrakech": "moroccan-cooking-class-marrakech-guide",
    "trekking-cammello-sahara-marocco": "morocco-camel-trek-sahara-guide",
    "prezzo-tour-marocco-dimensione-gruppo": "morocco-tour-price-group-size",
    "marocco-con-bambini-guida-famiglie": "morocco-with-kids-family-guide",
    "tour-deserto-privato-o-condiviso": "private-vs-shared-desert-tour-morocco",
    "prezzo-tour-sahara-agadir": "sahara-tour-from-agadir-cost",
    "tour-condivisi-marocco": "shared-group-tours-morocco-guide",
    "prezzo-trek-toubkal-2-giorni": "toubkal-2-day-trek-cost",
    "prezzo-trek-toubkal-4-giorni": "toubkal-4-day-trek-cost",
    "prezzo-circuito-toubkal-lago-ifni": "toubkal-circuit-ifni-lake-cost",
    "prezzo-guida-toubkal": "toubkal-guide-cost",
    "prezzo-toubkal-sahara-5-giorni": "toubkal-sahara-5day-cost",
    "prezzo-trek-tre-cime-toubkal": "toubkal-three-peaks-trek-cost",
  },
};

/** localised segment -> English slug. Tours. Generated; see scripts. */
const TOUR_TO_EN: Record<string, Record<string, string>> = {
  fr: {
    "villes-imperiales-agadir-6-jours": "agadir-imperial-cities-6day",
    "cours-surf-agadir": "agadir-surf-lesson",
    "agadir-chefchaouen-5-jours": "agadir-to-chefchaouen-5day",
    "excursion-essaouira-agadir": "agadir-to-essaouira-day-trip",
    "agadir-fes-4-jours": "agadir-to-fes-4day",
    "coucher-soleil-desert-agafay": "agafay-desert-sunset",
    "trek-anti-atlas-agadir": "anti-atlas-trekking-agadir",
    "trek-villages-haut-atlas-3-jours": "atlas-mountains-3day-trek",
    "trek-vallee-azzaden-2-jours": "azzaden-valley-2day-trek",
    "trek-chameau-chegaga-8-jours": "chegaga-camel-trek-8day",
    "circuit-desert-4-jours-agadir": "desert-4day-agadir",
    "circuit-desert-4-jours-marrakech": "desert-4day-marrakech",
    "erg-chegaga-3-jours-agadir": "erg-chegaga-3day-agadir",
    "erg-chegaga-3-jours-marrakech": "erg-chegaga-3day-marrakech",
    "trek-atlas-famille-4-jours": "family-atlas-4day-trek",
    "circuit-desert-famille-4-jours": "family-desert-4day-marrakech",
    "grande-traversee-haut-atlas-15-jours": "high-atlas-grand-traverse-15day",
    "visite-gastronomique-marrakech": "marrakech-food-market-tour",
    "villes-imperiales-marrakech-5-jours": "marrakech-imperial-cities-5day",
    "visite-culturelle-medina-marrakech": "marrakech-medina-cultural-tour",
    "marrakech-chefchaouen-4-jours": "marrakech-to-chefchaouen-4day",
    "marrakech-fes-3-jours": "marrakech-to-fes-3day",
    "merzouga-3-jours-agadir": "merzouga-3day-agadir",
    "nuit-etoilee-merzouga": "merzouga-stargazing-desert-tour",
    "trek-massif-mgoun-7-jours": "mgoun-massif-trek",
    "randonnee-vallee-ourika-journee": "ourika-valley-day-hike",
    "excursion-cascades-ouzoud": "ouzoud-waterfalls-day-trip",
    "paradise-valley-agadir-journee": "paradise-valley-agadir",
    "circuit-desert-2-jours-agadir": "sahara-2day-agadir",
    "circuit-desert-3-jours-marrakech": "sahara-3day-marrakech",
    "agafay-diner-dromadaire-spectacle-feu": "shared-agafay-dinner-camel-ride",
    "excursion-partagee-essaouira": "shared-essaouira-day-trip",
    "desert-merzouga-3-jours-partage": "shared-merzouga-3day-marrakech",
    "excursion-partagee-cascades-ouzoud": "shared-ouzoud-waterfalls-day-trip",
    "desert-zagora-2-jours-partage": "shared-zagora-2day-marrakech",
    "parc-national-souss-massa": "sous-massa-national-park",
    "circuit-culturel-vallee-souss": "souss-valley-cultural-tour",
    "excursion-taroudant-agadir": "taroudant-day-trip-agadir",
    "toubkal-col-aguelzim-3-jours": "toubkal-aguelzim-pass-3day",
    "circuit-toubkal-lac-ifni-6-jours": "toubkal-circuit-ifni-lake-6day",
    "ascension-toubkal-2-jours": "toubkal-summit-2day-marrakech",
    "toubkal-sahara-5-jours": "toubkal-summit-sahara-5day",
    "trek-sommet-toubkal-4-jours": "toubkal-summit-trek-4day",
    "toubkal-trois-sommets-4000m-3-jours": "toubkal-three-peaks-4000m-3day",
    "circuit-zagora-2-jours-agadir": "zagora-2day-agadir",
    "circuit-zagora-2-jours-marrakech": "zagora-2day-marrakech",
  },
  es: {
    "ciudades-imperiales-agadir-6-dias": "agadir-imperial-cities-6day",
    "clase-surf-agadir": "agadir-surf-lesson",
    "agadir-chefchaouen-5-dias": "agadir-to-chefchaouen-5day",
    "excursion-essaouira-agadir": "agadir-to-essaouira-day-trip",
    "agadir-fez-4-dias": "agadir-to-fes-4day",
    "atardecer-desierto-agafay": "agafay-desert-sunset",
    "trek-anti-atlas-agadir": "anti-atlas-trekking-agadir",
    "trek-pueblos-alto-atlas-3-dias": "atlas-mountains-3day-trek",
    "trek-valle-azzaden-2-dias": "azzaden-valley-2day-trek",
    "trek-camellos-chegaga-8-dias": "chegaga-camel-trek-8day",
    "tour-desierto-4-dias-agadir": "desert-4day-agadir",
    "tour-desierto-4-dias-marrakech": "desert-4day-marrakech",
    "erg-chegaga-3-dias-agadir": "erg-chegaga-3day-agadir",
    "erg-chegaga-3-dias-marrakech": "erg-chegaga-3day-marrakech",
    "trek-atlas-familia-4-dias": "family-atlas-4day-trek",
    "tour-desierto-familia-4-dias": "family-desert-4day-marrakech",
    "gran-travesia-alto-atlas-15-dias": "high-atlas-grand-traverse-15day",
    "tour-gastronomico-marrakech": "marrakech-food-market-tour",
    "ciudades-imperiales-marrakech-5-dias": "marrakech-imperial-cities-5day",
    "tour-cultural-medina-marrakech": "marrakech-medina-cultural-tour",
    "marrakech-chefchaouen-4-dias": "marrakech-to-chefchaouen-4day",
    "marrakech-fez-3-dias": "marrakech-to-fes-3day",
    "merzouga-3-dias-agadir": "merzouga-3day-agadir",
    "noche-estrellas-merzouga": "merzouga-stargazing-desert-tour",
    "trek-macizo-mgoun-7-dias": "mgoun-massif-trek",
    "senderismo-valle-ourika": "ourika-valley-day-hike",
    "excursion-cascadas-ouzoud": "ouzoud-waterfalls-day-trip",
    "paradise-valley-agadir-dia": "paradise-valley-agadir",
    "tour-desierto-2-dias-agadir": "sahara-2day-agadir",
    "tour-desierto-3-dias-marrakech": "sahara-3day-marrakech",
    "agafay-cena-camello-espectaculo-fuego": "shared-agafay-dinner-camel-ride",
    "excursion-compartida-essaouira": "shared-essaouira-day-trip",
    "desierto-merzouga-3-dias-compartido": "shared-merzouga-3day-marrakech",
    "excursion-compartida-cascadas-ouzoud": "shared-ouzoud-waterfalls-day-trip",
    "desierto-zagora-2-dias-compartido": "shared-zagora-2day-marrakech",
    "parque-nacional-souss-massa": "sous-massa-national-park",
    "tour-cultural-valle-souss": "souss-valley-cultural-tour",
    "excursion-taroudant-agadir": "taroudant-day-trip-agadir",
    "toubkal-collado-aguelzim-3-dias": "toubkal-aguelzim-pass-3day",
    "circuito-toubkal-lago-ifni-6-dias": "toubkal-circuit-ifni-lake-6day",
    "ascension-toubkal-2-dias": "toubkal-summit-2day-marrakech",
    "toubkal-sahara-5-dias": "toubkal-summit-sahara-5day",
    "trek-cumbre-toubkal-4-dias": "toubkal-summit-trek-4day",
    "toubkal-tres-cumbres-4000m-3-dias": "toubkal-three-peaks-4000m-3day",
    "tour-zagora-2-dias-agadir": "zagora-2day-agadir",
    "tour-zagora-2-dias-marrakech": "zagora-2day-marrakech",
  },
  de: {
    "koenigsstaedte-agadir-6-tage": "agadir-imperial-cities-6day",
    "surfkurs-agadir": "agadir-surf-lesson",
    "agadir-chefchaouen-5-tage": "agadir-to-chefchaouen-5day",
    "ausflug-essaouira-agadir": "agadir-to-essaouira-day-trip",
    "agadir-fes-4-tage": "agadir-to-fes-4day",
    "sonnenuntergang-agafay-wueste": "agafay-desert-sunset",
    "hoher-atlas-dorftrek-3-tage": "atlas-mountains-3day-trek",
    "azzaden-tal-trek-2-tage": "azzaden-valley-2day-trek",
    "kameltrekking-chegaga-8-tage": "chegaga-camel-trek-8day",
    "wuestentour-4-tage-agadir": "desert-4day-agadir",
    "wuestentour-4-tage-marrakesch": "desert-4day-marrakech",
    "erg-chegaga-3-tage-agadir": "erg-chegaga-3day-agadir",
    "erg-chegaga-3-tage-marrakesch": "erg-chegaga-3day-marrakech",
    "familien-atlas-trek-4-tage": "family-atlas-4day-trek",
    "familien-wuestentour-4-tage": "family-desert-4day-marrakech",
    "hoher-atlas-durchquerung-15-tage": "high-atlas-grand-traverse-15day",
    "kulinarische-tour-marrakesch": "marrakech-food-market-tour",
    "koenigsstaedte-marrakesch-5-tage": "marrakech-imperial-cities-5day",
    "kulturtour-medina-marrakesch": "marrakech-medina-cultural-tour",
    "marrakesch-chefchaouen-4-tage": "marrakech-to-chefchaouen-4day",
    "marrakesch-fes-3-tage": "marrakech-to-fes-3day",
    "merzouga-3-tage-agadir": "merzouga-3day-agadir",
    "sternenhimmel-merzouga": "merzouga-stargazing-desert-tour",
    "mgoun-massiv-trek-7-tage": "mgoun-massif-trek",
    "wanderung-ourika-tal": "ourika-valley-day-hike",
    "ausflug-ouzoud-wasserfaelle": "ouzoud-waterfalls-day-trip",
    "paradise-valley-agadir-tagestour": "paradise-valley-agadir",
    "wuestentour-2-tage-agadir": "sahara-2day-agadir",
    "wuestentour-3-tage-marrakesch": "sahara-3day-marrakech",
    "agafay-abendessen-kamelritt-feuershow": "shared-agafay-dinner-camel-ride",
    "essaouira-gruppentagestour": "shared-essaouira-day-trip",
    "merzouga-wueste-3-tage-geteilt": "shared-merzouga-3day-marrakech",
    "ouzoud-wasserfaelle-gruppentour": "shared-ouzoud-waterfalls-day-trip",
    "zagora-wueste-2-tage-geteilt": "shared-zagora-2day-marrakech",
    "nationalpark-souss-massa": "sous-massa-national-park",
    "kulturtour-souss-tal": "souss-valley-cultural-tour",
    "ausflug-taroudant-agadir": "taroudant-day-trip-agadir",
    "toubkal-aguelzim-pass-3-tage": "toubkal-aguelzim-pass-3day",
    "toubkal-runde-ifni-see-6-tage": "toubkal-circuit-ifni-lake-6day",
    "toubkal-besteigung-2-tage": "toubkal-summit-2day-marrakech",
    "toubkal-sahara-5-tage": "toubkal-summit-sahara-5day",
    "toubkal-gipfel-trek-4-tage": "toubkal-summit-trek-4day",
    "toubkal-drei-gipfel-4000m-3-tage": "toubkal-three-peaks-4000m-3day",
    "zagora-tour-2-tage-agadir": "zagora-2day-agadir",
    "zagora-tour-2-tage-marrakesch": "zagora-2day-marrakech",
  },
  it: {
    "citta-imperiali-agadir-6-giorni": "agadir-imperial-cities-6day",
    "lezione-surf-agadir": "agadir-surf-lesson",
    "agadir-chefchaouen-5-giorni": "agadir-to-chefchaouen-5day",
    "gita-essaouira-agadir": "agadir-to-essaouira-day-trip",
    "agadir-fes-4-giorni": "agadir-to-fes-4day",
    "tramonto-deserto-agafay": "agafay-desert-sunset",
    "trek-anti-atlante-agadir": "anti-atlas-trekking-agadir",
    "trek-villaggi-alto-atlante-3-giorni": "atlas-mountains-3day-trek",
    "trek-valle-azzaden-2-giorni": "azzaden-valley-2day-trek",
    "trek-cammelli-chegaga-8-giorni": "chegaga-camel-trek-8day",
    "tour-deserto-4-giorni-agadir": "desert-4day-agadir",
    "tour-deserto-4-giorni-marrakech": "desert-4day-marrakech",
    "erg-chegaga-3-giorni-agadir": "erg-chegaga-3day-agadir",
    "erg-chegaga-3-giorni-marrakech": "erg-chegaga-3day-marrakech",
    "trek-atlante-famiglia-4-giorni": "family-atlas-4day-trek",
    "tour-deserto-famiglia-4-giorni": "family-desert-4day-marrakech",
    "grande-traversata-alto-atlante-15-giorni": "high-atlas-grand-traverse-15day",
    "tour-gastronomico-marrakech": "marrakech-food-market-tour",
    "citta-imperiali-marrakech-5-giorni": "marrakech-imperial-cities-5day",
    "tour-culturale-medina-marrakech": "marrakech-medina-cultural-tour",
    "marrakech-chefchaouen-4-giorni": "marrakech-to-chefchaouen-4day",
    "marrakech-fes-3-giorni": "marrakech-to-fes-3day",
    "merzouga-3-giorni-agadir": "merzouga-3day-agadir",
    "notte-stellata-merzouga": "merzouga-stargazing-desert-tour",
    "trek-massiccio-mgoun-7-giorni": "mgoun-massif-trek",
    "escursione-valle-ourika": "ourika-valley-day-hike",
    "gita-cascate-ouzoud": "ouzoud-waterfalls-day-trip",
    "paradise-valley-agadir-giornata": "paradise-valley-agadir",
    "tour-deserto-2-giorni-agadir": "sahara-2day-agadir",
    "tour-deserto-3-giorni-marrakech": "sahara-3day-marrakech",
    "agafay-cena-cammello-spettacolo-fuoco": "shared-agafay-dinner-camel-ride",
    "escursione-condivisa-essaouira": "shared-essaouira-day-trip",
    "deserto-merzouga-3-giorni-condiviso": "shared-merzouga-3day-marrakech",
    "escursione-condivisa-cascate-ouzoud": "shared-ouzoud-waterfalls-day-trip",
    "deserto-zagora-2-giorni-condiviso": "shared-zagora-2day-marrakech",
    "parco-nazionale-souss-massa": "sous-massa-national-park",
    "tour-culturale-valle-souss": "souss-valley-cultural-tour",
    "gita-taroudant-agadir": "taroudant-day-trip-agadir",
    "toubkal-passo-aguelzim-3-giorni": "toubkal-aguelzim-pass-3day",
    "circuito-toubkal-lago-ifni-6-giorni": "toubkal-circuit-ifni-lake-6day",
    "salita-toubkal-2-giorni": "toubkal-summit-2day-marrakech",
    "toubkal-sahara-5-giorni": "toubkal-summit-sahara-5day",
    "trek-cima-toubkal-4-giorni": "toubkal-summit-trek-4day",
    "toubkal-tre-cime-4000m-3-giorni": "toubkal-three-peaks-4000m-3day",
    "tour-zagora-2-giorni-agadir": "zagora-2day-agadir",
    "tour-zagora-2-giorni-marrakech": "zagora-2day-marrakech",
  },
};

/** Forward maps (English -> localised), needed to translate INTO the target. */
const BLOG_TO_LOCAL: Record<string, Record<string, string>> = invertAll(BLOG_TO_EN);
const TOUR_TO_LOCAL: Record<string, Record<string, string>> = invertAll(TOUR_TO_EN);

function invertAll(
  maps: Record<string, Record<string, string>>
): Record<string, Record<string, string>> {
  const out: Record<string, Record<string, string>> = {};
  for (const [loc, m] of Object.entries(maps)) {
    const inner: Record<string, string> = {};
    for (const [localised, en] of Object.entries(m)) inner[en] = localised;
    out[loc] = inner;
  }
  return out;
}

/**
 * Translate a pathname from one locale to another, converting the SLUG as well
 * as the locale segment.
 *
 * Resolution order matters. The incoming slug may already be in either
 * language, because both forms resolve (see getBlogPostFor): a visitor can
 * arrive on the English slug from an older indexed link and then switch. So the
 * slug is normalised to English first, then mapped into the target locale.
 * English and Arabic have no localised slugs, so both steps are identities
 * there and the function degrades to a plain locale swap.
 */
export function translatePath(pathname: string, from: Locale, to: Locale): string {
  const segments = pathname.split("/");
  if (segments.length < 2) return `/${to}`;
  segments[1] = to;

  const kind = segments[2];
  if ((kind !== "blog" && kind !== "tours") || segments.length < 4 || !segments[3]) {
    return segments.join("/") || `/${to}`;
  }

  const toEn = kind === "blog" ? BLOG_TO_EN : TOUR_TO_EN;
  const toLocal = kind === "blog" ? BLOG_TO_LOCAL : TOUR_TO_LOCAL;

  const english = toEn[from]?.[segments[3]] ?? segments[3];
  segments[3] = toLocal[to]?.[english] ?? english;
  return segments.join("/");
}
