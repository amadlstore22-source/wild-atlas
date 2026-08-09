import Link from "next/link";
import { Mountains, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { GUIDES } from "@/lib/guides";
import { SITE } from "@/lib/constants";
import type { Tour } from "@/lib/tours";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";

/**
 * The "who is actually taking you" block, shown on every tour page.
 *
 * The trust bar above it is the same on all 41 tours, so it reads as boilerplate
 * — the thing every operator writes. This block is specific: where a guide is
 * assigned to this exact route in lib/guides.ts, it names them, says how long
 * they have been guiding, and links to their profile. That is a claim a
 * copy-paste competitor cannot make.
 *
 * When no guide is mapped to the route it falls back to the family-level claim,
 * which is still true and still specific to this operation. It never invents a
 * name. Legacy guides (honoured on the guides page but no longer leading) are
 * excluded — see __tests__/lib/guide-routes.test.ts, which also fails the build
 * if a routesLed slug stops matching a real tour.
 */
export default function TourGuideBlock({
  tour,
  lang,
  dict,
}: {
  tour: Tour;
  lang: Locale;
  dict: Dictionary;
}) {
  const g = dict.tourDetail.guideBlock;
  const guide = GUIDES.find((x) => !x.isLegacy && x.routesLed.includes(tour.slug));

  const body = guide
    ? g.namedBody
        .replace("{name}", guide.name)
        .replace("{years}", String(guide.yearsGuiding))
    : g.familyBody.replace("{years}", String(SITE.guidingHeritageYears));

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
            {guide ? g.namedTitle.replace("{name}", guide.name) : g.familyTitle}
          </h2>
          <p className="text-ink-soft text-sm leading-relaxed mt-2">{body}</p>
          <Link
            href={guide ? `/${lang}/guides/${guide.id}` : `/${lang}/guides`}
            className="inline-flex items-center gap-1.5 mt-3 text-sm font-semibold text-indigo underline underline-offset-4 hover:text-terracotta"
          >
            {guide ? g.namedLink.replace("{name}", guide.name.split(" ")[0]) : g.familyLink}
            <ArrowRight className="w-3.5 h-3.5" weight="bold" aria-hidden />
          </Link>
        </div>
      </div>
    </aside>
  );
}
