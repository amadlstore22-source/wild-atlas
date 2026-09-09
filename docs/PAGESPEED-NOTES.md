# PageSpeed auditing — read before trusting a score

## The tooling

An API key lives in `.env.local` as `PAGESPEED_API_KEY`, restricted in Google
Cloud to the PageSpeed Insights API only (read-only; it cannot touch the
Indexing API credentials in `service-account.json`). Anonymous PSI calls get
quota 0, which is why the key exists.

```bash
node scripts/seo/psi.mjs <url> [--strategy=mobile|desktop]
node scripts/seo/psi-batch.mjs --file=urls.txt --out=psi.csv
```

## A single PSI score is not a measurement

This is the important part, and it cost most of a session to learn twice.

**Run-to-run variance on an unchanged page is routinely 20+ points.** Measured
on `/en/tours/agadir-surf-lesson`, live, no deploys in between:

| Run | perf | LCP |
|-----|------|-----|
| batch, concurrency 4 | 69 | 3451 ms |
| batch, concurrency 1 | **65** | 6376 ms |
| single | 87 | 3901 ms |
| single | 87 | 3901 ms |
| single | 89 | 3800 ms |

`/fr/tours/agadir-fes-4-jours` reported **a11y 72, seo 82** in one run and
**a11y 97, seo 100** on both re-runs. There was no accessibility defect and no
SEO defect; the run was simply bad.

Concurrency makes it worse — parallel audits contend for the same measurement
resources and the slowdown is recorded as the page's score, so
`scripts/seo/psi-batch.mjs` is pinned to `CONCURRENCY = 1`. But sequential is
**not** sufficient: the 65 above came from a sequential run.

### What follows from this

- **Never act on a single low score.** Re-run it 2-3 times first. Most
  "regressions" evaporate.
- **A one-off outlier is noise until it reproduces.** Two consecutive runs
  agreeing is the minimum bar.
- **Ignore moves under ~5 points** entirely, in either direction.
- **Do not commit a PSI CSV as a baseline.** Two were generated here and both
  were deleted: every apparent problem in them — five "failing" pages, one
  "accessibility failure" — was noise. A committed CSV becomes a to-do list of
  bugs that do not exist.
- **Prefer a measurement to a score.** Byte sizes, image dimensions and
  rendered HTML are deterministic. The hero re-crop work was driven by measured
  `_next/image` payloads, which is why it held up when the scores did not.

### What the scores are good for

Aggregates across many pages, where noise averages out, and only when the
same comparison is re-run. A ranking of 100 pages is weak evidence; a single
page's number is close to none.

## The re-test threshold is not enough either

`psi-sweep.mjs` re-tests anything suspicious twice more and reports only what
survives the median of three. That still produced false positives:

| Page | flagged | individual re-runs |
|------|---------|--------------------|
| `/de/tours/zagora-wueste-2-tage-geteilt` | 69 (3 samples) | 80, 88, 88, 88, 93 |
| `/es/destinations/high-atlas` | 78 (3 samples) | 89, 89, 89 |
| `/ar/about` | 78 | 90, 90 |
| `/en/tours/agadir-surf-lesson` | 65 | 87, 87, 89 |
| `/fr/tours/agadir-fes-4-jours` | a11y 72, seo 82 | 97/100, 97/100 |

A page can fail **three consecutive runs inside the sweep** and score 88-93
when called on its own. The sweep's own bar for "confirmed" is not sufficient
evidence; only a direct single-URL run, repeated, is.

Across 102 URLs, taking each page's BEST sample, exactly two sat below 85 --
and both scored 88-93 when re-tested individually. **There is currently no
slow page on this site that PSI can identify.**

Use the sweep for the aggregate (median, spread) and never as a to-do list.

## Full-site sweep result, 2026-09-09

186 URLs covering every template x locale group, audited sequentially, with
anything suspicious re-tested. Best sample per URL:

| Category | min | p10 | median | avg | max |
|----------|-----|-----|--------|-----|-----|
| performance | 69 | 87 | 91 | **91** | 97 |
| accessibility | 93 | 97 | 97 | **98** | 100 |
| best practices | 96 | 100 | 100 | **100** | 100 |
| SEO | 92 | 100 | 100 | **100** | 100 |

Average LCP 3.3 s. By page type the spread is 85 (guides) to 94 (guide
detail) -- narrower than the noise band, so no category is weak.

Six pages were flagged across the four batches. Every one was noise:

    /en/tours/agadir-surf-lesson      65  ->  87, 87, 89
    /de/tours/zagora-...-2-tage       69  ->  80, 88, 88, 88, 93
    /es/destinations/high-atlas       78  ->  89, 89, 89
    /ar/about                         78  ->  90, 90
    /fr/news                          72  ->  96, 96, 96
    /fr/tours/agadir-fes-4-jours  a11y 72 ->  97, 97

Even the SEO scores, which look deterministic, are not: three pages reported
92 in the sweep and 100 on re-test (/en/tours/zagora-2day-marrakech,
/es/blog/zagora-desert-guide, /fr/privacy).

**Nothing on this site currently needs a performance fix.** Do not open this
file's numbers as a work list -- re-run the URL first, every time.

## What a real improvement looks like

The one performance change that shipped today was found by MEASURING, not by
scoring: 19 tour heroes were portrait or near-square in a landscape band, so
next/image delivered up to 9x the bytes needed. Fixed, 943 KB saved per
mobile visit, verified against the live `_next/image` payloads.

Its effect on PSI scores is not visible: re-cropped tour pages average 85 and
untouched ones 88, with identical LCP. With n=5 and 20-point run-to-run
variance, a 100 KB saving is undetectable. The saving is real, the score
cannot see it, and that asymmetry is the whole argument for measuring bytes
rather than chasing numbers.

## Actual state as of 2026-09-09

Every page re-tested individually landed at **perf 85-91, a11y 97-100, bp 100,
seo 100** on mobile. There is no known performance or accessibility defect
outstanding. LCP sits around 3.8 s and is dominated by main-thread JS
execution under Lighthouse's 4x CPU throttle, not by images, fonts or CSS —
those were each traced to source and found already optimal (see
`.browserslistrc`, `components/map/TourLocationMap.tsx`, and the font comments
in `app/[lang]/layout.tsx`, all of which document deliberate decisions).
