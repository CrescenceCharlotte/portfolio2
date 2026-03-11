# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start dev server with Turbopack
pnpm build        # Build static export to out/
pnpm start        # Serve production build
pnpm lint         # Run ESLint
```

**Package manager:** pnpm (v10.13.1) — always use `pnpm`, not `npm` or `yarn`.

## Architecture

**Next.js 15 App Router** with full static export (`output: 'export'`) deployed to Netlify. All pages are pre-rendered at build time; there is no server-side rendering.

### Content System

Content lives in `content/` as Markdown files managed by **Decap CMS** (at `/admin`). `src/lib/content.ts` parses these with `gray-matter`. Authentication for the CMS uses GitHub OAuth via Netlify Functions in `netlify/functions/`.

### Key Directories

- `src/app/` — App Router pages. French/English variants exist as parallel routes (e.g. `about/` and `a-propos/`, `projects/` and `realisations/`)
- `src/components/ui/` — shadcn/ui components (New York style, Radix UI primitives)
- `src/components/` — Custom components, heavily animation-focused
- `content/` — Markdown content files (projects, pages)
- `public/admin/` — Decap CMS static interface (`config.yml` defines CMS schema)
- `netlify/functions/` — GitHub OAuth handlers for CMS auth

### Styling

Tailwind CSS with HSL-based CSS custom properties. Complex animations use CSS Modules (e.g. `Hero3D.module.css`). Custom fonts: Inter (sans) and Playfair Display (serif), configured in `tailwind.config.js`.

### Animation Stack

- **Three.js** — 3D hero section (`Hero3D.tsx`)
- **GSAP + Framer Motion** — UI animations
- **Lenis** — smooth scrolling (wrapped in `LenisProvider`)
- Custom cursor effects (`StarCursor.tsx`, `Cursor.tsx`)

### Static Export Constraints

- `next/image` is set to `unoptimized: true` — do not rely on Next.js image optimization
- No API routes (static export incompatible) — all dynamic behavior is client-side or via Netlify Functions
- `raw-loader` is configured in `next.config.ts` for importing Markdown files directly

### Path Alias

`@/*` maps to `./src/*`.
