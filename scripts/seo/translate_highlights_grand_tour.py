# -*- coding: utf-8 -*-
"""Translate the 8-day Toubkal + Sahara fixed departure into all five locales.

WHY THE ENTRIES ARE SHORT
-------------------------
mergeWithEn() in lib/tours-i18n.ts layers each locale record over the English
one FIELD BY FIELD, so anything a locale omits falls back to English rather
than to undefined. A locale entry therefore only needs the identity keys plus
the fields a reader actually sees in their language. Itinerary, includes and
excludes are translated because they are the body of the page; numbers,
coordinates and prices are left to fall through so they cannot drift.

`slug` is NEVER translated -- it is the key the merge joins on, and a
translated slug silently matches nothing and drops the tour back to English.
`localizedSlug` is the URL segment, and must match the TOUR_SLUGS_* map in
proxy.ts exactly or the English URL 308s to a 404.

RUN
---
    PYTHONIOENCODING=utf-8 py scripts/seo/translate_highlights_grand_tour.py
"""
import io

EN_SLUG = "morocco-highlights-toubkal-sahara-8day"

# locale -> (localizedSlug, title, duration, groupSize, shortDescription,
#            description, seoTitle, seoDescription)
LOCALES = {
    "fr": {
        "localizedSlug": "toubkal-sahara-8-jours-maroc",
        "title": "Maroc en 8 jours : sommet du Toubkal et désert du Sahara",
        "duration": "8 jours / 7 nuits",
        "groupSize": "Jusqu'à 14 personnes",
        "shortDescription": "Le plus haut sommet d'Afrique du Nord et les dunes de l'erg Chebbi en un seul voyage de 8 jours, sur des départs fixes de 14 places.",
        "description": "C'est le voyage qui réunit les deux extrêmes du Maroc en une semaine : le Jbel Toubkal à 4 167 m et la mer de sable de l'erg Chebbi. Vous partez et revenez d'un riad de Marrakech, montez au refuge du Toubkal et atteignez le sommet au lever du soleil, puis quittez la montagne vers le sud par Aït Ben Haddou, les gorges du Dadès et du Todra jusqu'au désert, à dos de dromadaire pour une nuit sous tente. C'est un seul itinéraire continu avec un seul guide, et c'est pourquoi il fonctionne en huit jours plutôt qu'en deux circuits juxtaposés. Contrairement à nos départs privés, celui-ci part à dates fixes avec un nombre de places limité.",
        "seoTitle": "Toubkal et Sahara — Circuit de 8 jours",
        "seoDescription": "Le Toubkal (4 167 m) et les dunes de l'erg Chebbi en 8 jours depuis Marrakech. Cinq départs fixes dès mars 2027, 14 places, €889 pp — au lieu de €921.",
    },
    "es": {
        "localizedSlug": "toubkal-sahara-8-dias-marruecos",
        "title": "Marruecos en 8 días: cumbre del Toubkal y desierto del Sáhara",
        "duration": "8 días / 7 noches",
        "groupSize": "Hasta 14 personas",
        "shortDescription": "La cumbre más alta del norte de África y las dunas de Erg Chebbi en un solo viaje de 8 días, en salidas fijas de 14 plazas.",
        "description": "Este es el viaje que reúne los dos extremos de Marruecos en una sola semana: el Yebel Toubkal a 4.167 m y el mar de arena de Erg Chebbi. Empiezas y terminas en un riad de Marrakech, subes al refugio del Toubkal y haces cumbre al amanecer, y después bajas de la montaña hacia el sur por Ait Ben Haddou y las gargantas del Dades y del Todra hasta el desierto, entrando en las dunas a lomos de camello para pasar la noche bajo una jaima. Es una sola ruta continua con un solo guía, y por eso funciona como ocho días y no como dos circuitos pegados. A diferencia de nuestras salidas privadas, esta va en fechas fijas y con un número limitado de plazas.",
        "seoTitle": "Toubkal y Sáhara — Circuito de 8 días",
        "seoDescription": "El Toubkal (4.167 m) y las dunas de Erg Chebbi en 8 días desde Marrakech. Cinco salidas fijas desde marzo de 2027, 14 plazas, €889 pp — antes €921.",
    },
    "de": {
        "localizedSlug": "toubkal-sahara-8-tage-marokko",
        "title": "Marokko in 8 Tagen: Toubkal-Gipfel und Sahara-Wüste",
        "duration": "8 Tage / 7 Nächte",
        "groupSize": "Bis zu 14 Personen",
        "shortDescription": "Der höchste Gipfel Nordafrikas und die Dünen des Erg Chebbi in einer 8-tägigen Reise, mit festen Terminen und 14 Plätzen.",
        "description": "Diese Reise bringt Marokkos zwei Extreme in einer Woche zusammen: den Jbel Toubkal auf 4.167 m und das Sandmeer des Erg Chebbi. Start und Ziel ist ein Riad in Marrakesch. Sie steigen zur Toubkal-Hütte auf und stehen bei Sonnenaufgang auf dem Gipfel, verlassen dann die Berge Richtung Süden über Ait Ben Haddou sowie die Dades- und Todra-Schluchten bis in die Wüste und reiten auf Kamelen in die Dünen zur Übernachtung im Zeltcamp. Es ist eine durchgehende Route mit einem Guide — deshalb funktioniert sie als acht Tage und nicht als zwei aneinandergehängte Touren. Anders als unsere privaten Touren hat diese feste Termine und eine begrenzte Platzzahl.",
        "seoTitle": "Toubkal und Sahara — 8-Tage-Rundreise",
        "seoDescription": "Toubkal (4.167 m) und die Dünen des Erg Chebbi in 8 Tagen ab Marrakesch. Fünf feste Termine ab März 2027, 14 Plätze, €889 p. P. — statt €921.",
    },
    "it": {
        "localizedSlug": "toubkal-sahara-8-giorni-marocco",
        "title": "Marocco in 8 giorni: cima del Toubkal e deserto del Sahara",
        "duration": "8 giorni / 7 notti",
        "groupSize": "Fino a 14 persone",
        "shortDescription": "La cima più alta del Nord Africa e le dune di Erg Chebbi in un unico viaggio di 8 giorni, con partenze fisse da 14 posti.",
        "description": "È il viaggio che mette insieme i due estremi del Marocco in una sola settimana: il Jbel Toubkal a 4.167 m e il mare di sabbia di Erg Chebbi. Si parte e si torna in un riad di Marrakech, si sale al rifugio del Toubkal e si raggiunge la vetta all'alba, poi si scende dalla montagna verso sud passando per Ait Ben Haddou e le gole del Dades e del Todra fino al deserto, entrando fra le dune a dorso di cammello per una notte in tenda. È un unico itinerario continuo con una sola guida: per questo funziona come otto giorni e non come due tour accostati. A differenza delle nostre partenze private, questa ha date fisse e un numero limitato di posti.",
        "seoTitle": "Toubkal e Sahara — Tour di 8 giorni",
        "seoDescription": "Toubkal (4.167 m) e le dune di Erg Chebbi in 8 giorni da Marrakech. Cinque partenze fisse da marzo 2027, 14 posti, €889 a persona — anziché €921.",
    },
    "ar": {
        # Arabic keeps the English URL segment, like every other tour in
        # lib/tours.ar.ts -- there is no TOUR_SLUGS_AR map in proxy.ts.
        "localizedSlug": None,
        "title": "المغرب في 8 أيام: قمة توبقال وصحراء مرزوقة",
        "duration": "8 أيام / 7 ليالٍ",
        "groupSize": "حتى 14 شخصًا",
        "shortDescription": "أعلى قمة في شمال أفريقيا وكثبان عرق الشبي في رحلة واحدة من 8 أيام، بمواعيد ثابتة و14 مقعدًا.",
        "description": "هذه الرحلة تجمع بين نقيضَي المغرب في أسبوع واحد: جبل توبقال على ارتفاع 4167 م، وبحر الرمال في عرق الشبي. تبدأ وتنتهي في رياض بمراكش، تصعد إلى ملجأ توبقال وتبلغ القمة عند شروق الشمس، ثم تنزل من الجبال جنوبًا عبر آيت بن حدو ومضيقي دادس وتودغة حتى الصحراء، وتدخل الكثبان على ظهر الجمال لتقضي ليلة في مخيم. إنه مسار واحد متصل مع مرشد واحد، ولهذا ينجح كثمانية أيام لا كجولتين ملصقتين. وخلافًا لرحلاتنا الخاصة، تنطلق هذه في مواعيد ثابتة وبعدد مقاعد محدود.",
        "seoTitle": "توبقال والصحراء — جولة 8 أيام",
        "seoDescription": "توبقال (4167 م) وكثبان عرق الشبي في 8 أيام من مراكش. خمسة مواعيد ثابتة من مارس 2027، 14 مقعدًا، €889 للشخص — بدلًا من €921.",
    },
}


def entry(loc, d):
    """A minimal locale record: identity keys + the fields a reader sees."""
    slug_line = ""
    if d["localizedSlug"]:
        slug_line = '    localizedSlug: "%s",\n' % d["localizedSlug"]
    return (
        '  {\n'
        '    id: "47",\n'
        '    // NEVER translate `slug` -- it is the key mergeWithEn() joins on.\n'
        '    slug: "%s",\n'
        '%s'
        '    title: "%s",\n'
        '    duration: "%s",\n'
        '    groupSize: "%s",\n'
        '    shortDescription:\n      "%s",\n'
        '    description:\n      "%s",\n'
        '    seoTitle: "%s",\n'
        '    seoDescription:\n      "%s",\n'
        '  },\n'
        % (
            EN_SLUG,
            slug_line,
            d["title"],
            d["duration"],
            d["groupSize"],
            d["shortDescription"],
            d["description"],
            d["seoTitle"],
            d["seoDescription"],
        )
    )


def run():
    for loc, d in LOCALES.items():
        path = "lib/tours.%s.ts" % loc
        src = io.open(path, encoding="utf-8").read()
        assert EN_SLUG not in src, "%s already has the tour" % path
        # Append as the last element of the exported TOURS array.
        assert src.rstrip().endswith("];"), "%s does not end with the array" % path
        stripped = src.rstrip()
        body = stripped[: stripped.rfind("];")]
        src = body + entry(loc, d) + "];\n"
        io.open(path, "w", encoding="utf-8", newline="\n").write(src)
        print("  %s  %s" % (loc, d["localizedSlug"] or "(english slug)"))


run()
