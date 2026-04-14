import { useEffect, useRef } from 'react'

const CENTER = [33.7949, -84.4197]
const RADIUS_M = 16093

const PAW_HTML = `<div style="width:30px;height:30px;background:#F4EFE6;border:2px solid #C4892A;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;line-height:1;box-shadow:0 1px 4px rgba(0,0,0,0.15)">🐾</div>`

export default function MiniMap({ height = 240 }) {
  const containerRef = useRef(null)
  const mapRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    let map = null

    import('leaflet').then(L => {
      import('leaflet/dist/leaflet.css')

      if (!containerRef.current || mapRef.current) return

      delete L.default.Icon.Default.prototype._getIconUrl
      L.default.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      })

      map = L.default.map(containerRef.current, {
        zoomControl: false,
        scrollWheelZoom: false,
        attributionControl: false,
        dragging: true,
        doubleClickZoom: false,
        touchZoom: false,
      })

      mapRef.current = map
      map.setView(CENTER, 10)

      L.default.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        subdomains: 'abcd',
        maxZoom: 14,
      }).addTo(map)

      L.default.circle(CENTER, {
        radius: RADIUS_M,
        color: '#C4892A',
        fillColor: '#C4892A',
        fillOpacity: 0.08,
        weight: 1.5,
        dashArray: '6 5',
      }).addTo(map)

      const icon = L.default.divIcon({
        html: PAW_HTML,
        className: '',
        iconSize: [30, 30],
        iconAnchor: [15, 15],
      })

      L.default.marker(CENTER, { icon }).addTo(map)
        .bindPopup('<span style="font-family:monospace;font-size:11px">Atlanta · 30318 · 10 mi</span>')

      setTimeout(() => map.invalidateSize(), 100)
    })

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', height: `${height}px` }}
    />
  )
}
