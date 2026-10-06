import Link from "next/link";
import { CalendarX, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";
import { tourSlugFor } from "@/lib/tours-i18n";
import { ONE_DAY_TOUBKAL, refugeFull, sleepsAtRefuge } from "@/lib/refuge";

/** "Refuge full for 2026" on every trek that sleeps at the Toubkal Refuge. See lib/refuge.ts. */
export default function RefugeNotice({ slug, lang, dict }: { slug: string; lang: Locale; dict: Dictionary }) {
  if (!sleepsAtRefuge(slug) || !refugeFull()) return null;
  const t = dict.tourDetail;
  return (
    <aside className="flex gap-4 rounded-[4px] bg-terracotta/8 p-5 ring-1 ring-terracotta/30" aria-labelledby="refuge-full-title">
      <CalendarX className="w-6 h-6 shrink-0 text-terracotta mt-0.5" aria-hidden="true" />
      <div>
        {/* A <p>, not <h2>: the global h2 style would set it in the display face at headline size. */}
        <p id="refuge-full-title" className="font-semibold text-ink text-base">{t.refugeFullTitle}</p>
        <p className="text-ink-soft text-sm leading-relaxed mt-1">{t.refugeFullBody}</p>
        <Link
          href={`/${lang}/tours/${tourSlugFor(lang, ONE_DAY_TOUBKAL)}`}
          className="inline-flex items-center gap-1 mt-3 text-sm font-semibold text-indigo underline-offset-4 hover:underline"
        >
          {t.refugeFullLink}
          <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" aria-hidden="true" />
        </Link>
      </div>
    </aside>
  );
}
