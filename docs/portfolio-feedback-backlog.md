# Portfolio feedback backlog

Captured 2026-06-24, after the first redesign deploys (commits `3eb2863`, `600e152`).
Source: Arthur's feedback round. Most items are blocked on content/assets/builds from
Arthur and are deferred to a planning session. Status tags:

- `[READY]` I can do now without new input from Arthur.
- `[BLOCKED]` needs content, assets, links, or a rebuild from Arthur first.
- `[CLARIFY]` needs a decision before work starts.

---

## 1. Hero metrics, verify and update `[BLOCKED]`
Current shipped values to confirm or correct:
- `20+` games shipped
- `10K+` Google Play installs
- `4.5★` Play Store rating
- `7+ yrs` Unity & game dev

Action: Arthur confirms the real, current numbers; then update the four `data-count`
values in the hero. Likely also revisit "installs" now that there's App Store + more titles.

## 2. Name colour treatment `[CLARIFY]` + `[READY once decided]`
Arthur dislikes the multi-colour per-letter name in the hero.
Note an apparent tension with item 3 to resolve:
- Item 2: the **name** should NOT be rainbow/per-letter.
- Item 3: the **site overall** should NOT be mono-teal; Arthur prefers multiple colours.

Working interpretation (confirm): name becomes a single or two-tone treatment, while the
broader pastel accent palette (mint/sky/lilac/peach/gold/pink) is used more widely across
sections instead of leaning only on teal/mint. Decide the name treatment, then apply.

## 3. Colour direction across the site `[CLARIFY]`
Move away from "single strong teal" as the dominant accent; lean into the multi-colour
pastel palette already present (section markers, metric tops, chips). Define where each
colour is used so it reads intentional, not random. Pairs with item 2.

## 4. "Three modes" cards `[BLOCKED]`
- Images are wrong; need correct assets per card (Game dev / Founder / Skater).
- Card copy needs revision.
Action: Arthur supplies images + intent; I revise text and wire media.

## 5. "Selected work" = full Sorolla contribution `[BLOCKED]`
Reframe Selected Work around the whole Sorolla contribution (SDK, pipelines, playable ads,
shipped titles), with more detail. Arthur to provide the details/structure he wants.

## 6. Doge To Mars + Rody & Mastico refresh `[BLOCKED]`
Both need, on Arthur's side:
- GitHub project page update
- description update
- WebGL version rebuild
Then I update the cards (links, descriptions, embeds/thumbnails) to match.

## 7. Full games/experiments catalogue revision `[BLOCKED]` + `[READY: link audit]`
The foldout index (Shipped / SDKs & Tools / Jams / Teaching / CS) needs a real pass:
refresh links and rebuilds.
- `[READY]` I can run `npm run check:links` to surface dead/redirected links as a starting list.
- `[BLOCKED]` Arthur decides what to add/drop/rebuild and supplies new build URLs.

## 8. "// About" wording `[READY to draft]` + `[CLARIFY]`
About copy needs revision. I can draft alternatives; Arthur sets the direction/tone.

## 9. Contact form, "still regressed" `[DONE / verify after deploy]`
The proper Formspree form IS built (email + subject + message, dark DA, direct-email
fallback) and is in commit `600e152`, which was still deploying when this feedback came in,
so the live site was still showing the old email-only contact. Action: re-check once the
build is live; if it's still not the "proper" form, specify what's missing (extra fields?
name field? different action/endpoint? success behaviour?).

## 10. Skate section update `[READY]` (mostly) + `[BLOCKED: clip]`
- `[READY]` `2x` -> `3x` French Championship qualifier; add 2026 (2024, 2025, 2026).
- `[READY]` Instagram link (skate content): https://www.instagram.com/arthur.scheidel/ (already in old data).
- `[BLOCKED]` skate clip/reel link: Arthur to supply the video URL (and an action still if we want a thumbnail).
Also propagate the "3x / 2026" fact to the résumé ("2x ... 2024, 2025") and the
JSON-LD `award` field in index.html so facts stay consistent.

---

## Quick wins I can do now (no new input needed)
1. Skate: `2x` -> `3x`, add 2026, wire the Instagram link (item 10).
2. Sync the "3x / 2026" fact into resume.html, resume.md, and the structured-data award.
3. Run the link audit (`check:links`) to seed item 7 with a concrete dead-link list.

## Cross-cutting consistency reminders
- When facts change (metrics, skate count, roles), update ALL surfaces: index.html,
  resume.html, resume.md, resume.pdf (regenerate), llms.txt, and JSON-LD.
- Keep `resume.html` as the public résumé entry point; regenerate `resume.pdf` after edits.
- No em dashes (repo/global rule).
