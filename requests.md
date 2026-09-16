# Requests

The **Requests plugin** adds a request-and-approve workflow: household members ask for volumes, and whoever curates the library approves or declines them. It turns "can you add this?" into a tidy queue instead of a chat message.

## Filing a request

Anyone with the **Request volumes** permission (viewers, by default) sees a **📥 Requests** entry in the sidebar.

- **Find & request** — search ComicVine and file a request for a volume, optionally with a note ("which printing?"). Results show up front whether a volume is already in the library or already requested, so nobody files duplicates.
- **Duplicates become votes** — requesting something already pending *seconds* the existing request instead of creating a copy. Every request shows a vote count, and anyone can add or remove their vote to signal demand.
- **Withdraw** your own pending request any time.

## Books and audiobooks

With the [Books](ebooks) or [Audiobooks](audiobooks) plugin installed and a
library of that type set up, **Find & request** gains a **Comics / Books /
Audiobooks** switch. Books and audiobooks are searched by title or author
against the metadata service, and the results say straight away whether the
title is already on the shelf or already requested. Requests, votes, notes
and withdrawal work exactly as they do for comics; the queue marks each
request with its kind.

Approving a book asks your **download sources** for it, the same way an issue
is fetched: usenet and torrent search the book and audiobook categories, and
a [site source](plugin-api#sources-from-a-site-description) takes part when it
declares that it carries books or audiobooks (asked by ISBN first, when the
catalog knows one, so the exact edition wins). The best release is grabbed and,
when the download finishes, the Books or Audiobooks plugin files it into the
library (Author/Title) and catalogs it — the queue row shows which source is
downloading it, or why the download failed. On-demand catalogs are not
consulted: what they carry is on the shelf already.

When no source has it yet, the request stays *approved* and the **Fill
approved book requests** job (System → Jobs) keeps asking; a book that later
arrives by scan or import and matches the title and author counts too. Either
way the requester is notified when it lands. Book downloads need app 0.8.4 or
later — on an older app, approving a book says so.

## Reviewing requests

Users with the **Manage requests** permission (trusted and admin, by default) get a pending-count badge on the Requests entry and can, per request:

- **Approve** — adds the volume to the library and **picks** every missing issue for the requester, so automation keeps after them whatever the series' [monitoring policy](collection#monitoring), and the requester is notified as each one lands.
- **Approve + download** — the same, *and* queues every missing issue right away.
- **Decline** — with a reason, shown back to the requester.

Approved requests show live **on-disk progress** (how many issues have arrived) and flip to **available** once complete. Filters let you view pending, approved, declined, or just your own.

## Auto-approve

Admins can turn on **auto-approve** (Settings): every request is added to the library instantly, no review step — turning the queue into a self-serve "add it now" for trusted groups.

## Limiting what can be requested

Two settings narrow what shows up in request search (and are re-checked when a request is filed, so nothing slips through a crafted request):

- **Western comics only** — restricts results to Western (US/UK) publishers via an allowlist; manga and foreign-language titles are hidden.
- **No collections** — hides collected editions (trade paperbacks, hardcovers, omnibuses, "Complete" collections, and the like) so only single-issue series can be requested. ComicVine has no "format" field, so this is detected from each volume's title and description — it catches the large majority of collections but isn't perfect.

## Permissions & fairness

Requests are gated by two grantable permissions — **Request volumes** and **Manage requests** — so you can, for example, let a role request but not approve, or vice versa. See [Users & access](users).

Crucially, downloads triggered by an approval run under the **acting user's own download permission**. A curator who can approve but isn't allowed to download can add the volume, but the download button only appears for those who may download — approving never escalates anyone's rights.

## Notifications

Request activity flows into the [notification centre](automation#notifications): reviewers are told when a new request is filed, and requesters are told when theirs is approved or declined. With the [Notifications Hub](notifications) plugin, those can reach Discord, Telegram, or your phone too.
