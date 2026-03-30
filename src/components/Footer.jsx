export default function Footer() {
  return (
    <footer className="footer">
      <div>
        <p style={{ fontFamily: 'var(--serif)', fontSize: '17px', color: 'var(--muted)', letterSpacing: '0.05em' }}>
          Can I Pet That Dawg · Walk Hard
        </p>
        <p style={{ fontSize: '13px', color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '6px' }}>
          Can I Pet That Dawg LLC · Atlanta, GA
        </p>
      </div>

      <div className="footer-links">
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
