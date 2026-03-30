import { useEffect } from 'react'

const makeCursor = (handY) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="44" height="62" viewBox="0 0 44 62"><text x="2" y="${handY}" font-size="26">🫳🏼</text><text x="2" y="60" font-size="26">🐕</text></svg>`
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}") 16 ${handY - 4}, pointer`
}

const CURSOR_UP   = makeCursor(22)  // hand raised
const CURSOR_DOWN = makeCursor(38)  // hand on dog's head

export function usePetCursor() {
  useEffect(() => {
    let interval = null
    let isDown = false

    const start = () => {
      isDown = false
      document.body.style.cursor = CURSOR_UP
      interval = setInterval(() => {
        isDown = !isDown
        document.body.style.cursor = isDown ? CURSOR_DOWN : CURSOR_UP
      }, 380)
    }

    const stop = () => {
      clearInterval(interval)
      interval = null
      document.body.style.cursor = ''
    }

    const onOver = (e) => {
      if (e.target.closest('a, button') && !interval) start()
    }

    const onOut = (e) => {
      const to = e.relatedTarget
      if (!to || !to.closest('a, button')) stop()
    }

    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)

    return () => {
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      clearInterval(interval)
    }
  }, [])
}
