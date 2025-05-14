import { BackButton } from '@/components/back-button'
import { LinkButton } from '@/components/button'
import { Card } from '@/components/card'
import { Heading, Subtitle } from '@/components/heading'
import { GithubIcon } from '@/components/logo'
import type { Route } from './+types/[slug]'
import { examples } from './_list'

export function meta({ params }: Route.MetaArgs) {
  if (!examples[params.slug]) {
    return {
      title: 'Not Found',
    }
  }

  return [
    {
      title: `${examples[params.slug].title} - DragSwag`,
    },
    {
      name: 'description',
      content: examples[params.slug].description + ' in React, with DragSwag',
    },
  ]
}

export function clientLoader({ params }: Route.LoaderArgs) {
  if (!examples[params.slug]) {
    throw new Response('Not Found', { status: 404 })
  }

  return {
    slug: params.slug,
  }
}

export default function Page({ loaderData }: Route.ComponentProps) {
  const Example = examples[loaderData.slug].component

  return (
    <div className="flex flex-col gap-2 my-2 text-pretty">
      <div className="flex flex-col gap-2 my-2 items-center justify-center text-center text-pretty">
        <Heading tagName="h3" className="font-light">
          {examples[loaderData.slug].title}
        </Heading>
        <Subtitle tagName="div" className="font-light">
          {examples[loaderData.slug].description}
        </Subtitle>
      </div>
      <BackButton to="/examples">← Back to Examples</BackButton>
      <Card className="flex flex-col gap-4">
        <Example />
        <div className="flex justify-start">
          <LinkButton
            outlined
            to={`https://github.com/pizzajsdev/dragswag/tree/main/packages/docs/app/examples/${loaderData.slug}`}
            flavor="default"
          >
            <GithubIcon className="w-6 h-6" />
            View Code
          </LinkButton>
        </div>
      </Card>
    </div>
  )
}
