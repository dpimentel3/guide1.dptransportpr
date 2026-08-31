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
    'doc.title': 'The Culebra Insider Guide — conoce la isla como un local en 11 minutos',
    'doc.desc': 'The Culebra Insider Guide: un video de 11 minutos sobre Culebra, Puerto Rico — el ferry de Ceiba, el muelle de Dewey, Playa Flamenco y los tanques pintados, y qué hacer cuando el ferry está agotado.',

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
    'hero.sub': 'Once minutos de lo que le diríamos a un amigo que llega mañana: cómo corre de verdad el día del ferry, cuánto cuesta Flamenco una vez pasas el portón, y los errores que le cuestan a la gente medio día.',
    'hero.cta1': 'Ver la guía de 11 minutos',
    'hero.cta2': 'Ver qué incluye',

    'meta.runtime.k': 'Duración',
    'meta.runtime.v': '11 minutos',
    'meta.chapters.k': 'Capítulos',
    'meta.covers.k': 'Incluye',
    'meta.covers.v': 'Ferry, Flamenco, los tanques, cómo moverte',

    'sec.01': '01 — El video',
    'video.title': 'Dale play. Después empaca.',

    'band.lede.a': 'Culebra es lo suficientemente pequeña para verla en un día y lo suficientemente fácil de arruinar. ',
    'band.lede.b': 'La mayoría se pasa las primeras tres horas averiguando lo que un local sabe antes del desayuno',
    'band.lede.c': ': la fila del ferry, las reglas de los carritos de golf, qué lado de Flamenco tiene sombra al mediodía.',
    'band.note': 'Esta guía es el atajo. Nada de vlogs de 40 minutos ni tomas de dron con música. Solo la ruta, los tiempos y las direcciones, en el orden en que de verdad los vas a necesitar.',

    'sec.02': '02 — Dentro del video',
    'chapters.title': 'Siete capítulos, once minutos, cero relleno.',
    'chapters.blurb': 'Cada marca de tiempo aquí abajo entra directo al video. Dale a cualquiera y el reproductor sigue desde ese momento.',

    'ch.1.t': 'El terminal del ferry en Ceiba',
    'ch.1.d': 'Dónde te deja la van, dónde queda de verdad el área de recogido, la carpa de espera, y por qué no debes contar con que aparezca un Uber por allá.',
    'ch.2.t': 'El viaje en ferry',
    'ch.2.d': 'Cómo es la cabina durante la travesía, y el primer vistazo a la isla cuando la lancha entra al muelle.',
    'ch.3.t': 'Al bajar en el muelle de Culebra',
    'ch.3.d': 'Entrando a Culebra: las vans de taxi esperando en el portón, cuánto cuesta un asiento, y las tiendas para lo que se te quedó.',
    'ch.4.t': 'Playa Flamenco',
    'ch.4.d': 'Los $2 que cobran por las facilidades, lo que alquilan los kioskos — sillas, sombrillas, equipo de snorkel — y cómo está organizada la playa una vez entras.',
    'ch.5.t': 'Los tanques de la Marina',
    'ch.5.d': 'Los tanques pintados al final de Flamenco, y el equipo que tienes que llevar tú si piensas hacer snorkel en otra playa.',
    'ch.6.t': 'El aeropuerto y los alquileres',
    'ch.6.d': 'La vuelta pasando por el aeropuerto de Culebra, y cómo reservar un carrito de golf o un Jeep con tiempo te saca a los taxis de la ecuación.',
    'ch.7.t': 'Boletos del ferry y la vuelta',
    'ch.7.d': 'Qué hacer cuando los boletos del ferry aparecen agotados en línea, y la movida en la boletería que te puede montar en una salida más tarde.',

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
    'link.5.t': 'Alquiler de carritos de golf',
    'link.5.b': 'Alquilar',
    'link.6.t': 'Bonus: Joya Escondida',
    'link.6.b': 'Échale un vistazo',

    /* booking dialog */
    'bk.eyebrow': '05 — Alquiler de carritos de golf',
    'bk.title': 'Reserva un carrito de golf',
    'bk.sub': 'Llena esto una sola vez y el proveedor de carritos de golf se pondrá en contacto contigo.',
    'bk.close': 'Cerrar el formulario',
    'bk.leg.driver': 'Quien conduce',
    'bk.leg.licence': 'Licencia de conducir',
    'bk.leg.address': 'Dirección',
    'bk.leg.arrival': 'Cómo llegas a la isla',
    'bk.f.name': 'Nombre completo',
    'bk.f.age': 'Edad',
    'bk.f.dob': 'Fecha de nacimiento',
    'bk.f.phone': 'Teléfono',
    'bk.f.email': 'Correo electrónico',
    'bk.f.licence': 'Número de licencia de conducir',
    'bk.f.licence.ph': 'Tal como aparece en la licencia',
    'bk.f.expiry': 'Fecha de expiración',
    'bk.f.address': 'Calle y número',
    'bk.f.city': 'Ciudad',
    'bk.f.postal': 'Código postal',
    'bk.f.country': 'País',
    'bk.f.arrival': 'Por dónde llegas',
    'bk.f.pier': 'Muelle — Terminal de lanchas',
    'bk.f.airport': 'Aeropuerto — Benjamín Rivera Noriega',
    'bk.f.comment': 'Comentario (opcional)',
    'bk.f.comment.ph': 'Las fechas que quieres el carrito, a qué hora llegas, si va a conducir alguien más.',
    'bk.note': 'Los datos de la licencia van en el contrato de alquiler y en ningún otro sitio. Aquí no se cobra nada — el pago se hace al recoger el carrito.',
    'bk.send': 'Enviar la solicitud',
    'bk.sending': 'Enviando…',
    'bk.error': 'No se pudo enviar. Revisa la conexión e inténtalo otra vez.',
    'bk.done.title': 'Solicitud recibida',
    'bk.done.body': 'Contestamos por correo en menos de un día, casi siempre antes. La respuesta lleva el punto de recogida, la hora y la tarifa, así que mantente pendiente del correo que nos diste.',
    'bk.done.btn': 'Cerrar',

    'gem.name': 'Mamacitas Bar and Grill',
    'gem.desc': 'Ubicado dentro de Mamacitas Guest House y justo al borde del canal, Mamacitas Bar & Grill ofrece una experiencia relajada frente al agua en pleno corazón de Culebra. Disfruta de platos de inspiración caribeña, mariscos frescos, cócteles y favoritos locales mirando el agua, en un ambiente casual al aire libre. Llega cerca del atardecer o quédate hasta la noche, cuando las luces sobre el agua crean uno de los ambientes más acogedores de la isla. Tiene un par de opciones veganas.',
    'gem.fare.k': 'Taxi',
    'gem.fare.v': '$5 por persona',
    'gem.carousel': 'Fotos de Mamacitas Bar & Grill',
    'gem.dots': 'Elige una foto',
    'gem.prev': 'Foto anterior',
    'gem.next': 'Foto siguiente',
    'gem.dot': 'Ir a la foto',
    'gem.slide.1': 'Foto 1 de 7',
    'gem.slide.2': 'Foto 2 de 7',
    'gem.slide.3': 'Foto 3 de 7',
    'gem.slide.4': 'Foto 4 de 7',
    'gem.slide.5': 'Foto 5 de 7',
    'gem.slide.6': 'Foto 6 de 7',
    'gem.slide.7': 'Foto 7 de 7',
    'gem.alt.1': 'La terraza de Mamacitas junto al canal en una tarde despejada, con motoras acuáticas pasando frente al muelle.',
    'gem.alt.2': 'Atardecer sobre el canal de Dewey con una lancha amarrada al lado de la terraza al aire libre.',
    'gem.alt.3': 'Mamacitas iluminado al anochecer, visto desde el otro lado del agua.',
    'gem.alt.4': 'Sábalos dando vueltas bajo las luces verdes del agua junto a la terraza de noche.',
    'gem.alt.5': 'La fachada rosada y verde de Mamacitas Guest House en una calle de Dewey.',
    'gem.alt.6': 'La pizarra con el menú de comida de Mamacitas Bar & Grill.',
    'gem.alt.7': 'La pizarra con el menú de bar de Mamacitas, con tragos y cócteles.',

    'sec.04': '04 — Preguntas',
    'faq.title': 'Las que más nos hacen',
    'faq.1.q': '¿Se puede hacer Culebra en un día?',
    'faq.1.a': 'Sí, y el video está armado alrededor de esa versión del día.',
    'faq.2.q': 'Cuánto dura el viaje en ferry',
    'faq.2.a': 'De 50 minutos a una hora y 10 minutos. La ida a Culebra puede estar movida dependiendo del mar, pero la vuelta suele ser más suave.',
    'faq.3.q': '¿Necesito alquilar un carrito de golf o un Jeep?',
    'faq.3.a': 'Para Flamenco solamente, no. Para cualquier cosa más allá, sí.',
    'faq.4.q': '¿Cómo consigo el video?',
    'faq.4.a': 'Se ve aquí mismo en esta página — nada que instalar, nada que descargar. Guárdala en tus marcadores y ábrela otra vez cuando estés en la isla.',

    'cta.title': 'Once minutos ahora, un día mucho mejor después.',
    'cta.sub': 'Empieza la guía y planifica el resto del viaje con los enlaces de arriba.',
    'cta.btn': 'Ver la guía',

    /* strings rendered by main.js */
    'player.empty.title': 'El video va aquí',
    'player.empty.body': 'Once minutos, siete capítulos, subiéndose ahora. El reproductor aparece en este marco tan pronto esté listo.',
    'player.play': 'Ver el video',
    'player.playAria': 'Reproducir el video',
    'player.posterAlt': 'Portada del video',
    'player.chapterAria': 'Saltar al capítulo',
    'player.iframeTitle': 'The Culebra Insider Guide — la guía completa de 11 minutos'
  };

  /* English for the strings main.js builds — the DOM has no copy of these. */
  var EN = {
    'player.empty.title': 'The film lands here',
    'player.empty.body': 'Eleven minutes, seven chapters, currently uploading. The player appears in this frame the moment it goes live.',
    'player.play': 'Watch the film',
    'player.playAria': 'Play the film',
    'player.posterAlt': 'Video cover image',
    'player.chapterAria': 'Jump to chapter',
    'player.iframeTitle': 'The Culebra Insider Guide — the full 11-minute guide',
    'gem.dot': 'Go to photo',
    'bk.send': 'Send the request',
    'bk.sending': 'Sending\u2026',
    'bk.error': 'That did not go through. Check your connection and send it again.'
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
