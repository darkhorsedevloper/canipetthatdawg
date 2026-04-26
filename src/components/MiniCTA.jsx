export default function MiniCTA({ label = 'Ready to start?', linkText = 'Create your free account', href = 'https://www.timetopet.com/portal/create/create-account' }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        padding: '20px 24px',
        background: 'var(--orange)',
        borderTop: '0.5px solid rgba(196,137,42,0.3)',
        borderBottom: '0.5px solid rgba(196,137,42,0.3)',
        textDecoration: 'none',
        cursor: 'pointer',
      }}
    >
      <span style={{
        fontSize: '13px',
        color: '#0A0806',
        fontFamily: "'IBM Plex Mono', monospace",
        letterSpacing: '0.06em',
        fontWeight: 700,
      }}>
        {label}
      </span>

      <span style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '11px',
        fontFamily: "'IBM Plex Mono', monospace",
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        fontWeight: 700,
        color: '#0A0806',
        background: 'rgba(10,8,6,0.12)',
        padding: '8px 16px',
        borderRadius: '99px',
        whiteSpace: 'nowrap',
      }}>
        {linkText} →
      </span>
    </a>
  )
}
