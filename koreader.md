---
description: "Read your Books library on a Kobo, Kindle or other e-reader running KOReader, with reading position, finished status, highlights and reading time kept in sync with BackIssue."
---

# KOReader

The **KOReader plugin** puts your Books library on an e-reader. KOReader is the
open-source reading app that runs on Kobo, Kindle, PocketBook, reMarkable and
Android devices; with this plugin it can browse and download your books
directly, and your reading follows you between the device, the browser and
the apps: where you are, what you have finished, what you highlighted, and how
long you read.

It comes in two halves:

- a **BackIssue plugin**, installed from **Sidebar → Plugins**, which adds a
  **KOReader** card to everyone's Profile page;
- a **KOReader plugin** for the device, downloaded from that card. The copy you
  download already knows your server's address.

A [Books library](ebooks) is needed; the plugin has nothing to offer without
one.

## Setting up the device

1. On your **Profile** page in BackIssue, under **KOReader**, press
   **Download the KOReader plugin**.
2. Unzip it and copy the `backissue.koplugin` folder into KOReader's
   `plugins` folder on the device, next to the other `.koplugin` folders.
   Over USB on a Kobo that is `.adds/koreader/plugins`; on Android it is
   `Internal storage/koreader/plugins` (create `plugins` if it is not there).
3. Restart KOReader. Open the top menu, then **Tools → BackIssue**.
4. The server address is already filled in. Press **API key** and paste a
   personal key from the **API key** card on your Profile page (generate one
   there if you have none).
5. **Test connection** confirms the device can reach the server as you.

KOReader shows the plugin's own strings in English whatever language the
device is set to.

::: tip
If the device reaches your server through a different address than your
browser does (a local hostname at home, say), change it under **Server** in
the same menu.
:::

### Keeping the plugin up to date

**Check for plugin update** in the same menu asks the server which version it
hands out and, when it is newer than the device's, installs it in place.
Restart KOReader to finish. **Test connection** mentions a newer version too,
and the Profile page marks a device whose plugin is behind.

## The dashboard

**Tools → BackIssue → Dashboard** is the library with its covers on: a row
of the books you have under way, a row of the newest, and buttons for **All
books**, **Authors**, **Series**, **On this device**, **Finished** and **Sync
all books**. The search icon in the title bar finds books by title, series
or author.

Every list is a grid of covers, paged with the arrows at the bottom or a
swipe. Tap a cover for the book's page: cover, author, series, format and
size, how far you have read it, its description, and buttons to **Read** it
if it is on the device or **Download** it if not, to **Mark finished** (or
unread), and to close. A long press on a cover downloads it at once.

Covers are fetched from the server the first time they are shown, scaled to
the screen and kept in KOReader's cache folder, so a page you have seen
before draws straight away.

## Browsing and downloading

The same lists are in the menu directly: **Browse library** for every book,
**Continue reading** for the ones under way (most recently read first),
**Recently added** for the newest, **Authors** and **Series** to group them,
and **Search library**. Downloads go to the **Download folder** (your
KOReader download folder unless you pick another) and can be opened straight
away. Books already on the device say *on device*; finished ones say
*finished*.

Books your server fetches on demand from a catalog download the same way;
the first download takes as long as the server needs to fetch the file.

## Reading progress

With **Automatic sync** on (the default):

- when a book opens, the newest position from anywhere comes back. A position
  further along than the device's is followed straight away, with a small
  notice saying where it came from; a position behind asks first, so a device
  that went back to re-read a chapter is not dragged along;
- as you read, the device's position is pushed to the server shortly after
  you stop turning pages, and again when the book closes or the device goes
  to sleep.

**Pull progress from server** and **Push progress to server** do the same by
hand, for one book.

How exact the shared position is depends on where it comes from:

| Between | Position |
|---|---|
| Two KOReader devices | Exact: the same paragraph in an EPUB, the same page in a PDF |
| KOReader and the web reader or the apps | By percentage, within a page or so |

The web reader, Home's **Continue reading** and your reading stats all see
what you read on the device, and the web reader says which device it is
resuming from.

**Finished** travels both ways. A book marked *complete* in KOReader's book
status is finished in BackIssue; a book finished in BackIssue is marked
complete on the device the next time it opens there.

## Highlights and notes

With **Sync highlights and notes** on (the default), highlights you make on
the device are uploaded when the book opens, closes, or the device sleeps,
and appear in the web reader's bookmarks drawer and the apps' Highlights page
with their passage, colour and note. From there:

- a note you add or change in BackIssue follows back to the device;
- a highlight you delete in BackIssue, or on another KOReader device, is
  removed from the device;
- a highlight made on another KOReader device is placed at its exact spot in
  an EPUB.

**Sync highlights of this book** does it by hand for the open book. Two limits
to know: a highlight made in the web reader or an app has no KOReader
position, so it stays there; and highlights from another KOReader device are
placed in EPUBs, not PDFs.

## Reading time

With **Sync reading statistics** on (the default), KOReader's own page-reading
statistics are uploaded shortly after a book closes. The **KOReader** card on
your Profile page shows reading time for the last week and all time, grouped
into sittings (a gap of more than half an hour starts a new one), and the
books it went into.

## Sync all books

**Sync all books** walks KOReader's reading history and syncs every book the
server knows, including books read before the plugin was installed or copied
over by hand: the position (unless the server already has a newer one), the
finished status, highlights and reading time. It reports what it did, and how
many books it could not match.

### Which book is which

A book downloaded through the plugin remembers which BackIssue book it is. A
book that got onto the device another way, over the [OPDS catalog](opds) or by
copying the file, is recognised by a fingerprint of its first and last 64 KiB,
which the server computes for every book file after a scan. The same file has
to be in your library; a different edition or a re-converted copy is a
different book to the plugin.

The fingerprinting runs as the **Fingerprint book files for KOReader** job on
the **Jobs** page, every six hours by default and shortly after the plugin
loads. When the server's copy of a book changes after a device last synced it
(a re-download, a replaced file), the device says so the next time the book
opens.

## Devices on your Profile page

The **KOReader** card lists every device that has synced with your account:
its name (set under **This device** on the e-reader), its plugin version and
whether it is up to date, when it was last seen, what it read last, and how
many books, highlights and reading events it has sent. **Forget** drops a
device from the list; it comes back the next time that device syncs.

## Access control

The device signs in with your personal **API key**, so it sees exactly what you
see: the `koreader.use` permission (granted to the viewer tier) covers browsing,
downloading and syncing, and restricted books stay hidden from roles without
access to them and from accounts with mature content switched off. Revoking
the key disconnects the device at once.

## Troubleshooting

- **"The server refused the API key"**: the key was revoked or mistyped.
  Generate a new one on your Profile page and paste it again.
- **"This book is not in your BackIssue library"** on a book you know is
  there: the file on the device is not byte-for-byte the file in the library.
  Download it through the plugin once, and it is matched from then on.
- **Nothing happens on Wi-Fi off**: syncing waits for a connection. KOReader's
  own Wi-Fi settings decide whether it connects for you.
- **The download folder is wrong**: set it under **Tools → BackIssue →
  Download folder**; the default is KOReader's download folder.
- **No reading time shows up**: it is uploaded a few seconds after a book
  closes, once KOReader has written its statistics; make sure KOReader's
  **Reading statistics** plugin is on.
- **"BackIssue ran into an error"**: the plugin caught a fault and wrote the
  details to `backissue_crash.log` in KOReader's folder. Send that file along
  when you report it.
