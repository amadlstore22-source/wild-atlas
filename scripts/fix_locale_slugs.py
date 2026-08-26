# -*- coding: utf-8 -*-
"""Repair the slug shape on the three posts just added to the locale files.

Locale posts keep the ENGLISH `slug` and carry the translation in a separate
`localizedSlug` field. proxy.ts redirects /xx/blog/<english> to
/xx/blog/<localizedSlug>, and lib/blog-i18n resolves posts by the English slug.

The generator wrote the localised value into `slug` and omitted
`localizedSlug`, so:
  - blogPostsFor(lc).find(p => p.slug === enSlug) found nothing
  - the proxy pointed at a URL no post claimed

Both guards caught it (localized-slugs and locale-switch), which is the whole
reason they exist. Arabic is untouched: it has no localizedSlug by design.
"""
import io, re

NEW = {
    "morocco-festivals-calendar-by-month": {
        "fr": "calendrier-festivals-maroc-par-mois",
        "es": "calendario-festivales-marruecos-por-mes",
        "de": "marokko-festivals-kalender-nach-monat",
        "it": "calendario-festival-marocco-per-mese",
    },
    "getting-around-morocco-transport-guide": {
        "fr": "se-deplacer-au-maroc-transports",
        "es": "como-moverse-por-marruecos-transporte",
        "de": "fortbewegung-in-marokko-verkehrsmittel",
        "it": "spostarsi-in-marocco-trasporti",
    },
    "sahara-desert-weather-what-to-expect": {
        "fr": "meteo-desert-sahara-maroc",
        "es": "clima-desierto-sahara-marruecos",
        "de": "wetter-sahara-wueste-marokko",
        "it": "clima-deserto-sahara-marocco",
    },
}


def run():
    for loc in ["fr", "es", "de", "it"]:
        path = "lib/blog.%s.part2.ts" % loc
        src = io.open(path, encoding="utf-8").read()
        fixed = 0
        for en_slug, per_loc in NEW.items():
            local = per_loc[loc]
            bad = '    slug: "%s",\n' % local
            if bad not in src:
                continue
            good = '    slug: "%s",\n    localizedSlug: "%s",\n' % (en_slug, local)
            src = src.replace(bad, good, 1)
            fixed += 1
        io.open(path, "w", encoding="utf-8", newline="\n").write(src)
        print("  %-26s %d posts repaired" % (path, fixed))


run()
