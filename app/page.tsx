import Header from '../components/Header'
import Hero from '../components/Hero'
import { Marquee, Stats } from '../components/MarqueeStats'
import Projects from '../components/Projects'
import Deliverables from '../components/Deliverables'
import Archive from '../components/Archive'
import Founder from '../components/Founder'
import Team from '../components/Team'
import Services from '../components/Services'
import Process from '../components/Process'
import Pricing from '../components/Pricing'
import Testimonials from '../components/Testimonials'
import Blog from '../components/Blog'
import FeaturedIn from '../components/FeaturedIn'
import FAQ from '../components/FAQ'
import Contact from '../components/Contact'
import { ScrollSpy, CustomCursor } from '../components/ScrollSpyCursor'

export default function Home() {
  return (
    <>
      <CustomCursor />
      <ScrollSpy />
      <Header />
      <Hero />
      <Marquee />
      <Stats />
      <Projects />
      <Deliverables />
      <Archive />
      <Founder />
      <Team />
      <Services />
      <Process />
      <Pricing />
      <Testimonials />
      <Blog />
      <FeaturedIn />
      <FAQ />
      <Contact />
    </>
  )
}
