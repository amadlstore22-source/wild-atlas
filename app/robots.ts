import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // /llms.txt is already covered by `allow: "/"`, so naming it changes
      // nothing for a crawler that parses robots.txt correctly. It is listed
      // because robots.txt is the first file an AI agent fetches and several
      // assistants surface the paths they find there — this is a discovery
      // hint, not an access rule.
      { userAgent: "*", allow: ["/", "/llms.txt"], disallow: "/api/" },
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },
      { userAgent: "CCBot", allow: "/" },
      { userAgent: "Googlebot", allow: "/" },
      { userAgent: "Bingbot", allow: "/" },
    ],
    sitemap: "https://marrakechecotours.com/sitemap.xml",
  };
}
