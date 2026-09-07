/**
 * Localised labels for the gallery lightbox controls.
 *
 * These live in lib/ rather than beside the component because both callers are
 * SERVER components — components/sections/Gallery.tsx (the homepage section)
 * and the gallery page's content wrapper read the dictionary and pass the
 * result down. GalleryLightbox.tsx is "use client", and a function exported
 * from a client module cannot be called on the server: Next fails the build
 * with "Attempted to call lightboxLabels() from the server but lightboxLabels
 * is on the client". That is exactly what happened when this helper was
 * defined next to the component, and it is a build error rather than a type
 * error, so tsc and the whole test suite passed first.
 *
 * The labels themselves matter more than they look. The lightbox is a modal
 * that traps the page, and these are the accessible names of its only
 * controls — for someone using a screen reader they ARE the interface. All of
 * them were hardcoded English on all six locales, including Arabic, while
 * `close`, `previous` and `next` had been sitting translated in every
 * dictionary's `common` block the entire time with nothing passing them.
 */

export interface LightboxLabels {
  play?: string;
  pause?: string;
  close?: string;
  previous?: string;
  next?: string;
  /** Takes {n} and {total}, e.g. "Photo {n} of {total}". Used on the dots. */
  photoPosition?: string;
  /** Takes {alt}: the accessible name of a grid tile that opens the lightbox. */
  viewPhoto?: string;
}

/** The shape this needs off a dictionary's `common` block. Typed structurally
 *  rather than as `Dictionary`, because that type comes from a "server-only"
 *  module and importing it here would drag the server guard into the client
 *  component that consumes these labels. */
export interface CommonLabelSource {
  close?: string;
  previous?: string;
  next?: string;
  photoPosition?: string;
  viewPhoto?: string;
}

/**
 * Build the label set from a dictionary.
 *
 * Both galleries call this rather than each writing the mapping out, so a
 * label added here reaches every lightbox on the site instead of only the one
 * whose call site got updated.
 */
export function lightboxLabels(
  common: CommonLabelSource,
  slideshow?: { play?: string; pause?: string }
): LightboxLabels {
  return {
    close: common.close,
    previous: common.previous,
    next: common.next,
    photoPosition: common.photoPosition,
    viewPhoto: common.viewPhoto,
    play: slideshow?.play,
    pause: slideshow?.pause,
  };
}
