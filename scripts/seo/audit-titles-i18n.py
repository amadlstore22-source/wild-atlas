# -*- coding: utf-8 -*-
"""Quantify the two real findings, and separate signal from noise.

Title length: Google truncates SERP titles around 580px, roughly 60-65 chars.
A long title is not an error - Google often rewrites or truncates gracefully,
and the brand suffix is usually what gets cut. What matters is whether the
DISTINCTIVE part survives the cut. So measure the prefix before the separator.

Untranslated metadata: a title identical across six locales means the static
pages were never localised, so /fr/about and /de/about compete with /en/about
on the same English string. That is a genuine quality gap.
"""
import io, os, re, glob, collections

ROOT = ".next/server/app"
LOCALES = ["en", "fr", "es", "de", "it", "ar"]
SEPS = re.compile(r"\s+[—|–\-]\s+|\s+\|\s+")

pages = []
for p in glob.glob(os.path.join(ROOT, "**", "*.html"), recursive=True):
    rel = p[len(ROOT) + 1:-5].replace("\\", "/")
    if rel.split("/")[0] not in LOCALES:
        continue
    pages.append((rel, io.open(p, encoding="utf-8", errors="replace").read()))

def unesc(s):
    return (s.replace("&amp;", "&").replace("&#x27;", "'")
             .replace("&quot;", '"').replace("&lt;", "<").replace("&gt;", ">"))

titles = {}
descs = {}
for rel, html in pages:
    m = re.search(r"<title>(.*?)</title>", html, re.S)
    d = re.search(r'<meta name="description" content="(.*?)"', html, re.S)
    if m: titles[rel] = unesc(m.group(1).strip())
    if d: descs[rel] = unesc(d.group(1).strip())

# --- 1. how bad is the title length really? ---
lead_too_long = []
for rel, t in titles.items():
    parts = SEPS.split(t)
    lead = parts[0]
    if len(lead) > 60:
        lead_too_long.append((len(lead), rel, lead))
print("TITLES: %d total" % len(titles))
print("  over 65 chars overall            : %d" % sum(1 for t in titles.values() if len(t) > 65))
print("  DISTINCTIVE part over 60 chars   : %d   <- the ones that actually lose meaning" % len(lead_too_long))
for n, rel, lead in sorted(lead_too_long, reverse=True)[:8]:
    print("      [%3d] %-34s %s" % (n, rel, lead[:70]))

# --- 2. untranslated metadata across locales ---
by_path = collections.defaultdict(dict)
for rel, t in titles.items():
    parts = rel.split("/", 1)
    lc, path = parts[0], (parts[1] if len(parts) > 1 else "")
    by_path[path][lc] = t

untranslated = []
for path, per_lc in sorted(by_path.items()):
    if len(per_lc) < 6:
        continue
    vals = set(per_lc.values())
    if len(vals) == 1:
        untranslated.append(path or "(home)")

print("\nUNTRANSLATED TITLES: %d paths identical in all 6 locales" % len(untranslated))
for p in untranslated:
    print("      /%s" % p)

# same for descriptions
by_path_d = collections.defaultdict(dict)
for rel, d in descs.items():
    parts = rel.split("/", 1)
    by_path_d[(parts[1] if len(parts) > 1 else "")][parts[0]] = d
untrans_d = [p or "(home)" for p, per in sorted(by_path_d.items())
             if len(per) == 6 and len(set(per.values())) == 1]
print("\nUNTRANSLATED DESCRIPTIONS: %d paths" % len(untrans_d))
for p in untrans_d:
    print("      /%s" % p)
