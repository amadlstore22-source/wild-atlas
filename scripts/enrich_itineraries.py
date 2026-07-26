# -*- coding: utf-8 -*-
"""Add real per-day logistics (meals/stay/walking/driving/distance/ascent) to
multi-day tour itineraries across all six locale files.

Keyed by (slug, day). Values are realistic for each documented route. `stay` is
left in a language-neutral-ish English place form deliberately: it names WHERE
(a refuge, a village, a camp), and the accommodation *type* words are short and
widely understood, but where a natural translation matters we localise via the
STAY_I18N table. meals codes use B/L/D; the component renders them per locale.
"""
import re, sys

# meals: B,L,D codes. stay: short English label (localised below). walking/
# driving/distance/ascent: short strings shown verbatim (units are universal).
DATA = {
  "toubkal-summit-trek-4day": {
    1: {"meals":"D","stay":"guesthouse","driving":"1.5 h","walking":"1–2 h"},
    2: {"meals":"B,L,D","stay":"refuge","walking":"5 h","ascent":"+1,470 m","distance":"≈11 km"},
    3: {"meals":"B,L,D","stay":"refuge","walking":"6–7 h","ascent":"+960 m / −960 m"},
    4: {"meals":"B","walking":"5–6 h","driving":"1.5 h"},
  },
  "toubkal-summit-2day-marrakech": {
    1: {"meals":"L,D","stay":"refuge","walking":"5 h","ascent":"+1,470 m","driving":"1.5 h"},
    2: {"meals":"B","walking":"7–8 h","ascent":"+960 m / −2,430 m","driving":"1.5 h"},
  },
  "toubkal-aguelzim-pass-3day": {
    1: {"meals":"L,D","stay":"camp","walking":"5–6 h","driving":"1.5 h","ascent":"+900 m"},
    2: {"meals":"B,L,D","stay":"refuge","walking":"6–7 h","ascent":"+1,100 m"},
    3: {"meals":"B","walking":"7 h","ascent":"+960 m / −2,430 m","driving":"1.5 h"},
  },
  "toubkal-three-peaks-4000m-3day": {
    1: {"meals":"L,D","stay":"refuge","walking":"5 h","ascent":"+1,470 m","driving":"1.5 h"},
    2: {"meals":"B,L,D","stay":"refuge","walking":"7–8 h","ascent":"+880 m","distance":"≈9 km"},
    3: {"meals":"B","walking":"6 h","ascent":"+960 m / −2,430 m","driving":"1.5 h"},
  },
  "toubkal-circuit-ifni-lake-6day": {
    1: {"meals":"L,D","stay":"gîte","walking":"4 h","driving":"1.5 h","ascent":"+560 m"},
    2: {"meals":"B,L,D","stay":"camp","walking":"6–7 h","ascent":"+1,255 m / −1,305 m"},
    3: {"meals":"B,L,D","stay":"gîte","walking":"6 h","distance":"≈14 km"},
    4: {"meals":"B,L,D","stay":"camp","walking":"5 h","ascent":"+555 m"},
    5: {"meals":"B,L,D","stay":"refuge","walking":"6–7 h","ascent":"+1,370 m / −460 m"},
    6: {"meals":"B","walking":"7–8 h","ascent":"+960 m / −2,430 m","driving":"1.5 h"},
  },
  "azzaden-valley-2day-trek": {
    1: {"meals":"L,D","stay":"gîte","walking":"5–6 h","driving":"1.5 h","ascent":"+700 m"},
    2: {"meals":"B,L","walking":"5 h","driving":"1.5 h","distance":"≈12 km"},
  },
  "atlas-mountains-3day-trek": {
    1: {"meals":"L,D","stay":"gîte","walking":"4–5 h","driving":"1.5 h"},
    2: {"meals":"B,L,D","stay":"gîte","walking":"6 h","ascent":"+800 m"},
    3: {"meals":"B,L","walking":"5 h","driving":"1 h"},
  },
  "family-atlas-4day-trek": {
    1: {"meals":"L,D","stay":"guesthouse","walking":"2–3 h","driving":"1.5 h"},
    2: {"meals":"B,L,D","stay":"gîte","walking":"4 h"},
    3: {"meals":"B,L,D","stay":"gîte","walking":"4–5 h"},
    4: {"meals":"B,L","walking":"3 h","driving":"1 h"},
  },
  "mgoun-massif-trek": {
    1: {"meals":"L,D","stay":"gîte","driving":"5 h"},
    2: {"meals":"B,L,D","stay":"camp","walking":"5 h","ascent":"+800 m"},
    3: {"meals":"B,L,D","stay":"camp","walking":"6–7 h","ascent":"+1,050 m"},
    4: {"meals":"B,L,D","stay":"camp","walking":"7–8 h","ascent":"+420 m / −1,150 m"},
    5: {"meals":"B,L,D","stay":"camp","walking":"5–6 h"},
    6: {"meals":"B,L,D","stay":"guesthouse","walking":"5 h"},
    7: {"meals":"B","driving":"4 h"},
  },
  "high-atlas-grand-traverse-15day": {
    1: {"meals":"L,D","stay":"gîte","driving":"5–6 h","walking":"1–2 h"},
    2: {"meals":"B,L,D","stay":"camp","walking":"6 h","ascent":"+1,100 m"},
    3: {"meals":"B,L,D","stay":"camp","walking":"8–9 h","ascent":"+1,168 m / −1,150 m"},
    4: {"meals":"B,L,D","stay":"camp","walking":"6 h"},
    5: {"meals":"B,L,D","stay":"gîte","walking":"5 h"},
    6: {"meals":"B,L,D","stay":"camp","walking":"6 h","ascent":"+900 m"},
    7: {"meals":"B,L,D","stay":"camp","walking":"2–3 h"},
    8: {"meals":"B,L,D","stay":"camp","walking":"6–7 h","ascent":"+850 m"},
    9: {"meals":"B,L,D","stay":"camp","walking":"6 h"},
    10: {"meals":"B,L,D","stay":"gîte","walking":"6–7 h"},
    11: {"meals":"B,L,D","stay":"gîte","walking":"5 h","ascent":"+560 m"},
    12: {"meals":"B,L,D","stay":"refuge","walking":"6 h","ascent":"+900 m"},
    13: {"meals":"B,L,D","stay":"refuge","walking":"7 h","ascent":"+960 m / −960 m"},
    14: {"meals":"B,L,D","stay":"guesthouse","walking":"5 h"},
    15: {"meals":"B","driving":"1.5 h"},
  },
  # ---- Desert tours (vehicle-based; driving distances matter) ----
  "sahara-3day-marrakech": {
    1: {"meals":"D","stay":"hotel","driving":"≈6 h","distance":"≈360 km"},
    2: {"meals":"B,D","stay":"desert camp","driving":"≈4 h","distance":"≈240 km"},
    3: {"meals":"B","driving":"≈8 h","distance":"≈560 km"},
  },
  "zagora-2day-marrakech": {
    1: {"meals":"D","stay":"desert camp","driving":"≈7 h","distance":"≈360 km"},
    2: {"meals":"B","driving":"≈7 h","distance":"≈360 km"},
  },
  "erg-chegaga-3day-marrakech": {
    1: {"meals":"D","stay":"guesthouse","driving":"≈8 h","distance":"≈460 km"},
    2: {"meals":"B,D","stay":"desert camp","driving":"3–4 h (4x4)","distance":"≈60 km"},
    3: {"meals":"B","driving":"≈8 h","distance":"≈460 km"},
  },
  "desert-4day-marrakech": {
    1: {"meals":"D","stay":"hotel","driving":"≈6 h","distance":"≈360 km"},
    2: {"meals":"B,D","stay":"desert camp","driving":"≈4 h","distance":"≈220 km"},
    3: {"meals":"B,D","stay":"hotel","driving":"≈5 h","distance":"≈300 km"},
    4: {"meals":"B","driving":"≈4 h","distance":"≈200 km"},
  },
  "family-desert-4day-marrakech": {
    1: {"meals":"D","stay":"hotel","driving":"≈5 h","distance":"≈300 km"},
    2: {"meals":"B,D","stay":"desert camp","driving":"≈4 h","distance":"≈240 km"},
    3: {"meals":"B,D","stay":"hotel","driving":"≈4 h","distance":"≈240 km"},
    4: {"meals":"B","driving":"≈4 h","distance":"≈200 km"},
  },
  "merzouga-stargazing-desert-tour": {
    1: {"meals":"D","stay":"desert camp","driving":"≈8 h","distance":"≈560 km"},
    2: {"meals":"B","driving":"≈8 h","distance":"≈560 km"},
  },
  "merzouga-3day-agadir": {
    1: {"meals":"D","stay":"guesthouse","driving":"≈7 h","distance":"≈420 km"},
    2: {"meals":"B,D","stay":"desert camp","driving":"≈4 h","distance":"≈240 km"},
    3: {"meals":"B","driving":"≈9 h","distance":"≈560 km"},
  },
  "zagora-2day-agadir": {
    1: {"meals":"D","stay":"desert camp","driving":"≈8 h","distance":"≈500 km"},
    2: {"meals":"B","driving":"≈8 h","distance":"≈500 km"},
  },
  "erg-chegaga-3day-agadir": {
    1: {"meals":"D","stay":"guesthouse","driving":"≈7 h","distance":"≈400 km"},
    2: {"meals":"B,D","stay":"desert camp","driving":"3–4 h (4x4)","distance":"≈70 km"},
    3: {"meals":"B","driving":"≈8 h","distance":"≈450 km"},
  },
  "desert-4day-agadir": {
    1: {"meals":"D","stay":"guesthouse","driving":"≈7 h","distance":"≈420 km"},
    2: {"meals":"B,D","stay":"desert camp","driving":"≈4 h","distance":"≈240 km"},
    3: {"meals":"B,D","stay":"hotel","driving":"≈5 h","distance":"≈300 km"},
    4: {"meals":"B","driving":"≈6 h","distance":"≈360 km"},
  },
  "sahara-2day-agadir": {
    1: {"meals":"D","stay":"desert camp","driving":"≈8 h","distance":"≈450 km"},
    2: {"meals":"B","driving":"≈8 h","distance":"≈450 km"},
  },
  "anti-atlas-trekking-agadir": {
    1: {"meals":"L,D","stay":"camp","driving":"≈3 h","walking":"3–4 h"},
    2: {"meals":"B,L,D","stay":"camp","walking":"6 h","ascent":"+700 m"},
    3: {"meals":"B,L","walking":"4–5 h","driving":"≈3 h"},
  },
  # ---- Cultural / imperial (vehicle-based road trips) ----
  "marrakech-to-fes-3day": {
    1: {"meals":"D","stay":"hotel","driving":"≈6 h","distance":"≈340 km"},
    2: {"meals":"B,D","stay":"hotel","driving":"≈4 h","distance":"≈220 km"},
    3: {"meals":"B"},
  },
  "marrakech-to-chefchaouen-4day": {
    1: {"meals":"D","stay":"hotel","driving":"≈7 h","distance":"≈480 km"},
    2: {"meals":"B","stay":"hotel"},
    3: {"meals":"B,D","stay":"hotel","driving":"≈4 h","distance":"≈200 km"},
    4: {"meals":"B"},
  },
  "marrakech-imperial-cities-5day": {
    1: {"meals":"D","stay":"hotel","driving":"≈6 h","distance":"≈360 km"},
    2: {"meals":"B,D","stay":"hotel","driving":"≈5 h","distance":"≈300 km"},
    3: {"meals":"B","stay":"hotel"},
    4: {"meals":"B,D","stay":"hotel","driving":"≈3 h","distance":"≈200 km"},
    5: {"meals":"B","driving":"≈4 h","distance":"≈240 km"},
  },
  "agadir-to-fes-4day": {
    1: {"meals":"D","stay":"hotel","driving":"≈4 h","distance":"≈250 km"},
    2: {"meals":"B,D","stay":"hotel","driving":"≈6 h","distance":"≈340 km"},
    3: {"meals":"B,D","stay":"hotel","driving":"≈4 h","distance":"≈220 km"},
    4: {"meals":"B"},
  },
  "agadir-to-chefchaouen-5day": {
    1: {"meals":"D","stay":"hotel","driving":"≈4 h","distance":"≈250 km"},
    2: {"meals":"B,D","stay":"hotel","driving":"≈7 h","distance":"≈480 km"},
    3: {"meals":"B","stay":"hotel"},
    4: {"meals":"B,D","stay":"hotel","driving":"≈4 h","distance":"≈200 km"},
    5: {"meals":"B"},
  },
  # ---- Combined mountain-to-desert (5 days) ----
  "toubkal-summit-sahara-5day": {
    1: {"meals":"L,D","stay":"refuge","driving":"1.5 h","walking":"5 h","ascent":"+1,470 m"},
    2: {"meals":"B,L,D","stay":"guesthouse","walking":"6–7 h","ascent":"+960 m / −2,430 m"},
    3: {"meals":"D","stay":"hotel","driving":"≈5 h","distance":"≈300 km"},
    4: {"meals":"B,D","stay":"desert camp","driving":"≈4 h","distance":"≈240 km","walking":"1–2 h"},
    5: {"meals":"B","driving":"≈8 h","distance":"≈560 km"},
  },
  # ---- Single-day tours (no overnight; meals per the itinerary) ----
  "ourika-valley-day-hike": {
    1: {"meals":"L","driving":"≈1 h each way","walking":"3–4 h","distance":"≈65 km each way"},
  },
  "ouzoud-waterfalls-day-trip": {
    1: {"meals":"—","driving":"≈2 h each way","walking":"2–3 h","distance":"≈150 km each way"},
  },
  "agafay-desert-sunset": {
    1: {"meals":"D","driving":"30 min each way","distance":"≈40 km each way"},
  },
  "marrakech-medina-cultural-tour": {
    1: {"meals":"—","walking":"4 h (on foot)"},
  },
  "paradise-valley-agadir": {
    1: {"meals":"L","driving":"≈1.5 h each way","walking":"2–3 h","distance":"≈70 km each way"},
  },
  "sous-massa-national-park": {
    1: {"meals":"L","driving":"≈1 h each way","walking":"2–3 h","distance":"≈60 km each way"},
  },
  "taroudant-day-trip-agadir": {
    1: {"meals":"—","driving":"≈1 h each way","walking":"2–3 h","distance":"≈80 km each way"},
  },
  "agadir-surf-lesson": {
    1: {"meals":"—","walking":"2 h session"},
  },
  "souss-valley-cultural-tour": {
    1: {"meals":"L","driving":"≈1.5 h round trip","distance":"≈90 km round trip"},
  },
  "agadir-to-essaouira-day-trip": {
    1: {"meals":"—","driving":"≈2 h each way","walking":"2–3 h","distance":"≈175 km each way"},
  },
  "marrakech-food-market-tour": {
    1: {"meals":"L","walking":"4 h (on foot)"},
  },
  "agadir-imperial-cities-6day": {
    1: {"meals":"D","stay":"hotel","driving":"≈4 h","distance":"≈250 km"},
    2: {"meals":"B,D","stay":"hotel","driving":"≈6 h","distance":"≈360 km"},
    3: {"meals":"B,D","stay":"hotel","driving":"≈5 h","distance":"≈300 km"},
    4: {"meals":"B","stay":"hotel"},
    5: {"meals":"B,D","stay":"hotel","driving":"≈3 h","distance":"≈200 km"},
    6: {"meals":"B","driving":"≈4 h","distance":"≈240 km"},
  },
}

# stay label localisation. Keys are the English tokens used above.
STAY_I18N = {
  "en": {"refuge":"Mountain refuge","gîte":"Village gîte","guesthouse":"Guesthouse","camp":"Wild camp","desert camp":"Desert camp","hotel":"Hotel"},
  "fr": {"refuge":"Refuge de montagne","gîte":"Gîte de village","guesthouse":"Maison d'hôtes","camp":"Bivouac","desert camp":"Campement dans le désert","hotel":"Hôtel"},
  "es": {"refuge":"Refugio de montaña","gîte":"Casa rural (gîte)","guesthouse":"Casa de huéspedes","camp":"Vivac","desert camp":"Campamento en el desierto","hotel":"Hotel"},
  "de": {"refuge":"Berghütte","gîte":"Dorf-Gîte","guesthouse":"Gästehaus","camp":"Biwak","desert camp":"Wüstencamp","hotel":"Hotel"},
  "it": {"refuge":"Rifugio di montagna","gîte":"Gîte di villaggio","guesthouse":"Casa per ospiti","camp":"Bivacco","desert camp":"Campo nel deserto","hotel":"Hotel"},
  "ar": {"refuge":"ملجأ جبلي","gîte":"دار ضيافة قروية","guesthouse":"بيت ضيافة","camp":"مخيّم","desert camp":"مخيّم صحراوي","hotel":"فندق"},
}

def js(s: str) -> str:
    return s.replace("\\", "\\\\").replace('"', '\\"')

def enrich(path, loc):
    stay_map = STAY_I18N[loc]
    lines = open(path, encoding="utf-8").read().split("\n")
    cur_slug = None
    out = []
    added = 0
    i = 0
    while i < len(lines):
        l = lines[i]
        ms = re.search(r'slug:\s*"([^"]+)"', l)
        if ms and "slug: string" not in l:
            cur_slug = ms.group(1)

        def fields_for(day):
            d = DATA.get(cur_slug, {}).get(day)
            if not d:
                return None
            parts = []
            # "—" means no meal is included on this day: omit the field so the
            # component shows no meal chip at all, rather than a literal dash.
            if d.get("meals") and d["meals"] != "—": parts.append(f'meals: "{d["meals"]}"')
            if "stay" in d: parts.append(f'stay: "{js(stay_map[d["stay"]])}"')
            if "walking" in d: parts.append(f'walking: "{js(d["walking"])}"')
            if "driving" in d: parts.append(f'driving: "{js(d["driving"])}"')
            if "distance" in d: parts.append(f'distance: "{js(d["distance"])}"')
            if "ascent" in d: parts.append(f'ascent: "{js(d["ascent"])}"')
            return parts

        # multiline day
        md = re.match(r'(\s*)day:\s*(\d+),\s*$', l)
        if md and cur_slug in DATA:
            out.append(l)
            indent, day = md.group(1), int(md.group(2))
            look = "\n".join(lines[i + 1:i + 8])
            if "meals:" not in look:
                fs = fields_for(day)
                if fs:
                    for f in fs:
                        out.append(f"{indent}{f},")
                    added += 1
            i += 1
            continue

        # inline day object
        mi = re.match(r'(\s*)\{\s*day:\s*(\d+),', l)
        if mi and cur_slug in DATA and "meals:" not in l:
            day = int(mi.group(2))
            fs = fields_for(day)
            if fs:
                inject = ", " + ", ".join(fs)
                l = re.sub(r'(\s*)\},\s*$', inject + r' },', l)
                added += 1
        out.append(l)
        i += 1

    open(path, "w", encoding="utf-8").write("\n".join(out))
    return added

if __name__ == "__main__":
    loc = sys.argv[1]
    path = "lib/tours.ts" if loc == "en" else f"lib/tours.{loc}.ts"
    n = enrich(path, loc)
    print(f"{loc}: enriched {n} days")
