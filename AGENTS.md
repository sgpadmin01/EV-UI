# AGENTS.md

## Repo overview
Fixed-size (1024×600) touchscreen HMI for an electric agricultural vehicle (Shiv Kaushalya EAV-700). No build step, no bundler, no framework on the client.

- `client/pages/index.html` — single-page HMI app (5 view panels + splash + hazard overlay + 6-tab navbar).
- `client/pages/navigation.html` — separate SBC navigation screen (SVG map), reached from the HMI "Nav" tab via `window.location.href`.
- `client/css/design-system.css` — shared design system, all pages link it as `../css/design-system.css`.
- `server/` — Express 5 + Mongoose backend. Entry: `server/index.js`. Only real route is `/api/users` (placeholder).

## Commands
- Run server (from `server/`): `npm run dev` (nodemon) or `npm start`.
- **No tests, lint, typecheck, or CI exist.** `npm test` is a stub that exits 1. Verify manually in a browser.
- Server requires a reachable MongoDB: `config/db.js` calls `process.exit(1)` on connection failure. `MONGODB_URI` comes from `server/.env` (gitignored). Without it, the process dies on boot.

## Gotchas
- **Static mount:** `server/index.js` serves `../client/pages` at `/` and `../client/css` at `/css`. The directory is `pages` (not `page` — that old path broke loading). Client HTML uses relative `../css/design-system.css`, which resolves fine under this mount.
- **Never change `overflow: hidden` on `html/body` or `.hmi-display-container`** — that is the intentional 1024×600 frame lock. Scrolling belongs inside `.hmi-content` (`overflow-y: auto`) and `.touch-scroll-y` containers.
- **Screen fit rule:** `.view-panel.active` is `display: flex; flex-direction: column`. Each screen's root grid (`.dashboard-grid`, `.charging-grid`, `.faults-container`, `.info-grid`) uses `flex: 1; min-height: 0` — NOT `height: 100%`. `height: 100%` under a `section-header` overflows the 480px content area by ~46px. Long fault/settings content scrolls inside `.touch-scroll-y` wrappers.
- `.touch-scroll-y` = `overflow-y: auto !important` + `-webkit-overflow-scrolling: touch` + `touch-action: pan-y` + hidden scrollbar. Use it for any new scrollable region on the touch panel.
- All telemetry on the dashboard (speed gauge, odometer, trip, efficiency, hazard demo) is JS-simulated — there is no real hardware/sensor feed.
- Icons are Lucide via CDN (`<i data-lucide="...">` + `lucide.createIcons()`); fonts are Google Fonts via `@import`. Without internet these fail to load.
- `.env` and `node_modules` are gitignored — never commit them.
- Commit style (from history): lowercase conventional-ish messages (`fix: ...`, `feat: ...`, `Add ...`).
