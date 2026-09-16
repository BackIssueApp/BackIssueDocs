---
description: "What BackIssue stores, what leaves your server, and what the companion apps and hosted metadata service can see."
---

# Privacy Policy

_Last updated: 15 September 2026_

BackIssue is **self-hosted** software. You run the server; the BackIssue apps
(iOS, Android, and web) connect to the server **you** configure. This policy
covers both — what those apps do with your information, and the few things
your own server sends out on your behalf.

## The short version

**Your library stays with you.** There are no analytics, no tracking, no
advertising, and no third-party SDKs. Nothing reports what you own, what you
read, or who you are. The apps talk only to the server address you enter.

Your server does reach out in three places, and each has its own section
below: it **looks up metadata** for the comics and books you search for, it
can **share panel layouts** with a community cache, and it can **send a
support package** when you ask it to. None of the three carries your files,
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

The apps talk only to the server(s) you configure — to sign in, load your
library, sync reading progress, request or download issues, and show
notifications. That server is operated by you (or whoever runs your instance),
and its handling of data is governed by that operator, not by us.

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

**If you'd rather not use it.** In **Settings → Metadata**, set **Source** to
**ComicVine directly** and paste your own ComicVine API key: the same lookups
then go to ComicVine under their policy, and the BackIssue service is not
contacted at all. See the [settings reference](settings-reference).

## The community panel cache

[Guided panel reading](guided-reading) needs to know where the panels are on
each page. Detection runs on your server, but because a page that some other
server has already worked out is wasted effort, servers can share their
results through a community cache. **It is on by default.**

What leaves your server is a **panel layout** — the rectangles, in reading
order — and a **hash** of the page's image bytes. A hash is a short fingerprint
calculated from the bytes: it cannot be turned back into the image, and it
matches only a byte-for-byte identical page. The image itself never leaves,
and neither does the filename, the series, the issue, or anything about who
was reading it.

To opt out, turn off **Share panel layouts with the community cache** in
**Settings → Library**. Detection then runs entirely on your own server and
nothing is sent or requested.

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
