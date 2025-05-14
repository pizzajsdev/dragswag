import { cn } from '@/lib/utils'
import type { ComponentPropsWithRef } from 'react'
import { Link } from 'react-router'

export function BackButton({ to, children, className, ...props }: ComponentPropsWithRef<typeof Link>) {
  return (
    <Link
      to={to}
      className={cn(
        'inline-block mb-4 text-primary hover:text-primary-subtle font-medium transition-colors duration-200',
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  )
}
