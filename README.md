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
- Add new pages to the sidebar in `.vitepress/config.mjs`.
- Link between pages with absolute paths: `[Getting started](/getting-started)`.
- Search is built in (offline, client-side) — no setup needed; new content is indexed on every build.
