# Google Indexing API — bulk URL submission

`google-index.mjs` submits your URLs to Google's Indexing API so you don't have
to paste hundreds into Search Console by hand. **Zero npm dependencies** — it
uses Node's built-in `crypto` and `fetch` (Node 18+).

## ⚠️ Read this first

Google **officially** supports the Indexing API only for pages with `JobPosting`
or `BroadcastEvent` structured data. This site is tours/blog content, so using it
here is **outside Google's stated terms**. In practice it usually still triggers a
crawl and speeds discovery, but:

- It is **not guaranteed** to index a page.
- It is **not a replacement for the sitemap** — submit `sitemap.xml` in Search
  Console as your primary, compliant path (already done).
- There is a **200 URLs/day** quota by default.

Treat this script as a best-effort crawl nudge for your most important pages.

## One-time setup (~10 minutes)

### 1. Create a Google Cloud project + service account
1. Go to https://console.cloud.google.com/ → create a project (or pick one).
2. **APIs & Services → Library →** search **"Indexing API" → Enable**.
3. **APIs & Services → Credentials → Create Credentials → Service account.**
   - Give it a name (e.g. `indexing-bot`). No roles needed. Create.
4. Open the new service account → **Keys → Add key → Create new key → JSON.**
   - A `.json` file downloads. **This is your credential.** Keep it private.

### 2. Add the service account as an Owner in Search Console
1. Open the downloaded JSON, copy the `client_email` value
   (looks like `indexing-bot@your-project.iam.gserviceaccount.com`).
2. Go to https://search.google.com/search-console → your property
   (`marrakechecotours.com`).
3. **Settings → Users and permissions → Add user.**
   - Paste the `client_email`, set permission to **Owner** (must be Owner, not
     Full — the Indexing API requires ownership). Add.

> If you use a **domain property** (`marrakechecotours.com`), that's ideal — it
> covers apex + www + all locales. If it's a **URL-prefix** property, make sure it
> matches the URLs you submit (`https://marrakechecotours.com/`).

### 3. Put the key somewhere safe (NOT committed)
Save the JSON outside the repo, or in the repo root as `service-account.json`
— it is already gitignored (see below). **Never commit it.**

## Usage

From the project root:

```bash
# Dry run first — prints what it would submit, sends nothing
node scripts/google-index.mjs --key ./service-account.json --urls ./docs/all-index-urls.txt --dry-run

# Submit the priority list (new tours + English money pages) — well under 200/day
node scripts/google-index.mjs --key ./service-account.json --urls ./docs/priority-index-urls.txt

# Submit the full list — 696 URLs, so run over a few days (200/day cap).
# The list order is stable, so tomorrow's run continues where quota cut off.
node scripts/google-index.mjs --key ./service-account.json --urls ./docs/all-index-urls.txt --limit 200

# Submit a single URL (e.g. a page you just updated)
node scripts/google-index.mjs --key ./service-account.json --url https://marrakechecotours.com/en/tours/high-atlas-grand-traverse-15day
```

### Working through 696 URLs under the 200/day cap
Run `--limit 200` today, then again tomorrow, etc. Because `docs/all-index-urls.txt`
is generated in a stable order, and successful re-submissions are harmless, the
simplest approach is: run `--limit 200` daily for ~4 days. (Or trim the file to
the ~200 you care about most and just run that once.)

## Regenerating the URL list

`docs/all-index-urls.txt` and `docs/priority-index-urls.txt` are generated from
the tour/blog/destination data. After adding content, regenerate them (the
generator lives in the commit history / can be re-run) so new pages are included.

## Troubleshooting

- **403 Permission denied** → the service account isn't an **Owner** of the
  property in Search Console, or the Indexing API isn't enabled on the project.
- **401 / token error** → the JSON key is wrong/corrupted, or the machine clock
  is badly off (JWT `iat/exp` are time-sensitive).
- **429** → you hit the per-minute rate limit; the script backs off once. If it
  persists you're near the daily quota — stop and resume tomorrow.
- **200 but page still not indexed** → expected sometimes; the API nudges crawl,
  it doesn't force indexing. The sitemap + internal links do the durable work.
