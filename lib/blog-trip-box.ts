/**
 * Split rendered article HTML just before its first <h2>, so the trip box can
 * sit between the intro and the first section. With no <h2> the whole block
 * counts as intro and the box goes after it.
 */
export function splitBeforeFirstH2(html: string): [string, string] {
  const i = html.indexOf("<h2>");
  if (i === -1) return [html, ""];
  return [html.slice(0, i).trim(), html.slice(i)];
}
