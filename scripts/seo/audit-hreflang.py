# -*- coding: utf-8 -*-
"""Audit hreflang across every built page.

Next renders the attribute as hrefLang (camelCase) in the HTML, which a
lowercase grep silently misses - that is why an earlier check reported zero
tags on pages that in fact had them. Match case-insensitively.

Checks per page:
  - a self-referencing canonical
  - all six locale alternates
  - an x-default
  - reciprocity: the alternate for THIS page's locale points back at this URL
"""
import io, os, re, glob, collections

SITE = "https://marrakechecotours.com"
LOCALES = ["en", "fr", "es", "de", "it", "ar"]
ROOT = ".next/server/app"

canon_re = re.compile(r'rel="canonical"\s+href="([^"]+)"', re.I)
alt_re = re.compile(r'rel="alternate"\s+hreflang="([^"]+)"\s+href="([^"]+)"', re.I)
noindex_re = re.compile(r'<meta name="robots" content="[^"]*noindex', re.I)

pages = sorted(glob.glob(os.path.join(ROOT, "**", "*.html"), recursive=True))
stats = collections.Counter()
problems = collections.defaultdict(list)

# A blog post whose translation does not exist yet serves the English text in
# that locale, noindexed and canonicalised to /en (lib/blog-i18n.ts
# blogPostSeo). Such a page is deliberately left out of every hreflang cluster,
# so a cluster missing exactly that locale is correct, not a gap.
noindexed = set()
for p in pages:
    r = p[len(ROOT) + 1:-5].replace("\\", "/")
    if r.split("/")[0] in LOCALES and noindex_re.search(io.open(p, encoding="utf-8", errors="replace").read()):
        noindexed.add(r)

for p in pages:
    rel = p[len(ROOT) + 1:-5].replace("\\", "/")
    lc = rel.split("/")[0]
    if lc not in LOCALES:
        continue
    html = io.open(p, encoding="utf-8", errors="replace").read()
    canon = canon_re.search(html)
    alts = dict((k.lower(), v) for k, v in alt_re.findall(html))
    stats["pages"] += 1

    if rel in noindexed and "/blog/" in rel and canon and canon.group(1).startswith(SITE + "/en/"):
        stats["fallback"] += 1
        stats["complete"] += 1
        continue

    if not canon:
        problems["no canonical"].append(rel); continue
    if not alts:
        # Single-locale pages (lib/markets.ts: one "Morocco from <country>"
        # page per locale) have no other language versions, and Google's
        # hreflang docs apply only to "multiple versions of a page". Correct
        # as long as the page still canonicalises to itself.
        if "/travel-from/" in rel and canon.group(1).rstrip("/").endswith(rel):
            stats["single-locale"] += 1
            stats["complete"] += 1
            continue
        problems["no hreflang"].append(rel); continue

    en_path = alts.get("en", "")[len(SITE) + 4:]  # path after /en/
    missing = [l for l in LOCALES if l not in alts and "%s/%s" % (l, en_path) not in noindexed]
    if missing:
        problems["missing locales: " + ",".join(missing)].append(rel)
    if "x-default" not in alts:
        problems["no x-default"].append(rel)
    # reciprocity: this locale's alternate must name this page
    self_alt = alts.get(lc)
    if self_alt and self_alt.rstrip("/") != canon.group(1).rstrip("/"):
        problems["self-alternate != canonical"].append(
            "%s  (alt=%s canon=%s)" % (rel, self_alt, canon.group(1)))
    if not missing and "x-default" in alts:
        stats["complete"] += 1

print("pages checked : %d" % stats["pages"])
print("fully correct : %d" % stats["complete"])
print("  of which single-locale (no hreflang by design): %d" % stats["single-locale"])
print("  of which untranslated blog fallbacks (noindex, canonical /en): %d" % stats["fallback"])
print()
for k in sorted(problems, key=lambda x: -len(problems[x])):
    v = problems[k]
    print("%-34s %d" % (k, len(v)))
    for item in v[:6]:
        print("     %s" % item)
    if len(v) > 6:
        print("     ... +%d more" % (len(v) - 6))
