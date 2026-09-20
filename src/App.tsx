import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Marquee } from './components/Marquee'
import { Building } from './components/Building'
import { Projects } from './components/Projects'
import { Curious } from './components/Curious'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Marquee />
        <Building />
        <hr className="rule" />
        <Projects />
        <hr className="rule" />
        <Curious />
        <hr className="rule" />
        <About />
        <hr className="rule" />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
