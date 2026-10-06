import { Slot } from '@radix-ui/react-slot';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import { cn } from '@/utils/Cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-lg text-sm font-semibold transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#006ce4] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-[#006ce4] text-white hover:bg-[#0057b8]',
        secondary: 'bg-white text-[#006ce4] hover:bg-blue-50',
        ghost: 'text-current hover:bg-white/10',
      },
      size: {
        default: 'h-11 px-5',
        sm: 'h-9 px-3',
        lg: 'h-16 px-8 text-lg',
        icon: 'size-9',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  },
);

export function Button(props: React.ComponentProps<'button'> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const className = cn(buttonVariants({ variant: props.variant, size: props.size }), props.className);

  if (props.asChild) {
    return <Slot className={className}>{props.children}</Slot>;
  }

  if (props.type === 'submit') {
    return <button type="submit" className={className} disabled={props.disabled}>{props.children}</button>;
  }

  if (props.type === 'reset') {
    return <button type="reset" className={className} disabled={props.disabled}>{props.children}</button>;
  }

  return <button type="button" className={className} disabled={props.disabled}>{props.children}</button>;
}

export { buttonVariants };
