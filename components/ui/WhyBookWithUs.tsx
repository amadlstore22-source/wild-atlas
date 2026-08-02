import Link from "next/link";
import { ShieldCheck, Star, CalendarCheck, ChatCircleDots, UsersThree } from "@phosphor-icons/react/dist/ssr";
import { SITE, TRIPADVISOR } from "@/lib/constants";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";

/**
 * Compact "why book with us" block for pages that sell indirectly — blog posts
 * above all. A reader who has just finished a cost breakdown is at peak intent
 * and, until now, met nothing but a link back to the tour: the homepage carries
 * WhyUs and tour pages carry TourTrustBar, but the 432 blog URLs carried no
 * reason to trust us at all.
 *
 * Every claim resolves from a single source (SITE / TRIPADVISOR) rather than
 * being written inline, so it cannot drift from the same figures shown in the
 * booking sidebar and the TripAdvisor badge. A reassurance that contradicts the
 * page next to it is worse than none.
 *
 * Deliberately NOT rendered on tour detail pages — TourTrustBar already states
 * these five facts directly under the hero, and repeating them on one page
 * reads as padding rather than confidence.
 */
export default function WhyBookWithUs({
  dict,
  lang,
}: {
  dict: Dictionary;
  lang: Locale;
}) {
  const t = dict.whyBook;

  const points = [
    {
      icon: ShieldCheck,
      label: t.licensed,
      sub: t.licensedSub,
    },
    {
      icon: Star,
      label: `${TRIPADVISOR.rating.toFixed(1)}/5`,
      sub: t.ratingSub.replace("{count}", String(TRIPADVISOR.reviewCount)),
    },
    {
      icon: UsersThree,
      label: t.local,
      sub: t.localSub.replace("{years}", String(SITE.guidingHeritageYears)),
    },
    {
      icon: CalendarCheck,
      label: t.noPrepay,
      sub: t.noPrepaySub.replace("{days}", String(SITE.depositDays)),
    },
    {
      icon: ChatCircleDots,
      label: t.fastReply,
      sub: t.fastReplySub.replace("{hours}", String(SITE.responseHours)),
    },
  ];

  return (
    <aside
      className="my-12 rounded-[4px] border border-rule bg-card/60 p-6 sm:p-7"
      aria-labelledby="why-book-heading"
    >
      <h2
        id="why-book-heading"
        className="font-display text-xl font-bold text-ink mb-1.5"
      >
        {t.title}
      </h2>
      <p className="text-sm text-ink-soft leading-relaxed mb-5 max-w-2xl">
        {t.intro}
      </p>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
        {points.map(({ icon: Icon, label, sub }) => (
          <li key={label} className="flex items-start gap-3">
            <Icon
              className="w-5 h-5 text-indigo shrink-0 mt-0.5"
              weight="duotone"
              aria-hidden
            />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-ink leading-tight">{label}</p>
              <p className="text-xs text-ink-muted leading-snug mt-0.5">{sub}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Link
          href={`/${lang}/tours`}
          className="inline-flex items-center rounded-[3px] bg-indigo px-5 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-indigo-deep"
        >
          {t.browseTours}
        </Link>
        <Link
          href={`/${lang}/contact`}
          className="inline-flex items-center rounded-[3px] border border-rule px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-surface-sunk/50"
        >
          {t.askQuestion}
        </Link>
      </div>
    </aside>
  );
}
