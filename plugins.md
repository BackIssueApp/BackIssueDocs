# Plugins

BackIssue's core stays lean; extra download sources and whole features ship as plugins — each in its own repository, dropped into the `plugins/` directory and loaded at startup.

## Plugins with docs

| Plugin | What it adds |
|---|---|
| **[Reader](reading)** | Full in-browser comic reader, reading lists, and per-user reading stats |
| **[OPDS](opds)** | Serve your library to native reader apps (Panels, Chunky, …) |
| **[Requests](requests)** | A request-and-approve workflow for adding volumes |
| **[Discover](discover)** | A browsable feed of new & notable comics to add |
| **[AirDC++](airdcpp)** | Direct Connect (DC++) as a download source |

## Managing plugins

**Sidebar → Plugins** (admins) lists everything installed under `plugins/`, what each registered (sources, routes, jobs, UI, permissions), and a per-plugin **enable/disable** toggle. Toggles apply after a **restart** — the page has a "Restart now" button that restarts the app and waits for it to come back.

Plugins can register their own **settings** (they appear in Settings automatically) and their own **permissions** (grantable to roles on the [Users](users) page).

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
