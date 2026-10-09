---
description: "Read in the browser with paged, double-page and webtoon modes, resume, bookmarks, reading lists and per-user history."
---

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
- **Read later** — pin an issue to your own saved-for-later shelf.

### Acting on a whole series

The series header carries the bulk versions of these, next to each other:
**Mark read**, **Mark unread** and **Read later**.

Each one works the same way. **Tick some issues and it acts on exactly those.**
Tick nothing and it acts on the series, with one sensible difference: Read
later takes only the issues you own and have not finished, because pinning
what you have already read just clutters the shelf you are building. The
button says how many it will take, and the count follows your ticks.

Once everything in scope is pinned, the action becomes **Remove from Read
later**, which is also how you clear a series off the shelf once you are done
with it.

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

These same numbers feed [Gamify](gamify), if you install it — levels, streaks,
quests and a household leaderboard built on the reading you already do.

## Offline & install

The reader works offline for issues you've opened (a service worker caches pages), and BackIssue is installable to a phone or tablet home screen as a full-screen app.

## Reading lists

**Sidebar → Lists** — ordered lists of issues, private to your account unless you choose to share one.

- **Build a list by hand** — from any volume page, select issues (or the whole series) and **"☰ Add to list"**. Reorder items with the up/down controls.
- **Add whole series at once** — on the Library page, turn on **Select**, tick the series you want and choose **Add to list**. Every issue of each goes on, in the order the Library is showing them and by issue number within each series, which is how you build a run out of volumes: a title ComicVine splits across four volumes is four ticks rather than four trips through a series page. The dialog tells you how many issues that is before you commit.
- **Import a ComicVine story arc** — search ComicVine story arcs (e.g. *Infinity Gauntlet*, *Blackest Night*) and import one: BackIssue pulls the arc's issues **in cover-date reading order**, across every series involved — ideal for crossovers that span multiple titles.
- **Import a CBL reading list** — CBL is a widely used reading-list format. **Import CBL** takes a `.cbl` file of your own, or lets you browse the community catalog of 1,700+ curated lists ([DieselTech/CBL-ReadingLists](https://github.com/DieselTech/CBL-ReadingLists)) by publisher and pick one — whole events, character runs, even entire alternate universes, far larger than a single ComicVine arc. **Preview** any list first — its books in reading order, marked with what you already own — then import. The list keeps the **file's own reading order** (tie-ins interleaved with the main event), and any book that can't be matched on ComicVine is listed after the import so nothing is silently dropped.
- Items you don't own show a **download** button; items whose volume isn't in your library yet show **"+ Add series"** to add it. A list tracks how many of its issues you own.
- **Want all** makes every issue on the list wanted instead of queueing it right away: series already in the library get those issues picked, series that aren't are added with [monitoring](collection#monitoring) off and just those issues picked — so automation fetches the list and nothing else, and keeps trying if a source doesn't have an issue yet.

<figure class="bi-ex" v-pre>
  <div class="bi-ex__frame" role="img" aria-label="Preview of the community Civil War CBL list before import: 98 issues, 41 already owned, 54 missing, 3 without a ComicVine id, with the first books grouped by series in reading order">
    <div class="x-c-prev">
      <div class="x-c-prev-head">
        <div class="x-c-prev-top">
          <span class="x-c-prev-back"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5M12 19l-7-7 7-7"/></svg> Back</span>
          <div class="x-c-prev-titles">
            <div class="x-c-prev-tags"><span class="x-c-prev-pill">Preview</span><span class="x-c-prev-prov">Marvel / Events / Civil War</span></div>
            <div class="x-c-prev-name">Civil War</div>
            <div class="x-c-prev-sub">Nothing is imported yet — this is read straight from the file.</div>
          </div>
        </div>
        <div class="x-c-prev-stats">
          <div class="x-c-prev-stat" style="--tone:var(--x-muted)"><div class="x-c-prev-stat-l"><span class="x-c-prev-dot"></span>Issues</div><div class="x-c-prev-stat-v">98</div></div>
          <div class="x-c-prev-stat" style="--tone:var(--x-green)"><div class="x-c-prev-stat-l"><span class="x-c-prev-dot"></span>Already owned</div><div class="x-c-prev-stat-v">41</div></div>
          <div class="x-c-prev-stat" style="--tone:var(--x-amber)"><div class="x-c-prev-stat-l"><span class="x-c-prev-dot"></span>Missing</div><div class="x-c-prev-stat-v">54</div></div>
          <div class="x-c-prev-stat" style="--tone:#ff8f3d"><div class="x-c-prev-stat-l"><span class="x-c-prev-dot"></span>No ComicVine id</div><div class="x-c-prev-stat-v">3</div></div>
        </div>
        <div class="x-c-prev-segbar"><div class="x-c-seg--owned" style="width:41.84%"></div><div class="x-c-seg--missing" style="width:55.10%"></div><div class="x-c-seg--byname" style="width:3.06%"></div></div>
        <div class="x-c-prev-legend">
          <span style="--tone:var(--x-green)"><i></i>Owned <b>41</b></span>
          <span style="--tone:var(--x-amber)"><i></i>Missing <b>54</b></span>
          <span style="--tone:#ff8f3d"><i></i>Matched by name <b>3</b></span>
        </div>
        <div class="x-c-prev-note"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><path d="M12 9v4M12 17h.01"/></svg><span>3 books carry no ComicVine id and will be matched by name — those are the ones most likely to be skipped.</span></div>
        <div class="x-c-prev-filters">
          <span class="x-c-prev-filter x-c-prev-filter--on">All<span>98</span></span>
          <span class="x-c-prev-filter">Missing<span>54</span></span>
          <span class="x-c-prev-filter">No id<span>3</span></span>
          <span class="x-c-prev-filter">Owned<span>41</span></span>
          <span class="x-c-prev-filter x-c-prev-group"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12 2 9 5-9 5-9-5 9-5z"/><path d="m3 12 9 5 9-5M3 17l9 5 9-5"/></svg> Group by series</span>
        </div>
      </div>
      <div class="x-c-prev-body">
        <div class="x-c-prev-run">
          <span class="x-c-prev-run-series">The Amazing Spider-Man</span>
          <span class="x-c-prev-run-vol">(1999)</span>
          <span class="x-c-prev-run-own x-c-prev-run-own--all">3/3 owned</span>
          <span class="x-c-prev-run-line"></span>
          <span class="x-c-prev-run-range">#529–531</span>
        </div>
        <div class="x-c-prev-row x-c-prev-row--owned">
          <span class="x-c-prev-n">1</span>
          <span class="x-c-prev-rdot"></span>
          <span class="x-c-prev-rname"><b>#529</b><span class="x-c-prev-rvol">(1999)</span></span>
          <span class="x-c-prev-badge">Owned</span>
        </div>
        <div class="x-c-prev-row x-c-prev-row--owned">
          <span class="x-c-prev-n">2</span>
          <span class="x-c-prev-rdot"></span>
          <span class="x-c-prev-rname"><b>#530</b><span class="x-c-prev-rvol">(1999)</span></span>
          <span class="x-c-prev-badge">Owned</span>
        </div>
        <div class="x-c-prev-row x-c-prev-row--owned">
          <span class="x-c-prev-n">3</span>
          <span class="x-c-prev-rdot"></span>
          <span class="x-c-prev-rname"><b>#531</b><span class="x-c-prev-rvol">(1999)</span></span>
          <span class="x-c-prev-badge">Owned</span>
        </div>
        <div class="x-c-prev-run">
          <span class="x-c-prev-run-series">Fantastic Four</span>
          <span class="x-c-prev-run-vol">(1998)</span>
          <span class="x-c-prev-run-own x-c-prev-run-own--some">1/2 owned</span>
          <span class="x-c-prev-run-line"></span>
          <span class="x-c-prev-run-range">#536–537</span>
        </div>
        <div class="x-c-prev-row x-c-prev-row--owned">
          <span class="x-c-prev-n">4</span>
          <span class="x-c-prev-rdot"></span>
          <span class="x-c-prev-rname"><b>#536</b><span class="x-c-prev-rvol">(1998)</span></span>
          <span class="x-c-prev-badge">Owned</span>
        </div>
        <div class="x-c-prev-row x-c-prev-row--missing">
          <span class="x-c-prev-n">5</span>
          <span class="x-c-prev-rdot"></span>
          <span class="x-c-prev-rname"><b>#537</b><span class="x-c-prev-rvol">(1998)</span></span>
          <span class="x-c-prev-badge">Missing</span>
        </div>
        <div class="x-c-prev-run">
          <span class="x-c-prev-run-series">New Avengers: Illuminati</span>
          <span class="x-c-prev-run-vol">(2006)</span>
          <span class="x-c-prev-run-own">0/1 owned</span>
          <span class="x-c-prev-run-line"></span>
          <span class="x-c-prev-run-range">#1</span>
        </div>
        <div class="x-c-prev-row x-c-prev-row--byname">
          <span class="x-c-prev-n">6</span>
          <span class="x-c-prev-rdot"></span>
          <span class="x-c-prev-rname"><b>#1</b><span class="x-c-prev-rvol">(2006)</span></span>
          <span class="x-c-prev-badge">by name</span>
        </div>
      </div>
      <div class="x-c-prev-foot">
        <span class="x-c-prev-outcome">Imports in reading order · 95 books match by id, 3 by name · 41 already owned</span>
        <span class="x-c-prev-cancel">Cancel</span>
        <span class="x-c-prev-import"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 9V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-8"/><path d="M2 13h10M9 16l3-3-3-3"/></svg> Import this list</span>
      </div>
    </div>
  </div>
  <figcaption>
    <b>Preview</b> on a community list reads the file without importing anything. The bar splits the
    list into what you own, what is missing, and what will be matched by name, and the rows keep the
    file's own reading order.
  </figcaption>
</figure>

### Reading a list as a run

A list isn't a folder of issues, it's a run you read through, and the list page
is built around where you are in it. The issues sit on a single spine: the rail
is filled up to the point you've reached and grey after it, each issue carries a
node, and read issues are ticked off and dimmed so the unread ones carry your
eye.

<figure class="bi-ex" v-pre>
  <div class="bi-ex__frame" role="img" aria-label="The Blackest Night reading list, 12 of 33 read: two read issues on a green spine, Blackest Night #4 highlighted as Read next, Green Lantern #47 drawn as a dashed gap, and two unread issues after it">
    <div class="x-c-list">
      <div class="x-c-dhead">
        <div class="x-c-dtitle-wrap">
          <div class="x-c-dtitle-row"><span class="x-c-dtitle">Blackest Night</span><span class="x-c-edit"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z"/></svg></span></div>
          <div class="x-c-dsummary">33 issues · 6 series · from a ComicVine arc</div>
        </div>
        <div class="x-c-dactions">
          <span class="x-c-btn x-c-btn--continue"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 4l14 8-14 8z"/></svg> Continue · #4</span>
          <span class="x-c-btn x-c-btn--want"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/></svg> Want all (3)</span>
          <span class="x-c-btn x-c-btn--dl"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12M7 10l5 5 5-5M5 21h14"/></svg> Download missing (3)</span>
          <span class="x-c-btn"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg> Share</span>
          <span class="x-c-btn x-c-btn--del">Delete</span>
        </div>
      </div>
      <div class="x-c-dbar">
        <span class="x-c-dbar-track"><span class="x-c-dbar-fill" style="width:36%"></span></span>
        <span class="x-c-dbar-num">12 of 33 read · 1 in progress <span class="x-pin">2</span></span>
        <span class="x-c-dbar-gaps">3 missing</span>
      </div>
      <div class="x-c-items">
      <div class="x-c-item">
        <span class="x-c-spine x-c-spine--done"></span>
        <span class="x-c-node x-c-node--read"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg></span>
        <div class="x-c-cover x-c-cover--read">GL</div>
        <div class="x-c-imain">
          <span class="x-c-iseries">Green Lantern <span class="x-c-inum">#46</span></span>
          <div class="x-c-isub">2009-11-01</div>
        </div>
        <div class="x-c-iact"><span class="x-c-ibtn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg></span><span class="x-c-ibtn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 5v14M5 12l7 7 7-7"/></svg></span><span class="x-c-ibtn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg></span></div>
      </div>
      <div class="x-c-item">
        <span class="x-c-spine x-c-spine--done"></span>
        <span class="x-c-node x-c-node--read"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg></span>
        <div class="x-c-cover x-c-cover--read">GL</div>
        <div class="x-c-imain">
          <span class="x-c-iseries">Green Lantern Corps <span class="x-c-inum">#41</span></span>
          <div class="x-c-isub">2009-11-01</div>
        </div>
        <div class="x-c-iact"><span class="x-c-ibtn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg></span><span class="x-c-ibtn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 5v14M5 12l7 7 7-7"/></svg></span><span class="x-c-ibtn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg></span></div>
      </div>
      <div class="x-c-item x-c-item--current">
        <span class="x-c-spine"></span>
        <span class="x-c-node x-c-node--current"></span>
        <div class="x-c-cover">BN</div>
        <div class="x-c-imain">
          <span class="x-c-iseries">Blackest Night <span class="x-c-inum">#4</span></span>
          <div class="x-c-isub">2009-12-01</div>
          <div class="x-c-nexttag">Read next <span class="x-pin">1</span></div>
        </div>
        <div class="x-c-iact x-c-iact--hover"><span class="x-c-readnow"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 4l14 8-14 8z"/></svg> Read</span><span class="x-c-ibtn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg></span><span class="x-c-ibtn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 5v14M5 12l7 7 7-7"/></svg></span><span class="x-c-ibtn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg></span></div>
      </div>
      <div class="x-c-item">
        <span class="x-c-spine"></span>
        <span class="x-c-node x-c-node--missing"></span>
        <div class="x-c-gapcover">#47</div>
        <div class="x-c-imain">
          <span class="x-c-iseries">Green Lantern <span class="x-c-inum">#47</span></span>
          <div class="x-c-isub x-c-isub--gap">Not owned · position 14 in this run</div>
        </div>
        <span class="x-c-badge x-c-badge--missing">Missing</span>
        <div class="x-c-iact"><span class="x-c-ibtn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12M7 10l5 5 5-5M5 21h14"/></svg></span><span class="x-c-ibtn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg></span><span class="x-c-ibtn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 5v14M5 12l7 7 7-7"/></svg></span><span class="x-c-ibtn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg></span></div>
      </div>
      <div class="x-c-item">
        <span class="x-c-spine"></span>
        <span class="x-c-node x-c-node--upcoming"></span>
        <div class="x-c-cover">GL</div>
        <div class="x-c-imain">
          <span class="x-c-iseries">Green Lantern Corps <span class="x-c-inum">#42</span></span>
          <div class="x-c-isub">2009-12-01</div>
        </div>
        <div class="x-c-iact"><span class="x-c-ibtn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg></span><span class="x-c-ibtn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 5v14M5 12l7 7 7-7"/></svg></span><span class="x-c-ibtn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg></span></div>
      </div>
      <div class="x-c-item">
        <span class="x-c-spine"></span>
        <span class="x-c-node x-c-node--upcoming"></span>
        <div class="x-c-cover">BN</div>
        <div class="x-c-imain">
          <span class="x-c-iseries">Blackest Night <span class="x-c-inum">#5</span></span>
          <div class="x-c-isub">2010-01-01</div>
        </div>
        <div class="x-c-iact"><span class="x-c-ibtn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg></span><span class="x-c-ibtn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 5v14M5 12l7 7 7-7"/></svg></span><span class="x-c-ibtn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg></span></div>
      </div>
      </div>
    </div>
  </div>
  <figcaption>
    A stretch from the middle of an imported arc. <span class="x-pin">1</span> The one <b>Read next</b> issue,
    where the green spine stops. Below it, Green Lantern #47 is a gap: an outline with its position in the run.
    <span class="x-pin">2</span> The header counts reads; ownership shows only as the missing count.
  </figcaption>
</figure>

- **One "Read next"** — the first issue you haven't read is promoted: a bigger
  cover, a highlighted node, and its own **Read** button. There is exactly one,
  so there is never a question of where to pick up.
- **Continue** at the top of the list opens that issue straight into the reader.
- **Gaps are shown as gaps.** An issue you don't own is drawn as an outline, not
  a broken cover, labelled with its position in the run. The spine stops at a
  gap rather than filling through it, because reading past a hole isn't reading
  the arc. Continue still skips ahead to the next issue you can actually read.
- **The header counts reads, not files** — "12 of 33 read", plus how many are in
  progress and how many are missing. Ownership is a separate number and is
  labelled as one.
- **The index** shows every list with a tick per issue and a status: *New*,
  a read count, or *Done*. Above them, **Continue** pins the run you read most
  recently that still has somewhere to go, with the next issue named.

<figure class="bi-ex" v-pre>
  <div class="bi-ex__frame" role="img" aria-label="The reading lists index: a Continue card for Blackest Night naming issue #4 next, then four lists each with a row of ticks and a status of 12 of 33, 5 of 11, New, or Done">
    <div class="x-c-lists">
    <div class="x-c-rail">
      <div class="x-c-rail-top">
        <span class="x-c-iconbtn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5M12 19l-7-7 7-7"/></svg></span>
        <div class="x-c-rail-title">Reading lists</div>
        <span class="x-c-rail-count">4 lists</span>
      </div>
      <div class="x-c-rail-actions">
        <span class="x-c-railbtn x-c-railbtn--new"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg> New</span>
        <span class="x-c-railbtn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2l10 10-10 10L2 12 12 2z"/></svg> Arc</span>
        <span class="x-c-railbtn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 9V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-8"/><path d="M2 13h10M9 16l3-3-3-3"/></svg> CBL</span>
      </div>
      <div class="x-c-resume">
        <span class="x-c-resume-lbl">Continue</span>
        <span class="x-c-resume-body"><span class="x-c-resume-name">Blackest Night</span><span class="x-c-resume-next">#4 · Blackest Night</span></span>
        <span class="x-c-resume-go"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 4l14 8-14 8z"/></svg></span>
      </div>
      <div class="x-c-lcard">
        <div class="x-c-lcard-top"><span class="x-c-lcard-name">Blackest Night</span><span class="x-c-lcard-ico"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2l10 10-10 10L2 12 12 2z"/></svg></span></div>
        <div class="x-c-ticks" aria-hidden="true"><span class="x-c-tick x-c-tick--lit"></span><span class="x-c-tick x-c-tick--lit"></span><span class="x-c-tick x-c-tick--lit"></span><span class="x-c-tick x-c-tick--lit"></span><span class="x-c-tick x-c-tick--lit"></span><span class="x-c-tick x-c-tick--lit"></span><span class="x-c-tick x-c-tick--lit"></span><span class="x-c-tick x-c-tick--lit"></span><span class="x-c-tick x-c-tick--lit"></span><span class="x-c-tick x-c-tick--lit"></span><span class="x-c-tick x-c-tick--lit"></span><span class="x-c-tick x-c-tick--lit"></span><span class="x-c-tick"></span><span class="x-c-tick"></span><span class="x-c-tick"></span><span class="x-c-tick"></span><span class="x-c-tick"></span><span class="x-c-tick"></span><span class="x-c-tick"></span><span class="x-c-tick"></span><span class="x-c-tick"></span><span class="x-c-tick"></span><span class="x-c-tick"></span><span class="x-c-tick"></span><span class="x-c-tick"></span><span class="x-c-tick"></span><span class="x-c-tick"></span><span class="x-c-tick"></span><span class="x-c-tick"></span><span class="x-c-tick"></span><span class="x-c-tick"></span><span class="x-c-tick"></span><span class="x-c-tick"></span></div>
        <div class="x-c-lcard-prog"><span class="x-c-lcard-sub">30/33 owned</span><span class="x-c-status x-c-status--reading">12 of 33</span></div>
      </div>
      <div class="x-c-lcard">
        <div class="x-c-lcard-top"><span class="x-c-lcard-name">The Court of Owls</span><span class="x-c-lcard-ico"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2l10 10-10 10L2 12 12 2z"/></svg></span><span class="x-c-lcard-ico"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg></span></div>
        <div class="x-c-ticks" aria-hidden="true"><span class="x-c-tick x-c-tick--lit"></span><span class="x-c-tick x-c-tick--lit"></span><span class="x-c-tick x-c-tick--lit"></span><span class="x-c-tick x-c-tick--lit"></span><span class="x-c-tick x-c-tick--lit"></span><span class="x-c-tick"></span><span class="x-c-tick"></span><span class="x-c-tick"></span><span class="x-c-tick"></span><span class="x-c-tick"></span><span class="x-c-tick"></span></div>
        <div class="x-c-lcard-prog"><span class="x-c-lcard-sub">11/11 owned</span><span class="x-c-status x-c-status--reading">5 of 11</span></div>
      </div>
      <div class="x-c-lcard">
        <div class="x-c-lcard-top"><span class="x-c-lcard-name">Civil War</span><span class="x-c-lcard-ico"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 9V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-8"/><path d="M2 13h10M9 16l3-3-3-3"/></svg></span></div>
        <div class="x-c-ticks" aria-hidden="true"><span class="x-c-tick"></span><span class="x-c-tick"></span><span class="x-c-tick"></span><span class="x-c-tick"></span><span class="x-c-tick"></span><span class="x-c-tick"></span><span class="x-c-tick"></span><span class="x-c-tick"></span><span class="x-c-tick"></span><span class="x-c-tick"></span><span class="x-c-tick"></span><span class="x-c-tick"></span><span class="x-c-tick"></span><span class="x-c-tick"></span><span class="x-c-tick"></span><span class="x-c-tick"></span><span class="x-c-tick"></span><span class="x-c-tick"></span><span class="x-c-tick"></span><span class="x-c-tick"></span><span class="x-c-tick"></span><span class="x-c-tick"></span><span class="x-c-tick"></span><span class="x-c-tick"></span><span class="x-c-tick"></span><span class="x-c-tick"></span><span class="x-c-tick"></span><span class="x-c-tick"></span><span class="x-c-tick"></span><span class="x-c-tick"></span><span class="x-c-tick"></span><span class="x-c-tick"></span><span class="x-c-tick"></span><span class="x-c-tick"></span><span class="x-c-tick"></span><span class="x-c-tick"></span><span class="x-c-tick"></span><span class="x-c-tick"></span><span class="x-c-tick"></span><span class="x-c-tick"></span></div>
        <div class="x-c-lcard-prog"><span class="x-c-lcard-sub">41/98 owned</span><span class="x-c-status x-c-status--new">New</span></div>
      </div>
      <div class="x-c-lcard">
        <div class="x-c-lcard-top"><span class="x-c-lcard-name">Sunday backlog</span></div>
        <div class="x-c-ticks" aria-hidden="true"><span class="x-c-tick x-c-tick--lit"></span><span class="x-c-tick x-c-tick--lit"></span><span class="x-c-tick x-c-tick--lit"></span><span class="x-c-tick x-c-tick--lit"></span><span class="x-c-tick x-c-tick--lit"></span><span class="x-c-tick x-c-tick--lit"></span><span class="x-c-tick x-c-tick--lit"></span><span class="x-c-tick x-c-tick--lit"></span><span class="x-c-tick x-c-tick--lit"></span></div>
        <div class="x-c-lcard-prog"><span class="x-c-lcard-sub">9/9 owned</span><span class="x-c-status x-c-status--done">Done</span></div>
      </div>
    </div>
    <div class="x-c-placeholder">
      <div class="x-c-ph-art"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg></div>
      <div class="x-c-ph-title">Pick a list</div>
      <p class="x-c-ph-body">Select a reading list on the left, or create a new one to start collecting issues into an ordered run.</p>
    </div>
    </div>
  </div>
  <figcaption>
    The index: one tick per issue (capped at 40, so a 98-issue list still fits), what you own, and where
    you are. <b>Continue</b> pins the run you read most recently. The diamond marks an arc import, the folder a CBL
    import, and the people icon a shared list.
  </figcaption>
</figure>

When you read an issue you opened from a list, the reader follows the *run*
rather than the series. The last page carries a **Next in arc** button where an
ordinary read would offer the next issue of the series, and finishing the issue
brings up a card with the run's progress, the next issue named, and **Read
now**, **Later** or **Back to arc**. Crossovers therefore carry on across titles
the way the list orders them. **Later** dismisses the card for that issue only
and leaves the button behind, so you are not asked twice and not left without a
way onward. Open the same issue from anywhere else and the reader behaves
normally.

Read state comes from the reader. Without it installed, a list still shows
ownership and its issues in order, and simply doesn't claim to know what you've
read.

### Sharing a list

A list is private by default. With the **Share reading lists** permission you can publish one from its **Share** button, and every user then sees it alongside their own — a house reading order, a curated run, or an imported crossover everyone can follow. Sharing changes who can *see* a list, never who can change it: only the owner can rename, reorder, add, remove or delete it, and a shared list never reveals mature content to accounts that can't otherwise see it.

Otherwise reading lists are per-user, so your lists and their order are yours alone — two people can work through the same imported arc independently.

Shared and personal lists both appear over [OPDS](opds) in reading order, so a native reader app can tell you what to read next.

## Books and audiobooks

Reading here means comics. If your library also holds EPUBs, PDFs or
audiobooks, those have their own reading and listening flows — see
[Books](ebooks) and [Audiobooks](audiobooks).

## Reading on other apps (OPDS)

Prefer a native reader like Panels or Chunky? BackIssue also serves your library over **OPDS** — see [OPDS](opds).
