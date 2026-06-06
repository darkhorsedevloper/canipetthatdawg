import { useState } from 'react'

const services = [
  {
    name: 'Walk + Field Session',
    badge: 'Most booked',
    desc: 'Movement, sniffing, and space to settle. Quality over quantity. No pack walks.',
    price: '$60',
    note: 'per session · 2 dog max · 75 min',
    accent: 'var(--green)',
    featured: true,
  },
  {
    name: 'Adventure Hike',
    badge: 'Premium',
    desc: 'Real trails. No chaos. One handler, one pair of dogs, three unhurried hours.',
    price: '$105',
    note: 'per dog · 2 dog max · 3 hrs',
    accent: 'var(--orange)',
    featured: false,
  },
  {
    name: 'Overnight Stay',
    badge: 'Overnight',
    desc: 'Your dog stays home. I handle the rest — even the cat 🐱',
    price: '$115',
    note: 'flat rate · no extras · full 24 hrs',
    accent: 'var(--blue)',
    featured: false,
  },
  {
    name: 'Drop In',
    badge: 'Customizable',
    desc: 'Unhurried check-ins, built for your dog.',
    price: '$40',
    note: 'flat rate · choose what time works best for you',
    accent: '#8A8278',
    featured: false,
  },
]

const BOOK_URL = 'https://www.timetopet.com/portal/create/create-account'

function ServiceCard({ s, open, onToggle }) {
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
    }}>
      {/* Most booked badge */}
      {s.featured && (
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
          ★ Most booked
        </span>
      )}

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
  const [openIndex, setOpenIndex] = useState(null)

  const handleToggle = (i) => setOpenIndex(prev => prev === i ? null : i)

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

      <div className="services-grid">
        {services.map((s, i) => (
          <ServiceCard key={i} s={s} open={openIndex === i} onToggle={() => handleToggle(i)} />
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: 'var(--muted)', borderTop: '0.5px solid var(--border)', paddingTop: '16px' }}>
        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--green)', flexShrink: 0, display: 'inline-block' }} />
        No hidden fees — no extra charges for second dogs, routine meds, or weekends.
      </div>

    </section>
  )
}
