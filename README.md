# Harisaran Vasu — Portfolio

A bilingual (French / English) personal portfolio for a network engineer, built with a clean, editorial, monochrome design.

**Live:** _add your deployment URL here_

## Features

- **Bilingual** — French (default) and English, with a language toggle. Locale routing handled in `src/proxy.ts`.
- **Light / dark theme** — light by default, dark opt-in, persisted across navigation and language switches.
- **Responsive** — verified from 320px phones to 1920px desktops with an automated cross-device test suite.
- **Fast, static** — both locales are pre-rendered at build time.

## Tech stack

- [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- TypeScript
- Tailwind CSS v4
- Playwright (end-to-end / cross-device tests)

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

## Testing

```bash
npm run test:e2e   # cross-device Playwright suite (5 viewports)
```

## Build

```bash
npm run build
npm run start
```

## Project structure

```
src/
  app/[locale]/        # localized routes (layout, page)
  components/          # nav, theme toggle/manager, institution logos
  lib/dictionaries.ts  # all EN/FR content
  proxy.ts             # locale detection & redirects
public/logos/          # institution logos
tests/e2e/             # Playwright specs
```

## Contact

- Email: harisaran.official@gmail.com
- [LinkedIn](https://linkedin.com/in/realharisaran) · [GitHub](https://github.com/HARISARAN404) · [LeetCode](https://leetcode.com/u/harisaran404/)
