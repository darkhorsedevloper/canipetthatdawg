const quotes = [
  { text: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit."', client: 'Client Name' },
  { text: '"Sed do eiusmod tempor incididunt ut labore et dolore magna."', client: 'Client Name' },
  { text: '"Ut enim ad minim veniam, quis nostrud exercitation."', client: 'Client Name' },
  { text: '"Duis aute irure dolor in reprehenderit in voluptate velit."', client: 'Client Name' },
  { text: '"Excepteur sint occaecat cupidatat non proident."', client: 'Client Name' },
  { text: '"Sunt in culpa qui officia deserunt mollit anim id est laborum."', client: 'Client Name' },
  { text: '"Nemo enim ipsam voluptatem quia voluptas sit aspernatur."', client: 'Client Name' },
]

// Duplicate for seamless loop
const doubled = [...quotes, ...quotes]

export default function ReviewTicker() {
  return (
    <div style={{
      overflow: 'hidden',
      background: 'var(--charcoal)',
      borderTop: '0.5px solid rgba(196,137,42,0.3)',
      borderBottom: '0.5px solid rgba(196,137,42,0.3)',
      padding: '12px 0',
      whiteSpace: 'nowrap',
    }}>
      <div style={{
        display: 'inline-flex',
        gap: '0',
        animation: 'ticker 40s linear infinite',
      }}>
        {doubled.map((q, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', paddingRight: '56px' }}>
            <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: '13px', color: '#EDE5D2' }}>
              {q.text}
            </span>
            <span style={{ fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--orange)' }}>
              — {q.client}
            </span>
            <span style={{ color: 'rgba(196,137,42,0.4)', fontSize: '10px', paddingLeft: '16px' }}>✦</span>
          </span>
        ))}
      </div>

      <style>{`
        @keyframes ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}
