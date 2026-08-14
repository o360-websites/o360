# o360.com — Agent Handoff

Read this before touching anything. It applies to **every** agent and tool
(Cursor, Claude Code, or otherwise).

**o360.com is a live production website.** It is a real business's primary sales
channel. There is no staging environment. Every change you make through the
Novamira MCP connector is instantly public.

---

## 1. Hard rules (non-negotiable)

These come from the site owner and override any default behaviour.

1. **Back up before every change.** Never delete an original. Snapshot the thing
   you are about to modify first — for Elementor pages that means the full
   `_elementor_data` blob saved to a WP option, for settings it means a dated
   file under `backups/`.
2. **Log every change** to `backups/CHANGELOG.md`: what changed, old value → new
   value, and how to restore it. Commit and push it.
3. **Never empty the trash.** Deleted items are the last line of recovery.
4. **All colours and fonts must reference the CUSTOM Global Colors / Global
   Fonts** in the Elementor kit. Never set a colour or typography value directly
   on an element. See `docs/OPERATIONS.md` for the ID tables.
5. **Do not add or change Global Colors or Global Fonts without explicit
   permission.**
6. **Pick the global style by its name, not its tag.** A section heading uses
   "Section Title" even if two h2s then look different. An h1 page title uses
   "Page Title". Never rely on the bare HTML tag's default.
7. **Pay attention to detail.** When copying anything, carry hover states,
   opacity, overlays, background colours and spacing across too.
8. **When unsure, ask.** Accuracy matters more than speed.
9. **Do not change things without approval.** Propose, then wait.
10. **Never promise legal protection.** The site sells to healthcare practices.
    HIPAA copy must describe compliant hosting and workflows, never imply O360
    makes a practice compliant or provides legal advice.
11. **Prefer the higher-resolution image**, always, when deduplicating media.
12. **Be gentle with the server.** No sweeping multi-thousand-row operations, no
    full-domain cache purges. Work in batches and verify.

## 2. Rules of engagement for the live site

- **Never call `rocket_clean_domain()`.** Purge per-post only.
- Elementor's `execute-php` ability runs arbitrary PHP on production. Read
  before you write. Validate JSON before saving it back.
- After any Elementor edit you **must** run the full cache-purge recipe in
  `docs/OPERATIONS.md` §4, or your change will not appear live and you will
  conclude, wrongly, that it failed.
- **Verify against rendered output**, not against stored data. See §3 of
  `docs/OPERATIONS.md` — this is the single most common way to be confidently
  wrong about this site.

## 3. Where things are

| File | What it is |
|---|---|
| `AGENTS.md` | this file — start here |
| `.cursor/rules/o360.mdc` | the same hard rules, auto-loaded by Cursor |
| `CLAUDE.md` | the original owner-written rules (Claude Code reads this) |
| `docs/OPERATIONS.md` | **the operational manual** — gotchas, recipes, ID maps |
| `backups/CHANGELOG.md` | ~4,800 lines: every change made, with restore steps |
| `backups/` | dated JSON/markdown snapshots of settings and content |
| `.mcp.json.example` | shape of the connector config, without the secret |

Two files are **not** in the repo and will not be present in a fresh clone:
`WORKING-NOTES.md` (untracked, and stale — its page IDs predate several
renames, so do not trust it if you are handed a copy) and any `.env`.

`project-category-missing-landing-pages.md` is tracked but predates the current
marketing structure — treat it as historical.

## 4. Secrets

**There is a live WordPress application password committed in `.mcp.json`, and
it is in git history.** It has not been rotated. Do not add more secrets to the
repo, and do not copy that one anywhere else. The fix is to rotate the
application password in WP Admin, move the value to an untracked `.env`, and
reference it from `.mcp.json` — deleting the file alone does nothing, because
history retains it. `.mcp.json.example` shows the shape without the value.

Any Cloudflare WAF bypass header, API token or password belongs in an untracked
`.env` or a secret store. Before every commit:

```bash
git diff --cached | grep -iE 'password|secret|token|api[-_]key'
```

## 5. Current state (2026-08-14)

The marketing section is the active work area. Structure and content are being
finished ahead of a planned migration off WordPress.

Recently completed (batches 90–97 in the changelog): a new `SEO/PPC` top-level
menu; the founder bio moved above the FAQ on 8 pages; Healthcare SEO, PPC,
Social, Reputation and Content built out from ~9 sections to 17–19; per-page
Dental and Medical sections added to the four channel pages; FAQs expanded from
3 to 8 per page; the grey card frame cropped off the 7 generated SERP images.

Known open items are listed in `docs/OPERATIONS.md` §7.
