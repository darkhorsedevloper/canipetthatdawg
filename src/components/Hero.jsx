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

      {/* Subtle stripe pattern */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'repeating-linear-gradient(135deg, rgba(255,255,255,.025) 0 20px, transparent 20px 40px)',
      }}/>

      {/* Two-direction gradient scrim */}
      <div style={{
        position: 'absolute', inset: 0,
        background: [
          'linear-gradient(100deg, rgba(18,14,11,0.96) 0%, rgba(18,14,11,0.85) 45%, rgba(18,14,11,0.35) 80%, rgba(18,14,11,0.2) 100%)',
          'linear-gradient(to top, rgba(18,14,11,0.95) 0%, rgba(18,14,11,0.5) 60%, rgba(18,14,11,0.2) 100%)',
        ].join(', '),
      }}/>

      {/* Photo placeholder — top right */}
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

        {/* Eyebrow */}
        <div style={{
          fontSize: '12px', letterSpacing: '0.18em', textTransform: 'uppercase',
          color: 'var(--green)', marginBottom: '18px',
          display: 'flex', alignItems: 'center', gap: '10px',
          fontFamily: "'IBM Plex Mono', monospace",
        }}>
          <span style={{ display: 'block', width: '24px', height: '1px', background: 'var(--green)' }}/>
          {hero.eyebrow}
        </div>

        {/* Headline — IBM Plex Mono upright + Instrument Serif italic accent */}
        <h1 className="hero-title" style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontWeight: 700,
          color: '#EDE5D2',
          letterSpacing: '0.01em',
        }}>
          {hero.headline}<br/>
          <em style={{
            fontFamily: "'Instrument Serif', serif",
            fontStyle: 'italic',
            fontWeight: 400,
            color: 'var(--orange)',
          }}>
            {hero.headlineAccent}
          </em>
        </h1>

        <p style={{
          fontSize: '15px', lineHeight: 1.75,
          color: 'rgba(226,217,198,0.78)', maxWidth: '440px', marginBottom: '32px',
          fontFamily: "'IBM Plex Mono', monospace",
        }}>
          {hero.subheadline}
        </p>

        {/* Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px', flexWrap: 'wrap' }}>

          {/* Primary — solid amber */}
          <a
            href={hero.ctaUrl}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center',
              background: 'var(--orange)', color: '#0A0806',
              padding: '14px 28px', borderRadius: '8px',
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
              textDecoration: 'none',
            }}
          >
            {hero.ctaLabel}
          </a>

          {/* Secondary — dark border, two amber-highlight inner blocks */}
          <a
            href={hero.secondaryUrl}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '5px',
              border: '1.5px solid rgba(196,137,42,0.45)',
              borderRadius: '8px',
              padding: '5px 6px',
              background: 'transparent',
              textDecoration: 'none',
            }}
          >
            <span style={{
              background: 'var(--orange)', color: '#0A0806',
              padding: '9px 16px', borderRadius: '4px',
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
              display: 'inline-flex', alignItems: 'center',
            }}>
              {hero.secondaryLabel}
            </span>
            <span style={{
              background: 'var(--orange)', color: '#0A0806',
              padding: '9px 12px', borderRadius: '4px',
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '13px', fontWeight: 700,
              display: 'inline-flex', alignItems: 'center',
            }}>
              ↓
            </span>
          </a>

        </div>

        <p style={{
          fontFamily: "'Instrument Serif', serif",
          fontStyle: 'italic', fontSize: '13px',
          color: 'rgba(226,217,198,0.55)',
        }}>
          "{hero.quote}" — {hero.quoteAttribution}
        </p>

      </div>
    </section>
  )
}
