const items = [
  { label: 'Certified', value: 'Fear Free + CPR', color: 'var(--green)' },
  { label: 'Every visit', value: 'GPS + report card', color: 'var(--orange)' },
  { label: 'Coverage', value: 'Insured + bonded', color: 'var(--blue)' },
  { label: 'Promise', value: 'No hidden fees', color: 'var(--muted)' },
]

export default function TrustBar() {
  return (
    <div style={{ display: 'flex', background: 'var(--panel)', borderBottom: '0.5px solid var(--border)' }}>
      {items.map((item, i) => (
        <div key={i} style={{ flex: 1, padding: '14px 16px', borderRight: i < items.length - 1 ? '0.5px solid var(--border)' : 'none' }}>
          <div style={{ fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', color: item.color, marginBottom: '3px' }}>
            {item.label}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--faint)' }}>
            {item.value}
          </div>
        </div>
      ))}
    </div>
  )
}