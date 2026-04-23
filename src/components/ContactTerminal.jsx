import { useState, useRef, useEffect } from 'react'

const TICKET_ID = 'TKT-' + Math.floor(1000 + Math.random() * 9000)
const TIMESTAMP = new Date().toISOString().slice(0, 19).replace('T', ' ')

const FORMSPREE_URL = 'https://formspree.io/f/mreokrrr'
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const STEPS = [
  {
    key: 'name',
    prompt: '> name:',
    placeholder: 'e.g. Crickett Sykes',
    ghost: ['Jordan M.', 'Taylor R.', 'Sam K.'],
    validate: null,
  },
  {
    key: 'email',
    prompt: '> email:',
    placeholder: 'e.g. you@email.com',
    ghost: ['jordan@gmail.com', 't.rios@hey.com', 'sam.k@proton.me'],
    validate: v => EMAIL_RE.test(v) ? null : '[error] enter a valid email address',
  },
  {
    key: 'title',
    prompt: '> title:',
    placeholder: 'e.g. Interested in walk sessions for my dog',
    ghost: [
      'Walks for my Heeler mix — weekdays?',
      'Overnight stay, July 12–18',
      'Meet & greet for a rescue pup',
    ],
    validate: null,
  },
  {
    key: 'message',
    prompt: '> message:',
    placeholder: "Tell me what you're looking for...",
    ghost: [
      'Hi! I have a 3yo rescue, high-energy. Looking for 2 walks a week.',
      "We're traveling and need overnights — he's crate-trained.",
      'New in Atlanta and looking for a steady walker. Can we chat?',
    ],
    validate: null,
  },
]

export default function ContactTerminal() {
  const [lines, setLines] = useState([
    `// can-i-pet-that-dawg — ticket terminal`,
    `// ${TIMESTAMP}`,
    `// ticket_id: ${TICKET_ID}  status: OPEN`,
    `──────────────────────────────────────────`,
    `> initializing ticket...`,
    `> type your response and press enter ↵`,
    `──────────────────────────────────────────`,
    STEPS[0].prompt,
  ])
  const [step, setStep]               = useState(0)
  const [input, setInput]             = useState('')
  const [data, setData]               = useState({})
  const [done, setDone]               = useState(false)
  const [sending, setSending]         = useState(false)
  const [userEngaged, setUserEngaged] = useState(false)
  const [ghost, setGhost]             = useState('')
  const inputRef = useRef(null)
  const bodyRef  = useRef(null)

  // Auto-scroll terminal body when lines change
  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight
  }, [lines])

  // Ghost-typing loop
  useEffect(() => {
    if (userEngaged || done || sending) { setGhost(''); return }
    const examples = STEPS[step]?.ghost || []
    if (!examples.length) return

    let cancelled = false
    let exIdx = 0
    let charIdx = 0
    let phase = 'typing'
    let timer

    const tick = () => {
      if (cancelled) return
      const text = examples[exIdx]
      if (phase === 'typing') {
        charIdx++
        setGhost(text.slice(0, charIdx))
        if (charIdx >= text.length) {
          phase = 'pausing'
          timer = setTimeout(tick, 1500)
          return
        }
        timer = setTimeout(tick, 45 + Math.random() * 55)
      } else if (phase === 'pausing') {
        phase = 'deleting'
        timer = setTimeout(tick, 40)
      } else {
        charIdx--
        setGhost(text.slice(0, Math.max(0, charIdx)))
        if (charIdx <= 0) {
          exIdx = (exIdx + 1) % examples.length
          phase = 'typing'
          timer = setTimeout(tick, 600)
          return
        }
        timer = setTimeout(tick, 22 + Math.random() * 25)
      }
    }
    timer = setTimeout(tick, 500)
    return () => { cancelled = true; clearTimeout(timer) }
  }, [step, userEngaged, done, sending])

  const lineColor = (line) => {
    if (line.startsWith('>') && line.includes('[✓]')) return 'var(--green)'
    if (line.startsWith('> [error]'))                  return '#FF5F57'
    if (line.startsWith('//'))                          return 'var(--blue)'
    if (line.startsWith('──'))                          return 'rgba(226,217,198,0.15)'
    if (line.startsWith('>'))                           return 'var(--green)'
    if (line.startsWith('  '))                          return 'rgba(226,217,198,0.7)'
    return '#EDE5D2'
  }

  const handleInputChange = (e) => {
    if (!userEngaged) setUserEngaged(true)
    setInput(e.target.value)
  }

  const handleKey = (e) => {
    if (!userEngaged) setUserEngaged(true)
    if (e.key !== 'Enter' || !input.trim() || sending) return
    const val = input.trim()
    const current = STEPS[step]

    if (current.validate) {
      const err = current.validate(val)
      if (err) {
        setLines(l => [...l, `  ${val}`, `> ${err}`])
        setInput('')
        return
      }
    }

    setLines(l => [...l, `  ${val}`])
    const newData = { ...data, [current.key]: val }
    setData(newData)
    setInput('')
    setUserEngaged(false) // re-enable ghost on next step

    const next = step + 1
    if (next < STEPS.length) {
      setTimeout(() => {
        setLines(l => [...l, STEPS[next].prompt])
        setStep(next)
      }, 260)
    } else {
      setSending(true)
      setLines(l => [
        ...l,
        `──────────────────────────────────────────`,
        `> [✓] validating fields...`,
        `> transmitting ticket...`,
      ])
      fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...newData, ticket_id: TICKET_ID }),
      })
        .then(r => r.ok ? r.json() : Promise.reject())
        .then(() => {
          setLines(l => [
            ...l,
            `> [✓] ticket committed`,
            `> [✓] assigned_to: Crickett`,
            `> [✓] response_sla: 24h`,
            `──────────────────────────────────────────`,
            `> ticket_id: ${TICKET_ID}`,
            `> status: OPEN`,
            `> -- end of line --`,
          ])
          setDone(true)
          setSending(false)
        })
        .catch(() => {
          setLines(l => [
            ...l,
            `> [error] transmission failed — email crickett@canipetthatdawg.co`,
          ])
          setSending(false)
        })
    }
  }

  return (
    <section
      className="section-pad"
      style={{ borderTop: '0.5px solid var(--border)', borderBottom: '0.5px solid var(--border)' }}
    >
      <p style={{ fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--green)', marginBottom: '14px' }}>
        Contact
      </p>
      <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 400, color: 'var(--charcoal)', marginBottom: '22px', lineHeight: 1.2 }}>
        Open a <em style={{ color: 'var(--orange)' }}>line.</em>
      </h2>

      <div
        onClick={() => { if (!done) inputRef.current?.focus() }}
        style={{
          background: '#0F0D0A',
          borderRadius: '8px',
          overflow: 'hidden',
          border: '0.5px solid rgba(255,255,255,0.08)',
        }}
      >
        {/* Title bar */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '10px 14px', background: '#1A1714',
          borderBottom: '0.5px solid rgba(255,255,255,0.06)',
        }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F57' }}/>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#FFBD2E' }}/>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28CA41' }}/>
          <span style={{
            fontFamily: 'var(--serif)', fontSize: 13, fontWeight: 700,
            color: 'rgba(255,255,255,0.72)', letterSpacing: '0.08em', marginLeft: 10,
          }}>
            crickett@canipet_that_dawg_llc ~ ticket
          </span>
        </div>

        {/* Body */}
        <div
          ref={bodyRef}
          style={{
            padding: '18px 18px 22px',
            minHeight: 260, maxHeight: 360,
            overflowY: 'auto',
            display: 'flex', flexDirection: 'column', gap: 4,
            cursor: 'text',
          }}
        >
          {lines.map((line, i) => (
            <p key={i} style={{
              fontFamily: 'var(--serif)',
              fontSize: 13, lineHeight: 1.7,
              color: lineColor(line),
              whiteSpace: 'pre-wrap', wordBreak: 'break-all',
            }}>
              {line}
            </p>
          ))}

          {!done && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 2, position: 'relative' }}>
              <span style={{ color: 'var(--green)', fontFamily: 'var(--serif)', fontSize: 13, flexShrink: 0 }}>{'>'}</span>

              <div style={{ flex: 1, minWidth: 0, position: 'relative' }}>
                {/* Ghost typing overlay */}
                {!userEngaged && !input && ghost && (
                  <div style={{
                    position: 'absolute', inset: 0,
                    display: 'flex', alignItems: 'center',
                    fontFamily: 'var(--serif)', fontSize: 13,
                    color: 'rgba(255,255,255,0.38)',
                    pointerEvents: 'none',
                    whiteSpace: 'nowrap', overflow: 'hidden',
                  }}>
                    {ghost}
                    <span style={{
                      display: 'inline-block', width: 6, height: 12, marginLeft: 2,
                      background: 'rgba(255,255,255,0.28)',
                      animation: 'blink 1s step-end infinite',
                    }}/>
                  </div>
                )}

                <input
                  ref={inputRef}
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={handleKey}
                  onFocus={() => setUserEngaged(true)}
                  placeholder={userEngaged || !ghost ? STEPS[step]?.placeholder : ''}
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck={false}
                  style={{
                    background: 'transparent', border: 'none', outline: 'none',
                    color: '#EDE5D2', fontFamily: 'var(--serif)',
                    fontSize: 13, width: '100%', minWidth: 0,
                    caretColor: 'var(--green)',
                  }}
                />
              </div>

              {userEngaged && (
                <span style={{
                  display: 'inline-block', width: 7, height: 14,
                  background: 'var(--green)',
                  animation: 'blink 1s step-end infinite',
                  flexShrink: 0,
                }}/>
              )}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
      `}</style>
    </section>
  )
}
