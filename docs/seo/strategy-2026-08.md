# SEO Strategy — Marrakech Eco Tours

**Date:** 2026-08-10
**Scope:** Technical, on-page, off-page
**Status:** Research and strategy. No code changed to produce this document.

Every claim below is sourced to Google's own documentation or to a command run
against this repository. Where something is unknown or unverifiable from here,
it says so rather than guessing. Third-party SEO blogs are used only as
corroboration, never as the sole basis for a recommendation.

---

## Executive summary

The site's technical SEO is in good shape. The 876-page audit is clean: no
missing titles, descriptions, canonicals or h1s, complete reciprocal hreflang,
valid JSON-LD everywhere. That work is done and this document does not revisit
it.

The three findings that matter now are none of them ordinary technical debt:

1. **Brand entity fragmentation** (off-page, severe). The site is "Marrakech
   Eco Tours". The TripAdvisor listing carrying all 122 reviews is "Morocco
   Tours With Locals". Nothing on the site reconciles the two names, and the
   homepage `aggregateRating` attributes that rating to a name the review
   source never uses.
2. **Two schema types were retired by Google and the site still emits both.**
   FAQPage stopped producing rich results on 2026-05-07. TouristTrip /
   TouristAttraction / TouristDestination have never produced any.
3. **The brand name is commercially diluted.** At least six near-identical
   competitors compete for the same brand queries.

Ranked by expected impact per unit of effort: **#1 first, by a wide margin.**

---

## Finding 1 — Brand entity fragmentation

### The evidence

From `lib/constants.ts`:

- `TRIPADVISOR.listingName` = **"Morocco Tours With Locals"**
- `TRIPADVISOR.rating` = 5.0, `reviewCount` = 122, ranked 310 of 3,979

From `app/[lang]/page.tsx`, the homepage `LocalBusiness` node declares
`name: "Marrakech Eco Tours"` and attaches:

```
aggregateRating: { ratingValue: "5.0", reviewCount: "122" }
```

A repo-wide grep confirms the string "Morocco Tours With Locals" appears
**only** in `constants.ts` — no page, schema block or visible copy anywhere
reconciles the two identities.

### Why this matters

Google builds an entity graph, and `aggregateRating` is a claim about a named
entity. The site asserts that an entity called "Marrakech Eco Tours" holds 122
reviews, while the only verifiable source for those reviews names a different
entity. Google can follow the `sameAs` link to the TripAdvisor URL and find a
name mismatch.

Two consequences, stated at their true confidence:

- **Certain:** the review signal is weaker than it should be, because the
  strongest third-party trust asset is not unambiguously connected to the
  brand being ranked.
- **Possible, not established:** review-snippet eligibility is affected.
  Google's structured data policy requires that the rating refer to the
  specific entity the page is about. Whether the mismatch alone triggers
  suppression cannot be determined from here — only Search Console's rich
  result report can confirm.

I am deliberately not claiming this *is* causing a penalty. I am claiming the
signal is ambiguous where it should be unambiguous.

### The fix, in order

1. **Add both names to the homepage entity block.** `alternateName` is the
   correct schema.org property for a business trading under a second name.
   This makes the relationship explicit rather than leaving Google to infer it.
2. **Reconcile the names publicly.** One visible line near the reviews — "also
   listed on TripAdvisor as Morocco Tours With Locals" — gives both users and
   crawlers the connection. Users currently clicking through to TripAdvisor
   see an unfamiliar business name, which is a conversion problem as much as
   an SEO one.
3. **Decide which name is the primary entity.** This is a business decision,
   not a technical one, and it needs your input. The domain and site say
   "Marrakech Eco Tours"; the reviews and the TripAdvisor ranking say "Morocco
   Tours With Locals". Consolidating on one is worth more than optimising both.
4. **Then** claim/verify a Google Business Profile under the chosen name. A GBP
   is the single strongest local entity signal and is the natural anchor for
   everything above. `constants.ts` shows the Google review link is present but
   not yet activated.

---

## Finding 2 — Two retired schema types

### FAQPage — retired 2026-05-07

Verified against Google's own documentation, which now carries a deprecation
notice, corroborated by Search Engine Journal.

Timeline: restricted to authoritative government and health sites in September
2023; deprecation notice May 2026; the feature stopped appearing for **every**
site, including those government and health sites, on **2026-05-07**. Search
Console API support is being removed in August 2026 — i.e. this month.

The site emits FAQPage in six files:

- `app/[lang]/blog/[slug]/page.tsx`
- `app/[lang]/contact/page.tsx`
- `app/[lang]/destinations/[dest]/page.tsx`
- `app/[lang]/how-we-operate/page.tsx`
- `app/[lang]/tours/[slug]/page.tsx`
- `components/seo/FaqSection.tsx`

### TouristTrip / TouristAttraction / TouristDestination — never produced rich results

Google's Search Gallery lists every type that generates a rich result. The
complete list is: Article, Breadcrumb, Carousel, Course list, Dataset,
Discussion forum, Education Q&A, Employer aggregate rating, Event, Image
metadata, Job posting, Local business, Math solver, Movie, Organization,
Product, Profile page, Q&A, Recipe, Review snippet, Software app, Speakable,
Subscription/paywalled content, Vacation rental, Video.

**None of the tourism types appear.** They are valid schema.org vocabulary that
Google does not render. The site emits them in
`app/[lang]/tours/[slug]/page.tsx` and
`app/[lang]/destinations/[dest]/page.tsx`.

Third-party guides claiming TouristTrip produces "rich snippets showing price,
rating and availability" are marketing content contradicted by Google's own
supported-types list. Ignore them.

### Recommendation: keep the markup, drop the expectation

This is the opposite of the obvious conclusion, so here is the reasoning.

Google has stated that unused structured data does not harm Search, and both
FAQPage and the tourism types remain valid schema.org vocabulary. Meanwhile
`app/robots.ts` explicitly admits GPTBot, ChatGPT-User, PerplexityBot,
ClaudeBot, CCBot and anthropic-ai. Those crawlers read schema for entity
extraction, and AI search surfaces are a growing referral channel for travel
queries.

So: **removing it buys nothing, and may cost visibility in AI answers.**

What must change is the *expectation*. Nobody should be waiting on FAQ rich
results, and no future work should be justified by them. Removing the markup is
optional cleanup, not a fix — and there is a real argument for leaving it.

The one thing worth doing: **`Product` schema is already emitted on tour pages,
and Product *is* on the supported list.** Where a tour has a real price and a
real rating, Product is the type that can actually earn a rich result. That is
where schema effort should go — not into the tourism types.

---

## Finding 3 — Brand dilution (competitive context)

A search for the brand surfaced these operators, all live on TripAdvisor:

| Name | Base |
|---|---|
| Morocco Ecotours | Marrakech |
| Eco Morocco Tours | Marrakech |
| Eco Morocco Tours | Fez (separate company, same name) |
| Eco Morocco Travel | Marrakech |
| Maroc Eco Tour | Marrakech |
| Marruecos Eco Viajes | Casablanca |

Two consequences:

- **Brand queries are contested.** Someone told "book with Marrakech Eco Tours"
  can land on five other companies. This is exactly why Finding 1 matters: when
  the name itself is weak differentiation, the entity signals around it
  (reviews, GBP, consistent NAP) carry the load.
- **Ranking for "eco tours marrakech" is a crowded fight on a generic head
  term.** The realistic opportunity is the long tail the site already invests
  in — 45 tours and ~90 blog posts across 6 locales.

The sister brand, **Morocco Bike & Ski Tours** (`moroccobike-skitours.com`), is
already in `sameAs`. That is correct and worth keeping: it is a genuine related
entity, and cross-linking real properties is not a link scheme.

---

## Off-page plan (research only — requires your execution)

I can research and name targets. I cannot send outreach or create profiles.

### What Google's spam policy actually permits

Fetched from Google's spam policies documentation:

**Prohibited:** buying or selling links for ranking purposes; excessive link
exchanges; advertorials with ranking-passing links; large-scale guest posting
where the primary purpose is links rather than audience value; low-quality
directory links; forum signature links; PBNs and link farms.

**Permitted:** paid placements correctly marked `rel="sponsored"` or
`rel="nofollow"` — Google explicitly acknowledges "buying and selling links is
a normal part of the economy of the web" when qualified. Editorial guest posts
with varied anchors, written for real readers, remain compliant.

**The distinguishing test** is intent and scale, not the format. Identical
exact-match commercial anchors pointing at one destination across many sites is
the violation; genuine editorial placements are not.

One further note relevant to this site: Google's **scaled content abuse**
policy names *"scraped content with minor modifications — including
translating"*. This site is not at risk. Locale blog files run 400–800 KB
against English's 569 KB, which is substantive human-scale localisation, not
thin machine translation. Worth knowing the line exists, since a future
shortcut here would be costly.

### Named targets, in priority order

**Tier 1 — entity and trust foundations (do these first)**

1. **Google Business Profile** — claim and verify. Strongest local signal.
   Blocked on the Finding 1 naming decision.
2. **TripAdvisor name reconciliation** — resolve the two-identity problem.
3. **Consistent NAP** everywhere the business is listed: identical name,
   address, phone. `constants.ts` has `+212653936003` and a Marrakech address
   as the canonical pair.

**Tier 2 — industry bodies (credible, verifiable, editorially earned)**

4. **Adventure Travel Trade Association (ATTA)** —
   `membership.adventuretravel.biz/directory`. A membership directory of
   roughly 30,000 members. Confirmed Morocco operators already listed: Morocco
   Immersion Tours & Adventures, Morocco Nature Trails, Inclusive Morocco.
   This is a legitimate trade membership, not a link buy — the link is
   incidental to real industry membership.
   *Caveat: I have not verified current pricing or that they accept operators
   of your size. Confirm directly before budgeting.*
5. **African Travel and Tourism Association (ATTA®)** — a different
   organisation with a confusingly identical acronym, 615+ members, covering
   Africa and Indian Ocean islands. Evaluate separately.
6. **Moroccan National Tourist Office** and any local Marrakech guiding
   association. The certified-Berber-guide positioning is a genuine credential;
   accreditation bodies are the most defensible links available.

**Tier 3 — editorial and digital PR (highest value, slowest)**

7. The site's real asset is **first-party expertise**: certified Berber guides,
   operating since 2010, genuine price transparency. The blog already argues
   direct-booking economics against platform commissions with verified figures.
   That is a legitimate journalist hook — sustainable tourism and platform
   commission structures are both live media topics.
8. Target outdoor and responsible-travel publications rather than generic
   travel-blog link farms. One editorial placement in a real outlet outweighs
   fifty directory links, and carries no policy risk.

**Explicitly not recommended:** paid guest-post networks, link exchanges with
other Morocco operators, mass directory submission. These are the practices
Google's October 2025 spam update specifically extended enforcement against.

---

## What cannot be determined from here

Stated plainly so no one mistakes absence of a number for a good number.

- **Core Web Vitals.** LCP, INP and CLS are field metrics at the 75th
  percentile of real loads. Only Search Console's CWV report (CrUX, ~28 days)
  shows them. A Lighthouse lab score is a diagnostic, not the same measurement,
  and must not be reported as one.
- **Actual backlink profile.** No backlink data source was available in this
  session. The off-page tiering above is built from Google's policy and named
  industry bodies, not from a link audit of the current profile.
- **Whether the review-snippet mismatch is currently suppressing rich results.**
  Search Console's rich result report is the only authority.
- **Live site behaviour.** This network blocks direct TLS to the domain;
  everything technical here comes from source and build output.

---

## Recommended order of work

1. **Decide the primary brand name.** Business decision, blocks items 2–4.
2. Add `alternateName` + reconcile TripAdvisor identity in schema and copy.
3. Claim and verify Google Business Profile.
4. Finish the Indexing API submission (156 URLs; quota was exhausted
   2026-08-10, resume with `-Limit 156`).
5. Check Search Console CWV and rich results reports for field data.
6. Strengthen `Product` schema on tour pages — the one supported type that can
   still earn a rich result.
7. Pursue ATTA membership and accreditation links.
8. Editorial PR on the direct-booking / sustainable-tourism angle.

Items 2 and 6 are code and I can implement both on your word. Items 1, 3 and 7
need you. Item 4 needs tomorrow's quota.

---

## Sources

Google (primary):

- Spam policies — https://developers.google.com/search/docs/essentials/spam-policies
- Search Gallery (supported rich result types) — https://developers.google.com/search/docs/appearance/structured-data/search-gallery
- FAQPage deprecation — https://developers.google.com/search/docs/appearance/structured-data/faqpage
- Localized versions / hreflang — https://developers.google.com/search/docs/specialty/international/localized-versions
- Product structured data — https://developers.google.com/search/docs/appearance/structured-data/product

Corroborating:

- Search Engine Journal, FAQ rich results removal — https://www.searchenginejournal.com/google-drops-faq-rich-results-from-search/574429/
- ATTA member directory — https://membership.adventuretravel.biz/directory

Repository: `lib/constants.ts`, `app/[lang]/page.tsx`, `app/robots.ts`,
`lib/blog*.ts`, `scripts/seo/*` audits.
