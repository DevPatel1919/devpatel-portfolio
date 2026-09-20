import { profile } from '../data/content'
import { Section } from './Section'
import { GithubIcon, LinkedinIcon, MailIcon, ArrowIcon } from './icons'

const channels = [
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}`, Icon: MailIcon, external: false },
  { label: 'LinkedIn', value: 'in/thedevspatel', href: profile.linkedin, Icon: LinkedinIcon, external: true },
  { label: 'GitHub', value: 'DevPatel1919', href: profile.github, Icon: GithubIcon, external: true },
]

export function Contact() {
  return (
    <Section
      id="contact"
      eyebrow="05"
      title="Contact"
      lede="Open to conversations about backend, AI engineering, and anything where correctness matters."
    >
      <div className="contact">
        {channels.map(({ label, value, href, Icon, external }) => (
          <a
            key={label}
            className="contact__card"
            href={href}
            {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
          >
            <span className="contact__icon" aria-hidden="true">
              <Icon />
            </span>
            <span className="contact__text">
              <span className="contact__label">{label}</span>
              <span className="contact__value">{value}</span>
            </span>
            <span className="contact__arrow" aria-hidden="true">
              <ArrowIcon />
            </span>
          </a>
        ))}
      </div>
    </Section>
  )
}
