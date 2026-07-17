<script setup>
import { ref, computed, provide, defineAsyncComponent, onMounted, onBeforeUnmount } from 'vue';
import { useData } from 'vitepress';
import Home from './Home.vue';
import Doc from './Doc.vue';

// Client-only: keeps mark.js/minisearch out of the SSR module graph.
const VPLocalSearchBox = defineAsyncComponent(
  () => import('vitepress/dist/client/theme-default/components/VPLocalSearchBox.vue')
);

const { frontmatter, isDark, theme } = useData();

const isHome = computed(() => frontmatter.value.layout === 'home');

// nav links from config
const navLinks = computed(() => theme.value.nav || []);
const isExternal = (link) => /^https?:\/\//.test(link || '');

// theme toggle — flips VitePress's native dark ref (persists + honors OS pref)
function toggleTheme() { isDark.value = !isDark.value; }
const themeIcon = computed(() => (isDark.value ? '☀' : '☾'));

// search overlay (reuses VitePress's built-in local search)
const showSearch = ref(false);
function openSearch() { showSearch.value = true; }
function closeSearch() { showSearch.value = false; }

// mobile sidebar drawer (consumed by Doc.vue)
const mobileNav = ref(false);
provide('biMobileNav', mobileNav);
function toggleMobileNav() { mobileNav.value = !mobileNav.value; }

function onKeydown(e) {
  const el = e.target;
  const typing = el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable);
  if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
    e.preventDefault();
    openSearch();
  } else if (e.key === '/' && !typing && !e.metaKey && !e.ctrlKey && !e.altKey) {
    e.preventDefault();
    openSearch();
  } else if (e.key === 'Escape') {
    closeSearch();
  }
}
onMounted(() => window.addEventListener('keydown', onKeydown));
onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown));
</script>

<template>
  <div class="bi-app">
    <!-- TOP NAV -->
    <header class="bi-nav">
      <div class="bi-nav-inner">
        <a href="/" class="bi-brandlink" aria-label="BackIssue home">
          <img src="/backissue-icon-192.png" alt="" width="32" height="32" class="bi-nav-icon" />
          <span class="bi-wordmark bi-wordmark-lg">BackIssue<span class="bi-worddot bi-worddot-lg"></span></span>
        </a>
        <nav class="bi-nav-links">
          <a
            v-for="l in navLinks"
            :key="l.link"
            :href="l.link"
            class="bi-nav-link"
            :target="isExternal(l.link) ? '_blank' : undefined"
            :rel="isExternal(l.link) ? 'noopener' : undefined"
          >{{ l.text }}</a>
        </nav>
        <div class="bi-nav-spacer"></div>
        <button class="bi-searchbtn" @click="openSearch" aria-label="Search docs">
          <span class="bi-searchbtn-icon">⌕</span>
          <span class="bi-searchbtn-label">Search docs</span>
          <span class="bi-keycap">/</span>
        </button>
        <button class="bi-iconbtn" @click="toggleTheme" aria-label="Toggle theme">{{ themeIcon }}</button>
        <button class="bi-iconbtn bi-mobtoggle" @click="toggleMobileNav" aria-label="Menu">☰</button>
      </div>
    </header>

    <Home v-if="isHome" />
    <Doc v-else />

    <VPLocalSearchBox v-if="showSearch" @close="closeSearch" />
  </div>
</template>

<style>
.bi-app { min-height: 100vh; background: var(--paper); color: var(--ink); font-family: var(--font-ui); }

.bi-nav {
  position: sticky; top: 0; z-index: 40;
  background: color-mix(in srgb, var(--paper) 90%, transparent);
  backdrop-filter: blur(10px);
  border-bottom: 2px solid var(--ink);
}
.bi-nav-inner { max-width: 1340px; margin: 0 auto; height: 62px; padding: 0 22px; display: flex; align-items: center; gap: 18px; }
.bi-brandlink { display: flex; align-items: center; gap: 11px; text-decoration: none; color: var(--ink); }
.bi-nav-icon { display: block; border-radius: 7px; }
.bi-wordmark { display: inline-flex; align-items: flex-start; font-family: 'Anton', sans-serif; font-weight: 400; letter-spacing: .02em; line-height: 1; color: var(--ink); }
.bi-wordmark-lg { font-size: 24px; }
.bi-worddot { border-radius: 50%; background: var(--accent); margin-left: 3px; margin-top: 1px; }
.bi-worddot-lg { width: 6px; height: 6px; box-shadow: 0 0 9px color-mix(in srgb, var(--accent) 70%, transparent); }

.bi-nav-links { display: flex; align-items: center; gap: 4px; margin-left: 6px; }
.bi-nav-link { font-family: var(--font-display); font-weight: 600; font-size: 14px; color: var(--ink-soft); text-decoration: none; padding: 6px 11px; border-radius: 6px; }
.bi-nav-link:hover { color: var(--ink); background: var(--surface-2); }
.bi-nav-spacer { flex: 1; }

.bi-searchbtn { display: flex; align-items: center; gap: 8px; height: 36px; padding: 0 12px; background: var(--surface); border: 2px solid var(--line); border-radius: 8px; color: var(--ink-faint); font-family: var(--font-ui); font-size: 13px; cursor: pointer; min-width: 170px; }
.bi-searchbtn:hover { border-color: var(--ink); }
.bi-searchbtn-icon { font-size: 14px; }
.bi-searchbtn-label { flex: 1; text-align: left; }
.bi-keycap { font-family: var(--font-mono); font-size: 11px; border: 1px solid var(--line); border-radius: 4px; padding: 1px 5px; }

.bi-iconbtn { width: 36px; height: 36px; background: var(--surface); border: 2px solid var(--line); border-radius: 8px; color: var(--ink); cursor: pointer; font-size: 15px; display: flex; align-items: center; justify-content: center; }
.bi-iconbtn:hover { border-color: var(--ink); }
.bi-mobtoggle { display: none; font-size: 16px; }

@media (max-width: 860px) {
  .bi-nav-links { display: none; }
  .bi-searchbtn { min-width: 0; }
  .bi-searchbtn-label { display: none; }
  .bi-keycap { display: none; }
  .bi-mobtoggle { display: flex; }
}
</style>
