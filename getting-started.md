# Getting started

## Requirements

- **Docker** (recommended) — or **Node.js 22+** to run from source
- A **ComicVine API key** — free from [comicvine.gamespot.com/api](https://comicvine.gamespot.com/api/) (you'll need a ComicVine account)
- Somewhere to put comics — a local folder or a network share

## Install with Docker (recommended)

The published image is `ghcr.io/backissueapp/backissue` — `latest` tracks
releases, version tags (e.g. `0.3.0`) pin a release, and `nightly` is the
newest development build.

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

Then open **http://localhost:8787**. Mount your comic library at `/comics` and
point a **library** at it under **Settings → Library**; if a download client
(SABnzbd, NZBGet, qBittorrent) runs in another container, mount its
completed-downloads folder too so BackIssue can import finished downloads.

::: tip Unraid
There's a ready-made template: in the Docker tab add
`https://backissue.app/unraid/backissue.xml` as a template URL (or copy it into
`/boot/config/plugins/dockerMan/templates-user/`), then create the container
from the **BackIssue** template — paths and permissions come pre-mapped.
:::

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

1. **ComicVine API key** — paste your key (free from ComicVine; it identifies every series and issue).
2. **Libraries** — create one or more named **libraries**, each with a type (Comics/Manga) and its own folder on disk (Docker: `/comics`). A **Comics** library is set up for you; add more, or leave a folder blank to decide later, and manage them anytime in Settings.
3. **A download source** — enable at least one of Usenet or torrents so BackIssue can actually fetch comics. You can skip this and set it up later — see [Download sources](sources).
4. **Plugins** — pick optional plugins (the in-browser reader, Discover, OPDS, Requests, extra sources…); they download and activate when you finish. More can be added anytime from the Plugins page.

Everything the wizard sets can be changed later in **Settings**.

## A quick tour

The app is laid out with a **sidebar of sections** on the left and the content on the right:

- **Library** — a poster wall (or dense list — toggle ⊞/≣) of every series you track, with owned/total counts and badges for missing, untagged, or corrupt files. Filter chips (All / Incomplete / Not followed / Problems / Unmatched), a sort dropdown, and search sit at the top. Click a series to open its issue list.
- **Series page** — the full ComicVine issue list for a series: what you own, what's missing, per-issue read/download buttons, and series-level actions (download missing, search sources, search packs, tag files, add to a reading list, and more).
- **Sidebar sections** — Library, Wanted, Queue (live download progress), Releases (this week's issues for series you follow), Lists (reading lists), History, Stats, plus plugin entries like Discover, Requests, and reading tools. Admins also get a **System** area: Users, Plugins, a unified **System** page (Jobs, Tools and Logs on tabs), and Settings.
- **Header** — global search, a **notification bell**, and a **?** help button that explains whatever page you're on.

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
| **Library** | A named collection with a type (Comics/Manga) and one or more folders on disk that BackIssue scans and files comics into. You can have several. |
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
