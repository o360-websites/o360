# o360.com agent notes

Site operations for [o360.com](https://o360.com) go through the Novamira WordPress MCP connector. Working rules for backups, global styles, and fidelity live in `CLAUDE.md`. MCP client config lives in `.mcp.json`.

## End of every chat

Close every completed turn with two blocks:

1. **Summary** — what is true now (what ran, what changed, what did not).
2. **Questions** and/or **To do** — decisions needed from the user, and the next actions. Do not skip this even when the work looks finished.

## Cursor Cloud specific instructions

This repository now contains the **Next.js rebuild** of o360.com (App Router) plus the WordPress MCP connector used as the visual source during migration. WordPress/Elementor remains live on `o360.com` until cutover.

### Next.js (new site)

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build
```

Homepage content is in `content/home.ts`. Custom fonts (Avenir, Mark Pro) are in `app/fonts/`. Deploy config is `netlify.toml`. Supabase keys go in `.env.local` from `.env.example` — there is not yet an O360 Supabase project (org `O360 Core Websites` already has Orbit101 and Dental Country).

The pixel-fidelity bar is the homepage founder block (`components/home/FounderSection.tsx`, `#founder`): “Led by Doctors Who Understand Your Practice”. Values come from live Elementor CSS (`post-10545.css` + kit `79953`), not approximations. This site’s Elementor breakpoints are **799px / 1199px**, not the Elementor defaults. Anonymous HTML GET to `o360.com` is Cloudflare-blocked; the Elementor CSS files under `/wp-content/uploads/elementor/css/` still load with a browser User-Agent.

`app/page.tsx` currently renders only that founder section so it can be judged in isolation. Restore `HomePage` on `/` after this section is accepted. Do not treat WordPress as the place to rebuild pages. New UI work goes in Next.js.

### Talking to WordPress from a cloud agent

Cloud agent sessions do **not** automatically load the server in `.mcp.json` as MCP tools. Spawn the proxy yourself (Node 22+ is required):

```bash
OAUTH_ENABLED=false \
WP_API_URL='https://o360.com/wp-json/mcp/novamira' \
WP_API_USERNAME='<from .mcp.json>' \
WP_API_PASSWORD='<from .mcp.json>' \
npx -y @automattic/mcp-wordpress-remote@latest
```

Set `OAUTH_ENABLED=false` so the proxy uses the application password instead of opening a browser OAuth flow. Credentials stay in `.mcp.json`; do not copy them into this file.

Speak MCP JSON-RPC on stdin (newline-delimited). Typical flow: `initialize` → `notifications/initialized` → `tools/list` → `tools/call`. WordPress work goes through:

- `mcp-adapter-discover-abilities`
- `mcp-adapter-get-ability-info`
- `mcp-adapter-execute-ability` with `{ "ability_name": "...", "parameters": { ... } }`

The Novamira server currently exposes about 140 abilities (Elementor, ACF, Rank Math, Gutenberg, PHP, files, skills, etc.).

### Gotchas discovered in this environment

- Anonymous `curl`/GET to `https://o360.com` hits a Cloudflare challenge. The authenticated MCP POST to `/wp-json/mcp/novamira` succeeds.
- `novamira/run-wp-cli` fails because PHP `proc_open`/`exec` is disabled on the host. Use `novamira/execute-php` (full WP environment, `$wpdb`, etc.) or REST-style abilities instead.
- Do not update, deactivate, uninstall, or delete the Novamira plugin — that drops the MCP connection.
- Elementor v4 atomic widgets are **off**. Use the v3 Elementor abilities (`novamira/elementor-*`). Custom global colors/typography are the only allowed visual tokens (see `CLAUDE.md`).
- WordPress MCP is still used to **read** the live site during migration. Prove Next.js with `npm run lint`, `npm run build`, and `npm run dev`.
- Cloudflare still challenges anonymous GETs to `https://o360.com`; Next.js local/dev is the preview surface.
