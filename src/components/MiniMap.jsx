import { useState } from 'react'

const neighborhoods = [
  // North of HQ
  { name: 'Buckhead',      x: 158, y: 62 },
  { name: 'Brookhaven',    x: 202, y: 70,  outside: true },
  { name: 'Berkeley Park', x: 132, y: 104 },
  // East / Intown
  { name: 'Midtown',       x: 178, y: 112 },
  { name: 'Va-Highland',   x: 210, y: 108 },
  { name: 'Old 4th Ward',  x: 186, y: 130 },
  { name: 'Inman Park',    x: 204, y: 144 },
  { name: 'Cabbagetown',   x: 192, y: 160 },
  { name: 'Reynoldstown',  x: 216, y: 166 },
  { name: 'Kirkwood',      x: 238, y: 156, outside: true },
  { name: 'Decatur',       x: 254, y: 138, outside: true },
  // South / Southeast
  { name: 'Grant Park',    x: 174, y: 178 },
  { name: 'Summerhill',    x: 158, y: 188 },
  { name: 'East Atlanta',  x: 210, y: 188, outside: true },
  // West / Southwest
  { name: 'West End',      x: 112, y: 180 },
  { name: 'Adair Park',    x: 130, y: 196 },
  { name: 'Mozley Park',   x: 86,  y: 158 },
  { name: 'Grove Park',    x: 72,  y: 124 },
]

export default function MiniMap() {
  const [hovered, setHovered] = useState(null)
  const hoveredN = hovered != null ? neighborhoods[hovered] : null

  return (
    <div style={{
      position: 'relative', width: '100%', aspectRatio: '1.1',
      background: 'var(--card)',
      overflow: 'hidden',
    }}>
      <svg viewBox="0 0 280 240" style={{ width: '100%', height: '100%', display: 'block' }}>
        <defs>
          <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke="var(--border)" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="280" height="240" fill="url(#grid)" />

        {/* Service radius ring */}
        <circle cx="140" cy="140" r="80"
          fill="var(--orange)" fillOpacity="0.06"
          stroke="var(--orange)" strokeWidth="1" strokeDasharray="3 4" strokeOpacity="0.55"/>

        {/* Neighborhood dots — hoverable */}
        {neighborhoods.map((n, i) => {
          const active = hovered === i
          return (
            <g key={i} style={{ cursor: 'pointer' }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(cur => cur === i ? null : cur)}>
              <circle cx={n.x} cy={n.y} r="10" fill="transparent"/>
              {active && (
                <circle cx={n.x} cy={n.y} r="7"
                  fill={n.outside ? 'var(--muted)' : 'var(--green)'} opacity="0.22"/>
              )}
              <circle cx={n.x} cy={n.y}
                r={active ? 3.6 : 2.6}
                fill={n.outside ? 'var(--muted)' : 'var(--green)'}
                opacity={n.outside ? 0.7 : 1}
                style={{ transition: 'r 120ms' }}/>
            </g>
          )
        })}

        {/* HQ pin — always labeled */}
        <g transform="translate(140,140)">
          <circle r="18" fill="var(--orange)" opacity="0.16"/>
          <circle r="9"  fill="var(--orange)" opacity="0.32"/>
          <circle r="4.5" fill="var(--orange)"/>
          <g transform="translate(11,-4)">
            <rect x="-2" y="-8" width="88" height="14" rx="3" fill="var(--orange)"/>
            <text x="42" y="2" textAnchor="middle"
              fill="#0A0806"
              style={{ fontFamily: 'var(--sans)', fontSize: 7, letterSpacing: '.1em', textTransform: 'uppercase', fontWeight: 700 }}>
              HQ · Riverside
            </text>
          </g>
        </g>

        {/* Hover tooltip */}
        {hoveredN && (() => {
          const tw = 86
          let tx = hoveredN.x - tw / 2
          if (tx < 4) tx = 4
          if (tx + tw > 276) tx = 276 - tw
          const above = hoveredN.y > 40
          const ty = above ? hoveredN.y - 28 : hoveredN.y + 10
          return (
            <g style={{ pointerEvents: 'none' }}>
              <rect x={tx} y={ty} width={tw} height={20} rx={3} fill="var(--charcoal)"/>
              <text x={tx + tw / 2} y={ty + 10} textAnchor="middle"
                fill="var(--bg)"
                style={{ fontFamily: 'var(--sans)', fontSize: 8, fontWeight: 600, letterSpacing: '.04em' }}>
                {hoveredN.name}
              </text>
              <text x={tx + tw / 2} y={ty + 17} textAnchor="middle"
                fill="var(--bg)" opacity="0.6"
                style={{ fontFamily: 'var(--sans)', fontSize: 6, letterSpacing: '.14em', textTransform: 'uppercase' }}>
                {hoveredN.outside ? 'On request' : 'Served weekly'}
              </text>
              <path
                d={above
                  ? `M ${hoveredN.x - 3},${ty + 20} L ${hoveredN.x + 3},${ty + 20} L ${hoveredN.x},${ty + 23} Z`
                  : `M ${hoveredN.x - 3},${ty} L ${hoveredN.x + 3},${ty} L ${hoveredN.x},${ty - 3} Z`}
                fill="var(--charcoal)"/>
            </g>
          )
        })()}

        {/* Compass */}
        <g transform="translate(22,30)">
          <circle r="10" fill="var(--card)" stroke="var(--border)"/>
          <path d="M 0,-7 L 2,0 L 0,7 L -2,0 Z" fill="var(--orange)"/>
          <text x="0" y="-13" textAnchor="middle"
            fill="var(--muted)"
            style={{ fontFamily: 'var(--sans)', fontSize: 6.5, letterSpacing: '.1em', fontWeight: 700 }}>
            N
          </text>
        </g>
      </svg>


      {/* Legend + hover hint */}
      <div style={{
        position: 'absolute', bottom: 8, left: 10, right: 10,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        fontFamily: 'var(--sans)', fontSize: 12,
        color: 'var(--muted)', letterSpacing: '.04em',
      }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)' }}/>
            Served
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--muted)', opacity: 0.6 }}/>
            On request
          </span>
        </span>
        <span className="hover-hint" style={{
          fontSize: 11, letterSpacing: '.18em', textTransform: 'uppercase',
          color: 'var(--orange)', opacity: 0.8,
        }}>
          Hover pins ↗
        </span>
      </div>
    </div>
  )
}
