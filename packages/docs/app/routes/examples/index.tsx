import { BackButton } from '@/components/back-button'
import { linkCardClass } from '@/lib/utils'
import { Link } from 'react-router'
import { examples } from './_list'

export default function Page() {
  return (
    <div>
      <BackButton to="/">← Back to Home</BackButton>
      <ul className="flex flex-col gap-3 mt-4">
        {Object.entries(examples).map(([slug, { title }]) => (
          <li key={slug}>
            <Link to={`/examples/${slug}`} className={linkCardClass()}>
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
