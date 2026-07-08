# Your library

## Root folders

Root folders are the top-level directories where your comics live — local paths or network shares (`\\NAS\comics`, `/mnt/comics`). BackIssue files downloads into them (one folder per series) and scans them to know what you own. Add them in Settings; the first one is created by the setup wizard.

## Importing an existing collection

Coming from another collection manager, a hand-organized folder tree, or a pile of loose files? **Sidebar → Import**:

1. Point the scan at a folder (defaults to your root folders).
2. BackIssue walks it, reads every comic archive (including any embedded metadata), and proposes a **match** for each series folder against ComicVine.
3. Confident matches import automatically; ambiguous ones become **candidates** you confirm or re-pick with a couple of clicks; anything unrecognizable is listed for manual handling.
4. Imported files are indexed as owned — the series' missing counts update immediately.

Import never moves or renames your files unless you later run the rename tool.

## How files are recognized

The scanner reads real file contents, not just names:

- Archive type is sniffed from **magic bytes** — a RAR misnamed `.cbz` (or vice versa) is still read correctly.
- Embedded `ComicInfo.xml` metadata is used when present and sane.
- Filenames are parsed for series / issue number / year as a fallback, with the same strict matcher used for downloads.
- Files linked to a ComicVine issue update the owned/missing math; unlinkable files are flagged rather than guessed at.

## Tagging and naming

- Every downloaded issue gets **ComicVine metadata embedded** as `ComicInfo.xml` (series, number, title, date, summary, creators) — the standard read by comic readers and library servers.
- Folder layout and filenames follow your **naming patterns** (below). The defaults — `Publisher/Series (Year)` folders and `Series VYYYY #NNN` filenames — are unambiguous, sortable, and parseable by other library managers.
- CBRs are converted to CBZ on the way in (solid-archive-safe, pages stored without recompression), because CBZ is what tagging and readers handle best.

Existing files you imported keep their names until you opt into renaming (below).

## Naming patterns

**Settings → Library → File organization** — you decide how comics are organized on disk, with two token patterns and a live example that updates as you type:

- **Folder pattern** — the series folder under a root. Default: `{publisher}/{series} ({year})`. Use `/` for sub-folders.
- **File pattern** — the issue filename. Default: `{series} V{year} #{issue}`.

| Token | Fills with |
|---|---|
| `{publisher}` | Publisher name |
| `{series}` | Series title (any trailing year marker removed) |
| `{year}` | The volume's start year |
| `{issue}` | Issue number, zero-padded to 3 — `{issue:2}` sets the width |
| `{issueTitle}` | The issue's title |
| `{date}` | Cover date as "Month YYYY" |
| `{edition}` | Detected special editions (Annual, TPB, …) |

A token with no value simply drops out and the spacing tidies itself — `{series} V{year}` with no known year renders as just the series. Blank patterns use the defaults.

Two things to know:

- Changing patterns affects **new downloads**; existing files stay put until you explicitly reorganize (below).
- **Rename downloaded files** (a toggle in the same section, on by default): turn it off and completed downloads keep the source's original release filename, still filed into the comic's folder.

## Applying patterns to existing files

Always explicit, never automatic:

- **One series** — the volume page's **⋯ → Rename files** moves/renames that series' files to match your patterns (a confirm shows the count first).
- **Whole library** — **Tools → Reorganize library**. **Preview** first: a dry run shows what would move, grouped by destination folder, with counts for already-matching files and name collisions. **Reorganize** then runs as a background job with live progress (also visible on the Jobs page) — a big library on a NAS takes a while, and the app stays fully usable during it.

Safety rules for both: only ComicVine-matched series are touched, name collisions are skipped (never overwritten), files never leave their root folder, and emptied folders are cleaned up.

## The Tools page

**Sidebar → Tools** — library-wide maintenance, each with live progress:

| Tool | What it does |
|---|---|
| **Scan entire library** | Re-walk every root folder: index new files, drop records of deleted ones |
| **Tag all untagged files** | Embed ComicVine metadata into every owned file that lacks it (converts CBR as needed) |
| **Convert all CBR → CBZ** | Repack every `.cbr` so the whole library is consistently taggable |
| **Remove duplicate files** | Delete old/corrupt copies that a good copy of the same issue has replaced |
| **Verify archives** | Deep-check every file for corruption; prune records for files gone from disk |
| **Re-link to ComicVine** | Re-map owned files to CV issues across the library (fixes owned/missing counts after big changes) |
| **Rename files to pattern** | Rename every CV-linked file to your [file pattern](#naming-patterns), in place (same folder) — collisions are skipped, nothing is overwritten |
| **Reorganize library** | Move **and** rename every matched series' files to your folder + file patterns — dry-run preview first, then a background job with progress. See [Applying patterns to existing files](#applying-patterns-to-existing-files) |
| **Back up database** | Snapshot `catalog.db` into `backups/` (keeps the newest 5); safe while the app runs |

**Restoring a backup:** stop the app, copy the snapshot over `catalog.db`, start again.

## Corrupt files

Verification flags unreadable archives as **corrupt** (visible as a series badge and under the Problems filter). Redownloading an issue replaces the bad file; the duplicate-removal tool cleans up superseded bad copies afterwards.
