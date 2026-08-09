import Link from "next/link";
import { Mountains, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { SITE } from "@/lib/constants";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";

/**
 * The "who is actually taking you" block, shown on every tour page.
 *
 * The trust bar above it is identical on all 41 tours, so it reads as
 * boilerplate. This block is specific to the operation without over-promising.
 *
 * Deliberately names NO guide. Guiding is assigned from the team by
 * availability on the departure date, so naming anyone here — even as "usually"
 * — would put a claim on the page that the operation cannot guarantee. What is
 * true on every departure is the standard: a licensed Berber guide from the
 * same family team, trained on the route before leading it. That is the claim
 * a reseller cannot copy, and it holds whoever turns up.
 *
 * lib/guides.ts still backs the /guides page, where the team is introduced
 * properly. It is intentionally not consulted here.
 */
export default function TourGuideBlock({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  const g = dict.tourDetail.guideBlock;

  return (
    <aside className="rounded-[4px] border border-indigo/15 bg-indigo-wash/50 p-5 sm:p-6">
      <div className="flex gap-4">
        <span
          aria-hidden="true"
          className="shrink-0 w-11 h-11 rounded-[3px] bg-indigo flex items-center justify-center"
        >
          <Mountains className="w-5 h-5 text-cream" weight="duotone" />
        </span>
        <div className="min-w-0">
          <h2 className="font-display text-lg font-bold text-ink leading-snug">
            {g.familyTitle}
          </h2>
          <p className="text-ink-soft text-sm leading-relaxed mt-2">
            {g.familyBody.replace("{years}", String(SITE.guidingHeritageYears))}
          </p>
          <Link
            href={`/${lang}/guides`}
            className="inline-flex items-center gap-1.5 mt-3 text-sm font-semibold text-indigo underline underline-offset-4 hover:text-terracotta"
          >
            {g.familyLink}
            <ArrowRight className="w-3.5 h-3.5" weight="bold" aria-hidden />
          </Link>
        </div>
      </div>
    </aside>
  );
}
