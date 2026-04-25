import photo1 from '../assets/PP Kira Cute Down.JPEG'
import photo2 from '../assets/PP Kira Cute Summer.JPEG'
import photo3 from '../assets/PP Kira Cute.JPEG'

const slots = [
  { label: 'On the trail',   color: 'var(--green)',  photo: photo1 },
  { label: 'The handler',    color: 'var(--orange)', photo: photo2 },
  { label: 'After the hike', color: 'var(--blue)',   photo: photo3 },
]

export default function PhotoStrips() {
  return (
    <div className="photo-strips-grid" style={{ display: 'grid', gap: '6px', background: '#0E0B08' }}>
      {slots.map((s, i) => (
        <div key={i} style={{
          aspectRatio: '1',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <img
            src={s.photo}
            alt={s.label}
            style={{
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
  )
}
