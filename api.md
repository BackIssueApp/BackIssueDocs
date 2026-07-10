# Building on the API

Everything BackIssue's web UI does goes through its HTTP API — and you can
use that same API to build your own tools: a mobile comic reader, a
dashboard widget, an import script, a bot. There is no separate, reduced
"public API"; you get the real one.

## API keys

Each account can hold **one personal API key**, generated from your
**Profile** page (*API key → Generate key*). The key is shown **once** —
copy it then; only a hash is stored. Generating a new key replaces the old
one immediately, and *Revoke* kills it outright.

Send it on every request, either way:

```
X-Api-Key: bi_…
Authorization: Bearer bi_…
```

```bash
curl -H "X-Api-Key: bi_xxxxxxxx…" http://backissue.local:8787/api/series
```

A request made with a key acts **as that user**: it can read and do exactly
what the account's role allows, nothing more. A viewer's key can browse the
library but not touch settings; disable the account and its key stops
working with it.

::: tip Where to start
`GET /api/auth/me` returns the key's user and resolved permission list —
useful for a client to discover what it's allowed to offer.
:::

## The surface

The API lives under `/api`. The **[API reference](/api-reference)** lists
every endpoint with its method and required permission. To watch the calls in
context, open the browser dev tools' network tab and click around the app —
every screen is these same endpoints. Some anchors:

| Area | Endpoints |
|---|---|
| Who am I | `GET /api/auth/me` |
| Library | `GET /api/collection`, `GET /api/collection/{id}`, `GET /api/series` |
| Search & add | `GET /api/cv/search?q=`, `POST /api/collection/add-cv` |
| Follow / monitor | `POST /api/collection/{id}/follow`, `POST /api/collection/{id}/monitor` |
| Downloads | `GET /api/status`, `POST /api/download` |
| Releases | `GET /api/releases` |
| Notifications | `GET /api/notifications`, `POST /api/notifications/read` |

Mutating endpoints take JSON bodies (`content-type: application/json`).
Errors come back as `{ "error": "…" }` with a meaningful status — `401`
(bad/missing key), `403` (your role lacks the permission), `400`
(bad input).

## Plugin routes are part of the API

Plugins register routes under the same `/api` tree, gated by the same
permissions — so an API key reaches them too. Examples:

- **Reader** — issue page images and reading-progress endpoints: everything
  needed to build an external comic-reader app.
- **OPDS** — `/api/opds` works with a key as well as Basic auth, if your
  client prefers a header.
- **Requests** — file and vote on requests from a bot or chat integration.

What a plugin exposes is its own documentation's business; the rule of thumb
is that anything its UI can do, a key with the right permissions can do.

## Notes for client authors

- **One key per account.** For a second integration with different rights,
  create a dedicated account with a role scoped to what it needs — that's
  the intended way to scope keys.
- Keys don't expire; rotate by regenerating (old key dies instantly).
- The API is the same one the UI uses, so endpoints can evolve between
  versions — pin your client to what you've tested and check the
  [changelog](https://github.com/BackIssueApp) on upgrades.
- Server-side and native apps work out of the box. Browser-based apps served
  from another origin will hit CORS — front BackIssue with a proxy that adds
  the headers you need, or serve your app from the same origin.
