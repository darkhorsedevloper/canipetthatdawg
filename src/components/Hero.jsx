export default function Hero() {
  return (
    <section style={{
      margin: '8px',
      borderRadius: '8px',
      overflow: 'hidden',
      background: 'var(--hero-bg)',
      position: 'relative',
      minHeight: '440px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
    }}>

      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: '8px',
      }}>
        <div style={{
          width: '160px', height: '110px',
          border: '0.5px solid rgba(196,137,42,0.2)',
          borderRadius: '4px',
        }}/>
        <p style={{ fontSize: '13px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(196,137,42,0.6)' }}>
          Hero Photo
        </p>
        <p style={{ fontSize: '13px', color: 'rgba(226,217,198,0.5)', textAlign: 'center', maxWidth: '180px', lineHeight: '1.5' }}>
          Crickett + Kira — trail, natural light
        </p>
      </div>

      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(18,14,11,0.99) 0%, rgba(18,14,11,0.35) 55%, transparent 100%)',
      }}/>

      <div className="hero-content">

        <div style={{
          fontSize: '13px', letterSpacing: '0.18em', textTransform: 'uppercase',
          color: 'var(--green)', marginBottom: '18px',
          display: 'flex', alignItems: 'center', gap: '10px',
        }}>
          <span style={{ display: 'block', width: '24px', height: '1px', background: 'var(--green)' }}/>
          Can I Pet That Dawg LLC · Atlanta, GA
        </div>

        <h1 className="hero-title" style={{
          fontFamily: 'var(--serif)',
          fontWeight: 400,
          color: '#EDE5D2',
        }}>
          Dogs who need more<br/>
          than a walk deserve<br/>
          <em style={{ color: 'var(--orange)' }}>the real thing.</em>
        </h1>

        <p style={{
          fontSize: '15px', lineHeight: 1.75,
          color: 'rgba(226,217,198,0.85)', maxWidth: '400px', marginBottom: '32px',
        }}>
          Enrichment-first sessions, adventure hikes, and overnight care — behavioral expertise, zero hidden fees.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '28px' }}>
          <a href="https://www.timetopet.com/portal/" target="_blank" rel="noreferrer" style={{
            fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase',
            background: 'var(--orange)', color: '#0A0806',
            padding: '14px 32px', borderRadius: '2px', fontWeight: 700,
          }}>
            Book a Session
          </a>
          <a href="#services" style={{
            fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase',
            color: 'rgba(226,217,198,0.75)',
            borderBottom: '0.5px solid rgba(226,217,198,0.5)', paddingBottom: '2px',
          }}>
            See Services
          </a>
        </div>

        <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: '13px', color: 'rgba(226,217,198,0.55)' }}>
          "Moving forward even when afraid." — Walk Hard
        </p>

      </div>
    </section>
  )
}
