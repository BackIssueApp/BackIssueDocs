# OPDS catalog

The **OPDS plugin** serves your library to native comic-reader apps — **Panels**, **Chunky**, **KyBook**, and anything else that speaks OPDS. Browse your series, download issues, or stream them page-by-page, all from your phone or tablet.

## Connecting an app

Point your OPDS reader at:

```
http(s)://<your-backissue-host>/api/opds
```

Sign in with your BackIssue **username and password** — OPDS uses HTTP Basic auth against your account, so access follows your role and permissions like everything else.

If your account signs in through an external login backend (e.g. a billing or directory integration that checks a username and password), those same credentials work for OPDS too. Accounts that only sign in through an external button — with no BackIssue password of their own — should instead generate an **API key** on their Profile and use that with a reader that supports header or key auth.

Your personal catalog address (with a copy button) is also shown on your **Profile** page, under *Connect a reader app*.

::: tip
The catalog lives under `/api/opds` (not `/opds`) so it's covered by BackIssue's authentication. Use the full path.
:::

### OPDS 1.2 or 2.0?

BackIssue serves **both** catalog formats from the same library — point your app at whichever it prefers:

- **OPDS 1.2** (Atom/XML) — `http(s)://<host>/api/opds` — the widest compatibility; use this if unsure.
- **OPDS 2.0** (JSON) — `http(s)://<host>/api/opds/v2` — the newer format some modern readers use.

Both offer the same shelves, search, downloads, and covers. Page-by-page **streaming (PSE)** is an OPDS 1.2 feature, so readers that stream pages should use the 1.2 URL. The two roots link to each other, so a client that prefers JSON can discover the 2.0 catalog on its own.

If your reader says the credentials are wrong even though they're right, make sure you're on a current build — older versions didn't advertise the auth challenge some apps need. Over the internet (not just your LAN), put BackIssue behind HTTPS: Basic auth sends the password base64-encoded, not encrypted.

## The catalog

Opening the catalog gives you a set of shelves, not just one long list:

- **All series** — every series with readable files, alphabetical. Large libraries are **paginated** (50 per page) with next/previous links, so the app never has to load everything at once.
- **Recently added** — the newest issues to land in your library, most recent first.
- **Publishers** — browse series grouped by publisher. On the series list, publishers also appear as **facets**, so readers that support them can filter inline.
- **Continue reading** and **Read later** — shown when the [Reader](reading) plugin is installed. "Continue reading" is your own in-progress, unfinished issues; "Read later" is your personal shelf. Both are **per account** — everyone sees their own.

## Search

The catalog advertises OpenSearch, so your reader's **search box** works: type a title and get a paginated list of matching series to drill into. No search box in your app? Use the Publishers and All series shelves to browse.

## Reading & downloading

- **Download** — every issue offers its file (CBZ/CBR/PDF) as a standard OPDS acquisition link, with its **size** shown up front and a tidy `Series - #012.cbz` filename. Downloads are **resumable** (range requests), so a dropped connection on a large archive picks up where it left off.
- **Covers** — issues carry cover thumbnails from ComicVine even without the Reader plugin.
- **Page streaming (OPDS-PSE)** — when the [Reader](reading) plugin is also installed, issues expose per-page streaming, so apps can read page-by-page without downloading the whole archive first. Covers and thumbnails then come through that pipeline at the size the app asks for.
- **Progress syncs both ways over streaming.** Stream links carry your resume
  point (`pse:lastRead`), so a PSE app opens an issue where you left off — on
  any device. And streaming a page records progress the same way the built-in
  reader does: your resume point only ever moves **forward** (an app
  prefetching pages can't rewind you), fetching the last page marks the issue
  read, and it all feeds "Continue reading", the apps, and reading stats
  (including [Gamify](gamify), where streamed pages count as real reading).
  Toggle it under **Settings → Plugins → OPDS progress sync**; a client can
  also opt out per-request with `?progress=0` on the stream URL.

Whole-file **downloads** don't sync progress — plain OPDS has no channel for it; once the file is in the app, reading happens offline.

Only valid, ComicVine-matched files are served, and the best (tagged) copy of each issue is chosen automatically.

## Access control

OPDS access is its own grantable permission (**OPDS catalog**), so you can allow or withhold external-app access per role — independent of in-browser reading. Series flagged **mature** are hidden from the catalog for roles without the *View mature content* permission — the same rule the web app enforces. See [Users & access](users).
