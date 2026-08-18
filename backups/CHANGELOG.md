# o360.com Change Log

## 2026-08-05 — Library dedup, phase 3b (perceptual / same-image different-size)

Found visually-identical images uploaded at different sizes/formats/names via
perceptual hashing (dHash), each group visually reviewed + confirmed with a
strict 32×32 comparison before acting. Kept the **largest** copy per group
(preferring PNG/JPG over WebP), repointed references, deleted the rest.

- **48 groups → 58 redundant copies deleted** (kept largest each).
- 8 look-alike groups were **excluded** as NOT true duplicates:
  - different-colored stripe backgrounds (specialty hero bg, 7 colors) — dHash
    is near-colorblind and collided them;
  - 3-tablet specialty mockups (dentistry/endo/oral-surgery/telemedicine) —
    templated look-alikes;
  - two-phone mockups showing different client sites;
  - deliberately color-graded photo variants (blue / blue-orange);
  - Asset-6 vs Asset-7 (sequential exports).
- **Impact on the WebP replace list:** dropped 6 items (52 → 46):
  - `Asset-24` was a duplicate of `Asset-23` (kept Asset-23).
  - 5 `mobile-collage-optimized*.webp` had a PNG original in the library
    (`mobile-collage.png`, kept) — no Canva re-upload needed for those.
  - One redundant cloud background (`clouds_mobile.webp`) removed; the used
    `clouds_mobile_O360.webp` kept.
- Net broken references unchanged at **578** (no new breakage). Keepers'
  thumbnails regenerated. Attachments: 2,857 → 2,799.
- **Backups (server, restorable):** deleted rows+files in
  `uploads/o360-alt-audit/phash_deleted_backup.json` +
  `uploads/o360-deleted-dupes/`; repoint originals in
  `phash_repoint_backup.json`; plan + hashes in `phash_dedup_plan.json`,
  `phash2.json`, `phash_groups.json`.

## 2026-08-05 — Library dedup, phase 3a (exact / byte-identical)

Removed byte-identical duplicate images (same file re-uploaded under different
names — WordPress never replaces on re-upload). Kept one copy per group
(the most-referenced; all copies are byte-identical so resolution is equal).

- **118 duplicate groups → 172 redundant copies deleted.**
  - 99 were already referenced nowhere.
  - 73 were referenced; references repointed to the kept copy first
    (39 Elementor docs + 27 post_content + 16 featured images + 6 ACF image
    fields), then verified unreferenced and deleted.
- Kept copies' thumbnails regenerated; introduced-broken size refs repointed to
  the kept full-size. Net broken references: **581 → 578** (no new breakage; 3
  pre-existing dead refs incidentally repaired). The remaining 578 are
  pre-existing dangling refs (old portfolio screenshots / deleted size variants),
  unrelated to this work.
- Attachments: 2,919 image attachments → 2,857 total after cleanup.
- **Backups (all on server, restorable):**
  - Deleted attachments (post row + all postmeta + full-size file copied aside):
    `uploads/o360-alt-audit/dedup_deleted_backup.json` +
    `uploads/o360-deleted-dupes/{id}__{filename}`.
  - Repoint originals (changed Elementor/content rows, thumbnails, ACF):
    `uploads/o360-alt-audit/dedup_repoint_backup.json`.
  - Broken-fix originals: `uploads/o360-alt-audit/dedup_brokenfix_backup.json`.
  - Full md5 inventory + dedup plan: `uploads/o360-alt-audit/md5_inventory.json`,
    `dedup_md5_plan.json`, `dedup_ref_detail.json`.

## 2026-08-05 — WebP quality remediation (restore originals + classify remainder)

Deleted Elementor Image Optimization plugin had destructively converted media to
lossy WebP. Cloudflare Polish handles WebP delivery non-destructively, so local
WebP copies were replaced with full-quality PNG/JPG originals where recoverable.

- **716 images restored** to PNG/JPG (588 same-name siblings + 128 dedup twins,
  keeping the largest copy). WebP moved to `uploads/o360-webp-backup/`,
  attachments repointed, Elementor/`post_content` references repaired to real
  files on disk, caches cleared. Verified 0 broken references introduced.
- Remaining **59 WebP-only** images classified: **7 stay WebP** (plain
  backgrounds/patterns/gradients — tagged into media folder
  "WebP OK - Backgrounds & Icons", term 2828); **52 to replace** with originals
  (laptop mockups, client screenshots, logos, badges, illustrations).
- Also deactivated + deleted the Elementor Image Optimization plugin (per user);
  plugin state snapshot at `uploads/o360-backups/plugin_state_backup_2026-08-05.json`.
- Details + restore instructions: `backups/2026-08-05-webp-remediation.md`.
- Replace list: `backups/2026-08-05-webp-replace-list.json`.
- Folder-assignment backup (all 59, pre-tagging):
  `uploads/o360-alt-audit/webp_folder_backup_2026-08-05.json` (on server).

## 2026-08-05 — compat_image mockups on 46 specialty pages

Set the `compat_image` ACF field ("Compatible with X software" hero) on all 46 website specialty pages to newly generated LV-brand mockups (attachment IDs 87268–87313). Old attachments were left in the media library.

- Pages changed: 46 (all previous values were empty except 3).
- dental-lab (page 86715): compat_image 41621 → 87269
- endodontic (page 86716): compat_image 41647 → 87270
- pediatric-dentistry (page 86704): compat_image 41616 → 87273
- Restore: set each page's `compat_image` back to `previous_value` in backups/2026-08-05-compat_image-batch.json (empty/false where noted).
- Full old→new map: backups/2026-08-05-compat_image-batch.json

