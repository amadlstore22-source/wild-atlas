import type { Faq } from "@/lib/seo/types";

interface Props {
  faq: Faq[];
  title?: string;
  /** Tour pages sit on a raised surface; blog sits on the page ground. */
  className?: string;
}

/**
 * Visible FAQ. Google requires FAQPage schema to mirror content the user can
 * actually see, so any page emitting buildFaqSchema() must render this too.
 *
 * Native <details> — no client JS, works without hydration, keyboard and
 * screen-reader accessible by default.
 */
export default function FaqSection({ faq, title = "Frequently asked questions", className = "" }: Props) {
  if (!faq.length) return null;

  return (
    <section className={`mt-12 pt-10 border-t border-rule ${className}`}>
      <h2 className="font-display text-ink text-3xl font-bold mb-6">{title}</h2>
      <div className="space-y-3">
        {faq.map((item) => (
          <details key={item.q} className="group rounded-[3px] border border-rule bg-surface-sunk/30">
            <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4 list-none font-semibold text-ink hover:text-indigo transition-colors">
              {item.q}
              <span
                aria-hidden
                className="shrink-0 text-xl leading-none text-saffron transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <div className="px-5 pb-5 text-ink-soft leading-relaxed">{item.a}</div>
          </details>
        ))}
      </div>
    </section>
  );
}
