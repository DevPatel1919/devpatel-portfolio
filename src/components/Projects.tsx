import { projects, type Project } from '../data/content'
import { Section } from './Section'
import { Reveal } from './Reveal'
import { ArchDiagram } from './ArchDiagram'
import { ExternalIcon, CaretIcon } from './icons'

function Row({ k, v, learned = false }: { k: string; v: string; learned?: boolean }) {
  return (
    <div className={`pbh__row${learned ? ' pbh__row--learned' : ''}`}>
      <div className="pbh__k">{k}</div>
      <p className="pbh__v">{v}</p>
    </div>
  )
}

function Card({ project }: { project: Project }) {
  const { note, diagram, links, status } = project

  return (
    <article className={`project${project.featured ? ' project--featured' : ''}`}>
      <span className="status" data-s={status}>
        {status}
      </span>

      <div className="project__top">
        <h3 className="project__name">
          {project.live ? (
            <a
              className="project__live"
              href={project.live}
              target="_blank"
              rel="noreferrer noopener"
            >
              {project.name}
              <ExternalIcon />
            </a>
          ) : (
            project.name
          )}
        </h3>
        <span className="project__year">{project.year}</span>
      </div>

      <p className="project__tagline">{project.tagline}</p>

      <div className="pbh">
        <Row k="Problem" v={project.problem} />
        <Row k="Built" v={project.built} />
        <Row k="Hard part" v={project.hard} />
        <Row k="Took away" v={project.learned} learned />
      </div>

      {note && (
        <details className="disclosure">
          <summary>
            <CaretIcon />
            <span>Engineering note — {note.title}</span>
          </summary>
          <div className="disclosure__body">
            <p>{note.body}</p>
          </div>
        </details>
      )}

      {diagram && (
        <details className="disclosure">
          <summary>
            <CaretIcon />
            <span>View architecture</span>
          </summary>
          <div className="disclosure__body">
            <ArchDiagram name={diagram} />
          </div>
        </details>
      )}

      <div className="project__foot">
        <div className="chips">
          {project.stack.map((s) => (
            <span key={s} className="chip">
              {s}
            </span>
          ))}
        </div>

        {links.length > 0 ? (
          <div className="project__links">
            {links.map((l) => (
              <a key={l.href} href={l.href} target="_blank" rel="noreferrer noopener">
                {l.label} <ExternalIcon />
              </a>
            ))}
          </div>
        ) : (
          <span className="project__private">private repo</span>
        )}
      </div>
    </article>
  )
}

export function Projects() {
  return (
    <Section
      id="work"
      index="02 / WORK"
      title="Featured work"
      lede="Five projects, weighted by how much of my own thinking is in them. Some live in private repositories, so the write-ups carry the detail instead of a link."
    >
      <div className="projects">
        {projects.map((p) => (
          <Reveal key={p.slug}>
            <Card project={p} />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
