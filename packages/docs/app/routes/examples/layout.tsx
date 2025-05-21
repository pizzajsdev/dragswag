import { Heading } from '@/components/heading'
import { Logo } from '@/components/logo'
import { Outlet } from 'react-router'

export default function Layout() {
  return (
    <div className="p-4 sm:p-16">
      <header className="flex flex-col items-center gap-4 text-center">
        <Logo withHeading />
        <Heading tagName="h2">Examples</Heading>
      </header>
      <Outlet />
    </div>
  )
}
