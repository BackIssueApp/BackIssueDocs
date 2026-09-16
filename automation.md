---
description: "Schedule the work the app does for you: the jobs that ship, what each one does, and where to see history and logs."
---

# Automation

Set it up once and BackIssue keeps your collection current on its own.

## Scheduled jobs

**System → Jobs** shows every schedule with its cron expression, an enable toggle, last-run result, and a **Run now** button.

| Job | What it does | Ships |
|---|---|---|
| **Releases check** | Fetches this week's releases and flags new issues of your monitored series | **On**, twice daily |
| **Back up database** | Snapshots `catalog.db` into `backups/` (keeps the newest 5) — cheap insurance for the database that holds your collection, accounts, and reading history | **On**, weekly |
| **ComicVine match** | Runs the CV matcher over any unmatched series (useful after imports) | Off |
| **Watch indexer RSS** | Polls your indexers' *latest uploads* feed (usenet + torrents) and grabs anything that matches a [wanted](collection#monitoring) issue — a new upload is caught within one poll instead of waiting for the next search. Each upload is considered exactly once | Off |
| **Search new releases** | The fast lane for this week's comics: queues wanted issues released in the last **Recent search days** (default 14). Unlike the backfill, failures are **retried on every run** while the issue is inside the window — new releases reach indexers over days — then age out | Off |
| **Wanted search** | The patient backfill: works through the whole [Wanted list](downloads#the-wanted-page) in batches, skipping anything in flight or previously failed, so back-catalog gaps fill steadily without hammering sources | Off |
| **Zero-day pack** | Torrents only: grabs the weekly 0-day pack and imports just your gaps — see [Download sources](sources#the-weekly-0-day-pack) | Off |

Everything except the releases check and the database backup **ships switched
off** — turn on the lanes you want. Each already carries a sensible cron, so
usually all you do is flick the toggle.

Plugins add jobs of their own, and they appear in the same list once the plugin
is installed:

| Job | From |
|---|---|
| **Watch AirDC++ announcements** | [AirDC++](airdcpp#watching-announce-bots) |
| **Scan book libraries**, **Fill wanted books** | [Books](ebooks) |
| **Scan audiobook libraries**, **Sync remote audiobook catalog**, **Fill wanted audiobooks** | [Audiobooks](audiobooks) |
| **Fill approved book requests** | [Requests](requests) |
| **Rebuild the browse index** | [Shelves](shelves) |

The three search lanes are complementary layers: **RSS watch** reacts to uploads in minutes, **new releases** actively hunts the current window (and retries), and the **wanted backfill** chews the backlog nightly. Anything one misses, the next catches.

Schedules use **cron expressions** (`0 3 * * *` = daily at 03:00). Each job runs at most one instance at a time, and every run is recorded with its outcome.

Suggested starting points:

```
Releases check       0 8 * * 3       # Wednesday mornings (new comic day)
ComicVine match      0 4 * * *       # nightly
Watch indexer RSS    */15 * * * *    # every 15 minutes (off until you enable it)
Search new releases  0 */6 * * *     # every 6 hours (off until you enable it)
Wanted search        0 2 * * *       # nightly, batch of 25–50
Zero-day pack        0 9 * * 3,4     # Wed/Thu — packs appear midweek
```

## Notifications

BackIssue has a built-in **notification centre** — the 🔔 bell in the header. It records notable events and shows an unread badge; open it for recent notifications, mark them read, or click one to jump to what it's about. It updates live, so things appear as they happen.

Notifications are **per user** — some are broadcast to everyone (a download finished, a release-day heads-up), others are targeted (your request was approved). What you see:

- Downloads completed or failed, packs imported or failed
- A weekly **release-day** heads-up for series you follow
- **Requests** activity — a new request filed (for reviewers), or your request approved/declined

### Sending events elsewhere

The **[Notifications Hub](notifications)** plugin sends the same events to Discord (rich embeds with cover art), Telegram, Pushover, ntfy, or any webhook — each channel with its own category filter. The in-app bell always records everything regardless.

## History

**Sidebar → History** — every import, forever: when, which series/issue, which source served it, and where the file went. The paper trail for "where did this file come from?"

It has three views:

- **Imported** — what landed, newest first.
- **Failed** — grabs that didn't make it, each with the reason the source or the
  client gave.
- **Blocklist** — releases that failed badly enough to be barred from automatic
  grabs, with why. Remove one to let it be grabbed again, or clear the lot. A
  [manual source search](downloads#manual-searches) is never filtered by it.

## Logs

**System → Logs** — timestamped, filterable application log: searches, grabs, imports, tag results, failures with reasons. First stop when something didn't download; the reason is almost always spelled out here.

## Stats

**Sidebar → Stats** is the read-only health check for the whole collection — size on disk, file and format counts, completion, metadata health and download activity. It is described in full under [Stats](library#stats).

## Live updates

Everything above updates in real time — the UI holds an event stream to the server, so queue progress, badge counts, job status, and release ownership all move without refreshing. If the stream drops (sleeping laptop, network blip), the UI falls back to polling and recovers on its own.
