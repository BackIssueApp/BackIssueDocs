---
description: "Share your server safely with accounts, roles and fine-grained permissions, including sign-in through an identity provider."
---

# Users & access

BackIssue has a full multi-user system: accounts, roles, and fine-grained permissions. It's designed to run for a household or a small group where not everyone should be able to reshape the library or change settings.

## The first account

A fresh install **asks you to create the admin account before anything else** — BackIssue never runs open and unsecured. That first account is automatically an **admin**; every request after that needs a login.

## Accounts

**Sidebar → Users** (admins only) manages accounts:

- **Create** accounts with a username, password, and role.
- **Change a role**, **disable** an account (blocks login without deleting its data), or **delete** it.
- **Allow self-registration** — a toggle. When on, a sign-up tab appears on the login page and new accounts are created as **viewers**. Off by default; when off, only admins create accounts.
- Each row shows when the account **last signed in**, and a badge when it's linked to an external sign-in (SSO).

Guard rails prevent lock-out: you can't demote, disable, or delete your own account, and there must always be at least one active admin.

## Your profile

Click your username in the sidebar → **Profile**. Everyone gets one:

- **Account** — set your **email** (used to link external sign-ins to your account), see when you joined and last signed in, **change your password**, **sign out other devices** (ends every session except the one you're on — for a lost or shared device), and sign out.
- **API key** — generate your personal key for apps and scripts that talk to your BackIssue install. It can do exactly what your account can do; see [Building on the API](api).
- **Content** — **Hide mature content**, your own switch for hiding flagged series from your library, search and reader. See [Content restrictions](#hiding-it-from-yourself).
- **Per-user options from plugins** — the reader adds its [reading shelves](reading#reading-shelves) toggles and [reading defaults](reading#reading-defaults) here; the OPDS plugin shows your [catalog address](opds).

## Signing in with an identity provider (SSO)

Install the **SSO (OpenID Connect)** plugin from the Plugins page to let users sign in through an identity provider — Authentik, Keycloak, Auth0, Google, Microsoft Entra, and the like. The login page gains a "Sign in with…" button; a first-time sign-in links to an existing account by email or creates a new one (as a viewer, configurable). Admins can also **disable password login** for an SSO-only setup — admins keep a password fallback so a broken provider can't lock everyone out.

An account linked to an external service has **no local password** — it can't set one and an admin can't set one for it. Its access stays governed by the provider, so revoking access there (for example, an expired subscription with a billing integration) reliably locks the account out with no local password left behind. Such users can still create a personal **API key** for reader apps and scripts.

## Roles

Three roles ship built in, each a superset of the one below:

| Role | Can do |
|---|---|
| **Viewer** | Browse the library and **read** comics — nothing else. No searching, downloading, or queue access; the download-related pages and buttons simply don't appear. |
| **Trusted** | Everything a viewer can, plus **search & download** and managing the library — add/remove volumes and issues, scan, tag, import, and fix ComicVine matches. |
| **Admin** | Everything, plus settings, indexers, users, plugins, jobs, tools, and logs. |

New signups are viewers — safe by default: a household member can read the whole collection without being able to change anything. To let someone fill gaps without reshaping the library, make a custom role (below) with just *Search & download*.

## Permissions & custom roles

Under the hood, every action maps to a named **permission**. The built-in roles are just bundles of these.

These ten ship with the app. The **tier** column is the lowest built-in role that holds the permission; the key is what the [API reference](api-reference) quotes for each endpoint.

| Permission | Key | Tier |
|---|---|---|
| Browse the library | `library.view` | Viewer |
| Search & download | `downloads.grab` | Trusted |
| Manage the library | `library.manage` | Trusted |
| View mature content | `library.restricted` | Trusted |
| Share reading lists | `lists.share` | Trusted |
| Settings & indexers | `settings.manage` | Admin |
| Users & roles | `users.manage` | Admin |
| Plugins & restart | `plugins.manage` | Admin |
| Jobs & tools | `system.jobs` | Admin |
| Logs | `system.logs` | Admin |

Plugins add their own, and they appear in the tick-list automatically once the plugin is installed:

| Permission | Key | Tier | From |
|---|---|---|---|
| Read comics | `reader.read` | Viewer | [Reader](reading) |
| Edit panel layouts | `reader.panels.edit` | Admin | [Reader](guided-reading) |
| OPDS catalog | `opds.use` | Viewer | [OPDS](opds) |
| Books library | `ebooks.use` | Viewer | [Books](ebooks) |
| Audiobooks | `audiobooks.use` | Viewer | [Audiobooks](audiobooks) |
| Request volumes | `requests.create` | Viewer | [Requests](requests) |
| Manage requests | `requests.manage` | Trusted | [Requests](requests) |

::: warning Built-in roles grow; custom roles don't
A built-in role holds every permission at or below its tier, so installing a plugin immediately gives viewers, trusted users and admins whatever it registers at their level — no editing needed. A **custom role holds only what you ticked**, so a new plugin's permission starts switched off for it and you have to grant it deliberately. That is the safe default, but it does mean a custom "kids" role won't gain *Read comics* on its own after you install the reader.

Two related behaviours: an admin implicitly holds everything, including permissions that don't exist yet, and a permission whose plugin has been uninstalled is treated as admin-only rather than as open. Role edits take effect on the next request — nobody has to sign in again.
:::

On the **Users** page you can create **custom roles**: give the role a name and tick exactly the permissions it should hold. Examples:

- A **"downloader"** role that can browse and download but not edit the library.
- A **"kids"** role that can read comics but not download or manage anything.
- A **"curator"** role that can publish [reading lists](reading#sharing-a-list) for everyone (*Share reading lists*) without any library-management rights.

Custom roles pick up plugin permissions automatically, so you can grant or withhold reading, OPDS access, or request approval per role.

## Content restrictions (mature series)

You can flag any volume as **mature**, hiding it from roles that don't hold the **View mature content** permission. On the volume page, a trusted user (or admin) toggles **Mark mature**; a 🔞 badge then marks it in the library list.

With **Use enriched metadata** enabled (Settings → Metadata), series with a Mature/Explicit/Adult content rating are **flagged automatically** when they’re matched or refreshed. The auto-flag fires once per series — if you unflag something manually, later refreshes respect your decision.

A flagged series becomes invisible to roles without the permission — not just dimmed. They won't see it in the library, its issues, wanted, or new-release notifications; they can't open it in the reader or reach it through the [OPDS](opds) catalog. Every surface that lists or serves a series enforces the same rule, so there's no back door.

### Hiding it from yourself

The permission decides what an account is *allowed* to see. Separately, each
person can narrow their own view: **Profile → Content → Hide mature content**
hides flagged series from your library, search and reader even though your role
is allowed to see them. Nothing is deleted, and turning it back off restores
everything immediately.

It is a preference, not a permission, so it only ever narrows. An account whose
role lacks *View mature content* sees nothing flagged either way, and switching
this off cannot widen that.

::: warning It does not reach OPDS
This preference filters the web app and the API. It does **not** filter the
[OPDS catalog](opds#access-control), so a reader app signed in as an account
that holds the permission still lists flagged series. Where it matters, use the
role permission rather than the switch.
:::

**View mature content** is a *trusted*-tier permission, so it's included in the built-in Trusted and Admin roles by default. To gate mature content:

- Give your general or kids' role **everything except** View mature content — the usual way to keep flagged series away from younger household members.
- Or build a custom role that explicitly holds it, and leave it off the others.

Because it's an ordinary permission, it composes with the rest: a "kids" role can read comics but never see a mature-flagged volume, while a "downloader" role could download but be blind to restricted series too.

## Requests without escalation

When a plugin like [Requests](requests) queues a download on a user's behalf, it runs under **that user's own download permission** — approving or requesting never grants someone rights they don't already have.

## Sessions & login security

- Signing in sets a secure, HttpOnly session cookie (30 days). Signing out ends it.
- **HTTP Basic** is also accepted for scripts and tools, verified against the same accounts.
- **Login rate limiting**: repeated failed logins from the same source are throttled (a short lockout that grows with continued failures), which also covers Basic auth — brute-forcing a password is impractical.
- Responses carry standard security headers (clickjacking and MIME-sniffing protections).

::: tip Running behind a reverse proxy
If you put BackIssue behind a reverse proxy (nginx, Caddy, Cloudflare Tunnel), set the `TRUST_PROXY` environment variable (e.g. `TRUST_PROXY=1`) so it sees real client IPs — this makes rate limiting per-client and lets the session cookie be marked Secure over HTTPS.
:::

## Reading history is per-user

Reading progress, bookmarks, per-series reading profiles, reading stats, and personal reading lists are all **per account** — everyone gets their own. See [Reading](reading).
