<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Regression tests: write the incident, not just the assertion

`__tests__/lib/` holds ~37 suites. Almost every one exists because a specific
bug reached production and nothing in the build caught it. That origin is the
point, and it is what makes them precise.

## When to add one

Add a test whenever you fix a defect that **typecheck and `next build` both
passed**. Those are the dangerous ones: valid TypeScript, page renders, and
only a reader comparing two pages notices. If the build would have caught it,
you usually do not need a test.

## What the test must contain

A docblock naming the actual incident: what shipped, what it cost, and why
nothing else caught it. Compare:

```ts
// Bad — restates the assertion
/** Checks that blog prices match tour prices. */

// Good — records the incident (see blog-prices.test.ts)
/**
 * Tour prices are stored in USD and rendered in EUR (currency-core). Blog
 * prose that quotes the stored number with a euro sign therefore overstates
 * the price by ~9% — the article says €245 while the booking page beside it
 * says €225.
 *
 * That shipped across all eight cost posts in six languages before this test
 * existed. Nothing else catches it: the number is valid TypeScript, the page
 * builds, and only a reader comparing the two notices.
 */
```

The second one tells the next person *why the check is shaped the way it is*,
so they can tell a real failure from a false positive instead of deleting the
test.

## Assert catalogue-wide, not on today's change

Scope the assertion to the whole catalogue, deliberately. Three defects here
regressed on pages nobody was editing:

- `faq-locale-parity` — "This has now bitten three times (tourType,
  includes/excludes, faq). The assertion is deliberately catalogue-wide rather
  than scoped to the tours touched today."
- `orphan-posts` — recurred on four commercial pages sitting at positions
  48–73 because nothing checked it.

## Failure messages name the fix

The message is read by someone who did not write the test. List the offending
items and say what to do:

```ts
expect(orphans,
  `These posts have no inbound internal link, so nothing on the site votes\n` +
  `for them. Link each from a page already discussing its topic:\n  ` +
  orphans.join("\n  ")
).toEqual([]);
```

## Encode the rule, not the current data

`expect(TOURS.length).toBe(46)` fails on the next tour added and teaches
nothing. Assert the invariant instead — every tour has X, no locale drifts
from English, no URL in a list redirects.

## Verification sequence before claiming done

```bash
npx tsc --noEmit -p tsconfig.json
npx vitest run
npx next build
PYTHONIOENCODING=utf-8 py scripts/seo/audit-hreflang.py   # reads .next — rebuild first
```

`next build` exiting 0 does not prove a page rendered. Check the artefact:

```bash
[ -f ".next/server/app/<locale>/blog/<slug>.html" ] && echo OK || echo MISSING
```
