# -*- coding: utf-8 -*-
"""Add the Tibherine plane-wreck section to the Toubkal complete guide.

WHY IT GOES IN THE GUIDE AND NOT A TOUR GALLERY
------------------------------------------------
The wreck sits on Tibherine East, a SEPARATE summit from Toubkal. None of our
standard Toubkal itineraries goes there -- day 3 of the 4-day is Toubkal's
summit and back to the refuge. Putting wreck photographs in a tour gallery
would imply a stop the tour does not include, which is the same
misrepresentation as quoting a tour price as admission to a festival.

The guide is editorial, so it can describe something on the massif without
promising it.

WHAT IS ASSERTED, AND ON WHAT AUTHORITY
---------------------------------------
The client supplied "Tibhirine summit" plus an aggregated summary giving
"3,886-3,887 m" and "1969/1970". Both ranges looked like source disagreement
and turned out not to be:

  - the elevations are TWO SUMMITS, not one contested figure. Tibherine East
    is 3,880 m and Tibherine West 3,887 m. The wreck is on the EAST top.
  - the dates are the CRASH and the DISCOVERY. It struck on 28 Nov 1969; the
    wreck was not located until 18 July 1970.

Verified against the Bureau of Aircraft Accidents Archives record and
SummitPost, not an aggregator -- the same rule lib/events.ts enforces for
festival dates, and for the same reason.

Deliberately NOT asserted: that our treks visit it. They do not.

RUN
---
    PYTHONIOENCODING=utf-8 py scripts/seo/add_tibherine_section.py
"""
import io

PATH = "lib/blog.ts"
SLUG = "how-to-climb-toubkal-complete-guide"

SECTION = """
## The plane wreck on Tibherine

Trekkers on the Toubkal massif often come back asking about the aircraft
engine sitting on a summit east of the main peak. It is real, and the story
behind it is worth knowing.

On the night of 28 November 1969 a Lockheed L-749A Constellation flying from
Faro in Portugal towards Sao Tome — carrying ammunition bound for Biafra —
lost engine power over Morocco. The crew asked to divert, but the aircraft
lost height and struck Tibherine East at around 3,880 m. All eight people on
board were killed. The wreck was not found until 18 July 1970, when
mountaineers came across it; debris is scattered down the west face, and one
of the engines remains embedded in the summit rocks.

Tibherine is a twin summit — East at 3,880 m and West at 3,887 m, close enough
in height and shape that they are known locally as the twins. The wreck is on
the eastern top.

**It is not on the standard Toubkal route.** Our summit treks go to Toubkal
itself and return to the refuge, so reaching the wreck means a separate
objective and a guide who knows the approach. If seeing it matters to you, say
so when you enquire and we will tell you honestly whether it fits the itinerary
you are considering — on a two-day trek, it does not.
"""


def run():
    src = io.open(PATH, encoding="utf-8").read()
    key = '    slug: "%s",' % SLUG
    at = src.index(key)
    # The post's own content block: from its `content:` backtick to the closing
    # backtick that ends it. Anchored inside THIS post so a later post's
    # content field cannot be matched by accident.
    c = src.index("content: `", at)
    end = src.index("\n    `,", c)
    assert "Tibherine" not in src[c:end], "section already present"
    src = src[:end] + "\n" + SECTION + src[end:]
    io.open(PATH, "w", encoding="utf-8", newline="\n").write(src)
    print("added the Tibherine section to %s" % SLUG)


run()
