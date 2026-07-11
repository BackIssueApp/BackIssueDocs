import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'BackIssue',
  description: 'A comic collection manager that tracks your series, finds missing issues, and fetches them automatically.',
  cleanUrls: true,          // /getting-started instead of /getting-started.html
  lastUpdated: false,
  ignoreDeadLinks: [/^https?:\/\/localhost/], // docs legitimately point at the local app

  themeConfig: {
    nav: [
      { text: 'Docs', link: '/getting-started' },
      { text: 'Discord', link: 'https://discord.gg/T6GTgzz8t2' },
      { text: 'GitHub', link: 'https://github.com/BackIssueApp' },
    ],

    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Getting started', link: '/getting-started' },
          { text: 'Managing your collection', link: '/collection' },
          { text: 'Downloads', link: '/downloads' },
          { text: 'Download sources', link: '/sources' },
          { text: 'Your library', link: '/library' },
          { text: 'Automation', link: '/automation' },
          { text: 'Users & access', link: '/users' },
        ],
      },
      {
        text: 'Reading & features',
        items: [
          { text: 'Reading', link: '/reading' },
          { text: 'Android app', link: '/android' },
          { text: 'Discover', link: '/discover' },
          { text: 'Requests', link: '/requests' },
          { text: 'Notifications', link: '/notifications' },
          { text: 'OPDS catalog', link: '/opds' },
          { text: 'AirDC++ source', link: '/airdcpp' },
          { text: 'Plugins', link: '/plugins' },
        ],
      },
      {
        text: 'Reference',
        items: [
          { text: 'Settings reference', link: '/settings-reference' },
          { text: 'Building on the API', link: '/api' },
          { text: 'API reference', link: '/api-reference' },
          { text: 'Plugin API', link: '/plugin-api' },
          { text: 'Troubleshooting', link: '/troubleshooting' },
        ],
      },
    ],

    search: { provider: 'local' },   // built-in offline full-text search

    outline: { level: [2, 3], label: 'On this page' },
    docFooter: { prev: 'Previous', next: 'Next' },
    footer: { message: 'BackIssue documentation' },
  },
});
