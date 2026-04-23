const DAWG = [
  { name: 'Kira',    breed: 'Belgian Malinois', note: 'earned her off-leash recall this week',  color: 'var(--green)'  },
  { name: 'Biscuit', breed: 'Mini Poodle',      note: 'first hike over 2 miles — total champ',  color: 'var(--orange)' },
  { name: 'Marlow',  breed: 'Lab mix',          note: 'finally drank from the creek',           color: 'var(--blue)'   },
  { name: 'Otis',    breed: 'Heeler',           note: "is learning 'settle' at coffee patios",  color: 'var(--green)'  },
]

export default function DawgOfTheDay() {
  const d = new Date()
  const dog = DAWG[(d.getDate() + d.getMonth()) % DAWG.length]
  const label = d.toLocaleDateString(undefined, { month: 'long', day: 'numeric' })

  return (
    <section className="section-pad" style={{
      background: 'var(--panel)',
      borderTop: '0.5px solid var(--border)',
      borderBottom: '0.5px solid var(--border)',
    }}>

      <div className="dotd-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 3fr)',
        gap: '28px',
        alignItems: 'center',
      }}>

        {/* Portrait placeholder */}
        <div style={{
          aspectRatio: '1',
          background: 'var(--hero-bg)',
          borderRadius: '8px',
          border: '0.5px solid var(--border)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: '10px',
          backgroundImage: 'repeating-linear-gradient(135deg, rgba(255,255,255,.03) 0 12px, transparent 12px 24px)',
        }}>
          <div style={{
            width: '90px', height: '90px', borderRadius: '50%',
            border: `2px solid ${dog.color}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '40px',
          }}>
            🐕
          </div>
          <p style={{
            fontFamily: 'var(--sans)', fontSize: '10px',
            letterSpacing: '0.12em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.4)',
          }}>
            {dog.name} — portrait
          </p>
        </div>

        <div>
          <p style={{
            fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase',
            color: dog.color, marginBottom: '10px',
          }}>
            ★ Dawg of the Day — {label}
          </p>

          <h2 style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(38px, 6vw, 64px)', fontWeight: 400, lineHeight: 1,
            color: 'var(--charcoal)', marginBottom: '12px',
          }}>
            {dog.name}
          </h2>

          <p style={{
            fontFamily: 'var(--serif)',
            fontSize: '14px', letterSpacing: '0.06em', color: 'var(--muted)', marginBottom: '14px',
          }}>
            — {dog.breed}
          </p>

          <p style={{
            fontSize: '15px', lineHeight: 1.65, color: 'var(--charcoal)',
            maxWidth: '460px', marginBottom: '18px',
          }}>
            <span style={{ color: dog.color, fontWeight: 700 }}>This week</span> {dog.note}.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: 'var(--faint)' }}>
            <span style={{
              width: '8px', height: '8px',
              background: dog.color, borderRadius: '50%',
              animation: 'dotd-blink 1.6s step-end infinite',
              flexShrink: 0,
            }}/>
            Fresh from today's session
          </div>
        </div>

      </div>

      <style>{`
        @keyframes dotd-blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @media (max-width: 640px) {
          .dotd-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

    </section>
  )
}
