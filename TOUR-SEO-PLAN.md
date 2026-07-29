# Tour Page SEO Plan — Make the Money Pages Rank

**Goal:** get tour pages ranking for more keywords and converting more of the traffic they get.

---

## First, the honest baseline: your tour pages are already good

Before adding anything, here's what an audit of the code found **already done** on all 40 tours — so we don't waste effort redoing it:

| Element | Status |
|---|---|
| Keyword-rich `seoTitle` | ✅ All 40 (e.g. *"3-Day Sahara Desert Tour from Marrakech — Camels, Dunes & Desert Camp"*) |
| Unique `seoDescription` | ✅ All 40 |
| Per-tour FAQ (feeds FAQPage rich results) | ✅ All 40 |
| Highlights, full itinerary, includes/excludes | ✅ All 40 |
| Product + Offer + TouristTrip + Breadcrumb + FAQ schema | ✅ Present |
| Self-canonical + hreflang per locale | ✅ Present |
| Keyword-rich image alt text | ✅ Present |

**So "add more keywords to tour pages" is mostly already done.** Stuffing more keywords into already-optimized copy would *hurt* (keyword stuffing is penalized). The real wins are structural. Here they are, ranked by impact.

---

## 🔴 GAP 1 — Tour pages don't link to your blog (the biggest miss)

**The problem:** You have 57 blog posts building topical authority on Toubkal, the Sahara, packing, weather, difficulty, etc. But the **tour pages link to none of them.** Right now authority flows blog→tour only via a couple of CTAs inside articles. The money page itself is a dead end for topical signals.

**Why it matters most:**
- Google ranks a page higher when it's surrounded by related, linked content on the same topic. A "2-Day Toubkal" tour that links to *"how to climb Toubkal in 2 days," "Toubkal packing list," "Toubkal weather by month," "is Toubkal hard"* tells Google this page is the commercial center of a deep topic cluster.
- It keeps visitors on-site (lower bounce, more pages/session — both ranking signals) and answers pre-booking questions that otherwise cause drop-off.
- It's the single highest-leverage on-page change available.

**The fix:** add a **"Plan your trip / Related guides"** section to every tour page that shows 3–5 relevant blog posts. Two ways to populate it:
1. **Explicit** — add a `relatedPosts: string[]` field to the tours that have obvious matches (Toubkal tours → Toubkal posts).
2. **Automatic fallback** — match by `category` + `origin` + tags when no explicit list (same scoring pattern as the RelatedTours fix), so all 40 get links even without hand-curation.

**Effort:** ~1 component + a data field. **This is what I'd build first.**

---

## 🟡 GAP 2 — No long-form editorial body on tour pages

**The problem:** tour content is structured (description ~90 words + itinerary + lists + FAQ). That's solid, but the top-ranking competitor tour pages usually also carry **300–500 words of unique prose** — the "why this trek, what makes it special, who it's for, what a day feels like" narrative. That prose is where long-tail keywords live naturally.

**The fix:** add an optional `longDescription` (markdown) field, rendered as a rich section below the itinerary. Write it for the **top ~10 revenue tours first** (2-day Toubkal, 3-day Sahara, 4-day Toubkal, Agafay, Merzouga, etc.), not all 40. Each 300–500 words, in the real-experience brand voice, naturally covering:
- who the tour suits (fit level, families, first-timers)
- what a day actually feels like
- seasonal notes, what makes *your* version different (Berber guides, small groups)
- questions people ask before booking

**Effort:** 1 field + render block, then content per tour. Do the top 10, measure, expand.

---

## 🟡 GAP 3 — No per-tour reviews = no star rating in search results

**The problem:** the code deliberately omits `aggregateRating` from tour schema because there's no per-tour review corpus — which is correct (fake ratings get penalized). But it means your tour results show **no gold stars** in Google, while competitors' do. Stars dramatically raise click-through.

**The fix (needs your input, not just code):** start collecting **per-tour reviews**. Even 3–5 real reviews per tour lets us add legitimate `aggregateRating` schema and show stars. Options:
- Post-trip WhatsApp/email asking for a quick tour-specific rating.
- A simple review capture on the site (ties into the `/review` flywheel already built).
- Until then, the business-wide TripAdvisor 5.0/122 stays in Organization schema (correct).

**Effort:** low code; the blocker is real review data from you.

---

## 🟢 GAP 4 — Long-tail keyword capture via the FAQ (easy expansion)

Your FAQs are good but average ~4 questions. **FAQs are pure long-tail keyword real estate** — each question can target a "People Also Ask" query. For the top tours, expand to 6–8 questions covering the actual searches:
- "How fit do I need to be for [tour]?"
- "Is [tour] suitable for children / beginners?"
- "What's the best month for [tour]?"
- "How much does [tour] cost / what's included?"
- "Do I need a guide for [X]?"
- "[Tour] vs [alternative] — which should I choose?"

Every added Q&A is more indexed content + a shot at a featured snippet, and it feeds the existing FAQPage schema automatically.

---

## 🟢 GAP 5 — Internal-link anchor variety into tours

Right now blog→tour links use a handful of anchor phrases. Vary them with keyword-rich anchors ("2-day Toubkal summit trek", "Sahara desert tour from Marrakech", "private Atlas trekking") so tours accumulate a natural spread of ranking-relevant anchor text. Low effort, done incrementally as we write new posts.

---

## Recommended build order

1. **GAP 1 — tour→blog "Related Guides" section** (biggest structural win, all 40 tours at once). ← start here
2. **GAP 4 — expand FAQs on top 10 tours** (cheap, pure keyword gain).
3. **GAP 2 — longDescription on top 10 revenue tours** (depth + long-tail).
4. **GAP 3 — per-tour review capture** (unlocks star ratings — needs your review-collection buy-in).
5. **GAP 5 — anchor variety** (ongoing, as content grows).

## What I would NOT do
- ❌ Stuff more keywords into existing titles/descriptions — they're already optimized; more = penalty risk.
- ❌ Add long-form prose to all 40 at once — do the top revenue tours, measure, expand.
- ❌ Fake per-tour ratings to get stars — real reviews only.

---

## Suggested first move

**GAP 1 is the clear starting point** — a "Related Guides" section linking each tour to its most relevant blog posts. It touches all 40 tours at once, flows your existing blog authority into the money pages, reduces pre-booking drop-off, and needs no new content (the 57 posts already exist). Say the word and I'll build it: a `RelatedGuides` component + `relatedPosts` field with automatic category/origin fallback, wired into the tour page, built and verified.
