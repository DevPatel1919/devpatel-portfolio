import { useEffect, useRef, type ReactNode } from 'react'

/**
 * Fades content in once as it enters the viewport. The reduced-motion opt-out
 * lives in styles.css, so this stays a no-op visually for those users.
 */
export function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-in')
          observer.disconnect()
        }
      },
      // Positive bottom margin extends the root below the viewport, so a block
      // starts fading in before it scrolls into view and is never caught blank.
      { rootMargin: '0px 0px 400px 0px', threshold: 0 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="reveal" style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </div>
  )
}
