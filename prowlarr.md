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

## Managed indexers

While Prowlarr is enabled, the manually entered Newznab/Torznab indexer lists
on the Usenet and Torrents panels are **ignored** — they grey out with a
"managed" note. Turn Prowlarr off to fall back to them.

Search behaviour is otherwise identical to hand-configured indexers: results
merge across every indexer, the strict series-and-number matcher filters them,
and grabs ride your source priority and download clients.
