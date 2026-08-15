# Indexing state

**As of 2026-08-15: all 882 site URLs have been submitted to the Google
Indexing API.** There is no backlog left to work through.

## What this does and does not mean

Submission is a crawl *hint*, not indexing. Google officially supports the
Indexing API only for JobPosting and BroadcastEvent pages — see the header of
`scripts/google-index.mjs`. The sitemap remains the real mechanism. Do not
re-submit the whole site: it buys nothing and burns the 200/day quota.

## When to submit again

Only for pages that genuinely changed:

1. New blog posts or tours, in all six locales.
2. Pages whose price or substance changed — stale Product snippets in search
   results are the one case worth spending quota on.

Rebuild the master list from the BUILT sitemap so it can never drift:

    npx next build
    node scripts/build-index-urls.mjs

Then assemble a small batch and run:

    index-batch docs/batch-YYYY-MM-DD.txt

`__tests__/lib/index-list-urls.test.ts` validates every list in `docs/`: no
English slug the proxy rewrites, no duplicates, no www host. It runs with the
normal suite, so a bad batch fails before it is ever sent.

## The real remaining work

Roughly 183 pages sit in Search Console as "Discovered — currently not
indexed". Submitting them again will not move that number: Google knows the
URLs and has chosen not to index them. That responds to internal linking and
page value, which is what unstranded 24 money pages when the related-tours
orphan fix shipped.

The four Search Console issue types checked on 2026-08-14 were either already
fixed in code (www 308 since `3828d76`, category aliases in `proxy.ts`) or not
errors at all — "Alternate page with proper canonical" is Google confirming
hreflang works, and that count should grow, not shrink.

## Quota ledger

`docs/.submitted-today.json` tracks the running daily total and resets on a new
date. Google's own count is authoritative: if it returns a per-day 429 while
the ledger disagrees, trust Google and correct the file. That happened on
2026-08-14, when a crashed run had already spent requests the ledger never saw.
