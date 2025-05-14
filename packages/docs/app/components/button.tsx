import { cn, surfaceClass, type SurfaceProps } from '@/lib/utils'
import type { ComponentPropsWithRef } from 'react'
import { Link } from 'react-router'

const baseButtonClass = cn(
  'inline-block px-2 py-1 rounded-md font-medium transition-colors duration-200',
  'flex items-center justify-center gap-2',
)

export function LinkButton({
  to,
  children,
  className,
  flavor = 'primary',
  outlined = false,
  ...props
}: ComponentPropsWithRef<typeof Link> & SurfaceProps) {
  if (typeof to === 'string' && to.startsWith('http')) {
    return (
      <a
        href={to}
        className={cn(baseButtonClass, surfaceClass({ flavor, outlined, interactive: true }), className)}
        {...props}
      >
        {children}
      </a>
    )
  }

  return (
    <Link
      to={to}
      className={cn(baseButtonClass, surfaceClass({ flavor, outlined, interactive: true }), className)}
      {...props}
    >
      {children}
    </Link>
  )
}

export function Button({
  children,
  className,
  type = 'button',
  flavor = 'primary',
  outlined = false,
  ...props
}: ComponentPropsWithRef<'button'> & SurfaceProps) {
  return (
    <button type={type} className={cn(baseButtonClass, surfaceClass({ flavor, outlined }), className)} {...props}>
      {children}
    </button>
  )
}
