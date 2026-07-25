# -*- coding: utf-8 -*-
"""Inject verified `stop:` coordinates into each itinerary day in lib/tours.ts.

One canonical (lat,lng) per Moroccan place. The stop shown for a day is the
day's *destination / headline location* (where you sleep or the day's key sight),
so the map route traces the actual trip. Multi-town driving days pick the
overnight town or the marquee stop, matching how the itinerary reads.
"""
import re

# --- Canonical coordinates (decimal degrees, WGS84). Well-known locations. ---
P = {
    "Marrakech": (31.6295, -7.9811),
    "Imlil": (31.1369, -7.9169),
    "Toubkal Refuge": (31.0782, -7.9192),
    "Jbel Toubkal Summit": (31.0606, -7.9153),
    "Tachedirt": (31.1490, -7.8300),
    "Tacheddirt": (31.1490, -7.8300),
    "Ourika Valley": (31.3170, -7.7500),
    "Ait Ben Haddou": (31.0470, -7.1290),
    "Ouarzazate": (30.9200, -6.8930),
    "Draa Valley": (30.3300, -5.8380),
    "Zagora": (30.3320, -5.8380),
    "Tamegroute": (30.2600, -5.6720),
    "M'Hamid": (29.8280, -5.7180),
    "Erg Chegaga": (29.9280, -5.9280),
    "Erg Chebbi": (31.1000, -3.9800),
    "Merzouga": (31.0990, -4.0130),
    "Todra Gorge": (31.5830, -5.5990),
    "Dades Valley": (31.3560, -6.0100),
    "Dades Gorge": (31.5560, -5.9420),
    "Midelt": (32.6800, -4.7450),
    "Ifrane": (33.5230, -5.1090),
    "Azrou": (33.4370, -5.2210),
    "Fes": (34.0330, -5.0000),
    "Meknes": (33.8930, -5.5470),
    "Volubilis": (34.0740, -5.5540),
    "Chefchaouen": (35.1690, -5.2630),
    "Rabat": (34.0210, -6.8420),
    "Casablanca": (33.5730, -7.5900),
    "Essaouira": (31.5130, -9.7700),
    "Agadir": (30.4280, -9.5980),
    "Taroudant": (30.4720, -8.8770),
    "Taliouine": (30.5300, -7.9250),
    "Taznakht": (30.5730, -7.2020),
    "Tata": (29.7500, -7.9720),
    "Foum Zguid": (30.0870, -6.8680),
    "Tafraoute": (29.7200, -8.9760),
    "Ouzoud": (32.0155, -6.7195),
    "Agafay": (31.4700, -8.1300),
    "Paradise Valley": (30.6870, -9.4180),
    "Sous-Massa": (30.0500, -9.6300),
    "Aguelmam": (33.1600, -5.2200),
    # Trek-specific
    "Ait M'hamed": (31.7470, -6.4370),
    "Ait Bougmez": (31.6440, -6.4470),
    "Agouti": (31.6372, -6.4889),
    "Tarkeddit": (31.5480, -6.4470),
    "Mgoun Summit": (31.5170, -6.4200),
    "Tessaout Gorge": (31.4700, -6.3200),
    "Bou Tharar": (31.4900, -6.1500),
    "Magdaz": (31.4700, -6.2600),
    "Oulilimt": (31.5000, -6.3600),
    "Azib Likemt": (31.1100, -7.8300),
    "Tizi Likemt": (31.1250, -7.8500),
    "Amsouzart": (31.0450, -7.7800),
    "Lake Ifni": (31.0300, -7.8600),
    "Tizi n'Ouanoums": (31.0550, -7.9000),
    "Azzaden Valley": (31.1200, -7.9700),
    "Azib Tamsoult": (31.0900, -7.9500),
    "Aguelzim Pass": (31.0950, -7.9250),
    "Ouanoukrim": (31.0520, -7.9280),
    "Tizi Oussem": (31.1500, -7.9800),
    "Aguersioual": (31.1700, -7.9300),
    "Sous Valley": (30.4000, -8.6000),
}

# --- Per-tour, per-day destination stop (place key from P above). ---
# Only tours WITHOUT stops yet. The 3 flagship tours already have stops.
ROUTES = {
    "sahara-3day-marrakech": {1: "Ouarzazate", 2: "Erg Chebbi", 3: "Marrakech"},
    "marrakech-to-fes-3day": {1: "Midelt", 2: "Fes", 3: "Fes"},
    "anti-atlas-trekking-agadir": {1: "Tafraoute", 2: "Tafraoute", 3: "Agadir"},
    "sahara-2day-agadir": {1: "Erg Chegaga", 2: "Agadir"},
    "marrakech-to-chefchaouen-4day": {1: "Fes", 2: "Fes", 3: "Chefchaouen", 4: "Chefchaouen"},
    "marrakech-imperial-cities-5day": {1: "Midelt", 2: "Meknes", 3: "Fes", 4: "Rabat", 5: "Marrakech"},
    "zagora-2day-marrakech": {1: "Zagora", 2: "Marrakech"},
    "erg-chegaga-3day-marrakech": {1: "M'Hamid", 2: "Erg Chegaga", 3: "Marrakech"},
    "merzouga-3day-agadir": {1: "Dades Valley", 2: "Erg Chebbi", 3: "Agadir"},
    "zagora-2day-agadir": {1: "Zagora", 2: "Agadir"},
    "erg-chegaga-3day-agadir": {1: "Foum Zguid", 2: "Erg Chegaga", 3: "Agadir"},
    "desert-4day-agadir": {1: "Dades Valley", 2: "Erg Chebbi", 3: "Ouarzazate", 4: "Agadir"},
    "agadir-to-fes-4day": {1: "Marrakech", 2: "Midelt", 3: "Fes", 4: "Fes"},
    "agadir-to-chefchaouen-5day": {1: "Marrakech", 2: "Fes", 3: "Fes", 4: "Chefchaouen", 5: "Chefchaouen"},
    "agadir-imperial-cities-6day": {1: "Marrakech", 2: "Midelt", 3: "Meknes", 4: "Fes", 5: "Rabat", 6: "Marrakech"},
    "toubkal-circuit-ifni-lake-6day": {1: "Tachedirt", 2: "Azib Likemt", 3: "Amsouzart", 4: "Lake Ifni", 5: "Toubkal Refuge", 6: "Jbel Toubkal Summit"},
    "toubkal-summit-2day-marrakech": {1: "Toubkal Refuge", 2: "Jbel Toubkal Summit"},
    "toubkal-aguelzim-pass-3day": {1: "Azib Tamsoult", 2: "Toubkal Refuge", 3: "Jbel Toubkal Summit"},
    "toubkal-three-peaks-4000m-3day": {1: "Toubkal Refuge", 2: "Ouanoukrim", 3: "Jbel Toubkal Summit"},
    "merzouga-stargazing-desert-tour": {1: "Erg Chebbi", 2: "Marrakech"},
    "azzaden-valley-2day-trek": {1: "Tizi Oussem", 2: "Aguersioual"},
    "atlas-mountains-3day-trek": {1: "Azzaden Valley", 2: "Tacheddirt", 3: "Ourika Valley"},
    "family-atlas-4day-trek": {1: "Imlil", 2: "Imlil", 3: "Tacheddirt", 4: "Ourika Valley"},
    "family-desert-4day-marrakech": {1: "Dades Valley", 2: "Erg Chebbi", 3: "Ouarzazate", 4: "Marrakech"},
    "mgoun-massif-trek": {1: "Ait M'hamed", 2: "Agouti", 3: "Tarkeddit", 4: "Mgoun Summit", 5: "Tessaout Gorge", 6: "Bou Tharar", 7: "Marrakech"},
    "high-atlas-grand-traverse-15day": {1: "Ait Bougmez", 2: "Tarkeddit", 3: "Mgoun Summit", 4: "Tessaout Gorge", 5: "Magdaz", 6: "Oulilimt", 8: "Oulilimt", 10: "Azzaden Valley", 11: "Tacheddirt", 12: "Toubkal Refuge", 13: "Jbel Toubkal Summit", 14: "Imlil", 15: "Marrakech"},
}

# Display names for the pin popup (nice human label, not the coord key).
LABEL = {
    "Erg Chebbi": "Erg Chebbi, Merzouga",
    "Erg Chegaga": "Erg Chegaga",
    "Jbel Toubkal Summit": "Jbel Toubkal Summit",
    "Mgoun Summit": "Jbel Mgoun Summit",
    "Ait Ben Haddou": "Aït Ben Haddou",
    "Ait M'hamed": "Aït M'hamed",
    "Ait Bougmez": "Aït Bougmez",
    "Tessaout Gorge": "Tessaout Gorge",
    "Azib Tamsoult": "Azzaden Valley",
}

import sys
path = sys.argv[1] if len(sys.argv) > 1 else "lib/tours.ts"
text = open(path, encoding="utf-8").read()
lines = text.split("\n")

cur_slug = None
out = []
i = 0
inserted = 0
skipped_existing = 0
while i < len(lines):
    l = lines[i]
    ms = re.search(r'slug:\s*"([^"]+)"', l)
    if ms and "slug: string" not in l:
        cur_slug = ms.group(1)
    out.append(l)

    # multiline day: `      day: N,`
    md = re.match(r'(\s*)day:\s*(\d+),\s*$', l)
    if md and cur_slug in ROUTES:
        indent, day = md.group(1), int(md.group(2))
        key = ROUTES[cur_slug].get(day)
        if key:
            look = "\n".join(lines[i + 1:i + 6])
            if "stop:" not in look:
                lat, lng = P[key]
                name = LABEL.get(key, key)
                out.append(f'{indent}stop: {{ name: "{name}", lat: {lat}, lng: {lng} }},')
                inserted += 1
            else:
                skipped_existing += 1
        i += 1
        continue

    # inline day: `{ day: N, title: "...", description: "..." },`
    mi = re.match(r'(\s*)\{\s*day:\s*(\d+),\s*title:', l)
    if mi and cur_slug in ROUTES:
        indent, day = mi.group(1), int(mi.group(2))
        key = ROUTES[cur_slug].get(day)
        if key and "stop:" not in l:
            lat, lng = P[key]
            name = LABEL.get(key, key)
            # rewrite the inline object to append the stop before the closing `},`
            new = re.sub(r'\s*\},\s*$', f', stop: {{ name: "{name}", lat: {lat}, lng: {lng} }} }},', out[-1])
            out[-1] = new
            inserted += 1
    i += 1

open(path, "w", encoding="utf-8").write("\n".join(out))
print(f"Injected {inserted} stops; skipped {skipped_existing} already-present.")
