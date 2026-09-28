import type { GalleryPhotoData } from "./gallery-photos";

/**
 * The homepage shows a sample of the gallery, not the gallery.
 *
 * WHY
 * It used to render all 67 photos as tiles: a grid 9,268px tall on a phone,
 * about forty screens of pictures under the fold, 1,930 DOM elements on the
 * page. Lighthouse put 1.5-2.1s of mobile main-thread time into style and
 * layout, and the homepage was the one template that scored in the 70s while
 * blog and tour pages sat at 88-91. The full set has its own page, /gallery.
 *
 * Round-robin across groups so the sample shows the range of trips (mountain,
 * desert, coast, cities) rather than the first dozen Atlas shots, which is
 * what a plain slice of the canonical order would give.
 *
 * Spans are dropped: row-span-2 tiles in a short grid leave holes, and 12
 * uniform tiles fill 2 columns (mobile) and 3 columns (desktop) exactly.
 */
export const HOME_GALLERY_TILES = 12;

export function galleryPreview<T extends Pick<GalleryPhotoData, "group" | "span">>(
  photos: T[],
  count = HOME_GALLERY_TILES,
): T[] {
  const byGroup = new Map<string, T[]>();
  for (const p of photos) {
    const list = byGroup.get(p.group) ?? [];
    list.push(p);
    byGroup.set(p.group, list);
  }
  const queues = [...byGroup.values()];
  const out: T[] = [];
  for (let i = 0; out.length < count && queues.some((q) => i < q.length); i++) {
    for (const q of queues) {
      if (i < q.length && out.length < count) out.push({ ...q[i], span: undefined });
    }
  }
  return out;
}
