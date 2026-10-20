/**
 * Keep a spaced dash on the line of the word before it.
 *
 * Tour titles read "Marrakech to Merzouga — 3-Day Desert Tour". With an
 * ordinary space before the dash, the browser was free to break there, and on
 * the tour hero it did: the second line opened with "— 3-Day Desert Tour"
 * (critique 2026-10-20). A no-break space before the dash glues it to the
 * previous word; the space after it stays breakable.
 *
 * Display only. Never use it on alt text, metadata or anything indexed.
 */
export function glueDash(title: string): string {
  return title.replace(/ ([\u2014\u2013]) /g, "\u00A0$1 ");
}
