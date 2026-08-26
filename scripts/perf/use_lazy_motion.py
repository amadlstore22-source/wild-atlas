# -*- coding: utf-8 -*-
"""Switch the 16 client components from `motion` to the slim `m` component.

WHY
---
The `motion` component cannot be tree-shaken below 34kb (Motion's own docs:
motion://docs/react/react-reduce-bundle-size). Importing `m` from
"motion/react-m" and supplying features once via <LazyMotion> drops the
initial render to ~4.6kb + the 15kb domAnimation package.

WHAT CHANGES
------------
    import { motion } from "motion/react";     ->  import * as m from "motion/react-m";
    import { motion, useScroll } from "...";   ->  import * as m from "motion/react-m";
                                                   import { useScroll } from "motion/react";
    <motion.div>                               ->  <m.div>

Hooks (useScroll, useSpring, useTransform, useInView, useReducedMotion,
useMotionValueEvent) and AnimatePresence keep importing from "motion/react":
they are separate exports, are already tree-shakeable, and are unaffected by
LazyMotion.

SAFETY
------
`m` has the identical API surface to `motion`; only the feature loading differs.
No prop, transition or variant changes. Files that import no `motion` component
are left untouched.
"""
import io
import os
import re

ROOTS = ["app", "components"]
IMPORT_RE = re.compile(r'import\s*\{([^}]*)\}\s*from\s*"motion/react";')


def convert(src):
    m = IMPORT_RE.search(src)
    if not m:
        return None
    names = [n.strip() for n in m.group(1).split(",") if n.strip()]
    if "motion" not in names:
        return None  # hooks-only file: nothing to do

    rest = [n for n in names if n != "motion"]
    new_import = 'import * as m from "motion/react-m";'
    if rest:
        new_import += '\nimport { %s } from "motion/react";' % ", ".join(rest)

    src = src[: m.start()] + new_import + src[m.end():]
    # <motion.div ...> and </motion.div> -> <m.div ...> </m.div>
    src = re.sub(r"<motion\.", "<m.", src)
    src = re.sub(r"</motion\.", "</m.", src)
    # motion.div used as a value (styled(motion.div), const X = motion.div)
    src = re.sub(r"(?<![.\w])motion\.(?=[a-zA-Z])", "m.", src)
    return src


def run():
    changed = 0
    for root in ROOTS:
        for dirpath, _dirs, files in os.walk(root):
            for name in files:
                if not name.endswith(".tsx"):
                    continue
                path = os.path.join(dirpath, name)
                src = io.open(path, encoding="utf-8").read()
                out = convert(src)
                if out is None or out == src:
                    continue
                io.open(path, "w", encoding="utf-8", newline="\n").write(out)
                changed += 1
                print("  %s" % path.replace("\\", "/"))
    print("converted %d files to the m component" % changed)


run()
