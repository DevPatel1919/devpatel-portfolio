export type Link = { label: string; href: string }

export const profile = {
  name: 'Dev Patel',
  role: 'Software Engineer / AI Engineer',
  location: 'Sarasota, Florida',
  email: 'devpatel121904@gmail.com',
  github: 'https://github.com/DevPatel1919',
  linkedin: 'https://www.linkedin.com/in/thedevspatel/',
  resume: '/Dev_Patel_Resume.pdf',
  tagline:
    'I build systems where correctness is the hard part — LLM validation pipelines, financial swap engines, and air-gapped desktop tooling.',
  summary:
    "I'm a software engineer at United Financial Services working on production LLM reliability, and a Computer Science graduate from the University of Central Florida. Most of my work lives at the point where a system has to be right, not just running: deterministic guardrails around non-deterministic models, Decimal-based valuation math that cannot drift, and schemas that refuse to hold invalid state.",
}

export type Experience = {
  company: string
  team?: string
  title: string
  location: string
  period: string
  current: boolean
  highlights: string[]
  stack: string[]
}

export const experience: Experience[] = [
  {
    company: 'United Financial Services',
    team: 'Vitruvix',
    title: 'Software Engineer / AI Engineer',
    location: 'Sarasota, Florida',
    period: 'Aug 2026 — Present',
    current: true,
    highlights: [
      'Engineered a production LLM validation pipeline using Python, Agno, LiteLLM, and Pydantic, combining structured outputs, deterministic guardrails, and fallback logic to improve the reliability of self-hosted LLM responses.',
      'Analyzed 730+ model-generated outputs to identify reasoning-leak patterns, correcting an overstated ~17% issue metric down to ~3% and converting the findings into stronger validation and safety rules.',
      'Improved real-time AI workflow performance by parallelizing up to 4 LLM evaluations with asyncio and 15-second timeouts, reducing blocking from minute-scale worst cases to seconds while preserving streamed application behavior.',
    ],
    stack: ['Python', 'Agno', 'LiteLLM', 'Pydantic', 'asyncio'],
  },
  {
    company: 'SwapVest Capital',
    title: 'Founding Software Developer',
    location: 'Tampa, Florida',
    period: 'Apr 2025 — Jan 2026',
    current: false,
    highlights: [
      'Engineered a peer-to-peer equity swap platform (FastAPI, React, PostgreSQL) with 37 REST + SSE endpoints, a 14-table relational schema, row-level locking on concurrent cash mutations, and JWT authentication.',
      'Engineered a Decimal-based swap valuation engine in FastAPI to calculate dual-leg mark-to-market values, collateral requirements, and zero-sum P&L updates for simulated peer-to-peer stock exposure swaps.',
      'Implemented SSE-based live pricing (JWT via query param, a 5-state reconnect machine, and polling fallback) alongside an asyncio scheduler that auto-settles matured contracts with double-entry cash P&L transfer.',
    ],
    stack: ['FastAPI', 'React', 'PostgreSQL', 'Go', 'Kafka', 'Docker'],
  },
]

export type Project = {
  slug: string
  name: string
  blurb: string
  context: string
  period: string
  role: string
  highlights: string[]
  stack: string[]
  visibility: 'public' | 'private'
  links: Link[]
  accent: string
}

export const projects: Project[] = [
  {
    slug: 'shiftly',
    name: 'Shiftly',
    blurb: 'A digital front-desk binder for small franchise and independent hotels.',
    context: 'Multi-tenant SaaS · PWA',
    period: '2026 — Present',
    role: 'Developer',
    highlights: [
      'Replaces the paper front-desk binder with seven operational modules: Do Not Rent records, cash and incidental deposits, a priced snack market with inventory history, guest packages, a shift event log, an automatic audit trail, and hotel settings.',
      'Multi-tenant by construction — every record is scoped strictly to its own hotelId, with a separate platform-administration app for onboarding hotels and managing their staff accounts.',
      'Organized as two independently deployable apps, with the frontend split into one self-contained module per business domain, each owning its own screens, HTTP callers, types, and tests.',
      'Ships as an installable PWA with a service worker, so the front desk keeps working on unreliable hotel wifi.',
    ],
    stack: ['TypeScript', 'React', 'Tailwind CSS', 'Vite', 'PostgreSQL', 'PWA'],
    visibility: 'private',
    links: [],
    accent: 'violet',
  },
  {
    slug: 'swapvest',
    name: 'SwapVest Capital',
    blurb: 'A peer-to-peer equity exposure swap platform, and the backend engine underneath it.',
    context: 'Fintech startup · Founding engineer',
    period: 'Apr 2025 — Jan 2026',
    role: 'Founding Software Developer',
    highlights: [
      'Built the platform around a Decimal-based valuation engine computing dual-leg mark-to-market values, collateral requirements, and zero-sum P&L for simulated peer-to-peer stock exposure swaps — no floating point anywhere in the money path.',
      '37 REST + SSE endpoints over a 14-table relational schema, with row-level locking on concurrent cash mutations and JWT authentication.',
      'Live pricing over Server-Sent Events with a five-state reconnect machine and a polling fallback, plus an asyncio scheduler that auto-settles matured contracts via double-entry cash transfer.',
      'The separate backend engine decomposes this into services over Kafka: a Go matching engine, a Python contract registry and risk engine, a price oracle, and a hash-chained append-only audit consumer.',
    ],
    stack: ['FastAPI', 'React', 'PostgreSQL', 'Go', 'Kafka', 'Redis', 'Docker'],
    visibility: 'private',
    links: [{ label: 'Live demo', href: 'https://swapvest.vercel.app' }],
    accent: 'emerald',
  },
  {
    slug: 'carver',
    name: 'CARVER Matrices',
    blurb: 'An air-gapped desktop app for USASOC CARVER threat-assessment workflows.',
    context: 'USASOC-sponsored Senior Design Project',
    period: 'Jan 2026',
    role: 'Full-Stack Developer',
    highlights: [
      'Built a Tauri/Rust desktop application supporting fully air-gapped deployment, with an embedded llama.cpp AI sidecar producing local scoring recommendations — no network calls, no external inference.',
      'Implemented 26 typed Tauri IPC commands in Rust across 6 domains, enforcing per-command session guards and structured error propagation across the whole application.',
      'Designed a normalized SQLite schema with foreign key constraints, score validation, cascading deletes, and idempotent migrations backing users, operations, matrices, and evidence annotations.',
      'Custom PDF generation and import, with Argon2id-secured user authentication.',
    ],
    stack: ['Rust', 'Tauri', 'TypeScript', 'SQLite', 'llama.cpp', 'Argon2id'],
    visibility: 'private',
    links: [],
    accent: 'amber',
  },
  {
    slug: 'nba',
    name: 'NBA Historical Matchups',
    blurb: 'Cross-era NBA matchup simulation from 25+ seasons of box-score data.',
    context: 'Personal project',
    period: 'Aug 2025',
    role: 'Solo',
    highlights: [
      'A full-stack sports analytics platform comparing historical NBA teams across 25+ seasons and generating stat-based win-probability predictions.',
      'A Python/pandas ETL pipeline transforming 20,000+ raw NBA box-score records into 750+ team-season profiles across offensive, defensive, shooting, rebounding, pace, and efficiency metrics.',
      'Engineered 40+ difference-based matchup features feeding a scikit-learn prediction engine, served through Django REST APIs and visualized in a React comparison dashboard.',
    ],
    stack: ['Python', 'pandas', 'scikit-learn', 'Django REST', 'React', 'PostgreSQL'],
    visibility: 'public',
    links: [{ label: 'View source', href: 'https://github.com/DevPatel1919/nbahistoricalmatchups' }],
    accent: 'sky',
  },
  {
    slug: 'drycleaners',
    name: 'Best Dry Cleaners',
    blurb: 'A production marketing site for a real dry cleaning business in Palmetto, Florida.',
    context: 'Client work · Shipped',
    period: 'Jun 2026',
    role: 'Solo',
    highlights: [
      'A responsive React/Vite site covering service pages, fabric care details, business hours, and contact routing for a local business with real customers.',
      "Deliberately backend-free: the contact form composes a mailto: link that opens the visitor's own mail client pre-filled, so the business owner maintains nothing and there is no server, database, or stored configuration to break.",
      'Styled in plain CSS using design tokens via custom properties, keeping the whole site dependency-light and fast to load on mobile.',
    ],
    stack: ['React', 'Vite', 'CSS'],
    visibility: 'private',
    links: [],
    accent: 'rose',
  },
]

export const skills: { group: string; items: string[] }[] = [
  {
    group: 'Languages',
    items: ['Python', 'TypeScript', 'JavaScript', 'Rust', 'Java', 'SQL', 'Go', 'HTML', 'CSS'],
  },
  {
    group: 'Frameworks & Libraries',
    items: ['React', 'FastAPI', 'Django', 'Tailwind CSS', 'Node.js', 'Express.js', 'scikit-learn', 'pandas', 'Tauri'],
  },
  { group: 'Data', items: ['PostgreSQL', 'SQLite', 'MongoDB', 'MySQL', 'Redis', 'Kafka'] },
  {
    group: 'AI Engineering',
    items: ['Agno', 'LiteLLM', 'Pydantic', 'llama.cpp', 'Structured outputs', 'Eval pipelines'],
  },
  {
    group: 'Tooling',
    items: ['Docker', 'AWS', 'Git', 'CI/CD', 'Jira', 'Agile', 'Figma', 'Postman', 'Unit Testing', 'Claude Code'],
  },
]

export const education = {
  school: 'University of Central Florida',
  location: 'Orlando, Florida',
  degree: 'B.S. in Computer Science',
  date: 'Aug 2026',
  activities: ["Dean's List", 'AI@UCF', 'KnightHacks'],
}

export const sections = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]
