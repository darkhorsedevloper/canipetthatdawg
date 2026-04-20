import services from '../data/services.json'

export default function Services() {
  return (
    <section id="services" className="section-pad" style={{ borderBottom: '0.5px solid var(--border)' }}>

      <p style={{ fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--green)', marginBottom: '10px' }}>
        Services
      </p>

      <h2 style={{
        fontFamily: 'var(--serif)',
        fontSize: 'clamp(28px, 4.5vw, 48px)',
        fontWeight: 700,
        lineHeight: 1.15,
        color: 'var(--charcoal)',
        marginBottom: '28px',
      }}>
        Pick what best <em style={{ color: 'var(--orange)', fontWeight: 700 }}>fits your dog.</em>
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px', marginBottom: '20px' }}>
        {services.map((s, i) => (
          <article key={i} style={{
            position: 'relative',
            background: 'var(--card)',
            border: '0.5px solid var(--border)',
            borderLeft: `2px solid ${s.accent}`,
            borderRadius: '10px',
            padding: '22px 20px 20px',
            display: 'flex',
            flexDirection: 'column',
          }}>

            {/* Floating "★ Most booked" badge — centered at top */}
            {s.featured && (
              <span style={{
                position: 'absolute',
                top: -11,
                left: '50%',
                transform: 'translateX(-50%)',
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

            {/* Inner badge pill */}
            <span style={{
              display: 'inline-block',
              fontSize: '10px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              padding: '4px 10px',
              borderRadius: '20px',
              marginBottom: '14px',
              alignSelf: 'flex-start',
              background: `color-mix(in srgb, ${s.badgeColor} 14%, transparent)`,
              color: s.badgeColor,
            }}>
              {s.badge}
            </span>

            {/* Service name */}
            <p style={{
              fontFamily: 'var(--serif)',
              fontSize: '20px',
              fontWeight: 400,
              color: 'var(--charcoal)',
              marginBottom: '8px',
              lineHeight: 1.2,
            }}>
              {s.name}
            </p>

            {/* Description */}
            <p style={{
              fontSize: '12px',
              color: 'var(--muted)',
              lineHeight: 1.65,
              marginBottom: '20px',
              minHeight: '40px',
            }}>
              {s.desc}
            </p>

            {/* Price + note */}
            <div style={{ marginTop: 'auto' }}>
              <p style={{
                fontFamily: 'var(--serif)',
                fontSize: '44px',
                fontWeight: 700,
                color: 'var(--charcoal)',
                lineHeight: 1,
              }}>
                {s.price}
              </p>
              <p style={{ fontSize: '11px', color: 'var(--faint)', marginTop: '4px' }}>
                {s.note}
              </p>
            </div>

          </article>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: 'var(--muted)', borderTop: '0.5px solid var(--border)', paddingTop: '16px' }}>
        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--green)', flexShrink: 0, display: 'inline-block' }} />
        No hidden fees — no extra charges for second dogs, routine meds, or weekends.
      </div>

    </section>
  )
}
