import { about, experience, skills } from '../data/content'
import { Section } from './Section'
import { Reveal } from './Reveal'

export function About() {
  return (
    <Section id="about" index="04 / BACKGROUND" title="About">
      <Reveal>
        <div className="about">
          {about.map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}
        </div>
      </Reveal>

      <Reveal>
        <h3 className="mono-label" style={{ marginTop: '34px', display: 'block' }}>
          Experience
        </h3>
        <div className="xp">
          {experience.map((x) => (
            <div className="xp__item" key={`${x.title}-${x.org}`}>
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

      <Reveal>
        <h3 className="mono-label" style={{ marginTop: '34px', display: 'block' }}>
          Skills
        </h3>
        <div className="skills">
          {skills.map((g) => (
            <div className="skills__group" key={g.group}>
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
