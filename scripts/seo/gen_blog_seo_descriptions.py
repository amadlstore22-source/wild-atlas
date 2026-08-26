# -*- coding: utf-8 -*-
"""Give every blog post a meta description that fits the SERP snippet.

THE DEFECT
----------
app/[lang]/blog/[slug]/page.tsx resolves the meta description as
`post.seoDescription ?? post.excerpt`. Only 9 of 90 posts define
seoDescription, so 81 fall back to `excerpt` -- and excerpt is written for the
CARD, where three lines of prose look good. 74 of the 90 effective descriptions
run over 160 characters; the worst is 264. Google truncates around 155-160, so
those snippets are cut mid-sentence and the closing hook is never seen.

Truncating `excerpt` itself would be wrong: it renders on the blog index, in
RelatedGuides and on the homepage cards, where the longer form is correct. So
this adds a separate `seoDescription` and leaves excerpt alone -- exactly the
split the type already anticipates.

HOW THE TEXT IS DERIVED
-----------------------
From the post's own excerpt, cut at a sentence boundary and never mid-clause.
Nothing is invented and nothing is reworded: this only chooses where to stop.
Where the first sentence alone already exceeds the budget, it falls back to a
clause boundary (comma/dash) so the result still ends on a complete thought.

Posts that already define seoDescription are left untouched, except where that
value is itself over budget -- one is, at 164.

RUN
---
    PYTHONIOENCODING=utf-8 py scripts/seo/gen_blog_seo_descriptions.py
"""
import io
import re

MAX = 158  # a little under Google's ~160 so the ellipsis is never forced
# A snippet far under the budget wastes the space Google gives it. An earlier
# run stopped at the first sentence, which left "Is Morocco safe for solo female
# travellers?" as a 43-character description on a 189-character excerpt. Below
# MIN the generator keeps adding sentences even past MAX and then cuts at a
# clause boundary, which reads better than a one-line question alone.
MIN = 90
PATH = "lib/blog.ts"

EXCERPT = re.compile(r'\n    excerpt:\s*\n?\s*"((?:[^"\\]|\\.)*)"')
SEODESC = re.compile(r'\n    seoDescription:\s*\n?\s*"((?:[^"\\]|\\.)*)"')
SENTENCES = re.compile(r"[^.!?]*[.!?]+\s*|[^.!?]+$")


def shorten(text):
    """Whole sentences while they fit; otherwise cut at a clause boundary."""
    text = text.strip()
    if len(text) <= MAX:
        return text

    out = ""
    for s in SENTENCES.findall(text):
        if len(out) + len(s.rstrip()) <= MAX:
            out += s
        else:
            break
    out = out.strip()
    if len(out) >= MIN:
        return out

    # Too short to be worth the slot: take the budget's worth of text and cut
    # at the last clause boundary so it still ends on a complete thought.
    cut = text[:MAX]
    for sep in (" — ", "; ", ", ", " "):
        if sep in cut:
            trimmed = cut.rsplit(sep, 1)[0].rstrip(" ,;—-")
            if len(trimmed) >= MIN:
                return trimmed + "."
    if out:
        return out

    # A single sentence longer than the budget. Prefer a clause break, then a
    # word break -- never a mid-word cut.
    cut = text[:MAX]
    for sep in (" — ", "; ", ", ", " "):
        if sep in cut:
            cut = cut.rsplit(sep, 1)[0]
            break
    return cut.rstrip(" ,;—-") + "."


def run():
    src = io.open(PATH, encoding="utf-8").read()
    blocks = src.split('\n    slug: "')
    added = fixed = 0

    for i, block in enumerate(blocks[1:], 1):
        slug = block[: block.index('"')]
        existing = SEODESC.search(block)
        excerpt = EXCERPT.search(block)

        if existing:
            if len(existing.group(1)) <= MAX:
                continue  # already fine
            new = shorten(existing.group(1))
            block = block[: existing.start()] + '\n    seoDescription:\n      "' + new + '"' + block[existing.end():]
            fixed += 1
            print("  fix %-46s %3d -> %3d" % (slug[:46], len(existing.group(1)), len(new)))
        else:
            if not excerpt:
                continue
            if len(excerpt.group(1)) <= MAX:
                continue  # excerpt is short enough to serve as the description
            new = shorten(excerpt.group(1))
            # Insert directly after the excerpt so related fields stay together.
            at = excerpt.end()
            block = block[:at] + '\n    seoDescription:\n      "' + new + '",' + block[at:]
            added += 1

        blocks[i] = block

    io.open(PATH, "w", encoding="utf-8", newline="\n").write('\n    slug: "'.join(blocks))
    print("added %d seoDescriptions, shortened %d existing" % (added, fixed))


run()
