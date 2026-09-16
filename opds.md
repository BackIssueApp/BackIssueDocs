---
description: "Serve your library to native reader apps over OPDS, including page streaming and reading-progress sync."
---

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

If your reader says the credentials are wrong even though they're right, make sure the server is up to date — older versions didn't advertise the auth challenge some apps need. Over the internet (not just your LAN), put BackIssue behind HTTPS: Basic auth sends the password base64-encoded, not encrypted.

## The catalog

Opening the catalog gives you a set of shelves, not just one long list:

- **All series** — every series with readable files, alphabetical. Large libraries are **paginated** (50 per page) with next/previous links, so the app never has to load everything at once.
- **Recently added** — the newest issues to land in your library, most recent first.
- **Publishers** — browse series grouped by publisher. On the series list, publishers also appear as **facets**, so readers that support them can filter inline.
- **Reading lists** — your reading lists and imported story arcs, plus any a user has shared with everyone. Opening one serves its issues **in reading order**, so the next issue to read is simply the next entry. Issues you don't own yet still appear in place, marked "not on the shelf" and without a download link, so the order stays intact and you can see what's missing.
- **Continue reading** and **Read later** — shown when the [Reader](reading) plugin is installed. "Continue reading" is your own in-progress, unfinished issues; "Read later" is your personal shelf. Both are **per account** — everyone sees their own.

### Catalog map

Readers navigate this for you, but it helps to know the shape when something
looks wrong. Every path is relative to your server.

| Feed | OPDS 1.2 | OPDS 2.0 |
|---|---|---|
| Root | `/api/opds` | `/api/opds/v2` |
| All series | `/api/opds/series` | `/api/opds/v2/series` |
| One series' issues | `/api/opds/series/:id` | `/api/opds/v2/series/:id` |
| Recently added | `/api/opds/recent` | `/api/opds/v2/recent` |
| Publishers | `/api/opds/publishers` | `/api/opds/v2/publishers` |
| Books | `/api/opds/books` | `/api/opds/v2/books` |
| Reading lists | `/api/opds/lists` | not served |
| Continue reading | `/api/opds/continue` | `/api/opds/v2/continue` |
| Read later | `/api/opds/later` | `/api/opds/v2/later` |
| An issue's file | `/api/opds/issue/:id/file` | same |

List feeds take `?page=N` and serve 50 entries a page. The two roots link to
each other, so a reader that prefers one format can find it from either.

Entries only appear when they can: **Books** needs the Books plugin and the
*Books library* permission, **Reading lists** needs at least one list you can
see, and **Continue reading** and **Read later** need the [Reader](reading)
plugin. Nothing is shown that you cannot then open.

The books branch has shelves of its own — `/books/all`, `/books/recent`,
`/books/authors` and `/books/series` — plus `/books/libraries`, which appears
only if more than one book library actually holds books. *By series* lists only
series with two or more books in them, so standalone titles don't clutter it.

## Search

The catalog advertises OpenSearch, so your reader's **search box** works.

- **Comics search matches series titles only** — not issue titles, writers or
  story arcs. Searching *Saga* finds the series; searching a storyline name
  finds nothing. You get a paginated list of series to drill into.
- **Books search is broader**, covering the book's title, its series and its
  author. While a reader is browsing the books branch its search box switches
  to this automatically.

No search box in your app? Use the Publishers and All series shelves to browse.

## Reading & downloading

- **Download** — every issue offers its file (CBZ/CBR/PDF) as a standard OPDS acquisition link, with its **size** shown up front and a tidy `Series - #012.cbz` filename. Downloads are **resumable** (range requests), so a dropped connection on a large archive picks up where it left off.
- **Covers** — issues carry cover thumbnails from ComicVine even without the Reader plugin.
- **Page streaming (OPDS-PSE)** — when the [Reader](reading) plugin is also installed, issues expose per-page streaming, so apps can read page-by-page without downloading the whole archive first. Covers and thumbnails then come through that pipeline at the size the app asks for. Pages are served as JPEG at one of five widths (200, 400, 800, 1,200 and 1,600 pixels); an app asking for something in between gets the next size up, and one that asks for nothing gets the page untouched. Rendered pages are cached for a day and revalidate cheaply, so re-reading costs little. Streaming is an OPDS 1.2 feature — see the catalog map.
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

For comics, only valid, ComicVine-matched files are served, and the best (tagged) copy of each issue is chosen automatically.

**Books too.** If the [Books](ebooks) plugin is installed and your account can
use it, the catalog gains a books tree of its own — by author, by series, by
library, plus recently added and a search of its own — and EPUBs and PDFs
download the same way comics do.

## What is not in the catalog

- **Audiobooks.** OPDS carries comics and books; the catalog has no audiobook
  tree, and installing the [Audiobooks](audiobooks) plugin does not add one.
  Listen in the browser or in the phone apps instead.
- **Issues you don't own.** They appear inside a reading list so the order
  stays intact, but with no acquisition link — there is nothing to download.
- **Files with no ComicVine match.** Comics are served only once matched, so a
  file sitting in *Import candidates* won't show up until it is linked.

## Troubleshooting

**The app says the credentials are wrong, but they work in the browser.**
Two usual causes. An account that signs in through an identity provider has no
password of its own — generate an **API key** on your Profile and use that.
Otherwise the reader may need the auth challenge older versions didn't send;
update the server.

**The reader reports "forbidden" or refuses to open the catalog.**
The account's role is missing the **OPDS catalog** permission. Every OPDS URL
refuses at once rather than serving a partial catalog, so this is all-or-nothing.
Grant it on the [Users](users) page.

**Comics are there but Books isn't.**
The Books entry appears only when the [Books](ebooks) plugin is installed, the
account holds the **Books library** permission, and at least one book is
visible. Miss any of the three and the entry is simply absent.

**Everything is there but issues won't download.**
Check the URL has the `/api` in it. A reader pointed at `/opds` reaches an
unauthenticated path that never serves files.

**Page streaming isn't offered.**
Streaming needs the [Reader](reading) plugin installed, and it is an OPDS 1.2
feature — a reader on the 2.0 URL downloads whole files instead.

**Progress doesn't come back to the web reader.**
Only streaming syncs progress; a whole-file download cannot report anything.
Confirm the app is streaming rather than downloading, and that **OPDS progress
sync** is on under Settings → Plugins.

**Large libraries load slowly on first open.**
Feeds are paginated at 50 entries, so a reader that insists on walking every
page of *All series* will take a while. Browse by publisher instead.

## Access control

OPDS access is its own grantable permission (**OPDS catalog**), so you can allow or withhold external-app access per role — independent of in-browser reading. Books need the separate **Books library** permission on top.

Series flagged **mature** are hidden from the catalog for roles without *View mature content*, the same rule the web app enforces: they are absent from every list, and their files and pages report themselves as missing rather than refused, so their existence isn't leaked either. See [Users & access](users).

::: warning The per-user mature toggle does not reach OPDS
*Hide mature content* on your Profile is a personal preference for the web app.
It does not filter the OPDS catalog, so a reader app signed in as an account
that holds *View mature content* will still list flagged series. Use the role
permission, not the toggle, where it matters.
:::

Failed sign-ins over OPDS count towards the same lockout as the login page, so a
reader app looping on a stale password will lock that account out for a while.
