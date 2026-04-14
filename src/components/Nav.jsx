export default function Nav() {
  return (
    <header className="nav-header">
      <div style={{ fontFamily: 'var(--serif)', fontSize: '18px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--charcoal)' }}>
        Can I Pet That <span style={{ color: 'var(--orange)' }}>Dawg</span>
      </div>

      <nav className="nav-links">
        {['Services', 'About', 'Field Notes'].map(link => (
          <a key={link} href={`#${link.toLowerCase().replace(' ', '-')}`} style={{ fontSize: '14px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)' }}>
            {link}
          </a>
        ))}
      </nav>

      <a href="https://www.timetopet.com/portal/create/create-account" target="_blank" rel="noreferrer" style={{ fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase', background: 'var(--charcoal)', color: '#F4EFE6', padding: '12px 24px', borderRadius: '2px' }}>
        Book Now
      </a>
    </header>
  )
}
