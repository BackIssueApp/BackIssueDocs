---
description: "How an issue goes from missing to filed: the pipeline, the queue, manual searches, blocked releases and multi-issue packs."
---

# Downloads

Downloading is a **trusted-tier** capability: viewers (read-only accounts) don't see the download pages, buttons, or queue counters described here. See [Users & access](users#roles).

## The pipeline

When an issue is queued, a download worker takes it through four steps:

1. **Find** — each enabled source is asked, in your [priority order](sources#source-priority), whether it can serve this issue. The first confident match wins. Matching is strict about series name and issue number (aliases included), so *Spider-Man* never grabs *Amazing Spider-Man*.
2. **Fetch** — the winning source downloads the file. *Immediate* sources download in-app with live byte/speed progress; *deferred* sources (Usenet, torrents) hand off to your download client and a background monitor picks the file up when the client finishes.
3. **Convert & tag** — the file's real format is detected from its bytes (mislabeled files are common). With embedded tag placement (the default), CBRs are repacked to CBZ and ComicVine metadata is embedded as `ComicInfo.xml`; with [sidecar placement](library#tagging-and-naming), the downloaded file is kept byte-identical and the metadata is written to a `.xml` beside it.
4. **File** — the finished CBZ is named to your [file pattern](library#naming-patterns) (default `Series VYYYY #NNN.cbz`) and placed in the series folder, and the issue flips to *owned*.

Several workers run in parallel (**Simultaneous downloads** in the [settings reference](settings-reference)), so a big batch downloads from multiple sources at once.

## How a release is chosen

Step one of the pipeline says "the first confident match wins". Confidence is
not a guess — it is a gate, and then a very small score.

**The gate.** A candidate is thrown out entirely, not merely ranked low, when:

- **The series name doesn't match.** Comparison is exact after normalising:
  case folded, `&` read as "and", a leading "the" dropped, punctuation removed.
  Your series [aliases](collection) all count, which is why adding an alias is
  the fix when an indexer names a series its own way. This is what stops a
  *Spider-Man* search taking *Amazing Spider-Man*.
- **The issue number doesn't match.** Also normalised, so `1/2`, `½`, `0.5` and
  `000.5` are the same number, and `001` is the same as `1`.
- **It is a collected edition when you wanted a single issue.** A trade's
  "number" is a volume number, and filing a whole trade as issue 2 would be
  worse than finding nothing.
- **It is implausibly small.** Anything whose size is known and under a
  megabyte is treated as a fake post and dropped. Unknown size is not held
  against a release.
- **It is on the blocklist**, for Usenet. See below.

**The score.** What survives the gate is ranked, and there is only one real
factor: a release whose year matches the volume year gains points, and one
whose year differs loses a smaller number. Year never rejects a candidate,
because long runs are tagged with cover years that drift from the volume year.
Ties break on seeders, then size, for torrents, and otherwise on the order the
indexer returned.

So: **series and number decide whether a release is eligible, and year decides
which eligible release wins.** Quality tags, release groups and scene naming
carry no weight at all.

**Manual search ignores all of this.** [Search sources](#manual-searches) lists
everything, including candidates the gate would have rejected, ranked by the
same score with unscored entries last. That is the point of it: when the
automatic matcher finds nothing, you can see what is actually out there and
decide for yourself.

## Issue statuses

| Status | Meaning |
|---|---|
| **pending** | Known but not queued — nothing is happening |
| **queued** | Waiting for a download worker |
| **downloading** | A worker is actively searching/fetching it |
| **grabbed** | Handed to an external client (Usenet/torrent); the monitor is watching it |
| **done** | Downloaded, tagged, and filed — you own it |
| **failed** | Every source came up empty or errored (the reason is recorded; see Logs) |

Failed issues can be re-queued any time — sources change constantly, so a miss today often succeeds next week.

### What happens after a failure

Retrying is not uniform, and the difference catches people out.

- **Within a single attempt**, an in-app source is tried three times with a
  short growing delay. A source that hands off to a download client is not
  retried in-app at all — the client owns the transfer.
- **The nightly backfill skips anything already failed.** It only picks up
  issues that have never been queued, in batches, so a long backfill doesn't
  flood your sources.
- **The new-releases lane does retry failed issues**, every run, but only while
  the issue is still recent — a fortnight from its release date by default.
  After that nothing retries it automatically.

The practical upshot: an issue that failed more than two weeks after release
stays failed until you press **Retry**. That is deliberate rather than a bug,
but it is why the Failed tab is worth revisiting occasionally.

Two watchdogs protect the queue from hanging. A handed-off download that never
appears in the client is failed after an hour for Usenet and two hours for
torrents, and if the client itself has been unreachable that long, everything
waiting on it fails together. If the app restarts mid-download, anything caught
in flight goes back to the queue, unless its file already reached the library,
in which case it is marked done.

## The Queue

The **Queue** section shows the whole pipeline live. Every downloading item has **its own progress bar** and phase label, so concurrent downloads are each visible:

- **Searching…** — looking through your sources for a match (this step can take a few seconds, especially for peer-to-peer sources).
- **Downloading** — with page/byte progress and speed, or a percentage and seeders for torrents.
- **Importing / Tagging** — converting, embedding metadata, and filing.

You can **pause and resume** the whole queue, **retry** or **clear** failed items, and **cancel** individual downloads. If the app restarts mid-download, the queue resumes on its own.

**Books and audiobooks queue here too.** A book being searched for, downloaded
by a site source, or fetched by your download client gets a row of its own with
a **Book** or **Audiobook** badge, the release that was picked, the source, and
progress — and counts towards the queue badge. One a download client is holding
can be cancelled from the row. See [Books](ebooks#adding-books) and
[Audiobooks](audiobooks#adding-audiobooks).

## Blocked releases

A Usenet release that the download client reports as **failed** — broken PAR2/repair, missing articles — is very likely to fail the same way every time. So when that happens, the exact release is added to a **blocklist** and skipped on future searches: a retry grabs the next-best release instead of re-fetching the same broken one over and over.

Three things block a release, all of them evidence that the release itself is bad:

1. The download client reports it failed — broken repair data, missing articles.
2. The file arrives but its contents are damaged, and the import says so.
3. The completed download cannot be read as a comic at all.

Everything else is treated as your problem rather than the release's, and
**does not** block: a timeout, an unreachable client, a permissions error, or a
wrong completed-folder mapping. None of those mean the release is bad, and
blocking on them would burn through good releases while the real fault went
unfixed.
- Releases are matched by both their indexer id and a normalized title, so the same broken post is caught even if it reappears under a new id or on another indexer.
- **History → Blocklist** lists blocked releases with the reason they failed. Remove one to allow it to be auto-grabbed again, or clear the whole list. A **manual** [source search](#manual-searches) is never filtered — if you deliberately pick a blocked release, that choice stands.
- Blocks do not expire. A release stays blocked until you remove it.

This applies to Usenet only; torrents are never blocked automatically, and their seeding and removal are managed in your torrent client.

## Manual searches

Sometimes you want to pick the exact release yourself:

- **Search sources** (on any issue) queries *every* enabled source at once and shows a single ranked list — release name, size, source badge, and quality signals. Pick one and it downloads through the normal pipeline, bypassing automatic selection.
- Your pick is **pinned** to that issue: the queue uses your chosen release rather than re-searching.

## Packs

Multi-issue collections ("packs") are the fastest way to fill a mostly-empty series.

- **Search packs** (on a series) asks every pack-capable source for collections related to the series and shows them in one list.
- Grabbing a pack downloads it, then walks its contents **issue-by-issue against your collection**: missing issues are imported, tagged, and filed; issues you already own are skipped. A pack never overwrites what you have.
- Only listings that actually contain multiple issues are treated as packs (a trade paperback is not a pack).
- Each file in the pack is placed by reading its filename, then confirmed
  against ComicVine. A file whose series isn't in your collection, or whose
  number isn't in the volume, is reported as unmatched rather than guessed at.
- The weekly **zero-day** pack is chosen by the week printed in its title, not
  by the title text, because the same week gets reposted repeatedly with
  different labels. Only a week newer than one you already have is grabbed, and
  tiny packs are ignored. Torrent packs are left in your client to seed.
- Pack imports show progress under the queue's pack section, and results (imported / already owned / unmatched) are summarized in the logs and history.

## The Wanted page

**Sidebar → Wanted** lists every issue automation is going after — each series' [monitoring policy](collection#monitoring) plus the issues you picked by hand. Rows say why they're there (*picked* when you asked for one yourself), and each series shows its policy. The [wanted-search schedule](automation) works through this list automatically on a timer, in batches, so long backfills happen gradually without flooding your sources.

Switch the **All gaps** chip on to see every missing issue of every series, wanted or not — the honest "what don't I have" view — and want any of them with one click. Sort by series, newest or oldest release, or the series with the most (or fewest) wanted issues. Tick rows (shift-click selects a range) for the bulk bar: **Want**, **Don't want**, **Download selected**. Skipping a queued or failed issue takes it out of the queue.

## Weekly releases

Worth knowing before you go looking for a button: **the Releases view does not
download anything by itself.** The twice-daily check fetches the week's list and
matches it against your series by ComicVine id, with no fuzzy matching, and
caches each hit with its ship date. That ship date is what makes a brand-new
issue count as recent, and the new-releases search lane is what queues it. So an
issue appearing here is the start of the chain, not the end of it — leave it
alone and it gets picked up on the next pass.

The **Releases** section shows this week's new issues for series you monitor, with one-click grab for anything you don't have yet — and you can page back through previous weeks. Collected editions (trades, hardcovers, omnibuses) are hidden by default; the **Collections** chip shows them. Each row carries the ship date, cover date and the series' start year and volume, so same-named runs are easy to tell apart. A release the library doesn't track yet has **Add**; one the feed couldn't place on ComicVine has **Find**, which opens the Add search pre-filled with the name and year. Downloading a brand-new issue refreshes the series on its own when needed. A [scheduled job](automation) can check for new releases automatically and notify you, naming the first few issues; the series page shows **Next: #N · date** for the next issue on the list.
