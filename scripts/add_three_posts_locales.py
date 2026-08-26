# -*- coding: utf-8 -*-
"""Translate the three new posts into fr/es/de/it/ar.

SLUGS ARE READ FROM proxy.ts AT RUNTIME, never hand-written here. Writing them
by hand produced five wrong guesses on the first attempt:
  - visiting-morocco-during-ramadan, what-to-pack-desert-tour-morocco and
    merzouga-vs-zagora-which-desert-tour are NOT localised at all -- they keep
    the English slug in every locale. Inventing French slugs for them would
    have shipped 404s in five languages.
  - merzouga-stargazing-desert-tour is "nuit-etoilee-merzouga" in French, not
    the "observation-etoiles-merzouga" I assumed.
  - atlas-mountains-3day-trek is "trek-pueblos-..." in Spanish, not
    "trekking-pueblos-...".

Repo conventions:
  - Arabic NEVER takes a localised slug.
  - fr/es/de/it slugs for the NEW posts must be registered in proxy.ts (done
    by this script) or the URL 404s.
  - Links inside a locale post must use that locale's slugs.
  - Backticks via ~BT~, substituted at the end.
  - Prices in prose are EUR, matching lib/tours.ts at RATES.EUR.
"""
import io, json, re, subprocess

BT = "~BT~"

# New posts: English slug -> localised slug (ar omitted: keeps English)
NEW_SLUGS = {
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

LINK_KEYS = [
    "visiting-morocco-during-ramadan", "what-to-pack-desert-tour-morocco",
    "merzouga-vs-zagora-which-desert-tour", "booking-morocco-tour-direct-vs-platform",
    "morocco-tour-price-group-size", "best-time-to-visit-morocco",
    "shared-merzouga-3day-marrakech", "shared-essaouira-day-trip",
    "atlas-mountains-3day-trek", "marrakech-medina-cultural-tour",
    "marrakech-to-fes-3day", "marrakech-to-chefchaouen-4day",
    "marrakech-imperial-cities-5day", "merzouga-stargazing-desert-tour",
    "erg-chegaga-3day-marrakech", "family-desert-4day-marrakech",
]


def load_slugmap():
    """Read the real localised slugs straight out of proxy.ts."""
    js = """
const fs=require('fs');const p=fs.readFileSync('proxy.ts','utf8');
const KEYS=%s;
const out={}; for(const k of KEYS) out[k]={};
for(const name of ['BLOG_SLUGS_FR','BLOG_SLUGS_ES','BLOG_SLUGS_DE','BLOG_SLUGS_IT',
                   'TOUR_SLUGS_FR','TOUR_SLUGS_ES','TOUR_SLUGS_DE','TOUR_SLUGS_IT']){
  const i=p.indexOf('const '+name); if(i<0) continue;
  const seg=p.slice(i, p.indexOf('\\n};', i));
  const loc=name.slice(-2).toLowerCase();
  for(const k of KEYS){
    const m=seg.match(new RegExp('"'+k+'": "([^"]+)"'));
    if(m) out[k][loc]=m[1];
  }
}
console.log(JSON.stringify(out));
""" % json.dumps(LINK_KEYS)
    r = subprocess.run(["node", "-e", js], capture_output=True, text=True)
    if r.returncode != 0:
        raise SystemExit("slug extraction failed: " + r.stderr)
    return json.loads(r.stdout)


SLUGMAP = load_slugmap()


def S(en_slug, loc):
    """Localised slug for a link target; falls back to English when a page is
    deliberately not localised (three of ours are)."""
    if loc == "ar":
        return en_slug
    if en_slug in NEW_SLUGS:
        return NEW_SLUGS[en_slug].get(loc, en_slug)
    return SLUGMAP.get(en_slug, {}).get(loc) or en_slug


def esc(s):
    out = ['"']
    for ch in s:
        if ch == '"':
            out.append('\\"')
        elif ch == "\\":
            out.append("\\\\")
        elif ord(ch) < 128:
            out.append(ch)
        else:
            out.append("\\u%04x" % ord(ch))
    out.append('"')
    return "".join(out)


def block(slug, p):
    faq = "\n".join("      { q: %s, a: %s }," % (esc(q), esc(a)) for q, a in p["faq"])
    tags = ", ".join(esc(t) for t in p["tags"])
    rel = ", ".join(esc(t) for t in p["relatedTours"])
    return """  {
    slug: %s,
    author: MET_TEAM,
    title: %s,
    excerpt:
      %s,
    heroImage: %s,
    category: %s,
    region: %s,
    readTime: %d,
    publishedAt: "2026-08-26",
    updatedAt: "2026-08-26",
    tags: [%s],
    seoTitle: %s,
    seoDescription:
      %s,
    relatedTours: [%s],
    faq: [
%s
    ],
    content: %s%s%s,
  },
""" % (esc(slug), esc(p["title"]), esc(p["excerpt"]), esc(p["heroImage"]),
       esc(p["category"]), esc(p["region"]), p["readTime"], tags,
       esc(p["seoTitle"]), esc(p["seoDescription"]), rel, faq,
       BT, p["content"].strip("\n"), BT)


def append_to_locale(loc, posts):
    path = "lib/blog.%s.part2.ts" % loc
    src = io.open(path, encoding="utf-8").read()
    blocks = ""
    for en_slug, p in posts:
        slug = S(en_slug, loc)
        if '"%s"' % slug in src:
            print("    already present:", slug)
            continue
        blocks += block(slug, p)
    if not blocks:
        return 0
    m = None
    for m in re.finditer(r"\n\];", src):
        pass
    src = src[:m.start()] + "\n" + blocks.rstrip("\n") + src[m.start():]
    src = src.replace(BT, chr(96))
    io.open(path, "w", encoding="utf-8", newline="\n").write(src)
    return len([1 for _ in posts])


def register_proxy():
    """Add the new blog slugs to the fr/es/de/it maps in proxy.ts."""
    path = "proxy.ts"
    src = io.open(path, encoding="utf-8").read()
    added = 0
    for loc, mapname in [("fr", "BLOG_SLUGS_FR"), ("es", "BLOG_SLUGS_ES"),
                         ("de", "BLOG_SLUGS_DE"), ("it", "BLOG_SLUGS_IT")]:
        i = src.index("const " + mapname)
        end = src.index("\n};", i)
        seg = src[i:end]
        add = ""
        for en_slug, locs in NEW_SLUGS.items():
            if '"%s"' % en_slug in seg:
                continue
            add += '  "%s": "%s",\n' % (en_slug, locs[loc])
            added += 1
        if add:
            src = src[:end] + "\n" + add.rstrip("\n") + src[end:]
    io.open(path, "w", encoding="utf-8", newline="\n").write(src)
    print("  registered %d slugs in proxy.ts" % added)
