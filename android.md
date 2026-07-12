# Android app

The **BackIssue Android app** is a native companion to your server — not a web page in a wrapper. It reads your library, downloads issues to your phone for offline reading, and lets you add or request comics on the go. Built for phones and tablets alike.

<div class="tip custom-block" style="padding-top: 8px">

**[Download BackIssue for Android](https://static.backissue.app/backissue.apk)** · Android 8.0 (Oreo) or newer

</div>

## Installing

The app is distributed as an APK you install directly (it isn't on the Play Store):

1. On your phone, open the [download link](https://static.backissue.app/backissue.apk).
2. When prompted, allow your browser to **install unknown apps** (Android asks the first time; you only need to do this once).
3. Open the downloaded file to install, then launch **BackIssue**.

## Keeping the app updated

The app **updates itself** — no need to come back here. When a new version is published you'll get an **Update available** prompt, and you can check any time from **Settings → Check for updates**. Tap **Download & install**, confirm the system prompt, and your servers, sign-ins, and settings are all kept. The first update asks you to allow BackIssue to install apps — a one-time Android permission.

You can still grab the latest APK by hand from the [download link](https://static.backissue.app/backissue.apk) if you'd rather.

## Signing in

On first launch, point the app at your server and sign in:

- **Server address** — the URL you use in the browser (e.g. `https://comics.example.com`).
- **Username and password** — the same account you use on the web. No API keys to copy around.

You can add **more than one server** and switch between them at any time from **Settings → Servers** — handy if you run one at home and connect to another. Each server keeps its own sign-in and downloads.

For extra privacy, turn on **Require unlock** in Settings to ask for your fingerprint or PIN every time the app opens.

## Reading

The app carries the full reader experience:

- **Paged**, **double-page**, and **webtoon** (continuous scroll) modes, plus **right-to-left** for manga.
- Pinch to zoom, fit controls, and white-border trimming for scans.
- **Resume** — it remembers your page and picks up where you left off, and your progress syncs with the web reader and every other device.
- **Bookmarks** — mark pages and jump between them.
- Layout choices are remembered **per series**, so manga stays right-to-left webtoon while your other books stay single-page.
- A **data saver** mode downscales pages when you're on mobile data.

Your **reading stats** — pages read, issues finished, streak, and most-read series — travel with your account.

## Your library, offline

- Browse and **search** everything you own, filter by followed / missing / problem series, and open any series to see which issues you have.
- **Home shelves** (Continue reading, Next up, New in your library, and the rest) mirror the ones you've enabled on the web.
- **Download issues to your device** for reading with no signal — on a flight, the train, or anywhere offline. Manage what's stored, and free up space, from **Settings → Offline downloads**.

## Adding & requesting

Found something you want while you're out?

- If your account can manage the library, **add a series** straight from the app.
- If your server runs the **Requests** plugin and your account can make requests, the add button raises a **request** for approval instead — the same flow as the web app, including western-only limits if your server enforces them.

What you can do in the app follows your account's **permissions** exactly, just like on the web.

## Activity

The **Activity** view shows the live download queue and recent history from your server, so you can keep an eye on what's fetching without opening a browser.

## Requirements

- **Android 8.0 (Oreo) or newer.**
- A reachable BackIssue server, and an account on it. Reading needs the **Reader** plugin enabled on the server (it is by default).
- HTTPS is recommended so your credentials and library travel securely.
