# 🐔 Chicken Buddy AI

*An experienced farmer in your pocket.*

A mobile-first PWA that helps first-time, small-scale chicken farmers manage
their flock with confidence — tuned for Cambodia's climate.

**v2: 100% offline-capable, zero backend, zero API keys, zero monthly cost.**
The whole app is a static site; all data lives on the device.

## Features

| Feature | Where |
|---|---|
| Dashboard (flock, eggs, feed runway, water, health, note) | `/` |
| Daily log — eggs, feed, water, sick count, notes + history | `/log` |
| Profit tracker with 30-day chart | `/profit` |
| Daily rotating tip (built-in list of 14, climate-tuned) | dashboard |
| Weather reminders (Open-Meteo, free, no key; cached for offline) | dashboard |
| PDF export (print stylesheet) | `/log` |
| PWA — installable, works offline after first visit | everywhere |
| Light/dark mode, premium animations | everywhere |
| AI assistant & photo health check | "Coming soon" screens (`/chat`, `/health`) |

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
```

## Build & host (free)

```bash
npm run build      # outputs a fully static site to ./out
```

Host `./out` anywhere static — all free tiers:
- **Netlify / Cloudflare Pages** — drag-and-drop `out/`, done
- **GitHub Pages** — push `out/` to a `gh-pages` branch
- **Vercel** — import the repo (it detects the static export)

On the phone: open the site once → "Add to Home Screen". After that it
launches and works **with no internet connection** (weather shows the last
known forecast when offline).

## Configuration (optional)

| Env var (build-time) | Purpose |
|---|---|
| `NEXT_PUBLIC_FARM_LAT` / `NEXT_PUBLIC_FARM_LON` | Weather location (default: Phnom Penh) |

No other configuration exists. There are no API keys anywhere.

## Architecture notes (future-ready)

- **One data layer** — every screen goes through `src/lib/store.ts`
  (localStorage). A future cloud-sync version only swaps this file.
- **AI slots reserved** — `/chat` and `/health` render a shared
  `ComingSoon` component. Re-adding AI later means replacing those two
  pages; nav, routing, and design don't change.
- **i18n-ready** — all UI strings live in `src/lib/i18n.ts` with `km`
  (Khmer) and `ja` (Japanese) slots declared.
- **Zero runtime dependencies beyond React/Next** — charts are hand-rolled
  SVG; fast on cheap phones and slow connections.

## Honest limitations

- Data lives in one browser/device. Clearing browser data clears the farm —
  the PDF export doubles as a simple backup.
- Weather needs internet to refresh (the last forecast is cached and shown
  offline with a "last known" label).
