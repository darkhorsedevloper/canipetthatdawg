---
name: project-context
description: Load full project context for Can I Pet That Dawg website — stack, CSS vars, Notion CMS databases, component map, known issues, and design decisions
---

# Can I Pet That Dawg — Project Context

**Owner:** Crickett Sykes · Can I Pet That Dawg LLC · Atlanta, GA
**Repo:** github.com/darkhorsedevloper/canipetthatdawg
**Local path:** /Users/cs/canipetthatdawg
**Live site:** canipetthatdawg.co
**Deploy:** GitHub Actions → GitHub Pages

## Stack

- React + Vite
- Notion as headless CMS (scripts/fetch-notion.js runs at build time, writes JSON to src/data/)

## Font Stack

| Use | Font |
|-----|------|
| Headings / UI | IBM Plex Mono (400, 600, 700) |
| Body / general | Space Mono (var(--serif) and var(--sans)) |

Loaded via Google Fonts in index.html. **No italic anywhere** — all `fontStyle: italic` stripped site-wide.

## CSS Variables (index.css)

### Light mode (:root)
```
--bg: #F4EFE6        --card: #EBE5D8      --panel: #EDE8DC
--charcoal: #2A2520  --hero-bg: #1E1A15   --orange: #C4892A
--green: #4A7C5E     --blue: #3A6B8A
--border: rgba(42,37,32,0.1)   --border-bold: rgba(42,37,32,0.22)
```

### Dark mode ([data-mode="dark"])
```
--bg: #1A1613        --card: #221D19      --hero-bg: #100D0B
--charcoal: #EDE5D2  --orange: #E8A547    --green: #6DA888
--border: rgba(237,229,210,0.08)   --border-bold: rgba(237,229,210,0.18)
```

Dark mode applied via `document.documentElement.setAttribute('data-mode', 'dark')` in `src/hooks/useDarkMode.js`. Persists to `localStorage` key `cipd_dark`. Color transitions are 700ms.

## Notion CMS Databases

All fetched by `scripts/fetch-notion.js`, output to `src/data/`.

| Database | Notion ID | Output file | What it controls |
|----------|-----------|-------------|------------------|
| Site Pages | abc92211... | pages.json | Nav pages |
| Hero | 3f7da644... | hero.json | Eyebrow, headline, subheadline, buttons, quote |
| Trust Bar | f18f662a... | trustbar.json | Scrolling trust signals |
| Services | 75ccdef9... | services.json | Service cards (⚠️ component still hardcoded) |
| Why Section | 4dbc819c... | why.json | Value prop bullets |
| About | bcf60bb7... | about.json | Bio, tags |
| Testimonials | 85196d1a... | reviews.json | ReviewTicker quotes |
| Blog Posts | 4f17fabc... | blog.json | Field Notes (not currently used) |
| Dawg of the Day | d9d8fcee... | dawg.json | Featured dogs, weekly notes |
| CTA Actions | 5961c28c... | cta.json | (no longer used — CTA hardcoded) |
| CTA Content | 07bd76ca... | cta-content.json | (no longer used — CTA hardcoded) |
| Reading List | 7df9bc62... | books.json | CredsBento book list |
| Podcasts | b881ace1... | podcasts.json | CredsBento podcasts |

**To update content:** Edit in Notion → merge to main (or trigger redeploy) → fetch-notion.js runs at build time and overwrites JSON files.

**Multi-line text in Notion:** Use ` | ` (space-pipe-space) as a line break delimiter in Notion rich text fields. The fetch script converts these to `\n` via `.replace(/ \| /g, '\n')`. Components should use `whiteSpace: 'pre-line'` to render the breaks.

**Important:** Always join ALL rich_text runs, not just `[0]`. The fetch script uses `.map(t => t.plain_text).join('')` — Notion sometimes splits a single field into multiple text spans.

**Podcasts DB:** Connected. Fetch pulls Pet Sitter Confessional (petsitterconfessional.com) with initials "PSC".

## Component Map (src/components/)

**Current page order:** Nav → Hero → TrustBar → PhotoStrips → Services → CTA → EveryVisit → Why → About → CredsBento → FieldNotes → ReviewTicker → DawgOfTheDay → ContactTerminal → Footer

| Component | Data source | Notes |
|-----------|-------------|-------|
| Nav.jsx | Hardcoded | Brand: "Can I Pet That **Dawg?**" (orange on "Dawg?"); dark mode toggle (ModeSwitch pill), hamburger menu |
| Hero.jsx | hero.json | Cycling typewriter on eyebrow — types each phrase individually to avoid mobile wrapping bounce. Subheadline uses `whiteSpace: pre-line`; "Fear Free" links to fearfreehappyhomes.com |
| TrustBar.jsx | trustbar.json | Always-scrolling ticker |
| PhotoStrips.jsx | Static assets | PP Kira Cute Down.JPEG, PP Kira Cute Summer.JPEG, PP Kira Cute.JPEG; scroll-snap carousel on mobile (`.photo-carousel`), 3-col grid on desktop (`.photo-strips-grid`); `paddingBottom: 100%` + `position: absolute; inset: 0` for reliable aspect ratio |
| Services.jsx | Hardcoded | Flip cards — front: service name + badge + "Tap to learn more →", back: description + price + Book This button. 3D CSS transform with `preserve-3d`. BOOK_URL = timetopet.com/portal/create/create-account |
| CTA.jsx | Hardcoded | "Getting started is simple." — 4 solid-color step cards in a 2×2 grid (`.cta-steps-grid`). Steps: 01 Create account (orange #C4892A), 02 Meet & greet (green #4A7C5E), 03 Choose service (blue #3A6B8A), 04 Follow along (cream #EDE5D2). All cards are `<a>` links. Card 01 hides its number label (empty string) but reserves the space via `minHeight: 14px` on the number span. |
| EveryVisit.jsx | Hardcoded | Two feature cards: GPS Tracking (green) and Report Card (orange). References Time To Pet. |
| Why.jsx | why.json | All 4 items hidden behind "View more" toggle. `useState(false)` + `{open && (...)}` conditional render. Button shows `+`/`−` and "View more"/"View less". |
| About.jsx | about.json | MiniMap + bio; top bar: "Service Area" left + "Within a 10 mile radius of 30318" right (`.service-area-label` — hidden on mobile) |
| CredsBento.jsx | books.json + podcasts.json | Fear Free seal SVG, PSI/PSA stacked card, Time To Pet card (all dark cards). `.bento-bottom` CSS class for responsive grid (1-col mobile, 2fr/1fr desktop) — no inline gridTemplateColumns on that div |
| FieldNotes.jsx | Hardcoded | Substack-only callout. Links to substack.com/@petthatdawg. No post list. |
| ReviewTicker.jsx | reviews.json | Scrolling quotes ticker; entire component wrapped in `<a href="https://g.page/r/CS7eaMrwENHeEBM/review">` so tapping opens Google Business. Speed: 20s. |
| DawgOfTheDay.jsx | dawg.json | Rotates by `(date + month) % dogs.length`. PHOTOS map: `{ 'Priscilla': prissyPhoto }`. Portrait uses `paddingBottom: 100%` + `position: relative` outer / `position: absolute; inset: 0` inner. `objectPosition: 'top'` for Priscilla. `.dotd-grid` stacks to 1-col on mobile via index.css. |
| ContactTerminal.jsx | Hardcoded | Multi-step contact form terminal |
| Footer.jsx | Hardcoded | Brand: "Can I Pet That **Dawg?**"; Instagram, Substack, Time To Pet links |
| PawTrail.jsx | Hardcoded | Decorative scrolling paw banner |
| MiniMap.jsx | Hardcoded | Real Leaflet map (CartoDB Positron tiles); 18 green CircleMarker dots; orange HQ dot + `.hq-label` DivIcon pill; dashed radius ring; hover tooltips desktop; rotating neighborhood strip mobile (`.mobile-neighborhood-strip`) |

## Known Pending Issues

1. **Services.jsx still hardcoded** — services.json gets overwritten by Notion on every build but Services.jsx doesn't import it.
2. **Hero photo placeholder** — still a dashed box. Real photo of Crickett + Kira on trail needed.
3. **CTA no longer uses Notion** — cta.json and cta-content.json are fetched but not used. CTA is fully hardcoded with the 4-step flow.

## Responsive Design

Single breakpoint: **640px**. Mobile-first throughout.

- `overflow-x: hidden; max-width: 100%` on both `html` and `body`
- Hamburger & footer icons: 44px minimum touch targets
- Hero placeholder: hidden below 480px
- CTA: 1-col below 360px (`.cta-buttons` fallback)

## CSS Utility Classes (index.css)

| Class | Mobile | Desktop (640px+) |
|-------|--------|-----------------|
| `.photo-carousel` | `display: block` | `display: none` |
| `.photo-strips-grid` | `display: none !important` | `display: grid !important` — 3 cols |
| `.mobile-neighborhood-strip` | `display: block` | `display: none` |
| `.hover-hint` | `display: none` | `display: inline` |
| `.service-area-label` | `display: none` | `display: block` |
| `.bento-bottom` | `grid-template-columns: 1fr` | `grid-template-columns: 2fr 1fr` |
| `.dotd-grid` | `grid-template-columns: 1fr !important` | (inline style handles desktop) |
| `.cta-steps-grid` | `grid-template-columns: 1fr` | `grid-template-columns: 1fr 1fr` |

## Key Design Decisions

- No italic anywhere — enforced via CSS
- Dark mode via `data-mode` attribute on root element
- `--border-bold` for dark card borders in CredsBento
- Services data inlined to avoid Notion build step overwriting it
- Brand name written as "Can I Pet That Dawg?" everywhere — question mark is part of the brand
- Hero eyebrow cycles phrases individually (`useCyclingTypewriter`) instead of one long string — prevents mobile layout bounce from text wrapping mid-type
- Why section: ALL 4 items hidden by default, revealed by "View more" toggle — not just the last 2
- DawgOfTheDay portrait: `paddingBottom: 100%` pattern (not `aspectRatio: 1`) for mobile reliability
- CredsBento `.bento-bottom`: never use inline `gridTemplateColumns` — CSS class handles the responsive switch
- CTA is a "Getting Started" funnel, not a generic booking section — 4 steps guide the user through the signup journey
