---
description: "Read your Books library on a Kobo, Kindle or other e-reader running KOReader, with reading progress kept in sync with BackIssue."
---

# KOReader

The **KOReader plugin** puts your Books library on an e-reader. KOReader is the
open-source reading app that runs on Kobo, Kindle, PocketBook, reMarkable and
Android devices; with this plugin it can browse and download your books
directly, and your reading position follows you between the device and the
browser.

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
   `koreader/plugins` in the app's storage.
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

## Browsing and downloading

**Browse library** lists every book, **Recently added** the newest first, and
**Search library** finds books by title, series or author. Tap a book to
download it to the **Download folder** (your KOReader download folder unless
you pick another), and open it straight away if you like. Hold a book for its
details: author, series, format, size and how far you have read it. Books
already on the device say *on device*.

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
| KOReader and the web reader | By percentage, within a page or so |

The web reader, Home's **Continue reading** and your reading stats all see
what you read on the device.

### Which book is which

A book downloaded through the plugin remembers which BackIssue book it is. A
book that got onto the device another way, over the [OPDS catalog](opds) or by
copying the file, is recognised by a fingerprint of its first and last 64 KiB,
which the server computes for every book file after a scan. The same file has
to be in your library; a different edition or a re-converted copy is a
different book to the plugin.

The fingerprinting runs as the **Fingerprint book files for KOReader** job on
the **Jobs** page, every six hours by default and shortly after the plugin
loads.

## Access control

The device signs in with your personal **API key**, so it sees exactly what you
see: the `koreader.use` permission (granted to the viewer tier) covers browsing,
downloading and syncing, and restricted books stay hidden from roles without
access to them and from accounts with mature content switched off.

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
