/**
 * Small box-and-arrow system diagrams, one per project.
 * All colors come from CSS custom properties via the .arch class, so these
 * track the active theme without any JS.
 */

type Props = { viewBox: string; children: React.ReactNode; label: string }

function Frame({ viewBox, children, label }: Props) {
  return (
    <svg className="arch" viewBox={viewBox} role="img" aria-label={label}>
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
  accent = false,
}: {
  x: number
  y: number
  w?: number
  h?: number
  label: string
  accent?: boolean
}) {
  return (
    <g>
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

function Arrow({ d, dashed = false }: { d: string; dashed?: boolean }) {
  return <path d={d} className={dashed ? 'arch-line arch-dash' : 'arch-line'} markerEnd="url(#ah)" />
}

function Defs() {
  return (
    <defs>
      <marker id="ah" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="5" markerHeight="5" orient="auto">
        <path d="M0 1L7 4L0 7Z" className="arch-head" />
      </marker>
    </defs>
  )
}

function Shiftly() {
  return (
    <Frame viewBox="0 0 340 150" label="Shiftly architecture: per-hotel tenant scoping between the React client and PostgreSQL">
      <Defs />
      <Box x={8} y={12} label="Front desk" />
      <Box x={8} y={58} label="Manager" />
      <Box x={8} y={104} label="Platform admin" />

      <Box x={127} y={58} w={86} h={28} label="Express API" accent />
      <text x={170} y={100} textAnchor="middle" className="arch-key">
        tenant scope + RBAC
      </text>

      <Box x={246} y={58} label="PostgreSQL" />
      <text x={289} y={100} textAnchor="middle" className="arch-key">
        Prisma
      </text>

      <Arrow d="M94 26 L110 26 L110 68 L123 68" />
      <Arrow d="M94 72 L123 72" />
      <Arrow d="M94 118 L110 118 L110 78 L123 78" />
      <Arrow d="M213 72 L242 72" />
    </Frame>
  )
}

function Voice() {
  return (
    <Frame viewBox="0 0 340 92" label="Voice agent flow: inbound call routed through Twilio and n8n to a model, then back to the caller">
      <Defs />
      <Box x={6} y={30} w={64} label="Caller" />
      <Box x={92} y={30} w={64} label="Twilio" />
      <Box x={178} y={30} w={64} label="n8n" accent />
      <Box x={264} y={30} w={70} label="LLM" />
      <Arrow d="M70 44 L88 44" />
      <Arrow d="M156 44 L174 44" />
      <Arrow d="M242 44 L260 44" />
      <path d="M299 60 L299 76 L38 76 L38 60" className="arch-line arch-dash" markerEnd="url(#ah)" />
      <text x={170} y={88} textAnchor="middle" className="arch-key">
        spoken response
      </text>
    </Frame>
  )
}

function Swapvest() {
  return (
    <Frame viewBox="0 0 340 150" label="SwapVest architecture: FastAPI valuation and settlement over PostgreSQL with SSE pricing to the client">
      <Defs />
      <Box x={8} y={56} w={74} label="React client" />
      <Box x={122} y={12} w={96} h={26} label="Valuation" />
      <Box x={122} y={56} w={96} h={26} label="FastAPI" accent />
      <Box x={122} y={100} w={96} h={26} label="Settlement" />
      <Box x={252} y={56} w={80} h={26} label="PostgreSQL" />

      <Arrow d="M82 66 L118 66" />
      <Arrow d="M170 52 L170 38" />
      <Arrow d="M170 82 L170 96" />
      <Arrow d="M218 69 L248 69" />
      <path d="M118 76 L96 76 L96 84" className="arch-line arch-dash" markerEnd="url(#ah)" />
      <text x={64} y={96} textAnchor="middle" className="arch-key">
        SSE prices
      </text>
      <text x={170} y={140} textAnchor="middle" className="arch-key">
        Decimal throughout · row-level locks
      </text>
    </Frame>
  )
}

function Carver() {
  return (
    <Frame viewBox="0 0 340 118" label="CARVER architecture: a Tauri webview over a Rust core and local SQLite, with no network boundary">
      <Defs />
      <rect x={6} y={8} width={230} height={100} rx={6} className="arch-box arch-dash" />
      <text x={121} y={24} textAnchor="middle" className="arch-key">
        single machine · no network
      </text>
      <Box x={22} y={34} w={90} h={26} label="Webview UI" />
      <Box x={130} y={34} w={90} h={26} label="Rust core" accent />
      <Box x={76} y={74} w={90} h={26} label="SQLite" />
      <Arrow d="M112 47 L126 47" />
      <Arrow d="M170 60 L136 60 L136 70" />
      <path d="M252 50 L280 50" className="arch-line arch-dash" />
      <path d="M258 42 L274 58 M274 42 L258 58" className="arch-line" />
      <text x={295} y={53} className="arch-key">
        cloud
      </text>
    </Frame>
  )
}

function Nba() {
  return (
    <Frame viewBox="0 0 340 92" label="NBA pipeline: raw games through ETL and feature engineering into models, served to a React dashboard">
      <Defs />
      <Box x={4} y={30} w={62} h={28} label="35k games" />
      <Box x={82} y={30} w={58} h={28} label="ETL" />
      <Box x={156} y={30} w={68} h={28} label="Features" accent />
      <Box x={240} y={30} w={58} h={28} label="Models" />
      <Arrow d="M66 44 L78 44" />
      <Arrow d="M140 44 L152 44" />
      <Arrow d="M224 44 L236 44" />
      <text x={190} y={72} textAnchor="middle" className="arch-key">
        era-normalized · difference-based
      </text>
      <text x={269} y={22} textAnchor="middle" className="arch-key">
        LR · HGB
      </text>
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
