# SEO audit scripts

Re-runnable checks against the **built output**, not the source. Run
`npm run build` first — these read `.next/server/app/**/*.html`, so a stale
build gives stale answers.

All are read-only. None modify the repo.

```bash
npm run build
PYTHONIOENCODING=utf-8 py scripts/seo/audit-metadata.py
```

| Script | What it checks | Last known clean result |
|---|---|---|
| `audit-metadata.py` | Missing/duplicate titles and descriptions, missing canonical, missing or multiple `<h1>`, images without `alt`, invalid JSON-LD, unexpected `noindex` | 876 pages, 0 missing anything, 0 invalid JSON-LD |
| `audit-titles-i18n.py` | Titles/descriptions identical across all six locales (metadata that was never translated), and titles whose *distinctive* part exceeds ~60 chars | 4 paths untranslated, all legal/utility pages, left deliberately |
| `audit-hreflang.py` | Every page has a self-referencing canonical, all six locale alternates, `x-default`, and reciprocity (this locale's alternate points back at this URL) | 876/876 complete |
| `audit-commission-math.py` | Blog copy saying "platforms take 25–40%, on a €X trip that is up to €Y" where Y is not ~40% of X | 34 pairs, 0 wrong |

## Notes that cost time to learn

- **Next renders the attribute as `hrefLang`, not `hreflang`.** A lowercase
  grep on the build output reports zero matches on pages that do have the tags.
  The scripts match case-insensitively.
- **Locale pages use translated slugs.** `/fr/blog/prix-trek-toubkal-2-jours`,
  not the English slug. Resolve via `localizedSlug` in the locale catalogue, or
  via the sitemap — never by string-building from the English path.
- **The embedded JSON payload carries USD tier values.** Searching the built
  HTML for a bare number matches those as well as the rendered euro amounts, so
  strip `<script>` blocks before matching prices.
- **Empty `alt=""` is valid** for decorative images and is not reported as an
  error; only a missing `alt` attribute is.

## What these cannot tell you

Core Web Vitals. LCP/INP/CLS are field metrics measured at the 75th percentile
of real loads, and only Search Console's Core Web Vitals report (CrUX, ~28 days
of data) shows them. A Lighthouse lab score is a useful diagnostic but is not
the same measurement and should not be reported as one.
