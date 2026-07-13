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
  /** true = feed is already limited to Morocco; false = broad feed that must
   *  explicitly mention Morocco to qualify. */
  scoped: boolean;
  /** Evergreen blogs (undated posts) — used only to backfill when there isn't
   *  enough genuinely fresh dated news. Not counted as "real news". */
  evergreen?: boolean;
}

const RSS_SOURCES: RssSource[] = [
  // Dated news — real, recent news about Morocco / culture / nature / travel.
  { url: "https://www.theguardian.com/world/morocco/rss", name: "The Guardian", category: "morocco", maxItems: 8, scoped: true },
  { url: "https://feeds.bbci.co.uk/news/world/africa/rss.xml", name: "BBC Africa", category: "morocco", maxItems: 12, scoped: false },
  { url: "https://www.theguardian.com/uk/travel/rss", name: "The Guardian Travel", category: "travel", maxItems: 8, scoped: false },
  { url: "https://rss.nytimes.com/services/xml/rss/nyt/Travel.xml", name: "NYT Travel", category: "travel", maxItems: 8, scoped: false },
  { url: "https://www.atlasandboots.com/feed/", name: "Atlas & Boots", category: "travel", maxItems: 6, scoped: false },
  // Evergreen Morocco blogs — backfill only (kept off-screen unless news is thin).
  { url: "https://moroccotravelblog.com/feed/", name: "Morocco Travel Blog", category: "morocco", maxItems: 6, scoped: true, evergreen: true },
  { url: "https://www.journeybeyondtravel.com/blog/feed", name: "Journey Beyond Travel", category: "travel", maxItems: 5, scoped: false, evergreen: true },
];

// Freshness policy: prefer articles from the last 7 days (big score bonus);
// allow up to 14 as a safety net so the section is rarely empty. Evergreen
// backfill has no age gate.
const MAX_AGE_MS = 14 * 24 * 60 * 60 * 1000;
const TARGET_COUNT = 6;

// Curated pool of verified-authentic Morocco photos. RSS feed images are
// unreliable (a "Morocco packing" article once shipped a photo of a man in VR
// goggles), so for feeds we don't trust we assign one of these deterministically
// by article id — always on-brand, and varied across the list.
const MOROCCO_IMAGES = [
  "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=800&q=80", // Rabat zellige fountain
  "https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=800&q=80", // Marrakech medina
  "https://images.unsplash.com/photo-1548018560-4cb48a8837c1?w=800&q=80",    // Atlas mountains
  "https://images.unsplash.com/photo-1564507004663-b6dfb3c824d5?w=800&q=80", // Chefchaouen blue city
  "https://images.unsplash.com/photo-1565985482571-03a42ea59d80?w=800&q=80", // Essaouira coast
  "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=800&q=80", // kasbah & oasis
  "https://images.unsplash.com/photo-1617374128851-c84e37dc9f37?w=800&q=80", // Erg Chebbi sunset
  "https://images.unsplash.com/photo-1527338611623-4e242563220a?w=800&q=80", // Aït Benhaddou ksar
];

// Feeds whose supplied images can't be trusted to depict Morocco — always use a
// curated image instead of the feed's own. (Also avoids needing every feed's
// image CDN host in next.config's image allowlist.)
const UNTRUSTED_IMAGE_SOURCES = new Set([
  "Morocco Travel Blog",
  "Journey Beyond Travel",
  "BBC Africa", // ichef.bbci.co.uk images are generic African news, not Morocco
]);

// Pick a stable curated image for an article (same id -> same image).
function curatedImage(id: string): string {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) | 0;
  return MOROCCO_IMAGES[Math.abs(h) % MOROCCO_IMAGES.length];
}

// Image hosts configured in next.config.ts remotePatterns. A feed image is only
// usable with next/image if its host is here — otherwise the page crashes with
// "hostname not configured". Keep in sync with next.config.ts.
const ALLOWED_IMAGE_HOSTS = new Set([
  "images.unsplash.com",
  "i.guim.co.uk",
  "static01.nyt.com",
  "moroccotravelblog.com",
  "www.atlasandboots.com",
]);

function imageHostAllowed(url: string): boolean {
  try {
    return ALLOWED_IMAGE_HOSTS.has(new URL(url).hostname);
  } catch {
    return false;
  }
}

// Reject obviously bad image URLs (icons, avatars, tracking pixels, logos).
function looksLikeBadImage(url: string): boolean {
  const u = url.toLowerCase();
  return (
    /\b(icon|avatar|logo|sprite|pixel|1x1|blank|gravatar|placeholder|button|badge)\b/.test(u) ||
    /\.svg(\?|$)/.test(u) ||
    /\bw=\d{1,2}\b/.test(u) // tiny widths like w=16
  );
}

// Legacy exports kept for compatibility.
const FALLBACK_MOROCCO = MOROCCO_IMAGES[0];
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

// Morocco-place keywords — required for broad (non-country-scoped) feeds so a
// general "Africa" feed only contributes items that are actually about Morocco.
const MOROCCO_KEYWORDS = [
  "morocco", "moroccan", "marrakech", "marrakesh", "sahara", "atlas mountains",
  "fes", "fez", "agadir", "essaouira", "chefchaouen", "berber", "amazigh",
  "casablanca", "rabat", "tangier", "merzouga", "ouarzazate", "maghreb",
];

/**
 * @param scoped true when the feed is already limited to Morocco (e.g. Guardian
 *        Morocco). Broad feeds (BBC Africa) must explicitly mention Morocco.
 */
function isRelevant(
  title: string,
  excerpt: string,
  category: "morocco" | "travel",
  scoped: boolean,
): boolean {
  const text = (title + " " + excerpt).toLowerCase();
  // Reject general politics/sport/crime everywhere — this is a travel section.
  if (EXCLUDE_KEYWORDS.some((kw) => text.includes(kw))) return false;

  if (category === "morocco") {
    // Country-scoped feed: accept anything (already Morocco). Broad feed: require
    // an actual Morocco mention so we don't surface generic African news.
    return scoped || MOROCCO_KEYWORDS.some((kw) => text.includes(kw));
  }
  // Travel feeds: require a travel/Morocco relevance keyword.
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

  // Fresh dated news (<=14d), split by topic; and evergreen backfill.
  const freshMorocco: NewsArticle[] = [];
  const freshTravel: NewsArticle[] = [];
  const evergreen: NewsArticle[] = [];

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
      if (!isRelevant(title, excerpt, source.category, source.scoped)) continue;

      const publishedAt = item.isoDate ?? item.pubDate ?? new Date().toISOString();
      const ageMs = Date.now() - new Date(publishedAt).getTime();

      // Dated-news sources must be recent (<=14d). Evergreen blogs skip the gate
      // (they're backfill only) — their undated posts would otherwise never pass.
      if (!source.evergreen && (isNaN(ageMs) || ageMs > MAX_AGE_MS)) continue;

      const id = slugify(item.link);
      // Trust the feed image only if the source is reliable AND it isn't junk;
      // otherwise use a curated, verified-Moroccan photo so nothing off-brand
      // (e.g. a VR-goggles stock photo) ever shows.
      const rawImage = extractImage(item);
      const trustFeedImage =
        rawImage != null &&
        !UNTRUSTED_IMAGE_SOURCES.has(source.name) &&
        !looksLikeBadImage(rawImage) &&
        imageHostAllowed(rawImage); // never hand next/image an unconfigured host
      // If we can't trust the feed image (untrusted source, junk, or a host that
      // isn't in next.config's allowlist), always use a curated Morocco photo.
      const imageUrl = trustFeedImage ? rawImage : curatedImage(id);

      const article: NewsArticle = {
        id,
        title,
        excerpt,
        url: item.link,
        imageUrl,
        source: source.name,
        publishedAt,
        category: source.category,
      };

      if (source.evergreen) evergreen.push(article);
      else if (source.category === "morocco") freshMorocco.push(article);
      else freshTravel.push(article);
    }
  }

  // Relevance score — Morocco/culture/nature/travel terms + freshness bonus.
  const MOROCCO_TERMS = ["morocco", "moroccan", "marrakech", "sahara", "atlas", "fes", "agadir", "essaouira", "chefchaouen", "berber", "amazigh", "medina", "casablanca", "tangier", "maghreb"];
  const TOPIC_TERMS = ["trek", "hike", "hiking", "trail", "desert", "adventure", "tour", "guide", "mountain", "camp", "dunes", "oasis", "valley", "beach", "surf", "culture", "cultural", "heritage", "food", "nature", "wildlife", "national park", "hiking"];

  function score(a: NewsArticle): number {
    const text = (a.title + " " + a.excerpt).toLowerCase();
    let s = 0;
    for (const t of MOROCCO_TERMS) if (text.includes(t)) s += 5;
    for (const t of TOPIC_TERMS) if (text.includes(t)) s += 2;
    if (a.imageUrl) s += 2;
    // Strong freshness bonus: within 7 days gets a big boost, decaying after.
    const ageDays = (Date.now() - new Date(a.publishedAt).getTime()) / 86_400_000;
    s += ageDays <= 7 ? 8 : Math.max(0, 8 - (ageDays - 7));
    return s;
  }
  const byScore = (a: NewsArticle, b: NewsArticle) => score(b) - score(a);

  freshMorocco.sort(byScore);
  freshTravel.sort(byScore);
  evergreen.sort(byScore);

  // Tiered fill: fresh Morocco news first, then fresh culture/nature/travel,
  // then evergreen Morocco blogs only to backfill remaining slots. De-dupe by id.
  const seen = new Set<string>();
  const out: NewsArticle[] = [];
  const take = (list: NewsArticle[], max: number) => {
    for (const a of list) {
      if (out.length >= max) break;
      if (seen.has(a.id)) continue;
      seen.add(a.id);
      out.push(a);
    }
  };

  // 1) fresh Morocco news; 2) on-brand Morocco culture/nature (evergreen blogs)
  // — these keep the section Moroccan, which is the point; 3) fresh general
  // travel only as a last resort so it's never empty.
  take(freshMorocco, TARGET_COUNT);
  take(evergreen, TARGET_COUNT);
  take(freshTravel, TARGET_COUNT);

  return out.slice(0, TARGET_COUNT);
}

export const fetchNewsArticles = unstable_cache(
  _fetchNewsArticles,
  ["news-articles"],
  { revalidate: 21600, tags: ["news"] }, // refresh every 6 hours
);

export { FALLBACK_MOROCCO, FALLBACK_TRAVEL };
