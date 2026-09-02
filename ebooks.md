# Books

The **Ebooks plugin** adds a **Books** library type for your EPUB and PDF
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

## On-demand libraries

A source plugin can register an entire remote catalog as **file-less** entries:
browsable books with covers and details, but nothing downloaded. The book's
file is fetched the first time someone opens it and served from disk
thereafter, so a very large shelf can be browsed without pulling it down first.
A short "Opening…" pause on that first read is normal.

On-demand entries are best kept in their own Books library so they don't swamp
the books you own. They're never counted as missing — they're there to read,
just not on disk yet.

## Elsewhere in the app

- **[OPDS](opds)** serves your books to external reader apps, with downloads
  and covers.
- **Import** recognizes loose ebook files under your scan roots and files them
  into the Books library as `Author/Series/Title.ext`.
- **Permission** — *Books library* (`ebooks.use`, viewer tier) covers reading
  and downloading book files. Scanning and re-matching ride the normal
  library-management permission.
