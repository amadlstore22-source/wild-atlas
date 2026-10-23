import { Star } from "@phosphor-icons/react/dist/ssr";
import { PREFERRED_SOURCE_URL } from "@/lib/preferred-source";

interface Props {
  labels: { title: string; body: string; cta: string };
}

/**
 * End-of-article invitation to add us as a Google preferred source. It sits
 * after the tour cards and "why book with us": the reader is still planning,
 * and choosing us now means our next answers stand out in their searches over
 * the weeks of planning that follow. See lib/preferred-source.ts.
 */
export default function PreferredSource({ labels }: Props) {
  return (
    <aside className="my-10 rounded-[4px] border border-rule bg-card/60 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4">
      <Star weight="fill" aria-hidden className="w-7 h-7 text-brass shrink-0" />
      <div className="min-w-0 flex-1">
        <p className="font-display text-lg font-bold text-ink leading-tight">{labels.title}</p>
        <p className="text-sm text-ink-soft leading-relaxed mt-1 max-w-2xl">{labels.body}</p>
      </div>
      <a
        href={PREFERRED_SOURCE_URL}
        target="_blank"
        rel="noopener"
        className="inline-flex items-center justify-center rounded-[3px] border border-rule px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-surface-sunk/50 shrink-0"
      >
        {labels.cta}
      </a>
    </aside>
  );
}
