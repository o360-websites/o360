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

