# o360.com agent notes

Site operations for [o360.com](https://o360.com) go through the Novamira WordPress MCP connector. Working rules for backups, global styles, and fidelity live in `CLAUDE.md`. MCP client config lives in `.mcp.json`.

## End of every chat

Close every completed turn with two blocks:

1. **Summary** — what is true now (what ran, what changed, what did not).
2. **Questions** and/or **To do** — decisions needed from the user, and the next actions. Do not skip this even when the work looks finished.

## Cursor Cloud specific instructions

This repository is an MCP ops connector, not a local web app. There is no `package.json`, linter, test suite, or `dev` server. The “application” is the stdio proxy `@automattic/mcp-wordpress-remote`, which talks to `https://o360.com/wp-json/mcp/novamira`.

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
- There are no lint, test, or build commands in this repo. Prove connectivity with a read-only ability call (for example `novamira/execute-php` listing published pages, or `novamira/elementor-check-setup`).
