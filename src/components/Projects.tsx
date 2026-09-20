import { projects } from '../data/content'
import { Section } from './Section'
import { ExternalIcon, LockIcon } from './icons'

export function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="03"
      title="Projects"
      lede="Selected work. Some of these live in private repositories — client code and startup source — so the write-ups carry the detail instead."
    >
      <div className="projects">
        {projects.map((p) => (
          <article key={p.slug} className="project" data-accent={p.accent}>
            <div className="project__bar" aria-hidden="true" />

            <div className="project__head">
              <div>
                <h3 className="project__name">{p.name}</h3>
                <p className="project__context">{p.context}</p>
              </div>
              <span className="project__period">{p.period}</span>
            </div>

            <p className="project__blurb">{p.blurb}</p>

            <ul className="bullets">
              {p.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>

            <div className="chips">
              {p.stack.map((s) => (
                <span key={s} className="chip">
                  {s}
                </span>
              ))}
            </div>

            <div className="project__foot">
              {p.visibility === 'private' ? (
                <span className="badge badge--private">
                  <LockIcon /> Private repository
                </span>
              ) : (
                <span className="badge badge--public">Open source</span>
              )}

              <div className="project__links">
                {p.links.map((l) => (
                  <a key={l.href} href={l.href} target="_blank" rel="noreferrer noopener">
                    {l.label} <ExternalIcon />
                  </a>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  )
}
