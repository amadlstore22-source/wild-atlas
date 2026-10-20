import { ShieldCheck, Star, Mountains, CalendarCheck, ChatCircleDots } from "@phosphor-icons/react/dist/ssr";
import { TRIPADVISOR, SITE, WHATSAPP_MESSAGES, whatsappUrl } from "@/lib/constants";
import type { Dictionary } from "@/app/[lang]/dictionaries";

/**
 * A compact strip of verifiable trust signals shown directly under the tour
 * hero — the credibility layer that high-commitment (multi-day, high-ticket)
 * bookings lean on. Every figure here is real and attributable: the 5.0 rating
 * and review count come from the live TripAdvisor listing, the guiding heritage
 * and founding year from SITE, and "no prepayment" mirrors the deposit model in
 * the booking sidebar. Nothing is invented.
 */
export default function TourTrustBar({ dict, tourTitle }: { dict: Dictionary; tourTitle: string }) {
  const t = dict.tourDetail.trust;
  // The rating links to the listing: Clarity logged dead clicks here from
  // visitors tapping "122 TripAdvisor reviews" to read them. "Fast human
  // reply" opens WhatsApp: on 2026-10-20 a visitor tapped it (dead click) just
  // after sending the booking form, then went looking for WhatsApp.
  const items: { icon: typeof Star; label: string; sub: string; href?: string }[] = [
    { icon: ShieldCheck, label: t.licensed, sub: t.licensedSub },
    { icon: Star, label: `${TRIPADVISOR.rating.toFixed(1)}/5`, sub: t.ratingSub.replace("{count}", String(TRIPADVISOR.reviewCount)), href: TRIPADVISOR.url },
    { icon: Mountains, label: `${SITE.guidingHeritageYears}+ ${t.yearsLabel}`, sub: t.yearsSub },
    { icon: CalendarCheck, label: t.noPrepay, sub: t.noPrepaySub },
    { icon: ChatCircleDots, label: t.fastReply, sub: t.fastReplySub, href: whatsappUrl(WHATSAPP_MESSAGES.tour(tourTitle)) },
  ];

  return (
    <div className="border-b border-rule bg-card/60">
      <ul className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-5 gap-y-1">
        {items.map(({ icon: Icon, label, sub, href }) => {
          const body = (
            <>
              <Icon className="w-6 h-6 text-indigo shrink-0" weight="duotone" aria-hidden />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-ink leading-tight truncate">{label}</p>
                <p className={`text-[0.72rem] leading-tight ${href ? "text-indigo underline underline-offset-2 group-hover:text-indigo-deep" : "text-ink-muted"}`}>{sub}</p>
              </div>
            </>
          );
          return (
            <li key={label} className="py-4">
              {href ? (
                <a href={href} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3">
                  {body}
                </a>
              ) : (
                <div className="flex items-center gap-3">{body}</div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
