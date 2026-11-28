"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

/**
 * Reports the URL's query string to a parent, so a prerendered page can still
 * honour ?cat=, ?region= and the like.
 *
 * Why a separate component (2026-11-27): /<lang>/tours and /<lang>/blog read
 * `searchParams` on the server, which made them the only pages on the site
 * rendered on every request (Cache-Control: no-store, never a CDN hit).
 * Reading the query in the browser instead lets them be prerendered.
 *
 * useSearchParams() in a prerendered route turns the client tree up to the
 * nearest <Suspense> into browser-only rendering (Next 16 docs,
 * use-search-params.md, "Prerendering"). Kept in this leaf, inside its own
 * <Suspense fallback={null}>, only this empty component is client-rendered;
 * the tour cards and post cards stay in the HTML that crawlers read.
 */
export default function SearchParamsListener({ onChange }: { onChange: (params: URLSearchParams) => void }) {
  const params = useSearchParams();
  const qs = params.toString();
  useEffect(() => {
    onChange(new URLSearchParams(qs));
  }, [qs, onChange]);
  return null;
}
