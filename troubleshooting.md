# Troubleshooting

**First stop for anything download-related: System → Logs.** Failures are recorded with their reason — most answers below start there.

## Metadata

Out of the box there is nothing to configure: series and issue data comes from the **BackIssue metadata service**, and your install registers itself with it the first time it needs to. Only if you switched **Settings → Metadata → Source** to *ComicVine directly* does the ComicVine advice further down apply.

**Nothing comes back when you search for a series.**
Look for a metadata error in **System → Logs**. A failed registration names the URL it tried, so the usual answer is visible at once: outbound HTTPS blocked by a firewall, a DNS problem, or a proxy in front of the container. The app retries on the next lookup, so once the network is fixed nothing else needs doing.

**A series matched the wrong volume.**
Open the series and re-pick the match. Common with same-name relaunches (*Batman* 1940 vs 2011 vs 2016) — check the start year and issue count when choosing.

### If you use your own ComicVine key

**"Rate limit exceeded" / matching crawls.**
ComicVine enforces per-key limits — roughly 200 requests per resource per hour, with velocity checks on top — and BackIssue pauses when it hits them, so big imports, library scans and release matching all take much longer. It paces itself to stay under, but the cure for a first-time import is patience: let the nightly ComicVine-match schedule chew through it rather than re-running by hand. Switching **Source** back to the built-in service removes the limit entirely.

**"Invalid API key" though the key is right.**
ComicVine sometimes blocks datacentre and VPN addresses, and that surfaces as a key error rather than a block. Try without the VPN — or use the built-in metadata service, which your server reaches from the same address without a key.

## Downloads

**Where do I see why something failed?**
Failed items show their reason directly on the **Queue** row (with a per-row retry button), and **History → Failed** keeps a durable record of failed downloads even after the queue is cleared. **Logs** (filterable, with day separators) has the full detail.

**Issue fails with "No enabled source had a match".**
No source could find that exact series + number. Check the series' **aliases** (indexers often use variant names — add them in the series page), try **Search sources** to see what each source actually returns, and re-queue later — availability changes weekly.

**Grabbed, but never imports (stuck at "grabbed").**
The monitor can't see the finished file. Almost always the **completed-folder mapping**: the client reports its own path, and BackIssue must translate it. Set both "client's view" and "BackIssue's view" paths (Settings → your source). Docker users: these are nearly always different.

**Import fails with "Can't find end of central directory".**
The file isn't a valid ZIP — usually a truncated download or a RAR-in-disguise. BackIssue sniffs real formats on import, so this typically means genuine corruption: redownload the issue.

**A big collected edition imported as `.cbr` instead of `.cbz`.**
Very large RAR-based comics (collected volumes, often hundreds of MB) can't be repacked to CBZ in memory, so BackIssue files them as-is: fully readable, just not ComicInfo-tagged. There is no fixed ceiling to set: left alone, it scales with the container's memory limit or the host's RAM (roughly 1 GB on a 32 GB box, down to a 400 MB floor on smaller hosts). If you have RAM to spare and want more of these converted, override it with the `MAX_RAR_MB` environment variable — a number of megabytes, which replaces the calculated ceiling.

**Downloads are slow in big batches.**
Expected to a degree — workers parallelize (`downloadConcurrency`), but each source has its own pacing, and BackIssue deliberately doesn't hammer. Watch the Queue to see where time goes.

## Library

**Owned issues show as missing.**
The file isn't linked to the CV issue — odd filename, or metadata pointing elsewhere. Run **System → Tools → Re-link to ComicVine**, then **Scan entire library** if files were added outside BackIssue.

**Files flagged corrupt that open fine elsewhere.**
Some readers tolerate damage that strict verification doesn't. **Redownload** for a clean copy, then **Remove duplicate files** to clear the bad one. If many files flag at once on a network share, check the share mount first — unreadable ≠ corrupt.

**Untagged count won't drop.**
Tagging needs a CV match and a CBZ. Run **Convert all CBR → CBZ**, then **Tag all untagged files**; stragglers are unmatched files (see the No CV filter and Import candidates).

## Access

**Browser asks for a login.**
Authentication is always on (the first run creates the admin account). Sign in with your account — see [Users & access](users).

**Can't sign out / stale login.**
Use **Sign out** from the account menu. If a browser had ever used HTTP Basic, a sign-out marker suppresses those cached credentials so logout sticks.

**Forgot the admin password.**
Another admin can reset it from the **Users** page. If you've locked out every admin, stop the app and remove the `users` rows from `catalog.db` (e.g. with a SQLite tool) — the next start runs the first-run admin creation again. Your library and settings are untouched.

**"Too many attempts."**
Login rate limiting kicked in after repeated failures — wait the short lockout out (it grows with continued failures) and try again with the right password.

**Everyone gets locked out at once behind a reverse proxy.**
Rate limiting counts per client address, and behind nginx, Caddy or a Cloudflare Tunnel every request appears to come from the proxy — so one person's bad password throttles the household. Set the `TRUST_PROXY` environment variable where you run the app (`TRUST_PROXY=1` for a single proxy hop, `true` for the immediate peer, or a subnet such as `10.0.0.0/8`) and real client addresses come through; it also lets the session cookie be marked Secure over HTTPS. Leave it unset on a direct deployment, where a forged header would otherwise be believed. See [Users & access](users).

**A user can't do something they should be able to.**
Check their **role and permissions** on the Users page. Buttons for actions a role can't perform are hidden, and the API refuses them — grant the needed permission (or a broader role) to fix it.

**UI looks stale after an update.**
On Docker, `docker compose pull` then `docker compose up -d` — a container still running the old image is the usual cause. From source, run `npm run up` (not just `npm start`) so the frontend rebuilds. Either way, reload the browser afterwards.

## Getting help

When something is wrong and the sections above do not cover it, attach a **support package** to your report. **System → Tools → Getting help → Download support package** builds one zip containing:

- `summary.json` — app version and build, Node and OS, whether it runs in Docker, uptime, memory, disk space for the data directory and every library folder, database size, and counts of series, issues, files and users
- `settings.json` — every setting, with API keys, passwords and tokens replaced by `[redacted N chars]` (so "is it set" is still answerable)
- `plugins.json`, `libraries.json`, `sources.json`, `jobs.json` — what is installed, where your files live, which sources and indexers are configured (hosts only), recent jobs and the schedule table
- `queue.json`, `history.json` — what is queued or failed and the last 100 history rows
- `logs.txt` — the last 2,000 log entries, with secrets inside URLs blanked

It never contains comic files, covers, user names, e-mail addresses or password hashes. Building it needs the *Settings & indexers* permission.

**From the phone apps.** Settings → Support → **Send diagnostics** on Android and iOS sends the app's own report (device, app build, server it talks to, recent connection and playback failures) through your server, which answers with the same kind of code. If you are an admin the server's package goes with it; otherwise a lite package with version and counts only.

**Sending it instead of attaching it.** The same card has **Send to BackIssue support**: it uploads the package to the hosted support service, using the install's own metadata key, and shows a short code such as `7K3M-9Q2X`. Quote the code in your report; only the BackIssue team can open a package, and packages are deleted after 60 days. The optional note field travels with it, so a one-line description of the problem saves a round trip.

## Recovery

**Database.**
`catalog.db` is everything. **System → Tools → Back up database** snapshots it (newest 5 kept). Restore: stop the app, copy the snapshot over `catalog.db`, start. Your comics are untouched either way — worst case, a fresh library scan rebuilds the index from disk.

**A crash mid-download.**
On startup BackIssue reconciles: issues whose file made it to disk are marked done; interrupted ones return to pending automatically. Nothing to clean up by hand.

**The server restarted itself — `watchdog: ...` in the container log.**
That is by design. A background watcher pings the main thread every few seconds; if no ping arrives for two minutes, or memory sits above 92% of the heap limit for a minute and a half, the process is wedged and nothing above it — routes, schedules, even a shutdown signal — will ever run again. The watcher kills it outright and your restart policy (`restart: unless-stopped`, systemd) brings up a fresh one, which beats a silent hours-long outage. The line naming the reason goes to the container log rather than the in-app log; the app log gets a `memory: rss …, heap … of … limit` line every ten minutes, so a leak leaves a trail rather than a mystery.

If it happens repeatedly, that is a real problem worth reporting with a support package — the restart is the symptom, not the cause. Two notes for anyone tuning it: the app must not be PID 1 for the kill to work (the official image ships an init process, and it warns at startup if it finds itself PID 1 anyway), and `BACKISSUE_WATCHDOG=0` switches the watcher off entirely while `BACKISSUE_WATCHDOG_STALL_MS` changes the two-minute threshold.
