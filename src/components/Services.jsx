const services = [
  {
    badge: 'Walk + Field Session · Most booked',
    badgeColor: 'var(--green)',
    name: '1 hr 15 min of real work',
    desc: 'Structured movement, sniff work, enrichment, and behavioral reinforcement. Two dogs max — no upcharge for the second.',
    price: '$75',
    note: 'per session · 2 dog max · no upcharge',
    accent: 'var(--green)',
    span: true,
  },
  {
    badge: 'Premium',
    badgeColor: 'var(--orange)',
    name: 'Adventure Hike',
    desc: 'Real trails, real terrain. Pre-screened for fitness and recall.',
    price: '$175',
    note: 'per dog · 2 dog max',
    accent: null,
  },
  {
    badge: 'Overnight',
    badgeColor: 'var(--blue)',
    name: 'Overnight Stay',
    desc: 'Home environment, consistent routine. Not a kennel.',
    price: '$160',
    note: 'flat rate · no extras',
    accent: 'var(--blue)',
  },
]

export default function Services() {
  return (
    <section id="services" className="section-pad" style={{ borderBottom: '0.5px solid var(--border)' }}>

      <p style={{ fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--green)', marginBottom: '8px' }}>
        Services
      </p>

      <h2 style={{ fontFamily: 'var(--serif)', fontSize: '28px', fontWeight: 400, lineHeight: 1.25, color: 'var(--charcoal)', marginBottom: '24px' }}>
        Three ways to give your dog a <em style={{ color: 'var(--orange)' }}>real day.</em>
      </h2>

      <div className="grid-2col">
        {services.map((s, i) => (
          <div key={i} className={s.span ? 'service-span' : ''} style={{
            background: 'var(--card)',
            border: `0.5px solid var(--border)`,
            borderLeft: s.accent ? `2px solid ${s.accent}` : `0.5px solid var(--border)`,
            borderRadius: s.accent ? '0 4px 4px 0' : '4px',
            padding: '22px 18px',
          }}>
            <div>
              <span style={{
                display: 'inline-block', fontSize: '9px', letterSpacing: '0.1em',
                textTransform: 'uppercase', padding: '3px 10px', borderRadius: '20px',
                marginBottom: '10px',
                background: `color-mix(in srgb, ${s.badgeColor} 12%, transparent)`,
                color: s.badgeColor,
              }}>
                {s.badge}
              </span>
              <p style={{ fontFamily: 'var(--serif)', fontSize: '19px', color: 'var(--charcoal)', marginBottom: '7px', lineHeight: 1.2 }}>{s.name}</p>
              <p style={{ fontSize: '12px', color: 'var(--muted)', lineHeight: 1.65, marginBottom: '14px' }}>{s.desc}</p>
              <p style={{ fontFamily: 'var(--serif)', fontSize: '36px', color: 'var(--charcoal)', lineHeight: 1 }}>{s.price}</p>
              <p style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '3px' }}>{s.note}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: 'var(--muted)', borderTop: '0.5px solid var(--border)', paddingTop: '12px' }}>
        <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--green)', flexShrink: 0, display: 'inline-block' }}/>
        No hidden fees — no extra charges for second dogs, routine meds, or weekends.
      </div>

    </section>
  )
}
