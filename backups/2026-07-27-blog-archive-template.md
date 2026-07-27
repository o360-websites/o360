# Backup — Blog Archive Template (2026-07-27)

Pre-change snapshot taken before creating a Theme Builder **archive** template
for the blog category archive at https://o360.com/blogs/ and assigning its
display condition.

## Routing / how /blogs/ is served (unchanged data)
- `/blogs/` is the **category archive** for category `Blog`
  (term_id `1`, slug `blogs`, 4 published posts).
- `show_on_front=page`, `page_on_front=10545`, `page_for_posts=0`.
- Permalink structure: `/%category%/%postname%/`, `category_base` empty.
- Active Elementor kit: `79953`. Elementor Pro active (v3 surface).

## Theme Builder state BEFORE change
No **published** archive template targets the blog archive, so `/blogs/`
falls back to the hello-elementor theme default archive.

Existing archive templates (both **draft**, not applied):
- `83365` "Archive: Blog" — type `archive`, status `draft`, conditions: `""`
- `86465` "Elementor Archive #86465" — type `archive`, status `draft`,
  conditions: `["include/archive/category"]`

Related published templates (left untouched):
- `86421` "Elementor Single Post #86421" — single-post, `include/singular/in_category/1`
- `86551` "Header - Inner Pages" — header (auto-applies to inner pages)
- `26539` "Footer" — footer `include/general`

## Full theme-builder conditions cache BEFORE change
Saved verbatim in `2026-07-27-conditions-cache.json` in this folder.

## What this change adds (see CHANGELOG.md)
- NEW loop-item template (custom blog card).
- NEW archive template (hero + loop-grid) scoped to `include/archive/in_category/1`.
- No existing templates, pages, global colors, or global fonts are modified or deleted.

## How to roll back
1. Delete the two NEW templates created by this change (IDs recorded in CHANGELOG.md).
2. Elementor regenerates the theme-builder conditions cache automatically on save,
   restoring the previous state (draft-only archive templates, theme default archive).
   If needed, restore `elementor_pro_theme_builder_conditions` from
   `2026-07-27-conditions-cache.json`.
