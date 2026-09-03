/* ============================================================
   The Culebra Insider Guide — page behaviour
   ============================================================ */

/* ------------------------------------------------------------------
   VIDEO — this is the only thing you need to edit when the film changes.
   Put the URL (or the file path) in `source` and save. That's it.

   Works with any of these:
     Bunny     "https://player.mediadelivery.net/embed/<library>/<video-id>"
     YouTube   "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
     YouTube   "https://youtu.be/dQw4w9WgXcQ"
     Vimeo     "https://vimeo.com/123456789"
     A file    "/assets/video/culebra-guide.mp4"   (drop the .mp4 in assets/video/)

   Leave `source` as "" and the page shows a tidy "coming soon" slot.

   The film currently in `source` runs 10:59 and is shot vertically (3:4). Its
   seven Bunny chapter marks are the timecodes listed in index.html, so if the
   chapters change in Bunny they have to change there too.
------------------------------------------------------------------- */
const VIDEO = {
  source: 'https://player.mediadelivery.net/embed/739813/a132d605-58d1-4675-bb40-fe89eb8a6e74',
  poster: '/assets/img/culebra-flamenco.jpg',
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

  // Bunny Stream — iframe.mediadelivery.net and player.mediadelivery.net are the
  // same player behind two hostnames.
  const bunny = src.match(/^https:\/\/(?:iframe|player)\.mediadelivery\.net\/embed\/\d+\/[\w-]+/);
  if (bunny) return { kind: 'bunny', src: bunny[0] };

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

  seekTo = (time) => {
    v.currentTime = time;
    v.play().catch(() => {});
  };
}

/* Bunny Stream ships its own poster, play button and chapter markers, so the
   iframe goes straight in rather than behind a click-to-load facade.

   Seeking talks to it over the Player.js protocol that the Bunny player
   implements (https://github.com/embedly/player.js). Until the player inside the
   iframe has announced itself — and on the very first jump, where a
   cross-document play() would be blocked as un-gestured — we reload the embed
   with `?t=`, which Bunny honours as a start time and autoplays from there. */
const BUNNY_ORIGIN_RE = /^https:\/\/[a-z]+\.mediadelivery\.net/;
const BUNNY_PARAMS = 'autoplay=false&loop=false&muted=false&preload=true&responsive=true';

function renderBunny(base) {
  player.dataset.state = 'ready';
  slot.innerHTML = '';

  const frame = el('iframe');
  frame.src = `${base}?${BUNNY_PARAMS}`;
  frame.title = t('player.iframeTitle');
  frame.loading = 'lazy';
  frame.allow = 'accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;fullscreen;';
  frame.allowFullscreen = true;
  slot.appendChild(frame);
  relabel = () => { frame.title = t('player.iframeTitle'); };

  const origin = (frame.src.match(BUNNY_ORIGIN_RE) || [])[0];
  let ready = false;
  let started = false;

  const send = (method, value) => {
    if (!frame.contentWindow) return;
    frame.contentWindow.postMessage(
      JSON.stringify({ context: 'player.js', version: '0.0.11', method, value }),
      origin
    );
  };

  addEventListener('message', (e) => {
    if (e.origin !== origin || e.source !== frame.contentWindow) return;
    let msg;
    try { msg = typeof e.data === 'string' ? JSON.parse(e.data) : e.data; } catch (err) { return; }
    if (!msg || msg.context !== 'player.js') return;
    if (msg.event === 'ready') {
      ready = true;
      send('addEventListener', 'play');
      send('addEventListener', 'timeupdate');
    }
    if (msg.event === 'play' || msg.event === 'timeupdate') started = true;
  });

  seekTo = (time) => {
    const at = Math.max(0, Math.floor(time));
    if (ready && started) {
      send('setCurrentTime', at);
      send('play');
      return;
    }
    // Nothing is playing yet, so hand the start time to the player itself.
    frame.src = `${base}?${BUNNY_PARAMS.replace('autoplay=false', 'autoplay=true')}&t=${at}`;
    ready = false;
    started = false;
  };
}

switch (info.kind) {
  case 'bunny':   renderBunny(info.src);  break;
  case 'youtube': renderYouTube(info.id); break;
  case 'vimeo':   renderVimeo(info.id);   break;
  case 'file':    renderFile(info.src);   break;
  case 'iframe':  mountIframe(info.src, false); break;
  default:        renderEmpty();
}


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
  '.video-head, .player, .band__inner > *, .chapters__sticky, .chapter, .links__aside, .linklist li, ' +
  '.faq__sticky, .faq__list details, .islands__head, .isle, .islands__cta, .cta__inner > *'
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

const REDUCED = matchMedia('(prefers-reduced-motion: reduce)');

/* ---------- the wordmark takes you back to the top ----------
   The header is sticky, so a plain #top jump lands on the bar where it already
   sits and appears to do nothing. Drive the scroll ourselves instead. */
document.querySelectorAll('.brand').forEach((brand) => {
  brand.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: REDUCED.matches ? 'auto' : 'smooth' });
    // Keep the URL clean rather than leaving a #top behind.
    if (location.hash) history.replaceState(null, '', location.pathname + location.search);
  });
});

/* ---------- "Take a look" ----------
   The gem lives inside list row 06, so <details> does the opening on its own.
   All this adds is a nudge up the page when the photos would unfold off-screen,
   plus support for landing on /#gem directly. */
const gemPanel = $('#gem-panel');
if (gemPanel) {
  gemPanel.addEventListener('toggle', () => {
    if (!gemPanel.open) return;
    const row = gemPanel.closest('li');
    if (gemPanel.getBoundingClientRect().bottom > innerHeight) {
      row.scrollIntoView({ behavior: REDUCED.matches ? 'auto' : 'smooth', block: 'start' });
    }
  });

  if (location.hash === '#gem') gemPanel.open = true;
}

/* ---------- hidden-gem photo carousel ----------
   Scroll-snap does the moving; this only drives the arrows, the dots and the
   index readout, so a swipe and a button press stay in sync. */
document.querySelectorAll('[data-carousel]').forEach((root) => {
  const track = $('[data-carousel-track]', root);
  const dotsWrap = $('[data-carousel-dots]', root);
  const slides = Array.from(track.querySelectorAll('.slide'));
  if (slides.length < 2) {
    if (dotsWrap) dotsWrap.remove();
    root.querySelectorAll('.carousel__nav').forEach((b) => b.remove());
    return;
  }

  let index = 0;

  const dots = slides.map((_, i) => {
    const d = el('button', 'carousel__dot');
    d.type = 'button';
    d.setAttribute('role', 'tab');
    d.addEventListener('click', () => go(i));
    dotsWrap.appendChild(d);
    return d;
  });

  function paint() {
    dots.forEach((d, i) => {
      const on = i === index;
      d.classList.toggle('is-on', on);
      d.setAttribute('aria-selected', on ? 'true' : 'false');
      d.tabIndex = on ? 0 : -1;
      d.setAttribute('aria-label', `${t('gem.dot')} ${i + 1}`);
    });
  }

  function go(i) {
    index = (i + slides.length) % slides.length;
    // .carousel__viewport is position:relative, so offsetLeft is already the
    // scroll offset that brings this slide flush to the left edge.
    track.scrollTo({ left: slides[index].offsetLeft, behavior: REDUCED.matches ? 'auto' : 'smooth' });
    paint();
  }

  $('[data-carousel-prev]', root).addEventListener('click', () => go(index - 1));
  $('[data-carousel-next]', root).addEventListener('click', () => go(index + 1));

  track.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(index - 1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); go(index + 1); }
  });

  /* Swiping moves the scroller directly, so read the position back out. */
  const nearest = () => {
    const mid = track.scrollLeft + track.clientWidth / 2;
    let best = 0;
    let bestGap = Infinity;
    slides.forEach((sl, i) => {
      const gap = Math.abs(sl.offsetLeft + sl.clientWidth / 2 - mid);
      if (gap < bestGap) { bestGap = gap; best = i; }
    });
    return best;
  };

  let tick;
  track.addEventListener('scroll', () => {
    clearTimeout(tick);
    tick = setTimeout(() => {
      const near = nearest();
      if (near === index) return;
      index = near;
      paint();
    }, 90);
  }, { passive: true });

  paint();
  if (window.I18N) window.I18N.onChange(paint);
});

/* ---------- 05 · golf cart booking ----------
   The <dialog> and its form live in index.html so Netlify's build bot registers
   the form at deploy time. This only opens the dialog and posts it over fetch,
   so a request never takes the visitor off the page. */
const bkDialog = $('#booking');
if (bkDialog && typeof bkDialog.showModal === 'function') {
  const bkForm = $('#booking-form', bkDialog);
  const bkDone = $('[data-booking-done]', bkDialog);
  const bkAlert = $('[data-booking-error]', bkDialog);
  const bkSend = $('[data-booking-send]', bkDialog);
  const root = document.documentElement;

  const openBooking = () => {
    if (bkDialog.open) return;
    bkDialog.showModal();
    // The page behind is inert but still scrollable, which reads as a bug.
    root.classList.add('is-locked');
  };

  document.querySelectorAll('[data-booking-open]').forEach((trigger) => {
    trigger.addEventListener('click', (e) => { e.preventDefault(); openBooking(); });
  });
  bkDialog.querySelectorAll('[data-booking-close]').forEach((b) => {
    b.addEventListener('click', () => bkDialog.close());
  });

  /* A press on the backdrop lands on the dialog itself; a press anywhere in the
     panel lands on a descendant. */
  bkDialog.addEventListener('click', (e) => { if (e.target === bkDialog) bkDialog.close(); });

  bkDialog.addEventListener('close', () => {
    root.classList.remove('is-locked');
    // Reopening after a sent request should offer a blank form, not the receipt.
    if (!bkDone.hidden) {
      bkDone.hidden = true;
      bkForm.hidden = false;
      bkForm.reset();
      bkForm.classList.remove('is-checked');
      bkAlert.hidden = true;
    }
  });

  /* Native validation blocks the submit event, so the "show me what's missing"
     class has to come off the invalid events instead. */
  bkForm.addEventListener('invalid', () => bkForm.classList.add('is-checked'), true);

  bkForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (bkForm.classList.contains('is-sending')) return;
    bkForm.classList.add('is-sending');
    bkAlert.hidden = true;
    bkSend.textContent = t('bk.sending');

    try {
      // Netlify's form handler sits in front of the site root, and it wants the
      // body urlencoded — not JSON.
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(bkForm)).toString(),
      });
      if (!res.ok) throw new Error(`Booking POST returned ${res.status}`);
      bkForm.hidden = true;
      bkDone.hidden = false;
      $('[data-booking-focus]', bkDone).focus({ preventScroll: true });
    } catch (err) {
      bkAlert.textContent = t('bk.error');
      bkAlert.hidden = false;
      bkAlert.scrollIntoView({ block: 'nearest' });
    } finally {
      bkForm.classList.remove('is-sending');
      bkSend.textContent = t('bk.send');
    }
  });

  if (location.hash === '#booking') openBooking();
} else if (bkDialog) {
  /* Nothing to open the dialog with, so unfold it in place and let the form post
     the classic way rather than leaving row 05 pointing at a hidden element. */
  bkDialog.classList.add('bk--plain');
}

/* ---------- footer year ---------- */
$('#yr').textContent = new Date().getFullYear();
