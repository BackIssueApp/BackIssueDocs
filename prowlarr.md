# Prowlarr indexers

The **Prowlarr plugin** feeds BackIssue's built-in Usenet and Torrent sources
with the indexers your [Prowlarr](https://prowlarr.com) instance manages —
configure Prowlarr once instead of listing each indexer by hand. Its usenet
indexers feed the **Usenet** source; its torrent indexers feed **Torrents**.

Prowlarr only **finds** releases. The actual download still goes through your
download client (SABnzbd/NZBGet and/or qBittorrent), so enable Usenet and/or
Torrents with a client as usual — see [Download sources](sources).

## Setup

Install the plugin from **Sidebar → Plugins**, then enable it in
**Settings → Sources → Prowlarr**:

- **Prowlarr URL** — e.g. `http://prowlarr:9696`.
- **API key** — in Prowlarr under **Settings → General → Security**.
- **Indexers** — press **Load** to list your Prowlarr indexers, then tick the
  ones BackIssue should search. All are used by default, and an indexer you
  later add in Prowlarr is picked up automatically.

**Test connection** confirms reachability and reports how many usenet/torrent
indexers are enabled.

## Settings

| Setting | What it does |
|---|---|
| Prowlarr | Master switch. While it's on (with a URL and key), Prowlarr owns the indexer list. |
| Prowlarr URL | Your Prowlarr base URL, e.g. `http://prowlarr:9696`. Not an indexer's feed URL — the base. |
| API key | From Prowlarr's **Settings → General → Security**. Used both to list indexers and to search them. |
| Categories | The Newznab/Torznab category ids every search is limited to: `7000` (Books) and `7030` (Comics). Prowlarr fronts general-purpose indexers, so an unscoped search drowns comics in films and TV that happen to match a series title. It applies to torrent indexers as well, which BackIssue would otherwise search uncategorised. |
| Indexers | The per-indexer picker. Only indexers **enabled in Prowlarr** are listed; unticking one excludes it, and the change applies to the very next search. |

::: warning The Categories field doesn't stick yet
The category filter is currently fixed at `7000,7030` — the field is in the UI,
but the value isn't saved, so searches always use those two categories.
:::

The indexer list itself is cached for five minutes so a burst of per-issue
searches doesn't hammer Prowlarr. Your ticks are applied *after* that cache, so
changing the selection never means waiting for it to expire.

## Managed indexers

While Prowlarr is enabled, the manually entered Newznab/Torznab indexer lists
on the Usenet and Torrents panels are **ignored** — they grey out with a
"managed" note. Turn Prowlarr off to fall back to them.

Search behaviour is otherwise identical to hand-configured indexers: results
merge across every indexer, the strict series-and-number matcher filters them,
and grabs ride your source priority and download clients.

## Priority: whose ordering wins

Prowlarr's own **per-indexer priority** is not used. BackIssue asks Prowlarr for
its indexer list and searches every one you've ticked; nothing in that list's
order or priority field survives the trip. So don't expect a priority-1 indexer
in Prowlarr to be preferred here.

What actually decides what you get:

1. **[Source priority](sources#source-priority)** picks the *source* — Usenet
   before Torrents, or whatever order you dragged them into. Prowlarr isn't a
   source of its own; it only supplies indexers to those two.
2. Within a source, every selected indexer is searched and the results pooled
   and de-duplicated.
3. The pooled releases are ranked by **how well they match** the series and
   issue number, and larger files win ties.

If you want one indexer preferred over another, the lever is the tick box, not
Prowlarr's priority: untick the ones you'd rather not pull from.

## Troubleshooting

- **Test says "Unauthorized"** — the API key is wrong. Copy it again from
  Prowlarr's **Settings → General → Security**.
- **"Response was not JSON" or an HTTP error** — the URL isn't Prowlarr's base
  URL. No trailing path, no indexer feed URL; just scheme, host and port. From
  a container, `localhost` means the container itself — use the service name or
  the host's LAN address.
- **"Connected, but Prowlarr has no enabled indexers yet"** — the connection is
  fine and Prowlarr genuinely has nothing enabled. Add indexers there first.
- **Prowlarr unreachable** — BackIssue falls back to the last indexer list it
  fetched, so searches carry on against a list that may be out of date; after a
  restart it has no list at all and the source quietly finds nothing. Either way
  the giveaway is `prowlarr: indexer list failed` in **System → Logs**.
- **An indexer that returns nothing for comics** — most likely it doesn't file
  comics under categories 7000/7030 (common on torrent trackers, which tag them
  inconsistently), or doesn't carry comics at all. Search the same series in
  Prowlarr's own search, restricted to those categories: if Prowlarr finds
  nothing either, untick the indexer here.
- **Everything else** lands in **System → Logs** alongside the rest of the
  download pipeline — searches, grabs and the reason a release was rejected.
