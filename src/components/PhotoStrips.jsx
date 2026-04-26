import { useState, useRef } from 'react'
import photo1 from '../assets/PP Kira Cute Down.JPEG'
import photo2 from '../assets/PP Kira Cute Summer.JPEG'
import photo3 from '../assets/PP Kira Cute.JPEG'

const slots = [
  { label: 'On the trail',   photo: photo1 },
  { label: 'The handler',    photo: photo2 },
  { label: 'After the hike', photo: photo3 },
]

export default function PhotoStrips() {
  const [active, setActive] = useState(0)
  const ref = useRef(null)

  function onScroll() {
    if (!ref.current) return
    const i = Math.round(ref.current.scrollLeft / ref.current.offsetWidth)
    setActive(i)
  }

  return (
    <>
      {/* Mobile carousel */}
      <div className="photo-carousel">
        <div
          ref={ref}
          onScroll={onScroll}
          style={{
            display: 'flex',
            overflowX: 'scroll',
            scrollSnapType: 'x mandatory',
            scrollBehavior: 'smooth',
            WebkitOverflowScrolling: 'touch',
            background: '#0E0B08',
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
          }}
        >
          {slots.map((s, i) => (
            <div key={i} style={{
              minWidth: '100%',
              scrollSnapAlign: 'start',
              position: 'relative',
              paddingBottom: '100%',
              flexShrink: 0,
            }}>
              <img
                src={s.photo}
                alt={s.label}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </div>
          ))}
        </div>

        {/* Dot indicators */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '6px',
          padding: '10px 0',
          background: '#0E0B08',
        }}>
          {slots.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                ref.current?.scrollTo({ left: ref.current.offsetWidth * i, behavior: 'smooth' })
                setActive(i)
              }}
              style={{
                width: i === active ? '20px' : '6px',
                height: '6px',
                borderRadius: '3px',
                background: i === active ? 'var(--orange)' : 'rgba(237,229,210,0.25)',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                transition: 'width 200ms, background 200ms',
              }}
              aria-label={`Photo ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Desktop grid */}
      <div className="photo-strips-grid" style={{ display: 'grid', gap: '6px', background: '#0E0B08' }}>
        {slots.map((s, i) => (
          <div key={i} style={{
            position: 'relative',
            width: '100%',
            paddingBottom: '100%',
            overflow: 'hidden',
          }}>
            <img
              src={s.photo}
              alt={s.label}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                display: 'block',
              }}
            />
          </div>
        ))}
      </div>
    </>
  )
}
