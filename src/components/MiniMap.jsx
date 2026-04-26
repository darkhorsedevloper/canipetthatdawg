import { MapContainer, TileLayer, CircleMarker, Tooltip, Circle, Marker } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const HQ = [33.785, -84.445]
const GREEN  = '#4A7C5E'
const ORANGE = '#C4892A'

// All neighborhoods within ~10 miles of 30318 — all green
const neighborhoods = [
  { name: 'Buckhead',       pos: [33.838, -84.385] },
  { name: 'Brookhaven',     pos: [33.858, -84.338] },
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

// Orange pill label — replaces the broken permanent Tooltip
const hqIcon = L.divIcon({
  className: 'hq-label',
  html: 'HQ · Riverside',
  iconSize: null,
  iconAnchor: [-14, 8],
})

export default function MiniMap() {
  return (
    <div style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden' }}>
      <MapContainer
        center={HQ}
        zoom={12}
        scrollWheelZoom={false}
        dragging={false}
        zoomControl={false}
        doubleClickZoom={false}
        touchZoom={false}
        keyboard={false}
        boxZoom={false}
        attributionControl={false}
        style={{ height: '280px', width: '100%' }}
      >
        <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />

        {/* Service radius ring */}
        <Circle
          center={HQ}
          radius={16000}
          pathOptions={{
            color: ORANGE,
            fillColor: ORANGE,
            fillOpacity: 0.06,
            weight: 1.5,
            dashArray: '4 5',
            opacity: 0.55,
          }}
        />

        {/* Neighborhood dots — all green, all within 10 mi */}
        {neighborhoods.map((n, i) => (
          <CircleMarker
            key={i}
            center={n.pos}
            radius={7}
            pathOptions={{
              color: '#fff',
              fillColor: GREEN,
              fillOpacity: 1,
              weight: 1.5,
            }}
          >
            <Tooltip direction="top" offset={[0, -10]} opacity={1}>
              <strong>{n.name}</strong>
              <br />
              <span style={{ fontSize: '10px', opacity: 0.65, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Served weekly
              </span>
            </Tooltip>
          </CircleMarker>
        ))}

        {/* HQ orange dot */}
        <CircleMarker
          center={HQ}
          radius={10}
          pathOptions={{
            color: '#fff',
            fillColor: ORANGE,
            fillOpacity: 1,
            weight: 1.5,
          }}
        >
          <Tooltip direction="top" offset={[0, -12]} opacity={1}>
            <strong>HQ · Riverside</strong>
          </Tooltip>
        </CircleMarker>

        {/* HQ pill label — no white box, just styled text */}
        <Marker position={HQ} icon={hqIcon} interactive={false} />
      </MapContainer>

      {/* Legend */}
      <div style={{
        position: 'absolute', bottom: 8, left: 10, right: 10, zIndex: 1000,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        fontFamily: 'var(--sans)', fontSize: 12,
        color: 'var(--muted)', letterSpacing: '.04em',
        pointerEvents: 'none',
      }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: GREEN }} />
          Served weekly · Atlanta 30318 · within 10 mi
        </span>
        <span className="hover-hint" style={{
          fontSize: 11, letterSpacing: '.18em', textTransform: 'uppercase',
          color: ORANGE, opacity: 0.8,
        }}>
          Hover pins ↗
        </span>
      </div>
    </div>
  )
}
