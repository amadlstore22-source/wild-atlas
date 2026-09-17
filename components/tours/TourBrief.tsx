import type { Dictionary } from "@/app/[lang]/dictionaries";

interface Props {
  brief: string[];
  dict: Dictionary;
}

/**
 * The long-form prose block on a tour page.
 *
 * THE MEASUREMENT BEHIND IT (Search Console, 90 days to 2026-09-14):
 *
 *            impressions   clicks   CTR     avg position
 *   blog          27,509      474   1.72%          19.2
 *   tours          2,494       74   2.97%          71.4
 *
 * Tour pages convert better than blog posts once they are seen. They are
 * simply never seen: 3.2% of tour-page impressions come from page one,
 * against 48.9% for the blog. The blog is not winning on authority — it is
 * the same domain — it is winning on having something to index. A tour entry
 * averages 379 words; a post runs 1,000–1,750.
 *
 * So this is not a decorative section. It is the only indexable prose on the
 * page, and it is why the section renders `<p>` tags of real text rather than
 * the fragment lists (`highlights`, `includes`) that surround it. Those read
 * as data to a crawler; this reads as an answer.
 *
 * PLACEMENT is deliberate: after the itinerary, before the FAQ. The reader
 * has seen the route and the price and is deciding; the brief answers "is
 * this the right version of this trip for me" at exactly that moment. Putting
 * it above the itinerary would push the day-by-day below the fold, and the
 * itinerary is what most visitors actually came to read.
 *
 * NOT a second copy of the related blog post. The post owns informational
 * intent ("how much does a morocco desert tour cost"); the brief owns
 * transactional ("3 day desert tour from marrakech price"). Writing the same
 * angle twice puts two of our own URLs in one auction.
 */
export default function TourBrief({ brief, dict }: Props) {
  if (!brief || brief.length === 0) return null;

  return (
    <section id="tour-brief" className="scroll-mt-32">
      <h2 className="font-display text-ink text-3xl font-bold mb-4">
        {dict.tourDetail.briefHeading}
      </h2>
      <div className="space-y-4">
        {brief.map((para) => (
          <p key={para.slice(0, 48)} className="text-ink-soft text-lg leading-relaxed">
            {para}
          </p>
        ))}
      </div>
    </section>
  );
}
