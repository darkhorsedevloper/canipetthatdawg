import { useState, useEffect, useRef } from 'react'
import quotes from '../data/reviews.json'

const GOOGLE_URL = 'https://g.page/r/CS7eaMrwENHeEBM/review'
const reviews = quotes.filter(q => q.text && q.client)

export default function ReviewTicker() {
  const [cur, setCur] = useState(0)
  const [anim, setAnim] = useState('in')
  const [open, setOpen] = useState(false)
  const timer = useRef(null)

  const goTo = (i, manual = false) => {
    if (manual) {
      clearInterval(timer.current)
      timer.current = setInterval(() => goTo((i + 1) % reviews.length), 5500)
    }
    setAnim('out')
    setTimeout(() => {
      setCur(i)
      setAnim('in')
    }, 380)
  }

  useEffect(() => {
    if (reviews.length < 2) return
    timer.current = setInterval(() => setCur(prev => {
      setAnim('out')
      const next = (prev + 1) % reviews.length
      setTimeout(() => { setCur(next); setAnim('in') }, 380)
      return prev
    }), 5500)
    return () => clearInterval(timer.current)
  }, [])

  // Fallback: no published reviews yet
  if (reviews.length === 0) {
    return (
      <a href={GOOGLE_URL} target="_blank" rel="noreferrer" style={{
        display: 'block', overflow: 'hidden', background: 'var(--hero-bg)',
        borderTop: '0.5px solid rgba(196,137,42,0.3)', borderBottom: '0.5px solid rgba(196,137,42,0.3)',
        padding: '12px 0', whiteSpace: 'nowrap', textDecoration: 'none', cursor: 'pointer',
      }}>
        <div style={{ display: 'inline-flex', animation: 'ticker 20s linear infinite' }}>
          {[1,2,3,4].map(i => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', paddingRight: '56px' }}>
              <span style={{ fontFamily: 'var(--serif)', fontSize: '13px', color: '#EDE5D2' }}>Leave a review on Google ⭐️⭐️⭐️⭐️⭐️</span>
              <span style={{ color: 'rgba(196,137,42,0.4)', fontSize: '10px', paddingLeft: '16px' }}>✦</span>
            </span>
          ))}
        </div>
        <style>{`@keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}`}</style>
      </a>
    )
  }

  return (
    <section style={{ borderTop: '0.5px solid var(--border)', borderBottom: '0.5px solid var(--border)', background: 'var(--hero-bg)' }}>
      <style>{`
        @keyframes revIn  { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
        @keyframes revOut { from { opacity:1; transform:translateY(0); } to { opacity:0; transform:translateY(-10px); } }
        .rev-in  { animation: revIn  0.4s ease forwards; }
        .rev-out { animation: revOut 0.35s ease forwards; }
        .all-reviews { max-height: 0; overflow: hidden; opacity: 0; transition: max-height 0.5s ease, opacity 0.4s ease; }
        .all-reviews.open { max-height: 2000px; opacity: 1; }
      `}</style>

      <div className="section-pad" style={{ paddingTop: '40px', paddingBottom: '40px' }}>

        {/* Label */}
        <p style={{ fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--green)', marginBottom: '28px', fontFamily: "'IBM Plex Mono', monospace" }}>
          What clients say
        </p>

        {/* Rotating quote card */}
        <div style={{
          background: 'var(--card)',
          border: '0.5px solid var(--border)',
          borderRadius: '12px',
          padding: 'clamp(28px, 5vw, 52px) clamp(20px, 5vw, 44px)',
          textAlign: 'center',
          marginBottom: '20px',
        }}>
          <p style={{ color: 'var(--orange)', fontSize: '52px', lineHeight: 1, margin: '0 0 8px', opacity: 0.2, fontFamily: 'Georgia, serif' }}>"</p>

          <p
            key={cur}
            className={`rev-${anim}`}
            style={{
              color: 'var(--charcoal)',
              fontFamily: "'Space Mono', monospace",
              fontSize: 'clamp(13px, 1.6vw, 15px)',
              lineHeight: 1.85,
              maxWidth: '580px',
              margin: '0 auto 20px',
            }}
          >
            "{reviews[cur].text}"
          </p>

          <p style={{ color: 'var(--orange)', fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', margin: '0 0 24px', fontFamily: "'IBM Plex Mono', monospace" }}>
            ★★★★★ — {reviews[cur].client}
          </p>

          {/* Dots */}
          {reviews.length > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i, true)}
                  style={{
                    width: '7px', height: '7px', borderRadius: '50%', border: 'none', padding: 0, cursor: 'pointer',
                    background: i === cur ? 'var(--orange)' : 'rgba(196,137,42,0.25)',
                    transition: 'background 0.3s',
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Controls row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <button
            onClick={() => setOpen(o => !o)}
            style={{
              background: 'none', border: 'none', padding: 0, cursor: 'pointer',
              color: 'var(--orange)', fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase',
              borderBottom: '1px solid var(--orange)', paddingBottom: '2px',
            }}
          >
            {open ? '− Collapse reviews' : '+ Read all reviews'}
          </button>

          <a
            href={GOOGLE_URL}
            target="_blank"
            rel="noreferrer"
            style={{
              color: 'var(--muted)', fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase',
              borderBottom: '1px solid var(--border)', paddingBottom: '2px',
              textDecoration: 'none',
            }}
          >
            🐶🐱 Leave a review on Google →
          </a>
        </div>

        {/* All reviews expanded */}
        <div className={`all-reviews${open ? ' open' : ''}`}>
          <div style={{ marginTop: '28px' }}>
            {reviews.map((r, i) => (
              <div key={i} style={{
                display: 'grid',
                gridTemplateColumns: '32px 1fr',
                gap: '20px',
                padding: '24px 0',
                borderBottom: '0.5px solid var(--border)',
              }}>
                <p style={{ color: 'var(--orange)', fontSize: '11px', margin: '3px 0 0', opacity: 0.4, fontFamily: "'IBM Plex Mono', monospace" }}>
                  {String(i + 1).padStart(2, '0')}
                </p>
                <div>
                  <p style={{ color: 'var(--orange)', fontSize: '12px', margin: '0 0 10px' }}>★★★★★</p>
                  <p style={{ color: 'var(--charcoal)', fontFamily: "'Space Mono', monospace", fontSize: '13px', lineHeight: 1.8, margin: '0 0 12px' }}>
                    "{r.text}"
                  </p>
                  <p style={{ color: 'var(--orange)', fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', margin: 0, fontFamily: "'IBM Plex Mono', monospace" }}>
                    — {r.client}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
