# What the enquiry inbox actually teaches

Built 2026-09-02 from seven real enquiry threads (Aug 28 – Sep 2, 2026).

This file holds the **patterns**. The client records themselves live in
`data/client-archive.json`, which is gitignored because it holds names, email
addresses and negotiated prices. Nothing below identifies anyone.

The point of writing this down: every one of these lessons was paid for with a
real customer. Re-learning them costs another one.

---

## 1. Extras have no home, and it has already gone wrong

**Quad biking was quoted three different ways in 24 hours.**

| Quote | Tour | When |
|---|---|---|
| €20 pp | shared Merzouga 3-day | earlier |
| €20 pp | shared Merzouga 3-day | 2026-09-02, 14:28 |
| €40 pp / €50 double | shared Merzouga 3-day | 2026-09-02, 17:02 |

Two of those clients are on the **same tour** with **open threads**. If they end
up on the same departure and compare notes, one of them paid double.

**Root cause:** `grep -i quad lib/tours.ts` returns only the Agafay tour, where
quad biking is an *included* activity. There is no price anywhere in the
codebase for quad biking as an **add-on** to a desert tour. It exists only in
whatever the last email happened to say.

The same is true of every other extra now being sold in emails:

- Accommodation upgrade (luxury hotel in Dades + luxury camp) — quoted €65 pp
- Sandboarding — quoted €15 pp
- Private transfer Marrakech → Imlil — quoted €60 total
- Private en-suite tent — quoted as included on one tour, an extra on another
- Single-room supplement — quoted €180 vs €160 pp on one booking

**Fix:** extras belong in `lib/tours.ts` (or a dedicated `lib/extras.ts`) with a
price, a unit (per person / per party / per bike), and which tours they apply
to. Then a test can assert that no two tours price the same extra differently,
the same way `price-floor.test.ts` guards the tour prices.

Until that exists, **check this table before quoting an extra.**

---

## 2. Holding a price works better than discounting

The one booking that closed did so **after the operator refused a discount.**

The sequence: list €960 → client asks €660–750 → operator offers €840 → client
asks €800 → **operator holds at €850 and explains what €800 would cost him** →
client accepts in the very next message.

What made the refusal work was that it was **specific**. Not "that's our best
price", but: this is already below our standard rate, and the things I'd have to
cut to reach €800 are exactly the things you told me mattered. Then a list of
what he was getting, with the properties named.

**The general shape:** when you hold a price, say what the money buys. A bare
"no" reads as haggling. A "no, and here is precisely what you'd lose" reads as
integrity, and it closed a sale at €50 above the client's stated ceiling.

Sales figure worth remembering: **the discount he asked for was 6%. He booked
anyway.** Small gaps are rarely the real obstacle.

---

## 3. Never ask for the budget before giving a price

One thread asked "what is your maximum budget?" before quoting. The answer came
back at €100–140 pp for a private tour that costs more than that to run.

That number then anchored the rest of the negotiation, and the client had to be
walked all the way up from it. He eventually paid **more than double** what he
first said — which proves the first number was never his real limit. It was just
the number he gives when asked.

**Quote first.** A real price with real inclusions gives the client something to
react to. Asking their budget invites their floor, not their ceiling.

---

## 4. People will not pay until the accommodation is named

The booked client asked **twice** for the name of the hotel, and then asked
specifically whether the desert tent was private and whether it had its own
bathroom. He said outright he would transfer the money once he had it in
writing.

Another client asked what kind of camp it was and whether the room was private,
before booking. Another specified a private en-suite tent in his opening email,
unprompted, as a requirement.

**Three clients in one week, all asking the same thing.** "Standard hotel and
camp" is not an answer. Name the property, say whether the tent is private, and
say whether the bathroom is private.

This should be on the tour pages, not just in replies.

---

## 5. A written document before payment is expected, not unusual

The booked client asked for "un contrato o documento de confirmación" listing
the itinerary, the inclusions, the named hotel, the price and the cancellation
terms — **before** transferring. That is a completely normal request from
someone about to wire money abroad to a company they found online.

`scripts/make-contract.mjs` exists for exactly this. Use it. It also allocates a
`CON-` number so the document is tracked rather than being a one-off PDF.

---

## 6. Answer the tour they asked about

The first reply in the booked thread suggested a different tour (Erg Chegaga)
from the one the client asked about (Merzouga). He corrected it politely and the
thread continued, but that is one round trip of delay and one small dent in
confidence, on the very first message.

Upsells and alternatives are fine — **after** answering what was asked.

---

## 7. "Shared" is sometimes the product, not the compromise

One client was offered the private tour as the solution to her requirements. She
declined, explaining she specifically wanted her parents to meet other people
rather than the three of them travelling alone.

Her actual requirements — two rooms, a private bathroom for her parents, no
camel for a 65-year-old — were all satisfiable **within** the shared departure,
and once they were quoted as supplements she was happy.

**Read what the client values before proposing the upgrade.** For some people
the group IS the holiday. Selling private to them argues against their own
stated reason for coming.

Related: the shared tour's group composition (ages, nationalities) is a real
question that got asked and never directly answered. Worth having a truthful
answer ready.

---

## 8. Language is a booking condition, and the form does not capture it

- One booking hinged entirely on a **Spanish-speaking guide for all three days**.
  The shared tour lost that sale because it could not guarantee one; the private
  tour won it because it could.
- One enquiry came in through the form with no language field, was answered in
  English, and the client replied in Spanish.
- Threads are currently running in **English, Spanish and French** simultaneously.

The shared-tour honest answer — "we cannot guarantee it, though many Moroccans
speak Spanish and you may be lucky" — is the right answer. It is also a strong
argument for the private tour that does not require pushing.

**Fix:** add a language field to the enquiry form. It costs nothing and prevents
the first reply landing in the wrong language.

---

## 9. Response time is losing money

The booked client sent two messages saying he was ready to pay, then had to send
a **follow-up chasing his own booking** ("solo queríamos hacer un pequeño
seguimiento") after roughly 22 hours of silence. He was, at that moment,
actively trying to give you €850.

He waited. Someone comparing three operators — and at least one current enquiry
says explicitly that he is — will not.

---

## 10. The 5–6 day private round trip does not exist and people want it

One enquiry asked for a 6-day private Marrakech round trip with a full free day
at Merzouga. There is no such product on the site: the desert range stops at
4 days, then jumps to the 8-day Chegaga camel trek.

Competitor research (2026-09) found **no operator selling a 6-day Marrakech
round trip** either — their 6-day products all end in Fes, Chefchaouen or
Casablanca. The nearest benchmark is €495 pp "from" for one of those.

The route works: roughly 1,130 km over six days, no day beyond about four hours
in the car — measured from the coordinates already in `lib/tours.ts`. The
comfortable pace is the actual selling point, since the 3-day version ends with
a nine-hour drive.

**This is an unserved product with demonstrated demand and no direct competitor.**

---

## 11. Deposits are consistent; keep them that way

| Booking | Total | Deposit | % |
|---|---|---|---|
| Private 3-day, 3 pax | €850 | €175 | 20.6% |
| Toubkal 3-day, solo | €600 | €132 | 22.0% |
| Shared 3-day (`depositAmount`) | €120 pp | €26 pp | 21.7% |

**Roughly 20–22%** across the board, which is a real and defensible policy.
Quote it as a percentage of the total rather than inventing a round number per
enquiry, and it stays consistent without needing to be remembered.

---

## What to build next, in order of what it would have prevented

1. **`lib/extras.ts`** — priced add-ons with units, plus a test that no two
   tours contradict each other. This one has *already* misfired.
2. **A language field on the enquiry form.** One line of work.
3. **Named accommodation on the tour pages.** Three clients asked in one week.
4. **A 5–6 day private desert product.** Demand exists, competitors do not.
5. **Response-time visibility** — something that makes an unanswered
   ready-to-book enquiry impossible to miss.
