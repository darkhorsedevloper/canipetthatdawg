const STEPS = [
  {
    number: '',
    label: 'Fill Out New Client Form',
    desc: 'Schedule your free meet & greet!',
    cta: 'Create account →',
    href: 'https://www.timetopet.com/portal/create/create-account',
    bg: '#C4892A',
    text: '#0A0806',
    subtext: 'rgba(10,8,6,0.6)',
  },
  {
    number: '02',
    label: 'Existing Clients',
    desc: 'Log in here',
    cta: 'Log in →',
    href: 'https://www.timetopet.com/portal/create/create-account',
    bg: '#4A7C5E',
    text: '#0A0806',
    subtext: 'rgba(10,8,6,0.55)',
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
          marginBottom: '12px',
        }}>
          Getting started <span style={{ color: 'var(--orange)' }}>is simple.</span>
        </h2>

        <p style={{
          fontSize: '15px',
          color: 'rgba(226,217,198,0.55)',
          fontFamily: "'IBM Plex Mono', monospace",
          marginBottom: '40px',
          lineHeight: 1.6,
        }}>
          Made to fit your dog's idea of a good day.
        </p>

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
                background: step.bg,
                textDecoration: 'none',
                cursor: 'pointer',
              }}
            >
              <span style={{
                fontSize: '11px',
                fontFamily: "'IBM Plex Mono', monospace",
                letterSpacing: '0.18em',
                color: step.subtext,
                marginBottom: '14px',
                fontWeight: 700,
                display: 'block',
                minHeight: '14px',
              }}>
                {step.number}
              </span>
              <p style={{
                fontSize: '17px',
                fontFamily: 'var(--serif)',
                fontWeight: 400,
                color: step.text,
                marginBottom: '10px',
                lineHeight: 1.2,
              }}>
                {step.label}
              </p>
              <p style={{
                fontSize: '13px',
                color: step.subtext,
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
                color: step.text,
                textTransform: 'uppercase',
                fontWeight: 700,
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
