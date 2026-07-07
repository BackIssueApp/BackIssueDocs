# Getting started

## Requirements

- **Node.js 22 or newer**
- A **ComicVine API key** — free from [comicvine.gamespot.com/api](https://comicvine.gamespot.com/api/) (you'll need a ComicVine account)
- Somewhere to put comics — a local folder or a network share

## Install and run

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

The first time you open BackIssue, a short wizard walks you through the essentials:

1. **ComicVine API key** — paste your key. You can paste *several* keys (one per line); BackIssue rotates between them automatically when one hits its rate limit.
2. **Library folder** — where your comics live (or should live). This becomes your first *root folder*; you can add more later in Settings.
3. **A download source** — enable at least one of Usenet or torrents so BackIssue can actually fetch comics. You can skip this and set it up later — see [Download sources](sources).

Everything the wizard sets can be changed later in **Settings**.

## A quick tour

The app is laid out with a **sidebar of sections** on the left and the content on the right:

- **Library** — a poster wall (or dense list — toggle ⊞/≣) of every series you track, with owned/total counts and badges for missing, untagged, or corrupt files. Filter chips (All / Incomplete / Not followed / Problems / Unmatched), a sort dropdown, and search sit at the top. Click a series to open its issue list.
- **Series page** — the full ComicVine issue list for a series: what you own, what's missing, per-issue read/download buttons, and series-level actions (download missing, search sources, search packs, tag files, add to a reading list, and more).
- **Sidebar sections** — Library, Wanted, Queue (live download progress), Releases (this week's issues for series you follow), Lists (reading lists), History, Stats, plus plugin entries like Discover, Requests, and reading tools. Admins also get a **System** area: Users, Plugins, Jobs, Tools, Logs, and Settings.
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
| **Root folder** | A top-level library folder BackIssue scans and files comics into. You can have several. |
| **Source** | Somewhere BackIssue can download from — Usenet, torrents, or a plugin source. |
| **Queue** | The live pipeline of issues being searched, downloaded, and imported. |

## Install as an app (iPad, phone, desktop)

BackIssue is installable: open it in the browser and use **Add to Home Screen** (iOS/iPadOS Safari: Share → Add to Home Screen; desktop Chrome/Edge: the install icon in the address bar). It launches full-screen with its own icon, like a native app.

::: tip HTTPS unlocks offline
Installing works over plain HTTP, but the reader's offline downloads and other service-worker features need a secure context — put BackIssue behind HTTPS (a reverse proxy like Caddy, or Tailscale) to get the full experience.
:::

## Securing the app

BackIssue binds to all interfaces so you can reach it from other devices. With no accounts it runs in *open mode* — anyone on your network has full access. To require a login (and to give household members their own accounts, roles, and reading history), **create the first account** from the sidebar's "Secure this install" prompt. See [Users & access](users).

## Where your data lives

Everything is stored next to the app:

- `catalog.db` — the database: series, issues, the file index, history, **and** accounts, roles, reading history, reading lists, and requests. Back it up from **Tools → Back up database** (it keeps the newest 5 snapshots).
- `settings.json` — your settings, written whenever you save Settings.

Comics themselves live in your root folders, organized one folder per series.
