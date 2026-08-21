# NexSearch — Advanced Search Interface

[![Deploy to GitHub Pages](https://github.com/Pallab-Chakraborty/AdvanceJob-Search-Interface/actions/workflows/deploy.yml/badge.svg)](https://github.com/Pallab-Chakraborty/AdvanceJob-Search-Interface/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

A smart job-search interface: live autocomplete suggestions, category filters, voice search, keyboard shortcuts, recent-search history, and instant results — all client-side, no backend or build step required.

**Live demo:** `https://pallab-chakraborty.github.io/AdvanceJob-Search-Interface/`

## Features

- **Live suggestions** as you type, keyed off common tech-role search terms
- **Category filter dropdown** (Software Dev, Data, Cloud, Security, etc.) with per-category result counts
- **Filter chips** (Remote, Full-time, Contract, Senior, New Today)
- **Voice search** via the Web Speech API (falls back gracefully in unsupported browsers)
- **Recent search history**, persisted in `localStorage`
- **Keyboard shortcuts** (press `/` to focus search)
- **Light/dark theme toggle**
- **Pagination** over mock result data

This is a front-end demo — job results come from local mock data (`js/data.js`), not a live jobs API. See [Connecting a real jobs API](#connecting-a-real-jobs-api) below if you want to wire it up to one.

## Project structure

```
.
├── .github/
│   └── workflows/
│       └── deploy.yml     CI: auto-deploys to GitHub Pages on every push to main
├── index.html             Page structure and markup
├── css/
│   └── styles.css         All styling (theming via CSS variables, light/dark mode)
├── js/
│   ├── data.js              Mock categories, trending terms, job results, suggestion map
│   ├── state.js             App state + cached DOM element references
│   ├── utils.js             Text highlighting, toast notifications, search history
│   ├── theme.js             Light/dark theme toggle
│   ├── category.js          Category dropdown (open/close/select)
│   ├── filters.js           Filter chip row
│   ├── recent.js            Recent-searches row on the homepage
│   ├── suggestions.js       Autocomplete suggestions panel + keyboard navigation
│   ├── input.js             Search input events (typing, clear, focus/blur)
│   ├── voice.js             Voice search (Web Speech API)
│   ├── search.js            Search execution + entering "results" layout mode
│   ├── results.js           Loading skeletons + result card rendering
│   ├── stats-pagination.js  Results stats bar + pagination controls
│   └── main.js              Click-outside handling, global keyboard shortcuts, init
├── package.json           Project metadata + local dev script (no build step)
├── LICENSE                MIT
└── README.md
```

Scripts are loaded in dependency order in `index.html` (`data.js` and `state.js` first, since later modules read those globals).

## Running locally

No build tools required — it's plain HTML/CSS/JS.

```bash
npm start
# serves the site at http://localhost:8000
```

or, without npm:

```bash
python3 -m http.server 8000
```

## Deploying to GitHub Pages

This repo ships with a GitHub Actions workflow (`.github/workflows/deploy.yml`) that deploys automatically.

1. Push these files to your repo (replacing the old single-file `index.html`).
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **"GitHub Actions"**.
4. Push to `main` (or run the workflow manually from the **Actions** tab).
5. GitHub publishes to `https://<username>.github.io/<repo-name>/` within a minute or two — the badge at the top of this README tracks deploy status.

(The classic "Deploy from a branch" option under Settings → Pages also works if you'd rather skip Actions — just delete the workflow file.)

## Connecting a real jobs API

To replace the mock data with real listings:

1. Pick a jobs API (e.g. Adzuna, USAJobs, JSearch on RapidAPI, or your own backend).
2. In `js/search.js`, replace the local filtering logic in `runSearch()` with a `fetch()` call to your chosen API.
3. Since this becomes a static site calling a third-party API, check whether that API requires a secret key — if so, you'll need a small serverless proxy (Cloudflare Worker, Vercel/Netlify function) to keep the key off the client, the same way you would for any static site.
4. Map the API's response shape onto the fields `results.js` expects (`title`, `desc`, `tags`, `source`, etc.), or update `results.js` to match the API's shape directly.

## Customizing

- **Colors/theme:** edit the CSS variables at the top of `css/styles.css` (`:root` for dark mode, `[data-theme="light"]` for light mode).
- **Categories & mock jobs:** edit `CATEGORIES` and `RESULT_DATA` in `js/data.js`.
- **Suggestions:** edit `SUGGEST_MAP` in `js/data.js`.

## Tech notes

- Fonts: Syne (display) + DM Sans (body), loaded from Google Fonts.
- Icons: Font Awesome 6 (CDN).
- Voice input: browser-native Web Speech API — no external service.
- No frameworks, no build step — vanilla JS throughout.
