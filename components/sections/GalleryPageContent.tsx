"use client";
import { useState } from "react";
import { Play } from "@phosphor-icons/react";
import { useReducedMotion } from "motion/react";
import GalleryLightbox, { GallerySlideshow } from "@/components/ui/GalleryLightbox";
import AnimateInView from "@/components/ui/AnimateInView";
import { GALLERY_PHOTOS, GALLERY_GROUP_ORDER } from "@/lib/gallery-photos";
import type { GalleryGroup } from "@/lib/gallery-photos";
import type { Dictionary } from "@/app/[lang]/dictionaries";

/**
 * The gallery page's interactive half.
 *
 * Why a client component wrapping the whole page body rather than the page
 * itself: the "play slideshow" button and the modal have to share state, and
 * the button sits above the grid instead of inside it — so GalleryLightbox,
 * whose photo tiles ARE its own trigger, cannot be what opens it. The page
 * stays a server component and hands this its strings.
 *
 * Photos are grouped by region rather than shown as one 66-frame wall. Two
 * reasons, and neither is decoration: a visitor deciding between the Atlas and
 * the desert can look at one without scrolling past the other, and the section
 * headings and blurbs give the page real indexable text — a bare grid of images
 * gives a crawler nothing to rank, which is the whole problem with building a
 * gallery as a slideshow and stopping there.
 */

type GroupCopy = { title: string; blurb: string };

export default function GalleryPageContent({ dict }: { dict: Dictionary }) {
  const [slideshow, setSlideshow] = useState(false);
  // Matches the lightbox: someone who asked for less motion is not offered a
  // control whose only function is to start something moving on its own.
  const reduce = useReducedMotion();

  const copy: Record<GalleryGroup, GroupCopy> = {
    atlas: { title: dict.gallery.groupAtlas, blurb: dict.gallery.groupAtlasBlurb },
    desert: { title: dict.gallery.groupDesert, blurb: dict.gallery.groupDesertBlurb },
    cities: { title: dict.gallery.groupCities, blurb: dict.gallery.groupCitiesBlurb },
    coast: { title: dict.gallery.groupCoast, blurb: dict.gallery.groupCoastBlurb },
  };

  return (
    <>
      {!reduce && (
        <div className="flex justify-center mb-14">
          <button
            onClick={() => setSlideshow(true)}
            className="flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-forest text-white font-bold text-sm hover:bg-moss transition-colors shadow-lg shadow-forest/20"
          >
            <Play className="w-4 h-4" weight="fill" />
            {dict.gallery.slideshow}
          </button>
        </div>
      )}

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
              <GalleryLightbox photos={photos} />
            </div>
          </section>
        );
      })}

      {/* The slideshow runs the WHOLE gallery, not one section: someone who
          presses play wants to sit back, and stopping at the end of the Atlas
          block would be an odd place to stop. */}
      <GallerySlideshow
        photos={GALLERY_PHOTOS}
        open={slideshow}
        onClose={() => setSlideshow(false)}
      />
    </>
  );
}
