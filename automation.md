---
description: "Schedule the work the app does for you: the jobs that ship, what each one does, and where to see history and logs."
---

# Automation

Set it up once and BackIssue keeps your collection current on its own.

## Scheduled jobs

**System → Jobs** shows every schedule with its cron expression, an enable toggle, last-run result, and a **Run now** button.

<figure class="bi-ex" v-pre>
  <div class="bi-ex__frame" role="img" aria-label="System, Jobs tab, Scheduled tasks: five schedules with enable toggles, cron patterns, next-run times and Run now buttons; one is running and three are off">
    <h3 class="x-d-h">Scheduled tasks</h3>
    <p class="x-d-note">Toggle a task on and set when it runs with a cron pattern — <code>min hour day month weekday</code>. Examples: <code>0 9 * * 3</code> = Wednesdays 9am · <code>0 */12 * * *</code> = every 12 hours. A run missed while the app was off catches up once at the next start.</p>
    <div class="x-d-scheds">
      <div class="x-d-sched x-d-sched--run">
        <span class="x-d-sw x-d-sw--on" aria-hidden="true"></span>
        <div class="x-d-schedid"><div class="x-d-schedlabel">Check this week's releases <span class="x-pin">1</span></div><div class="x-d-schedlast">last run 3m ago</div></div>
        <span class="x-d-cron">0 */12 * * *</span>
        <span class="x-d-next x-d-next--run">running 3m</span>
        <span class="x-d-ghost x-d-ghost--sched x-d-ghost--off">Running…</span>
      </div>
      <div class="x-d-sched x-d-sched--off">
        <span class="x-d-sw" aria-hidden="true"></span>
        <div class="x-d-schedid"><div class="x-d-schedlabel">Grab weekly 0-Day pack (torrent)</div><div class="x-d-schedlast">last run 214h ago</div></div>
        <span class="x-d-cron">0 9 * * 3</span>
        <span class="x-d-next x-d-next--off">off</span>
        <span class="x-d-ghost x-d-ghost--sched">Run now</span>
      </div>
      <div class="x-d-sched x-d-sched--off">
        <span class="x-d-sw" aria-hidden="true"></span>
        <div class="x-d-schedid"><div class="x-d-schedlabel">Search wanted issues (backfill)</div><div class="x-d-schedlast">last run 214h ago</div></div>
        <span class="x-d-cron">0 2 * * *</span>
        <span class="x-d-next x-d-next--off">off</span>
        <span class="x-d-ghost x-d-ghost--sched">Run now</span>
      </div>
      <div class="x-d-sched x-d-sched--off">
        <span class="x-d-sw" aria-hidden="true"></span>
        <div class="x-d-schedid"><div class="x-d-schedlabel">Watch indexer RSS for releases</div><div class="x-d-schedlast">last run 214h ago</div></div>
        <span class="x-d-cron">*/15 * * * *</span>
        <span class="x-d-next x-d-next--off">off <span class="x-pin">2</span></span>
        <span class="x-d-ghost x-d-ghost--sched">Run now</span>
      </div>
      <div class="x-d-sched">
        <span class="x-d-sw x-d-sw--on" aria-hidden="true"></span>
        <div class="x-d-schedid"><div class="x-d-schedlabel">Back up database</div><div class="x-d-schedlast">last run 52h ago</div></div>
        <span class="x-d-cron">0 5 * * 1</span>
        <span class="x-d-next">in 115h 52m</span>
        <span class="x-d-ghost x-d-ghost--sched">Run now</span>
      </div>
    </div>
  </div>
  <figcaption>
    The top of <b>System → Jobs</b>. Each row is one schedule: toggle, cron pattern, when it runs next, and <b>Run now</b>.
    <span class="x-pin">1</span> A job runs one instance at a time, so a running one can't be started again.
    <span class="x-pin">2</span> Shipped-off lanes already carry a cron — flick the toggle and they start.
  </figcaption>
</figure>

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

<figure class="bi-ex" v-pre>
  <div class="bi-ex__frame" role="img" aria-label="History page showing imports grouped by day, with import counts per source, source filter chips, and the Failed and Blocklist views">
    <div class="x-d-head" style="border-bottom:0;padding-bottom:0">
      <span class="x-d-iconbtn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5M12 19l-7-7 7-7"/></svg></span>
      <h3 class="x-d-h2">History</h3>
      <span class="x-d-summary">1,284 imports</span>
      <div class="x-d-find x-d-push"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.35-4.35"/></svg><span class="x-d-findbox">Filter…</span></div>
    </div>
    <div class="x-d-stats">
      <div class="x-d-stat"><div class="x-d-statlbl"><span class="x-d-dot7" style="background:var(--x-green)"></span>Imports</div><div class="x-d-statval">1,284</div></div>
      <div class="x-d-stat"><div class="x-d-statlbl"><span class="x-d-dot7" style="background:var(--x-green)"></span>usenet</div><div class="x-d-statval">131</div></div>
      <div class="x-d-stat"><div class="x-d-statlbl"><span class="x-d-dot7" style="background:var(--x-cyan)"></span>torrent</div><div class="x-d-statval">54</div></div>
      <div class="x-d-stat"><div class="x-d-statlbl"><span class="x-d-dot7" style="background:var(--x-accent)"></span>web</div><div class="x-d-statval">15</div></div>
    </div>
    <div class="x-d-hchips">
      <span class="x-d-hchip x-d-hchip--on">All</span>
      <span class="x-d-hchip"><span class="x-d-dot7" style="background:var(--x-green)"></span>usenet</span>
      <span class="x-d-hchip"><span class="x-d-dot7" style="background:var(--x-cyan)"></span>torrent</span>
      <span class="x-d-hchip"><span class="x-d-dot7" style="background:var(--x-accent)"></span>web</span>
      <span class="x-d-divider"></span>
      <span class="x-d-hchip"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><path d="M12 9v4M12 17h.01"/></svg> Failed</span>
      <span class="x-d-hchip"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M5.64 5.64l12.72 12.72"/></svg> Blocklist</span>
    </div>
    <div class="x-d-day">Today</div>
    <div class="x-d-hrow">
      <span class="x-d-hico"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg></span>
      <div class="x-d-hmain"><div class="x-d-hline">Saga<span class="x-d-hnum"> #54</span></div></div>
      <span class="x-d-htime">09:41</span>
      <span class="x-d-hsrc x-d-hsrc--usenet">usenet</span>
    </div>
    <div class="x-d-hrow">
      <span class="x-d-hico"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg></span>
      <div class="x-d-hmain"><div class="x-d-hline">Nightwing<span class="x-d-hnum"> #88</span></div></div>
      <span class="x-d-htime">08:17</span>
      <span class="x-d-hsrc x-d-hsrc--torrent">torrent</span>
    </div>
    <div class="x-d-hrow">
      <span class="x-d-hico"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg></span>
      <div class="x-d-hmain"><div class="x-d-hline">Immortal Hulk<span class="x-d-hnum"> #1</span></div></div>
      <span class="x-d-htime">02:05</span>
      <span class="x-d-hsrc x-d-hsrc--web">web</span>
    </div>
    <div class="x-d-day">Yesterday</div>
    <div class="x-d-hrow">
      <span class="x-d-hico"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg></span>
      <div class="x-d-hmain"><div class="x-d-hline">The Department of Truth<span class="x-d-hnum"> #11</span></div></div>
      <span class="x-d-htime">21:33</span>
      <span class="x-d-hsrc x-d-hsrc--usenet">usenet</span>
    </div>
  </div>
  <figcaption>
    <b>History</b> in its default view: imports grouped by day, each tagged with the source that served it — hover a row in the app for where the file went.
    The <b>Failed</b> and <b>Blocklist</b> chips switch to the other two views.
  </figcaption>
</figure>

## Logs

**System → Logs** — timestamped, filterable application log: searches, grabs, imports, tag results, failures with reasons. First stop when something didn't download; the reason is almost always spelled out here.

## Stats

**Sidebar → Stats** is the read-only health check for the whole collection — size on disk, file and format counts, completion, metadata health and download activity. It is described in full under [Stats](library#stats).

## Live updates

Everything above updates in real time — the UI holds an event stream to the server, so queue progress, badge counts, job status, and release ownership all move without refreshing. If the stream drops (sleeping laptop, network blip), the UI falls back to polling and recovers on its own.
