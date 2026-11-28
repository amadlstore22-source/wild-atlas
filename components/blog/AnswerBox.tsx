/**
 * The short answer at the top of a post (2026-11-27 search audit, step 4).
 *
 * Why: the posts answer their question well, but the answer is spread over a
 * long article. AI assistants and Google's answer boxes quote one
 * self-contained passage, and MET was cited less often for imperial cities
 * once competitors gave a compact answer with figures. This box is that
 * passage: the post's own figures, in one place, with where they come from.
 *
 * Server component, plain text only: nothing here needs the browser.
 */
export default function AnswerBox({
  label,
  sourceLabel,
  text,
  source,
}: {
  label: string;
  sourceLabel: string;
  text: string;
  source?: string;
}) {
  return (
    <aside aria-label={label} className="mb-10 rounded-[4px] border border-sand-dark bg-cream p-6 sm:p-7">
      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-forest rtl:tracking-normal">{label}</p>
      <p className="text-[1.0625rem] leading-relaxed text-charcoal">{text}</p>
      {source && (
        <p className="mt-4 text-sm leading-relaxed text-ink-muted">
          {/* The label carries its own colon: French writes "Source :". */}
          <span className="font-semibold">{sourceLabel}</span> {source}
        </p>
      )}
    </aside>
  );
}
