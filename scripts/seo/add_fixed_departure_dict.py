# -*- coding: utf-8 -*-
"""Dictionary keys for the fixed-departure block in the booking sidebar.

WHY THESE ARE NEEDED
--------------------
The 8-day Toubkal + Sahara trip sells set-date seats at a discount off a real
list price. Both facts were emitted as Offer schema (LimitedAvailability,
inventoryLevel, ListPrice) but neither was VISIBLE on the page -- the sidebar
only knows about the group-price ladder.

Google requires structured data to have a visible counterpart, so schema
asserting a 14-seat cap and a EUR921 list price with nothing on the page saying
so is exactly the mismatch its spam policy targets. It is also simply bad for
the buyer, who cannot see the departure dates they are being asked to book.

RUN
---
    PYTHONIOENCODING=utf-8 py scripts/seo/add_fixed_departure_dict.py
"""
import collections
import io
import json

KEYS = {
    "en": {
        "fixedDepartureTitle": "Set departures",
        "fixedDepartureSeats": "{count} seats per departure",
        "fixedDepartureWas": "was {price}",
        "fixedDepartureSave": "Save {price}",
        "fixedDepartureNote": "A set-date group departure, sold by the seat. The price is the same whatever the size of your party.",
    },
    "fr": {
        "fixedDepartureTitle": "Départs à dates fixes",
        "fixedDepartureSeats": "{count} places par départ",
        "fixedDepartureWas": "au lieu de {price}",
        "fixedDepartureSave": "Économisez {price}",
        "fixedDepartureNote": "Un départ de groupe à date fixe, vendu à la place. Le prix est le même quelle que soit la taille de votre groupe.",
    },
    "es": {
        "fixedDepartureTitle": "Salidas en fechas fijas",
        "fixedDepartureSeats": "{count} plazas por salida",
        "fixedDepartureWas": "antes {price}",
        "fixedDepartureSave": "Ahorra {price}",
        "fixedDepartureNote": "Una salida de grupo en fecha fija, vendida por plaza. El precio es el mismo sea cual sea el tamaño de tu grupo.",
    },
    "de": {
        "fixedDepartureTitle": "Feste Termine",
        "fixedDepartureSeats": "{count} Plätze pro Termin",
        "fixedDepartureWas": "statt {price}",
        "fixedDepartureSave": "{price} sparen",
        "fixedDepartureNote": "Eine Gruppenreise mit festem Termin, verkauft pro Platz. Der Preis ist unabhängig von Ihrer Gruppengröße derselbe.",
    },
    "it": {
        "fixedDepartureTitle": "Partenze a date fisse",
        "fixedDepartureSeats": "{count} posti per partenza",
        "fixedDepartureWas": "anziché {price}",
        "fixedDepartureSave": "Risparmia {price}",
        "fixedDepartureNote": "Una partenza di gruppo a data fissa, venduta a posto. Il prezzo è lo stesso qualunque sia la dimensione del tuo gruppo.",
    },
    "ar": {
        "fixedDepartureTitle": "مواعيد ثابتة",
        "fixedDepartureSeats": "{count} مقعدًا لكل موعد",
        "fixedDepartureWas": "بدلًا من {price}",
        "fixedDepartureSave": "وفّر {price}",
        "fixedDepartureNote": "رحلة جماعية بموعد ثابت، تُباع بالمقعد. السعر واحد مهما كان عدد أفراد مجموعتك.",
    },
}


def run():
    for lang, keys in KEYS.items():
        path = "dictionaries/%s.json" % lang
        data = json.load(io.open(path, encoding="utf-8"),
                         object_pairs_hook=collections.OrderedDict)
        booking = data.get("booking")
        assert booking is not None, "%s has no `booking` section" % path
        added = 0
        for k, v in keys.items():
            if k not in booking:
                booking[k] = v
                added += 1
        io.open(path, "w", encoding="utf-8", newline="\n").write(
            json.dumps(data, ensure_ascii=False, indent=2) + "\n")
        print("  %-2s +%d keys" % (lang, added))


run()
