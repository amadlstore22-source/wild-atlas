# Indexing submission schedule

The Indexing API allows **200 URLs/day**. `docs/submit-queue.txt` holds the
full priority-ordered list; `docs/submit-queue-live.txt` is the same list with
the event pages removed (they were not deployed yet when day 1 ran).

Regenerate either after adding pages:

    npm run build
    node scripts/seo/build-submit-queue.mjs

## Progress

| Day | Date | Command | Result |
|-----|------|---------|--------|
| 1 | 2026-08-26 | `--urls ./docs/submit-queue-live.txt --limit 200` | 200 ok, 0 failed |
| 2 | | `--urls ./docs/submit-queue-live.txt --offset 200 --limit 200` | |
| 3 | | `--offset 400 --limit 200` | |
| 4 | | `--offset 600 --limit 200` | |
| 5 | | `--offset 800 --limit 200` | |

Full command form:

    node scripts/google-index.mjs --key ./service-account.json \
      --urls ./docs/submit-queue-live.txt --offset <N> --limit 200

## The 42 event pages

They were still deploying on day 1, so they are NOT in `submit-queue-live.txt`.
Submitting a URL Google cannot fetch wastes quota and can register a soft 404.
Once the deploy is confirmed live, submit them first — they are brand new and
nothing else can discover them:

    grep "/events" docs/submit-queue.txt > docs/submit-queue-events.txt
    node scripts/google-index.mjs --key ./service-account.json \
      --urls ./docs/submit-queue-events.txt --limit 42

## Why this order

Priority is set by what Search Console actually shows for this site, not by
the sitemap's own order:

1. **Event pages** — brand new, nothing links to them yet, so discovery is the
   entire point.
2. **Tour pages** — commercial intent, avg position ~52. What the business sells.
3. **Money blog posts** (cost/price/guide) — the pages already ranking, e.g.
   `toubkal-guide-cost` at position 6.
4. English before other locales *within* each tier: 94% of the 140
   "Discovered – currently not indexed" URLs were non-English, so Google is
   already declining to spend crawl budget there.

Legal pages (terms/privacy/cookies/review) are excluded outright.

## Caveat

Google officially supports this API only for `JobPosting` / `BroadcastEvent`
pages. It reliably triggers a crawl, but it is **not** a guarantee of indexing
and **not** a substitute for the sitemap. See `scripts/README-indexing.md`.
