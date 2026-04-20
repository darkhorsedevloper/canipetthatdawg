import items from '../data/trustbar.json'

export default function TrustBar() {
  return (
    <div style={{
      background: 'var(--panel)',
      borderBottom: '0.5px solid var(--border)',
      overflow: 'hidden',
    }}>

      {/* Desktop: flex row */}
      <div className="trust-bar-desktop" style={{ display: 'flex' }}>
        {items.map((item, i) => (
          <div key={i} className="trust-bar-item" style={{
            flex: '1 1 auto',
            padding: '16px 20px',
            borderRight: i < items.length - 1 ? '0.5px solid var(--border)' : 'none',
          }}>
            <div style={{ fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: item.color, marginBottom: '4px' }}>
              {item.label}
            </div>
            <div style={{ fontSize: '14px', color: 'var(--charcoal)', fontFamily: 'var(--serif)' }}>
              {item.value}
            </div>
          </div>
        ))}
      </div>

      {/* Mobile: scrolling ticker */}
      <div className="trust-bar-mobile" style={{ display: 'none' }}>
        <div style={{
          display: 'inline-flex',
          animation: 'trustTicker 28s linear infinite',
          whiteSpace: 'nowrap',
        }}>
          {[...items, ...items, ...items].map((item, i) => (
            <span key={i} style={{
              padding: '14px 20px',
              borderRight: '0.5px solid var(--border)',
              display: 'inline-flex', gap: '10px', alignItems: 'baseline',
              whiteSpace: 'nowrap',
            }}>
              <span style={{ fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: item.color }}>
                {item.label}
              </span>
              <span style={{ fontFamily: 'var(--serif)', fontSize: '13px', color: 'var(--charcoal)' }}>
                {item.value}
              </span>
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes trustTicker { 0%{transform:translateX(0)} 100%{transform:translateX(-33.333%)} }
        @media (max-width: 640px) {
          .trust-bar-desktop { display: none !important; }
          .trust-bar-mobile  { display: block !important; }
        }
      `}</style>

    </div>
  )
}
