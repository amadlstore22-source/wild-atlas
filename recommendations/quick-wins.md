# Quick Wins — Highest ROI, Lowest Effort

**Date:** 29 July 2026
**Basis:** `/research/*` + the nine-layer codebase audit run this session.
**Filter applied:** only items that are (a) not already built, (b) implementable fast,
(c) backed by evidence from the research.

Ordered by **impact ÷ effort**. Each states who must do it — several are blocked on you,
not on code.

---

## 1. 🔴 Activate Google Business Profile — **BLOCKED ON YOU**

**Why it's #1:** Whitespark's 2026 data puts **GBP signals at 32% and reviews at 20% of
Maps Pack ranking** — 52% of local visibility. **60%+ of travel traffic is mobile, where
the Maps Pack sits above the fold.** You are currently getting **zero** of this.

Evidence of the gap in code:
```ts
// lib/constants.ts:91
export const GOOGLE_REVIEW_URL = "";   // ← Google button on /review is hidden
```

**What to do:**
1. Claim/verify the Google Business Profile for Marrakech Eco Tours.
2. **Set the primary category precisely** — research: the single most powerful individual
   ranking factor; a precise category gains **2–4 positions in 3–5 weeks**. Use
   *"Tour operator"* (not the vaguer "Travel agency") unless a more precise option exists.
3. Get the Place ID → paste into `GOOGLE_REVIEW_URL` → the `/review` page's Google button
   activates automatically (already coded).
4. Then push for **5–10 reviews/month** — research says **velocity beats total count**.

**Effort:** ~1 hour of your time. **Impact:** the largest single untapped channel found.

---

## 2. 🔴 Add the "Why book direct" argument — **CODE, ~1 hour**

**The gap:** competitor Toubkal Trekking explicitly tells visitors that OTAs charge
**25–40% commission**. You never make this argument, despite it being *stronger* for you:
you're family-run and eco-conscious, so booking direct is a **values** argument, not just
a price one — the money reaches the Berber guides instead of a middleman.

**Suggested copy** (in brand voice, honest, no hard sell):

> **Why book with us directly**
> Booking platforms charge operators 25–40% commission. Booking direct means the money
> stays with the family and the guides who actually walk with you — and you deal with the
> people running the trek, not a call centre. Same price, same guides, no middleman.

**Placement:** a compact block in the tour page's booking sidebar area (below the deposit
box) and once on the homepage. Mobile: keep to 2–3 lines.

---

## 3. 🔴 Move real review quotes next to the booking CTA — **CODE, ~2 hours**

**Research:** *"reviews are closer to inventory: they directly change your conversion rate."*
**31% of consumers will only use businesses rated 4.5+** (up from 17% in 2025). Trust
signals must sit **near the booking CTA**, not in a separate section.

**Your position:** 5.0 with 122 reviews — top tier that a third of buyers now *require* —
but it shows mainly as a badge/score. **A score is not a story.**

**What to do:** pull 2–3 short real TripAdvisor quotes and render them directly beneath the
enquiry form in `BookingSidebar`, with reviewer first name + month. Keep it to ~15 words each.

---

## 4. 🟡 Fill the guide credentials gap — **BLOCKED ON YOU (assets)**

You advertise *"certified Berber guides"* but:
```ts
// lib/guides.ts — all three guides
photo: null,                 // TODO: drop real photo
certificationNumber: null,   // TODO: confirm official ONMT / FRMGT number
```
Meanwhile competitor Toubkal Peaks publishes full registration numbers. Research is
explicit that **real photography beats stock** and that stock/absent imagery *reduces* trust.

**What to send me:** three guide photos (600×600, face centred) + their official
ONMT/FRMGT licence numbers. I'll wire them in, and can frame the portraits in the
**horseshoe arch** motif — the one place `ArchImage` genuinely fits.

**Bonus:** add your company registration numbers (RC / IF / CNSS) to the footer, matching
what competitors do. Cheap, verifiable credibility.

---

## 5. 🟡 Enable deposits — **BLOCKED ON YOU**

```ts
// lib/constants.ts:32
paypal: "",   // deposit button replaced by "request a payment link"
```
Every enquiry currently needs a manual back-and-forth to take money. Research: **72% of
bookers choose based on secure-commerce reputation.**

Send the real PayPal.Me handle and the deposit button activates. (The code deliberately
refuses to guess a handle — a wrong one would send customer money to a stranger.)

---

## 6. 🟢 Verify Core Web Vitals — **~15 min, needs your browser**

Google's **March 2026 core update** moved to **holistic site-level CWV scoring** — one slow
area now drags the whole domain. **Deloitte: 0.1s faster mobile = +10.1% conversion for
travel** (highest of any sector).

Your pipeline is already right (AVIF/WebP, `next/image` everywhere, no raw `<img>`,
sparing `priority`). But **I could not measure the live site** — my sandbox has no network
access to it. **Please run PageSpeed Insights on `/en` and a tour page** and send the LCP /
INP / CLS numbers. Targets: LCP <2.5s, INP <200ms, CLS <0.1.

---

## Already done — do NOT redo

The audit confirmed these are complete, contrary to what a generic plan would assume:
sticky mobile WhatsApp CTA · price + deposit + trust signals above the fold · TripAdvisor
badge · "private departures, choose your dates" · day-by-day itineraries on all 40 tours ·
FAQ + FAQPage schema on all 40 · full structured data (TouristTrip, Product/Offer,
Breadcrumb, Organization, LocalBusiness, TravelAgency) · unique seoTitle/seoDescription per
tour per locale · AVIF/WebP + alt text · internal-linking orphan fix · consent-gated
analytics · zellige divider on tour + blog pages.
