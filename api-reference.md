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
    "username": "darragh",
    "role": "admin",
    "permissions": ["*"]
  }
}
```

`permissions` is `["*"]` for admin; otherwise the explicit list your role
resolves to. In open mode (zero accounts) `openMode` is `true` and the user
is a synthetic local admin.

## Collection & series

Your tracked series and their issues. Reads need `library.view`; changes need
`library.manage`. Series flagged restricted return `404` to roles without
`library.restricted`.

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/collection` | library.view | Tracked series; `?filter=`, `?search=`, `?sort=` |
| GET | `/api/collection/{id}` | library.view | One series with issues, owned/missing counts, folder location |
| GET | `/api/series` | library.view | All series (matched + catalog); `?search=` |
| GET | `/api/series/{id}/issues` | library.view | Issues for a series |
| GET | `/api/issue/{cvIssueId}` | library.view | One issue by ComicVine issue id |
| POST | `/api/collection/add-cv` | library.manage | Add a series by ComicVine volume — body `{ "comicvineId": 12345 }` |
| POST | `/api/collection/{id}/cv` | library.manage | Re-point a series at a different ComicVine volume |
| POST | `/api/cv/match` | library.manage | Match an unmatched series to ComicVine |
| POST | `/api/collection/{id}/aliases` | library.manage | Set search aliases for a series |
| POST | `/api/collection/{id}/metadata` | library.manage | Refresh a series' metadata |
| POST | `/api/issue/{cvId}/metadata` | library.manage | Refresh one issue's metadata |
| POST | `/api/collection/{id}/restricted` | library.manage | Flag/unflag a series as mature/restricted |
| POST | `/api/collection/{id}/monitor` | library.manage | Toggle automation (auto-download) for a series |
| POST | `/api/collection/{id}/follow` | library.view | Toggle your personal follow (pull list) |
| POST | `/api/collection/bulk` | library.manage | Bulk action across selected series |
| POST | `/api/collection/{id}/delete` | library.manage | Untrack a series (files on disk are left alone) |

**`POST /api/collection/add-cv`** — adds the volume, follows it for you, and
(when auto-download is on and your role allows it) queues every missing
issue:

```bash
curl -X POST http://backissue.local:8787/api/collection/add-cv \
  -H "X-Api-Key: bi_…" -H "Content-Type: application/json" \
  -d '{"comicvineId": 18166}'
# → { "seriesId": 42, "cvId": 18166, "queued": 12 }
```

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

Finding and grabbing issues. Anything that touches a source or the queue's
grabs needs `downloads.grab`.

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/status` | library.view | Counts, followed count, version, and live crawl/queue state |
| GET | `/api/queue` | library.view | The download queue and in-flight pack grabs |
| GET | `/api/wanted` | library.view | Missing issues on followed series |
| GET | `/api/history` | library.view | Import history (newest first, paged) |
| GET | `/api/history/failed` | library.view | Failed downloads |
| GET | `/api/sources` | library.view | Enabled download sources |
| GET | `/api/stats` | library.view | Library statistics |
| POST | `/api/download` | downloads.grab | Queue issues by internal id — `{ "issueIds": [1,2] }` → `{ "queued": 2 }` |
| POST | `/api/collection/{id}/download` | downloads.grab | Queue CV issues of a series — `{ "cvIssueIds": [ … ] }` |
| POST | `/api/collection/{id}/redownload` | downloads.grab | Re-grab owned issues of a series |
| POST | `/api/redownload` | downloads.grab | Re-grab specific issues |
| POST | `/api/wanted/download-all` | downloads.grab | Queue every wanted issue |
| POST | `/api/search` | downloads.grab | Search all enabled sources for an issue |
| POST | `/api/search/grab` | downloads.grab | Grab a chosen result — `{ result, seriesId, cvIssueId }` |
| POST | `/api/packs/search` | downloads.grab | Search sources for multi-issue packs |
| POST | `/api/packs/grab` | downloads.grab | Grab a pack — `{ result, seriesId }` |
| POST | `/api/usenet/search` · `/api/usenet/grab` | downloads.grab | Per-issue usenet search/grab (legacy) |
| POST | `/api/torrent/search` · `/api/torrent/grab-pack` | downloads.grab | Per-series torrent pack search/grab (legacy) |
| POST | `/api/queue/retry/{id}` | downloads.grab | Retry a queued/failed item |
| POST | `/api/queue/cancel/{id}` | downloads.grab | Cancel a queued item |
| POST | `/api/grabs/{id}/cancel` | downloads.grab | Cancel an in-flight pack grab |
| POST | `/api/queue/pause` · `/resume` · `/clear` | library.manage | Pause, resume, or clear the queue |
| POST | `/api/retry-failed` · `/api/clear-failed` | library.manage | Retry or clear all failed downloads |

**`POST /api/search`** takes a series/issue and returns ranked results from
every enabled source; feed one back to `/api/search/grab`:

```bash
curl -X POST http://backissue.local:8787/api/search \
  -H "X-Api-Key: bi_…" -H "Content-Type: application/json" \
  -d '{"seriesId": 42, "cvIssueId": 987654, "query": "Saga 1"}'
```

## Releases

The weekly new-comics list.

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/releases` | library.view | Weekly releases (with your-collection matches) |
| POST | `/api/releases/check` | library.manage | Refresh the releases list |
| POST | `/api/releases/download` | downloads.grab | Queue a release you don't own |

## Reading lists

Personal curation — each user manages their own; no files are touched, so
`library.view` is enough for every verb.

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/lists` | library.view | Your reading lists |
| POST | `/api/lists` | library.view | Create a list |
| GET | `/api/lists/{id}` | library.view | One list with items |
| PATCH | `/api/lists/{id}` | library.view | Rename/reorder a list |
| DELETE | `/api/lists/{id}` | library.view | Delete a list |
| POST | `/api/lists/{id}/items` | library.view | Add an issue to a list |
| DELETE | `/api/lists/{id}/items/{cvIssueId}` | library.view | Remove an issue from a list |
| POST | `/api/lists/import-arc` | library.view | Create a list from a ComicVine story arc |

## Notifications

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/notifications` | library.view | Your in-app notifications |
| POST | `/api/notifications/read` | library.manage | Mark notifications read |

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

## Plugins — `plugins.manage`

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/plugins` | plugins.manage | Installed plugins and their state |
| GET | `/api/plugins/catalog` | plugins.manage | Installable plugins |
| POST | `/api/plugins/install` | plugins.manage | Install a plugin |
| POST | `/api/plugins/uninstall` | plugins.manage | Uninstall a plugin |
| POST | `/api/plugins/{name}/enabled` | plugins.manage | Enable/disable a plugin |
| GET | `/api/plugins/client` | library.view | Client assets plugins inject into the UI |
| POST | `/api/restart` | plugins.manage | Restart the app |

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
| POST | `/api/logs/clear` | system.logs | Clear logs |

## Health

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/healthz` | public | Liveness probe (no `/api` prefix, no auth) — `{ "ok": true }` |

## Plugin routes

Plugins register their own endpoints under the same `/api` tree, gated by the
same permissions, so an API key reaches them too. Each declares an access
tier — `viewer` → `library.view`, `trusted` → `library.manage`, `admin` →
`plugins.manage` — or its own registered permission (e.g. the Requests
plugin's `requests.create`). What a plugin exposes is documented with that
plugin; the rule of thumb is that anything its UI can do, a key with the
right permission can do. See [Plugin API](/plugin-api) for how routes are
registered, and [Building on the API](/api#plugin-routes-are-part-of-the-api)
for examples (Reader page images, OPDS, Requests).

::: tip This list tracks the app
Endpoints evolve with the app — this reference matches the current release.
Pin your client to what you've tested and re-check on upgrades.
:::
