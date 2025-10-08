import { useEffect, useRef, useState } from 'react'

export const useIntersectionObserver = ({
  rootMargin = '0px',
  threshold = 0.15,
  styles,
}: {
  rootMargin?: string
  threshold?: number
  styles: string
}): React.RefObject<HTMLElement> => {
  const section = useRef<HTMLElement>(null)
  const [isRevealed, setIsRevealed] = useState<boolean>(false)

  useEffect(() => {
    if (section.current === null) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true)
        }
      },
      {
        rootMargin: rootMargin,
        threshold: threshold,
      }
    )
    observer.observe(section.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (isRevealed)
      setTimeout(() => {
        if (section.current) {
          section.current.classList.add(styles)
        }
      }, 100)
  }, [isRevealed, section.current])

  return section
}
