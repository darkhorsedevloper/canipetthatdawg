import { useState, useEffect } from 'react'

export function useDarkMode() {
  const [dark, setDark] = useState(() => {
    try {
      const saved = localStorage.getItem('cipd_dark')
      if (saved !== null) return saved === 'true'
    } catch {}
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false
  })

  useEffect(() => {
    try { localStorage.setItem('cipd_dark', dark) } catch {}
  }, [dark])

  return [dark, setDark]
}
