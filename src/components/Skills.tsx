import { skills } from '../data/content'
import { Section } from './Section'

export function Skills() {
  return (
    <Section id="skills" eyebrow="04" title="Skills">
      <div className="skills">
        {skills.map((g) => (
          <div key={g.group} className="skills__group">
            <h3 className="skills__label">{g.group}</h3>
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
    </Section>
  )
}
