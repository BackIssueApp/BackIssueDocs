---
description: "Add a Books library for EPUB and PDF, enrich it with metadata, and read in the browser with highlights, notes and synced positions."
---

# Books

The **Books plugin** adds a **Books** library type for your EPUB and PDF
shelves, and an in-browser reader for them. Books aren't a separate section of
the app — they live in the normal Library grid, with series pages, filters and
search working exactly as they do for comics.

## Setting up a shelf

Create a library of type **Books** (Settings → Library) and point it at a
folder. The scan catalogs every `.epub` and `.pdf` it finds, reading the
metadata embedded in the file: title, authors, description, ISBN, cover, and a
calibre series with its position when the file carries one.

A calibre series becomes one shelf with its books in reading order; a
standalone book becomes a shelf of its own. Scans are incremental — unchanged
files are skipped, deleted files are pruned — and run from the schedulable
**Scan book libraries** job.

Metadata is then enriched best-effort against the metadata service: covers,
publisher, publication year, page count, and a longer description. Your file's
own metadata always wins where it has an opinion; the service only fills gaps
and never replaces an embedded title with a worse one. Books that don't match
still work perfectly — they just keep the metadata the file came with.

**Series without calibre metadata** are grouped automatically where the service
knows the series, so a shelf of standalone-looking files becomes a proper
series in reading order. A series the file declares itself is never overridden.

## Reading

Open any book and pick **Read**:

- **EPUBs** open an in-browser reading shell styled like the comic reader —
  paginated, with tap zones and arrow keys, a contents drawer, adjustable font
  size and line spacing, and light / sepia / dark themes.
- **PDFs** stream inline to the browser's own viewer.

Your position is saved per user as you read, so any device picks up where you
left off, and the shelf shows read, in-progress and finished state at a glance.
**Mark finished** and **Mark unread** are on the book's detail sheet.

### Bookmarks

Save a place with the bookmark button, and the bookmarks drawer lists them for
one-tap jumping. A bookmark records the exact position rather than a page
number, so it reopens on the same words no matter how you've since changed the
font size or resized the window. Bookmarks are per user.

### Home rails

Two book rails — **Continue reading** and **New books** — appear on your home
screen alongside the comic and audiobook rails. Hide either from its ×, or
toggle them on your Profile page; the choice is saved to your account, so it
follows you between devices.

## On your phone and tablet

The BackIssue apps for [Android](android) and [iPhone and iPad](ios) read your books too. Books sit in the
one **Library** alongside comics and audiobooks — filter by medium, or let
**All** group them under their own headers — and a book in progress joins
**Reading now** on Home, with new books waiting under a **NEW BOOK** tag.

The mobile reader uses the same engine as the browser, so a position saved on
one device is the exact position on every other, down to the word. It adds:

- **Display** — Ink, Sepia and Paper themes; Literata, a sans face, or
  OpenDyslexic; text size, line spacing, justification; paginated or
  scrolling. Saved to your device, not per book.
- **Highlights and notes** — select a passage and pick a colour, add a note,
  look a word up, find it elsewhere in the book, or share it. Highlights sync
  through your account, and the **Highlights** page for a book filters by
  colour or notes and exports everything as Markdown.
- **Contents** — with search inside the book and a resume bar; on iPad the
  contents open as a sidebar you can leave open while reading, and landscape
  reads as a two-page spread on tablets.
- **Offline** — download a book from its page and it reads with no server at
  all; positions and highlights made offline land the next time you connect.

PDFs open in a paged viewer of their own (pinch to zoom, swipe to turn), and
their page is saved like an EPUB position.

The Display sheet also has a brightness slider, a true-black theme for OLED
screens and a switch for page-turn animation; on Android the volume buttons
can turn pages. Drag the progress bar to scrub through the book with the
chapter and page under your finger. Select a word and pick **Look up** (Android)
or **Define** (iOS) for a dictionary card without leaving the page. And if
another device has read further since you last opened a book here, the reader
says so and offers to jump there rather than moving you silently.

**Read aloud** (the headphones button) speaks the book with the device's own
voice, one sentence at a time with the passage lit, turning pages as it goes —
with previous / play / next and a speed control. The Display sheet also covers
margins, body weight, a switch to keep the publisher's own fonts, keeping the
screen on and locking the orientation. Tap a picture to see it full screen,
and a **Back** pill appears after you follow a link or a search hit. Footnote
references open the note in place; search hits can be stepped through from the
footer; the last page offers to mark the book finished or go on to the next
volume of a set; and the footer line can show the chapter, the whole book, a
percentage, or nothing at all.

## Adding books

With a Books library set up, the library's **Add** button gains a **Books**
tab. Search the catalog by title, author or ISBN; each result says whether it
is already on the shelf, or already wanted. **Add** puts the book on the
wanted list and asks your [download sources](sources) for it at once — by
ISBN first, where the catalog knows one — and the button says what happened:
downloading from which source, in the library, or wanted. A book no source
has yet stays wanted: the **Fill wanted books** job (System → Jobs) asks
again on its schedule, and a scan or import that brings the book in by other
means takes it off the list. Whoever added it is notified when it lands.

<figure class="bi-ex" v-pre>
  <div class="bi-ex__frame" role="img" aria-label="The Add dialog on its Books tab, searching for dune: Dune is already in the library, Dune Messiah is downloading, Children of Dune is wanted, and God Emperor of Dune still has its Add button">
    <div class="x-c-add">
      <div class="x-c-add-head">
        <div class="x-c-add-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg></div>
        <div class="x-c-add-titles">
          <div class="x-c-add-title">Add a book</div>
          <div class="x-c-add-sub">Search the books catalog and get it from your download sources</div>
        </div>
        <span class="x-c-add-x"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg></span>
      </div>
      <div class="x-c-add-switchrow"><div class="x-c-add-switch"><span class="x-c-add-seg"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg> Comics</span><span class="x-c-add-seg"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg> Manga</span><span class="x-c-add-seg x-c-add-seg--on"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg> Books</span><span class="x-c-add-seg"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg> Audiobooks</span></div></div>
      <div class="x-c-add-search"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.35-4.35"/></svg><div class="x-c-add-input">dune</div></div>
      <div class="x-c-add-results">
        <div class="x-c-add-row x-c-add-row--dim">
          <div class="x-c-cover">D</div>
          <div class="x-c-add-info">
            <div class="x-c-add-name">Dune <span class="x-c-add-year">(1965)</span></div>
            <div class="x-c-add-meta">Frank Herbert · Chilton Books · 412 pages</div>
          </div>
          <span class="x-c-add-btn x-c-add-btn--ghost">In library</span>
        </div>
        <div class="x-c-add-row">
          <div class="x-c-cover">DM</div>
          <div class="x-c-add-info">
            <div class="x-c-add-name">Dune Messiah <span class="x-c-add-year">(1969)</span></div>
            <div class="x-c-add-meta">Frank Herbert · G. P. Putnam's Sons · 256 pages</div>
          </div>
          <span class="x-c-add-btn x-c-add-btn--done">Downloading</span>
        </div>
        <div class="x-c-add-row">
          <div class="x-c-cover">CO</div>
          <div class="x-c-add-info">
            <div class="x-c-add-name">Children of Dune <span class="x-c-add-year">(1976)</span></div>
            <div class="x-c-add-meta">Frank Herbert · G. P. Putnam's Sons · 444 pages</div>
          </div>
          <span class="x-c-add-btn x-c-add-btn--done">Wanted</span>
        </div>
        <div class="x-c-add-row">
          <div class="x-c-cover">GE</div>
          <div class="x-c-add-info">
            <div class="x-c-add-name">God Emperor of Dune <span class="x-c-add-year">(1981)</span></div>
            <div class="x-c-add-meta">Frank Herbert · G. P. Putnam's Sons · 423 pages</div>
          </div>
          <span class="x-c-add-btn x-c-add-btn--add">Add</span>
        </div>
      </div>
    </div>
  </div>
  <figcaption>
    Each result says where the book stands. After <b>Add</b>, the button keeps the outcome:
    <b>Downloading</b> when a source had it, <b>Wanted</b> when none did yet.
  </figcaption>
</figure>

`GET /api/ebooks/wanted` lists the wanted books and
`DELETE /api/ebooks/wanted/<id>` drops one (the **Manage library** permission,
like adding).

## On-demand libraries

A source plugin can register an entire remote catalog as **file-less** entries:
browsable books with covers and details, but nothing downloaded. The book's
file is fetched the first time someone opens it and served from disk
thereafter, so a very large shelf can be browsed without pulling it down first.
A short "Opening…" pause on that first read is normal.

On-demand entries are best kept in their own Books library so they don't swamp
the books you own. They're never counted as missing — they're there to read,
just not on disk yet.

To take a source's entries off the shelf again — you removed its plugin, or
you want the shelf reset — call `DELETE /api/ebooks/remote/<source id>` (the
**Manage library** permission). Every file-less entry it added goes, with the
series left empty; a book it had already fetched to a file stays, as an
ordinary local book. The same for audiobooks:
`DELETE /api/audiobooks/remote/<source id>`.

## Elsewhere in the app

- **[OPDS](opds)** serves your books to external reader apps, with downloads
  and covers.
- **Import** recognizes loose ebook files under your scan roots and files them
  into the Books library as `Author/Series/Title.ext`.
- **Permission** — *Books library* (`ebooks.use`, viewer tier) covers reading
  and downloading book files. Scanning and re-matching ride the normal
  library-management permission.
