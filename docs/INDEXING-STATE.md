# Indexing state

**As of 2026-09-02: all 1,122 site URLs have been submitted.** The Casablanca
5-day tour and four desert guides shipped that day; the diff also surfaced 36
"cost" blog pages and an events page that had been live for weeks and had
never been submitted. All 72 went out as `docs/batch-2026-09-02.txt`:
**72 submitted, 0 failed, quota 72/200**.

> The 36 stale pages are the lesson worth keeping: nothing reports a page that
> no batch ever included. They were found only because the diff compares the
> rebuilt list against the last committed one. Memory would have missed them —
> they were not part of that day's work.

Every batch file in `docs/` is **spent**. They are kept as the record of what
went out, not as queues to re-run. Re-running one would repeat the 2026-08-16
mistake described below.

**Nothing is outstanding.** Do not infer from this line that a later batch is
needed — run the diff below to find out what, if anything, is genuinely new.
The count in this header goes stale the moment pages ship, so trust the diff
over the number.

> **Submit only what is actually serving.** The 2026-08-28 batch was built and
> then held for ~2 minutes because all six URLs still 404'd: the commit was
> pushed but Vercel had not finished deploying. Submitting a URL that is not
> live yet spends quota to show Google a 404. Curl the batch before sending it.

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

> **You cannot verify a submission against Google right now (2026-08-28).**
> The Indexing API has a known defect: `urlNotifications:publish` returns HTTP
> 200 but with a `urlNotificationMetadata` containing only the url — the
> documented `latestUpdate` field is absent — and `urlNotifications/metadata`
> then returns 404 NOT_FOUND for that same url indefinitely.
>
> Reproduced deliberately: a publish returned 200, and a metadata read three
> seconds later returned 404. EVERY url this project has submitted reads back
> as 404, including ones watched succeeding by hand. Google's tracker has it
> at p2 — see support.google.com/webmasters/thread/366501095 and
> github.com/googleapis/google-api-nodejs-client/issues/3560.
>
> So a 404 from `scripts/seo/verify-submitted.mjs` is the EXPECTED result and
> proves nothing. Do not re-send on the strength of one: that repeats the
> 2026-08-16 waste. The publish returning 200 is the only success signal
> available, and Search Console's Page Indexing report is the real check,
> days later.

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
| 2026-08-27 | `batch-2026-08-27-pending.txt` | 59 | 41 events + 18 new-article pages, one run. 59 submitted, 0 failed. **Site now fully submitted: `diff-unsubmitted.mjs` reports 1020 / 1020, 0 outstanding.** |
| 2026-08-28 | `batch-2026-08-28.txt` | 6 | 8-day Toubkal + Sahara tour, six locales. Verified all six served HTTP 200 before sending — they 404'd for ~2 min while Vercel deployed. 6 submitted, 0 failed. |
| 2026-08-28 | `batch-2026-08-28-posts.txt` | 24 | Four new posts x six locales. Both index-batch.ps1 guards ran: nothing-outstanding check passed, and all 24 verified serving 200 before sending. |
| 2026-09-02 | `batch-2026-09-02.txt` | 72 | Casablanca 5-day tour (6 locales), four desert guides (24), the 8-day departures event page (6), and **36 "cost" blog pages that had been live for weeks and were never submitted** — found by the diff, not by memory. All 72 verified serving 200. 72 submitted, 0 failed. |
