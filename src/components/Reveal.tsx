import { useEffect, useRef, type ReactNode } from 'react'

/** Per-item stagger step and ceiling, so long lists don't drag. */
const STAGGER_MS = 50
const STAGGER_CAP_MS = 400

/**
 * Fades content in once as it enters the viewport. The reduced-motion opt-out
 * lives in styles.css, so this stays a no-op visually for those users.
 *
 * With `stagger`, the wrapper itself doesn't fade. Instead every descendant
 * marked `.reveal-item` rises in on its own as it arrives, and items that
 * arrive together cascade in document order via `--reveal-delay`.
 */
export function Reveal({
  children,
  delay = 0,
  stagger = false,
}: {
  children: ReactNode
  delay?: number
  stagger?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Positive bottom margin extends the root below the viewport, so a block
    // starts fading in before it scrolls into view and is never caught blank.
    const options = { rootMargin: '0px 0px 400px 0px', threshold: 0 }

    if (!stagger) {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-in')
          observer.disconnect()
        }
      }, options)
      observer.observe(el)
      return () => observer.disconnect()
    }

    const observer = new IntersectionObserver((entries) => {
      // Entries arrive in observation order, which is document order.
      let i = 0
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        const item = entry.target as HTMLElement
        const ms = Math.min(i * STAGGER_MS, STAGGER_CAP_MS)
        item.style.setProperty('--reveal-delay', `${ms}ms`)
        item.classList.add('is-in')
        observer.unobserve(item)
        i++
      }
    }, options)
    el.querySelectorAll('.reveal-item').forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [stagger])

  if (stagger) {
    return (
      <div ref={ref} className="reveal-group">
        {children}
      </div>
    )
  }

  return (
    <div ref={ref} className="reveal" style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </div>
  )
}
