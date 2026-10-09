---
description: "Add series, match them to ComicVine, set what gets monitored, and use bulk actions to reshape a large collection."
---

# Managing your collection

## Adding a series

Click **+ Add** on the Library page and search ComicVine by name. Pick the right volume (covers, year, publisher, and issue counts are shown to disambiguate — "X-Men" has *many* volumes) and it's added with its full issue list.

Know exactly which volume you want? Paste its **ComicVine URL** or type **`cv:` and the volume id** (e.g. `cv:166619` — the number after `4050-` in any ComicVine volume URL) into the same search box, and that volume comes up directly. It's the sure route when a name search is crowded or a brand-new series hasn't ranked yet.

By default, adding a volume **immediately queues its missing issues to download**. If you'd rather add series empty and choose when to fetch, turn off **Settings → Downloading → "Download on add"**. If you mostly add series *for one issue* — from a reading list, a release, or a CBL import — turn on **"Only the issues that were asked for"** and those adds download just the issues in question, while adding from the Library or Discover still fetches the whole run. Either way you can still download per issue, per series, or via [automation](automation) later.

<figure class="bi-ex" v-pre>
  <div class="bi-ex__frame" role="img" aria-label="The Add a series dialog searching ComicVine for X-Men: several volumes with year, publisher and issue count, one already in the library and one just added with its issues queued">
    <div class="x-a-addx">
      <div class="x-a-addx__head">
        <div class="x-a-addx__icon"><svg class="x-a-ico" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg></div>
        <div class="x-a-addx__titles">
          <div class="x-a-addx__title">Add a series</div>
          <div class="x-a-addx__sub">Search ComicVine and start tracking it</div>
        </div>
        <span class="x-a-addx__x"><svg class="x-a-ico" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg></span>
      </div>
      <div class="x-a-addx__switchrow">
        <div class="x-a-addx__switch">
          <span class="x-a-addx__seg x-a-addx__seg--on"><svg class="x-a-ico" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg> Comics</span>
          <span class="x-a-addx__seg"><svg class="x-a-ico" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg> Manga</span>
        </div>
      </div>
      <div class="x-a-addx__search">
        <svg class="x-a-ico" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.35-4.35"/></svg>
        <div class="x-a-addx__input">x-men</div>
      </div>
      <div class="x-a-addx__results">
        <div class="x-a-addx__row">
          <div class="x-a-cover">XM</div>
          <div class="x-a-addx__info">
            <div class="x-a-addx__name"><span class="x-a-addx__link">X-Men</span> <span class="x-a-addx__year">(1991)</span></div>
            <div class="x-a-addx__meta">Marvel · 279 issues</div>
          </div>
          <span class="x-a-addx__btn x-a-addx__btn--add">Add</span>
        </div>
        <div class="x-a-addx__row">
          <div class="x-a-cover">XM</div>
          <div class="x-a-addx__info">
            <div class="x-a-addx__name"><span class="x-a-addx__link">X-Men</span> <span class="x-a-addx__year">(2010)</span></div>
            <div class="x-a-addx__meta">Marvel · 41 issues</div>
          </div>
          <span class="x-a-addx__btn x-a-addx__btn--add">Add</span>
        </div>
        <div class="x-a-addx__row x-a-addx__row--dim">
          <div class="x-a-cover">XM</div>
          <div class="x-a-addx__info">
            <div class="x-a-addx__name"><span class="x-a-addx__link">X-Men</span> <span class="x-a-addx__year">(2019)</span></div>
            <div class="x-a-addx__meta">Marvel · 21 issues</div>
          </div>
          <span class="x-a-addx__btn x-a-addx__btn--ghost">In library <span class="x-pin">2</span></span>
        </div>
        <div class="x-a-addx__row">
          <div class="x-a-cover">XM</div>
          <div class="x-a-addx__info">
            <div class="x-a-addx__name"><span class="x-a-addx__link">X-Men</span> <span class="x-a-addx__year">(2021)</span></div>
            <div class="x-a-addx__meta">Marvel · 35 issues</div>
          </div>
          <span class="x-a-addx__btn x-a-addx__btn--done">Added — 35 queued <span class="x-pin">1</span></span>
        </div>
      </div>
    </div>
  </div>
  <figcaption>
    Every volume ComicVine returns is listed — year, publisher and issue count tell the X-Men runs apart.
    <span class="x-pin">1</span> With <b>Download on add</b> on, the button reports how many issues were queued.
    <span class="x-pin">2</span> A volume you already track says so and opens the series instead.
  </figcaption>
</figure>

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

<figure class="bi-ex" v-pre>
  <div class="bi-ex__frame" role="img" aria-label="The Library in list view: five series rows with publisher, missing, complete, downloading, untagged, corrupt and needs-match badges, owned over total, latest issue date and size on disk">
    <div class="x-a-libx">
      <div class="x-a-libx__bar">
        <span class="x-a-libx__count">Library <span>214</span></span>
        <span class="x-a-libx__chip x-a-libx__chip--on">All</span>
        <span class="x-a-libx__chip">Incomplete<span class="x-a-libx__chipcount">87</span></span>
        <span class="x-a-libx__chip">Problems<span class="x-a-libx__chipcount">6</span></span>
        <span class="x-a-libx__chip">Unmatched<span class="x-a-libx__chipcount">3</span></span>
        <div class="x-a-libx__view">
          <span class="x-a-libx__viewbtn"><svg class="x-a-ico" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg></span>
          <span class="x-a-libx__viewbtn x-a-libx__viewbtn--on"><svg class="x-a-ico" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg></span>
        </div>
      </div>
      <div class="x-a-list">
        <div class="x-a-list__head"><span></span><span>Title</span><span>Progress</span><span>Latest</span><span class="x-a-right">Size</span><span></span></div>
        <div class="x-a-lrow">
          <div class="x-a-cover">SA</div>
          <div class="x-a-lrow__main">
            <div class="x-a-lrow__title">Saga<span class="x-a-lrow__year"> (2012)</span></div>
            <div class="x-a-lrow__badges"><span class="x-a-lrow__pub">Image</span><span class="x-a-lb x-a-lb--busy">1 downloading</span><span class="x-a-lb x-a-lb--miss">9 missing</span><span class="x-a-lb x-a-lb--warn">1 corrupt</span></div>
          </div>
          <div><span class="x-a-lrow__nums">63/72</span><span class="x-a-lrow__track"><span class="x-a-lrow__fill" style="width:88%"></span></span></div>
          <span class="x-a-lrow__dim">2026-09-01</span>
          <span class="x-a-lrow__dim x-a-right">4.1 GB</span>
          <span class="x-a-lrow__star x-a-lrow__star--on"><svg class="x-a-ico" width="15" height="15" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14l-5-4.87 6.91-1.01z"/></svg></span>
        </div>
        <div class="x-a-lrow">
          <div class="x-a-cover">IH</div>
          <div class="x-a-lrow__main">
            <div class="x-a-lrow__title">Immortal Hulk<span class="x-a-lrow__year"> (2018)</span></div>
            <div class="x-a-lrow__badges"><span class="x-a-lrow__pub">Marvel</span><span class="x-a-lb x-a-lb--ok">complete</span><span class="x-a-lb x-a-lb--plain">3 untagged</span></div>
          </div>
          <div><span class="x-a-lrow__nums">50/50</span><span class="x-a-lrow__track"><span class="x-a-lrow__fill x-a-lrow__fill--done" style="width:100%"></span></span></div>
          <span class="x-a-lrow__dim">2021-01-01</span>
          <span class="x-a-lrow__dim x-a-right">3.6 GB</span>
          <span class="x-a-lrow__star"><svg class="x-a-ico" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14l-5-4.87 6.91-1.01z"/></svg></span>
        </div>
        <div class="x-a-lrow">
          <div class="x-a-cover">BA</div>
          <div class="x-a-lrow__main">
            <div class="x-a-lrow__title">Batman<span class="x-a-lrow__year"> (2016)</span></div>
            <div class="x-a-lrow__badges"><span class="x-a-lrow__pub">DC Comics</span><span class="x-a-lb x-a-lb--miss">12 missing</span><span class="x-a-lb x-a-lb--plain">new from #152</span></div>
          </div>
          <div><span class="x-a-lrow__nums">146/158</span><span class="x-a-lrow__track"><span class="x-a-lrow__fill" style="width:92%"></span></span></div>
          <span class="x-a-lrow__dim">2026-10-01</span>
          <span class="x-a-lrow__dim x-a-right">9.8 GB</span>
          <span class="x-a-lrow__star x-a-lrow__star--on"><svg class="x-a-ico" width="15" height="15" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14l-5-4.87 6.91-1.01z"/></svg></span>
        </div>
        <div class="x-a-lrow">
          <div class="x-a-cover">MO</div>
          <div class="x-a-lrow__main">
            <div class="x-a-lrow__title">Monstress<span class="x-a-lrow__year"> (2015)</span></div>
            <div class="x-a-lrow__badges"><span class="x-a-lrow__pub">Image</span><span class="x-a-lb x-a-lb--miss">18 missing</span><span class="x-a-lb x-a-lb--plain">not monitored</span></div>
          </div>
          <div><span class="x-a-lrow__nums">32/50</span><span class="x-a-lrow__track"><span class="x-a-lrow__fill" style="width:64%"></span></span></div>
          <span class="x-a-lrow__dim">2024-01-01</span>
          <span class="x-a-lrow__dim x-a-right">2.2 GB</span>
          <span class="x-a-lrow__star"><svg class="x-a-ico" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14l-5-4.87 6.91-1.01z"/></svg></span>
        </div>
        <div class="x-a-lrow">
          <div class="x-a-cover">HS</div>
          <div class="x-a-lrow__main">
            <div class="x-a-lrow__title x-a-lrow__title--unmatched">Hellboy scans</div>
            <div class="x-a-lrow__badges"><span class="x-a-lb x-a-lb--warn">needs match</span><span class="x-a-lrow__pub">4 files</span></div>
          </div>
          <div><span class="x-a-lrow__nums">4 files</span></div>
          <span class="x-a-lrow__dim">—</span>
          <span class="x-a-lrow__dim x-a-right">212 MB</span>
          <span></span>
        </div>
      </div>
    </div>
  </div>
  <figcaption>
    The dense list (≣): badges sit under each title, and the columns add owned/total, the newest issue's cover date and size on disk.
    A folder the matcher could not place shows <b>needs match</b> and a file count instead of progress.
  </figcaption>
</figure>

**Each card has an actions menu**, reached three ways: the **⋯ button** that appears when you hover it, a **right-click** anywhere on the card, or a **long press** on a touch screen. All three open the same menu, so you never have to open a series just to act on it:

- Open it, follow or unfollow, and download its missing issues.
- **Scan folder**, **Edit metadata**, **Rename files** and **Fix match** — the library-management actions that otherwise live on the series page.
- Its [monitoring policy](#monitoring), with the current one ticked.
- Remove it from the library.

The menu only offers what your role can actually do, and it leaves out what would not apply: an unmatched series offers **Match to ComicVine** rather than Fix match, and has no metadata to edit until it is matched.

**Filters** — All, Incomplete, Followed, Monitored, Not monitored, Ongoing, Ended (publication status from enriched metadata — run **Refresh series metadata** under System → Tools to fill it in for older series), Problems (corrupt/untagged), **Nothing downloaded**, Unmatched.

**Nothing downloaded** lists series with no file at all. That is what a bulk add leaves behind when the downloads fail, so it is the quick way to find and clear them: filter, **Select**, **Select all**, **Remove**. Removing takes them out of the collection and leaves any files on disk alone. A series whose only file is corrupt is not in this list — that one is under **Problems**, because it did download something.
**Sort** — A–Z, recently added, most missing.
**Search** — instant filter-as-you-type.

Filters, search, and sort are all kept in the URL, and they stay put while you open series or other sections.

## Collections

**Sidebar → Collections** shows the same library grid narrowed to **multi-volume
book and audiobook series** — box sets, numbered series, anything holding two or
more entries. Standalone titles are left out, so a shelf of hundreds of
individual books collapses to the handful of series worth browsing as a set.

It carries the same search, filters, sorting and view options as the Library
view, so it behaves like a saved perspective on the collection rather than a
separate screen.

The view only has something to narrow once you run a [Books](ebooks) or
[Audiobooks](audiobooks) library; with neither installed it simply shows
everything. For picking through a large book library by author, decade or
format instead, see [Shelves](shelves).

## The series page

Opening a series shows its full ComicVine issue list with ownership state per issue:

- **Download** a single missing issue, or **Download missing** for the whole series.
- **Redownload** an owned issue (deletes the current file and fetches a fresh copy — used for upgrading a bad scan).
- **Search sources** on any issue for a *manual* pick: results from every enabled source in one ranked list, labelled by source — you choose exactly which release to grab. See [Downloads](downloads).
- **Search packs** looks for multi-issue collections covering your gaps — see [Packs](downloads#packs).
- Issue rows support **shift-click** to select ranges for bulk download.
- **Read** an owned issue in the browser (▶), or **add issues to a reading list** ("☰ Add to list") — see [Reading](reading).
- Series-level actions include tagging all files, cleaning up duplicates, **renaming the series' files to your [naming patterns](library#naming-patterns)** (⋯ → Rename files), editing search aliases (extra names the series is known by on indexers), and setting a custom folder.

<figure class="bi-ex" v-pre>
  <div class="bi-ex__frame" role="img" aria-label="A series page for Saga (2012): header with publisher, issue count, monitoring tag and ComicVine link, a completion bar with its legend, the series actions, then issue rows showing saved, untagged, downloading, corrupt, missing and failed issues">
    <div class="x-a-sd">
      <div class="x-a-sd__head">
        <div class="x-a-cover">SA</div>
        <div class="x-a-sd__meta">
          <h3 class="x-a-sd__title">Saga</h3>
          <div class="x-a-sd__tags">
            <span class="x-a-tag">Image</span>
            <span class="x-a-tag x-a-tag--mono">72 issues</span>
            <span class="x-a-tag x-a-tag--all"><svg class="x-a-ico" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/></svg> Monitoring all issues</span>
          </div>
          <div class="x-a-sd__cv">
            <span class="x-a-cvchip"><svg class="x-a-ico" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2l10 10-10 10L2 12 12 2z"/></svg> Saga <span class="x-a-cvchip__year">(2012)</span> <svg class="x-a-ico" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg></span>
            <span class="x-a-cvtotal">72 issues on ComicVine</span>
          </div>
          <div class="x-a-comp">
            <div class="x-a-comp__top"><span class="x-a-comp__owned">63 of 72 owned</span><span class="x-a-comp__pct">88%</span></div>
            <div class="x-a-comp__bar"><div class="x-a-comp__seg--owned" style="width:87.5%"></div><div class="x-a-comp__seg--dl" style="width:1.4%"></div></div>
            <div class="x-a-comp__legend">
              <span class="x-a-comp__leg x-a-comp__leg--saved">61 saved</span>
              <span class="x-a-comp__leg x-a-comp__leg--dl">1 downloading</span>
              <span class="x-a-comp__leg x-a-comp__leg--miss">6 missing</span>
              <span class="x-a-comp__leg x-a-comp__leg--wanted">8 wanted</span>
              <span class="x-a-comp__leg x-a-comp__leg--bad">1 corrupt</span>
              <span class="x-a-comp__leg x-a-comp__leg--bad">1 failed</span>
              <span class="x-a-comp__leg x-a-comp__leg--untagged">2 untagged</span>
            </div>
          </div>
          <div class="x-a-sd__actions">
            <span class="x-a-btn x-a-btn--primary">Download missing (9)</span>
            <span class="x-a-btn x-a-btn--secondary x-a-btn--off">Download selected</span>
            <span class="x-a-btn x-a-btn--ghost"><svg class="x-a-ico" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/></svg> Add to list</span>
            <span class="x-a-btn x-a-btn--ghost"><svg class="x-a-ico" width="15" height="15" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14l-5-4.87 6.91-1.01z"/></svg> Following</span>
            <span class="x-a-btn x-a-btn--ghost">⋯</span>
          </div>
        </div>
      </div>
      <div class="x-a-issues">
        <div class="x-a-issues__head">
          <span class="x-a-checkall"><span class="x-a-cb"></span> <span>Select all</span></span>
          <div class="x-a-filter">
            <span class="x-a-filter__btn x-a-filter__btn--on">All<span class="x-a-filter__count">72</span></span>
            <span class="x-a-filter__btn">Missing<span class="x-a-filter__count">8</span></span>
            <span class="x-a-filter__btn">Wanted<span class="x-a-filter__count">8</span></span>
            <span class="x-a-filter__btn">Saved<span class="x-a-filter__count">63</span></span>
            <span class="x-a-filter__btn">Corrupt<span class="x-a-filter__count">1</span></span>
            <span class="x-a-filter__btn">Untagged<span class="x-a-filter__count">2</span></span>
            <span class="x-a-filter__btn">Failed<span class="x-a-filter__count">1</span></span>
          </div>
          <span class="x-a-find">find #…</span>
          <div class="x-a-vt"><span class="x-a-vt__btn"><svg class="x-a-ico" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg></span><span class="x-a-vt__btn x-a-vt__btn--on"><svg class="x-a-ico" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg></span></div>
          <span class="x-a-summary">72 issues · 63 owned · 8 missing · ⚠ 1 corrupt · 2 untagged</span>
        </div>
        <div class="x-a-ilist">
          <div class="x-a-issue x-a-issue--owned">
            <span class="x-a-cb"></span>
            <span class="x-a-issue__num">52</span>
            <span class="x-a-issue__title">Chapter Fifty-Two</span>
            <span class="x-a-issue__col x-a-issue__col--date">2018-05-01</span>
            <span class="x-a-issue__col x-a-issue__col--pages">24p</span>
            <span class="x-a-issue__col x-a-issue__col--size">48.6 MB</span>
            <span class="x-a-issue__fmt">CBZ</span>
            <span class="x-badge x-a-badge--done">saved</span>
            <span class="x-a-issue__dl"><svg class="x-a-ico" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/></svg></span><span class="x-a-issue__dl"><svg class="x-a-ico" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg></span>
          </div>
          <div class="x-a-issue x-a-issue--owned">
            <span class="x-a-cb"></span>
            <span class="x-a-issue__num">53</span>
            <span class="x-a-issue__title">Chapter Fifty-Three</span>
            <span class="x-a-issue__col x-a-issue__col--date">2018-06-01</span>
            <span class="x-a-issue__col x-a-issue__col--pages">22p</span>
            <span class="x-a-issue__col x-a-issue__col--size">41.0 MB</span>
            <span class="x-a-issue__fmt x-a-issue__fmt--untagged">CBR</span>
            <span class="x-badge x-a-badge--untagged">no tags</span>
            <span class="x-a-issue__dl"><svg class="x-a-ico" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/></svg></span><span class="x-a-issue__dl"><svg class="x-a-ico" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg></span>
          </div>
          <div class="x-a-issue ">
            <span class="x-a-cb"></span>
            <span class="x-a-issue__num">54</span>
            <span class="x-a-issue__title">Chapter Fifty-Four</span>
            <span class="x-a-issue__col x-a-issue__col--date">2018-07-01</span>
            <span class="x-a-issue__col x-a-issue__col--pages"></span>
            <span class="x-a-issue__col x-a-issue__col--size"></span>
            <span class="x-a-issue__fmt x-a-issue__fmt--none"></span>
            <span class="x-badge x-badge--downloading">saving</span>
            <span class="x-a-issue__dl"><svg class="x-a-ico" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/></svg></span><span class="x-a-issue__dl x-a-issue__dl--want"><svg class="x-a-ico" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/></svg></span><span class="x-a-issue__dl"><svg class="x-a-ico" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12M7 10l5 5 5-5M5 21h14"/></svg></span>
          </div>
          <div class="x-a-issue x-a-issue--corrupt">
            <span class="x-a-cb"></span>
            <span class="x-a-issue__num">55</span>
            <span class="x-a-issue__title">Chapter Fifty-Five</span>
            <span class="x-a-issue__col x-a-issue__col--date">2022-01-01</span>
            <span class="x-a-issue__col x-a-issue__col--pages"></span>
            <span class="x-a-issue__col x-a-issue__col--size"></span>
            <span class="x-a-issue__fmt x-a-issue__fmt--none"></span>
            <span class="x-badge x-a-badge--corrupt">corrupt</span>
            <span class="x-a-issue__dl"><svg class="x-a-ico" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/></svg></span><span class="x-a-issue__dl x-a-issue__dl--warn"><svg class="x-a-ico" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a9 9 0 1 1-3-6.7L21 8"/><path d="M21 3v5h-5"/></svg></span>
          </div>
          <div class="x-a-issue x-a-issue--hover">
            <span class="x-a-cb"></span>
            <span class="x-a-issue__num">56</span>
            <span class="x-a-issue__title">Chapter Fifty-Six</span>
            <span class="x-a-issue__col x-a-issue__col--date">2022-02-01</span>
            <span class="x-a-issue__col x-a-issue__col--pages"></span>
            <span class="x-a-issue__col x-a-issue__col--size"></span>
            <span class="x-a-issue__fmt x-a-issue__fmt--none"></span>
            <span class="x-badge x-a-badge--new">new</span>
            <span class="x-a-issue__dl"><svg class="x-a-ico" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/></svg></span><span class="x-a-issue__dl x-a-issue__dl--want"><svg class="x-a-ico" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/></svg></span><span class="x-a-issue__dl x-a-issue__dl--hot"><svg class="x-a-ico" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12M7 10l5 5 5-5M5 21h14"/></svg></span>
          </div>
          <div class="x-a-issue ">
            <span class="x-a-cb"></span>
            <span class="x-a-issue__num">57</span>
            <span class="x-a-issue__title">Chapter Fifty-Seven</span>
            <span class="x-a-issue__col x-a-issue__col--date">2022-03-01</span>
            <span class="x-a-issue__col x-a-issue__col--pages"></span>
            <span class="x-a-issue__col x-a-issue__col--size"></span>
            <span class="x-a-issue__fmt x-a-issue__fmt--none"></span>
            <span class="x-badge x-badge--failed">failed</span>
            <span class="x-a-issue__dl"><svg class="x-a-ico" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/></svg></span><span class="x-a-issue__dl x-a-issue__dl--want"><svg class="x-a-ico" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/></svg></span><span class="x-a-issue__dl"><svg class="x-a-ico" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12M7 10l5 5 5-5M5 21h14"/></svg></span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <figcaption>
    Each row's badge gives the issue's state — saved, no tags, saving, corrupt, new or failed.
    A pink target marks an issue automation wants, a corrupt one offers ↻ re-download, and hovering a row reveals its download button.
  </figcaption>
</figure>

Files in the series folder that the app could not match to an issue are listed under the issues, with the number it read from each (from the ComicInfo tag, else the filename). If the volume is right and the file's number is not — or there is no number to read — pick the issue from the file's **Assign to issue** menu: the file links to that issue immediately and the assignment is remembered per file, so rescans, re-matches and metadata refreshes keep it. A file that linked to the *wrong* issue is moved the same way from that issue's own page (open the issue, **Move to another issue…**), where a hand assignment can also be undone. If many files are off, **Fix match** (wrong volume) or renaming and **Scan folder** may be the quicker fix.

Download and management buttons only appear for roles holding those permissions — a viewer sees the read buttons and nothing else ([Users & access](users#roles)).

The list toggles between a **cover grid** and a detailed row list; the list view shows each issue's cover date, page count, file size, and format at a glance.

### Right-click an issue

Every issue, in both the poster grid and the list, has an actions menu. Reach it
from the **⋯ button** (top-right of a poster card, or at the end of a list row),
a **right-click** anywhere on the issue, or a **long press** on a touch screen.
It carries the actions that otherwise live as small buttons on the row:

- Whatever the plugins you have installed contribute, first. With the
  [Reader](reading) installed that is **Read**, **Mark as read** or **Mark as
  unread**, and **Read later**.
- **Issue details** for the full record and its files. The cover and every
  action sit on the left; the rest is four tabs — Overview, Credits, Appearing
  and Files — with counts, and arrows in the header step through the run
  without going back to the series. **Credited names, characters and teams are
  links**: click one for every other issue in your collection that credits that
  person or features that character. The results group by series, each heading
  carrying the years it spans and how much of that series you own, and a series
  with more than two dozen hits stays collapsed behind a summary of its runs
  ("130 issues · #208-250, #400-443") until you open it into a grid of issue
  numbers. A filter, an owned-only toggle, a sort and a cover view sit above
  them, and a creator's roles become chips you can narrow by. Credits exist for
  any issue whose metadata has been downloaded; character listings are sparser,
  because the metadata sources record them for a minority of issues and mostly
  recent ones.
- **Download this issue**, or **Download again** for one you already own, or
  **Re-download** when the file is corrupt.
- **Want** or **Don't want**, for an issue you are missing.

The menu is built when you open it, so it always reflects that issue as it
stands: an issue you just marked read offers to mark it unread. Right-clicking
does not change which issues are selected, so a selection you are part-way
through building survives.

## Editing metadata

Trusted users can hand-edit metadata anywhere it's wrong or missing:

- **Series** — ⋯ → **Edit metadata…** on the series page: title, publisher, imprint, years, publication status, content rating, series type, genres, and description.
- **Issues** — the **Edit** button in an issue's details: title, number, dates, content rating, cover price, UPC, ISBN, and description.

Edited fields are **yours**: metadata refreshes, ComicVine matching, and enrichment never overwrite them. Each editor shows **Reset all edits** when edits exist — resetting drops your changes and the next refresh restores the source values. A hand-edited content rating also owns the mature-flag decision: automatic flagging won't override it.

## Monitoring

Every series has a **monitoring policy** that says what download automation should go after. Set it from the **⋯** menu on the series page (it also shows as a tag in the header), or for many series at once from the Library's bulk bar:

| Policy | What is wanted |
|---|---|
| **All issues** | Every missing issue — the run is kept complete. The default for new series (change it under **Settings → Downloading → Monitor added series**). |
| **New issues from #…** | Only issues from a number onward. Earlier gaps are left alone — handy when you started a long run late and don't want the back catalogue. Defaults to the newest issue ComicVine knows, so it reads as "everything from here on". |
| **Off** | Nothing is fetched automatically. |

<figure class="bi-ex" v-pre>
  <div class="bi-ex__frame" role="img" aria-label="A series page's monitoring tag reading Monitoring new issues from #152, and the open ⋯ menu whose Monitoring section offers All issues, New issues from #… (ticked) and Off, plus Forget 2 picked issues">
    <div class="x-a-mon">
      <div class="x-a-mon__row">
        <span class="x-a-tag">DC Comics</span>
        <span class="x-a-tag x-a-tag--mono">158 issues</span>
        <span class="x-a-tag x-a-tag--new"><svg class="x-a-ico" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg> Monitoring new issues from #152</span>
        <span class="x-pin">1</span>
      </div>
      <div class="x-a-mon__actions">
        <span class="x-a-btn x-a-btn--primary">Download missing (12)</span>
        <span class="x-a-btn x-a-btn--ghost"><svg class="x-a-ico" width="15" height="15" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14l-5-4.87 6.91-1.01z"/></svg> Following</span>
        <div class="x-a-mon__wrap">
          <span class="x-a-btn x-a-btn--ghost x-a-btn--open">⋯</span>
          <div class="x-a-menu x-a-mon__clip">
            <div class="x-a-menu__label">Monitoring</div>
            <span class="x-a-menu__item"><svg class="x-a-ico" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/></svg> All issues</span>
            <span class="x-a-menu__item x-a-menu__item--current"><svg class="x-a-ico" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg> New issues from #… <span class="x-pin">2</span></span>
            <span class="x-a-menu__item"><svg class="x-a-ico" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 5v14M16 5v14"/></svg> Off</span>
            <span class="x-a-menu__item x-a-menu__item--hover"><svg class="x-a-ico" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg> Forget 2 picked issues <span class="x-pin">3</span></span>
            <div class="x-a-menu__sep"></div>
            <span class="x-a-menu__item"><svg class="x-a-ico" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a9 9 0 1 1-3-6.7L21 8"/><path d="M21 3v5h-5"/></svg> Refresh metadata</span>
            <span class="x-a-menu__item"><svg class="x-a-ico" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z"/></svg> Edit metadata…</span>
            <span class="x-a-menu__item"><svg class="x-a-ico" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2l10 10-10 10L2 12 12 2z"/></svg> Fix match…</span>
            <span class="x-a-menu__item"><svg class="x-a-ico" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.35-4.35"/></svg> Scan folder</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <figcaption>
    <span class="x-pin">1</span> The header tag always says what automation is fetching.
    <span class="x-pin">2</span> The current policy is ticked in the <b>⋯</b> menu.
    <span class="x-pin">3</span> <b>Forget picked issues</b> appears only while hand picks exist.
  </figcaption>
</figure>

### Picking issues by hand

On top of the policy, any issue can be **picked** or **skipped** individually — the target button on each issue row (Series page) or the target / ban buttons on the Wanted page. A pick always wins over the policy, in both directions:

- On a series that is **off**, pick the one issue you want and automation searches for just that one.
- On a series set to **all**, skip a variant cover or an issue you own in print and it stops being wanted.

Only the exceptions are stored, so changing the policy later never fights a stale pick. When a picked issue lands, whoever picked it gets a notification and the pick retires. Pressing **Download** on an issue the policy doesn't want records a pick too — if the grab fails, automation keeps after it and the Wanted page can say why it's there. Switching a series **off** asks whether to keep its picks; **Forget picked issues** in the ⋯ menu drops them all.

"Wanted" and "missing" are deliberately different things: **missing** is a fact about files on disk (the Library's counts and Incomplete filter), **wanted** is your decision (the [Wanted page](downloads#the-wanted-page), the search schedules, the RSS and announce watchers). Reading lists can want every issue on them — see [Reading lists](reading).

## Bulk actions

The ☑ button in the Library header switches to multi-select. Select any number of series and:

- **★ Follow / ☆ Unfollow** — your personal follows (the pull list), en masse
- **Monitoring…** — set the monitoring policy for every selected series
- **⤓ Missing** — queue every missing issue of the selected series
- **☰ Add to list** — put every issue of the selected series on a [reading list](reading#reading-lists), in the order the Library is showing them
- **Remove** — drop the series from the collection (files on disk are *never* touched)
