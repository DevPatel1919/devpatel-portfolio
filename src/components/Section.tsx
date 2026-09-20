import type { ReactNode } from 'react'

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
          <span className="section__index">{index}</span>
          <h2 className="section__title">{title}</h2>
          {lede && <p className="section__lede">{lede}</p>}
        </header>
        {children}
      </div>
    </section>
  )
}
