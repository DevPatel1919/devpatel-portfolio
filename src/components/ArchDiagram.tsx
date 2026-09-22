import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react'

/**
 * Small box-and-arrow system diagrams, one per project.
 * All colors come from CSS custom properties via the .arch class, so these
 * track the active theme without any JS.
 *
 * Every element takes an `at` step. It sets the build order when the diagram
 * opens (boxes appear, arrows draw), and arrows that share a step carry their
 * packet at the same time once the build finishes, so the flow reads in the
 * same order the system does.
 */

const STEP_MS = 110
// Longest build animation (arrowhead lands 240ms after its line starts, then
// fades for 140ms) — packets wait until everything is on screen.
const BUILD_TAIL_MS = 420
const HOP_MS = 700
const REST_MS = 1400
const TRAIL = 22

function step(at: number) {
  return { '--d': `${at * STEP_MS}ms` } as CSSProperties
}

type Props = { viewBox: string; children: ReactNode; label: string }

function Frame({ viewBox, children, label }: Props) {
  const ref = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const svg = ref.current
    if (!svg) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    const details = svg.closest('details')
    const arrows = [...svg.querySelectorAll<SVGGElement>('.arch-arrow')]
    const lastAt = Math.max(0, ...[...svg.querySelectorAll<SVGElement>('[data-at]')].map((el) => Number(el.dataset.at)))
    const buildMs = lastAt * STEP_MS + BUILD_TAIL_MS

    // One lane per arrow; lanes sharing a step fire together.
    const hops = [...new Set(arrows.map((a) => Number(a.dataset.at)))].sort((a, b) => a - b)
    const cycle = hops.length * HOP_MS + REST_MS

    const layer = document.createElementNS('http://www.w3.org/2000/svg', 'g')
    layer.setAttribute('class', 'arch-flow')
    layer.setAttribute('aria-hidden', 'true')
    svg.appendChild(layer)

    const lanes = arrows.map((a) => {
      const line = a.querySelector<SVGPathElement>('.arch-line')!
      const ring = a.dataset.dashed === 'true'
      const make = (tag: string, cls: string) => {
        const el = document.createElementNS('http://www.w3.org/2000/svg', tag)
        el.setAttribute('class', cls)
        layer.appendChild(el)
        return el
      }
      let trail: SVGPathElement | null = null
      if (!ring) {
        trail = make('path', 'arch-trail') as SVGPathElement
        trail.setAttribute('d', line.getAttribute('d')!)
      }
      const halo = make('circle', 'arch-halo')
      halo.setAttribute('r', '4.5')
      const dot = make('circle', ring ? 'arch-dot arch-dot--ring' : 'arch-dot')
      dot.setAttribute('r', ring ? '2' : '1.9')
      return { line, len: 0, trail, halo, dot, hop: hops.indexOf(Number(a.dataset.at)) }
    })

    const hide = () => layer.setAttribute('opacity', '0')
    hide()

    let raf = 0
    let timer = 0
    let origin = 0
    let built = false
    let onScreen = false

    const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2)

    const frame = (now: number) => {
      if (!origin) origin = now
      const t = (now - origin) % cycle
      for (const lane of lanes) {
        const local = (t - lane.hop * HOP_MS) / HOP_MS
        if (local < 0 || local > 1) {
          lane.dot.setAttribute('opacity', '0')
          lane.halo.setAttribute('opacity', '0')
          lane.trail?.setAttribute('opacity', '0')
          continue
        }
        const at = ease(local) * lane.len
        const p = lane.line.getPointAtLength(at)
        // Fade in over the first 12% of the hop and out over the last 12%.
        const alpha = Math.min(1, local / 0.12, (1 - local) / 0.12)
        for (const c of [lane.dot, lane.halo]) {
          c.setAttribute('cx', p.x.toFixed(2))
          c.setAttribute('cy', p.y.toFixed(2))
        }
        lane.dot.setAttribute('opacity', alpha.toFixed(3))
        lane.halo.setAttribute('opacity', (alpha * 0.2).toFixed(3))
        if (lane.trail) {
          const seg = Math.min(at, TRAIL)
          lane.trail.setAttribute('stroke-dasharray', `${seg} ${lane.len + TRAIL}`)
          lane.trail.setAttribute('stroke-dashoffset', String(seg - at))
          lane.trail.setAttribute('opacity', (alpha * 0.7).toFixed(3))
        }
      }
      raf = requestAnimationFrame(frame)
    }

    const sync = () => {
      const run = built && onScreen && !reduce.matches && (!details || details.open)
      if (run && !raf) {
        layer.setAttribute('opacity', '1')
        raf = requestAnimationFrame(frame)
      } else if (!run && raf) {
        cancelAnimationFrame(raf)
        raf = 0
        origin = 0
        hide()
      }
    }

    const play = () => {
      clearTimeout(timer)
      built = false
      sync()
      svg.classList.remove('is-live')
      // Force a style flush so re-adding the class restarts the keyframes.
      void svg.getBoundingClientRect()
      svg.classList.add('is-live')
      timer = window.setTimeout(() => {
        for (const lane of lanes) lane.len = lane.line.getTotalLength()
        built = true
        sync()
      }, buildMs)
    }

    const onToggle = () => {
      if (details!.open) play()
      else {
        clearTimeout(timer)
        built = false
        svg.classList.remove('is-live')
        sync()
      }
    }

    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting
      // Outside a disclosure, build the first time the diagram is seen.
      if (!details && onScreen && !svg.classList.contains('is-live')) play()
      sync()
    })
    io.observe(svg)

    details?.addEventListener('toggle', onToggle)
    reduce.addEventListener('change', sync)
    if (details?.open) play()

    return () => {
      io.disconnect()
      details?.removeEventListener('toggle', onToggle)
      reduce.removeEventListener('change', sync)
      clearTimeout(timer)
      cancelAnimationFrame(raf)
      layer.remove()
    }
  }, [])

  return (
    <svg ref={ref} className="arch" viewBox={viewBox} role="img" aria-label={label}>
      {children}
    </svg>
  )
}

function Box({
  x,
  y,
  w = 86,
  h = 28,
  label,
  at,
  accent = false,
}: {
  x: number
  y: number
  w?: number
  h?: number
  label: string
  at: number
  accent?: boolean
}) {
  return (
    <g className="arch-node" style={step(at)} data-at={at}>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={4}
        className={accent ? 'arch-box arch-accent' : 'arch-box'}
      />
      <text x={x + w / 2} y={y + h / 2 + 3} textAnchor="middle">
        {label}
      </text>
    </g>
  )
}

/** Paths here are only ever `M x y L x y ...`, so the last two points give the heading. */
function tip(d: string) {
  const n = d.match(/-?\d+(?:\.\d+)?/g)!.map(Number)
  const [x1, y1, x2, y2] = n.slice(-4)
  return { x: x2, y: y2, angle: (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI }
}

function Arrow({ d, at, dashed = false }: { d: string; at: number; dashed?: boolean }) {
  const t = tip(d)
  return (
    <g className="arch-arrow" style={step(at)} data-at={at} data-dashed={dashed}>
      <path
        d={d}
        // pathLength lets CSS draw a solid line with a 0..1 dash. Dashed lines
        // keep real units so their 3/3 pattern stays the right size.
        pathLength={dashed ? undefined : 1}
        className={dashed ? 'arch-line arch-dash' : 'arch-line'}
      />
      <path
        d="M-4.4 -1.9 L0 0 L-4.4 1.9Z"
        transform={`translate(${t.x} ${t.y}) rotate(${t.angle})`}
        className="arch-head"
      />
    </g>
  )
}

/** Anything that just fades in at its step: annotation text, frames, the blocked link. */
function Late({ at, children }: { at: number; children: ReactNode }) {
  return (
    <g className="arch-fade" style={step(at)} data-at={at}>
      {children}
    </g>
  )
}

function Shiftly() {
  return (
    <Frame viewBox="0 0 340 150" label="Shiftly architecture: per-hotel tenant scoping between the React client and PostgreSQL">
      <Box x={8} y={12} label="Front desk" at={0} />
      <Box x={8} y={58} label="Manager" at={0} />
      <Box x={8} y={104} label="Platform admin" at={0} />

      <Arrow d="M94 26 L110 26 L110 68 L123 68" at={1} />
      <Arrow d="M94 72 L123 72" at={1} />
      <Arrow d="M94 118 L110 118 L110 78 L123 78" at={1} />

      <Box x={127} y={58} w={86} h={28} label="Express API" at={2} accent />
      <Late at={3}>
        <text x={170} y={100} textAnchor="middle" className="arch-key">
          tenant scope + RBAC
        </text>
      </Late>

      <Arrow d="M213 72 L242 72" at={3} />
      <Box x={246} y={58} label="PostgreSQL" at={4} />
      <Late at={5}>
        <text x={289} y={100} textAnchor="middle" className="arch-key">
          Prisma
        </text>
      </Late>
    </Frame>
  )
}

function Voice() {
  return (
    <Frame viewBox="0 0 340 92" label="Voice agent flow: inbound call routed through Twilio and n8n to a model, then back to the caller">
      <Box x={6} y={30} w={64} label="Caller" at={0} />
      <Arrow d="M70 44 L88 44" at={1} />
      <Box x={92} y={30} w={64} label="Twilio" at={2} />
      <Arrow d="M156 44 L174 44" at={3} />
      <Box x={178} y={30} w={64} label="n8n" at={4} accent />
      <Arrow d="M242 44 L260 44" at={5} />
      <Box x={264} y={30} w={70} label="LLM" at={6} />
      <Arrow d="M299 60 L299 76 L38 76 L38 60" at={7} dashed />
      <Late at={8}>
        <text x={170} y={88} textAnchor="middle" className="arch-key">
          spoken response
        </text>
      </Late>
    </Frame>
  )
}

function Swapvest() {
  return (
    <Frame viewBox="0 0 340 150" label="SwapVest architecture: FastAPI valuation and settlement over PostgreSQL with SSE pricing to the client">
      <Box x={8} y={56} w={74} label="React client" at={0} />
      <Arrow d="M82 66 L118 66" at={1} />
      <Box x={122} y={56} w={96} h={26} label="FastAPI" at={2} accent />

      <Arrow d="M170 52 L170 38" at={3} />
      <Arrow d="M170 82 L170 96" at={3} />
      <Arrow d="M218 69 L248 69" at={3} />
      <Box x={122} y={12} w={96} h={26} label="Valuation" at={4} />
      <Box x={122} y={100} w={96} h={26} label="Settlement" at={4} />
      <Box x={252} y={56} w={80} h={26} label="PostgreSQL" at={4} />

      <Arrow d="M118 76 L96 76 L96 84" at={5} dashed />
      <Late at={6}>
        <text x={64} y={96} textAnchor="middle" className="arch-key">
          SSE prices
        </text>
        <text x={170} y={140} textAnchor="middle" className="arch-key">
          Decimal throughout · row-level locks
        </text>
      </Late>
    </Frame>
  )
}

function Carver() {
  return (
    <Frame viewBox="0 0 340 118" label="CARVER architecture: a Tauri webview over a Rust core and local SQLite, with no network boundary">
      <Late at={0}>
        <rect x={6} y={8} width={230} height={100} rx={6} className="arch-box arch-dash" />
        <text x={121} y={24} textAnchor="middle" className="arch-key">
          single machine · no network
        </text>
      </Late>
      <Box x={22} y={34} w={90} h={26} label="Webview UI" at={1} />
      <Arrow d="M112 47 L126 47" at={2} />
      <Box x={130} y={34} w={90} h={26} label="Rust core" at={3} accent />
      <Arrow d="M170 60 L136 60 L136 70" at={4} />
      <Box x={76} y={74} w={90} h={26} label="SQLite" at={5} />
      <Late at={6}>
        <path d="M252 50 L280 50" className="arch-line arch-dash" />
        <path d="M258 42 L274 58 M274 42 L258 58" className="arch-line" />
        <text x={295} y={53} className="arch-key">
          cloud
        </text>
      </Late>
    </Frame>
  )
}

function Nba() {
  return (
    <Frame viewBox="0 0 340 92" label="NBA pipeline: raw games through ETL and feature engineering into models, served to a React dashboard">
      <Box x={4} y={30} w={62} h={28} label="35k games" at={0} />
      <Arrow d="M66 44 L78 44" at={1} />
      <Box x={82} y={30} w={58} h={28} label="ETL" at={2} />
      <Arrow d="M140 44 L152 44" at={3} />
      <Box x={156} y={30} w={68} h={28} label="Features" at={4} accent />
      <Arrow d="M224 44 L236 44" at={5} />
      <Box x={240} y={30} w={58} h={28} label="Models" at={6} />
      <Late at={7}>
        <text x={190} y={72} textAnchor="middle" className="arch-key">
          era-normalized · difference-based
        </text>
        <text x={269} y={22} textAnchor="middle" className="arch-key">
          LR · HGB
        </text>
      </Late>
    </Frame>
  )
}

const registry: Record<string, () => React.ReactElement> = {
  shiftly: Shiftly,
  voice: Voice,
  swapvest: Swapvest,
  carver: Carver,
  nba: Nba,
}

export function ArchDiagram({ name }: { name: string }) {
  const Diagram = registry[name]
  return Diagram ? <Diagram /> : null
}
