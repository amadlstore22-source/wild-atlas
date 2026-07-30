# DNS records — marrakechecotours.com

Snapshot taken 2026-07-30 **before** the Cloudflare Email Routing migration,
and used to rebuild after all 16 records were deleted during it.

Nameservers: `vivienne.ns.cloudflare.com`, `donald.ns.cloudflare.com`
(Cloudflare holds DNS; Namecheap is registrar only.)

> ⚠️ Read this before deleting anything in the Cloudflare DNS panel. Deleting
> the two CNAMEs takes the website offline; deleting the google-site-
> verification TXT records loses Search Console access; deleting anything on
> `send.` or `resend._domainkey.` breaks the contact form.

---

## Website — REQUIRED, site is offline without these

| Type | Name | Content | Proxy |
|---|---|---|---|
| CNAME | `@` | `ac9205e2598379b9.vercel-dns-017.com` | **DNS only** |
| CNAME | `www` | `ac9205e2598379b9.vercel-dns-017.com` | **DNS only** |

Proxy **must** stay "DNS only" (grey cloud). Orange/proxied puts Cloudflare in
front of Vercel and can break TLS.

Resolves to Vercel: `216.198.79.65`, `64.29.17.65`.

---

## Google Search Console — REQUIRED to keep property access

Three TXT records on `@`:

```
google-site-verification=YNkqleU4LVF6NooLBqnvq9KGpfCdW6DQCwc2lCslRsI
google-site-verification=SxWB8CTsfWCgwSwitflyc57UnBYP0kU8Er3ydpjkhrE
google-site-verification=1P_MWUoC2qufSVCnaCwdjp2lSGbzjrt2fEuJDcvOGGo
```

---

## Resend — REQUIRED for the contact form to send

These live on **subdomains** and survived the deletion. Do not remove them.

| Name | Type | Purpose |
|---|---|---|
| `send.marrakechecotours.com` | TXT | SPF for Resend |
| `send.marrakechecotours.com` | MX | `feedback-smtp.eu-west-1.amazonses.com` |
| `resend._domainkey.marrakechecotours.com` | TXT | DKIM |

If these are ever lost, re-add them from the Resend dashboard
(Domains → marrakechecotours.com → DNS records).

---

## Cloudflare Email Routing — added during migration

Cloudflare adds these itself when you activate Email Routing. Root MX:

| Priority | Content |
|---|---|
| (set by Cloudflare) | `route1.mx.cloudflare.net` |
| | `route2.mx.cloudflare.net` |
| | `route3.mx.cloudflare.net` |

Plus root SPF TXT: `v=spf1 include:_spf.mx.cloudflare.net ~all`
Plus DKIM TXT on `cf2024-1._domainkey`.

---

## DMARC — add manually after routing is live

| Type | Name | Content |
|---|---|---|
| TXT | `_dmarc` | `v=DMARC1; p=none; rua=mailto:info@marrakechecotours.com; fo=1` |

`p=none` is monitor-only and cannot cause legitimate mail to be rejected.
Tighten to `p=quarantine` later once reports look clean.

---

## REMOVED deliberately — do not re-add

These were Namecheap's dead email forwarding. They accepted mail and then
rejected it, which is why `info@` bounced.

| Type | Content |
|---|---|
| MX | `eforward1.registrar-servers.com` (10) |
| MX | `eforward2.registrar-servers.com` (10) |
| MX | `eforward3.registrar-servers.com` (10) |
| MX | `eforward4.registrar-servers.com` (15) |
| MX | `eforward5.registrar-servers.com` (20) |
| TXT | `v=spf1 include:spf.efwd.registrar-servers.com ~all` |

---

## Verify from a terminal

```powershell
Resolve-DnsName marrakechecotours.com -Server vivienne.ns.cloudflare.com
Resolve-DnsName marrakechecotours.com -Type TXT
Resolve-DnsName marrakechecotours.com -Type MX
Resolve-DnsName send.marrakechecotours.com -Type TXT
```
