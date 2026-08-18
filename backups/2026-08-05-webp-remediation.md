# WebP quality remediation — 2026-08-05

Context: the (now-deleted) Elementor **Image Optimization** plugin had
destructively converted media to lossy WebP (lossy compression, 2560px resize
cap). Cloudflare Polish already delivers WebP non-destructively at the edge, so
the local WebP copies were removed in favor of full-quality PNG/JPG originals
wherever they could be recovered.

## Recovery so far

- **588** images — Phase 1: restored from same-name PNG/JPG siblings on disk.
- **128** images — Phase 2: restored from perceptual-hash duplicate twins
  (63 exact + 53 near ≤2 + 12 near 3–6). Kept the **largest** copy per the
  keep-highest-resolution rule.
- For every restored image the WebP file was moved to
  `uploads/o360-webp-backup/`, the attachment repointed to the PNG/JPG, and all
  `_elementor_data` / `post_content` references repaired to the real file on
  disk (filesystem-truth repair). Elementor + WP Rocket caches cleared,
  `rocket_clean_domain()` called. Verified **0 broken references** introduced.

## Remaining 59 WebP-only images (no recoverable original on disk)

Classified per the rule: *plain backgrounds/icons stay WebP; anything with text
or photos/images → replace with the original.*

### STAY as WebP — 7 (tagged into media folder "WebP OK - Backgrounds & Icons", term 2828)

| ID | File | Note |
|----|------|------|
| 26771 | 2019/07/blue-background.webp | plain blue shape |
| 85488 | 2019/07/pattern-blue-diamond-2.webp | 35×35 pattern tile |
| 86524 | 2019/07/Footer-Background-3.webp | solid color texture |
| 86843 | 2026/07/endodontic-hero-background-blue.webp | gradient hero bg |
| 85571 | 2024/08/clouds_mobile.webp | decorative cloud bg *(photographic — confirm)* |
| 86496 | 2026/03/clouds_mobile_O360.webp | decorative cloud bg *(photographic — confirm)* |
| 86497 | 2026/03/bg-clouds-top-3.webp | decorative cloud bg *(photographic — confirm)* |

### REPLACE with originals — 52 (source from Canva / re-upload)

Full machine-readable list: `2026-08-05-webp-replace-list.json`
(fields: id, f = uploads-relative path, g = group). Visual contact sheet was
provided to the user in chat.

Groups: 23 laptop mockups (`…-website-design-laptop`), 12 client website
screenshots, 5 mobile collages, 6 logos, 2 badges, 2 illustrations (Asset-23/24),
2 stock/team photos.

## Backups / restore

- Folder assignments for all 59 (before tagging): server file
  `uploads/o360-alt-audit/webp_folder_backup_2026-08-05.json`.
- Per-attachment revert data (old `_wp_attached_file`, old metadata, moved WebP):
  server file in `uploads/o360-alt-audit/` (webp_restore data) + moved WebP files
  in `uploads/o360-webp-backup/`.
- To roll back a restore: copy the WebP back from `o360-webp-backup/`, restore the
  attachment's `_wp_attached_file` + metadata, and re-run the reference repair.
- To roll back the folder tagging: remove term 2828 from the 7 STAY IDs (their
  prior folders are preserved — tag was appended, nothing removed).
