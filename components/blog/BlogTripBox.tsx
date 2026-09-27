"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock } from "@phosphor-icons/react";
import { useCurrency } from "@/lib/currency";
import { track } from "@/lib/analytics";

interface Props {
  href: string;
  title: string;
  duration: string;
  image: string;
  /** Cheapest per-person rate in USD, from lowestGroupPrice() on the server. */
  priceUsd: number;
  /** Group size that rate needs; 1 means it is the solo rate. */
  minPeople: number;
  labels: { eyebrow: string; trust: string; from: string; perPerson: string; perPersonGroup: string; view: string };
  postSlug: string;
  tourSlug: string;
  lang: string;
}

/**
 * The article's main trip, shown once the intro has been read.
 *
 * Why it exists: 80% of Search clicks land on blog posts, and on a phone the
 * related-tour cards sit 12-15 screens down, after the FAQ. On the German and
 * Spanish Toubkal posts (together ~70 clicks a month) the first tour link of
 * any kind was 55-59% of the way down. Most readers never got that far.
 *
 * Server-computed price and localised href are passed in, so this client
 * component carries no tour data beyond what it displays.
 */
export default function BlogTripBox({ href, title, duration, image, priceUsd, minPeople, labels, postSlug, tourSlug, lang }: Props) {
  const { format } = useCurrency();
  const per = minPeople > 1 ? labels.perPersonGroup.replace("{count}", String(minPeople)) : labels.perPerson;
  const onClick = () => {
    // GA4 only counts visitors who chose "Accept all".
    track("blog_trip_box_click", { post: postSlug, tour: tourSlug });
    // Anonymous count of every click, consent or not (see app/api/click).
    // sendBeacon survives the navigation this click starts; fetch may not.
    try {
      const data = new Blob([JSON.stringify({ lang, post: postSlug, tour: tourSlug })], { type: "application/json" });
      navigator.sendBeacon?.("/api/click", data);
    } catch {
      // Counting must never get in the way of the click.
    }
  };

  return (
    <aside className="my-8 rounded-[4px] ring-1 ring-rule bg-parchment/50 p-4 sm:p-5 flex gap-4 items-center">
      <Link href={href} onClick={onClick} tabIndex={-1} aria-hidden="true" className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0 overflow-hidden rounded-[3px]">
        <Image src={image} alt="" fill sizes="96px" className="object-cover" />
      </Link>
      <div className="min-w-0 flex-1">
        <p className="text-[0.7rem] font-semibold uppercase tracking-widest text-ink-soft mb-1">{labels.eyebrow}</p>
        <Link href={href} onClick={onClick} className="font-display font-bold text-ink leading-snug hover:text-indigo transition-colors">
          {title}
        </Link>
        <p className="text-sm text-ink-soft mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5">
          <span className="inline-flex items-center gap-1"><Clock className="w-3.5 h-3.5" aria-hidden="true" />{duration}</span>
          <span>
            {labels.from} <strong className="text-indigo">{format(priceUsd)}</strong> {per}
          </span>
        </p>
        <p className="text-xs text-ink-muted mt-1 hidden sm:block">{labels.trust}</p>
        <Link href={href} onClick={onClick} tabIndex={-1} aria-hidden="true" className="sm:hidden mt-1.5 inline-flex items-center gap-1 text-sm font-semibold text-indigo">
          {labels.view}
          <ArrowRight className="w-3.5 h-3.5 rtl:-scale-x-100" weight="bold" />
        </Link>
      </div>
      {/* `!hidden`: .btn-brass sets display:inline-flex outside Tailwind's
          layers, so a plain `hidden` loses and the button squeezed the text
          into a one-word column on phones. */}
      <Link href={href} onClick={onClick} className="btn-brass !px-4 !py-2 !text-sm shrink-0 !hidden sm:!inline-flex">
        {labels.view}
        <ArrowRight className="w-4 h-4 rtl:-scale-x-100" weight="bold" />
      </Link>
    </aside>
  );
}
