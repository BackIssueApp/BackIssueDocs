# Plugin API reference

Everything a BackIssue plugin can do, in one place. For the user-facing view (installing, enabling, the catalog) see [Plugins](plugins).

## Anatomy of a plugin

A plugin is a folder under `plugins/` (in Docker: `/data/plugins/`) with at least:

```
plugins/my-plugin/
├── package.json      # name, version, description (shown on the Plugins page)
├── index.js          # default-exports register(api)
└── client/ui.js      # optional front-end script (see Client bridge)
```

```js
// index.js
export default function register(api) {
  // wire up whatever this plugin does, using only the hooks it needs
}
```

Plugins load once at startup, alphabetically. `register(api)` may be async. A plugin that throws is logged and skipped — never fatal. Plugins may import core modules directly (`../../src/config.js`, `../../src/db.js`, …); core never imports from `plugins/`.

Dependencies work like any npm package: give the plugin its own `package.json` dependencies and they're installed when the plugin is installed from the catalog (`npm install` runs in its folder). Node's resolution also falls through to the app's own `node_modules`, so core dependencies (e.g. `better-sqlite3`) are usable without redeclaring them.

## Server hooks

The `api` object passed to `register()`:

### `registerSource(source)`

Adds a download source — the biggest hook; see [the source contract](#the-source-contract) below.

### `registerSettings(fields)`

Declares the plugin's settings keys so they validate and persist like core settings:

```js
api.registerSettings({
  mypluginEnabled: { type: 'bool' },
  mypluginUrl:     { type: 'string', allowEmpty: true },
  mypluginBatch:   { type: 'int', min: 1, max: 100 },
  mypluginMode:    { type: 'enum', values: ['fast', 'safe'] },
});
```

Values live in `settings.json` with everything else and are read from `config` (`config.mypluginUrl`). Settings a plugin declares survive even while the plugin is disabled.

**Defaults:** `register()` runs *before* saved settings load, so seed defaults directly — saved values still win:

```js
config.mypluginBatch ??= 25;
```

**Settings UI:** give any input in your client script an id of `set-<key>` (e.g. `id="set-mypluginUrl"`) and the Settings page loads/saves it automatically — no wiring.

### `registerRoute(method, path, handler, opts?)`

An Express route, registered after core routes. Plugin routes are part of the app's API surface: sessions, HTTP Basic, and personal [API keys](api) all reach them, gated by the same permission checks — so a route you register here is automatically usable by third-party clients acting as a permitted user.

```js
api.registerRoute('get', '/api/myplugin/things', (req, res) => { ... }, { access: 'viewer' });
```

- `opts.access` — what the route requires: `'public'` (no login — for SSO callbacks etc.), a role tier (`'viewer' | 'trusted' | 'admin'`), or a permission key the plugin registered. Default: GET → `viewer`, other methods → `trusted`.
- `opts.basicAuth: true` — on a 401, advertise `WWW-Authenticate: Basic` so machine clients (OPDS readers) know to send HTTP Basic. Leave off for browser-facing routes.
- `req.user` carries the authenticated user (`{ id, username, role }`).
- Core services are on `req.app.locals`:
  - `startDownloads()` — kick the download queue.
  - `notify(event)` — emit a notification (bell + registered notifier channels): `{ type, category, level, title, body, url?, userId?, seriesId? }`.
  - `issueSession(req, res, identity)` — sign in an **already-verified** external identity `{ provider, subject, email?, name?, defaultRole? }`; links or provisions the account and sets the session cookie. For SSO plugins' callback routes.

### `registerJob(job)`

A schedulable background job, shown on the **Jobs** page with a cron field, enable toggle, and Run now:

```js
api.registerJob({
  id: 'myplugin-sync',
  label: 'Sync my thing',
  scheduleKey: 'mypluginSyncHours',   // naming convention — see below
  run: (ctx) => doSync(ctx),
});
```

- The `scheduleKey`'s `Hours` suffix is a legacy convention: the schedule is actually driven by the **`<base>Cron`** and **`<base>Enabled`** settings (`mypluginSyncCron` / `mypluginSyncEnabled`) — register both via `registerSettings` and seed defaults with `??=`.
- `run(ctx)` receives `{ db, startDownloads }` — the live core database connection and an idle-guarded queue kick — so a job can queue issues without reaching into core internals.

### `registerPermission(perm)`

A named permission admins can grant per role:

```js
api.registerPermission({
  key: 'myplugin.use',
  label: 'Use my thing',
  description: 'What granting this allows',
  tier: 'viewer',   // which BUILT-IN roles include it: viewer | trusted | admin
});
```

Custom roles pick plugin permissions from the same catalog as core ones. Use the key as a route's `access`.

### `registerClientAsset(asset)`

Front-end files, served at `/plugins/<name>/<path>` and injected into the app shell (only for signed-in users — never on the login page):

```js
api.registerClientAsset({ js: 'client/ui.js', css: 'client/ui.css' });
```

### `registerStartup(fn)`

An async task run once at boot, after the database and settings are ready. May return a handle the plugin keeps.

### `registerAuthProvider(provider)` — external login (SSO)

Puts a "Sign in with *label*" button on the login page:

```js
api.registerAuthProvider({ id: 'myidp', label: 'MyIdP', loginPath: '/api/myidp/login' });
```

`loginPath` must be a **public** plugin route that starts the provider's flow; the callback route verifies the provider's response and calls `req.app.locals.issueSession(...)`.

### `registerCredentialProvider(fn)` — external password backends

Lets the standard login form authenticate against a remote system (LDAP-style). Core tries these **only after** local password auth fails:

```js
api.registerCredentialProvider(async (username, password) => {
  const ok = await remoteCheck(username, password);
  return ok ? { provider: 'remote', subject: userId, email, name, defaultRole: 'viewer' } : null;
});
```

Return a **verified** identity or `null` (not this backend's user / wrong password). Core links or provisions the account and issues the session. Local accounts always win first, so an admin can't be locked out by a downed backend.

### `registerNotifier(fn)` — outbound notification channels

Called (fire-and-forget) with **every** event the notification centre records; the channel does its own filtering and transport:

```js
api.registerNotifier(async (event, { fetchImpl }) => {
  // event: { type, category, level, title, body, url, userId, seriesId }
  if (!myUrl) return;
  await fetchImpl(myUrl, { method: 'POST', body: JSON.stringify(event) });
});
```

- `category` is one of `import | failure | release | request | system`; `level` is `info | success | warn | error`.
- A thrown error is logged and never breaks the caller or other channels — but still filter/no-op cheaply when unconfigured.
- Use the passed `fetchImpl` (tests inject it); it defaults to global `fetch`.
- The **Notifications Hub** plugin is the reference implementation (Discord, Telegram, Pushover, ntfy, generic webhook).

## The source contract

`registerSource(source)` takes:

```js
{
  id: 'mysource',            // unique, stable — appears in logs/history
  label: 'mysource',
  kind: 'immediate',         // or 'deferred'
  isEnabled(config) {},      // read your own settings; false = skipped everywhere
  async find(ctx) {},        // → a candidate object, or null
  // immediate sources:
  async fetch(candidate, ctx, onProgress) {},     // do the download yourself
  // deferred sources:
  async grab(candidate, ctx) {},                  // hand off to an external client
  // optional:
  async manualSearch(ctx) {},                     // multi-result list for the search modal
  async fetchPack(candidate, ctx, onProgress) {}, // multi-issue packs
}
```

**Two kinds:**

- **`immediate`** — the source downloads in-app. `fetch()` returns `{ srcPath }` (a file on disk) or `{ buffer }`, plus optional `format` (`'cbz' | 'pdf'`) and `keep: true` (copy the file in instead of moving it — e.g. to keep seeding/sharing). Core converts, tags, and files it.
- **`deferred`** — the source hands off to an external download client. `grab()` returns `{ downloadId, client, category, title }`; a background monitor watches the client and imports the finished file.

**`find(ctx)`** searches for one wanted issue and returns whatever object your `fetch`/`grab` needs (it's passed back verbatim). `ctx` carries:

| Field | Meaning |
|---|---|
| `ctx.issue` | The issue row — `issue_number`, `title`, `url` (`cvissue:<id>` for CV-keyed issues) |
| `ctx.seriesTitle` / `ctx.seriesYear` / `ctx.publisher` | Naming fields (ComicVine's when matched) |
| `ctx.seriesNames` | **Every** name the volume is known by (title + aliases) — search under all of them |
| `ctx.seriesPath` | The series' on-disk folder |
| `ctx.config` | Live settings |
| `ctx.db` | The core database |

**Match strictly.** Use the shared helpers so every source agrees on what counts as a match:

```js
import { scoreRelease, suspiciouslySmall, manualTarget, manualQueries } from '../../src/sources/usenet.js';
```

`scoreRelease(title, target)` is the canonical series+number matcher (exact normalized series match incl. aliases — it's what stops *Spider-Man* grabbing *Amazing Spider-Man*); `suspiciouslySmall(size)` rejects KB-scale fakes.

**`manualSearch(ctx)`** returns `[{ title, size, ... }]` for the manual search modal; the user's pick is pinned and handed to your `fetch`/`grab` unchanged. `ctx.query` carries the user's free-text query when present.

## The client bridge

A registered `js` asset runs in the app and wires itself through `window.BackIssue`:

```js
window.BackIssue.registerClient((api) => {
  const el = api.slot('settings-plugin-sources');
  // build DOM, attach handlers…
});
```

### Bridge methods

| Method | What it does |
|---|---|
| `slot(id)` | A mount-point element (see [Slots](#slots)) — append to it, never replace its contents |
| `get(path)` / `post(path, body)` | Authenticated fetch helpers returning JSON |
| `me()` | The resolved session: `{ openMode, user: { id, username, role, permissions } }` |
| `can(perm)` | Does the signed-in user hold a permission — hide affordances the server would 403 |
| `icon(name, opts?)` | Core's inline-SVG icon set as a string — matches the app's UI on every device |
| `toast(msg, type)` | Host toast: `'info' | 'ok' | 'error'` |
| `escapeHtml(s)` / `fmt(n)` / `safeUrl(u)` | Escaping, number formatting, and URL sanitizing (route any user/remote `href` through `safeUrl`) |
| `addMenuAction(label, onClick, icon?, { section }?)` | A sidebar menu entry, grouped under an optional section header |
| `registerIssueAction({ id, icon, title, when(issue), run(issue, series) })` | A button on matching issue rows (and the issue info panel). `icon`/`title` may be functions of the issue |
| `registerSeriesAction({ id, label, title?, when(series, issues), run(series, issues) })` | A button in the series header |
| `registerIssueCover(fn)` | Provide cover URLs: `fn(issue) → url | null`; first non-null provider wins |
| `refreshIssueActions()` | Re-render issue/series action buttons after your state changes |
| `onStatus(cb)` | Called with each status poll (progress bars etc.) |
| `onSettingsLoad(cb)` | Called when the Settings page opens, with the current settings |
| `onSourcesSync(cb)` | Called on every source-UI sync; return whether your source is enabled (feeds the "no sources" warning). Update your own settings block here |
| `refreshSourceUI()` | Ask the Settings page to re-run the source sync (call from your enable toggle) |

### Slots

Plain DOM mount points that stay mounted for the app's lifetime. **Append** children (`slot.appendChild(...)`) — the slots are shared between plugins.

| Slot id | Where |
|---|---|
| `settings-plugin-sources` | Settings → Sources — add a source block (`.src-block` markup gets the collapsible-card treatment automatically) |
| `settings-plugin-auth` | Settings → Sign-in — auth-plugin configuration |
| `settings-plugin-priority` | Settings → Sources, below source priority |
| `settings-plugin-library` | Settings → Library — library-behavior preferences |
| `settings-plugin-notifications` | Settings → Notifications — outbound channels (`.src-block` cards work here too; switchless cards manage their own open state in `onSettingsLoad`) |
| `menu-plugin-actions` | The sidebar (via `addMenuAction`) |
| `header-plugin-slot` | The top bar, next to the bell |
| `home-plugin-rail` | Above the library grid — reading-shelf-style rails |
| `profile-plugin-slot` | The user's Profile page — per-user options |
| `tools-plugin-actions` | The Tools page — plugin-provided maintenance tools |

Reuse core CSS classes (`.field`, `.btn`, `.switch`, `.modal__note`, `.src-block`, …) so plugin UI is indistinguishable from core UI.

## Conventions & tips

- **Prefix everything** with your plugin name: settings keys (`mypluginFoo`), routes (`/api/myplugin/...`), permission keys (`myplugin.use`).
- **Per-user data**: key your tables by `req.user.id`. Store plugin data in the core database (own tables, created by your plugin) so backups cover it — open your own connection or use the job context's `db`.
- **Settings fields**: `id="set-<key>"` inputs are loaded and saved automatically; checkboxes map to booleans.
- **Test buttons**: pattern a connection test as a `POST /api/myplugin/test` route that accepts the posted form values, so it works before Save.
- **Logging**: `import { logInfo, logWarn, logError } from '../../src/logstore.js'` — entries land on the Logs page with your category.
- **Graceful degradation**: feature-detect newer host hooks (`api.registerJob?.({...})`, `typeof api.can === 'function'`) so the plugin still loads on older BackIssue versions.
