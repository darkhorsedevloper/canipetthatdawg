import hero from '../data/hero.json'

export default function Hero() {
  return (
    <section style={{
      margin: '8px',
      borderRadius: '8px',
      overflow: 'hidden',
      background: 'var(--hero-bg)',
      position: 'relative',
      minHeight: '480px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
    }}>

      {/* Subtle stripe pattern over the whole hero */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'repeating-linear-gradient(135deg, rgba(255,255,255,.025) 0 20px, transparent 20px 40px)',
      }}/>

      {/* Strong two-direction gradient scrim */}
      <div style={{
        position: 'absolute', inset: 0,
        background: [
          'linear-gradient(100deg, rgba(18,14,11,0.96) 0%, rgba(18,14,11,0.85) 45%, rgba(18,14,11,0.35) 80%, rgba(18,14,11,0.2) 100%)',
          'linear-gradient(to top, rgba(18,14,11,0.95) 0%, rgba(18,14,11,0.5) 60%, rgba(18,14,11,0.2) 100%)',
        ].join(', '),
      }}/>

      {/* Photo placeholder — top right corner */}
      <div style={{
        position: 'absolute', top: 20, right: 20, zIndex: 1,
        width: 140, height: 100,
        border: '1px dashed rgba(255,255,255,0.2)',
        borderRadius: '4px',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 6,
        fontSize: '9px', letterSpacing: '.14em', textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.45)',
      }}>
        <span>Hero photo</span>
        <span style={{ fontSize: '8px', letterSpacing: '.08em', opacity: 0.7, textTransform: 'none', maxWidth: 120, textAlign: 'center', lineHeight: 1.4 }}>
          Crickett + Kira — trail
        </span>
      </div>

      <div className="hero-content">

        <div style={{
          fontSize: '12px', letterSpacing: '0.18em', textTransform: 'uppercase',
          color: 'var(--green)', marginBottom: '18px',
          display: 'flex', alignItems: 'center', gap: '10px',
        }}>
          <span style={{ display: 'block', width: '24px', height: '1px', background: 'var(--green)' }}/>
          {hero.eyebrow}
        </div>

        <h1 className="hero-title" style={{
          fontFamily: 'var(--serif)',
          fontWeight: 400,
          color: '#EDE5D2',
        }}>
          {hero.headline}<br/>
          <em style={{ color: 'var(--orange)' }}>{hero.headlineAccent}</em>
        </h1>

        <p style={{
          fontSize: '15px', lineHeight: 1.75,
          color: 'rgba(226,217,198,0.78)', maxWidth: '440px', marginBottom: '32px',
        }}>
          {hero.subheadline}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '28px', flexWrap: 'wrap' }}>
          <a href={hero.ctaUrl} target="_blank" rel="noreferrer" style={{
            fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700,
            background: 'var(--orange)', color: '#0A0806',
            padding: '14px 28px', borderRadius: '2px',
          }}>
            {hero.ctaLabel}
          </a>

          <a
            href={hero.secondaryUrl}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--green)'
              e.currentTarget.style.color = '#EDE5D2'
              e.currentTarget.querySelector('span[data-arrow]').style.transform = 'translateX(3px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)'
              e.currentTarget.style.color = 'rgba(255,255,255,0.85)'
              e.currentTarget.querySelector('span[data-arrow]').style.transform = 'translateX(0)'
            }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600,
              color: 'rgba(255,255,255,0.85)',
              padding: '14px 20px',
              border: '1px solid rgba(255,255,255,0.35)',
              borderRadius: '2px',
              transition: 'border-color 180ms, color 180ms',
            }}
          >
            {hero.secondaryLabel}
            <span data-arrow aria-hidden style={{ transition: 'transform 180ms', display: 'inline-block' }}>↓</span>
          </a>
        </div>

        <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: '13px', color: 'rgba(226,217,198,0.55)' }}>
          "{hero.quote}" — {hero.quoteAttribution}
        </p>

      </div>
    </section>
  )
}
