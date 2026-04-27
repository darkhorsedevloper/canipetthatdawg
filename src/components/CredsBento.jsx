import books from '../data/books.json'
import pods from '../data/podcasts.json'
import fearFreeLogo from '../assets/Fear Free Cert.webp'
import psiLogo from '../assets/PSI Logo.png'
import ttpLogo from '../assets/TimetoPet.png'
import psaLogo from '../assets/PSA.png'

const card = {
  borderRadius: '10px',
  border: '0.5px solid var(--border)',
}

const darkCard = {
  ...card,
  background: 'var(--hero-bg)',
  border: '1px solid var(--border-bold)',
}

const lightCard = {
  ...card,
  background: 'var(--card)',
}

export default function CredsBento() {
  return (
    <section className="section-pad" style={{ borderTop: '0.5px solid var(--border)', borderBottom: '0.5px solid var(--border)' }}>

      <p style={{ fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--green)', marginBottom: '10px', fontFamily: "'IBM Plex Mono', monospace" }}>
        Credentials
      </p>

      <h2 style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 'clamp(26px, 4vw, 42px)', fontWeight: 400, color: 'var(--charcoal)', marginBottom: '24px', lineHeight: 1.2 }}>
        What's behind the{' '}
        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontStyle: 'normal', color: 'var(--orange)' }}>work.</span>
      </h2>

      {/* Top row — dark cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', marginBottom: '10px' }}>

        {/* Fear Free */}
        <div style={{ ...darkCard, padding: '14px 16px', minHeight: 110, position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ position: 'absolute', top: 10, right: 10, width: 60, height: 60 }}>
            <img src={fearFreeLogo} alt="Fear Free Certified Professional" style={{ width: '60px', height: '60px', objectFit: 'contain' }} />
          </div>
          <div>
            <p style={{ fontSize: '9px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--green)', marginBottom: '6px', fontFamily: "'IBM Plex Mono', monospace" }}>Certification</p>
            <p style={{ fontFamily: 'var(--serif)', fontSize: '15px', color: '#EDE5D2', lineHeight: 1.3 }}>Fear Free<br/>Certified</p>
          </div>
        </div>

        {/* PSI */}
        <div style={{ ...darkCard, padding: '14px 16px', minHeight: 110, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <p style={{ fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: '6px', fontFamily: "'IBM Plex Mono', monospace" }}>Member</p>
          <img src={psiLogo} alt="Pet Sitters International" style={{ width: '70px', height: 'auto', objectFit: 'contain' }} />
          <p style={{ fontFamily: 'var(--serif)', fontSize: '15px', color: '#EDE5D2', lineHeight: 1.3, marginTop: '6px' }}>Pet Sitters<br/>International</p>
        </div>

        {/* PSA */}
        <div style={{ ...darkCard, padding: '14px 16px', minHeight: 110, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <p style={{ fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--green)', marginBottom: '6px', fontFamily: "'IBM Plex Mono', monospace" }}>Insured &amp; Bonded</p>
          <img src={psaLogo} alt="Pet Sitters Associates" style={{ width: '70px', height: 'auto', objectFit: 'contain' }} />
          <p style={{ fontFamily: 'var(--serif)', fontSize: '15px', color: '#EDE5D2', lineHeight: 1.3, marginTop: '6px' }}>Pet Sitters<br/>Associates</p>
        </div>

        {/* Time To Pet */}
        <div style={{ ...darkCard, padding: '14px 16px', minHeight: 110, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <p style={{ fontSize: '9px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: '6px', fontFamily: "'IBM Plex Mono', monospace" }}>Platform</p>
            <img src={ttpLogo} alt="Time To Pet" style={{ width: '70px', height: 'auto', objectFit: 'contain' }} />
            <p style={{ fontFamily: 'var(--serif)', fontSize: '15px', color: '#EDE5D2', lineHeight: 1.3, marginTop: '6px' }}>Time To Pet</p>
          </div>
        </div>

      </div>

      {/* Bottom row — light cards */}
      <div style={{ gap: '10px' }} className="bento-bottom">

        {/* Reading List */}
        <div style={{ ...lightCard, borderLeft: '2px solid var(--orange)', padding: '20px 20px' }}>
          <p style={{ fontSize: '9px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: '14px', fontFamily: "'IBM Plex Mono', monospace" }}>
            Reading List
          </p>
          {books.map((b, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '8px 0', borderTop: i === 0 ? 'none' : '0.5px solid var(--border)' }}>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '13px', color: 'var(--charcoal)', lineHeight: 1.3 }}>{b.title}</p>
              <p style={{ fontSize: '10px', color: 'var(--muted)', letterSpacing: '0.04em', marginLeft: '12px', flexShrink: 0, maxWidth: '45%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontFamily: "'IBM Plex Mono', monospace" }}>{b.author}</p>
            </div>
          ))}
        </div>

        {/* Podcasts */}
        <div style={{ ...lightCard, borderLeft: '2px solid var(--blue)', padding: '20px 18px' }}>
          <p style={{ fontSize: '9px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--blue)', marginBottom: '14px', fontFamily: "'IBM Plex Mono', monospace" }}>
            Podcasts
          </p>
          {pods.map((p, i) => (
            p.url ? (
              <a key={i} href={p.url} target="_blank" rel="noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', marginBottom: '8px' }}>
                <span style={{
                  width: '28px', height: '28px', borderRadius: '4px', flexShrink: 0,
                  background: 'var(--blue)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontSize: '9px', fontWeight: 700, letterSpacing: '0.04em',
                  fontFamily: "'IBM Plex Mono', monospace",
                }}>PSC</span>
                <span style={{ fontSize: '12px', color: 'var(--blue)', lineHeight: 1.3, borderBottom: '0.5px solid var(--blue)', paddingBottom: '1px' }}>
                  {p.name}
                </span>
              </a>
            ) : (
              <p key={i} style={{ fontSize: '12px', color: 'var(--faint)', lineHeight: 1.75, marginBottom: '4px', marginLeft: '38px' }}>{p.name}</p>
            )
          ))}
        </div>

      </div>

    </section>
  )
}
