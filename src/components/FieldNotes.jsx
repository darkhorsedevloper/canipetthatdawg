export default function FieldNotes() {
  return (
    <section id="blog" className="section-pad" style={{ borderTop: '0.5px solid var(--border)', borderBottom: '0.5px solid var(--border)' }}>

      <p style={{ fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--green)', marginBottom: '10px', fontFamily: "'IBM Plex Mono', monospace" }}>
        Field Notes
      </p>

      <h2 style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 'clamp(26px, 4vw, 42px)', fontWeight: 400, color: 'var(--charcoal)', marginBottom: '16px', lineHeight: 1.2 }}>
        From the{' '}
        <span style={{ color: 'var(--orange)' }}>journal.</span>
      </h2>

      <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '14px', color: 'var(--muted)', lineHeight: 1.8, marginBottom: '24px', maxWidth: '480px' }}>
        Notes on dog behavior, Fear Free handling, life on the trail, and what I'm learning on the job. Published on Substack.
      </p>

      <a
        href="https://substack.com/@petthatdawg"
        target="_blank"
        rel="noreferrer"
        style={{
          display: 'inline-block',
          fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase',
          fontFamily: "'IBM Plex Mono', monospace",
          color: 'var(--orange)', borderBottom: '1px solid var(--orange)', paddingBottom: '2px',
        }}
      >
        Read on Substack →
      </a>

    </section>
  )
}
