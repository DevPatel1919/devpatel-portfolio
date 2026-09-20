import { profile } from '../data/content'
import { Section } from './Section'
import { Reveal } from './Reveal'
import { ExternalIcon } from './icons'

const rows = [
  { k: 'Email', v: profile.email, href: `mailto:${profile.email}`, external: false },
  { k: 'LinkedIn', v: 'in/thedevspatel', href: profile.linkedin, external: true },
  { k: 'GitHub', v: 'DevPatel1919', href: profile.github, external: true },
  { k: 'Resume', v: 'Download PDF', href: profile.resume, external: false },
]

export function Contact() {
  return (
    <Section id="contact" index="05 / CONTACT" title="Get in touch">
      <Reveal>
        <p className="contact__lede">
          If you're building something interesting, I'd like to hear about it.
        </p>

        <div className="contact__list">
          {rows.map((r) => (
            <a
              key={r.k}
              className="contact__row"
              href={r.href}
              {...(r.external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
              {...(r.k === 'Resume' ? { download: true } : {})}
            >
              <span className="contact__k">{r.k}</span>
              <span className="contact__val">{r.v}</span>
              <span className="contact__arrow" aria-hidden="true">
                <ExternalIcon />
              </span>
            </a>
          ))}
        </div>
      </Reveal>
    </Section>
  )
}
