import quotes from '../data/reviews.json'

// Duplicate for seamless loop
const doubled = [...quotes, ...quotes]

export default function ReviewTicker() {
  return (
    <a href="https://g.page/r/CS7eaMrwENHeEBM/review" target="_blank" rel="noreferrer" style={{
      display: 'block',
      overflow: 'hidden',
      background: 'var(--hero-bg)',
      borderTop: '0.5px solid rgba(196,137,42,0.3)',
      borderBottom: '0.5px solid rgba(196,137,42,0.3)',
      padding: '12px 0',
      whiteSpace: 'nowrap',
      textDecoration: 'none',
      cursor: 'pointer',
    }}>
      <div style={{
        display: 'inline-flex',
        gap: '0',
        animation: 'ticker 40s linear infinite',
      }}>
        {doubled.map((q, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', paddingRight: '56px' }}>
            <span style={{ fontFamily: 'var(--serif)', fontSize: '13px', color: '#EDE5D2' }}>
              {'"'}{q.text}{'"'}
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
    </a>
  )
}
