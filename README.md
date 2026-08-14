# o360.com

Next.js rebuild of [o360.com](https://o360.com), migrating off WordPress / Elementor.

## Stack

- **Next.js 16** (App Router) + React 19 + TypeScript + Tailwind 4
- **GitHub** — source of truth (this repo)
- **Netlify** — hosting (`netlify.toml`)
- **Supabase** — data/auth later (`lib/supabase.ts`, `.env.example`)
- Custom fonts **Avenir** and **Mark Pro** from the existing Media Library files (`app/fonts/`)

WordPress stays live until DNS cutover. Do not delete the WordPress homepage.

## Local

```bash
npm install
cp .env.example .env.local   # optional until a Supabase project exists
npm run dev
```

Open http://localhost:3000

```bash
npm run lint
npm run build
```

## Deploy (Netlify)

1. Connect this GitHub repo in Netlify.
2. Build command `npm run build`, publish directory `.next` (already in `netlify.toml`).
3. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` when the O360 Supabase project exists.
4. Point a preview domain at the Netlify site. Keep `o360.com` on WordPress until the replica is approved.

## Content

Homepage copy, nav, and image URLs live in `content/home.ts` so agents can edit them without Elementor. Tokens are in `content/tokens.ts`.

## WordPress connector

`.mcp.json` and `CLAUDE.md` still describe the live WordPress/Elementor site used as the visual source during migration.
