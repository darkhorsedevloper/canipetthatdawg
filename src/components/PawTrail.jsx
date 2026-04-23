const SEGMENT = '🐾  🐾  🐾  🐾  🐾  🐾  🐾  🐾  🐾  🐾  🐾  🐾  🐾  🐾  🐾  🐾  🐾  🐾  🐾  🐾  '
// Triple so the visible window is always filled and -33.333% loops seamlessly
const track = SEGMENT + SEGMENT + SEGMENT

export default function PawTrail() {
  return (
    <div style={{
      overflow: 'hidden',
      borderTop: '0.5px solid var(--border)',
      borderBottom: '0.5px solid var(--border)',
      background: 'var(--panel)',
      height: 32,
      display: 'flex',
      alignItems: 'center',
    }}>
      <div style={{
        display: 'inline-block',
        whiteSpace: 'nowrap',
        fontSize: 14,
        color: 'var(--orange)',
        opacity: 0.7,
        animation: 'pawScroll 14s linear infinite',
        willChange: 'transform',
      }}>
        {track}
      </div>

      <style>{`
        @keyframes pawScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
      `}</style>
    </div>
  )
}
