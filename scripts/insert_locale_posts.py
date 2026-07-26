# -*- coding: utf-8 -*-
"""Append translated Agadir posts to a locale's blog part2 file.
Usage: python insert_locale_posts.py <part2_file> <posts_txt>"""
import sys

part2 = sys.argv[1]
posts_txt = sys.argv[2]
posts = open(posts_txt, encoding="utf-8").read().rstrip("\n")

lines = open(part2, encoding="utf-8").read().split("\n")
# The array closes with a lone "];" — insert before the LAST one.
idx = max(i for i, l in enumerate(lines) if l.strip() == "];")
new = lines[:idx] + posts.split("\n") + lines[idx:]
open(part2, "w", encoding="utf-8").write("\n".join(new))
print(f"Appended posts to {part2} before line {idx}.")
