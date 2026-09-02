# Audiobooks

The **Audiobooks plugin** adds an **Audiobooks** library type and an in-browser
player. Like books and comics, audiobooks live in the normal Library grid with
their own series pages — there's no separate section to learn.

## Setting up a shelf

Create a library of type **Audiobooks** (Settings → Library) and give it a
folder of `.m4b`, `.m4a` or `.mp3` files. The scan catalogs each one, taking
the title and author from the usual `Author/Title` folder layout, then fills in
covers, narrators, series, publisher and durations from the hosted metadata
service. Matching is best-effort — a title that doesn't match still plays, it
just keeps what the filenames gave it.

Scans are incremental and self-pruning, and run from the schedulable **Scan
audiobook libraries** job. Books that belong to a series share one shelf rather
than appearing as separate entries.

## Listening

Open an audiobook and press play. The player takes over the series page and
offers:

- **Chapters** — jump between chapters, when the source provides them.
- **Playback speed**, and skip forward / back.
- **Sleep timer** — for listening at bedtime.
- **Bookmarks** — save a moment with an optional note and return to it later.
- **Resume** — your position is saved per user, so any device continues where
  you stopped.

Listening progress and finished state are per account, so several people can
work through the same title independently.

## Streaming, not downloading

Audiobooks are big — often around a gigabyte — so a registered source streams
them rather than downloading them up front. Playback proxies range requests to
the source, which means seeking works normally and nothing buffers the whole
file into memory. The source's credentials stay on the server and are never
exposed to the browser.

A remote catalog can also be synced as **file-less** entries: browsable titles
with covers and details that stream on play. They're never counted as missing —
they're there to listen to, just not on disk.

## Mobile

Audiobooks are fully supported in the Android and iOS apps, with offline
downloads, a lock-screen player, chapter navigation, sleep timer and bookmarks.
Progress syncs with the web player through your account, so you can start on
your phone and finish in a browser.

## Elsewhere in the app

- Two home rails — **Continue listening** and **New audiobooks** — appear on
  your home screen. Hide either from its ×, or toggle them on your Profile
  page; the choice is saved to your account.
- **[Shelves](shelves)** gives a large audiobook library faceted browsing by
  author, decade, format and listening status.
- **Permission** — *Audiobooks* (`audiobooks.use`, viewer tier) covers browsing
  and playback. Scanning and catalog curation ride the normal
  library-management permission.
- A source flagged as explicit marks its series **mature**, so it follows the
  same [content restrictions](users#content-restrictions-mature-series) as
  everything else.
