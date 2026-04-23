const books = [
  { title: 'The Other End of the Leash', author: 'Patricia McConnell' },
  { title: "Don't Shoot the Dog",        author: 'Karen Pryor' },
  { title: 'How Stella Learned to Talk', author: 'Christina Hunger' },
  { title: 'For the Love of a Dog',      author: 'Patricia McConnell' },
]

const pods = [
  { name: 'Pet Sitter Confessional',  url: 'https://www.petsitterconfessional.com/', initials: 'PSC' },
  { name: 'Drinking From the Toilet', url: null },
  { name: 'Canine Conversations',     url: null },
]

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
        <em style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', color: 'var(--orange)' }}>work.</em>
      </h2>

      {/* Top row — dark cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', marginBottom: '10px' }}>

        {/* Fear Free */}
        <div style={{ ...darkCard, padding: '22px 18px', minHeight: 170, position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ position: 'absolute', top: 14, right: 14, width: 84, height: 84 }}>
            <svg viewBox="0 0 100 100" width="84" height="84" aria-label="Fear Free Certified Professional">
              <defs>
                <path id="ff-top" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0" fill="none"/>
                <path id="ff-bot" d="M 50,50 m -32,0 a 32,32 0 1,0 64,0" fill="none"/>
              </defs>
              <circle cx="50" cy="50" r="48" fill="none" stroke="var(--orange)" strokeWidth="1.2"/>
              <circle cx="50" cy="50" r="44" fill="none" stroke="var(--orange)" strokeWidth="0.6" opacity="0.6"/>
              <circle cx="50" cy="50" r="27" fill="var(--orange)"/>
              <g fill="var(--hero-bg)" transform="translate(50 50)">
                <ellipse cx="0"  cy="4"  rx="7"   ry="6"/>
                <ellipse cx="-8" cy="-5" rx="2.6" ry="3.4"/>
                <ellipse cx="-3" cy="-9" rx="2.3" ry="3.2"/>
                <ellipse cx="3"  cy="-9" rx="2.3" ry="3.2"/>
                <ellipse cx="8"  cy="-5" rx="2.6" ry="3.4"/>
              </g>
              <text fill="var(--orange)" fontFamily="'IBM Plex Mono', monospace" fontSize="6.4" letterSpacing="1.3" fontWeight="700">
                <textPath href="#ff-top" startOffset="50%" textAnchor="middle">FEAR FREE CERTIFIED</textPath>
              </text>
              <text fill="var(--orange)" fontFamily="'IBM Plex Mono', monospace" fontSize="5.2" letterSpacing="1.6" fontWeight="500">
                <textPath href="#ff-bot" startOffset="50%" textAnchor="middle">★   PROFESSIONAL   ★</textPath>
              </text>
            </svg>
          </div>
          <div>
            <p style={{ fontSize: '9px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--green)', marginBottom: '8px', fontFamily: "'IBM Plex Mono', monospace" }}>Certification</p>
            <p style={{ fontFamily: 'var(--serif)', fontSize: '17px', color: '#EDE5D2', lineHeight: 1.3 }}>Fear Free<br/>Certified</p>
          </div>
          <p style={{ fontSize: '11px', color: 'rgba(237,229,210,0.5)', lineHeight: 1.6, maxWidth: '130px', marginTop: '10px' }}>
            Trained to reduce stress &amp; read behavioral signals.
          </p>
        </div>

        {/* PSI + PSA stacked */}
        <div style={{ ...darkCard, overflow: 'hidden', display: 'flex', flexDirection: 'column', minHeight: 170 }}>
          <div style={{ flex: 1, padding: '18px 18px', borderBottom: '0.5px solid rgba(237,229,210,0.1)' }}>
            <p style={{ fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: '5px', fontFamily: "'IBM Plex Mono', monospace" }}>Member</p>
            <p style={{ fontFamily: 'var(--serif)', fontSize: '17px', color: '#EDE5D2', lineHeight: 1.3 }}>Pet Sitters<br/>International</p>
          </div>
          <div style={{ flex: 1, padding: '18px 18px' }}>
            <p style={{ fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--green)', marginBottom: '5px', fontFamily: "'IBM Plex Mono', monospace" }}>Insured &amp; Bonded</p>
            <p style={{ fontFamily: 'var(--serif)', fontSize: '17px', color: '#EDE5D2', lineHeight: 1.3 }}>Pet Sitters<br/>Associates</p>
          </div>
        </div>

        {/* Time To Pet */}
        <div style={{ ...darkCard, padding: '24px 18px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '14px', minHeight: 170 }}>
          <div style={{ border: '2px solid var(--orange)', borderRadius: '6px', padding: '10px 18px' }}>
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '13px', fontWeight: 700, color: 'var(--orange)', letterSpacing: '0.08em' }}>TIME TO PET</span>
          </div>
          <p style={{ fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(237,229,210,0.45)', textAlign: 'center', lineHeight: 1.6, fontFamily: "'IBM Plex Mono', monospace" }}>
            Client Portal<br/>Active
          </p>
        </div>

      </div>

      {/* Bottom row — light cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '10px' }} className="bento-bottom">

        {/* Reading List */}
        <div style={{ ...lightCard, borderLeft: '2px solid var(--orange)', padding: '20px 20px' }}>
          <p style={{ fontSize: '9px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: '14px', fontFamily: "'IBM Plex Mono', monospace" }}>
            Reading List
          </p>
          {books.map((b, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '8px 0', borderTop: i === 0 ? 'none' : '0.5px solid var(--border)' }}>
              <p style={{ fontFamily: "'Space Mono', monospace", fontStyle: 'italic', fontSize: '13px', color: 'var(--charcoal)', lineHeight: 1.3 }}>{b.title}</p>
              <p style={{ fontSize: '10px', color: 'var(--muted)', letterSpacing: '0.04em', marginLeft: '12px', whiteSpace: 'nowrap', fontFamily: "'IBM Plex Mono', monospace" }}>{b.author}</p>
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
