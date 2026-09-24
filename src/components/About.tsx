import { useEffect, useRef } from 'react'
import { about, experience, skills } from '../data/content'
import { Section } from './Section'
import { Reveal } from './Reveal'

/** Where the timeline's fill tip sits, as a fraction of viewport height. */
const READING_LINE = 0.575

/**
 * Browsers with scroll-driven animations fill the experience timeline from
 * `view-timeline` in CSS. Everywhere else this writes the same progress to
 * `--xp-p`, listening to scroll only while the list is on screen.
 */
function useTimelineFallback() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || CSS.supports('animation-timeline', 'view()')) return

    let frame = 0
    const update = () => {
      frame = 0
      const { top, height } = el.getBoundingClientRect()
      const p = (innerHeight * READING_LINE - top) / height
      el.style.setProperty('--xp-p', String(Math.min(1, Math.max(0, p))))
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    const stop = () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
    const observer = new IntersectionObserver(([entry]) => {
      // One last update on the way out, so a fast scroll can't strand the
      // fill part-way.
      update()
      if (entry.isIntersecting) {
        window.addEventListener('scroll', schedule, { passive: true })
        window.addEventListener('resize', schedule)
      } else {
        stop()
      }
    })
    observer.observe(el)
    return () => {
      observer.disconnect()
      stop()
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return ref
}

export function About() {
  const xpRef = useTimelineFallback()

  return (
    <Section id="about" index="04 / BACKGROUND" title="About">
      <Reveal>
        <div className="about">
          {about.map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}
        </div>
      </Reveal>

      <Reveal stagger>
        <h3 className="mono-label about__sub reveal-item">Experience</h3>
        <div className="xp" ref={xpRef}>
          {experience.map((x) => (
            <div className="xp__item reveal-item" key={`${x.title}-${x.org}`}>
              <div>
                <div className="xp__title">{x.title}</div>
                <div className="xp__org">
                  {x.current && <span className="pulse" aria-hidden="true" />}
                  {x.org}
                </div>
              </div>
              <div className="xp__period">{x.period}</div>
              <p className="xp__detail">{x.detail}</p>
              {x.tags.length > 0 && (
                <div className="xp__tags chips">
                  {x.tags.map((t) => (
                    <span key={t} className="chip">
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal stagger>
        <h3 className="mono-label about__sub reveal-item">Skills</h3>
        <div className="skills">
          {skills.map((g) => (
            <div className="skills__group reveal-item" key={g.group}>
              <div className="skills__label">{g.group}</div>
              <div className="chips">
                {g.items.map((i) => (
                  <span key={i} className="chip">
                    {i}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  )
}
