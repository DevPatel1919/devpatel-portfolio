import { profile } from '../data/content'

export function Footer() {
  return (
    <footer className="footer">
      <div className="col footer__inner">
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <span>React · TypeScript · Vite — deployed on Cloudflare</span>
      </div>
    </footer>
  )
}
