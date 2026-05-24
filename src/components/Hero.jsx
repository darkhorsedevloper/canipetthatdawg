import { useState, useEffect } from 'react'
import hero from '../data/hero.json'
import breePhoto from '../assets/bree-curly-kiss.jpeg'

const PHRASES = ['Dog Walking', 'Adventure Hikes', 'Overnight Stays', 'Atlanta, GA']

function useCyclingTypewriter(phrases, speed = 38, pauseAfter = 1800) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    let i = 0
    let timeout
    let interval

    function type(phraseIndex) {
      const text = phrases[phraseIndex]
      setDone(false)
      setDisplayed('')
      i = 0
      interval = setInterval(() => {
        i++
        setDisplayed(text.slice(0, i))
        if (i >= text.length) {
          clearInterval(interval)
          setDone(true)
          timeout = setTimeout(() => {
            const next = (phraseIndex + 1) % phrases.length
            setIndex(next)
            type(next)
          }, pauseAfter)
        }
      }, speed)
    }

    type(index)

    return () => {
      clearTimeout(timeout)
      clearInterval(interval)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return { displayed, done }
}

export default function Hero() {
  const { displayed, done } = useCyclingTypewriter(PHRASES)

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

      {/* Hero photo — top right, hidden on small mobile */}
      <div className="hero-photo-placeholder" style={{
        position: 'absolute', top: 20, right: 20, zIndex: 1,
        width: 190, height: 260,
        borderRadius: '6px',
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.12)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.45)',
      }}>
        <img
          src={breePhoto}
          alt="Crickett with a dog"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
        />
      </div>

      <div className="hero-content">

        {/* Eyebrow — fixed height prevents layout shift as text types */}
        <div style={{
          fontSize: '12px', letterSpacing: '0.18em', textTransform: 'uppercase',
          color: 'var(--green)', marginBottom: '18px',
          display: 'flex', alignItems: 'center', gap: '10px',
          fontFamily: "'IBM Plex Mono', monospace",
          minHeight: '16px',
        }}>
          <span style={{ display: 'block', width: '24px', height: '1px', background: 'var(--green)', flexShrink: 0 }}/>
          {displayed}
          {!done && (
            <span style={{
              display: 'inline-block',
              width: '2px', height: '12px',
              background: 'var(--green)',
              marginLeft: '2px',
              verticalAlign: 'middle',
              animation: 'blink 0.7s step-end infinite',
            }}/>
          )}
        </div>

        {/* Headline */}
        <h1 className="hero-title" style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontWeight: 400,
          color: '#EDE5D2',
          letterSpacing: '0.01em',
        }}>
          {hero.headline}<br/>
          <span style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontStyle: 'normal',
            fontWeight: 400,
            color: 'var(--orange)',
          }}>
            {hero.headlineAccent}
          </span>
        </h1>

        <p style={{
          fontSize: '15px', lineHeight: 1.75,
          color: 'rgba(226,217,198,0.78)', maxWidth: '440px', marginBottom: '32px',
          fontFamily: "'IBM Plex Mono', monospace",
          whiteSpace: 'pre-line',
        }}>
          <a
            href="https://www.fearfreehappyhomes.com/"
            target="_blank"
            rel="noreferrer"
            style={{ color: 'var(--green)', textDecoration: 'none', borderBottom: '1px solid var(--green)' }}
          >Fear Free</a>{hero.subheadline.replace('Fear Free', '')}
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

          {/* Secondary — dark fill, cream text + border */}
          <a
            href={hero.secondaryUrl}
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              border: '1.5px solid rgba(237,229,210,0.35)',
              borderRadius: '8px',
              padding: '14px 28px',
              background: 'rgba(18,14,11,0.55)',
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
              color: '#EDE5D2',
              textDecoration: 'none',
            }}
          >
            {hero.secondaryLabel} ↓
          </a>


        </div>

      </div>
    </section>
  )
}
