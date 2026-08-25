// Mint a Google access token from the indexing service account using `jose`,
// which is already a transitive dep. Avoids adding googleapis just to read.
import { readFileSync } from "node:fs";
import { SignJWT, importPKCS8 } from "jose";

export async function token(scope) {
  const sa = JSON.parse(readFileSync(new URL("../../service-account.json", import.meta.url), "utf8"));
  const key = await importPKCS8(sa.private_key, "RS256");
  const now = Math.floor(Date.now() / 1000);
  const jwt = await new SignJWT({ scope })
    .setProtectedHeader({ alg: "RS256" })
    .setIssuer(sa.client_email)
    .setAudience("https://oauth2.googleapis.com/token")
    .setIssuedAt(now)
    .setExpirationTime(now + 3600)
    .sign(key);
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
