# o360.com Change Log

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

