"use client";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Clock, Users, Star, MapPin, CheckCircle, ArrowRight } from "@phosphor-icons/react";
import type { Tour } from "@/lib/tours";
import { DIFFICULTY_COLORS } from "@/lib/tours";
import { TRIPADVISOR } from "@/lib/constants";
import { useCurrency } from "@/lib/currency";
import { Badge } from "@/components/ui/badge";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";

const ORIGIN_LABEL: Record<string, string> = { marrakech: "Marrakech", agadir: "Agadir" };
const CATEGORY_LABEL: Record<string, string> = {
  trekking: "Trekking", hiking: "Hiking", desert: "Desert", cultural: "Cultural", "day-tours": "Day Tour",
};

const ease = [0.16, 1, 0.3, 1] as const;

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating.toFixed(1)} out of 5`}>
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          weight={s <= full || (s === full + 1 && half) ? "fill" : "regular"}
          className={`w-3.5 h-3.5 ${s <= full ? "text-saffron" : s === full + 1 && half ? "text-saffron opacity-50" : "text-ink/20"}`}
        />
      ))}
    </div>
  );
}

interface Props {
  tour: Tour;
  lang?: Locale;
  dict?: Dictionary;
  featured?: boolean;
  delay?: number;
}

export default function TourCard({ tour, lang = "en", dict, featured = false, delay = 0 }: Props) {
  const reduce = useReducedMotion();
  const { format } = useCurrency();
  const fromLabel = dict?.common.from ?? "From";
  const perPersonLabel = dict?.common.perPerson ?? "/ person";
  const viewTourLabel = dict?.featuredTours.viewTour ?? "View Tour";
  const priceLabel = tour.priceMax ? `${format(tour.price)} - ${format(tour.priceMax)}` : format(tour.price);

  if (featured) {
    return (
      <motion.article
        className="group relative overflow-hidden rounded-[4px] bg-indigo-deep row-span-2 flex flex-col min-h-[480px] shadow-[var(--shadow-riad)] ring-1 ring-saffron/25"
        initial={reduce ? false : { opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.7, ease, delay }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={tour.heroImage}
            alt={tour.title}
            fill priority
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover opacity-90 transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05] motion-reduce:transition-none"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-deep/95 via-indigo-deep/35 to-transparent" />

        <div className="absolute top-5 right-5 z-20">
          <Badge className={`capitalize border-0 shadow-sm ${DIFFICULTY_COLORS[tour.difficulty]}`}>{tour.difficulty}</Badge>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7 z-20">
          {/* Business-wide TripAdvisor rating, labelled as such. We have no
              per-tour review corpus, so a per-tour score would be invented. */}
          <div className="flex items-center gap-2 mb-2.5">
            <StarRating rating={TRIPADVISOR.rating} />
            <span className="text-xs font-semibold text-brass-glow">{TRIPADVISOR.rating.toFixed(1)}</span>
            <span className="text-xs text-cream/60">
              ({TRIPADVISOR.reviewCount} reviews on TripAdvisor)
            </span>
          </div>
          <h3 className="font-display text-cream font-semibold text-2xl sm:text-3xl leading-[1.1] mb-2">{tour.title}</h3>
          <p className="text-cream/75 text-sm leading-relaxed line-clamp-2 mb-5 max-w-md">{tour.shortDescription}</p>
          <div className="flex items-end justify-between gap-4">
            <div>
              <span className="text-cream/65 text-xs">{fromLabel}</span>
              <p className="font-display font-semibold text-brass-glow text-3xl leading-tight">
                {priceLabel}
                <span className="text-sm font-body font-normal text-cream/70"> {perPersonLabel}</span>
              </p>
            </div>
            <Link href={`/${lang}/tours/${tour.slug}`} className="btn-brass !px-5 !py-2.5 !text-sm shrink-0">
              {viewTourLabel}
              <ArrowRight className="w-4 h-4" weight="bold" />
            </Link>
          </div>
        </div>
      </motion.article>
    );
  }

  return (
    <motion.article
      className="group relative bg-card rounded-[4px] overflow-hidden ring-1 ring-rule flex flex-col shadow-[var(--shadow-riad-sm)] transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-riad)] hover:ring-indigo/40"
      initial={reduce ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease, delay }}
    >
      <div className="relative h-56 overflow-hidden shrink-0">
        <Image
          src={tour.heroImage}
          alt={tour.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06] motion-reduce:transition-none"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-deep/55 via-transparent to-transparent" />

        <div className="absolute top-3.5 right-3.5 z-20">
          <Badge className={`capitalize border-0 shadow-sm ${DIFFICULTY_COLORS[tour.difficulty]}`}>{tour.difficulty}</Badge>
        </div>
        <div className="absolute bottom-3.5 left-4 z-20 flex items-center gap-1.5 text-cream/90 text-xs font-medium">
          <MapPin className="w-3.5 h-3.5 text-brass-glow" weight="fill" />
          {ORIGIN_LABEL[tour.origin] ?? tour.origin}
        </div>
      </div>

      <div className="p-5 sm:p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <span className="eyebrow !text-[0.62rem] !tracking-[0.16em]">{CATEGORY_LABEL[tour.category] ?? tour.category}</span>
          <div className="flex items-center gap-1.5" title={`${TRIPADVISOR.rating.toFixed(1)} from ${TRIPADVISOR.reviewCount} TripAdvisor reviews across all our tours`}>
            <StarRating rating={TRIPADVISOR.rating} />
            <span className="text-xs font-semibold text-saffron">{TRIPADVISOR.rating.toFixed(1)}</span>
          </div>
        </div>

        <h3 className="font-display font-semibold text-ink text-xl leading-[1.15] mb-3 group-hover:text-indigo transition-colors">
          {tour.title}
        </h3>

        <ul className="space-y-1.5 mb-5">
          {tour.highlights.slice(0, 3).map((h) => (
            <li key={h} className="flex items-start gap-2 text-[0.82rem] text-ink-soft leading-snug">
              <CheckCircle className="w-4 h-4 text-indigo/70 shrink-0 mt-0.5" weight="fill" />
              <span className="line-clamp-1">{h}</span>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4 text-xs text-ink-muted mb-5">
          <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" weight="duotone" />{tour.duration}</span>
          <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" weight="duotone" />{tour.groupSize}</span>
        </div>

        <div className="flex items-end justify-between pt-4 border-t border-rule/70 mt-auto">
          <div>
            <span className="text-xs text-ink-muted">{fromLabel}</span>
            <p className="font-display font-semibold text-indigo text-2xl leading-tight">
              {priceLabel}
              <span className="text-xs font-body font-normal text-ink-muted"> {perPersonLabel}</span>
            </p>
          </div>
          <Link
            href={`/${lang}/tours/${tour.slug}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[3px] bg-indigo text-cream text-sm font-semibold hover:bg-indigo-deep active:scale-[0.98] transition-all"
          >
            {viewTourLabel}
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
