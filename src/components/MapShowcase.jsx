import { useEffect, useRef } from 'react'
import 'leaflet/dist/leaflet.css'

const CENTER = [33.7949, -84.4197]
const RADIUS = 16093

const PIN_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36">
  <circle cx="18" cy="18" r="16" fill="#F4EFE6" stroke="#C4892A" stroke-width="1.5"/>
  <text x="18" y="23" text-anchor="middle" font-size="16">🐾</text>
</svg>`

const STYLES = [
  {
    name: 'Voyager',
    desc: 'Warm & editorial',
    url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
    attr: '© CARTO',
  },
  {
    name: 'Positron',
    desc: 'Ultra minimal',
    url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    attr: '© CARTO',
  },
  {
    name: 'Stadia Smooth',
    desc: 'Clean & modern',
    url: 'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png',
    attr: '© Stadia Maps',
  },
]

function MapTile({ style }) {
  const ref = useRef(null)
  const mapRef = useRef(null)

  useEffect(() => {
    if (mapRef.current) return
    import('leaflet').then(L => {
      const m = L.map(ref.current, {
        zoomControl: false,
        scrollWheelZoom: false,
        attributionControl: false,
        dragging: false,
      })
      mapRef.current = m

      L.tileLayer(style.url, { subdomains: 'abcd', maxZoom: 14 }).addTo(m)
      m.setView(CENTER, 10)

      L.circle(CENTER, {
        radius: RADIUS,
        color: '#C4892A',
        fillColor: '#C4892A',
        fillOpacity: 0.08,
        weight: 1.5,
        dashArray: '6 5',
      }).addTo(m)

      const icon = L.divIcon({ html: PIN_SVG, className: '', iconSize: [36, 36], iconAnchor: [18, 18] })
      L.marker(CENTER, { icon }).addTo(m)
    })
    return () => { mapRef.current?.remove(); mapRef.current = null }
  }, [])

  return (
    <div>
      <div style={{ marginBottom: '8px' }}>
        <span style={{ fontFamily: 'var(--serif)', fontSize: '15px', color: 'var(--charcoal)', marginRight: '8px' }}>{style.name}</span>
        <span style={{ fontSize: '11px', color: 'var(--muted)' }}>{style.desc}</span>
      </div>
      <div ref={ref} style={{ height: '200px', borderRadius: '6px', overflow: 'hidden', border: '0.5px solid var(--border)' }} />
    </div>
  )
}

export default function MapShowcase() {
  return (
    <section className="section-pad" style={{ borderTop: '0.5px solid var(--border)', borderBottom: '0.5px solid var(--border)', background: 'var(--panel)' }}>
      <p style={{ fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--green)', marginBottom: '8px' }}>
        Map Style Options — pick your favourite
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
        {STYLES.map(s => <MapTile key={s.name} style={s} />)}
      </div>
    </section>
  )
}
