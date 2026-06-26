import * as SelectPrimitive from '@radix-ui/react-select'
import { Icon } from '@/lib/icons'
import { cn } from '@/lib/cn'

export const Select = SelectPrimitive.Root
export const SelectValue = SelectPrimitive.Value
export const SelectGroup = SelectPrimitive.Group

export function SelectTrigger({ className, children, ...props }: React.ComponentProps<typeof SelectPrimitive.Trigger>) {
  return (
    <SelectPrimitive.Trigger
      className={cn(
        'flex items-center gap-2 rounded-lg border border-white/5 bg-surface-container px-3 py-1.5 text-sm text-on-surface outline-none focus:ring-1 focus:ring-primary/20',
        className,
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon>
        <Icon name="expand_more" size={18} />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

export function SelectContent({ className, children, ...props }: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        className={cn('glass-panel z-50 overflow-hidden rounded-lg', className)}
        {...props}
      >
        <SelectPrimitive.Viewport className="p-1">{children}</SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

export function SelectItem({ className, children, ...props }: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      className={cn(
        'cursor-pointer rounded-md px-3 py-2 text-sm text-on-surface-variant outline-none data-[highlighted]:bg-white/10 data-[highlighted]:text-primary',
        className,
      )}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}
