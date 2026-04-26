export default function MiniCTA({ label = 'Ready to start?', linkText = 'Create your free account', href = 'https://www.timetopet.com/portal/create/create-account' }) {
  return (
    <div style={{
      padding: '20px 24px',
      borderBottom: '0.5px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '8px',
      background: 'var(--panel)',
    }}>
      <span style={{
        fontSize: '12px',
        color: 'var(--muted)',
        fontFamily: "'IBM Plex Mono', monospace",
        letterSpacing: '0.06em',
      }}>
        {label}
      </span>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        style={{
          fontSize: '12px',
          fontFamily: "'IBM Plex Mono', monospace",
          letterSpacing: '0.1em',
          color: 'var(--orange)',
          textDecoration: 'none',
          textTransform: 'uppercase',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        {linkText} →
      </a>
    </div>
  )
}
