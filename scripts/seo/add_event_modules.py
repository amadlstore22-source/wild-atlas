# -*- coding: utf-8 -*-
"""Add `highlights` and `considerations` to every event in lib/events.ts.

WHY
---
The event page ran hero -> description -> list of tours. Nothing in between
made the case for reshaping a trip around a date, so the reader had to infer it.

Both modules are modelled on Intrepid's Morocco trip pages, which put "Why
you'll love this trip" (five concrete highlights) and "Is this trip right for
you?" (Ramadan timing, long drive days, basic accommodation, cold showers)
above the booking mechanics. The second module is the more unusual one and the
better fit here: a festival page listing only upsides reads like every OTA
listing, whereas naming the five-hour drive to Imilchil is what makes the rest
of the page believable.

What is deliberately NOT copied from Intrepid: per-trip star ratings and review
counts, and the live availability calendar. There is no per-event review corpus
and no live inventory feed, and inventing either is the same unsubstantiated
markup already declined for per-tour aggregateRating.

SOURCING
--------
Every line below is derived from the event's own `description`/`dateNote` in
lib/events.ts, or from a fact already stated elsewhere on the site. No new
claims about prices, attendance or logistics.

RUN
---
    PYTHONIOENCODING=utf-8 py scripts/seo/add_event_modules.py
"""
import io

MODULES = {
    "gnaoua-world-music-festival-essaouira": {
        "highlights": [
            "Maalems — Gnaoua master musicians — on open stages across the medina",
            "Free and outdoors: no ticket, no venue, the whole town is the festival",
            "Jazz and world-music guests improvising with Gnaoua groups on the same stage",
            "Essaouira closed to cars, so the walled town is walkable end to end",
            "The medina stays awake until dawn",
        ],
        "considerations": [
            "Essaouira accommodation sells out months ahead — a day trip from Marrakech is often the only realistic way in.",
            "Crowds are heavy and the medina is loud all night; light sleepers should not stay inside the walls.",
            "The 2027 dates are not published yet. We hold the late-June window the festival has used for years and confirm as soon as the organisers announce.",
        ],
    },
    "marrakech-international-marathon": {
        "highlights": [
            "A route through the old city walls, the Palmeraie and the avenues of Gueliz",
            "Full and half marathon, around 15,000 runners",
            "January is the coolest running month of the Moroccan year",
            "The same weeks are prime Toubkal winter-trekking season, so a race weekend pairs with the Atlas",
        ],
        "considerations": [
            "Marrakech hotels raise rates and fill for race weekend; book well before the New Year.",
            "Road closures reshape the city centre on race morning — transfers need to be planned around them.",
            "Pairing the race with a Toubkal trek means winter conditions on the mountain: crampons and an ice axe, not a summer walk.",
        ],
    },
    "rose-festival-kelaat-mgouna": {
        "highlights": [
            "Damask rose harvest at its peak across the Dades valley floor",
            "A moussem with floats, Ait Atta dancing and the crowning of a rose queen",
            "Souks selling the season's rose water and oil, distilled locally",
            "Kelaat M'Gouna sits directly on the Marrakech-to-Sahara road, so a desert tour timed right passes straight through it",
        ],
        "considerations": [
            "Dates are confirmed only a few weeks ahead because they follow the harvest, so a trip built around them carries real date risk.",
            "The town is small and fills completely for the moussem; most visitors stay in Boumalne Dades or pass through on a desert itinerary.",
            "The roses are a working crop. Harvest starts before dawn and the fields are picked out by mid-morning.",
        ],
    },
    "imilchil-marriage-moussem": {
        "highlights": [
            "A High Atlas plateau at around 2,200 m, well off the tourist circuit",
            "First a livestock and goods fair for the surrounding Ait Haddidou villages",
            "The betrothal gathering it is famous for, still run by the community",
            "A working community event rather than a performance staged for visitors",
        ],
        "considerations": [
            "Remote: the approach is a long mountain drive on slow roads, and that journey is most of the commitment.",
            "The exact days are set locally and often announced only weeks ahead, so this is hard to book a flight around.",
            "Accommodation near Imilchil is basic and limited. Expect a gite or a village room, not a hotel.",
            "It is a community occasion, not a show. Photograph people only with their agreement.",
        ],
    },
    "ramadan-and-eid-al-fitr": {
        "highlights": [
            "The medina comes properly alive after the iftar cannon each evening",
            "Atlas villages break the fast together in a way visitors rarely get to see",
            "Trekking is unaffected — guides plan food and water around the fast",
            "Eid al-Fitr closes the month with the biggest celebration of the Moroccan year",
        ],
        "considerations": [
            "Many restaurants stay closed until sunset, and museums and offices keep shorter hours.",
            "Daytime cities are quiet and slow; the energy arrives after dark, which suits some trips and not others.",
            "Start and end dates move with the local moon sighting and are sometimes announced only the evening before.",
            "Eid itself closes much of the country for two to three days, including transport and most shops.",
        ],
    },
    "almond-blossom-anti-atlas": {
        "highlights": [
            "Almond terraces in flower against the pink granite of the Ameln valley",
            "The best walking weather of the Anti-Atlas year: warm days, cold nights",
            "The quietest season on the trails around Tafraoute",
            "Tafraoute holds an almond blossom festival most years",
        ],
        "considerations": [
            "Blossom is a season, not a date. Timing shifts with winter rainfall, and a late year can miss it.",
            "Altitude staggers the display: lower valleys turn first, higher villages up to three weeks later.",
            "Nights are genuinely cold at altitude, and village accommodation is often unheated.",
            "The Tafraoute festival's dates are set locally and are not announced far ahead.",
        ],
    },
}


def render(items, indent="    "):
    body = "".join('%s  "%s",\n' % (indent, s.replace('"', '\\"')) for s in items)
    return body


def run():
    path = "lib/events.ts"
    src = io.open(path, encoding="utf-8").read()
    added = 0

    for slug, mod in MODULES.items():
        marker = '    slug: "%s",' % slug
        assert marker in src, "event %s not found" % slug
        start = src.index(marker)
        # Anchor to this event's bookAheadWeeks line, the last field in the
        # record, so the insert lands inside the right object literal. A
        # whole-file search would hit the next event's field instead.
        anchor = src.index("    bookAheadWeeks:", start)
        end = src.index("\n", anchor) + 1
        assert "highlights:" not in src[start:end], "%s already has modules" % slug

        block = "    highlights: [\n%s    ],\n" % render(mod["highlights"])
        block += "    considerations: [\n%s    ],\n" % render(mod["considerations"])
        src = src[:end] + block + src[end:]
        added += 1
        print("  %-40s %d highlights, %d considerations"
              % (slug, len(mod["highlights"]), len(mod["considerations"])))

    io.open(path, "w", encoding="utf-8", newline="\n").write(src)
    print("added modules to %d events" % added)


run()
