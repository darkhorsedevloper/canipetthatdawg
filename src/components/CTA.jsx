const STEPS = [
  {
    number: '01',
    label: 'Create an account',
    desc: 'Sign up free on Time To Pet. Takes about 2 minutes — no commitment yet.',
    cta: 'Create account →',
    href: 'https://www.timetopet.com/portal/create/create-account',
    color: '#C4892A',
  },
  {
    number: '02',
    label: 'Schedule a meet & greet',
    desc: 'A free 30-min intro so your dog and I can get acquainted before the first walk.',
    cta: 'Book a meet & greet →',
    href: 'https://www.timetopet.com/portal/create/create-account',
    color: '#4A7C5E',
  },
  {
    number: '03',
    label: 'Choose your service',
    desc: 'Pick the walk, drop-in, or overnight that fits your dog\'s week.',
    cta: 'View services →',
    href: '#services',
    color: '#3A6B8A',
  },
  {
    number: '04',
    label: 'Follow along',
    desc: 'Photo reports after every visit. Follow on Instagram for daily dawg content.',
    cta: 'Follow @canipet_that_dawg_llc →',
    href: 'https://instagram.com/canipet_that_dawg_llc',
    color: '#EDE5D2',
  },
]

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
          marginBottom: '48px',
        }}>
          Getting started <span style={{ color: 'var(--orange)' }}>is simple.</span>
        </h2>

        {/* 4 steps */}
        <div className="cta-steps-grid">
          {STEPS.map((step) => (
            <a
              key={step.number}
              href={step.href}
              target={step.href.startsWith('http') ? '_blank' : undefined}
              rel={step.href.startsWith('http') ? 'noreferrer' : undefined}
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '28px 24px',
                borderRadius: '4px',
                border: '0.5px solid rgba(237,229,210,0.1)',
                background: 'rgba(237,229,210,0.04)',
                textDecoration: 'none',
                transition: 'border-color 200ms, background 200ms',
                cursor: 'pointer',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = step.color
                e.currentTarget.style.background = 'rgba(237,229,210,0.07)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(237,229,210,0.1)'
                e.currentTarget.style.background = 'rgba(237,229,210,0.04)'
              }}
            >
              <span style={{
                fontSize: '11px',
                fontFamily: "'IBM Plex Mono', monospace",
                letterSpacing: '0.18em',
                color: step.color,
                marginBottom: '14px',
                fontWeight: 700,
              }}>
                {step.number}
              </span>

              <p style={{
                fontSize: '17px',
                fontFamily: 'var(--serif)',
                fontWeight: 400,
                color: '#EDE5D2',
                marginBottom: '10px',
                lineHeight: 1.2,
              }}>
                {step.label}
              </p>

              <p style={{
                fontSize: '13px',
                color: 'rgba(226,217,198,0.55)',
                lineHeight: 1.65,
                fontFamily: "'IBM Plex Mono', monospace",
                flex: 1,
                marginBottom: '20px',
              }}>
                {step.desc}
              </p>

              <span style={{
                fontSize: '11px',
                fontFamily: "'IBM Plex Mono', monospace",
                letterSpacing: '0.1em',
                color: step.color,
                textTransform: 'uppercase',
              }}>
                {step.cta}
              </span>
            </a>
          ))}
        </div>

      </div>
    </section>
  )
}
