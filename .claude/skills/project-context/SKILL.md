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

**Multi-line text in Notion:** Use ` | ` (space-pipe-space) as a line break delimiter in Notion rich text fields. The fetch script converts these to `\n` via `.replace(/ \| /g, '\n')`. Components should use `whiteSpace: 'pre-line'` to render the breaks.

**Important:** Always join ALL rich_text runs, not just `[0]`. The fetch script uses `.map(t => t.plain_text).join('')` — Notion sometimes splits a single field into multiple text spans.

**Podcasts DB:** Now connected. Fetch pulls Pet Sitter Confessional (petsitterconfessional.com) with initials "PSC".

## Component Map (src/components/)

Page order: Nav → Hero → TrustBar → PhotoStrips → Services → EveryVisit → Why → DawgOfTheDay → ReviewTicker → CredsBento → About → FieldNotes → CTA → ContactTerminal → Footer

| Component | Data source | Notes |
|-----------|-------------|-------|
| Nav.jsx | Hardcoded | Brand: "Can I Pet That **Dawg?**" (orange on "Dawg?"); dark mode toggle (ModeSwitch pill), hamburger menu |
| Hero.jsx | hero.json | Typewriter animation on eyebrow field; subheadline uses `whiteSpace: pre-line`; "Fear Free" links to fearfreehappyhomes.com; quote renders as `{quote} — {quoteAttribution}` |
| TrustBar.jsx | trustbar.json | Always-scrolling ticker |
| PhotoStrips.jsx | Static assets | Real photos from src/assets/ — PP Kira Cute Down.JPEG, PP Kira Cute Summer.JPEG, PP Kira Cute.JPEG; 3-col desktop / 1-col mobile via `.photo-strips-grid` CSS class; `paddingBottom: 100%` + `position: absolute; inset: 0` for reliable aspect ratio on mobile |
| Services.jsx | Hardcoded | Flip cards — front: service name + badge, back: description + price + Book This button. Uses CSS 3D transform with `preserve-3d`. Front text centering uses `display: table` / `display: table-cell` / `verticalAlign: middle` pattern. |
| EveryVisit.jsx | Hardcoded | NEW — standalone section between Services and Why. Two feature cards: GPS Tracking (green, 📍) and Report Card (orange, 📋). References Time To Pet as a linked `"Time to Pet"` with quotes. |
| Why.jsx | why.json | 2-col grid. Eyebrow: "Why Can I Pet That Dawg?" (with ?) |
| DawgOfTheDay.jsx | dawg.json | Rotates by (date + month) % dogs.length |
| ReviewTicker.jsx | reviews.json | Scrolling quotes ticker |
| CredsBento.jsx | books.json + podcasts.json | Fear Free seal SVG, PSI/PSA stacked card, Time To Pet card (all three use `darkCard` style with `--hero-bg` bg and `--border-bold` border), reading list, podcasts |
| About.jsx | about.json | MiniMap + bio; top bar shows "Service Area" (left) + "Within a 10 mile radius of 30318" (right, hidden on mobile via `.service-area-label`) |
| FieldNotes.jsx | Hardcoded | Substack callout only — no post list. Links to substack.com/@petthatdawg |
| CTA.jsx | cta.json + cta-content.json | Bottom CTA section |
| ContactTerminal.jsx | Hardcoded | Multi-step contact form terminal |
| Footer.jsx | Hardcoded | Brand: "Can I Pet That **Dawg?**" (orange on "Dawg?"); Instagram, Substack, Time To Pet |
| PawTrail.jsx | Hardcoded | Decorative scrolling paw banner |
| MiniMap.jsx | Hardcoded | Real Leaflet map (CartoDB Positron tiles); 18 green CircleMarker dots for neighborhoods; orange HQ dot + `.hq-label` DivIcon pill; orange dashed radius ring; hover tooltips on desktop; rotating neighborhood strip on mobile (`.mobile-neighborhood-strip`) cycles every 2.5s with progress dots, each tappable to Google Maps |
| MapShowcase.jsx | Hardcoded | Leaflet map style previewer |

## Known Pending Issues

1. **Services.jsx still hardcoded** — services.json gets overwritten by Notion on every build but Services.jsx doesn't import it. Fix: wire up `import servicesData from '../data/services.json'` same as every other component.
2. **Podcasts Notion access** — see above. One-time fix needed in Notion UI.
3. **`<em>` tag in CTA.jsx** — `<em>` around "is." still renders italic in some browsers via browser defaults. Should be changed to `<span>`.
4. **Hero photo placeholder** — still a dashed box. Real photo of Crickett + Kira on trail needed.

## Responsive Design

Single breakpoint: **640px**. Mobile-first throughout.

- `overflow-x: hidden; max-width: 100%` on both `html` and `body` — prevents horizontal scroll
- Hamburger & footer icons: 44px minimum touch targets
- Hero placeholder: hidden below 480px
- Map tiles: CSS grid auto-fit
- CTA: 1-col below 360px
- CredsBento author names: truncate with ellipsis
- MiniMap "Hover pins": hidden on mobile
- PhotoStrips: `.photo-strips-grid` — 1fr single column on mobile, `repeat(3, 1fr)` at 640px+

## Key Design Decisions

- No italic anywhere — enforced via CSS, no Instrument Serif
- Dark mode via `data-mode` attribute on `<html>` element
- `--border-bold` added for dark card borders in CredsBento
- Hero secondary button: dark fill, cream text + border
- Hero headline: IBM Plex Mono weight 400 (not 700)
- Services data inlined to avoid Notion build step overwriting it
- Brand name written as "Can I Pet That Dawg?" everywhere — question mark is part of the brand
- EveryVisit section added after user testing showed GPS/report card features were buried
