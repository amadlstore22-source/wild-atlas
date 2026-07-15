"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function NewsError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error("[news-error]", error);
  }, [error]);

  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center px-4 text-center py-20">
      <p className="text-brass-deep text-xs font-bold uppercase tracking-[0.2em] mb-4">
        News Unavailable
      </p>
      <h2 className="font-display text-charcoal text-3xl font-bold mb-3">
        Live feed is down
      </h2>
      <p className="text-ink-soft max-w-md leading-relaxed mb-8">
        Our live news feed is temporarily unavailable. Check back soon, or explore our travel guides in the meantime.
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <button
          onClick={unstable_retry}
          className="px-6 py-3 rounded-full bg-forest text-white font-bold text-sm hover:bg-moss transition-colors"
        >
          Try Again
        </button>
        <Link
          href="/en/blog"
          className="px-6 py-3 rounded-full border border-forest text-forest font-bold text-sm hover:bg-forest hover:text-white transition-colors"
        >
          Read Our Blog
        </Link>
      </div>
    </div>
  );
}
