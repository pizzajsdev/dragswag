import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function shadowClass(size: 'sm' | 'md' | 'lg' | 'xs' | '2xs' | 'xl' | '2xl' = 'md', className?: string) {
  return cn(
    'shadow shadow-black/10 dark:shadow-black/30',
    {
      'shadow-sm': size === 'sm',
      'shadow-md': size === 'md',
      'shadow-lg': size === 'lg',
      'shadow-xs': size === 'xs',
      'shadow-2xs': size === '2xs',
      'shadow-xl': size === 'xl',
      'shadow-2xl': size === '2xl',
    },
    className,
  )
}

type SurfaceFlavor = 'primary' | 'secondary' | 'default'
export type SurfaceProps = {
  flavor?: SurfaceFlavor
  outlined?: boolean
}

export function surfaceClass({
  flavor = 'default',
  outlined = false,
  interactive = false,
  className,
}: SurfaceProps & {
  interactive?: boolean
  className?: string
} = {}) {
  const classes: Record<SurfaceFlavor, Record<'solid' | 'outlined', Record<'base' | 'interactive', string>>> = {
    primary: {
      solid: {
        base: cn('text-light-1 bg-primary border border-transparent'),
        interactive: cn('hover:bg-primary-strong active:bg-primary'),
      },
      outlined: {
        base: cn('border border-primary text-primary bg-transparent'),
        interactive: cn(
          'hover:border-primary-strong hover:text-primary-strong',
          'active:border-primary active:text-primary',
        ),
      },
    },
    secondary: {
      solid: {
        base: cn('text-dark-1 bg-secondary border border-transparent'),
        interactive: cn('hover:bg-secondary-strong active:bg-secondary'),
      },
      outlined: {
        base: cn('border border-secondary text-secondary bg-transparent'),
        interactive: cn(
          'hover:border-secondary-strong hover:text-secondary-strong',
          'active:border-secondary active:text-secondary',
        ),
      },
    },
    default: {
      solid: {
        base: cn('text-fg-1 bg-surface-2 border border-transparent'),
        interactive: cn('hover:bg-surface-3 active:bg-surface-2'),
      },
      outlined: {
        base: cn('border border-fg-2/30 text-fg-2 bg-transparent'),
        interactive: cn('hover:text-fg-1 hover:border-fg-2/50', 'active:text-fg-2 active:border-fg-2/30'),
      },
    },
  }

  return cn(
    {
      [classes[flavor].solid.base]: !outlined,
      [classes[flavor].solid.interactive]: !outlined && interactive,
      [classes[flavor].outlined.base]: outlined,
      [classes[flavor].outlined.interactive]: outlined && interactive,
    },
    className,
  )
}

export function linkCardClass({
  flavor = 'default',
  className,
}: SurfaceProps & {
  className?: string
} = {}) {
  return cn(
    'block px-6 py-3 border rounded-lg',
    'shadow-md font-medium transition-all duration-200',
    'text-fg-1',
    {
      'bg-surface-2 hover:bg-primary active:bg-surface-2 border-line-2 hover:text-light-1 active:text-fg-1':
        flavor === 'default',
      'bg-primary hover:bg-primary-subtle active:bg-primary border-primary text-light-1': flavor === 'primary',
      'bg-secondary hover:bg-secondary-subtle active:bg-secondary border-secondary text-dark-1': flavor === 'secondary',
    },
    className,
  )
}
