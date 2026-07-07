# Portfolio copy (single source of truth)

This file owns the words on the site. Edit the prose here, then ask the agent to
mirror it into the shipped files. Nothing is auto-generated: the agent propagates the
change, reviews the diff, and checks links before anything goes live.

Surfaces:
- `index.html` (homepage) and `resume.html` (résumé) hold their prose buried in HTML
  markup, so it lives here in readable form.
- `llms.txt` (the AI-readable surface) is already clean Markdown; it is edited directly
  in that file. Keep its facts aligned with the **Facts** section at the bottom of this file.

Conventions:
- `(inline styling in HTML)` marks a line where a word is colored or split with `<br>` in
  the markup. Edit the words here; the styling stays in the HTML.
- Facts that render in several exact forms (skate count, role dates) live in **Facts** at
  the bottom, every surface form spelled out. Change those there, not inline.

---

# Homepage (index.html)

## Hero
- Kicker: `// PARIS · UNITY · AI AGENTS · FOUNDER · SKATE`
- Name: ARTHUR SCHEIDEL
- Tagline: I spent ten years writing game code. AI writes it now. What's left is the interesting part: judgment, taste, and knowing what's worth shipping.
  - (inline styling in HTML: "judgment, taste, and knowing what's worth shipping" is brightened)
- Role badges: GAME DEV · FOUNDER · SKATER
- Buttons: `▶ SEE MY WORK` / `VIEW RESUME`
- Portrait badges: `● ONLINE` / `PARIS · FR`

## Metrics (the four-up band)
- 20+ games shipped
- 25K+ organic downloads
- 4.9★ Doge · App Store rating
- 7+ yrs Unity & game dev

## Three modes
- Heading: Three modes, one loop. (inline `<br>` after "modes,")
- Intro: practice → fail → adjust → repeat. The same loop whether I'm shipping a game, building the studio, or landing a trick.
- 🎮 Game dev: 20+ games in 10 years. The craft was code; now it's knowing what to build and when it's good. AI didn't replace me, it promoted me.
- 🚀 Founder: Co-founder at Sorolla. When making a game costs nothing, distribution and monetization are the moat. I build that moat.
- 🛹 Skater: French Championship qualifier three years running, at an age most people quit. Skateboarding is my lab for fear, commitment and progress you can't fake.

## Selected work
- Section heading: Selected work · label `01 - 03 / 23`
- Sorolla Palette SDK (`01 · CURRENT · SOROLLA`): A Unity publishing stack for ad mediation, ATT & CMP, MMP, analytics and GDPR/CCPA compliance, plus the AI-assisted release workflows around it.
  - Tags: `Unity · C#` / `Open source` / `GitHub ↗`
  - Tile placeholder text: `[ SDK ARCHITECTURE / DEMO VIDEO ]`
- Doge To Mars (`02 · 25K+ ORGANIC`): A Dogecoin-community game shipped solo with no paid marketing - 25K organic downloads, 4.9★ on the App Store, grown through the community.
- Rody & Mastico (`03 · LEVEL EDITOR`): A 3-year solo Atari-ST remaster with rebuilt 1987 voice synth and an in-game level editor. Featured by French YouTubers.

## More games (foldout index)
- Banner kicker: `// THE FULL INDEX`
- Banner title: + 20 more games, jams & experiments
- Toggle: `VIEW ALL`
- Marquee order: HAPPY SNAKE 3D · DOGE TO MARS · DON'T FALL GUYS · SNAP GUYS · MINE BLOCK · FARM RUN · RODY & MASTICO · FIND-IT 3D · BINDING OF EUCLIDE · UNITY CI/CD

Shipped games:
- Happy Snake 3D - Sorolla mobile game. (App Store · Google Play)
- Don't Fall Guys - Hyper-casual runner. (Google Play)
- Snap Guys - Hyper-casual party game. (itch.io)
- Mine Block - Hyper-casual miner. (Trailer)
- Farm Run - Ketchapp / Ubisoft prototype. (Prototype, no link)
- Find-it 3D - Hidden-object hyper-casual. (Archived, no link)

Playable in browser (Unity WebGL, runs in-page):
- Fall To Infinity - Arcade faller. (Play ↗ -> Fall/fall.html)
- Roll To Infinity - Endless roller. (Play ↗ -> Roll/roll.html)

SDKs & tools:
- Facebook SDK UPM - Unity Package Manager port. (GitHub)
- Unity CI/CD Template - GitHub Actions + Fastlane. (GitHub)

Game jams:
- Binding of Euclide - Math roguelike. (itch.io)
- Plot Hole: Little Red - Narrative jam (team). (itch.io)
- Univeria - Scale-shift puzzle. (itch.io)

Teaching:
- Vampire Survivor Clone - Unity course project. (GitHub)
- Sci-Fi Tower Defense - Architecture patterns. (GitHub)

CS fundamentals:
- Mat-C Compiler - Sub-C compiler (Lex & Yacc). (GitHub)
- Shortest Path GA - C++ genetic algorithm. (GitHub)
- GenBank Miner - Java genomic big-data. (GitHub)

## About
- Kicker: `// ABOUT`
- Heading: Builder, co-founder, and teacher. (inline `<br>` after "co-founder,")
- Para 1: I'm a late bloomer, and by design. I've had to rebuild my life more than once, and each rebuild taught me the same thing shipping games and landing tricks does: you don't rise to your ambitions, you fall to your systems.
- Para 2: At 34 I compete better than I did at 28, ship faster than I did with twice the team, and I'm more interested in what humans keep when AI takes the rest: judgment, taste, and everything you earn with your body.
- Signature: Arthur Scheidel / Paris, France

## Timeline (right column)
- Technical Co-Founder · Sorolla, mobile game publishing · 2025-now
- Chief Technology Officer · CARFT, Web3 gaming · 2022-23
- Gameplay Programmer · Ubisoft / Ketchapp · 2019
- Independent Game Developer & Tech Entrepreneur · Bretzel Studio · 2015-now
- MTech Computer & Information Sciences · University of Strasbourg · 2017

## Now / Next (between About and Contact)
- Kicker: `// NOW / NEXT`
- Heading: What I'm building toward. (inline `<br>` after "building")
- Intro: The code is AI's job now. I'm putting the years I spent earning judgment, on a board and in a codebase, into work that needs a human in the loop.
- Now (active, two cards):
  - Sorolla: The publishing stack, ad mediation, compliance, analytics, release tooling, that lets small teams ship and get paid when making a game costs nothing.
  - Content · @arthur.scheidel: Skate, mind, and the AI shift, in public. Documented self-experiments, not lectures.
- Exploring (open threads, three cards, honest framing):
  - AI-agent workshops: Helping teams actually ship with Claude Code, Codex and MCP, the harness I use daily, not the hype.
  - Coaching: Mental performance and adult skate progression. Fear, commitment, and starting late, from someone who did.
  - Mental gyms: A bet that as AI removes cognitive friction, people will pay to put it back, deliberately. Skateboarding is my first proof.
- CTA line: If one of these speaks to you, tell me what you're working toward → (links to #contactSec)

## Contact
- Kicker: `// LET'S BUILD`
- Heading: Got something to ship? (inline `<br>` after "something"; "ship" is a rotating word cycling: ship, build, launch, make, talk, judge, commit, teach)
- Subtitle: Best fit: AI-agent workshops, Unity SDK and mobile-publishing work, coaching conversations, or focused freelance with a clear target. ~24h reply.
- Form: Email (placeholder `you@example.com`) / Subject (placeholder `Unity SDK / publishing inquiry`) / Message (placeholder `What are you trying to ship?`)
- Submit button: `Send message →`
- Alt line: Or email me directly: arthur.scheidel@gmail.com

## Skate coda (light-mode section)
- Kicker: `☀ LIGHT MODE` · `// OFF THE SCREEN`
- Heading: Same loop, no keyboard. (inline `<br>`; "keyboard." is blue)
- Body: When I'm not shipping, I'm skating - and it's the exact same loop: practice, fail, adjust, repeat. Three-time French Championship qualifier, 2024, 2025 & 2026.
- Stats: `3×` French champ qualifier / `'24-'26` seasons competed
- CTA: `@arthur.scheidel →` (links to Instagram; aria-label "Follow the journey on Instagram: @arthur.scheidel". Handle shortened from "follow the journey → @arthur.scheidel" to fit the corner pill.)

## Footer
- Copyright: ARTHUR SCHEIDEL © 2026 · PARIS
- Links: GITHUB · ITCH.IO · YOUTUBE · INSTAGRAM · LINKEDIN

## Head / SEO (not visible on the page)
- Title: Arthur Scheidel - Unity & AI Engineer | Games & Agentic AI
- Meta description: I'm a Unity and AI engineer in Paris. I ship mobile games, build publishing SDKs, playable ads, AI agent workflows, and Unity release pipelines.
- OG / Twitter title: Arthur Scheidel - Unity & AI engineer, founder, skater
- OG / Twitter description: Unity and AI engineer, 20+ games shipped. SDKs, playable ads, agentic AI orchestration, and mobile game release pipelines.

---

# Résumé (resume.html)

- Header role line: Unity & AI Engineer · Tech Co-Founder · Paris
- Tags: Game dev · Founder · Skater
- Contact block: Paris, France / arthur.scheidel@gmail.com / lacrearthur.github.io/me / github.com/LaCreArthur / linkedin.com/in/arthur-scheidel

## Summary
Unity and AI engineer, technical co-founder, and startup builder with 20+ shipped games across mobile publishing, Web3 and agentic AI orchestration. I build Unity SDKs, playable ads, compliance and analytics pipelines, and AI-assisted development workflows.

## Experience
- Technical Co-Founder · Sorolla (2025-now): Technical co-founder developing Sorolla's in-house publishing platform: ad mediation, ATT & CMP, MMP, analytics, GDPR/CCPA compliance, playable ads and release tooling. Agentic AI stack: prompt engineering, MCP/tool use, context engineering, Claude Code, Codex and agent harnesses.
- Senior Unity & Full-Stack Engineer · YourArt (2024): Led Unity WebGL gallery and full-stack marketplace work. Reduced WebGL build sizes by 50%, improved scene loading by 30-70%, refactored duplicated Unity projects, and shipped Python API plus JS/TS frontend features across auth, search, admin, artworks and user pages.
- Lead Unity Developer · Yumon (2023): Led Unity development for a Web3 gaming startup as part of a 4-person founding team. Built a mobile-first play-to-earn game and B2B SDK platform, moving from prototype to production in 3 months and cutting new-game sprint time from 3-4 weeks to 1 week.
- Chief Technology Officer · CARFT (2022-23): Built and led the tech foundation for a blockchain car-collectibles game. Rebuilt a Unity prototype into full-stack multiplayer/Web3 systems, created tools and proofs-of-concept in React, Angular, Firebase, Flutter and Web3, and mentored 5 junior developers.
- Gameplay Programmer · Ubisoft / Ketchapp (2019): Early Ketchapp hyper-casual team member. Shipped 15+ mobile game prototypes in 1-2 week cycles, handled SDK/ad-network/analytics integrations for soft launches, and built reusable components that accelerated prototype development by 50%.
- Game Developer · Celsius Online (2018-19): First professional game-dev role on live mobile games with millions of users. Mastered a 500+ file undocumented codebase across C++, ActionScript, C# and NodeJS; led a critical iOS platform update and fixed a PvP exploit.
- Earlier (collapsed to a one-line note on the résumé; full descriptions kept in llms.txt): Data Scientist at BIOptimize (2015-17) and Lead Web Developer Intern at Straformation (2014).
- Independent Game Developer & Tech Entrepreneur · Bretzel Studio (2015-now): 20+ published games and freelance missions. Doge To Mars - 25K organic downloads, 4.9★ on the App Store, NFT integration, solo. Rody Collection - Unity remake of Atari ST's Rody & Mastico, featured by Benzaie with 800K+ views. Teach Unity and C# at Futurae Private School.

## Selected work (right column)
- Sorolla Palette SDK - Unity mobile-publisher SDK. (github.com/sorolla-studio/sorolla-palette)
- Happy Snake 3D - Sorolla mobile game - App Store & Google Play.
- Unity CI/CD Template - GitHub Actions · GameCI · Fastlane · Firebase. (github.com/LaCreArthur/unity-fastlane-ci)
- Rody & Mastico Collection - Unity remaster + level editor. (lacrearthur.itch.io/rody-mastico-collection)

## Skills
- Games & engines: Unity, C#, C++, Three.js, WebGL, game architecture, playable ads
- Mobile publishing: SDKs, iOS ATT, CMP, MMP, ad mediation, analytics, GDPR/CCPA, ASO, release workflows
- AI orchestration: Agentic AI, prompt engineering, MCP/tool use, context engineering, Claude Code, Codex, agent harnesses
- CI/CD & web: GitHub Actions, GameCI, Fastlane, Firebase · React, Angular, TypeScript, Python

## Stack (chips)
Unity · C# · AI agents · MCP · C++ · Three.js · WebGL · React · TypeScript · Python · Firebase · GitHub Actions · Fastlane · GameCI

## Education
- MTech Computer & Information Sciences - University of Strasbourg, 2017. (degree name is bold in HTML)
- BTech Mathematics & Computer Science - University of Strasbourg, 2015. (degree name is bold in HTML)

## Also
French (native) · English (fluent). 20 years of competitive skateboarding; 3× French skateboard championship qualifier (2024, 2025, 2026). Unity instructor and mentor for student projects.

## Footer
- ARTHUR SCHEIDEL - RÉSUMÉ
- lacrearthur.github.io/me · UPDATED JUN 2026

---

# AI surface (llms.txt)

Edited directly in `llms.txt` (it is already readable Markdown). Keep every fact in it
aligned with the **Facts** section below. It additionally lists the full long-form career
history (BIOptimize, Straformation), all Featured Work links, and the Tools / CS projects.

---

# Facts

Atomic values that appear in several exact forms across surfaces. Change them here, then
the agent expands every form listed.

## Skate (changes yearly)
- Canonical: 3 qualifications; seasons 2024, 2025, 2026. Public claim is "qualified" only; round results are not disclosed (2026: qualified, out in quarter-finals, private).
- Rendered forms:
  - `3x` -> llms.txt, JSON-LD award string
  - `three years running` -> homepage "Three modes" skater card (no glyph)
  - `3×` -> homepage skate stat glyph, résumé "Also" line
  - `Three-time` -> homepage skate body sentence
  - `'24-'26` -> homepage skate stat (rendered with en dash: `'24` to `'26`)
  - seasons list `2024, 2025, 2026` -> several spots
  - seasons with ampersand `2024, 2025 & 2026` -> homepage skate body
  - JSON-LD award: `3x French Skateboard Championship Qualifier (2024, 2025, 2026)`

## Roles (range form for HTML timeline/résumé uses an en dash; present form for llms uses a hyphen)
- Sorolla / Technical Co-Founder: range `2025-now`, present `2025-present`
- YourArt / Senior Unity & Full-Stack Engineer: `2024`
- Yumon / Lead Unity Developer: `2023`
- CARFT / Chief Technology Officer: range `2022-23`, present `2022-2023`
- Ubisoft / Ketchapp / Gameplay Programmer: `2019`
- Celsius Online / Game Developer: range `2018-19`, present `2018-2019`
- Bretzel Studio / Independent Game Developer & Tech Entrepreneur: range `2015-now`, present `2015-present`
- BIOptimize / Data Scientist (résumé + llms only): range `2015-17`, present `2015-2017`
- Straformation / Lead Web Developer Intern (résumé + llms only): `2014`

## Metrics (homepage band)
- 20+ games shipped
- 25K+ organic downloads
- 4.9 Doge To Mars App Store rating (one decimal, shown with ★; App-Store-specific, not universal)
- 7+ years Unity & game dev

## Person
- Name: Arthur Scheidel · alternate: LaCreArthur
- Role short: Unity & AI Engineer · Tech Co-Founder
- Location: Paris, France
- Email: arthur.scheidel@gmail.com
- Copyright year: 2026
- Résumé "updated" stamp: UPDATED JUN 2026

## Education
- MTech Computer & Information Sciences, University of Strasbourg, 2017
- BTech Mathematics & Computer Science, University of Strasbourg, 2015

## Links
- GitHub: https://github.com/LaCreArthur
- LinkedIn: https://www.linkedin.com/in/arthur-scheidel/
- itch.io: https://lacrearthur.itch.io/
- YouTube: https://www.youtube.com/@arthur.scheidel/videos
- Instagram: https://www.instagram.com/arthur.scheidel/
- Sorolla SDK: https://github.com/sorolla-studio/sorolla-palette
- Sorolla org: https://github.com/sorolla-studio
- Site: https://lacrearthur.github.io/me/
