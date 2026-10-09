---
description: "Install plugins and download sites from the in-app catalog, see what each one registers, and manage them safely."
---

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
| **[Gamify](gamify)** | Reading as a quest — XP, levels, streaks, achievements, and a household leaderboard |
| **[Migration Assistant](migrate)** | Import an existing Mylar3 or Kapowarr collection, matched by ComicVine volume id |
| **[Prowlarr](prowlarr)** | Feed your Prowlarr indexers to the built-in Usenet and torrent sources |
| **[SSO (OpenID Connect)](users#signing-in-with-an-identity-provider-sso)** | Sign in through an identity provider — Authentik, Keycloak, Auth0, Google, Microsoft Entra, … |

Download **sites** are listed separately — see [Download sites](#download-sites) below.

## Managing plugins

**Sidebar → Plugins** (admins) shows the catalog (install, update when a new version is out, remove) and lists everything installed, what each registered (sources, routes, jobs, UI, permissions), and a per-plugin **enable/disable** toggle. Install/toggle changes apply after a **restart** — the page has a "Restart now" button that restarts the app and waits for it to come back. Disabling a plugin keeps its settings; they're back when you re-enable it.

<figure class="bi-ex" v-pre>
  <div class="bi-ex__frame" role="img" aria-label="Plugins page: a restart banner naming a just-installed plugin, and four installed plugin cards showing status, what each registered, an enable toggle, Configure and Remove">
    <div class="x-d-head" style="border-bottom:0;padding-bottom:0">
      <h3 class="x-d-h2 x-d-h2--sm">Plugins</h3>
      <span class="x-d-summary x-d-summary--body">4 installed · 2 running</span>
      <div class="x-d-views">
        <span class="x-d-view x-d-view--on"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 7h3a1 1 0 0 0 1-1V5a2 2 0 1 1 4 0v1a1 1 0 0 0 1 1h3a1 1 0 0 1 1 1v3a1 1 0 0 0 1 1h1a2 2 0 1 1 0 4h-1a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1v-1a2 2 0 1 0-4 0v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a2 2 0 1 0 0-4H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1z"/></svg>Plugins</span>
        <span class="x-d-view"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12M7 10l5 5 5-5M5 21h14"/></svg>Download sites</span>
      </div>
    </div>
    <div class="x-d-banner">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><path d="M12 9v4M12 17h.01"/></svg>
      <span class="x-d-bannertext">Installed notifications-hub 1.0.0 — restart BackIssue to apply. Plugins load at boot, so nothing changes until then.</span>
      <span class="x-d-bannerbtn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a9 9 0 1 1-3-6.7L21 8"/><path d="M21 3v5h-5"/></svg>Restart now</span> <span class="x-pin">1</span>
    </div>
    <div class="x-d-section"><span class="x-d-sectionname">Installed</span><span class="x-d-sectioncount">4 shown</span></div>
    <div class="x-d-grid">
      <div class="x-d-card">
        <div class="x-d-cardhead">
          <div class="x-d-ico" style="background:color-mix(in srgb, var(--x-muted) 14%, transparent);color:var(--x-muted)"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg></div>
          <div class="x-d-cardid"><div class="x-d-cardtitle"><span class="x-d-name">reader</span><span class="x-d-ver">v2.3.1</span></div><div class="x-d-catlabel">Utility</div></div>
          <span class="x-d-status x-d-status--running">running</span>
        </div>
        <p class="x-d-desc">Full in-browser comic reader, reading shelves, reading lists, and per-user reading stats</p>
        <div class="x-d-caps"><span class="x-d-cap"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="6" cy="19" r="3"/><circle cx="18" cy="5" r="3"/><path d="M6 16V9a4 4 0 0 1 4-4h5"/></svg>12 API routes</span><span class="x-d-cap"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18"/></svg>UI</span><span class="x-d-cap"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>1 settings section</span> <span class="x-pin">2</span></div>
        <div class="x-d-cardfoot">
          <span class="x-d-toggle"><span class="x-d-sw x-d-sw--on" aria-hidden="true"></span>Enabled</span>
          <div class="x-d-footacts"><span class="x-d-ghost">Configure</span><span class="x-d-ghost">Remove</span></div>
        </div>
      </div>
      <div class="x-d-card">
        <div class="x-d-cardhead">
          <div class="x-d-ico" style="background:color-mix(in srgb, var(--x-muted) 14%, transparent);color:var(--x-muted)"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg></div>
          <div class="x-d-cardid"><div class="x-d-cardtitle"><span class="x-d-name">requests</span><span class="x-d-ver">v1.4.0</span></div><div class="x-d-catlabel">Utility</div></div>
          <span class="x-d-status x-d-status--running">running</span>
        </div>
        <p class="x-d-desc">A request-and-approve workflow for adding volumes</p>
        <div class="x-d-caps"><span class="x-d-cap"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="6" cy="19" r="3"/><circle cx="18" cy="5" r="3"/><path d="M6 16V9a4 4 0 0 1 4-4h5"/></svg>6 API routes</span><span class="x-d-cap"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>1 job</span><span class="x-d-cap"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18"/></svg>UI</span><span class="x-d-cap"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>1 settings section</span></div>
        <div class="x-d-cardfoot">
          <span class="x-d-toggle"><span class="x-d-sw x-d-sw--on" aria-hidden="true"></span>Enabled</span>
          <div class="x-d-footacts"><span class="x-d-ghost">Configure</span><span class="x-d-ghost">Remove</span></div>
        </div>
      </div>
      <div class="x-d-card x-d-card--off">
        <div class="x-d-cardhead">
          <div class="x-d-ico" style="background:color-mix(in srgb, var(--x-muted) 14%, transparent);color:var(--x-muted)"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg></div>
          <div class="x-d-cardid"><div class="x-d-cardtitle"><span class="x-d-name">opds</span><span class="x-d-ver">v1.1.2</span></div><div class="x-d-catlabel">Utility</div></div>
          <span class="x-d-status x-d-status--disabled">disabled</span>
        </div>
        <p class="x-d-desc">Serve your library to native reader apps (Panels, Chunky, …)</p>
        <div class="x-d-cardfoot">
          <span class="x-d-toggle"><span class="x-d-sw" aria-hidden="true"></span>Disabled</span> <span class="x-pin">3</span>
          <div class="x-d-footacts"><span class="x-d-ghost">Remove</span></div>
        </div>
      </div>
      <div class="x-d-card">
        <div class="x-d-cardhead">
          <div class="x-d-ico" style="background:color-mix(in srgb, var(--x-accent) 14%, transparent);color:var(--x-accent)"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg></div>
          <div class="x-d-cardid"><div class="x-d-cardtitle"><span class="x-d-name">notifications-hub</span><span class="x-d-ver">v1.0.0</span></div><div class="x-d-catlabel">Notifications</div></div>
          <span class="x-d-status x-d-status--restart">restart to activate</span>
        </div>
        <p class="x-d-desc">Send alerts to Discord, Telegram, Pushover, ntfy, or any webhook — with per-channel category filters</p>
        <div class="x-d-cardfoot">
          <span class="x-d-toggle"><span class="x-d-sw x-d-sw--on" aria-hidden="true"></span>Enabled</span>
          <div class="x-d-footacts"><span class="x-d-ghost">Remove</span></div>
        </div>
      </div>
    </div>
  </div>
  <figcaption>
    <span class="x-pin">1</span> Installs and toggles wait for a restart; the banner names what's pending and <b>Restart now</b> brings the app back with it loaded.
    <span class="x-pin">2</span> What each plugin registered.
    <span class="x-pin">3</span> A disabled plugin isn't loaded, but its settings are kept for when you switch it back on.
  </figcaption>
</figure>

Plugins can register their own **settings** (they appear in Settings automatically) and their own **permissions** (grantable to roles on the [Users](users) page).

## Download sites

Sites the app downloads from are maintained together in one repository and
installed individually, rather than one plugin per site. They appear in their
own **Download sites** section on the Plugins page, where each one links to its
settings. Switch a site on in **Settings → Sources**.

| Site | What it carries | Needs |
|---|---|---|
| **[MangaDex](sources#mangadex)** | Manga chapters, with language and scanlation-group preferences | Nothing |
| **[WeebCentral](sources#weebcentral)** | Manga chapters | [FlareSolverr](sources#weebcentral) |
| **[MangaTaro](sources#mangataro)** | Manga chapters | Nothing |
| **[Atsumaru](sources#atsumaru)** | Manga chapters | Nothing |
| **[Anna's Archive](sources#annas-archive)** | Books (EPUB and PDF) for a Books library | The browser build; a member key is optional |

Each one is described in full on the [Download sources](sources) page.

## Adding a download site

A plugin that adds a **download site** is mostly a description of the site:
where to search, and where a result's file or page images are. The app
supplies the rest — HTTP with Cloudflare handling, polite request pacing,
matching, building the file, and the settings card with its Test button. A
straightforward site is a few dozen lines, and one plugin can carry several
sites. See [the plugin API reference](/plugin-api#sources-from-a-site-description).

## How it works

BackIssue loads external plugins from its **plugins directory** at startup — `/data/plugins` in Docker, so an installed plugin survives an image update. A plugin is a folder with an `index.js` whose default export receives the plugin API:

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

Sources implement `{ id, label, kind, isEnabled(config), find(ctx), … }`, where an
`immediate` source downloads in-app with `fetch()` and a `deferred` one hands off
to a download client with `grab()`. The full contract is in the
[Plugin API reference](plugin-api#the-source-contract).

**Where the code lives.** The app image ships with no plugins installed — you
choose them, and they're kept in your data directory rather than baked into the
image. Each feature plugin has its own repository; the download **sites** are the
exception, maintained together in one repository and installed individually.

**What a normal install ends up with.** First-run setup pre-ticks the **Reader**,
so most servers have the in-browser reader from day one. Everything else is
opt-in.

**Writing a plugin?** The complete hook, source-contract, client-bridge, and slot documentation lives in the [Plugin API reference](plugin-api).
