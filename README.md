<div align="center">

# Arthur Scheidel - Personal Portfolio

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/LaCreArthur/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/arthur-scheidel/)
[![itch.io](https://img.shields.io/badge/itch.io-FA5C5C?style=for-the-badge&logo=itch.io&logoColor=white)](https://lacrearthur.itch.io/)

**Live Site:** [lacrearthur.github.io/me](https://lacrearthur.github.io/me/)  
**Developer:** Arthur Scheidel (LaCreArthur) - founder at Sorolla

</div>

## Overview

Static personal portfolio for Arthur Scheidel: Unity game developer, mobile publishing founder, SDK/playable-ad builder, and indie game creator.

## Tech Stack

- **HTML5 / CSS3 / JavaScript** - static site, no framework, no runtime rendering
- **Pre-rendered** - `index.html` is generated from `js/data.js` at build time
- **Tailwind CSS** compiled locally - no runtime CDN dependency
- **Roboto** (body, bundled locally) + **JetBrains Mono** (code/metadata accents)
- **Formspree** - contact form
- **GitHub Pages** - static hosting under `/me/` (`.nojekyll`, no Jekyll processing)

## Structure

```text
index.html          - GENERATED static page (do not edit by hand; run the build)
.nojekyll           - serve files as-is, bypass Jekyll
js/
  data.js           - Single source of truth for content, facts, and SEO strings
  components.js      - Pure render functions (used at build time)
  interactive.js     - Client-side progressive enhancement (menu, scroll-spy)
css/
  tailwind-input.css - Tailwind source CSS
  tailwind.css       - Generated utility CSS (committed for GitHub Pages)
  style.css          - Custom visual system, typography, accessibility polish
fonts/roboto/       - Locally bundled body font
img/                - Static images and social preview image
docs/               - Internal review/build notes (git-ignored, never published)
llms.txt            - AI-readable site summary, hand-synced from js/data.js
resume.md           - Resume source
resume.html         - Printable resume source (PDF is generated from it)
resume.pdf          - Downloadable resume
scripts/
  prerender.js      - Generates index.html from data.js + components.js
  check-links.js    - Lightweight public URL checker
package.json        - Build and link-check scripts
tailwind.config.js  - Tailwind content scan config
robots.txt
sitemap.xml
```

## Editing Content

`js/data.js` is the single source of truth. Edit it, then run `npm run build` to
regenerate `index.html` and `css/tailwind.css`. Never edit `index.html` by hand.

When canonical facts change, also hand-sync the surfaces that are not generated:

- `llms.txt` for AI-readable profile facts
- `resume.md`, `resume.html`, and regenerated `resume.pdf` for CV changes

Regenerate the PDF from `resume.html` with headless Chrome:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless --disable-gpu --no-pdf-header-footer \
  --print-to-pdf=resume.pdf "file://$PWD/resume.html"
```

`data/projects.json` was removed because it was unused duplicate content.

## Local Preview

```bash
npm install
npm run build
python3 -m http.server 8080
```

Open `http://127.0.0.1:8080/`.

## Checks

```bash
npm run check:links
```

The checker extracts public URLs from the source files and reports real broken links separately from expected third-party responses such as Formspree GET `405` and LinkedIn bot blocking.

## Deployment

Push to `master`; GitHub Pages serves the site at `https://lacrearthur.github.io/me/`.
