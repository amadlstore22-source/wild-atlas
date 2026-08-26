# -*- coding: utf-8 -*-
"""Bring every tour seoTitle/seoDescription inside Google's SERP budget.

SCOPE
-----
This is not a three-page problem. __tests__/lib/seo-meta-length.test.ts, run
against the catalogue on 2026-08-26, found 43 of 46 titles over 65 rendered
characters and 23 of 46 descriptions over 160. The three hand-written pages
were the only compliant ones. Hand-editing 43 more strings would drift the
moment a tour is added, so this trims by rule.

THE SHAPE OF THE DATA
---------------------
Almost every title follows `Primary Keyword — Feature, Feature & Feature`:

    "4-Day Desert Tour from Agadir — Erg Chebbi, Taroudant, Todra Gorge &
     Road of 1000 Kasbahs | Marrakech Eco Tours"

The head before the em dash IS the keyword phrase people search; the tail is a
feature list that Google truncates anyway. So the rule is: keep the head, then
re-add as many tail items as fit whole. Nothing is invented and nothing is
reworded -- this only decides where to stop.

BUDGET
------
`seoTitle` carries "| Marrakech Eco Tours" inline AND app/[lang]/layout.tsx
appends the same suffix, so the tour page strips the inline copy first. The
rendered length is therefore (stripped title + 22), which leaves ~43 characters
before the brand at the 65 limit.

DESCRIPTIONS
------------
Descriptions are trimmed at a SENTENCE boundary, never mid-clause, keeping
whole sentences while they fit. Several end with a price sentence ("From
$380.") that localisePrice() rewrites at render time; that sentence is short
and usually survives, but where it does not the price is still on the page and
in the AggregateOffer, so nothing is lost that Google could not already see.

RUN
---
    PYTHONIOENCODING=utf-8 py scripts/seo/trim_serp_lengths.py
"""
import io
import re

TITLE_MAX = 65
DESC_MAX = 160
BRAND = " | Marrakech Eco Tours"
BRAND_RE = re.compile(r"\s*\|\s*Marrakech Eco Tours\s*$")

PAT_TITLE = re.compile(r'\n    seoTitle: "((?:[^"\\]|\\.)*)"')
PAT_DESC = re.compile(r'\n    seoDescription:\s*\n?\s*"((?:[^"\\]|\\.)*)"')

# Em dash, en dash and the colon all introduce the trimmable tail.
SPLIT = re.compile(r"\s+[—–]\s+|:\s+")


def trim_title(raw):
    """Shorten to fit TITLE_MAX once the brand suffix is appended."""
    body = BRAND_RE.sub("", raw)
    budget = TITLE_MAX - len(BRAND)
    if len(body) <= budget:
        return raw  # already fits; leave the string byte-identical

    parts = SPLIT.split(body, 1)
    head = parts[0].strip()
    if len(head) > budget:
        # Even the keyword head is too long. Drop trailing comma-clauses first,
        # then trailing "from <City>" / "in <City>" -- the departure qualifier is
        # the least load-bearing part of a head that is already specific, and
        # dropping it beats cutting a word in half. Five titles reached 74-82
        # rendered chars this way ("Souss-Massa National Park Wildlife Tour from
        # Agadir - Rare Northern Bald Ibis") because an earlier version simply
        # gave up and returned the string untouched.
        while len(head) > budget and "," in head:
            head = head.rsplit(",", 1)[0].strip()
        if len(head) > budget:
            head = re.sub(r"\s+(?:from|in|near)\s+[A-Z][\w'-]*(?:\s+[A-Z][\w'-]*)?$", "", head).strip()
        # Still too long: drop whole words from the end rather than mid-word.
        while len(head) > budget and " " in head:
            head = head.rsplit(" ", 1)[0].strip()
        return head + BRAND if len(head) <= budget else raw

    if len(parts) == 1:
        return head + BRAND

    # Re-add tail items (split on , and &) while they fit whole.
    tail_items = [x.strip() for x in re.split(r",|\s+&\s+", parts[1]) if x.strip()]
    out = head
    kept = 0
    for item in tail_items:
        cand = out + (" — " if out == head else ", ") + item
        if len(cand) <= budget:
            out = cand
            kept += 1
        else:
            break
    # A tail of exactly ONE item out of several reads as a truncation artefact,
    # not a title: "Marrakech Medina Cultural Tour — Souks" and "5-Day Agadir to
    # Chefchaouen Tour — Fes" both looked like the string had been cut off
    # mid-list. Keep a one-item tail only when that item was the whole tail.
    if kept == 1 and len(tail_items) > 1:
        return head + BRAND
    return out + BRAND


def trim_desc(raw):
    """Keep whole sentences while they fit inside DESC_MAX."""
    if len(raw) <= DESC_MAX:
        return raw
    # Split after . ! ? followed by a space, keeping the delimiter.
    sentences = re.findall(r"[^.!?]*[.!?]+\s*|[^.!?]+$", raw)
    out = ""
    for s in sentences:
        if len(out) + len(s.rstrip()) <= DESC_MAX:
            out += s
        else:
            break
    out = out.strip()
    if not out:
        # A single sentence longer than the budget: cut at the last comma, then
        # the last space, so the snippet still ends on a word.
        cut = raw[:DESC_MAX]
        for sep in (",", " "):
            if sep in cut:
                cut = cut.rsplit(sep, 1)[0]
                break
        out = cut.rstrip(" ,") + "."
    return out


def run():
    path = "lib/tours.ts"
    src = io.open(path, encoding="utf-8").read()
    blocks = src.split('\n    slug: "')
    t_fixed = d_fixed = 0

    for i, block in enumerate(blocks[1:], 1):
        slug = block[: block.index('"')]

        # Bounded to one tour's block: a whole-file regex rewrites the NEXT
        # tour's field, which is the trap documented in retitle_priority.py.
        m = PAT_TITLE.search(block)
        if m:
            new = trim_title(m.group(1))
            if new != m.group(1):
                block = block[: m.start()] + '\n    seoTitle: "' + new + '"' + block[m.end():]
                t_fixed += 1
                print("  T %-34s %3d -> %3d" % (
                    slug, len(BRAND_RE.sub("", m.group(1))) + len(BRAND),
                    len(BRAND_RE.sub("", new)) + len(BRAND)))

        m = PAT_DESC.search(block)
        if m:
            new = trim_desc(m.group(1))
            if new != m.group(1):
                block = block[: m.start()] + '\n    seoDescription:\n      "' + new + '"' + block[m.end():]
                d_fixed += 1
                print("  D %-34s %3d -> %3d" % (slug, len(m.group(1)), len(new)))

        blocks[i] = block

    io.open(path, "w", encoding="utf-8", newline="\n").write('\n    slug: "'.join(blocks))
    print("trimmed %d titles, %d descriptions" % (t_fixed, d_fixed))


run()
