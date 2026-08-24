/* ============================================================
   The Culebra Insider Guide — page behaviour
   ============================================================ */

/* ------------------------------------------------------------------
   VIDEO — this is the only thing you need to edit when the film is up.
   Put the URL (or the file path) in `source` and save. That's it.

   Works with any of these:
     YouTube   "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
     YouTube   "https://youtu.be/dQw4w9WgXcQ"
     Vimeo     "https://vimeo.com/123456789"
     A file    "/assets/video/culebra-guide.mp4"   (drop the .mp4 in assets/video/)

   Leave `source` as "" and the page shows a tidy "coming soon" slot.
------------------------------------------------------------------- */
const VIDEO = {
  source: '',
  poster: '/assets/img/culebra-flamenco.jpg',
  duration: '9:00',
};

/* ------------------------------------------------------------------ */

const $ = (s, r = document) => r.querySelector(s);
const el = (tag, cls, html) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html != null) n.innerHTML = html;
  return n;
};
const t = (k) => (window.I18N ? window.I18N.t(k) : k);

/* Site-relative images go through the Netlify Image CDN so we never ship the
   full-size original for a thumbnail or a blurred backdrop. */
const cdn = (src, w, q) =>
  src && src.startsWith('/') && !src.startsWith('/.netlify/')
    ? `/.netlify/images?url=${encodeURIComponent(src)}&w=${w}&q=${q}`
    : src;

/* ---------- work out what kind of source we were handed ---------- */
function parseSource(raw) {
  const src = (raw || '').trim();
  if (!src) return { kind: 'empty' };

  const yt = src.match(/(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/);
  if (yt) return { kind: 'youtube', id: yt[1] };
  if (/^[\w-]{11}$/.test(src)) return { kind: 'youtube', id: src };

  const vm = src.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vm) return { kind: 'vimeo', id: vm[1] };

  if (/\.(mp4|webm|ogv|mov|m3u8)(\?.*)?$/i.test(src)) return { kind: 'file', src };

  return { kind: 'iframe', src };
}

const PLAY_ICON =
  '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.2v13.6L19 12z" fill="currentColor"/></svg>';

/* ---------- render ---------- */
const slot = $('#player-slot');
const player = $('#player');
const info = parseSource(VIDEO.source);
let seekTo = null;   // set by whichever renderer supports seeking
let relabel = null;  // re-applies translated strings to the rendered player

function renderEmpty() {
  player.dataset.state = 'empty';
  slot.innerHTML = '';
  const wrap = el('div', 'vempty');
  wrap.innerHTML = `
    <img class="vempty__bg" src="${cdn(VIDEO.poster, 480, 45)}" alt="" aria-hidden="true" loading="lazy" />
    <div class="vempty__body">
      <div class="vempty__ring">
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-dasharray="14 40"/>
        </svg>
      </div>
      <h3></h3>
      <p></p>
      <div class="vempty__bars" aria-hidden="true">
        <i style="--bd:0ms"></i><i style="--bd:160ms"></i><i style="--bd:320ms"></i>
      </div>
    </div>`;
  slot.appendChild(wrap);
  relabel = () => {
    $('h3', wrap).textContent = t('player.empty.title');
    $('p', wrap).textContent = t('player.empty.body');
  };
  relabel();
}

function facade(posterUrl, onPlay) {
  const btn = el('button', 'vfacade');
  btn.type = 'button';
  btn.innerHTML = `<img src="${posterUrl}" alt="" aria-hidden="true" />
    <span class="vfacade__play" aria-hidden="true">${PLAY_ICON}<b></b></span>`;
  btn.addEventListener('click', () => onPlay(0));
  slot.appendChild(btn);
  relabel = () => {
    btn.setAttribute('aria-label', t('player.playAria'));
    $('b', btn).textContent = t('player.play');
  };
  relabel();
  return btn;
}

function mountIframe(src, allowAutoplay) {
  slot.innerHTML = '';
  const f = el('iframe');
  f.src = src;
  f.title = t('player.iframeTitle');
  f.loading = 'lazy';
  f.allow = `accelerometer; ${allowAutoplay ? 'autoplay; ' : ''}clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen`;
  f.allowFullscreen = true;
  slot.appendChild(f);
  player.dataset.state = 'playing';
  relabel = () => { f.title = t('player.iframeTitle'); };
}

function renderYouTube(id) {
  player.dataset.state = 'ready';
  const start = (time) =>
    mountIframe(
      `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1${time ? `&start=${Math.floor(time)}` : ''}`,
      true
    );
  facade(`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`, start);
  seekTo = start;
}

function renderVimeo(id) {
  player.dataset.state = 'ready';
  const start = (time) =>
    mountIframe(
      `https://player.vimeo.com/video/${id}?autoplay=1&dnt=1${time ? `#t=${Math.floor(time)}s` : ''}`,
      true
    );
  facade(cdn(VIDEO.poster, 1280, 74), start);
  seekTo = start;
}

function renderFile(src) {
  player.dataset.state = 'ready';
  const v = el('video');
  v.src = src;
  v.poster = cdn(VIDEO.poster, 1280, 74);
  v.controls = true;
  v.playsInline = true;
  v.preload = 'metadata';
  slot.appendChild(v);
  relabel = () => v.setAttribute('aria-label', t('player.iframeTitle'));
  relabel();

  v.addEventListener('loadedmetadata', () => {
    if (!isFinite(v.duration)) return;
    const m = Math.floor(v.duration / 60);
    const s = String(Math.round(v.duration % 60)).padStart(2, '0');
    $('#player-duration').textContent = `${m}:${s}`;
  });

  seekTo = (time) => {
    v.currentTime = time;
    v.play().catch(() => {});
  };
}

switch (info.kind) {
  case 'youtube': renderYouTube(info.id); break;
  case 'vimeo':   renderVimeo(info.id);   break;
  case 'file':    renderFile(info.src);   break;
  case 'iframe':  mountIframe(info.src, false); break;
  default:        renderEmpty();
}

if (VIDEO.duration) $('#player-duration').textContent = VIDEO.duration;

/* ---------- chapter timecodes jump into the film ---------- */
const toSeconds = (tc) =>
  tc.split(':').reduce((acc, part) => acc * 60 + Number(part), 0);

const chapterRows = [];
if (seekTo) {
  document.querySelectorAll('.chapter').forEach((row) => {
    const stamp = $('.chapter__time', row);
    if (!stamp) return;
    row.style.cursor = 'pointer';
    row.setAttribute('role', 'button');
    row.tabIndex = 0;
    chapterRows.push(row);
    const jump = () => {
      seekTo(toSeconds(stamp.textContent.trim()));
      $('#watch').scrollIntoView({ behavior: 'smooth', block: 'center' });
    };
    row.addEventListener('click', jump);
    row.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); jump(); }
    });
  });
}

function labelChapters() {
  chapterRows.forEach((row) => {
    row.setAttribute(
      'aria-label',
      `${t('player.chapterAria')} ${$('.chapter__time', row).textContent}: ${$('h3', row).textContent}`
    );
  });
}
labelChapters();

/* Player and chapter labels are built in JS, so they need a nudge on switch. */
if (window.I18N) {
  window.I18N.onChange(() => {
    if (relabel) relabel();
    labelChapters();
  });
}

/* ---------- sticky topbar ---------- */
const bar = $('.topbar');
const onScroll = () => bar.classList.toggle('is-stuck', window.scrollY > 40);
onScroll();
addEventListener('scroll', onScroll, { passive: true });

/* ---------- scroll reveals ---------- */
const targets = document.querySelectorAll(
  '.video-head, .player, .band__inner > *, .chapters__sticky, .chapter, .links__aside, .linklist li, .faq__sticky, .faq__list details, .cta__inner > *'
);
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  targets.forEach((target, i) => {
    const d = Math.min(i % 6, 5) * 55;
    target.classList.add('io');
    target.dataset.iod = d;
    target.style.transitionDelay = `${d}ms`;
  });
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-in');
        io.unobserve(e.target);
        // Drop the stagger delay once revealed, so hover states stay snappy.
        setTimeout(() => { e.target.style.transitionDelay = ''; },
          Number(e.target.dataset.iod || 0) + 900);
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
  );
  targets.forEach((target) => io.observe(target));
}

/* ---------- footer year ---------- */
$('#yr').textContent = new Date().getFullYear();
