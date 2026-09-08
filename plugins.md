# Plugins

BackIssue's core stays lean; extra download sources and whole features ship as plugins. Install them with one click from the in-app **catalog** — the first-run wizard offers them too — or drop a plugin folder into the `plugins/` directory by hand.

## The catalog

| Plugin | What it adds |
|---|---|
| **[Reader](reading)** | Full in-browser comic reader, reading shelves, reading lists, and per-user reading stats |
| **[Books](ebooks)** | A Books library for EPUB/PDF — scanned, enriched, and read in the browser with bookmarks and progress |
| **[Audiobooks](audiobooks)** | An Audiobooks library with an in-browser player — chapters, sleep timer, bookmarks and resume |
| **[Shelves](shelves)** | Faceted browsing for large book and audiobook libraries — author, decade, format, status |
| **[OPDS](opds)** | Serve your library to native reader apps (Panels, Chunky, …) |
| **[Requests](requests)** | A request-and-approve workflow for adding volumes |
| **[Discover](discover)** | A browsable feed of new & notable comics to add |
| **[AirDC++](airdcpp)** | Direct Connect (DC++) as a download source, with [announce-bot watching](airdcpp#watching-announce-bots) |
| **[Notifications Hub](notifications)** | Send alerts to Discord, Telegram, Pushover, ntfy, or any webhook — with per-channel category filters |
| **[SSO (OpenID Connect)](users#signing-in-with-an-identity-provider-sso)** | Sign in through an identity provider — Authentik, Keycloak, Auth0, Google, Microsoft Entra, … |

## Managing plugins

**Sidebar → Plugins** (admins) shows the catalog (install, update when a new version is out, remove) and lists everything installed, what each registered (sources, routes, jobs, UI, permissions), and a per-plugin **enable/disable** toggle. Install/toggle changes apply after a **restart** — the page has a "Restart now" button that restarts the app and waits for it to come back. Disabling a plugin keeps its settings; they're back when you re-enable it.

Plugins can register their own **settings** (they appear in Settings automatically) and their own **permissions** (grantable to roles on the [Users](users) page).

## Download sites

Sites the app downloads from are kept together in a `sources/` folder rather
than installed one plugin at a time. They appear in their own **Download
sites** section on the Plugins page, where each one links to its settings.
Switch a site on in **Settings → Sources**.

## Adding a download site

A plugin that adds a **download site** is mostly a description of the site:
where to search, and where a result's file or page images are. The app
supplies the rest — HTTP with Cloudflare handling, polite request pacing,
matching, building the file, and the settings card with its Test button. A
straightforward site is a few dozen lines, and one plugin can carry several
sites. See [the plugin API reference](/plugin-api#sources-from-a-site-description).

## How it works

BackIssue loads external plugins from the `plugins/` directory at startup. A plugin is a folder with an `index.js` whose default export receives the plugin API:

```js
export default function register(api) {
  api.registerSource(mySource);        // a download source
  api.registerSettings({ ... });       // settings fields (auto-wired in the UI)
  api.registerClientAsset({ js: 'client/ui.js' }); // frontend UI
  api.registerRoute('post', '/api/mysource/test', handler);
  api.registerJob({ ... });            // schedulable background job
  api.registerStartup(fn);             // runs at boot
}
```

Sources implement: `{ id, label, kind: 'immediate' | 'deferred', isEnabled(config), find(ctx), fetch(candidate, ctx, onProgress), manualSearch(ctx)?, fetchPack(candidate, ctx, onProgress)? }`.

The core application ships with no plugins; each plugin lives in its own repository.

**Writing a plugin?** The complete hook, source-contract, client-bridge, and slot documentation lives in the [Plugin API reference](plugin-api).
