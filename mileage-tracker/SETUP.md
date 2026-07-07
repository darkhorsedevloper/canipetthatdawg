# 🐾 Mileage Tracker — Setup Guide

Tracks pet-sitting / dog-walking / check-in drives for taxes.
Tap **Start Trip** → it logs where you are and opens Google Maps.
Tap **End Trip** → it logs the destination, the driving route, and the miles.
Every night at **11pm** the sheet writes a daily total (trips, miles, $ deduction).

Total cost: $0. No servers, no API keys — everything lives inside Google.

---

## Part 1 — The Google Sheet (~5 min, do this on your computer)

1. Go to [sheets.new](https://sheets.new) and name the spreadsheet **Pet Sitting Mileage**.
2. Menu: **Extensions → Apps Script**. Delete the placeholder code.
3. Paste in the entire contents of `Code.gs` (in this folder). Hit the 💾 save icon.
4. In the toolbar dropdown (says `doGet`), pick **`setup`** and click **Run**.
   - Google will ask you to authorize — click through **Advanced → Go to
     (unsafe)** → **Allow**. (It says "unsafe" only because you wrote the
     script yourself; it's your own code touching your own sheet.)
   - This creates the **Trips** and **Daily Totals** tabs and schedules the
     nightly 11pm rollup.
5. Deploy it as a web app: **Deploy → New deployment → ⚙️ → Web app**
   - Description: `mileage`
   - Execute as: **Me**
   - Who has access: **Anyone**  ← required so your phone can hit it without
     a login. The `token` in the URL is what keeps randoms out.
6. Click **Deploy** and **copy the Web app URL** (ends in `/exec`).
   You'll paste it into both Shortcuts below.

> 🔑 Set `SECRET` at the top of the script to your own random string — that's
> your token, and it appears in the Shortcut URLs below as `YOUR-TOKEN`. If you ever
> want a new one, change `SECRET` in the script, redeploy
> (**Deploy → Manage deployments → ✏️ → New version**), and update both Shortcuts.

---

## Part 2 — iPhone Shortcut #1: "🐾 Start Trip" (~5 min)

Open the **Shortcuts** app → **+** → name it **🐾 Start Trip**. Add these
actions in order (search for each by name):

1. **Get Current Location**
2. **URL** — paste this, replacing `YOUR_EXEC_URL` with the web app URL:

   ```
   YOUR_EXEC_URL?action=start&token=YOUR-TOKEN&lat=LAT&lng=LNG
   ```

   Then replace the literal `LAT` and `LNG`: tap right before each one,
   delete the placeholder, tap **Current Location** in the variable bar above
   the keyboard, tap the inserted variable, and set it to **Latitude**
   (and **Longitude** for the second one).
3. **Get Contents of URL** — it should point at the URL from step 2 (Method: GET).
4. **Show Notification** — body: the **Contents of URL** variable.
   (You'll see "🐾 Trip started from 123 Main St…")
5. **Open App** → choose **Google Maps**.

Done — tapping it logs your start point and lands you in Google Maps ready
to navigate to the dawg.

## Part 3 — iPhone Shortcut #2: "✅ End Trip" (~3 min)

Duplicate the first shortcut (long-press → Duplicate), rename it
**✅ End Trip**, then:

1. In the **URL** action, change `action=start` to `action=end`.
2. Delete the **Open App** action.

The notification will read like:
`✅ Logged 6.4 mi (I-35 N) → 456 Oak Ave, Austin, TX`

## Part 4 — Make them one tap away

Pick whichever you'll actually use:

- **Home screen:** shortcut → ⓘ → **Add to Home Screen** (do both — two big buttons).
- **Lock screen widget:** long-press lock screen → Customize → add Shortcuts widgets.
- **Back Tap:** Settings → Accessibility → Touch → Back Tap → double-tap =
  Start Trip, triple-tap = End Trip. Ridiculously handy in the driveway.
- **Action button** (iPhone 15 Pro+): Settings → Action Button → Shortcut.
- **CarPlay/Siri:** just say "Hey Siri, Start Trip."

---

## What lands in the sheet

**Trips tab** — one row per drive, written the moment you tap End
(so nothing is lost if your phone dies later):

| Date | Start Time | End Time | Start Address | End Address | Route | Miles | Status |
|------|-----------|----------|---------------|-------------|-------|-------|--------|
| 2026-07-07 | 9:12 AM | 9:31 AM | 123 Main St | 456 Oak Ave | I-35 N | 6.4 | DONE |

**Daily Totals tab** — one row per working day, written at 11pm:

| Date | Trips | Total Miles | Deduction ($) |
|------|-------|-------------|----------------|
| 2026-07-07 | 5 | 23.8 | 16.66 |

## Notes & gotchas

- **Miles = Google's driving route** between your start and end points — the
  same route Google Maps would navigate, not a straight line. If Google can't
  find a route it falls back to a straight-line estimate and says so in the
  Route column.
- **Forgot to tap End?** The 11pm rollup marks the trip `INCOMPLETE` instead
  of guessing. Fix the row by hand (type the miles, set Status to `DONE`) and
  it'll be picked up if you re-run `logDailyTotal`, or just leave it for your
  own records.
- **IRS rate:** the `Deduction ($)` column uses `IRS_RATE` at the top of the
  script (set to $0.70/mi). Check the current-year IRS standard mileage rate
  each January and update it.
- **For taxes** the IRS wants date, miles, destination, and business purpose —
  this log covers the first three automatically. If an auditor-proof "purpose"
  matters to you, the client's address in the End Address column usually
  suffices for a pet-sitting business, but you can add a Purpose column and
  jot notes anytime.
- **Quota:** Google gives Apps Script ~1,000 free directions lookups a day.
  You are not going to walk that many dawgs.
