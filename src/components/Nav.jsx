import { useState } from 'react'

const links = ['Services', 'About', 'Field Notes']

// Sliding paw pill — dark mode toggle
function ModeSwitch({ dark, onToggle }) {
  const w = 58, h = 30, pad = 3, ball = 24, glyph = 14
  return (
    <button
      onClick={onToggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={dark ? 'Light mode' : 'Dark mode'}
      style={{
        width: w, height: h,
        background: dark ? 'var(--panel)' : 'var(--charcoal)',
        border: '1px solid var(--border)',
        borderRadius: 999,
        padding: pad,
        position: 'relative',
        cursor: 'pointer',
        transition: 'background 700ms cubic-bezier(.4,.14,.3,1)',
        flexShrink: 0,
        overflow: 'hidden',
        cursor: 'inherit',
      }}
    >
      {/* Ambient paw prints in track */}
      <span aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        display: 'flex', alignItems: 'center',
        paddingLeft: 6, paddingRight: 6,
        justifyContent: 'space-between',
        opacity: 0.28, fontSize: Math.round(glyph * 0.55),
      }}>
        <span style={{ color: dark ? 'var(--orange)' : '#F4EFE6', transform: 'rotate(-18deg)', display: 'inline-block' }}>🐾</span>
        <span style={{ color: dark ? 'var(--orange)' : '#F4EFE6', transform: 'rotate(8deg)',  display: 'inline-block' }}>🐾</span>
        <span style={{ color: dark ? 'var(--orange)' : '#F4EFE6', transform: 'rotate(-6deg)', display: 'inline-block' }}>🐾</span>
      </span>

      {/* Sliding paw ball */}
      <span style={{
        position: 'absolute',
        top: pad, left: pad,
        width: ball, height: ball,
        background: dark ? 'var(--orange)' : '#F4EFE6',
        borderRadius: '50%',
        transform: `translateX(${dark ? w - ball - pad * 2 : 0}px) rotate(${dark ? 12 : -12}deg)`,
        transition: 'transform 460ms cubic-bezier(.4,1.5,.4,1), background 360ms',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: glyph, lineHeight: 1,
      }}>
        🐾
      </span>
    </button>
  )
}

export default function Nav({ dark, onToggleDark }) {
  const [open, setOpen] = useState(false)

  return (
    <header style={{
      borderBottom: '0.5px solid var(--border)',
      background: 'var(--bg)',
      position: 'sticky', top: 0, zIndex: 50,
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
    }}>
      <div className="nav-header">
        <div style={{ fontFamily: 'var(--serif)', fontSize: '18px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--charcoal)' }}>
          Can I Pet That <span style={{ color: 'var(--orange)' }}>Dawg?</span>
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
          {/* Sliding paw mode switch */}
          <ModeSwitch dark={dark} onToggle={onToggleDark} />

          {/* Log In */}
          <a href="https://www.timetopet.com/portal" target="_blank" rel="noreferrer" className="nav-book-btn" style={{ background: 'transparent', border: '1px solid var(--border-bold)', color: 'var(--charcoal)' }}>
            Log In
          </a>

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
