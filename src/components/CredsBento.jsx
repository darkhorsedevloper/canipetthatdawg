import MiniMap from './MiniMap'

const books = [
  { title: 'Lorem ipsum dolor sit amet', author: 'Auctor Placeholder', img: null },
  { title: 'Consectetur adipiscing elit', author: 'Nominus Faber', img: null },
  { title: 'Sed do eiusmod tempor', author: 'Lorem Ipsum', img: null },
  { title: 'How Stella Learned to Talk', author: 'Christina Hunger', img: null },
]

const pods = [
  { name: 'Lorem Ipsum Podcast', url: null, img: null },
  { name: 'Dolor Sit Amet Show', url: null, img: null },
  { name: 'Consectetur Daily', url: null, img: null },
  { name: 'Pet Sitter Confessional', url: 'https://www.petsitterconfessional.com/', img: '/PetSitterC.png' },
]

export default function CredsBento() {
  return (
    <section className="section-pad" style={{ borderTop: '0.5px solid var(--border)', borderBottom: '0.5px solid var(--border)' }}>

      <p style={{ fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--green)', marginBottom: '8px' }}>
        Credentials
      </p>
      <h2 style={{ fontFamily: 'var(--serif)', fontSize: '28px', fontWeight: 400, color: 'var(--charcoal)', marginBottom: '20px', lineHeight: 1.25 }}>
        What's behind the <em style={{ color: 'var(--orange)' }}>work.</em>
      </h2>

      {/* Badge row */}
      <div className="bento-badges">

        {/* Fear Free — badge as seal */}
        <div style={{
          background: 'var(--charcoal)',
          border: '0.5px solid var(--border)',
          borderRadius: '6px',
          padding: '20px 16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: '140px',
          position: 'relative',
        }}>
          <img
            src="/fearfree.png"
            alt="Fear Free Certified Professional"
            className="fearfree-seal"
          />
          <div>
            <p style={{ fontSize: '9px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--green)', marginBottom: '8px' }}>Certification</p>
            <p style={{ fontFamily: 'var(--serif)', fontSize: '15px', color: '#EDE5D2', lineHeight: 1.3 }}>Fear Free<br />Certified</p>
          </div>
          <p style={{ fontSize: '10px', color: 'rgba(226,217,198,0.45)', lineHeight: 1.6, maxWidth: '130px' }}>
            Trained to reduce stress &amp; read behavioral signals.
          </p>
        </div>

        {/* PSI — placeholder until image added */}
        <div style={{
          background: 'var(--charcoal)',
          border: '0.5px solid var(--border)',
          borderRadius: '6px',
          padding: '24px 16px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          minHeight: '140px',
        }}>
          <div style={{ border: '2px solid var(--blue)', borderRadius: '50%', width: '64px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: 'var(--serif)', fontSize: '16px', fontWeight: 700, color: 'var(--blue)', textAlign: 'center', lineHeight: 1.1 }}>PSA</span>
          </div>
          <p style={{ fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(226,217,198,0.5)', textAlign: 'center' }}>
            Pet Sitters Associates<br />Insured & Bonded
          </p>
        </div>

        {/* Time To Pet — placeholder until image added */}
        <div style={{
          background: 'var(--charcoal)',
          border: '0.5px solid var(--border)',
          borderRadius: '6px',
          padding: '24px 16px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          minHeight: '140px',
        }}>
          <div style={{ border: '2px solid var(--orange)', borderRadius: '4px', padding: '8px 14px' }}>
            <span style={{ fontFamily: 'var(--serif)', fontSize: '13px', fontWeight: 700, color: 'var(--orange)', letterSpacing: '0.06em' }}>TIME TO PET</span>
          </div>
          <p style={{ fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(226,217,198,0.5)', textAlign: 'center' }}>
            Client Portal<br />Active
          </p>
        </div>

      </div>

      {/* Service area map cell */}
      <div style={{
        border: '0.5px solid var(--border)',
        borderRadius: '6px',
        overflow: 'hidden',
        marginBottom: '8px',
      }}>
        <div style={{ padding: '10px 14px', background: 'var(--panel)', borderBottom: '0.5px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontSize: '9px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--green)' }}>Service Area</p>
          <p style={{ fontSize: '9px', color: 'var(--muted)' }}>Atlanta 30318 · 10 mi</p>
        </div>
        <MiniMap height={130} />
      </div>

      {/* Books + Podcasts row */}
      <div className="bento-bottom">

        {/* Books */}
        <div style={{
          background: 'var(--card)',
          borderTop: '0.5px solid var(--border)',
          borderRight: '0.5px solid var(--border)',
          borderBottom: '0.5px solid var(--border)',
          borderLeft: '2px solid var(--orange)',
          borderRadius: '0 4px 4px 0',
          padding: '20px 18px',
        }}>
          <p style={{ fontSize: '9px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: '14px' }}>
            Reading List
          </p>
          {books.map((b, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: i < books.length - 1 ? '10px' : 0 }}>
              {b.img && (
  <div style={{
    width: '36px', height: '36px', borderRadius: '4px', flexShrink: 0,
    backgroundImage: `url(${b.img})`,
    backgroundSize: '300%',
    backgroundPosition: 'center center',
  }} />
)}
              <div>
                <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: '13px', color: 'var(--charcoal)', lineHeight: 1.3 }}>{b.title}</p>
                <p style={{ fontSize: '10px', color: 'var(--muted)', marginTop: '2px' }}>{b.author}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Podcasts */}
        <div style={{
          background: 'var(--card)',
          borderTop: '0.5px solid var(--border)',
          borderRight: '0.5px solid var(--border)',
          borderBottom: '0.5px solid var(--border)',
          borderLeft: '2px solid var(--blue)',
          borderRadius: '0 4px 4px 0',
          padding: '20px 16px',
        }}>
          <p style={{ fontSize: '9px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--blue)', marginBottom: '14px' }}>
            Podcasts
          </p>
          {pods.map((p, i) => (
            p.url ? (
              <a key={i} href={p.url} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', marginBottom: i < pods.length - 1 ? '6px' : 0 }}>
                {p.img && <img src={p.img} alt={p.name} style={{ width: '32px', height: '32px', borderRadius: '4px', objectFit: 'contain', flexShrink: 0, background: 'var(--card)' }} />}
                <span style={{ fontSize: '12px', color: 'var(--blue)', lineHeight: 1.4, borderBottom: '0.5px solid var(--blue)', paddingBottom: '1px' }}>{p.name}</span>
              </a>
            ) : (
              <p key={i} style={{ fontSize: '12px', color: 'var(--faint)', lineHeight: 1.8, marginBottom: i < pods.length - 1 ? '2px' : 0 }}>{p.name}</p>
            )
          ))}
        </div>

      </div>

    </section>
  )
}
