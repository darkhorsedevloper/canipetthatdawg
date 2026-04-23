import actions from '../data/cta.json'
import cta from '../data/cta-content.json'

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
          color: 'var(--green)', marginBottom: '24px',
          display: 'flex', alignItems: 'center', gap: '12px',
        }}>
          <span style={{ display: 'block', width: '24px', height: '1px', background: 'var(--green)' }} />
          {cta.eyebrow}
        </p>

        <h2 className="cta-heading" style={{
          fontFamily: 'var(--serif)',
          fontWeight: 400,
          lineHeight: 1.05,
          color: '#EDE5D2',
          marginBottom: '20px',
        }}>
          {cta.headline.split('\n').map((line, i, arr) => (
            <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
          ))}{' '}
          <span style={{ color: 'var(--orange)' }}>{cta.headlineAccent}</span>
        </h2>

        <p style={{
          fontSize: '17px',
          lineHeight: 1.75,
          color: 'rgba(226,217,198,0.65)',
          maxWidth: '460px',
          marginBottom: '48px',
        }}>
          {cta.subheadline}
        </p>

        <div className="cta-buttons">
          {actions.map((a) => (
            <a
              key={a.label}
              href={a.href}
              {...(a.external ? { target: '_blank', rel: 'noreferrer' } : {})}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '22px 20px',
                borderRadius: '2px',
                background: a.color,
                border: 'none',
                textDecoration: 'none',
              }}
            >
              <span style={{
                fontSize: '14px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                fontWeight: 700,
                color: a.color === '#EDE5D2' ? '#2A2520' : '#0A0806',
                marginBottom: '5px',
              }}>
                {a.label}
              </span>
              <span style={{
                fontSize: '12px',
                color: a.color === '#EDE5D2' ? 'rgba(42,37,32,0.55)' : 'rgba(10,8,6,0.5)',
                letterSpacing: '0.04em',
              }}>
                {a.sub}
              </span>
            </a>
          ))}
        </div>

      </div>
    </section>
  )
}
