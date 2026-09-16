---
description: "Bring an existing Mylar3 or Kapowarr collection across, matched by ComicVine volume id so nothing is lost in translation."
---

# Migration Assistant

The **Migration Assistant plugin** imports an existing collection from another
collection manager — **Mylar3** or **Kapowarr** — by reading its database. Both
apps store ComicVine volume ids, so every series maps **exactly**: no fuzzy
matching, no wrong-volume surprises.

Admins get a **Migrate** entry in the sidebar's System area.

::: tip It imports the collection list, not your files
The migration recreates your *series* — what you were tracking, and whether you
were tracking it. Your comics on disk are found afterwards by the normal scan,
exactly as described in [Your library on disk](library).
:::

## Migrating

1. **Pick the source database** — upload `mylar.db` (Mylar3) or `Kapowarr.db`
   (Kapowarr), or point at a path the server can read (e.g. a folder mounted
   into the container). Upload a copy, or stop the other app first.
2. **Preview** — the parsed series list, with anything already in your library
   marked and deselected. Optionally pick a target [library](library).
3. **Import** — each series is added through the normal ComicVine path with
   live progress. Monitored/paused state carries over.

## Finding the source database

| App | File | Where it usually lives |
|---|---|---|
| **Mylar3** | `mylar.db` | Mylar's data folder, beside `config.ini`. In the common Docker images that folder is the `/config` volume, so `/config/mylar.db`. |
| **Kapowarr** | `Kapowarr.db` | Kapowarr's database folder. In Docker that's the volume mounted at `/app/db`, so `/app/db/Kapowarr.db`. |

The file is recognised by its **tables**, not its name — a Mylar3 database is
the one with a `comics` table carrying a `ComicID` column, Kapowarr's has a
`volumes` table with `comicvine_id` — so a copy you renamed still works. The
upload accepts `.db`, `.sqlite` and `.sqlite3`, up to 512 MB; the uploaded copy
is deleted as soon as the import finishes.

If the other app runs on the same host, the tidiest route is a **read-only bind
mount** so BackIssue can read the database in place and can never write to it:

```yaml
services:
  backissue:
    volumes:
      - /srv/mylar3/config:/import:ro
```

Then enter `/import/mylar.db` in the path box. The database is only ever opened
read-only, but a database still being written to is a moving target — **stop the
other app first**, or copy the file somewhere and upload the copy.

## What carries over

**Brought across:**

- **The series itself**, by its ComicVine volume id — an exact match, never a
  guess. Title and year are shown in the preview so you can recognise rows.
- **Monitored or paused**, as a [monitoring policy](collection#monitoring): a
  monitored series arrives set to **All issues**, a paused one to **Off**.
- **The library you choose** in the preview (or your default one).

**Left behind — these have no equivalent in the source database, or aren't read
at all:**

- **Reading history and progress.** A migrated collection starts unread.
- **Custom folder names and paths.** The source's folder is read for the
  preview only and never applied; your files are found by scanning your own
  [library folders](library#storage-locations).
- **Download history, queues, blocklists and failed grabs.**
- **Aliases and alternate search names** — add any you need per series.
- **Per-series settings** such as format, quality or provider preferences.
- **Issue-level state.** What you own comes from the scan; picks and skips
  start empty.

Two more details worth knowing: rows with no ComicVine id (a series the other
app never matched) are **skipped** — there's nothing exact to map them to — and
duplicate rows for the same volume collapse into one, preferring a monitored
copy.

## After the import

1. **Scan** — run **System → Tools → Scan entire library** so your files on
   disk attach to the imported series.
2. **Mop up** — anything the scan couldn't place goes through **Sidebar →
   Import**, which matches folders and `ComicInfo.xml` tags; the Library's
   **Unmatched** and **Incomplete** filters show what's still outstanding.
3. **Set monitoring** — paused series arrive **Off**. Use the Library's bulk bar
   to set the policy you actually want, then look at the
   [Wanted page](downloads#the-wanted-page) before anything is fetched.

## Safety

- **Nothing is downloaded automatically** — migrating hundreds of series never
  queues a single grab. Review your library first, then fetch what's missing.
- **Re-running is safe** — already-imported series are skipped. If the import
  halts on a ComicVine rate limit, run it again later and it continues.
- Your files on disk are never touched; the migration only creates series
  entries and tracking state.
