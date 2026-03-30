export default function Footer() {
  return (
    <footer style={{
      padding: '56px 56px',
      borderTop: '0.5px solid var(--border)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      background: 'var(--panel)',
    }}>
      <div>
        <p style={{ fontFamily: 'var(--serif)', fontSize: '17px', color: 'var(--muted)', letterSpacing: '0.05em' }}>
          Can I Pet That Dawg · Walk Hard
        </p>
        <p style={{ fontSize: '13px', color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '6px' }}>
          Can I Pet That Dawg LLC · Atlanta, GA
        </p>
      </div>

      <div style={{ display: 'flex', gap: '32px' }}>
        {['Instagram', 'Substack', 'Book'].map(link => (
          <a key={link} href={`#${link.toLowerCase()}`} style={{
            fontSize: '14px', letterSpacing: '0.08em',
            textTransform: 'uppercase', color: 'var(--muted)',
          }}>
            {link}
          </a>
        ))}
      </div>
    </footer>
  )
}