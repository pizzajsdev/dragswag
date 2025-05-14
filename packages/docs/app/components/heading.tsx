import { cn } from '@/lib/utils'
import type { ComponentProps } from 'react'

export function Heading({
  children,
  tagName = 'h1',
  className,
  ...props
}: {
  tagName?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'span'
} & ComponentProps<'div'>) {
  const Tag = tagName
  return (
    <Tag
      className={cn(
        'font-bold',
        {
          'text-4xl': tagName === 'h1',
          'text-3xl': tagName === 'h2',
          'text-2xl': tagName === 'h3',
          'text-xl': tagName === 'h4',
          'text-lg': tagName === 'h5',
          'text-base': tagName === 'h6',
        },
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  )
}

export function Subtitle({
  children,
  tagName = 'p',
  className,
  ...props
}: {
  tagName?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'span' | 'p'
} & ComponentProps<'div'>) {
  const Tag = tagName
  return (
    <Tag className={cn('text-center text-lg font-medium', className)} {...props}>
      {children}
    </Tag>
  )
}
