# -*- coding: utf-8 -*-
"""Add the two event-module headings to dictionaries/*.json.

`whyGo` heads the highlights list and `beforeYouGo` heads the considerations.

The phrasing deliberately avoids Intrepid's "Why you'll love this trip" and
"Is this trip right for you?". Those are their brand voice; this site's existing
event copy is plainer and more direct ("Tours we run for this", "Some of the
best days in Morocco are fixed to a calendar we do not control"), so the new
headings match that register instead of importing someone else's.

`beforeYouGo` is phrased as information the reader needs, not as a warning or a
disclaimer, because the list is a credibility device: a festival page that lists
only upsides is worth nothing to someone deciding whether to reshape a trip.

RUN
---
    PYTHONIOENCODING=utf-8 py scripts/seo/add_event_module_headings.py
"""
import collections
import io
import json

HEADINGS = {
    "en": {"whyGo": "Why this date is worth it", "beforeYouGo": "What to know before you plan around it"},
    "fr": {"whyGo": "Pourquoi cette date en vaut la peine", "beforeYouGo": "À savoir avant d'organiser votre voyage autour"},
    "es": {"whyGo": "Por qué merece la pena esta fecha", "beforeYouGo": "Lo que conviene saber antes de planificar en torno a ella"},
    "de": {"whyGo": "Warum sich dieser Termin lohnt", "beforeYouGo": "Was Sie wissen sollten, bevor Sie danach planen"},
    "it": {"whyGo": "Perché vale la pena questa data", "beforeYouGo": "Cosa sapere prima di programmare il viaggio"},
    "ar": {"whyGo": "لماذا يستحق هذا الموعد", "beforeYouGo": "ما ينبغي معرفته قبل التخطيط حوله"},
}


def run():
    for lang, keys in HEADINGS.items():
        path = "dictionaries/%s.json" % lang
        data = json.load(io.open(path, encoding="utf-8"),
                         object_pairs_hook=collections.OrderedDict)
        events = data.get("events")
        assert events is not None, "%s has no events section" % path
        for key, value in keys.items():
            events[key] = value
        io.open(path, "w", encoding="utf-8", newline="\n").write(
            json.dumps(data, ensure_ascii=False, indent=2) + "\n")
        print("  %-22s %s / %s" % (path, keys["whyGo"], keys["beforeYouGo"]))


run()
