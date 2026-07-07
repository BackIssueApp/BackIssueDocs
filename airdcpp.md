# AirDC++ source

The **AirDC++ plugin** adds Direct Connect (DC++) as a download source. It talks to a running [AirDC++](https://airdcpp.net/) instance through its Web API — searching the hubs you're connected to, queueing the match, and importing the finished file like any other download.

It's an *immediate* source: BackIssue searches, downloads, and imports inline (no external "grab then monitor later" step). Because DC is peer-to-peer over hubs, it fills gaps that Usenet and torrents leave — but it comes with etiquette and rate limits that are worth understanding before you lean on it.

## What you need

- A running **AirDC++** instance (desktop or the web/headless build) that is:
  - **connected to one or more hubs**, and
  - **sharing** — hubs expect give-and-take; a client that only downloads gets kicked or banned on most hubs (more below).
- The AirDC++ **Web API** enabled, with a username and password.

## Setup

In **Settings → Sources**, enable AirDC++ and fill in:

- **Web API URL** — where AirDC++'s Web API listens, e.g. `http://192.168.1.109:5600`.
- **Username / Password** — a Web API account on that AirDC++ instance.
- **Hub URLs** *(optional)* — restrict searches to specific hubs (comma-separated, e.g. `adcs://hub.example:2780`). Blank searches all connected hubs.
- **Download folder** — a two-path mapping, exactly like the Usenet/torrent completed-folder mapping, for when AirDC++ and BackIssue see the filesystem differently (separate machines, Docker, SMB):
  - **AirDC++'s view** — where AirDC++ writes finished downloads (its own path).
  - **BackIssue's view** — the same folder as BackIssue reads it (e.g. `\\TOWER\downloads\comics`).

BackIssue **copies** the finished file in rather than moving it, so AirDC++ keeps the copy and keeps sharing it.

## How it works

- **One search per volume.** When you download several issues of the same series, BackIssue runs a *single* hub search for the series name and picks each issue's match out of the shared results — not one search per issue. This is deliberate: DC searches are the slow, rate-limited part (see below), so a 20-issue grab costs roughly one search, not twenty. Issues the shared search doesn't cover fall back to an individual search.
- **Adaptive polling.** DC results arrive from peers over several seconds; BackIssue polls and returns as soon as a confident match arrives.
- **Corruption guard.** DC verifies a transfer matches the *peer's* bytes, not that the file is a valid archive. BackIssue sniffs each finished file and, if it isn't a real comic archive, deletes it and blacklists that copy for the run so a retry picks a different peer.

## Search limitations

DC is not an indexed API — it's a live query across peers — so searches behave differently from Usenet/torrent indexers:

- **Searches run one at a time, spaced by a cooldown.** Hubs rate-limit searches; firing many at once makes them cancel each other. BackIssue serialises them (default ~3s apart), so bulk downloads are *slow but reliable* rather than fast and flaky. Expect a large series to take a while.
- **Coverage depends on who's online and sharing.** A well-seeded modern series is found in seconds. An older or thinly-shared series (or an unusual release naming) may not appear in the series search, dropping each of its issues into the slower per-issue fallback.
- **Not-found isn't instant.** A search that returns nothing gives up after a few seconds (the *Give up if empty* setting, default 5s) rather than waiting the full maximum — but across many missing issues that still adds up.
- **No result ≠ file doesn't exist.** A single DC search occasionally misses even when the file is shared (it just didn't reach the right peers in the window). BackIssue retries an *empty* search a small number of times — but keep that number low, for the reason in the next section.

## Avoiding hub bans and flags

::: warning Repeating the same search trips hub anti-spam
Many hubs flag the **same search repeated about three times** as spam. They don't ban your account for it — they just stop answering and return nothing, which looks exactly like "the file isn't here."

Because of this, **keep "Retry empties" at `1` (or `0`)**. The default is `1`, which means at most two identical searches — safely under the threshold. Raising it makes searches *worse*, not better: the extra repeats get flagged and come back empty.
:::

::: warning Share, don't hoard
DC hubs enforce give-and-take. A client that downloads without sharing gets **kicked or banned** on most hubs. Make sure your AirDC++ is sharing a reasonable library. BackIssue copies files in (leaving AirDC++'s copy in place) specifically so your share keeps growing as you download.
:::

::: warning Don't tune for speed
The search timings default to conservative, hub-friendly values on purpose. Cutting the **cooldown**, raising **Retry empties**, or hammering with a very short **poll interval** can get you rate-limited, flagged, or kicked by a hub. If anything, err toward *slower*. There is no setting that makes DC as fast as an indexer — that's the nature of the protocol, not a limitation to tune away.
:::

## Settings

All under **Settings → Sources → AirDC++**:

| Setting | Meaning |
|---|---|
| Web API URL | Where AirDC++'s Web API listens (e.g. `http://host:5600`). |
| Username / Password | AirDC++ Web API credentials. |
| Hub URLs | Limit searches to these hubs (comma-separated); blank = all connected hubs. |
| Download folder (AirDC++'s view / BackIssue's view) | Two-path mapping for remote/Docker/SMB setups. |
| Max wait (ms) | Longest to wait for results once a search has started (default 12000). |
| Give up if empty (ms) | Stop a search that has returned **nothing** by this long — a shared file's peers reply within seconds, so continued silence means it isn't on DC (default 5000). Cuts the wait on not-found issues. |
| Poll every (ms) | How often to check for incoming results (default 2000). |
| Cooldown (ms) | Minimum gap between searches — hubs rate-limit, so searches run one at a time spaced by this (default 3000). **Lowering risks flags.** |
| Retry empties | Extra tries for a search that came back empty. **Keep at 1 or 0** — three identical searches trip hub anti-spam (default 1). |
| Download stall timeout (ms) | Give up on a download with no byte progress for this long, so a seeder-less or vanished bundle can't hang the queue (default 300000). |

## Troubleshooting

- **"Authentication failed"** — check the Web API URL, username, and password, and that the Web API is enabled in AirDC++.
- **Searches return nothing for files you know are shared** — you may be tripping the repeat-search flag; set **Retry empties** to `0` and confirm the series name matches how peers name their files.
- **"AirDC++ has the file on disk but BackIssue can't find it"** — your **Download folder (BackIssue's view)** doesn't match where AirDC++ actually writes. Set it to AirDC++'s real download directory (the same folder, as BackIssue reads it).
- **Bulk grabs are slow** — expected. Serial, rate-limited searching is what keeps you on good terms with the hubs; see [Search limitations](#search-limitations).
