const pills = [
  'Fear Free Certified',
  'Pet CPR + First Aid',
  'Insured + Bonded',
  'Background Checked',
  'Time to Pet Portal',
]

export default function Creds() {
  return (
    <div style={{
      padding: '20px 28px',
      display: 'flex',
      gap: '7px',
      flexWrap: 'wrap',
      borderBottom: '0.5px solid var(--border)',
      background: 'var(--panel)',
    }}>
      {pills.map(p => (
        <span key={p} style={{
          fontSize: '10px',
          letterSpacing: '0.06em',
          border: '0.5px solid var(--border)',
          color: 'var(--faint)',
          padding: '6px 13px',
          borderRadius: '2px',
          background: 'var(--bg)',
        }}>
          {p}
        </span>
      ))}
    </div>
  )
}