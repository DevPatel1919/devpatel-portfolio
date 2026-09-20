# devpatel-portfolio

Personal portfolio site for Dev Patel — Software Engineer / AI Engineer.

**Live:** https://devpatel-portfolio.pages.dev

## Stack

- **React 19** + **TypeScript**, built with **Vite**
- Hand-written CSS using design tokens on `:root`, with a light/dark theme
  toggle persisted to `localStorage` and applied before first paint to avoid a
  flash of the wrong theme
- No CSS framework and no runtime dependencies beyond React — the whole page
  ships as ~77 kB gzipped JS plus 4 kB of CSS
- Deployed as a static site on **Cloudflare Pages**

## Content

All site copy lives in [`src/data/content.ts`](src/data/content.ts) — profile,
experience, projects, and skills. Editing that one file updates the whole page;
no component changes needed to add a job or a project.

Projects in private repositories render with a "Private repository" badge and no
link, so nothing on the public site 404s for a visitor. Flip a repo public and
add an entry to that project's `links` array to surface the source.

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
