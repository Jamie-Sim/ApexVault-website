# ApexVault — Project Context

## What This Project Is
ApexVault is the website for a private members' car club based in Glasgow, Scotland. The site is a single `index.html` file served at `http://localhost:3000` via `node serve.mjs`.

## Business Model
- **Private, invite-only membership** — no open sign-ups. Prospective members join a waitlist.
- **Small by design** — quality over scale. No specific member target is stated publicly.
- **No entry criteria based on car value or marque.** The only requirement is that you actually drive your car.
- **Activities:** Organised road runs on good Scottish roads, casual meets, a members group chat.
- **Revenue model is not yet defined publicly** — the site's only CTA is the waitlist form.
- **Tone:** Unpretentious, confident, no-fluff. Speaks to drivers, not collectors or posers.

## Site Structure
The site is a single long-scroll page with the following sections (in order):
1. **Vault intro overlay** — combination lock dial animation; click to enter, vault doors slide apart
2. **Nav** — sticky top bar, links only (no logo in nav), centre-aligned
3. **Hero** — large "APEX VAULT" in Bokor, sub-heading in Cormorant, CTA to waitlist
4. **About** — "Built by drivers, for drivers." Two-column text + stats
5. **Member Cars** — three-card grid: Ford Focus RS, BMW Z3, VW Golf R32
6. **What We Do** — numbered list of club activities/philosophy
7. **Philosophy** — full-width pull-quote section
8. **Waitlist** — email sign-up form with name + email fields
9. **Footer** — "APEX VAULT" in Bokor (white), nav links, Glasgow © 2025

## Brand Identity

### Name & Wordmark
- **Brand name:** Apex Vault
- **Display treatment:** `APEX VAULT` in Bokor, uppercase, white — used as the hero title and footer wordmark
- **No separate logo image is used on the live site** (`ApexVaultLogo.png` exists in BrandAssets but is not currently placed)

### Colour Palette (exact CSS variables)
```
--bg:           #080809       /* near-black page background */
--bg-card:      #0e0e10       /* card surfaces */
--bg-raised:    #0b0b0d       /* slightly raised surfaces */
--border:       rgba(255,255,255,0.07)
--border-hi:    rgba(255,255,255,0.14)
--text:         #f0f0f2       /* primary text */
--text-sub:     #9a9ba8       /* secondary text */
--text-muted:   #4a4a56       /* muted/disabled text */
--silver:       #c8cdd8       /* steel/chrome accent */
--silver-bright:#e8eaf0
--silver-dim:   rgba(200,205,216,0.12)
```
Do not deviate from this palette. **There is no gold or warm accent colour** — the palette is strictly near-black, silver, and white. Do not introduce warm tones.

### Typography
```
--display: 'Bokor', Georgia, serif          /* hero title, footer wordmark only */
--serif:   'Cormorant', Georgia, serif      /* headings, subheadings, pull quotes */
--sans:    'DM Sans', system-ui, sans-serif /* body copy, nav, labels, UI */
```
- Bokor: single weight, uppercase only, large sizes
- Cormorant: weights 300–600, italic used expressively on key words
- DM Sans: weights 300–500, high letter-spacing for labels/eyebrows

### Visual Style
- **Dark, minimal luxury** — near-black backgrounds, silver/steel tones, restrained gold
- **Depth via layered radial gradient "orbs"** — soft glowing blobs behind content, not flat colour
- **Grain texture overlay** — SVG fractalNoise at low opacity across the entire page
- **No hard shadows** — all depth comes from gradient layers and subtle glows
- **Animations:** `transform` and `opacity` only, spring-style easing, nothing jarring

## Key Files
```
index.html              — entire site (HTML + CSS + JS inline)
serve.mjs               — dev server on port 3000 (URL-decodes paths for spaced filenames)
screenshot.mjs          — Puppeteer viewport screenshot → temporary screenshots/
screenshot-viewport.mjs — viewport-only variant
screenshot-section.mjs  — element-targeted screenshot by CSS selector
BrandAssets/
  FocusRS_Image.avif    — Ford Focus RS (car card 01)
  BMW Z3.webp           — BMW Z3 (car card 02, object-fit: contain)
  GOLF R32.jpg          — VW Golf R32 (car card 03)
  ApexVaultLogo.png     — logo asset (not currently placed in site)
```

## Frontend Workflow
When making any changes to the site, follow the rules in @.claude/skills/frontend-website/SKILL.md
