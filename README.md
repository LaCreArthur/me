<div align="center">

# Arthur Scheidel - Personal Portfolio

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/LaCreArthur/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/arthur-scheidel/)
[![itch.io](https://img.shields.io/badge/itch.io-FA5C5C?style=for-the-badge&logo=itch.io&logoColor=white)](https://lacrearthur.itch.io/)

**Live Site:** [lacrearthur.github.io/me](https://lacrearthur.github.io/me/)  
**Developer:** Arthur Scheidel (LaCreArthur) - founder at Sorolla

</div>

## Overview

Static personal portfolio for Arthur Scheidel: Unity game developer, mobile publishing founder, SDK/playable-ad builder, and indie game creator. Single animated page, dark-mode portfolio that flips to a light-mode "off the screen" skate coda.

## Tech Stack

- **HTML5 / CSS3 / vanilla JavaScript** - static site, no framework, no build step
- **Self-contained `index.html`** - design markup ships as-is, edited by hand
- **Space Grotesk + JetBrains Mono** (Google Fonts) - display and mono accents
- **Canvas dot-field hero + scroll-driven animations** (`js/portfolio.js`)
- **GitHub Pages** - static hosting under `/me/` (`.nojekyll`, no Jekyll processing)

## Structure

```text
content.json        - SINGLE SOURCE OF TRUTH for atomic facts (metrics, dates,
                      skate count, education, role tenures, links, head copy)
templates/          - Design + prose with {{token}} placeholders
  index.html        - homepage template
  resume.html       - resume template
  llms.txt          - AI-summary template
index.html          - GENERATED from templates/index.html + content.json
resume.html         - GENERATED; printable resume (PDF is rendered from it)
llms.txt            - GENERATED AI-readable summary
resume.pdf          - Downloadable resume (rendered from generated resume.html)
.nojekyll           - serve files as-is, bypass Jekyll
css/
  style.css         - Design tokens (:root palette), reset, keyframes, breakpoints
js/
  portfolio.js      - Hero letters, scroll reveals, counters, role cycle,
                      nav light/dark flip, skate-panel transition, dot field
img/                - Static images and social preview image
fonts/              - Bundled fonts (legacy; current page uses Google Fonts)
docs/               - Internal review/build notes (git-ignored, never published)
scripts/
  build.js          - Renders templates + content.json -> the generated surfaces
  check-links.js    - Lightweight public URL checker
  check-facts.js    - Canonical-fact drift guard across the content surfaces
package.json        - build / check:* scripts
robots.txt
sitemap.xml
```

The shipped site is still plain static HTML/CSS/vanilla JS with no runtime step; the
build runs once on your machine before commit. The page was designed in Claude Design and
implemented here off the design runtime as plain HTML + vanilla JS.

## Editing Content

Atomic facts (numbers, dates, skate count, education, role tenures, links, head/SEO copy)
live ONCE in `content.json`. Design and prose live in `templates/`. The root
`index.html` / `resume.html` / `llms.txt` are GENERATED - do not hand-edit them.

- Change a fact: edit `content.json`, then `npm run build`.
- Change design or prose: edit the matching file in `templates/`, then `npm run build`.
- One canonical value derives every surface form (e.g. `skate: {count, seasons}` yields
  `3x` / `3&times;` / `Three-time` / `'24-'26` / the JSON-LD award string).

A few facts that still live inline in templates as prose (the hero paragraph, bio, job
bullets, the long-tail catalogue links) are covered by `npm run check:facts`.

After any change, run `npm run check` (it runs `check:build` to catch a forgotten rebuild,
`check:facts` for prose drift, and `check:links`). Regenerate `resume.pdf` when the résumé
changed.

Regenerate the PDF from `resume.html` with headless Chrome:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless --disable-gpu --no-pdf-header-footer \
  --print-to-pdf=resume.pdf "file://$PWD/resume.html"
```

## Local Preview

```bash
python3 -m http.server 8080
```

Open `http://127.0.0.1:8080/`.

## Checks

```bash
npm run build         # render templates + content.json -> generated surfaces
npm run check:build   # fail if a generated surface is stale (forgot to rebuild)
npm run check:links   # public URL checker
npm run check:facts   # canonical-fact drift guard
npm run check         # all three checks
```

`check:build` re-renders the surfaces and fails if they differ from the committed files,
so a hand-edited generated file or a missed rebuild is caught before push. `check:links`
extracts public URLs and reports real broken links separately from expected third-party
responses such as Formspree GET `405` and LinkedIn bot blocking. `check:facts` asserts the
prose facts that still live inline (games shipped, education, role, skate count/seasons)
stay in agreement across `index.html`, `resume.html`, and `llms.txt`.

## Deployment

Push to `master`; GitHub Pages serves the site at `https://lacrearthur.github.io/me/`.
