import { marquee } from '../data/content'

export function Marquee() {
  // Rendered twice so the -50% keyframe loops without a visible seam.
  const items = [...marquee, ...marquee]

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {items.map((item, i) => (
          <span className="marquee__item" key={`${item}-${i}`}>
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
