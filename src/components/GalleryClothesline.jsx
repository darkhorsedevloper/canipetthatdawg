// Gallery — Clothesline
// Polaroids hang from a rope with clips, sway on hover

import p1  from '../assets/bree-curly-lying.jpeg'
import p2  from '../assets/IMG_6604.jpeg'
import p3  from '../assets/IMG_7167 2.jpeg'
import p4  from '../assets/IMG_2176.jpeg'
import p5  from '../assets/IMG_7968.jpeg'
import p6  from '../assets/IMG_0018.jpeg'
import p7  from '../assets/IMG_9585.jpeg'
import p8  from '../assets/IMG_0639.JPG'
import p9  from '../assets/IMG_1076.jpg'
import p10 from '../assets/IMG_1514.jpeg'
import p11 from '../assets/bree-curly-kiss.jpeg'
import p12 from '../assets/IMG_7253.jpeg'

const photos = [p11, p1, p7, p9, p2, p5, p3, p12, p6, p10, p4, p8]
const ROT = [-3, 2, -1.5, 2.8, -2.2, 1.8, -2.8, 1.2, -1.8, 3.1, -2.5, 1.5]
const CLIP_COLORS = ['#C4892A', '#4A7C5E', '#6FA5C7', '#BDB4A3', '#E8A547']

export default function GalleryClothesline() {
  return (
    <section style={{ padding: '0 0 40px', background: 'var(--bg)', overflow: 'hidden' }}>
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
          {photos.map((src, i) => (
            <div
              key={i}
              className="clothesline-card"
              style={{
                flexShrink: 0,
                width: '130px',
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
                <div style={{ position: 'relative', paddingBottom: '100%', overflow: 'hidden', borderRadius: '3px' }}>
                  <img src={src} alt="" style={{
                    position: 'absolute', inset: 0,
                    width: '100%', height: '100%',
                    objectFit: 'cover', objectPosition: 'center top', display: 'block',
                  }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
