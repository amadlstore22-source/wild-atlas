# Google Ads Launch Kit — 2-Day Toubkal Trek

**Product:** Mount Toubkal Express — 2-Day Summit from Marrakech
**Price:** €210 · private · 2 days / 1 night · challenging · 4.7★ (34)
**Landing page:** https://marrakechecotours.com/en/tours/toubkal-summit-2day-marrakech
**Goal of first campaign:** get qualified enquiries (WhatsApp / contact form / deposit), learn CPC & conversion rate cheaply, then scale.

---

## 0. Do these 3 things BEFORE you spend a single dirham

Without these you're flying blind — you'll pay for clicks and never know which ones became bookings.

**✅ The site code is already wired for this** — the tracking is built and waiting for
your IDs. You just need to create the accounts and paste 1–5 values into `.env.local`
(see `.env.example`). Nothing loads until you do, and nothing loads before cookie consent
(GDPR-safe for EU traffic). Here's the flow:

1. **Create GA4 + get the Measurement ID.** In [analytics.google.com] make a property
   → Web data stream for marrakechecotours.com → copy the **`G-XXXXXXX`** ID →
   put it in `.env.local` as `NEXT_PUBLIC_GA_ID=G-XXXXXXX` and redeploy. That alone
   turns on all the GA4 events below.
2. **Create the conversion actions in Google Ads** (*Goals → Conversions → New → Website*):
   - **Enquiry** (primary) — fires on booking-form + contact-form submit. Value ≈ €30.
   - **WhatsApp click** — fires on every WhatsApp button (float, sidebar, mobile bar).
   - **Phone click** — fires on the call button.
   - **Deposit** (later, once PayPal is live) — value = the deposit.
   For each, Google gives you a **`send_to` = `AW-…/…`** string. Paste them into the
   matching `NEXT_PUBLIC_ADS_SEND_TO_*` vars in `.env.local`. *(Optional — GA4 already
   records the events; these just feed Ads' bidding optimiser.)*
3. **Link GA4 ↔ Ads** (Ads → Admin → Linked accounts → Google Analytics) so you can
   import GA4 conversions and build remarketing audiences.
4. **Conversion currency = EUR.** Set the Ads account currency to EUR at creation — it
   can't be changed later, and your prices/values are all in EUR.

**What's already firing in code** (once `NEXT_PUBLIC_GA_ID` is set + consent given):
| Event | Where | Conversion |
|---|---|---|
| `enquiry_submit` | Booking sidebar form success | `enquiry` (value = deposit) |
| `contact_submit` | /contact form success | `enquiry` |
| `whatsapp_click` | Float button, sidebar, mobile bar | `whatsapp` |
| `phone_click` | Call button | `phone` |

> Belt-and-braces: also add `?utm_source=google&utm_medium=cpc&utm_campaign=toubkal-2day`
> to each ad's final URL so GA4 attributes the traffic even before Ads import is set up.

---

## 1. Campaign settings (Search campaign)

| Setting | Value | Why |
|---|---|---|
| Campaign type | **Search** only | Start where intent is highest. No Display/Search Partners. |
| Networks | Google Search **only** — uncheck "Search Partners" and "Display Network" | Partners/Display waste budget at launch |
| Goal | Leads / "Website traffic" without a goal | Don't let Google auto-restrict |
| Bid strategy | **Maximize clicks with a max CPC cap (€0.60–0.90)** for first ~2 weeks → switch to **Maximize conversions** once you have ~15–20 conversions | tCPA needs data first |
| Daily budget | **€15–25/day** to start (€450–750/mo) | Enough to gather signal without bleeding |
| Locations | **UK, Ireland, USA, Canada, Australia, Germany, France, Netherlands, Spain, Italy** — target "People **in** or regularly in" (not "interested in") | Your buyers are outbound travelers from wealthy markets |
| Location exclusion | Exclude **Morocco** (and optionally India/Pakistan/Bangladesh) | Cuts local & irrelevant clicks; locals book direct |
| Languages | English, French, German, Spanish, Italian | Matches your 6 locales |
| Ad rotation | Optimize for best performing | |
| Ad schedule | All day at launch; after 2 wks, review — most tour bookings skew evenings & weekends in the traveler's timezone | |
| Devices | All, but expect **mobile-heavy**; make sure the LP is fast on mobile (it is) | |

**Send different-language traffic to the matching locale page** if you run non-English ad groups:
`/fr/tours/toubkal-summit-2day-marrakech`, `/de/…`, `/es/…`, `/it/…`.

---

## 2. Ad groups + keywords

Keep it tight: **one theme per ad group** so the ad text matches the search. Use **Phrase** and **Exact** match — avoid broad match until you have conversion data and a solid negative list.

### Ad group A — "Toubkal trek" (core)
```
"mount toubkal trek"
"toubkal trek 2 days"
[2 day toubkal trek]
"toubkal summit trek"
"climb mount toubkal"
[climb mount toubkal]
"toubkal trekking tour"
"mount toubkal from marrakech"
"toubkal express"
```

### Ad group B — "High Atlas / weekend trek from Marrakech"
```
"high atlas trek from marrakech"
"marrakech trekking tour"
"weekend trek morocco"
"2 day trek from marrakech"
"atlas mountains hiking tour"
"trek near marrakech"
```

### Ad group C — "Highest mountain North Africa" (intent/aspiration)
```
"highest mountain in morocco"
"highest peak north africa hike"
"toubkal 4167"
"jbel toubkal climb"
```

> Start with A + B. Add C once A/B are stable. Each ad group needs its **own** responsive search ad (below) so the headline echoes the keyword.

### Negative keywords (add at campaign level, day one)
```
free, map, gpx, wikipedia, weather, altitude sickness, death, died, accident,
jobs, salary, cheap, budget hostel, solo free, how to climb (informational),
webcam, forecast, snow report, images, photos, video, marathon, ultra, race,
visa, flights, ryanair, easyjet
```
Add search-term-report negatives weekly — this is where most wasted spend hides.

---

## 3. Responsive Search Ad — Ad group A (copy-paste)

Google wants **up to 15 headlines (≤30 chars)** and **4 descriptions (≤90 chars)**. Below are ready-to-use, already length-checked. Pin the first two headlines to positions 1 and 2 so brand + core promise always show.

**Headlines (≤30 chars):**
```
Climb Mount Toubkal in 2 Days
Toubkal Summit from Marrakech
Roof of North Africa: 4,167m
Private 2-Day Toubkal Trek
Licensed Local Berber Guides
Summit Toubkal This Weekend
From €210 · All-Inclusive
Small Groups, Real Locals
Rated 4.7★ by Trekkers
Refuge Stay + Sunrise Summit
Book Direct, No Middleman
Free Trip Planning on WhatsApp
Marrakech Eco Tours
Ethical, Family-Run Since 2010
Fast Ascent, Full Experience
```

**Descriptions (≤90 chars):**
```
Stand on Morocco's highest peak in a focused 2-day ascent from Marrakech. From €210.
Licensed Berber guides, refuge stay & all meals. Private departures, book direct.
Short on time? Summit Jbel Toubkal (4,167m) over a single weekend. Plan yours today.
Family-run, eco-conscious treks. 1,000+ happy travelers. Message us on WhatsApp.
```

**Paths (display URL, ≤15 chars each):** `Toubkal` / `2-Day-Trek`
→ shows as `marrakechecotours.com/Toubkal/2-Day-Trek`

### Ad group B ad — swap these headlines in:
```
2-Day High Atlas Trek
Weekend Trek from Marrakech
Atlas Mountains, 2 Days
Escape Marrakech to the Peaks
Guided High Atlas Adventure
```
(Keep the same descriptions + the price/rating/guide headlines.)

---

## 4. Ad extensions (assets) — add ALL of these, they raise CTR & Ad Rank for free

**Sitelinks (4):**
| Text | URL |
|---|---|
| Full 2-Day Itinerary | …/tours/toubkal-summit-2day-marrakech#itinerary |
| What's Included | …/tours/toubkal-summit-2day-marrakech#includes |
| Read Traveler Reviews | https://marrakechecotours.com/en/review |
| See All Atlas Treks | https://marrakechecotours.com/en/tours?category=trekking |

**Callouts:**
```
Licensed Mountain Guides · All Meals Included · Refuge Overnight · Private Group
Book Direct & Save · Free WhatsApp Planning · Eco-Conscious · Family-Run
```

**Structured snippets:**
- Header *Types*: `Trekking, Summit Trek, Private Tour, Guided Hike`
- Header *Amenities*: `Meals, Mountain Refuge, Park Fees, Transfers`

**Call extension:** `+212 653 936 003` (schedule to your working hours in Morocco time)

**Price extension** (type: *Tours*, currency EUR):
This campaign is ONLY about the 2-day trek, so at launch use the **single row** below — it keeps the ad 100% on-message:
```
2-Day Toubkal Express — €210 — Summit & refuge, all-inclusive
```
> Later, if you broaden into a general "Atlas treks" campaign, you can add these real rows so searchers can self-select longer trips:
> `4-Day Toubkal Trek — €380 — Full acclimatised summit ascent`
> `Atlas 3-Day Trek — €255 — Berber villages & High Atlas valleys`

**Image extensions:** upload your authentic photos — `toubkal-summit-ridge-climbers.jpg`, `toubkal-summit-panorama-high-atlas.jpg`, `toubkal-trail-turquoise-pool-waterfall.jpg` (square 1200×1200 + landscape 1200×628).

**Lead form / WhatsApp:** the site's WhatsApp button is your fastest conversion path — make sure it's above the fold on the LP (it is, in the booking sidebar).

---

## 5. Landing-page checklist (mostly already true — verify)

- [x] Price, duration, difficulty visible above the fold
- [x] WhatsApp + contact CTA in the sticky booking sidebar
- [x] Full day-by-day itinerary + what's included/excluded
- [x] Real photos + reviews/rating
- [ ] **Add the campaign's UTM** so GA4 attributes it: append
  `?utm_source=google&utm_medium=cpc&utm_campaign=toubkal-2day` to the final URL in each ad
- [ ] Confirm mobile load speed (run PageSpeed on the LP once — target LCP < 2.5s)
- [ ] A visible **trust line near the CTA**: "Licensed guides · Book direct · Free cancellation window" — *tell me and I'll add it to the booking sidebar*

---

## 6. First 2 weeks — what to do

1. **Days 1–3:** let it run, don't touch it. Ignore early CPC panic.
2. **Every 2–3 days:** open the **Search Terms report** → add junk terms as negatives.
3. **Watch:** CTR (aim >4% on Search), avg CPC, and cost/conversion.
4. **~Day 10–14:** if you have ≥15 conversions, switch bidding to **Maximize Conversions** (later add a Target CPA around your acceptable cost-per-lead).
5. **Pause** the worst-performing headlines Google flags as "Low"; add fresh ones.
6. **Budget rule of thumb:** if cost/enquiry < ~€8–12 and enquiries convert to bookings, scale budget +20%/week.

---

## 7. Rough numbers to sanity-check spend

- Est. CPC for these terms: **€0.40–1.00** (low-competition niche outside peak season).
- At €20/day ≈ **20–40 clicks/day**.
- If LP converts clicks→enquiries at 5–10%, that's **1–4 enquiries/day**.
- A €210 tour with healthy margin easily absorbs a €10–20 cost-per-enquiry if 1 in 3–4 enquiries books.

Numbers are estimates — your real data after 2 weeks replaces all of this.

---

## What I can do for you right now (just say which)

- **Wire conversion tracking** into the WhatsApp/contact/deposit buttons (gtag or GTM events).
- **Add UTM-friendly** handling / a trust line to the booking sidebar.
- **Draft the French / German / Spanish / Italian** versions of the ad copy for locale ad groups.
- **Write a second RSA variant** to A/B test angle (speed vs. bucket-list vs. price).
- **Set up a Performance Max** later, once Search is proven.

---

## 8. Localized ad copy — FR / DE / ES / IT

Run each language as its **own ad group** (or its own campaign if you want separate budgets), targeting that language + the matching countries, with the **final URL pointing at the matching locale page**. All copy below is native (not translated) and **already length-checked** to Google's limits (headlines ≤30, descriptions ≤90). Pin headlines 1–2 to positions 1–2, same as the English ad.

### French (Français)

**Final URL:** `https://marrakechecotours.com/fr/tours/toubkal-summit-2day-marrakech`  
**With UTM:** append `?utm_source=google&utm_medium=cpc&utm_campaign=toubkal-2day-fr`

**Headlines (≤30):**
```
Ascension Toubkal en 2 Jours
Sommet du Toubkal, 2 Jours
Toit de l'Afrique du Nord
Trek Toubkal dès Marrakech
Guides Berbères Diplômés
Toubkal 4 167 m en un Week-end
À partir de 210 € Tout Inclus
Petits Groupes Privés
Noté 4,7★ par les Trekkeurs
Nuit en Refuge + Sommet
Réservez en Direct
Conseils Gratuits sur WhatsApp
Marrakech Eco Tours
Agence Familiale et Éthique
Ascension Rapide et Sportive
```

**Descriptions (≤90):**
```
Grimpez le plus haut sommet du Maroc en 2 jours depuis Marrakech. Dès 210 €.
Guides berbères diplômés, nuit en refuge et repas inclus. Réservez en direct.
Peu de temps ? Atteignez le Toubkal (4 167 m) en un week-end. Planifiez le vôtre.
Agence familiale et éco-responsable. 1 000+ voyageurs ravis. Écrivez sur WhatsApp.
```

**Paths:** `Toubkal` / `2-Jours`

### German (Deutsch)

**Final URL:** `https://marrakechecotours.com/de/tours/toubkal-summit-2day-marrakech`  
**With UTM:** append `?utm_source=google&utm_medium=cpc&utm_campaign=toubkal-2day-de`

**Headlines (≤30):**
```
Toubkal in 2 Tagen besteigen
Toubkal-Gipfel ab Marrakesch
Dach von Nordafrika: 4.167 m
Private 2-Tage-Toubkal-Tour
Lizenzierte Berber-Guides
Toubkal an einem Wochenende
Ab 210 € · Alles inklusive
Kleine Gruppen, echte Locals
4,7★ von Trekkern bewertet
Berghütte + Gipfel bei Sonne
Direkt buchen, kein Vermittler
Gratis-Beratung per WhatsApp
Marrakech Eco Tours
Ethisch, familiengeführt
Schnell zum Gipfel
```

**Descriptions (≤90):**
```
Besteigen Sie Marokkos höchsten Gipfel in 2 Tagen ab Marrakesch. Ab 210 €.
Lizenzierte Berber-Guides, Hüttenübernachtung & Mahlzeiten. Direkt buchen.
Wenig Zeit? Den Jbel Toubkal (4.167 m) an einem Wochenende erklimmen. Jetzt planen.
Familiengeführt und umweltbewusst. 1.000+ zufriedene Gäste. Schreiben Sie uns.
```

**Paths:** `Toubkal` / `2-Tage`

### Spanish (Español)

**Final URL:** `https://marrakechecotours.com/es/tours/toubkal-summit-2day-marrakech`  
**With UTM:** append `?utm_source=google&utm_medium=cpc&utm_campaign=toubkal-2day-es`

**Headlines (≤30):**
```
Sube al Toubkal en 2 Días
Cumbre del Toubkal, 2 Días
Techo del Norte de África
Trek Privado al Toubkal
Guías Bereberes Titulados
Toubkal 4.167 m en un Finde
Desde 210 € · Todo Incluido
Grupos Pequeños y Privados
Valorado 4,7★ por Viajeros
Refugio + Cumbre al Amanecer
Reserva Directa, Sin Comisión
Asesoría Gratis por WhatsApp
Marrakech Eco Tours
Empresa Familiar y Ética
Ascenso Rápido, Gran Aventura
```

**Descriptions (≤90):**
```
Sube a la cumbre más alta de Marruecos en 2 días desde Marrakech. Desde 210 €.
Guías bereberes titulados, noche en refugio y comidas incluidas. Reserva directa.
¿Poco tiempo? Corona el Toubkal (4.167 m) en un fin de semana. Planifícalo hoy.
Empresa familiar y ecológica. Más de 1.000 viajeros felices. Escríbenos por WhatsApp.
```

**Paths:** `Toubkal` / `2-Dias`

### Italian (Italiano)

**Final URL:** `https://marrakechecotours.com/it/tours/toubkal-summit-2day-marrakech`  
**With UTM:** append `?utm_source=google&utm_medium=cpc&utm_campaign=toubkal-2day-it`

**Headlines (≤30):**
```
Scala il Toubkal in 2 Giorni
Vetta del Toubkal da Marrakech
Tetto del Nord Africa: 4.167 m
Trek Privato al Toubkal
Guide Berbere Qualificate
Toubkal in un Weekend
Da 210 € · Tutto Incluso
Piccoli Gruppi Privati
Valutato 4,7★ dai Trekker
Rifugio + Vetta all'Alba
Prenota Diretto
Consulenza Gratis su WhatsApp
Marrakech Eco Tours
Azienda Familiare ed Etica
Salita Veloce, Vera Avventura
```

**Descriptions (≤90):**
```
Sali sulla vetta più alta del Marocco in 2 giorni da Marrakech. Da 210 €.
Guide berbere qualificate, notte in rifugio e pasti inclusi. Prenota diretto.
Poco tempo? Conquista il Toubkal (4.167 m) in un weekend. Pianifica il tuo oggi.
Azienda familiare ed ecologica. Oltre 1.000 viaggiatori felici. Scrivici su WhatsApp.
```

**Paths:** `Toubkal` / `2-Giorni`
