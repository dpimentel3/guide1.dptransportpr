# The Culebra Insider Guide — landing page

Static landing page for the 11-minute Culebra video guide, in English and
Spanish. No build step: plain HTML, CSS and two JS files, published from the
repo root.

```
index.html          markup for every section (English copy lives here)
styles.css          all styling (design tokens live in :root)
i18n.js             Spanish dictionary + the language switcher
main.js             video player + scroll behaviour
assets/img/         hero photo + the Mamacitas carousel shots
assets/video/       drop a self-hosted .mp4 here
```

## The video

The film is hosted on Bunny Stream and set in the `VIDEO` block at the top of
`main.js`:

```js
const VIDEO = {
  source: 'https://player.mediadelivery.net/embed/739813/a132d605-58d1-4675-bb40-fe89eb8a6e74',
  poster: '/assets/img/culebra-flamenco.jpg',
};
```

Bunny Stream, YouTube, Vimeo and self-hosted `.mp4` / `.webm` all work. While
`source` is empty the player frame shows a "coming soon" state instead of
breaking. The same embed is repeated inside a `<noscript>` in `index.html`, so
the film still plays with JavaScript switched off.

The chapter timecodes on the page are clickable and jump straight to that
moment. For Bunny that goes over the Player.js protocol once the film is
playing, and otherwise reloads the embed with `?t=<seconds>`, which Bunny
honours as a start time.

### When the film is re-cut

Three things have to agree, and nothing checks them for you:

1. the seven chapter marks in the Bunny library,
2. the `.chapter` timecodes and copy in `index.html` (plus their `ch.N.*`
   Spanish strings in `i18n.js`),
3. the runtime and chapter count quoted in the hero, the chapters heading and
   the meta tags.

Bunny's own chapter list is readable from the embed page — the `chapters:`
array in the HTML at `https://iframe.mediadelivery.net/embed/<library>/<id>`.

### Vertical film

This film is shot vertically (1436×1920). `.player__frame` in `styles.css` is
therefore a 16:9 *stage* with a blurred island wash, and `.player__slot` sits
centred inside it at the film's own 3:4 shape; below 760px the frame just takes
the film's shape and the player fills it. If a future film is landscape, drop
the `aspect-ratio` on `.player__slot` and let it fill the frame again.

## English / Spanish

English is written directly into `index.html`, so the page reads correctly with
JavaScript disabled and search engines index real copy. `i18n.js` holds only the
Spanish side.

To make a new piece of text translatable:

1. Add `data-i18n="some.key"` to the element in `index.html`.
2. Add `'some.key': '…'` to the `ES` object in `i18n.js`.

For an attribute rather than the text content, use
`data-i18n-attrs="content=doc.desc"` (comma-separate several pairs). Strings that
JavaScript builds at runtime — the player labels — live in both the `ES` and `EN`
objects in `i18n.js` and are fetched with `I18N.t('key')`.

The switcher remembers the visitor's choice in `localStorage`. On a first visit
with no saved choice it follows the browser language, so a Spanish-language
browser lands on the Spanish page.

## Golf cart booking

Row `05` of "Everything else you'll need" opens a booking form instead of
linking out. The form is a native `<dialog id="booking">` sitting at the foot of
`index.html`, styled in the `05 · golf cart booking dialog` block of
`styles.css` and driven by the block of the same name in `main.js`.

Submissions go to **Netlify Forms** under the form name `golf-cart-booking`, so
there is no backend to run — they land in *Project configuration > Forms* and an
email notification can be switched on under *Notifications*. `main.js` posts it
over `fetch` and shows a receipt inside the dialog, so nobody leaves the page.

Two things to know before editing it:

- The `<form>` has to stay in the static markup. Netlify's build bot parses HTML
  at deploy time to register the form; a form built in JavaScript is never
  detected and its submissions 404.
- Every field name in the markup is the column name in the submissions export,
  and both `name` and `email` are special — Netlify uses `email` as the reply-to
  address.

With JavaScript off there is no `showModal()`, so a `<noscript>` rule in `<head>`
turns the dialog into a plain section at the end of the page and the form posts
the classic way.

The form asks for a driver's license number and a date of birth. That is what a
rental agreement needs, but it does mean the submissions store personal data —
worth keeping in mind before wiring the notifications up to anywhere public.

## Swapping in photos

Replace the file in `assets/img/` and update the matching `<img src>` (and the
`<link rel="preload">` in `<head>`) in `index.html`. Images are served through
the Netlify Image CDN (`/.netlify/images?url=…&w=…&q=…`) so there is nothing to
resize by hand.

## Local preview

```
netlify dev --port 8889
```
