import type { ReactNode } from 'react'

export function Section({
  id,
  eyebrow,
  title,
  lede,
  children,
}: {
  id: string
  eyebrow: string
  title: string
  lede?: string
  children: ReactNode
}) {
  return (
    <section className="section" id={id}>
      <div className="shell">
        <header className="section__head">
          <span className="section__eyebrow">{eyebrow}</span>
          <h2 className="section__title">{title}</h2>
          {lede && <p className="section__lede">{lede}</p>}
        </header>
        {children}
      </div>
    </section>
  )
}
