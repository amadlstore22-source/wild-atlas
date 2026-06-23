"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { Clock, Users, Star, MapPin } from "@phosphor-icons/react";
import type { Tour } from "@/lib/tours";
import { DIFFICULTY_COLORS } from "@/lib/tours";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";

const ORIGIN_LABEL: Record<string, string> = {
  marrakech: "Marrakech",
  agadir: "Agadir",
};

const ease = [0.22, 1, 0.36, 1] as const;

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          weight={s <= full ? "fill" : s === full + 1 && half ? "fill" : "regular"}
          className={`w-3.5 h-3.5 ${
            s <= full
              ? "text-sunset"
              : s === full + 1 && half
              ? "text-sunset opacity-50"
              : "text-charcoal/20"
          }`}
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
  const fromLabel = dict?.common.from ?? "From";
  const perPersonLabel = dict?.common.perPerson ?? "/ person";
  const viewTourLabel = dict?.featuredTours.viewTour ?? "View Tour";

  if (featured) {
    return (
      <motion.article
        className="group relative overflow-hidden rounded-2xl bg-charcoal row-span-2 flex flex-col min-h-[480px]"
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.7, ease, delay }}
        whileHover={{ y: -4 }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute inset-0"
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.7, ease }}
          >
            <Image
              src={tour.heroImage}
              alt={tour.title}
              fill
              className="object-cover opacity-80"
              sizes="(max-width: 1024px) 100vw, 40vw"
              priority
            />
          </motion.div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        <div className="card-shimmer-wrap" />

        <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-2 z-10">
          <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
            tour.tourType === "private" ? "bg-sunset text-white" : "bg-white/90 text-forest"
          }`}>
            {tour.tourType === "private" ? "Private" : "Shared"}
          </span>
          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${DIFFICULTY_COLORS[tour.difficulty]}`}>
            {tour.difficulty}
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-6 z-10">
          <div className="flex items-center gap-2 mb-2">
            <StarRating rating={tour.rating} />
            <span className="text-xs font-semibold text-sunset">{tour.rating.toFixed(1)}</span>
            <span className="text-xs text-white/45">({tour.reviewCount})</span>
          </div>
          <h3 className="font-serif text-white font-bold text-xl leading-snug mb-1.5 group-hover:text-sand transition-colors">
            {tour.title}
          </h3>
          <p className="text-white/55 text-sm leading-relaxed line-clamp-2 mb-4">
            {tour.shortDescription}
          </p>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-white/35 text-xs">{fromLabel}</span>
              <p className="font-bold text-white text-2xl leading-tight">
                ${tour.price}
                <span className="text-sm font-normal text-white/40"> {perPersonLabel}</span>
              </p>
            </div>
            <Link
              href={`/${lang}/tours/${tour.slug}`}
              className="px-5 py-2.5 rounded-full bg-sunset text-white text-sm font-bold hover:bg-orange-500 active:scale-[0.98] transition-all shadow-lg"
            >
              {viewTourLabel}
            </Link>
          </div>
        </div>
      </motion.article>
    );
  }

  return (
    <motion.article
      className="group bg-white rounded-2xl overflow-hidden border border-sand-dark hover:border-forest/20 flex flex-col"
      initial={{ opacity: 0, y: 28, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease, delay }}
      whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.12)" }}
    >
      <div className="relative h-52 overflow-hidden shrink-0">
        <motion.div
          className="absolute inset-0"
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.55, ease }}
        >
          <Image
            src={tour.heroImage}
            alt={tour.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
        <div className="card-shimmer-wrap" />

        <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
          <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
            tour.tourType === "private"
              ? "bg-sunset text-white"
              : "bg-white/90 backdrop-blur-sm text-forest"
          }`}>
            {tour.tourType === "private" ? "Private" : "Shared"}
          </span>
          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${DIFFICULTY_COLORS[tour.difficulty]}`}>
            {tour.difficulty}
          </span>
        </div>

        <div className="absolute bottom-3 left-3 flex items-center gap-1 text-white/80 text-xs font-medium">
          <MapPin className="w-3 h-3" weight="fill" />
          {ORIGIN_LABEL[tour.origin] ?? tour.origin}
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-2">
          <StarRating rating={tour.rating} />
          <span className="text-xs font-semibold text-sunset">{tour.rating.toFixed(1)}</span>
          <span className="text-xs text-charcoal/40">({tour.reviewCount})</span>
        </div>

        <h3 className="font-serif font-semibold text-charcoal text-base leading-snug mb-2 group-hover:text-forest transition-colors">
          {tour.title}
        </h3>
        <p className="text-charcoal/50 text-sm leading-relaxed mb-4 line-clamp-2 flex-1">
          {tour.shortDescription}
        </p>

        <div className="flex items-center gap-4 text-xs text-charcoal/40 mb-4">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" weight="duotone" />
            {tour.duration}
          </span>
          <span className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5" weight="duotone" />
            {tour.groupSize}
          </span>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-sand/60 mt-auto">
          <div className="price-beacon px-2 py-1 -mx-2 -my-1 rounded-lg">
            <span className="text-xs text-charcoal/35">{fromLabel}</span>
            <p className="font-bold text-forest text-xl leading-tight">
              ${tour.price}
              <span className="text-xs font-normal text-charcoal/35"> {perPersonLabel}</span>
            </p>
          </div>
          <Link
            href={`/${lang}/tours/${tour.slug}`}
            className="px-4 py-2 rounded-full bg-forest text-white text-sm font-semibold hover:bg-moss transition-colors"
          >
            {viewTourLabel}
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
