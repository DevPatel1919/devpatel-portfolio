import { profile } from '../data/content'

export function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer__inner">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p className="footer__built">Built with React, TypeScript and Vite · Deployed on Cloudflare Pages</p>
      </div>
    </footer>
  )
}
