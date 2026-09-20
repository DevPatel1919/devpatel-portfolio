# devpatel-portfolio

Personal portfolio site for Dev Patel — Software Engineer / AI Engineer.

**Live:** https://devpatel-portfolio.devpatel121904.workers.dev

## Stack

- **React 19** + **TypeScript**, built with **Vite**
- Hand-written CSS using design tokens on `:root`. Dark is the designed
  default; light is a supported alternate. The theme is persisted to
  `localStorage` and applied before first paint to avoid a flash.
- Type is doing the work: **Instrument Serif** for headings, **JetBrains Mono**
  for body copy. No CSS framework, no runtime dependencies beyond React.
- Motion is limited to a paused-on-hover tech marquee and a single scroll-reveal
  fade, both disabled under `prefers-reduced-motion`.
- Deployed as a static site on **Cloudflare**

## Content

All site copy lives in [`src/data/content.ts`](src/data/content.ts) — profile,
experience, projects, and skills. Editing that one file updates the whole page;
no component changes needed to add a job or a project.

Each project answers the same four questions — problem, what I built, the hard
part, and the takeaway — plus an optional expandable engineering note and an
inline SVG architecture diagram (`src/components/ArchDiagram.tsx`, keyed by the
project's `diagram` field).

Projects in private repositories render a `private repo` marker instead of a
dead link. Flip a repo public and add an entry to that project's `links` array
to surface the source.

## Local development

```bash
npm install
npm run dev        # dev server on http://localhost:5177
npm run build      # typecheck + production build into dist/
npm run preview    # serve the production build locally
```

## Deployment

Pushes to `main` are built and deployed by Cloudflare Pages.

- **Build command:** `npm run build`
- **Output directory:** `dist`

To deploy the current build manually:

```bash
npx wrangler pages deploy dist --project-name=devpatel-portfolio
```

`public/_headers` sets security headers (`nosniff`, `DENY` framing,
`strict-origin-when-cross-origin` referrer) and long-lived immutable caching for
hashed assets in `/assets/*`.

## Structure

```
public/            Static assets served at the site root
  Dev_Patel_Resume.pdf
  favicon.svg      Inline SVG mark
  og.svg           Open Graph / social preview card
  _headers         Cloudflare Pages header rules
  robots.txt
  sitemap.xml
src/
  data/content.ts  Single source of truth for all site copy
  components/      One component per section, plus Nav, Section, icons
  styles.css       Design tokens and all styling
  App.tsx
  main.tsx
index.html         Meta tags, JSON-LD Person schema, pre-paint theme script
```
