# -*- coding: utf-8 -*-
"""Retitle and re-describe the priority commercial tour pages.

WHY
---
Measured live on 2026-08-26, the three priority tour pages carried titles of
88-97 characters and descriptions of 164-280. Google truncates a title near 60
and a description near 155, so the Sahara page was losing roughly 45% of its
description -- including the entire price ladder that made it persuasive.

TITLE BUDGET
------------
`seoTitle` carries "| Marrakech Eco Tours" inline AND the layout template
appends the same suffix, so the tour page strips the inline copy before
rendering (see the comment in app/[lang]/tours/[slug]/page.tsx). The real
budget before the brand is therefore ~39 characters, not 60.

PRICES
------
The descriptions now lead with the cheapest tier and LABEL it ("for 6+").
`tour.price` is the SOLO rate; the 6+ tier is roughly 60% lower. Quoting the
group rate unlabelled would promise a solo visitor EUR260 and then quote them
EUR650 on arrival, and would contradict the AggregateOffer whose lowPrice comes
from lowestGroupPrice(). The label is what keeps meta, page and schema honest.

TWO TRAPS THIS SCRIPT AVOIDS
----------------------------
1. A regex over the whole file runs PAST the tour it targets and rewrites the
   NEXT tour's field, because every tour has a `seoTitle`. Three earlier
   attempts at a similar measurement reported "zero problems" for exactly this
   reason. Fix: split on the 4-space `slug:` marker and bound each edit to one
   block, asserting exactly one substitution per field.
2. Running this through a shell heredoc corrupts the backslashes in the
   character classes below (`[^"\\]`) before Python ever parses them, producing
   "unterminated character set". Always run it as a FILE:
       PYTHONIOENCODING=utf-8 py scripts/seo/retitle_priority.py
"""
import io
import re

# slug -> (seoTitle without brand suffix, seoDescription)
NEW = {
    "toubkal-summit-trek-4day": (
        "4-Day Toubkal Trek from Marrakech",
        "Summit Jbel Toubkal (4,167 m) with licensed Berber guides. Mule "
        "support, mountain refuges. From €260 pp for 6+. Free cancellation "
        "14 days.",
    ),
    "toubkal-summit-2day-marrakech": (
        "2-Day Toubkal Trek from Marrakech",
        "Reach North Africa’s highest peak in two days. Private or small "
        "group, overnight at Toubkal Refuge. From €153 pp for 6+. "
        "Licensed Berber guides.",
    ),
    "sahara-3day-marrakech": (
        "3-Day Merzouga Desert Tour, Marrakech",
        "Camel trek into Erg Chebbi, overnight Berber camp, Aït Ben Haddou "
        "& Todra Gorge. Private 4x4, licensed guides. From €230 pp for 6+.",
    ),
}

PAT_TITLE = re.compile(r'\n    seoTitle: "(?:[^"\\]|\\.)*"')
PAT_DESC = re.compile(r'\n    seoDescription: "(?:[^"\\]|\\.)*"')

BRAND_LEN = len(" | Marrakech Eco Tours")


def run():
    path = "lib/tours.ts"
    src = io.open(path, encoding="utf-8").read()
    blocks = src.split('\n    slug: "')
    seen = 0

    for i, block in enumerate(blocks[1:], 1):
        slug = block[: block.index('"')]
        if slug not in NEW:
            continue
        title, desc = NEW[slug]

        # A lambda replacement, not a string: re.sub would interpret a literal
        # backslash or \g in the new text as a group reference.
        block, n1 = PAT_TITLE.subn(lambda m: '\n    seoTitle: "' + title + '"', block, count=1)
        block, n2 = PAT_DESC.subn(lambda m: '\n    seoDescription: "' + desc + '"', block, count=1)
        assert n1 == 1, "seoTitle not found exactly once in %s" % slug
        assert n2 == 1, "seoDescription not found exactly once in %s" % slug

        blocks[i] = block
        seen += 1
        print("  %-32s title %2d  desc %3d" % (slug, len(title) + BRAND_LEN, len(desc)))

    assert seen == len(NEW), "matched %d of %d tours" % (seen, len(NEW))
    io.open(path, "w", encoding="utf-8", newline="\n").write('\n    slug: "'.join(blocks))
    print("updated %d tours in %s" % (seen, path))


run()
