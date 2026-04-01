import { useEffect, useRef } from 'react'
import 'leaflet/dist/leaflet.css'

const CENTER = [33.7949, -84.4197]
const RADIUS = 16093

const PIN_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28">
  <circle cx="14" cy="14" r="12" fill="#F4EFE6" stroke="#C4892A" stroke-width="1.5"/>
  <text x="14" y="18" text-anchor="middle" font-size="12">🐾</text>
</svg>`

export default function MiniMap({ height = 120 }) {
  const ref = useRef(null)
  const mapRef = useRef(null)

  useEffect(() => {
    if (mapRef.current) return
    import('leaflet').then(L => {
      const m = L.map(ref.current, {
        zoomControl: false,
        scrollWheelZoom: false,
        attributionControl: false,
        dragging: true,
        doubleClickZoom: false,
      })
      mapRef.current = m

      L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        { subdomains: 'abcd', maxZoom: 14 }
      ).addTo(m)

      m.setView(CENTER, 10)

      L.circle(CENTER, {
        radius: RADIUS,
        color: '#C4892A',
        fillColor: '#C4892A',
        fillOpacity: 0.08,
        weight: 1.5,
        dashArray: '6 5',
      }).addTo(m)

      const icon = L.divIcon({ html: PIN_SVG, className: '', iconSize: [28, 28], iconAnchor: [14, 14] })
      L.marker(CENTER, { icon }).addTo(m)
        .bindPopup('<span style="font-family:monospace;font-size:11px">30318 · 10 mi</span>')
    })
    return () => { mapRef.current?.remove(); mapRef.current = null }
  }, [])

  return (
    <div
      ref={ref}
      style={{
        height,
        borderRadius: '4px',
        overflow: 'hidden',
        border: '0.5px solid var(--border)',
      }}
    />
  )
}
