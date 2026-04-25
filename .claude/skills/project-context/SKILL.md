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

Loaded via Google Fonts in index.html. **No italic anywhere** — Instrument Serif fully removed, all `fontStyle: italic` stripped site-wide.

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
| Blog Posts | 4f17fabc... | blog.json | Field Notes titles/dates |
| Dawg of the Day | d9d8fcee... | dawg.json | Featured dogs, weekly notes |
| CTA Actions | 5961c28c... | cta.json | Bottom CTA buttons |
| CTA Content | 07bd76ca... | cta-content.json | CTA heading, subheadline, eyebrow |
| Reading List | 7df9bc62... | books.json | CredsBento book list |
| Podcasts | b881ace1... | podcasts.json | CredsBento podcasts |

**To update content:** Edit in Notion → merge to main (or trigger redeploy) → fetch-notion.js runs at build time and overwrites JSON files.

**Podcasts DB issue:** Not accessible to the canipetthatdawg-site integration. Fetch script handles as soft failure — existing podcasts.json used as fallback. Fix: In Notion, open Podcasts DB → ••• → Connections → add canipetthatdawg-site.

## Component Map (src/components/)

| Component | Data source | Notes |
|-----------|-------------|-------|
| Nav.jsx | Hardcoded | Dark mode toggle (ModeSwitch pill), hamburger menu |
| Hero.jsx | hero.json | IBM Plex Mono headline, orange accent span |
| TrustBar.jsx | trustbar.json | Always-scrolling ticker |
| PhotoStrips.jsx | Hardcoded | 3 placeholder photo slots |
| Services.jsx | Hardcoded | ⚠️ Notion fetch overwrites services.json but component doesn't read it |
| Why.jsx | why.json | 2-col grid |
| DawgOfTheDay.jsx | dawg.json | Rotates by (date + month) % dogs.length |
| ReviewTicker.jsx | reviews.json | Scrolling quotes ticker |
| CredsBento.jsx | books.json + podcasts.json | Fear Free seal SVG, reading list, podcasts |
| About.jsx | about.json | Map + bio |
| FieldNotes.jsx | blog.json | Links to Substack |
| CTA.jsx | cta.json + cta-content.json | Bottom CTA section |
| ContactTerminal.jsx | Hardcoded | Multi-step contact form terminal |
| Footer.jsx | Hardcoded | Instagram, Substack, Time To Pet |
| PawTrail.jsx | Hardcoded | Decorative scrolling paw banner |
| MiniMap.jsx | Hardcoded | Atlanta service area SVG map |
| MapShowcase.jsx | Hardcoded | Leaflet map style previewer |

## Known Pending Issues

1. **Services.jsx still hardcoded** — services.json gets overwritten by Notion on every build but Services.jsx doesn't import it. Fix: wire up `import servicesData from '../data/services.json'` same as every other component.
2. **Podcasts Notion access** — see above. One-time fix needed in Notion UI.
3. **`<em>` tag in CTA.jsx** — `<em>` around "is." still renders italic in some browsers via browser defaults. Should be changed to `<span>`.
4. **Hero photo placeholder** — still a dashed box. Real photo of Crickett + Kira on trail needed.
5. **PhotoStrips** — three placeholder squares. Real photos needed.

## Responsive Design

Single breakpoint: **640px**. Mobile-first throughout.

- Hamburger & footer icons: 44px minimum touch targets
- Hero placeholder: hidden below 480px
- Map tiles: CSS grid auto-fit
- CTA: 1-col below 360px
- CredsBento author names: truncate with ellipsis
- MiniMap "Hover pins": hidden on mobile

## Key Design Decisions

- No italic anywhere — enforced via CSS, no Instrument Serif
- Dark mode via `data-mode` attribute on `<html>` element
- `--border-bold` added for dark card borders in CredsBento
- Hero secondary button: dark fill, cream text + border
- Hero headline: IBM Plex Mono weight 400 (not 700)
- Services data inlined to avoid Notion build step overwriting it
