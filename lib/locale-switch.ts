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
    "itineraire-7-jours-maroc-depuis-agadir": "7-day-agadir-itinerary-morocco",
    "campement-desert-luxe-ou-standard": "luxury-vs-standard-desert-camp-morocco",
    "mal-aigu-des-montagnes-toubkal": "altitude-sickness-toubkal-guide",
    "maroc-en-famille-avec-enfants": "morocco-with-kids-family-guide",
    "trek-dromadaire-sahara-maroc": "morocco-camel-trek-sahara-guide",
    "prix-trek-toubkal-2-jours": "toubkal-2-day-trek-cost",
    "prix-trek-toubkal-4-jours": "toubkal-4-day-trek-cost",
    "prix-circuit-toubkal-lac-ifni": "toubkal-circuit-ifni-lake-cost",
    "prix-guide-toubkal": "toubkal-guide-cost",
    "prix-circuit-marrakech-chefchaouen": "marrakech-to-chefchaouen-tour-cost",
    "prix-circuit-sahara-3-jours-marrakech": "3-day-sahara-tour-cost-marrakech",
    "prix-circuit-sahara-agadir": "sahara-tour-from-agadir-cost",
    "prix-circuit-desert-famille-maroc": "family-desert-tour-morocco-cost",
    "prix-trek-trois-sommets-toubkal": "toubkal-three-peaks-trek-cost",
    "prix-trek-massif-mgoun": "mgoun-massif-trek-cost",
    "prix-grande-traversee-haut-atlas": "high-atlas-grand-traverse-cost",
    "prix-toubkal-sahara-5-jours": "toubkal-sahara-5day-cost",
    "prix-trek-villages-haut-atlas": "high-atlas-village-trek-cost",
    "prix-circuit-maroc-taille-groupe": "morocco-tour-price-group-size",
    "circuit-desert-prive-ou-partage": "private-vs-shared-desert-tour-morocco",
    "reserver-circuit-maroc-direct-ou-plateforme": "booking-morocco-tour-direct-vs-platform",
    "que-faire-au-maroc": "best-things-to-do-in-morocco",
    "circuits-partages-maroc": "shared-group-tours-morocco-guide",
    "cours-de-cuisine-marrakech": "moroccan-cooking-class-marrakech-guide",
    "calendrier-festivals-maroc-par-mois": "morocco-festivals-calendar-by-month",
    "se-deplacer-au-maroc-transports": "getting-around-morocco-transport-guide",
    "meteo-desert-sahara-maroc": "sahara-desert-weather-what-to-expect",
  },
  es: {
    "itinerario-7-dias-marruecos-desde-agadir": "7-day-agadir-itinerary-morocco",
    "campamento-desierto-lujo-o-estandar": "luxury-vs-standard-desert-camp-morocco",
    "mal-de-altura-toubkal": "altitude-sickness-toubkal-guide",
    "marruecos-con-ninos-guia-familiar": "morocco-with-kids-family-guide",
    "trekking-camello-sahara-marruecos": "morocco-camel-trek-sahara-guide",
    "precio-trek-toubkal-2-dias": "toubkal-2-day-trek-cost",
    "precio-trek-toubkal-4-dias": "toubkal-4-day-trek-cost",
    "precio-circuito-toubkal-lago-ifni": "toubkal-circuit-ifni-lake-cost",
    "precio-guia-toubkal": "toubkal-guide-cost",
    "precio-tour-marrakech-chefchaouen": "marrakech-to-chefchaouen-tour-cost",
    "precio-tour-sahara-3-dias-marrakech": "3-day-sahara-tour-cost-marrakech",
    "precio-tour-sahara-agadir": "sahara-tour-from-agadir-cost",
    "precio-tour-desierto-familia-marruecos": "family-desert-tour-morocco-cost",
    "precio-trek-tres-cumbres-toubkal": "toubkal-three-peaks-trek-cost",
    "precio-trek-macizo-mgoun": "mgoun-massif-trek-cost",
    "precio-gran-travesia-alto-atlas": "high-atlas-grand-traverse-cost",
    "precio-toubkal-sahara-5-dias": "toubkal-sahara-5day-cost",
    "precio-trek-pueblos-alto-atlas": "high-atlas-village-trek-cost",
    "precio-circuito-marruecos-tamano-grupo": "morocco-tour-price-group-size",
    "circuito-desierto-privado-o-compartido": "private-vs-shared-desert-tour-morocco",
    "reservar-circuito-marruecos-directo-o-plataforma": "booking-morocco-tour-direct-vs-platform",
    "que-hacer-en-marruecos": "best-things-to-do-in-morocco",
    "circuitos-compartidos-marruecos": "shared-group-tours-morocco-guide",
    "clase-de-cocina-marrakech": "moroccan-cooking-class-marrakech-guide",
    "calendario-festivales-marruecos-por-mes": "morocco-festivals-calendar-by-month",
    "como-moverse-por-marruecos-transporte": "getting-around-morocco-transport-guide",
    "clima-desierto-sahara-marruecos": "sahara-desert-weather-what-to-expect",
  },
  de: {
    "7-tage-marokko-route-ab-agadir": "7-day-agadir-itinerary-morocco",
    "wuestencamp-luxus-oder-standard": "luxury-vs-standard-desert-camp-morocco",
    "hoehenkrankheit-toubkal": "altitude-sickness-toubkal-guide",
    "marokko-mit-kindern-familienreise": "morocco-with-kids-family-guide",
    "kameltrekking-sahara-marokko": "morocco-camel-trek-sahara-guide",
    "toubkal-trek-2-tage-kosten": "toubkal-2-day-trek-cost",
    "toubkal-trek-4-tage-kosten": "toubkal-4-day-trek-cost",
    "toubkal-runde-ifni-see-kosten": "toubkal-circuit-ifni-lake-cost",
    "toubkal-bergfuehrer-kosten": "toubkal-guide-cost",
    "marrakesch-chefchaouen-tour-kosten": "marrakech-to-chefchaouen-tour-cost",
    "sahara-tour-3-tage-marrakesch-kosten": "3-day-sahara-tour-cost-marrakech",
    "sahara-tour-agadir-kosten": "sahara-tour-from-agadir-cost",
    "familien-wuestentour-marokko-kosten": "family-desert-tour-morocco-cost",
    "toubkal-drei-gipfel-trek-kosten": "toubkal-three-peaks-trek-cost",
    "mgoun-massiv-trek-kosten": "mgoun-massif-trek-cost",
    "hoher-atlas-grand-traverse-kosten": "high-atlas-grand-traverse-cost",
    "toubkal-sahara-5-tage-kosten": "toubkal-sahara-5day-cost",
    "hoher-atlas-dorftrek-kosten": "high-atlas-village-trek-cost",
    "marokko-tour-preis-gruppengroesse": "morocco-tour-price-group-size",
    "wuestentour-privat-oder-geteilt": "private-vs-shared-desert-tour-morocco",
    "marokko-tour-direkt-oder-plattform-buchen": "booking-morocco-tour-direct-vs-platform",
    "was-man-in-marokko-machen-kann": "best-things-to-do-in-morocco",
    "gruppentouren-marokko": "shared-group-tours-morocco-guide",
    "kochkurs-marrakesch": "moroccan-cooking-class-marrakech-guide",
    "marokko-festivals-kalender-nach-monat": "morocco-festivals-calendar-by-month",
    "fortbewegung-in-marokko-verkehrsmittel": "getting-around-morocco-transport-guide",
    "wetter-sahara-wueste-marokko": "sahara-desert-weather-what-to-expect",
  },
  it: {
    "itinerario-7-giorni-marocco-da-agadir": "7-day-agadir-itinerary-morocco",
    "campo-deserto-lusso-o-standard": "luxury-vs-standard-desert-camp-morocco",
    "mal-di-montagna-toubkal": "altitude-sickness-toubkal-guide",
    "marocco-con-bambini-guida-famiglie": "morocco-with-kids-family-guide",
    "trekking-cammello-sahara-marocco": "morocco-camel-trek-sahara-guide",
    "prezzo-trek-toubkal-2-giorni": "toubkal-2-day-trek-cost",
    "prezzo-trek-toubkal-4-giorni": "toubkal-4-day-trek-cost",
    "prezzo-circuito-toubkal-lago-ifni": "toubkal-circuit-ifni-lake-cost",
    "prezzo-guida-toubkal": "toubkal-guide-cost",
    "prezzo-tour-marrakech-chefchaouen": "marrakech-to-chefchaouen-tour-cost",
    "prezzo-tour-sahara-3-giorni-marrakech": "3-day-sahara-tour-cost-marrakech",
    "prezzo-tour-sahara-agadir": "sahara-tour-from-agadir-cost",
    "prezzo-tour-deserto-famiglia-marocco": "family-desert-tour-morocco-cost",
    "prezzo-trek-tre-cime-toubkal": "toubkal-three-peaks-trek-cost",
    "prezzo-trek-massiccio-mgoun": "mgoun-massif-trek-cost",
    "prezzo-grande-traversata-alto-atlante": "high-atlas-grand-traverse-cost",
    "prezzo-toubkal-sahara-5-giorni": "toubkal-sahara-5day-cost",
    "prezzo-trek-villaggi-alto-atlante": "high-atlas-village-trek-cost",
    "prezzo-tour-marocco-dimensione-gruppo": "morocco-tour-price-group-size",
    "tour-deserto-privato-o-condiviso": "private-vs-shared-desert-tour-morocco",
    "prenotare-tour-marocco-diretto-o-piattaforma": "booking-morocco-tour-direct-vs-platform",
    "cosa-fare-in-marocco": "best-things-to-do-in-morocco",
    "tour-condivisi-marocco": "shared-group-tours-morocco-guide",
    "corso-di-cucina-marrakech": "moroccan-cooking-class-marrakech-guide",
    "calendario-festival-marocco-per-mese": "morocco-festivals-calendar-by-month",
    "spostarsi-in-marocco-trasporti": "getting-around-morocco-transport-guide",
    "clima-deserto-sahara-marocco": "sahara-desert-weather-what-to-expect",
  },
};

/** localised segment -> English slug. Tours. Generated; see scripts. */
const TOUR_TO_EN: Record<string, Record<string, string>> = {
  fr: {
    "desert-merzouga-3-jours-partage": "shared-merzouga-3day-marrakech",
    "desert-zagora-2-jours-partage": "shared-zagora-2day-marrakech",
    "excursion-partagee-cascades-ouzoud": "shared-ouzoud-waterfalls-day-trip",
    "agafay-diner-dromadaire-spectacle-feu": "shared-agafay-dinner-camel-ride",
    "excursion-partagee-essaouira": "shared-essaouira-day-trip",
    "trek-sommet-toubkal-4-jours": "toubkal-summit-trek-4day",
    "circuit-desert-3-jours-marrakech": "sahara-3day-marrakech",
    "randonnee-vallee-ourika-journee": "ourika-valley-day-hike",
    "excursion-cascades-ouzoud": "ouzoud-waterfalls-day-trip",
    "coucher-soleil-desert-agafay": "agafay-desert-sunset",
    "visite-culturelle-medina-marrakech": "marrakech-medina-cultural-tour",
    "marrakech-fes-3-jours": "marrakech-to-fes-3day",
    "trek-massif-mgoun-7-jours": "mgoun-massif-trek",
    "paradise-valley-agadir-journee": "paradise-valley-agadir",
    "parc-national-souss-massa": "sous-massa-national-park",
    "excursion-taroudant-agadir": "taroudant-day-trip-agadir",
    "cours-surf-agadir": "agadir-surf-lesson",
    "trek-anti-atlas-agadir": "anti-atlas-trekking-agadir",
    "circuit-desert-2-jours-agadir": "sahara-2day-agadir",
    "circuit-culturel-vallee-souss": "souss-valley-cultural-tour",
    "excursion-essaouira-agadir": "agadir-to-essaouira-day-trip",
    "marrakech-chefchaouen-4-jours": "marrakech-to-chefchaouen-4day",
    "villes-imperiales-marrakech-5-jours": "marrakech-imperial-cities-5day",
    "circuit-zagora-2-jours-marrakech": "zagora-2day-marrakech",
    "erg-chegaga-3-jours-marrakech": "erg-chegaga-3day-marrakech",
    "circuit-desert-4-jours-marrakech": "desert-4day-marrakech",
    "merzouga-3-jours-agadir": "merzouga-3day-agadir",
    "circuit-zagora-2-jours-agadir": "zagora-2day-agadir",
    "erg-chegaga-3-jours-agadir": "erg-chegaga-3day-agadir",
    "circuit-desert-4-jours-agadir": "desert-4day-agadir",
    "agadir-fes-4-jours": "agadir-to-fes-4day",
    "agadir-chefchaouen-5-jours": "agadir-to-chefchaouen-5day",
    "villes-imperiales-agadir-6-jours": "agadir-imperial-cities-6day",
    "circuit-toubkal-lac-ifni-6-jours": "toubkal-circuit-ifni-lake-6day",
    "ascension-toubkal-2-jours": "toubkal-summit-2day-marrakech",
    "toubkal-col-aguelzim-3-jours": "toubkal-aguelzim-pass-3day",
    "toubkal-trois-sommets-4000m-3-jours": "toubkal-three-peaks-4000m-3day",
    "visite-gastronomique-marrakech": "marrakech-food-market-tour",
    "nuit-etoilee-merzouga": "merzouga-stargazing-desert-tour",
    "trek-vallee-azzaden-2-jours": "azzaden-valley-2day-trek",
    "trek-villages-haut-atlas-3-jours": "atlas-mountains-3day-trek",
    "trek-atlas-famille-4-jours": "family-atlas-4day-trek",
    "circuit-desert-famille-4-jours": "family-desert-4day-marrakech",
    "grande-traversee-haut-atlas-15-jours": "high-atlas-grand-traverse-15day",
    "toubkal-sahara-5-jours": "toubkal-summit-sahara-5day",
    "trek-chameau-chegaga-8-jours": "chegaga-camel-trek-8day",
    "toubkal-sahara-8-jours-maroc": "morocco-highlights-toubkal-sahara-8day",
  },
  es: {
    "desierto-merzouga-3-dias-compartido": "shared-merzouga-3day-marrakech",
    "desierto-zagora-2-dias-compartido": "shared-zagora-2day-marrakech",
    "excursion-compartida-cascadas-ouzoud": "shared-ouzoud-waterfalls-day-trip",
    "agafay-cena-camello-espectaculo-fuego": "shared-agafay-dinner-camel-ride",
    "excursion-compartida-essaouira": "shared-essaouira-day-trip",
    "trek-cumbre-toubkal-4-dias": "toubkal-summit-trek-4day",
    "tour-desierto-3-dias-marrakech": "sahara-3day-marrakech",
    "senderismo-valle-ourika": "ourika-valley-day-hike",
    "excursion-cascadas-ouzoud": "ouzoud-waterfalls-day-trip",
    "atardecer-desierto-agafay": "agafay-desert-sunset",
    "tour-cultural-medina-marrakech": "marrakech-medina-cultural-tour",
    "marrakech-fez-3-dias": "marrakech-to-fes-3day",
    "trek-macizo-mgoun-7-dias": "mgoun-massif-trek",
    "paradise-valley-agadir-dia": "paradise-valley-agadir",
    "parque-nacional-souss-massa": "sous-massa-national-park",
    "excursion-taroudant-agadir": "taroudant-day-trip-agadir",
    "clase-surf-agadir": "agadir-surf-lesson",
    "trek-anti-atlas-agadir": "anti-atlas-trekking-agadir",
    "tour-desierto-2-dias-agadir": "sahara-2day-agadir",
    "tour-cultural-valle-souss": "souss-valley-cultural-tour",
    "excursion-essaouira-agadir": "agadir-to-essaouira-day-trip",
    "marrakech-chefchaouen-4-dias": "marrakech-to-chefchaouen-4day",
    "ciudades-imperiales-marrakech-5-dias": "marrakech-imperial-cities-5day",
    "tour-zagora-2-dias-marrakech": "zagora-2day-marrakech",
    "erg-chegaga-3-dias-marrakech": "erg-chegaga-3day-marrakech",
    "tour-desierto-4-dias-marrakech": "desert-4day-marrakech",
    "merzouga-3-dias-agadir": "merzouga-3day-agadir",
    "tour-zagora-2-dias-agadir": "zagora-2day-agadir",
    "erg-chegaga-3-dias-agadir": "erg-chegaga-3day-agadir",
    "tour-desierto-4-dias-agadir": "desert-4day-agadir",
    "agadir-fez-4-dias": "agadir-to-fes-4day",
    "agadir-chefchaouen-5-dias": "agadir-to-chefchaouen-5day",
    "ciudades-imperiales-agadir-6-dias": "agadir-imperial-cities-6day",
    "circuito-toubkal-lago-ifni-6-dias": "toubkal-circuit-ifni-lake-6day",
    "ascension-toubkal-2-dias": "toubkal-summit-2day-marrakech",
    "toubkal-collado-aguelzim-3-dias": "toubkal-aguelzim-pass-3day",
    "toubkal-tres-cumbres-4000m-3-dias": "toubkal-three-peaks-4000m-3day",
    "tour-gastronomico-marrakech": "marrakech-food-market-tour",
    "noche-estrellas-merzouga": "merzouga-stargazing-desert-tour",
    "trek-valle-azzaden-2-dias": "azzaden-valley-2day-trek",
    "trek-pueblos-alto-atlas-3-dias": "atlas-mountains-3day-trek",
    "trek-atlas-familia-4-dias": "family-atlas-4day-trek",
    "tour-desierto-familia-4-dias": "family-desert-4day-marrakech",
    "gran-travesia-alto-atlas-15-dias": "high-atlas-grand-traverse-15day",
    "toubkal-sahara-5-dias": "toubkal-summit-sahara-5day",
    "trek-camellos-chegaga-8-dias": "chegaga-camel-trek-8day",
    "toubkal-sahara-8-dias-marruecos": "morocco-highlights-toubkal-sahara-8day",
  },
  de: {
    "merzouga-wueste-3-tage-geteilt": "shared-merzouga-3day-marrakech",
    "zagora-wueste-2-tage-geteilt": "shared-zagora-2day-marrakech",
    "ouzoud-wasserfaelle-gruppentour": "shared-ouzoud-waterfalls-day-trip",
    "agafay-abendessen-kamelritt-feuershow": "shared-agafay-dinner-camel-ride",
    "essaouira-gruppentagestour": "shared-essaouira-day-trip",
    "toubkal-gipfel-trek-4-tage": "toubkal-summit-trek-4day",
    "wuestentour-3-tage-marrakesch": "sahara-3day-marrakech",
    "wanderung-ourika-tal": "ourika-valley-day-hike",
    "ausflug-ouzoud-wasserfaelle": "ouzoud-waterfalls-day-trip",
    "sonnenuntergang-agafay-wueste": "agafay-desert-sunset",
    "kulturtour-medina-marrakesch": "marrakech-medina-cultural-tour",
    "marrakesch-fes-3-tage": "marrakech-to-fes-3day",
    "mgoun-massiv-trek-7-tage": "mgoun-massif-trek",
    "paradise-valley-agadir-tagestour": "paradise-valley-agadir",
    "nationalpark-souss-massa": "sous-massa-national-park",
    "ausflug-taroudant-agadir": "taroudant-day-trip-agadir",
    "surfkurs-agadir": "agadir-surf-lesson",
    "anti-atlas-trekking-agadir": "anti-atlas-trekking-agadir",
    "wuestentour-2-tage-agadir": "sahara-2day-agadir",
    "kulturtour-souss-tal": "souss-valley-cultural-tour",
    "ausflug-essaouira-agadir": "agadir-to-essaouira-day-trip",
    "marrakesch-chefchaouen-4-tage": "marrakech-to-chefchaouen-4day",
    "koenigsstaedte-marrakesch-5-tage": "marrakech-imperial-cities-5day",
    "zagora-tour-2-tage-marrakesch": "zagora-2day-marrakech",
    "erg-chegaga-3-tage-marrakesch": "erg-chegaga-3day-marrakech",
    "wuestentour-4-tage-marrakesch": "desert-4day-marrakech",
    "merzouga-3-tage-agadir": "merzouga-3day-agadir",
    "zagora-tour-2-tage-agadir": "zagora-2day-agadir",
    "erg-chegaga-3-tage-agadir": "erg-chegaga-3day-agadir",
    "wuestentour-4-tage-agadir": "desert-4day-agadir",
    "agadir-fes-4-tage": "agadir-to-fes-4day",
    "agadir-chefchaouen-5-tage": "agadir-to-chefchaouen-5day",
    "koenigsstaedte-agadir-6-tage": "agadir-imperial-cities-6day",
    "toubkal-runde-ifni-see-6-tage": "toubkal-circuit-ifni-lake-6day",
    "toubkal-besteigung-2-tage": "toubkal-summit-2day-marrakech",
    "toubkal-aguelzim-pass-3-tage": "toubkal-aguelzim-pass-3day",
    "toubkal-drei-gipfel-4000m-3-tage": "toubkal-three-peaks-4000m-3day",
    "kulinarische-tour-marrakesch": "marrakech-food-market-tour",
    "sternenhimmel-merzouga": "merzouga-stargazing-desert-tour",
    "azzaden-tal-trek-2-tage": "azzaden-valley-2day-trek",
    "hoher-atlas-dorftrek-3-tage": "atlas-mountains-3day-trek",
    "familien-atlas-trek-4-tage": "family-atlas-4day-trek",
    "familien-wuestentour-4-tage": "family-desert-4day-marrakech",
    "hoher-atlas-durchquerung-15-tage": "high-atlas-grand-traverse-15day",
    "toubkal-sahara-5-tage": "toubkal-summit-sahara-5day",
    "kameltrekking-chegaga-8-tage": "chegaga-camel-trek-8day",
    "toubkal-sahara-8-tage-marokko": "morocco-highlights-toubkal-sahara-8day",
  },
  it: {
    "deserto-merzouga-3-giorni-condiviso": "shared-merzouga-3day-marrakech",
    "deserto-zagora-2-giorni-condiviso": "shared-zagora-2day-marrakech",
    "escursione-condivisa-cascate-ouzoud": "shared-ouzoud-waterfalls-day-trip",
    "agafay-cena-cammello-spettacolo-fuoco": "shared-agafay-dinner-camel-ride",
    "escursione-condivisa-essaouira": "shared-essaouira-day-trip",
    "trek-cima-toubkal-4-giorni": "toubkal-summit-trek-4day",
    "tour-deserto-3-giorni-marrakech": "sahara-3day-marrakech",
    "escursione-valle-ourika": "ourika-valley-day-hike",
    "gita-cascate-ouzoud": "ouzoud-waterfalls-day-trip",
    "tramonto-deserto-agafay": "agafay-desert-sunset",
    "tour-culturale-medina-marrakech": "marrakech-medina-cultural-tour",
    "marrakech-fes-3-giorni": "marrakech-to-fes-3day",
    "trek-massiccio-mgoun-7-giorni": "mgoun-massif-trek",
    "paradise-valley-agadir-giornata": "paradise-valley-agadir",
    "parco-nazionale-souss-massa": "sous-massa-national-park",
    "gita-taroudant-agadir": "taroudant-day-trip-agadir",
    "lezione-surf-agadir": "agadir-surf-lesson",
    "trek-anti-atlante-agadir": "anti-atlas-trekking-agadir",
    "tour-deserto-2-giorni-agadir": "sahara-2day-agadir",
    "tour-culturale-valle-souss": "souss-valley-cultural-tour",
    "gita-essaouira-agadir": "agadir-to-essaouira-day-trip",
    "marrakech-chefchaouen-4-giorni": "marrakech-to-chefchaouen-4day",
    "citta-imperiali-marrakech-5-giorni": "marrakech-imperial-cities-5day",
    "tour-zagora-2-giorni-marrakech": "zagora-2day-marrakech",
    "erg-chegaga-3-giorni-marrakech": "erg-chegaga-3day-marrakech",
    "tour-deserto-4-giorni-marrakech": "desert-4day-marrakech",
    "merzouga-3-giorni-agadir": "merzouga-3day-agadir",
    "tour-zagora-2-giorni-agadir": "zagora-2day-agadir",
    "erg-chegaga-3-giorni-agadir": "erg-chegaga-3day-agadir",
    "tour-deserto-4-giorni-agadir": "desert-4day-agadir",
    "agadir-fes-4-giorni": "agadir-to-fes-4day",
    "agadir-chefchaouen-5-giorni": "agadir-to-chefchaouen-5day",
    "citta-imperiali-agadir-6-giorni": "agadir-imperial-cities-6day",
    "circuito-toubkal-lago-ifni-6-giorni": "toubkal-circuit-ifni-lake-6day",
    "salita-toubkal-2-giorni": "toubkal-summit-2day-marrakech",
    "toubkal-passo-aguelzim-3-giorni": "toubkal-aguelzim-pass-3day",
    "toubkal-tre-cime-4000m-3-giorni": "toubkal-three-peaks-4000m-3day",
    "tour-gastronomico-marrakech": "marrakech-food-market-tour",
    "notte-stellata-merzouga": "merzouga-stargazing-desert-tour",
    "trek-valle-azzaden-2-giorni": "azzaden-valley-2day-trek",
    "trek-villaggi-alto-atlante-3-giorni": "atlas-mountains-3day-trek",
    "trek-atlante-famiglia-4-giorni": "family-atlas-4day-trek",
    "tour-deserto-famiglia-4-giorni": "family-desert-4day-marrakech",
    "grande-traversata-alto-atlante-15-giorni": "high-atlas-grand-traverse-15day",
    "toubkal-sahara-5-giorni": "toubkal-summit-sahara-5day",
    "trek-cammelli-chegaga-8-giorni": "chegaga-camel-trek-8day",
    "toubkal-sahara-8-giorni-marocco": "morocco-highlights-toubkal-sahara-8day",
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
