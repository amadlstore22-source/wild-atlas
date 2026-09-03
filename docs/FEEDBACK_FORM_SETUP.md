# Post-tour feedback form — setup

A Google Form you send a client when their trip ends. It is **internal quality
tracking**: nothing it collects is published, and it never asks anyone for a
public review.

The point is to find out that a driver is turning up late, or a camp has stopped
changing the bedding, from the client — before you find out from a review.

Takes about 10 minutes. No coding: you paste one file and press Run twice.

---

## The problem this solves

There are 48 tours. A dropdown with 48 entries is the fastest way to get a form
abandoned, and a client who picks the wrong one gives you data you cannot use.

So the tour is never really a question:

**1. The link already knows.** `makeLinks()` prints one link per tour with the
tour filled in. You send the client the link for the trip they just did. They
land straight on the questions.

**2. A picker, only as a fallback.** If someone opens the bare form, they narrow
it down in three taps — kind of trip, then how long, then a short list:

```
Desert / Trekking / Cultural / Day trip
        ↓
2 days, from Marrakech · 3 days, from Marrakech · 3 days, from Agadir · …
        ↓
a list of 1–7 tours
```

Google Forms cannot filter a list live — every question is fixed when the form
is built — but an answer *can* jump to a different page, so the narrowing is
built out of 27 pages. Worst case is 7 tours on screen; most pages show three
or fewer.

---

## Setup

1. Go to **script.google.com** → **New project**
2. Delete the `myFunction` stub, paste the whole of
   [`docs/apps-script-feedback-form.gs`](apps-script-feedback-form.gs)
3. **Run** → choose **`createForm`** → approve the permission prompt (first time
   only; it is asking to create the form and sheet on your own account)
4. **Run** → choose **`makeLinks`**

Step 3 prints the form links. Step 4 creates a spreadsheet called
**"Tour feedback — links to send"** holding all 48 links, one per row. That
sheet is the one you will actually use — open it on your phone, copy the row for
the tour, paste it into WhatsApp.

Responses arrive in **"Tour feedback — responses"**.

> This is a **separate** Apps Script project from `docs/apps-script.gs`, which
> runs the enquiries and invoices sheet. Do not paste one over the other.

---

## What it asks

Ratings are 1–5, all optional except the overall score, and every one says
*"leave blank if this was not part of your tour"*.

| | |
|---|---|
| Overall | required |
| Guide, driver, vehicle | |
| Mule handler and trek crew | trekking |
| Desert camp, camel ride | desert |
| Food, hotels | overnight trips |
| Anything wrong or not as described | free text — **the answer you act on** |
| Best part | free text |
| Did it match what we described? | required |
| When did you travel / your name | optional |

**Why every question is shown to everyone.** Forms cannot hide a question based
on an earlier answer, and a required grid forces an answer in *every* row — so a
day-trip client would be made to rate "the desert camp", inventing a number and
quietly poisoning your averages. Blanks are the escape hatch, and `summarise()`
ignores them rather than scoring them zero.

---

## Reading the results

Run **`summarise`** in the same script. It averages each supplier per tour,
counting only real answers:

```
sahara-3day-marrakech  — 2 response(s)
   Your guide 4.5/5 (n=2)
   Your driver 3.0/5 (n=2)
   The camel ride 5.0/5 (n=2)
   NO RATINGS YET for: The vehicle …, The desert camp …
```

`n=` is how many people answered. **An average over one or two responses is not
a signal** — a 3.0 from two people is one bad day, not a failing driver. Wait
for five or six before acting on a number.

`NO RATINGS YET` lists suppliers that tour genuinely uses that nobody has scored.
It never asks a day trip about a camp.

---

## Keeping it in step with the catalogue

The 48 tours are baked into the script as a `TOURS` list, generated from
`lib/tours.ts`. **Adding a tour to the site does not add it to the form.**

When you add or rename a tour, regenerate that list and re-run `createForm`
(which builds a fresh form — the old one and its responses are untouched).

The client-facing safety net is the `Booking reference` field: it stores the
**slug**, not the title, so re-wording a tour name never breaks the link between
old responses and the tour they belong to.

---

## Language

The form asks which language the client would like to answer in, and the prefill
links can tag it. The questions themselves are in English — most clients manage,
and answers come back in French, Spanish and German regularly. If replies in one
language dry up, that is the signal to build a translated copy.
