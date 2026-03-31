const quotes = [
  { text: '"Kira came home actually tired for once."', client: 'Sarah M.' },
  { text: '"I get a photo report before I even think to ask."', client: 'James T.' },
  { text: '"She knows my dog better than I do."', client: 'Priya K.' },
  { text: '"No hidden fees. Ever. I\'ve checked."', client: 'Marcus D.' },
  { text: '"The GPS updates give me actual peace of mind."', client: 'Lauren B.' },
  { text: '"My anxious rescue is a different dog on these walks."', client: 'Tom R.' },
  { text: '"Worth every dollar. Zero hesitation."', client: 'Amanda C.' },
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
