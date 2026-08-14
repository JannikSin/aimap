# AI Map

The whole AI world on one shelf: nine layers from silicon to governance, so anything you hear about has an obvious place and an obvious answer to "do I care."

Live at https://janniksin.github.io/aimap/

## What it is

- **Stack**: the nine-layer pyramid. Each layer is a test question ("Is it a file, not a program?"); expand a band for its entities.
- **Read**: nine long-form essays, one per region of the stack. Serif, offline, remembered scroll position. Built for a train with no signal.
- **Use**: the answer sheet. For this job, use this, because.
- Search is pinned in the header. "Clawdbot" finds OpenClaw.

## Architecture

Zero build, zero backend, zero network calls. `index.html` plus `app.css` plus one ES module per tab. All content ships as static ES modules under `data/`, so the CSP's `connect-src 'none'` is true by construction. Service worker precaches shell **and** content; the airplane-mode test is the whole point.

Content is a snapshot dated 2026-08-13. Facts carry a `noted` date, which means "a model wrote it down that day," never "a human verified it." Prices and version numbers rot; the taxonomy does not.

Run `node check.js` before every deploy. It enforces: ids resolve, no duplicate ids, bodies carry noted facts, flashcards derive from structural facts, and no URL ships that is not in the source-notes allowlist.

Cache name stays `aimap-` prefixed and the SW deletes only its own prefix: several PWAs share this origin.

If this shell gets reused for another app, the honest test of "is this a platform" is whether the second app takes materially less time than the first. Note it here if so.

## Standing rule for agent sessions

Any session that does real work in this repo updates Crystal's `System/Changelog.md` and `Accomplishments/Log.md` before ending. See `CLAUDE.md`.
