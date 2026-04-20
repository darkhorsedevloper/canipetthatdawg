const quotes = [
  { text: 'Crickett sends a photo report before I think to ask.',        client: 'M.K. · Westside' },
  { text: 'Kira came home tired AND settled. Rare combination.',          client: 'D.R. · O4W' },
  { text: 'Felt like a friend was with my dog, not a stranger.',          client: 'S.L. · Inman Park' },
  { text: 'Easiest onboarding of any sitter I\'ve tried.',                client: 'J.P. · Grant Park' },
  { text: 'She noticed my dog was favoring a paw. Vet confirmed.',        client: 'A.C. · Kirkwood' },
  { text: 'Adventure hike days are my dog\'s favorite days.',             client: 'T.N. · Decatur' },
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
        animation: 'ticker 80s linear infinite',
      }}>
        {doubled.map((q, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', paddingRight: '56px' }}>
            <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: '13px', color: '#EDE5D2' }}>
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
    </div>
  )
}
