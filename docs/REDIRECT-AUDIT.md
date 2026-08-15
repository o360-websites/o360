# o360.com — Redirect Audit

Audit only. **No redirects were changed.** Run 2026-08-14 against
`wp_rank_math_redirections`.

---

## 0. Two live bugs, found during the audit

### 0.1 A published page is unreachable

`/products/patient-education-videos/` (page **87836**) currently **301s to
`/blogs/`**. Verified live.

Cause: rule **1806** is a `contains` match on the string `education` → `/blogs/`.
It matches any URL containing that substring anywhere, including this page's own
slug. The page is also the destination of **12 other redirect rules carrying
10,403 hits**, so that traffic is being funnelled into a page that immediately
bounces elsewhere.

### 0.2 `/.well-known/` is being redirected to the homepage

Rule **1794** is a set of `contains` matches — `.txt`, `.htm`, `.html`, `.well`,
`.asp`, `.aspx`, `.tgz`, `.jira` → homepage (31,519 hits).

`.well` catches the entire `/.well-known/` namespace. Verified live:

| Request | Result |
|---|---|
| `/.well-known/security.txt` | 301 → `/` |
| `/.well-known/apple-app-site-association` | 301 → `/` |
| `/ads.txt` | 301 → `/` |
| `/some-page.html` | 301 → `/` |

`/.well-known/acme-challenge/` is how Let's Encrypt and other ACME issuers
validate a domain over HTTP. It is also used for domain verification by several
platforms. This rule is an operational risk, not just an SEO one.

`.html` as a `contains` match will also catch any future URL containing that
string anywhere in the path or query.

---

## 1. Scale

| Metric | Count |
|---|---|
| Rules | **1,943** |
| — active | 1,835 |
| — inactive | 5 |
| — trashed (still stored) | 103 |
| Raw source patterns | 2,585 |
| **Unique source patterns** | **2,397** |
| Distinct active destinations | 194 |
| Lifetime hits (active) | 2,226,032 |

Header codes: 301 ×1,935 · 302 ×1 · 410 ×7.
Comparison types: exact ×2,544 · contains ×16 · regex ×22 · start ×3.

**Netlify note:** the migration target has a practical ceiling around 1,000
redirect rules. At 2,397 unique patterns this needs roughly a **60% reduction**
before it can move as-is.

**Read hits with care:** the `hits` column is cumulative since each rule was
created (mostly 2020–2023). A rule showing 250 hits is averaging ~50/year. Hit
counts are also heavily bot-inflated — see §2.

---

## 2. Traffic is dominated by bots, not people

| Family | Patterns | Lifetime hits | Note |
|---|---|---|---|
| `bot:author-enum` | 21 | **1,662,682** | `?author=N` scanning — **75% of all redirect traffic** |
| `bot:probe` | 7 | 25,584 | rule 1794, the `.txt`/`.well` catch-all |
| `bot:staging-probe` | 14 | 21,046 | `/main`, `/new`, `/old`, `/test`, `/backup`, `/wordpress` … |
| `bot:feed` | 13 | 280 | `*/feed` |

Author enumeration alone accounts for 1.66M of 2.23M hits. Any decision made on
"traffic" needs these excluded first, or the numbers will mislead.

---

## 3. Findings by category

### A. FIX NOW — live breakage

| Rule | Problem | Action |
|---|---|---|
| 1806 | `contains: education` breaks `/products/patient-education-videos/` | Narrow to an exact match, or delete |
| 1794 | `contains: .well` breaks `/.well-known/*`; `.html` over-matches | Remove `.well`; scope the rest, or replace with a 410 |

### B. REMOVE

| Group | Rules | Patterns | Rationale |
|---|---|---|---|
| Trashed rules still in the table | 103 | 108 | Already discarded; they only bloat the export |
| Active rules with **0 hits** | 127 | 128 | Created 2020–2023, never once used |
| Active rules unused for **>1 year** | 97 | 103 | 3,545 lifetime hits between them |
| True self-loop | 1 | 1 | Rule **1808**, `/gallery/` → `/gallery/` (already trashed) |

Combined: roughly **330 rules / 340 patterns** removable with no traffic impact.

### C. CONSOLIDATE / MERGE

**C1 — duplicate patterns inside a single rule: 144 duplicates across 19 rules.**

| Rule | Duplicates | Unique kept | Note |
|---|---|---|---|
| 1579 | 46 | 13 | `portfolio/feed` repeated ~45 times |
| 1280 | 42 | 20 | `?author=N` values repeated 3–4× each |
| 1599 | 28 | 16 | |
| 1600 | 7 | 3 | |
| 1748 | 5 | 4 | |

**C2 — rule 1280 collapses to one pattern.** It holds 62 `?author=` patterns
*and* a `contains: ?author=` catch-all. The catch-all alone covers every one of
them. → 62 patterns become 1.

**C3 — cross-rule duplicate patterns: 42, of which 15 are conflicting** (same
source, different destinations — which one wins is arbitrary):

| Pattern | Rules | Competing destinations |
|---|---|---|
| `/gallery/` | 861, 1784, 1808, 1809 | `/portfolio/`, `/gallery/`, `/project-category/medical/` |
| `/dental/` | 1444, 1685 | `/website/dental/` *(note: typo, singular)*, `/web-design/` |
| `/new/`, `/test/` | 1279, 1666, 1667 | `/`, `/portfolio/` |
| `/blogs/social-marketing-for-the-medical-profession/` | 1301, 1306 | two different blog posts |
| `/blogs/how-to-implement-good-on-site-seo/` | 1389, 1599 | a blog post, `/marketing/` |
| `/portfolio/aliso-viejo-endodontics/` | 1573, 1578 | `/websites/endodontic/`, `/portfolio/` |

**C4 — portfolio → specialty pages: 623 active rules.** Nearly all follow one
shape: `portfolio/<practice-name>` → `/websites/<specialty>/`. There are already
14 regex rules doing exactly this for paginated archives (`^project-category/
dental/page/[0-9]+/?$` → `/websites/dental/`). The same approach could replace
several hundred individual rules — but only where the practice-name → specialty
mapping is derivable, which it generally is not from the slug alone. **Realistic
consolidation here needs a decision from §D/F first.**

### D. FLATTEN CHAINS

**149 active → active chains.** A visitor is 301'd twice. Google passes these but
counts them against crawl budget, and Netlify will not chain at all by default.

The nine destinations that are themselves redirect sources:

| Destination | Then goes to | Rules pointing at it | Hits |
|---|---|---|---|
| `/blogs/25-dental-marketing-ideas-and-strategies/` | `/marketing/` | **100** | 30,976 |
| `/blogs/custom-dental-website-design-guide/` | `/web-design/` | 37 | 12,651 |
| `/blogs/6-reasons-a-dental-website-template-is-not-the-right-choice/` | `/websites/dental/` | 4 | 2,807 |
| `/blogs/10-things-a-great-dental-web-design-company-should-have/` | `/websites/dental/` | 2 | 2,698 |
| `/blogs/top-10-medical-websites-for-doctors/` | `/websites/medical/` | 2 | 1,452 |
| `/blogs/most-visited-healthcare-websites-design-critique/` | `/websites/medical/` | 1 | 1,301 |
| `/blogs/the-7-best-holistic-medicine-websites-of-2024/` | `/websites/holistic-medicine/` | 1 | 122 |
| `/blogs/top-powerful-7-funeral-home-websites-of-2025/` | `/websites/funeral-home/` | 1 | 108 |
| `/best-designs/7-best-chiropractic-websites-of-year/` | `/websites/chiropractic/` | 1 | 65 |

**Fix:** repoint the 149 source rules at the terminal destination. Mechanical and
safe — no judgement needed.

### E. RECREATE PAGE, or RETARGET

**76 distinct destinations no longer exist.** Every rule pointing at them sends a
visitor through a 301 and onto a 404 — worse than a plain 404, because the
original URL's signal is thrown away too. **61,049 lifetime hits.**

Highest-traffic dead destinations:

| Destination | Rules | Hits |
|---|---|---|
| `/blogs/how-to-use-social-media-to-drive-patient-growth/` | 8 | 7,753 |
| `/blogs/ultimate-guide-to-medical-reputation-review-management/` | 8 | 5,695 |
| `/blogs/selecting-colors-for-your-medical-or-dental-website/` | 10 | 5,590 |
| `/blogs/7-ways-to-grow-your-chiropractic-practice/` | 6 | 5,515 |
| `/project-color/black/` | 7 | 2,812 |
| `/blogs/images-for-medical-and-dental-websites/` | 5 | 2,661 |
| `/designs/7-best-chiropractic-websites-of-year/` | 1 | 2,619 |
| `/blogs/hipaa-email-compliance-what-you-need-to-know/` | 10 | 2,481 |
| `/blogs/want-to-know-how-to-write-a-good-medical-blog/` | 6 | 2,065 |
| `/blogs/7-best-podiatry-websites-designed-in-2021/` | 2 | 1,982 |
| `/project-style/feminine/` | 6 | 1,880 |
| `/blogs/content-marketing-for-dentists/` | 1 | 1,678 |

Two sub-groups, needing different decisions:

- **Deleted blog posts** (most of the list). Either **recreate the article** —
  several look like genuine ranking content — or **retarget** the rules at the
  nearest surviving page.
- **Old portfolio taxonomy archives** — `/project-color/*`, `/project-style/*`,
  `/project-feature/*`. These were filter archives from the retired portfolio
  system. They should almost certainly be **retargeted to `/portfolio/`** or
  dropped, not recreated.

### F. LEAVE TO 404 — portfolio

**623 active portfolio rules, 176,957 lifetime hits.** Distribution:

| Lifetime hits | Rules |
|---|---|
| 0 | 7 |
| 1–9 | 50 |
| 10–49 | 58 |
| 50–199 | 104 |
| 200+ | **404** |

At first glance 404 rules clear "200+". But these accumulated over roughly five
years, so 200 lifetime hits is about **40 visits a year** — and an unknown share
of that is bot traffic. Setting the bar by annualised human traffic rather than
lifetime hits would drop the keep-list dramatically.

**Recommendation:** pick a threshold together before acting. A cut at ~200
lifetime hits keeps 404 rules; a cut at ~1,000 keeps roughly a dozen.

### G. KEEP

- The specialty consolidations that work and are used: `dentist-websites` →
  `/websites/dental/` (6,458), `physician-websites` → `/websites/medical/`,
  `optometrist-websites` → `/websites/optometry/`.
- Short vanity paths: `/seo`, `/contact`, `/blog`, `/gallery`, `/features`,
  `/landing`, `/pricing`, `/schedule`.
- The 14 `project-category/*/page/N` regex rules — these already do the
  consolidation work correctly.
- The 7 rules already returning **410 Gone**, which is the right code for content
  that is intentionally never coming back.

---

## 4. Suggested order of work

1. **Fix the two live bugs** (§0) — one breaks a published page, one risks
   certificate renewal.
2. **Delete** trashed + zero-hit + >1yr-unused rules (§B) — ~330 rules, no
   traffic impact.
3. **De-duplicate** within rules and resolve the 15 conflicting patterns (§C1–C3).
4. **Flatten** the 149 chains onto their terminal destinations (§D).
5. **Decide** on the 76 dead destinations (§E) — recreate vs retarget, article by
   article for the blog ones.
6. **Decide** the portfolio threshold (§F) — the single biggest lever on the
   2,397 → under-1,000 target.

Steps 1–4 are mechanical and reversible. Steps 5–6 need the owner's judgement.

## 5. Method

Analysis ran against the `sources` / `url_to` columns with URLs normalised
(scheme, host, trailing slash, case). Destinations were classified in-database as
*live page* / *redirect source* / *dead end*, then spot-checked over HTTP.

One correction worth recording: an initial pass stripped query strings during
normalisation, which turned every `?author=N` pattern into `/` and produced 60
phantom self-loops and 2,420 phantom chains. After fixing normalisation the true
figures are **1 self-loop** and **149 active-to-active chains**. Any future audit
should preserve query strings.
