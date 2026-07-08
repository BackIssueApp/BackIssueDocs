# Plugins

BackIssue's core stays lean; extra download sources and whole features ship as plugins. Install them with one click from the in-app **catalog** — the first-run wizard offers them too — or drop a plugin folder into the `plugins/` directory by hand.

## The catalog

| Plugin | What it adds |
|---|---|
| **[Reader](reading)** | Full in-browser comic reader, reading shelves, reading lists, and per-user reading stats |
| **[OPDS](opds)** | Serve your library to native reader apps (Panels, Chunky, …) |
| **[Requests](requests)** | A request-and-approve workflow for adding volumes |
| **[Discover](discover)** | A browsable feed of new & notable comics to add |
| **[AirDC++](airdcpp)** | Direct Connect (DC++) as a download source, with [announce-bot watching](airdcpp#watching-announce-bots) |
| **[SSO (OpenID Connect)](users#signing-in-with-an-identity-provider-sso)** | Sign in through an identity provider — Authentik, Keycloak, Auth0, Google, Microsoft Entra, … |

## Managing plugins

**Sidebar → Plugins** (admins) shows the catalog (install, update when a new version is out, remove) and lists everything installed, what each registered (sources, routes, jobs, UI, permissions), and a per-plugin **enable/disable** toggle. Install/toggle changes apply after a **restart** — the page has a "Restart now" button that restarts the app and waits for it to come back. Disabling a plugin keeps its settings; they're back when you re-enable it.

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

**Writing a plugin?** The complete hook, source-contract, client-bridge, and slot documentation lives in the [Plugin API reference](plugin-api).
