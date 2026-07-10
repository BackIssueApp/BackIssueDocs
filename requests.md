# Requests

The **Requests plugin** adds a request-and-approve workflow: household members ask for volumes, and whoever curates the library approves or declines them. It turns "can you add this?" into a tidy queue instead of a chat message.

## Filing a request

Anyone with the **Request volumes** permission (viewers, by default) sees a **📥 Requests** entry in the sidebar.

- **Find & request** — search ComicVine and file a request for a volume, optionally with a note ("which printing?"). Results show up front whether a volume is already in the library or already requested, so nobody files duplicates.
- **Duplicates become votes** — requesting something already pending *seconds* the existing request instead of creating a copy. Every request shows a vote count, and anyone can add or remove their vote to signal demand.
- **Withdraw** your own pending request any time.

## Reviewing requests

Users with the **Manage requests** permission (trusted and admin, by default) get a pending-count badge on the Requests entry and can, per request:

- **Approve** — adds the volume to the library.
- **Approve + download** — adds it *and* queues every missing issue.
- **Decline** — with a reason, shown back to the requester.

Approved requests show live **on-disk progress** (how many issues have arrived) and flip to **available** once complete. Filters let you view pending, approved, declined, or just your own.

## Auto-approve

Admins can turn on **auto-approve** (Settings): every request is added to the library instantly, no review step — turning the queue into a self-serve "add it now" for trusted groups.

## Permissions & fairness

Requests are gated by two grantable permissions — **Request volumes** and **Manage requests** — so you can, for example, let a role request but not approve, or vice versa. See [Users & access](users).

Crucially, downloads triggered by an approval run under the **acting user's own download permission**. A curator who can approve but isn't allowed to download can add the volume, but the download button only appears for those who may download — approving never escalates anyone's rights.

## Notifications

Request activity flows into the [notification centre](automation#notifications): reviewers are told when a new request is filed, and requesters are told when theirs is approved or declined. With the [Notifications Hub](notifications) plugin, those can reach Discord, Telegram, or your phone too.
