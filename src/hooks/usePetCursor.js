import { useEffect } from 'react'

const html = document.documentElement

const start = () => {
  let isDown = false
  html.classList.add('pet-up')

  const interval = setInterval(() => {
    isDown = !isDown
    html.classList.toggle('pet-up', !isDown)
    html.classList.toggle('pet-down', isDown)
  }, 380)

  return interval
}

const stop = (interval) => {
  clearInterval(interval)
  html.classList.remove('pet-up', 'pet-down')
}

export function usePetCursor() {
  useEffect(() => {
    let interval = null

    const onOver = (e) => {
      if (e.target.closest('a, button') && !interval) {
        interval = start()
      }
    }

    const onOut = (e) => {
      const to = e.relatedTarget
      if (!to || !to.closest('a, button')) {
        stop(interval)
        interval = null
      }
    }

    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)

    return () => {
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      stop(interval)
    }
  }, [])
}
