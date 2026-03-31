const books = [
  { title: 'The Other End of the Leash', author: 'Patricia McConnell' },
  { title: 'Inside of a Dog', author: 'Alexandra Horowitz' },
  { title: 'Decoding Your Dog', author: 'DACVB Authors' },
]

const pods = [
  'Drinking from the Toilet',
  'The Functional Dog Collaborative',
  'Canine Conversations',
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
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '8px' }}>

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
            style={{ width: '72px', height: 'auto', objectFit: 'contain', position: 'absolute', top: '14px', right: '14px', opacity: 0.92 }}
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
            <span style={{ fontFamily: 'var(--serif)', fontSize: '22px', fontWeight: 700, color: 'var(--blue)' }}>PSI</span>
          </div>
          <p style={{ fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(226,217,198,0.5)', textAlign: 'center' }}>
            Pet Sitters International<br />Insured & Bonded
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

      {/* Books + Podcasts row */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '8px' }}>

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
            <div key={i} style={{ marginBottom: i < books.length - 1 ? '10px' : 0 }}>
              <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: '13px', color: 'var(--charcoal)', lineHeight: 1.3 }}>{b.title}</p>
              <p style={{ fontSize: '10px', color: 'var(--muted)', marginTop: '2px' }}>{b.author}</p>
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
            <p key={i} style={{ fontSize: '12px', color: 'var(--faint)', lineHeight: 1.8 }}>{p}</p>
          ))}
        </div>

      </div>

    </section>
  )
}
