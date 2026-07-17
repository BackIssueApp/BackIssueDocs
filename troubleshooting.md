# Troubleshooting

**First stop for anything download-related: System → Logs.** Failures are recorded with their reason — most answers below start there.

## ComicVine

**"Rate limit exceeded" / matching crawls.**
CV enforces per-key request limits. BackIssue paces its own requests, but for heavy use point the **API base URL** (Settings → ComicVine) at a self-hosted ComicVine-compatible cache, or set a **Proxy URL** so requests exit from a fresh IP. Big first-time imports are the heaviest CV users; let the nightly CV-match schedule chew through them instead of re-running manually.

**"Invalid API key" though the key is right.**
CV sometimes blocks datacenter/VPN IPs, which can surface as key errors. Try without VPN, or set a **Proxy URL** so CV traffic exits elsewhere.

**A series matched the wrong volume.**
Open the series and re-pick the match. Common with same-name relaunches (*Batman* 1940 vs 2011 vs 2016) — check the start year and issue count when choosing.

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
Very large RAR-based comics (collected volumes, often hundreds of MB) can't be repacked to CBZ in memory, so BackIssue files them as-is: fully readable, just not ComicInfo-tagged. The size ceiling scales with the host's memory (roughly 1 GB on a 32 GB box, down to a 400 MB floor on smaller hosts). If you have RAM to spare and want more of these converted, raise it with the `MAX_RAR_MB` environment variable (value in megabytes).

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

**A user can't do something they should be able to.**
Check their **role and permissions** on the Users page. Buttons for actions a role can't perform are hidden, and the API refuses them — grant the needed permission (or a broader role) to fix it.

**UI looks stale after an update.**
Run `npm run up` (not just `npm start`) so the frontend rebuilds, then reload the browser.

## Recovery

**Database.**
`catalog.db` is everything. **System → Tools → Back up database** snapshots it (newest 5 kept). Restore: stop the app, copy the snapshot over `catalog.db`, start. Your comics are untouched either way — worst case, a fresh library scan rebuilds the index from disk.

**A crash mid-download.**
On startup BackIssue reconciles: issues whose file made it to disk are marked done; interrupted ones return to pending automatically. Nothing to clean up by hand.
