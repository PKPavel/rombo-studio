import { client } from '../sanity.client'
import Header from '../components/Header'
import Hero from '../components/Hero'

export const revalidate = 3600

const CAROUSEL_QUERY = `*[_type == "project" && !disabled] | order(num asc) {
  num, title, "slug": slug.current,
  cat, area, city, year,
  "coverUrl": coverImage.asset->url
}`

// Берём все проекты с фото — featured сверху, остальные следом
const HERO_QUERY = `*[_type == "project" && defined(coverImage) && !disabled] | order(featured desc, num asc) [0...5] {
  title, city,
  "coverUrl": coverImage.asset->url
}`
import { Stats } from '../components/MarqueeStats'
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
import FAQ from '../components/FAQ'
import Contact from '../components/Contact'
import { ScrollSpy, CustomCursor, FloatingBar, RevealObserver } from '../components/ScrollSpyCursor'
import { ScrollTopButton } from '../components/ScrollTopButton'
export default async function Home() {
  const [heroProjects, carouselProjects] = await Promise.all([
    client.fetch(HERO_QUERY).catch(() => []),
    client.fetch(CAROUSEL_QUERY).catch(() => []),
  ])
  return (
    <>
      <CustomCursor />
      <ScrollSpy />
      <Header />
      <Hero projects={heroProjects} />
      <Stats />
      <Projects projects={carouselProjects} />
      <Deliverables />
      <Archive />
      <Founder />
      <Team />
      <Services />
      <Process />
      <Pricing />
      <Testimonials />
      <Blog />
      <FAQ />
      <Contact />
      <FloatingBar />
      <ScrollTopButton />
      <RevealObserver />
    </>
  )
}
