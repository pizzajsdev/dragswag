import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router'

import type { Route } from './+types/root'
import appInlineCss from './app.css?inline'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'DragSwag - A lightweight and data-driven drag and drop library for React 💅' },
    {
      name: 'description',
      content:
        'DragSwag, a lightweight and data-driven drag and drop library for React, ' +
        'focused on Developer Experience and performance ⚡️',
    },
  ]
}

export const links: Route.LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  { rel: 'icon', href: '/dragswag/favicon.ico' },
  {
    as: 'style',
    rel: 'preload',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
]

export function Layout({ children }: { children: React.ReactNode }) {
  const useReactScan = import.meta?.env?.DEV === true
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        {useReactScan && <script crossOrigin="anonymous" src="//unpkg.com/react-scan/dist/auto.global.js" />}
        <style id="app_css" dangerouslySetInnerHTML={{ __html: appInlineCss }} />
      </head>
      <body>
        <noscript>
          <p className="text-center text-red-500 bg-red-100 p-4 rounded-lg px-8 py-4 m-4">
            This app requires JavaScript to be enabled. Please enable JavaScript in your browser and try again.
          </p>
        </noscript>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}

export function HydrateFallback() {
  return null
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!'
  let details = 'An unexpected error occurred.'
  let stack: string | undefined

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error'
    details = error.status === 404 ? 'The requested page could not be found.' : error.statusText || details
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message
    stack = error.stack
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  )
}
