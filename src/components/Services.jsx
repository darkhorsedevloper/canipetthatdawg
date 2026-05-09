import { useState } from 'react'

// Services data is inlined here — Notion fetch overwrites services.json on build
const services = [
  {
    name: 'Walk + Field Session',
    badge: 'Most booked',
    desc: 'Movement, sniffing, and space to settle. Quality over quantity. No pack walks.',
    price: '$60',
    note: 'per session · 2 dog max · 75 min',
    badgeColor: 'var(--green)',
    accent: 'var(--green)',
    featured: true,
  },
  {
    name: 'Adventure Hike',
    badge: 'Premium',
    desc: 'Real trails. No chaos. One handler, one pair of dogs, three unhurried hours.',
    price: '$105',
    note: 'per dog · 2 dog max · 3 hrs',
    badgeColor: 'var(--orange)',
    accent: 'var(--orange)',
    featured: false,
  },
  {
    name: 'Overnight Stay',
    badge: 'Overnight',
    desc: 'Your dog stays home. I handle the rest — even the cat 🐱',
    price: '$115',
    note: 'flat rate · no extras · full 24 hrs',
    badgeColor: 'var(--blue)',
    accent: 'var(--blue)',
    featured: false,
  },
  {
    name: 'Drop In',
    badge: 'Customizable',
    desc: 'Unhurried check-ins, built for your dog.',
    price: '$40',
    note: 'flat rate · choose what time works best for you',
    badgeColor: 'var(--green)',
    accent: 'var(--green)',
    featured: false,
  },
]

const BOOK_URL = 'https://www.timetopet.com/portal/create/create-account'
const CARD_HEIGHT = 280

function FeaturedServiceCard({ s }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      onClick={() => setFlipped(f => !f)}
      className="featured-card-height"
      style={{
        position: 'relative',
        cursor: 'pointer',
        perspective: '1000px',
        gridColumn: '1 / -1',
      }}
    >
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
        zIndex: 10,
      }}>
        ★ Most booked
      </span>

      <div style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        transformStyle: 'preserve-3d',
        transition: 'transform 750ms cubic-bezier(.4,.2,.2,1)',
        transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
      }}>

        {/* FRONT */}
        <div
          className="featured-card-front"
          style={{
            background: 'var(--card)',
            border: '0.5px solid var(--border)',
            borderLeft: `2px solid ${s.accent}`,
            borderRadius: '10px',
            padding: '28px 36px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <span style={{
              display: 'inline-block',
              alignSelf: 'flex-start',
              fontSize: '11px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              padding: '5px 14px',
              borderRadius: '20px',
              background: `color-mix(in srgb, ${s.badgeColor} 14%, transparent)`,
              color: s.badgeColor,
            }}>
              {s.badge}
            </span>
            <div style={{
              fontFamily: 'var(--serif)',
              fontSize: 'clamp(24px, 3vw, 36px)',
              fontWeight: 400,
              color: 'var(--charcoal)',
              lineHeight: 1.2,
            }}>
              {s.name}
            </div>
          </div>
          <div style={{
            fontSize: '11px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: s.accent,
            fontFamily: "'IBM Plex Mono', monospace",
            marginTop: '16px',
          }}>
            Tap to learn more →
          </div>
        </div>

        {/* BACK */}
        <div
          className="featured-card-back"
          style={{
            transform: 'rotateY(180deg)',
            background: 'var(--card)',
            border: '0.5px solid var(--border)',
            borderLeft: `2px solid ${s.accent}`,
            borderRadius: '10px',
            padding: '28px 36px',
          }}
        >
          <p style={{
            fontSize: '14px',
            color: 'var(--charcoal)',
            lineHeight: 1.75,
            fontFamily: "'IBM Plex Mono', monospace",
            flex: 1,
          }}>
            {s.desc}
          </p>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            flexShrink: 0,
            marginTop: '16px',
          }}>
            <p style={{
              fontFamily: 'var(--serif)',
              fontSize: '48px',
              fontWeight: 400,
              color: 'var(--charcoal)',
              lineHeight: 1,
            }}>
              {s.price}
            </p>
            <p style={{ fontSize: '12px', color: 'var(--muted)', textAlign: 'center' }}>
              {s.note}
            </p>
            <a
              href={BOOK_URL}
              target="_blank"
              rel="noreferrer"
              onClick={e => e.stopPropagation()}
              style={{
                display: 'block',
                textAlign: 'center',
                background: s.accent,
                color: '#0A0806',
                padding: '12px 32px',
                borderRadius: '7px',
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              Book This →
            </a>
          </div>
        </div>

      </div>
    </div>
  )
}

function ServiceCard({ s }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      onClick={() => setFlipped(f => !f)}
      style={{
        position: 'relative',
        height: `${CARD_HEIGHT}px`,
        cursor: 'pointer',
        perspective: '1000px',
      }}
    >
      {/* Flip container */}
      <div style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        transformStyle: 'preserve-3d',
        transition: 'transform 750ms cubic-bezier(.4,.2,.2,1)',
        transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
      }}>

        {/* FRONT */}
        <div style={{
          position: 'absolute', inset: 0,
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          background: 'var(--card)',
          border: '0.5px solid var(--border)',
          borderLeft: `2px solid ${s.accent}`,
          borderRadius: '10px',
          padding: '28px 24px',
          display: 'flex',
          flexDirection: 'column',
        }}>
          {/* Badge pill — stays at top */}
          <div style={{ textAlign: 'center', marginBottom: '8px' }}>
            <span style={{
              display: 'inline-block',
              fontSize: '11px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              padding: '5px 14px',
              borderRadius: '20px',
              background: `color-mix(in srgb, ${s.badgeColor} 14%, transparent)`,
              color: s.badgeColor,
            }}>
              {s.badge}
            </span>
          </div>

          {/* Name — centered in remaining space */}
          <div style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div style={{
              fontFamily: 'var(--serif)',
              fontSize: '26px',
              fontWeight: 400,
              color: 'var(--charcoal)',
              lineHeight: 1.2,
              textAlign: 'center',
            }}>
              {s.name}
            </div>
          </div>

          {/* Tap hint — stays at bottom */}
          <div style={{
            textAlign: 'center',
            fontSize: '11px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: s.accent,
            fontFamily: "'IBM Plex Mono', monospace",
            marginTop: '8px',
          }}>
            Tap to learn more →
          </div>
        </div>

        {/* BACK */}
        <div style={{
          position: 'absolute', inset: 0,
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
          background: 'var(--card)',
          border: '0.5px solid var(--border)',
          borderLeft: `2px solid ${s.accent}`,
          borderRadius: '10px',
          padding: '28px 24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}>
          {/* Description */}
          <p style={{
            fontSize: '14px',
            color: 'var(--charcoal)',
            lineHeight: 1.75,
            fontFamily: "'IBM Plex Mono', monospace",
            textAlign: 'left',
            width: '100%',
            flex: 1,
          }}>
            {s.desc}
          </p>

          {/* Price + note */}
          <div style={{ marginTop: 'auto', marginBottom: '16px', textAlign: 'center', width: '100%' }}>
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

          {/* Book CTA */}
          <a
            href={BOOK_URL}
            target="_blank"
            rel="noreferrer"
            onClick={e => e.stopPropagation()}
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
            }}
          >
            Book This →
          </a>
        </div>

      </div>
    </div>
  )
}

export default function Services() {
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
        <FeaturedServiceCard s={services[0]} />
        {services.slice(1).map((s, i) => (
          <ServiceCard key={i} s={s} />
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: 'var(--muted)', borderTop: '0.5px solid var(--border)', paddingTop: '16px' }}>
        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--green)', flexShrink: 0, display: 'inline-block' }} />
        No hidden fees — no extra charges for second dogs, routine meds, or weekends.
      </div>

    </section>
  )
}
