# Backups changelog

## 2026-08-14 — Home page (ID 10545)

- **What:** Snapshot of the live homepage before any replica/rebuild work.
- **Old value:** WordPress page `10545` (`home`, published, last modified 2026-08-07 09:27:42), Elementor builder document (~140KB `_elementor_data`, 13 top-level containers).
- **New value:** No live change. Files stored under `backups/2026-08-14-home-10545/`.
- **How to restore:**
  1. Keep page 10545 as the front page (`page_on_front`).
  2. Write `elementor_data.json` back to post meta `_elementor_data` (JSON string) and restore fields from `page-meta.json` (`_elementor_edit_mode`, `_elementor_template_type`, `_elementor_version`, `_elementor_page_settings`, template `elementor_header_footer`).
  3. Regenerate Elementor CSS for that post (Elementor → Tools → Regenerate CSS, or open the page in the editor and save).

## 2026-08-14 — Home rebuild draft created (ID 87914)

- **What:** Exact Elementor JSON clone of page 10545 into a new page. Live Home was not replaced (`page_on_front` remains 10545).
- **Old value:** Page 87914 did not exist.
- **New value:** Draft page `home-rebuild-draft` (ID 87914), template `elementor_header_footer`, Rank Math robots `noindex,nofollow`. Document JSON equals 10545.
- **How to restore:** Delete page 87914, or leave it as draft. Do not set it as the front page unless replacing Home on purpose.
