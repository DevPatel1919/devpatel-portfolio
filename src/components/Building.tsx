import { building } from '../data/content'
import { Section } from './Section'
import { Reveal } from './Reveal'

export function Building() {
  return (
    <Section
      id="building"
      index="01 / NOW"
      title="What I'm building"
      lede="High-level by design — the engineering problems, not any employer's implementation."
    >
      <Reveal stagger>
        <div className="building__body reveal-item">
          <p>{building.lede}</p>
          <p>{building.body}</p>
        </div>

        <div className="qa">
          {building.questions.map((item) => (
            <div className="qa__item reveal-item" key={item.q}>
              <div className="qa__q">
                <span aria-hidden="true">?</span>
                {item.q}
              </div>
              <p className="qa__a">{item.a}</p>
            </div>
          ))}
        </div>

        <div className="chips">
          {building.stack.map((s) => (
            <span key={s} className="chip reveal-item">
              {s}
            </span>
          ))}
        </div>
      </Reveal>
    </Section>
  )
}
