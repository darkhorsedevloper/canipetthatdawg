import posts from '../data/blog.json'

const SUBSTACK = 'https://substack.com/@petthatdawg'

const livePosts = posts.filter(p => p.title)

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

      {livePosts.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginBottom: '28px' }}>
          {livePosts.map((post, i) => (
            <a
              key={i}
              href={post.url || SUBSTACK}
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                gap: '16px',
                padding: '14px 0',
                borderBottom: '0.5px solid var(--border)',
                textDecoration: 'none',
                color: 'var(--charcoal)',
              }}
            >
              <span style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '14px',
                lineHeight: 1.4,
                flex: 1,
              }}>
                {post.title}
                {post.excerpt && (
                  <span style={{ display: 'block', fontSize: '12px', color: 'var(--muted)', marginTop: '4px', fontFamily: "'Space Mono', monospace" }}>
                    {post.excerpt}
                  </span>
                )}
              </span>
              <span style={{ fontSize: '11px', color: 'var(--muted)', whiteSpace: 'nowrap', fontFamily: "'IBM Plex Mono', monospace" }}>
                {post.date}
              </span>
            </a>
          ))}
        </div>
      )}

      <a
        href={SUBSTACK}
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
