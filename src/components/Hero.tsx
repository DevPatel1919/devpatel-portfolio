import { profile, now } from '../data/content'
import { GithubIcon, LinkedinIcon, MailIcon, DownloadIcon, ArrowIcon } from './icons'

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="col">
        <div className="hero__id">
          <img
            className="hero__avatar"
            src="/dev-patel.webp"
            width={42}
            height={42}
            // The name sits directly beside this, so the photo is decorative
            // rather than a second announcement of it.
            alt=""
          />
          <div>
            <div className="hero__handle">{profile.name}</div>
            <div className="hero__role">{profile.role}</div>
          </div>
        </div>

        <h1 className="hero__headline">
          I build software for problems that are <em>actually happening</em>.
        </h1>

        <p className="hero__intro">{profile.intro}</p>

        <div className="hero__cta">
          <a className="btn btn--solid" href="#work">
            View my work <ArrowIcon />
          </a>
          <a className="btn" href={profile.github} target="_blank" rel="noreferrer noopener">
            <GithubIcon /> GitHub
          </a>
          <a className="btn" href={profile.linkedin} target="_blank" rel="noreferrer noopener">
            <LinkedinIcon /> LinkedIn
          </a>
          <a className="btn" href={profile.resume} download>
            <DownloadIcon /> Resume
          </a>
          <a className="btn" href="#contact">
            <MailIcon /> Contact
          </a>
        </div>

        <div className="now">
          <div className="now__head">
            <span className="pulse" aria-hidden="true" />
            <span className="mono-label">Currently</span>
          </div>
          <ul className="now__list">
            {now.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
