# Reading

The **Reader plugin** turns BackIssue into a full in-browser comic reader — no separate app needed. It reads your owned CBZ/CBR files directly, remembers where you left off, and keeps everyone's history separate.

## Opening a comic

Any owned issue shows a **read** button (▶) — on the issue rows and in the issue's information panel. Reading state appears right on the rows:

- **▶** not started · **◐** in progress · **✓** finished

Open an issue and the reader takes over full-screen.

## Reading shelves

The top of the **Library** greets readers with horizontal cover shelves — pick up where you left off without hunting:

| Shelf | Shows | Default |
|---|---|---|
| **Continue reading** | Issues you're mid-way through, newest first, with a progress bar | on |
| **Next up** | The next unread issue in each series you've finished one of | on |
| **New in your library** | Recently-added issues you haven't read yet | on |
| **Read later** | Your saved-for-later shelf | off |
| **Recently finished** | Issues you just completed | off |
| **Start a new series** | The first issue of owned series you've never opened | off |
| **Bookmarks** | Bookmarked issues — opens at the saved page | off |

Shelves are **per user**: hide one with its **×**, and turn any on or off under **Profile → Reading shelves**. A shelf with nothing to show simply doesn't appear.

## Reading modes

- **Paged** — one page at a time (the default).
- **Double** — two-page spreads, with an adjustable spread offset so covers sit right.
- **Webtoon** — continuous vertical scroll, for long-strip comics.
- **Right-to-left** — for manga; page turns reverse.
- Plus zoom/fit controls, white-border trimming for scans, and a data-saver mode that downscales pages.

## Guided panel reading

Press **G** in the reader to read panel by panel — the view zooms each panel in reading order with everything else dimmed, and admins can hand-correct any page's layout in a built-in editor. See [Guided panel reading](guided-reading) for the full story, including the shared layout cache.

## Progress, resume & bookmarks

- **Resume** — the reader saves your page as you go; reopen an issue and it picks up where you stopped. Finishing an issue marks it read.
- **Continue reading** — a sidebar entry lists your recently-read, unfinished issues with a thumbnail and progress, so you can jump straight back in.
- **Continue on a series** — a series page shows a "Continue #N (x/y read)" banner that opens the next issue to read.
- **Bookmarks** — mark any page and jump between marks.
- **Mark read / unread** — set an issue's state by hand (handy for backfilling series you read years ago).

## Per-series reading profiles

Your mode choices (paged/double/webtoon, RTL, fit) are remembered **per series** — so a manga series stays right-to-left webtoon while your US books stay single-page, without re-setting anything.

## Reading defaults

**Profile → Reading defaults** sets how comics open when a series has no saved profile of its own:

- **Default layout** (single / double / webtoon), **page fit**, and **right-to-left**.
- **Eye comfort** — a colour filter: invert (dark), grayscale (e-ink), or sepia.
- **Data saver** (lighter pages) and **trim page margins** (crops white scan borders).
- **Keep the screen awake while reading** — stops the device dimming mid-page. Needs HTTPS (browsers only allow it on secure origins), so the toggle appears only where it can work.
- **Always read incognito** — nothing is recorded (no progress, history, or stats) until you turn it off; the header's incognito button flips the same switch.
- **Count as read at** — when an issue latches as *finished*: the last page (default), or 95/90/85/80% — so skipping ads at the back still counts.

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
