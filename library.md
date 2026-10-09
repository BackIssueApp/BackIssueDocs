---
description: "Import files you already own, control scanning, tagging and naming, and use the maintenance tools that keep a library tidy."
---

# Your library

## Libraries

The collection can be split into named **libraries** — say *Comics* and *Manga* — each with its own entry in the sidebar. Create them in **Settings → Library → Libraries**: a library has a name, a **type** that sets how its series behave (manga = chapter-style search and right-to-left reading defaults), and an optional **folder** — new downloads for that library file there instead of the default root.

- Move a series between libraries from its **⋯ menu**; it takes on the library's type.
- **Import** scans each library's folder too, and anything found under one joins that library automatically, typed correctly.
- A library can have its own **folder pattern** (e.g. just `{series}` for a manga tree without publisher folders) — blank uses the global pattern.
- Mark a library **Mature** to hide it — name, entry, and every series in it — from roles without the "View mature content" permission (e.g. a kids' account). Series moved in inherit the flag; moved out, they shed it.
- Deleting a library keeps all its series (they return to the default library) — nothing is removed from disk.
- With no libraries defined, the sidebar shows per-type entries automatically once a second type (e.g. manga) appears in the collection — explicit libraries simply take over when you create them.

<figure class="bi-ex" v-pre>
  <div class="bi-ex__frame" role="img" aria-label="Settings, Library, Libraries panel: a Comics library card with name, type, Mature checkbox, series count, two folders with the first marked Default, a per-library folder pattern and tag placement; below it a Manga library card">
    <h3 class="x-title">Libraries</h3>
    <p class="x-sub">Split the collection into named libraries — each shows as its own entry in the sidebar. A library's <b>type</b> sets how its series behave (manga = chapter-style search, right-to-left reading); its folders are where its comics are filed and scanned. Move series from a volume's ⋯ menu.</p>
    <div class="x-a-libcard">
      <div class="x-a-libcard__head">
        <span class="x-a-libcard__icon"><svg class="x-a-ico" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg></span>
        <span class="x-a-libcard__name">Comics</span>
        <span class="x-a-ctl x-a-select">Comics<svg class="x-a-ico" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></span>
        <span class="x-a-libcard__mature"><span class="x-a-cb"></span><span>Mature</span></span>
        <span class="x-a-libcard__count">412 series</span>
        <span class="x-a-x"><svg class="x-a-ico" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M10 11v6M14 11v6"/></svg></span>
      </div>
      <div class="x-a-rootlist">
        <div class="x-a-rootrow">
          <span class="x-a-ctl x-a-rootrow__path">/comics</span>
          <span class="x-a-rootrow__badge">Default</span>
          <span class="x-a-x"><svg class="x-a-ico" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg></span>
        </div>
        <div class="x-a-rootrow">
          <span class="x-a-ctl x-a-rootrow__path">\\NAS\comics-archive</span>
          <span class="x-a-linkbtn">Make default</span>
          <span class="x-a-x"><svg class="x-a-ico" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg></span>
        </div>
        <span class="x-a-linkbtn"><svg class="x-a-ico" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg> Add folder</span>
      </div>
      <div class="x-a-libcard__extras">
        <div class="x-field"><span class="x-label">Folder pattern</span><div class="x-input"><span class="x-a-placeholder">blank = global pattern</span></div></div>
        <div class="x-field"><span class="x-label">Tag placement</span><span class="x-a-ctl x-a-select">Global setting<svg class="x-a-ico" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></span></div>
      </div>
    </div>
    <div class="x-a-libcard">
      <div class="x-a-libcard__head">
        <span class="x-a-libcard__icon"><svg class="x-a-ico" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg></span>
        <span class="x-a-libcard__name">Manga</span>
        <span class="x-a-ctl x-a-select">Manga<svg class="x-a-ico" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></span>
        <span class="x-a-libcard__mature"><span class="x-a-cb"></span><span>Mature</span></span>
        <span class="x-a-libcard__count">38 series</span>
        <span class="x-a-x"><svg class="x-a-ico" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M10 11v6M14 11v6"/></svg></span>
      </div>
      <div class="x-a-rootlist">
        <div class="x-a-rootrow">
          <span class="x-a-ctl x-a-rootrow__path">/manga</span>
          <span class="x-a-rootrow__badge">Default</span>
        </div>
      </div>
      <div class="x-a-libcard__extras">
        <div class="x-field"><span class="x-label">Folder pattern</span><div class="x-input">{series}</div></div>
      </div>
    </div>
  </div>
  <figcaption>
    Each library card holds its name, type, <b>Mature</b> flag and folders — the first folder is the <b>Default</b> where new downloads land.
    The Manga library here uses its own <code>{series}</code> folder pattern; Comics leaves it blank and follows the global one.
  </figcaption>
</figure>

A library's **type** decides how its contents behave. Comics and manga follow the ComicVine flow described here; **Books** and **Audiobooks** are self-described libraries with their own scanning, metadata and reading/listening — see [Books](ebooks) and [Audiobooks](audiobooks).

**Manga metadata and covers come from [MangaDex](https://mangadex.org), enriched by [AniList](https://anilist.co) and [MangaUpdates](https://www.mangaupdates.com).** MangaDex identifies the series and provides the cover, alternative titles, status, genres and the kind of book (manga, manhwa, manhua, webtoon); the series' own AniList and MangaUpdates ids are then followed for a curated summary, staff, end year and the publisher. Publication status and genres show on the series page and drive the Ongoing and Ended filters, as they do for comics. With a manga library, the Add dialog offers a **Search manga** toggle, and imports into manga folders match against the manga catalog automatically.

## Storage locations

Storage locations live on your **libraries** (above): each library's folder is where its comics are filed — local paths or network shares (`\\NAS\comics`, `/mnt/comics`) — and where scans look for what you own. Upgrading from an older version migrates automatically: your former default scan folder becomes a **Comics** library, and any extra scan folders each become a library of their own.

## Importing an existing collection

Coming from another collection manager, a hand-organized folder tree, or a pile of loose files? **Sidebar → Import**:

::: tip Coming from Mylar3 or Kapowarr?
The [Migration Assistant](migrate) reads their database directly and matches
every series by its ComicVine volume id, which is exact where a folder-name
scan can only guess. Do that first, then use Import for anything it leaves.
:::

1. Point the scan at a folder (defaults to your library folders).
2. BackIssue walks it and proposes a **match** for each series folder against ComicVine. Tagged libraries match best: when the embedded `ComicInfo.xml` (Mylar, ComicTagger, Kapowarr) carries a ComicVine id, the volume is matched exactly — otherwise the tagged series name, start year, and publisher drive the search; untagged files are matched from their folder names.
3. Confident matches import automatically; ambiguous ones become **candidates** you confirm or re-pick with a couple of clicks; anything unrecognizable is listed for manual handling.
4. Imported files are indexed as owned — the series' missing counts update immediately.

<figure class="bi-ex" v-pre>
  <div class="bi-ex__frame" role="img" aria-label="The Import library page after a scan: a summary of what was found, Needs review / Ready filters, and candidate rows with a strong match ready to import, a likely and a low-confidence match to confirm, and a folder with no ComicVine match">
    <div class="x-a-imp">
      <div class="x-a-imp__bar">
        <span class="x-a-btn x-a-btn--ghost"><svg class="x-a-ico" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5M12 19l-7-7 7-7"/></svg> Back</span>
        <span class="x-a-imp__title">Import library</span>
        <span class="x-a-imp__summary">46 found · 3 to review · 43 ready</span>
        <span class="x-a-btn x-a-btn--ghost"><svg class="x-a-ico" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a9 9 0 1 1-3-6.7L21 8"/><path d="M21 3v5h-5"/></svg> Scan for new</span>
        <span class="x-a-btn x-a-btn--ghost">Full rescan</span>
        <span class="x-a-btn x-a-btn--primary">Import 43</span>
      </div>
      <div class="x-a-imp__scroll">
        <p class="x-a-imp__intro">Scan your root folders for series not yet in the collection. Each is matched to ComicVine — confirm or fix the matches, then import. Files stay where they are.</p>
        <div><div class="x-a-filter">
          <span class="x-a-filter__btn x-a-filter__btn--on">All</span>
          <span class="x-a-filter__btn">Needs review</span>
          <span class="x-a-filter__btn">Ready</span>
          <span class="x-a-filter__btn">Skipped</span>
        </div></div>
        <div class="x-a-imp__list">
        <div class="x-a-irow x-a-irow--ready">
          <div class="x-a-cover">Pa</div>
          <div class="x-a-irow__info">
            <div class="x-a-irow__folder">Paper Girls <span class="x-a-muted">(2015)</span> <span class="x-a-muted">· 30 files</span></div>
            <div class="x-a-irow__match"><b>Paper Girls</b> <span class="x-a-muted">(2015)</span> <span class="x-a-conf x-a-conf--high">strong match</span></div>
            <div class="x-a-irow__path">/comics/Image/Paper Girls (2015)</div>
          </div>
          <div class="x-a-irow__actions"><span class="x-a-btn x-a-btn--sm x-a-btn--ghost">Change match</span><span class="x-a-btn x-a-btn--sm x-a-btn--ghost">Skip</span></div>
        </div>
        <div class="x-a-irow x-a-irow--review">
          <div class="x-a-cover">Ma</div>
          <div class="x-a-irow__info">
            <div class="x-a-irow__folder">Moon Knight <span class="x-a-muted">(2016)</span> <span class="x-a-muted">· 14 files</span></div>
            <div class="x-a-irow__match"><b>Moon Knight</b> <span class="x-a-muted">(2016)</span> <span class="x-a-conf x-a-conf--med">likely</span></div>
            <div class="x-a-irow__path">/comics/Marvel/Moon Knight/v2016</div>
          </div>
          <div class="x-a-irow__actions"><span class="x-a-btn x-a-btn--sm x-a-btn--primary">Confirm</span><span class="x-a-btn x-a-btn--sm x-a-btn--ghost">Change match</span><span class="x-a-btn x-a-btn--sm x-a-btn--ghost">Skip</span></div>
        </div>
        <div class="x-a-irow x-a-irow--review">
          <div class="x-a-cover">Th</div>
          <div class="x-a-irow__info">
            <div class="x-a-irow__folder">The Walking Dead <span class="x-a-muted">· 193 files</span></div>
            <div class="x-a-irow__match"><b>The Walking Dead Deluxe</b> <span class="x-a-muted">(2020)</span> <span class="x-a-conf x-a-conf--low">low confidence</span></div>
            <div class="x-a-irow__path">/comics/Walking Dead</div>
          </div>
          <div class="x-a-irow__actions"><span class="x-a-btn x-a-btn--sm x-a-btn--primary">Confirm</span><span class="x-a-btn x-a-btn--sm x-a-btn--ghost">Change match</span><span class="x-a-btn x-a-btn--sm x-a-btn--ghost">Skip</span></div>
        </div>
        <div class="x-a-irow x-a-irow--review">
          <div class="x-a-irow__none">?</div>
          <div class="x-a-irow__info">
            <div class="x-a-irow__folder">Scans misc <span class="x-a-muted">· 7 files</span></div>
            <div class="x-a-irow__match x-a-irow__match--none">No ComicVine match <span class="x-a-conf x-a-conf--none">will import unmatched</span></div>
            <div class="x-a-irow__path">/comics/Scans misc</div>
          </div>
          <div class="x-a-irow__actions"><span class="x-a-btn x-a-btn--sm x-a-btn--primary">Confirm</span><span class="x-a-btn x-a-btn--sm x-a-btn--ghost">Change match</span><span class="x-a-btn x-a-btn--sm x-a-btn--ghost">Skip</span></div>
        </div>
        </div>
      </div>
    </div>
  </div>
  <figcaption>
    A <b>strong match</b> is ready to import as is; <b>likely</b> and <b>low confidence</b> matches wait for <b>Confirm</b> or <b>Change match</b>,
    and a folder with no match can still come in unmatched. <b>Import</b> takes everything ready in one go.
  </figcaption>
</figure>

Import never moves or renames your files unless you later run the rename tool.

Supported layouts: a flat `Series/` tree, the default `Publisher/Series (Year)/`,
and Mylar-style `Publisher/Series/Volume/` trees (e.g. `Marvel/X-Men/v2004`) —
when a folder is only a volume marker (`v2004`, `Vol. 3 (1999)`), the series
name is read from the folder above it, and each volume folder is matched to its
own ComicVine volume.

## How files are recognized

The scanner reads real file contents, not just names:

- Archive type is sniffed from **magic bytes** — a RAR misnamed `.cbz` (or vice versa) is still read correctly.
- Embedded `ComicInfo.xml` metadata is used when present and sane.
- Filenames are parsed for series / issue number / year as a fallback, with the same strict matcher used for downloads.
- Files linked to a ComicVine issue update the owned/missing math; unlinkable files are flagged rather than guessed at.

## Tagging and naming

- Every downloaded issue gets **ComicVine metadata** as `ComicInfo.xml` (series, number, title, date, summary, creators, characters, teams, locations, story arc and page count) — the standard read by comic readers and library servers. Characters and arcs come from ComicVine where it has them and from Metron otherwise, which for anything published before about 1980 is nearly always.
- **Tag placement** decides where that XML lives. *Embedded* (the default) writes it into the archive. *Sidecar* writes it to a `.xml` file next to the archive — the archive itself is never modified, so its bytes stay identical for torrent seeding and file-share hashing, and `.cbr` files stay `.cbr`. Set it globally in Settings → Metadata, or per library (a seeding library can use sidecars while the rest embed). When a file has both, the sidecar wins.
- Folder layout and filenames follow your **naming patterns** (below). The defaults — `Publisher/Series (Year)` folders and `Series VYYYY #NNN` filenames — are unambiguous, sortable, and parseable by other library managers. Sidecar files are renamed, moved, and deleted together with their archive.
- With embedded placement, CBRs are converted to CBZ on the way in (solid-archive-safe, pages stored without recompression), because CBZ is what embedding and readers handle best. Sidecar placement skips the conversion — originals are left untouched.

Existing files you imported keep their names until you opt into renaming (below).

## Naming patterns

**Settings → Library → File organization** — you decide how comics are organized on disk, with two token patterns and a live example that updates as you type:

- **Folder pattern** — the series folder under a root. Default: `{publisher}/{series} ({year})`. Use `/` for sub-folders.
- **File pattern** — the issue filename. Default: `{series} V{year} #{issue}`.

<figure class="bi-ex" v-pre>
  <div class="bi-ex__frame" role="img" aria-label="Settings, Library, File organization panel with a custom file pattern and its live example path">
    <h3 class="x-title">File organization</h3>
    <p class="x-sub">How downloaded comics are named and filed.</p>
    <div class="x-card">
      <div class="x-field">
        <span class="x-label">Folder pattern</span>
        <div class="x-input">{publisher}/{series} ({year})</div>
      </div>
      <div class="x-field">
        <span class="x-label">File pattern <span class="x-pin">1</span></span>
        <div class="x-input x-input--focus">{series} V{year} #{issue} ({date:m}-{date:y})</div>
      </div>
      <p class="x-preview">DC Comics/Batman (2011)/Batman V2011 #001 (11-2011).cbz <span class="x-pin">2</span></p>
      <div class="x-check">
        <span class="x-switch" aria-hidden="true"></span>
        <span>Rename downloaded files to the file pattern (off = keep the source's original filename)</span>
      </div>
      <p class="x-note">Changing these affects <b>new</b> downloads — for existing files use <b>Reorganize library</b> on the Tools page.</p>
    </div>
  </div>
  <figcaption>
    <span class="x-pin">1</span> A custom file pattern that appends the cover date.
    <span class="x-pin">2</span> The live example updates as you type — it always renders
    <b>Batman (2011) #1</b>, cover-dated November 2011, so you can compare patterns like for like.
  </figcaption>
</figure>

| Token | Fills with |
|---|---|
| `{publisher}` | Publisher name |
| `{series}` | Series title (any trailing year marker removed) |
| `{year}` | The volume's start year |
| `{issue}` | Issue number, zero-padded to 3 — `{issue:2}` sets the width |
| `{issueTitle}` | The issue's title |
| `{date}` | Cover date as "November 2011" — see the formats below |
| `{edition}` | Detected special editions (Annual, TPB, …) |

### Date formats

`{date}` writes the cover date as "November 2011". A modifier gives you the
parts on their own, for libraries that file by number:

| Token | Renders |
|---|---|
| `{date}` | November 2011 |
| `{date:m}` | `11` — month number, always two digits |
| `{date:y}` | `2011` |
| `{date:mon}` | Nov |

Combine them with whatever separator you use. `{series} V{year} #{issue} ({date:m}-{date:y})` gives:

```
Batman V2011 #001 (11-2011).cbz
```

and `({date:y}-{date:m})` gives `(2011-11)`, `({date:mon} {date:y})` gives
`(Nov 2011)`. The month keeps its leading zero, so March files as `03`, not `3`,
and sorts correctly beside the rest of the year.

A modifier the app doesn't recognise falls back to the full "November 2011"
form rather than rendering nothing, so a typo cannot quietly strip the date out
of every filename.

### When a token is empty

A token with no value simply drops out and the spacing tidies itself — `{series} V{year}` with no known year renders as just the series. Blank patterns use the defaults.

This extends to the punctuation around it. An issue with no cover date renders
`({date:m}-{date:y})` as nothing at all, rather than leaving an orphaned `(-)`
in the filename. Downloads often have no cover date at the moment they are
filed, which is why the default file pattern carries no date token at all — a
freshly downloaded issue and the same issue after a re-file would otherwise
disagree, and the reorganizer would churn.

Two things to know:

- Changing patterns affects **new downloads**; existing files stay put until you explicitly reorganize (below).
- **Rename downloaded files** (a toggle in the same section, on by default): turn it off and completed downloads keep the source's original release filename, still filed into the comic's folder.

## Applying patterns to existing files

Always explicit, never automatic:

- **One series** — the volume page's **⋯ → Rename files** moves/renames that series' files to match your patterns (a confirm shows the count first).
- **Whole library** — **System → Tools → Reorganize library**. **Preview** first: a dry run shows what would move, grouped by destination folder, with counts for already-matching files and name collisions. **Reorganize** then runs as a background job with live progress (also visible under **System → Jobs**) — a big library on a NAS takes a while, and the app stays fully usable during it.

Safety rules for both: only ComicVine-matched series are touched, name collisions are skipped (never overwritten), files never leave their library folder, and emptied folders are cleaned up.

## Library tools

**System → Tools** — library-wide maintenance, each with live progress:

| Tool | What it does |
|---|---|
| **Scan entire library** | Re-walk every library folder: index new files, drop records of deleted ones |
| **Tag all untagged files** | Embed ComicVine metadata into every owned file that lacks it (converts CBR as needed) |
| **Convert all CBR → CBZ** | Repack every `.cbr` so the whole library is consistently taggable |
| **Unwrap nested archives** | Fix comics packaged as a `.cbz` that holds a `.cbr` instead of pages: lifts the inner archive's pages to the top level, in place, keeping the ComicInfo. Anything it cannot prove is left untouched |
| **Remove duplicate files** | Delete old/corrupt copies that a good copy of the same issue has replaced |
| **Verify archives** | Deep-check every file for corruption; prune records for files gone from disk |
| **Refresh series metadata** | Re-pull every matched series' volume details and issue list — picks up publication status (Ongoing / Ended), enrichment for series cached before it was on, and issues published since. One request a second; stops cleanly if the service rate-limits (run again to finish) |
| **Re-link to ComicVine** | Re-map owned files to CV issues across the library (fixes owned/missing counts after big changes) |
| **Download issue metadata** | Fetch ComicVine detail (descriptions, credits, dates, covers) for every issue in your collection that's missing it — already-cached issues are skipped, and it stops cleanly if ComicVine rate-limits (re-run to finish) |
| **Rename files to pattern** | Rename every CV-linked file to your [file pattern](#naming-patterns), in place (same folder) — collisions are skipped, nothing is overwritten |
| **Reorganize library** | Move **and** rename every matched series' files to your folder + file patterns — dry-run preview first, then a background job with progress. See [Applying patterns to existing files](#applying-patterns-to-existing-files) |
| **Back up database** | Snapshot `catalog.db` into `backups/` (keeps the newest 5); safe while the app runs |

**Restoring a backup:** stop the app, copy the snapshot over `catalog.db`, start again.

## Stats

**Sidebar → Stats** is the read-only overview of what you actually have. Anyone
who can browse the library can open it, and it answers in one page the questions
that otherwise need a lot of clicking:

- **What it weighs.** Total size on disk, how many files are indexed, how many
  are valid versus corrupt, and how many carry embedded tags.
- **Format mix.** The split between CBZ, CBR, PDF and everything else — the
  quickest way to see whether a conversion pass is worth running.
- **By publisher.** Series, issues, files and size per publisher, largest first.
- **Completion.** How many series are complete, how many have holes, and how
  many issues are missing overall. **Biggest gaps** names the dozen series
  missing the most, which is usually where a backfill should start.
- **Metadata health.** How many series are matched, how many files are linked to
  an issue, and how deep the metadata cache runs. Unmatched or unlinked counts
  climbing is the early warning that a scan or re-link is due.
- **Downloads.** What is in progress, imported and failed, activity over the
  last fortnight, and the most recent imports.

Figures are cached for a minute, so the page is cheap to leave open.

One thing to know before you reconcile numbers: for a role that cannot see
mature series, those series are left out of **Biggest gaps** and the recent
imports, but the headline totals are not filtered. The totals can therefore
exceed what that account is able to browse.

## Corrupt files

Verification flags unreadable archives as **corrupt** (visible as a series badge and under the Problems filter). Redownloading an issue replaces the bad file; the duplicate-removal tool cleans up superseded bad copies afterwards.
