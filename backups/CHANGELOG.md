# o360.com Change Log

Running log of every change made to o360.com (WordPress/Elementor via the
Novamira MCP connector). Newest first. See the dated files in this folder for
pre-change snapshots and rollback details.

---

## 2026-07-31 — Specialty template batch 3 (AI section, gallery ACF w/ default, encoding fix)

**Template:** 86918. **Backup:** pre-batch copy → draft **86953**. User's own
editor changes (new "Vision and Values" section, founder headline fix, Packages
retitle, Post Content moved after CTA) detected and preserved.

1. **AI section drafted** — copy of the Educational Videos section (carousel
   with 3 placeholder images, h3, intro, 3-item accordion, checklist), static
   content, inserted after Result-Driven Marketing. Copy: "Optimized for AI
   Search" + Structured Data / Readable by AI Crawlers / AI Visibility
   Optimization.
2. **Preview fix** — template preview pinned to endodontic
   (page_settings preview_type=single/page, preview_id=86716); the "first blog
   post" was preview-only sample data, live pages confirmed clean.
3. **Video slider → ACF with default** — widget restored to image-carousel
   bound to `videos_gallery` (max 3 images); snippet **#21** (acf/load_value)
   returns default images [83581, 83577] when a page's field is empty —
   solving the no-fallback problem. Endodontic's explicit value cleared →
   uses default.
4. **Encoding fix** — all 38 dynamic-tag settings re-encoded with rawurlencode
   (%20); editor no longer shows "+" between words in fallback texts.
5. 3D/watermark idea dropped by user for this page.

**Rollback:** restore 86918 from 86953; disable snippet 21.

---

## 2026-07-31 — Specialty template batch 2 (items 1–17)

**Template:** 86918. **Backup:** pre-batch copy → draft **86926**.

**20 new ACF fields:** hero_image_1–4, specialty_icon, mobile_headline,
problem_image, videos_gallery (gallery — ACF Pro confirmed), multimedia_headline,
examples_headline, process_headline, marketing_intro, whyus_headline,
whyus_1–3_image, whyus_1–3_text, cta_headline. Group = 59 fields.

**Template edits (22 ops):** 4 hero images bound (fallback = current images,
links removed); mobile/multimedia/examples/process/CTA headlines bound; problem
image bound; edu carousel bound to videos_gallery (acf-gallery); process
text/image re-bound to existing fields; marketing intro bound; why-us headline
switched to single field (fallback "Why Doctors Use O360"); 3 why-us boxes bound
(image + text), box-1 title static → "Founded and Run by Doctors"; FAQ accordion
→ rich-text blob bound to faq_content (fallback = the 9 dental Q&As as h3/p
HTML); NEW full-width zero-pad Post Content slot (container pcslot01) inserted
after FAQ for future per-page widgets; marketing box texts set to flex-grow so
buttons align bottom.

**Snippet #20** (Code Snippets, active): swaps targeted icon-list bullet icons
with the page's `specialty_icon` ACF image (hero benefits list 211696d9;
extendable). Static tooth icons remain the fallback.

**Endodontic:** videos_gallery filled with the template's 3 images
(gallery fields have NO fallback — every connected page needs values).
Live-verified: box-1 "by Doctors", endodontic FAQ blob (dental accordion gone),
why-us/CTA fallbacks, hero images, carousel, marketing intro, Post Content slot.

**Rollback:** restore 86918 from 86926; disable snippet 20.

**Batch-2 fixes (same day):** (1) Educational Videos: acf-gallery binding
dropped (no fallback support) — replaced with a static horizontal 2-slide
slider (video-dental-responsive 83581, video-responsive-1 83577), settings
cloned from the original mobile slider; `videos_gallery` field kept but
unused. (2) FAQ: standalone heading widget removed — the H2 now lives inside
the blob (fallback prepended with "<h2>Dental Web Design FAQ</h2>"; each
page's faq_content must include its own h2, endodontic already does).
(3) 429s traced to my domain-wide cache purges + cache-busting fetch loops —
switched to targeted purges and single fetches.

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

## 2026-08-01 — Batch 4: + sign cleanup, AI section ACFs
Template 86918, backup → draft 86954. (1) Cleaned literal "+" signs baked into
two fallbacks (problem_text, whyus_1_text) during the broken-encoding window;
re-encoded properly. (2) New ACFs ai_headline + ai_text bound to the AI
section's heading/intro (user's restyled "AI Optimization" copy preserved as
fallbacks). Live-verified on endodontic. Rollback: restore from 86954.

## 2026-08-01 — Orthodontic connected + content filled
Template 86918 conditions now [endodontic 86716, orthodontic 86714]. Filled
86714's empty ACF fields (problem, marketing intro, PPC/social, AI text, why-us
headline, CTA, section headlines) — weaving project_category term 227 content:
area_2_text → marketing_intro verbatim; term description's family-friendly/
all-ages insight → problem_text. exclusive_image=80164 (old featured),
problem_image=83999 (term ft image). Existing refreshed values (hero, mobile,
videos, seo, FAQ) kept. Live-verified. Rollback: remove condition + fields are
per-page data.

## 2026-08-01 — Batch 5: Intro + Exclusive ACFs, carousel rebound
Template 86918, backup → draft 86962. New fields: intro_headline/text/image,
exclusive_title/subtitle/text (group now 67). Bound to the user's new Intro
section and restructured Exclusive section (fallbacks = current content;
exclusive_image binding intact). Re-added Edu Videos carousel (new widget
f4af3f2) rebound to videos_gallery (default filter #21 still active).

## 2026-08-01 — Batch 6: icon relabel, carousel restore, edu redesign, lists/overlays via ACF
Template 86918, backup → draft 86969 (B6). ACF group 86673 now 76 fields.

**ACF changes:**
- specialty_icon relabeled "Specialty Icon", instructions "Used as a water mark
  and decoration in the design." (field kept, no longer drives hero list icons)
- New fields: pain_points (textarea, one item per line), videos_headline,
  videos_subtitle, videos_video (url), videos_examples (radio dental/medical,
  default dental), ai_subtitle, cta_text, exclusive_overlay_color,
  video_overlay_color (color pickers w/ opacity)

**Template edits (saved in one pass):**
- Exclusive section: original 8-image carousel restored from backup 86920,
  static (exclusive_image + videos_gallery ACFs now unbound/parked)
- Edu Videos: image carousel → autoplay video widget f4af3f2 bound to
  videos_video, default = special-effects section video
  (video-dental-website-min.mp4); title bound to videos_headline; new subtitle
  widget bound to videos_subtitle (fallback "Get More Treatment Plans Accepted
  by Patients"); text → videos_text; toggles static
- AI section: new subtitle widget bound to ai_subtitle (fallback "Ready for
  ChatGPT, Gemini & AI Search")
- CTA: text bound to cta_text; buttons static

**Snippets:**
- #20 (specialty icon override) DISABLED — icons now universal per user
- #22 NEW+active "Websites landing: pain list, examples toggle, overlay colors
  (ACF)": (1) pain icon-list 16f27e52 items from pain_points, empty = static
  fallback (Affordable Solutions / 100% Transparency / First Page Results /
  No Setup Fees / No Contracts); (2) examples icon-list b388dce keeps
  "See Examples:" + only the Dental|Medical item chosen in videos_examples;
  (3) wp_head CSS overrides overlay color of Exclusive (d6b7ac6) and video
  (5d7022fd) sections from exclusive_overlay_color/video_overlay_color —
  empty fields emit nothing (design defaults untouched)

**Verification:** /websites/orthodontic/ HTTP 200 after targeted purge: pain
fallback items render, examples shows Dental only, autoplay video present,
subtitles present, carousel present, no PHP errors, no overlay CSS (correct —
fields empty).

**Rollback:** restore template from draft 86969; disable snippet #22;
re-enable #20; delete the 9 new fields (per-page data unaffected).

## 2026-08-01 — Batch 7: Rich-text ACF architecture (big restructure)
Template 86918, backup → draft **86979 (B7)**. NOTE: user's 15:02 Elementor
save (stale session) had reverted the batch-6 template edits (edu video,
subtitles, carousel restore) and batch-5 intro/exclusive bindings — all
re-applied here under the new architecture.

**Concept (user-approved):** all title/subtitle and text ACFs are now WYSIWYG
(rich text). Titles merged with their subtitles into ONE field (add H1/H2 +
an H5 one-liner in the editor). Texts allow paragraphs, bullet lists and
quotes. Lists in rich text are auto-styled like site icon lists via a central
stylesheet. Hero benefits icon-list stays a separate static icon list.

**ACF group 86673:**
- 27 fields converted text/textarea → wysiwyg (all *_headline/_title +
  hero_intro, *_text, marketing_intro, exclusive_headline, cta_text)
- Trashed (reversible): hero_subtitle, exclusive_subtitle, videos_subtitle,
  ai_subtitle, pain_points (merged into their main fields)
- New: founder_quote (wysiwyg, field 86980)
- faq_content (86741) re-parented into the group (was orphaned, parent 0)
- 16 tab fields added; fields regrouped per section: Hero / Intro / Exclusive
  / Mobile / Pain Points / Edu Videos / Multi-Media / Examples / AI / Process
  / Marketing / Founder / Why Us / FAQ / CTA / Legacy (unused)
- All rich fields got formatting instructions (H1=page title, H2=section
  title, H3=paragraph title, H5=subtitle line)

**Heading-level → Global Font convention (via ACF CSS):**
H1=Page Title Bold, H2=Section Title Bold, H3=Paragraph Title,
H4=Widget Title, H5=Pre-Titles, H6=Section Title Thin. Widget variants:
acf-rich--h2-thin, acf-rich--h5-thin. Colors keep coming from each widget's
Global Color (headings inherit).

**Template 86918 (33 ops, one save):** every bound heading widget converted
to a text-editor widget with class `acf-rich` (+`--light` on dark sections)
bound to its merged wysiwyg field; fallbacks preserved and merged (e.g. hero
= <h1>Healthcare Website Design</h1><h5>Be the #1 Doctor in Your Town</h5>).
Deleted (merged away): hero subtitle 463df37b, exclusive subtitle e259a0c,
pain icon-list 16f27e52 (list now lives inside problem_text fallback as <ul>).
Re-done from batch 6: Exclusive original 8-img carousel restored from backup
86920 (static); edu f4af3f2 image-carousel → autoplay video bound to
videos_video (default = special-effects video). New: founder quote
text-editor widget under Dr. Sean bio bound to founder_quote (fallback = the
"I never forget the other side!" line, removed from the founder icon-list
22cea9be, 5→4 items). AI headline typo fixed in fallback ("Optimizaed" →
"Optimized"). d089247 (Intro text) re-bound intro_text (was wrongly on
problem_text after user's stale save).

**Per-page data migration (86716, 86714):** plain headline values wrapped in
<h1>/<h2>/<h3>; subtitle values merged as <h5>; pain_points lines merged into
problem_text as <ul> (86714 had none). Orphaned values of trashed fields left
in place (harmless).

**ACF CSS (central stylesheet):** Elementor Custom Code post **86997
"ACF CSS"**, location head, condition entire site, prints
<style id="o360-acf-css">. All rules reference CUSTOM Global Font/Color CSS
variables (responsive sizes inherited from the kit). Repo copy:
`assets/acf-css.css`. Gotchas fixed: conditions cache had to be added to
`elementor_pro_theme_builder_conditions[elementor_head]`; WP Rocket
Remove-Unused-CSS was stripping the inline style — snippet #22 part 4 adds
`rocket_rucss_inline_atts_exclusions` for o360-acf-css +
o360-specialty-overlay-colors, and stale RUCSS rows for the two test pages
were deleted; `\2714` checkmark backslash restored (wp_slash).

**Snippets:** #21 (videos_gallery default) DISABLED — obsolete. #22 rewritten:
pain-list part removed (widget gone); keeps examples dental/medical toggle +
overlay colors; adds ACF admin badge ("Customized" / "Using default" on every
Websites Landing field) + the RUCSS exclusion.

**Verification:** orthodontic + endodontic HTTP 200, no PHP errors, no tag
leakage; 1× <h1>; founder quote renders once (blockquote) and is gone from
the icon list; edu autoplay video present; exclusive carousel present;
examples shows Dental only; ACF CSS rules present in head; 44 acf-rich zones.

**Rollback:** restore template from draft 86979; untrash the 5 fields; delete
tab fields + founder_quote; re-enable #21; restore snippet #22 from this log;
delete Custom Code post 86997 (and its cache entry); per-page values: strip
the added <h1>/<h2>/<h5>/<ul> wrappers.

## 2026-08-02 — Batch 8: All specialty pages connected to new template
Snapshot: `backups/2026-08-02-specialty-connect-snapshot.json` (old values +
conditions + rollback recipe).

**Customization audit** (real differences vs bulk-stamped defaults): every
page carries the same 7-image / 21-text default stamp, so raw counts don't
discriminate. Measured against each field's most-common value: no page except
orthodontic (4 custom images) and endodontic (3) exceeds the 4-image bar —
both already live on the new template. Verdict: ALL remaining pages fall in
the "less customized" group.

**Connected 43 pages** to template 86918 (include/singular/post/N, conditions
now 45 entries; cache option updated). Left OFF the new template:
orthodontic + endodontic (already on), veterinary 82294 (bespoke page,
excluded from old template too), healthcare 86753 (slated for /web-design/
redirect).

**Per-page migration** (all 43): specialty_headline wrapped <h1> +
hero_subtitle merged as <h5>; legacy exclusive_headline title ("Stand Out
with a Stunning, Exclusive X Website") moved to multimedia_headline as <h2>
(its slot in the new design) and exclusive_headline blanked so the Multi-Media
ownership paragraph falls back; marketing_headline wrapped <h2>. Images per
user instruction: exclusive_image = old featured image (22 legacy pages;
medical-spa + family-physician have no thumbnail); mobile_image and
special_video already live in the same fields (carry over automatically);
hero images 1–4, edu video, and all other images left on defaults.

**Verification:** oral-surgery (legacy) + cardiology (new batch) render on
86918: correct <h1> + <h5>, custom Multi-Media <h2>, ownership fallback,
founder quote once, ACF CSS, edu video, no tag leakage, no PHP errors.
Targeted purge of all 43 pages.

**Rollback:** restore conditions from snapshot (meta + cache option), then
per-page: unwrap h1/h2 per recipe, move multimedia_headline back to
exclusive_headline, delete exclusive_image metas.

## 2026-08-02 — Batch 9: Intro section content from taxonomy descriptions
First content round on all 45 specialty pages on template 86918.

- intro_headline set to "<h2>[Specialty] Web Development</h2>" (specialty name
  derived from each page's H1, e.g. "Hospital & Clinic Web Development")
- intro_text = the page's project_category term Description (mapped via
  portfolio_terms meta; both fields were empty on every page before — no data
  overwritten)
- Written from scratch (no/empty term description), in the style of the
  existing descriptions: funeral-home 86728 (no term exists) and home-care
  86869 (term 2766 description was empty — new text also saved to the term)
- Notes: family-physician + internal-medicine share term 248, so both carry
  the same intro text for now; radiology (318 chars), telemedicine (340) and
  anti-aging (342) have unusually short term descriptions — copied as-is,
  flagged for a later content pass

Verified live on cardiology (title + text render in the Intro section).
Targeted purge of all 45 pages.

Rollback: delete intro_headline/intro_text metas (were empty); restore term
2766 description to empty.

## 2026-08-02 — Batch 10: Content round 1 — product-clarity layer, all 45 specialty pages
Backup snapshot of all overwritten fields (16 fields × 45 pages, 236 KB):
**server-side** at `wp-content/uploads/o360-backups/2026-08-02-content-round1-snapshot.json`
(Cloudflare blocked pulling it into the repo; restore by reading that file and
re-applying values via update_post_meta).

**Keyword system used:** product (website/web/site) × craft (design,
development, building, built from scratch, hand-coded, HTML, CSS, no page
builders, no templates) × quality (custom, exclusive, high-end, beautiful,
best, proven) × trust (ownership, area exclusivity, no setup fees/contracts,
since 2003) × specialty (practitioner, 3 procedures, "near me" search phrase
per specialty — data table in this batch's generator).

**Written per page (15 fields):** hero_intro (3 rotating product-clear
variants), exclusive_title/text, problem_headline (practitioner vs
organization variant) + problem_text (with 5-item benefit list),
ai_headline/ai_text (specialty procedures + search phrase), videos_headline,
mobile_headline, process_headline, examples_headline, whyus_headline,
cta_headline/cta_text, faq_content (4 Q&As: cost, page-builder/hand-coded,
exclusivity, timeline). All H1s normalized to "[Specialty] Website Design".
Orthodontic (9 fields) and endodontic (2 fields) kept their existing
hand-written content — only empty fields were filled there.

**Verification:** dermatology + funeral-home render: H1 pattern, product hero,
benefit list, FAQ, AI section, exclusive section, no tag leakage, no errors.
Targeted purge of all 45.

**Known trade-off (flagged to user):** sections are template-generated with
per-specialty tokens — intentionally formulaic v1 for coverage; user will
review and individualize.

## 2026-08-02 — Batch 11: Edu Videos fallback video swapped
Template 86918, backup → draft 86999 (B8). Educational Videos autoplay widget
(f4af3f2, bound to videos_video): static URL + dynamic-tag fallback changed
from the special-effects video (video-dental-website-min.mp4) to
https://o360-media.s3.us-west-1.amazonaws.com/videos/O360_Landing_Video_BG1080.mp4
per user. Multi-Media section video (special_video) untouched. Verified on
dermatology (new video renders; page 200). Rollback: restore from 86999.

## 2026-08-02 — Batch 12: Rollback of all-rich-text; uniform Title/Subtitle/Rich/Media structure
Template 86918, backup → draft **87001 (B9)**. User reversed the "everything
in rich text" decision. New uniform per-section structure: Title (H2, Section
Title Bold global; hero = H1, Page Title Bold), Subtitle (span, Section Title
Thin global), Rich Text (wysiwyg, acf-rich styling kept for lists/quotes),
Image(s)/Video, plus each section's static design items.

**ACF group:**
- 13 title fields converted wysiwyg → plain text
- Untrashed: hero_subtitle, exclusive_subtitle, videos_subtitle, ai_subtitle
- New: 13 *_subtitle fields, faq/founder/advanced/hipaa titles, examples/
  whyus/founder/advanced texts (wysiwyg), examples/marketing/founder/faq/cta/
  ai/advanced images; hipaa_text → wysiwyg; exclusive_headline relabeled
  "Text (Ownership)"; new tabs HIPAA + Advanced Features (hipaa fields moved
  out of Legacy). Every section tab now has ≥ title/subtitle/text/media.
- Admin: snippet #22 part 5 = two-column tab layout (left 40% title/subtitle/
  media/misc, right 58% rich-text editor)

**Page data migration (45 pages, 584 ops):** h1/h2 wrappers stripped back to
plain titles; embedded <h5> subtitles split into *_subtitle fields; FAQ blob's
leading <h2> moved into faq_title.

**Template (58 ops, one save):** all 16 section titles normalized to
h2+Section Title Bold (hero h1+Page Title Bold) and bound; existing subtitle
widgets rebound (hero, exclusive, ai, cta) as span+Thin; 12 new subtitle
widgets inserted; rich-text widgets bound incl. intro_text fix (was
problem_text), founder bio → founder_text, cta_text, hipaa_text; images bound:
intro_image (db35885), hipaa_image (eec954f), marketing_image (5659f59f),
founder_image (59cba201); NEW sections bound: HIPAA (hipaa_*), Advanced
Features (advanced_*), updated AI (ai_headline/ai_subtitle/ai_text); edu
image-carousel (restored by user's save) converted back to autoplay video
bound to videos_video, fallback = O360_Landing_Video_BG1080.mp4; FAQ got
title+subtitle widgets (blob fallback h2 stripped); empty-fallback rich
widgets added to Examples/Advanced/Why-Us (invisible until filled).

**Verification:** cardiology + dental: 200, plain H1, 20 H2 titles, span
subtitles, new edu video, single FAQ title, HIPAA + Advanced Features render,
no tag leakage, no wrapper leakage, no PHP errors. All 45 purged.

**Rollback:** template from 87001; ACF: re-convert titles to wysiwyg +
re-trash the 4 subtitle fields + delete the new fields/tabs; page values:
re-wrap via batch-7/8 patterns (or restore from server snapshot
2026-08-02-content-round1-snapshot.json for text fields).

## 2026-08-02 — Batch 13: Field renames, AI boxes ACF, first two reviews ACF
Template 86918, backup → draft **87032 (B10)**.
- **Labels:** 77 fields renamed to short uniform "[Section] [Role]" scheme
  (Hero Title, Pain Text, Videos Video URL, Multi-Media Ownership Text, …);
  fixed the bare "Subtitle"/"Title"/"Text"/"Image" labels
- **AI boxes:** new fields ai_1..3_image/title/text (image, text, textarea) in
  the AI tab; the three AI image-boxes (e1ab758, 2b26def, 92bd509) bound on
  image/title/description with current content as fallbacks (Schema Data
  Built-In / Readable by AI / AI Visibility Optimization)
- **Reviews:** new "Reviews" tab with review_1/2 image+title+text+name+domain;
  review avatars (5f2745e5, 4d30ca91) bound as acf-image with current photos
  as fallback; snippet #22 part 6 rebuilds a review card's text block from the
  ACF fields (title bold line, text, name bold, domain link — same markup as
  the static cards) only when at least one field is set; empty = original
  static reviews unchanged
Verified on cardiology (AI box titles + review fallbacks render, no leaks).
Rollback: template from 87032; delete the 19 new fields + Reviews tab;
remove snippet part 6; labels are cosmetic.

## 2026-08-02 — Batch 14: Compatible & Compliant section ACFs
New user-added section (root 8cda788) wired to the standard structure:
compat_title / compat_subtitle / compat_image / compat_text created + new
"Compatible & Compliant" tab (after HIPAA). Bound: title f0938dd (h2, Section
Title Bold), subtitle 165fb90 (span, Thin), text f6e16b0 (acf-rich, fallback =
current copy), image e80ddb3 (fallback = current, second image 825aefb left
static). Rollback: remove the 4 fields + tab; unbind via backup 87032 lineage.

## 2026-08-02 — Batch 14b: Tab order fix
Compatible & Compliant tab was appended after Legacy; full tab/field order
re-applied (148 slots): ... HIPAA → Compatible & Compliant → Advanced
Features → AI ... Reviews confirmed intact (tab 87052 + 10 fields + avatar
bindings + snippet part 6 active).

## 2026-08-02 — Batch 15: Content rules applied — medical fallbacks, Orthodontic + Endodontic pages
Template 86918, backup → draft **87058 (B11)**. Source: Specialty_Page_Content_Rules.md (user upload).

- **Fallbacks (74 tags):** entire template fallback set rewritten to the
  "medical" worked content per the rules — every section title/subtitle/rich
  text, AI boxes, founder bio + quote, why-us boxes, marketing boxes, full
  medical FAQ (9 Q&As). Statics: stat bar converted to craft metrics
  (3,100+ CUSTOM WEBSITES / 40+ HEALTHCARE SPECIALTIES / 20+ YEARS /
  434+ 5-STAR REVIEWS — patient-outcome numbers removed per rules; they
  belong to a future marketing stat bar). Hero bullet list: user had already
  rebuilt it (bfa5f29) with the 6 rule bullets — untouched. Pain section was
  already positioned after Intro (user's own move).
- **Accuracy guardrail:** "no setup fees" claim scrubbed from problem_text +
  faq_content on all other 43 pages (86 values) → "no long-term contracts".
- **Orthodontic 86714:** 68 fields written verbatim from Layer 3 (images,
  videos, overlay colors, reviews untouched per instructions).
- **Endodontic 86716:** 43 fields written fresh per the rules (referral-driven
  + pain/anxiety angle; root canal, retreatment, apicoectomy, cracked tooth,
  emergency searches, AAE conference reference, referring-dentist FAQ).
  hipaa/compat/founder/why-us box texts intentionally left empty → neutral
  medical fallbacks render (clarity layer is constant per rules).
- Verified live: both pages 200, correct H1s, pain H2, specialty FAQs, craft
  stat bar, no setup-fee claim, no tag leakage.
Rollback: template from 87058; ortho/endo page values from server snapshot
2026-08-02-content-round1-snapshot.json + this log.

## 2026-08-02 — Batch 16: ACF backend cleanup + process list fix
- Instructions wiped on all 71 group fields (backend shows only field boxes +
  names, per user)
- Badge feature removed from snippet #22 (ACF now escapes label HTML — badges
  were printing as raw markup; part 3 deleted entirely)
- Two-column layout fixed: wysiwyg fields now ordered FIRST inside each tab so
  the float:right editor starts at the top beside the left stack (title/
  subtitle/media at 40% left, editor 58% right)
- process_button_link moved to Legacy tab (no button fields in the ACF area)
- Numbered 1–4 steps removed from process_text on 86714 + 86716 and from the
  template fallback/static (the static step boxes under the image carry them)
Verified endodontic live: 200, ol gone, no errors.

## 2026-08-02 — Batch 16b: stray pain_points field removed
The trashed pain_points field (86970) was still rendering ABOVE the tabs —
ACF returns group fields regardless of trash status, and its menu_order 0 put
it before the Hero tab. Permanently deleted (it was superseded in batch 7 by
lists inside problem_text; page data unaffected). Group now renders 148
fields starting cleanly at the Hero tab.

## 2026-08-02 — Batch 17: Rules-based custom content for all 43 remaining specialties
Endodontic pattern approved by user → applied to every other specialty page
(48 fields each, three generator passes). Structure per the content rules:
clarity layer constant, specialty layer custom per page — each specialty got
its own hero opening, pain story + "explain your world" details, mobile
search scenario, procedure set, 3 search queries + AI query, exclusivity
audience, and referral-FAQ where the specialty is referral-driven (oral
surgery, perio, prosth, urology, pain mgmt, ortho surg, neuro, PT, sports med,
hospital, allergy, GI, ENT, radiology, cardio, onc, pulm, gen surg, rheum,
anesthesiology, home care).

Special handling: funeral home (no HIPAA claims — privacy/security/ADA
framing, non-healthcare intro, warm goal line); dental lab (B2B, dentist-
clients, accounts); med spa/anti-aging/mental health (clients); urgent care/
hospital/telemedicine/pharmacy/home care (organization voice); pediatric +
pediatric dentistry (parents).

Pre-check: duplicate-sentence scan on ortho + endo found zero repeated
sentences across sections. All 43 purged; verified urology, funeral-home,
telemedicine (200, correct H1s, no leaks).

Rollback: per-page values from server snapshot
2026-08-02-content-round1-snapshot.json (older layer) + this log; batch-15/17
content is regenerable from the rules doc.

## 2026-08-02 — Batch 17b: Duplicate-sentence review + accuracy pass
Fuzzy duplicate scan (sentence-level, ≥70% similarity, cross-section) over all
45 pages found two real repeats:
1. **Multi-Media ownership text vs FAQ ownership answer** (83% / 74%, all 45
   pages + template fallback) — the FAQ answer echoed the ownership paragraph
   almost verbatim. FAQ answer rewritten in a distinct, procurement voice
   ("registered in your name from day one…"); fact set unchanged.
2. **hero_intro vs mobile_text** on cosmetic-surgery and dermatology — my
   generator's hero and mobile scenarios overlapped. Both mobile openings
   rewritten with new imagery.
Re-scan after fixes: **zero near-duplicates remaining** across all 45 pages.

Funeral-home accuracy pass (not a covered entity): FAQ "what's included"
de-HIPAA'd, page-specific compat_* and advanced_text written (obituary/tribute
platforms, memorial donations, livestream embeds; no-outage-during-a-family's
-worst-week framing), whyus_3_text switched to secure/encrypted/accessible,
Rank Math meta description de-HIPAA'd.

**Remaining HIPAA mentions on funeral-home are static/global design**: hero
bullet "HIPAA-Compliant with SSL", the HIPAA-compliant logo image in that
section, the packages feature list, and the main-nav /products/hipaa/ link.
These are shared across all 45 specialties — flagged to user, not changed
(design/images are off-limits without instruction).

Verified: dental, pediatric, home-care, radiology, dental-lab, funeral-home
all 200, correct H1s, new FAQ answer live, no tag leakage, no PHP errors.

## 2026-08-02 — Batch 18: Funeral home HIPAA → SSL
- hipaa_image → SSL security badge (attachment 41040); HIPAA-compliant logo no
  longer renders on that page
- Section rewritten to SSL framing: title "SSL Secured, and Built With Care",
  subtitle, and text (encrypted forms, certificate issued/installed/renewed/
  monitored by us, padlock visible to families)
- Hero bullet "HIPAA-Compliant with SSL" now reads "SSL Secured & Encrypted"
  on this page via page-scoped CSS in snippet #22 part 7.
  **Why CSS and not a render filter:** Elementor's Element Cache experiment is
  ACTIVE and caches the shared template's static widgets in
  `_elementor_element_cache` on post 86918 — a per-page render filter there is
  both unreliable (cached widgets bypass it) and unsafe (filtered output can be
  cached and served to the other 44 specialties). The earlier filter version
  was removed and the stale element cache on 86918 cleared.
  Trade-off: the DOM text still reads HIPAA; only the rendered text is swapped.
- Verified: funeral-home shows SSL badge + CSS; dental unchanged (17 HIPAA
  mentions, no SSL badge, no page CSS) → no cross-page contamination.
- Still global (shared by all 45, unchanged): main-nav /products/hipaa/ link
  and the packages feature list ("HIPAA Email" etc.).

## 2026-08-02 — Batch 19: Button fields removed from the ACF group
`process_button_link` (field 86699, the only button/link field in the group)
permanently deleted, and its value removed from all 45 specialty pages.
It was already orphaned — zero bindings in template 86918 — so nothing changed
on the front end. Old values (for the record): "/pricing/",
"https://o360.com/pricing/", "https://o360.com/schedule/".
Group now 147 fields; no button/link-type fields remain in any section tab.
Verified dermatology + endodontic: 200, all 19 buttons render with their static
links (Get Pricing → /pricing/, View Gallery → /portfolio/, etc.), no errors.
Rollback: recreate a url field named process_button_link if per-page button
links are ever wanted again.

## 2026-08-02 — Batch 20: Overlay colour fields now have full control
**Problem:** the picked colour looked "mixed". Both sections stack three
layers, and the ACF colour only replaced the middle one while Elementor's own
overlay-opacity slider still diluted it:
- Exclusive (d6b7ac6): base colour Black 0 → background image
  hero-background-black.jpg → overlay Dark Blue 2 #002E5B **at opacity 0.69**
- Multi-Media (5d7022fd): base Primary → background video
  O360_Landing_Video_BG1080.mp4 (+ organic pattern poster) → overlay
  #002E5B + organic-pattern texture **at opacity 0.51**
So a chosen colour was rendered at 69% / 51% strength over a black photo or a
moving video — hence the mixing.

**Fix (snippet #22 part 2):** the emitted CSS now forces `opacity:1` on the
overlay layer, so the Elementor sliders can no longer dilute it. Transparency
now comes solely from the alpha of the colour picked in ACF (both fields are
colour pickers with opacity enabled): a solid hex renders solid and fully
hides the photo/video; an rgba value blends by exactly the amount chosen.
Also stopped forcing `background-image:none` on the overlay, so the
Multi-Media organic-pattern texture survives a colour change (design
preserved).

Verified live on orthodontic with temporary values (#0B3A6F solid and
rgba(11,58,111,0.4)); CSS emitted correctly with opacity:1 and no
background-image kill, then values reverted to empty and the page confirmed
back to the default design.

## 2026-08-02 — Batch 20b: Overlay colour = pure colour swap (per user)
Reverted the opacity override added in 20. Final, simple contract:
- **Template (Elementor)** owns the base background (image/video) and the
  overlay **opacity** — edit them normally.
- **Template overlay colour** is the fallback, used whenever the ACF field is
  empty (no CSS is emitted at all in that case).
- **ACF field** swaps ONLY the overlay's colour. No extra layer, no opacity
  interference, no background-image changes.
Emitted CSS is now a single declaration per section:
`background-color:<colour> !important;`
Also disabled `enable_opacity` on both colour pickers, so opacity has exactly
one home (the template) — re-enable by flipping that flag if per-page alpha is
ever wanted.
Verified: endodontic (values set) emits colour-only CSS, no opacity/no
background-image; orthodontic (empty) emits nothing and renders the default.
Pages currently carrying test colours: endodontic, pediatric-dentistry,
dental-lab.

## 2026-08-02 — Batch 20c: Overlay colour control removed entirely (per user)
User decided to control both section backgrounds from the template instead.
Removed completely:
- ACF fields `exclusive_overlay_color` and `video_overlay_color` (deleted
  permanently; group now 145 fields, Exclusive and Multi-Media tabs no longer
  show a colour control)
- Their values on all pages (8 values cleared — endodontic,
  pediatric-dentistry and dental-lab had test colours)
- Snippet #22 part 2 (the wp_head overlay CSS block) deleted, plus its now-dead
  `o360-specialty-overlay-colors` entry in the WP Rocket RUCSS exclusion list
The Exclusive (d6b7ac6) and Multi-Media (5d7022fd) sections now take their
background image/video, overlay colour and overlay opacity solely from
Elementor — nothing overrides them.
Verified: endodontic, pediatric-dentistry, dental-lab, orthodontic all 200,
no overlay style tag emitted, ACF CSS still loading, no errors. Snippet #22
remains active with its other parts intact (examples toggle, RUCSS exclusion,
review cards, funeral-home SSL).

## 2026-08-02 — Batch 21: Intro section images assigned + media SEO cleanup
Source: Folders Pro folder "Laptop 3D (intro)" (media_folder term 2805).

**24 pages given a specialty-matched `intro_image`** (matched on attachment
title). Endodontic uses the blue/purple variant (86844) per user; periodontic
was set earlier as the test.

**Media SEO cleanup on those 24 attachments:**
- Filenames renamed from meaningless numbers to
  `[specialty]-website-design-laptop.[ext]` (e.g. `21.webp` →
  `periodontic-website-design-laptop.webp`). Base file + every generated size
  file renamed on disk; `_wp_attached_file` and `_wp_attachment_metadata`
  updated; attachment slug updated.
- Alt text rewritten (several were wrong before — e.g. the orthopedic image's
  alt read "neurological surgery", pain management's read "dentistry"):
  now "Custom [specialty] website design shown on a laptop and smartphone".
- Titles standardised to "[Specialty] Website Design — Laptop Mockup".

**Safe to rename:** verified first that every one of these files had zero URL
references in posts, options, or other postmeta — they are referenced only by
attachment ID (featured images, ACF fields), so no links broke. Old image URLs
(e.g. /uploads/2020/07/21.webp) will now 404; no redirects were added since
those numbered filenames carry no image-search value — say the word if you
want Rank Math redirects for them.

**Not assigned (20 pages, no image in the folder):** medical, allergy,
anesthesiology, bariatrics, ENT, family physician, gastroenterology, general
surgery, home care, hospital & clinic, internal medicine, oncology, pediatric,
physical therapy, pulmonology, radiology, rheumatology, sports medicine,
telemedicine, anti-aging, medical spa. These keep the default laptop fallback.

Verified: dental, endodontic, funeral-home, cardiology, periodontic all 200,
images 200 on disk and rendering with the new alt text; zero missing files
across all 24.

## 2026-08-03 — Batch 22: Image upscales, Allergy mockup, physical therapy, usage audit
- **Holistic medicine + funeral home upscaled**: 1376×768 → AI-upscaled to
  4096×2294, then resized to 2400×1344 and converted to WebP (2.9 MB / 3.0 MB
  PNG → 0.11 MB / 0.12 MB WebP). Same attachment IDs, so every reference
  (featured image, exclusive_image, intro_image) stayed intact.
- **Allergy mockup created** (attachment 87134): generated as a 3D laptop +
  phone mockup matching the existing set, 5504×3072 → 2400×1340 WebP (15.5 MB
  → 0.11 MB). Filed into "Laptop 3D (intro)", alt/title set, assigned to
  /websites/allergy/.
- **Physical therapy** now uses the spare duplicate chiropractic mockup
  (80147), renamed `physical-therapy-website-design-laptop.webp` with matching
  alt/title.
- **Rename audit:** confirmed **zero stale URL references** anywhere in
  postmeta, posts or options for all 24 previously-renamed files — every image
  is referenced by attachment ID (featured image, exclusive_image,
  intro_image, Elementor JSON), so nothing broke and no old pages needed
  relinking.
- **Unused images in the folder** (18): 86260, 86262–86268, 86499–86503,
  86505, 86506, 86556, 86557 — all `carousel-*` hero-collage variants and
  duplicates, not laptop mockups. 80147 was the only unused laptop mockup and
  is now in use.
Also added `.claude/settings.json` with an allowlist so routine WP/image/git
calls no longer prompt.
Verified: allergy, holistic-medicine, funeral-home, physical-therapy all 200
with images 200 and rendering.
## 2026-08-03 — Batch 23: /web-design/ pillar page fixed
Page 86913, backup → draft page **87576** (verified byte-identical `_elementor_data`,
187,266 chars; meta copied at DB level because Link Whisper's serialized objects
break `maybe_unserialize`).

**Problem found in review:** the pillar was the weakest of the three page types.
"Healthcare website design" appeared exactly once (H1 only), the meta title used a
different phrase ("Healthcare Web Design"), no focus keyword was set, the opening
paragraph never said what O360 does, there was no FAQ, and there were **zero**
internal links to the 45 specialty pages — so the hub didn't feed its spokes.

**Fixed (design untouched, edits in place):**
- Intro rewritten to open with the clarity line: "O360 is a healthcare website
  design company…" — states the product, the audience, and the differentiators
  (from scratch, exclusive, owned, doctor-founded, 20 years)
- Headings reworked to carry the phrase naturally: "Healthcare Website Design,
  Built From Scratch" · "What's in Every Healthcare Website We Design" (replaced
  the junk "FEATURES" heading) · "Healthcare Websites We've Designed and Built"
  (authorship framing per the content rules) · "Stand Out With a Stunning,
  Exclusive Healthcare Website" · "Our Healthcare Website Design Process"
- New FAQ section added: H2 + 9 server-rendered Q&As (what healthcare web design
  is, what's included, cost, custom-vs-template, ownership, HIPAA, specialties,
  timeline, SEO) — the AI-visibility asset the page was missing
- Specialty grid copied from the home page (sections b0267fb + e42ae4d, element
  IDs regenerated) and appended at the bottom
- Rank Math: title aligned to "Healthcare Website Design for Medical & Dental
  Practices | O360", description rewritten with the exact phrase, focus keyword
  set to "healthcare website design"

**Verified live (single cached request, no cache-buster):** HTTP 200, one H1,
exact phrase now appears 7× naturally, intro line present, FAQ rendering with
13 H3s, specialty grid present with **46 links** to /websites/ pages, junk
"FEATURES" heading gone, no errors.

**Note on the 429 incident:** caused by my own burst of `?cb=` cache-busted
fetches plus two full-table LIKE scans. Cleared on its own. Verification from
here on uses single normally-cached requests and scoped queries.

## 2026-08-03 — Batch 24: Home page sharpened to answer "who are you"
Page 10545, backup → draft page **87603** (verified byte-identical `_elementor_data`).

**H1 deliberately left unchanged** at user's direction. His reasoning, which is
now a content rule: "dental" and "medical" resonate with the actual buyer
(a dentist/physician), whereas "healthcare" reads as industry/insurance
language. So the keyword split is: **home = brand + dental/medical**,
**/web-design/ = "healthcare website design"** (the aggregate search term),
**/websites/[specialty]/ = "[specialty] website design"**. Minimal collision.

**Changes:**
- **Founder story rewritten** — the biggest gap. It said only "founded and
  operated by healthcare professionals"; Dr. Sean Fahimi was not named anywhere
  on the home page. Now: founded in 2003 by Dr. Sean Fahimi, a dentist; UPenn
  School of Dental Medicine; 15 years in practice; several practices of his own;
  marketing lead is a dentist; team came out of dental and medical offices;
  3,100+ sites in 20+ years. About Us link preserved.
- **Eyebrow above the H1** now reads "Website Design + SEO for Dental and
  Medical Practices Since 2003" — tenure was previously absent from the entire
  page ("since 2003" and "20 year" both appeared 0 times).
- **"Specialized in Healthcare" → "Specialized in Dental & Medical Practices"**,
  and its intro rewritten in buyer language ("an endodontist and a pediatric
  dentist are not selling the same thing to the same patient").
- **New FAQ: "Questions Doctors Ask Us"** — 9 company-level Q&As (who is O360,
  do you only work with practices, how long in business, is your team in the US,
  do you design for my specialty, cost, ownership, marketing too). Inserted
  before the final CTA so the CTA stays the last thing on the page.
- **Rank Math:** title → "O360® — Website Design & Marketing for Dental &
  Medical Practices"; description rewritten to lead with "Founded in 2003 by a
  dentist" plus proof points; focus keyword was literally "website", now
  "dental and medical website design".

**Verified live (single cached request):** HTTP 200, H1 unchanged, eyebrow
tenure present, Dr. Sean named, UPenn present, new specialized heading, FAQ
rendering with 9 questions, CTA still last, About Us link intact, no errors.

## 2026-08-06 — Batch 25: "physicians" on /websites/medical/, doctors→healthcare professionals, casing bug fix

**⚠️ Batch 23 (/web-design/ pillar rewrite) WAS LOST.** Page 86913 `post_modified`
is 2026-08-06 17:01, later than that edit, and the page now shows the old intro,
the junk "FEATURES" heading, and **no FAQ section and no specialty grid**. An
Elementor save from a stale editor session overwrote it — same failure mode as
Batch 12. The pre-edit backup (draft page 87576) is unaffected. Re-application
is pending the user's decision, since the revert may have been intentional.

**Keyword decisions (user):** /web-design/ keeps "healthcare website design".
"Doctors" applies to every specialty, so it is not a page target; it concentrates
on /websites/medical/. Main term there stays "medical" because non-physicians
search it too — "physicians" is added alongside, not instead.

**/websites/medical/ (86703):** H1 unchanged ("Medical Website Design").
Physicians added to three on-page titles + the meta title:
- hero_subtitle → "Custom, HIPAA-Compliant Websites for Physicians and Medical Practices"
- problem_headline → "You Didn't Become a Physician to Build Websites"
- whyus_headline → "Why Physicians Choose O360"
- Rank Math title → "Medical Website Design — Custom Websites for Physicians | O360";
  description rewritten to include physicians.
Previously the word "physician" appeared **zero times** on that page.

**/web-design/ (86913):** two "doctors" → "healthcare professionals" (enterprise
hosting + concierge support paragraphs). A third mid-sentence use was left alone
because "healthcare professionals" reads clumsily inside that list.

**Bug fixed — 34 pages:** the batch-17 generator produced
"You Didn't Become **A dentist** to Build Websites" (capital article, lowercase
noun) from `ucfirst($SING[0])`. All corrected to proper title case, e.g.
"You Didn't Become a Dentist…", "You Didn't Become an Optometrist…",
"You Didn't Become a Sports Medicine Physician…".

## 2026-08-06 — Batch 26: /web-design/ pillar re-applied (FAQ now an accordion)
User confirmed the Batch 23 loss was an accidental save-over while fixing images,
and asked for the content to be re-applied with the FAQ in an accordion because
the page is long.

Re-applied to page 86913 (meta from Batch 23 had survived the revert — only
`_elementor_data` was overwritten — so title/description/focus keyword were
already correct and were left alone):
- Intro rewritten to the clarity line ("O360 is a healthcare website design
  company…")
- 5 headings restored, including replacing the junk "FEATURES" heading
- **FAQ rebuilt as a `nested-accordion`** (9 Q&As, `default_state: all_collapsed`)
  matching the accordion pattern already used on the specialty template, so it
  inherits the site's styling and keeps the page short. Answers are still
  server-rendered in the HTML source — the accordion only toggles visibility with
  CSS/JS, so the AI-readability requirement in the content rules still holds
  (verified: answer text present in the raw response).
- Specialty grid re-copied from the home page with regenerated element IDs

**Verified live:** HTTP 200, H1 "Healthcare Website Design", exact phrase 7×,
intro present, junk heading gone, FAQ heading + n-accordion present with answer
text in the HTML, 46 specialty links, grid heading present, the
"healthcare professionals" swap from Batch 25 intact, no errors.

**Recurring risk:** this is the second time an Elementor editor session has
overwritten scripted changes (Batch 12, Batch 23). Mitigation: close/refresh the
Elementor tab for a page before it is edited via script, and re-verify after.

## 2026-08-06 — Batch 27: Audit fixes — meta lengths, image alt, interlinking

**Meta descriptions:** 26 specialty pages + home + /web-design/ were over 160
chars (Google truncates ~155-160). All rewritten under 158 while keeping the
CTA; still 45/45 unique. Zero remain over 160 anywhere.

**Image alt text:**
- 23 portfolio-item featured images had empty alt (of 549). Written from the
  real client name + its most specific project_category, e.g. "Custom cardiology
  website design for Essex Cardiology Group by O360". Portfolio coverage is now
  549/549.
- 10 SHARED template images given generic alt. Per the user's instruction these
  must NOT be specialty-specific, because alt lives on the attachment and these
  render as fallbacks across many specialty pages (most ACF image fields are
  still empty: ai_image 0/45, founder_image 0/45, examples_image 0/45,
  cta_image 0/45, whyus_*_image 0/45, hero_image_2 1/45). So the shared carousel
  screenshots are described by the actual client shown (Good Medicine, Elite
  Spine Specialists, Skin Solutions NY, Annapolis Counseling Center), not by the
  page they appear on. Also: Dr. Sean Fahimi's photo, social/PPC icons.
- Decorative assets (cloud backgrounds, spacers, Asset-23) deliberately left
  with empty alt — correct accessibility practice.

**Interlinking:**
- Specialty template → /web-design/ — added in the Packages section, so all 45
  pages now link back to their pillar (was zero).
- /marketing/ hub → /web-design/, /websites/, /portfolio/ — added; the hub
  previously linked only to pricing and contact-us.
- /marketing/ focus keyword was "marketing, medical marketing" (two phrases in
  one field, which Rank Math treats as a single string) → "healthcare marketing".

**CORRECTION to the Batch-27 audit:** the earlier claim that /web-design/ had
"zero links to /marketing/" was WRONG. My link-scanner only matched absolute
o360.com URLs and the site uses relative hrefs; /web-design/ already linked to
/marketing/. The two genuine gaps were the specialty template and the marketing
hub, both now fixed.

**Verified:** dental + marketing pages 200, meta descriptions 138/139 chars,
5 links to /web-design/ and ~20 to /websites/ on each, no errors.

## Batch 28 — 2026-08-07 — intro_image assigned on 13 specialty pages

**What changed.** 13 `/websites/` specialty pages that had no `intro_image` now have one,
chosen from the "Laptop + 3D Item" media folder (2805) — the transparent-background
1775x1100 mockups `87351`-`87373`. No page that already had an `intro_image` was touched.
No design, template, or global style was changed.

| Page | Attachment | Image |
|---|---|---|
| /websites/medical/ (86703) | 87352 | Bradley H. Bennett M.D. |
| /websites/internal-medicine/ (86858) | 87361 | "Compassion & Trust" handshake |
| /websites/family-physician/ (86727) | 87355 | Total Family Healthcare |
| /websites/anesthesiology/ (86852) | 87366 | Advanced Dental Anesthesia |
| /websites/home-care/ (86869) | 87359 | Dignified — "The Comfort Of Staying Home" |
| /websites/hospital/ (86861) | 87372 | Columbus Urgent Care |
| /websites/radiology/ (86865) | 87371 | SCINS — 3D anatomical imaging |
| /websites/rheumatology/ (86853) | 87365 | Ferrera — body pain-point map |
| /websites/sports-medicine/ (86860) | 87351 | Herceg — golfer |
| /websites/bariatrics/ (86864) | 87373 | Urology Partners — active seniors |
| /websites/anti-aging/ (86868) | 87370 | SKIN Dermatology |
| /websites/pulmonology/ (86856) | 87369 | CMHS — outdoors / breathing |
| /websites/telemedicine/ (86866) | 87367 | WIRX — "Delivering Medicine to You" |

**Alt text.** Each of the 13 attachments was previously unused anywhere on the site
(verified against `wp_postmeta` and `_elementor_data`), so each is used on exactly one
page and its alt text is specialty-level, never sub-specialty:
`Custom [specialty] website design shown on a laptop`.

**Left on the fallback on purpose** — no honest visual match exists in the pool:
ENT (86867), gastroenterology (86863), oncology (86855), general surgery (86857).

**Mistake made and corrected in the same batch.** The first write set `_intro_image`
to a guessed ACF field key (`field_67e0d1c9a1b01`). The correct key is
`field_wl_intro_image`. All 13 rows were corrected and `get_field('intro_image', $page)`
was re-verified to resolve on every one of the 13 pages before the batch closed.

**Cache.** `rocket_clean_post()` on the 13 page IDs only. `rocket_clean_domain()` was
not used.

**Old value -> new value / how to restore.** All 13 pages had an empty `intro_image`
and all 13 attachments had empty alt text. Full record and rollback recipe:
`backups/2026-08-07-intro-image-backup.json`. To roll back: delete `intro_image` and
`_intro_image` meta on the 13 page IDs and blank `_wp_attachment_image_alt` on the 13
attachment IDs.

**Not done — flagged for decision.** 21 pages still use the 800x450 version of a visual
that now exists at 1775x1100 (e.g. dental `80145` -> `87356`, optometry `80155` -> `87363`,
obgyn `80159` -> `87362`). Same image, higher resolution. Not applied; see
`not_done_flagged_for_user` in the backup JSON.

## Batch 29 — 2026-08-10 — page + redirect cleanup

**Nothing was permanently deleted.** Pages went to WordPress trash; redirects went to
Rank Math `trashed` status. **Do not empty the trash.** Full record and restore recipe:
`backups/2026-08-10-cleanup-manifest.json`.

### Designs preserved first
Four Elementor page templates created before anything was trashed, each verified
byte-identical to its source: **87703** ARCHIVE Web Design (pre pillar rewrite),
**87704** ARCHIVE Web Design (pre-PDF), **87705** ARCHIVE Home (pre who-we-are rewrite),
**87706** ARCHIVE Web2. Page 86917 needed no template — it was byte-identical to 86915.

### Pages trashed — 34 (82 published -> 65, 26 drafts -> 9)
- **10 marketing clone drafts** (`/marketing/seo/*`, `/marketing/ppc/*` third level).
  Verified zero inbound links, zero revisions, never published, byte-identical to each
  other. No unique design.
- **4 page backups** (87576, 87603, 86915, 86917) — superseded by the templates above.
  Two of them had EMPTY slugs, which was a live hazard.
- **18 project-category children** — their parent (86292) is itself in the trash, so
  these pages were live at `https://o360.com/project-category__trashed/<slug>/`:
  indexable URLs with `__trashed` in them. Traffic is covered by the redirects below.
- **2 orphans** — 86907 `/web2-2/` (saved as template 87706) and 86753
  `/websites/healthcare/` (empty draft, already covered by redirects #1890/#2104).

### Redirects repointed — 16, carrying ~19,600 historical hits
These were built before the 45 specialty pages existed and were never updated, so they
had been sending real traffic to the wrong specialty. Biggest: `project-category/pediatric-dentistry`
(4,047 hits) went to `/websites/medical/`, now `/websites/pediatric-dentistry/`;
`project-category/urology` (3,224 hits) went to `/websites/obgyn/`, now `/websites/urology/`.
Every target was verified to exist and be published before the update. Full list in the manifest.

### Redirects defused — 27
Inactive 301s aimed at live `/websites/<specialty>/` URLs — and at `/websites/` itself —
all pointing to `/web-design/`. Harmless while inactive, catastrophic if anything
re-enabled them. Each was verified to have a live published page at that path, then set
to `trashed`. Also trashed: #1706 (conflicted with #1890/#2104 on `websites/healthcare`)
and #2037/#2038 (active redirects with empty destinations).

### Elementor templates edited — 4
Link targets repointed off dead URLs before their destinations were trashed: 84644, 86118
(`/project-category/veterinarian/` -> `/websites/veterinary/`, `/project-category/healthcare/`
-> `/websites/medical/`), 85673 and 85674 (`/websites/healthcare/` -> `/web-design/`).
JSON validated after each edit; before/after MD5s in the manifest.

### Verification
46 specialty pages published, **0** failing to resolve, **0** active redirects shadowing a
live `/websites/` page, 16 of 16 repointed targets resolving to published pages. Checked
server-side through WordPress — direct HTTP checks are impossible from this environment
(the proxy/Cloudflare returns 403 on every o360.com HTML URL, including pages known to work).
Cache: `rocket_clean_post()` on all 46 specialty pages plus `/web-design/` and Home, then
`wp_cache_flush()` and a rewrite flush. `rocket_clean_domain()` was NOT used.

### Not done — needs your decision
**84668 `/web-design-old/`** — 74 KB, still PUBLISHED, duplicates `/web-design/` and links
to drafts that are now trashed. Left alone because it is published and may hold backlinks.

## Batch 30 — 2026-08-10 — inactive redirects removed, /web-design-old/ retired

- **All 3 remaining inactive redirects removed** (set to `trashed`, recoverable):
  #100 `features/video-based` (target was malformed: `o360https://o360.com/products/video/`),
  #1613 and #2062 `project-category` -> `/portfolio/`. **Zero inactive redirects remain.**
- **`/web-design-old/` (84668) retired.** Design archived first as Elementor template
  **87707** (verified byte-identical, 74 KB), then a 301 to `/web-design/` was created
  (redirect #2105) *before* the page was trashed. It had zero inbound links.

Full detail: `backups/2026-08-10-cleanup-manifest.json` and the Search Console findings below.

### Search Console findings (16 months, Apr 2025 - Aug 2026)
- **1,935 clicks / 543,753 impressions across 902 pages — 0.36% CTR.**
- **96.3% of query clicks are brand.** o360 / optimized360 variants = 964 of 1,001 clicks.
  All 982 non-brand queries together produced **37 clicks** from 299,585 impressions.
- **Demand exists; rankings do not.** Non-brand queries match our plan almost exactly, but
  sit on page 5-10: `dental marketing ideas` 6,316 impr @ pos 94, `dental seo company`
  5,566 @ pos 90, `orthodontic website design` 4,513 @ pos 60, `dental website design`
  3,660 @ pos 98, `chiropractic website design` 3,631 @ pos 89. The best-ranked non-brand
  terms are `medical website design company` @ pos 9, `website design for anesthesiology`
  @ pos 10, `website design for rheumatology` @ pos 13.
- **`healthcare seo` does not appear in the top 1,000 organic queries** — third independent
  signal (with 0 ad conversions and its Added/Excluded status) that it should not be a
  landing page.
- **152 dead URLs hold 234,733 impressions — 43% of all site impressions — and return 404
  with no redirect.** Verified against all 2,384 exact and 34 regex/contains rules.
  Worst-hit section is `/best-designs/` (37 pages, 88,676 impressions, entirely dead):
  `7-best-chiropractic-websites-of-year` 11,746 impr, `7-best-optometry-websites-of-year`
  11,259, `7-best-orthopedic-websites-of-year` 8,338, `7-best-medical-spa-websites-of-year`
  7,350. Plus dead `/blogs/` listicles (`trusted-dental-web-design-company-top-10` 10,051,
  `best-dental-practice-management-software-companies` 9,948, `top-5-medical-spa-software`
  9,876) and all 12 `/lists/` pages.
- The blog was consolidated to **4 pillar posts**; hundreds of old posts 301 into them.
  53 GSC URLs (97,211 impressions) redirect correctly. The 152 above were dropped without one.

### Not done — awaiting decision
Recovering the 152 dead URLs. `/best-designs/7-best-<specialty>-websites-of-year/` maps
mechanically onto `/websites/<specialty>/`.

## Batch 31 — 2026-08-10 — specialty website redirects consolidated onto /websites/

**113 redirects now point at the correct `/websites/<specialty>/` landing page.**

### 65 new redirects created — dead URLs recovered (149,175 impressions)
All previously 404 with no rule. `/best-designs/7-best-<specialty>-websites-of-year/` and the
equivalent `/blogs/` and `/lists/` showcase URLs now 301 to their specialty page. Largest:
chiropractic 11,746 impr, optometry 11,259, `blogs/trusted-dental-web-design-company-top-10`
10,051, orthopedic 8,338, medical spa 7,350.

Three auto-mappings were corrected by hand before applying — "psychology of color" matched
mental-health (belongs to dental/medical) and "dental-labs" plural missed dental-lab. Three
patient/resource listicles were dropped rather than redirected (`top-5-cancer-research-websites`,
`top-5-medical-students-websites`, `mental-health-websites-with-online-resources`): resource
lists, not buyer intent.

### 48 existing redirects repointed (18,680 hits)
Service-intent URLs that were being dumped on the generic `/web-design/` page or on the wrong
specialty: `dentist-websites` (6,455 hits) -> `/websites/dental/`, `physician-websites` (1,857)
-> `/websites/medical/`, `optometrist-websites` (1,832) -> `/websites/optometry/`,
`chiropractor-websites` (705) -> `/websites/chiropractic/`, and 44 more.

Four were corrected by hand: paths like `designed-websites/dental/periodontists` matched
"dental" from the path prefix rather than the specialty in the last segment. Two more were
dropped because the automatic mapping would have *regressed* an already-correct target.

### Deliberately NOT changed
- **235 blog-source patterns** that 301 into the 4 pillar posts
  (`/blogs/the-ultimate-guide-to-medical-website-design/` alone receives 59). That is an
  intentional consolidation strategy, and 16 of the rows carry multiple patterns with a single
  target, so individual patterns cannot be repointed without splitting the rows. Sending
  informational blog traffic to a commercial service page is also an intent change, not a fix.
- **18 single-pattern redirects** whose current target is a topically-relevant blog post,
  `/packages/` or `/portfolio/` — e.g. `dental-website-packages` -> `/packages/` and
  `articles/dental-website-colors` -> the colour-selection post. Arguably already correct.

Both groups are listed in the session notes and can be revisited.

### Verification
48 of 48 repointed and 65 of 65 created were checked against a published target before writing;
zero skipped, zero bad targets, zero duplicate patterns created.

## Batch 32 — 2026-08-10 — /marketing/ hub rewritten

**Backup:** page **87774** `marketing-backup-20260810-062636` (draft), `_elementor_data`
verified byte-identical to the original (`73404f8def`).

### Content — 16 widgets rewritten, no design or style touched
Only `settings.title` and `settings.editor` strings were changed. No typography, colour,
spacing or global-style value was modified, and no widget was added or removed.

- **H1 `SEO Marketing` -> `Healthcare Marketing`.** It had been contradicting both the title
  tag and the focus keyword, and would have cannibalised `/marketing/seo/` on launch.
- **H2 -> "A Dental & Medical Marketing Company — Not a General Agency."** Per the brief,
  copy now leans on *company / team / experts* rather than *agency / firm*, which reads as
  expensive and consultant-ish to a practice owner.
- **The duplicated paragraph is gone.** `d55ce1d` and `5ebfdc11` had been printing identical
  text under two different H2s ("Intuitive Website for Conversion" / "Dominate the First
  Page"). They are now "A Website Built to Convert" and "Own the First Page — and the Map",
  with distinct copy.
- **Channel cards rewritten** (SEO, Google Ads, Social, Custom Content) naming a rotating set
  of specialties — dental, medical spa, chiropractic, optometry, dermatology, mental health —
  so the channel pages can name a different set without the pages reading as copies.
- **Interlinking added**: `/web-design/`, `/websites/`, `/portfolio/`, `/marketing/dental/`,
  `/pricing/`. Channel links are deliberately omitted until those pages are published — they
  are still drafts and linking now would create 404s.

### Meta
- Title: `Online Marketing For Dental & Medical Practices | O360®`
  -> `Healthcare Marketing Company for Dental & Medical Practices | O360®` (68 chars)
- Description rewritten (148 chars), leading with *company* and the 2003 dentist-founder fact.
- Focus keyword unchanged: `healthcare marketing`.

### Redirects reverted — 2
`blogs/color-psychology-in-medical-and-dental-websites` and
`blogs/psychology-of-color-in-healthcare-website-design` were 301'd to specialty pages in
Batch 31. Both are informational posts with different intent and may be restored, so the
redirects were trashed to keep those URLs free.

### Still to build
`/marketing/medical/`, the 6 specialty marketing pages, the 2 SEO pages, the 6 support pages,
and the HIPAA product page (to be optimised for *HIPAA-compliant website builder / design*,
which no page currently targets).

## Batch 33 — 2026-08-10 — hub fixes + HIPAA page retitled

### 1. "SEO Marketing" title — two separate causes, both fixed
The page's own H1 was already correct from Batch 32 (0 occurrences left in its Elementor data).
What was still showing it:
- **Menu Popup template 85927**, widget `612edd7` — a nav label reading "SEO Marketing" and
  linking to `/marketing/`. Changed to **"Marketing"**.
- **Elementor Element Cache experiment is active** and the hub carried a stored
  `_elementor_element_cache`, so the old markup was being served. Cache meta deleted,
  `_elementor_css` dropped, Elementor file cache cleared, WP Rocket cleared per-post.

### 2. Package row — extra empty column
Container `bb17906` still carried `structure: "30"`, a leftover *section* property from the
section-to-container migration, combined with `flex_justify_content: space-around` and a zero
gap. Removed the dead `structure` key, set justify to `center`, gap to 20px, align `stretch`.

### 3. The 4 strategy boxes
The hub and `/marketing/dental/` share the same container ID (`6f9dbd28`) with **identical**
grid settings — the layout was never different. What differed was the copy format: dental uses
a punchy uppercase eyebrow and specific, concrete benefit text. Rewrote the hub's four boxes to
that pattern, kept at healthcare level so they do not duplicate the dental page.

### 4. "Highest rated in the industry"
Added to the hub intro: a 4.9 rating and more five-star reviews than any other healthcare
website and marketing company.

### 5. HIPAA page (83112)
- **Titles no longer mention email.** Post title `HIPAA-Compliant Websites & Emails` ->
  `HIPAA-Compliant Websites`. H1 -> `HIPAA-Compliant Website Builder for Dental & Medical
  Practices`. Meta title -> `HIPAA-Compliant Website Builder & Design for Practices | O360®`.
  Focus keyword was **empty**; set to `hipaa compliant website builder` — the #2 spend term in
  the whole ad account ($13,321) with no page targeting it.
- **Missing images diagnosed.** Attachments **86430, 86431, 86432, 86433, 86434 no longer
  exist**, and their files are **gone from disk** — not recoverable. Three further image
  widgets (`6f0511d`, `9938fc1`, `3863689`) are empty with no image ever set.
- **Two relinked from exact library matches**: `1a782cd` -> 36100 (HIPAA compliant logo),
  `37496d1` -> 41040 (SSL security badge). Alt text set on both.

### Still open on the HIPAA page — needs images
Three broken slots have no good match in the library: `1c32c98` (Detailed Auditing),
`07431bb` (Safe Storage / server room), `955fc5e` (Seamless Integration / email). Plus the
three empty widgets above. Searches for audit/server/data-centre imagery returned nothing
suitable — the only cloud images are sky backgrounds.

## Batch 34 — 2026-08-10 — Hummingbird fully removed + HIPAA images restored

### 1. Hummingbird — confirmed gone, leftovers cleared
**Audited before deleting anything.** Hummingbird is **not installed and not active** — it does
not appear in `get_plugins()` at all. The 18 active plugins are Adminify, ACF Pro, Akismet,
Code Snippets, Disable Comments, Elementor + Pro, Folders Pro, Microsoft Clarity, Novamira,
Rank Math + Pro, Unlimited Elements, WP Mail SMTP Pro, WP Rocket and WPMU DEV Dashboard.

Removed:
- **8 `wphb_minify_group` posts** (84373-84380) plus **168 postmeta rows**. Machine-generated
  minify-cache records from the removed plugin — deleted outright rather than trashed, as they
  are cache artefacts with no content value.
- **`wp-content/wphb-cache/`** (2 files) and **`wp-content/wphb-logs/`** — both directories gone.
- Options, usermeta and cron were already clean (0 rows each); re-checked after.

**Deliberately left alone — these are WP Rocket's, not Hummingbird's:**
- `wp-content/cache/min/` — WP Rocket's minify cache
- `wp-content/advanced-cache.php` — verified by reading the file: it declares
  `WP_ROCKET_ADVANCED_CACHE` and loads from `plugins/wp-rocket/`

*Correction to Batch 33:* the `rmdir` warnings logged there were attributed to Hummingbird's
minify folder. They were **WP Rocket's** `cache/min/`. Nothing was harmed either way.

**Verified after:** 0 wphb options, 0 wphb posts, 0 wphb tables, and WP Rocket still healthy
(`advanced-cache.php` present, `WP_CACHE` true, `rocket_clean_post()` available, `cache/min`
intact).

### 2. HIPAA page images
All six remaining broken/empty image slots filled from the **iPad View** folder, using only
images with zero usage anywhere else (verified against `wp_postmeta` and `_elementor_data`):

| Widget | Section | Image |
|---|---|---|
| `6f0511d` | Exclusive to Dental & Medical | 87708 Clinic |
| `1c32c98` | Granular Access Control | 87717 Surgeon |
| `9938fc1` | Granular Access Control | 87712 Neurology |
| `07431bb` | Safe Storage / Cloud Redundancy | 87710 Heart |
| `3863689` | Safe Storage / Cloud Redundancy | 87718 Urgent care |
| `955fc5e` | Designed for Healthcare Teams | 87715 Pharmacy |

Alt text on all six is deliberately generic — *"HIPAA-compliant healthcare website shown on a
tablet"* — rather than naming the specialty in the file name, since the HIPAA page is not a
specialty page. Marked as placeholders per the brief ("for now").

The page now has **zero broken images**: all 11 image widgets resolve to `attachment/inherit`
records with files present on disk.

## Batch 35 — 2026-08-10 — hub edits restored after an overwrite + /marketing/medical/ written

### The hub was overwritten — third occurrence
Page 18386's `post_modified` was **2026-08-10 08:41:21**, later than the Batch 32/33 writes,
and its Elementor data had reverted to the old headings ("SEO Marketing", "For Physicians,
Dentists, and Healthcare Professionals"). This is an open **Elementor editor tab** saving its
stale in-browser state back over the database — the same cause as Batch 12 and Batch 23.

Not a cache: WP Rocket had no cached file for the URL and `cache_logged_user` is off.

**Re-applied all 21 changes.** One casualty could not simply be rewritten: widget `8ac828b`,
the interlinking paragraph, had been **deleted outright**, not just reverted. It was rebuilt as
a new text-editor widget appended to container `5f1ac72d`. Meta title, description and focus
keyword were re-set too, as they had also reverted.

**Mitigation:** close or hard-refresh every Elementor tab on a page before it is edited by
script. Scripted writes go straight to `postmeta`, so an open editor always wins the next save.

### /marketing/medical/ (86876) written
It was a byte-for-byte clone of `/marketing/dental/` with five titles find-replaced, so the
whole body was dental copy under medical headings.

- **26 headings and text blocks rewritten** for physicians: H1 "Medical Marketing That Fills
  Your Schedule", "You Didn't Become a Physician to Fight Google Ads", "Why Physicians Choose
  Our Team", plus all four strategy boxes rebuilt around condition/procedure search intent.
- **16 further fields fixed** that the first pass missed — icon lists, icon boxes, image-box
  titles and three FAQ entries still carried dental language ("Founded and Run by Dentists",
  "#1 ranked on DentalCountry", "Dentistry is hyper-local", "Do you work with dental
  specialists?").
- Specialties named per the brief: urology, dermatology, ENT, podiatry, pain management,
  orthopedics, OBGYN, urgent care, plastic surgery — a different set from the hub's.
- Copy uses *company / team / doctors* rather than agency, and carries the 4.9 / most-five-star-
  reviews claim.
- Meta: `Medical Marketing Company for Physicians & Practices | O360®`, description rewritten,
  focus keyword set to `medical marketing` (it was empty).

### Left alone deliberately — needs your input
**The Success Stories block still shows dental clients** — real testimonials from New Teeth
Chicago, Chestnut Dental, Diana Dental and Pan Am Dental Lab, with their screenshots and alt
text. Those are genuine client quotes; swapping them means supplying real *medical* client
stories, which is a content decision, not a find-and-replace. 16 residual "dental" strings on
the page are almost all inside these testimonials.

The page remains a **draft**.

## Batch 36 — 2026-08-10 — medical hero image + /marketing/dental-seo/ written

### /marketing/medical/ hero
Widget `6a68b78d` was still showing `laptop-dental-website-purple.png`. Swapped to **83155**
"marketing-laptop" (1920x1141, a doctor's website on a laptop), alt set to *"Custom medical
practice website shown on a laptop"*.

### Flat SEO URLs
`86877` and `86878` re-slugged and re-parented to 18386:
`/marketing/seo/dental/` -> **`/marketing/dental-seo/`**, `/marketing/seo/medical/` ->
**`/marketing/medical-seo/`**. Both remain drafts, so no redirect is needed yet.

### /marketing/dental-seo/ (86877) written — 58 fields
Another byte-identical clone of the dental marketing page, so the whole thing was rewritten
for organic search only.

- **38 headings and text blocks**: H1 "Dental SEO That Puts You on Page One", "You Didn't
  Become a Dentist to Learn Schema Markup", "Local SEO & the Map Pack", "Technical SEO & Site
  Health", "Reviews & Reputation Signals", "Start With a Free Ranking Audit — Not a Contract".
- **20 further fields**: the four icon boxes were ad-specific (negative keywords, geo-radius,
  bid strategy) sitting under an SEO heading — rebuilt as Core Web Vitals, Local Schema &
  Citations, Procedure-Level Pages, and Content Written by Dentists. The hero icon list and
  three FAQ entries were rewritten for SEO.
- The four strategy boxes are now a **budget sequence** — Google Business Profile, Procedure
  Pages, Technical Health, Reviews — deliberately different from the channel rundown on
  `/marketing/dental/` so the two pages do not compete.
- Meta: `Dental SEO Company for Practices That Want the Map Pack | O360®`, focus keyword
  `dental seo` (was empty). "Company" is in the title because `dental seo company` converts at
  $54 per conversion in the ad account, the best rate of any SEO term.

### Known remaining on /marketing/dental-seo/
A handful of ad-specific strings survive in blocks I have not mapped yet (1 "negative keyword",
1 "Google Ads", 3 "ad copy", 3 "PPC"). They are in the review cards and secondary widgets and
need a further pass.

### Still to write
The 6 specialty marketing pages, `/marketing/medical-seo/`, the 6 support pages, and the HIPAA
page body.

## Batch 37 — 2026-08-10 — six specialty marketing pages created + med spa written

### Six page shells created (drafts, children of 18386)
Cloned from `/marketing/dental/` (86667) — the proven structure. `_elementor_data` verified
byte-identical on all six. Rank Math meta was deliberately **not** copied, so no page inherits
the dental title, description or focus keyword.

| ID | URL |
|---|---|
| 87828 | `/marketing/medical-spa/` |
| 87829 | `/marketing/orthodontic/` |
| 87830 | `/marketing/mental-health/` |
| 87831 | `/marketing/chiropractic/` |
| 87832 | `/marketing/optometry/` |
| 87833 | `/marketing/veterinary/` |

### /marketing/medical-spa/ (87828) written — 56 fields
Highest-demand specialty in the ad data (5,352 impressions, 32.8 conversions).

- **31 headings and text blocks**: H1 "Med Spa Marketing That Fills the Calendar", "You Didn't
  Open a Med Spa to Run Instagram Ads", "Why Our Cost Per Client Is the Lowest in Med Spa
  Marketing". Copy is built around treatment demand, rebooking and revenue per chair hour
  rather than generic beauty-retail language.
- **25 further fields**: icon boxes rebuilt around negative keywords, treatment radius, bid
  targeting and *creative compliance* — the last one matters specifically here, because
  aesthetics ad accounts get restricted when creative is not reviewed against platform medical
  claim rules. Hero icon list, founder list and three FAQ entries rewritten.
- The four strategy boxes are Paid Search & Social, Local SEO, Treatment Pages, Social &
  Reputation — a different framing again from dental, medical and dental-seo.
- Meta: `Med Spa Marketing Company for Aesthetics Practices | O360®`, focus keyword
  `med spa marketing`.

### Founder section — agreed policy
Full section on pages where the buyer chooses who to hire (hub, dental, medical, the six
specialty pages). Compact byline on the channel and SEO pages, and on the six lean support
pages. The founder copy is rewritten per page rather than pasted, so it is not a duplicated
block.

### Known remaining
`/marketing/medical-spa/` still carries ~22 dental strings, and `/marketing/medical/` ~16 —
almost all inside the **Success Stories testimonials**, which are real dental client quotes and
screenshots. Replacing them needs real client stories for each specialty, which is a content
decision, not a rewrite. The same will apply to the five remaining specialty pages.

### Still to write
`/marketing/orthodontic/`, `/marketing/mental-health/`, `/marketing/chiropractic/`,
`/marketing/optometry/`, `/marketing/veterinary/`, `/marketing/medical-seo/`, the six support
pages, and the HIPAA page body. Plus a cleanup pass on `/marketing/dental-seo/` for residual
ad language.

## Batch 38 — 2026-08-10 — orthodontic + chiropractic marketing pages written

### /marketing/orthodontic/ (87829) — 48 fields
Second-highest specialty demand and the one specialty where marketing search exceeds website
search (2,877 vs 1,144 impressions), at $98 per conversion.

H1 "Orthodontic Marketing That Starts More Cases". The page is built on one distinction the
other pages do not make: **a parent choosing for a child and an adult choosing for themselves
are different buyers and should never see the same ad.** Campaign split by adult vs adolescent
intent runs through the ad copy, the radius logic and the FAQ. Direct-to-consumer aligner
brands are named as the competitor, because they are.
Focus keyword `orthodontist marketing`.

### /marketing/chiropractic/ (87831) — 48 fields
The most efficient thing in the entire ad account — $69 per conversion at a 21.6% conversion
rate, against a $137 account average.

H1 "Chiropractic Marketing That Fills the Schedule", built around **symptom-driven search**:
patients type a symptom, not a specialty, so the page argues for condition pages (sciatica,
disc, neck, auto injury) over a single services page. Radius logic distinguishes auto-injury
patients, who travel, from walk-in pain patients, who do not.
Focus keyword `chiropractor marketing`.

Both pages: icon boxes, founder list, hero list and three FAQ entries rewritten off dental
language; meta title, description and focus keyword set.

### Architecture — correction on the record
The six specialty pages have been built as **cloned pages with hand-written content**, not as
an Elementor template driven by ACF. That is structurally the same pattern as the original
seven drafts, and it was not flagged at the time. The content is genuinely distinct per page,
so the substantive problem is solved, but the architecture is not what was assumed.

Agreed direction: build the template + ACF group **after** all six are written, extracting the
field schema from a finished page rather than guessing it up front — the way the `/websites/`
group evolved. Converting mid-way would mean writing the content into a guessed schema and then
rewriting it.

### Still to write
`/marketing/mental-health/` (87830), `/marketing/optometry/` (87832),
`/marketing/veterinary/` (87833), `/marketing/medical-seo/` (86878), the six support pages, and
the HIPAA page body. Then: images section by section, the template + ACF conversion, and the
product pages.

Testimonials remain dental on every specialty page — real client quotes that need real
per-specialty replacements.

## Batch 39 — 2026-08-10 — final three specialty marketing pages written

All six specialty marketing pages now have full, distinct content.

### /marketing/mental-health/ (87830) — 48 fields
Built around the one thing that makes this specialty different: **mental health is a restricted
advertising category** and campaigns get suspended without warning. The page argues for
condition and modality pages (anxiety, trauma, couples, EMDR, ADHD) and for clinician profiles
as the primary conversion element — clients choose a person, not a practice. Also handles the
directory-site problem: private practices compete against Psychology Today et al, not each
other. Focus keyword `mental health marketing`.

### /marketing/optometry/ (87832) — 48 fields
Written around the fact that optometry has **two revenue halves** — the chair and the optical —
and most agencies ignore the second. Argues for specialty service pages (dry eye, myopia
control, medical optometry) as the escape from routine-exam price competition with chains and
online retailers. Focus keyword `optometry marketing`.

### /marketing/veterinary/ (87833) — 48 fields
Built on urgency split: an owner searching "emergency vet" at midnight and one comparing
wellness plans are different buyers, and owners will drive an hour for emergency but not for
routine. Names corporate consolidators as the competitor. Focus keyword `veterinary marketing`.

Each page also had its icon boxes, founder list, hero list and three FAQ entries rewritten off
dental language, and meta title, description and focus keyword set.

### Image pattern identified (from the user's own work on med spa)
Comparing `/marketing/medical-spa/` against the dental source shows exactly two image widgets
get swapped per page, both from the **Clients Best** folder (559 images):

| Widget | Dental | Med spa (user's) |
|---|---|---|
| `6a68b78d` hero | 85882 laptop-dental-website-purple (Laptop) | **80183 Golden Glow MediSpa** (Clients Best) |
| second design | 86580 SmileTheory (Clients Best) | **83283 1004-lipsbysivan** (Clients Best) |

Two images stay shared on every page: `6a12e63d` google-review (Reviews folder) and `5cf14672`
communication-graphics (Icons folder). The remaining five specialty pages still show the dental
laptop and SmileTheory.

### Still to do
- Swap the two design images on orthodontic, mental-health, chiropractic, optometry and
  veterinary to specialty-matched Clients Best designs.
- `/marketing/medical-seo/` (86878), the six support pages, the HIPAA page body.
- Testimonials are still dental on all six specialty pages (~22-26 residual strings each).
- Template + ACF conversion deferred by agreement — pages for now.

## Batch 40 — 2026-08-10 — /marketing/medical-seo/ and /marketing/ai-optimization/ written

### /marketing/medical-seo/ (86878) — 63 fields
Mirrors the dental-seo structure but for physicians: condition pages rather than procedure
pages, physician schema rather than dental schema, and specialist keyword economics (fewer
searches, higher value, referral-source visibility alongside patient search). Budget sequence
is Google Business Profile -> Condition Pages -> Technical Health -> Reviews.
Focus keyword `medical seo`.

### /marketing/ai-optimization/ (86875) — 63 fields
The support page with genuine upside, and the only one written at full weight.

H1 "AI Search Optimization for Practices". The argument: patients increasingly ask ChatGPT,
Gemini and Perplexity for a recommendation, those tools answer by citing a handful of sources,
and most practices have no idea whether they are one of them. The four pillars are entity
consistency, answer-shaped content, named clinician attribution, and third-party corroboration
— because these systems weight what others say about a practice above what the practice says
about itself.

Two things the page is deliberately honest about, since overclaiming here would be easy:
- Volume is still small next to Google. The argument made is that it is **cheap to win now**
  and compounds, not that it is already big.
- Measurement is **less precise than rank tracking**, and the FAQ says so outright.

Focus keyword `ai search optimization`. No ad data exists for this term — it is a new category,
which is the point.

### Note on the support pages
These were meant to be lean, per the agreed tiering. They are currently full-length because
they inherit the dental page structure, and trimming sections is a structural change better
done once the content exists and it is clear what is redundant. `ai-optimization` earns full
length on its own merits; `ppc`, `social`, `reputation` and `content` probably do not.

### Remaining
`/marketing/seo/` (healthcare SEO, 86870), `/ppc/` (86871), `/social/` (86872),
`/reputation/` (86873), `/content/` (86874); the ten specialty image swaps; the HIPAA page body;
then the product pages. Testimonials deferred by agreement until the account search is done.

## Batch 41 — 2026-08-10 — five support pages written at reduced weight

All marketing page content is now written.

### Trimmed 18 sections -> 10, 123 KB -> 57 KB
Removed from `/marketing/seo/`, `/ppc/`, `/social/`, `/reputation/` and `/content/`:
why-choose-us, cost-per-patient, two inherited channel-detail sections, the custom-website
section, **Success Stories**, which-strategy, and the price tables.

Dropping Success Stories also removes the dental testimonials from these five pages, so they
are the only marketing pages with no borrowed proof on them.

Kept: hero, stats, problem, what-you-get, one channel section, founder, free-review, FAQ, CTA.
The founder section is now a one-line byline — "Reviewed by Dr. Sean Fahimi, DDS" — per the
agreed tiering, rather than the full section the landing pages carry.

### Content — 27 fields each
- **`/marketing/seo/`** — healthcare SEO. Argues against activity-based reporting and links
  down to dental SEO and medical SEO for specialty detail.
- **`/marketing/ppc/`** — the honest version: *exclusion beats bidding*. Two campaigns with
  identical budgets can differ by half on cost per patient purely on what they exclude.
- **`/marketing/social/`** — positioned as a closing signal, not a first-touch channel, and
  says so plainly. Leads on the **consent problem**: a patient photo without documented consent
  is a HIPAA issue, not a marketing win.
- **`/marketing/reputation/`** — states outright that we cannot remove bad reviews, and that
  review gating breaches Google and Yelp policy and can cost the profile. Both are things
  practices ask for and most vendors fudge.
- **`/marketing/content/`** — argues against weekly blogging in favour of fewer pages tied to
  real demand, and links to AI search optimization for the citation angle.

FAQs cut from nine entries to three focused ones per page. Hero lists rewritten. Meta title,
description and focus keyword set on all five.

### Marketing section status
Written: hub, dental, medical, dental-seo, medical-seo, six specialty pages, ai-optimization,
and these five support pages. **14 pages.**

### Remaining
- Ten specialty image swaps to Clients Best designs.
- HIPAA page body.
- Product pages.
- Testimonials on the eight landing pages — deferred until the account search is done.
- Publishing: everything except the hub and `/marketing/dental/` is still a draft.

## Batch 42 — 2026-08-10 — specialty design images swapped

Eleven image swaps on the marketing pages, following the pattern set on `/marketing/medical-spa/`:
widget `6a68b78d` (hero) and `18993109` (second design) both take a specialty-matched client
design, while `google-review` and `communication-graphics` stay shared across every page.

### How the images were chosen
Rather than guessing from filenames, candidates were pulled from **portfolio items in the
matching `project_category`**, then filtered to attachments in the **Clients Best** folder with
**zero existing Elementor usage**, sorted by resolution. That guarantees a real client in the
right specialty and avoids reusing an image already carrying alt text elsewhere.

| Page | Hero | Second design |
|---|---|---|
| orthodontic | 74760 Bethesda Orthodontics | 81640 Bay State Orthodontics |
| mental-health | 81516 Insyte Psychiatric | 80917 Prestige Mental Health |
| chiropractic | 80775 Goodyear Chiropractic | 80176 Integrity Interventional Pain Management |
| optometry | 80411 Ravenswood Eyecare | 81933 West 5 Optometry |
| veterinary | 85045 Michigan Pet Surgeon | 85047 Animal Hospital |
| medical | (83155, done in Batch 36) | 80937 Clear Passage |

Alt text set on all eleven in the form *"<Client> website design by O360"*.

Deliberately skipped despite matching the specialty: **81867 Chestnut Dental** (30 existing
Elementor uses), **85513 Sweet View Optical** (9) and **85052 Happy Tails** (4) — reusing a
heavily-used image would have forced its alt text to serve two contexts.

### Remaining
- HIPAA page body; product pages.
- Testimonials on the eight landing pages (deferred pending the account search).
- Publishing: everything except the hub and `/marketing/dental/` is still a draft, and the hub's
  channel links are still withheld until the children go live.

## Batch 43 — 2026-08-10 — HIPAA page rewritten as a web design landing page

`/products/hipaa/` (83112) was structured as a HIPAA explainer — eight feature sections
teaching encryption, auditing and storage from scratch. Visitors to this page are not trying to
learn HIPAA; they want a web designer who already is compliant. Rewritten so compliance is
confirmed fast and repeatedly, the HIPAA depth is used as proof of expertise, and the thing
being sold is the website.

**42 fields rewritten.** Also removed leftover placeholder text ("Section 2: Cutting-Edge
Encryption Techn...") that had been sitting in the live copy.

### New section flow
1. **Hero** — "Yes, fully compliant, and we sign a BAA. That is the easy part." Then straight
   into the point: HIPAA touches far more of a website than the server it sits on.
2. **Who We Build For** — startups, existing practices, groups and hospitals.
3. **Yes — Fully HIPAA-Compliant** — the unambiguous confirmation, one signed BAA covering
   websites, forms, email and hosting.
4. **HIPAA Shapes Every Decision — Down to the Photos** — the section that carries the page.
   Images and consent, contact forms and chat capturing symptoms, **advertising pixels
   transmitting PHI from condition pages**, and testimonials needing consent behind them. This
   is where the expertise shows without becoming a lecture.
5. **HIPAA-Compliant Forms** — intake, contact, appointment requests, encrypted end to end.
6. **Access Control & Audit Trails** — per person, per role, timestamped.
7. **HIPAA-Compliant Hosting & Servers** — encrypted, redundant, BAA-covered, and the site is
   still yours to take anywhere.
8. **HIPAA-Compliant Email** — Outlook and practice management, no portal to remember.
9. **And It Still Has to Be the Best-Looking Practice in Town** — the pivot back to the
   product: *"Compliance keeps you safe. The design is what fills the schedule."*
10. **We Know HIPAA Because It Is All We Do** — 2003, dentist-founded, one industry.

Icon lists and the three audience boxes were rewritten to match. Verified against the database:
all 11 image widgets resolve to valid attachments.

*(Note: the in-request image check reported 11 broken images — a false positive caused by
calling `clean_post_cache()` immediately before `get_post_status()` in the same request. Same
artefact as Batch 34. Confirmed valid with a direct query.)*

### Remaining
Product pages. Then: testimonials on the eight marketing landing pages, and publishing —
everything except the marketing hub and `/marketing/dental/` is still a draft.

## Batch 44 — 2026-08-10 — gallery + features sections added to the HIPAA page

Copied two sections from the specialty template **86918** into `/products/hipaa/` (83112), so it
carries the same visual weight as a `/websites/` landing page. 11 sections -> 13.

- **Gallery** (`32a42fd8`) — portfolio loop grid, inserted directly after the "And It Still Has
  to Be the Best-Looking Practice in Town" pivot, where the page turns from compliance to design.
- **Features** (`ac59f10`) — the six feature boxes: Advanced Technology, Enterprise Hosting, SSL
  Encryption, Concierge Support, Advanced Tools, Accessibility Plugin.

### Three things that had to be handled in the copy
1. **ACF dynamic tags.** Both sections pull their headings and body from the specialty page's
   ACF fields, which do not exist on the HIPAA page — they would have rendered blank. All six
   affected widgets were given static copy written for this page ("HIPAA-Compliant Websites
   We've Designed and Built", "Real practices. Real custom design. Every one of them
   compliant."). Verified: **0 dynamic tags remain** on the page.
2. **Element ID collisions.** Elementor requires unique IDs within a page. Every copied element
   was given a fresh ID and the whole document was scanned for duplicates before saving —
   **0 duplicates**.
3. **The loop grid query.** It carried `post_query_query_id = o360_specialty_examples`, a custom
   query filter keyed to the current specialty page's taxonomy. On a non-specialty page that
   would have returned an empty gallery. Cleared the custom query ID and set an explicit
   date-ordered query instead. Verified the loop template (86911) is published and **549
   portfolio items** are available to fill it.

### Final HIPAA page flow (13 sections)
Hero · Who We Build For · Yes — Fully HIPAA-Compliant · HIPAA Shapes Every Decision ·
Forms · Access Control & Audit Trails · Hosting & Servers · Email · Best-Looking Practice ·
**Gallery** · **Features** · We Know HIPAA · CTA

### Remaining
Product pages (`/products/`, `/products/logo/`, `/packages/`, `/pricing/`). Then testimonials
and publishing.

## Batch 45 — 2026-08-10 — HIPAA page rebuilt from the /web-design/ layout

Replaced the body of `/products/hipaa/` (83112) with a clone of `/web-design/` (86913), then
customised it for HIPAA. Same job as the pillar page — take paid and organic search and sell
web design — so it now uses the same layout, gallery, examples and visual weight.

**Backup first:** page **87834** holds the previous HIPAA page in full, `_elementor_data`
verified byte-identical before anything was overwritten.

**Preserved on 83112:** the URL, the post title, and the Rank Math title, description and focus
keyword (`hipaa compliant website builder`) set in Batch 43. Only the body was replaced.
Page-level Elementor settings were carried across from the source so the layout renders the
same.

### Customisation — 20 fields, 24 sections -> 23
- **Hero** — H1 `Healthcare Website Design` -> **`HIPAA-Compliant Website Design`**; eyebrow and
  intro rewritten to settle compliance immediately ("That part is settled before we start. What
  you are really buying is a website that makes you the obvious choice in your area").
- **"HIPAA Emails" expanded into "HIPAA Email, Forms and Servers"** — now the deepest section on
  the page, covering the five places practices actually get caught out: email, forms, servers,
  images and copy, and **tracking pixels transmitting PHI from condition pages**.
- **SSL section** widened to encryption in transit *and* at rest.
- **Gallery, "What's in Every…", "Stand Out…", process and accessibility** headings all made
  HIPAA-led; the packages list now leads on Security & Compliance.
- **Accessibility** reframed — ADA and HIPAA are separate obligations practices tend to discover
  at the same time, usually after a complaint.
- **Logo Design section removed** — off-message on a compliance landing page.

HIPAA is now mentioned 32 times across the page, spread through rather than concentrated in one
block, which is what the brief asked for.

### Note
The previous HIPAA rewrite (Batches 43-44) is superseded. That work is not lost — it is in
backup page 87834, and several of its arguments were carried into this version.

### Remaining
Product pages (`/products/`, `/products/logo/`, `/packages/`, `/pricing/`). Then testimonials
and publishing.

## Batch 46 — 2026-08-10 — HIPAA page: three sections merged into Advanced Technology

Following the user's own cleanup pass, **Enterprise Hosting** (`23c628b6`) and **Advanced
Tools** (`49d2fec3`) were merged into **Advanced Technology** (`2e112431`). 19 sections -> 17,
207 KB -> 122 KB.

### Feature list — 15 bullets consolidated to 12
Kept all distinct items across the three lists; folded "Add/Edit Pages" and "Image Editor" into
"24/7 Online Editor & Page Builder", and upgraded "Managed Daily Backups" to "Encrypted Daily
Backups" to match what the hosting actually provides on a compliant stack.

### Three paragraphs merged into one
Covers technology and performance, hosting and uptime, the BAA, and self-service plus concierge
editing:

> Your website should perform like the practice behind it. We build on current HTML5 and CSS3
> with optimized code that loads fast, works alongside your practice software, and holds up on a
> phone in a waiting room. It runs on cloud-based enterprise servers with no bandwidth limits,
> encrypted daily backups and 24/7 uptime monitoring — all covered by the same signed BAA as
> your email and forms — because a site that is slow or offline costs you patients who simply
> call someone else. And it stays yours to control: log in any time to edit pages, swap images
> and publish changes through WordPress and Elementor, or send them to our team and we will make
> them for you at no extra cost.

H3 is now "Built Fast, Hosted Securely, and Yours to Control". The two retired H3s — "Don't Lose
a Single Patient" and "Make Changes to Your Site, When You Want" — survive as clauses.

**Correction to the proposal:** the two retired sections were expected to free up two images.
They contained no image widgets, so nothing was orphaned — the visuals in those sections came
from backgrounds, not image widgets.

### Remaining
Product pages (`/products/`, `/products/logo/`, `/packages/`, `/pricing/`). Then testimonials
and publishing the marketing drafts.

## Batch 47 — 2026-08-10 — product redirects fixed + Patient Education Videos page created

### Redirects
- **#182 `logo-design-services`** was pointing at `/products/products/logo/` — a malformed
  double path that 404s. **253 hits.** Repointed to `/products/logo/`, verified resolvable.
- **#1783 `products/` -> `/web-design/`** was **active with 517 hits** while `/products/` is a
  live published hub with 17 inbound links. Same shadowing pattern as the `websites/*` landmines
  in Batch 31. Trashed, so the hub is reachable.

**Deliberately not touched yet:** `patient-education-video` (#179, 821 hits) still points at the
malformed `/products/products/video/`. It should point at the new video page — but that page is
a draft, and repointing to a draft would swap one 404 for another. Queued for publish.

Same reasoning holds for the ~1,065 reputation hits and 48 `seo-ppc` hits: `/marketing/reputation/`,
`/marketing/seo/` and `/marketing/ppc/` are all still drafts.

### /products/patient-education-videos/ (87836) created
Cloned from the trimmed HIPAA layout (which is itself the `/web-design/` layout), then written
for video. 17 sections -> 16; the HIPAA Email/Forms/Servers section was dropped as it belongs to
the HIPAA page.

**Why this page exists:** the redirect table shows roughly **10,400 historical hits** across
video and patient-education URLs — `products/dental-education-videos` alone has 6,286, and two
of these URLs were last hit the same day this was written. All of them currently dump on
`/web-design/`. There are also 68 `wpmudev_custom_video` items and a "Video Pt. Edu" media folder
already in the library with no page owning them.

Content leads on the actual mechanism rather than a claim: *"A patient who has watched a
two-minute explanation of a root canal, an implant, or a first visit arrives with fewer
objections and better questions. That is the whole mechanism — it is not persuasion, it is
comprehension."* The page also argues the SEO case for self-hosting the library rather than
embedding a third-party player.

Focus keyword `patient education videos`.

### Known remaining on this page
11 residual HIPAA mentions in sections not yet rewritten (SSL, accessibility, packages list,
FAQ). Several are legitimate — compliant hosting is a real feature — but the section needs a
pass to check none read as leftovers.

### Remaining overall
`/products/hosting/`; the `/products/` hub rewrite; `/packages/` orphan; `/pricing/` depth;
the queued redirect repoints; publishing.

## Batch 48 — 2026-08-10 — everything published, 11,497 redirect hits recovered

### 16 pages published
All nine channel/SEO marketing pages, the five remaining specialty marketing pages, and
`/products/patient-education-videos/`. Every one verified to resolve to its own ID after
publishing. (`/marketing/medical-spa/` was already live.)

**Backup pages 87774 and 87834 confirmed still draft.** The publish routine also carried a guard
refusing to publish anything with "BACKUP" in the title, so a stray ID in the list could not
have exposed a backup.

### 17 redirects repointed — 11,497 hits
Now that the targets are live, the redirects that were queued in Batch 47 could be pointed at
real pages instead of `/web-design/` or the marketing hub.

**Video cluster -> `/products/patient-education-videos/` (10,384 hits)**
`products/dental-education-videos` 6,286 · `products/medical-education-videos` 1,360 ·
`products/video-dental` 1,165 · `patient-education-video` 821 (was pointing at the malformed
`/products/products/video/`) · `products/video` 425 · plus seven smaller.

**Reputation -> `/marketing/reputation/` (1,065 hits)**
`products/reputation` 469 · `reputation-management` 513 + 3 · `reputation` 80.

**`seo-ppc` -> `/marketing/seo/`** (48 hits).

Skipped: **#1601**, which carries two patterns (`blogs/reputation-management` and
`products/reputation-management`, 23 hits) under one target — repointing it would move the blog
URL too.

### Marketing hub interlinking
The hub had been edited by the user between batches — a cleanup pass, not a revert: the H1
"Healthcare Marketing", the rewritten intro and all section copy were intact, and there were
zero "SEO Marketing" strings left. The link widget added in Batch 35 had been removed as part of
that cleanup.

Re-added with the full set now that the children are live: **19 links**, every target verified
to resolve to a published page before insertion, and the document checked for duplicate element
IDs after. Grouped by practice type and by channel.

### Remaining
`/products/hosting/`; `/products/` hub rewrite; `/packages/` orphan (still zero inbound links);
`/pricing/` depth; the 11 residual HIPAA mentions on the video page; testimonials on the eight
marketing landing pages.

## Batch 49 — 2026-08-10 — /products/adapt/ rebuilt (website accessibility)

Built at the **exact URL that ten redirects already point to**, so the ~849 hits that had been
404ing since the old page was deleted now land on a real page. Published immediately.

Page **87837**, cloned from the video product layout, 16 fields written. Focus keyword
`website accessibility`.

### Source
The plugin vendor's site could not be fetched — `EGRESS_BLOCKED`, the same restriction that
prevented screenshotting client sites. Rather than invent a vendor's feature list on a
compliance page, the copy was written from the source content the user supplied directly.

### Claims — deliberately constrained
The user asked for no promise of legal protection and no scare tactics. Both held to:

- **No legal-protection language.** The page never says compliant, protected, guaranteed or
  lawsuit-related anything.
- **No fear framing.** The vendor's own page leads on 5,000+ lawsuits filed in 2025; none of
  that was carried over.
- **The honest limit is stated plainly**, because it is both true and the reason hand review
  exists: *"An automated engine handles the large majority of accessibility issues, but some
  WCAG criteria need human judgement — whether alt text actually describes the image, whether a
  form error message makes sense, whether a page reads sensibly in the order a screen reader
  announces it. Software cannot decide those."* This matters — the vendor's own data says over a
  quarter of sued businesses already had a widget installed.
- Hand review is presented as **a separate engagement**, with "we will tell you honestly whether
  we think you need it".
- The **$39/month** vendor price is named, and the page states it is included at no extra cost.
- The **$5,000 Disabled Access Credit** is mentioned with "ask your accountant" rather than as
  advice.

### One inherited claim found and fixed
The cloned SSL feature list contained **"Compliance Guaranteed"** — precisely the kind of
promise to avoid. Changed to "Certificate Renewal Managed" on this page.

**It is still live on 6 other published items**, including `/web-design/`, `/products/hipaa/`,
`/products/patient-education-videos/` and the specialty template 86918 (which renders all 46
`/websites/` pages). Flagged for a decision — it is a compliance guarantee appearing across most
of the site.

### Remaining
`/products/hosting/`; `/products/` hub rewrite; `/packages/` orphan; `/pricing/` depth; the
"Compliance Guaranteed" sweep; testimonials.

## Batch 50 — 2026-08-10 — accessibility page reframed + "Compliance Guaranteed" removed site-wide

### /products/adapt/ — liability framing corrected
Removed *"we will tell you honestly whether we think you need it"* — that positioned O360 as the
judge of whether a practice is adequately covered, which is not a call we should be making.

Replaced with a section that states what the plugin does and puts the determination where it
belongs:

- **H2** "What the Plugin Covers — and What Is Your Call"
- **H3** "Whether this is enough for your practice is a decision for you and your attorney"
- Body states plainly: *"Whether this is sufficient for your practice is not our call to make.
  It depends on your state, the patients you serve, the size and type of your practice, and
  obligations that may apply to you specifically. That is a question for you and your attorney."*
- Keeps the honest limit ("no plugin on the market can" make judgement calls), the AI-driven
  continuous operation, the $39/month value included free, and the $5,000 Disabled Access Credit
  pointer.

Verified: zero instances of guarantee, legal protection, fully compliant, or lawsuit language.

### "Compliance Guaranteed" removed from every live page
The phrase was inherited from an old SSL feature list and had spread across the site. Replaced
with "Certificate Renewal Managed" on **10 items**, including:

- **Template 86918 "Landing for Websites"** — renders all 46 `/websites/` specialty pages
- `/web-design/`, `/products/hipaa/`, `/products/patient-education-videos/`
- `Single: Websites Landing` (79588) and two older landing templates

Caches cleared for every affected item plus all 46 specialty pages, Elementor file cache and
WP Rocket.

**Zero live pages now carry the phrase.** What remains is confined to material that never
renders: one revision, three trashed pages, and four backup drafts. Three of those backups
(87001, 87032, 87058 — Landing for Websites backups) were **skipped deliberately** because the
replacement would have broken their JSON; they are drafts and not served, so they were left
intact rather than risk corrupting a backup.

### Remaining
`/products/hosting/`; `/products/` hub rewrite; `/packages/` orphan; `/pricing/` depth;
testimonials on the marketing landing pages.


---

## 2026-08-10 — Batch 51: product pages rebuilt on the Marketing layout

Record: `backups/2026-08-10-product-pages-marketing-layout.json`

### The correction
`/web-design/` was only ever meant to be the source layout for `/products/hipaa/`. I had used it
for `/products/adapt/` and `/products/patient-education-videos/` as well, and had started
`/products/hosting/` the same way. All three were rebuilt from **`/marketing/dental/` (86667)**,
using existing sections from that page verbatim — no new or plain sections were authored.

### Backups taken first (nothing deleted)
| Template | Page | Bytes | Verified |
|---|---|---|---|
| 87839 ARCHIVE — Patient Education Videos | 87836 | 118,961 | byte-identical |
| 87840 ARCHIVE — Website Accessibility (ADAPT) | 87837 | 120,418 | byte-identical |

### Pages
- **`/products/adapt/` (87837)** — 11 sections, 43 fields rewritten. The approved liability
  framing is preserved: what the plugin covers is stated factually, and whether it is enough is
  explicitly the client's and their attorney's call.
- **`/products/patient-education-videos/` (87836)** — 12 sections, 51 fields rewritten. The 11
  residual HIPAA mentions are gone; they existed only in the old web-design clone.
- **`/products/hosting/` (87838)** — NEW, published. 13 sections, 51 fields. Covers enterprise
  cloud servers, SSL, backups, monitoring, HIPAA servers/email/forms, concierge support and
  migration.

### Images
Marketing imagery came across with the sections (Google SERP screenshots, social icons, a dental
testimonial). Replaced with product-appropriate library images — 4 on the video page, 6 on
hosting, 2 on accessibility. No new media uploaded, no attachment alt text changed.

**Flagged:** the library has no accessibility-specific imagery. The two swaps on
`/products/adapt/` are neutral device shots chosen only because a Google SERP screenshot on an
accessibility page was worse. They need direction.

### Copy fix
`/products/hosting/`: "Fully compliant servers" → "HIPAA-compliant servers". An unqualified
"fully compliant" is the same class of absolute claim as "Compliance Guaranteed".

### Redirects — 12 rows changed, ~3,000 hits
Three rows were pointing at **doubled-path 404s** (`/products/products/...`), losing 750 hits:
183 (444 hits) → `/products/hipaa/`, 185 (146) → `/products/hosting/`, 186 (160) →
`/products/adapt/`. Nine SSL/hosting rows were repointed off `/web-design/` onto
`/products/hosting/` — the largest being 820 `articles/ssl-security` (1,015 hits) and 1905
`products/ssl` (398). Two duplicate patterns were removed (row 1605's doubled
`project-feature/ssl`, row 186's `blogs/products/ssl` which row 150 already carries).

Rows **1151** (375 hits) and **1091** (141) were left alone — announcement posts covering SSL
*and* accessibility together, so splitting them is a judgement call worth asking about.

Every changed row re-read and resolved with `url_to_postid()`: all 12 map to published pages,
zero unresolved. Redirection cache cleared (1,847 rows).

### Remaining
`/products/` hub rewrite (6 KB stub, 17 inbound links, no link to hosting); `/packages/` orphan;
`/pricing/` depth; testimonials on the marketing landing pages; accessibility imagery.

**Follow-up (same batch):** the rebuild had dropped the Disabled Access Credit point that was on
the old `/products/adapt/`. Restored as a bullet ("Small practices may qualify for the $5,000
Disabled Access Credit") and a 10th FAQ that states the credit exists, names IRS Form 8826, and
sends the qualification question to the client's CPA rather than answering it ourselves.

---

## 2026-08-10 — Batch 52: /products/mobile/ + the /products/ hub

Record: `backups/2026-08-10-mobile-page-and-products-hub.json`

Decisions applied: mobile at `/products/mobile/`, logo stays at `/products/logo/`, hub grid copied
from `/web-design/`.

### `/products/mobile/` (87841) — NEW, published
Angle: responsive is the baseline and is included; we design a **separate phone layout and a
separate tablet layout** rather than reflowing one design; the tablet breakpoint is the one nearly
everyone skips; full native app development available as a scoped project.

12 sections from `/marketing/dental/` plus 3 from `/web-design/` — the mobile slides showcase, the
image carousel (repurposed from testimonials to 9 mobile examples), and the portfolio gallery.
Zero element-ID collisions between the two sources, verified before assembly. 20 images, all from
the Mobile / iPad folders. 53 fields written.

### `/products/` hub (83110) — rewritten
Was 6 KB: two headings, two images, and links to none of the product pages. Now 67 KB and owns one
question — **what comes with the website, and what am I going to get billed for later.**

The core is the 6-box grid from `/web-design/`, now a product grid linking to all six pages. Backed
up first as template **87842** (byte-identical).

It does not overclaim: logo is not listed as included, and the FAQ says plainly that marketing is a
separate optional program.

### Redirects — every doubled-path 404 on the site is now gone
One catch worth naming: redirect **1904** (`products/mobile/` → `/web-design/`, 377 hits) could not
be repointed — its source pattern is now the live page itself, so a repoint would have been a
**self-redirect loop**. It was trashed instead, and those hits now resolve directly.

Fixed 20 rows pointing at doubled paths: `mobile-website` (642 hits), the accessibility blog post
(439), `products-logo` (95), and 17 zero-hit `features/products/adapt/*` rows.

Full-table scan after the change: **zero** active redirects with a doubled path, and **zero** rows
whose source pattern equals their own destination.

### Two copy fixes on pages not otherwise touched
`/products/` — my own "unable to guarantee they keep working" → "stand behind them the same way".
`/products/hipaa/` — pre-existing "Fully compliant servers" → "HIPAA-compliant servers".

### Flagged
Image-box `3771678f` renders with **no image** on two live pages — `/web-design/` and
`/products/hipaa/`. It is titled "Visual Effects" and the only unused icon in that set is a
smartphone, which does not fit. Pre-existing; left alone rather than guessed at. It is filled on the
hub, where it is now the Hosting card.

### Remaining
`/packages/` orphan; `/pricing/` depth; testimonials on the marketing landing pages; accessibility
imagery; the empty image-box above.
