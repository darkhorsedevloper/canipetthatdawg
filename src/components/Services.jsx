import { useState } from 'react'
import notionServices from '../data/services.json'

// Fallback accents by service name when Notion doesn't supply one
const ACCENT_FALLBACKS = {
  'Walk + Field Session': 'var(--green)',
  'Adventure Hike':       'var(--orange)',
  'Overnight Stay':       'var(--blue)',
  'Drop In':              '#8A8278',
}

const stripMarkdown = (str) => str.replace(/\*\*/g, '').replace(/\*/g, '').trim()

const priceNumber = (price) => parseFloat((price || '').replace(/[^0-9.]/g, '')) || 0

const services = notionServices
  .filter(s => s.name && s.price)
  .map(s => ({
    ...s,
    desc: stripMarkdown(s.desc || ''),
    note: (s.note || '').trim(),
    accent: s.accent || ACCENT_FALLBACKS[s.name] || 'var(--green)',
    featured: (s.badge || '').toLowerCase().includes('most booked'),
    // Promo chip: any badge containing "special" (e.g. "Summer Special")
    promo: /special/i.test(s.badge || ''),
  }))
  // Cards always list cheapest -> priciest, whatever order Notion sends
  .sort((a, b) => priceNumber(a.price) - priceNumber(b.price))

const BOOK_URL = 'https://www.timetopet.com/portal/create/create-account'

function ServiceCard({ s, open, onToggle, order }) {
  return (
    <div style={{
      position: 'relative',
      background: 'var(--card)',
      border: '0.5px solid var(--border)',
      borderLeft: `2px solid ${s.accent}`,
      borderRadius: '10px',
      padding: '28px 24px',
      display: 'flex',
      flexDirection: 'column',
      order, // mobile single-stack reading order (no effect on desktop columns)
    }}>
      {/* Most booked / promo badge */}
      {(s.featured || s.promo) && (
        <span style={{
          position: 'absolute',
          top: -11,
          left: '20px',
          background: s.accent,
          color: '#fff',
          fontSize: '9px',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          padding: '3px 10px',
          borderRadius: '99px',
          whiteSpace: 'nowrap',
          fontWeight: 700,
        }}>
          {s.featured ? '★ Most booked' : `☀ ${s.badge}`}
        </span>
      )}

      {/* Service name header */}
      <p style={{
        textAlign: 'center',
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: '15px',
        fontWeight: 700,
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        color: s.accent,
        marginBottom: '10px',
      }}>
        {s.name}
      </p>

      {/* Price + note */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <p style={{
          fontFamily: 'var(--serif)',
          fontSize: '42px',
          fontWeight: 400,
          color: 'var(--charcoal)',
          lineHeight: 1,
        }}>
          {s.price}
        </p>
        <p style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '6px' }}>
          {s.note}
        </p>
      </div>

      {/* View more toggle + callout — grows to fill space */}
      <div style={{ flex: 1 }}>
        <button
          onClick={onToggle}
          style={{
            background: 'none',
            border: 'none',
            color: s.accent,
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '11px',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            marginBottom: '12px',
          }}
        >
          {open ? '−' : '+'} {open ? 'View less' : 'View more'}
        </button>

        {open && (
          <div style={{
            background: `color-mix(in srgb, ${s.accent} 10%, transparent)`,
            border: `1px solid color-mix(in srgb, ${s.accent} 30%, transparent)`,
            borderRadius: '7px',
            padding: '12px 14px',
            marginBottom: '14px',
          }}>
            <p style={{
              fontSize: '14px',
              color: 'var(--charcoal)',
              lineHeight: 1.75,
              fontFamily: "'IBM Plex Mono', monospace",
              whiteSpace: 'pre-line',
              margin: 0,
            }}>
              {s.desc}
            </p>
          </div>
        )}
      </div>

      {/* Book button — always at bottom */}
      <a
        href={BOOK_URL}
        target="_blank"
        rel="noreferrer"
        style={{
          display: 'block',
          width: '100%',
          textAlign: 'center',
          background: s.accent,
          color: '#0A0806',
          padding: '12px 0',
          borderRadius: '7px',
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: '12px',
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          textDecoration: 'none',
          marginTop: 'auto',
        }}
      >
        Book This →
      </a>
    </div>
  )
}

export default function Services() {
  const [openSet, setOpenSet] = useState(new Set())

  const handleToggle = (i) => setOpenSet(prev => {
    const next = new Set(prev)
    next.has(i) ? next.delete(i) : next.add(i)
    return next
  })

  return (
    <section id="services" className="section-pad" style={{ borderBottom: '0.5px solid var(--border)' }}>

      <p style={{ fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--green)', marginBottom: '10px' }}>
        Services
      </p>

      <h2 style={{
        fontFamily: 'var(--serif)',
        fontSize: 'clamp(28px, 4.5vw, 48px)',
        fontWeight: 400,
        lineHeight: 1.15,
        color: 'var(--charcoal)',
        marginBottom: '28px',
      }}>
        Pick what best <span style={{ color: 'var(--orange)' }}>fits your dog.</span>
      </h2>

      {/* Two independent columns (evens left, odds right) so an expanded
          card only pushes its own column down. On mobile the wrappers are
          display: contents and the inline `order` restores reading order. */}
      <div className="services-grid">
        {[0, 1].map(col => (
          <div className="services-col" key={col}>
            {services.map((s, i) => i % 2 === col && (
              <ServiceCard key={i} s={s} order={i} open={openSet.has(i)} onToggle={() => handleToggle(i)} />
            ))}
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: 'var(--muted)', borderTop: '0.5px solid var(--border)', paddingTop: '16px' }}>
        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--green)', flexShrink: 0, display: 'inline-block' }} />
        No hidden fees — no extra charges for second dogs, routine meds, or weekends.
      </div>

    </section>
  )
}
