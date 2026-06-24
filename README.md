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
index.html          - The site: full SEO head + the animated page markup
.nojekyll           - serve files as-is, bypass Jekyll
css/
  style.css         - Global reset, keyframes, responsive breakpoints
js/
  portfolio.js      - Hero letters, scroll reveals, counters, role cycle,
                      nav light/dark flip, skate-panel transition, dot field
img/                - Static images and social preview image
fonts/              - Bundled fonts (legacy; current page uses Google Fonts)
docs/               - Internal review/build notes (git-ignored, never published)
llms.txt            - AI-readable site summary, hand-synced from the page
resume.html         - Printable resume source (PDF is generated from it)
resume.pdf          - Downloadable resume (regenerated from resume.html)
scripts/
  check-links.js    - Lightweight public URL checker
  check-facts.js    - Canonical-fact drift guard across the content surfaces
package.json        - check:links / check:facts scripts
robots.txt
sitemap.xml
```

The page was designed in Claude Design and implemented here off the design runtime:
the `<x-dc>` wrapper and `DCLogic` component were converted to plain HTML + vanilla JS.

## Editing Content

`index.html` is hand-edited; there is no generator. Copy and facts live inline in the
markup. When canonical facts change, also hand-sync the surfaces that live outside it:

- `llms.txt` for AI-readable profile facts
- `resume.html`, then a regenerated `resume.pdf`, for CV changes

After a fact change, run `npm run check:facts` to confirm the surfaces still agree (it
guards the facts that have drifted before, e.g. the skate count and the education year).

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
npm run check:links   # public URL checker
npm run check:facts   # canonical-fact drift guard
npm run check         # both
```

`check:links` extracts public URLs from the source files and reports real broken links
separately from expected third-party responses such as Formspree GET `405` and LinkedIn
bot blocking. `check:facts` asserts the shared facts (games shipped, education, role, skate
count/seasons) stay in agreement across `index.html`, `resume.html`, and `llms.txt`.

## Deployment

Push to `master`; GitHub Pages serves the site at `https://lacrearthur.github.io/me/`.
