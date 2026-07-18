import { describe, it, expect } from "vitest";
import { buildFaqSchema, faqPageDocument, buildBreadcrumbSchema } from "@/lib/seo/schema";
import { BLOG_POSTS } from "@/lib/blog";
import { TOURS, CATEGORIES } from "@/lib/tours";
import { CATEGORY_FAQ } from "@/lib/seo/category-faq";

const WEATHER_REGIONS = ["Marrakech", "High Atlas", "Sahara", "Agadir"];
const WEATHER_TOKEN = /^\[\[WEATHER\]\]\r?$/m;

describe("buildFaqSchema", () => {
  const faq = [{ q: "Is it hard?", a: "It is a long walk, not a climb." }];

  it("emits a FAQPage node without @context so it can join an @graph", () => {
    const s = buildFaqSchema(faq);
    expect(s["@type"]).toBe("FAQPage");
    expect(s).not.toHaveProperty("@context");
  });

  it("maps each pair to a Question with an acceptedAnswer", () => {
    const s = buildFaqSchema(faq);
    expect(s.mainEntity).toEqual([
      {
        "@type": "Question",
        name: "Is it hard?",
        acceptedAnswer: { "@type": "Answer", text: "It is a long walk, not a climb." },
      },
    ]);
  });

  it("attaches an @id only when given one", () => {
    expect(buildFaqSchema(faq, "https://x/#faq")["@id"]).toBe("https://x/#faq");
    expect(buildFaqSchema(faq)).not.toHaveProperty("@id");
  });

  it("faqPageDocument adds @context for standalone scripts", () => {
    expect(faqPageDocument(faq)["@context"]).toBe("https://schema.org");
  });
});

describe("buildBreadcrumbSchema", () => {
  it("numbers positions from 1 and absolutises paths", () => {
    const s = buildBreadcrumbSchema([
      { name: "Home", path: "/en" },
      { name: "Tours", path: "/en/tours" },
    ]);
    expect(s.itemListElement).toEqual([
      { "@type": "ListItem", position: 1, name: "Home", item: "https://marrakechecotours.com/en" },
      { "@type": "ListItem", position: 2, name: "Tours", item: "https://marrakechecotours.com/en/tours" },
    ]);
  });
});

describe("weather widget opt-in", () => {
  it("every weatherRegion names a real region in lib/weather.ts", () => {
    BLOG_POSTS.filter((p) => p.weatherRegion).forEach((p) => {
      expect(WEATHER_REGIONS, `${p.slug} has an unknown weatherRegion`).toContain(p.weatherRegion);
    });
  });

  // The two halves must agree: a region with no token renders nothing, and a
  // token with no region silently swallows the split. Both are silent failures
  // in the browser, so they are caught here instead.
  it("a post with weatherRegion also carries a [[WEATHER]] token", () => {
    BLOG_POSTS.filter((p) => p.weatherRegion).forEach((p) => {
      expect(WEATHER_TOKEN.test(p.content), `${p.slug} sets weatherRegion but has no [[WEATHER]] line`).toBe(true);
    });
  });

  it("a post with a [[WEATHER]] token also sets weatherRegion", () => {
    BLOG_POSTS.filter((p) => WEATHER_TOKEN.test(p.content)).forEach((p) => {
      expect(p.weatherRegion, `${p.slug} has a [[WEATHER]] line but no weatherRegion`).toBeTruthy();
    });
  });

  // lib/blog.ts is CRLF on Windows. A bare `$` anchor would sit after the \r
  // and never match, silently disabling the widget. Guard the exact regex the
  // blog page uses.
  it("the split regex matches on CRLF content", () => {
    const crlf = "Intro line\r\n\r\n[[WEATHER]]\r\n\r\nAfter the widget";
    expect(crlf.split(WEATHER_TOKEN)).toHaveLength(2);
  });
});

describe("category FAQ", () => {
  it("every key names a real category", () => {
    Object.keys(CATEGORY_FAQ).forEach((id) => {
      expect(CATEGORIES.map((c) => c.id), `no category "${id}"`).toContain(id);
    });
  });

  it("every listed category has FAQ content", () => {
    CATEGORIES.forEach((c) => {
      expect(CATEGORY_FAQ[c.id]?.length, `${c.id} has no FAQ`).toBeGreaterThan(0);
    });
  });

  it("answers are substantive and questions are questions", () => {
    Object.entries(CATEGORY_FAQ).forEach(([id, faq]) => {
      faq.forEach((f) => {
        expect(f.a.length, `${id}: answer too short`).toBeGreaterThan(40);
        expect(f.q.trim().endsWith("?"), `${id}: "${f.q}" is not a question`).toBe(true);
      });
    });
  });

  // Four near-identical pages would compete with each other rather than rank.
  it("does not repeat the same question across categories", () => {
    const seen = new Map<string, string>();
    Object.entries(CATEGORY_FAQ).forEach(([id, faq]) => {
      faq.forEach((f) => {
        const key = f.q.toLowerCase().trim();
        expect(seen.has(key), `"${f.q}" appears in both ${seen.get(key)} and ${id}`).toBe(false);
        seen.set(key, id);
      });
    });
  });
});

describe("tour FAQ integrity", () => {
  it("tour FAQ answers are substantive, not one-liners", () => {
    TOURS.filter((t) => t.faq?.length).forEach((t) => {
      t.faq!.forEach((f) => {
        expect(f.a.length, `${t.slug}: answer too short to stand alone in search`).toBeGreaterThan(40);
        expect(f.q.trim().endsWith("?"), `${t.slug}: "${f.q}" is not a question`).toBe(true);
      });
    });
  });

  it("no tour repeats the same question twice", () => {
    TOURS.filter((t) => t.faq?.length).forEach((t) => {
      const qs = t.faq!.map((f) => f.q.toLowerCase());
      expect(new Set(qs).size, `${t.slug} has duplicate questions`).toBe(qs.length);
    });
  });
});
