import type { Metadata } from "next";
import Link from "next/link";

// Next emits its own `noindex` on the 404 page, but the root layout declares a
// site-wide `robots: { index: true }` default, and that second tag wins by
// document order — so the built 404 carried "noindex" followed by
// "index, follow". Search Console reported a 404 URL
// (www.marrakechecotours.com/$) that Google had crawled and kept in its index
// rather than dropping. Restating noindex here removes the contradiction.
//
// The 404 status code is what really matters and was always correct; this
// makes the meta agree with it instead of arguing with it.
export const metadata: Metadata = {
  // The root layout's title template appends "| Marrakech Eco Tours", so
  // naming the brand here rendered it twice.
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-6 py-24 text-center">
      <p className="font-mono text-sm uppercase tracking-[0.2em] text-ink/50">404</p>
      <h1 className="mt-4 font-display text-3xl font-bold text-ink sm:text-4xl">
        This page doesn&apos;t exist
      </h1>
      <p className="mt-4 max-w-md text-ink/70">
        The link may be out of date, or the address slightly off. Everything we run is
        one click away.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/en/tours"
          className="rounded-full bg-indigo px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo/90"
        >
          Browse all tours
        </Link>
        <Link
          href="/en"
          className="rounded-full border border-ink/15 px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-ink/30"
        >
          Go to the homepage
        </Link>
      </div>
    </main>
  );
}
