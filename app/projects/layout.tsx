// app/projects/layout.tsx
import Header from '../../components/Header'
import { CustomCursor } from '../../components/ScrollSpyCursor'

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CustomCursor />
      <Header />
      <main>{children}</main>
    </>
  )
}
