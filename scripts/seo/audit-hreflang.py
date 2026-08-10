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

pages = sorted(glob.glob(os.path.join(ROOT, "**", "*.html"), recursive=True))
stats = collections.Counter()
problems = collections.defaultdict(list)

for p in pages:
    rel = p[len(ROOT) + 1:-5].replace("\\", "/")
    lc = rel.split("/")[0]
    if lc not in LOCALES:
        continue
    html = io.open(p, encoding="utf-8", errors="replace").read()
    canon = canon_re.search(html)
    alts = dict((k.lower(), v) for k, v in alt_re.findall(html))
    stats["pages"] += 1

    if not canon:
        problems["no canonical"].append(rel); continue
    if not alts:
        problems["no hreflang"].append(rel); continue

    missing = [l for l in LOCALES if l not in alts]
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
print()
for k in sorted(problems, key=lambda x: -len(problems[x])):
    v = problems[k]
    print("%-34s %d" % (k, len(v)))
    for item in v[:6]:
        print("     %s" % item)
    if len(v) > 6:
        print("     ... +%d more" % (len(v) - 6))
