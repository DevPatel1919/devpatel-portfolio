# devpatel-portfolio

Personal portfolio site for Dev Patel — Software Engineer / AI Engineer.

**Live:** https://devpatel.us

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

Deployed to Cloudflare as a Worker serving static assets (not Pages), so the
config lives in `wrangler.jsonc` rather than in a Pages project:

```bash
npm run deploy     # npm run build && wrangler deploy
```

`devpatel.us` and `www.devpatel.us` are declared as custom domains in
`wrangler.jsonc`. Cloudflare creates the DNS records and issues the certificate
on the first deploy that includes them; the zone must already be active in the
same account.

Note that declaring `routes` disables the `*.workers.dev` origin unless
`"workers_dev": true` is set explicitly, so the old
`devpatel-portfolio.devpatel121904.workers.dev` address now 404s. That is
intentional: `devpatel.us` is the single canonical origin.

`public/_headers` sets security headers (`nosniff`, `DENY` framing,
`strict-origin-when-cross-origin` referrer) and long-lived immutable caching for
hashed assets in `/assets/*`.

## Structure

```
public/            Static assets served at the site root
  Dev_Patel_Resume.pdf
  favicon.svg      Inline SVG mark
  og.svg           Open Graph / social preview card
  _headers         Cloudflare header rules
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
