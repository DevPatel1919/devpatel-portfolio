import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Marquee } from './components/Marquee'
import { Building } from './components/Building'
import { Projects } from './components/Projects'
import { Curious } from './components/Curious'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { Rule } from './components/Rule'

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
        <Rule />
        <Projects />
        <Rule />
        <Curious />
        <Rule />
        <About />
        <Rule />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
