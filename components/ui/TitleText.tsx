import { glueDash } from "@/lib/typography";

/**
 * A tour title set for display: the spaced dash stays on the line before it
 * (glueDash), and a hyphenated word ("3-Day", "2-Day") is never split across
 * lines. With balanced wrapping on headings, the tour hero broke as
 * "Merzouga — 3- / Day Desert Tour" (2026-10-20). The text content is
 * unchanged, so what search engines read is the same title.
 */
export default function TitleText({ text }: { text: string }) {
  const parts = glueDash(text).split(/(\S+-\S+)/);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} className="whitespace-nowrap">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}
