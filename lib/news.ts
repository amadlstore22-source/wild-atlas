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
  // Note: competitor Morocco tour blogs (moroccotravelblog.com, journeybeyondtravel.com)
  // were intentionally removed — the homepage should not send visitors to rivals.
  // The internal BLOG_POSTS fallback covers thin-news days instead.
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

// TOPIC keywords — "is this about travel/culture/nature?"
//
// Deliberately contains NO place names. This list used to include "morocco",
// "marrakech", "atlas" and so on, which made it useless as a second test: once
// an article mentioned Morocco it satisfied the topic check too, so a piece on
// Moroccan tax law read as travel content. Place is decided by
// MOROCCO_KEYWORDS; this list decides subject matter only.
const RELEVANCE_KEYWORDS = [
  "trekking", "hiking", "adventure", "tourism", "tourist", "outdoor",
  "expedition", "travel", "tour", "trek", "wilderness", "nature",
  "mountain", "hike", "destination", "holiday", "vacation", "trip",
  "culture", "cultural", "heritage", "cuisine", "food", "hotel", "resort",
  "guesthouse", "hospitality", "flight", "airline", "visa", "itinerary",
  "landscape", "wildlife", "national park", "unesco", "festival",
  "desert", "dunes", "oasis", "valley", "coast", "beach", "surf", "ski",
  // Things you see or stay in — topic words, not place names.
  "souk", "riad", "kasbah", "medina", "hammam", "tagine", "camel", "dune",
  "rooftop", "market", "bazaar", "mosque", "palace", "garden", "museum",
  // Getting there and around — infrastructure a traveller actually cares about.
  "rail", "railway", "train", "airport", "ferry", "road trip", "high-speed",
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

// Morocco-place keywords. An article must mention at least one of these to run
// on the site — this is the hard gate that keeps the section about Morocco.
// Word-boundary matched (see mentionsMorocco) so "fes" cannot match "manifesto"
// and "atlas" cannot match "atlassian".
const MOROCCO_KEYWORDS = [
  "morocco", "moroccan", "marrakech", "marrakesh", "sahara", "saharan",
  "atlas mountains", "high atlas", "anti-atlas", "toubkal", "jbel toubkal",
  "fes", "fez", "agadir", "essaouira", "chefchaouen", "berber", "amazigh",
  "tamazight", "casablanca", "rabat", "tangier", "tangiers", "merzouga",
  "ouarzazate", "maghreb", "meknes", "zagora", "erg chebbi", "erg chigaga",
  "imlil", "ourika", "todra", "dades", "draa", "taghazout", "ait benhaddou",
  "aït benhaddou", "medina", "riad", "tagine", "souk",
];

/**
 * True when the text actually mentions Morocco or a Moroccan place.
 *
 * Matched on word boundaries: substring matching produced false positives
 * ("fes" inside "manifesto", "rabat" inside "rabatment"), which is one way
 * unrelated articles reached the homepage.
 */
function mentionsMorocco(text: string): boolean {
  return MOROCCO_KEYWORDS.some((kw) => {
    const escaped = kw.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp(`\\b${escaped}\\b`, "i").test(text);
  });
}

/**
 * Every article must be about Morocco AND about travel/culture/nature.
 *
 * The Morocco mention is required for EVERY feed, including country-scoped ones.
 * Previously, "travel" feeds (Guardian Travel, NYT Travel) only had to match a
 * generic RELEVANCE_KEYWORD — and that list contains words like "travel",
 * "holiday" and "trip", so essentially every article in a travel feed qualified.
 * That is how pieces about Japan or Peru ended up in a Morocco tour operator's
 * news section.
 *
 * @param scoped true when the feed is already limited to Morocco (e.g. Guardian
 *        Morocco). Scoped feeds skip the keyword check only as a fallback, since
 *        their own editorial scope already guarantees the country.
 */
export function isRelevant(
  title: string,
  excerpt: string,
  /** Retained for call-site clarity; both categories now face the same two
   *  gates, since being Moroccan is not on its own a reason to publish. */
  _category: "morocco" | "travel",
  scoped: boolean,
): boolean {
  const text = (title + " " + excerpt).toLowerCase();
  // Reject general politics/sport/crime everywhere — this is a travel section.
  if (EXCLUDE_KEYWORDS.some((kw) => text.includes(kw))) return false;

  // Gate 1 — PLACE: the article must be about Morocco. A country-scoped feed is
  // trusted to be Morocco-only even when the headline omits the country name
  // (e.g. "Marrakech" alone, or a piece that says only "the kingdom").
  if (!scoped && !mentionsMorocco(text)) return false;

  // Gate 2 — TOPIC: it must also be travel/culture/nature. This applies to
  // scoped feeds too: Guardian Morocco is a general news desk, so without this
  // a press-conference scuffle qualifies purely for being Moroccan. EXCLUDE_
  // KEYWORDS catches the obvious politics/sport/crime; this catches the rest.
  return RELEVANCE_KEYWORDS.some((kw) => text.includes(kw));
}

/**
 * A feed's <link> is remote, third-party data that we render straight into an
 * href. Without this gate a feed could hand us `javascript:...` and every click
 * would execute it: React does not block javascript: URLs (it only warns), and
 * our CSP script-src does not stop a javascript: URI navigation either.
 *
 * Today's five feeds are all reputable (BBC, Guardian, NYT, Atlas & Boots), so
 * this is defence against a compromised feed or a future, less careful source
 * rather than a live hole. http/https only — nothing else belongs in a news
 * link, including data:, vbscript: and protocol-relative "//evil.example".
 */
export function isSafeHttpUrl(raw: unknown): raw is string {
  if (typeof raw !== "string" || raw.length > 2048) return false;
  try {
    const proto = new URL(raw).protocol;
    return proto === "http:" || proto === "https:";
  } catch {
    // Relative or malformed: not a usable external link.
    return false;
  }
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
      // Drop the item entirely rather than render an unsafe or unusable link.
      if (!title || !isSafeHttpUrl(item.link)) continue;
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
