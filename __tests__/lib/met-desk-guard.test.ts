import { describe, expect, it } from "vitest";
import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

/**
 * From 2026-11-02 MET Desk (the owner's local back office) issues the invoices
 * and contracts. It imported data/documents.json and continues the same INV /
 * CON series, but these commands keep their own count in that ledger. Used side
 * by side, the two would hand out the same number twice: the one invoice error
 * a client notices and a tax inspector asks about. Nothing in the build or the
 * other tests would see it, because each tool is correct on its own.
 *
 * So make-invoice and make-contract refuse once MET Desk's database holds a
 * document (scripts/met-desk-guard.mjs), and run as before until then.
 *
 * The commands themselves are NOT run here: they have no dry run and write the
 * real ledger, so a broken guard would issue a real number. The guard runs on
 * its own against throwaway databases, and the source check proves both
 * commands call it before a number is taken.
 */

const GUARD = pathToFileURL(join(process.cwd(), "scripts", "met-desk-guard.mjs")).href;

function metDeskWith(numbers: string[] | null): string {
  const dir = mkdtempSync(join(tmpdir(), "metdesk-guard-"));
  if (numbers) {
    // In a child process: this repo's @types/node predates node:sqlite.
    const code = `const { DatabaseSync } = await import("node:sqlite");
      const db = new DatabaseSync(${JSON.stringify(join(dir, "met-desk.db"))});
      db.exec("CREATE TABLE documents (id INTEGER PRIMARY KEY, number TEXT NOT NULL)");
      for (const n of ${JSON.stringify(numbers)}) db.prepare("INSERT INTO documents (number) VALUES (?)").run(n);
      db.close();`;
    const r = spawnSync(process.execPath, ["--input-type=module", "-e", code], { encoding: "utf8" });
    if (r.status !== 0) throw new Error(r.stderr);
  }
  return dir;
}

function guard(dir: string) {
  const code = `const { assertMetDeskNotIssuing } = await import(${JSON.stringify(GUARD)}); await assertMetDeskNotIssuing("invoices"); console.log("allowed");`;
  return spawnSync(process.execPath, ["--input-type=module", "-e", code], { encoding: "utf8", timeout: 30_000, env: { ...process.env, MET_DESK_DATA: dir } });
}

describe("the old invoice and contract commands once MET Desk issues documents", () => {
  it("refuse, naming MET Desk's latest number, when MET Desk holds documents", () => {
    const dir = metDeskWith(["INV-2026-051", "INV-2026-052"]);
    try {
      const r = guard(dir);
      expect(r.status, r.stdout + r.stderr).toBe(1);
      expect(r.stderr).toMatch(/issued in MET Desk now \(it holds INV-2026-052\)/);
      expect(r.stdout).not.toMatch(/allowed/);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("allow, as before, while MET Desk has no document or no database", () => {
    for (const numbers of [[], null]) {
      const dir = metDeskWith(numbers);
      try {
        const r = guard(dir);
        expect(r.status, r.stderr).toBe(0);
        expect(r.stdout).toMatch(/allowed/);
      } finally {
        rmSync(dir, { recursive: true, force: true });
      }
    }
  });

  it("are called by both commands before a number is taken", () => {
    for (const [file, kind] of [["make-invoice.mjs", "invoice"], ["make-contract.mjs", "contract"]]) {
      const src = readFileSync(join(process.cwd(), "scripts", file), "utf8");
      const guardAt = src.indexOf("await assertMetDeskNotIssuing(");
      const numberAt = src.indexOf(`nextNumber(ledger, "${kind}"`);
      expect(guardAt, `${file} must call the MET Desk guard`).toBeGreaterThan(0);
      expect(guardAt, `${file} must call the guard BEFORE allocating a number`).toBeLessThan(numberAt);
    }
  });
});
