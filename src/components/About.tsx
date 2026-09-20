import { education, profile } from '../data/content'
import { Section } from './Section'

export function About() {
  return (
    <Section id="about" eyebrow="01" title="About">
      <div className="about">
        <div className="about__body">
          <p className="about__lede">{profile.summary}</p>
          <p>
            Right now that means production LLM reliability work at Vitruvix — structured outputs,
            deterministic guardrails, and fallback logic wrapped around self-hosted models, plus the
            eval work to prove the guardrails actually hold. Before that I was the founding developer
            at a fintech startup, building a swap valuation engine where a rounding error is a bug
            with a dollar value attached.
          </p>
          <p>
            I like problems with a sharp definition of correct: air-gapped software that genuinely
            cannot phone home, multi-tenant schemas where a leak between tenants is unthinkable, and
            audit logs that are append-only because they are hash-chained, not because everyone
            agreed to be careful.
          </p>
        </div>

        <aside className="about__card">
          <h3>Education</h3>
          <p className="about__school">{education.school}</p>
          <p className="about__meta">
            {education.degree}
            <br />
            {education.location} · {education.date}
          </p>
          <div className="about__tags">
            {education.activities.map((a) => (
              <span key={a} className="tag">
                {a}
              </span>
            ))}
          </div>
        </aside>
      </div>
    </Section>
  )
}
