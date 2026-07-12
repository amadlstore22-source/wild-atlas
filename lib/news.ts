import { unstable_cache } from "next/cache";
import Parser from "rss-parser";

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  url: string;
  imageUrl: string | null;
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
  { url: "https://www.theguardian.com/world/morocco/rss", name: "The Guardian", category: "morocco", maxItems: 8 },
  { url: "https://moroccotravelblog.com/feed/", name: "Morocco Travel Blog", category: "morocco", maxItems: 6 },
  { url: "https://www.theguardian.com/uk/travel/rss", name: "The Guardian Travel", category: "travel", maxItems: 6 },
  { url: "https://www.journeybeyondtravel.com/blog/feed", name: "Journey Beyond Travel", category: "travel", maxItems: 5 },
  { url: "https://rss.nytimes.com/services/xml/rss/nyt/Travel.xml", name: "NYT Travel", category: "travel", maxItems: 5 },
  { url: "https://www.atlasandboots.com/feed/", name: "Atlas & Boots", category: "travel", maxItems: 4 },
];

// Fallback images if the feed provides no image
const FALLBACK_MOROCCO = "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80";
const FALLBACK_TRAVEL = "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80";

const RELEVANCE_KEYWORDS = [
  "morocco", "marrakech", "sahara", "atlas", "trekking", "hiking",
  "adventure", "tourism", "desert", "berber", "agadir", "essaouira",
  "fes", "chefchaouen", "outdoor", "expedition", "travel", "tour",
  "medina", "riad", "souk", "kasba", "dunes", "oasis", "valley",
  "casablanca", "rabat", "tangier", "draa", "todra", "dades",
  "trek", "wilderness", "nature", "mountain", "hike", "destination",
  "holiday", "vacation", "trip", "culture", "heritage",
];

// Topics that are "Morocco news" but not travel/adventure — a tour site should
// not surface football transfers, salary stats, elections, crime, or war.
const EXCLUDE_KEYWORDS = [
  "football", "soccer", "cup", "league", "match", "goal", "striker", "coach",
  "salary", "wage", "gdp", "economy", "inflation", "stock", "election",
  "minister", "parliament", "vote", "protest", "war", "military", "troops",
  "killed", "death", "dead", "attack", "shooting", "crime", "arrest", "court",
  "trial", "prison", "migrant", "smuggl", "drug", "earthquake victim",
];

function isRelevant(title: string, excerpt: string, category: "morocco" | "travel"): boolean {
  const text = (title + " " + excerpt).toLowerCase();
  // Morocco sources are already country-scoped, but reject non-travel news so the
  // feed reads like a travel section, not a general newswire.
  if (category === "morocco") {
    return !EXCLUDE_KEYWORDS.some((kw) => text.includes(kw));
  }
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
  return html.replace(/<[^>]*>/g, "").replace(/&[a-z#0-9]+;/gi, " ").trim();
}

// Extract the best image URL from an RSS item — each feed uses different fields
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractImage(item: any): string | null {
  // Guardian / NYT style: media:content with $ attrs
  const mc = item["media:content"] ?? item.mediaContent;
  if (mc) {
    const url = mc?.["$"]?.url ?? mc?.url ?? (Array.isArray(mc) ? mc[0]?.["$"]?.url : null);
    if (url && typeof url === "string" && url.startsWith("http")) return url;
  }
  // CNT style: media:thumbnail
  const mt = item["media:thumbnail"] ?? item.mediaThumbnail;
  if (mt) {
    const url = mt?.["$"]?.url ?? mt?.url ?? (Array.isArray(mt) ? mt[0]?.["$"]?.url : null);
    if (url && typeof url === "string" && url.startsWith("http")) return url;
  }
  // Enclosure (podcasts/some blogs)
  if (item.enclosure?.url?.startsWith("http")) return item.enclosure.url;
  // Scrape first <img> from content as last resort
  const contentHtml = item.content ?? item["content:encoded"] ?? "";
  const imgMatch = contentHtml.match(/<img[^>]+src=["']([^"']+)["']/i);
  if (imgMatch?.[1]?.startsWith("http")) return imgMatch[1];
  return null;
}

async function _fetchNewsArticles(): Promise<NewsArticle[]> {
  const parser = new Parser({
    timeout: 5000,
    customFields: {
      item: [
        ["media:content", "media:content"],
        ["media:thumbnail", "media:thumbnail"],
        ["content:encoded", "content:encoded"],
      ],
    },
  });

  const morocco: NewsArticle[] = [];
  const travel: NewsArticle[] = [];

  const results = await Promise.allSettled(
    RSS_SOURCES.map(async (source) => {
      const feed = await parser.parseURL(source.url);
      const items = (feed.items ?? []).slice(0, source.maxItems * 4);
      return { source, items };
    })
  );

  for (const result of results) {
    if (result.status !== "fulfilled") continue;
    const { source, items } = result.value;

    for (const item of items) {
      const title = item.title ?? "";
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const itemAny = item as any;
      const rawExcerpt: string = item.contentSnippet ?? item.summary ?? itemAny["content:encoded"] ?? item.content ?? "";
      const excerpt = stripHtml(rawExcerpt).slice(0, 280);
      if (!title || !item.link) continue;
      if (!isRelevant(title, excerpt, source.category)) continue;

      const publishedAt = item.isoDate ?? item.pubDate ?? new Date().toISOString();

      const imageUrl = extractImage(item);

      const article: NewsArticle = {
        id: slugify(item.link),
        title,
        excerpt,
        url: item.link,
        imageUrl,
        source: source.name,
        publishedAt,
        category: source.category,
      };

      if (source.category === "morocco") morocco.push(article);
      else travel.push(article);
    }
  }

  // Rank by relevance first, recency second — so a Morocco/adventure article
  // outranks generic global travel even if it's a few days older. Keeps the
  // feed feeling on-brand instead of "newest wire item wins".
  const MOROCCO_TERMS = ["morocco", "moroccan", "marrakech", "sahara", "atlas", "fes", "agadir", "essaouira", "chefchaouen", "berber", "amazigh", "medina", "casablanca", "tangier"];
  const TRAVEL_TERMS = ["trek", "hike", "hiking", "trail", "desert", "adventure", "tour", "guide", "mountain", "camp", "dunes", "oasis", "valley", "beach", "surf", "culture", "heritage", "food"];

  function score(a: NewsArticle): number {
    const text = (a.title + " " + a.excerpt).toLowerCase();
    let s = 0;
    for (const t of MOROCCO_TERMS) if (text.includes(t)) s += 5;
    for (const t of TRAVEL_TERMS) if (text.includes(t)) s += 2;
    if (a.imageUrl) s += 3; // prefer articles with a real image
    // Recency bonus: up to +6 for articles in the last ~30 days
    const ageDays = (Date.now() - new Date(a.publishedAt).getTime()) / 86_400_000;
    s += Math.max(0, 6 - ageDays / 5);
    return s;
  }

  const byScore = (a: NewsArticle, b: NewsArticle) => score(b) - score(a);
  morocco.sort(byScore);
  travel.sort(byScore);

  return [...morocco.slice(0, 4), ...travel.slice(0, 2)];
}

export const fetchNewsArticles = unstable_cache(
  _fetchNewsArticles,
  ["news-articles"],
  { revalidate: 21600, tags: ["news"] }, // refresh every 6 hours
);

export { FALLBACK_MOROCCO, FALLBACK_TRAVEL };
