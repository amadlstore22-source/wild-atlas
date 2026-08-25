# -*- coding: utf-8 -*-
"""Spread ogBase(lang) into every page template that declares its own openGraph.

Next replaces (never merges) a layout's `openGraph` when a page declares one,
so all these pages lost og:type and og:site_name, and og:locale was absent
site-wide. See lib/seo/open-graph.ts for the full reasoning.

The blog page already sets `type: "article"`, and a later key wins in a JS
object literal, so spreading the base FIRST preserves that override.
"""
import io, os, re

FILES = [
    "app/[lang]/tours/[slug]/page.tsx",
    "app/[lang]/blog/[slug]/page.tsx",
    "app/[lang]/categories/[category]/page.tsx",
    "app/[lang]/destinations/[dest]/page.tsx",
    "app/[lang]/destinations/page.tsx",
    "app/[lang]/about/page.tsx",
    "app/[lang]/contact/page.tsx",
    "app/[lang]/how-we-operate/page.tsx",
    "app/[lang]/page.tsx",
]

IMPORT = 'import { ogBase } from "@/lib/seo/open-graph";\n'


def run():
    for path in FILES:
        if not os.path.exists(path):
            print("  MISSING", path)
            continue
        src = io.open(path, encoding="utf-8").read()

        if "ogBase(" in src:
            print("  already done:", path)
            continue

        # 1. add the import after the last existing import line
        if "@/lib/seo/open-graph" not in src:
            imports = [m for m in re.finditer(r'^import .*?;\n', src, re.M | re.S)]
            if not imports:
                print("  NO IMPORTS FOUND:", path)
                continue
            at = imports[-1].end()
            src = src[:at] + IMPORT + src[at:]

        # 2. spread the base as the first key of each openGraph object
        n = 0
        out = []
        i = 0
        for m in re.finditer(r'openGraph: \{\n', src):
            indent = re.match(r'[ \t]*', src[src.rfind("\n", 0, m.start()) + 1:]).group(0)
            out.append(src[i:m.end()])
            out.append("%s  ...ogBase(lang),\n" % indent)
            i = m.end()
            n += 1
        out.append(src[i:])
        src = "".join(out)

        io.open(path, "w", encoding="utf-8", newline="\n").write(src)
        print("  %-46s %d openGraph block(s)" % (path, n))


run()
