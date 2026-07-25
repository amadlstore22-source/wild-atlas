import { ShieldCheck, Star, Mountains, CalendarCheck, ChatCircleDots } from "@phosphor-icons/react/dist/ssr";
import { TRIPADVISOR, SITE } from "@/lib/constants";
import type { Dictionary } from "@/app/[lang]/dictionaries";

/**
 * A compact strip of verifiable trust signals shown directly under the tour
 * hero — the credibility layer that high-commitment (multi-day, high-ticket)
 * bookings lean on. Every figure here is real and attributable: the 5.0 rating
 * and review count come from the live TripAdvisor listing, the guiding heritage
 * and founding year from SITE, and "no prepayment" mirrors the deposit model in
 * the booking sidebar. Nothing is invented.
 */
export default function TourTrustBar({ dict }: { dict: Dictionary }) {
  const t = dict.tourDetail.trust;
  const items = [
    { icon: ShieldCheck, label: t.licensed, sub: t.licensedSub },
    { icon: Star, label: `${TRIPADVISOR.rating.toFixed(1)}/5`, sub: t.ratingSub.replace("{count}", String(TRIPADVISOR.reviewCount)) },
    { icon: Mountains, label: `${SITE.guidingHeritageYears}+ ${t.yearsLabel}`, sub: t.yearsSub },
    { icon: CalendarCheck, label: t.noPrepay, sub: t.noPrepaySub },
    { icon: ChatCircleDots, label: t.fastReply, sub: t.fastReplySub.replace("{hours}", String(SITE.responseHours)) },
  ];

  return (
    <div className="border-b border-rule bg-card/60">
      <ul className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-5 gap-y-1">
        {items.map(({ icon: Icon, label, sub }) => (
          <li key={label} className="flex items-center gap-3 py-4">
            <Icon className="w-6 h-6 text-indigo shrink-0" weight="duotone" aria-hidden />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-ink leading-tight truncate">{label}</p>
              <p className="text-[0.72rem] text-ink-muted leading-tight">{sub}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
