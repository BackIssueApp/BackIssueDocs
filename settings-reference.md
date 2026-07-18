# Settings reference

Everything in **Settings**, by tab. Settings opens on an **Overview** tab — health cards (sources, ComicVine, libraries, storage, downloading, notifications) plus a "Needs attention" list that links straight to whatever needs fixing. The other tabs are **Library**, **Downloading**, **Sources**, **Metadata**, **Plugins** (appears when an installed plugin puts its settings there), **Sign-in**, and **Notifications**; Library and Sources show a small rail on the left (their sub-panels — plugin sources appear there too) with one panel at a time on the right. Edits reveal a save bar at the bottom; library changes apply immediately. Values persist to `settings.json` next to the app. Plugins add their own panels; those are documented with each plugin.

## ComicVine

| Setting | Meaning |
|---|---|
| API key | Your ComicVine API key (free at comicvine.gamespot.com) — it identifies every series and issue. |
| Proxy URL | Optional HTTP(S) forward proxy for ComicVine calls only (e.g. `http://user:pass@proxy:port`). Useful when CV is unreachable or rate-limits your IP; rotating-proxy services work well since each request may exit from a fresh IP. |
| API base URL | Point metadata lookups at a ComicVine-compatible server instead of the official API. Blank = official ComicVine. |
| Use enriched metadata | When the endpoint supports it, matched series also get a **content rating**, **publication status** (Ongoing/Cancelled/Completed), and **end year** — shown on the series page. Series rated Mature/Explicit/Adult are [flagged mature](users#content-restrictions-mature-series) automatically; your manual flag choices always win. The official ComicVine API ignores this setting. |

## Library

| Setting | Meaning |
|---|---|
| Libraries | Named libraries (see [Libraries](library#libraries)), each with a type, its own folders (first = where new downloads file; the rest are extra scan locations), an optional per-library folder pattern, and a Mature flag. Managed here; changes apply immediately. |
| Folder pattern | How each series' folder is built under a root, from tokens — default `{publisher}/{series} ({year})`. See [Naming patterns](library#naming-patterns). |
| File pattern | How issue files are named — default `{series} V{year} #{issue}`. Tokens: `{publisher}` `{series}` `{year}` `{issue}` (`{issue:2}` sets pad width) `{issueTitle}` `{date}` `{edition}`. A live example previews as you type; blank = default. |
| Rename downloads | On (default): downloaded files are named to the file pattern. Off: completed downloads keep the source's original filename, still filed into the comic's folder. |
| Download format | `cbz` (default, recommended — taggable) or `pdf`. |
| Tag on download | Embed ComicVine metadata into every file as it's imported (recommended: on). |
| Library concurrency | Parallel workers for library scans/verification (default suits most disks; raise for fast NVMe, lower for busy NAS shares). |

## Accounts & access

Account and role management lives on the **Users** page, not in Settings — see [Users & access](users). The one account-related toggle in Settings is:

| Setting | Meaning |
|---|---|
| Allow self-registration | When on, the login page offers a sign-up tab; new accounts are created as viewers. Off by default. |

There is **no** username/password field here anymore — the old single HTTP Basic login was replaced by the [user system](users). (`TRUST_PROXY` is an environment variable, not a setting; set it when running behind a reverse proxy.)

With the **SSO (OpenID Connect)** plugin installed, a **Sign-in** section appears here too: the provider configuration and a *Disable password login* toggle (admins keep a password fallback). See [Signing in with an identity provider](users#signing-in-with-an-identity-provider-sso).

## Notifications

Outbound channels come from the **[Notifications Hub](notifications)** plugin — one collapsible card per channel (Discord, Telegram, Pushover, ntfy, generic webhook), each with its own category filter and test button. Without the plugin this section only points you at it; the in-app notification bell records all events regardless.

## Downloading

| Setting | Meaning |
|---|---|
| Source priority | Drag-ordered list of enabled sources; searches try them top-to-bottom, first match wins. |
| Download concurrency | Parallel download workers (default 4). More = faster batches, but be considerate of your sources. |
| Download on add | When on (the default), adding a volume immediately queues its missing issues. Off = volumes are added empty and you download by hand. |

## Usenet

| Setting | Meaning |
|---|---|
| Enable Usenet | Master toggle for the source. |
| Newznab indexers | One or more indexer entries (URL + API key). |
| Client | `sabnzbd` or `nzbget`. |
| Client host / port / SSL | Where the client's API lives. |
| API key (SAB) / Username & password (NZBGet) | Client credentials. |
| Category | Download category for BackIssue's NZBs (e.g. `backissue`). |
| Completed folder (client's view / BackIssue's view) | The finished-downloads folder as each side sees it — set both when they run on different machines or in Docker. |
| Poll seconds / Timeout minutes | How often the monitor checks the client, and when to give up on a stuck download. |

## Torrents

| Setting | Meaning |
|---|---|
| Enable torrents | Master toggle. |
| Torznab indexers | One or more entries (URL + API key) — Prowlarr/Jackett provide these. |
| Client | qBittorrent. |
| qB host / port / SSL / username / password | qBittorrent Web UI connection. |
| Category | qBittorrent category for BackIssue's torrents. |
| Completed folder (client's view / BackIssue's view) | Same two-path mapping as Usenet. |
| Poll seconds / Timeout minutes | Monitor cadence and give-up threshold. |
| 0-day query | Search phrase for the weekly pack (a sensible default is provided). |
| 0-day: add new series | When importing a weekly pack, also add series you don't track yet (default: only fill gaps in series you already track). |

## Schedules

Each scheduled job has a **cron expression** and an **enable** toggle — see [Automation](automation):

| Job | Settings |
|---|---|
| Releases check | `releaseCheckCron` / `releaseCheckEnabled` |
| ComicVine match | `cvMatchCron` / `cvMatchEnabled` |
| Watch indexer RSS | `rssWatchCron` / `rssWatchEnabled` (default every 15 minutes, off) |
| Search new releases | `recentSearchCron` / `recentSearchEnabled` (default every 6 hours, off), plus `recentSearchDays` (how recent counts as "new", 1–90, default 14) |
| Wanted search | `wantedSearchCron` / `wantedSearchEnabled`, plus `wantedSearchBatch` (issues per run, 1–200) |
| Zero-day pack | `zeroDayCron` / `zeroDayEnabled` |
| Back up database | `backupCron` / `backupEnabled` (default weekly Monday 05:00, **on**) |

Plugins register schedules of their own (e.g. the AirDC++ [announce watch](airdcpp#watching-announce-bots)) — they appear under **System → Jobs** alongside these.

## Advanced

| Setting | Meaning |
|---|---|
| Release provider URL | Where the weekly-releases list is fetched from. Leave at default unless you host an alternative. |
| Window mode | For sources that drive a real browser: `visible`, `hidden`, or `headless`. Some sites block headless browsers — `hidden` is the safe default. |
| Action delay (ms) | Politeness pause between actions against external sites (default 500). Raising it is kinder to sources; lowering it risks blocks. |

Legacy keys from older versions (`libraryDir`, `nzbClientUrl`, hour-based schedule fields, ComicTagger paths) are still read and migrated automatically — you don't need to touch them.
