# Reading

The **Reader plugin** turns BackIssue into a full in-browser comic reader — no separate app needed. It reads your owned CBZ/CBR files directly, remembers where you left off, and keeps everyone's history separate.

## Opening a comic

Any owned issue shows a **read** button (▶). Reading state appears right on the issue rows:

- **▶** not started · **◐** in progress · **✓** finished

Open an issue and the reader takes over full-screen.

## Reading modes

- **Paged** — one page at a time (the default).
- **Double** — two-page spreads, with an adjustable spread offset so covers sit right.
- **Webtoon** — continuous vertical scroll, for long-strip comics.
- **Right-to-left** — for manga; page turns reverse.
- Plus zoom/fit controls, white-border trimming for scans, and a data-saver mode that downscales pages.

## Progress, resume & bookmarks

- **Resume** — the reader saves your page as you go; reopen an issue and it picks up where you stopped. Finishing an issue marks it read.
- **Continue reading** — a sidebar entry lists your recently-read, unfinished issues with a thumbnail and progress, so you can jump straight back in.
- **Continue on a series** — a series page shows a "Continue #N (x/y read)" banner that opens the next issue to read.
- **Bookmarks** — mark any page and jump between marks.
- **Mark read / unread** — set an issue's state by hand (handy for backfilling series you read years ago).

## Per-series reading profiles

Your mode choices (paged/double/webtoon, RTL, fit) are remembered **per series** — so a manga series stays right-to-left webtoon while your US books stay single-page, without re-setting anything.

## Reading stats

The sidebar's **Reading stats** shows your personal totals: pages read, issues finished, pages this month, a reading streak, a 30-day activity strip, and your most-finished series. Each account sees only its own numbers.

## Offline & install

The reader works offline for issues you've opened (a service worker caches pages), and BackIssue is installable to a phone or tablet home screen as a full-screen app.

## Reading lists

**Sidebar → Lists** — personal, ordered lists of issues, private to your account.

- **Build a list by hand** — from any volume page, select issues (or the whole series) and **"☰ Add to list"**. Reorder items with the up/down controls.
- **Import a ComicVine story arc** — search ComicVine story arcs (e.g. *Infinity Gauntlet*, *Blackest Night*) and import one: BackIssue pulls the arc's issues **in cover-date reading order**, across every series involved — ideal for crossovers that span multiple titles.
- Items you don't own show a **download** button; items whose volume isn't in your library yet show **"+ Add series"** to add it. A list tracks how many of its issues you own.

Reading lists are per-user, so your lists and their order are yours alone. Two people can work through the same imported arc independently.

## Reading on other apps (OPDS)

Prefer a native reader like Panels or Chunky? BackIssue also serves your library over **OPDS** — see [OPDS](opds).
