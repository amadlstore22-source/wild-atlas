# -*- coding: utf-8 -*-
"""Bring the remaining dictionary SEO titles inside the SERP budget.

The tour catalogue was fixed earlier (scripts/seo/trim_serp_lengths.py), but the
static pages kept their long titles: 16 of them across six locales render at
66-81 characters once app/[lang]/layout.tsx appends " | Marrakech Eco Tours",
so Google clips the end off every one. /en/destinations was the worst at 77.

seo.home is deliberately untouched: it is returned as `title.absolute`, which
bypasses the template, so its 61-character string renders whole.

Each replacement keeps the distinguishing head of the original and drops the
trailing enumeration, which is the part Google truncates anyway. Nothing is
retranslated -- these are shortened versions of the existing strings, so the
locale voice is preserved.

RUN
---
    PYTHONIOENCODING=utf-8 py scripts/seo/trim_dict_titles.py
"""
import collections
import io
import json

BRAND = 22  # len(" | Marrakech Eco Tours")
LIMIT = 65

TITLES = {
    "en": {
        "about": "A Berber Family Guiding Operation",
        "destinations": "Morocco Destinations — Atlas & Sahara",
        "guides": "Our Licensed Berber Mountain Guides",
    },
    "fr": {
        "about": "Une agence familiale berbère",
        "destinations": "Destinations au Maroc — Atlas, Sahara",
        "guides": "Nos guides de montagne berbères",
    },
    "es": {
        "about": "Una empresa familiar bereber",
        "destinations": "Destinos de Marruecos — Atlas, Sáhara",
        "guides": "Nuestros guías de montaña bereberes",
    },
    "de": {
        "about": "Ein Berber-Familienbetrieb",
        "destinations": "Marokko-Reiseziele — Atlas & Sahara",
        "guides": "Unsere lizenzierten Berber-Guides",
    },
    "it": {
        "about": "Una guida berbera a conduzione familiare",
        "destinations": "Destinazioni in Marocco — Atlante e Sahara",
        "guides": "Le nostre guide berbere abilitate",
    },
    "ar": {
        # Arabic about/guides already fit; only destinations is over.
        "destinations": "وجهات المغرب — الأطلس والصحراء",
    },
}


def run():
    for lang, pages in TITLES.items():
        path = "dictionaries/%s.json" % lang
        data = json.load(io.open(path, encoding="utf-8"),
                         object_pairs_hook=collections.OrderedDict)
        for key, title in pages.items():
            section = data["seo"].get(key)
            assert section is not None, "%s has no seo.%s" % (path, key)
            rendered = len(title) + BRAND
            assert rendered <= LIMIT, "%s/%s still %d chars" % (lang, key, rendered)
            section["title"] = title
            print("  %-2s %-13s %3d  %s" % (lang, key, rendered, title[:46]))
        io.open(path, "w", encoding="utf-8", newline="\n").write(
            json.dumps(data, ensure_ascii=False, indent=2) + "\n")


run()
