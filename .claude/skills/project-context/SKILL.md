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

**Current page order:** Nav → Hero → TrustBar → PhotoStrips → CTA → Services → EveryVisit → Why → About → CredsBento → FieldNotes → ReviewTicker → DawgOfTheDay → ContactTerminal → Footer

| Component | Data source | Notes |
|-----------|-------------|-------|
| Nav.jsx | Hardcoded | Brand: "Can I Pet That **Dawg?**" (orange on "Dawg?"); dark mode toggle (ModeSwitch pill), hamburger menu; **Book Now** (solid, timetopet.com/portal/create/create-account) + **Log In** (ghost border, timetopet.com/portal) buttons in that order |
| Hero.jsx | hero.json | Cycling typewriter on eyebrow. Subheadline uses `whiteSpace: pre-line`. "Fear Free" links to fearfreehappyhomes.com. No quote/quoteAttribution (removed). |
| TrustBar.jsx | trustbar.json | Always-scrolling ticker |
| PhotoStrips.jsx | Static assets | PP Kira Cute Down.JPEG, PP Kira Cute Summer.JPEG, PP Kira Cute.JPEG; scroll-snap carousel on mobile (`.photo-carousel`), 3-col grid on desktop (`.photo-strips-grid`) |
| CTA.jsx | Hardcoded | "Getting started is simple." — 2 solid-color cards side by side on desktop, stacked on mobile (`.cta-steps-grid` → 1fr 1fr). Card 1: "Fill Out New Client Form" (orange, links to TTP create-account). Card 2: "Existing Clients" / "Log in here" (green, links to TTP create-account). Number span always rendered but empty on card 1 to preserve alignment. |
| Services.jsx | Hardcoded | Flip cards — front: service name + badge + "Tap to learn more →", back: description + price + Book This button. BOOK_URL = timetopet.com/portal/create/create-account |
| EveryVisit.jsx | Hardcoded | Two feature cards: GPS Tracking (green) and Report Card (orange) |
| Why.jsx | why.json | All 4 items hidden behind "View more" toggle. `useState(false)` + `{open && (...)}` conditional render. |
| About.jsx | about.json | MiniMap + bio; "Within a 10 mile radius of 30318" label (hidden on mobile) |
| CredsBento.jsx | books.json + podcasts.json | **4 individual dark cards** (top row, auto-fit grid): Fear Free (official logo `Fear Free Cert.webp`), PSI (`PSI Logo.png`), PSA (`PSA.png`), Time To Pet (`TimetoPet.png`). Each card: label (9px mono, accent color) → logo (70px) → name (15px serif, cream). Bottom row: Reading List + Podcasts (light cards). `.bento-bottom` CSS class — no inline gridTemplateColumns. |
| FieldNotes.jsx | Hardcoded | Substack-only callout. Links to substack.com/@petthatdawg |
| ReviewTicker.jsx | reviews.json | Scrolling ticker wrapped in `<a href="https://g.page/r/CS7eaMrwENHeEBM/review">`. Speed: 20s. |
| DawgOfTheDay.jsx | dawg.json | Rotates by `(date + month) % dogs.length`. PHOTOS map: `{ 'Priscilla': prissyPhoto }`. Portrait uses `paddingBottom: 100%` pattern. `.dotd-grid` stacks to 1-col on mobile. |
| ContactTerminal.jsx | Hardcoded | Heading: "Have Questions? Open a line." Multi-step contact form terminal. |
| Footer.jsx | Hardcoded | Brand: "Can I Pet That **Dawg?**"; Instagram, Substack, Time To Pet links. No tagline. |
| PawTrail.jsx | Hardcoded | Decorative scrolling paw banner |
| MiniMap.jsx | Hardcoded | Real Leaflet map; 18 green dots; orange HQ dot + `.hq-label`; rotating neighborhood strip on mobile |

## Assets (src/assets/)

| File | Used in |
|------|---------|
| `Fear Free Cert.webp` | CredsBento — Fear Free card |
| `PSI Logo.png` | CredsBento — PSI card |
| `PSA.png` | CredsBento — PSA card |
| `TimetoPet.png` | CredsBento — Time To Pet card |
| `Prissy PP.jpeg` | DawgOfTheDay — Priscilla's portrait |
| `PP Kira Cute Down.JPEG` | PhotoStrips |
| `PP Kira Cute Summer.JPEG` | PhotoStrips |
| `PP Kira Cute.JPEG` | PhotoStrips |
| `hero.png` | Unused placeholder |

## Known Pending Issues

1. **Services.jsx still hardcoded** — services.json gets overwritten by Notion on every build but Services.jsx doesn't import it.
2. **Hero photo placeholder** — still a dashed box. Real photo of Crickett + Kira on trail needed.
3. **CTA Existing Clients URL** — currently links to create-account URL; should link to the actual Time To Pet login page when confirmed.

## Responsive Design

Single breakpoint: **640px**. Mobile-first throughout.

- `overflow-x: hidden; max-width: 100%` on both `html` and `body`
- Hamburger & footer icons: 44px minimum touch targets
- Hero placeholder: hidden below 480px

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
- Brand name written as "Can I Pet That Dawg?" everywhere — question mark is part of the brand
- Hero eyebrow cycles phrases individually (`useCyclingTypewriter`) — prevents mobile bounce
- "Walk Hard" / "Lead steady." fully removed from Hero and Footer
- Why section: ALL 4 items hidden by default behind "View more"
- DawgOfTheDay portrait: `paddingBottom: 100%` pattern for mobile reliability
- CredsBento top cards: each credential gets its own card; logos standardised to 70px; all descriptive text removed — just label + logo + name
- CTA is a 2-card funnel: new clients → fill out form; existing clients → log in
- Nav has both Book Now (primary) and Log In (ghost) buttons, in that order
- ContactTerminal heading: "Have Questions? Open a line."
