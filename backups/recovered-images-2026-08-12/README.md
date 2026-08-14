# Recovered staff/review photos — 2026-08-12

These files were deleted from the WordPress media library AND from the origin
disk. They were pulled back out of Cloudflare's edge cache before those cache
entries expire. Original paths (restore to these exact locations):

| File | Original path | Bytes |
|---|---|---|
| sanderscoley.png | wp-content/uploads/2024/11/sanderscoley.png | 175,655 |
| nelsonleach.png | wp-content/uploads/2024/11/nelsonleach.png | 255,417 |
| kameronjackson.png | wp-content/uploads/2024/11/kameronjackson.png | 30,353 |

## NOT recovered — gone from origin, edge cache, and the Wayback Machine

- 2024/11/aliciamacgowan.png  (alt: "Alicia MacGowan")
- 2024/11/jessewelsh.png      (alt: "Dr. Jesse Welsh - Dentist")
- 2024/12/maryphilp.png       (alt: "Mary Philp")
- 2024/12/Elizabeth-Ciesielski.png
- 2024/12/fivers.jpg          (alt: "Dr Franklin Ivers")

These are Google-review avatar photos of real people, each wrapped in a link to
that person's Google review (g.co/kgs/...). They cannot be substituted with
stock imagery. They need to be re-sourced from the original files or
re-captured from the Google review pages.

## Where they render

- Page 12599 "About Us"
- Template 86918 "Landing for Websites" — live on all 46 /websites/<specialty>/ pages

## Why the site still looks fine in places

The origin returns HTTP 200 with a 146-byte text/html body for these paths (a
soft 404), so monitoring that only checks status codes will not catch it.
Cloudflare still holds real copies of some, with Age up to ~220,000s (~2.5
days). Those render today and break when the entry ages out. fivers.jpg was
already serving the empty body at the time of this audit.
