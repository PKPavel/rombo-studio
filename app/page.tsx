import { client } from '../sanity.client'
import Header from '../components/Header'
import Hero from '../components/Hero'

export const revalidate = 60

const HERO_QUERY = `*[_type == "project" && featured == true && defined(coverImage)] | order(num asc) [0...3] {
  title, city,
  "coverUrl": coverImage.asset->url
}`
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
import { ScrollSpy, CustomCursor, FloatingBar, RevealObserver } from '../components/ScrollSpyCursor'
export default async function Home() {
  const heroProjects = await client.fetch(HERO_QUERY).catch(() => [])
  return (
    <>
      <CustomCursor />
      <ScrollSpy />
      <Header />
      <Hero projects={heroProjects} />
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
      <FloatingBar />
      <RevealObserver />
    </>
  )
}
