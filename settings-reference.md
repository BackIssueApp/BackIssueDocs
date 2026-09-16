---
description: "Every setting in the app, tab by tab, with what it changes and when you would want to change it."
---

# Settings reference

Everything in **Settings**, by tab. The tabs, in order, are **Overview**, **Library**, **Downloading**, **Sources**, **Metadata**, **Plugins** (only shown once an installed plugin mounts a panel there), **Sign-in** and **Notifications**. Library, Sources and Plugins use a master–detail layout: a rail of panels on the left, one panel at a time on the right. Editing anything raises a save bar at the bottom of the page — nothing is written until you press **Save changes** — except library edits, which apply immediately.

Saved values live in `settings.json` in the data directory, next to the database — `/data` in Docker (see [Where your data lives](getting-started#where-your-data-lives)).

Plugins contribute settings of their own. Most land on the **Plugins** tab, but a plugin can also add a panel to Library, Sources, Sign-in or Notifications — so what you see depends on what you have installed.

## Overview

No settings here, just the state of the install: health cards for sources, metadata, libraries, storage, downloading and notifications, and a **Needs attention** list. Every card and every warning is a link straight to the tab that fixes it.

## Library

Three panels: **Libraries**, **File organization** and **Maintenance**.

### Libraries

Named libraries — each one appears as its own entry in the sidebar. See [Libraries](library#libraries). Changes here save as you make them.

| Setting | What it does |
|---|---|
| Name | The library's display name. |
| Type | Sets how the library's series behave — manga, for instance, gets chapter-style search and right-to-left reading. |
| Folders | Where the library's comics live. The **first** folder is the default: new downloads for that library file there. The rest are extra scan locations. Any folder can be promoted with **Make default**; removing one leaves the files on disk. |
| Mature | Hides the library, and everything in it, from roles without the **View mature content** permission. |
| Folder pattern | Per-library override of the global folder pattern — e.g. `{series}` for a tree with no publisher folders. Blank = use the global pattern. |
| Tag placement | Per-library override of the global tag placement. **Global setting** = follow the Metadata tab. |

### File organization

How downloaded comics are named and filed. See [Naming patterns](library#naming-patterns).

| Setting | What it does |
|---|---|
| Folder pattern | How each series' folder is built under a root. Blank uses the default, `{publisher}/{series} ({year})`. |
| File pattern | How issue files are named. Blank uses the default, `{series} V{year} #{issue}`. Tokens: `{publisher}` `{series}` `{year}` `{issue}` (`{issue:2}` sets the pad width) `{issueTitle}` `{date}` `{edition}`. A live example previews as you type. |
| Rename downloaded files to the file pattern | On by default. Off: completed downloads keep the source's original filename, and are still filed into the comic's folder. |

Pattern changes affect **new** downloads. To apply them to files you already have, run **Reorganize library** on the Tools page.

### Maintenance

| Setting | What it does |
|---|---|
| Downloads folder (fallback) | Only used when no library has a folder of its own — normally every download files into its library. |
| Tool workers | How many files the library tools (convert, verify, tag) process at once. Default 4; higher overlaps I/O but holds more file data in memory. |

### Reader settings

With the [reader](reading) plugin installed, three more toggles appear at the bottom of the **Libraries** panel:

| Setting | What it does |
|---|---|
| Use the file's first page as an owned issue's cover | On by default. Off = always show ComicVine art. Affects the issue grid on a series page; your file's page can differ from ComicVine's when it's a variant or a different printing. |
| Use the ML panel detector for guided view | On by default, and only applies when a panel model is installed on the server. Off = the built-in detector. Flipping it re-detects each issue's panel layout once, on next open. See [Guided panel reading](guided-reading). |
| Share panel layouts with the community cache | On by default. Layouts are looked up in a shared cache before detecting locally, and your detections and hand-corrections are contributed back. Only panel rectangles and a page-content hash are sent — never image data, filenames or titles. |

## Downloading

What happens when you add a series, and how downloads run.

| Setting | What it does |
|---|---|
| Download on add | On by default: adding a series (Library, Discover, Releases, reading lists) immediately queues whatever its monitoring policy wants. Off = series are added empty and you press **Download missing** yourself. |
| Monitor added series | The [monitoring policy](collection#monitoring) a series gets when it enters the library — added by hand, from Discover, Releases, reading lists, requests or an import. **All issues** (the default) keeps the run complete; **New issues only** wants issues from the newest one onward; **Off** fetches nothing until you monitor it or pick issues yourself. Any series can be changed later from its ⋯ menu. |
| Only the issues that were asked for | Off by default. When a series is added because of specific issues — a reading-list entry, a release, a CBL import — it arrives with monitoring off and just those issues wanted, so only they are downloaded, now and again if a grab fails. Adding from the Library or Discover still gets the policy above. Needs **Download on add**. |
| Download format | `CBZ` (the default, and the taggable one) or `PDF`. |
| Simultaneous downloads | How many issues download at once. Default 4; higher is faster but likelier to trip a source's rate limits. Applies to the next download. |
| FlareSolverr URL | Some download sites sit behind Cloudflare. FlareSolverr is a small companion service you run (`ghcr.io/flaresolverr/flaresolverr`); point this at its `/v1` endpoint, e.g. `http://flaresolverr:8191/v1`. **One setting, shared by every source that needs it** — you never configure it per source. Leave blank if none of your sources are behind Cloudflare. |

## Sources

The rail lists **Usenet**, **Torrents**, every download source you have installed, and — once two or more are enabled — **Source priority**. Each source panel starts with its own on/off switch. See [Download sources](sources).

### Usenet

| Setting | What it does |
|---|---|
| Enable Usenet | Master switch for the source. |
| Indexers | One or more Newznab indexer entries (name, URL, API key), searched in order with the results merged. An indexer plugin, if you run one, takes over and these manual entries are ignored. |
| Client | `SABnzbd` or `NZBGet`. |
| Host / Port / Use HTTPS | Where the client's API lives. |
| URL base | Path prefix when a proxy serves the client under a subpath — `/sabnzbd` gives `http://host:port/sabnzbd/api`. Blank for a direct install. |
| API key (SABnzbd) / Username and password (NZBGet) | Client credentials. **Test connection** checks them. |
| Category | The category NZBs are handed to the client under. Default `backissue`. |
| Folder (this app's view) / Folder (client's view) | The finished-downloads folder as each side sees it. Only needed when the client runs on another machine — leave both blank when they share a path. |
| Poll every (s) / Give up after (min) | How often the monitor checks the client (default 15s), and when to abandon a stuck download (default 60 min). |

### Torrents

| Setting | What it does |
|---|---|
| Enable torrents | Master switch. |
| Indexers (Torznab) | One or more Torznab entries — Jackett or Prowlarr provide these. Results are merged and ranked by seeders. |
| Client | qBittorrent, Transmission or Deluge. |
| Host / Port / URL base / Use HTTPS / Username / Password | The client's web or RPC endpoint. Deluge takes a password only. **Test connection** checks them. |
| Category | The category torrents are added under. Default `backissue`. |
| Folder (this app's view) / Folder (client's view) | The same two-path mapping as Usenet. |
| Poll every (s) / Give up after (min) | Monitor cadence (default 20s) and give-up threshold (default 120 min — torrents can be slow to find peers). |
| Search phrase (weekly 0-Day pack) | What the 0-day job searches for. Default `0-Day Week`. |
| Add new series I don't follow | Off by default: a weekly pack fills gaps only in series you already track. On, it also adds new series, on confident ComicVine matches only. |

After import, torrents are **left seeding** — manage ratio and removal in the client.

### Other sources

Every source you install from the catalogue, and every source a plugin provides, gets its own rail entry with its own switch and fields (credentials, language preferences, and so on). A source that sits behind Cloudflare says so and uses the shared **FlareSolverr URL** from the Downloading tab rather than asking for one itself.

### Source priority

Appears once two or more sources are enabled. When more than one source can serve an issue they are tried top to bottom, and the first with a match wins. Reorder with the arrows.

## Metadata

Where series and issue data comes from, and how it is written into your files.

| Setting | What it does |
|---|---|
| Source | **BackIssue metadata service** (the default) works with no setup — cached ComicVine data with enrichment and no rate-limit pauses, authenticated by a key this install provisions for itself. **ComicVine directly** queries the official API with your own key; it is rate-limited (roughly 200 requests per resource per hour), so big imports, scans and release matching will pause. **Test service** checks the connection. |
| ComicVine API key | Shown when the source is ComicVine. Free at comicvine.gamespot.com. **Test key** checks it. |
| Tag on download | Off by default. On, ComicVine metadata is written for every file as it is imported. |
| Tag placement | **Embedded** (the default) writes ComicInfo.xml inside the archive, converting `.cbr` downloads to `.cbz` so they can be tagged. **Sidecar** writes the same metadata to a `.xml` next to the file and never touches the archive — byte-identical files for seeding and file-share hashing, and `.cbr` files stay `.cbr`. Each library can override this. |
| Enrich metadata | Off by default. When the metadata server supports it, adds content ratings, series status and end year, and per-issue extras like price, UPC and story titles. A series that comes back rated mature is [flagged mature](users#content-restrictions-mature-series) automatically on that transition — a manual unflag sticks. The official ComicVine API ignores the request, so it is safe either way. |
| Content rating ceiling | How far manga search reaches into MangaDex's content ratings; each level includes the ones below it. Default **Up to Erotica**. Applies to the Add dialog's manga lane and manga-library imports. |
| Release provider URL | Where "This week's releases" is fetched from. Leave at the default unless you host an alternative. |

There is no field for pointing the app at a different metadata service. An old
`cvBaseUrl` setting still exists in saved configuration but is deliberately
ignored — stale or malformed values in it used to surface as puzzling auth
failures. If you want to stay off the hosted service entirely, set **Source** to
ComicVine and supply your own key.

## Plugins

This tab appears once an installed plugin mounts a panel on it, and shows one rail entry per plugin — so its contents depend entirely on what you have installed. Each plugin's own page documents its settings; these are the ones other pages send you here for:

| Setting | What it does |
|---|---|
| Requests: auto-approve | Every volume request is approved and added instantly — no review queue. Off = roles with **Manage requests** approve or decline each one. With **Download on add** also on, auto-approved requests download their missing issues automatically. See [Requests](requests). |
| Requests: Western comics only | Only volumes from Western (US/UK) publishers can be searched and requested; manga and foreign-language titles are hidden. |
| Requests: no collections | Blocks collected editions — trade paperbacks, hardcovers, omnibuses — so only single-issue series can be requested. Detected heuristically from the volume's title and description. |
| OPDS progress sync | On by default. Streaming a page from an OPDS app advances your resume point (forward only), and fetching the last page marks the issue read — so OPDS reading feeds Continue reading and your stats. Whole-file downloads are unaffected; a client can opt out per request with `?progress=0`. See [OPDS](opds). |

Not every plugin puts its settings here: download sources appear on **Sources**, notification channels on **Notifications**, sign-in providers on **Sign-in**, and the reader's preferences on **Library**.

### Where each plugin's settings are documented

Plugins with more than a switch or two are written up on their own page rather than repeated here. This is the full index:

| Plugin | Settings | Documented on |
|---|---|---|
| Gamify | Household features, notifications, the level-up overlay, quest count, and the three fair-play caps | [Gamify](gamify#settings) |
| Discover | Feed windows and how long a built feed is cached | [Discovering comics](discover#settings) |
| AirDC++ | Web API address and credentials, hub list, the two-path download folder, and six search-timing controls | [AirDC++](airdcpp#settings) |
| Prowlarr | Indexer address and key, plus category and indexer exclusions | [Prowlarr indexers](prowlarr) |
| Books | Library paths, metadata source, and the scan schedule | [Books](ebooks) |
| Audiobooks | Library paths, metadata source, and the player's defaults | [Audiobooks](audiobooks) |
| Shelves | Which library types get faceted browsing | [Shelves](shelves) |
| Notifications Hub | One card per channel, each with its own filter | [Notifications](notifications) |
| SSO | Provider address, client credentials, and the role new accounts get | [Users & access](users#signing-in-with-an-identity-provider-sso) |

A few plugin settings aren't on this tab at all because they're schedules: the AirDC++ announce-bot watch is enabled and timed on **System → Jobs**, like every other job.

## Sign-in

How people sign in. Password login always works for admins, whatever else is configured.

| Setting | What it does |
|---|---|
| Disable password login | Hides the password form so everyone signs in through your identity provider. Admins keep a password fallback, so a broken provider cannot lock everyone out. |

Install a sign-in provider (OIDC, for example) from the Plugins page and its configuration appears on this tab. See [Signing in with an identity provider](users#signing-in-with-an-identity-provider-sso).

## Notifications

Outbound channels come from the **[Notifications Hub](notifications)** plugin — one collapsible card per channel (Discord, Telegram, Pushover, ntfy, generic webhook), each with its own category filter and test button. Without the plugin the tab just points you at it. The in-app notification bell records every event regardless.

## Not in Settings

A few things people look for here live elsewhere:

- **Schedules.** Every scheduled job — releases check, ComicVine match, RSS watch, new-release search, wanted backfill, zero-day pack, database backup — is configured on **System → Jobs**, with a cron expression, an enable toggle, its last-run result and a **Run now** button. See [Automation](automation).
- **Accounts, roles and self-registration.** The **Users** page owns all of it, including the **Allow self-registration** switch. See [Users & access](users).
- **Deployment options.** A handful of things are set as environment variables where you run the app rather than in Settings, because they have to be known before the app starts. See [Environment variables](#environment-variables) below.

Legacy keys from older versions (`libraryDir`, `nzbClientUrl`, hour-based schedule fields, per-source FlareSolverr URLs) are still read and migrated automatically — you never need to touch them.

## Environment variables

These are set where the app runs — the `environment:` block in a Compose file,
`-e` flags on `docker run`, or your shell when running from source. Nothing here
appears in Settings, because it has to be known before the app starts.

### The usual ones

Most installs set these four and nothing else. The first three are read by the
container's startup script rather than the app itself, so they only apply to
Docker.

| Variable | Default | What it does |
|---|---|---|
| `PUID` | `99` | The user id the app runs as, so files it writes to your shares are owned by you rather than root. Run `id` to find yours. |
| `PGID` | `100` | The group id, likewise. |
| `UMASK` | `022` | Permissions on files and folders the app creates. |
| `TZ` | UTC | Your zone, such as `Europe/Dublin`. Schedules fire at local time rather than UTC. |

The defaults are Unraid's `nobody:users`. On first start, or whenever the ids
change, the container takes ownership of the data directory before dropping to
that user.

### Paths

| Variable | Default | What it does |
|---|---|---|
| `DATA_DIR` | `/data` in Docker, the app folder from source | Everything writable: the database, your settings, in-progress downloads, backups. Point it at a mounted volume so it survives recreating the container. |
| `PLUGINS_DIR` | `$DATA_DIR/plugins` in Docker | Where installed plugins live. On the volume by default, so they survive an image update. |
| `SOURCES_DIR` | `$DATA_DIR/sources` in Docker | The same, for installed [download sites](sources). |

The two path overrides exist mainly so a from-source install can put plugins
somewhere other than the app folder. In Docker they are already correct.

### Behind a reverse proxy

`TRUST_PROXY` is the one variable people most often need and most often get
wrong. It decides whether the app believes the `X-Forwarded-For` header, which
in turn decides what it thinks each client's address is.

| Value | Meaning |
|---|---|
| unset, empty, or `false` | Trust nothing. Correct for a direct or LAN-only deployment. |
| `1` | Trust one proxy hop. The right answer for a single nginx, Caddy, Traefik or Cloudflare Tunnel in front. |
| `2`, `3`, … | Trust that many hops, for chained proxies. |
| `true` | Trust whatever connected directly. |
| `10.0.0.0/8`, `loopback`, a comma-separated list | Trust specific addresses or ranges. |

Two things depend on getting this right. **Rate limiting** counts failed logins
per client address, so with this unset behind a proxy every request looks like
it comes from the proxy and one person's bad password locks out the household.
And the app uses it to decide whether a request arrived over HTTPS, which
controls whether the session cookie is marked secure.

::: danger Do not set this on a directly exposed server
If nothing is actually proxying the app, trusting the header lets anyone set
their own apparent IP address and walk straight past rate limiting.
:::

### Occasionally useful

| Variable | Default | What it does |
|---|---|---|
| `MAX_RAR_MB` | calculated from available memory | The size ceiling for repacking a `.cbr` into `.cbz`, in megabytes. Raise it only if large collected editions are being filed as `.cbr` and you have memory to spare — a repack peaks at several times the archive's size. See [Troubleshooting](troubleshooting#downloads). |
| `NODE_OPTIONS` | unset | Passed to Node itself. In practice `--max-old-space-size=…` on a very large library. |
| `BACKISSUE_WATCHDOG` | unset (on) | Set to `0` to switch off the watchdog that restarts a wedged process. Only while debugging a hang. |
| `BACKISSUE_WATCHDOG_STALL_MS` | `120000` | How long the main thread may go silent before the watchdog acts. Lowering it risks killing a healthy process mid-task. |
| `BACKISSUE_SUPERVISED` | unset | Tells the app something will restart it, so it exits rather than restarting itself. Docker is detected automatically; this is for systemd and similar. Set it without a supervisor and a plugin toggle will shut the app down for good. |
| `GITHUB_TOKEN` | unset | Lifts the anonymous rate limit when browsing the community reading-list catalog. That catalog is cached for six hours, so almost nobody needs this. |
| `CHROMIUM_EXTRA_ARGS` | preset in the browser image | Extra flags for the bundled browser, space separated. Browser image only. Do not use it to set a custom user agent — one that disagrees with the rest of the fingerprint reads as a bot and has earned address bans. |

### Leave these alone

`BACKISSUE_ALLOW_INTERNAL_FETCH`, `METADATA_BASE_OVERRIDE`,
`BACKISSUE_BUILD_FILE`, `BUILD_CHANNEL`, `BUILD_SHA`, `LD_PRELOAD` and
`MALLOC_ARENA_MAX` are development, build and memory-tuning hooks. The build
ones are stamped into the image and only make the app misreport its own version
if you override them; the memory ones are set by the container for good reasons
and overriding them can break image handling.

One deserves a specific warning. `BACKISSUE_ALLOW_INTERNAL_FETCH` disables the
guard that stops download sites fetching private and internal addresses. Those
URLs come from scraped pages and search results, so switching the guard off
hands untrusted content a route into your own network.

### There is no port variable

The app always listens on **8787**. To serve it elsewhere, remap the port on the
host rather than changing the app:

```yaml
ports:
  - "9000:8787"   # reach it on 9000
```

::: tip Checking what is actually set
A [support package](troubleshooting#getting-help) records the deployment
variables the app can see, so it answers "is this actually set in the running
container?" without guesswork.
:::
