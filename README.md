# BackIssue docs

Documentation site for BackIssue, built with [VitePress](https://vitepress.dev) and published at **[backissue.app](https://backissue.app)**.

## Working on the docs

```bash
npm install
npm run dev       # live-reload dev server
npm run build     # production build (what CI runs)
npm run preview   # serve the production build locally
```

## Publishing

Pushing to `main` triggers the **Deploy docs** GitHub Actions workflow (`.github/workflows/deploy.yml`), which builds the site and deploys it to GitHub Pages. The custom domain is pinned by `public/CNAME` — don't delete it.

## Writing

- Pages are plain Markdown files at the repo root; the first `#` heading is the page title.
- **Add every new page to the sidebar** in `.vitepress/config.mjs`. The sidebar is
  the only navigation — a page that isn't in it is unreachable, and its group name
  also becomes the eyebrow above the page title, while the flattened order drives
  the prev/next links at the foot of each page.
- Link between pages with **relative** paths — `[Getting started](getting-started)`,
  `[naming](library#naming-patterns)`. Two exceptions already in the tree: `index.md`
  (the home page) and the two API pages use absolute `/`-prefixed links. Either
  resolves; just be consistent within a page.
- Dead links fail the build, so a typo in a link or an anchor is caught by CI. For a
  heading whose text makes an awkward slug, pin one: `## Anna's Archive {#annas-archive}`.
- The top nav in `config.mjs` is rendered by a custom theme that shows **flat links
  only** — `items:` dropdowns will not render.
- Search is built in (offline, client-side) — no setup needed; new content is indexed on every build.
- Every page carries a `description` in frontmatter. It is the meta description and
  the social-card text, so write one for any new page — without it the page falls
  back to the site-wide string and its search snippet reads like every other page's.
- `releases.md` is **generated**. After tagging a release, run
  `node tools/sync-changelog.mjs` (it reads `../app/CHANGELOG.md` by default, or
  take a path argument) and commit the result. Hand edits are overwritten.
- A page can narrow its own right-hand outline with `outline: 2` in frontmatter,
  which is what keeps the release notes rail to a version list.
- This file is excluded from the built site (`srcExclude`), so it is notes for us, not a page.
