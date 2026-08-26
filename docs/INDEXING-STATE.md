# Indexing state

**As of 2026-08-26: 961 of 1,002 site URLs have been submitted to the Google
Indexing API.** The outstanding **41** are event pages
(`docs/batch-2026-08-26-events.txt`, resume at `--offset 1`), blocked on quota.

Resume with:

    cd C:\Users\cash\wild-atlas
    node scripts/google-index.mjs --key ./service-account.json --urls ./docs/batch-2026-08-26-events.txt --offset 1 --limit 41

> **2026-08-26 — quota wasted, read this before building any batch.** 200 URLs
> were re-submitted (English + French tours) that had already gone out on
> 2026-08-16. They were selected by building a fresh priority queue from the
> sitemap instead of reading this file, which already said not to do that.
> Nothing failed — Google accepted all 200 — so there was no error to notice;
> the cost was simply a day of quota buying nothing, and the 42 genuinely new
> pages had to wait for the next reset.
>
> The diff that answers "what is left" is always **the current list vs the
> last submitted list**, never "the sitemap, ordered by priority". Use
> `scripts/seo/diff-unsubmitted.mjs`, which does exactly that:
>
>     npx next build
>     node scripts/build-index-urls.mjs
>     node scripts/seo/diff-unsubmitted.mjs

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

Rebuild the master list from the BUILT sitemap — it is generated, never
hand-edited, so it cannot contain a URL the site does not serve:

    npx next build
    node scripts/build-index-urls.mjs

**Run this every time pages ship, not only when you plan a batch.** The list
does not drift on its own, but it goes stale the moment new pages are merged
without regenerating it, and a stale list silently hides live pages from every
batch you build afterwards. On 2026-08-16 the rebuild jumped 882 → 960: only
18 were that day's new posts, and the other 60 were pages that had been live
for days (all five shared tours in fr/es/de/it/ar, five translated blog posts)
and had never once been submitted. Nothing reports this — the batch you build
simply omits them.

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

## Log

| Date | Batch | Sent | Note |
|------|-------|------|------|
| 2026-08-16 | new posts | 78 | list rebuild jumped 882 → 960 |
| 2026-08-26 | (none — wasted) | 200 | re-sent already-submitted tours; see warning above |
| 2026-08-26 | `batch-2026-08-26-events.txt` | 1 | `/en/events` only — one URL slipped through on a rounding edge, the next call hit the wall immediately |
| pending | same batch, `--offset 1` | 41 | remaining event pages, blocked until midnight Pacific |
