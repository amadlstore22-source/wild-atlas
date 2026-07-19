# Enquiry sheet — setup

Every enquiry from the website writes a row into a Google Sheet you own, so you
have a permanent record and one view of what is coming up. Email delivery is
unchanged; the sheet is in addition to it, never instead of it.

**If the sheet is unreachable, the booking form keeps working.** All failures are
logged server-side and swallowed. Nothing a spreadsheet does can cost you an
enquiry.

Takes about 15 minutes. No coding.

---

## 1. Create the sheet

1. Go to [sheets.new](https://sheets.new)
2. Name it something like **MET Enquiries**
3. Put these headers in **row 1**, starting at A1:

| A | B | C | D | E | F | G | H | I | J | K |
|---|---|---|---|---|---|---|---|---|---|---|
| Received | Type | Name | Email | Tour | Departure | People | Subject | Message | Status | Notes |

Columns **J (Status)** and **K (Notes)** are yours to fill in — the website never
touches them.

---

## 2. Add the script

1. In the sheet: **Extensions → Apps Script**
2. Delete whatever is in the editor
3. Paste this in:

```javascript
// Receives enquiries from marrakechecotours.com and appends them as rows.
// The secret must match SHEET_WEBHOOK_SECRET in Vercel.
const SECRET = 'PUT-YOUR-SECRET-HERE';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    // Reject anything not from our site.
    if (data.secret !== SECRET) {
      return ContentService
        .createTextOutput(JSON.stringify({ ok: false, error: 'bad secret' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

    sheet.appendRow([
      new Date(data.receivedAt || Date.now()),
      data.type === 'booking' ? 'Booking' : 'Contact',
      data.name || '',
      data.email || '',
      data.tour || '',
      data.date || 'flexible',
      data.people || '',
      data.subject || '',
      data.message || '',
      'New',        // Status — yours to edit
      ''            // Notes  — yours to edit
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. On line 3, replace `PUT-YOUR-SECRET-HERE` with a long random string. Anything
   works as long as it is hard to guess, e.g. `met-8f3k2p9x-quartz-mule-2026`.
   **Keep it — you need the identical string in step 4.**
5. Save (disk icon)

---

## 3. Publish it

1. **Deploy → New deployment**
2. Click the gear next to "Select type" → **Web app**
3. Set:
   - **Execute as:** Me
   - **Who has access:** **Anyone** ← required, the website is not signed in
4. **Deploy**
5. Google asks for authorisation. It will warn "Google hasn't verified this app" —
   that is expected for your own script. Click **Advanced → Go to (project name)
   → Allow**.
6. Copy the **Web app URL**. It ends in `/exec`.

> ⚠️ "Anyone" means anyone who knows the URL can POST to it. That is why the
> secret exists — without a matching secret the script discards the request.

---

## 4. Connect it to the site

In Vercel: **Project → Settings → Environment Variables**. Add two, for
**Production**:

| Name | Value |
|---|---|
| `SHEET_WEBHOOK_URL` | the `/exec` URL from step 3 |
| `SHEET_WEBHOOK_SECRET` | the exact string from step 2 |

Then **redeploy** — Vercel only picks up new variables on a fresh deployment.

---

## 5. Check it works

Send yourself a test enquiry through a tour page. Within a few seconds a row
should appear.

**Nothing appeared?**

- Did you redeploy after adding the variables? This is the usual cause.
- Does the secret match **exactly**? No stray spaces or quotes.
- Is access set to **Anyone**, not "Anyone with Google account"?
- Vercel → Deployments → Functions log, search `[enquiry-log]` for the real error.
- After editing the script you must **Deploy → Manage deployments → edit → New
  version**. Saving alone does not republish it.

---

## Making it useful

Optional, but this is where the sheet earns its keep.

**See upcoming departures in order.** Select all data, then **Data → Create a
filter**, and sort by **Departure**. Now you are looking at what is coming up,
not the order enquiries arrived in.

**Highlight anything unanswered.** Select column J, then **Format → Conditional
formatting → Text is exactly `New`** → red. Anything still red has not been dealt
with.

**Flag double-booked dates.** Conditional formatting on column F with the custom
formula below turns a departure date orange when more than one group wants it —
your cue that you need a second guide:

```
=COUNTIF($F:$F, $F1) > 1
```

**On your phone.** Install the Google Sheets app and star the file. Same data,
editable from Imlil. Edits sync straight back.

---

## What this is not

It does not appear on the website, and customers never see it. There is no
availability calendar — you run private departures, so no date is ever "full".
This is a private record and a planning aid, nothing more.
