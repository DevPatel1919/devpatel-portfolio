import { experience } from '../data/content'
import { Section } from './Section'

export function Experience() {
  return (
    <Section id="experience" eyebrow="02" title="Experience">
      <ol className="timeline">
        {experience.map((job) => (
          <li key={job.company} className="timeline__item">
            <div className="timeline__marker" aria-hidden="true">
              <span className={job.current ? 'dot dot--live' : 'dot'} />
            </div>

            <div className="timeline__body">
              <div className="timeline__head">
                <h3 className="timeline__company">
                  {job.company}
                  {job.team && <span className="timeline__team"> · {job.team}</span>}
                </h3>
                <span className="timeline__period">{job.period}</span>
              </div>

              <p className="timeline__role">
                {job.title} <span className="timeline__sep">·</span> {job.location}
              </p>

              <ul className="bullets">
                {job.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>

              <div className="chips">
                {job.stack.map((s) => (
                  <span key={s} className="chip">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  )
}
