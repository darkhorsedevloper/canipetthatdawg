import { useEffect, useRef } from 'react'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix Leaflet's broken default icon paths in Vite
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

const CENTER = [33.7949, -84.4197]
const RADIUS_M = 16093

const PAW_HTML = `<div style="width:30px;height:30px;background:#F4EFE6;border:2px solid #C4892A;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;line-height:1;box-shadow:0 1px 4px rgba(0,0,0,0.15)">🐾</div>`

export default function MiniMap({ height = 240 }) {
  const containerRef = useRef(null)
  const mapRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    const map = L.map(containerRef.current, {
      zoomControl: false,
      scrollWheelZoom: false,
      attributionControl: false,
      dragging: true,
      doubleClickZoom: false,
      touchZoom: false,
    })

    mapRef.current = map
    map.setView(CENTER, 10)

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      subdomains: 'abcd',
      maxZoom: 14,
    }).addTo(map)

    L.circle(CENTER, {
      radius: RADIUS_M,
      color: '#C4892A',
      fillColor: '#C4892A',
      fillOpacity: 0.08,
      weight: 1.5,
      dashArray: '6 5',
    }).addTo(map)

    const icon = L.divIcon({
      html: PAW_HTML,
      className: '',
      iconSize: [30, 30],
      iconAnchor: [15, 15],
    })

    L.marker(CENTER, { icon }).addTo(map)
      .bindPopup('<span style="font-family:monospace;font-size:11px">Atlanta · 30318 · 10 mi</span>')

    return () => {
      map.remove()
      mapRef.current = null
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', height: `${height}px`, display: 'block' }}
    />
  )
}
