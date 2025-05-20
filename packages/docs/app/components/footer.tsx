import { LinkButton } from './button'
import { GithubIcon } from './logo'

export function Footer() {
  return (
    <footer className="flex flex-col items-center gap-4">
      <div className="flex gap-4">
        <LinkButton
          flavor="default"
          outlined
          to="https://github.com/pizzajsdev/dragswag"
          target="_blank"
          rel="noreferrer"
        >
          <GithubIcon className="w-4 h-4 scale-150" />
          <span className="sr-only">GitHub</span>
        </LinkButton>
        <LinkButton to="/examples">Examples</LinkButton>
        <LinkButton
          to="https://github.com/pizzajsdev/dragswag?tab=readme-ov-file#--dragswag"
          target="_blank"
          rel="noreferrer"
        >
          Documentation
        </LinkButton>
        <LinkButton to="/llms.txt" target="_blank" outlined>
          llms.txt
        </LinkButton>
      </div>
      <p className="text-center text-sm text-fg-3">&copy; {new Date().getFullYear()} DragSwag</p>
    </footer>
  )
}
