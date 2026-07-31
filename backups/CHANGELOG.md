# o360.com Change Log

Running log of every change made to o360.com (WordPress/Elementor via the
Novamira MCP connector). Newest first. See the dated files in this folder for
pre-change snapshots and rollback details.

---

## 2026-07-31 — Specialty template ACF wiring + endodontic test connection

**Template:** 86918 "Landing for Websites". **Backups:** full pre-change copy →
draft template **86920**; ACF group definition snapshot → option
`o360_acf_group_backup_20260731`.

**New ACF fields added** to "Websites Landing Fields" (group 86673, DB):
`problem_headline` (text), `problem_text` (textarea), `ppc_text` (textarea),
`social_text` (textarea), `exclusive_image` (image). `faq_content` already
existed (86741) and reads existing page data. No fields removed.

**Template bindings added (15 ops):** hero H1←specialty_headline, hero
H2←hero_subtitle, mobile paragraph←mobile_text, problem headline/text←new
fields, videos paragraph←videos_text, marketing H2←marketing_headline,
organic←seo_text, PPC←ppc_text (new), social←social_text (new), why-choose
H2←specialty_name ("Why X Choose O360", fallback "Doctors"). Widget swaps per
request: mobile slides(4)→single image bound to mobile_image (fallback =
1st slide 81920); Custom-Exclusive image-carousel(8)→single image bound to
exclusive_image (fallback = carousel img 86514). Process section UNBOUND
(process_text/process_image now static). Text fallbacks copied verbatim from
legacy template 79588; new-field fallbacks are generic healthcare guide copy.
Examples loop already connected via snippet #17 (`o360_specialty_examples`
reads `portfolio_terms`). Stat bar left static per decision. Hero background
images left static per decision.

**Endodontic test:** 86918 converted to Theme Builder single-page with
condition `include/singular/post/86716` (only /websites/endodontic/).
endodontic `exclusive_image` set to its former featured image (80163).
Verified live: endodontic renders the new template with its own ACF values;
/websites/dental/ unchanged on old template 79588.

**Rollback:** restore 86918 data from 86920, set `_elementor_template_type`
back to `page` (+ library term), delete `_elementor_conditions`, regenerate
conditions cache.

---

## 2026-07-31 — /web-design/ de-dynamicised (ACF fallbacks → static)

**Page:** 86913. The PDF rebuild was fully reverted first (restored from backup),
returning the page to its original design. Then, per request, every ACF
dynamic-tag binding whose fallback was the visible content was made static
(fallback copied into the widget's own control, dynamic binding removed) — so
the front end is pixel-identical with zero dynamic content in the backend.

**Backups (drafts, full copies of the original):** 86915 and 86917.

**Converted (26 bindings):** 4 heading titles, 14 text-editors (preserving any
appended "after" HTML link), 5 container background images, 3 image widgets.

**Left dynamic on purpose (3 — not ACF text/title/image):**
- 1 `acf-url` on the hero special-effect video (5cda2762). Making it static
  caused the video widget to stop rendering (Elementor/AnywhereElementor quirk),
  so it was restored to its dynamic form — still shows the same fallback video.
- 2 `popup` action tags on the video icon-list items (open the Videos-Medical /
  Videos-Dental popups) — functional links, no fallback content.

**Verified:** live page 200; hero/intro/stat bar/video/popups all render;
no `[elementor-tag]` literals; image + `<video>` counts match the backup.

---

## 2026-07-31 — /web-design/ rebuilt to PDF pillar-page spec

**Page:** 86913 (/web-design/). Rebuilt its Elementor content from the
"O360 Web Design Page Content" PDF spec (31 Jul 2026).

**Backup:** full pre-change copy of 86913's `_elementor_data` + settings +
rank_math meta saved to draft page **86915** ("Web Design — BACKUP 2026-07-31").
Rollback = copy 86915's `_elementor_data` back onto 86913.

**What changed:**
- Replaced the 201KB cloned template tree with a 20-section pillar page built to
  the PDF: hero, corrected proof bar (41 / 434+ / 94% / 20+ — old 3,100 /
  860k visits / 67k appts / 5-star removed), providers H2, 6-feature grid,
  exclusive-by-design, visual effects, mobile-first, patient video, HIPAA,
  accessibility, after-launch ($99 vs ~$250), logo, 7-step process, examples,
  specialty router (auto-linked to all published /websites/ pages),
  What's-Included tabs (PPC tab dropped), marketing band, named testimonials,
  11-Q&A FAQ accordion, closing CTA. All type/colour wired to CUSTOM globals.
- **Removed all ACF dynamic-tag bindings** (the ~29 broken elementor-tag refs
  pulling from non-existent fields) — content is now static.
- Images intentionally skipped (per request).
- SEO: rank_math_title → "Healthcare Web Design for Medical & Dental Practices |
  O360"; description + focus keyword "healthcare web design" set; stale
  VideoObject schema meta removed.
- Removed two broken "Learn more" links: /products/video/ (redirects back to
  /web-design/) and /products/accessibility/ (missing page).

**Redirect:** `2104` regex `^websites/healthcare(/page/[0-9]+)?/?$` →
`/web-design/` (301). Page /websites/healthcare/ (86753) left published but
now 301s.

**Verified:** live /web-design/ returns 200; H1, proof bar, features, router,
FAQ, closing all render; no leftover `[elementor-tag]`.

**Open items from the PDF needing your input (not applied):** founding year of
Optimized360 LLC + year Solution21 sold; real cumulative website count;
Texas/NY office status; FAQPage schema config; images; and the
/products/accessibility/ + /products/video/ page fixes.

---

## 2026-07-31 — Rank Math 404 fallback + portfolio/project-category redirects

**Settings (see 2026-07-31-rankmath-settings.md):**
- `rank-math-options-general` → `redirections_fallback`: `homepage` → `default`.
  Stops all 404s (incl. Elementor template URLs) from soft-redirecting to home.
  404 Monitor already active (advanced) — left on to track missing pages.

**Redirects created (Rank Math, 301, via `RankMath\Redirections\DB::add`):**
- `2065` — regex `^portfolio(/[^/]+)?/page/[0-9]+/?$` → `/portfolio/`
  (all paginated portfolio/portfolio-taxonomy URLs; numeric portfolio items unaffected).
- `2083` — regex `^project-category/page/[0-9]+/?$` → `/websites/` (bare listing pagination).
- `2084`–`2099` — regex `^project-category/{slug}/page/[0-9]+/?$` →
  `/websites/{mapped}/` for 16 specialties (chiropractic, dental, dental-lab,
  endodontic, optometry, medical, medical-spa, mental-health, obgyn, orthodontic,
  orthopedic, pain-management, cosmetic-surgery, podiatry, urgent-care,
  veterinarian→veterinary). **Pagination only.**

**Main pages** for these project-category slugs are handled by the PRE-EXISTING
exact-match rules (ids 2044–2061 + older), left untouched. An earlier set of
main+pagination regex rules (2066–2082) was created then DELETED to avoid
duplicating those — replaced by the pagination-only rules above.

**Pediatric & Telemedicine (resolved):**
- Created & PUBLISHED `/websites/pediatric/` (86905), pediatrician-focused content
  (portfolio term 246, hero image 83553).
- PUBLISHED `/websites/telemedicine/` (86866) — previously a draft from the batch.
- Redirect updates: `2056` (project-category/pediatric) → `/websites/pediatric/`;
  `2059` (project-category/telemedicine) → `/websites/telemedicine/`.
- New pagination redirects: `2101` `^project-category/pediatric/page/[0-9]+/?$`
  → `/websites/pediatric/`; `2102` `^project-category/telemedicine/page/[0-9]+/?$`
  → `/websites/telemedicine/`.

**Bare /project-category/ root → /portfolio/:** GSC analytics table was empty
(can't measure live traffic), but the namespace has redirect-hit history, so the
deprecated root goes to the portfolio archive. `2100` `^project-category/?$` →
`/portfolio/`; `2083` (bare pagination) repointed `/websites/` → `/portfolio/`.

**Rollback:** delete redirects 2065, 2083–2102 (2083 repointed); restore fallback
per the settings backup; unpublish pages 86905 & 86866 if drafts are preferred.

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
