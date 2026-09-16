<script setup>
import { inject, ref } from 'vue';

// Layout owns the search overlay; this is the same opener the ⌕ button uses.
const openSearch = inject('biOpenSearch', ref(null));
function search() { if (typeof openSearch === 'function') openSearch(); }

const popular = [
  { text: 'Getting started', link: '/getting-started', desc: 'Install, first-run setup, and a tour' },
  { text: 'Download sources', link: '/sources', desc: 'Usenet, torrents, and the sites you can add' },
  { text: 'Settings reference', link: '/settings-reference', desc: 'Every setting, explained' },
  { text: 'Troubleshooting', link: '/troubleshooting', desc: 'Common problems and how to fix them' },
];
</script>

<template>
  <div class="bi-404">
    <div class="bi-404-eyebrow">Error 404</div>
    <h1 class="bi-404-title">This page isn't in the collection.</h1>
    <p class="bi-404-sub">
      The address doesn't match any page here. It may have been renamed, or the
      link that brought you may be out of date.
    </p>

    <div class="bi-404-actions">
      <a href="/" class="bi-404-btn bi-404-btn-primary">Back to the home page</a>
      <button type="button" class="bi-404-btn bi-404-btn-secondary" @click="search">
        Search the docs
      </button>
    </div>

    <div class="bi-404-kicker">Popular pages</div>
    <ul class="bi-404-list">
      <li v-for="p in popular" :key="p.link">
        <a :href="p.link">{{ p.text }}</a>
        <span>{{ p.desc }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.bi-404 { max-width: 640px; padding-bottom: 40px; }
.bi-404-eyebrow {
  font-family: var(--font-display); font-weight: 800; text-transform: uppercase;
  letter-spacing: .1em; font-size: 11.5px; color: var(--link); margin-bottom: 12px;
}
.bi-404-title {
  display: block;   /* .bi-prose hides bare h1s; this one is the page's title */
  font-family: var(--font-display); font-weight: 900;
  font-size: clamp(30px, 5vw, 44px); line-height: 1.02; letter-spacing: -.025em;
  margin: 0 0 16px; color: var(--ink);
}
.bi-404-sub {
  font-family: var(--font-body); font-size: 18px; line-height: 1.6;
  color: var(--ink-soft); margin: 0 0 28px;
}
.bi-404-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 44px; }
.bi-404-btn {
  display: inline-flex; align-items: center; justify-content: center;
  font-family: var(--font-display); font-weight: 800; font-size: 15px;
  padding: 12px 22px; border: 2px solid var(--ink); border-radius: 9px;
  text-decoration: none; cursor: pointer;
}
.bi-404-btn-primary { background: var(--accent); color: #fff; box-shadow: var(--card-shadow); }
.bi-404-btn-secondary { background: var(--surface); color: var(--ink); }
.bi-404-btn-secondary:hover { background: var(--surface-2); }
.bi-404-kicker {
  font-family: var(--font-display); font-weight: 800; text-transform: uppercase;
  letter-spacing: .08em; font-size: 11px; color: var(--ink-faint); margin-bottom: 12px;
}
.bi-404-list { list-style: none; margin: 0; padding: 0; display: grid; gap: 10px; }
.bi-404-list li {
  display: flex; flex-wrap: wrap; align-items: baseline; gap: 4px 10px;
  border-top: 1px solid var(--line); padding-top: 10px;
}
.bi-404-list a {
  font-family: var(--font-display); font-weight: 800; font-size: 15.5px;
  color: var(--link); text-decoration: none;
}
.bi-404-list a:hover { text-decoration: underline; }
.bi-404-list span { font-family: var(--font-body); font-size: 14.5px; color: var(--ink-soft); }
@media (max-width: 560px) {
  .bi-404-actions { flex-direction: column; align-items: stretch; }
}
</style>
