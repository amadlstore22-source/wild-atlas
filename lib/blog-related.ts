import type { BlogPost } from "./blog";

/**
 * Selects related posts for the blog sidebar so every article receives inbound
 * sidebar links instead of concentrating them on the oldest entries.
 *
 * WHY THIS EXISTS (2026-11-20). app/[lang]/blog/[slug]/page.tsx previously ran
 * `posts.filter(...).slice(0, 3)` on the full array, which always picked the
 * first 3 posts in each category. Measured across all 122 English posts: only
 * 17 posts ever received a sidebar link (up to 39 each), while 105 posts got
 * zero. Worse, it filtered by `p.slug !== params.slug`, which failed to exclude
 * the current post on localized FR/ES/DE/IT URLs where params.slug is the
 * translated segment and p.slug is the English key.
 *
 * Strategy: within the post's own category, pick the next two cyclic neighbors
 * (guaranteeing every post in every category receives >= 2 sidebar links), then
 * fill the remaining slot with the highest-relevance match by shared region,
 * shared relatedTours, and shared tags.
 */
export function selectRelatedPosts(
  posts: readonly BlogPost[],
  current: BlogPost,
  count = 3,
): BlogPost[] {
  const chosen: BlogPost[] = [];
  const seen = new Set<string>([current.slug]);

  const sameCat = posts.filter((p) => p.category === current.category);
  const catIdx = sameCat.findIndex((p) => p.slug === current.slug);
  if (catIdx >= 0 && sameCat.length > 1) {
    const candidate = sameCat[(catIdx + 1) % sameCat.length];
    if (!seen.has(candidate.slug)) {
      chosen.push(candidate);
      seen.add(candidate.slug);
    }
  }

  // Slot 2: next cyclic neighbour in the same geographic region (covers
  // singleton categories like "wildlife" that share a region with sibling
  // Agadir/Atlas guides), falling back to a second category neighbour.
  if (chosen.length < count && current.region) {
    const sameRegion = posts.filter((p) => p.region === current.region);
    const regIdx = sameRegion.findIndex((p) => p.slug === current.slug);
    if (regIdx >= 0 && sameRegion.length > 1) {
      for (let step = 1; step < sameRegion.length; step++) {
        const candidate = sameRegion[(regIdx + step) % sameRegion.length];
        if (!seen.has(candidate.slug)) {
          chosen.push(candidate);
          seen.add(candidate.slug);
          break;
        }
      }
    }
  }

  if (chosen.length < Math.min(2, count) && catIdx >= 0 && sameCat.length > 2) {
    for (let step = 2; step < sameCat.length && chosen.length < Math.min(2, count); step++) {
      const candidate = sameCat[(catIdx + step) % sameCat.length];
      if (!seen.has(candidate.slug)) {
        chosen.push(candidate);
        seen.add(candidate.slug);
      }
    }
  }

  if (chosen.length >= count) return chosen.slice(0, count);

  const curTags = new Set(current.tags);
  const curTours = new Set(current.relatedTours ?? []);
  const scored = posts
    .filter((p) => !seen.has(p.slug))
    .map((p, idx) => {
      let score = 0;
      if (current.region && current.region !== "root" && p.region === current.region) score += 4;
      if (p.category === current.category) score += 2;
      for (const t of p.tags) if (curTags.has(t)) score += 2;
      for (const s of p.relatedTours ?? []) if (curTours.has(s)) score += 3;
      return { p, score, idx };
    })
    .filter((x) => x.score > 0);

  // Rotate tie-breaks by current post index so equal-score posts share links
  // evenly instead of piling onto the first entries in lib/blog.ts.
  const curIndex = Math.max(0, posts.findIndex((p) => p.slug === current.slug));
  const total = Math.max(1, posts.length);
  scored.sort(
    (a, b) =>
      b.score - a.score ||
      ((a.idx - curIndex + total) % total) - ((b.idx - curIndex + total) % total),
  );

  for (const { p } of scored) {
    if (chosen.length >= count) break;
    chosen.push(p);
    seen.add(p.slug);
  }

  return chosen;
}
