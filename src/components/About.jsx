export default function About() {
  return (
    <section id="about" className="about-grid">

      <div className="about-photo">
        <p style={{ fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(196,137,42,0.4)', textAlign: 'center', padding: '0 20px', lineHeight: 1.6 }}>
          Crickett + Kira<br />golden hour portrait
        </p>
      </div>

      <div style={{ padding: '32px 24px', background: 'var(--bg)' }}>
        <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: '19px', color: 'var(--faint)', lineHeight: 1.45, marginBottom: '16px' }}>
          "I'm not here to be <strong style={{ fontStyle: 'normal', color: 'var(--orange)' }}>loved by every dog.</strong> I'm here to actually know them."
        </p>

        <p style={{ fontSize: '12px', color: 'var(--muted)', lineHeight: 1.7, marginBottom: '16px' }}>
          Former SF software engineer. Lifelong equestrian. I combine behavioral depth, real field experience, and tech-forward systems — because your dog deserves a professional, not a neighbor with free afternoons.
        </p>

        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '18px' }}>
          {[
            { label: 'Fear Free Certified', color: 'var(--green)' },
            { label: 'SF Engineering', color: 'var(--blue)' },
            { label: 'Lifelong Equestrian', color: 'var(--orange)' },
          ].map(tag => (
            <span key={tag.label} style={{
              fontSize: '9px', letterSpacing: '0.08em', textTransform: 'uppercase',
              padding: '4px 10px', borderRadius: '20px',
              background: `color-mix(in srgb, ${tag.color} 12%, transparent)`,
              color: tag.color,
            }}>
              {tag.label}
            </span>
          ))}
        </div>

        <a href="#about" style={{ fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', borderBottom: '0.5px solid var(--border)', paddingBottom: '2px' }}>
          Full story →
        </a>
      </div>

    </section>
  )
}
