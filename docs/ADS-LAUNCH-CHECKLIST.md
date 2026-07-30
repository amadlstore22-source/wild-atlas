# Google Ads launch — step by step

Work top to bottom. **Do not start spending until Step 4 passes**, because
every step before it is about making sure a click can actually become an
enquiry. The campaign copy itself is already written in
`GOOGLE-ADS-TOUBKAL-2DAY.md`.

Tick each box as you go.

---

## STEP 1 — Can the website receive an enquiry at all? (5 min)

`RESEND_API_KEY` is empty in your local `.env.local`. If it is also empty on
Vercel, every contact-form submission returns HTTP 503 and you receive
nothing. Vercel keeps its own environment variables, so local being empty
does **not** prove production is broken. Test it.

- [ ] Open <https://marrakechecotours.com/en/contact> (use the Opera VPN — your
      ISP blocks the Vercel IPs)
- [ ] Fill the form with your own email and send it
- [ ] **Did you get a green success message, or a red "Email service
      unavailable" error?**

**If SUCCESS →** Resend is configured on Vercel. Skip to Step 2.

**If ERROR →** the key is missing in production. Fix it:

1. Go to <https://resend.com> → sign in → **API Keys** → create one if none
   exists → copy it (starts with `re_`)
2. Go to <https://vercel.com> → `wild-atlas` → **Settings** →
   **Environment Variables**
3. Add: name `RESEND_API_KEY`, value = the key, tick **Production**,
   **Preview**, **Development**
4. **Deployments** tab → newest deploy → `···` → **Redeploy**
   (env vars only apply to builds made after they are set)
5. Repeat the form test above

- [x] Contact form delivers a real email to you
      **VERIFIED 2026-07-30** — test enquiry arrived from
      `noreply@marrakechecotours.com` into `marrakechecotours@gmail.com`
      with all fields intact. Resend is configured on Vercel.

> Also paste the same key into your local `.env.local` so the form works when
> you run the site locally.

---

## STEP 2 — Make `info@marrakechecotours.com` receive mail (15 min)

It currently **bounces**. It is printed on the site, in your email signature,
in schema, and in `llms.txt` — and Step 5 needs it to receive a verification
email. Namecheap cannot fix this (your DNS is on Cloudflare), so do it in
Cloudflare.

- [ ] <https://dash.cloudflare.com> → select `marrakechecotours.com`
- [ ] Left sidebar → **Email** → **Email Routing** → **Get started**
- [ ] Accept when it offers to **configure the DNS records automatically**
      (this replaces the dead `eforward*.registrar-servers.com` MX records)
- [ ] Add your Gmail as a **destination address**
- [ ] **Open the verification email Cloudflare sends to that Gmail and click
      the link** — routing does nothing until you do
- [ ] Create custom address: `info@marrakechecotours.com` → your Gmail
- [ ] Create custom address: `bookings@marrakechecotours.com` → your Gmail
- [x] Send a test message to `info@marrakechecotours.com` and confirm it
      arrives — **DONE 2026-07-30**

> **What actually happened:** Cloudflare refused to activate while the old
> Namecheap MX records existed. Deleting them took out all 16 DNS records,
> including the two CNAMEs serving the website and the Resend records. All
> restored — see `DNS-RECORDS.md`, which now holds every value needed to
> rebuild from scratch.

### 2b — DMARC (1 min, do it while you are in Cloudflare)

You have no DMARC record. `p=none` is monitor-only and cannot cause
legitimate mail to be rejected.

- [x] Cloudflare → **DNS** → **Records** → **Add record** — **DONE 2026-07-30**
      - Type: `TXT`
      - Name: `_dmarc`
      - Content: `v=DMARC1; p=none; rua=mailto:info@marrakechecotours.com; fo=1`

> ✅ **Checked 2026-07-30 — this is safe.** Resend authenticates on a
> *subdomain*, not the root: its SPF and SES feedback MX live on
> `send.marrakechecotours.com`, and its DKIM on
> `resend._domainkey.marrakechecotours.com`. Cloudflare Email Routing only
> touches **root** MX and SPF, so the two do not overlap and root changes
> cannot break Resend sending.
>
> The root SPF being replaced (`include:spf.efwd.registrar-servers.com`)
> points at the dead Namecheap forwarder and is useless — losing it is an
> improvement. Still worth re-testing the contact form afterwards.

---

## STEP 3 — Turn on GA4 (20 min)

Nothing is tracked today: `NEXT_PUBLIC_GA_ID` is unset, and the code
deliberately loads no analytics at all until it is. Without this, Google Ads
is bidding blind.

- [ ] <https://analytics.google.com> → **Admin** → **Create** → **Property**
      - Name: `Marrakech Eco Tours`, timezone Morocco, currency EUR
- [ ] Create a **Web data stream** for `https://marrakechecotours.com`
- [ ] Copy the **Measurement ID** (looks like `G-XXXXXXXXXX`)
- [ ] Vercel → **Settings** → **Environment Variables** → add
      `NEXT_PUBLIC_GA_ID` = that ID, all three environments
- [ ] Vercel → **Deployments** → newest → `···` → **Redeploy**
- [ ] Visit the live site, **accept cookies**, then check GA4 →
      **Reports** → **Realtime** — you should see yourself

> Analytics only loads after a visitor accepts cookies. That is deliberate
> (GDPR) — if Realtime shows nothing, check you clicked "Accept all".

- [x] GA4 Realtime shows live traffic — **DONE 2026-07-30**
      Property `Marrakech Eco Tours`, Measurement ID `G-MH5VKPGR38`,
      set as `NEXT_PUBLIC_GA_ID` in Vercel (all environments) and in the
      local `.env.local`.

> Google's own "Google tag wasn't detected" warning in the GA4 setup wizard
> will ALWAYS fail on this site, and that is correct. The detector loads the
> page without accepting cookies, and `GoogleAnalytics.tsx` deliberately
> renders nothing until consent is granted. Verify via **Realtime**, never
> via that test.

---

## STEP 4 — Google Ads account + conversion actions (30 min)

- [ ] <https://ads.google.com> → create account → **switch to Expert Mode**
      (do not let it push you into Smart Campaigns)
- [ ] Billing: Morocco, currency **EUR** (must match GA4)
- [ ] **Tools** → **Data manager** → link your **GA4 property**
- [ ] **Goals** → **Conversions** → **New conversion action** → **Website**

Create four actions. For each, choose **Import from GA4** if offered, or
create manually as a "Page load / custom event":

| Action name | GA4 event name | Value |
|---|---|---|
| Enquiry submitted | `conversion_enquiry` | 20 EUR |
| WhatsApp click | `conversion_whatsapp` | 10 EUR |
| Phone click | `conversion_phone` | 10 EUR |
| Deposit started | `conversion_deposit` | 50 EUR |

> Values are a *relative* signal for the bidding algorithm, not real revenue.
> An enquiry is worth roughly twice a WhatsApp tap; a deposit far more.
>
> **Note on `conversion_enquiry`:** the booking sidebar sends a real per-tour
> value (`tour.depositAmount`, in EUR) while the general contact form sends
> none. So in Google Ads set this action to **"Use the value from the event,
> and use 20 EUR when no value is sent"** rather than a flat value — that way
> a €50-deposit trek outbids a €10 day trip automatically.

- [ ] For each action, copy its **conversion ID and label** — Google shows it
      as `AW-1234567890/AbCdEfGhIj`
- [ ] Vercel → Environment Variables → add all four, all three environments:
      - `NEXT_PUBLIC_ADS_SEND_TO_ENQUIRY`
      - `NEXT_PUBLIC_ADS_SEND_TO_WHATSAPP`
      - `NEXT_PUBLIC_ADS_SEND_TO_PHONE`
      - `NEXT_PUBLIC_ADS_SEND_TO_DEPOSIT`
- [ ] **Redeploy**
- [ ] Test: open the live site, accept cookies, click the WhatsApp button.
      Within ~30 min, Google Ads → Goals → Conversions should show activity
      (it can take a few hours to leave "Unverified")

- [ ] At least one conversion recorded

---

## STEP 5 — Reply-from address (optional, 20 min)

Only needed if you want replies to come **from** `info@` rather than your
Gmail. Requires Step 2 finished (Gmail sends its confirmation to `info@`).

- [ ] Resend → **SMTP** → note host `smtp.resend.com`, port `587`,
      username `resend`, password = your API key
- [ ] Gmail → **Settings** → **Accounts and Import** →
      **Send mail as** → **Add another email address**
- [ ] Address `info@marrakechecotours.com`, **untick** "Treat as an alias"
- [ ] Enter the Resend SMTP details above
- [ ] Click the confirmation link Gmail emails to `info@`
- [ ] Set it as **default**

---

## STEP 6 — Launch (see GOOGLE-ADS-TOUBKAL-2DAY.md)

Only once Steps 1–4 are ticked.

- [ ] Build the campaign from `GOOGLE-ADS-TOUBKAL-2DAY.md` §1–4
- [ ] Budget **€10–15/day** to start
- [ ] Bidding: **Maximise clicks** with a max CPC cap for the first ~2 weeks,
      then switch to Maximise conversions once ~15 conversions exist
      (conversion bidding needs data to work)
- [ ] Add the negative keyword list from §2 **before** enabling
- [ ] Turn it on

---

## Why the order matters

| Step | If you skip it |
|---|---|
| 1 | Clicks arrive, form 503s, enquiry lost — you paid for nothing |
| 2 | Anyone emailing the address on your ad gets a bounce |
| 3 | No GA4 = Ads cannot import conversions at all |
| 4 | Ads optimises for clicks, not bookings; budget goes to cheap junk traffic |

Steps 1 and 2 are the ones that lose real money. Do them first.
