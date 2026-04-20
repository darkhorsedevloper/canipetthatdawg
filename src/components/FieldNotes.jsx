const posts = [
  { title: 'What your dog is actually saying on the walk', date: 'Mar 2026' },
  { title: 'Kira learns to ask for water', date: 'Feb 2026' },
  { title: 'Why enrichment matters more than mileage', date: 'Jan 2026' },
]

export default function FieldNotes() {
  return (
    <section id="field-notes" className="section-pad">

      <p style={{ fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--green)', marginBottom: '8px' }}>
        Field Notes
      </p>

      <h2 style={{ fontFamily: 'var(--serif)', fontSize: '28px', fontWeight: 400, color: 'var(--charcoal)', marginBottom: '4px' }}>
        From the journal.
      </h2>

      <div>
        {posts.map((p, i) => (
          <a key={i} href="#" style={{
            display: 'flex',
            borderTop: '0.5px solid var(--border)',
            borderBottom: i === posts.length - 1 ? '0.5px solid var(--border)' : 'none',
            padding: '20px 0',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            gap: '16px',
            textDecoration: 'none',
            transition: 'padding 180ms',
          }}
          onMouseEnter={e => e.currentTarget.style.paddingLeft = '8px'}
          onMouseLeave={e => e.currentTarget.style.paddingLeft = '0'}
          >
            <p style={{ fontFamily: 'var(--serif)', fontSize: '17px', color: 'var(--charcoal)', lineHeight: 1.3 }}>
              {p.title}
            </p>
            <span style={{ fontSize: '10px', color: 'var(--muted)', letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>
              {p.date}
            </span>
          </a>
        ))}
      </div>

      <a href="https://substack.com" target="_blank" rel="noreferrer" style={{
        display: 'inline-block', marginTop: '18px',
        fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase',
        color: 'var(--green)', borderBottom: '0.5px solid var(--green)', paddingBottom: '2px',
      }}>
        All field notes on Substack →
      </a>

    </section>
  )
}
