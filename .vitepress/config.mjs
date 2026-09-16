import { defineConfig } from 'vitepress';

const SITE = 'https://backissue.app';

export default defineConfig({
  title: 'BackIssue',
  description: 'A comic collection manager that tracks your series, finds missing issues, and fetches them automatically.',
  cleanUrls: true,          // /getting-started instead of /getting-started.html
  lastUpdated: false,
  ignoreDeadLinks: [/^https?:\/\/localhost/], // docs legitimately point at the local app
  srcExclude: ['README.md'], // contributor notes, not a published page
  sitemap: { hostname: SITE },

  // Per-page social cards. Without these a docs link pasted into Discord or
  // Slack renders as a bare URL. Each page's own `description` frontmatter is
  // what varies; the site description is only the fallback.
  transformPageData(pageData, { siteConfig }) {
    if (pageData.frontmatter.layout === 'home') return;
    const title = pageData.title ? `${pageData.title} · BackIssue` : 'BackIssue documentation';
    const description = pageData.description || pageData.frontmatter.description
      || siteConfig.site.description;
    const path = pageData.relativePath.replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, '');
    pageData.frontmatter.head ??= [];
    pageData.frontmatter.head.push(
      ['meta', { property: 'og:type', content: 'article' }],
      ['meta', { property: 'og:site_name', content: 'BackIssue' }],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: description }],
      ['meta', { property: 'og:url', content: `${SITE}/${path}` }],
      ['meta', { property: 'og:image', content: `${SITE}/og.png` }],
      ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
      ['meta', { name: 'twitter:title', content: title }],
      ['meta', { name: 'twitter:description', content: description }],
      ['meta', { name: 'twitter:image', content: `${SITE}/og.png` }],
      ['link', { rel: 'canonical', href: `${SITE}/${path}` }],
    );
  },

  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon-32.png' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Anton&family=Archivo:wght@400;500;600;700;800;900&family=Newsreader:ital,wght@0,400;0,500;0,600;1,400;1,500&family=JetBrains+Mono:wght@400;500;700&display=swap',
    }],
    ['meta', { name: 'theme-color', content: '#ff2d6f' }],
    // Home-page card; every other page overrides these in transformPageData.
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'BackIssue' }],
    ['meta', { property: 'og:title', content: 'BackIssue — a comic collection manager' }],
    ['meta', { property: 'og:url', content: SITE + '/' }],
    ['meta', { property: 'og:image', content: SITE + '/og.png' }],
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height', content: '630' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: SITE + '/og.png' }],
  ],

  themeConfig: {
    // The custom theme renders these as flat links (no dropdowns) — keep the
    // list short and let the sidebar carry the structure.
    nav: [
      { text: 'Guide', link: '/getting-started' },
      { text: 'Reference', link: '/settings-reference' },
      { text: 'Discord', link: 'https://discord.gg/T6GTgzz8t2' },
      { text: 'GitHub', link: 'https://github.com/BackIssueApp' },
    ],

    // Grouped by what someone is trying to DO, in the order they usually do it.
    // Every group name also shows as the eyebrow above the page title, and the
    // flattened order drives prev/next — so this doubles as the reading order.
    sidebar: [
      {
        text: 'Start here',
        items: [
          { text: 'Getting started', link: '/getting-started' },
        ],
      },
      {
        text: 'Your collection',
        items: [
          { text: 'Managing your collection', link: '/collection' },
          { text: 'Discovering comics', link: '/discover' },
          { text: 'Your library on disk', link: '/library' },
          { text: 'Migrating from another app', link: '/migrate' },
        ],
      },
      {
        text: 'Downloading',
        items: [
          { text: 'How downloads work', link: '/downloads' },
          { text: 'Download sources', link: '/sources' },
          { text: 'AirDC++', link: '/airdcpp' },
          { text: 'Prowlarr indexers', link: '/prowlarr' },
        ],
      },
      {
        text: 'Reading',
        items: [
          { text: 'The reader', link: '/reading' },
          { text: 'Guided panel reading', link: '/guided-reading' },
          { text: 'Gamify', link: '/gamify' },
        ],
      },
      {
        text: 'Books & audiobooks',
        items: [
          { text: 'Books', link: '/ebooks' },
          { text: 'Audiobooks', link: '/audiobooks' },
          { text: 'Shelves', link: '/shelves' },
        ],
      },
      {
        text: 'Apps',
        items: [
          { text: 'Android app', link: '/android' },
          { text: 'iPhone & iPad app', link: '/ios' },
          { text: 'OPDS catalog', link: '/opds' },
        ],
      },
      {
        text: 'Sharing your server',
        items: [
          { text: 'Users & access', link: '/users' },
          { text: 'Requests', link: '/requests' },
          { text: 'Notifications', link: '/notifications' },
        ],
      },
      {
        text: 'Running your server',
        items: [
          { text: 'Automation & jobs', link: '/automation' },
          { text: 'Plugins', link: '/plugins' },
          { text: 'Troubleshooting', link: '/troubleshooting' },
        ],
      },
      {
        text: 'Reference',
        items: [
          { text: 'Settings reference', link: '/settings-reference' },
          { text: 'API reference', link: '/api-reference' },
          { text: 'Building on the API', link: '/api' },
          { text: 'Plugin API', link: '/plugin-api' },
          { text: 'Privacy policy', link: '/privacy' },
        ],
      },
    ],

    search: { provider: 'local' },   // built-in offline full-text search

    outline: { level: [2, 3], label: 'On this page' },
    docFooter: { prev: 'Previous', next: 'Next' },
    footer: { message: 'BackIssue documentation · <a href="/privacy">Privacy Policy</a>' },
  },
});
