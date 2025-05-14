import { Footer } from '@/components/footer'
import { Heading, Subtitle } from '@/components/heading'
import { Logo } from '@/components/logo'

export default function Page() {
  return (
    <main className="flex items-center justify-center p-8 min-h-screen">
      <div className="flex-1 flex flex-col items-center gap-4">
        <header className="flex flex-col items-center gap-4">
          <Logo />
          <Heading tagName="h1">DragSwag</Heading>
          <Subtitle>
            💅 A lightweight and data-driven drag and drop library for React, focused on Developer Experience and
            performance ⚡️
          </Subtitle>
        </header>
        <Footer />
      </div>
    </main>
  )
}
