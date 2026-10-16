---
description: "Use the French national library's catalogue as the metadata source for French-language comics: albums, numbering, ISBNs, publishers, release dates and credits, with no account."
---

# French editions (BnF)

The **French editions plugin** turns the catalogue of the Bibliothèque
nationale de France into a metadata source. The catalogue lists nearly every
book published in France through legal deposit, so a French series or a
translated run that is missing or thin in the built-in service is usually
complete here. It needs no account and no key.

## Setup

Install the plugin from **Sidebar → Plugins**, then open **Settings →
Metadata** and set **Source** to the French editions provider. **Test source**
confirms the catalogue answers. Save, and from then on every lookup BackIssue
makes goes to the catalogue: searching for and adding a series, refreshing it,
matching files on a scan, writing tags and importing reading lists. The
built-in service is not contacted while this source is selected.

Switch the source back whenever you like. Series added through this provider
keep everything they have and refresh again the next time it is selected; see
[Metadata](settings-reference#metadata) for how sources coexist.

## What you get

- **Series** are the catalogue's set records: one per series, with the title,
  publisher and the year it began. A series still running shows as ongoing.
- **Issues** are the albums linked to that set, numbered by tome. Each album
  carries its ISBN and EAN, cover price, page count, writer and artist credits,
  and the legal deposit date as its release date. A summary and a cover appear
  when the catalogue holds them.
- **Reprints** of a tome fold into its first printing, so a series lists each
  tome once.
- A **one-shot** album with no set is a series of one.
- Searching an **ISBN or EAN** finds the album's series directly.

Add a series the usual way: search for its title, pick the right set (the
publisher and start year tell editions apart), and add it. Files named with
the tome number match on the next scan.

## What the catalogue does not have

- Character lists, teams and story arcs, so those stay empty for albums added
  this way and are left out of the tags written to files.
- Summaries for most albums, and covers for older ones. The cover slot falls
  back to the placeholder.
- Anything for Discover, which keeps needing the built-in service or
  ComicVine.
- Monthly dates: the release date is the day the album entered the catalogue,
  which is within weeks of publication for anything recent; an album catalogued
  long after it came out shows only its year.

## Data and privacy

Catalogue data is published under the French government's open licence
(Licence Ouverte). Lookups go from your server to `catalogue.bnf.fr` carrying
only the search text or the record being fetched. Covers are fetched by the
device showing them, with no referrer. See the [privacy policy](privacy).
