import { useState } from 'react'
import items from '../data/why.json'

const visible = items.slice(0, 2)
const hidden  = items.slice(2)

export default function Why() {
  const [open, setOpen] = useState(false)

  return (
    <section className="section-pad" style={{ background: 'var(--panel)', borderTop: '0.5px solid var(--border)', borderBottom: '0.5px solid var(--border)' }}>

      <p style={{ fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '8px' }}>
        Why Can I Pet That Dawg?
      </p>

      <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 400, lineHeight: 1.2, color: 'var(--charcoal)', marginBottom: '32px' }}>
        Less noise. <em style={{ color: 'var(--orange)' }}>Better care.</em>
      </h2>

      {/* Always visible — first 2 */}
      <div className="why-grid" style={{ marginBottom: '0' }}>
        {visible.map((item, i) => (
          <div key={i}>
            <div style={{ width: '24px', height: '2px', borderRadius: '1px', background: item.bar, marginBottom: '14px' }} />
            <p style={{ fontSize: '13px', fontWeight: 700, color: 'var(--charcoal)', marginBottom: '6px' }}>{item.title}</p>
            <p style={{ fontSize: '12px', color: 'var(--muted)', lineHeight: 1.65 }}>{item.text}</p>
          </div>
        ))}
      </div>

      {/* Collapsible — remaining items */}
      <div style={{
        overflow: 'hidden',
        maxHeight: open ? '400px' : '0',
        transition: 'max-height 400ms ease',
      }}>
        <div className="why-grid" style={{ marginTop: '32px' }}>
          {hidden.map((item, i) => (
            <div key={i}>
              <div style={{ width: '24px', height: '2px', borderRadius: '1px', background: item.bar, marginBottom: '14px' }} />
              <p style={{ fontSize: '13px', fontWeight: 700, color: 'var(--charcoal)', marginBottom: '6px' }}>{item.title}</p>
              <p style={{ fontSize: '12px', color: 'var(--muted)', lineHeight: 1.65 }}>{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Toggle */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          marginTop: '24px',
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: '11px',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--orange)',
        }}
      >
        <span style={{
          display: 'inline-block',
          transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
          transition: 'transform 300ms',
          fontSize: '14px',
          lineHeight: 1,
        }}>+</span>
        {open ? 'View less' : 'View more'}
      </button>

    </section>
  )
}
