import { useEffect, useRef } from 'react'
import 'leaflet/dist/leaflet.css'

const CENTER = [33.7949, -84.4197]
const RADIUS = 16093 // 10 miles in metres

const PIN_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44">
  <circle cx="22" cy="22" r="20" fill="#F4EFE6" stroke="#C4892A" stroke-width="2"/>
  <text x="22" y="28" text-anchor="middle" font-size="20">🐾</text>
</svg>`

export default function ServiceMap() {
  const ref    = useRef(null)
  const mapRef = useRef(null)

  useEffect(() => {
    if (mapRef.current) return
    import('leaflet').then(L => {
      const m = L.map(ref.current, {
        zoomControl: false,
        scrollWheelZoom: false,
        attributionControl: false,
      })
      mapRef.current = m

      // Warm, clean light tiles — CartoDB Voyager
      L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        { subdomains: 'abcd', maxZoom: 14 }
      ).addTo(m)

      m.setView(CENTER, 11)

      // Service radius
      L.circle(CENTER, {
        radius: RADIUS,
        color: '#C4892A',
        fillColor: '#C4892A',
        fillOpacity: 0.07,
        weight: 2,
        dashArray: '6 5',
      }).addTo(m)

      // Dog pin
      const icon = L.divIcon({
        html: PIN_SVG,
        className: '',
        iconSize: [44, 44],
        iconAnchor: [22, 22],
      })
      L.marker(CENTER, { icon }).addTo(m)
        .bindPopup('<span style="font-family:monospace;font-size:12px">30318 · 10-mile radius</span>')

      L.control.zoom({ position: 'bottomright' }).addTo(m)
      L.control.attribution({ position: 'bottomleft', prefix: false })
        .addAttribution('© <a href="https://carto.com">CARTO</a>').addTo(m)
    })

    return () => { mapRef.current?.remove(); mapRef.current = null }
  }, [])

  return (
    <section className="section-pad" style={{ borderTop: '0.5px solid var(--border)', borderBottom: '0.5px solid var(--border)' }}>

      <p style={{ fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--green)', marginBottom: '8px' }}>
        Service Area
      </p>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
        <h2 style={{ fontFamily: 'var(--serif)', fontSize: '28px', fontWeight: 400, color: 'var(--charcoal)', lineHeight: 1.25 }}>
          Where we <em style={{ color: 'var(--orange)' }}>run.</em>
        </h2>
        <p style={{ fontSize: '11px', color: 'var(--muted)', letterSpacing: '0.08em' }}>
          10-mile radius · Atlanta 30318
        </p>
      </div>

      <div
        ref={ref}
        className="service-map"
      />

      <style>{`
        .service-map {
          height: 200px;
          border-radius: 6px;
          overflow: hidden;
          border: 0.5px solid var(--border);
        }
        @media (min-width: 640px) {
          .service-map { height: 260px; }
        }
      `}</style>

    </section>
  )
}
