import { cn, shadowClass, surfaceClass, type SurfaceProps } from '@/lib/utils'
import type { ComponentPropsWithRef } from 'react'

export function Card({
  children,
  className,
  flavor = 'default',
  outlined = false,
  ...props
}: ComponentPropsWithRef<'div'> & SurfaceProps) {
  return (
    <div className={cn('p-4 rounded-lg', shadowClass('md'), surfaceClass({ flavor, outlined }), className)} {...props}>
      {children}
    </div>
  )
}
