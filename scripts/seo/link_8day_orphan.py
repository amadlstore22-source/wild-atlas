# -*- coding: utf-8 -*-
"""Give the 8-day Toubkal + Sahara tour its first inbound internal links.

THE DEFECT
----------
The tour shipped with ZERO inbound links: no post mentioned it and no
relatedTours array pointed at it. Measured against the catalogue:

    sahara-3day-marrakech          66 mentions
    toubkal-summit-trek-4day       44
    toubkal-circuit-ifni-lake-6day 15
    morocco-highlights-...-8day     0   <-- newest, most expensive product

This is the exact pattern __tests__/lib/orphan-posts.test.ts was written for,
which recurred on four commercial pages sitting at positions 48-73. Nothing on
the site voted for the new page, so Google had no reason to rank it.

Adding it to relatedTours on posts that already earn traffic costs nothing and
flows authority immediately -- the same fix that unstranded 24 money pages when
the related-tours orphan fix shipped.

WHICH POSTS, AND WHY THOSE
--------------------------
Only posts where the tour is a genuine answer to what the reader is asking.
A relatedTours entry that does not fit is worse than none: it is a bad
recommendation shown to a reader who is already deciding.

RUN
---
    PYTHONIOENCODING=utf-8 py scripts/seo/link_8day_orphan.py
"""
import io

TOUR = "morocco-highlights-toubkal-sahara-8day"
PATH = "lib/blog.ts"

# Post slug -> the tour it should REPLACE, or None to append.
# Replacing keeps the arrays at three entries, which is what the card row
# renders; appending a fourth would silently drop one anyway.
TARGETS = [
    # Someone costing the 5-day combined trip is the closest possible match:
    # same two objectives, three more days, and a fixed-date alternative.
    ("toubkal-sahara-5day-cost", "sahara-3day-marrakech"),
    # Readers choosing between Toubkal itineraries should see the version that
    # adds the desert, since it answers "what else could I do with the time".
    ("toubkal-2-day-vs-4-day-which-trek", "toubkal-circuit-ifni-lake-6day"),
    ("toubkal-4-day-trek-cost", "toubkal-circuit-ifni-lake-6day"),
    # The complete guide is the highest-authority Toubkal page on the site.
    ("how-to-climb-toubkal-complete-guide", "toubkal-circuit-ifni-lake-6day"),
    # Desert-side entry point: someone pricing a Sahara trip who might prefer
    # the combined itinerary.
    ("3-day-sahara-tour-cost-marrakech", "merzouga-stargazing-desert-tour"),
]


def run():
    src = io.open(PATH, encoding="utf-8").read()
    changed = 0
    for slug, replace in TARGETS:
        key = '    slug: "%s",' % slug
        assert src.count(key) == 1, "%s: expected exactly one post" % slug
        at = src.index(key)
        rt = src.index("    relatedTours: [", at)
        end = src.index("]", rt)
        block = src[rt:end]
        if TOUR in block:
            print("  = %-40s already linked" % slug)
            continue
        assert '"%s"' % replace in block, "%s: %s not in relatedTours" % (slug, replace)
        new = block.replace('"%s"' % replace, '"%s"' % TOUR, 1)
        src = src[:rt] + new + src[end:]
        changed += 1
        print("  + %-40s %s -> 8day" % (slug, replace))

    io.open(PATH, "w", encoding="utf-8", newline="\n").write(src)
    print("\nlinked from %d posts" % changed)


run()
