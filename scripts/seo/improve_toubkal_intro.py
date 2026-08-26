# -*- coding: utf-8 -*-
"""Sharpen the H1 and opening paragraph of the 4-day Toubkal page.

H1
--
The <h1> renders `tour.title`, which was "Marrakech to Toubkal Summit — 4-Day
Trek". That reads back-to-front for search: the primary query is "Toubkal
summit trek" / "4 day Toubkal trek from Marrakech", and the strongest term sat
in the middle. Leading with "4-Day Toubkal Summit Trek" puts the exact phrase
first while keeping "from Marrakech" (the departure qualifier people actually
search) attached.

The H1 is deliberately NOT identical to the <title>. The title targets the SERP
listing; the H1 speaks to someone already on the page. Making them byte-identical
is a common over-optimisation and reads robotic.

INTRO
-----
The old first paragraph opened "The Toubkal Summit Trek is the definitive High
Atlas adventure... A life-changing four days". That is OTA copy: "definitive"
and "life-changing" are claims no reader believes and no competitor cannot also
write. It also buried the concrete facts (4,167 m, Imlil, refuge altitude, no
technical climbing) that both a nervous first-timer and a search engine want in
the first 100 words.

The replacement keeps every fact already on the page, front-loads the primary
keywords naturally in the first sentence, and swaps the superlatives for the
things only this operator can say: that the family is from the southern slopes
where these paths begin, and that the guide is licensed.

No new claims. The wording is taken from lib/guides.ts, which says Smail "was
raised in a village on the southern slopes of the High Atlas, where the paths
to Toubkal begin" -- it never names Imlil as the family's home. An earlier draft
of this script wrote "Imlil, the Berber village our family comes from", which
the site does not support. Imlil is named only as the TRAILHEAD, which the
tour's own highlights already state.

FACTS CHECKED AGAINST THE ITINERARY
-----------------------------------
An earlier draft said the trek "starts in Imlil" and that you "sleep two nights
at the refuge". The itinerary says day 1 is Marrakech -> Imlil, day 2 Imlil ->
Refuge, day 3 summit, day 4 out -- so it DEPARTS Marrakech, and the refuge
nights are 2 and 3. Every figure below now comes from the tour's own
itinerary: 1,740 m Imlil, 3,207 m refuge, 4,167 m summit, 5:00 am start, the
Mizane Valley and the Sidi Chamharouch shrine.

Note `includes` says "3 nights mountain refuge accommodation" while the
itinerary has night 1 in Imlil and nights 2-3 at the refuge. The intro follows
the itinerary and does not repeat the count; the discrepancy is flagged
separately rather than propagated into the prose.

CONSTRAINT
----------
`description` is quoted in the meta fallback chain (shortDescription is used
when seoDescription is absent), so it must stay factual and free of prices --
prices live in seoDescription, which is regenerated from the ladder.

RUN
---
    PYTHONIOENCODING=utf-8 py scripts/seo/improve_toubkal_intro.py
"""
import io

SLUG = "toubkal-summit-trek-4day"

OLD_TITLE = '    title: "Marrakech to Toubkal Summit — 4-Day Trek",'
NEW_TITLE = '    title: "4-Day Toubkal Summit Trek from Marrakech",'

OLD_DESC = (
    '    description:\n'
    '      "The Toubkal Summit Trek is the definitive High Atlas adventure. '
    'Cross ancient mule paths, sleep in mountain refuges, and stand on the '
    'highest point in North Africa as sunrise spreads across Morocco. A '
    'life-changing four days that requires fitness but no technical climbing.",'
)

NEW_DESC = (
    '    description:\n'
    '      "This 4-day Toubkal summit trek leaves Marrakech for Imlil '
    '(1,740 m) and climbs to 4,167 m — the highest peak in North Africa. Our '
    'family is from the southern slopes of the High Atlas, where these paths '
    'begin. You walk the old mule track up the Mizane Valley past the Sidi '
    'Chamharouch shrine to the refuge at 3,207 m, then start for the summit at '
    '5:00 am on day three and reach the top at sunrise. It asks for fitness '
    'and a head for long days, not for climbing experience: there is no rope '
    'and no technical ground, and your licensed mountain guide has walked this '
    'route in every season.",'
)


def run():
    path = "lib/tours.ts"
    src = io.open(path, encoding="utf-8").read()

    # Bound both edits to THIS tour's block. `title:` appears once per tour and
    # `description:` once per tour, so a whole-file replace would hit the wrong
    # one -- the same boundary trap as scripts/seo/retitle_priority.py.
    blocks = src.split('\n    slug: "')
    hit = 0
    for i, block in enumerate(blocks[1:], 1):
        if block[: block.index('"')] != SLUG:
            continue
        assert OLD_TITLE in block, "H1 title not found -- already changed?"
        assert OLD_DESC in block, "intro description not found -- already changed?"
        block = block.replace(OLD_TITLE, NEW_TITLE, 1)
        block = block.replace(OLD_DESC, NEW_DESC, 1)
        blocks[i] = block
        hit += 1

    assert hit == 1, "expected exactly one %s block, found %d" % (SLUG, hit)
    io.open(path, "w", encoding="utf-8", newline="\n").write('\n    slug: "'.join(blocks))
    print("  H1   -> 4-Day Toubkal Summit Trek from Marrakech")
    print("  intro rewritten (%d chars)" % (len(NEW_DESC) - 24))


run()
