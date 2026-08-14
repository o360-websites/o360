# o360.com — Operations Manual

Hard-won specifics about this site. Most of these were learned by getting
something wrong first. Read §3 and §4 before you edit anything.

Last verified: 2026-08-14.

---

## 1. How to talk to the site

Everything goes through the Novamira MCP connector:

- ability: `novamira/execute-php`
- parameters: `{ "code": "<php>" }`
- the code runs inside WordPress with plugins loaded; `return` a value to see it

The connector **disconnects frequently**. When it does, re-load the tool schema
and carry on — nothing is lost.

### Reading a page's Elementor tree

```php
$d = get_post_meta($id, '_elementor_data', true);
if (is_array($d)) $d = wp_json_encode($d);   // it is sometimes already an array
$t = json_decode($d, true);
```

### Writing it back — always this shape

```php
$json = wp_json_encode($tree, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
if (json_decode($json, true) === null) { /* abort, do not save */ }
update_post_meta($id, '_elementor_data', wp_slash($json));
```

`wp_slash()` is required. Omitting `JSON_UNESCAPED_SLASHES` bloats every URL in
the blob.

### Gotchas that cost time

- Elementor stores URLs **JSON-escaped** (`https:\/\/o360.com\/...`). Normalise
  with `str_replace('\\/','/',$blob)` before running any regex over the raw blob.
- `_elementor_page_settings` is sometimes already an array — `json_decode()` on
  it throws.
- Element IDs must be **unique within a page**. If you clone a section, re-ID
  every descendant and assert uniqueness before saving.

---

## 2. Elementor structure of the marketing pages

The marketing pages share section and widget IDs, which is what makes
cross-page edits practical — the same ID means the same thing on every page.

### Section IDs (top level, in usual order)

| ID | Section |
|---|---|
| `de04a06` | spacer (hidden on tablet/mobile — intentional) |
| `625380b7` | hero |
| `f4f70c5` | stats row (newer) / `393e660` legacy stats |
| `3109b177` | problem statement |
| `ec6222f` | 3 image-boxes ("why practices choose us") |
| `2f61210d` | "What You Get" |
| `e686509` | Design A (client-built) |
| `a011cbe` | 4 icon-boxes (cost per patient) |
| `42c5e65a` | technical / landing-pages section |
| `4bb1f2d2` | reviews / tracking section |
| `50dc6ed` | Design B (client-built) |
| `39d4fd74` | website section |
| `6e3671d0` | success stories |
| `6236937c` | 4 boxes ("where should budget go first") |
| `5f1ac72d` | "What's Included" price tables |
| `dental-faq-section` | FAQ |
| `65f4cb60` | closing CTA |
| `f6cbf83` | founder / Dr. Sean Fahimi bio |
| `2dc6190` | free analysis |
| `48c68eb7` | SEO section |

Page-specific specialty sections added 2026-08-14:
`ppc-dental-section`, `ppc-medical-section`, `soc-dental-section`,
`soc-medical-section`, `rep-dental-section`, `rep-medical-section`,
`con-dental-section`, `con-medical-section`.

### Widget IDs worth knowing

| ID | What |
|---|---|
| `7db36c78` | hero h1 |
| `75efa1b2` | hero sub-heading |
| `6b9bd428` | hero intro paragraph |
| `37a8f3a` | hero icon list |
| `6a68b78d` | hero main image |
| `6a12e63d` | hero Google-review badge |
| `2f8c44a0` | SERP mockup image (in "What You Get") |
| `3b75267a` | secondary specialty screenshot (same section) |
| `589f41db` | "What You Get" icon list |
| `6cab5395` / `5ebfdc11` | "What You Get" heading / body |
| `0b75f60` | founder image |
| `d292177` / `0a0c0a0` | Design A image / 5-item list |
| `5017d845`, `63e9829f`, `313d6d5d`, `726339a2` | the 4 Success Stories images |
| `dental-faq-heading` / `dental-faq-accordion` | FAQ heading / accordion |

FAQ questions live in the accordion's `tabs` repeater
(`tab_title` / `tab_content` / `_id`).

---

## 3. Verify against RENDERED output, never stored data

**This is the most important section in this file.**

Elementor image widgets store `{"url": …, "id": …}` and **re-resolve the URL from
the attachment ID at render time**. A stale or wrong URL sitting in
`_elementor_data` therefore does **not** mean the image is broken on the page.

A stored-data audit of this site once reported 131 broken image references
across 35 pages. The real number, measured against rendered output, was **16
references across 8 files**. Acting on the stored-data number would have meant
"fixing" 115 things that were never broken.

Correct methods:

```php
// rendered HTML for a page
$html = \Elementor\Plugin::$instance->frontend->get_builder_content_for_display($pid, true);
```

Background images never appear in HTML — they live in the generated CSS under
`wp-content/uploads/elementor/css/`. Scan those files separately.

Or fetch the live page over HTTP and inspect it, which also proves the caching
layers are serving what you expect.

### Missing images return HTTP 200

The origin serves a **~146-byte `text/html` body** for a missing upload, with a
200 status. Checking status codes alone will not find them. Check payload size:
anything under ~1 KB that is not an SVG is suspect.

---

## 4. Cache purge recipe — run after EVERY Elementor edit

`rocket_clean_post()` alone is not enough. WP Rocket keeps separate tables that
it does not touch, and the live page will keep serving old inlined CSS.

```php
global $wpdb;
delete_post_meta($id, '_elementor_element_cache');
delete_post_meta($id, '_elementor_css');

$css = new \Elementor\Core\Files\CSS\Post($id);
$css->update();

if (function_exists('rocket_clean_post')) rocket_clean_post($id);

$u = get_permalink($id);
foreach (['wpr_rucss_used_css','wpr_above_the_fold','wpr_lazy_render_content'] as $tb) {
    $t = $wpdb->prefix . $tb;
    if ($wpdb->get_var("SHOW TABLES LIKE '$t'") !== $t) continue;
    foreach ([$u, rtrim($u,'/')] as $uu) {
        $wpdb->query($wpdb->prepare("DELETE FROM $t WHERE url=%s", $uu));
    }
}
```

**Never `rocket_clean_domain()`.**

While Used CSS regenerates (async), Rocket falls back to full stylesheets, so
pages stay styled — a purge is safe.

### Edge-cache red herring

Fetching `post-<id>.css` at its bare path can return a **stale Cloudflare copy**.
The page links it with `?ver=…&wpr_t=…`; only that versioned URL returns the
fresh rule. Do not conclude a CSS change failed until you have checked the
versioned URL or the file on disk.

---

## 5. Reference tables

### Marketing pages (verified 2026-08-14)

| ID | Title | URL |
|---|---|---|
| 18386 | Marketing (hub) | `/marketing/` |
| 86667 | Dental Marketing | `/marketing/dental/` |
| 86876 | Medical Marketing | `/marketing/medical/` |
| 86870 | Healthcare SEO | `/marketing/seo/` |
| 86871 | Healthcare PPC & Google Ads | `/marketing/ppc/` |
| 86872 | Healthcare Social Media Marketing | `/marketing/social/` |
| 86873 | Healthcare Reputation Management | `/marketing/reputation/` |
| 86874 | Healthcare Content Marketing | `/marketing/content/` |
| 86875 | AI Optimization for Healthcare | `/marketing/ai-optimization/` |
| 86877 | Dental SEO | `/marketing/dental-seo/` |
| 86878 | Medical SEO | `/marketing/medical-seo/` |
| 87828 | Medical Spa Marketing | `/marketing/medical-spa/` |
| 87829 | Orthodontic Marketing | `/marketing/orthodontic/` |
| 87830 | Mental Health Marketing | `/marketing/mental-health/` |
| 87831 | Chiropractic Marketing | `/marketing/chiropractic/` |
| 87832 | Optometry Marketing | `/marketing/optometry/` |
| 87833 | Veterinary Marketing | `/marketing/veterinary/` |

Note: the WP page titles still say "Healthcare …" while the on-page H1s now say
"Dental & Medical …". That divergence is deliberate and unresolved — see §7.

### Other key posts

| ID | What |
|---|---|
| 10545 | Home |
| 12599 | About Us |
| 83110 / 87836 / 87838 | Products / Patient Education Videos / Healthcare Website Hosting |
| 86913 | Web Design |
| 83112 | HIPAA |
| 26539 | Footer template |
| 86551 | Header template (renders menu "Main Header", term 2491) |
| 85588 | "Sections BU 2024" template |
| 86918 | "Landing for Websites" (46 theme-builder conditions — handle with care) |
| 79953 | Elementor kit (Default Kit) |

### Custom Global Colors (kit 79953)

Reference as `__globals__: {"<setting>": "globals/colors?id=<ID>"}`, which
renders as `var( --e-global-color-<ID> )`.

| ID | Name | Hex |
|---|---|---|
| `280a08c5` | White | #FFFFFF |
| `7f038f37` | Black 0 | #000000 |
| `2b3a7f9f` | Black 1 | #1A1A1A |
| `848d8fa` | Black 2 | #222222 |
| `78540a19` | Black 3 | #333333 |
| `4f744f07` | Black 4 | #444444 |
| `231914e5` | Black 5 | #555555 |
| `302bb9f2` | Black 9 | #989898 |
| `3e77f8c3` | Blue 2 | #28ACFF |
| `5f319a18` | Blue 3 | #5EB6FF |
| `7ab2c338` | Blue 4 | #90CDFF |
| `900fce2` | Blue 5 | #B2D8F8 |
| `a10095f3` | Blue 6 | #0095F3 |
| `3f3fa98` | Dark Blue 0 | #041C5E |
| `8e577f1` | Dark Blue 2 | #002E5B |
| `320caf86` | Dark Blue 3 | #003A74 |
| `8d0ae40` | Dark Blue 4 | #023C76 |
| `3d9b02dc` | Dark Blue 5 | #195BAB |
| `a1002244` | Dark Blue 6 | #002244 |
| `a1063d84` | Dark Blue 7 | #063D84 |
| `79960d2b` | Light 1 | #DAE9FB |
| `337aa567` | Light 2 | #EFF5FC |
| `a1d7e7f7` | Light 3 | #D7E7F7 |
| `a1f4f8fc` | Light 4 | #F4F8FC |
| `7e246aa7` | Orange 0 | #AB4B00 |
| `6cfd058f` | Orange 2 | #C95700 |
| `2fb5ebc2` | Orange 3 | #E35D11 |
| `7f0634a` | Orange (Hover) | #CF520B |
| `e04ccf0` | Blue (Hover) | #0082C4 |
| `e58faf6` | Transparent | #02010100 |
| `a1fff12` | White 7% | #FFFFFF12 |

### Custom Global Typography (kit 79953)

`bc7cafe` Page Title XL · `33b6ca1c` Page Title (h1) Bold · `11d267e` Page
Subtitles Thin · `b1592aad` Pre-Titles · `f31095a5` Section Title (h2) Thin ·
`9b77dcee` Section Title (h2) Bold · `a8a7c637` Widget Title (h3) · `78b2240a`
Paragraph Title (h3) · `48f24b0` Button 1 · `425a7b1` Button 2 · `baf9261` Large
Lists Bold · `73605fda` Bullet Lists · `dc3c3721` ALLCAP Lists · `5d0888b`
Bullet Header · `69781f05` Stat Number · `a1statxl` Stat Number XL · `ad1488ae`
Stat Label · `a1small` Small Text · `a1listtxt` List Text · `a1introtx` Intro Text

### Media folders (taxonomy `media_folder`)

`2505` Clients · `2835` Clients Unused · `2772` Marketing · `2805` Laptop 3D ·
`2810` Laptop · `2832` Background Laptop 3D. Stored term counts are unreliable —
count posts directly.

---

## 6. Useful techniques

### Responsive hide (keeps the section visible in the editor)

```php
$section['settings']['hide_desktop'] = 'hidden-desktop';
$section['settings']['hide_tablet']  = 'hidden-tablet';
$section['settings']['hide_mobile']  = 'hidden-mobile';
```

### Elementor's default box shadow

Set `image_box_shadow_box_shadow_type => 'yes'` with no explicit value and
Elementor emits `box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.5)`.

### Getting an image into the media library

The WP host has general outbound HTTPS, so `download_url()` +
`media_handle_sideload()` from a public URL works. The WP REST upload endpoint
returns 403, and the usual paste-bin hosts are blocked.

Alternatively, generate the file **on the server** with GD and register it with
`wp_insert_attachment()` + `wp_generate_attachment_metadata()` — this is how the
SERP images were de-framed (changelog batch 97). Always create a **new**
attachment; never overwrite an original.

### Rank Math

- `rank_math_facebook_image` / `rank_math_facebook_image_id` control `og:image`;
  without them Rank Math scrapes page content.
- Redirects live in `{prefix}rank_math_redirections`. Setting `status='inactive'`
  disables a redirect while preserving its hit count.
- `RankMath\Redirections\Cache::purge()` requires an argument; truncating the
  cache table is the blunt alternative.

### Analytics — there is none queryable

Rank Math's Search Console and Analytics tables are **empty** (not connected).
Microsoft Clarity is installed but its data lives on Clarity's servers. There is
no page-view counter plugin. **You cannot answer "how many visits" from the
database.** The only counts present are redirect hits, and those are heavily
bot-polluted (`ads.txt` and `.well-known/traffic-advice` are being redirected to
content pages and account for 13,800+ hits between them).

---

## 7. Open items

- **SEO titles vs H1s.** The four channel pages now have H1s reading "Dental &
  Medical …", but their Rank Math SEO titles and the WP page titles still read
  "Healthcare …". Awaiting a decision.
- **Keyword proximity.** Measured 2026-08-14: density is under 1% on every
  channel page, but the phrase in a section heading is repeated 3–6 words later
  in the first sentence beneath it, on the SEO / Dental SEO / Medical SEO / PPC
  pages. "Google Business Profile" appears 4× within ~150 words on the two
  specialty SEO pages. De-duplication proposed, not yet applied.
- **`/marketing/seo/`** still leads with "Healthcare" while its four siblings
  lead with "Dental & Medical".
- **5 unrecoverable About Us review photos** (aliciamacgowan, jessewelsh,
  maryphilp, Elizabeth-Ciesielski, fivers). Three others were recovered from
  Cloudflare's edge cache and are in `backups/recovered-images-2026-08-12/`;
  they still need re-uploading and re-pointing (old attachment IDs are gone).
- **Success Stories** remains responsive-hidden on Medical Spa, Mental Health,
  Chiropractic, Optometry and Veterinary, pending per-specialty case data. The
  four case images are all dental, so they are mismatched on non-dental pages.
- **3 product pages** (83110, 87836, 87838) still use the old badge-above-laptop
  hero order.
- **AI Optimization** founder photo was not included in the blue-orange swap.
- **"What's Included" price tables** still list Twitter and Pinterest.
- **Marketing hub (18386)** still uses `testimonial-mansouri.png` in the slot the
  other pages now use for a specialty screenshot, and its "Other Specialties"
  child menu item points at the hub itself.
- **13 unrelated pages** have Rank Math descriptions over 160 characters
  (pre-existing).
- **Migration prep** not started: specialty pages → JSON, portfolio dataset, and
  pruning redirects under Netlify's ~1,000-rule ceiling.
