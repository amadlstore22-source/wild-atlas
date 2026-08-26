"use client";

import { LazyMotion, domAnimation } from "motion/react";
import type { ReactNode } from "react";

/**
 * Loads Motion's DOM animation features once, for the whole app.
 *
 * WHY
 * ---
 * The `motion` component cannot be tree-shaken below 34kb: its API is
 * declarative and props-driven, so a bundler cannot tell which features a given
 * <motion.div> will use. Sixteen client components import it, and the homepage
 * alone shipped ~1,011kb of JavaScript.
 *
 * Motion's own guidance (motion://docs/react/react-reduce-bundle-size) is to
 * import the slim `m` component instead and supply the feature bundle through
 * LazyMotion: ~4.6kb for the initial render, plus the feature package.
 *
 * WHICH PACKAGE
 * -------------
 * `domAnimation` (+15kb), not `domMax` (+25kb). domMax exists for pan/drag
 * gestures and layout animations, and this codebase uses NEITHER -- a grep for
 * `layout`/`layoutId`/`drag` as JSX props returns zero hits across app/ and
 * components/. (A naive text search suggests 21 "layout" matches; every one is
 * a Tailwind class name, not a Motion prop.) Everything actually used --
 * animate, initial, variants, whileHover, whileTap, whileInView, exit via
 * AnimatePresence -- is covered by domAnimation.
 *
 * Loaded synchronously rather than via dynamic import: these are above-the-fold
 * entrance animations (Hero, TrustBar), and deferring them would let the first
 * paint land un-animated and then pop.
 *
 * NOT `strict`
 * ------------
 * LazyMotion accepts a `strict` prop that throws if a full `motion` component
 * renders inside it. It is deliberately off: `strict` throws at RUNTIME, in the
 * browser, which turns a missed import into a blank page for a real visitor.
 * __tests__/lib/motion-imports.test.ts enforces the same rule at build time
 * instead, where a mistake costs a failed CI run rather than a lost booking.
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}
