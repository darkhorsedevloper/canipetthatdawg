import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, CircleMarker, Tooltip, Circle, Marker } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const CENTER = [33.792, -84.375]
const HQ     = [33.785, -84.445]
const GREEN  = '#5A9E72'
const ORANGE = '#C4892A'

const neighborhoods = [
  { name: 'Buckhead',       pos: [33.838, -84.385], tip: 'bottom' },
  { name: 'Brookhaven',     pos: [33.858, -84.338], tip: 'bottom' },
  { name: 'Berkeley Park',  pos: [33.790, -84.415] },
  { name: 'Midtown',        pos: [33.784, -84.383] },
  { name: 'Va-Highland',    pos: [33.781, -84.363] },
  { name: 'Old 4th Ward',   pos: [33.757, -84.370] },
  { name: 'Inman Park',     pos: [33.749, -84.355] },
  { name: 'Cabbagetown',    pos: [33.742, -84.367] },
  { name: 'Reynoldstown',   pos: [33.740, -84.347] },
  { name: 'Kirkwood',       pos: [33.745, -84.332] },
  { name: 'Decatur',        pos: [33.774, -84.296] },
  { name: 'Grant Park',     pos: [33.732, -84.376] },
  { name: 'Summerhill',     pos: [33.726, -84.383] },
  { name: 'East Atlanta',   pos: [33.727, -84.342] },
  { name: 'West End',       pos: [33.734, -84.416] },
  { name: 'Adair Park',     pos: [33.728, -84.407] },
  { name: 'Mozley Park',    pos: [33.750, -84.430] },
  { name: 'Grove Park',     pos: [33.762, -84.442] },
]

const hqIcon = L.divIcon({
  className: 'hq-label',
  html: 'HQ · Riverside',
  iconSize: null,
  iconAnchor: [-14, 8],
})

function googleMapsUrl(n) {
  return `https://www.google.com/maps/search/${encodeURIComponent(n.name + ', Atlanta, GA')}`
}

export default function MiniMap() {
  const [active, setActive] = useState(0)

  // Rotate through neighborhoods every 2.5s on mobile
  useEffect(() => {
    const id = setInterval(() => {
      setActive(i => (i + 1) % neighborhoods.length)
    }, 2500)
    return () => clearInterval(id)
  }, [])

  return (
    <div style={{ borderRadius: '8px', overflow: 'hidden' }}>

      {/* Map */}
      <div style={{ position: 'relative' }}>
        <MapContainer
          center={CENTER}
          zoom={11}
          scrollWheelZoom={false}
          dragging={false}
          zoomControl={false}
          doubleClickZoom={false}
          touchZoom={false}
          keyboard={false}
          boxZoom={false}
          attributionControl={false}
          style={{ height: '300px', width: '100%' }}
        >
          <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />

          <Circle
            center={HQ}
            radius={16000}
            pathOptions={{
              color: ORANGE, fillColor: ORANGE, fillOpacity: 0.06,
              weight: 1.5, dashArray: '4 5', opacity: 0.55,
            }}
          />

          {neighborhoods.map((n, i) => (
            <CircleMarker
              key={i}
              center={n.pos}
              radius={4}
              pathOptions={{
                color: '#fff',
                fillColor: GREEN,
                fillOpacity: 1,
                weight: 1.5,
              }}
            >
              <Tooltip direction={n.tip || 'top'} offset={[0, n.tip === 'bottom' ? 10 : -10]} opacity={1}>
                <strong>{n.name}</strong>
                <br />
                <span style={{ fontSize: '10px', opacity: 0.65, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Served weekly
                </span>
              </Tooltip>
            </CircleMarker>
          ))}

          <CircleMarker
            center={HQ}
            radius={6}
            pathOptions={{ color: '#fff', fillColor: ORANGE, fillOpacity: 1, weight: 1.5 }}
          >
            <Tooltip direction="top" offset={[0, -12]} opacity={1}>
              <strong>HQ · Riverside</strong>
            </Tooltip>
          </CircleMarker>

          <Marker position={HQ} icon={hqIcon} interactive={false} />
        </MapContainer>

        {/* Hover hint — desktop only, top right */}
        <div className="hover-hint" style={{
          position: 'absolute', top: 8, right: 10, zIndex: 1000,
          fontFamily: 'var(--sans)', fontSize: 10,
          letterSpacing: '.18em', textTransform: 'uppercase',
          color: ORANGE, opacity: 0.8,
          pointerEvents: 'none',
        }}>
          Hover pins ↗
        </div>
      </div>

      {/* Mobile rotating neighborhood strip */}
      <div className="mobile-neighborhood-strip">
        <a
          href={googleMapsUrl(neighborhoods[active])}
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 14px',
            background: 'var(--card)',
            borderTop: '0.5px solid var(--border)',
            textDecoration: 'none',
            minHeight: '40px',
          }}
        >
          <span style={{
            width: 8, height: 8, borderRadius: '50%',
            background: GREEN, flexShrink: 0,
          }} />
          <span style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '12px',
            color: 'var(--charcoal)',
            letterSpacing: '0.04em',
            flex: 1,
          }}>
            {neighborhoods[active].name}
          </span>
          <span style={{ fontSize: '10px', color: 'var(--muted)', letterSpacing: '0.1em' }}>
            Served weekly ↗
          </span>
        </a>

        {/* Progress dots */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '4px',
          padding: '6px 0',
          background: 'var(--card)',
        }}>
          {neighborhoods.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                width: i === active ? '14px' : '4px',
                height: '4px',
                borderRadius: '2px',
                background: i === active ? GREEN : 'var(--border-bold)',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                transition: 'width 300ms, background 300ms',
              }}
              aria-label={neighborhoods[i].name}
            />
          ))}
        </div>
      </div>

    </div>
  )
}
