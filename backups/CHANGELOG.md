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
