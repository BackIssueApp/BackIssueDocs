<script setup>
import { useData } from 'vitepress';

const { frontmatter } = useData();

// Feature cards come straight from index.md frontmatter (content unchanged).
const features = frontmatter.value.features || [];

// Live-queue mock rows — exact values from the design handoff.
const queueRows = [
  { title: 'Saga', num: '#54', source: 'Usenet', srcColor: '#5fd38a', pct: '100%', barColor: '#5fd38a', phase: 'done', phaseColor: '#5fd38a', cover: 'linear-gradient(150deg,#3a2f6b,#7a4bd0)' },
  { title: 'The Department of Truth', num: '#12', source: 'Usenet', srcColor: '#5fd38a', pct: '62%', barColor: 'var(--accent)', phase: '62% · 4.1MB/s', phaseColor: 'var(--accent)', cover: 'linear-gradient(150deg,#7a1730,#d1274f)' },
  { title: 'Nightwing', num: '#88', source: 'Torrent', srcColor: '#2bd4d9', pct: '34%', barColor: '#2bd4d9', phase: '34% · 21 seeds', phaseColor: '#2bd4d9', cover: 'linear-gradient(150deg,#123a63,#2f79b8)' },
  { title: 'Immortal Hulk', num: '#01', source: 'Usenet', srcColor: 'var(--ink-faint)', pct: '12%', barColor: 'var(--ink-faint)', phase: 'searching…', phaseColor: 'var(--ink-faint)', cover: 'linear-gradient(150deg,#2d5b2d,#5fb04a)' },
];

// Table-of-contents cards.
const guideCards = [
  { num: '01', title: 'Getting started', href: '/getting-started', desc: 'Install, first-run setup, and a tour of the app.' },
  { num: '02', title: 'Your collection', href: '/collection', desc: 'Adding series, ComicVine matching, monitoring, bulk actions.' },
  { num: '03', title: 'Downloads', href: '/downloads', desc: 'How issues get found and fetched; the queue; manual searches; packs.' },
  { num: '04', title: 'Download sources', href: '/sources', desc: 'Configuring Usenet and torrents, source priority.' },
  { num: '05', title: 'Your library', href: '/library', desc: 'Importing existing files, scanning, tagging, naming, maintenance tools.' },
  { num: '06', title: 'Reading', href: '/reading', desc: 'The in-browser reader, reading lists, and reading stats.' },
  { num: '07', title: 'Users & access', href: '/users', desc: 'Accounts, roles, and permissions.' },
  { num: '08', title: 'Settings reference', href: '/settings-reference', desc: 'Every setting, explained.' },
];
</script>

<template>
  <main class="bi-home">
    <!-- HERO -->
    <section class="bi-hero">
      <div class="bi-halftone" aria-hidden="true"></div>
      <div class="bi-herogrid">
        <div>
          <div class="bi-eyebrow-pill">Self-hosted · Open source</div>
          <h1 class="bi-hero-h1">Track every<br>issue. Fill<br>every <span class="bi-accent">gap.</span></h1>
          <p class="bi-hero-sub">BackIssue is a comic collection manager. It matches your series to ComicVine, shows what you're missing, and downloads it automatically — then tags, converts, and files every issue.</p>
          <div class="bi-btnrow">
            <a href="/getting-started" class="bi-btn bi-btn-primary">Get started →</a>
            <a href="/sources" class="bi-btn bi-btn-secondary">Configure sources</a>
          </div>
        </div>

        <!-- LIVE QUEUE MOCK -->
        <div class="bi-heroqueue">
          <div class="bi-queuetag">Live download queue</div>
          <div class="bi-queuecard">
            <div class="bi-queuehead">
              <span class="bi-queuehead-label">
                <span class="bi-pulse-dot"></span>Queue
              </span>
              <span class="bi-flex"></span>
              <span class="bi-queuehead-stat">4 active · 12 queued</span>
            </div>
            <div class="bi-queuerows">
              <div v-for="q in queueRows" :key="q.title" class="bi-queuerow">
                <div class="bi-cover" :style="{ background: q.cover }">
                  <span class="bi-cover-num">{{ q.num }}</span>
                </div>
                <div class="bi-queuerow-mid">
                  <div class="bi-queuerow-titlerow">
                    <span class="bi-queuerow-title">{{ q.title }}</span>
                    <span class="bi-srcbadge" :style="{ color: q.srcColor, borderColor: q.srcColor }">{{ q.source }}</span>
                  </div>
                  <div class="bi-track">
                    <div class="bi-fill" :style="{ width: q.pct, background: q.barColor }"></div>
                  </div>
                </div>
                <div class="bi-phase" :style="{ color: q.phaseColor }">{{ q.phase }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FEATURE STORY -->
    <section class="bi-section bi-features">
      <div class="bi-section-head">
        <h2 class="bi-h2-big">Everything a collection needs</h2>
        <span class="bi-kicker">Issue #01 — Features</span>
      </div>
      <div class="bi-featgrid">
        <div v-for="f in features" :key="f.title" class="bi-featcard">
          <div class="bi-featicon">{{ f.icon }}</div>
          <h3 class="bi-feattitle">{{ f.title }}</h3>
          <p class="bi-featdetail">{{ f.details }}</p>
        </div>
      </div>
    </section>

    <!-- HOW IT WORKS -->
    <section class="bi-section bi-howwrap">
      <div class="bi-howpanel">
        <div class="bi-halftone bi-halftone-light" aria-hidden="true"></div>
        <div class="bi-howinner">
          <span class="bi-how-kicker">How it works, in one paragraph</span>
          <p class="bi-how-body">You add a series. BackIssue matches it to ComicVine, compares the issue list against the files you own, and shows what's missing. Ask it to download the gaps — or let the scheduler do it — and it searches your sources in priority order, grabs the best match, converts and tags the file, names it consistently, and files it into your library. You watch it all happen live in the queue.</p>
        </div>
      </div>
    </section>

    <!-- FIND YOUR WAY -->
    <section class="bi-section bi-findway">
      <div class="bi-section-head">
        <h2 class="bi-h2-big">Find your way</h2>
        <span class="bi-kicker">The table of contents</span>
      </div>
      <div class="bi-guidegrid">
        <a v-for="c in guideCards" :key="c.num" :href="c.href" class="bi-guidecard">
          <div class="bi-guidecard-head">
            <span class="bi-guidenum">{{ c.num }}</span>
            <span class="bi-guidetitle">{{ c.title }}</span>
          </div>
          <p class="bi-guidedesc">{{ c.desc }}</p>
        </a>
      </div>
    </section>

    <!-- CTA -->
    <section class="bi-cta">
      <div class="bi-ctagrid">
        <div>
          <h2 class="bi-cta-h2">Up and running<br>in one command.</h2>
          <p class="bi-cta-sub">Pull the image, mount your comics folder, open the app. The first-run wizard walks you through the rest.</p>
          <a href="/getting-started" class="bi-btn bi-btn-primary">Read the install guide →</a>
        </div>
        <div class="bi-terminal">
          <div class="bi-term-comment"># pull &amp; run</div>
          <div><span class="bi-term-keyword">docker</span> run -d -p 8787:8787 \</div>
          <div>&nbsp;&nbsp;-v ./data:/data \</div>
          <div>&nbsp;&nbsp;-v /path/to/comics:/comics \</div>
          <div>&nbsp;&nbsp;ghcr.io/backissueapp/backissue:latest</div>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="bi-footer">
      <div class="bi-footer-inner">
        <div class="bi-brand">
          <img src="/backissue-icon-192.png" alt="" width="26" height="26" class="bi-brand-icon" />
          <span class="bi-wordmark bi-wordmark-sm">BackIssue<span class="bi-worddot"></span></span>
        </div>
        <div class="bi-footer-text">BackIssue documentation · <a href="/privacy" class="bi-footer-link">Privacy Policy</a></div>
      </div>
    </footer>
  </main>
</template>

<style>
.bi-home { display: block; }

/* ---- shared buttons ---- */
.bi-btn {
  display: inline-flex; align-items: center; gap: 8px; text-decoration: none;
  font-family: var(--font-display); font-weight: 800; font-size: 15px;
  padding: 13px 24px; border: 2px solid var(--ink); border-radius: 9px;
  transition: transform .12s ease, background .12s ease;
}
.bi-btn-primary { background: var(--accent); color: #fff; box-shadow: var(--card-shadow); }
.bi-btn-primary:hover { transform: translate(2px, 2px); }
.bi-btn-secondary { background: var(--surface); color: var(--ink); }
.bi-btn-secondary:hover { background: var(--surface-2); }
@media (prefers-reduced-motion: reduce) { .bi-btn:hover { transform: none; } }

.bi-accent { color: var(--accent); }
.bi-flex { flex: 1; }

/* ---- halftone ---- */
.bi-halftone { position: absolute; inset: 0; background-image: radial-gradient(var(--ink-faint) 1.2px, transparent 1.3px); background-size: 16px 16px; opacity: .14; pointer-events: none; }
.bi-halftone-light { background-image: radial-gradient(rgba(255,255,255,.16) 1.2px, transparent 1.3px); background-size: 18px 18px; opacity: .5; }

/* ---- hero ---- */
.bi-hero { position: relative; overflow: hidden; border-bottom: 2px solid var(--ink); }
.bi-herogrid { max-width: 1340px; margin: 0 auto; padding: 74px 22px; display: grid; grid-template-columns: 1.02fr .98fr; gap: 52px; align-items: center; position: relative; }
.bi-eyebrow-pill { display: inline-flex; align-items: center; gap: 8px; font-family: var(--font-display); font-weight: 800; text-transform: uppercase; letter-spacing: .14em; font-size: 11.5px; color: var(--accent); border: 2px solid var(--accent); border-radius: 100px; padding: 5px 13px; margin-bottom: 24px; }
.bi-hero-h1 { font-family: var(--font-display); font-weight: 900; font-size: clamp(42px, 6.2vw, 76px); line-height: .96; letter-spacing: -.03em; margin: 0 0 22px; }
.bi-hero-sub { font-family: var(--font-body); font-size: 20px; line-height: 1.55; color: var(--ink-soft); max-width: 460px; margin: 0 0 32px; }
.bi-btnrow { display: flex; gap: 14px; flex-wrap: wrap; }

/* ---- hero queue mock ---- */
.bi-heroqueue { position: relative; }
.bi-queuetag { position: absolute; top: -14px; right: -10px; z-index: 2; background: var(--accent-2); border: 2px solid var(--ink); border-radius: 9px; padding: 6px 12px; font-family: var(--font-display); font-weight: 800; text-transform: uppercase; letter-spacing: .05em; font-size: 11px; color: var(--ink); box-shadow: var(--card-shadow); transform: rotate(-2.5deg); }
.bi-queuecard { background: var(--surface); border: 2px solid var(--ink); border-radius: 16px; box-shadow: var(--card-shadow); overflow: hidden; }
.bi-queuehead { display: flex; align-items: center; gap: 9px; padding: 14px 16px; border-bottom: 2px solid var(--line); }
.bi-queuehead-label { display: flex; align-items: center; gap: 7px; font-family: var(--font-display); font-weight: 800; text-transform: uppercase; letter-spacing: .05em; font-size: 12px; }
.bi-pulse-dot { width: 9px; height: 9px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 0 4px color-mix(in srgb, var(--accent) 22%, transparent); animation: bi-pulse 1.4s ease-in-out infinite; }
.bi-queuehead-stat { font-family: var(--font-mono); font-size: 11.5px; color: var(--ink-faint); }
.bi-queuerows { display: flex; flex-direction: column; }
.bi-queuerow { display: flex; align-items: center; gap: 12px; padding: 13px 16px; border-bottom: 1px solid var(--line); }
.bi-cover { width: 34px; height: 46px; border-radius: 4px; border: 1.5px solid var(--ink); flex: none; display: flex; align-items: flex-end; justify-content: center; overflow: hidden; }
.bi-cover-num { font-family: var(--font-mono); font-size: 9px; color: rgba(255,255,255,.9); padding-bottom: 2px; }
.bi-queuerow-mid { flex: 1; min-width: 0; }
.bi-queuerow-titlerow { display: flex; align-items: center; gap: 7px; }
.bi-queuerow-title { font-family: var(--font-ui); font-weight: 700; font-size: 13.5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.bi-srcbadge { flex: none; font-family: var(--font-mono); font-size: 9.5px; font-weight: 700; text-transform: uppercase; letter-spacing: .04em; padding: 1px 6px; border-radius: 20px; border: 1px solid currentColor; }
.bi-track { margin-top: 6px; height: 6px; border-radius: 20px; background: var(--surface-2); overflow: hidden; }
.bi-fill { height: 100%; border-radius: 20px; }
.bi-phase { flex: none; width: 78px; text-align: right; font-family: var(--font-mono); font-size: 10.5px; }

/* ---- generic section ---- */
.bi-section { max-width: 1340px; margin: 0 auto; }
.bi-features { padding: 72px 22px 20px; }
.bi-section-head { display: flex; align-items: baseline; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-bottom: 34px; }
.bi-h2-big { font-family: var(--font-display); font-weight: 900; font-size: clamp(28px, 3.6vw, 40px); letter-spacing: -.025em; margin: 0; }
.bi-kicker { font-family: var(--font-display); font-weight: 800; text-transform: uppercase; letter-spacing: .1em; font-size: 12px; color: var(--ink-faint); }

/* ---- feature cards ---- */
.bi-featgrid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
.bi-featcard { background: var(--surface); border: 2px solid var(--ink); border-radius: 12px; padding: 22px; box-shadow: var(--card-shadow); transition: transform .12s ease; }
.bi-featcard:hover { transform: translate(2px, 2px); }
.bi-featicon { width: 44px; height: 44px; border: 2px solid var(--ink); border-radius: 9px; background: var(--surface-2); display: flex; align-items: center; justify-content: center; font-size: 22px; margin-bottom: 14px; }
.bi-feattitle { font-family: var(--font-display); font-weight: 800; font-size: 18px; letter-spacing: -.01em; margin: 0 0 8px; }
.bi-featdetail { font-family: var(--font-body); font-size: 15.5px; line-height: 1.55; color: var(--ink-soft); margin: 0; }
@media (prefers-reduced-motion: reduce) { .bi-featcard:hover { transform: none; } }

/* ---- how it works ---- */
.bi-howwrap { padding: 60px 22px; }
.bi-howpanel { background: var(--ink); color: var(--paper); border-radius: 16px; padding: clamp(30px, 5vw, 60px); position: relative; overflow: hidden; }
.bi-howinner { position: relative; max-width: 760px; }
.bi-how-kicker { font-family: var(--font-display); font-weight: 800; text-transform: uppercase; letter-spacing: .14em; font-size: 12px; color: var(--accent-2); }
.bi-how-body { font-family: var(--font-body); font-size: clamp(20px, 2.6vw, 28px); line-height: 1.5; margin: 18px 0 0; color: var(--paper); }

/* ---- find your way ---- */
.bi-findway { padding: 20px 22px 72px; }
.bi-guidegrid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; }
.bi-guidecard { display: block; text-decoration: none; background: var(--surface); border: 2px solid var(--ink); border-radius: 12px; padding: 20px; transition: background .12s ease; }
.bi-guidecard:hover { background: var(--surface-2); }
.bi-guidecard-head { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
.bi-guidenum { font-family: var(--font-mono); font-size: 12px; font-weight: 700; color: var(--accent); }
.bi-guidetitle { font-family: var(--font-display); font-weight: 800; font-size: 16.5px; color: var(--ink); }
.bi-guidedesc { font-family: var(--font-body); font-size: 14.5px; line-height: 1.5; color: var(--ink-soft); margin: 0; }

/* ---- CTA ---- */
.bi-cta { border-top: 2px solid var(--ink); background: var(--surface-2); }
.bi-ctagrid { max-width: 1340px; margin: 0 auto; padding: 64px 22px; display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; }
.bi-cta-h2 { font-family: var(--font-display); font-weight: 900; font-size: clamp(28px, 3.8vw, 44px); letter-spacing: -.025em; line-height: 1.02; margin: 0 0 16px; }
.bi-cta-sub { font-family: var(--font-body); font-size: 18px; line-height: 1.55; color: var(--ink-soft); margin: 0 0 26px; max-width: 420px; }
.bi-terminal { font-family: var(--font-mono); font-size: 13px; background: var(--code-bg); color: var(--code-ink); border: 2px solid var(--ink); border-radius: 12px; padding: 20px 22px; box-shadow: var(--card-shadow); line-height: 1.9; overflow: auto; }
.bi-term-comment { color: var(--ink-faint); }
.bi-term-keyword { color: var(--accent-2); }

/* ---- footer ---- */
.bi-footer { border-top: 2px solid var(--ink); background: var(--paper); }
.bi-footer-inner { max-width: 1340px; margin: 0 auto; padding: 34px 22px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; }
.bi-brand { display: flex; align-items: center; gap: 9px; }
.bi-brand-icon { border-radius: 6px; }
.bi-wordmark { display: inline-flex; align-items: flex-start; font-family: 'Anton', sans-serif; font-weight: 400; letter-spacing: .02em; line-height: 1; color: var(--ink); }
.bi-wordmark-sm { font-size: 19px; }
.bi-worddot { width: 5px; height: 5px; border-radius: 50%; background: var(--accent); margin-left: 3px; margin-top: 1px; }
.bi-footer-text { font-family: var(--font-ui); font-size: 13.5px; color: var(--ink-soft); }
.bi-footer-link { color: var(--accent); text-decoration: none; font-weight: 600; }

/* ---- responsive ---- */
@media (max-width: 920px) {
  .bi-herogrid { grid-template-columns: 1fr; }
  .bi-heroqueue { max-width: 520px; }
  .bi-ctagrid { grid-template-columns: 1fr; }
}
@media (max-width: 720px) {
  .bi-featgrid { grid-template-columns: 1fr; }
}
</style>
