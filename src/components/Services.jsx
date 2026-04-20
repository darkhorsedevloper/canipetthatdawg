import services from '../data/services.json'

export default function Services() {
  return (
    <section id="services" className="section-pad" style={{ borderBottom: '0.5px solid var(--border)' }}>

      <p style={{ fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--green)', marginBottom: '8px' }}>
        Services
      </p>

      <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(26px, 4vw, 42px)', fontWeight: 400, lineHeight: 1.2, color: 'var(--charcoal)', marginBottom: '24px' }}>
        Pick what best <em style={{ color: 'var(--orange)' }}>fits your dog.</em>
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px', marginBottom: '20px' }}>
        {services.map((s, i) => (
          <div key={i} style={{
            position: 'relative',
            background: 'var(--card)',
            border: '0.5px solid var(--border)',
            borderLeft: s.accent ? `2px solid ${s.accent}` : '0.5px solid var(--border)',
            borderRadius: s.accent ? '0 4px 4px 0' : '4px',
            padding: '22px 20px 20px',
            display: 'flex', flexDirection: 'column',
          }}>
            {s.span && (
              <span style={{
                position: 'absolute', top: -9, right: 16,
                background: s.accent || 'var(--orange)', color: '#0A0806',
                fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase',
                padding: '3px 8px', borderRadius: 99,
              }}>
                ★ Most booked
              </span>
            )}
            <span style={{
              display: 'inline-block', fontSize: '10px', letterSpacing: '0.1em',
              textTransform: 'uppercase', padding: '4px 10px', borderRadius: '20px',
              marginBottom: '14px', alignSelf: 'flex-start',
              background: `color-mix(in srgb, ${s.badgeColor} 12%, transparent)`,
              color: s.badgeColor,
            }}>
              {s.badge}
            </span>
            <p style={{ fontFamily: 'var(--serif)', fontSize: '20px', color: 'var(--charcoal)', marginBottom: '8px', lineHeight: 1.2 }}>{s.name}</p>
            <p style={{ fontSize: '12px', color: 'var(--muted)', lineHeight: 1.65, marginBottom: '20px', minHeight: '40px' }}>
              {s.desc.split(/(\*\*[^*]+\*\*)/).map((part, j) =>
                part.startsWith('**') ? <strong key={j} style={{ color: 'var(--charcoal)' }}>{part.slice(2, -2)}</strong> : part
              )}
            </p>
            <div style={{ marginTop: 'auto' }}>
              <p style={{ fontFamily: 'var(--serif)', fontSize: '40px', color: 'var(--charcoal)', lineHeight: 1 }}>{s.price}</p>
              <p style={{ fontSize: '11px', color: 'var(--faint)', marginTop: '4px' }}>{s.note}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: 'var(--muted)', borderTop: '0.5px solid var(--border)', paddingTop: '16px' }}>
        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--green)', flexShrink: 0, display: 'inline-block' }}/>
        No hidden fees — no extra charges for second dogs, routine meds, or weekends.
      </div>

    </section>
  )
}
