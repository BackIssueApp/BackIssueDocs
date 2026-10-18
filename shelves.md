---
description: "Browse large book and audiobook libraries by author, decade, format and status instead of scrolling one long list."
---

# Shelves

The **Shelves plugin** adds faceted browsing for large book and audiobook
libraries. Where the Library grid is built for scrolling and searching, Shelves
is built for narrowing: pick an author, a decade, a format, a reading status,
and see what's left.

It's most useful once a library is big enough that scrolling stops working.
Think tens of thousands of titles, where you know roughly what you want but not
its name.

## Browsing

**Shelves** in the sidebar opens a full-screen browser. The column on the left
holds the facets, each option with a live count, and choosing one narrows
everything else:

- **Author**: the most-shelved authors first, a search box for the rest, and an
  A–Z strip filed by surname, so *Frank Herbert* sits under H. Pick as many
  authors as you like.
- **Decade**: by publication year.
- **Format**: EPUB, PDF, Audio, or On demand for books you can fetch but
  haven't downloaded yet.
- **Reading status**: unread, reading, or finished, from your own reading and
  listening progress.

Choices show as chips above the results; remove one with its ×, or **Clear
all**. The search box narrows by title within the selection, and the sort menu
orders results by author, title, newest first, or recently added. With more
than one book or audiobook library, the library menu limits the browser to one
of them. More results load as you scroll.

Every result opens the normal series page, so nothing about the rest of the
app changes. Shelves is a way in, not a separate world.

On a phone the browser fills the screen and the facets move behind a
**Filters** button; **Show results** takes you back to the covers.

Counts and results are per user. Mature titles stay hidden from accounts
without the [permission](users#content-restrictions-mature-series), and from
accounts that switched them off for themselves. Reading status reflects your
own progress, not anyone else's.

## In the Library grid

The same facets appear in the Library grid's own **Filters** button on book
and audiobook libraries. There they narrow the grid you're already looking at,
keeping its sorting, search and paging. The sidebar browser is for finding the
shelf in the first place.

## The index

Facets are served from an index the plugin builds from your catalog. That is
what keeps browsing instant on a very large library, rather than running four
expensive queries on every click.

The index looks after itself. Every few minutes it checks the catalog, and when
a scan or an import has added or removed titles it rebuilds. The schedulable
**Rebuild the browse index** job also runs in full every night (04:30 by
default), which picks up quieter changes such as a book that has gained a file.

If counts ever look wrong, **Rebuild now** in the plugin's settings brings them
back in line. Rebuilding needs the library-management permission; browsing
only needs the normal library-view permission.

## Settings

**Settings → Plugins → Shelves**:

| Setting | What it does |
|---|---|
| Shelves | Master switch for the sidebar entry, its browser, and the facets in the Library **Filters** button. On by default. |
| Library types | Which libraries get faceted browsing: **Books**, **Audiobooks**, or both (the default). At least one stays on. |

The card also shows how many titles are indexed, with **Rebuild now** beside
it. Changes to either setting take effect after a page reload.
