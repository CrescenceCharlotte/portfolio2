# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start dev server with Turbopack
pnpm build        # Build for production (standalone output)
pnpm start        # Serve production build
pnpm lint         # Run ESLint
```

**Package manager:** pnpm (v10.32.1) — always use `pnpm`, not `npm` or `yarn`.

## Architecture

**Next.js 16 App Router** with `output: 'standalone'` deployed via Docker (see `Dockerfile`). Pages are server-rendered by default; no API routes.

### Content System

Content lives in `content/` as Markdown files managed by **Decap CMS** (at `/admin`). `src/lib/content.ts` parses these with `gray-matter`. Authentication for the CMS uses GitHub OAuth via Netlify Functions in `netlify/functions/`.

### Key Directories

- `src/app/` — App Router pages. French/English route variants exist in parallel (e.g. `about/` and `a-propos/`, `projects/` and `realisations/`)
- `src/components/ui/` — shadcn/ui components (New York style, Radix UI primitives)
- `src/components/ogaki/` — Alternative design system/theme with its own layout, cursor, navbar and animation components
- `src/components/` — Custom components, heavily animation-focused
- `content/` — Markdown content files (projects, pages)
- `public/admin/` — Decap CMS static interface (`config.yml` defines CMS schema)
- `netlify/functions/` — GitHub OAuth handlers for CMS auth

### Styling

Tailwind CSS with HSL-based CSS custom properties. Inline styles are used extensively in page components alongside Tailwind. Custom fonts: Inter (`--font-sans`) and Playfair Display (`--font-serif`), loaded via `next/font/google`.

### Animation Stack

- **Three.js** — 3D hero section (`Hero3D.tsx`)
- **GSAP + Framer Motion** — UI animations
- **Lenis** — smooth scrolling, wrapped in `LenisProvider` at root layout
- Custom cursor effects (`StarCursor.tsx`, `Cursor.tsx`); `cursor: none` is set on `<html>`
- Global star field background rendered behind all content via `GlobalStarField`

### Notable Config

- `next/image` is `unoptimized: true` — do not rely on Next.js image optimization
- `raw-loader` handles `.md` file imports in Turbopack config
- `canvas` module is aliased to an empty stub (`src/empty-module.js`) for SSR compatibility with Three.js
- Path alias: `@/*` maps to `./src/*`
