# o360

Working repository for **o360.com** — a live WordPress / Elementor site, edited
remotely through the Novamira MCP connector.

This repo holds no site code. It is the **control and audit layer** for a live
site: the working rules, the change log, and dated backups of anything that was
modified.

## Start here

| Read | For |
|---|---|
| **[`AGENTS.md`](AGENTS.md)** | the hard rules — read before touching anything |
| **[`docs/OPERATIONS.md`](docs/OPERATIONS.md)** | how the site actually works: gotchas, cache recipe, ID maps |
| [`backups/CHANGELOG.md`](backups/CHANGELOG.md) | every change made, with restore steps |
| [`CLAUDE.md`](CLAUDE.md) | the owner's original rules (auto-loaded by Claude Code) |
| [`.cursor/rules/o360.mdc`](.cursor/rules/o360.mdc) | the same rules (auto-loaded by Cursor) |

## The two things most likely to trip you up

1. **A stale image URL in `_elementor_data` does not mean a broken image.**
   Elementor re-resolves from the attachment ID at render time. Audit rendered
   output, not stored postmeta. (`docs/OPERATIONS.md` §3)
2. **`rocket_clean_post()` is not enough.** WP Rocket keeps separate used-CSS,
   above-the-fold and lazy-render tables that it does not clear, so your change
   will not appear live. (`docs/OPERATIONS.md` §4)

## Security

A live WordPress application password is committed in `.mcp.json` and remains in
git history. It needs rotating — see `AGENTS.md` §4. Do not add new secrets to
this repo; use an untracked `.env`.

## Conventions

- Back up before every change; never delete an original.
- Log every change to `backups/CHANGELOG.md` with old → new and how to restore.
- Colours and fonts reference the **custom** Elementor Globals only.
- o360.com is **live**. There is no staging.
