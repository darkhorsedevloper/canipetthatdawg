import MiniMap from './MiniMap'
import aboutData from '../data/about.json'

const { content, tags } = aboutData

export default function About() {
  return (
    <section id="about" className="about-grid">

      <div style={{ display: 'flex', flexDirection: 'column', background: 'var(--card)', borderBottom: '0.5px solid var(--border)' }}>
        <div style={{ padding: '10px 14px', background: 'var(--panel)', borderBottom: '0.5px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontSize: '9px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--green)' }}>Service Area</p>
          <p style={{ fontSize: '9px', color: 'var(--muted)', letterSpacing: '0.08em' }}>Atlanta 30318 · 10 mi</p>
        </div>
        <MiniMap height={280} />
      </div>

      <div style={{ padding: '32px 24px', background: 'var(--bg)' }}>
        <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: '19px', color: 'var(--faint)', lineHeight: 1.45, marginBottom: '16px' }}>
          {'"'}{content.quote}{' '}
          <strong style={{ fontStyle: 'normal', color: 'var(--orange)' }}>{content.quoteAccent}</strong>
          {' '}{content.quoteEnd}{'"'}
        </p>

        <p style={{ fontSize: '12px', color: 'var(--muted)', lineHeight: 1.7, marginBottom: '16px' }}>
          {content.bio}
        </p>

        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '18px' }}>
          {tags.map(tag => (
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
          Full story
        </a>
      </div>

    </section>
  )
}
