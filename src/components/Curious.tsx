import { curious } from '../data/content'
import { Section } from './Section'
import { Reveal } from './Reveal'

export function Curious() {
  return (
    <Section
      id="curious"
      index="03 / OPEN QUESTIONS"
      title="Things I'm curious about"
      lede="Open questions I keep circling back to. I don't have settled answers to most of these — that's why they're interesting."
    >
      <Reveal stagger>
        <div className="curious">
          {curious.map((c) => (
            <div className="curious__item reveal-item" key={c.topic}>
              <div className="curious__topic">{c.topic}</div>
              <p className="curious__q">{c.question}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  )
}
