# o360.com Change Log

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

