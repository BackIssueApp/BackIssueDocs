---
description: "Shelve audiobooks beside your comics, enrich them with metadata, and listen in the browser with chapters, speed and a sleep timer."
---

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

## Adding audiobooks

With an Audiobooks library set up, the library's **Add** button gains an
**Audiobooks** tab. Search the catalog by title or author; each result says
whether it is already on the shelf, or already wanted. **Add** puts it on the
wanted list and asks your [download sources](sources) for it at once, and the
button says what happened: downloading from which source, in the library, or
wanted. One no source has yet stays wanted: the **Fill wanted audiobooks**
job (System → Jobs) asks again on its schedule, and a scan that brings it in
takes it off the list.

<figure class="bi-ex" v-pre>
  <div class="bi-ex__frame" role="img" aria-label="The Add dialog on its Audiobooks tab, searching for andy weir: Project Hail Mary is already in the library, The Martian is wanted, and Artemis still has its Add button">
    <div class="x-c-add">
      <div class="x-c-add-head">
        <div class="x-c-add-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg></div>
        <div class="x-c-add-titles">
          <div class="x-c-add-title">Add an audiobook</div>
          <div class="x-c-add-sub">Search the audiobooks catalog and get it from your download sources</div>
        </div>
        <span class="x-c-add-x"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg></span>
      </div>
      <div class="x-c-add-switchrow"><div class="x-c-add-switch"><span class="x-c-add-seg"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg> Comics</span><span class="x-c-add-seg"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg> Manga</span><span class="x-c-add-seg"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg> Books</span><span class="x-c-add-seg x-c-add-seg--on"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg> Audiobooks</span></div></div>
      <div class="x-c-add-search"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.35-4.35"/></svg><div class="x-c-add-input">andy weir</div></div>
      <div class="x-c-add-results">
        <div class="x-c-add-row x-c-add-row--dim">
          <div class="x-c-cover">PH</div>
          <div class="x-c-add-info">
            <div class="x-c-add-name">Project Hail Mary <span class="x-c-add-year">(2021)</span></div>
            <div class="x-c-add-meta">Andy Weir · Audible Studios · 16h · read by Ray Porter</div>
          </div>
          <span class="x-c-add-btn x-c-add-btn--ghost">In library</span>
        </div>
        <div class="x-c-add-row">
          <div class="x-c-cover">TM</div>
          <div class="x-c-add-info">
            <div class="x-c-add-name">The Martian <span class="x-c-add-year">(2014)</span></div>
            <div class="x-c-add-meta">Andy Weir · Podium Publishing · 11h · read by R.C. Bray</div>
          </div>
          <span class="x-c-add-btn x-c-add-btn--done">Wanted</span>
        </div>
        <div class="x-c-add-row">
          <div class="x-c-cover">A</div>
          <div class="x-c-add-info">
            <div class="x-c-add-name">Artemis <span class="x-c-add-year">(2017)</span></div>
            <div class="x-c-add-meta">Andy Weir · Audible Studios · 9h · read by Rosario Dawson</div>
          </div>
          <span class="x-c-add-btn x-c-add-btn--add">Add</span>
        </div>
      </div>
    </div>
  </div>
  <figcaption>
    Results carry the length and narrator. A title already on the shelf offers <b>In library</b>;
    one nobody has yet stays <b>Wanted</b> after you add it.
  </figcaption>
</figure>

`GET /api/audiobooks/wanted` lists the wanted audiobooks and
`DELETE /api/audiobooks/wanted/<id>` drops one (the **Manage library**
permission, like adding).

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

Audiobooks are fully supported in the [Android](android) and [iPhone and iPad](ios) apps, with offline
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
