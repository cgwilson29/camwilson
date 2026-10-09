# Cam Wilson — personal site

A React + TypeScript + Vite site whose homepage is an interactive 3D solar system
(react-three-fiber). Each planet opens an About Me section.

**Live site:** https://cgwilson29.github.io/camwilson/
**Repository:** https://github.com/cgwilson29/camwilson

| Body | Section |
|---|---|
| Sun | About Cam |
| Earth | Work (USPHS / FDA OCE Project Facilitate) |
| Venus | Family |
| Mars | Cars |
| Mercury | Motorcycles |
| Neptune | Nature/Outdoors |
| Jupiter | World Travels |
| Saturn | Space & Astronomy |
| Uranus | Craft Beer & Breweries |

## Editing content
All copy lives in [`src/data/sections.ts`](src/data/sections.ts). Planet sizes, orbits,
colors, and which section each planet links to are in [`src/data/planets.ts`](src/data/planets.ts).

## Credits
Planet and sun imagery from [Solar System Scope](https://www.solarsystemscope.com/textures/)
(CC BY 4.0), based on NASA mission data. Files live in `public/textures/`.

## Development
```bash
npm install
npm run dev       # http://localhost:5173/camwilson/
npm run build     # type-check + production build into dist/
npm run preview
```

## Deploying to GitHub Pages
The site is hosted on GitHub Pages at https://cgwilson29.github.io/camwilson/ and deploys
from the `main` branch: every push to `main` runs
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which builds the site and
publishes `dist/` to Pages. You can also run it manually from the **Actions** tab.

One-time setup: in https://github.com/cgwilson29/camwilson/settings/pages set
**Source** to **GitHub Actions**. If the repo name changes, update `base` in `vite.config.ts`.
