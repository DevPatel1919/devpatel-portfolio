import { useEffect, useState } from 'react'
import { sections } from '../data/content'
import { ThemeToggle } from './ThemeToggle'

export function Nav() {
  const [active, setActive] = useState('')

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

  return (
    <header className="nav">
      <nav className="nav__pill" aria-label="Primary">
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className={active === s.id ? 'is-active' : undefined}
            aria-current={active === s.id ? 'true' : undefined}
          >
            {s.label}
          </a>
        ))}
        <span className="nav__divider" aria-hidden="true" />
        <ThemeToggle />
      </nav>
    </header>
  )
}
