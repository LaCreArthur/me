# Portfolio Audit and Roadmap - 2026-06-23

Scope: `/Users/arthur/web/me`, deployed at `https://lacrearthur.github.io/me/`.
Verification date: June 23, 2026.

This audit covers content freshness, live links, repo/source-of-truth structure, SEO metadata, resume/CV state, design direction, and implementation roadmap. It does not implement fixes. It gives priorities, confidence scores, and the evidence needed for the implementation pass.

## Executive Summary

The page is not just stale. It is split across multiple contradictory sources of truth.

The highest-impact problem is URL/canonical drift: the deployed site is under `/me/`, but metadata, README, resume links, structured data, and Formspree redirect point to root `/`, which currently returns 404. The second highest-impact problem is content drift: the public page says "Founder at Sorolla", while `resume.pdf` is an image-style one-page CV last updated February 21, 2025 and still positions Arthur as "Lead Unity & Full Stack Developer". The third problem is trust: several public links in the portfolio are dead or redirect to unexpected destinations, while the visual design over-indexes on terminal/brutalist styling and under-indexes on concrete proof.

Recommended direction: keep the site static, but make `js/data.js` or a new structured data file the single content owner, regenerate or manually sync `index.html`, `llms.txt`, and the resume from it, fix deployment paths to `/me/`, replace dead store/archive links with verified project detail pages or local proof, and redesign the first viewport around current positioning and proof rather than a retro terminal identity.

## Evidence Snapshot

### Local Repo State

- Branch: `master` at `9b9baa2`, tracking `origin/master`.
- Tracked source files match `origin/master`; `docs/` is untracked because this audit file is new.
- Latest commit: `9b9baa2 update: current role (Sorolla founder), timeline, Happy Snake 3D, fix resume URL, SEO polish`.
- Important contradiction: that commit claims resume URL polish, but the live generated buttons still point to `https://lacrearthur.github.io/resume.pdf`, which returns 404.

### Live URL Checks

Checked with `curl -L -A 'Mozilla/5.0'` on June 23, 2026.

| URL | Result | Interpretation | Confidence |
|---|---:|---|---:|
| `https://lacrearthur.github.io/` | 404 | Root is not the live site. | 0.99 |
| `https://lacrearthur.github.io/home/` | 404 | Old resume/README path is dead. | 0.99 |
| `https://lacrearthur.github.io/me/` | 200 | Actual deployed site. | 0.99 |
| `https://lacrearthur.github.io/resume.pdf` | 404 | Current nav/hero resume links are broken. | 0.99 |
| `https://lacrearthur.github.io/me/resume.pdf` | 200 | Correct deployed resume URL. | 0.99 |
| `https://lacrearthur.github.io/img/logo.png` | 404 | Current OG/Twitter image URL is broken. | 0.99 |
| `https://lacrearthur.github.io/me/img/logo.png` | 200 | Correct deployed image URL. | 0.99 |
| `https://lacrearthur.github.io/img/id2018.jpg` | 404 | Current JSON-LD profile image URL is broken. | 0.99 |
| `https://lacrearthur.github.io/me/img/id2018.jpg` | 200 | Correct deployed profile image URL. | 0.99 |

### External Link Checks

| Link | Result | Interpretation | Priority | Confidence |
|---|---:|---|---|---:|
| Dogecoin App Store URL | 404 | Featured project primary store link is dead. | P0 | 0.95 |
| Farm Run Google Play URL | 404 | Archive mobile game link is dead. | P1 | 0.95 |
| Mine Block App Store URL | 404 | Archive mobile game link is dead in the latest direct check. | P1 | 0.9 |
| Find-it 3D App Store URL | 404 | Archive mobile game link is dead. | P1 | 0.95 |
| Don't Fall Guys App Store URL | 404 | Archive mobile game link is dead. | P1 | 0.95 |
| Snap Guys App Store URL | 404 | Archive mobile game link is dead. | P1 | 0.95 |
| Happy Snake 3D GitHub URL | 404 | Archive tools link is dead or repo is private/moved. | P1 | 0.95 |
| X profile URL | 404 | Footer/social link is dead or handle changed. | P1 | 0.95 |
| LinkedIn profile | 999 | LinkedIn bot-blocking, not proof of broken profile. | P3 | 0.35 |
| Sorolla Palette old URL | 200, redirects to `github.com/sorolla-studio/sorolla-palette` | Link works but should be updated to canonical repo. | P2 | 0.9 |
| Dogecoin GitHub URL | 200, redirects to `LaCreArthur/doge-to-mars-gh-page` | Link works but label/repo target may be stale. | P2 | 0.85 |

### Local Validation Checks

- JSON-LD in `index.html` parses as valid JSON.
- `js/data.js` evaluates and exposes `DATA`; `js/components.js` parses as JavaScript.
- A broader URL extraction across `index.html`, `js/data.js`, `README.md`, `llms.txt`, and `data/projects.json` confirmed the dead public links listed above; most other external references returned 200. The Formspree endpoint returned 405 to a GET request, which is expected for a form action and is not treated as a broken link.
- `resume.pdf` is a PDF 1.7 file; `mdls` reports title `Arthur Scheidel - CV`, one page, size 1,136,719 bytes, and no indexed text content.
- A Quick Look thumbnail of `resume.pdf` was generated and used for visual inspection of the CV content.

## Findings

### P0 - Fix Deployment URL and Broken Resume/Metadata Paths

Current source points to root:

- `index.html`: OG URL, Twitter image, canonical, JSON-LD `@id`, `url`, and `image` use `https://lacrearthur.github.io/`.
- `js/data.js`: `meta.url`, `meta.ogImage`, `nav.resumeUrl`, hero resume CTA, and form redirect use root.
- `README.md`: live site link uses root.
- `llms.txt`: website uses root.

But the live site is `/me/`. Root returns 404.

Recommended fix:

- Define `siteUrl = "https://lacrearthur.github.io/me/"`.
- Use `https://lacrearthur.github.io/me/resume.pdf` for resume links.
- Use `https://lacrearthur.github.io/me/img/logo.png` and `https://lacrearthur.github.io/me/img/id2018.jpg` for social/schema images.
- Use `/me/` as canonical unless the repo is moved to a true user site at root.
- Change Formspree `_next` redirect to `/me/`.

Priority: P0
Confidence: 0.99
Effort: S
Evidence: live curl checks; `index.html` lines 10-17 and 28-34; `js/data.js` lines 10-21, 36, and 209; `README.md` line 10; `llms.txt` line 118.

### P0 - Update or Replace the Stale Resume

`resume.pdf` is present and deployed, but it is an image-style PDF with no extractable text layer. `mdls` reports title "Arthur Scheidel - CV", one page, and no `kMDItemTextContent`. Quick Look thumbnail inspection shows:

- Updated: February 21, 2025.
- Title: "Lead Unity & Full Stack Developer".
- Includes YourArt, Yumon, CARFT, Ubisoft/Ketchapp, Celsius Online, and independent Bretzel Studio work.
- Does not include Sorolla as current founder/publisher.
- Uses older site URL `lacrearthur.github.io/home`.

Recommended fix:

- Rebuild the CV from the current source stack: old resume for exact historical dates and bullets, `llms.txt` for current positioning, `js/data.js` for site-visible highlights, workspace notes for Sorolla/SDK/current 2026 work.
- Generate a real text-layer PDF and an adjacent Markdown/HTML source, not only a rendered image.
- Keep one short public CV for recruiter/client use. Do not overload it with every side project.

Priority: P0
Confidence: 0.95
Effort: M
Evidence: `resume.pdf` metadata and thumbnail inspection; deployed `/me/resume.pdf` returns 200; current site copy contradicts PDF.

### P0 - Decide the Actual Positioning

The site currently mixes at least three identities:

- "Game Developer & Founder" in the page title and `llms.txt`.
- "UNITY DEVELOPER WHO SHIPS" in the hero.
- "Lead Unity & Full Stack Developer" in the PDF.
- "CTO at Web3 startups" in the hero despite current Sorolla publishing focus.

This is not a harmless copy issue. It changes who the page is for:

- Recruiter/client portfolio: emphasize Unity lead, shipped games, SDKs, WebGL, mobile pipelines.
- Founder/company credibility: emphasize Sorolla, SDK, publishing platform, market intelligence, playable ads.
- Personal brand: emphasize skate/content/AI/game dev intersection.

Recommended fix:

- Choose primary audience for the first viewport.
- Suggested current first viewport: "Arthur Scheidel - Unity game developer and mobile publishing founder".
- Keep Web3 as historical experience, not the headline category.
- Keep skateboarding as a human signal in About, not a top hero proof point unless the page is rebuilt as a personal brand hub.

Priority: P0
Confidence: 0.9
Effort: M
Evidence: `index.html` title/meta, `js/data.js` hero/about, `llms.txt` summary, `resume.pdf`.

### P1 - Remove Dead Store Links or Replace Them With Owned Proof

Several store links are dead. This undermines the "projects that shipped" claim more than it helps.

Recommended fix:

- For removed store listings, do not keep dead outbound links.
- Replace dead store links with owned proof pages: screenshots, trailer, archived listing screenshots, GitHub, itch.io, or a short case-study page.
- Convert the archive mobile grid from "old store badges" into "shipped work evidence": title, role, year, contribution, proof link.

Priority: P1
Confidence: 0.95
Effort: M
Evidence: external link checks; `js/data.js` lines 76 and 139-143; `data/projects.json` line 48.

### P1 - Fix Happy Snake 3D Link and Decide Whether It Is Public

The site links `https://github.com/LaCreArthur/happy-snake-3d`, which returns 404. The project is also used in `llms.txt` as a featured current proof point.

Recommended fix:

- If the repo is private, either remove the public GitHub link or replace it with a live playable/demo/video.
- If it moved, update the link.
- If Sorolla confidentiality applies, present it as "playable ad case study" without public source.

Priority: P1
Confidence: 0.95
Effort: S
Evidence: external link check; `js/data.js` line 153; `llms.txt` lines 55-60.

### P1 - Collapse the Content Sources

The current site has at least six content surfaces:

- `js/data.js`: runtime site content.
- `index.html`: metadata and JSON-LD.
- `llms.txt`: AI-readable profile.
- `resume.pdf`: downloadable CV.
- `data/projects.json`: reference data, not runtime.
- `README.md`: live URL and project description.

They disagree. This is the mechanism that created the stale page.

Recommended fix:

- Pick one owner for profile/project facts.
- Minimal option: make `js/data.js` the owner and delete `data/projects.json` if it remains unused.
- Better option: create `data/profile.json` and `data/projects.json` as the content owner, then generate `js/data.js`, `llms.txt`, metadata snippets, and CV source from it.
- Do not add a build step unless the generated artifacts will actually be maintained.

Priority: P1
Confidence: 0.95
Effort: M/L depending on chosen path
Evidence: runtime/reference project mismatch; `README.md` explicitly says `data/projects.json` is not loaded.

### P1 - Design Direction: Reduce Gimmicks, Increase Proof Density

Current design strengths:

- Distinctive.
- Easy to edit.
- Fast static page.
- Clear game-dev flavor.

Current design problems:

- The first viewport is mostly terminal identity, not proof.
- The "REC" label appears on static code/image containers, which reads like decoration rather than evidence.
- The marquee, scanlines, pixel cursor, blinking labels, huge uppercase type, and mostly teal-on-black palette all compete for attention.
- Project cards use placeholders instead of real screenshots/video thumbnails for key work.
- Archive is icon-heavy and context-light.
- Contact form asks for attention before the page proves why contact is worth it.

Recommended design direction:

- Keep dark technical identity, but make it quieter and more editorial.
- First viewport should show current role, 3-4 proof chips, and one real visual panel: Sorolla SDK/playable/mobile publishing, or a project proof collage.
- Replace "PROJECTS THAT SHIPPED" with sharper sections: "Current Focus", "Selected Work", "Technical Proof", "Archive".
- Use real screenshots or generated project thumbnails for every featured project.
- Move older mobile icons into a compact "Selected shipped titles" evidence strip with dead links removed.
- Keep one accent color plus neutral grayscale, but add one secondary accent or real media color so the page does not read as a one-note teal terminal.
- Remove or tone down custom cursor, blinking REC, scanlines, and marquee unless they support a specific interaction.

Priority: P1
Confidence: 0.8
Effort: M/L
Evidence: `css/style.css` lines 34-45, 63-114, 238-266; generated page structure from `js/components.js`. No browser screenshot pass was performed, so the design critique is source- and structure-based.

### P1 - Add Real Project Case Studies Instead of More Cards

The current site claims breadth but does not explain depth. The strongest proof probably comes from:

- Sorolla Palette SDK and publishing infrastructure.
- Unity CI/CD template.
- Dogecoin To The Moon / Doge To Mars, if the story is clarified.
- Rody & Mastico, with proof from the YouTuber exposure.
- YourArt WebGL optimization if metrics are usable.
- CARFT/Yumon leadership and SDK work if framed historically.

Recommended fix:

- Add 3 case-study pages or expandable sections:
  - Problem.
  - Role.
  - Stack.
  - Constraints.
  - Result.
  - Evidence link.
- Do not treat every old prototype as equal. Archive the rest.

Priority: P1
Confidence: 0.85
Effort: L
Evidence: current `js/data.js` featured cards are short and link-dependent; `resume.pdf` has stronger bullets than the live page.

### P2 - SEO and Structured Data Need Sync, Not More Tags

JSON-LD is syntactically valid, but points to dead root URLs. It also says `worksFor: Sorolla`, while the page is personal and Sorolla details are thin.

Recommended fix:

- Fix URLs first.
- Use `Person` or `ProfilePage` consistently.
- Consider adding `sameAs` only for links confirmed live.
- Add `robots.txt` and `sitemap.xml` only after canonical URL is correct.
- Add `og:image:width` and `og:image:height` after selecting a real share image.

Priority: P2
Confidence: 0.9
Effort: S/M
Evidence: JSON-LD parse passed; URL checks failed.

### P2 - Replace Tailwind CDN If This Becomes More Than a Scratch Static Site

Tailwind CDN is okay for a quick static page, but it has tradeoffs:

- Runtime dependency on external script.
- Larger than necessary CSS payload.
- No explicit compiled design system.
- Harder to guarantee stable rendering long term.

Recommended fix:

- If this remains simple, keep CDN for now and fix content first.
- If doing a design rebuild, add a minimal build step with Tailwind CLI or replace Tailwind classes with a scoped CSS system.

Priority: P2
Confidence: 0.75
Effort: M
Evidence: `index.html` line 67; `README.md` lines 21-25.

### P2 - Reassess Legacy Unity WebGL Builds in the Repo

`Fall`, `Roll`, and `Intermission` add about 51 MB to the working tree and much more to Git history. They are not linked from the current main page.

Recommended fix:

- Decide whether these are portfolio assets or historical baggage.
- If relevant, link them from an "Old WebGL experiments" archive page.
- If not relevant, remove them from the active site and preserve them elsewhere if needed.
- Do not rewrite Git history casually; current `.git` pack is already about 304 MB, so cleanup strategy should be deliberate.

Priority: P2
Confidence: 0.9
Effort: M
Evidence: `du -sh`: `Fall` 26 MB, `Roll` 19 MB, `Intermission` 6.5 MB; no main-page links.

### P2 - Contact Form Should Match the Audience

The current form says "Looking for a Unity developer? Have a project idea?" and offers "Freelance, Full-time". That may conflict with founder positioning and Sorolla work.

Recommended fix:

- Decide whether the CTA is jobs, consulting, publishing partnerships, or general contact.
- Make the CTA specific: "Unity/game publishing consulting", "SDK/playable ad work", or "selected freelance only".
- Fix Formspree redirect to `/me/`.
- Add direct email link as fallback.

Priority: P2
Confidence: 0.85
Effort: S
Evidence: `js/data.js` lines 197-209.

### P3 - Accessibility and Motion Polish

Potential issues:

- Custom cursor can reduce usability.
- Blinking animations and marquee should respect `prefers-reduced-motion`.
- Buttons/links need visible focus states.
- JavaScript-rendered content means no meaningful content if JS fails.

Recommended fix:

- Add `prefers-reduced-motion` CSS.
- Add focus-visible styles.
- Consider rendering essential content directly in HTML or generating a static HTML body.

Priority: P3
Confidence: 0.75
Effort: S/M
Evidence: `css/style.css` animations and cursor; `index.html` only has `<div id="app"></div>` before scripts.

## Challenged Assumptions

### Assumption: "The live site is at root."

Rejected. Root returns 404. The current live page is `/me/`.

### Assumption: "The resume URL was fixed."

Rejected. The deployed page links root-level `resume.pdf`, which returns 404. The correct deployed PDF is under `/me/`.

### Assumption: "The current portfolio is one source of truth."

Rejected. Runtime content, metadata, AI summary, resume, README, and reference JSON all duplicate facts and disagree.

### Assumption: "More projects equals stronger portfolio."

Rejected. Dead links and weak archive cards reduce trust. Fewer verified case studies would be stronger.

### Assumption: "Terminal/brutalist styling communicates seniority."

Partially rejected. It communicates personality and game-dev taste, but currently overpowers proof and makes the page feel more like a themed demo than a high-trust professional profile.

### Assumption: "Old store links prove shipping."

Rejected when the links are dead. Dead store links prove neglect, not shipping. Use owned proof or archived evidence.

### Assumption: "No build step is always better."

Partially rejected. No build step is good for maintenance only if there is one manual content owner. With six content surfaces, no build step became a drift amplifier.

## Recommended Roadmap

### Phase 0 - Stop the Bleeding (same day)

Goal: remove visible brokenness.

Tasks:

1. Change all site URLs from root to `/me/`.
2. Fix resume links and Formspree redirect.
3. Fix OG/Twitter/schema images.
4. Remove or disable dead App Store/Play Store/X/Happy Snake links.
5. Update README live URL.
6. Add a simple link-check command to README or `package.json` if a package file is introduced.

Priority: P0
Confidence: 0.99
Effort: S/M
Success evidence: root references removed or intentionally documented; `curl` returns 200 for every internal URL linked from the rendered page.

### Phase 1 - Content Reconciliation (1-2 days)

Goal: make the page true.

Tasks:

1. Merge the old resume facts into a current 2026 CV source.
2. Decide first-viewport positioning.
3. Reconcile timeline:
   - Celsius Online should either return to the timeline/archive or be intentionally omitted.
   - Ubisoft/Ketchapp date range should stop being compressed if it hides important early experience.
   - Sorolla should be described with actual current proof, not just title.
4. Decide whether Dogecoin To The Moon and Doge To Mars are one story or two projects.
5. Decide whether Web3 is historical context or active positioning.
6. Update `llms.txt` from the same facts.

Priority: P0/P1
Confidence: 0.9
Effort: M
Success evidence: page, resume, `llms.txt`, and README no longer contradict each other.

### Phase 2 - Source-of-Truth Cleanup (1 day)

Goal: prevent drift from returning.

Tasks:

1. Delete `data/projects.json` if it remains unused, or make it the actual project source.
2. Move constants like `siteUrl`, resume URL, social URLs, and current role into one data owner.
3. Document the update workflow: "edit this one file, then update/generated these artifacts".
4. Keep all stale external links in one auditable list.

Priority: P1
Confidence: 0.95
Effort: M
Success evidence: no duplicate canonical URLs across unrelated files; no unused reference JSON.

### Phase 3 - Design Rebuild (2-4 days)

Goal: make the page feel current, credible, and still personal.

Tasks:

1. Redesign hero around current proof:
   - Name and role.
   - One-line positioning.
   - 3-4 verified metrics.
   - Primary CTA to current CV.
   - Secondary CTA to selected work/contact.
   - Real media panel.
2. Replace gimmick-heavy terminal effects with calmer technical styling.
3. Build project sections:
   - Current work.
   - Selected case studies.
   - Tools/SDKs.
   - Archive.
4. Add real thumbnails/screenshots for featured projects.
5. Make archive compact and verified.
6. Add responsive/mobile review pass.

Priority: P1
Confidence: 0.8
Effort: L
Success evidence: desktop and mobile screenshots pass visual QA; no text overflow; first viewport communicates role and proof without scrolling.

### Phase 4 - Proof and SEO Polish (1-2 days)

Goal: make the page robust when shared.

Tasks:

1. Create a real OG image under `/me/img/`.
2. Add `robots.txt` and `sitemap.xml` if the page stays deployed at `/me/`.
3. Add `prefers-reduced-motion` and focus-visible styles.
4. Add `noscript` fallback or static HTML generation.
5. Add lightweight link checking to the maintenance workflow.

Priority: P2/P3
Confidence: 0.8
Effort: M
Success evidence: social preview URLs resolve; automated link check is clean or has documented third-party exceptions.

## Implementation Notes

Smallest safe implementation path:

1. Do Phase 0 as a scoped patch.
2. Write a new `resume.md` source and regenerate/replace `resume.pdf`.
3. Choose whether `js/data.js` stays the content owner or is replaced by JSON.
4. Only then redesign. Redesign before content reconciliation will just make stale information prettier.

Do not:

- Add more sections before deleting stale ones.
- Keep dead store links for nostalgia.
- Keep root canonical URLs unless the repo is redeployed as a root user site.
- Preserve `data/projects.json` as "reference" if humans must remember whether it is live.

## Verification Gaps

- No browser or Playwright screenshot pass was performed. The design pass is source- and structure-based, not screenshot-based.
- LinkedIn bot-blocked automated checks, so it is unresolved rather than confirmed broken.
- App Store and Play Store results are direct `curl` checks; no logged-in, regional, or manual browser store verification was performed.
- Formspree was not submitted end to end; only the configured action and `_next` redirect were inspected.
- Some claims in the CV and site, such as exact downloads, ratings, and championship qualifiers, were not independently verified in this audit.
