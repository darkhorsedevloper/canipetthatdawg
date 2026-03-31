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
    validate: null,
  },
  {
    key: 'email',
    prompt: '> email:',
    placeholder: 'e.g. you@email.com',
    validate: v => EMAIL_RE.test(v) ? null : '[error] enter a valid email address',
  },
  {
    key: 'title',
    prompt: '> title:',
    placeholder: 'e.g. Interested in walk sessions for my dog',
    validate: null,
  },
  {
    key: 'message',
    prompt: '> message:',
    placeholder: 'Tell me what you\'re looking for...',
    validate: null,
  },
]

const SERVICE_MAP = {
  '1': 'Walk + Field Session',
  '2': 'Adventure Hike',
  '3': 'Overnight Stay',
  '4': 'General Question',
}

export default function ContactTerminal() {
  const [lines, setLines] = useState([
    `// can-i-pet-that-dawg — ticket terminal`,
    `// ${TIMESTAMP}`,
    `// ticket_id: ${TICKET_ID}  status: OPEN`,
    `──────────────────────────────────────────`,
    `> initializing ticket...`,
    `> type your response and press enter ↵`,
    `──────────────────────────────────────────`,
  ])
  const [step, setStep]       = useState(0)
  const [input, setInput]     = useState('')
  const [data, setData]       = useState({})
  const [done, setDone]       = useState(false)
  const [sending, setSending] = useState(false)
  const inputRef          = useRef(null)
  const bottomRef         = useRef(null)

  // Show first prompt on mount
  useEffect(() => {
    const s = STEPS[0]
    setLines(l => [
      ...l,
      s.prompt,
      ...(s.hint || []),
    ])
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    if (!done) inputRef.current?.focus()
  }, [lines, done])

  const handleKey = (e) => {
    if (e.key !== 'Enter' || !input.trim() || sending) return
    const val = input.trim()
    const current = STEPS[step]

    // Validate if needed
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

    const next = step + 1
    if (next < STEPS.length) {
      setTimeout(() => {
        setLines(l => [...l, STEPS[next].prompt])
        setStep(next)
      }, 280)
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
      <p style={{ fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--green)', marginBottom: '8px' }}>
        Contact
      </p>
      <h2 style={{ fontFamily: 'var(--serif)', fontSize: '28px', fontWeight: 400, color: 'var(--charcoal)', marginBottom: '20px', lineHeight: 1.25 }}>
        Open a <em style={{ color: 'var(--orange)' }}>line.</em>
      </h2>

      <div
        className="terminal-window"
        onClick={() => !done && inputRef.current?.focus()}
      >
        <div className="terminal-topbar">
          <span className="terminal-dot" style={{ background: '#FF5F57' }} />
          <span className="terminal-dot" style={{ background: '#FFBD2E' }} />
          <span className="terminal-dot" style={{ background: '#28CA41' }} />
          <span className="terminal-title">crickett@ciplc ~ ticket</span>
        </div>

        <div className="terminal-body">
          {lines.map((line, i) => (
            <p key={i} className="terminal-line" style={{
              color: line.startsWith('>') && line.includes('[✓]') ? 'var(--green)'
                   : line.startsWith('> [error]')               ? '#FF5F57'
                   : line.startsWith('//')                       ? 'var(--blue)'
                   : line.startsWith('──')                       ? 'rgba(226,217,198,0.15)'
                   : line.startsWith('>')                        ? 'var(--green)'
                   : line.startsWith('  [')                     ? 'rgba(226,217,198,0.55)'
                   :                                               '#EDE5D2',
            }}>
              {line}
            </p>
          ))}

          {!done && (
            <div className="terminal-input-row">
              <span className="terminal-caret">{'>'}</span>
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder={STEPS[step]?.placeholder}
                className="terminal-input"
                autoFocus
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
              />
              <span className="terminal-cursor" />
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      <style>{`
        .terminal-window {
          background: #0F0D0A;
          border-radius: 8px;
          overflow: hidden;
          border: 0.5px solid rgba(226,217,198,0.08);
        }
        .terminal-topbar {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 10px 14px;
          background: #1A1714;
          border-bottom: 0.5px solid rgba(226,217,198,0.06);
        }
        .terminal-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          display: inline-block;
        }
        .terminal-title {
          font-family: var(--serif);
          font-size: 10px;
          color: rgba(226,217,198,0.3);
          letter-spacing: 0.1em;
          margin-left: 8px;
        }
        .terminal-body {
          padding: 16px 14px 20px;
          min-height: 240px;
          max-height: 360px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 4px;
          cursor: text;
        }
        .terminal-line {
          font-family: var(--serif);
          font-size: 12px;
          line-height: 1.7;
          white-space: pre-wrap;
          word-break: break-all;
        }
        .terminal-input-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 4px;
        }
        .terminal-caret {
          color: var(--green);
          font-family: var(--serif);
          font-size: 12px;
          flex-shrink: 0;
        }
        .terminal-input {
          background: transparent;
          border: none;
          outline: none;
          color: #EDE5D2;
          font-family: var(--serif);
          font-size: 12px;
          flex: 1;
          caret-color: var(--green);
          min-width: 0;
        }
        .terminal-input::placeholder {
          color: rgba(226,217,198,0.2);
          font-style: italic;
        }
        .terminal-cursor {
          display: inline-block;
          width: 7px;
          height: 13px;
          background: var(--green);
          animation: blink 1s step-end infinite;
          flex-shrink: 0;
        }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }

        @media (min-width: 640px) {
          .terminal-body { padding: 20px 20px 24px; min-height: 280px; }
          .terminal-line { font-size: 13px; }
          .terminal-input { font-size: 13px; }
          .terminal-caret { font-size: 13px; }
        }
      `}</style>
    </section>
  )
}
