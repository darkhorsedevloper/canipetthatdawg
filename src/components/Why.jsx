import items from '../data/why.json'

export default function Why() {
  return (
    <section className="section-pad" style={{ background: 'var(--panel)', borderTop: '0.5px solid var(--border)', borderBottom: '0.5px solid var(--border)' }}>

      <p style={{ fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '8px' }}>
        Why Can I Pet That Dawg?
      </p>

      <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 400, lineHeight: 1.2, color: 'var(--charcoal)', marginBottom: '32px' }}>
        Less noise. <em style={{ color: 'var(--orange)' }}>Better care.</em>
      </h2>

      <div className="why-grid">
        {items.map((item, i) => (
          <div key={i}>
            <div style={{ width: '24px', height: '2px', borderRadius: '1px', background: item.bar, marginBottom: '14px' }} />
            <p style={{ fontSize: '13px', fontWeight: 700, color: 'var(--charcoal)', marginBottom: '6px' }}>{item.title}</p>
            <p style={{ fontSize: '12px', color: 'var(--muted)', lineHeight: 1.65 }}>{item.text}</p>
          </div>
        ))}
      </div>

    </section>
  )
}
