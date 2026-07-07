# Downloads

## The pipeline

When an issue is queued, a download worker takes it through four steps:

1. **Find** — each enabled source is asked, in your [priority order](sources#source-priority), whether it can serve this issue. The first confident match wins. Matching is strict about series name and issue number (aliases included), so *Spider-Man* never grabs *Amazing Spider-Man*.
2. **Fetch** — the winning source downloads the file. *Immediate* sources download in-app with live byte/speed progress; *deferred* sources (Usenet, torrents) hand off to your download client and a background monitor picks the file up when the client finishes.
3. **Convert & tag** — the file's real format is detected from its bytes (mislabeled files are common). CBRs are repacked to CBZ, and ComicVine metadata is embedded as `ComicInfo.xml`.
4. **File** — the finished CBZ is named `Series VYYYY #NNN (Month YYYY).cbz` and placed in the series folder, and the issue flips to *owned*.

Several workers run in parallel (see `downloadConcurrency` in the [settings reference](settings-reference)), so a big batch downloads from multiple sources at once.

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

## The Queue

The **Queue** section shows the whole pipeline live. Every downloading item has **its own progress bar** and phase label, so concurrent downloads are each visible:

- **Searching…** — looking through your sources for a match (this step can take a few seconds, especially for peer-to-peer sources).
- **Downloading** — with page/byte progress and speed, or a percentage and seeders for torrents.
- **Importing / Tagging** — converting, embedding metadata, and filing.

You can **pause and resume** the whole queue, **retry** or **clear** failed items, and **cancel** individual downloads. If the app restarts mid-download, the queue resumes on its own.

## Manual searches

Sometimes you want to pick the exact release yourself:

- **Search sources** (on any issue) queries *every* enabled source at once and shows a single ranked list — release name, size, source badge, and quality signals. Pick one and it downloads through the normal pipeline, bypassing automatic selection.
- Your pick is **pinned** to that issue: the queue uses your chosen release rather than re-searching.

## Packs

Multi-issue collections ("packs") are the fastest way to fill a mostly-empty series.

- **Search packs** (on a series) asks every pack-capable source for collections related to the series and shows them in one list.
- Grabbing a pack downloads it, then walks its contents **issue-by-issue against your collection**: missing issues are imported, tagged, and filed; issues you already own are skipped. A pack never overwrites what you have.
- Only listings that actually contain multiple issues are treated as packs (a trade paperback is not a pack).
- Pack imports show progress under the queue's pack section, and results (imported / already owned / unmatched) are summarized in the logs and history.

## The Wanted page

**Sidebar → Wanted** lists every missing issue across every monitored series — your global gap list. From there you can queue individual issues or batches. The [wanted-search schedule](automation) works through this list automatically on a timer, in batches, so long backfills happen gradually without flooding your sources.

## Weekly releases

The **Releases** section shows this week's new issues for series you monitor, with one-click grab for anything you don't have yet — and you can page back through previous weeks. A [scheduled job](automation) can check for new releases automatically and notify you.
