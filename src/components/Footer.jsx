import { FaInstagram } from 'react-icons/fa'
import { SiSubstack } from 'react-icons/si'
import { BsCalendarCheck } from 'react-icons/bs'

const links = [
  {
    icon: <FaInstagram size={22} />,
    href: 'https://www.instagram.com/can_i_petthatdawgllc/',
    label: 'Instagram',
  },
  {
    icon: <SiSubstack size={20} />,
    href: 'https://substack.com/@canipetthatdawg',
    label: 'Substack',
  },
  {
    icon: <BsCalendarCheck size={20} />,
    href: '#book',
    label: 'Book',
  },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div>
        <p style={{ fontFamily: 'var(--serif)', fontSize: '17px', color: 'var(--charcoal)', letterSpacing: '0.05em' }}>
          Can I Pet That Dawg · Walk Hard
        </p>
        <p style={{ fontSize: '13px', color: 'var(--faint)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '6px' }}>
          Can I Pet That Dawg LLC · Atlanta, GA
        </p>
      </div>

      <div className="footer-links">
        {links.map(({ icon, href, label }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel={href.startsWith('http') ? 'noreferrer' : undefined}
            aria-label={label}
            className="footer-icon-link"
          >
            {icon}
          </a>
        ))}
      </div>
    </footer>
  )
}
