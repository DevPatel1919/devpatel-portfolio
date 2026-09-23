import { useEffect, useRef } from 'react'

/**
 * Dashed divider that draws left to right as it scrolls into view. Browsers
 * with scroll-driven animations tie the draw to `view()` in CSS; everywhere
 * else this arms a one-shot IntersectionObserver that plays it as a transition.
 */
export function Rule() {
  const ref = useRef<HTMLHRElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || CSS.supports('animation-timeline', 'view()')) return

    // Only hide the line once JS is here to bring it back.
    el.classList.add('is-armed')
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-in')
          observer.disconnect()
        }
      },
      // Trigger a little above the bottom edge so the draw is actually seen.
      { rootMargin: '0px 0px -12% 0px', threshold: 0 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return <hr ref={ref} className="rule" />
}
