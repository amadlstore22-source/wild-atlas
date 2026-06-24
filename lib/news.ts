import { unstable_cache } from "next/cache";
import Parser from "rss-parser";

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  url: string;
  source: string;
  publishedAt: string;
  category: "morocco" | "travel";
}

interface RssSource {
  url: string;
  name: string;
  category: "morocco" | "travel";
  maxItems: number;
}

const RSS_SOURCES: RssSource[] = [
  // Morocco sources (verified working 2026-06-24)
  { url: "https://www.theguardian.com/world/morocco/rss", name: "The Guardian", category: "morocco", maxItems: 6 },
  { url: "https://moroccotravelblog.com/feed/", name: "Morocco Travel Blog", category: "morocco", maxItems: 5 },
  // Global travel sources (verified working 2026-06-24)
  { url: "https://www.theguardian.com/travel/rss", name: "The Guardian Travel", category: "travel", maxItems: 5 },
  { url: "https://www.cntraveler.com/feed/rss", name: "Condé Nast Traveler", category: "travel", maxItems: 4 },
  { url: "https://rss.nytimes.com/services/xml/rss/nyt/Travel.xml", name: "NYT Travel", category: "travel", maxItems: 4 },
  { url: "https://www.atlasandboots.com/feed/", name: "Atlas & Boots", category: "travel", maxItems: 3 },
];

const RELEVANCE_KEYWORDS = [
  "morocco", "marrakech", "sahara", "atlas", "trekking", "hiking",
  "adventure", "tourism", "desert", "berber", "agadir", "essaouira",
  "fes", "chefchaouen", "outdoor", "expedition", "travel", "tour",
  "medina", "riad", "souk", "kasba", "dunes", "oasis", "valley",
  "casablanca", "rabat", "tangier", "draa", "todra", "dades",
  "trek", "wilderness", "nature", "mountain", "hike", "destination",
  "holiday", "vacation", "trip", "culture", "heritage",
];

// Morocco-category sources are already scoped — skip keyword filter for them
function isRelevant(title: string, excerpt: string, category: "morocco" | "travel"): boolean {
  if (category === "morocco") return true; // Guardian Morocco feed is already filtered at source
  const text = (title + " " + excerpt).toLowerCase();
  return RELEVANCE_KEYWORDS.some((kw) => text.includes(kw));
}

function slugify(url: string): string {
  let hash = 0;
  for (let i = 0; i < url.length; i++) {
    hash = (hash << 5) - hash + url.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash).toString(36);
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").replace(/&[a-z]+;/gi, " ").trim();
}

const NINETY_DAYS_MS = 90 * 24 * 60 * 60 * 1000;
const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

async function _fetchNewsArticles(): Promise<NewsArticle[]> {
  const parser = new Parser({ timeout: 8000 });
  const morocco: NewsArticle[] = [];
  const travel: NewsArticle[] = [];
  const moroccoСutoff = Date.now() - NINETY_DAYS_MS;
  const travelCutoff = Date.now() - THIRTY_DAYS_MS;

  const results = await Promise.allSettled(
    RSS_SOURCES.map(async (source) => {
      const feed = await parser.parseURL(source.url);
      const items = (feed.items ?? []).slice(0, source.maxItems * 3); // fetch extra to filter stale
      return { source, items };
    })
  );

  for (const result of results) {
    if (result.status !== "fulfilled") continue;
    const { source, items } = result.value;

    for (const item of items) {
      const title = item.title ?? "";
      const excerpt = stripHtml(item.contentSnippet ?? item.summary ?? item.content ?? "").slice(0, 200);
      if (!title || !item.link) continue;
      if (!isRelevant(title, excerpt, source.category)) continue;

      const publishedAt = item.isoDate ?? item.pubDate ?? new Date().toISOString();
      const cutoff = source.category === "morocco" ? moroccoСutoff : travelCutoff;
      if (new Date(publishedAt).getTime() < cutoff) continue;

      const article: NewsArticle = {
        id: slugify(item.link),
        title,
        excerpt,
        url: item.link,
        source: source.name,
        publishedAt,
        category: source.category,
      };

      if (source.category === "morocco") morocco.push(article);
      else travel.push(article);
    }
  }

  // Enforce 70/30: up to 4 Morocco, up to 2 travel
  const combined = [
    ...morocco.slice(0, 4),
    ...travel.slice(0, 2),
  ].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  return combined.slice(0, 6);
}

export const fetchNewsArticles = unstable_cache(
  _fetchNewsArticles,
  ["news-articles"],
  { revalidate: 86400, tags: ["news"] }
);
