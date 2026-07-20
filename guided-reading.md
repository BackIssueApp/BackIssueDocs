# Guided panel reading

The reader can walk a page **panel by panel** — the view zooms to the first panel, dims everything around it, and each tap or key press moves to the next panel in reading order. On a phone or tablet, where a full page is small, it turns dense pages into something you can actually read.

## Using guided view

Open any issue in the reader and press **G** (or the panel-grid button in the toolbar). The camera frames the first panel; advancing works exactly like page turns — tap the right edge, arrow keys, or space. When the last panel finishes, the next page begins at its first panel; going backward enters a page at its *last* panel, so the flow stays natural in both directions.

- A **spotlight** dims everything outside the current panel — including along slanted borders when a panel isn't rectangular.
- **Right-to-left** series tour panels in manga order automatically.
- Pages without a confident layout (splashes, covers, heavy collage art) show as a normal **full page** inside guided view — advancing just turns the page. A clean full page always beats a broken tour.
- Turning guided view off (press **G** again) returns to normal reading instantly.

## How panels are detected

The first time an issue is opened for guided view, the server detects every page's panel layout **once**, in the background, and caches it — you'll see live progress ("Detecting panels… 12/44 pages"), and after that it's instant. Detection runs entirely on your server; pages are never uploaded anywhere.

Detection is deliberately conservative: when it isn't confident about a page, it serves the whole page rather than guessing. Art that bleeds across gutters, borderless panels, and experimental layouts are the usual reasons a page stays in page mode — and those are exactly the pages the panel editor exists for.

## The panel editor

Users with the **Edit panel layouts** permission (admin tier by default — grant it to trusted roles in Settings → Users) get an **Edit panel layout** action on every owned issue. It opens a full-issue editor:

- A **thumbnail rail** shows every page with its panel count; filter chips jump to pages with **no layout**, **edited** pages, or **unreviewed** pages.
- **Drag** a panel to move it; drag its corners to resize. **Double-tap a panel** to unlock its corners for slanted panels (double-tap again to square it back).
- **Draw** a new panel by dragging on empty page area — or **click** empty area to place a polygon corner by corner for angled shapes.
- **Snap** magnetizes edges onto the drawn panel borders, so rough drags become exact layouts (toggle **Auto-snap** off to place panels exactly where you draw them).
- **Set order** renumbers panels by tapping them in reading sequence; **Preview** plays the guided tour in place so you can check it before saving.
- **Undo/redo**, **copy/paste** a layout between pages, keyboard nudging, and a **Whole page** button for pages that should just read whole.
- **Review mode** is the fast path for checking a whole issue: **Space** confirms each page's layout and advances; fix anything that's wrong along the way. Confirmed pages get a ✓ in the rail.

Edits are saved **per file** and apply to everyone on your server. They outrank whatever detection says — including future, smarter detectors — and each page can be reverted to automatic detection independently.

## The shared panel cache

Detecting a page that some other BackIssue server has already detected is wasted work — so servers can share layouts through a community cache, keyed by a fingerprint of each page's content:

- Before detecting, your server asks the cache; pages it already knows come back **instantly**.
- Layouts your server's ML detector finds, and any hand-corrections your users make, are contributed back for everyone else (the built-in fallback detector's output stays local — only high-quality layouts enter the pool).
- **Hand-corrections always outrank detector output.** A model-detected layout is only served to others once **two servers independently agree** on it.

**What leaves your server:** panel rectangles and a hash of each page's image bytes — never the images themselves, never filenames, never titles. The hash lets identical pages match without revealing what they are. If you'd rather not participate at all, turn off **Share panel layouts with the community cache** in **Settings → Library**; detection then runs purely locally.

## Settings

| Setting (Settings → Library) | Does |
|---|---|
| Use the ML panel detector | The neural panel detector — downloaded automatically from the BackIssue CDN on first start (checksum-verified) and kept up to date; off = the built-in detector only, and no download happens. |
| Share panel layouts with the community cache | The shared cache described above. On by default; off = fully local detection. |

## Known limits

- Pages where art crosses the panel borders (bleeds) or with heavily overlapping/diagonal layouts often fall back to page mode — fix them in the panel editor if you want them toured.
- Detection quality keeps improving; corrections made in the editor are never overwritten by upgrades.
