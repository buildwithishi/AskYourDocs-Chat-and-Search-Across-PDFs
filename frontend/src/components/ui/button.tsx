import type { ButtonHTMLAttributes } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-label-md text-label-md font-bold transition-all active:scale-95 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-on-primary hover:brightness-90',
        glass: 'glass-panel border border-white/10 text-primary hover:bg-white/10',
        ghost: 'text-on-surface-variant hover:bg-white/5 hover:text-primary',
        outline: 'border border-white/10 bg-white/5 text-primary hover:bg-white/10',
      },
      size: {
        default: 'h-11 rounded-full px-6',
        sm: 'h-9 rounded-full px-4 text-[13px]',
        lg: 'h-14 rounded-full px-8',
        icon: 'h-10 w-10 rounded-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

export function Button({ className, variant, size, asChild, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : 'button'
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />
}
