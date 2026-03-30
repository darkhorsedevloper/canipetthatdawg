const slots = [
  { label: 'On the trail', color: 'var(--green)' },
  { label: 'The handler', color: 'var(--orange)' },
  { label: 'After the hike', color: 'var(--blue)' },
]

export default function PhotoStrips() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2px', background: '#0E0B08' }}>
      {slots.map((s, i) => (
        <div key={i} style={{
          background: '#161210',
          aspectRatio: '1',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: '8px',
        }}>
          <div style={{ width: '24px', height: '2px', borderRadius: '1px', background: s.color }} />
          <p style={{ fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#252320' }}>
            {s.label}
          </p>
        </div>
      ))}
    </div>
  )
}