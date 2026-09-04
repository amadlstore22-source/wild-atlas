import { describe, it, expect } from "vitest";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

/**
 * data/documents.json and data/client-archive.json were each named individually
 * in .gitignore, with a comment explaining that customer data must never reach
 * a git remote. The reasoning was right and the coverage was not: the entries
 * matched those two exact paths and nothing else.
 *
 * Making a routine backup before an edit — data/client-archive.json.bak — wrote
 * a file holding eight real customers' names, email addresses and negotiated
 * prices that git was perfectly willing to stage. `git status` listed it, and a
 * plain `git add .` would have pushed it to a remote permanently. Nothing
 * warned: the file was untracked, not ignored, which looks identical to a new
 * source file you have just written.
 *
 * .gitignore now denies data/* by default and re-admits only what is meant to
 * be shared, so a new file in that directory is private unless someone decides
 * otherwise. This test pins that, and adds the check that would have caught the
 * original slip: nothing git can currently stage may contain a personal email
 * address.
 *
 * Nothing else catches this. It is not a build error, not a type error, and no
 * page renders differently. The failure only becomes visible after the data is
 * already public.
 */

const ROOT = process.cwd();

function git(args: string[]): string {
  try {
    return execFileSync("git", args, { cwd: ROOT, encoding: "utf8" });
  } catch {
    return "";
  }
}

const inRepo = fs.existsSync(path.join(ROOT, ".git")) || git(["rev-parse", "--git-dir"]) !== "";

describe.skipIf(!inRepo)("customer data cannot be committed", () => {
  it("ignores every file in data/ by default", () => {
    // The real ledgers plus the shapes that bit: a .bak twin, and a file nobody
    // has thought of yet.
    const mustBeIgnored = [
      "data/client-archive.json",
      "data/documents.json",
      "data/client-archive.json.bak",
      "data/documents.json.bak",
      "data/invoices.json",
      "data/some-new-export.json",
    ];

    const notIgnored = mustBeIgnored.filter((f) => !isIgnored(f));

    expect(
      notIgnored,
      "These paths under data/ are NOT gitignored. data/ holds real customer\n" +
        "names, emails and negotiated prices — a `git add .` would publish them.\n" +
        "Add them to .gitignore, or move them out of data/:\n  " +
        notIgnored.join("\n  "),
    ).toEqual([]);
  });

  function isIgnored(file: string): boolean {
    try {
      execFileSync("git", ["check-ignore", "-q", file], { cwd: ROOT });
      return true;
    } catch {
      return false;
    }
  }

  it("keeps the credentials file ignored", () => {
    expect(isIgnored("service-account.json")).toBe(true);
    expect(isIgnored(".env.local")).toBe(true);
  });

  it("has no personal email address in any file git can stage", () => {
    // Files git currently sees: modified, staged, or untracked-but-not-ignored.
    const status = git(["status", "--porcelain", "--untracked-files=all"]);
    const files = status
      .split("\n")
      .map((l) => l.slice(3).trim())
      .filter(Boolean)
      .filter((f) => fs.existsSync(path.join(ROOT, f)) && fs.statSync(path.join(ROOT, f)).isFile());

    // Consumer mail hosts. A customer address is the thing that must not ship;
    // the business's own @marrakechecotours.com addresses are fine and appear
    // in source deliberately.
    const personal = /[a-zA-Z0-9._%+-]+@(gmail|outlook|hotmail|yahoo|icloud|live|protonmail)\.[a-z.]+/;

    const offenders: string[] = [];
    for (const f of files) {
      // The site's own configured inbox is a real gmail address and is meant to
      // be in the source. Skip the file that legitimately declares it, and this
      // test, which contains the pattern itself.
      if (f === "lib/constants.ts" || f.includes("no-customer-data-shipped")) continue;
      let text = "";
      try {
        text = fs.readFileSync(path.join(ROOT, f), "utf8");
      } catch {
        continue; // binary or unreadable
      }
      const hit = text.match(personal);
      if (hit) offenders.push(`${f} — ${hit[0]}`);
    }

    expect(
      offenders,
      "A personal email address appears in a file git can stage. If this is\n" +
        "customer data it must not be committed — move it under data/ or add it\n" +
        "to .gitignore:\n  " +
        offenders.join("\n  "),
    ).toEqual([]);
  });
});
