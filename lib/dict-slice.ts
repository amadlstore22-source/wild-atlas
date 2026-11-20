import type { Dictionary } from "@/app/[lang]/dictionaries";

/**
 * Slices a full server Dictionary down to only the top-level namespaces a
 * `"use client"` component actually reads.
 *
 * Without slicing, Next.js serialises the entire 43–68 KB locale dictionary
 * into the RSC Flight payload of every HTML page whose layout or body mounts a
 * client component receiving `dict={dict}`.
 *
 * Client components type their prop as `Pick<Dictionary, ...>` so tests that
 * pass a full `Dictionary` remain type-compatible without changes.
 */
export function pickDict<K extends keyof Dictionary>(
  dict: Dictionary,
  ...keys: K[]
): Pick<Dictionary, K> {
  const out = {} as Pick<Dictionary, K>;
  for (const k of keys) out[k] = dict[k];
  return out;
}
