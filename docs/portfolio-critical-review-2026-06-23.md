# Portfolio Critical Review - 2026-06-23

Goal of the site: a credible, confident, **human** personal portfolio / resume for Arthur
Scheidel (Unity dev + founder of Sorolla). Audience: recruiters, clients, peers.

Method: 6-dimension multi-agent review (content authenticity, factual consistency,
design/UX, architecture, SEO/meta, lost-content vs the original), each finding
adversarially verified against the actual files. 43 findings confirmed, 3 rejected.

Baseline for comparison: the last pre-AI human version, commit `c16828e` (2025-06-18),
a Materialize, first-person, fully static HTML portfolio.

> This file is internal. It must NOT be published. `docs/` is git-ignored and excluded
> in `_config.yml`.

---

## Critical (fix before shipping)

1. **Leaked AI instruction in the live bio.** `js/data.js` `about.bioExtra` shipped the
   sentence "Skateboarding stays in the story as a human signal, not as the headline
   proof." That is an authoring note (it also appears in the earlier audit doc) rendered as
   user-facing copy. Fix: delete; replace with real first-person prose.
2. **Internal docs staged to publish.** `docs/*.md` were untracked but would deploy to
   `/me/docs/`, exposing a self-critique and the home filesystem path. Fix: git-ignore
   `docs/` + `_config.yml` `exclude`.
3. **Education facts contradict.** Site/llms: "Master's in Computer Science (2018)".
   Resume (md/html/pdf): "Master's in Software Engineering (2017)" + "Computer Science
   Degree (2015)". Original human site: "Master's in Computer Science, Software and
   Knowledge Engineering, with honors". Fix: reconcile to one canonical string everywhere.
4. **Bretzel tenure contradicts.** Site timeline "2019-now" vs resume "2015-present" vs
   llms "2019-present"; the site's own Rody project is dated 2015. Fix: canonical 2015.
5. **Deploy foot-gun.** `index.html` links `css/tailwind.css`, which is untracked; build
   inputs (`package.json`, `tailwind.config.js`, `css/tailwind-input.css`) are untracked
   too. README claims the CSS is committed. Fix: commit build output + inputs (or pre-render
   and ship one committed stylesheet).

## High (reads as AI / hurts the goal)

6. "Proof" used ~19 times (nav section, headlines, bullet prefixes, hero caption). Buzzword
   register ("ships systems", "What I Actually Build", "infrastructure" x4, noun-chains).
7. Self-undermining hedges: "store retired", "availability uncertain", "AppBrain archive
   only", the "25,000 ... public proof is now led by" download paragraph.
8. Lost human proof vs original: Bob Lennon / Benzaie YouTuber endorsements; the from-
   scratch 1987-phoneme vocal synthesizer (with live demo); five CS training projects
   (Lex/Yacc compiler, distributed-island GA, etc.); jam team sizes + 24h/48h constraints;
   "self-taught Unity"; degree "with honors"; "20+ games". One survivor mislabeled
   "Master's thesis" (was a course project).
9. Readability/a11y: whole site in monospace; `text-gray-600` (~2.7:1) fails WCAG for the
   timeline and all form labels; tag/input borders + placeholder under 3:1.
10. Whole page rendered client-side by JS; view-source / non-JS crawlers / archivers see a
    one-sentence stub. (Verification: not "broken", Google runs JS and OG unfurlers read the
    head, but a static resume as a SPA buys nothing and costs robustness.)
11. Six hand-synced content surfaces already drifting (OG vs meta description differ).

## Medium / polish

- Happy Snake 3D miscategorized under "SDKs & Tools" and listed twice, move to games.
- `alternateName: "CreArthur"` matches no live handle, use "LaCreArthur".
- Skateboard "award" precision ("2x ... (2024, 2025)") only in JSON-LD, vaguer elsewhere.
- Two of four hero "metrics" are words styled as big numbers.
- Decorative tics pile up (marquee, `//`, `[brackets]`, ghost numbers), keep one device.
- Tailwind build + vestigial `jekyll-theme-hacker` config are machinery a one-pager doesn't
  need; `worksFor` Organization has no url; sitemap/lastmod minor.

## Rejected by verification (do NOT act on)

- "Hungry vs Happy Snake" package-id mismatch: live listing shows the correct name; package
  id is an immutable internal string. Non-issue.
- Mobile project-card layout "breakage": does not occur at realistic widths.
- Marquee `aria-hidden` hiding skills: those skills exist as accessible text elsewhere.

## Canonical facts chosen for this pass (CONFIRM)

These were reconciled to the best-supported value; Arthur should confirm the ground truth:

- Education: **Master's in Computer Science (Software and Knowledge Engineering), with
  honors, University of Strasbourg, 2017**; **Bachelor / Licence in Computer Science,
  2015**. (Resume's detailed 2015+2017 progression chosen over the AI-derived "2018", which
  likely came from the `id2018.jpg` filename.)
- Bretzel Studio: **2015-present** (ongoing indie label).
- Skateboarding: **2x French Championship qualifier (2024, 2025)**, kept the specific
  version (Arthur committed it himself) and aligned all surfaces to it.
- "20+ games published": restored as a framing; confirm it is still defensible.
