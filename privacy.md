---
description: "What BackIssue stores, what leaves your server, and what the companion apps and hosted metadata service can see."
---

# Privacy Policy

_Last updated: 18 October 2026_

BackIssue is **self-hosted** software. You run the server; the BackIssue apps
(iOS, Android, and web) connect to the server **you** configure. This policy
covers both — what those apps do with your information, and the few things
your own server sends out on your behalf.

## The short version

**Your library stays with you.** There are no analytics, no tracking, no
advertising, and no third-party SDKs. Nothing reports what you own, what you
read, or who you are. The iOS and web apps talk only to the server address
you enter; the Android app also checks BackIssue's download site for its own
updates.

Your server does reach out, and each case has its own section below: it
**looks up metadata** for the comics, manga, books and audiobooks you search
for, it **fetches the weekly release list** and, when you browse for plugins,
download sites or community reading lists, **their catalogs**, it can **share
panel layouts** with a community cache and **download the panel-detection
model**, and it can **send a support package** when you ask it to. It also
talks to the services you set up yourself. None of these carries your files,
your library listing, your reading history, or your account details.

## What we collect

No account, no profile, no usage data. We run no service that receives your
library, and the apps contain no analytics or tracking of any kind. What the
services below do receive — a search term, a page fingerprint, a diagnostic
bundle you chose to send — is set out in full where each is described.

## Information stored on your device

The mobile apps keep the following on your device only:

- **Server address and sign-in token.** When you sign in, your password is
  exchanged for a session token (or you provide an API key). The address and
  token are stored in the device's secure Keychain/keystore. **Your password is
  never stored.**
- **Preferences and reading progress cache**, such as reader settings and the
  last page you viewed.
- **Downloaded issues**, if you choose to save any for offline reading.

Signing out removes the stored credentials for that server; deleting the app
removes everything the app has stored.

## Information sent to your server

Apart from the Android app's update check (below), the apps talk only to the
server(s) you configure — to sign in, load your
library, sync reading progress, request or download issues, and show
notifications. That server is operated by you (or whoever runs your instance),
and its handling of data is governed by that operator, not by us.

## App updates (Android)

The Android app is installed outside an app store, so it updates itself. When
it starts — at most once every six hours — it fetches a small file from
`static.backissue.app` that names the newest build, and **Check for updates**
in its settings fetches the same file whenever you tap it. The request carries
no account, server address, library details or app version; the download host
sees only your device's IP address. If a newer build exists the app offers it,
and the new APK is downloaded from that host only when you tap **Download &
install**. There is no setting to turn the automatic check off.

The iOS app makes no such check: it is updated through Apple's TestFlight,
under Apple's own policies.

## Metadata lookups

Series, issue and book details come from the **BackIssue metadata service**,
which is the default so that a new install works without anyone signing up for
an API key. **Your server** calls it — the apps never do — and what travels is
the lookup and nothing else:

- the text you typed into a search box, or the identifier of a series, issue,
  book or audiobook your server already holds;
- a key your install creates for itself the first time it needs one, which
  identifies the install rather than any person;
- the version of the build making the call.

What does not travel: your filenames or folder paths, the list of what you
own, your reading history, your account names or e-mail addresses, or which of
your users prompted a lookup. Lookups are not built into a profile of your
library.

Cover art is fetched from whatever address the metadata gives for it, by the
device showing it — the web app asks for those images with no referrer, so the
image host is not told which page wanted one.

**If you'd rather not use it.** What you can switch depends on the kind of
media:

- **Comics and manga.** In **Settings → Metadata**, turn the built-in service
  off and turn on **ComicVine directly** with your own ComicVine API key,
  **Metron directly** with your own Metron account, or a plugin source such as
  the [French editions](bnf) catalogue. Comic lookups then go to those
  databases under their own policies. A library can also choose its own
  sources under **Settings → Library**, so you can do this for some libraries
  and not others. Manga is the exception: it comes only through the built-in
  service, so a manga series cannot be looked up or refreshed while the
  service is off.
- **Books and audiobooks.** The [Books](ebooks) and [Audiobooks](audiobooks)
  plugins always use the BackIssue service for their metadata, whatever the
  Metadata setting says. To stop those lookups, disable or uninstall the
  plugins on the **Plugins** page.

The other things below also reach the BackIssue service on their own terms,
so turning the built-in metadata service off does not, by itself, mean your
server never contacts it. See the [settings reference](settings-reference).

## Release list and catalogs

- **This week's releases.** The release check fetches the list of new comics
  for a week, and for the week after. Each request names only the week and
  year — not even the app version; nothing about your library is sent, and matching
  the list against your collection happens on your server. It runs on the
  **Check this week's releases** schedule in **System → Jobs** and when someone
  checks for releases on the **Releases** page. Turn the schedule off and leave
  that page alone to stop it, or point **Release provider URL** in **Settings →
  Metadata** at another service.
- **Plugin and download-site catalogs.** When you open the catalog on the
  **Plugins** page or browse download sites to install, your server downloads
  the list of what is available, and the files of anything you choose to
  install. These requests carry nothing about your install, not even the app
  version. Nothing is fetched unless you open those screens or install
  something. Installing or updating a plugin that needs extra packages runs
  `npm install` on your server, which downloads those packages from the npm
  registry under npm's own policies.
- **Community reading lists.** When someone opens the **CBL** panel on the
  **Lists** page, your server fetches the index of the community reading-list
  collection (`DieselTech/CBL-ReadingLists`) from GitHub's API, and keeps it
  for six hours. Previewing or importing one of those lists downloads that
  list's file from `raw.githubusercontent.com`. The requests name only the
  collection and the list — nothing about your library is sent, and matching a
  list against your collection happens on your server. GitHub sees your
  server's IP address, under GitHub's own policies; if the `GITHUB_TOKEN`
  environment variable is set, the index request also sends that token, so
  GitHub can tie it to the token's account. Leave the panel closed and GitHub
  is never contacted; a `.cbl` file you upload yourself does not go to GitHub.

## The community panel cache

[Guided panel reading](guided-reading) needs to know where the panels are on
each page. Detection runs on your server, but because a page that some other
server has already worked out is wasted effort, servers can share their
results through a community cache. **It is on by default.**

What leaves your server is a **panel layout** — the rectangles, in reading
order — and two fingerprints of each page. One is a **hash** of the page's
image bytes, which matches only a byte-for-byte identical page. The other is a
**visual hash**: 256 bits recording which neighbouring squares of a tiny
grey-scale copy of the page are lighter, meant to recognise the same page after
it has been re-encoded or resized. Neither can be turned back into the image.
The image itself never leaves, and neither does the filename, the series, the
issue, or anything about who was reading it.

With sharing on, this is what happens and when:

- The first time your server has something to contribute, it registers once
  with the cache and receives an anonymous key, which it keeps and sends with
  every contribution and vote.
- When the reader first needs an issue's panel layout (or again after the
  detector changes), your server sends the byte hash of every page to look
  them up, then contributes the layouts its ML detector worked out — with both
  hashes — for pages the cache did not have. Layouts from the built-in
  detector are not shared.
- When someone corrects a page's panels by hand, that layout is contributed
  too, with both hashes.
- Confirming or rejecting a community layout in the reader sends that page's
  byte hash and the vote.

To opt out, turn off **Share panel layouts with the community cache** in
**Settings → Library**. Your server then sends nothing to the cache and
requests nothing from it — no registration, lookups, contributions or votes —
and detection runs entirely on your own server. This switch does not cover the
panel-detection model download below.

## The panel-detection model

With the [Reader](guided-reading) plugin installed, the ML panel detector needs
a model file too large to ship with the plugin. Each time your server starts
with **Use the ML panel detector for guided view (off = built-in detection)**
on (it is by default), it fetches a small file from `static.backissue.app`
describing the current model. If the model is missing, or one it downloaded
earlier is out of date, it then downloads the new one from the address that
file gives — up to about 400 MB. These requests carry no key, no app version
and nothing about your library. A model file you placed in the default
location yourself is never replaced.

To stop it, turn that setting off in **Settings → Library** — the check is
skipped from the next start — or set the `readerPanelModel` setting to the
path of a model file of your own, which turns the automatic download off
entirely.

## Services you set up

Your server also connects to whatever you point it at: indexers, download
clients and download sites, FlareSolverr, notification channels such as
Discord, Telegram, Pushover, ntfy or a webhook, and a [single sign-on](users#signing-in-with-an-identity-provider-sso) identity
provider. Those connections exist only because you configured them; each
service receives what it needs to do its job — a search, a download, a
notification's text, a sign-in — and handles it under its own policy, not
ours.

## Support packages

When you ask for help, BackIssue can build a **support package** — a zip of
version and host details, your settings with every key, password and token
replaced by `[redacted N chars]`, what plugins and libraries you have, recent
jobs and downloads, and the tail of the application log with secrets inside
URLs blanked. It contains no comic files, no covers, no user names, no e-mail
addresses and no password hashes. [Troubleshooting](troubleshooting#getting-help)
lists exactly what goes in.

Nothing is sent unless you press the button:

- **Download support package** writes the zip to your computer, and you decide
  where it goes.
- **Send to BackIssue support** uploads that same zip to us and shows you a
  short code to quote in your report, along with an optional note you type. A
  package can only be opened by the BackIssue team, and is **deleted after 60
  days**.
- **Send diagnostics** in the mobile apps (Settings → Support) sends the app's
  own report — device, app build, the server it talks to, and recent
  connection failures — through your server, which answers with the same kind
  of code. It travels with the account id and role of whoever sent it, so a
  reply can make sense of the report; admins send the server's full package,
  everyone else a lite one with versions and counts only.

## Camera

The mobile apps can scan a pairing QR code to add a server. The camera image is
processed on your device to read the code and is never stored or transmitted.

## Local network

The apps may connect to a server on your local network, because self-hosted
servers often run on a home LAN. This access is used solely to reach the server
address you enter — for nothing else.

## Children

BackIssue is not directed at children.

## Changes to this policy

We may update this policy from time to time. The date at the top reflects the
most recent revision.

## Contact

Questions about privacy? Reach us on [Discord](https://discord.gg/T6GTgzz8t2) or
via [GitHub](https://github.com/BackIssueApp).
