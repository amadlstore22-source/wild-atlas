import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

/**
 * THE NEWSLETTER FIELD HAD NO ACCESSIBLE NAME, ON ALL 1,050 PAGES
 *
 * components/ui/NewsletterForm.tsx rendered its email input with a
 * `placeholder` and nothing else — no <label>, no aria-label. A placeholder is
 * not an accessible name: a screen reader announces the field as an unlabelled
 * edit box, and the hint disappears for every user the moment they start
 * typing. The form is in the footer, so it was the single most repeated
 * accessibility defect on the site.
 *
 * Found by querying the rendered page for inputs with no resolvable label, at
 * three viewports across four URLs — every one reported the same
 * `{fields: 1, unlabelled: 1}` form. It is invisible to typecheck, to the
 * build, and to a visual review, because the placeholder makes the field look
 * perfectly labelled to a sighted user.
 *
 * THE SECOND HALF OF THE FIX, which is the part worth guarding:
 * the first attempt set `aria-label={placeholder}`, which "passed" while being
 * wrong twice over — the placeholder is the literal example value
 * "your@email.com" (so a screen reader would announce "your@email.com, edit
 * text" instead of naming the field), and it was a hardcoded English string in
 * the Footer, so five locales would have received an English name anyway. The
 * label now comes from dict.contact.formEmail, which was already translated in
 * all six locales. Verified in the built HTML: "Email Address",
 * "Adresse e-mail", "E-Mail-Adresse", the Arabic equivalent.
 *
 * KNOWN AND DELIBERATELY NOT ASSERTED HERE: roughly 19 other aria-labels
 * across Header, Footer, TourGallery, GalleryLightbox and CookieBanner are
 * hardcoded English ("Change currency", "Close lightbox", "Main navigation").
 * They are a real gap for the five non-English locales, but translating them
 * needs new dictionary keys in six files — a separate piece of work, not
 * something to half-do inside a test.
 */

const ROOT = join(__dirname, "..", "..");

/** Every .tsx under components/ and app/, recursively. */
function allComponents(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) allComponents(p, out);
    else if (entry.name.endsWith(".tsx")) out.push(p);
  }
  return out;
}

const FILES = [join(ROOT, "components"), join(ROOT, "app")]
  .filter(existsSync)
  .flatMap((d) => allComponents(d));

describe("form field labels", () => {
  it("every text-entry input has an accessible name, not just a placeholder", () => {
    // The rule, catalogue-wide: any input/textarea/select that a user types
    // into must carry aria-label, aria-labelledby, or an id a <label> points
    // at. A placeholder alone does not count.
    const unlabelled: string[] = [];

    for (const file of FILES) {
      const src = readFileSync(file, "utf-8");
      // Each <input .../> or <textarea ...> opening tag. JSX attributes are
      // routinely spread over many lines and contain `>` inside expressions
      // (onChange={(e) => ...}), so scan forward from the tag name to the
      // matching close rather than using a naive [^>]* character class — that
      // version reported ContactForm and BookingSidebar as unlabelled when
      // both are correctly paired with <label htmlFor>.
      for (const m of src.matchAll(/<(input|textarea|select)\b/g)) {
        const start = m.index! + m[0].length;
        let depth = 0;
        let end = start;
        for (; end < src.length; end++) {
          const ch = src[end];
          if (ch === "{") depth++;
          else if (ch === "}") depth--;
          else if (ch === ">" && depth === 0) break;
        }
        const attrs = src.slice(start, end);
        if (/type=["']?(hidden|submit|button|image|reset)/.test(attrs)) continue;
        // An input WRAPPED in <label> is implicitly labelled and needs no id
        // or aria-label — that is how both consent checkboxes are built, and
        // counting them as defects would push someone to "fix" correct markup.
        const before = src.slice(Math.max(0, m.index! - 400), m.index!);
        // [\s\S] rather than the /s flag: tsconfig targets below es2018, where
        // dotAll is a compile error (TS1501).
        const wrappedInLabel = /<label\b[^>]*>[\s\S]*?$/.test(before) &&
          !/<\/label>/.test(before.slice(before.lastIndexOf("<label")));

        const named =
          /aria-label[=}]/.test(attrs) ||
          /aria-labelledby[=}]/.test(attrs) ||
          /\bid=/.test(attrs) || // paired with a <label htmlFor> elsewhere
          wrappedInLabel;

        if (!named) {
          const rel = file.slice(ROOT.length + 1).split(/[\\/]/).join("/");
          const line = src.slice(0, m.index).split("\n").length;
          unlabelled.push(`${rel}:${line} <${m[1]}> has only a placeholder`);
        }
      }
    }

    expect(
      unlabelled,
      `These form fields have no accessible name. A placeholder does NOT count:\n` +
        `a screen reader announces the field as an unlabelled edit box, and the\n` +
        `hint vanishes for everyone as soon as they type.\n\n` +
        `Add aria-label (from the dictionary, so it is translated — never a\n` +
        `hardcoded English string, and never the placeholder's example value),\n` +
        `or give the field an id and pair it with a <label htmlFor>:\n  ` +
        unlabelled.join("\n  "),
    ).toEqual([]);
  });

  it("the newsletter field is named by the dictionary, not by its placeholder", () => {
    // Guards the specific wrong-fix that looked right: aria-label={placeholder}
    // names the field "your@email.com" and, because Footer passes that literal,
    // hardcodes English into all six locales.
    const src = readFileSync(join(ROOT, "components", "ui", "NewsletterForm.tsx"), "utf-8");

    expect(
      /aria-label=\{placeholder\}/.test(src),
      'The newsletter input is named by its placeholder. The placeholder is the\n' +
        'example value ("your@email.com"), so a screen reader announces\n' +
        '"your@email.com, edit text" instead of naming the field — and Footer\n' +
        "passes that literal as a hardcoded English string, so five locales\n" +
        "would get an English name. Use the translated `label` prop\n" +
        "(dict.contact.formEmail).",
    ).toBe(false);

    expect(
      /aria-label=\{label\}/.test(src),
      "The newsletter input has lost its aria-label. It sits in the footer of\n" +
        "every page on the site, so this is the most repeated a11y defect there\n" +
        "is when it regresses.",
    ).toBe(true);
  });

  it("the newsletter label reaches the component from the dictionary", () => {
    // The prop is only useful if the Footer actually passes a translated value.
    const footer = readFileSync(join(ROOT, "components", "layout", "Footer.tsx"), "utf-8");
    const call = footer.slice(footer.indexOf("<NewsletterForm"), footer.indexOf("/>", footer.indexOf("<NewsletterForm")));

    expect(
      /label=\{dict\./.test(call),
      "Footer passes NewsletterForm a `label` that does not come from `dict`,\n" +
        "so the accessible name is the same English string in all six locales.\n" +
        "Use dict.contact.formEmail — it is already translated everywhere.",
    ).toBe(true);
  });
});
