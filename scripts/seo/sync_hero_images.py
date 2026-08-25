# -*- coding: utf-8 -*-
"""Propagate English heroImage values into the five locale files.

The photo pass (commit 35cbdb1) wrote only lib/blog.ts and lib/tours.ts, so the
23 new photos never reached fr/es/de/it/ar. Those locales kept the OLD, heavily
duplicated heroes -- e.g. blog-hero-sahara-dunes-golden.jpg, which was the
thing the photo work existed to break up. 22 pages x 5 locales = 110 pages were
still showing the duplicates, and non-English is where the indexing gap is
worst.

A hero image is not translatable content: the same photo belongs on the same
page in every language. So English is the single source of truth here, and this
syncs every locale to it rather than trying to guess per-locale intent.

Only heroImage is touched. Editorial fields (title, body, seoTitle) are left
exactly as the translators wrote them.
"""
import io, re

LOCALES = ["fr", "es", "de", "it", "ar"]

# (english source file, locale file template)
SETS = [
    ("lib/tours.ts", "lib/tours.%s.ts"),
    ("lib/blog.ts", "lib/blog.%s.part2.ts"),
]


def blocks(text):
    """Map slug -> (start, end) using the 4-space `slug:` marker only.

    Bounding to one record matters: a loose regex will run past the end of an
    entry and match the NEXT entry's field, which silently hides mismatches.
    """
    idx = [m for m in re.finditer(r'\n    slug: "([^"]+)"', text)]
    out = {}
    for k, m in enumerate(idx):
        end = idx[k + 1].start() if k + 1 < len(idx) else len(text)
        out[m.group(1)] = (m.start(), end)
    return out


def hero(text, span):
    m = re.search(r'\n    heroImage: "([^"]+)"', text[span[0]:span[1]])
    return m.group(1) if m else None


def run():
    grand = 0
    for en_path, tmpl in SETS:
        en_src = io.open(en_path, encoding="utf-8").read()
        en_blocks = blocks(en_src)

        for loc in LOCALES:
            path = tmpl % loc
            try:
                src = io.open(path, encoding="utf-8").read()
            except IOError:
                print("  (skip, no file) %s" % path)
                continue

            changed = 0
            # rewrite back-to-front so earlier offsets stay valid
            for slug, span in sorted(blocks(src).items(),
                                     key=lambda kv: -kv[1][0]):
                if slug not in en_blocks:
                    continue
                want = hero(en_src, en_blocks[slug])
                if not want:
                    continue
                block = src[span[0]:span[1]]
                m = re.search(r'(\n    heroImage: ")([^"]+)(")', block)
                if not m or m.group(2) == want:
                    continue
                block = block[:m.start(2)] + want + block[m.end(2):]
                src = src[:span[0]] + block + src[span[1]:]
                changed += 1

            if changed:
                io.open(path, "w", encoding="utf-8", newline="\n").write(src)
            print("  %-28s %d heroes synced" % (path, changed))
            grand += changed

    print("TOTAL heroImage values synced: %d" % grand)


run()
