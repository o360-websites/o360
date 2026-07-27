# o360.com Change Log

Running log of every change made to o360.com (WordPress/Elementor via the
Novamira MCP connector). Newest first. See the dated files in this folder for
pre-change snapshots and rollback details.

---

## 2026-07-27 — Blog archive template for /blogs/

**What:** Designed and published an Elementor Pro Theme Builder **archive**
template for the blog category archive at https://o360.com/blogs/ (category
"Blog", term_id 1). Previously `/blogs/` fell back to the bare hello-elementor
theme archive.

**New items created (nothing existing was modified or deleted):**
- `elementor_library` **86750** — "Loop: Blog Card" (loop-item). Custom post
  card: featured image, date, title, excerpt, "Read More" button. All colors
  and fonts connected to CUSTOM Global Styles only.
- `elementor_library` **86751** — "Archive: Blog (o360)" (archive). Dark-blue
  gradient hero + Loop Grid (3/2/1 cols, `current_query`, numbered
  pagination) rendering card 86750.

**Display condition assigned to 86751:**
`include/archive/category/1`  (Blog category archive → term_id 1)
Stored in `_elementor_conditions` meta and the
`elementor_pro_theme_builder_conditions` option (group `archive`).
Elementor conditions cache regenerated; WP Rocket + Elementor CSS caches purged.

**Global Styles used (CUSTOM entries only — none were created or edited):**
- Colors: White `280a08c5`, Light 1 `79960d2b`, Light 2 `337aa567`,
  Black 5 `231914e5`, Black 9 `302bb9f2`, Dark Blue 0 `3f3fa98`,
  Dark Blue 3 `320caf86`, Dark Blue 4 `8d0ae40`, Orange 3 `2fb5ebc2`,
  Orange (Hover) `7f0634a`.
- Typography: Pre-Titles `b1592aad`, Page Title XL `bc7cafe`,
  Page Subtitles Thin `11d267e`, Paragraph Title (h3) `78b2240a`,
  Bullet Header `5d0888b`, Button 1 `48f24b0`.
- Known exception: the post **excerpt** text has its color connected to a
  global (Black 5) but its font inherits the kit's global body font (Avenir),
  because no CUSTOM body/paragraph typography global exists. This matches the
  site's own single-post template. Flagged to the user; a dedicated "Card Body"
  global would require permission before adding.

**Verification:** Live `/blogs/` returns HTTP 200 with the archive template
applied (`elementor-location-archive`), 4 cards showing real post titles and
real featured images, hero, and Read More links.

**Rollback:**
1. Delete templates 86750 and 86751 (or set 86751 to draft). Elementor
   regenerates the conditions cache on save, restoring the theme default
   archive for `/blogs/`.
2. If needed, restore `elementor_pro_theme_builder_conditions` from
   `2026-07-27-conditions-cache.json`.
Pre-existing draft archive templates 83365 and 86465 were left untouched.
