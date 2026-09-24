import { useEffect, useLayoutEffect, useRef, type ReactNode } from 'react'

/** Total time for the label to resolve, and how often unresolved glyphs change. */
const DECODE_MS = 300
const SHUFFLE_MS = 45
const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

const randomGlyph = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)]

/**
 * The small mono label above each section title (`02 / WORK`). The first time
 * it comes into view its characters resolve left to right out of random
 * glyphs. Separators stay put, and since every glyph is one mono cell wide the
 * label never changes width. Screen readers get the real text from a hidden
 * copy; the animated one is aria-hidden.
 */
function SectionIndex({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const armed = useRef(false)

  // Before first paint, so the real text never flashes ahead of the scramble.
  useLayoutEffect(() => {
    const el = ref.current
    if (!el || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    armed.current = true
    el.textContent = text.replace(/[A-Z0-9]/g, randomGlyph)
  }, [text])

  useEffect(() => {
    const el = ref.current
    if (!el || !armed.current) return

    // Only letters and digits decode; everything else is fixed from the start.
    const slots = [...text].flatMap((ch, i) => (/[A-Z0-9]/.test(ch) ? [i] : []))
    let frame = 0
    let start = 0
    let lastShuffle = -Infinity
    let shown = [...(el.textContent ?? text)]

    const tick = (now: number) => {
      if (!start) start = now
      const elapsed = now - start
      const resolved = Math.floor((elapsed / DECODE_MS) * slots.length)
      const shuffle = now - lastShuffle >= SHUFFLE_MS
      if (shuffle) lastShuffle = now
      shown = shown.map((ch, i) => {
        const k = slots.indexOf(i)
        if (k === -1 || k < resolved) return text[i]
        return shuffle ? randomGlyph() : ch
      })
      el.textContent = shown.join('')
      if (resolved < slots.length) frame = requestAnimationFrame(tick)
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      frame = requestAnimationFrame(tick)
    })
    observer.observe(el)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
      el.textContent = text
    }
  }, [text])

  return (
    <span className="section__index">
      <span className="sr-only">{text}</span>
      <span ref={ref} aria-hidden="true">
        {text}
      </span>
    </span>
  )
}

export function Section({
  id,
  index,
  title,
  lede,
  children,
}: {
  id: string
  index: string
  title: string
  lede?: string
  children: ReactNode
}) {
  return (
    <section className="section" id={id}>
      <div className="col">
        <header className="section__head">
          <SectionIndex text={index} />
          <h2 className="section__title">{title}</h2>
          {lede && <p className="section__lede">{lede}</p>}
        </header>
        {children}
      </div>
    </section>
  )
}
