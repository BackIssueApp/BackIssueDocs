# Automation

Set it up once and BackIssue keeps your collection current on its own.

## Scheduled jobs

**Sidebar → Jobs** shows every schedule with its cron expression, an enable toggle, last-run result, and a **Run now** button.

| Job | What it does |
|---|---|
| **Releases check** | Fetches this week's releases and flags new issues of your monitored series |
| **ComicVine match** | Runs the CV matcher over any unmatched series (useful after imports) |
| **Wanted search** | Works through the [Wanted list](downloads#the-wanted-page) — searches and downloads missing issues of monitored series, in batches (`wantedSearchBatch`), so backfills proceed steadily without hammering sources |
| **Zero-day pack** | Torrents only: grabs the weekly 0-day pack and imports just your gaps — see [Download sources](sources#the-weekly-0-day-pack) |

Schedules use **cron expressions** (`0 3 * * *` = daily at 03:00). Each job runs at most one instance at a time, and every run is recorded with its outcome.

Suggested starting points:

```
Releases check    0 8 * * 3     # Wednesday mornings (new comic day)
ComicVine match   0 4 * * *     # nightly
Wanted search     0 2 * * *     # nightly, batch of 50
Zero-day pack     0 9 * * 3,4   # Wed/Thu — packs appear midweek
```

## Notifications

BackIssue has a built-in **notification centre** — the 🔔 bell in the header. It records notable events and shows an unread badge; open it for recent notifications, mark them read, or click one to jump to what it's about. It updates live, so things appear as they happen.

Notifications are **per user** — some are broadcast to everyone (a download finished, a release-day heads-up), others are targeted (your request was approved). What you see:

- Downloads completed or failed, packs imported or failed
- A weekly **release-day** heads-up for series you follow
- **Requests** activity — a new request filed (for reviewers), or your request approved/declined

### Webhook

Set a **webhook URL** in Settings and the same events are also POSTed as Discord-compatible JSON (with structured fields for smarter receivers). Point it at a Discord channel webhook and you're done — or at anything that accepts a Discord-shaped payload (it also works as a generic post-event hook).

You can choose **which categories** the webhook fires for (imports, failures, releases, requests, system) with per-category checkboxes; the in-app bell always records everything regardless.

## History

**Sidebar → History** — every import, forever: when, which series/issue, which source served it, and where the file went. The paper trail for "where did this file come from?"

## Logs

**Sidebar → Logs** — timestamped, filterable application log: searches, grabs, imports, tag results, failures with reasons. First stop when something didn't download; the reason is almost always spelled out here.

## Stats

**Sidebar → Stats** — totals for series/issues/files, library size on disk, per-status issue counts, tagged/untagged and CBR/CBZ breakdowns — a quick health check of the whole collection.

## Live updates

Everything above updates in real time — the UI holds an event stream to the server, so queue progress, badge counts, job status, and release ownership all move without refreshing. If the stream drops (sleeping laptop, network blip), the UI falls back to polling and recovers on its own.
