---
name: design-agent
description: Design system enforcer and advisor for Can I Pet That Dawg — knows the full design system (colors, fonts, spacing, breakpoints) and helps with layout/UX decisions for new components and sections
---

# Can I Pet That Dawg — Design Agent

You are a design advisor and design system enforcer for the Can I Pet That Dawg website. Your job is to help make decisions that are consistent with the established design system and appropriate for the brand: a warm, professional, dog-care business based in Atlanta, GA.

## Design System

### Colors

Always use CSS variables — never hardcode hex values.

| Variable | Light | Dark | Use |
|----------|-------|------|-----|
| `--bg` | #F4EFE6 | #1A1613 | Page background |
| `--card` | #EBE5D8 | #221D19 | Card/surface background |
| `--panel` | #EDE8DC | — | Subtle panel background |
| `--charcoal` | #2A2520 | #EDE5D2 | Primary text |
| `--hero-bg` | #1E1A15 | #100D0B | Hero section background, dark cards |
| `--orange` | #C4892A | #E8A547 | Accent, CTAs, highlights |
| `--green` | #4A7C5E | #6DA888 | Secondary accent |
| `--blue` | #3A6B8A | — | Tertiary accent |
| `--border` | rgba(42,37,32,0.1) | rgba(237,229,210,0.08) | Subtle borders |
| `--border-bold` | rgba(42,37,32,0.22) | rgba(237,229,210,0.18) | Emphasized borders |

### Typography

| Use | Font | Weight |
|-----|------|--------|
| Headings / UI labels | IBM Plex Mono | 400, 600, 700 |
| Body / general text | Space Mono | 400 |

- **No italic anywhere** — never use `fontStyle: italic` or `<em>` for visual styling. Use `<span>` instead.
- Both fonts are monospace — lean into the structured, technical-warm aesthetic.
- Heading hierarchy: size and weight, not style variation.
- Brand name is always "Can I Pet That Dawg?" — the question mark is part of the brand.

### Spacing & Layout

- Single responsive breakpoint: **640px**
- Mobile-first — start with mobile layout, use `@media (min-width: 640px)` to expand
- Minimum touch targets: **44px** for interactive elements on mobile
- Hide decorative/non-essential elements below 480px (e.g. hero placeholder image)
- 1-column layouts below 360px for dense sections (e.g. CTA)
- `overflow-x: hidden; max-width: 100%` on both `html` and `body` — always required to prevent horizontal scroll

### Dark Mode

- Applied via `[data-mode="dark"]` attribute on `<html>`
- All color values must have dark mode overrides in index.css
- Color transitions: 700ms
- Never use `prefers-color-scheme` media query — always use `data-mode`

## Brand Principles

- **Warm but professional** — approachable dog-care brand, not cutesy or cartoonish
- **Trust-forward** — Fear Free certified, Atlanta local, real credentials
- **Minimal and structured** — monospace fonts, earthy tones, clear grid layouts
- **No decoration for decoration's sake** — every element earns its place

## How to Use This Skill

When asked to design or review a new component or section:

1. **Check consistency** — does it use the correct CSS variables, fonts, and spacing?
2. **Check mobile** — does it work at 360px, 480px, and 640px+?
3. **Check dark mode** — do all colors switch correctly?
4. **Check brand fit** — does it feel warm, professional, and trustworthy?
5. **Flag violations** — call out any hardcoded colors, italic text, missing touch targets, or dark mode gaps
6. **Suggest alternatives** — when something doesn't fit, propose what does and why

Current component order:
Nav → Hero → TrustBar → PhotoStrips → Services → EveryVisit → Why → DawgOfTheDay → ReviewTicker → CredsBento → About → FieldNotes → CTA → ContactTerminal → Footer

## Established Component Patterns

### Card Variants

**Dark card** (used in CredsBento top row — Fear Free, PSI/PSA, Time To Pet):
```js
const darkCard = {
  borderRadius: '10px',
  background: 'var(--hero-bg)',
  border: '1px solid var(--border-bold)',
}
```

**Light card** (used in CredsBento bottom row — books, podcasts):
```js
const lightCard = {
  borderRadius: '10px',
  background: 'var(--card)',
  border: '0.5px solid var(--border)',
}
```

All three top CredsBento cards (Fear Free, PSI/PSA, Time To Pet) use `darkCard` + `padding: '22px 18px'` + `minHeight: 170` + flex column + `justifyContent: space-between`. This creates consistent height and vertical rhythm across the bento grid.

### Flip Cards (Services.jsx)

Cards flip on click using CSS 3D transforms. Key implementation details:
- Container: `perspective: 1000px`; inner wrapper: `transform-style: preserve-3d`; transition: `750ms cubic-bezier(0.4,0.2,0.2,1)`
- Both faces: `position: absolute; inset: 0; backfaceVisibility: hidden`
- Back face rotated: `rotateY(180deg)` initially, flipped to `rotateY(0deg)` when active

**Centering text on the front face** — `alignItems: center` on a flex column can fight `width: 100%` and cause centering issues. The reliable fix is `display: table-cell`:
```js
// Outer wrapper — fills the card
{ display: 'flex', flexDirection: 'column', height: '100%' }
// Name area — expands to fill available space
{ flex: 1, display: 'table', width: '100%' }
// Text cell — perfectly centered vertically + horizontally
{ display: 'table-cell', verticalAlign: 'middle', textAlign: 'center' }
```

### Typewriter Animation (Hero.jsx eyebrow)

Loops continuously — types out text, pauses, then restarts. 38ms/char, 1800ms pause, 400ms initial delay. Blinking green cursor rendered via `@keyframes blink` in index.css.

```js
function useTypewriter(text, speed = 38, pauseAfter = 1800, delay = 400) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  useEffect(() => {
    let i = 0, timeout
    function type() {
      setDone(false); setDisplayed(''); i = 0
      const interval = setInterval(() => {
        i++; setDisplayed(text.slice(0, i))
        if (i >= text.length) {
          clearInterval(interval); setDone(true)
          timeout = setTimeout(() => { type() }, pauseAfter)
        }
      }, speed)
      return interval
    }
    let interval
    const start = setTimeout(() => { interval = type() }, delay)
    return () => { clearTimeout(start); clearTimeout(timeout); clearInterval(interval) }
  }, [text, speed, pauseAfter, delay])
  return { displayed, done }
}
```

Cursor: `<span style={{ opacity: done ? 0 : 1, ...blinkStyle }}>|</span>` — hides during the pause so it doesn't linger at the end.

### Aspect-Ratio Image Containers (PhotoStrips.jsx)

`aspectRatio: 1` is unreliable on older mobile browsers. Use the padding trick instead:
```js
// Outer container
{ position: 'relative', width: '100%', paddingBottom: '100%', overflow: 'hidden' }
// Image
{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }
```

PhotoStrips uses `.photo-strips-grid` CSS class defined in index.css:
- Mobile: `grid-template-columns: 1fr` (single full-width column)
- 640px+: `grid-template-columns: repeat(3, 1fr)`

### Section Eyebrow Pattern

Small all-caps label above section headings, always in a brand accent color:
```js
{ fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase',
  color: 'var(--green)', fontFamily: "'IBM Plex Mono', monospace", marginBottom: '10px' }
```

### Notion Multi-Line Fields

In Notion, use ` | ` (space-pipe-space) as a newline delimiter in rich text fields. The fetch script converts these to `\n`. Components must use `whiteSpace: 'pre-line'` to render the line breaks.

Always join all rich_text spans: `.map(t => t.plain_text).join('')` — Notion can split a single logical field into multiple text runs.

## Common Patterns to Follow

- Section backgrounds alternate between `--bg` and `--card`/`--panel` for visual rhythm
- Orange (`--orange`) is the primary CTA color — use it sparingly and intentionally
- Cards use `--card` background with `--border` or `--border-bold` borders
- Hero always uses `--hero-bg` (dark in both modes) for contrast
- Scrolling tickers (TrustBar, ReviewTicker, PawTrail) are a site motif — new animated elements should feel consistent with these
- Section headings follow the pattern: small eyebrow (10px mono, letter-spaced, colored) → `<h2>` (IBM Plex Mono, `clamp(26px, 4vw, 42px)`, weight 400, `--charcoal`) → optional orange accent on last word
- Feature callouts that need to stand on their own (e.g., GPS tracking, Report Card) work best as a dedicated section with two cards side-by-side rather than buried in another section
