# -*- coding: utf-8 -*-
"""Point the events pages at colour tokens that actually exist.

THE BUG
-------
Both events pages style themselves with a --color-clay-* / --color-sand-<n> /
--color-terracotta-600 scale that is NOT defined anywhere in app/globals.css.
The real palette is a different scale entirely: --color-ink / --color-ink-soft /
--color-ink-muted for text, --color-sand / --color-sand-dark for surfaces and
rules, and --color-terracotta for the accent.

An undefined custom property makes the whole declaration invalid at computed-
value time, so `color: var(--color-clay-900)` does not fall back to a sensible
default -- it drops out and the element inherits whatever colour its ancestor
had. Every heading, paragraph and link on both events pages has been rendering
in an inherited colour rather than its intended one, live, since the feature
shipped. Backgrounds and borders vanished the same way.

Nothing caught it: `var()` with a missing property is perfectly valid CSS, so
there is no build error, no typecheck error and no test failure. The pages look
plausible -- just not as designed, and with lower contrast than intended on the
muted text.

THE MAPPING
-----------
Chosen by role, not by number, so contrast intent survives:

    clay-900  -> ink          #1F1A16  primary text (headings)
    clay-800  -> ink-soft     #4A443C  body copy
    clay-700  -> ink-muted    #6B6058  secondary text (AA on surface)
    clay-400  -> ink-faint    #9A9088  non-essential hairline marks only
    sand-300  -> sand-dark    #C9BDA9  rules and borders
    sand-50   -> sand         #E6DFD2  sunk surface
    terracotta-600 -> terracotta #B4472C  accent

RUN
---
    PYTHONIOENCODING=utf-8 py scripts/seo/fix_event_color_tokens.py
"""
import io

# Longest first: sand-300 must not be matched by a shorter "sand-3" prefix.
MAP = [
    ("--color-terracotta-600", "--color-terracotta"),
    ("--color-clay-900", "--color-ink"),
    ("--color-clay-800", "--color-ink-soft"),
    ("--color-clay-700", "--color-ink-muted"),
    ("--color-clay-400", "--color-ink-faint"),
    ("--color-sand-300", "--color-sand-dark"),
    ("--color-sand-50", "--color-sand"),
]

FILES = [
    "app/[lang]/events/[slug]/page.tsx",
    "app/[lang]/events/page.tsx",
]


def run():
    for path in FILES:
        src = io.open(path, encoding="utf-8").read()
        total = 0
        for old, new in MAP:
            n = src.count("var(%s)" % old)
            if n:
                src = src.replace("var(%s)" % old, "var(%s)" % new)
                total += n
        io.open(path, "w", encoding="utf-8", newline="\n").write(src)
        print("  %-40s %d references repointed" % (path, total))

    # Nothing anywhere should still reference the phantom scale.
    for path in FILES:
        src = io.open(path, encoding="utf-8").read()
        for old, _ in MAP:
            assert old not in src, "%s still references %s" % (path, old)


run()
