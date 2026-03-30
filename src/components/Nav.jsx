export default function Nav() {
  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '28px 56px',
      borderBottom: '0.5px solid var(--border)',
      background: 'var(--bg)',
    }}>
      <div style={{ fontFamily: 'var(--serif)', fontSize: '18px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--charcoal)' }}>
        Can I Pet That <span style={{ color: 'var(--orange)' }}>Dawg</span>
      </div>

      <nav style={{ display: 'flex', gap: '32px' }}>
        {['Services', 'About', 'Field Notes', 'Book'].map(link => (
          <a key={link} href={`#${link.toLowerCase().replace(' ', '-')}`} style={{ fontSize: '14px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)' }}>
            {link}
          </a>
        ))}
      </nav>

      <a href="#book" style={{ fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase', background: 'var(--charcoal)', color: '#F4EFE6', padding: '12px 24px', borderRadius: '2px' }}>
        Book Now
      </a>
    </header>
  )
}