# Backup — Rank Math settings change (2026-07-31)

## Change: Redirections Fallback Behavior
- Option: `rank-math-options-general` → key `redirections_fallback`
- **OLD value:** `homepage`  (all 404s were 301-redirected to the homepage)
- **NEW value:** `default`   (404s now return a proper 404 page)
- Reason: Elementor library template URLs (and other dead URLs) were being
  soft-redirected to the homepage. `default` restores correct 404 behavior and
  lets the 404 Monitor log missing pages.

## 404 Monitor
- Already ENABLED before this change: module `404-monitor` active,
  `404_monitor_mode = advanced`, `404_monitor_limit = 10000`,
  `404_monitor_ignore_query_parameters = on`. Left as-is.

## Restore
Set `redirections_fallback` back to `homepage`:
`$g=get_option('rank-math-options-general'); $g['redirections_fallback']='homepage'; update_option('rank-math-options-general',$g);`
