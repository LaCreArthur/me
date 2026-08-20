# Portfolio roadmap and maintainability plan - 2026-06-24

Scope: `/Users/arthur/web/me`, deployed at `https://lacrearthur.github.io/me/`.
Method: full read of `index.html`, `css/style.css`, `js/portfolio.js`, `resume.html`,
`resume.md`, `llms.txt`, `README.md`, `scripts/check-links.js`, plus the feedback backlog
and the three June-23 docs. Specifics (duplication map, current drift, live links,
maintainability options) were verified by a 6-agent workflow with an adversarial pass,
then re-checked by hand (grep + git log). `docs/` is git-ignored; this file does not deploy.

---

## Status update - 2026-06-25

- **Wave 0: shipped** (commit `f6fff9d`). CSS tokens, drift guard, link-checker fix,
  monochrome hero name, skate `3x`/2026, Instagram, metric fallback, AA contrast, focus
  ring, aria-hidden, `resume.md` cut.
- **Maintainability: §2 recommendation overridden, on purpose** (commit `45b6290`). Arthur
  chose the generator that §2 below argues against. `content.json` owns atomic facts;
  `templates/` hold design + prose with `{{token}}` placeholders; `scripts/build.js`
  renders the static `index.html` / `resume.html` / `llms.txt` with no runtime step.
  `npm run check:build` fails on stale output; `check` gates build + facts + links. The
  §2 "Rejected: content.json + generator" reasoning is kept below as the record of the
  trade-off that was knowingly accepted, not as current guidance. Decision 1 in §4 is
  therefore settled. Carried one fact fix: Sorolla tenure `2024 -> 2025`.
- **Waves 1 and 2: still open**, gated on decisions 2-4 (§4) and the asset list.
- Not deployed: both commits are local; nothing pushed to `master`.

---

## TL;DR

1. The backlog feels slow because of **fact duplication**, not design. One fact change
   (skate `2x` -> `3x`) currently touches **9 locations across 5 files** plus a PDF
   regenerate. That is the thing to fix to "get faster".

2. **My first instinct was wrong, and I changed it.** The obvious fix is a content
   generator (one `content.json` -> static HTML). But git history shows commit `3eb2863`
   *deleted* exactly that pipeline (`js/data.js` + `js/components.js` + `scripts/prerender.js`)
   two commits ago, on purpose, in favour of hand-edited inline markup. Every commit since
   is design/layout churn. Re-introducing a generator would undo a deliberate recent
   decision and tax your common activity (design tweaks over 40KB of inline HTML) to
   optimize a rare one (fact edits). **Rejected.**

3. The right maintainability move respects the inline approach instead of fighting it:
   **cut the redundant surface + add a drift guard + promote the palette to CSS variables.**
   Low risk, ships in an afternoon, no build step, and it makes the *design-heavy* edit
   stream faster too.

4. Most of the 10 backlog items are blocked on **decisions and assets only you have**.
   Section 4 turns each blocker into one precise, answer-in-one-sitting request.

---

## 1. The real problem: fan-out, not design

Same facts, copied across 5 hand-edited surfaces: `index.html` (visible copy + JSON-LD +
OG/Twitter meta), `llms.txt`, `resume.html`, `resume.md`, and `resume.pdf` (rendered from
`resume.html`). Verified edit fan-out for a single change:

| Change | Files/locations to touch | Count |
|---|---|---:|
| Skate `2x` -> `3x` + add 2026 | index (JSON-LD, mode card, prose, 2 stats), resume.html, resume.md, llms.txt, regen pdf | **9** |
| Update a hero metric | index (data-count + OG/twitter/meta/prose restatements), resume.html, resume.md, llms.txt | **11** |
| Change the positioning one-liner | index (og:title, twitter:title, hero, meta), resume.html, resume.md, llms.txt | **7** |
| Update a role tenure/date | index timeline, resume.html, resume.md, llms.txt, regen pdf | **5** |
| Update education string | index (JSON-LD + timeline), resume.html, resume.md, llms.txt, regen pdf | **6** |

Both June-23 docs already named this ("six hand-synced content surfaces", "the mechanism
that created the stale page"). The redesign then made it worse by inlining everything.

### Drift that exists *today* (grep-verified)

- **`7+ yrs` experience** is on the homepage and in `llms.txt` but **absent from the
  résumé** (resume.html/md never state the figure the homepage leads with).
- **Résumé "updated" date disagrees with itself**: `resume.md` says "June 23, 2026",
  `resume.html` footer says "UPDATED JUN 2026" (no day).
- **`llms.txt` links `resume.pdf`** while the repo rule makes `resume.html` the entry point.
- **Happy Snake 3D** has a Google Play link in `llms.txt` only; other surfaces cite App
  Store or no URL (single-surface claim, can't cross-check).
- **All four hero metrics ship literal `0`** in the HTML (`data-count="20">0<`). If
  `portfolio.js` fails to load, the hero reads "0+ games / 0K+ installs / 0.0★ / 0yrs".

The skate `2x` -> `3x` change in the backlog is **not yet applied** anywhere; every surface
still says `2x (2024, 2025)`.

---

## 2. Maintainability plan (make content + code easier to change)

### Recommended: guard + reduce + variables (no build step)

**2a. Cut the redundant surface.** `resume.md` is consumed by *nothing public* (only the
link-checker scans it). It is a third hand-maintained copy of the résumé. Deleting it drops
the résumé-fact fan-out from 3 authored copies to 2 (`resume.html` is the source,
`resume.pdf` is derived). Decision needed (it is your content), but low-risk: nothing links
it. Effort S, risk low.

**2b. Add a drift guard** `scripts/check-facts.js`, modelled on the existing
`check-links.js`. A flat list of canonical strings ("20+", "2017", "Strasbourg", the
championship line, the résumé URL target) asserted present/consistent across `index.html`,
`resume.html`, `llms.txt`; exits non-zero on mismatch. Wire `npm run check:facts` next to
`check:links`, documented "run before push". This converts silent text-drift into a loud
failure for the exact bug class that already shipped. Facts stay inline where they are
authored: **no second source of truth.** Effort S, risk low.

  - Honest limit: grep checks presence, not semantic equivalence. It catches "you forgot to
    update surface X", not "you reworded surface X differently". That still covers the
    failures that actually happened here.

**2c. Promote the palette to CSS variables.** The ~7 accent hexes
(`#9fe0c2 #a7cdf2 #c9b8f2 #f4b59e #f1d99b #f4abce` + greys) are copy-pasted across 225
inline style blocks. Lift them to `:root` custom properties (`--teal`, `--blue`, ... ) and
reference `var()`. ~20 lines. This turns every future colour change (your *most common*
edit, per git history) from an N-occurrence sweep into one edit, and it is the precondition
for the colour-direction work in backlog items 2/3. Effort S, risk low.

**2d. Fix the link-checker false positive.** `check:links` currently exits non-zero on the
two `rel="preconnect"` font-origin hints (bare origins legitimately 404). Teach it to skip
preconnect/dns-prefetch hrefs so the guard goes green and stays trustworthy. Effort S.

Net: zero build step, every surface still directly editable, drift becomes a loud failure,
and the design-heavy edit stream gets faster. This is sized to how the repo *actually*
changes.

### Rejected: content.json + generator

Strong on paper (one edit point, reaches every surface). Rejected because: (a) you removed
this exact pipeline two commits ago; (b) it taxes design edits (template extraction over
40KB of bespoke inline HTML) to speed up rare fact edits; (c) an optional-to-run generator
becomes a second source of truth that silently lies the first time someone hand-edits the
output and forgets to regenerate; (d) it conflicts with the "no build step" project rule.
Revisit only if fact-edit volume ever rises to dominate the commit stream. It does not today.

### Rejected: revive client-side rendering (old `js/data.js`)

Reintroduces the static-robustness regression that `4dc2c9e` deliberately fixed (crawlers /
no-JS clients see a stub) and still cannot own `llms.txt`, in-`<head>` JSON-LD, or the print
résumé. Worst trade of the three.

---

## 3. Backlog triage: what I can do, what I can't, how to unblock

Tags: what I can ship now with zero new input vs what is genuinely gated on you.

| # | Item | State | I can do now | Blocked on you (the exact ask) |
|---|---|---|---|---|
| 1 | Hero metrics | BLOCKED | Re-skin "Google Play installs" -> "mobile installs" if cross-store; change any number in one edit | The 4 real numbers: games=__, installs=__ (Play-only or Play+App Store?), rating=__, years=__ |
| 2 | Name colour | CLARIFY | Apply chosen treatment in one edit; rise-in animation is preserved either way | Pick: monochrome / two-tone / single-hue gradient (see decisions) |
| 3 | Colour direction | CLARIFY | Apply a section-accent system (teal=actions; blue/violet/peach/gold/pink each own one section) | Approve or swap the colour-to-section map |
| 4 | Three-modes cards | BLOCKED | Rewrite the 3 card paragraphs; swap in any image you point at | Per card: an image (esp. a **skater photo**, the one missing asset) + 1 sentence of intent |
| 5 | Selected work = full Sorolla | BLOCKED | Restructure the section to hold SDK/pipelines/playable-ads/titles breakdown | 3-6 bullets: title + 1 line + link-or-"no link" per contribution |
| 6 | Doge + Rody refresh | BLOCKED | Re-point links / swap thumbnails once new ones exist; re-run link audit | When rebuilds land: new page URL + WebGL play URL + 1-2 line description per game |
| 7 | Full catalogue revision | BLOCKED + link audit READY | **Link audit is done** (see §6: 0 dead links) | Mark each catalogue entry keep/drop/rebuild + new URLs for rebuilds |
| 8 | About wording | READY-draft + CLARIFY | Draft 2-3 tone variants; de-dupe the "practice, fail, adjust, repeat" loop that repeats in 3 other sections | One word on tone: punchy / narrative / credibility-first / keep-and-trim |
| 9 | Contact form | DONE / verify | Add a Name field and/or custom success state if wanted | (1) add Name field? (2) is `xblgjdky` your live inbox - send one test to confirm |
| 10 | Skate update | READY-mostly + clip BLOCKED | `2x`->`3x` + add 2026 across all 9 spots; wire the Instagram link (currently only in llms.txt) | **Confirm 3x/2026 is real** (confidence gate); skate clip URL + optional action still |

### Confidence-gate note on item 10

The backlog asserts `3x` and a 2026 season as `[READY]`, but no surface says it yet and I
have **no independent proof** of a 2026 qualification (today is 2026-06-24). Per the repo
confidence rule, I will not propagate a personal factual claim across 9 public locations
until you confirm it. One word unblocks it.

---

## 4. Decisions that unblock the most (answer in one sitting)

These four collapse most of the blocked backlog into executable work:

1. **Maintainability approach**: guard + reduce + CSS vars (recommended) / full generator /
   facts only. Drives §2.
2. **Skate fact**: confirm `3x` + seasons `2024, 2025, 2026`, or give the right values.
   Unblocks item 10 propagation.
3. **Hero name treatment**: monochrome off-white (recommended) / two-tone / single-hue
   gradient. Unblocks item 2.
4. **Colour-to-section map**: approve `teal=actions, blue=games, violet=about/SDK,
   peach=contact, gold=awards/ratings, pink=skate/jams` or swap. Unblocks item 3.

Asset requests (no decision, just send when you have them), in priority order:
- **SDK visual** for the lead "Selected work" card (diagram / screenshot / demo). Highest
  leverage: it is currently a striped `[ SDK ARCHITECTURE / DEMO VIDEO ]` placeholder and it
  is the *first* work item.
- **Skate photo or clip** (covers both skate placeholders + the skater mode card).
- Distinct **Game-dev montage** and a real **Founder/studio visual** (retire the reused
  `background3.png` and the `logo.png` stand-in on the three-modes cards).

---

## 5. Design + a11y: no-regret fixes (need nothing from you)

All verified against the actual CSS/JS. These de-AI the page and fix real bugs:

- **Kill the rainbow per-letter name** (item 2): set `ARTHUR SCHEIDEL` to one colour, keep
  the rise-in animation. Removes the single most AI-default element. (Final colour per
  decision 3.)
- **Metric static fallback**: ship the real numbers as the text node so a JS failure stops
  showing `0+ games / 0K+ installs`. JS resets to 0 only when it takes over.
- **Contrast**: four greys fail WCAG AA: `#6c6c75` scroll cue/placeholders (3.34:1),
  `#7a7a84` bracket labels/arch headings (3.6-3.8:1), `#7c7c84` timeline dates (4.19:1), and
  worst, the light-mode `[ SKATE CLIP / REEL ]` label `#9a917d` on `#e4dfd2` (2.35:1). Bump
  to ~`#8a8a93` (dark) / ~`#7d7460` (light).
- **Focus-visible**: the contact inputs set `outline:none`; nothing else has a focus ring,
  so keyboard focus is near-invisible on dark. Add one global
  `:focus-visible{outline:2px solid var(--teal);outline-offset:2px}` + a light-section variant.
- **Decorative emoji** (game/rocket/skate/sun/star) read aloud mid-heading; wrap in
  `aria-hidden`.

Confirmed *good* and worth preserving through any refactor: reduced-motion coverage is
solid; `data-reveal`/`data-letter` elements stay visible if JS fails (only the metrics
fallback is wrong); body text `#9a9aa3` actually passes AA (6.2:1), so the muted-grey panic
is misplaced - the real failures are the decorative greys above.

---

## 6. Live link audit (item 7, READY path - done)

`npm run check:links`: 46 URLs, 41 ok, 2 expected (LinkedIn 999, Formspree 405), 1 skipped,
**0 real broken links**. The 2 "FAIL 404" lines are false positives on `rel="preconnect"`
font origins (fixed by §2d). No catalogue/game link is dead or redirected. The dead-store
problem from the June-23 audit has already been cleaned out (those links were removed in the
redesign and tracked in `docs/link-status-2026-06-23.md`). So item 7's link half is **clean
now**; what remains is purely your keep/drop/rebuild content calls.

---

## 7. Sequenced execution (on your go; deploy gate applies)

**Wave 0 - no-regret, no input (one branch, preview locally):**
- §2c CSS variables, §2d link-checker fix, §5 a11y bug fixes + metric fallback, name
  de-rainbow (colour TBD by decision 3), §2b drift guard, Instagram link wired in.
- Draft the item-8 About variants for you to pick.

**Wave 1 - after the 4 decisions:**
- Apply skate `3x`/2026 across all surfaces + regen `resume.pdf` (decision 2).
- Apply name treatment + section-accent colour system (decisions 3/4).
- Cut `resume.md` (decision 1) and reconcile the `7+ yrs` / updated-date / llms-resume-link
  drift in one pass, then lock it with the new guard.
- Update hero metrics if numbers change (ask 1).

**Wave 2 - as assets arrive:**
- Wire the SDK visual, skate clip, three-modes images (item 4).
- Rebuild "Selected work" around the Sorolla bullets (item 5).
- Re-point Doge/Rody once rebuilt (item 6); annotate catalogue keep/drop/rebuild (item 7).

Each wave is build-and-verify-locally; nothing pushes to `master` without your explicit
per-change go.

---

## Appendix: rejected / not-doing, with reasons

- **Generator / content.json**: over-engineered for a design-dominated, low-fact-churn
  repo you just de-generated. See §2.
- **Client-side render**: robustness regression. See §2.
- **Full inline-style extraction into classes**: the variable layer (§2c) captures ~90% of
  the benefit for ~10% of the churn; full extraction is not worth it.
- **Per-game thumbnails for the ~17 foldout monograms**: intentional index style, not
  broken; lower priority than the 5 real placeholders.
- **Rewriting git history to drop the 51MB Unity WebGL builds** (`Fall`/`Roll`/
  `Intermission`): flagged June-23; deliberate, deferred, not in scope here.
