---
description: "Set up Usenet and torrent downloading, add download sites, and control the order the app tries them in."
---

# Download sources

BackIssue ships with two source families built in — **Usenet** and **torrents** — and loads more as [plugins](plugins). Enable as many as you like; every download tries them in your priority order and takes the first match.

## Usenet

Usenet needs two pieces: one or more **Newznab indexers** (to find releases) and a **download client** (to fetch them).

### Indexers

Add any Newznab-compatible indexer (NZBGeek, NZBFinder, althub, a private one — anything exposing the Newznab API). For each: a **URL** and an **API key**. You can add several; searches fan out across all of them and results merge into one ranked list.

::: tip Run Prowlarr?
The **[Prowlarr plugin](prowlarr)** feeds both this source and Torrents with every indexer your Prowlarr instance manages — one URL + API key instead of listing indexers here.
:::

### Download client

Both major clients are supported:

- **SABnzbd** — host, port, API key (plus an optional **URL base** when a proxy serves it under a subpath, e.g. `/sabnzbd`)
- **NZBGet** — host, port, username/password

Plus a **category** (e.g. `backissue`) so comic downloads stay separate in your client, and a poll interval / timeout for the monitor that watches for finished downloads.

<figure class="bi-ex" v-pre>
  <div class="bi-ex__frame" role="img" aria-label="Settings, Sources, Usenet panel: the source switched on, two Newznab indexers that tested OK, and the SABnzbd download client fields">
    <div class="x-b-detail">
      <div class="x-b-scard x-b-srchead">
        <span class="x-switch" aria-hidden="true"></span>
        <div class="x-b-srchead__text">
          <b>Usenet</b>
          <span>Search Newznab indexers and download via SABnzbd or NZBGet.</span>
        </div>
        <span class="x-b-dot x-b-dot--green"></span>
      </div>
      <div class="x-b-scard">
        <h3 class="x-b-scard__head">Indexers <span class="x-pin">1</span></h3>
        <div class="x-b-ixlist">
          <div class="x-b-ixrow">
            <div class="x-b-ixrow__info"><b>My indexer</b><span>https://indexer.example.com</span></div>
            <span class="x-b-ixrow__ok"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg> OK</span>
            <span class="x-b-linkbtn">Test</span>
            <span class="x-b-linkbtn">Edit</span>
            <span class="x-b-ixrow__x"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg></span>
          </div>
          <div class="x-b-ixrow">
            <div class="x-b-ixrow__info"><b>Backup indexer</b><span>https://nzb.example.org</span></div>
            <span class="x-b-ixrow__ok"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg> OK</span>
            <span class="x-b-linkbtn">Test</span>
            <span class="x-b-linkbtn">Edit</span>
            <span class="x-b-ixrow__x"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg></span>
          </div>
        </div>
        <span class="x-b-btn">+ Add indexer</span>
        <p class="x-note">Newznab (the standard indexer API — e.g. NZBgeek) indexers, searched in order; results are merged.</p>
      </div>
      <div class="x-b-scard">
        <h3 class="x-b-scard__head">Download client <span class="x-pin">2</span></h3>
        <div class="x-field"><span class="x-label">Client</span><div class="x-input x-b-select">SABnzbd<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></div></div>
        <div class="x-field"><span class="x-label">Host</span><div class="x-input">192.168.1.10</div></div>
        <div class="x-field"><span class="x-label">Port</span><div class="x-input">8080</div></div>
        <div class="x-field"><span class="x-label">URL base</span><div class="x-input x-b-ph">blank, or e.g. /sabnzbd</div></div>
        <div class="x-check"><span class="x-b-cbox"></span><span>Use HTTPS</span></div>
        <div class="x-field"><span class="x-label">API key</span><div class="x-input">••••••••••••••••</div></div>
        <div class="x-field"><span class="x-label">Category</span><div class="x-input x-b-plain">backissue</div></div>
        <div class="x-b-test"><span class="x-b-btn">Test connection</span></div>
      </div>
    </div>
  </div>
  <figcaption>
    <span class="x-pin">1</span> Each indexer has its own <b>Test</b>; every one listed is searched and the results merged.
    <span class="x-pin">2</span> The client card swaps the API key for username and password when you pick NZBGet.
  </figcaption>
</figure>

### Completed-download paths

If BackIssue and your Usenet client run on **different machines** (or one is in Docker), the client's "completed downloads" folder has two names — the path *the client* sees and the path *BackIssue* sees. Set both:

- **Completed folder (client's view)** — e.g. `/downloads/complete/backissue`
- **Completed folder (BackIssue's view)** — e.g. `\\NAS\downloads\complete\backissue`

<figure class="bi-ex" v-pre>
  <div class="bi-ex__frame" role="img" aria-label="Completed downloads card with the folder as this app sees it and as the download client sees it">
    <div class="x-b-detail">
      <div class="x-b-scard">
        <h3 class="x-b-scard__head">Completed downloads</h3>
        <div class="x-field"><span class="x-label">Folder (this app's view)</span><div class="x-input">\\NAS\downloads\complete\backissue</div></div>
        <div class="x-field"><span class="x-label">Folder (client's view)</span><div class="x-input">/downloads/complete/backissue</div></div>
        <p class="x-note">Only needed if the client runs on another machine. Map the folder it writes finished downloads to (client's view) onto the path this app reads it at over the network. <code>.cbr</code> releases are converted to <code>.cbz</code> so they can be tagged.</p>
      </div>
    </div>
  </div>
  <figcaption>
    In the app the two fields are labelled <b>this app's view</b> (BackIssue's) and <b>client's view</b>.
    Both point at the same folder.
  </figcaption>
</figure>

If both run on the same machine with the same paths, set just one (or neither, if the client reports absolute paths BackIssue can read).

## Torrents

Same shape as Usenet: **Torznab indexers** (via Prowlarr or Jackett) plus **qBittorrent** as the download client.

- **Torznab indexers** — one or more URL + API key entries. Prowlarr gives you a Torznab URL per indexer it manages.
- **qBittorrent** — host, port, username/password, optional SSL.
- **URL base** — set this when a reverse proxy serves the client under a subpath rather than at the root, so its API lives at `http://host:port/qbittorrent/api/…`. Blank for a normal install. (Seedbox providers commonly do this; it's the same field the *arr apps call "URL Base".) Transmission and Deluge have the same option.
- **Category** — keeps BackIssue's torrents grouped in qBittorrent.
- **Completed-folder mapping** — same two-path idea as Usenet, for remote/Docker setups.

Grabbed torrents are handed to qBittorrent and monitored to completion; the finished file is then imported, tagged, and filed like any other download. Seeding continues per your qBittorrent rules — BackIssue copies files in rather than moving them.

### The weekly 0-day pack

An optional torrent-only automation: each week the scene releases a "0-day" pack containing that week's comics. With the **zero-day** schedule enabled, BackIssue grabs the newest weekly pack, and when it completes, imports *only the issues you're missing* from series you track — optionally adding brand-new series it finds ([`zeroDayAddNew`](settings-reference)). It never re-grabs a week it has already processed.

## MangaDex

The **MangaDex plugin** downloads manga chapters: it finds the wanted chapter,
fetches its pages and hands the app a finished file — no download client or
indexer involved. A manga series added from the hosted metadata service
already carries its MangaDex identity, so a chapter maps straight to the
right upload; any other series is looked up by title and matched against its
names and aliases.

Enable it in **Settings → Sources → MangaDex**, where you can set which
chapter languages to accept (best first), which scanlation groups to prefer
when a chapter has several uploads, and whether to take the smaller
data-saver images. Otherwise the newest readable upload wins. A manual search
from an issue's ⋯ menu lists every upload with its group, language and page
count, so you can pick a different one.

## WeebCentral

The **WeebCentral plugin** downloads manga chapters from the site: it finds the
chapter, fetches its pages and hands the app a finished file. The site sits
behind Cloudflare, so set the **FlareSolverr URL** in **Settings →
Downloading** — one setting shared by every source that needs it — and this
works on the standard build; on the browser build it can also fall back to the
built-in browser.

A manual search from an issue's ⋯ menu lists the matching chapter of each
candidate series with its release date.

## MangaTaro

The **MangaTaro plugin** downloads manga chapters from the site. It needs
nothing extra: ordinary requests on the standard build, no Cloudflare helper
and no account. Enable it in **Settings → Sources → MangaTaro** and set which
chapter languages you accept, best first.

Among the uploads of a chapter, the first language you listed wins, then the
newest. Chapters that are prose rather than scans are skipped. A manual search
from an issue's ⋯ menu lists every upload with its language, scanlation group
and release date.

## Atsumaru

The **Atsumaru plugin** downloads manga chapters from the site, needing nothing
extra: ordinary requests on the standard build, no Cloudflare helper and no
account. Enable it in **Settings → Sources → Atsumaru**.

Series are matched against the site's own alternate titles as well as the names
your library holds, so a series listed under a different title is still found.
When a chapter number has been uploaded more than once, the newest wins, and a
manual search from an issue's ⋯ menu lists every upload with its page count.

## Anna's Archive {#annas-archive}

The **Anna's Archive plugin** downloads **books** (EPUB and PDF) for Books
libraries — an approved [book request](requests#books-and-audiobooks), for
instance. Comic and manga libraries never search it.

It works with or without a membership. **With a member account's secret
key** (from your account page on the site; masked on the card), files come
through the site's fast-download API — a direct link, no browser check per
file — and the log shows how many fast downloads you have left after each
one. **Without a key**, files come from the site's free slow partner
servers: a browser check per file, a slower transfer, and a daily limit per
IP; a server that asks for a wait is waited out once, one that asks for a
captcha is skipped for the next. **Test connection** checks the key without
spending a download, or, with no key, that the site answers.

What it does need is:

- **The browser build of the app** (the image tagged `-browser`). The search
  page checks for a real browser and escalates headless browsers and
  FlareSolverr to a manual captcha, so the app's own browser clears it; after
  that its cookies carry ordinary requests for a while. On the standard build
  the source stays off and the card says why.

Set the **languages** you accept, best first (`en, de`; empty = any). The
site moves between domains now and then — change the **Site URL** on the card
when it does. Among matches, your first language wins, then EPUB over PDF,
then the larger file.

## Source priority

Settings lists every enabled source in a drag-to-reorder priority list. For each issue, sources are tried **top to bottom — first match wins**, so put your fastest/cleanest source first and slower or scarcer ones lower as fallbacks.

<figure class="bi-ex" v-pre>
  <div class="bi-ex__frame" role="img" aria-label="Source priority panel listing four enabled sources in order, each with move-up and move-down buttons">
    <div class="x-b-detail">
      <h3 class="x-title">Source priority</h3>
      <p class="x-sub">When more than one source can serve an issue, they're tried top-to-bottom — the first with a match wins.</p>
      <div class="x-b-scard">
      <div class="x-b-pri">
        <span class="x-b-pri__rank">1</span><span class="x-b-pri__name">Usenet</span>
        <span class="x-b-pri__btn x-b-pri__btn--off"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg></span>
        <span class="x-b-pri__btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 5v14M5 12l7 7 7-7"/></svg></span>
      </div>
      <div class="x-b-pri">
        <span class="x-b-pri__rank">2</span><span class="x-b-pri__name">Torrent</span>
        <span class="x-b-pri__btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg></span>
        <span class="x-b-pri__btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 5v14M5 12l7 7 7-7"/></svg></span>
      </div>
      <div class="x-b-pri">
        <span class="x-b-pri__rank">3</span><span class="x-b-pri__name">AirDC++</span>
        <span class="x-b-pri__btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg></span>
        <span class="x-b-pri__btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 5v14M5 12l7 7 7-7"/></svg></span>
      </div>
      <div class="x-b-pri">
        <span class="x-b-pri__rank">4</span><span class="x-b-pri__name">MangaDex</span>
        <span class="x-b-pri__btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg></span>
        <span class="x-b-pri__btn x-b-pri__btn--off"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 5v14M5 12l7 7 7-7"/></svg></span>
      </div>
      </div>
    </div>
  </div>
  <figcaption>
    The arrows move a source up or down; the top source is asked first. The panel appears in the
    Sources rail once two or more sources are enabled.
  </figcaption>
</figure>

Priority also shapes *manual* search result ranking and pack searches.

## Which should I use?

Whatever you have. Practical notes:

- **Usenet** is fast and reliable for recent comics and popular back-catalogue; retention limits very old material.
- **Torrents** shine for weekly 0-day packs and long-tail material with healthy swarms.
- **Plugin sources** can cover the gaps both leave. The **[AirDC++ source](airdcpp)** adds Direct Connect (DC++) — good for long-tail material, with some etiquette and rate limits worth reading first. See [Plugins](plugins) for the plugin system.
