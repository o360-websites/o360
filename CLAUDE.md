# o360.com — Working Rules

These rules are mandatory for every session that makes changes to o360.com
(WordPress / Elementor via the Novamira MCP connector, or repo files).

## Backups & reversibility
1. When adding or changing any page, post, template, or template part, **do not
   delete the original**. Keep a backup first.
2. If a change cannot be backed up in place (e.g. an app/plugin setting), save
   the previous setting/data to a file in this repo before changing it, and log
   what was changed. Store these under `backups/` (a dated file per change) and
   `backups/CHANGELOG.md` (a running log: date, what changed, old value → new
   value, how to restore).
3. Goal: we must always be able to roll back to the previous version of any file
   or setting if something goes wrong.

## Global styles (fonts & colors)
4. ALL colors and fonts must be connected to **Global Fonts and Global Colors —
   the CUSTOM entries only**. Never pick a color or typography value individually
   on an element. Only use the custom entries from Global settings.
5. Do **not** change existing Global Fonts or Colors, and do **not** add new ones
   without asking for specific permission first. Every text tag must be connected
   to a global style — do not rely on the base HTML-tag typography (e.g. the h1
   tag's default). An h1 title should use the "Page Title" global style, etc.
   This means two h2 titles may look different because they are linked to
   different global styles.
6. When choosing a global style, use the style **name** as the guide (e.g. a
   section heading → "Section Title"). Most Section Titles may also be tagged h2,
   but always pick the global style that fits the item, not just its tag.

## Fidelity
7. Pay attention to detail. When copying anything, do not miss any detail —
   hover effects, colors, opacity, background overlays, spacing, etc.

## Uncertainty
- When unsure about anything, ask. Accuracy matters more than speed.
