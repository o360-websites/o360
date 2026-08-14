---
name: "O360 Clinical Precision"
description: "Captured from the live o360.com homepage and Elementor kit: Mark Pro display, Avenir body, navy grounds, orange CTAs, sky-blue accents. Exact replica of the current site — not a restyle."
colors:
  bg: "#EFF5FC"
  surface: "#FFFFFF"
  ink: "#555555"
  accent: "#E35D11"
  primary: "#00418D"
  secondary: "#0392DB"
  dark_blue_0: "#041C5E"
  dark_blue_2: "#002E5B"
  dark_blue_3: "#003A74"
  white: "#FFFFFF"
  light_1: "#DAE9FB"
  light_2: "#EFF5FC"
  orange_hover: "#CF520B"
  blue_hover: "#0082C4"
typography:
  heading:
    fontFamily: "Mark Pro, sans-serif"
    fontWeight: "700"
  body:
    fontFamily: "Avenir, sans-serif"
    fontWeight: "400"
spacing:
  sm: "8px"
  md: "16px"
  lg: "32px"
rounded:
  sm: "0px"
  md: "0px"
components:
  buttons: "Solid navy or orange from custom globals, existing radius/padding from the live homepage, no new shadows"
  cards: "Use only where the live homepage already uses a card or flip-box"
dials:
  variance: 0.35
  density: 0.55
  motion: 0.35
---

# O360 Clinical Precision

Captured from the live o360.com homepage (page ID 10545) and the active Elementor kit (ID 79953). This direction exists so rebuilds **match** the current site. Do not invent a new look.

## Overview

O360® is a healthcare website and marketing brand (dental and medical practices, since 2003). The live homepage is a dark-navy / light-blue marketing page: large Mark Pro headlines, Avenir UI and body, orange primary CTAs, sky-blue secondary actions, logo wall, stats, specialty lists, and a case-study carousel.

## Colors

Use **only** existing Elementor **custom** global colors (never system tag defaults as the source of truth, never a one-off hex on a widget).

- Ground: Light 2 `#EFF5FC` and Dark Blue 0/2 on dark bands
- Ink: Black 5 `#555555` on light bands; White `#FFFFFF` on dark bands
- Accent: Orange `#E35D11` (kit accent / Orange 3)
- Support: Dark Blue `#00418D` (kit primary), Blue `#0392DB` (kit secondary), Blue 2 `#28ACFF`

Orange and navy are the live brand, not a generic warm-craft palette.

## Typography

Custom font files already registered in Elementor Custom Fonts, sourced from the Media Library:

- **Mark Pro** (CPT 31262): weights 700 and 900 — display / section titles / stats
- **Avenir** (CPT 31247): weights 300, 400, 700 — body, pretitles, buttons, lists

Bind every text widget to an existing **custom** global typography by name (Page Title, Section Title, Widget Title, Button 1, Stat Number, etc.). Do not set font family/size on the widget. Geomanist files exist in the library but are **not** used on the live homepage; do not introduce them on a replica.

## Layout

13 stacked Elementor containers, max width 1400px. Hero is a single headline plus two CTAs, then a logo wall and four icon-boxes. Keep the live section order and families. Mobile collapse must match the current breakpoints.

## Elevation & Depth

Flip-boxes and the nested carousel already exist. Do not add new drop shadows or cards.

## Shapes

Mostly sharp / existing radii. Do not mix in a new radius scale.

## Components

Buttons, icon lists, ratings, flip-boxes, nested carousel templates — copy from the live document. Hover colors already in custom globals (Orange Hover, Blue Hover).

## Do's and Don'ts

**Do**

- Treat the live homepage Elementor document as the pixel source of truth.
- Use only custom global colors and custom global typography.
- Use Mark Pro and Avenir as already registered from the Media Library.
- Keep hover, overlay, opacity, and spacing from the live widgets.

**Don't**

- Don't restyle, "improve," or modernize layout, copy, or motion.
- Don't add new global colors or typography.
- Don't switch to Geomanist, Inter, Google Fonts, or any face not already on the live page.
- Don't inject scripts or animation libraries into Elementor.
- Don't replace the published Home page until the replica draft is approved.
