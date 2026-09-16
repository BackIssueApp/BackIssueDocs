# iPhone & iPad app

The **BackIssue app for iPhone and iPad** is a native companion to your server — not a web page in a wrapper. It reads your library, downloads issues to your device for offline reading, and lets you add or request comics on the go. Books and audiobooks come along too.

<div class="tip custom-block" style="padding-top: 8px">

**[Join the beta](https://testflight.apple.com/join/fNktfmjJ)** · iPhone and iPad · iOS 17 or newer

</div>

## Installing

The app is in **TestFlight**, Apple's beta programme, rather than the App Store. There's nothing to apply for — the invitation is open:

1. Install Apple's free **[TestFlight](https://apps.apple.com/app/testflight/id899247664)** app from the App Store.
2. On the same device, open **[the join link](https://testflight.apple.com/join/fNktfmjJ)**.
3. Tap **Accept**, then **Install**.

Open the link on the iPhone or iPad itself — on a desktop browser it can only show you these instructions.

TestFlight tells you when a new build is ready, and can install them for you if you turn on **Automatic Updates** for BackIssue inside TestFlight. Your servers, sign-ins, downloads and settings all survive an update.

## Signing in

On first launch, point the app at your server and sign in:

- **Server address** — the URL you use in the browser (e.g. `https://comics.example.com`).
- **Username and password** — the same account you use on the web.

Or tap **Scan QR code** and scan the pairing code shown on your **Profile** page in the web app, which fills both in without typing.

You can add **more than one server** and switch between them at any time from **Settings → Servers** — handy if you run one at home and connect to another. Each server keeps its own sign-in and downloads, held in the iOS keychain.

For extra privacy, turn on the app lock in Settings to ask for **Face ID**, **Touch ID** or your passcode every time the app opens.

## Reading

- **Paged** and **webtoon** (continuous scroll) modes, **double-page in landscape**, and **right-to-left** for manga.
- **Guided view** walks a page panel by panel — useful on an iPhone screen.
- Pinch to zoom, margin trimming for scans, a page gap, and reading backgrounds (black, grey, night, eye comfort).
- **Resume** — it remembers your page and picks up where you left off, and your progress syncs with the web reader and every other device.
- **Bookmarks**, edge taps or swipes to turn, optional haptic page turns, and keep-the-screen-awake.
- **Next issue** and **previous issue** without leaving the reader, and **Back to arc** when you're working through a reading list.
- A **data saver** mode downscales pages when you're on mobile data.

Your **reading stats** — pages read, issues finished, streak, and most-read series — travel with your account.

## Books and audiobooks

If your server runs the [Books](ebooks) or [Audiobooks](audiobooks) plugin, both share the Library with your comics under a media filter rather than living in tabs of their own.

**Books** open in a reader of their own, built on the same engine as the web reader so positions match to the word:

- Ink, sepia, paper and true-black **themes**, Literata, a sans face and **OpenDyslexic**, text size, line spacing, justification and margins.
- **Paginated or scrolling**, a two-page spread on iPad in landscape, and a page-turn animation you can switch off.
- **Highlights and notes** in four colours, exported as Markdown and synced through your account; **Define** uses the system dictionary offline.
- **Search inside a book**, footnotes that open in place, a draggable progress scrubber, and an image lightbox.
- **Read aloud** speaks the book with the device's voice, lighting each sentence and turning pages as it goes.
- **Download a book** to read with no server; positions and highlights you make offline land when you reconnect.
- PDFs read in the app in a paged viewer.

**Audiobooks** stream from your server with chapters, speed, a sleep timer and resume, and the home-screen **widget** offers whatever you were last reading — a comic, or the book if there's no comic mid-read.

## Your library, offline

- Browse and **search** everything you own, filter by followed, missing or problem series, and open any series to see which issues you have.
- **Home** shows what you're in the middle of, what's ready that you haven't started, and the arcs you're working through.
- **Download issues to your device** for reading with no signal. Downloads continue in the background and can be managed from Settings.

## Adding & requesting

- If your account can manage the library, **add a series** straight from the app.
- If your server runs the **Requests** plugin and your account can make requests, the add button raises a **request** for approval instead.
- On a series, accounts that manage the library set its [monitoring policy](collection#monitoring), and anyone who can download can **want** or **skip** a single issue (swipe an issue row).

What you can do in the app follows your account's **permissions** exactly, just like on the web.

## Activity and notifications

The **Activity** view shows the live download queue and recent history from your server. The **notifications** view carries the same in-app notification centre the web app has.

If something goes wrong, **Settings → Support** sends a diagnostic report to your server — see [Troubleshooting](troubleshooting#getting-help).

## Requirements

- **iOS 17 or newer**, on iPhone or iPad.
- A reachable BackIssue server, and an account on it. Reading needs the **Reader** plugin on the server — first-run setup offers it pre-ticked, so most servers have it.
- HTTPS is recommended so your credentials and library travel securely.

## Android

Running Android too? See the [Android app](android) — the same library, the same account, progress synced between them.
