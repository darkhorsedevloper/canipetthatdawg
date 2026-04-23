const slots = [
  { label: 'On the trail',   color: 'var(--green)'  },
  { label: 'The handler',    color: 'var(--orange)' },
  { label: 'After the hike', color: 'var(--blue)'   },
]

export default function PhotoStrips() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2px', background: '#0E0B08' }}>
      {slots.map((s, i) => (
        <div key={i} style={{
          background: 'var(--hero-bg)',
          aspectRatio: '1',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: '10px',
          backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,.02) 0 14px, transparent 14px 28px)',
        }}>
          <div style={{ width: '28px', height: '2px', borderRadius: '1px', background: s.color }} />
          <p style={{
            fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.35)',
            fontFamily: "'IBM Plex Mono', monospace",
          }}>
            {s.label}
          </p>
        </div>
      ))}
    </div>
  )
}
