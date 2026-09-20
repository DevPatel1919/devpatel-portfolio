export type Link = { label: string; href: string }

export const profile = {
  name: 'Dev Patel',
  handle: '@devpatel',
  role: 'Software Engineer',
  location: 'Florida',
  email: 'devpatel121904@gmail.com',
  github: 'https://github.com/DevPatel1919',
  linkedin: 'https://www.linkedin.com/in/thedevspatel/',
  resume: '/Dev_Patel_Resume.pdf',
  headline: 'I build software for problems that are actually happening.',
  intro:
    "I'm a software engineer working on AI-powered products, backend systems, and full-stack applications. I'm especially interested in agentic engineering — turning emerging model capabilities into software that people can actually rely on.",
}

/** The small "Currently" block under the hero. */
export const now: string[] = [
  'Building AI-powered systems professionally',
  'Developing Shiftly, a hotel operations platform',
  'Exploring how production agent systems should be architected',
]

/** Scrolling marquee under the hero. Order is visual, not ranked. */
export const marquee: string[] = [
  'Python',
  'TypeScript',
  'React',
  'FastAPI',
  'PostgreSQL',
  'Agno',
  'LiteLLM',
  'RAG',
  'Qdrant',
  'MCP',
  'Rust',
  'Tauri',
  'Docker',
  'Prisma',
  'scikit-learn',
  'Express',
  'SSE',
  'Cloudflare',
]

/**
 * The applied-AI section. Deliberately high-level: this describes the class of
 * engineering problem, never a specific employer's implementation.
 */
export const building = {
  lede:
    'I work as a software developer on full-stack and applied AI systems. Day to day that means AI-powered internal products, agentic workflows, multi-agent systems, self-hosted LLM infrastructure, retrieval, structured outputs, streaming interfaces, and the backend APIs underneath all of it.',
  body:
    'The part I find most interesting is not getting a model to produce something impressive once. It is the gap between that and a system that does real work reliably, on inputs nobody anticipated, without a person watching it. Most of what I am learning right now lives in that gap.',
  questions: [
    {
      q: 'How should an agent interact with tools?',
      a: 'Tool call surfaces are an API design problem before they are a prompting problem. What an agent can see, what it is allowed to do, and what it gets back all shape behavior more than the system prompt does.',
    },
    {
      q: 'How do structured outputs stay reliable across models?',
      a: 'Schemas make output parseable, not correct. Validation, deterministic guardrails, and fallback paths are what keep a pipeline working when a model drifts or a provider changes underneath you.',
    },
    {
      q: 'Where should model reasoning end and application logic begin?',
      a: 'Plenty of work handed to a model is better done by ordinary code — cheaper, faster, testable, and it cannot hallucinate. Drawing that line well seems to matter more than model choice.',
    },
    {
      q: 'How do you make an AI system observable?',
      a: 'A non-deterministic system you cannot inspect is difficult to trust or improve. Knowing what was retrieved, what was called, and why an output was rejected is what turns a demo into something you can debug.',
    },
  ],
  stack: ['Agno', 'LiteLLM', 'Self-hosted LLMs', 'RAG', 'Qdrant', 'FastAPI', 'MCP', 'SSE', 'Structured outputs'],
}

export type Status = 'PILOT' | 'PROTOTYPE' | 'EXPERIMENT' | 'ACADEMIC' | 'PRODUCTION'

export type EngineeringNote = { title: string; body: string }

export type Project = {
  slug: string
  name: string
  status: Status
  year: string
  tagline: string
  /** Problem -> Built -> Hard part. The three questions every card answers. */
  problem: string
  built: string
  hard: string
  learned: string
  stack: string[]
  note?: EngineeringNote
  links: Link[]
  /** Featured projects render larger and first. */
  featured?: boolean
  /** Key into the ArchDiagram registry; omit for no diagram. */
  diagram?: string
}

export const projects: Project[] = [
  {
    slug: 'shiftly',
    name: 'Shiftly',
    status: 'PILOT',
    year: '2026 — Present',
    tagline: 'A hotel operations platform replacing paper binders at the front desk.',
    problem:
      'A surprising amount of hotel operations still runs on paper. Do Not Rent lists in a binder, cash incidentals on a clipboard, package handoffs signed on a sheet that gets lost. The information exists, but it is not searchable, not auditable, and it does not survive a shift change.',
    built:
      'A multi-tenant web platform covering the work a front desk actually does: Do Not Rent tracking, cash and incidental logs, snack and inventory management, package tracking with signatures, shift event logs, and an audit trail underneath all of it. Staff and manager accounts with role-based permissions, scoped per hotel.',
    hard:
      'Multi-tenant authorization is the constant concern — every query has to be scoped to a hotel, and a mistake there is not a bug, it is a data leak. Beyond that: designing for staff who are not technical users and are mid-task with a guest waiting. If the software is slower than the binder it replaces, it does not get used.',
    learned:
      'Operational software succeeds or fails on whether it fits the existing workflow. The schema was the easy part; the hard part was watching how the work actually happens and not assuming.',
    stack: [
      'React',
      'TypeScript',
      'Vite',
      'Express',
      'PostgreSQL',
      'Prisma',
      'Docker',
      'Cloudflare',
      'Railway',
    ],
    note: {
      title: 'Designing multi-tenant authorization',
      body: 'Every record belongs to exactly one hotel, and tenant scoping is enforced at the data-access layer rather than left to each route to remember. The goal is that writing a new endpoint should not be an opportunity to introduce a cross-tenant leak — the unsafe version should be the one that takes extra effort to write. Role checks layer on top of that: a front-desk account and a manager account see different columns of the same table.',
    },
    links: [],
    featured: true,
    diagram: 'shiftly',
  },
  {
    slug: 'drycleaners',
    name: 'Family Dry Cleaning Business',
    status: 'PRODUCTION',
    year: '2026',
    tagline: 'A website, and later a voice agent, for a business I grew up working in.',
    problem:
      'I spent a lot of time helping at my family’s dry cleaning business whenever it was short-staffed. The phone is relentless — the same handful of questions about hours, pricing, and whether an order is ready, usually while someone is already standing at the counter waiting.',
    built:
      'First a rebuilt website with real service information, hours, and contact routing. Later, an experiment with an AI voice-agent workflow for handling routine inbound calls, wired together with Twilio and n8n.',
    hard:
      'The website is deliberately backend-free — the contact form opens the visitor’s own mail client pre-filled, so there is no server to maintain and nothing to break. The voice agent is the opposite kind of problem: a phone call is unforgiving. There is no loading spinner, latency is immediately obvious, and being confidently wrong about a price is worse than not answering.',
    learned:
      'This is the project that connects the rest of them. I was not looking for something to build — I was solving a problem I had personally stood behind a counter and dealt with.',
    stack: ['React', 'Vite', 'Twilio', 'n8n', 'Voice AI', 'Cloudflare'],
    note: {
      title: 'Why there is no backend',
      body: 'A small business does not need a database to publish its hours. Anything with a server, a login, or a monthly bill becomes something that eventually breaks and needs someone technical to fix it. Composing a mailto: link means the site has no moving parts and no running costs, and the owner never has to think about it. The right architecture here was the one that disappears.',
    },
    links: [],
    featured: true,
    diagram: 'voice',
  },
  {
    slug: 'swapvest',
    name: 'SwapVest',
    status: 'PROTOTYPE',
    year: '2025 — 2026',
    tagline: 'A peer-to-peer equity exposure swap platform.',
    problem:
      'I wanted to understand how financial systems actually hold together — settlement, collateral, and what happens to state when two parties have opposing positions and prices move underneath them.',
    built:
      'A platform for simulated peer-to-peer equity exposure swaps: contract lifecycle, dual-leg mark-to-market valuation, collateral requirements, and zero-sum P&L updates, behind JWT authentication with live pricing over SSE.',
    hard:
      'Money makes correctness non-negotiable. Values are Decimal end to end — floating point has no business in a settlement path. Concurrent cash mutations need row-level locking, because two requests touching the same balance at once is a question of when, not if. An asyncio scheduler settles matured contracts with double-entry transfers so the books stay balanced.',
    learned:
      'Financial state is a state machine with real consequences for taking an invalid transition. It pushed me toward designing schemas that refuse to hold a state that should not exist, rather than validating after the fact.',
    stack: ['React', 'FastAPI', 'Python', 'PostgreSQL', 'JWT', 'SSE', 'asyncio'],
    note: {
      title: 'Streaming prices over SSE',
      body: 'Live pricing runs over Server-Sent Events rather than WebSockets — the data flows one way, so the simpler transport was the right one. The interesting part is failure handling: a five-state reconnect machine plus a polling fallback, because a pricing feed that silently dies is worse than one that visibly degrades. The client should always know whether what it is showing is current.',
    },
    links: [{ label: 'Live demo', href: 'https://swapvest.vercel.app' }],
    diagram: 'swapvest',
  },
  {
    slug: 'carver',
    name: 'CARVER',
    status: 'ACADEMIC',
    year: '2026',
    tagline: 'An offline desktop app for environments with no assumed connectivity.',
    problem:
      'Senior design project, with a USASOC-affiliated sponsor. CARVER is a structured threat-assessment method, and the software supporting it had to work in environments where internet access cannot be assumed at all.',
    built:
      'A Tauri desktop application with authentication, a target and sub-target hierarchy, CARVER matrices with weighted scoring, data export, and fully offline persistence in SQLite.',
    hard:
      'Every other project I had built assumed modern web infrastructure — a server to call, a service to check a token against, a CDN. Offline-first removes all of it. Authentication has to be local and still secure, which is what Argon2id is doing. Persistence, migrations, and integrity all have to hold on a machine that may never reach a network.',
    learned:
      'Constraints are clarifying. Not being able to reach for a cloud service made me think much harder about what the application genuinely needed versus what I was used to having available.',
    stack: ['Rust', 'Tauri', 'TypeScript', 'SQLite', 'Argon2id'],
    note: {
      title: 'Building for offline environments',
      body: 'Local-first changes the threat model. There is no server to centralize trust in, so authentication, session handling, and data integrity all have to hold on the device itself — hence Argon2id for password hashing rather than anything that assumes a backend. Schema migrations have to be idempotent and safe to apply to a database that could be any version, because there is no coordinated deploy and no way to check what a given machine is running.',
    },
    links: [],
    diagram: 'carver',
  },
  {
    slug: 'nba',
    name: 'NBA Historical Matchups',
    status: 'EXPERIMENT',
    year: '2025',
    tagline: 'Predicting cross-era NBA matchups from 35,000+ historical games.',
    problem:
      'Arguing about whether a team from one era beats a team from another is unfalsifiable by design. I wanted to see how far you could get treating it as a modeling problem instead of a debate.',
    built:
      'An ETL pipeline over 35,000+ historical NBA games producing team-season profiles, then difference-based matchup features feeding both classification and regression models — logistic regression and histogram gradient boosting — evaluated across hundreds of experiments.',
    hard:
      'Cross-era comparison is mostly a feature engineering problem. Raw box-score numbers are not comparable across decades because pace and league scoring environment move underneath them, so the features have to describe a team relative to its own era before any matchup comparison means anything.',
    learned:
      'Most of the useful gains came from features, not from model complexity. Gradient boosting did not rescue a badly framed problem, and logistic regression stayed competitive once the features were right.',
    stack: ['Python', 'pandas', 'scikit-learn', 'Django REST', 'React', 'PostgreSQL'],
    note: {
      title: 'Feature engineering over model complexity',
      body: 'The first honest version of this was not a modeling problem at all — it was a data problem. A 1998 team and a 2018 team do not live in the same statistical universe, so absolute per-game numbers compare badly. Normalizing within era and then building difference-based matchup features did far more for evaluation scores than swapping in a stronger model ever did.',
    },
    links: [{ label: 'View source', href: 'https://github.com/DevPatel1919/nbahistoricalmatchups' }],
    diagram: 'nba',
  },
]

export const curious: { topic: string; question: string }[] = [
  {
    topic: 'Agentic systems',
    question:
      'How do we get from impressive demos to agents that reliably perform real work without someone supervising every step?',
  },
  {
    topic: 'Local and self-hosted AI',
    question:
      'What changes when models, retrieval, and inference all live inside infrastructure you control?',
  },
  {
    topic: 'AI + traditional software',
    question: 'Where should deterministic application logic stop and model reasoning begin?',
  },
  {
    topic: 'RAG and knowledge systems',
    question:
      'Retrieval quality seems to bound everything downstream. How much of a "model problem" is actually a retrieval problem?',
  },
  {
    topic: 'MCP and tool ecosystems',
    question:
      'If tools become the interface models use to act, what does designing a good one actually require?',
  },
  {
    topic: 'Backend architecture',
    question:
      'Which parts of a system should absorb non-determinism, and which should refuse it outright?',
  },
  {
    topic: 'Fintech infrastructure',
    question:
      'What does correctness discipline in financial systems teach the rest of software engineering?',
  },
  {
    topic: 'Human + AI workflows',
    question:
      'Where does a person belong in the loop, and how do you design that handoff so it is not friction?',
  },
  {
    topic: 'How AI changes engineering',
    question:
      'If models become a standard part of how software is built, what does the job look like in five years?',
  },
]

export const about: string[] = [
  'I studied Computer Science at the University of Central Florida, but most of what pushed me toward software came from outside a classroom.',
  'I helped at my family’s dry cleaning business when it was short-staffed and watched the same repetitive work eat the day. I got interested in financial systems and built a swap platform to understand how settlement actually works. I looked at hotel operations and found processes still running on paper. I spent a long time on NBA data mostly because I wanted to know whether an argument could be settled with a model.',
  'The pattern is consistent enough that I have stopped pretending it is a coincidence: I like finding systems that are manual, confusing, inefficient, or newly possible, and working out what software could do about them.',
  'Right now that interest points squarely at AI-native software and agentic engineering — which is also where I spend my working hours. I am early in my career and there is a great deal I have not built yet. That is most of the appeal.',
]

export type ExperienceItem = {
  title: string
  org: string
  period: string
  current: boolean
  detail: string
  tags: string[]
}

export const experience: ExperienceItem[] = [
  {
    title: 'Software Developer',
    org: 'United Financial Services — Vitruvix',
    period: 'AUG 2026 — PRESENT',
    current: true,
    detail:
      'Full-stack and applied AI engineering: AI-powered internal products, agentic workflows, self-hosted LLM infrastructure, retrieval, structured outputs, and the backend APIs behind them.',
    tags: ['Applied AI', 'Agents', 'Backend', 'Full-stack'],
  },
  {
    title: 'Founding Software Developer',
    org: 'SwapVest Capital',
    period: 'APR 2025 — JAN 2026',
    current: false,
    detail:
      'Built a peer-to-peer equity exposure swap platform — contract lifecycle, valuation and collateral logic, authentication, and real-time pricing.',
    tags: ['Fintech', 'FastAPI', 'PostgreSQL'],
  },
  {
    title: 'B.S. Computer Science',
    org: 'University of Central Florida',
    period: '2026',
    current: false,
    detail: "Dean's List · AI@UCF · KnightHacks",
    tags: [],
  },
]

export const skills: { group: string; items: string[] }[] = [
  { group: 'Languages', items: ['Python', 'TypeScript', 'JavaScript', 'Java', 'SQL', 'Rust', 'HTML/CSS'] },
  { group: 'Frontend', items: ['React', 'Next.js', 'Vite', 'Tailwind'] },
  { group: 'Backend', items: ['FastAPI', 'Express', 'Node.js', 'Django REST'] },
  { group: 'Data', items: ['PostgreSQL', 'SQLite', 'MongoDB', 'MySQL'] },
  {
    group: 'AI / ML',
    items: [
      'Agno',
      'LangChain',
      'LangGraph',
      'LiteLLM',
      'MCP / FastMCP',
      'RAG',
      'Vector databases',
      'scikit-learn',
      'LLM APIs',
    ],
  },
  { group: 'Infrastructure', items: ['Docker', 'Git', 'Cloudflare', 'Railway', 'Postman', 'Jira'] },
]

export const sections = [
  { id: 'building', label: 'Building' },
  { id: 'work', label: 'Work' },
  { id: 'curious', label: 'Curious' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
]
