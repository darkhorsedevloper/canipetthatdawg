export default function EveryVisit() {
  return (
    <section className="section-pad" style={{
      borderTop: '0.5px solid var(--border)',
      borderBottom: '0.5px solid var(--border)',
      background: 'var(--panel)',
    }}>

      <p style={{
        fontSize: '10px',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: 'var(--green)',
        marginBottom: '10px',
        fontFamily: "'IBM Plex Mono', monospace",
      }}>
        Every Visit
      </p>

      <h2 style={{
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: 'clamp(24px, 4vw, 38px)',
        fontWeight: 400,
        lineHeight: 1.2,
        color: 'var(--charcoal)',
        marginBottom: '10px',
      }}>
        You'll always know what happened.
      </h2>

      <p style={{
        fontSize: '13px',
        color: 'var(--muted)',
        fontFamily: "'IBM Plex Mono', monospace",
        marginBottom: '32px',
        maxWidth: '520px',
        lineHeight: 1.7,
      }}>
        Every session is logged through{' '}
        <a
          href="https://www.timetopet.com"
          target="_blank"
          rel="noreferrer"
          style={{ color: 'var(--orange)', textDecoration: 'none', borderBottom: '1px solid var(--orange)' }}
        >
          "Time to Pet"
        </a>
        {' '}— a professional pet care platform built for accountability and communication.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '12px',
      }}>

        {/* GPS */}
        <div style={{
          background: 'var(--card)',
          border: '0.5px solid var(--border)',
          borderLeft: '2px solid var(--green)',
          borderRadius: '10px',
          padding: '24px',
        }}>
          <p style={{
            fontSize: '28px',
            marginBottom: '14px',
            lineHeight: 1,
          }}>📍</p>
          <p style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '14px',
            fontWeight: 600,
            color: 'var(--charcoal)',
            marginBottom: '8px',
            letterSpacing: '0.04em',
          }}>
            GPS Tracking
          </p>
          <p style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '12px',
            color: 'var(--muted)',
            lineHeight: 1.7,
          }}>
            Every walk and hike is GPS tracked from start to finish. You get a live map of the route — no guessing where your dog went.
          </p>
        </div>

        {/* Report Card */}
        <div style={{
          background: 'var(--card)',
          border: '0.5px solid var(--border)',
          borderLeft: '2px solid var(--orange)',
          borderRadius: '10px',
          padding: '24px',
        }}>
          <p style={{
            fontSize: '28px',
            marginBottom: '14px',
            lineHeight: 1,
          }}>📋</p>
          <p style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '14px',
            fontWeight: 600,
            color: 'var(--charcoal)',
            marginBottom: '8px',
            letterSpacing: '0.04em',
          }}>
            Report Card
          </p>
          <p style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '12px',
            color: 'var(--muted)',
            lineHeight: 1.7,
          }}>
            After every visit you receive a report card — notes on behavior, bathroom breaks, food, and how the session went.
          </p>
        </div>

      </div>

    </section>
  )
}
