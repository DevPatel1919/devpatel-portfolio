import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { sections } from '../data/content'
import { ThemeToggle } from './ThemeToggle'

export function Nav() {
  const [active, setActive] = useState('')
  const pillRef = useRef<HTMLElement>(null)
  const indicatorRef = useRef<HTMLSpanElement>(null)
  const progressRef = useRef<HTMLSpanElement>(null)
  const links = useRef(new Map<string, HTMLAnchorElement>())
  const activeId = useRef('')
  const placed = useRef(false)

  useEffect(() => {
    // Track every section currently in the band so the highlight can clear
    // when none of them is — otherwise it sticks on the last match at the top.
    const ratios = new Map<string, number>()

    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) ratios.set(e.target.id, e.intersectionRatio)
          else ratios.delete(e.target.id)
        }
        const best = [...ratios.entries()].sort((a, b) => b[1] - a[1])[0]
        setActive(best ? best[0] : '')
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.2, 0.6, 1] },
    )
    for (const s of sections) {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [])

  /**
   * Parks the indicator over a link. `instant` suppresses the slide, which is
   * what we want the first time it appears and whenever we are only correcting
   * a measurement — the indicator should travel in response to reading, not to
   * a resize or a font swapping in.
   */
  const place = useCallback((id: string, instant: boolean) => {
    const el = indicatorRef.current
    const link = links.current.get(id)
    if (!el || !link) return
    if (instant) el.style.transition = 'none'
    el.style.width = `${link.offsetWidth}px`
    el.style.height = `${link.offsetHeight}px`
    el.style.transform = `translate(${link.offsetLeft}px, ${link.offsetTop}px)`
    if (instant) {
      el.getBoundingClientRect()
      el.style.transition = ''
    }
  }, [])

  useLayoutEffect(() => {
    activeId.current = active
    // Nothing active means the top of the page: fade out, but hold the last
    // position so the indicator does not slide home on the way out.
    if (!active) return
    place(active, !placed.current)
    placed.current = true
  }, [active, place])

  useEffect(() => {
    // The pill reflows on a window resize and again when JetBrains Mono swaps
    // in for the fallback, and either one moves the links under the indicator.
    const remeasure = () => {
      if (activeId.current) place(activeId.current, true)
    }
    const ro = new ResizeObserver(remeasure)
    if (pillRef.current) ro.observe(pillRef.current)
    let live = true
    document.fonts?.ready.then(() => {
      if (live) remeasure()
    })
    return () => {
      live = false
      ro.disconnect()
    }
  }, [place])

  useEffect(() => {
    // Browsers with scroll-driven animations run the progress line off
    // `scroll(root)` in CSS; everywhere else it is this rAF-throttled listener.
    const el = progressRef.current
    if (!el || CSS.supports('animation-timeline', 'scroll()')) return

    let frame = 0
    const update = () => {
      frame = 0
      const doc = document.documentElement
      const max = doc.scrollHeight - doc.clientHeight
      el.style.setProperty('--p', max > 0 ? String(Math.min(1, doc.scrollTop / max)) : '0')
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <header className="nav">
      <nav className="nav__pill" aria-label="Primary" ref={pillRef}>
        <span
          className={active ? 'nav__indicator is-on' : 'nav__indicator'}
          aria-hidden="true"
          ref={indicatorRef}
        />
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            ref={(el) => {
              if (el) links.current.set(s.id, el)
              else links.current.delete(s.id)
            }}
            className={active === s.id ? 'is-active' : undefined}
            aria-current={active === s.id ? 'true' : undefined}
          >
            {s.label}
          </a>
        ))}
        <span className="nav__divider" aria-hidden="true" />
        <ThemeToggle />
        <span className="nav__progress" aria-hidden="true" ref={progressRef} />
      </nav>
    </header>
  )
}
