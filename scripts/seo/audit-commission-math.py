# -*- coding: utf-8 -*-
"""Catch commission sentences whose arithmetic no longer holds.

Pattern across the cost posts: "platforms take 25-40%; on a EUR<base> trip that
is up to EUR<cut> leaving Morocco". When a base price moved, the cut had to move
with it. Flag any pair where cut is not ~40% of base.
"""
import io, re, glob

PAT = re.compile(
    r"(\d[\d.,\s]{1,7})\s?(?:€|يورو)[^.]{0,90}?"
    r"(?:up to|jusqu'à|hasta|bis zu|fino a|ما يصل إلى)\s*"
    r"(\d[\d.,\s]{1,7})\s?(?:€|يورو)",
    re.I)

def num(s):
    s = s.strip().replace(" ", "").replace(" ", "")
    s = s.replace(".", "").replace(",", "")
    return int(s) if s.isdigit() else None

bad = checked = 0
for f in ["lib/blog.ts"] + sorted(glob.glob("lib/blog.*.part*.ts")):
    s = io.open(f, encoding="utf-8").read()
    slugs = [(m.start(), m.group(1)) for m in re.finditer(r'slug: "([a-z0-9-]+)"', s)]
    for m in PAT.finditer(s):
        base, cut = num(m.group(1)), num(m.group(2))
        if not base or not cut or base < 100:
            continue
        checked += 1
        pct = cut / base
        # the copy always says 25-40%, so the quoted cut should be the 40% end
        if not (0.34 <= pct <= 0.46):
            owner = [x[1] for x in slugs if x[0] < m.start()]
            bad += 1
            print("  %-22s %-42s %d -> %d  (%.0f%%)" % (
                f.split("/")[-1], owner[-1] if owner else "?", base, cut, pct * 100))

print("\nchecked %d commission pairs, %d off" % (checked, bad))
