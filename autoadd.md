---
description: "Write a rule once, such as Star Trek or a publisher's name, and upcoming series that match are added to your library for you, up to eight weeks before they ship."
---

# Auto-add

The **Auto-add plugin** adds upcoming series to your library from rules you
write once. A rule such as **Star Trek** watches the release list, which
reaches about eight weeks ahead, tells you as soon as a series with that
phrase in its name turns up, and adds it for you. You never have to know the
series exists.

Install it from **Sidebar → Plugins**. It needs BackIssue 0.9.4 or newer, and
it adds an **Auto-add** entry to the sidebar for administrators and anyone
granted the **Manage auto-add rules** permission.

## Writing a rule

Open **Auto-add** and fill in the form under **Rules**.

| Field | What it does |
|---|---|
| **Series name contains** | The phrase to look for. Whole words only, and case, accents and punctuation do not matter: `star trek` catches *Star Trek: Zero Point* but not *Stargate*. Leave it empty and name a publisher to catch every series that publisher has coming. |
| **Publisher** | Only series from a publisher whose name contains this. Optional when the rule has a name. |
| **Leave out names containing** | Words that rule a series out, separated by commas. |
| **Download** | Every issue of the series, or only the upcoming issue and the ones after it. |
| **Add to** | The library the rule's series go to. Shown when you have more than one comics library. |
| **New series only** | Leaves out series that are already past their first issue, so a broad phrase like `batman` does not pull in every long-running title. |
| **Ask before adding** | The rule adds nothing on its own. Each series it catches waits for you to press **Add** or **Skip**. |
| **Single issues only** | On by default, so trade paperbacks, hardcovers and omnibuses are not added as series of their own. |

While you type, the page lists what the rule would catch in the weeks ahead,
so you can see its reach before you save it. **Edit** on a saved rule loads it
back into the form, and the switch beside a rule turns it off without deleting
it.

## What happens to a caught series

The rules run twice a day, and **Check now** runs them on the spot. The pass
also appears under **System → Jobs**, where you can change its schedule.

- **A series the catalog already knows** is added on that check and monitored
  like one you added yourself.
- **A brand-new series** is often on the release list weeks before the catalog
  has a record for it. You get a **Coming up** notification the first time it
  is caught, and it shows as **Waiting for details**. It is added on the first
  check after its record arrives, usually around the week its first issue
  ships, and it is followed for four weeks after that so a late record is not
  missed.
- **A series under a rule that asks first** shows as **Needs your OK**. **Add**
  puts it in your library on the spot. While it is still waiting for details,
  **Add when ready** records your yes ahead of time.

Once a series is added, issues that are already out are queued when
[download on add](downloads) is on, and issues still to come are picked up on
release day like those of any monitored series.

## Staying in control

- **Caught in the weeks ahead** lists every series your rules catch and what
  will happen to it. **Skip** keeps one out, whether it is about to be added
  or still waiting.
- **No rule adds more than ten series in one go on its own.** A bigger catch
  is held: every series in it shows as **Needs your OK** under a note that
  says why, one notification tells you, and **Add all** takes the lot. The
  form warns you before you save a rule that wide. After that the rule carries
  on as usual, and the one or two new series it finds in a normal week are
  added without asking.
- **A series is added once.** If you delete it from your library later, it
  does not come back unless you press **Add again** under **Added so far**.
- Deleting a rule leaves the series it already added in your library.

## The back catalogue

A rule watches what is coming. For series that are already published, press
**Existing series** on a rule: it searches the catalog for series the rule
matches that are not in your library, and you tick the ones to add. Nothing
there is added on its own. A rule with only a publisher does not offer it,
since it has no name to search for.

## Limits

- The release list reaches about eight weeks ahead. A series announced further
  out is caught once it enters that window.
- A series can only be added once the catalog has a record for it. For most
  brand-new series that is close to release, not eight weeks before. Nothing
  is lost by the wait: issues that shipped in the meantime are queued when the
  series is added.
- A rule with a name matches the series name only. A tie-in that does not
  carry the phrase in its name is not caught.
- The list covers the main publishers. A small-press title that never appears
  on it cannot be added by a rule.
