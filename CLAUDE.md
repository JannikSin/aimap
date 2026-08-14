# aimap

Offline-first PWA: the AI world as a nine-layer map. Public repo, GitHub Pages from root of `main`, live at https://janniksin.github.io/aimap/.

## Hard rules

- **Public repo.** No personal state ships: no davidStatus, no davidNote, no lane tags, no inventory of what David runs. Personal marks live in `localStorage` only (`aimap.` prefix). Write every line as if a recruiter reads it.
- **Never invent a URL, version, price, or benchmark.** Content updates must come from real sources; `check.js` enforces a URL allowlist. `noted` means written-down-on-that-date, never verified. The word "verified" must not appear.
- **No fetch, ever.** CSP is `connect-src 'none'`; all content is static ES modules in `data/`. Do not convert to JSON-fetch, it will render nothing.
- **Service worker:** cache names `aimap-` prefixed, delete only own prefix (shared origin with brief/crystal/bonmot/grandstand/tally/finesse). Bump `CACHE` in `sw.js` on any deploy where files that must land together changed. Every data module stays in `PRECACHE`.
- **No new tabs before Sept 30.** Learn and Watch stay council-gated (see the handoff in the Crystal vault, `AI/Handoff/`). The remaining-bodies gate was lifted by David directly on 2026-08-14: every entity now carries either a `body` (full, fact-backed) or a `note` (short, category-level, no numbers, no links; says so when the source was thin). Keep that tier discipline for any future entity.
- Run `node check.js` before every deploy and airplane-mode-test after.

## Standing vault rule

Any session that does real work here updates Crystal before ending: `C:\Users\DATar\Sanity\Obsidian\Crystal\System\Changelog.md` (one line) and `Accomplishments/Log.md` if real work shipped. The consult counter and kill-review dates live in the app itself and in `AI/_Index.md`.
