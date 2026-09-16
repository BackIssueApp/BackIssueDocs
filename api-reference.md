---
description: "Every HTTP endpoint the app exposes, with the permission each one requires and the shape of what it returns."
---

# API reference

The complete HTTP endpoint list. For the *why* — API keys, how access is
clamped to your role, CORS, client tips — read [Building on the API](/api)
first; this page is the map of what's there.

Everything lives under `/api`. It is the same API the web UI runs on, so any
screen in the app is a live example of these endpoints in action.

## Conventions

- **Base URL** — your install, e.g. `http://backissue.local:8787`. All paths
  below are relative to it.
- **Auth** — send `X-Api-Key: bi_…` or `Authorization: Bearer bi_…` on every
  request (the browser UI uses a session cookie instead; both resolve to a
  user). See [Building on the API](/api#api-keys).
- **Request bodies** — JSON, with `Content-Type: application/json`. Query
  strings are used for filters on `GET` endpoints.
- **Responses** — JSON. Lists return a JSON array; single resources return an
  object.
- **Errors** — `{ "error": "…" }` with a meaningful status: `400` (bad
  input), `401` (missing/invalid key), `403` (your role lacks the
  permission), `404` (not found or hidden from your role), `502` (an upstream
  like ComicVine or an indexer failed).

### How permissions are assigned

Every call resolves to one required permission. Most follow a default rule,
and the tables below only call out the endpoint's effective permission:

- **`GET`** (reading) needs **`library.view`**.
- **Writes** (`POST`/`PATCH`/`DELETE`) need **`library.manage`**.
- **Download actions** — searching sources, queueing grabs, retrying,
  cancelling — need **`downloads.grab`**.
- **Admin areas** (settings, users, plugins, jobs, logs) need their specific
  permission.
- **`/api/auth/*`** is self-service: any signed-in user can call it for their
  own account.

A request acts **as its user**: it can do exactly what the account's role
allows. The core permissions:

| Key | Grants | Tier |
|---|---|---|
| `library.view` | Browse series, issues, releases, the queue | viewer |
| `downloads.grab` | Search sources, queue downloads, cancel queued items | trusted |
| `library.manage` | Add/remove volumes and issues, scan, tag, import, fix matches | trusted |
| `library.restricted` | See and read series flagged mature/restricted | trusted |
| `settings.manage` | Change settings and indexers, run connection tests | admin |
| `users.manage` | Manage accounts, roles, and permissions | admin |
| `plugins.manage` | Enable/disable plugins, restart the app | admin |
| `system.jobs` | Run jobs, schedules, and maintenance tools | admin |
| `system.logs` | View and clear logs | admin |

::: tip Discover what a key can do
`GET /api/auth/me` returns the key's user and its resolved permission list —
a client can read that to decide which features to offer.
:::

## Account & auth

Self-service — any signed-in user, for their own account. A few are public
(no key needed) because the sign-in screen calls them.

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/auth/me` | public | Current user and resolved permissions, or open-mode/login state |
| GET | `/api/auth/providers` | public | External SSO buttons and whether password login is enabled |
| POST | `/api/auth/register` | public | Create an account (only when registration is enabled) |
| POST | `/api/auth/login` | public | Password sign-in; starts a session cookie |
| POST | `/api/auth/logout` | authed | End the current session |
| POST | `/api/auth/logout-others` | authed | Revoke every other session for this account |
| GET | `/api/auth/profile` | authed | This account's profile |
| POST | `/api/auth/password` | authed | Change password |
| POST | `/api/auth/email` | authed | Set the account's email |
| POST | `/api/auth/hide-mature` | authed | Personal mature-content preference — `{ "hide": true \| false }` → `{ "hideMature": bool }` |
| GET | `/api/auth/apikey` | authed | Whether a key exists (never returns the key itself) |
| POST | `/api/auth/apikey` | authed | Generate/replace the key — returns it **once** |
| DELETE | `/api/auth/apikey` | authed | Revoke the key immediately |

**`GET /api/auth/me`** →

```json
{
  "openMode": false,
  "registration": false,
  "user": {
    "id": 3,
    "username": "you",
    "role": "admin",
    "permissions": ["*"]
  }
}
```

`permissions` is `["*"]` for admin; otherwise the explicit list your role
resolves to. `hideMature` reports the account's own preference.

**`POST /api/auth/hide-mature`** narrows what this account sees, on top of what
its role allows. It cannot widen anything: an account whose role lacks
`library.restricted` never sees flagged series regardless. Note that this
preference filters the web app and this API, but **not** the OPDS catalog —
see [OPDS](/opds#access-control). Open-mode installs have no real account to
store it against and get `403 sign in with a real account first`.

`openMode` is `true` only in the window **before the first account exists** —
a brand-new install that hasn't been through first-run setup yet. The API then
reports a synthetic local admin so the setup wizard can do its work. First-run
setup makes you create an admin, so a configured server always has accounts and
`openMode` is `false` from then on. See [Users & access](/users).

## Collection & series

Your tracked series and their issues. Reads need `library.view`; changes need
`library.manage`. Series flagged restricted return `404` to roles without
`library.restricted`.

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/collection` | library.view | Tracked series; `?filter=`, `?search=`, `?sort=` |
| GET | `/api/collection/{id}` | library.view | One series with issues, owned/missing counts, folder location |
| GET | `/api/collection/counts` | library.view | Counts for each collection chip — same `?search=`, `?library=`, `?collections=1` and `?facet=` filters as `/api/collection` |
| GET | `/api/series` | library.view | All series (matched + catalog); `?search=` |
| GET | `/api/series/{id}/issues` | library.view | Issues for a series |
| GET | `/api/issue/{cvIssueId}` | library.view | One issue by ComicVine issue id |
| POST | `/api/collection/add-cv` | library.manage | Add a series by ComicVine volume — body `{ "comicvineId": 12345, "cvIssueIds"?: [ … ], "reason"?: "list:7" }` |
| POST | `/api/collection/{id}/cv` | library.manage | Re-point a series at a different ComicVine volume |
| POST | `/api/cv/match` | library.manage | Match an unmatched series to ComicVine |
| POST | `/api/collection/{id}/aliases` | library.manage | Set search aliases for a series |
| POST | `/api/collection/{id}/metadata` | library.manage | Refresh a series' metadata |
| POST | `/api/issue/{cvId}/metadata` | library.manage | Refresh one issue's metadata |
| POST | `/api/collection/{id}/restricted` | library.manage | Flag/unflag a series as mature/restricted |
| POST | `/api/collection/{id}/monitor` | library.manage | Monitoring policy — `{ "monitor": "all" \| "new" \| "none", "from"?: 150, "clearPicks"?: true }` (legacy `{ "monitored": bool }` = all/none) → `{ monitor, monitor_from, monitored }` |
| POST | `/api/collection/{id}/wanted` | downloads.grab | Pick or skip issues — `{ "cvIssueIds": [ … ], "want": true \| false }` or `{ …, "clear": true }` → `{ changed, issues: [{ cv_issue_id, wanted, why, pick, reason }] }` |
| POST | `/api/collection/{id}/follow` | library.view | Toggle your personal follow (pull list) |
| POST | `/api/collection/bulk` | library.manage | Bulk action across selected series — `action`: `follow`, `unfollow`, `monitor` (+ `monitor`), `move-library`, `download-missing`, `remove` |
| POST | `/api/collection/{id}/library` | library.manage | Move a series into a library — `{ "libraryId": 3 }`, or `null` for the default |
| POST | `/api/collection/{id}/type` | library.manage | Change a series' type — `{ "type": "comic" \| "manga" \| … }` → `{ type }` |
| POST | `/api/collection/{id}/assign-file` | library.manage | Pin a file to an issue by hand — `{ "path": "…", "cvIssueId": 987654 }`, or `null` to forget it → `{ ok, cvIssueId }` |
| POST | `/api/collection/{id}/delete` | library.manage | Untrack a series (files on disk are left alone) |

**`POST /api/collection/add-cv`** — adds the volume (monitoring **all** issues),
follows it for you, and (when download-on-add is on and your role allows it)
queues every missing issue. With **Only the issues that were asked for** on and
`cvIssueIds` given, the series arrives with monitoring **off** and just those
issues picked (`reason` is stored with the picks):

```bash
curl -X POST http://backissue.local:8787/api/collection/add-cv \
  -H "X-Api-Key: bi_…" -H "Content-Type: application/json" \
  -d '{"comicvineId": 18166}'
# → { "seriesId": 42, "cvId": 18166, "queued": 12 }
```

**`GET /api/collection/counts`** returns a flat map — `all`, `incomplete`,
`followed`, `monitored`, `unmonitored`, `ongoing`, `ended`, `problems`,
`unmatched` and `manga` — so a client can label its filter chips without
fetching each filtered list. It always answers, falling back to a slower
synchronous count if the cached one isn't ready.

**`POST /api/collection/{id}/assign-file`** is the escape hatch for a file the
matcher reads wrongly. `path` must be a file already attributed to that series,
and `cvIssueId` must belong to that series' volume, or you get `400` with
`that file is not in this series` or `that issue is not in this volume`. The
assignment is remembered against the file path, so rescans, re-matches and
metadata refreshes keep it. Re-pointing the series at a different ComicVine
volume drops it.

## Libraries

Libraries are the named root folders your series live in, each with a type that
decides how its files are read. Reading the list needs `library.view`; changing
one needs `library.manage`.

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/libraries` | library.view | `{ libraries, types }` — every library plus the assignable types |
| POST | `/api/libraries` | library.manage | Create one — `{ "name": "Comics", "type": "comic", "rootFolder": "/comics" }` → `{ id, libraries }` |
| POST | `/api/libraries/{id}` | library.manage | Update one — any of `name`, `type`, `rootFolder`, `folderPattern`, `restricted`, `sortOrder`, `tagPlacement` → `{ libraries }` |
| DELETE | `/api/libraries/{id}` | library.manage | Remove one — `{ removed, libraries }` |

Three things are worth knowing before you automate against this:

- **Updates are `POST`, not `PUT` or `PATCH`.** There is no `PUT` route.
- **Deleting a library never touches files or series.** Its series are simply
  unassigned and fall back to the default library.
- **`types` is not a fixed list.** It always holds `comic` and `manga`, and
  gains whatever library types your installed plugins register — which is how
  Books and Audiobooks appear. Read it rather than hard-coding.

A library marked `restricted` is hidden from roles without
`library.restricted`, the same way a restricted series is.

## ComicVine lookup

Search and read ComicVine data on demand (the source of truth for comic
metadata). Upstream failures surface as `502`.

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/cv/search?q=` | library.view | Search ComicVine volumes |
| GET | `/api/cv/volume/{id}` | library.view | One volume by id (used when pasting a CV link) |
| GET | `/api/cv/arcs` | library.view | Story arcs (for building reading lists) |
| GET | `/api/cv` | library.view | State of a running ComicVine sync, if any |

## Files, folders & import

Attribute files on disk to series, and reorganize the library. Import and
library-wide tools are gated tighter than ordinary edits.

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/scan-folder` | library.view | Preview the files in a folder |
| GET | `/api/tag-files` | library.view | State of a running tag-files pass |
| POST | `/api/collection/{id}/scan` | library.manage | Index a series' own folder and attribute its files |
| POST | `/api/collection/{id}/path` | library.manage | Pin the folder for a series |
| POST | `/api/collection/{id}/refile` | library.manage | Rename/move a series' files to the naming scheme |
| POST | `/api/collection/{id}/tag` | library.manage | Write ComicInfo tags into a series' files |
| POST | `/api/collection/{id}/cleanup` | library.manage | Remove stray/duplicate files for a series |
| POST | `/api/collection/{id}/refresh` | library.manage | Re-scan and refresh a series |
| GET | `/api/import` | library.manage | Import candidates awaiting review |
| POST | `/api/import/scan` | library.manage | Scan an import folder for candidates |
| POST | `/api/import/run` | library.manage | Import confirmed candidates |
| POST | `/api/import/candidate/{id}/match` | library.manage | Match a candidate to a series |
| POST | `/api/import/candidate/{id}/confirm` | library.manage | Confirm a candidate |
| POST | `/api/import/candidate/{id}/skip` | library.manage | Skip a candidate |
| GET | `/api/library/refile-plan` | system.jobs | Preview a library-wide reorganize |
| POST | `/api/library/refile` | system.jobs | Run the library-wide reorganize |
| GET | `/api/library/refile-status` | system.jobs | Progress of a running reorganize |
| POST | `/api/naming/preview` | settings.manage | Preview filenames for a naming template |

## Downloads, search & queue

Finding and grabbing issues. Anything that touches a source, the queue or the
history needs `downloads.grab` — **including reading them**. The queue and the
history both name the source that fetched each issue, so a read-only account
cannot see or steer what the household is grabbing.

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/status` | library.view | Counts, followed count, version, and live crawl/queue state |
| GET | `/api/queue` | downloads.grab | The download queue and in-flight pack grabs |
| GET | `/api/wanted` | library.view | Wanted issues (policy + picks) — `?scope=gaps` for every missing issue, `?sort=series\|newest\|oldest\|most\|fewest`, `?followed=1`, `?hideUnreleased=1`, `?q=` |
| GET | `/api/history` | downloads.grab | Import history (newest first, paged) |
| GET | `/api/history/failed` | downloads.grab | Failed downloads |
| GET | `/api/sources` | library.view | Enabled download sources |
| GET | `/api/stats` | library.view | Library statistics |
| POST | `/api/download` | downloads.grab | Queue issues by internal id — `{ "issueIds": [1,2] }` → `{ "queued": 2 }` |
| POST | `/api/collection/{id}/download` | downloads.grab | Queue CV issues of a series — `{ "cvIssueIds": [ … ] }` |
| POST | `/api/collection/{id}/redownload` | downloads.grab | Re-grab owned issues of a series |
| POST | `/api/redownload` | downloads.grab | Re-grab specific issues |
| POST | `/api/wanted/download-all` | downloads.grab | Queue every issue matching the filters — `{ scope?, followed?, hideUnreleased?, q? }` (capped at 500) |
| POST | `/api/lists/{id}/want` | library.manage | Want every issue on a reading list — series not in the library are added unmonitored with their issues picked → `{ added, picked, failed, issues }` |
| POST | `/api/search` | downloads.grab | Search all enabled sources for an issue |
| POST | `/api/search/grab` | downloads.grab | Grab a chosen result — `{ result, seriesId, cvIssueId }` |
| POST | `/api/packs/search` | downloads.grab | Search sources for multi-issue packs |
| POST | `/api/packs/grab` | downloads.grab | Grab a pack — `{ result, seriesId }` |
| POST | `/api/usenet/search` · `/api/usenet/grab` | downloads.grab | Per-issue usenet search/grab (legacy) |
| POST | `/api/torrent/search` · `/api/torrent/grab-pack` | downloads.grab | Per-series torrent pack search/grab (legacy) |
| POST | `/api/queue/retry/{id}` | downloads.grab | Retry a queued/failed item |
| POST | `/api/queue/cancel/{id}` | downloads.grab | Cancel a queued item |
| POST | `/api/grabs/{id}/cancel` | downloads.grab | Cancel an in-flight pack grab |
| POST | `/api/queue/pause` · `/resume` · `/clear` | downloads.grab | Pause, resume, or clear the queue |
| POST | `/api/retry-failed` · `/api/clear-failed` | library.manage | Retry or clear all failed downloads |
| GET | `/api/blacklist` | downloads.grab | Blocked releases — `?limit=` (default 200, max 500), `?offset=` → `{ rows, total }` |
| DELETE | `/api/blacklist/{id}` | downloads.grab | Unblock one release → `{ removed }` |
| POST | `/api/blacklist/clear` | downloads.grab | Unblock everything → `{ cleared }` |

**`POST /api/search`** takes a series/issue and returns ranked results from
every enabled source; feed one back to `/api/search/grab`:

```bash
curl -X POST http://backissue.local:8787/api/search \
  -H "X-Api-Key: bi_…" -H "Content-Type: application/json" \
  -d '{"seriesId": 42, "cvIssueId": 987654, "query": "Saga 1"}'
```

**The blocklist** is what stops a broken Usenet release being grabbed again and
again. Each row carries `id`, `source`, `reason`, `created_at`, the human
release `title`, and the issue it was for (`issue_id`, `issue_number`,
`series_id`, `series_title`). Removing a row makes that release eligible for
automatic grabbing again; a manual search was never filtered by it. Rows for
restricted series are hidden from roles that cannot see them. The endpoint is
read-only apart from removal — nothing adds to the blocklist through the API.
See [how downloads work](/downloads#blocked-releases).

## Library statistics

`GET /api/stats` (`library.view`) is one call for everything the Stats page
shows. It takes no parameters and is cached for a minute. The payload has five
parts:

| Key | Holds |
|---|---|
| `files` | `total`, `valid`, `corrupt`, `tagged`, `untagged`, `bytes`, `pages`, and `formats` broken down by `cbz`, `cbr`, `pdf` and `other` |
| `collection` | `series`, `followed`, `ownedIssues`, and `byPublisher` — `{ publisher, series, issues, files, bytes }` ordered by issue count |
| `completion` | `complete`, `incomplete`, `missingIssues`, `cvIssuesTotal`, and `topGaps` — the twelve series missing the most, as `{ id, title, owned, total, missing }` |
| `comicvine` | Which metadata `source` is in use, how deep the cache runs, and how many series and files are matched or unmatched |
| `activity` | `grabs` counted by state, `perDay` for the last fourteen days, and `recent` — the last eight imports |

Restricted series are filtered out of `completion.topGaps` and
`activity.recent` for roles that cannot see them. The aggregate numbers are not
filtered, so totals can exceed what such a role can browse.

## Releases

The weekly new-comics list.

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/releases` | library.view | Weekly releases (with your-collection matches) |
| POST | `/api/releases/check` | library.manage | Refresh the releases list |
| POST | `/api/releases/download` | downloads.grab | Queue a release you don't own |

## Reading lists

Personal curation — each user manages their own; no files are touched, so
`library.view` is enough for every verb. Two exceptions: **sharing** a list
needs `lists.share`, and **wanting** a whole list needs `library.manage`
because it can add series.

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/lists` | library.view | Your reading lists |
| POST | `/api/lists` | library.view | Create a list |
| GET | `/api/lists/{id}` | library.view | One list with items |
| PATCH | `/api/lists/{id}` | library.view | Rename/reorder a list |
| DELETE | `/api/lists/{id}` | library.view | Delete a list |
| POST | `/api/lists/{id}/items` | library.view | Add an issue to a list |
| DELETE | `/api/lists/{id}/items/{cvIssueId}` | library.view | Remove an issue from a list |
| POST | `/api/lists/{id}/public` | lists.share | Share a list with everyone, or unshare it — `{ "public": true }` → `{ public }` |
| POST | `/api/lists/import-arc` | library.view | Create a list from a ComicVine story arc |
| POST | `/api/lists/import-cbl` | library.view | Create a list from a CBL file (raw XML body, up to 4 MB); returns `imported`, `total`, `unmatched[]{series,number,volume,reason}` |
| GET | `/api/lists/cbl-catalog` | library.view | Paths of every list in the community CBL catalog (cached 6 h) |
| POST | `/api/lists/import-cbl-catalog` | library.view | Create a list from a catalog path `{ path }` |
| POST | `/api/lists/cbl-preview` | library.view | Preview a CBL without importing — `{ path }` or raw XML; returns the books in order with `owned`/`hasId` flags |

## Notifications

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/notifications` | library.view | Your in-app notifications |
| POST | `/api/notifications/read` | library.view | Mark your own notifications read |

## Live updates (SSE)

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/events` | library.view | Server-Sent Events stream of what changed |

Instead of polling, subscribe once and re-fetch only the domain that
changed. Each event names a domain (`status`, `queue`, `jobs`, `releases`,
`notifications`, …) mirroring the matching `GET` endpoint:

```js
const es = new EventSource('/api/events'); // key via cookie/session in a browser
es.addEventListener('queue', () => refetch('/api/queue'));
es.addEventListener('status', () => refetch('/api/status'));
```

::: tip Header auth on the stream
`EventSource` can't set headers. From a browser served by the same origin the
session cookie carries it; from a native client, use an SSE library that lets
you add `X-Api-Key`.
:::

## Settings & connections — `settings.manage`

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/settings` | settings.manage | All settings |
| POST | `/api/settings` | settings.manage | Update settings |
| POST | `/api/indexers/test` | settings.manage | Test a Newznab/Torznab indexer |
| POST | `/api/clients/test` | settings.manage | Test a download client |
| POST | `/api/torznab/test` | settings.manage | Test a Torznab source |
| POST | `/api/torrent-client/test` | settings.manage | Test a torrent client |
| POST | `/api/cv/test` | settings.manage | Test the ComicVine connection |
| POST | `/api/metadata/test` | settings.manage | Register with, and prove, the built-in metadata service → `{ ok, registered, message }` |

**`POST /api/metadata/test`** does more than probe: on a server that has never
registered, it provisions the instance key and then proves it with a live
search, so a success means the whole path works. It answers `200` either way —
read `ok`. `registered` tells you whether a key exists at all, which separates
"never registered" from "registered but the service is unreachable".

::: warning Connection tests are admin-only
Any endpoint ending in `/test` reaches an arbitrary host with the credentials
you supply, so it requires `settings.manage` regardless of the resource.
:::

## Users, roles & permissions — `users.manage`

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/users` | users.manage | List accounts |
| POST | `/api/users` | users.manage | Create an account |
| PATCH | `/api/users/{id}` | users.manage | Update an account (role, active, …) |
| DELETE | `/api/users/{id}` | users.manage | Delete an account |
| GET | `/api/roles` | users.manage | List roles |
| POST | `/api/roles` | users.manage | Create a custom role |
| PATCH | `/api/roles/{name}` | users.manage | Update a role's permissions |
| DELETE | `/api/roles/{name}` | users.manage | Delete a custom role |
| GET | `/api/permissions` | users.manage | The permission catalog (core + plugin-registered) |

## Plugins — `plugins.manage` {#plugins}

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/plugins` | plugins.manage | Installed plugins and their state |
| GET | `/api/plugins/catalog` | plugins.manage | Installable plugins |
| POST | `/api/plugins/install` | plugins.manage | Install a plugin |
| POST | `/api/plugins/uninstall` | plugins.manage | Uninstall a plugin |
| POST | `/api/plugins/{name}/enabled` | plugins.manage | Enable/disable a plugin |
| GET | `/api/plugins/client` | library.view | Client assets plugins inject into the UI |
| POST | `/api/restart` | plugins.manage | Restart the app |
| GET | `/api/sources/catalog` | plugins.manage | Installable download sites → `{ sources }` |
| POST | `/api/sources/install` | plugins.manage | Install a site — `{ "id": "annas" }` → `{ installed, version, restartRequired }` |
| POST | `/api/sources/uninstall` | plugins.manage | Remove a site — `{ "id": "annas" }` → `{ removed, restartRequired }` |
| POST | `/api/sources/{id}/test` | settings.manage | Test a site against unsaved form values → `{ ok, message }` |

**Download sites** install separately from plugins but at the same bar, because
both change what the app runs. Each catalog entry carries `id`, `name`,
`description`, what it carries, what it `requires`, its `version`, and whether
it is `installed` with an `updateAvailable`. Installing or removing one sets
`restartRequired`, so follow with `POST /api/restart` when you are ready.
Reading the list of *enabled* sources is a different, unprivileged call:
`GET /api/sources`.

## Jobs, schedules, tools & logs

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/jobs` | system.jobs | Recent and running jobs |
| POST | `/api/jobs/clear` | system.jobs | Clear finished jobs |
| GET | `/api/schedules` | system.jobs | Scheduled tasks |
| POST | `/api/schedules/{key}` | system.jobs | Update a schedule |
| POST | `/api/schedules/{key}/run` | system.jobs | Run a scheduled task now |
| GET | `/api/tools` | system.jobs | Available maintenance tools |
| POST | `/api/tools/{tool}` | system.jobs | Run a tool (as a background job) |
| GET | `/api/logs` | system.logs | Application logs |
| GET | `/api/support/package` | settings.manage | Support package zip: version, runtime, redacted settings, plugins, libraries, jobs, queue, history, logs |
| POST | `/api/support/send` | settings.manage | Build the package and upload it to the hosted support service; body `{ note? }`, returns `{ code, expiresInDays }` |
| POST | `/api/support/mobile` | library.view | A mobile app's diagnostics report; wrapped into a support package (full for admins, lite otherwise) and uploaded; returns `{ code, expiresInDays }` |
| POST | `/api/logs/clear` | system.logs | Clear logs |

## Health

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/healthz` | public | Liveness probe (no `/api` prefix, no auth) — `{ "ok": true }` |

## Plugin routes

Plugins register their own endpoints under the same `/api` tree, gated by the
same permissions, so an API key reaches them too. Each declares an access
tier — `viewer` → `library.view`, `trusted` → `library.manage`, `admin` →
`plugins.manage` — or its own registered permission, like the Requests
plugin's `requests.create`. Omit the declaration and a `GET` defaults to
viewer, everything else to trusted. Core rules win over a plugin's own
declaration, which is why any plugin path ending in `/test` is admin-only.

These endpoints exist **only while their plugin is installed and enabled**.
Check [`GET /api/plugins`](#plugins), or just handle `404`.
See [Plugin API](/plugin-api) for how routes are registered.

### Reader

Reading, progress and page images. Everything needs `reader.read` unless noted.

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/reader/issue/{cvIssueId}` | reader.read | Everything needed to open an issue — page count, neighbours, your progress, bookmarks, preferences |
| GET | `/api/reader/issue/{cvIssueId}/page/{n}` | reader.read | One page as image bytes — `?w=` to downscale, `?trim=1` to shave scan borders |
| POST | `/api/reader/issue/{cvIssueId}/progress` | reader.read | Save your position — `{ "page": 7, "pages": 24, "completed": false }` |
| POST | `/api/reader/issue/{cvIssueId}/mark` | reader.read | Mark read or unread — `{ "read": true }` |
| POST | `/api/reader/read-bulk` | reader.read | Mark many at once — `{ "ids": [ … ], "read": true }` → `{ done }` |
| POST | `/api/reader/issue/{cvIssueId}/bookmark` | reader.read | Add or remove a bookmark — `{ "page": 7, "on": true }` → `{ bookmarks }` |
| GET | `/api/reader/bookmarks` | reader.read | Every bookmark you hold, library-wide |
| GET | `/api/reader/continue` · `/next-up` · `/new-in-library` · `/recently-finished` · `/start-new` | reader.read | The reading shelves → `{ items }` |
| GET | `/api/reader/later` · POST `/api/reader/later/{cvIssueId}` | reader.read | Your read-later shelf — post `{ "on": true }` |
| GET | `/api/reader/stats` | reader.read | Your reading statistics |

Page images are cached hard and revalidate with an `ETag`, so a client that
sends `If-None-Match` gets `304` and pays nothing. Ask for a width and the
server transcodes to WebP when your `Accept` header allows it. An issue with no
file, or one your role cannot see, answers `404` either way — the two are
deliberately indistinguishable.

### Requests

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/requests` | requests.create | Open requests, the pending count, and what this account may do |
| GET | `/api/requests/count` | requests.create | Just the pending count, for a badge |
| GET | `/api/requests/search` | requests.create | Search what can be requested — `?q=`, `?kind=comic\|ebook\|audiobook` |
| POST | `/api/requests` | requests.create | File one — comics `{ "comicvineId": 18166, "note"?: "…" }`, otherwise `{ kind, externalId, … }` |
| POST | `/api/requests/{id}/vote` | requests.create | Second someone else's request — `{ "on": true }` |
| DELETE | `/api/requests/{id}` | requests.create | Withdraw your own pending request, or any request if you can manage them |
| POST | `/api/requests/{id}/approve` | requests.manage | Approve — `{ "download"?: true }` |
| POST | `/api/requests/{id}/decline` | requests.manage | Decline — `{ "reason"?: "…" }` |

Filing a request has three outcomes worth handling separately. A duplicate of
an open request comes back as a **vote** rather than an error. With
auto-approve on it comes back already approved, and the response says what was
queued. And a volume you already own is refused with `409` and the series id,
so a client can link straight to it. Server policy can also refuse a request
outright with `403`, for collected editions or non-Western publishers, if the
admin has restricted those.

Approved downloads run under the **approver's** permissions, not the
requester's.

### Books

`ebooks.use` unless noted. `{id}` is the issue id.

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/ebooks/issue/{id}/file` | ebooks.use | The book itself — `?dl=1` to download rather than open inline |
| GET | `/api/ebooks/issue/{id}/cover` | ebooks.use | Cover image — `?w=` for a width hint |
| GET · POST | `/api/ebooks/issue/{id}/progress` | ebooks.use | Reading position — post `{ locator, fraction, chapter?, page?, pages? }` |
| GET · POST | `/api/ebooks/issue/{id}/bookmarks` | ebooks.use | Highlights and notes — post `{ locator, fraction, note?, color?, text? }` → `{ id }` |
| DELETE | `/api/ebooks/bookmarks/{bookmarkId}` | ebooks.use | Remove one |
| GET | `/api/ebooks/state` | ebooks.use | Every reading position you hold, keyed by issue id |
| GET | `/api/ebooks/books` | ebooks.use | Book records for specific ids — `?issues=1,2,3` |
| GET | `/api/ebooks/stats` | ebooks.use | Your reading statistics |

The file and cover routes accept **HTTP Basic** as well as a key, because OPDS
download managers need a challenge before they will send credentials. A book
held remotely rather than on disk is fetched on first open, so the first
request can be slow and concurrent opens share one download. A source that has
lost the file answers `404` with `unavailable: true`, and the entry is marked
so; a transient failure answers `502` and leaves it retryable.

### Audiobooks

`audiobooks.use` unless noted.

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/audiobooks/issue/{id}/stream` | audiobooks.use | The audio, with range requests honoured |
| GET | `/api/audiobooks/issue/{id}/chapters` | audiobooks.use | `{ chapters, duration }`, fetched on first call and cached |
| GET | `/api/audiobooks/issue/{id}/cover` | audiobooks.use | Cover image — `?w=` for a width hint |
| GET · POST | `/api/audiobooks/issue/{id}/progress` | audiobooks.use | Playback position — post `{ position, duration }` |
| GET · POST | `/api/audiobooks/issue/{id}/bookmarks` | audiobooks.use | Bookmarks — post `{ position, note }` |
| DELETE | `/api/audiobooks/bookmarks/{bookmarkId}` | audiobooks.use | Remove one |
| GET | `/api/audiobooks/info` | audiobooks.use | Records for specific ids — `?issues=1,2,3` |
| GET | `/api/audiobooks/stats` | audiobooks.use | Your listening statistics |

Streaming is built for real players: `Range` is passed through to the source,
`Accept-Ranges` is always set, and a strong validator is synthesised when the
upstream does not provide one, so a dropped connection resumes instead of
starting over.

### Shelves

Faceted browsing for large book and audiobook libraries. `library.view` unless
noted.

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/shelves/status` | library.view | Whether the index is built and usable |
| GET | `/api/shelves/items` | library.view | A page of results — `?page=` (from 0), `?limit=` (default 60, max 120), `?sort=`, plus the current selection |
| GET | `/api/shelves/authors` | library.view | Authors — `?type=`, `?library=`, `?letter=`, `?q=` |
| GET | `/api/shelves/facets` | library.view | Counts for every facet given the current selection |
| POST | `/api/shelves/rebuild` | library.manage | Rebuild the index → `{ started, state }`, or `409` if one is already running |
| GET | `/api/shelves/rebuild/status` | library.view | Progress of a running rebuild |

A `size` of zero on the status route means the index has never been built, and
every other route will come back empty until it is.

### Gamify

All `library.view`, and all scoped to the calling account.

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/gamify/me` | library.view | Your level, streak, quests, achievements, goal and tokens |
| POST | `/api/gamify/goal` | library.view | Set your yearly reading goal — `{ "target": 100 }` |
| POST | `/api/gamify/optout` | library.view | Leave or rejoin the leaderboard — `{ "optOut": true }` |
| POST | `/api/gamify/reroll` | library.view | Swap a weekly quest — `{ "questId": 4 }`, three a week |
| GET | `/api/gamify/leaderboard` | library.view | The household leaderboard for the current month |

When the feature is switched off, or the Reader plugin that records reading is
missing, `/me` answers `200` with `ready: false` and a reason rather than an
error. Handle that before reading any other field.

### OPDS

The OPDS catalog is a protocol surface rather than a JSON API, and it is
documented in full on its own page, including every feed path in both protocol
versions, page streaming, and how progress syncs back. See
[OPDS catalog](/opds#catalog-map).

::: tip This list tracks the app
Endpoints evolve with the app. Pin your client to what you have tested, and
re-read the [release notes](releases) on upgrades — anything that changes or
removes an endpoint is called out there.
:::
