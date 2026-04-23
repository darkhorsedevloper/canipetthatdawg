import items from '../data/trustbar.json'

// Triple for seamless loop
const tripled = [...items, ...items, ...items]

export default function TrustBar() {
  return (
    <div style={{
      overflow: 'hidden',
      background: 'var(--panel)',
      borderTop: '0.5px solid var(--border)',
      borderBottom: '0.5px solid var(--border)',
      whiteSpace: 'nowrap',
    }}>
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        animation: 'trustScroll 32s linear infinite',
      }}>
        {tripled.map((item, i) => (
          <span key={i} style={{
            display: 'inline-flex',
            alignItems: 'baseline',
            gap: '8px',
            padding: '14px 28px',
            borderRight: '0.5px solid var(--border)',
          }}>
            <span style={{
              fontSize: '10px',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: item.color,
              fontFamily: "'IBM Plex Mono', monospace",
            }}>
              {item.label}
            </span>
            <span style={{
              fontSize: '14px',
              color: 'var(--charcoal)',
              fontFamily: 'var(--serif)',
            }}>
              {item.value}
            </span>
          </span>
        ))}
      </div>

      <style>{`
        @keyframes trustScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>
    </div>
  )
}
