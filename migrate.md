# Migration Assistant

The **Migration Assistant plugin** imports an existing collection from another
collection manager — **Mylar3** or **Kapowarr** — by reading its database. Both
apps store ComicVine volume ids, so every series maps **exactly**: no fuzzy
matching, no wrong-volume surprises.

Admins get a **Migrate** entry in the sidebar's System area.

## Migrating

1. **Pick the source database** — upload `mylar.db` (Mylar3) or `Kapowarr.db`
   (Kapowarr), or point at a path the server can read (e.g. a folder mounted
   into the container). Upload a copy, or stop the other app first.
2. **Preview** — the parsed series list, with anything already in your library
   marked and deselected. Optionally pick a target [library](library).
3. **Import** — each series is added through the normal ComicVine path with
   live progress. Monitored/paused state carries over.

Afterwards run **System → Tools → Scan entire library** so your files on disk
attach to the imported series.

## Safety

- **Nothing is downloaded automatically** — migrating hundreds of series never
  queues a single grab. Review your library first, then fetch what's missing.
- **Re-running is safe** — already-imported series are skipped. If the import
  halts on a ComicVine rate limit, run it again later and it continues.
- Your files on disk are never touched; the migration only creates series
  entries and tracking state.
