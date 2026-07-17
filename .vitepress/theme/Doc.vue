<script setup>
import { computed, ref, shallowRef, onMounted, onBeforeUnmount, inject, nextTick } from 'vue';
import { useData, useRoute, Content, onContentUpdated } from 'vitepress';

const { theme, page } = useData();
const route = useRoute();

// Mobile sidebar drawer state shared with the Layout's ☰ button.
const mobileNav = inject('biMobileNav', ref(false));

function normalize(p) {
  let s = (p || '/').replace(/index\.html$/, '').replace(/\.html$/, '');
  if (s.length > 1 && s.endsWith('/')) s = s.slice(0, -1);
  return s || '/';
}
const currentPath = computed(() => normalize(route.path));

// Sidebar groups come from the VitePress theme config (unchanged).
const groups = computed(() => {
  const sb = theme.value.sidebar;
  return Array.isArray(sb) ? sb : [];
});

// Flattened, ordered list of every sidebar link — drives prev/next + eyebrow.
const flat = computed(() => {
  const out = [];
  for (const g of groups.value) {
    for (const it of g.items || []) out.push({ ...it, group: g.text });
  }
  return out;
});

const currentIndex = computed(() => flat.value.findIndex((i) => normalize(i.link) === currentPath.value));
const currentEntry = computed(() => (currentIndex.value >= 0 ? flat.value[currentIndex.value] : null));
const eyebrow = computed(() => currentEntry.value?.group || '');
const title = computed(() => page.value.title || currentEntry.value?.text || '');

const prev = computed(() => (currentIndex.value > 0 ? flat.value[currentIndex.value - 1] : null));
const next = computed(() => (currentIndex.value >= 0 && currentIndex.value < flat.value.length - 1 ? flat.value[currentIndex.value + 1] : null));

function isActive(link) {
  return normalize(link) === currentPath.value;
}

// ---------- outline (right rail) with scrollspy ----------
const headings = shallowRef([]);
const activeId = ref('');

function buildOutline() {
  const article = document.querySelector('.bi-article-body');
  if (!article) { headings.value = []; return; }
  const els = Array.from(article.querySelectorAll('h2, h3'));
  headings.value = els
    .filter((el) => el.id)
    .map((el) => {
      const clone = el.cloneNode(true);
      clone.querySelectorAll('.header-anchor').forEach((a) => a.remove());
      return { id: el.id, text: clone.textContent.trim(), level: Number(el.tagName[1]) };
    });
  updateActive();
}

function updateActive() {
  const hs = headings.value;
  if (!hs.length) return;
  let current = hs[0].id;
  for (const h of hs) {
    const el = document.getElementById(h.id);
    if (!el) continue;
    if (el.getBoundingClientRect().top <= 120) current = h.id;
    else break;
  }
  activeId.value = current;
}

let ticking = false;
function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => { updateActive(); ticking = false; });
}

onContentUpdated(() => { nextTick(buildOutline); mobileNav.value = false; });
onMounted(() => {
  buildOutline();
  window.addEventListener('scroll', onScroll, { passive: true });
});
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll));

const hasOutline = computed(() => headings.value.length > 0);
</script>

<template>
  <div class="bi-docgrid">
    <!-- SIDEBAR (desktop) -->
    <aside class="bi-sidebar bi-scroll">
      <nav>
        <div v-for="g in groups" :key="g.text" class="bi-navgroup">
          <div class="bi-navgroup-title">{{ g.text }}</div>
          <a
            v-for="item in g.items"
            :key="item.link"
            :href="item.link"
            class="bi-navlink"
            :class="{ 'bi-navlink-active': isActive(item.link) }"
          >
            <span v-if="isActive(item.link)" class="bi-navlink-bar"></span>
            {{ item.text }}
          </a>
        </div>
      </nav>
    </aside>

    <!-- ARTICLE -->
    <main class="bi-article">
      <div class="bi-article-inner">
        <div v-if="eyebrow" class="bi-article-eyebrow">{{ eyebrow }}</div>
        <h1 class="bi-article-title">{{ title }}</h1>
        <div class="bi-prose bi-article-body">
          <Content />
        </div>

        <!-- prev / next -->
        <div v-if="prev || next" class="bi-prevnext">
          <a v-if="prev" :href="prev.link" class="bi-pncard">
            <div class="bi-pnlabel">← Previous</div>
            <div class="bi-pntitle">{{ prev.text }}</div>
          </a>
          <span v-else></span>
          <a v-if="next" :href="next.link" class="bi-pncard bi-pncard-next">
            <div class="bi-pnlabel">Next →</div>
            <div class="bi-pntitle">{{ next.text }}</div>
          </a>
        </div>

        <div class="bi-article-footer">BackIssue documentation · <a href="/privacy">Privacy Policy</a></div>
      </div>
    </main>

    <!-- OUTLINE -->
    <aside class="bi-outline bi-scroll">
      <template v-if="hasOutline">
        <div class="bi-outline-title">On this page</div>
        <a
          v-for="h in headings"
          :key="h.id"
          :href="'#' + h.id"
          class="bi-outlink"
          :class="{ 'bi-outlink-sub': h.level === 3, 'bi-outlink-active': activeId === h.id }"
        >{{ h.text }}</a>
      </template>
    </aside>

    <!-- MOBILE SIDEBAR DRAWER -->
    <div v-if="mobileNav" class="bi-mobscrim" @click="mobileNav = false"></div>
    <aside class="bi-mobsidebar bi-scroll" :class="{ 'bi-mobsidebar-open': mobileNav }">
      <nav>
        <div v-for="g in groups" :key="g.text" class="bi-navgroup">
          <div class="bi-navgroup-title">{{ g.text }}</div>
          <a
            v-for="item in g.items"
            :key="item.link"
            :href="item.link"
            class="bi-navlink"
            :class="{ 'bi-navlink-active': isActive(item.link) }"
            @click="mobileNav = false"
          >
            <span v-if="isActive(item.link)" class="bi-navlink-bar"></span>
            {{ item.text }}
          </a>
        </div>
      </nav>
    </aside>
  </div>
</template>

<style>
.bi-docgrid { max-width: 1340px; margin: 0 auto; display: grid; grid-template-columns: 262px minmax(0, 1fr) 220px; gap: 0; align-items: start; }

/* ---- sidebar ---- */
.bi-sidebar { position: sticky; top: 62px; height: calc(100vh - 62px); overflow-y: auto; padding: 26px 20px 40px; border-right: 2px solid var(--line); }
.bi-navgroup { margin-bottom: 22px; }
.bi-navgroup-title { font-family: var(--font-display); font-weight: 800; text-transform: uppercase; letter-spacing: .09em; font-size: 11px; color: var(--ink-faint); margin: 0 0 8px; padding-left: 11px; }
.bi-navlink { position: relative; display: block; padding: 6px 11px; border-radius: 7px; text-decoration: none; font-family: var(--font-ui); font-size: 14px; line-height: 1.35; margin-bottom: 1px; color: var(--ink-soft); font-weight: 500; }
.bi-navlink:hover { background: var(--surface-2); }
.bi-navlink-active { color: var(--ink); font-weight: 700; background: var(--surface-2); }
.bi-navlink-bar { position: absolute; left: 0; top: 5px; bottom: 5px; width: 3px; background: var(--accent); border-radius: 3px; }

/* ---- article ---- */
.bi-article { min-width: 0; padding: 38px clamp(24px, 4vw, 64px) 80px; }
.bi-article-inner { max-width: 820px; margin: 0 auto; }
.bi-article-eyebrow { font-family: var(--font-display); font-weight: 800; text-transform: uppercase; letter-spacing: .1em; font-size: 11.5px; color: var(--accent); margin-bottom: 12px; }
.bi-article-title { font-family: var(--font-display); font-weight: 900; font-size: clamp(34px, 5vw, 50px); letter-spacing: -.03em; line-height: 1.02; margin: 0 0 26px; }
.bi-article-body { min-height: 40vh; }

.bi-prevnext { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-top: 52px; padding-top: 28px; border-top: 2px solid var(--line); }
.bi-pncard { display: block; text-decoration: none; border: 2px solid var(--line); border-radius: 11px; padding: 15px 18px; background: var(--surface); transition: border-color .12s ease; }
.bi-pncard:hover { border-color: var(--ink); }
.bi-pncard-next { text-align: right; grid-column: 2; }
.bi-pnlabel { font-family: var(--font-display); font-weight: 800; text-transform: uppercase; letter-spacing: .08em; font-size: 10.5px; color: var(--ink-faint); }
.bi-pntitle { font-family: var(--font-display); font-weight: 700; font-size: 16px; color: var(--accent); margin-top: 4px; }
.bi-article-footer { margin-top: 36px; font-family: var(--font-ui); font-size: 13px; color: var(--ink-faint); }
.bi-article-footer a { color: var(--accent); text-decoration: none; }

/* ---- outline ---- */
.bi-outline { position: sticky; top: 62px; height: calc(100vh - 62px); overflow-y: auto; padding: 38px 20px 40px; }
.bi-outline-title { font-family: var(--font-display); font-weight: 800; text-transform: uppercase; letter-spacing: .08em; font-size: 11px; color: var(--ink-faint); margin-bottom: 12px; }
.bi-outlink { display: block; font-family: var(--font-ui); font-size: 13px; line-height: 1.35; padding: 4px 0 4px 11px; text-decoration: none; color: var(--ink-soft); border-left: 2px solid transparent; }
.bi-outlink:hover { color: var(--ink); }
.bi-outlink-sub { padding-left: 20px; }
.bi-outlink-active { color: var(--accent); border-left-color: var(--accent); }

/* ---- mobile drawer ---- */
.bi-mobsidebar { display: none; }
.bi-mobscrim { display: none; }

@media (max-width: 1100px) {
  .bi-docgrid { grid-template-columns: 262px minmax(0, 1fr); }
  .bi-outline { display: none; }
}
@media (max-width: 860px) {
  .bi-docgrid { grid-template-columns: 1fr; }
  .bi-sidebar { display: none; }
  .bi-mobscrim { display: block; position: fixed; inset: 62px 0 0; z-index: 45; background: rgba(20, 19, 16, .5); }
  .bi-mobsidebar {
    display: block; position: fixed; top: 62px; left: 0; z-index: 46;
    width: 280px; max-width: 84vw; height: calc(100vh - 62px); overflow-y: auto;
    padding: 26px 20px 40px; background: var(--paper); border-right: 2px solid var(--ink);
    transform: translateX(-102%); transition: transform .22s ease;
  }
  .bi-mobsidebar-open { transform: translateX(0); }
}
@media (prefers-reduced-motion: reduce) { .bi-mobsidebar { transition: none; } }
</style>
