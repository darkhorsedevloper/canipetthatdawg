import { useState } from 'react'

const links = ['Services', 'About', 'Field Notes']

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <header style={{ borderBottom: '0.5px solid var(--border)', background: 'var(--bg)', position: 'relative' }}>
      <div className="nav-header">
        <div style={{ fontFamily: 'var(--serif)', fontSize: '18px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--charcoal)' }}>
          Can I Pet That <span style={{ color: 'var(--orange)' }}>Dawg</span>
        </div>

        {/* Desktop links */}
        <nav className="nav-links">
          {links.map(link => (
            <a key={link} href={`#${link.toLowerCase().replace(' ', '-')}`} style={{ fontSize: '14px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)' }}>
              {link}
            </a>
          ))}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Book Now — always visible */}
          <a href="https://www.timetopet.com/portal/create/create-account" target="_blank" rel="noreferrer" className="nav-book-btn">
            Book Now
          </a>

          {/* Hamburger — mobile only */}
          <button
            className="nav-hamburger"
            onClick={() => setOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span style={{ display: 'block', width: '20px', height: '1.5px', background: 'var(--charcoal)', marginBottom: '5px', transition: 'transform 0.2s', transform: open ? 'rotate(45deg) translate(4px, 4px)' : 'none' }} />
            <span style={{ display: 'block', width: '20px', height: '1.5px', background: 'var(--charcoal)', transition: 'opacity 0.2s', opacity: open ? 0 : 1 }} />
            <span style={{ display: 'block', width: '20px', height: '1.5px', background: 'var(--charcoal)', marginTop: '5px', transition: 'transform 0.2s', transform: open ? 'rotate(-45deg) translate(4px, -4px)' : 'none' }} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="nav-mobile-menu">
          {links.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(' ', '-')}`}
              onClick={() => setOpen(false)}
              style={{ display: 'block', fontSize: '13px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--charcoal)', padding: '14px 24px', borderBottom: '0.5px solid var(--border)' }}
            >
              {link}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}
