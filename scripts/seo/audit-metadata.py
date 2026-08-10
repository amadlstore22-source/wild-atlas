# -*- coding: utf-8 -*-
"""Audit the built site against Google's checkable requirements.

Only checks things that are objectively pass/fail from the build output.
Anything requiring live field data (INP, real LCP, CrUX) is reported as
"needs live data" rather than guessed at.

Sources:
  Search Essentials technical requirements: Googlebot access, HTTP 200,
    indexable content
  SEO starter guide: unique titles, meta descriptions, descriptive URLs,
    one canonical per piece of content, image alt text, crawlable links
  Core Web Vitals: LCP <= 2.5s, INP <= 200ms, CLS <= 0.1 at p75
"""
import io, os, re, glob, collections, json

ROOT = ".next/server/app"
LOCALES = ["en", "fr", "es", "de", "it", "ar"]

pages = []
for p in glob.glob(os.path.join(ROOT, "**", "*.html"), recursive=True):
    rel = p[len(ROOT) + 1:-5].replace("\\", "/")
    if rel.split("/")[0] not in LOCALES:
        continue
    pages.append((rel, io.open(p, encoding="utf-8", errors="replace").read()))

def tag(html, pattern):
    m = re.search(pattern, html, re.I | re.S)
    return m.group(1).strip() if m else None

titles = collections.defaultdict(list)
descs = collections.defaultdict(list)
canons = collections.defaultdict(list)
issues = collections.defaultdict(list)

for rel, html in pages:
    t = tag(html, r"<title>(.*?)</title>")
    d = tag(html, r'<meta name="description" content="(.*?)"')
    c = tag(html, r'rel="canonical" href="(.*?)"')
    robots = re.findall(r'name="robots" content="([^"]*)"', html)

    if not t:
        issues["missing <title>"].append(rel)
    else:
        titles[t].append(rel)
        if len(t) > 65:
            issues["title over 65 chars (may truncate)"].append("%s  [%d]" % (rel, len(t)))
    if not d:
        issues["missing meta description"].append(rel)
    else:
        descs[d].append(rel)
        if len(d) > 160:
            issues["description over 160 chars"].append("%s  [%d]" % (rel, len(d)))
        if len(d) < 50:
            issues["description under 50 chars"].append("%s  [%d]" % (rel, len(d)))
    if not c:
        issues["missing canonical"].append(rel)
    if any("noindex" in r for r in robots):
        issues["noindex (intentional?)"].append(rel)

    # images without alt
    imgs = re.findall(r"<img\b[^>]*>", html, re.I)
    noalt = [i for i in imgs if not re.search(r'\balt="', i, re.I)]
    if noalt:
        issues["image missing alt"].append("%s  (%d of %d)" % (rel, len(noalt), len(imgs)))
    empty_alt = [i for i in imgs if re.search(r'\balt=""', i)]
    # empty alt is valid for decorative images; only note the count
    if len(empty_alt) > 3:
        issues["many empty alt= (decorative?)"].append("%s  (%d)" % (rel, len(empty_alt)))

    # h1
    h1 = re.findall(r"<h1\b[^>]*>(.*?)</h1>", html, re.I | re.S)
    if len(h1) == 0:
        issues["no <h1>"].append(rel)
    elif len(h1) > 1:
        issues["multiple <h1>"].append("%s  (%d)" % (rel, len(h1)))

    # structured data validity
    for m in re.finditer(r'<script[^>]*application/ld\+json[^>]*>(.*?)</script>', html, re.S | re.I):
        try:
            json.loads(m.group(1))
        except ValueError as e:
            issues["invalid JSON-LD"].append("%s  (%s)" % (rel, str(e)[:50]))
            break

dup_titles = {k: v for k, v in titles.items() if len(v) > 1}
dup_descs = {k: v for k, v in descs.items() if len(v) > 1}

print("pages audited: %d\n" % len(pages))
print("=" * 62)
print("DUPLICATE TITLES : %d titles shared by >1 page" % len(dup_titles))
for t, v in sorted(dup_titles.items(), key=lambda x: -len(x[1]))[:6]:
    print("   [%d] %s" % (len(v), t[:70]))
    for r in v[:3]:
        print("        %s" % r)
    if len(v) > 3:
        print("        ... +%d more" % (len(v) - 3))
print()
print("DUPLICATE DESCRIPTIONS : %d shared by >1 page" % len(dup_descs))
for t, v in sorted(dup_descs.items(), key=lambda x: -len(x[1]))[:6]:
    print("   [%d] %s" % (len(v), t[:70]))
    for r in v[:3]:
        print("        %s" % r)
print()
print("=" * 62)
for k in sorted(issues, key=lambda x: -len(issues[x])):
    v = issues[k]
    print("%-38s %d" % (k, len(v)))
    for item in v[:4]:
        print("      %s" % item)
    if len(v) > 4:
        print("      ... +%d more" % (len(v) - 4))
