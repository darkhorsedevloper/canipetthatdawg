import { useState, useRef } from 'react'

// Services data is inlined here — Notion fetch overwrites services.json on build
const services = [
  {
    name: 'Walk + Field Session',
    badge: 'Most booked',
    desc: 'Movement, sniffing, and space to settle. Quality over quantity. No pack walks.',
    price: '$75',
    note: 'per session · 2 dog max · 75 min',
    badgeColor: 'var(--green)',
    accent: 'var(--green)',
    featured: true,
  },
  {
    name: 'Adventure Hike',
    badge: 'Premium',
    desc: 'Real trails. No chaos. One handler, one pair of dogs, three unhurried hours.',
    price: '$175',
    note: 'per dog · 2 dog max · 3 hrs',
    badgeColor: 'var(--orange)',
    accent: 'var(--orange)',
    featured: false,
  },
  {
    name: 'Overnight Stay',
    badge: 'Overnight',
    desc: 'Your dog stays home. I handle the rest — even the cat 🐱',
    price: '$160',
    note: 'flat · no extras · full 24 hrs',
    badgeColor: 'var(--blue)',
    accent: 'var(--blue)',
    featured: false,
  },
]

const BOOK_URL = 'https://www.timetopet.com/portal/create/create-account'
const CARD_HEIGHT = 280

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
      {/* "Most booked" badge sits above the card */}
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
          zIndex: 10,
        }}>
          ★ Most booked
        </span>
      )}

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
  const [active, setActive] = useState(0)
  const carouselRef = useRef(null)

  function onScroll() {
    if (!carouselRef.current) return
    const i = Math.round(carouselRef.current.scrollLeft / carouselRef.current.offsetWidth)
    setActive(i)
  }

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

      {/* Mobile carousel */}
      <div className="services-carousel">
        <div
          ref={carouselRef}
          onScroll={onScroll}
          style={{
            display: 'flex',
            overflowX: 'scroll',
            scrollSnapType: 'x mandatory',
            scrollBehavior: 'smooth',
            WebkitOverflowScrolling: 'touch',
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
            gap: '12px',
            paddingRight: '24px',
          }}
        >
          {services.map((s, i) => (
            <div key={i} style={{
              minWidth: '85%',
              scrollSnapAlign: 'start',
              flexShrink: 0,
              paddingTop: s.featured ? '14px' : '0',
            }}>
              <ServiceCard s={s} />
            </div>
          ))}
        </div>

        {/* Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', padding: '14px 0 4px' }}>
          {services.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                carouselRef.current?.scrollTo({ left: carouselRef.current.offsetWidth * i, behavior: 'smooth' })
                setActive(i)
              }}
              style={{
                width: i === active ? '20px' : '6px',
                height: '6px',
                borderRadius: '3px',
                background: i === active ? 'var(--orange)' : 'var(--border-bold)',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                transition: 'width 200ms, background 200ms',
              }}
              aria-label={services[i].name}
            />
          ))}
        </div>
      </div>

      {/* Desktop grid */}
      <div className="services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px', marginBottom: '20px' }}>
        {services.map((s, i) => (
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
