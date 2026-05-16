import Header from '../../components/Header'
import { CustomCursor } from '../../components/ScrollSpyCursor'

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CustomCursor />
      <Header />
      <main>{children}</main>
    </>
  )
}
