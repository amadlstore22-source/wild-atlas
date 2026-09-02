import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

/**
 * A REAL CLIENT'S EMAIL ADDRESS WAS SITTING IN COMMITTED DOCUMENTATION.
 *
 * data/documents.json, data/client-archive.json and bookings/*.json are all
 * gitignored, with comments explaining that customer data must never reach a
 * git remote. That care was then undone by pasting a live customer's address
 * into docs/INVOICE_SHEET_SETUP.md as example copy, into a test fixture, and
 * into a migration script — three committed files, all bound for GitHub.
 *
 * The gitignore protects the FILES. Nothing protected the prose.
 *
 * This test walks everything git tracks and fails on an email address that is
 * not ours, not a reserved example domain, and not a UI placeholder. It is
 * deliberately broad: the failure mode is a customer's personal data being
 * published, so a false positive costing thirty seconds is a good trade.
 *
 * IF THIS FAILS: do not add the address to an allowlist. Replace it with an
 * example.com address — RFC 2606 reserved, and rejected by isPlaceholderEmail()
 * so it can never reach a real invoice. Real addresses belong in the gitignored
 * archive.
 */

const ROOT = path.resolve(__dirname, "..", "..");

/** Reserved for documentation; cannot belong to a real person. */
const RESERVED = /@(example\.(com|org|net)|test|invalid|localhost)$/;

/**
 * Form placeholders, in every locale the site ships — UI copy telling a visitor
 * what to type, not anyone's address. Matched by SHAPE rather than listed, so
 * adding a seventh language does not break this test:
 * your@email.com, votre@email.com, tucorreo@email.com, ihre@email.com, ...
 */
const PLACEHOLDER_SHAPE = /^[a-z]+@email\.com$/;

/** Config templates: a value the reader is expected to substitute. */
const TEMPLATE_SHAPE = /@your-[a-z-]+\./;

/**
 * Obviously-synthetic fixtures. isPlaceholderEmail() can only be tested by
 * feeding it addresses that LOOK real — that is the whole point of the check —
 * so its own test file necessarily contains a few. They belong to nobody.
 */
const SYNTHETIC = new Set([
  "t@t.com",
  "a@b.co",
  "real@client.com",
  "real.person@gmail.com",
  "a@test.com",
  "traveller@yahoo.co.in",
]);

const SKIP = [
  /^\.gitignore$/,
  /^__tests__\/lib\/no-client-data\.test\.ts$/,
  /^(package|package-lock)\.json$/,
  /^node_modules\//,
];

function trackedFiles(): string[] {
  const out = execFileSync("git", ["ls-files"], {
    cwd: ROOT,
    encoding: "utf8",
    maxBuffer: 32 * 1024 * 1024,
  });
  return out
    .split("\n")
    .map((f) => f.trim())
    .filter(Boolean)
    .filter((f) => !SKIP.some((re) => re.test(f)));
}

const EMAIL = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g;

describe("no customer data in tracked files", () => {
  it("contains no third-party email addresses", () => {
    const leaks: string[] = [];

    for (const file of trackedFiles()) {
      if (/\.(png|jpe?g|webp|avif|ico|woff2?|ttf|pdf|mp4|zip)$/i.test(file)) continue;

      const abs = path.join(ROOT, file);
      let text: string;
      try {
        text = fs.readFileSync(abs, "utf8");
      } catch {
        continue;
      }

      text.split("\n").forEach((lineText, i) => {
        for (const m of lineText.matchAll(EMAIL)) {
          const a = m[0].toLowerCase();
          if (RESERVED.test(a)) continue;
          if (PLACEHOLDER_SHAPE.test(a)) continue;
          if (TEMPLATE_SHAPE.test(a)) continue;
          if (SYNTHETIC.has(a)) continue;
          // Our own addresses, at our own domain, are ours by definition.
          if (a.endsWith("@marrakechecotours.com")) continue;
          if (a === "marrakechecotours@gmail.com") continue;
          leaks.push(`${file}:${i + 1}  ${m[0]}`);
        }
      });
    }

    expect(
      leaks,
      leaks.length === 0
        ? ""
        : `A third-party email address is in a tracked file and will be published ` +
            `to GitHub:\n\n` +
            leaks.map((l) => `  ${l}`).join("\n") +
            `\n\nReplace it with an example.com address (RFC 2606 reserved, and ` +
            `rejected by isPlaceholderEmail() so it cannot reach a real invoice).\n` +
            `Real client addresses belong in data/client-archive.json, which is ` +
            `gitignored. Do NOT add the address to an allowlist here.`,
    ).toEqual([]);
  });

  it("keeps the client archive and ledger out of git", () => {
    // These hold names, addresses and negotiated prices for every enquiry.
    // If one is ever tracked, all of it is published at once.
    const tracked = trackedFiles();
    expect(tracked).not.toContain("data/client-archive.json");
    expect(tracked).not.toContain("data/documents.json");
    expect(
      tracked.filter((f) => f.startsWith("bookings/") && f !== "bookings/EXAMPLE.json"),
      "Only bookings/EXAMPLE.json, with invented details, may be committed.",
    ).toEqual([]);
  });
});
