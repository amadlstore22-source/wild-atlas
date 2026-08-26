# -*- coding: utf-8 -*-
"""Append the translated posts to their locale files and register the slugs.

One module per locale (posts_fr.py, posts_es.py, ...) so a single language can
be regenerated without touching the others, and so no file gets large enough
that an edit to one language risks corrupting another.

Usage:  PYTHONIOENCODING=utf-8 py scripts/run_locale_posts.py fr es de it ar
"""
import io, importlib, re, sys

sys.path.insert(0, "scripts")
from add_three_posts_locales import NEW_SLUGS, block, register_proxy, S  # noqa: E402


def append(loc):
    mod = importlib.import_module("posts_%s" % loc)
    path = "lib/blog.%s.part2.ts" % loc
    src = io.open(path, encoding="utf-8").read()

    blocks = ""
    for en_slug, p in mod.POSTS:
        slug = S(en_slug, loc)
        if '"%s"' % slug in src:
            print("    already present: %s" % slug)
            continue
        blocks += block(slug, p)

    if not blocks:
        print("  %s: nothing to add" % path)
        return 0

    m = None
    for m in re.finditer(r"\n\];", src):
        pass
    if not m:
        raise SystemExit("could not find array end in " + path)

    src = src[:m.start()] + "\n" + blocks.rstrip("\n") + src[m.start():]
    src = src.replace("~BT~", chr(96))
    io.open(path, "w", encoding="utf-8", newline="\n").write(src)
    n = len(mod.POSTS)
    print("  %s: added %d posts" % (path, n))
    return n


def main():
    locales = sys.argv[1:] or ["fr", "es", "de", "it", "ar"]
    total = 0
    for loc in locales:
        try:
            total += append(loc)
        except ImportError:
            print("  scripts/posts_%s.py not written yet — skipping" % loc)
    if total:
        register_proxy()
    print("done: %d locale posts" % total)


main()
