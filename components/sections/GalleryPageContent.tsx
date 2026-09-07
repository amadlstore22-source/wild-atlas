"use client";
import GalleryLightbox from "@/components/ui/GalleryLightbox";
import { lightboxLabels } from "@/lib/lightbox-labels";
import AnimateInView from "@/components/ui/AnimateInView";
import { GALLERY_PHOTOS, GALLERY_GROUP_ORDER } from "@/lib/gallery-photos";
import type { GalleryGroup } from "@/lib/gallery-photos";
import type { Dictionary } from "@/app/[lang]/dictionaries";

/**
 * The gallery page's grids, one section per region.
 *
 * Photos are grouped rather than shown as one 66-frame wall. Two reasons, and
 * neither is decoration: a visitor deciding between the Atlas and the desert
 * can look at one without scrolling past the other, and the section headings
 * and blurbs give the page real indexable text — a bare grid of images gives a
 * crawler nothing to rank, which is the whole problem with building a gallery
 * as a slideshow and stopping there.
 *
 * The page's slideshow is the hero (GalleryHeroSlideshow), which runs on its
 * own from the moment the page loads. There is deliberately no "play" button
 * here: a gallery that opens on a still frame and asks to be started makes the
 * visitor do something before the page does anything. Clicking any tile below
 * still opens the lightbox, which has its own play/pause for watching the full
 * set at leisure.
 */

type GroupCopy = { title: string; blurb: string };

export default function GalleryPageContent({ dict }: { dict: Dictionary }) {
  const copy: Record<GalleryGroup, GroupCopy> = {
    atlas: { title: dict.gallery.groupAtlas, blurb: dict.gallery.groupAtlasBlurb },
    desert: { title: dict.gallery.groupDesert, blurb: dict.gallery.groupDesertBlurb },
    cities: { title: dict.gallery.groupCities, blurb: dict.gallery.groupCitiesBlurb },
    coast: { title: dict.gallery.groupCoast, blurb: dict.gallery.groupCoastBlurb },
  };

  return (
    <>
      {GALLERY_GROUP_ORDER.map((group) => {
        const photos = GALLERY_PHOTOS.filter((p) => p.group === group);
        if (photos.length === 0) return null;
        return (
          <section key={group} className="mb-20 last:mb-0 scroll-mt-24" id={group}>
            <AnimateInView variant="fade-up" className="mb-8 max-w-2xl">
              <h2
                className="font-bold text-ink"
                style={{ fontSize: "clamp(1.6rem, 3vw, 2.25rem)" }}
              >
                {copy[group].title}
              </h2>
              <p className="text-ink-muted mt-3 leading-relaxed">{copy[group].blurb}</p>
            </AnimateInView>

            {/* Same grid as the homepage section, so a photo carrying a
                row-span reads the way it was composed to. */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 auto-rows-[220px]">
              <GalleryLightbox
                photos={photos}
                labels={lightboxLabels(dict.common, {
                  play: dict.gallery.slideshow,
                  pause: dict.gallery.slideshowStop,
                })}
              />
            </div>
          </section>
        );
      })}
    </>
  );
}
