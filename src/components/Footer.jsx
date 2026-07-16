import { FaInstagram, FaGithub, FaDog, FaCat, FaLaptopCode } from 'react-icons/fa'
import { SiSubstack } from 'react-icons/si'
import { BsCalendarCheck } from 'react-icons/bs'

const links = [
  {
    icon: <FaInstagram size={22} />,
    href: 'https://www.instagram.com/pet_that_dawg/',
    label: 'Instagram',
  },
  {
    icon: <SiSubstack size={20} />,
    href: 'https://substack.com/@petthatdawg',
    label: 'Substack',
  },
  {
    icon: <BsCalendarCheck size={20} />,
    href: 'https://www.timetopet.com/portal/create',
    label: 'Book',
  },
  {
    icon: <FaGithub size={22} />,
    href: 'https://github.com/darkhorsedevloper',
    label: 'GitHub',
  },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div>
          <p style={{ fontFamily: 'var(--serif)', fontSize: '17px', letterSpacing: '0.05em' }}>
            <span style={{ color: 'var(--charcoal)' }}>Can I Pet That </span>
            <span style={{ color: 'var(--orange)' }}>Dawg?</span>
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
      </div>

      {/* Colophon — the "who built this?" scroll ends here.
          Dog + cat = Sit. Stay. (the pet care); laptop = Ship. (the code) */}
      <div className="footer-credit">
        <p className="footer-credit-tag">
          <span className="footer-credit-icons" aria-hidden="true">
            <FaDog size={17} />
            <FaCat size={17} />
            <FaLaptopCode size={17} />
          </span>
          <span className="footer-credit-tagline">Sit. Stay. Ship.</span>
        </p>
        <p className="footer-credit-pitch">
          I build websites &amp; tools for small businesses, too.{' '}
          <a href="https://github.com/darkhorsedevloper" target="_blank" rel="noreferrer">
            github.com/darkhorsedevloper
          </a>
          {' · '}
          <a href="mailto:crickett@canipetthatdawg.co">crickett@canipetthatdawg.co</a>
        </p>
      </div>
    </footer>
  )
}
