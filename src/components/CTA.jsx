import { useState } from 'react'

const STEPS = [
  {
    number: '01',
    label: 'Create an account',
    desc: 'Sign up free on Time To Pet. Takes about 2 minutes — no commitment yet.',
    cta: 'Create account',
    href: 'https://www.timetopet.com/portal/create/create-account',
    bg: '#C4892A',
    text: '#0A0806',
  },
  {
    number: '02',
    label: 'Schedule a meet & greet',
    desc: 'A free 30-min intro so your dog and I can get acquainted before the first walk.',
    cta: 'Book a meet & greet',
    href: 'https://www.timetopet.com/portal/create/create-account',
    bg: '#4A7C5E',
    text: '#0A0806',
  },
  {
    number: '03',
    label: 'Choose your service',
    desc: "Pick the walk, drop-in, or overnight that fits your dog's week.",
    cta: 'View services',
    href: '#services',
    bg: '#3A6B8A',
    text: '#EDE5D2',
  },
  {
    number: '04',
    label: 'Follow along',
    desc: 'Photo reports after every visit. Follow on Instagram for daily dawg content.',
    cta: 'Follow @canipet_that_dawg_llc',
    href: 'https://instagram.com/canipet_that_dawg_llc',
    bg: '#EDE5D2',
    text: '#2A2520',
  },
]

const CARD_HEIGHT = 280

function StepCard({ step }) {
  const [flipped, setFlipped] = useState(false)
  const darkText = step.text === '#0A0806' || step.text === '#2A2520'

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
      {/* Step number badge */}
      <span style={{
        position: 'absolute',
        top: -11,
        left: '20px',
        background: step.bg,
        color: step.text,
        fontSize: '9px',
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        padding: '3px 10px',
        borderRadius: '99px',
        whiteSpace: 'nowrap',
        fontWeight: 700,
        zIndex: 10,
        fontFamily: "'IBM Plex Mono', monospace",
      }}>
        {step.number}
      </span>

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
          borderLeft: `2px solid ${step.bg}`,
          borderRadius: '10px',
          padding: '28px 24px',
          display: 'flex',
          flexDirection: 'column',
        }}>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{
              fontFamily: 'var(--serif)',
              fontSize: '26px',
              fontWeight: 400,
              color: 'var(--charcoal)',
              lineHeight: 1.2,
              textAlign: 'center',
            }}>
              {step.label}
            </div>
          </div>

          <div style={{
            textAlign: 'center',
            fontSize: '11px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: step.bg,
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
          background: step.bg,
          borderRadius: '10px',
          padding: '28px 24px',
          display: 'flex',
          flexDirection: 'column',
        }}>
          <p style={{
            fontSize: '14px',
            color: darkText ? 'rgba(10,8,6,0.8)' : 'rgba(237,229,210,0.85)',
            lineHeight: 1.75,
            fontFamily: "'IBM Plex Mono', monospace",
            flex: 1,
          }}>
            {step.desc}
          </p>

          <a
            href={step.href}
            target={step.href.startsWith('http') ? '_blank' : undefined}
            rel={step.href.startsWith('http') ? 'noreferrer' : undefined}
            onClick={e => e.stopPropagation()}
            style={{
              display: 'block',
              width: '100%',
              textAlign: 'center',
              background: darkText ? 'rgba(10,8,6,0.15)' : 'rgba(237,229,210,0.15)',
              border: `1.5px solid ${step.text}`,
              color: step.text,
              padding: '12px 0',
              borderRadius: '7px',
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              marginTop: '20px',
            }}
          >
            {step.cta} →
          </a>
        </div>

      </div>
    </div>
  )
}

export default function CTA() {
  return (
    <section style={{
      background: 'var(--hero-bg)',
      borderTop: '0.5px solid rgba(196,137,42,0.3)',
      borderBottom: '0.5px solid rgba(196,137,42,0.3)',
      padding: '64px 24px',
    }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>

        <p style={{
          fontSize: '12px', letterSpacing: '0.22em', textTransform: 'uppercase',
          color: 'var(--green)', marginBottom: '16px',
          display: 'flex', alignItems: 'center', gap: '12px',
          fontFamily: "'IBM Plex Mono', monospace",
        }}>
          <span style={{ display: 'block', width: '24px', height: '1px', background: 'var(--green)' }} />
          Atlanta · Now Accepting Clients
        </p>

        <h2 style={{
          fontFamily: 'var(--serif)',
          fontWeight: 400,
          fontSize: 'clamp(34px, 5vw, 56px)',
          lineHeight: 1.05,
          color: '#EDE5D2',
          marginBottom: '12px',
        }}>
          Getting started <span style={{ color: 'var(--orange)' }}>is simple.</span>
        </h2>

        <p style={{
          fontSize: '15px',
          color: 'rgba(226,217,198,0.55)',
          fontFamily: "'IBM Plex Mono', monospace",
          marginBottom: '48px',
          lineHeight: 1.6,
        }}>
          Made to fit your dog's idea of a good day.
        </p>

        <div className="cta-steps-grid">
          {STEPS.map((step) => (
            <StepCard key={step.number} step={step} />
          ))}
        </div>

      </div>
    </section>
  )
}
