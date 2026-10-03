/**
 * Blog posts are hard-wrapped at ~90 columns. The renderer used to turn every
 * line into its own <p> (and a bullet's continuation line closed the list), so
 * prose on 300+ posts read as a stack of one-line paragraphs. This folds
 * wrapped lines back into the paragraph or bullet they continue, as markdown
 * does. Exception: a **bold** line after a finished sentence is a pseudo-list
 * item ("**May**: warm…" / "**June**: hot…") and stays its own paragraph.
 */
export function foldWrappedLines(source: string): string[] {
  const isBlock = (l: string) => {
    const t = l.trim();
    return !t || /^#{2,3} /.test(t) || l.startsWith("- ") || t.startsWith("|") || /^\d+\.\s/.test(t);
  };
  const raw = source.trim().split("\n").map((l) => l.replace(/\r$/, ""));
  const lines: string[] = [];
  for (const l of raw) {
    const prev = lines[lines.length - 1];
    const prevIsText = prev !== undefined && prev.trim() !== "" && !/^#{2,3} /.test(prev.trim()) && !prev.trim().startsWith("|");
    const continuesBullet = prev?.startsWith("- ") && /^\s+\S/.test(l) && !isBlock(l.trimStart());
    const continuesText =
      prevIsText && !prev.startsWith("- ") && !isBlock(l) &&
      !(/^\*\*/.test(l.trim()) && /[.!?:)”»"]\s*$/.test(prev.trim()));
    if (continuesBullet || continuesText) lines[lines.length - 1] = `${prev.trimEnd()} ${l.trim()}`;
    else lines.push(l);
  }
  return lines;
}
