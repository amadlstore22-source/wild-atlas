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
  // Morocco sources — target 70%
  { url: "https://www.moroccoworldnews.com/feed/", name: "Morocco World News", category: "morocco", maxItems: 4 },
  { url: "https://www.moroccotomorrow.org/feed/", name: "Morocco Tomorrow", category: "morocco", maxItems: 3 },
  { url: "https://feeds.bbci.co.uk/news/topics/c0q8l1lp04lt", name: "BBC Morocco", category: "morocco", maxItems: 3 },
  // Global travel sources — target 30%
  { url: "https://www.lonelyplanet.com/articles/feed", name: "Lonely Planet", category: "travel", maxItems: 2 },
  { url: "https://www.nationalgeographic.com/travel/rss", name: "National Geographic", category: "travel", maxItems: 2 },
];

const RELEVANCE_KEYWORDS = [
  "morocco", "marrakech", "sahara", "atlas", "trekking", "hiking",
  "adventure", "tourism", "desert", "berber", "agadir", "essaouira",
  "fes", "chefchaouen", "outdoor", "expedition", "travel", "tour",
  "medina", "riad", "souk", "kasba", "dunes", "oasis", "valley",
];

function isRelevant(title: string, excerpt: string): boolean {
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

const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

async function _fetchNewsArticles(): Promise<NewsArticle[]> {
  const parser = new Parser({ timeout: 8000 });
  const morocco: NewsArticle[] = [];
  const travel: NewsArticle[] = [];
  const cutoff = Date.now() - THIRTY_DAYS_MS;

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
      if (!isRelevant(title, excerpt)) continue;

      const publishedAt = item.isoDate ?? item.pubDate ?? new Date().toISOString();
      // Drop articles older than 30 days
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
