// Mint a Google access token from the indexing service account.
//
// Zero dependencies: signs the JWT with node:crypto, the same way
// scripts/google-index.mjs does. This file used to import `jose`, which was
// never in package.json; it only happened to be installed as a dependency of
// shadcn's old MCP server. The 2026-11-16 dev-tools update (53d2f3c) moved
// shadcn to 4.23.0, jose disappeared from node_modules, and every script that
// imports this helper (gsc-pull, gsc-sitemap-submit, inspect-urls) failed
// with "Cannot find package 'jose'".
import { readFileSync } from "node:fs";
import { createSign } from "node:crypto";

const b64url = (v) =>
  Buffer.from(typeof v === "string" ? v : JSON.stringify(v)).toString("base64url");

export async function token(scope) {
  const sa = JSON.parse(readFileSync(new URL("../../service-account.json", import.meta.url), "utf8"));
  const now = Math.floor(Date.now() / 1000);
  const unsigned =
    b64url({ alg: "RS256", typ: "JWT" }) +
    "." +
    b64url({
      iss: sa.client_email,
      scope,
      aud: "https://oauth2.googleapis.com/token",
      iat: now,
      exp: now + 3600,
    });
  const signer = createSign("RSA-SHA256");
  signer.update(unsigned);
  const jwt = unsigned + "." + signer.sign(sa.private_key).toString("base64url");
  const r = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });
  const j = await r.json();
  if (!j.access_token) throw new Error("token failed: " + JSON.stringify(j));
  return j.access_token;
}
