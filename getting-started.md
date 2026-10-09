---
description: "Install BackIssue with Docker or from source, walk through first-run setup, and take a tour of the app."
---

# Getting started

## Requirements

- **Docker** (recommended) — or **Node.js 22+** to run from source
- Somewhere to put comics — a local folder or a network share

## Install with Docker (recommended)

The published image is `ghcr.io/backissueapp/backissue` — `latest` tracks
releases, version tags (e.g. `0.8.4`) pin a release, and `nightly` is the
newest development build.

Every one of those tags also has a **browser build**, the same tag with
`-browser` on the end (`latest-browser`, `0.8.4-browser`,
`nightly-browser`). It bundles a real Chromium and a virtual display, which
makes it roughly a gigabyte larger, so run the lean image unless something
asks you not to. What asks is a download source: a few sites escalate
headless browsers — FlareSolverr included — to a manual captcha, and only a
real browser window gets through. Those sources say they need the browser
build; on the lean one they stay switched off and their card says why. See
[Download sources](sources).

With Docker Compose:

```yaml
services:
  backissue:
    image: ghcr.io/backissueapp/backissue:latest
    container_name: backissue
    ports:
      - "8787:8787"
    volumes:
      - ./data:/data              # database, settings, installed plugins
      - /path/to/comics:/comics   # your comic library
    environment:
      - PUID=99    # file owner for /data and imported comics (run `id` for yours)
      - PGID=100
      - UMASK=022
      - TZ=Europe/Dublin   # local time for schedules
    restart: unless-stopped
```

```bash
docker compose up -d
```

Or with plain `docker run`:

```bash
docker run -d -p 8787:8787 \
  -e PUID=99 -e PGID=100 -e TZ=Europe/Dublin \
  -v /path/to/data:/data \
  -v /path/to/comics:/comics \
  ghcr.io/backissueapp/backissue:latest
```

Those four variables are the ones almost everyone sets; the rest, including
what to do behind a reverse proxy and how to serve on a different port, are in
the [environment variable reference](settings-reference#environment-variables).

Then open **http://localhost:8787**. Mount your comic library at `/comics` and
point a **library** at it under **Settings → Library**; if a download client
(SABnzbd, NZBGet, qBittorrent) runs in another container, mount its
completed-downloads folder too so BackIssue can import finished downloads.

### Unraid

BackIssue is in **Community Applications**, so there's nothing to write by hand:
open the **Apps** tab, search for *BackIssue*, and click **Install**. The template
arrives with ports, paths and permissions already mapped — point the comics volume
at your share, and the appdata volume takes care of itself.

Without Community Applications, add `https://backissue.app/unraid/backissue.xml`
as a template URL on the **Docker** tab (or copy it into
`/boot/config/plugins/dockerMan/templates-user/`), then create the container from
the **BackIssue** template.

### An optional companion: FlareSolverr

Several download sites sit behind Cloudflare, and the sources that use them
share one setting — **FlareSolverr URL** in **Settings → Downloading**. It is
a small service you run yourself, so if you plan to use those sources, add it
to the same Compose file as a second service beside `backissue`:

```yaml
  flaresolverr:
    image: ghcr.io/flaresolverr/flaresolverr:latest
    container_name: flaresolverr
    ports:
      - "8191:8191"
    restart: unless-stopped
```

Then set the FlareSolverr URL to `http://flaresolverr:8191/v1` (the two
containers need to share a network — Compose does that for you). Leave it
blank if none of your sources are behind Cloudflare; see
[Download sources](sources).

### Updating

Pull the newer image and recreate the container:

```bash
docker compose pull
docker compose up -d
```

With plain `docker run`, pull, remove and start again with the same
options — `docker pull ghcr.io/backissueapp/backissue:latest`, then
`docker stop backissue && docker rm backissue`, then your original
`docker run` line. Your `/data` volume carries the database, settings and
installed plugins across, so nothing is lost.

## Install from source

```bash
npm install
npm run up      # builds the web UI, then starts the server
```

Then open **http://localhost:8787**.

Other useful commands:

| Command | What it does |
|---|---|
| `npm run up` | Build the frontend and start — use this after updating |
| `npm start` | Start the server without rebuilding the UI |
| `npm run dev` | Start with auto-restart on backend changes |
| `npm test` | Run the test suite |

## First-run setup

The first time you open BackIssue it asks you to **create the admin account**
(a fresh install never runs unsecured), then a short wizard walks you through
the essentials:

1. **Metadata** — nothing to do: series and issue data comes from the built-in BackIssue metadata service. (Prefer querying ComicVine directly? Paste your own API key here — switchable anytime in Settings → Metadata.)
2. **Libraries** — create one or more named **libraries**, each with a type — Comics and Manga are built in, and Books and Audiobooks arrive with their plugins — and its own folder on disk (Docker: `/comics`). A **Comics** library is set up for you; add more, or leave a folder blank to decide later, and manage them anytime in Settings.
3. **A download source** — enable at least one of Usenet or torrents so BackIssue can actually fetch comics. You can skip this and set it up later — see [Download sources](sources).
4. **Plugins** — pick optional plugins (the in-browser reader, Discover, OPDS, Requests, extra sources…); they download and activate when you finish. More can be added anytime from the Plugins page.

<figure class="bi-ex" v-pre>
  <div class="bi-ex__frame" role="img" aria-label="First-run setup, step 2 of 5: Set up your libraries, with a Comics library pointed at /comics and a second Manga library whose folder is left blank, an Add another library button, a note about Import, and Skip setup, Back and Continue buttons">
    <div class="x-a-obx">
      <div class="x-a-obx__rail">
        <div class="x-a-obx__brand"><span class="x-a-obx__logo">BackIssue</span></div>
        <div class="x-a-obx__steps">
            <span class="x-a-obx__step x-a-obx__step--done"><span class="x-a-obx__dot"><svg class="x-a-ico" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg></span><span>Welcome</span></span>
            <span class="x-a-obx__step x-a-obx__step--on"><span class="x-a-obx__dot">2</span><span>Library</span></span>
            <span class="x-a-obx__step"><span class="x-a-obx__dot">3</span><span>Downloads</span></span>
            <span class="x-a-obx__step"><span class="x-a-obx__dot">4</span><span>Plugins</span></span>
            <span class="x-a-obx__step"><span class="x-a-obx__dot">5</span><span>Finish</span></span>
        </div>
        <div class="x-a-obx__progress">
          <div class="x-a-obx__track"><div class="x-a-obx__fill" style="width:25%"></div></div>
          <div class="x-a-obx__ptext">Step 2 of 5 · about two minutes</div>
        </div>
      </div>
      <div class="x-a-obx__main">
        <div class="x-a-obx__content">
          <div class="x-a-obx__eyebrow">Step 2 · Storage</div>
          <h3 class="x-a-obx__h1">Set up your libraries</h3>
          <p class="x-a-obx__lead">A library is a named collection with a type and a folder on disk. Create one to start — add more here or in <b>Settings</b> later. Files are organized into <b>folder</b>/Publisher/Title (Year).</p>
          <div class="x-a-obx__libs">
            <div class="x-a-obx__lib">
              <div class="x-a-obx__libtop">
                <span class="x-a-obx__libico"><svg class="x-a-ico" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg></span>
                <span class="x-a-obx__libname">Comics</span>
                <span class="x-a-obx__libtype x-a-select">Comics<svg class="x-a-ico" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></span>
                <span class="x-a-obx__librm"><svg class="x-a-ico" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg></span>
              </div>
              <div class="x-a-obx__libfolder">
                <span class="x-a-obx__libfico"><svg class="x-a-ico" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 9V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z"/></svg></span>
                <span class="x-a-obx__libpath">/comics</span>
              </div>
            </div>
            <div class="x-a-obx__lib">
              <div class="x-a-obx__libtop">
                <span class="x-a-obx__libico"><svg class="x-a-ico" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg></span>
                <span class="x-a-obx__libname">Manga</span>
                <span class="x-a-obx__libtype x-a-select">Manga<svg class="x-a-ico" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></span>
                <span class="x-a-obx__librm"><svg class="x-a-ico" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg></span>
              </div>
              <div class="x-a-obx__libfolder">
                <span class="x-a-obx__libfico"><svg class="x-a-ico" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 9V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z"/></svg></span>
                <span class="x-a-obx__libpath"><span class="x-a-placeholder">D:\Comics  or  \\NAS\comics</span></span>
              </div>
            </div>
          </div>
          <span class="x-a-obx__addlib"><svg class="x-a-ico" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg> Add another library</span>
          <div class="x-a-obx__note"><span class="x-a-obx__noteico"><svg class="x-a-ico" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 16v-4M12 8h.01"/></svg></span><p>Already have comics in these folders? After setup, use <b>Import</b> in the sidebar to match them to ComicVine and pull them into the collection. Leave a folder blank to decide later.</p></div>
        </div>
        <div class="x-a-obx__foot">
          <span class="x-a-obx__skip">Skip setup</span>
          <div class="x-a-obx__right">
            <span class="x-a-obx__back">Back</span>
            <span class="x-a-obx__next">Continue <svg class="x-a-ico" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <figcaption>
    The <b>Library</b> step of the wizard. The Comics library comes pre-filled — under Docker, point it at <code>/comics</code>;
    a second library can leave its folder blank and get one later in Settings.
  </figcaption>
</figure>

Everything the wizard sets can be changed later in **Settings**.

## A quick tour

The app is laid out with a **sidebar of sections** on the left and the content on the right:

- **Library** — a poster wall (or dense list — toggle ⊞/≣) of every series you track, with owned/total counts and badges for missing, untagged, or corrupt files. A row of filter chips, a sort dropdown, and search sit at the top — see [the Library view](collection#the-library-view) for what each chip does. Click a series to open its issue list.
- **Series page** — the full ComicVine issue list for a series: what you own, what's missing, per-issue read/download buttons, and series-level actions (download missing, search sources, search packs, tag files, add to a reading list, and more).
- **Sidebar sections** — Library, [Collections](collection#collections) (multi-volume book and audiobook series), Wanted, Queue (live download progress), Releases (this week's issues for series you follow), Lists (reading lists), History, [Stats](library#stats), plus plugin entries like Discover, Requests, and reading tools. Admins also get a **System** area: Users, Plugins, a unified **System** page (Jobs, Tools and Logs on tabs), and Settings.
- **Header** — global search, a **notification bell**, and a **?** help button that explains whatever page you're on.

<figure class="bi-ex" v-pre>
  <div class="bi-ex__frame x-a-fit" role="img" aria-label="The BackIssue sidebar for an admin: Library section (Home, Collections, Lists, Import, Stats), Libraries (Comics, Manga), Downloads (Wanted, Queue with active and failed counts, Releases, History) and System (Users, Plugins, System, Settings), with the account chip at the bottom">
    <div class="x-a-shell">
      <div class="x-a-side">
        <div class="x-a-brand"><span class="x-a-brand__logo">BACKISSUE</span></div>
        <div class="x-a-nav">
          <div class="x-a-nav__head">Library <span class="x-pin">1</span></div>
          <span class="x-a-nav__item"><span class="x-a-nav__icon"><svg class="x-a-ico" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/></svg></span> Home</span>
          <span class="x-a-nav__item"><span class="x-a-nav__icon"><svg class="x-a-ico" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12 2 9 5-9 5-9-5 9-5z"/><path d="m3 12 9 5 9-5M3 17l9 5 9-5"/></svg></span> Collections</span>
          <span class="x-a-nav__item"><span class="x-a-nav__icon"><svg class="x-a-ico" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg></span> Lists</span>
          <span class="x-a-nav__item"><span class="x-a-nav__icon"><svg class="x-a-ico" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 9V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-8"/><path d="M2 13h10M9 16l3-3-3-3"/></svg></span> Import</span>
          <span class="x-a-nav__item"><span class="x-a-nav__icon"><svg class="x-a-ico" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20V10M18 20V4M6 20v-4"/></svg></span> Stats</span>
          <div class="x-a-nav__head">Libraries <span class="x-pin">2</span></div>
          <span class="x-a-nav__item x-a-nav__item--on"><span class="x-a-nav__icon"><svg class="x-a-ico" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg></span> Comics</span>
          <span class="x-a-nav__item"><span class="x-a-nav__icon"><svg class="x-a-ico" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg></span> Manga</span>
          <div class="x-a-nav__head">Downloads <span class="x-pin">3</span></div>
          <span class="x-a-nav__item"><span class="x-a-nav__icon"><svg class="x-a-ico" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/></svg></span> Wanted</span>
          <span class="x-a-nav__item"><span class="x-a-nav__icon"><svg class="x-a-ico" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v13M8 12l4 4 4-4"/><path d="M5 21h14"/></svg></span> Queue<span class="x-a-nav__count">4</span><span class="x-a-nav__count x-a-nav__count--bad">1</span></span>
          <span class="x-a-nav__item"><span class="x-a-nav__icon"><svg class="x-a-ico" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg></span> Releases</span>
          <span class="x-a-nav__item"><span class="x-a-nav__icon"><svg class="x-a-ico" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 3v5h5"/><path d="M3.05 13A9 9 0 1 0 6 5.3L3 8"/><path d="M12 7v5l3 2"/></svg></span> History</span>
          <div class="x-a-nav__head">System <span class="x-pin">4</span></div>
          <span class="x-a-nav__item"><span class="x-a-nav__icon"><svg class="x-a-ico" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg></span> Users</span>
          <span class="x-a-nav__item"><span class="x-a-nav__icon"><svg class="x-a-ico" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 7h3a1 1 0 0 0 1-1V5a2 2 0 1 1 4 0v1a1 1 0 0 0 1 1h3a1 1 0 0 1 1 1v3a1 1 0 0 0 1 1h1a2 2 0 1 1 0 4h-1a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1v-1a2 2 0 1 0-4 0v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a2 2 0 1 0 0-4H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1z"/></svg></span> Plugins</span>
          <span class="x-a-nav__item"><span class="x-a-nav__icon"><svg class="x-a-ico" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg></span> System</span>
          <span class="x-a-nav__item"><span class="x-a-nav__icon"><svg class="x-a-ico" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg></span> Settings</span>
        </div>
        <div class="x-a-user">
          <div class="x-a-user__chip"><span class="x-a-user__avatar">A</span><span class="x-a-user__name">alex</span><span class="x-a-user__role">admin</span><span class="x-a-user__caret"><svg class="x-a-ico" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></span></div>
        </div>
        <div class="x-a-version">BackIssue v0.8.4</div>
      </div>
    </div>
  </div>
  <figcaption>
    The sidebar as an admin sees it. <span class="x-pin">1</span> Home (your reading shelves) and the collection-wide pages.
    <span class="x-pin">2</span> One entry per library. <span class="x-pin">3</span> Downloads — the Queue count shows active items, failures in red.
    <span class="x-pin">4</span> The admin area. Plugin entries such as Discover join the menu once installed, and sections you lack permission for simply don't appear.
  </figcaption>
</figure>

Every filter and view is reflected in the URL, so you can bookmark or share any view. Buttons you don't have permission for simply don't appear.

## Adding your first comics

Click **+ Add** on the Library page, search ComicVine, and pick the volume. By default, **adding a volume immediately queues its issues to download** — so a fresh series starts filling itself in. You can turn that off (Settings → Downloading → "Download on add") if you'd rather add empty and download by hand.

Prefer to browse rather than search? The **Discover** section surfaces new and notable comics to add with one click — see [Discover](discover).

## Core concepts

| Term | Meaning |
|---|---|
| **Series** | A comic volume, matched to a ComicVine volume (e.g. *Saga (2012)*). |
| **Issue** | One issue of a series. BackIssue knows the full issue list from ComicVine. |
| **Owned / Missing** | An issue is *owned* when a valid file for it exists in your library, otherwise *missing*. |
| **Monitored** (★) | Monitored series are included in automatic searching and weekly-release tracking. Unmonitored series are still tracked, just left alone. |
| **Library** | A named collection with a type — Comics or Manga, or Books and Audiobooks once those plugins are installed — and one or more folders on disk that BackIssue scans and files comics into. You can have several. |
| **Source** | Somewhere BackIssue can download from — Usenet, torrents, or a plugin source. |
| **Queue** | The live pipeline of issues being searched, downloaded, and imported. |

## Install as an app (iPad, phone, desktop)

BackIssue is installable: open it in the browser and use **Add to Home Screen** (iOS/iPadOS Safari: Share → Add to Home Screen; desktop Chrome/Edge: the install icon in the address bar). It launches full-screen with its own icon, like a native app.

::: tip HTTPS unlocks offline
Installing works over plain HTTP, but the reader's offline downloads and other service-worker features need a secure context — put BackIssue behind HTTPS (a reverse proxy like Caddy, or Tailscale) to get the full experience.
:::

## Accounts and access

The first account (created on first run) is the admin. To give household
members their own logins, roles, permissions, and reading history, add
accounts under **Users** — see [Users & access](users).

## Where your data lives

Everything lives in one data directory — `/data` in Docker (keep that volume
persistent!), or next to the app when running from source:

- `catalog.db` — the database: series, issues, the file index, history, **and** accounts, roles, reading history, reading lists, and requests. Back it up from **System → Tools → Back up database** (it keeps the newest 5 snapshots).
- `settings.json` — your settings, written whenever you save Settings.
- `plugins/` — plugins installed from the in-app catalog (Docker: under `/data` so they survive image updates).

Comics themselves live in your library folders, organized by your [naming patterns](library#naming-patterns) — by default one `Publisher/Series (Year)` folder per series.
