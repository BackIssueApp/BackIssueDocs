# Download sources

BackIssue ships with two source families built in — **Usenet** and **torrents** — and loads more as [plugins](plugins). Enable as many as you like; every download tries them in your priority order and takes the first match.

## Usenet

Usenet needs two pieces: one or more **Newznab indexers** (to find releases) and a **download client** (to fetch them).

### Indexers

Add any Newznab-compatible indexer (NZBGeek, NZBFinder, althub, a private one — anything exposing the Newznab API). For each: a **URL** and an **API key**. You can add several; searches fan out across all of them and results merge into one ranked list.

### Download client

Both major clients are supported:

- **SABnzbd** — host, port, API key
- **NZBGet** — host, port, username/password

Plus a **category** (e.g. `backissue`) so comic downloads stay separate in your client, and a poll interval / timeout for the monitor that watches for finished downloads.

### Completed-download paths

If BackIssue and your Usenet client run on **different machines** (or one is in Docker), the client's "completed downloads" folder has two names — the path *the client* sees and the path *BackIssue* sees. Set both:

- **Completed folder (client's view)** — e.g. `/downloads/complete/backissue`
- **Completed folder (BackIssue's view)** — e.g. `\\NAS\downloads\complete\backissue`

If both run on the same machine with the same paths, set just one (or neither, if the client reports absolute paths BackIssue can read).

## Torrents

Same shape as Usenet: **Torznab indexers** (via Prowlarr or Jackett) plus **qBittorrent** as the download client.

- **Torznab indexers** — one or more URL + API key entries. Prowlarr gives you a Torznab URL per indexer it manages.
- **qBittorrent** — host, port, username/password, optional SSL.
- **Category** — keeps BackIssue's torrents grouped in qBittorrent.
- **Completed-folder mapping** — same two-path idea as Usenet, for remote/Docker setups.

Grabbed torrents are handed to qBittorrent and monitored to completion; the finished file is then imported, tagged, and filed like any other download. Seeding continues per your qBittorrent rules — BackIssue copies files in rather than moving them.

### The weekly 0-day pack

An optional torrent-only automation: each week the scene releases a "0-day" pack containing that week's comics. With the **zero-day** schedule enabled, BackIssue grabs the newest weekly pack, and when it completes, imports *only the issues you're missing* from series you track — optionally adding brand-new series it finds ([`zeroDayAddNew`](settings-reference)). It never re-grabs a week it has already processed.

## Source priority

Settings lists every enabled source in a drag-to-reorder priority list. For each issue, sources are tried **top to bottom — first match wins**, so put your fastest/cleanest source first and slower or scarcer ones lower as fallbacks.

Priority also shapes *manual* search result ranking and pack searches.

## Which should I use?

Whatever you have. Practical notes:

- **Usenet** is fast and reliable for recent comics and popular back-catalogue; retention limits very old material.
- **Torrents** shine for weekly 0-day packs and long-tail material with healthy swarms.
- **Plugin sources** can cover the gaps both leave. The **[AirDC++ source](airdcpp)** adds Direct Connect (DC++) — good for long-tail material, with some etiquette and rate limits worth reading first. See [Plugins](plugins) for the plugin system.
