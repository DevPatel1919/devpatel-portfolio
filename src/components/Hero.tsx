import { profile } from '../data/content'
import { GithubIcon, LinkedinIcon, MailIcon, DownloadIcon, ArrowIcon } from './icons'

const stats = [
  { value: '730+', label: 'LLM outputs analyzed' },
  { value: '37', label: 'REST + SSE endpoints shipped' },
  { value: '20k+', label: 'NBA records in ETL' },
]

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__glow" aria-hidden="true" />
      <div className="shell">
        <p className="hero__eyebrow">
          <span className="pulse" aria-hidden="true" />
          {profile.role} · {profile.location}
        </p>

        <h1 className="hero__name">{profile.name}</h1>

        <p className="hero__tagline">{profile.tagline}</p>

        <div className="hero__cta">
          <a className="btn btn--primary" href="#projects">
            View work <ArrowIcon />
          </a>
          <a className="btn btn--ghost" href={profile.resume} download>
            <DownloadIcon /> Resume
          </a>
        </div>

        <div className="hero__social">
          <a href={profile.github} target="_blank" rel="noreferrer noopener" aria-label="GitHub">
            <GithubIcon />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer noopener" aria-label="LinkedIn">
            <LinkedinIcon />
          </a>
          <a href={`mailto:${profile.email}`} aria-label="Email">
            <MailIcon />
          </a>
        </div>

        <dl className="hero__stats">
          {stats.map((s) => (
            <div key={s.label} className="hero__stat">
              <dt>{s.value}</dt>
              <dd>{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
