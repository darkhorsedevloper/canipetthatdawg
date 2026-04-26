import { MapContainer, TileLayer, CircleMarker, Tooltip, Circle, Marker } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Center shifted east + south to fit all neighborhoods including Buckhead + Decatur
const CENTER = [33.775, -84.370]
const HQ     = [33.785, -84.445]
const GREEN  = '#5A9E72'   // slightly brighter so dots pop on both light + dark tiles
const ORANGE = '#C4892A'

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

        {/* Neighborhood dots */}
        {neighborhoods.map((n, i) => (
          <CircleMarker
            key={i}
            center={n.pos}
            radius={7}
            pathOptions={{
              color: '#fff',
              fillColor: GREEN,
              fillOpacity: 1,
              weight: 2,
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

        {/* HQ dot */}
        <CircleMarker
          center={HQ}
          radius={10}
          pathOptions={{
            color: '#fff',
            fillColor: ORANGE,
            fillOpacity: 1,
            weight: 2,
          }}
        >
          <Tooltip direction="top" offset={[0, -12]} opacity={1}>
            <strong>HQ · Riverside</strong>
          </Tooltip>
        </CircleMarker>

        {/* HQ pill label */}
        <Marker position={HQ} icon={hqIcon} interactive={false} />
      </MapContainer>

      {/* Hover hint — top right, away from map labels */}
      <div className="hover-hint" style={{
        position: 'absolute', top: 8, right: 10, zIndex: 1000,
        fontFamily: 'var(--sans)', fontSize: 10,
        letterSpacing: '.18em', textTransform: 'uppercase',
        color: ORANGE, opacity: 0.8,
        pointerEvents: 'none',
      }}>
        Hover pins ↗
      </div>

      {/* Legend — bottom left only */}
      <div style={{
        position: 'absolute', bottom: 8, left: 10, zIndex: 1000,
        display: 'flex', alignItems: 'center', gap: 6,
        fontFamily: 'var(--sans)', fontSize: 12,
        color: 'var(--muted)', letterSpacing: '.04em',
        pointerEvents: 'none',
      }}>
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: GREEN, flexShrink: 0 }} />
        Within 10 mi · Atlanta, GA
      </div>
    </div>
  )
}
