# Users & access

BackIssue has a full multi-user system: accounts, roles, and fine-grained permissions. It's designed to run for a household or a small group where not everyone should be able to reshape the library or change settings.

## Open mode (single user)

Out of the box, with **no accounts created**, BackIssue runs in *open mode*: anyone who can reach it has full access, exactly like a personal appliance. This is the simplest setup and fine on a trusted home network.

The moment you create the **first account**, authentication switches on for everyone and open mode ends. That first account is automatically an **admin**.

::: tip Securing the app
If BackIssue is reachable beyond your local machine, create an account. In the sidebar, the account area offers **"Secure this install"** while in open mode — it creates the first admin and turns on login. After that, every request needs a session.
:::

## Accounts

**Sidebar → Users** (admins only) manages accounts:

- **Create** accounts with a username, password, and role.
- **Change a role**, **disable** an account (blocks login without deleting its data), or **delete** it.
- **Allow self-registration** — a toggle. When on, a sign-up tab appears on the login page and new accounts are created as **viewers**. Off by default; when off, only admins create accounts.

Each user manages their own password from the account menu (**Change password**). Guard rails prevent lock-out: you can't demote, disable, or delete your own account, and there must always be at least one active admin.

## Roles

Three roles ship built in, each a superset of the one below:

| Role | Can do |
|---|---|
| **Viewer** | Browse the library, search, read comics, and queue downloads. |
| **Trusted** | Everything a viewer can, plus manage the library — add/remove volumes and issues, scan, tag, import, and fix ComicVine matches. |
| **Admin** | Everything, plus settings, indexers, users, plugins, jobs, tools, and logs. |

New signups are viewers. Downloading is deliberately a *viewer* capability — a household member can fill gaps without being able to reshape the collection.

## Permissions & custom roles

Under the hood, every action maps to a named **permission** (browse, download, manage the library, manage settings, manage users, and so on — plus permissions that plugins add, like *Read comics* or *OPDS catalog*). The built-in roles are just bundles of these.

On the **Users** page you can create **custom roles**: give the role a name and tick exactly the permissions it should hold. Examples:

- A **"downloader"** role that can browse and download but not edit the library.
- A **"kids"** role that can read comics but not download or manage anything.

Custom roles pick up plugin permissions automatically, so you can grant or withhold reading, OPDS access, or request approval per role.

## Content restrictions (mature series)

You can flag any volume as **mature**, hiding it from roles that don't hold the **View mature content** permission. On the volume page, a trusted user (or admin) toggles **Mark mature**; a 🔞 badge then marks it in the library list.

With **Use enriched metadata** enabled (Settings → Metadata), series with a Mature/Explicit/Adult content rating are **flagged automatically** when they’re matched or refreshed. The auto-flag fires once per series — if you unflag something manually, later refreshes respect your decision.

A flagged series becomes invisible to roles without the permission — not just dimmed. They won't see it in the library, its issues, wanted, or new-release notifications; they can't open it in the reader or reach it through the [OPDS](opds) catalog. Every surface that lists or serves a series enforces the same rule, so there's no back door.

**View mature content** is a *trusted*-tier permission, so it's included in the built-in Trusted and Admin roles by default. To gate mature content:

- Give your general or kids' role **everything except** View mature content — the usual way to keep flagged series away from younger household members.
- Or build a custom role that explicitly holds it, and leave it off the others.

Because it's an ordinary permission, it composes with the rest: a "kids" role can read comics but never see a mature-flagged volume, while a "downloader" role could download but be blind to restricted series too. Open mode (no accounts) has no restrictions — the flag only takes effect once accounts exist.

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
