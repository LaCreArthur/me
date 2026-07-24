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
- **Space Grotesk + JetBrains Mono** (Google Fonts) - display and mono accents
- **Canvas dot-field hero + scroll-driven animations** (`js/portfolio.js`)
- **GitHub Pages** - static hosting under `/me/` (`.nojekyll`, no Jekyll processing)

## Structure

```text
portfolio.md        - SINGLE SOURCE OF TRUTH for the words: homepage + resume copy
                      in readable form, plus a Facts block for values that render in
                      several forms (skate count, role dates)
index.html          - homepage (shipped file, hand-maintained)
resume.html         - printable resume (PDF is rendered from it)
llms.txt            - AI-readable summary, its own readable Markdown surface
resume.pdf          - downloadable resume (rendered from resume.html)
.nojekyll           - serve files as-is, bypass Jekyll
css/
  style.css         - design tokens (:root palette), reset, keyframes, breakpoints
js/
  portfolio.js      - hero letters, scroll reveals, counters, role cycle,
                      nav light/dark flip, skate-panel transition, dot field
img/                - static images and social preview image
fonts/              - bundled fonts (legacy; current page uses Google Fonts)
                      (internal notes moved 2026-07-24 to the private workspace repo at
                      corpus/projects/portfolio/ — plan, profile, and the per-item audit.
                      They were git-ignored here, so they lived on one machine with no
                      backup and never reached the second Mac.)
robots.txt
sitemap.xml
```

The shipped site is plain static HTML/CSS/vanilla JS with no runtime and no build step.

## Editing content (AI-driven)

There is no generator. `portfolio.md` is the readable master; the shipped files are edited
to match it by an agent.

1. Edit the words in `portfolio.md`.
2. Ask the agent to mirror the change into `index.html`, `resume.html`, and (when relevant)
   `llms.txt`. `llms.txt` is already readable Markdown and can also be edited in place; keep
   it aligned with the Facts block in `portfolio.md`.
3. The agent reviews the `git diff` of the shipped files and verifies links before anything
   ships.

Notes for the agent doing the mirror:
- **Facts with several forms.** A few values render in multiple exact spellings (skate count:
  `3x` / `3&times;` / `3×` / `Three-time` / `'24-'26` / JSON-LD award; role tenures: en-dash
  range form in the HTML vs hyphen present-form in `llms.txt`). The Facts block lists every
  form. When a fact changes, expand all of them; this is the one place hand-mirroring drifts.
- **Drift check is the review pass, not a script.** Read `portfolio.md` against each shipped
  file and confirm every block and fact form matches. An independent reviewer (fresh agent)
  is preferred over a self-pass.
- **Link checks are incremental.** Only fetch a URL that is new or changed versus the last
  commit/check. A link that resolved before and has not changed does not need re-fetching;
  diff the URLs first, verify only the delta.

## Local preview

```bash
python3 -m http.server 8080
```

Open `http://127.0.0.1:8080/`.

## Regenerate the resume PDF

When `resume.html` changed, re-render `resume.pdf` with headless Chrome:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless --disable-gpu --no-pdf-header-footer \
  --print-to-pdf=resume.pdf "file://$PWD/resume.html"
```

## Deployment

Push to `master`; GitHub Pages serves the site at `https://lacrearthur.github.io/me/`.
