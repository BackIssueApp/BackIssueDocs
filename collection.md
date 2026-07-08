# Managing your collection

## Adding a series

Click **+ Add** on the Library page and search ComicVine by name. Pick the right volume (covers, year, publisher, and issue counts are shown to disambiguate — "X-Men" has *many* volumes) and it's added with its full issue list.

By default, adding a volume **immediately queues its missing issues to download**. If you'd rather add series empty and choose when to fetch, turn off **Settings → Downloading → "Download on add"**. Either way you can still download per issue, per series, or via [automation](automation) later.

You can also add series from the **Discover** feed or the **Requests** queue — see [Discover](discover) and [Requests](requests).

## ComicVine matching

Everything in BackIssue hangs off a series' link to its ComicVine volume — the issue list, cover art, publisher, and metadata for tagging.

- Series you add by search are matched from the start.
- Series discovered by [importing an existing library](library) need matching: the **◆ Match CV** button runs the matcher across every unmatched series. Confident matches link automatically; ambiguous ones wait for you to pick from candidates.
- A series with no match shows a **needs ComicVine match** badge and the **No CV** filter collects them.
- Matched the wrong volume? Open the series and re-pick — the matcher can be overridden manually per series.

## The Library view

The **Library** section lists every series you track. Toggle between a **poster grid** (⊞) and a **dense list** (≣) at the top right — the list adds publisher, year, download activity, the latest issue's date, and size on disk per row.

Each series shows its cover, title, **owned/total** count, and badges:

| Badge | Meaning |
|---|---|
| `N missing` | Issues you don't own yet |
| `complete` | You own every issue |
| `N untagged` | Owned files without embedded ComicVine metadata |
| `N corrupt` | Files that failed archive verification |
| `◆ CV` | Matched to ComicVine (hover for the volume name/year) |
| `no source` | No download source has been able to serve this series yet |

**Filters** — All, Incomplete, Unmonitored, Problems (corrupt/untagged), No CV.
**Sort** — A–Z, recently added, most missing.
**Search** — instant filter-as-you-type.

Filters, search, and sort are all kept in the URL, and they stay put while you open series or other sections.

## The series page

Opening a series shows its full ComicVine issue list with ownership state per issue:

- **Download** a single missing issue, or **Download missing** for the whole series.
- **Redownload** an owned issue (deletes the current file and fetches a fresh copy — used for upgrading a bad scan).
- **Search sources** on any issue for a *manual* pick: results from every enabled source in one ranked list, labelled by source — you choose exactly which release to grab. See [Downloads](downloads).
- **Search packs** looks for multi-issue collections covering your gaps — see [Packs](downloads#packs).
- Issue rows support **shift-click** to select ranges for bulk download.
- **Read** an owned issue in the browser (▶), or **add issues to a reading list** ("☰ Add to list") — see [Reading](reading).
- Series-level actions include tagging all files, cleaning up duplicates, **renaming the series' files to your [naming patterns](library#naming-patterns)** (⋯ → Rename files), editing search aliases (extra names the series is known by on indexers), and setting a custom folder.

Download and management buttons only appear for roles holding those permissions — a viewer sees the read buttons and nothing else ([Users & access](users#roles)).

The list toggles between a **cover grid** and a detailed row list; the list view shows each issue's cover date, page count, file size, and format at a glance.

## Editing metadata

Trusted users can hand-edit metadata anywhere it's wrong or missing:

- **Series** — ⋯ → **Edit metadata…** on the series page: title, publisher, imprint, years, publication status, content rating, series type, genres, and description.
- **Issues** — the **Edit** button in an issue's details: title, number, dates, content rating, cover price, UPC, ISBN, and description.

Edited fields are **yours**: metadata refreshes, ComicVine matching, and enrichment never overwrite them. Each editor shows **Reset all edits** when edits exist — resetting drops your changes and the next refresh restores the source values. A hand-edited content rating also owns the mature-flag decision: automatic flagging won't override it.

## Monitoring

The star on each series toggles **monitored**. Monitored series are:

- included in the weekly **Releases** view and its scheduled check,
- included when scheduled searches fetch missing issues automatically.

Unmonitored series keep their files and stats — they're just excluded from automation.

## Bulk actions

The ☑ button in the Library header switches to multi-select. Select any number of series and:

- **★ Follow / ☆ Unfollow** — toggle monitoring en masse
- **⤓ Missing** — queue every missing issue of the selected series
- **Remove** — drop the series from the collection (files on disk are *never* touched)
