export default function PawTrail() {
  const count = 5
  return (
    <div style={{
      position: 'relative', height: 28, overflow: 'hidden',
      borderTop: '0.5px solid var(--border)',
      borderBottom: '0.5px solid var(--border)',
      background: 'var(--panel)',
    }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} style={{
          position: 'absolute', top: 4,
          fontSize: 14, color: 'var(--orange)',
          animation: `pawTrot ${18 + i * 2}s linear infinite`,
          animationDelay: `${i * 2.4}s`,
          whiteSpace: 'nowrap', opacity: 0.7,
        }}>
          🐾 🐾 🐾
        </div>
      ))}
      <style>{`
        @keyframes pawTrot {
          from { left: 110%; }
          to   { left: -20%; }
        }
      `}</style>
    </div>
  )
}
