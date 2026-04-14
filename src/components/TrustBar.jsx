import items from '../data/trustbar.json'

export default function TrustBar() {
  return (
    <div className="trust-bar">
      {items.map((item, i) => (
        <div key={i} className="trust-bar-item">
          <div style={{ fontSize: '12px', letterSpacing: '0.14em', textTransform: 'uppercase', color: item.color, marginBottom: '4px' }}>
            {item.label}
          </div>
          <div style={{ fontSize: '14px', color: 'var(--charcoal)' }}>
            {item.value}
          </div>
        </div>
      ))}
    </div>
  )
}
