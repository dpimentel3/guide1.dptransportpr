/* ---------------------------------------------------------------------------
   Language layer — English / Español
   ---------------------------------------------------------------------------
   English lives in index.html (so the page is fully readable with JS off and
   crawlers see real copy). This file only carries the Spanish side plus the
   strings that main.js generates at runtime.

   To add a translatable string:
     1. put data-i18n="some.key" on the element in index.html
     2. add 'some.key' to the ES object below
   For an attribute instead of text content, use
     data-i18n-attrs="content=doc.desc"        (comma-separate multiple pairs)
--------------------------------------------------------------------------- */

window.I18N = (function () {
  'use strict';

  var ES = {
    'doc.title': 'The Culebra Insider Guide — conoce la isla como un local en 9 minutos',
    'doc.desc': 'The Culebra Insider Guide: un video de 9 minutos sobre Culebra, Puerto Rico — el ferry, Playa Flamenco antes del gentío, el mejor snorkeling y cómo irte sin esperar cuatro horas.',

    'a11y.skip': 'Ir al video',
    'a11y.lang': 'Idioma',
    'a11y.sections': 'Secciones',

    'nav.film': 'El video',
    'nav.chapters': 'Capítulos',
    'nav.plan': 'Planifica',
    'nav.questions': 'Preguntas',
    'nav.watch': 'Verlo',

    'hero.pill': 'The Culebra Insider Guide · Puerto Rico',
    'hero.title.lead': 'Cómo Vivir Culebra',
    'hero.title.accent': 'Como un Local',
    'hero.sub': 'Nueve minutos de lo que le diríamos a un amigo que llega mañana: a qué playa ir primero, dónde el agua está lo suficientemente calmada para el mejor snorkeling, y los errores que le cuestan a la gente medio día.',
    'hero.cta1': 'Ver la guía de 9 minutos',
    'hero.cta2': 'Ver qué incluye',

    'meta.runtime.k': 'Duración',
    'meta.runtime.v': '9 minutos',
    'meta.chapters.k': 'Capítulos',
    'meta.covers.k': 'Incluye',
    'meta.covers.v': 'Ferry, playas, snorkeling, transporte',

    'sec.01': '01 — El video',
    'video.title': 'Dale play. Después empaca.',
    'player.cap': 'Filmado en la isla: Dewey, Flamenco, Tamarindo y la carretera entre medio.',

    'band.lede.a': 'Culebra es lo suficientemente pequeña para verla en un día y lo suficientemente fácil de arruinar. ',
    'band.lede.b': 'La mayoría se pasa las primeras tres horas averiguando lo que un local sabe antes del desayuno',
    'band.lede.c': ': la fila del ferry, las reglas de los carritos de golf, qué lado de Flamenco tiene sombra al mediodía.',
    'band.note': 'Esta guía es el atajo. Nada de vlogs de 40 minutos ni tomas de dron con música. Solo la ruta, los tiempos y las direcciones, en el orden en que de verdad los vas a necesitar.',

    'sec.02': '02 — Dentro del video',
    'chapters.title': 'Ocho capítulos, nueve minutos, cero relleno.',
    'chapters.blurb': 'Cada marca de tiempo aquí abajo es una decisión que vas a tener que tomar en la isla. Nosotros las tomamos por ti y filmamos la respuesta.',

    'ch.1.t': 'Llegar sin perder la mañana',
    'ch.1.d': 'El ferry de Ceiba contra el vuelo de 12 minutos desde Isla Grande, y la hora límite que lo decide.',
    'ch.2.t': 'Playa Flamenco antes del gentío',
    'ch.2.d': 'Dónde estacionarte, qué extremo de la arena mantiene la sombra y por qué el lado izquierdo vale la caminata.',
    'ch.3.t': 'Los tanques pintados',
    'ch.3.d': 'Qué hacen en una playa del Caribe, y el desvío de dos minutos que casi nadie toma.',
    'ch.4.t': 'Tamarindo, para el mejor snorkeling',
    'ch.4.d': 'Agua calmada, yerba marina, tortugas — y la etiqueta que evita que espantes lo que viniste a ver.',
    'ch.5.t': 'Zoni y Playa Brava',
    'ch.5.d': 'El camino largo por la isla: cómo está la carretera, dónde se puede nadar y cuándo mejor ni ir.',
    'ch.6.t': 'Comer como si vivieras aquí',
    'ch.6.d': 'Los kioskos, los sitios del muelle y los horarios que sorprenden a la gente un lunes.',
    'ch.7.t': 'Carritos de golf, gasolina y la cuesta',
    'ch.7.d': 'Las reglas del alquiler, dónde echar gasolina y la bajada que se come los frenos.',
    'ch.8.t': 'Irte sin la fila de cuatro horas',
    'ch.8.d': 'La realidad del ferry de vuelta que nadie le avisa a los que van por el día, y cómo adelantarte.',

    'sec.03': '03 — Antes de ir',
    'links.title': 'Todo lo demás que vas a necesitar',
    'links.blurb': 'Boletos, transporte y el mapa — las partes del viaje que pasan antes de que pises la arena.',
    'link.1.t': 'Compra el ferry Ceiba–Culebra',
    'link.1.b': 'Comprar boletos',
    'link.2.t': 'Transporte hacia/desde el Terminal de Ceiba',
    'link.2.b': 'Reservar transporte',
    'link.3.t': 'Mapa de Culebra con el punto de partida marcado',
    'link.3.b': 'Abrir',
    'link.4.t': 'Lista de taxis de Culebra con números de teléfono',
    'link.4.b': 'Descargar',
    'link.5.t': 'Alquiler de carritos de golf y Jeeps',
    'link.5.b': 'Alquilar',

    'sec.04': '04 — Preguntas',
    'faq.title': 'Las que más nos hacen',
    'faq.1.q': '¿Se puede hacer Culebra en un día?',
    'faq.1.a': 'Sí, y el video está armado alrededor de esa versión del día.',
    'faq.2.q': 'Cuánto dura el viaje en ferry',
    'faq.2.a': 'De 50 minutos a una hora y 10 minutos. La ida a Culebra puede estar movida dependiendo del mar, pero la vuelta suele ser más suave.',
    'faq.3.q': '¿Necesito alquilar un carrito de golf?',
    'faq.3.a': 'Para Flamenco solamente, no. Para cualquier cosa más allá, sí.',
    'faq.4.q': '¿Cómo consigo el video?',
    'faq.4.a': 'Se ve aquí mismo en esta página — nada que instalar, nada que descargar. Guárdala en tus marcadores y ábrela otra vez cuando estés en la isla.',

    'cta.title': 'Nueve minutos ahora, un día mucho mejor después.',
    'cta.sub': 'Empieza la guía y planifica el resto del viaje con los enlaces de arriba.',
    'cta.btn': 'Ver la guía',

    /* strings rendered by main.js */
    'player.empty.title': 'El video va aquí',
    'player.empty.body': 'Nueve minutos, ocho capítulos, subiéndose ahora. El reproductor aparece en este marco tan pronto esté listo.',
    'player.play': 'Ver el video',
    'player.playAria': 'Reproducir el video',
    'player.posterAlt': 'Portada del video',
    'player.chapterAria': 'Saltar al capítulo',
    'player.iframeTitle': 'The Culebra Insider Guide — la guía completa de 9 minutos'
  };

  /* English for the strings main.js builds — the DOM has no copy of these. */
  var EN = {
    'player.empty.title': 'The film lands here',
    'player.empty.body': 'Nine minutes, eight chapters, currently uploading. The player appears in this frame the moment it goes live.',
    'player.play': 'Watch the film',
    'player.playAria': 'Play the film',
    'player.posterAlt': 'Video cover image',
    'player.chapterAria': 'Jump to chapter',
    'player.iframeTitle': 'The Culebra Insider Guide — the full 9-minute guide'
  };

  var STORE = 'culebra-lang';
  var lang = 'en';
  var saved = new WeakMap();      // element -> { text, attrs }
  var listeners = [];

  function t(key) {
    if (lang === 'es' && ES[key] != null) return ES[key];
    return EN[key] != null ? EN[key] : key;
  }

  function parseAttrs(spec) {
    return spec.split(',').map(function (pair) {
      var i = pair.indexOf('=');
      return { attr: pair.slice(0, i).trim(), key: pair.slice(i + 1).trim() };
    }).filter(function (p) { return p.attr && p.key; });
  }

  /* Remember the English already in the document the first time we see a node,
     so switching back to English never needs a duplicate English dictionary. */
  function remember(el) {
    if (saved.has(el)) return saved.get(el);
    var rec = { text: el.textContent, attrs: {} };
    var spec = el.getAttribute('data-i18n-attrs');
    if (spec) {
      parseAttrs(spec).forEach(function (p) { rec.attrs[p.attr] = el.getAttribute(p.attr); });
    }
    saved.set(el, rec);
    return rec;
  }

  function apply(root) {
    var scope = root || document;

    scope.querySelectorAll('[data-i18n]').forEach(function (el) {
      var rec = remember(el);
      var key = el.getAttribute('data-i18n');
      el.textContent = (lang === 'es' && ES[key] != null) ? ES[key] : rec.text;
    });

    scope.querySelectorAll('[data-i18n-attrs]').forEach(function (el) {
      var rec = remember(el);
      parseAttrs(el.getAttribute('data-i18n-attrs')).forEach(function (p) {
        var val = (lang === 'es' && ES[p.key] != null) ? ES[p.key] : rec.attrs[p.attr];
        if (val != null) el.setAttribute(p.attr, val);
      });
    });

    // <title> carries data-i18n too, so the loop above already swapped it.
    if (!root) document.documentElement.lang = lang;
  }

  function set(next, persist) {
    if (next !== 'es') next = 'en';
    lang = next;
    apply();
    document.querySelectorAll('.langs__btn').forEach(function (b) {
      var on = b.dataset.lang === lang;
      b.classList.toggle('is-on', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    if (persist !== false) { try { localStorage.setItem(STORE, lang); } catch (e) {} }
    listeners.forEach(function (fn) { fn(lang); });
  }

  function init() {
    var pick = null;
    try { pick = localStorage.getItem(STORE); } catch (e) {}
    if (pick !== 'en' && pick !== 'es') {
      // First visit: follow the browser, since a lot of this audience reads Spanish first.
      pick = /^es\b/i.test(navigator.language || '') ? 'es' : 'en';
    }
    set(pick, false);

    document.querySelectorAll('.langs__btn').forEach(function (b) {
      b.addEventListener('click', function () { set(b.dataset.lang, true); });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }

  return {
    t: t,
    apply: apply,
    get lang() { return lang; },
    onChange: function (fn) { listeners.push(fn); }
  };
})();
