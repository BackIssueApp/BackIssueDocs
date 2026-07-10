# Notifications

BackIssue records every notable event — imports, download failures, new
releases, request activity — in the in-app **notification centre** (the 🔔
bell). The **Notifications Hub** plugin sends those same events out to the
services you actually watch: Discord, Telegram, Pushover, ntfy, or any
webhook.

Install it from **Sidebar → Plugins**, then configure channels under
**Settings → Notifications**. Each channel is a card: open it, fill in its
details, pick which categories it fires for, and hit **Send test** — the test
uses what's in the form, so you don't have to save first. A channel shows
**Active** in its header once it's filled in; there's no separate on/off
switch — clear the URL/credentials to stop a channel.

The bell always records everything regardless of what's configured here.

## Channels

### Discord

Create a webhook in your server (**Server Settings → Integrations → Webhooks →
New Webhook**), copy its URL into the card, done. Events arrive as rich
embeds — colored by level (info / success / warning / error), stamped with
their category, and carrying the series' cover art when the event is about
one.

### Telegram

Two fields:

- **Bot token** — message **@BotFather**, create a bot, copy the token.
- **Chat ID** — message **@userinfobot** for your own ID, or use a group's ID
  to post into a group (add your bot to the group first).

### Pushover

Create an application at [pushover.net](https://pushover.net) for the **app
token**; your **user key** is on the dashboard. Errors are delivered
high-priority.

### ntfy

Enter the full **topic URL** — `https://ntfy.sh/your-topic` or your
self-hosted server — and subscribe to the same topic in the ntfy app. On the
public server, pick a topic name nobody would guess: anyone who knows it can
read it. Levels map to ntfy priorities and tags, so errors stand out.

### Generic webhook

POSTs plain JSON to any URL you run:

```json
{
  "content": "Failed — Saga #12",
  "source": "backissue",
  "type": "import.failed",
  "category": "failure",
  "level": "error",
  "title": "Failed",
  "body": "Saga #12",
  "url": "/wanted"
}
```

`content` makes it Discord-compatible out of the box; the structured fields
are for smarter receivers, and it doubles as a post-event hook for anything
that should react to library activity. This channel uses the same settings as
the webhook that used to be built into BackIssue, so if you had one
configured, installing the plugin picks it up unchanged.

## Category filters

Every channel has its own **Send for** chips — *Imports, Failures, Releases,
Requests, System*, or **All**. A failures-only Discord channel next to an
everything ntfy topic is perfectly fine; each channel filters independently.

## Access

Notification settings live with the rest of Settings (admins /
*Manage settings*). What each **user** sees in the in-app bell is governed by
their own permissions — see [Users & access](users).
