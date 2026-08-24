# The Culebra Insider Guide — landing page

Static landing page for the nine-minute Culebra video guide, in English and
Spanish. No build step: plain HTML, CSS and two JS files, published from the
repo root.

```
index.html          markup for every section (English copy lives here)
styles.css          all styling (design tokens live in :root)
i18n.js             Spanish dictionary + the language switcher
main.js             video player + scroll behaviour
assets/img/         hero photo
assets/video/       drop a self-hosted .mp4 here
```

## Adding the 9-minute video

Open `main.js` and set `source` in the `VIDEO` block at the top:

```js
const VIDEO = {
  source: 'https://youtu.be/XXXXXXXXXXX',   // or '/assets/video/culebra-guide.mp4'
  poster: '/assets/img/culebra-flamenco.jpg',
  duration: '9:00',
};
```

YouTube, Vimeo, and self-hosted `.mp4` / `.webm` all work. While `source` is
empty the player frame shows a "coming soon" state instead of breaking.

Once a video is set, the chapter timecodes on the page become clickable and
jump straight to that moment.

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

## Links that still need a destination

Two rows in the "Everything else you'll need" section point at `#` and are
marked with a `TODO` comment in `index.html`:

- `04` Culebra taxi list with phone numbers — needs the PDF
- `05` Golf cart and Jeep rental — needs the booking page

## Swapping in photos

Replace the file in `assets/img/` and update the matching `<img src>` (and the
`<link rel="preload">` in `<head>`) in `index.html`. Images are served through
the Netlify Image CDN (`/.netlify/images?url=…&w=…&q=…`) so there is nothing to
resize by hand.

## Local preview

```
netlify dev --port 8889
```
