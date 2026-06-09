// Gallery — Clothesline
// Polaroids hang from a rope with clips, sway on hover

import p1  from '../assets/bree-curly-lying.webp'
import p2  from '../assets/IMG_6604.webp'
import p3  from '../assets/IMG_7167 2.webp'
import p4  from '../assets/IMG_2176.webp'
import p5  from '../assets/IMG_7968.webp'
import p6  from '../assets/IMG_0018.webp'
import p7  from '../assets/IMG_9585.webp'
import p8  from '../assets/IMG_0639.webp'
import p9  from '../assets/IMG_1076.webp'
import p10 from '../assets/IMG_1514.webp'
import p11 from '../assets/bree-curly-kiss.webp'
import p12 from '../assets/IMG_7253.webp'
import p13 from '../assets/IMG_6978.webp'
import p14 from '../assets/IMG_0123.webp'
import p15 from '../assets/IMG_1598.webp'
import p16 from '../assets/IMG_2908.webp'
import p17 from '../assets/IMG_1237.webp'
import p18 from '../assets/IMG_4104.webp'
import p19 from '../assets/IMG_4863.webp'
import p20 from '../assets/IMG_6590.webp'
import p21 from '../assets/IMG_1375.png'
import p22 from '../assets/IMG_5470.jpeg'
import p23 from '../assets/IMG_8215.jpeg'
import p24 from '../assets/IMG_9796.jpeg'
import p25 from '../assets/IMG_9981.jpeg'
import p26 from '../assets/69289447271__A85E8DD8-2F56-4DC2-AFF7-89919DEFDA3E.fullsizerender.jpeg'

const photos = [
  { src: p17, fit: 'cover' },
  { src: p13, fit: 'contain' },
  { src: p11, fit: 'cover' },
  { src: p7,  fit: 'contain' },
  { src: p2,  fit: 'cover' },
  { src: p9,  fit: 'contain' },
  { src: p5,  fit: 'cover' },
  { src: p3,  fit: 'cover' },
  { src: p12, fit: 'cover' },
  { src: p6,  fit: 'cover' },
  { src: p10, fit: 'cover' },
  { src: p4,  fit: 'cover' },
  { src: p8,  fit: 'cover' },
  { src: p15, fit: 'cover' },
  { src: p16, fit: 'cover' },
  { src: p14, fit: 'cover' },
  { src: p18, fit: 'cover' },
  { src: p19, fit: 'cover' },
  { src: p20, fit: 'cover' },
  { src: p21, fit: 'cover' },
  { src: p22, fit: 'cover' },
  { src: p23, fit: 'cover' },
  { src: p24, fit: 'cover' },
  { src: p25, fit: 'cover' },
  { src: p26, fit: 'cover' },
]
const ROT    = [-3, 2, -1.5, 2.8, -2.2, 1.8, -2.8, 1.2, -1.8, 3.1, -2.5, 1.5, 2.3, -1.8, -1.2, 2.7, -2.0, 1.6, -2.4, -1.3, 2.5, -2.1, 1.7, -2.6, 1.4]
const WIDTHS = [140, 115, 155, 110, 150, 125, 160, 120, 145, 115, 155, 130, 110, 150, 120, 160, 135, 145, 120, 140, 125, 155, 115, 150, 130]
const CLIP_COLORS = ['#C4892A', '#4A7C5E', '#6FA5C7', '#BDB4A3', '#E8A547']

export default function GalleryClothesline() {
  return (
    <section style={{ padding: '0 0 60px', background: 'var(--bg)', overflow: 'hidden' }}>
      <style>{`
        @keyframes sway {
          0%, 100% { transform: rotate(-2deg); }
          50%       { transform: rotate(2deg); }
        }
        .clothesline-card:hover {
          animation: sway 1s ease-in-out infinite !important;
          z-index: 10;
        }
        .clothesline-card {
          transform-origin: top center;
        }
      `}</style>

      {/* Rope */}
      <div style={{ position: 'relative', margin: '32px 0 0' }}>
        <div style={{
          height: '2px',
          background: 'linear-gradient(90deg, transparent, rgba(237,229,210,0.25) 8%, rgba(237,229,210,0.25) 92%, transparent)',
          boxShadow: '0 1px 4px rgba(0,0,0,0.5)',
        }} />

        {/* Scrollable strip of hanging photos */}
        <div style={{
          display: 'flex',
          gap: '16px',
          overflowX: 'auto',
          overflowY: 'visible',
          padding: '0 24px 24px',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
        }}>
          {photos.map(({ src, fit }, i) => {
            const w = WIDTHS[i]
            const containH = Math.round(w * 1.23)
            return (
              <div
                key={i}
                className="clothesline-card"
                style={{
                  flexShrink: 0,
                  width: `${w}px`,
                  transform: `rotate(${ROT[i]}deg)`,
                  transition: 'transform 200ms ease',
                  cursor: 'default',
                }}
              >
                {/* Clip */}
                <div style={{
                  width: '14px', height: '18px',
                  background: CLIP_COLORS[i % CLIP_COLORS.length],
                  border: '1px solid rgba(0,0,0,0.3)',
                  borderRadius: '2px',
                  margin: '0 auto',
                  position: 'relative',
                  top: '-1px',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.5)',
                }} />

                {/* Polaroid */}
                <div style={{
                  background: '#3A2F24',
                  padding: '7px 7px 20px',
                  border: '1px solid rgba(237,229,210,0.1)',
                  boxShadow: '0 6px 24px rgba(0,0,0,0.6)',
                }}>
                  {fit === 'contain' ? (
                    <div style={{ borderRadius: '3px', overflow: 'hidden', height: `${containH}px` }}>
                      <img src={src} alt="" loading="lazy" style={{ display: 'block', width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center' }} />
                    </div>
                  ) : (
                    <div style={{ position: 'relative', paddingBottom: '100%', overflow: 'hidden', borderRadius: '3px' }}>
                      <img src={src} alt="" loading="lazy" style={{
                        position: 'absolute', inset: 0,
                        width: '100%', height: '100%',
                        objectFit: 'cover', objectPosition: 'center top', display: 'block',
                      }} />
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
