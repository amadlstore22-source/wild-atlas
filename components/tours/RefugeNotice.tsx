import { CalendarX } from "@phosphor-icons/react/dist/ssr";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { offersOneDay, refugeFull, sleepsAtRefuge } from "@/lib/refuge";

/** "Refuge full for 2026" on every trek that sleeps at the Toubkal Refuge. See lib/refuge.ts. */
export default function RefugeNotice({ slug, dict }: { slug: string; dict: Dictionary }) {
  if (!sleepsAtRefuge(slug) || !refugeFull()) return null;
  const t = dict.tourDetail;
  return (
    <aside className="flex gap-4 rounded-[4px] bg-terracotta/8 p-5 ring-1 ring-terracotta/30" aria-labelledby="refuge-full-title">
      <CalendarX className="w-6 h-6 shrink-0 text-terracotta mt-0.5" aria-hidden="true" />
      <div>
        {/* A <p>, not <h2>: the global h2 style would set it in the display face at headline size. */}
        <p id="refuge-full-title" className="font-semibold text-ink text-base">{t.refugeFullTitle}</p>
        <p className="text-ink-soft text-sm leading-relaxed mt-1">
          {offersOneDay(slug) ? t.refugeFullBodyOneDay : t.refugeFullBody}
        </p>
      </div>
    </aside>
  );
}
