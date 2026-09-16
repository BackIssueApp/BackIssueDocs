---
description: "Browse what's new, upcoming and notable in comics and add anything that catches your eye in one click."
---

# Discover

The **Discovery plugin** adds a **✨ Discover** entry to the sidebar — a browsable feed of new and notable comics pulled from ComicVine, with one-click add. It's how you find series worth tracking instead of only searching for ones you already know.

Discover appears only for users who can **add series to the library** (the *Manage the library* permission) — its whole point is the one-click add, so read-only viewers don't see it.

## The feeds

Discover has four tabs. All four are built from ComicVine **issue store dates**, not from volume records: sorting volumes by when they were catalogued returns obscure back-catalogue, not new releases.

| Tab | What it's built from |
|---|---|
| **New Series** | Issues numbered **#1** with a store date inside the window, collapsed to one card per volume (keeping the earliest date), newest first. |
| **Latest** | **Any** issue with a store date in the trailing window — one card per volume, keeping its most recent issue. Up to 80 cards. |
| **For You** | The New Series list, filtered to the **eight publishers you own the most series from**. It's your own collection talking back to you, so a small or brand-new library gives a thin (or empty) feed. |
| **Popular** | The New Series list, filtered and ranked by a fixed list of major Western publishers — Marvel, DC, Image, Dark Horse, BOOM!, IDW and so on, in that order, then by date. A labelled heuristic: ComicVine has no popularity metric. |

There's no genuinely forward-looking feed. ComicVine doesn't populate store dates more than a couple of days ahead, so an "upcoming" tab would simply be empty — **Latest** shows the trailing window instead.

Each card shows the cover, publisher, and year. **+ Add** adds the series to your collection immediately (and, with [download-on-add](downloads) on, starts fetching it). Series you already have are stamped **✓ In collection**, checked fresh on every open.

## Western only

The **Western only** toggle in the drawer header is an **allowlist**, not a manga blocklist: a card is shown only if its publisher is a known US/UK house. That means manga and foreign-language #1s disappear — and so does anything whose publisher isn't known yet (see below). The toggle is remembered in your browser and is **on** by default.

Publishers aren't carried on a ComicVine issue, so each volume needs its own lookup. Those are capped at **120 new volumes per feed build** and cached permanently on disk, so a freshly installed plugin shows fewer cards under **Western only** than it will a day later, as the cache fills in.

## Settings

**Settings → Plugins → Discovery** (on older versions, under Sources):

| Setting | What it does |
|---|---|
| Discovery | Master switch. On unless you turn it off; off makes the drawer report that it's disabled. |
| New/±window (days) | The window either side of today used by **New Series** (and therefore **For You** and **Popular**) — default `42`, range 7–180. |
| Upcoming (days) | Despite the label, this sets **Latest**'s trailing window: that many days back, up to three days ahead. Default `42`, range 7–120. |
| Cache (hours) | How long an assembled feed is reused before ComicVine is asked again — default `12`, range 1–168. |

Each tab is cached separately, in memory, so reopening the drawer or switching back to a tab costs nothing. The cache is rebuilt from scratch when the server restarts, and all four feeds are warmed in the background at startup so the first open is instant.

::: tip Changing the cache window needs a restart
The window and publisher settings take effect on the next feed build, but the cache duration itself is read when the plugin loads. Restart the app after changing **Cache (hours)**.
:::

## When ComicVine is unavailable

Nothing is stored locally to fall back on, so a feed that can't be built comes back empty with the reason in its place:

- **Rate-limited** — "ComicVine is rate-limited right now — try again shortly." Wait it out; the failed build isn't cached, so the next open retries.
- **No metadata configured** — Discover tells you to add an API key in Settings.
- **Anything else** (service down, DNS, a timeout) is reported as the error itself.

Widening the windows makes each build ask ComicVine for more, so if you're bumping into the rate limit, lengthen **Cache (hours)** before you widen the windows.

Adding a series here is exactly the same as adding via **+ Add** — it's matched to ComicVine with its full issue list; see [Managing your collection](collection).
