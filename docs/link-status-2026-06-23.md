# Portfolio Link Status - 2026-06-23

This file is the auditable list for links that should not be reintroduced casually. Runtime content lives in `js/data.js`.

## Live Links Used

| Item | URL | Evidence |
|---|---|---|
| Site canonical | `https://lacrearthur.github.io/me/` | Local source and deployed route. |
| Resume | `https://lacrearthur.github.io/me/resume.pdf` | Local generated PDF and deployed path after publish. |
| Sorolla Palette SDK | `https://github.com/sorolla-studio/sorolla-palette` | Canonical public GitHub repo. |
| Doge To Mars / Dogecoin To The Moon Google Play | `https://play.google.com/store/apps/details?id=com.bretzelstudio.dogecointothemoon` | Official Google Play listing; public proof used on the site. |
| Dogecoin itch.io | `https://lacrearthur.itch.io/dogecoin-to-the-moon` | Public project page. |
| Dogecoin GitHub/page | `https://github.com/LaCreArthur/doge-to-mars-gh-page` | Public project page repo. |
| Happy Snake 3D App Store | `https://apps.apple.com/us/app/happy-snake-3d/id6755388400` | Public store link. |
| Happy Snake 3D Google Play | `https://play.google.com/store/apps/details?id=com.sorolla.hungrysnake3d` | Public store link. |
| Don't Fall Guys Google Play | `https://play.google.com/store/apps/details?id=com.bretzelstudio.dontfallguys` | Public store link. |
| Snap Guys itch.io | `https://lacrearthur.itch.io/snap-guys` | Public proof page. |
| Mine Block trailer | `https://www.youtube.com/shorts/c0PTXM9esgA` | Public proof used only as archive support. |

## Removed or Avoided

| Item | Old URL | Decision |
|---|---|---|
| Root site | `https://lacrearthur.github.io/` | Do not use unless the repo is redeployed as a root user site. Current site is `/me/`. |
| Root resume | `https://lacrearthur.github.io/resume.pdf` | Broken for this repo deployment. Use `/me/resume.pdf`. |
| Root images | `https://lacrearthur.github.io/img/...` | Broken for this repo deployment. Use `/me/img/...`. |
| X profile | `https://x.com/LaCreArthur` | Direct checks returned 404; removed from footer/schema. |
| Happy Snake GitHub | `https://github.com/LaCreArthur/happy-snake-3d` | 404/private; use public store links instead. |
| Old Dogecoin App Store | `https://apps.apple.com/us/app/dogecoin-to-moon/id1574465636` | Retired/broken. |
| Doge To Mars App Store candidate | `https://apps.apple.com/us/app/doge-to-mars/id1574465636` | Conflicting research; direct `curl`, Apple lookup, and developer lookup did not confirm it, so it is not used. |
| Farm Run Google Play | `https://play.google.com/store/apps/details?id=com.bretzelstudio.farmrun` | Removed from runtime links; archive-only title. |
| Mine Block App Store | `https://apps.apple.com/us/app/mine-block-tap/id1570215589` | Removed from runtime links; trailer proof only. |
| Find-it 3D App Store | `https://apps.apple.com/us/app/find-it-3d/id1566705591` | Removed from runtime links; availability uncertain. |
| Don't Fall Guys App Store | `https://apps.apple.com/us/app/dont-fall-guys/id1563951588` | Removed; Google Play is the verified current store link. |
| Snap Guys App Store | `https://apps.apple.com/us/app/snap-guys/id1542504605` | Removed; itch/trailer proof is available. |

## Expected Checker Exceptions

- LinkedIn may return `999` to automated checks.
- Formspree returns `405` to GET checks; form submission is not tested automatically.
- `http://127.0.0.1:8080/` in README is a local preview URL and is intentionally skipped.
