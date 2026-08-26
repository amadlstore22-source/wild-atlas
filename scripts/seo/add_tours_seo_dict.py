# -*- coding: utf-8 -*-
"""Give /[lang]/tours a per-locale title and description.

THE DEFECT
----------
app/[lang]/tours/page.tsx hardcoded:

    title: "All Tours — Morocco Adventures"
    description: "Browse 30+ guided tours across Morocco — ..."

...for every locale. So /fr/tours, /es/tours, /de/tours, /it/tours and /ar/tours
all served French, Spanish, German, Italian and Arabic content under one
identical ENGLISH <title>. Six translations of the same page competing on the
same string is the exact problem hreflang exists to prevent, and it undercuts
the hreflang cluster the page already declares two lines below.

This is the same defect that was already fixed for /about, whose generateMetadata
carries the note: "These were hardcoded English, so /fr/about served French
content under an English <title> and all six locales competed on one identical
string." The tours index kept the bug because nothing checked for it.

The dictionaries already carry `seo.about`, `seo.destinations`, `seo.guides`
and `seo.home`. `seo.tours` was simply missing, so this adds it in the same
shape and the page reads it like the others do.

COUNT
-----
"30+" is kept rather than hardcoding 46: the catalogue grows, and a number in
six JSON files drifts the moment a tour is added.

RUN
---
    PYTHONIOENCODING=utf-8 py scripts/seo/add_tours_seo_dict.py
"""
import io
import json
import collections

# Titles are budgeted to ~39 chars: the layout template appends
# " | Marrakech Eco Tours" (22 chars) to whatever the page returns.
TOURS_SEO = {
    "en": {
        "title": "All Morocco Tours — Atlas & Sahara",
        "description": "Browse 30+ guided tours across Morocco — Atlas trekking, "
                       "Sahara nights, cultural and day trips from Marrakech and "
                       "Agadir. Licensed Berber guides.",
    },
    "fr": {
        "title": "Tous nos circuits au Maroc",
        "description": "Plus de 30 circuits guidés au Maroc — treks de l’Atlas, "
                       "nuits dans le Sahara, excursions culturelles depuis Marrakech "
                       "et Agadir. Guides berbères agréés.",
    },
    "es": {
        "title": "Todos los tours por Marruecos",
        "description": "Más de 30 tours guiados por Marruecos — trekking en el "
                       "Atlas, noches en el Sáhara y excursiones culturales desde "
                       "Marrakech y Agadir. Guías bereberes.",
    },
    "de": {
        "title": "Alle Marokko-Touren im Überblick",
        "description": "Über 30 geführte Touren durch Marokko — Atlas-Trekking, "
                       "Sahara-Nächte, Kultur- und Tagesausflüge ab Marrakesch und "
                       "Agadir. Lizenzierte Berber-Guides.",
    },
    "it": {
        "title": "Tutti i tour in Marocco",
        "description": "Oltre 30 tour guidati in Marocco — trekking sull’Atlante, "
                       "notti nel Sahara, escursioni culturali da Marrakech e "
                       "Agadir. Guide berbere autorizzate.",
    },
    "ar": {
        "title": "جميع جولاتنا في المغرب",
        "description": "أكثر من 30 جولة مُرشدة في المغرب — رحلات الأطلس، ليالٍ في "
                       "الصحراء، وجولات ثقافية انطلاقًا من مراكش وأكادير. مرشدون "
                       "أمازيغ مرخّصون.",
    },
}


def run():
    for lang, payload in TOURS_SEO.items():
        path = "dictionaries/%s.json" % lang
        # object_pairs_hook keeps key order stable so the diff shows only the
        # added block instead of reshuffling the whole file.
        data = json.load(io.open(path, encoding="utf-8"),
                         object_pairs_hook=collections.OrderedDict)
        seo = data.setdefault("seo", collections.OrderedDict())
        seo["tours"] = collections.OrderedDict(
            [("title", payload["title"]), ("description", payload["description"])]
        )
        out = json.dumps(data, ensure_ascii=False, indent=2) + "\n"
        io.open(path, "w", encoding="utf-8", newline="\n").write(out)
        print("  %-22s title %2d  desc %3d" % (path, len(payload["title"]) + 22,
                                               len(payload["description"])))


run()
