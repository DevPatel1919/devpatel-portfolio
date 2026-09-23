import { Fragment, type CSSProperties, type ReactNode } from 'react'
import { profile, now } from '../data/content'
import { GithubIcon, LinkedinIcon, MailIcon, DownloadIcon, ArrowIcon } from './icons'

// The headline is split so each word can rise behind its own mask on load.
// The word spans are decorative markup, so they are hidden from assistive tech
// and the real sentence is carried by the <h1>'s aria-label instead.
const LEAD = ['I', 'build', 'software', 'for', 'problems', 'that', 'are']
const EM = ['actually', 'happening']
const HEADLINE = `${LEAD.join(' ')} ${EM.join(' ')}.`

/**
 * One masked word of the headline. `at` is its position in the load sequence;
 * `mark` adds the orange underline that draws once the word has landed, with
 * `at` doubling as the draw order within the emphasized phrase.
 */
function Word({ children, at, mark }: { children: ReactNode; at: number; mark?: number }) {
  const vars = { '--w': at, ...(mark === undefined ? null : { '--u': mark }) } as CSSProperties
  return (
    <span className={mark === undefined ? 'word' : 'word word--mark'} style={vars}>
      <span className="word__in">{children}</span>
    </span>
  )
}

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

        <h1 className="hero__headline" aria-label={HEADLINE}>
          <span aria-hidden="true">
            {LEAD.map((word, i) => (
              <Fragment key={word}>
                <Word at={i}>{word}</Word>{' '}
              </Fragment>
            ))}
            <em>
              <Word at={7} mark={0}>
                actually
              </Word>{' '}
              <Word at={8} mark={1}>
                happening
              </Word>
            </em>
            {/* Rides along with the word it belongs to; line breaking never
                separates a period from what precedes it. */}
            <Word at={8}>.</Word>
          </span>
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
