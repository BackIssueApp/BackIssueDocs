# Shelves

The **Shelves plugin** adds faceted browsing for large book and audiobook
libraries. Where the Library grid is built for scrolling and searching, Shelves
is built for narrowing: pick an author, a decade, a format, a reading status,
and see what's left.

It's most useful once a library is big enough that scrolling stops working —
tens of thousands of titles, where you know roughly what you want but not its
name.

## Browsing

**Shelves** in the sidebar opens a full-screen browser. Each facet group shows
its options with live counts, and choosing one narrows everything else:

- **Author** — sorted by surname, so *Frank Herbert* files under H.
- **Decade** — by publication year.
- **Format** — EPUB, PDF, or the audio formats in your library.
- **Status** — unread, in progress, or finished, from your own reading and
  listening progress.

Selections combine, and a search box narrows within them. Every result opens
the normal series page, so nothing about the rest of the app changes — Shelves
is a way in, not a separate world.

Counts and availability are per user: mature titles stay hidden from accounts
without the [permission](users#content-restrictions-mature-series), and reading
status reflects your own progress, not anyone else's.

## The index

Facets are served from an index the plugin builds from your catalog, which is
what keeps browsing instant on a very large library rather than running four
expensive queries per click. It refreshes on the schedulable **Rebuild the
browse index** job, and after a library scan adds titles.

If counts ever look stale — right after a big import, say — rebuilding the
index brings them back in line. That's `library.manage`; browsing itself only
needs the normal library-view permission.

## Settings

| Setting | Meaning |
|---|---|
| Enable Shelves | Master toggle for the sidebar entry and its browser. |
| Library types | Which library types get faceted browsing — books and audiobooks by default. |

Shelves works alongside the Library grid's own **Filters** button; the grid
filters what you're already looking at, while Shelves is for finding the shelf
in the first place.
